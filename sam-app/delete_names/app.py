import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')

table_names = dynamodb.Table('NamesSubmitted')

def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body', '{}'))
        names_id = body.get('NamesID')
        #tefilah_id = body.get('TefilahID')

        if not names_id: # or not tefilah_id:
            return {
                'statusCode': 400,
                'body': json.dumps(f'Both NamesID and TefilahID are required Name with ID {names_id} and TefilahID {tefilah_id} deleted successfully')
            }

        # Delete the name from 'Names' table
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
