import boto3
import json

# Initialize boto3 clients for Lambda and API Gateway
lambda_client = boto3.client('lambda')           # Creates a Lambda client
apigateway_client = boto3.client('apigateway')   # Creates an API Gateway client

# Define Lambda function and API details
lambda_function_name = 'lambda_handler'  # Name of your Lambda function
api_name = 'TriggerLambdaAPI'                    # Name for the new API Gateway
api_stage = 'dev'                                # Deployment stage for the API Gateway (e.g., 'dev', 'prod')

# Step 1: Create the API Gateway REST API
# This creates a new REST API in API Gateway with the specified name and description.
response = apigateway_client.create_rest_api(
    name=api_name,
    description='API to trigger Lambda function',
)
api_id = response['id']  # Retrieve the API ID to use in subsequent steps

# Step 2: Get the root resource ID ("/")
# Each API in API Gateway has a root resource ("/") that we need to get for attaching resources.
resources = apigateway_client.get_resources(restApiId=api_id)
root_resource_id = next(item['id'] for item in resources['items'] if item['path'] == '/')

# Step 3: Create a new resource and method for the Lambda trigger
# This adds a new resource ("/trigger") to the API, which will represent the endpoint for our Lambda function.
resource = apigateway_client.create_resource(
    restApiId=api_id,
    parentId=root_resource_id,
    pathPart='trigger'  # The resource path for this endpoint will be "/trigger"
)
resource_id = resource['id']  # Get the ID of the newly created resource

# Step 4: Create a POST method for the resource
# Configures a POST method on the "/trigger" resource, without any authentication for simplicity.
apigateway_client.put_method(
    restApiId=api_id,
    resourceId=resource_id,
    httpMethod='POST',               # The HTTP method (POST in this case)
    authorizationType='NONE'          # No authorization for now; adjust as needed
)

# Step 5: Integrate the Lambda function with the POST method
# Links the POST method to our Lambda function using AWS_PROXY integration, allowing API Gateway to pass requests to Lambda.
apigateway_client.put_integration(
    restApiId=api_id,
    resourceId=resource_id,
    httpMethod='POST',
    type='AWS_PROXY',                 # Proxy integration sends the request directly to Lambda
    integrationHttpMethod='POST',     # HTTP method to call Lambda
    uri=f'arn:aws:apigateway:{boto3.Session().region_name}:lambda:path/2015-03-31/functions/arn:aws:lambda:{boto3.Session().region_name}:{boto3.client("sts").get_caller_identity()["Account"]}:function:{lambda_function_name}/invocations'
)

# Step 6: Set up permissions for API Gateway to invoke Lambda
# Adds a permission to Lambda to allow API Gateway to invoke it.
lambda_client.add_permission(
    FunctionName=lambda_function_name,
    StatementId='APIGatewayInvokePermission',    # Unique ID for the permission statement
    Action='lambda:InvokeFunction',              # Lambda invoke action
    Principal='apigateway.amazonaws.com',        # Specifies that API Gateway is allowed to invoke
    SourceArn=f'arn:aws:execute-api:{boto3.Session().region_name}:{boto3.client("sts").get_caller_identity()["Account"]}:{api_id}/*/POST/trigger'
)

# Step 7: Deploy the API
# Deploys the API to the specified stage (e.g., "dev").
apigateway_client.create_deployment(
    restApiId=api_id,
    stageName=api_stage
)

# Step 8: Invoke the API Endpoint
# Constructs the API URL and prints it, so we can test the endpoint by sending an HTTP POST request.
api_url = f'https://{api_id}.execute-api.{boto3.Session().region_name}.amazonaws.com/{api_stage}/trigger'
print(f'API URL: {api_url}')  # Prints the URL of the API Gateway endpoint

# Trigger the endpoint to verify the setup
import requests

# Send a POST request to the API Gateway endpoint
response = requests.post(api_url)
print("Response status code:", response.status_code)  # Prints the response status code
print("Response body:", response.json())              # Prints the response body from Lambda
