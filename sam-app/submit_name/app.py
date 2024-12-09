import boto3
import json
from datetime import datetime, timezone
import uuid

# Initialize DynamoDB client for TefilaForNames Table
dynamodb_client = boto3.client('dynamodb')
table_name = 'NamesSubmitted'

def lambda_handler(event, context):
    # Extract input fields from the event
    tefilah_type = event['TefilahID']
    hebrew = event['HebrewName']
    english = event['EnglishName']
    notes = event['Notes']
    email = event['Email'].lower() 

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
                'error': 'Failed to insert item into DynamoDB',
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
        })
    }
