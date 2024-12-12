import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    # Retrieve email from the query parameters
    if event['httpMethod'] == 'GET':  # Handle GET requests
        email = event['queryStringParameters'].get('Email') if event.get('queryStringParameters') else None
    elif event['httpMethod'] == 'POST':  # Handle POST requests
        body = json.loads(event['body']) if 'body' in event else {}
        email = body.get('Email')
    else:
        return {
            'statusCode': 405,
            'body': json.dumps({'message': 'Method not allowed'})
        }
    

    # If an email address was not sent
    if not email:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Email query parameter is required'})
        }
    
    # Define the DynamoDB table
    names_table = dynamodb.Table('NamesSubmitted')

    try:
        # Query the NamesSubmitted table based on the Email attribute
        response = names_table.query(
            IndexName='EmailIndex',  
            KeyConditionExpression=boto3.dynamodb.conditions.Key('Email').eq(email)
        )
        
        names_items = response.get('Items', [])
        
        if not names_items:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'No items found for the given email'})
            }

        # Prepare the response
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({'names': names_items})
        }
    
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': f"Error fetching data: {str(e)}"})
        }
