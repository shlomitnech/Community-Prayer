import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

table_names = dynamodb.Table('NamesSubmitted')

def lambda_handler(event, context):
    try:

        if 'body' in event:
            body = json.loads(event['body'])
        else:
            body = event  # For direct invocation from function
        names_id = body.get('NamesID')

        if not names_id: 
            return {
                'statusCode': 400,
                'body': json.dumps(f'Error: NamesID is required to delete successfully')
            }

        # Delete the name from 'NamesSubmitted' table
        try:
            table_names.delete_item(
                Key={'NamesID': names_id}
            )
        except ClientError as e:
            return {
                'statusCode': 500,
                'body': json.dumps(f"Error deleting from 'Names' table: {e.response['Error']['Message']}")
            }

        # Return success response
        return {
            'statusCode': 200,
            'body': json.dumps(f"Name with ID {names_id} deleted successfully")
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"An error occurred: {str(e)}")
        }
