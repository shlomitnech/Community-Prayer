import boto3
import json
from datetime import datetime, timezone
import uuid

# Initialize DynamoDB client for TefilaForNames Table
dynamodb_client = boto3.client('dynamodb')
table_name = 'NamesSubmitted'

def lambda_handler(event, context):
    # Extract HTTP method from the event
    http_method = event['httpMethod']

    # For POST request (submit new data)
    if http_method == 'POST':
        if 'body' in event:
            body = json.loads(event['body'])
        else:
            body = event  # For direct invocation

        # Extract data from the request body
        tefilah_type = body.get('TefilahID')
        hebrew = body.get('HebrewName')
        english = body.get('EnglishName')
        notes = body.get('Notes')
        email = body.get('Email').lower()

        # Get the current time in ISO format
        now = datetime.now(timezone.utc).isoformat()

        # Generate a random NameID
        name_id = str(uuid.uuid4())[:6]

        # Define the item to be inserted into the table
        item = {
            'NamesID': {'S': name_id},
            'HebrewName': {'S': hebrew},
            'EnglishName': {'S': english},
            'Notes': {'S': notes},
            'Email': {'S': email},
            'TefilahID': {'S': tefilah_type},
            'DateCreated': {'S': now},
            'DateUpdated': {'S': now}
        }

        # Insert the item into the DynamoDB table
        try:
            response = dynamodb_client.put_item(TableName=table_name, Item=item)
        except Exception as e:
            return {
                'statusCode': 500,
                'body': json.dumps({
                    'Error': 'Failed to insert item into DynamoDB',
                    'details': str(e)
                })
            }

        # Return a success response with the inserted item details
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Successful submission',
                'NamesID': name_id,
                'HebrewName': hebrew,
                'EnglishName': english,
                'Notes': notes,
                'Email': email,
                'TefilahID': tefilah_type,
                'DateCreated': now,
            }),
            "headers": {
                "Access-Control-Allow-Origin": "*",  
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                "Access-Control-Allow-Headers": "Content-Type,Authorization",
            }
        }

    # For GET request (retrieve data)
    elif http_method == 'GET':
        # You can customize the GET query based on your needs. For example, querying by Email or NamesID.
        # Here, we're assuming you may want to retrieve all items or specific items from DynamoDB.

        email = event['queryStringParameters'].get('Email') if 'queryStringParameters' in event else None
        key_condition_expression = None
        expression_attribute_values = {}

        if email:
            # Query by email if provided
            key_condition_expression = "Email = :email"
            expression_attribute_values = {
                ':email': {'S': email}
            }

        # Query the DynamoDB table
        try:
            if key_condition_expression:
                response = dynamodb_client.query(
                    TableName=table_name,
                    KeyConditionExpression=key_condition_expression,
                    ExpressionAttributeValues=expression_attribute_values
                )
            else:
                response = dynamodb_client.scan(TableName=table_name)

            # Prepare the result
            items = response.get('Items', [])
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'message': 'Data retrieved successfully',
                    'items': items,
                }),
                "headers": {
                    "Access-Control-Allow-Origin": "*",  # Allow all origins, or restrict to http://localhost:3000
                    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization",
                }
            }

        except Exception as e:
            return {
                'statusCode': 500,
                'body': json.dumps({
                    'error': 'Failed to retrieve data from DynamoDB',
                    'details': str(e)
                })
            }

    else:
        # If the HTTP method is not POST or GET, return a method not allowed response
        return {
            'statusCode': 405,
            'body': json.dumps({
                'error': 'Method Not Allowed'
            }),
            "headers": {
                "Access-Control-Allow-Origin": "*",  # Allow all origins
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
                "Access-Control-Allow-Headers": "Content-Type,Authorization",
            }
        }
