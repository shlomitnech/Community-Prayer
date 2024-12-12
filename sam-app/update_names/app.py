import json
import boto3
from botocore.exceptions import ClientError
from datetime import datetime, timezone

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('NamesSubmitted')  # Replace 'NamesTable' with your actual table name  

def lambda_handler(event, context):
    try:
        if 'body' in event:
            body = json.loads(event['body'])
        else:
            body = event  # For direct invocation from function

        # Extract required fields
        names_id = body.get('NamesID')

        # Validate that 'NamesID' is provided
        if not names_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'NamesID is required for editing'})
            }

        # Remove 'NamesID' from the fields to update since it's the primary key
        update_fields = {key: value for key, value in body.items() if key != 'NamesID'}

        # Add 'DateUpdated' to the update fields
        current_time = datetime.now(timezone.utc).isoformat()
        update_fields['DateUpdated'] = current_time

        # Validate that there are fields to update
        if not update_fields:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'No fields provided to update'})
            }

        # Build the update expression and expression attribute values
        update_expression = "SET " + ", ".join(f"{key} = :{key}" for key in update_fields.keys())
        expression_attribute_values = {f":{key}": value for key, value in update_fields.items()}

        # Perform the update operation on DynamoDB
        response = table.update_item(
            Key={'NamesID': names_id},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
            ReturnValues="UPDATED_NEW"
        )

        # Return success response with updated fields
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Name updated successfully',
                'updatedFields': response.get('Attributes', {})
            })
        }

    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': f"Error updating name: {e.response['Error']['Message']}"})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': f"An unexpected error occurred: {str(e)}"})
        }
