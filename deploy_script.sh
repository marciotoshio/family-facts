pip install awscli
# Preparing and deploying Function to Lambda
zip -r family-facts.zip index.js package.json
aws lambda update-function-code --function-name familyFacts --zip-file fileb://family-facts.zip

# Publishing a new Version of the Lambda function
version='aws lambda publish-version --function-name familyFacts | jq -r .Version'

# Updating the PROD Lambda Alias so it points to the new function
aws lambda update-alias --function-name familyFacts --function-version $version --name PROD

aws lambda get-function --function-name "familyFacts"

# Invoking Lambda function from update PROD alias
aws lambda invoke --function-name familyFacts --payload "$(cat test_data.json)" --qualifier PROD lambda_output.txt

cat lambda_output.txt
