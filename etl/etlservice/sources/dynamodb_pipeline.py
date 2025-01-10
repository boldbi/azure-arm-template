import dlt
import boto3
import pandas as pd
from boto3.dynamodb.conditions import Attr
from botocore.exceptions import NoCredentialsError, PartialCredentialsError, ClientError


aws_access_key_id = '{1}'
aws_secret_access_key = '{2}'
region = '{3}'


try:
    session = boto3.Session(
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        region_name=region
    )
    
    dynamodb = session.resource('dynamodb')
    
    
    table_name = '{4}'
    
    
    table = dynamodb.Table(table_name)
    all_items = []
    if {5}:
        response = table.scan(
            FilterExpression=Attr('{6}').gt('{7}')
        )
        items = response['Items']
        
        df = pd.DataFrame(items)
    elif {9} and not {5}:
        last_evaluated_key = None
        while True:
            scan_params = {{
                'Limit': {8}
            }}
    
            if last_evaluated_key:
                scan_params['ExclusiveStartKey'] = last_evaluated_key
    
            response = table.scan(**scan_params)
            scanned_items = response.get('Items', [])
            all_items.extend(scanned_items)
            last_evaluated_key = response.get('LastEvaluatedKey')
        
            if not last_evaluated_key:
                df = pd.DataFrame(all_items)
                break
    elif not {9} and not {5}:
        response = table.scan()
        notfiltereditems = response['Items']
        df = pd.DataFrame(notfiltereditems)
    print(df.head())
    
    data = df.to_dict(orient="records")
    
    pipeline = dlt.pipeline(pipeline_name="{0}_pipeline", destination='duckdb',staging={10} , dataset_name="{0}")
    load_info = pipeline.run(data, table_name="{4}")
    print(load_info)
except NoCredentialsError:
    print("Credentials not available. Please check your AWS credentials.")
except PartialCredentialsError:
    print("Incomplete credentials provided. Please provide valid AWS credentials.")
except ClientError as e:
    error_message = e.response['Error']['Message']
    error_code = e.response['Error']['Code']
    print(f"AWS ClientError occurred: {{error_code}} - {{error_message}}")
except Exception as e:
    print(f"An unexpected error occurred: {{str(e)}}")
    