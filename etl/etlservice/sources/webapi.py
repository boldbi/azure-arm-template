import dlt
import json
from dlt.common import pendulum
import pandas as pd
import requests
from requests.auth import HTTPBasicAuth
import base64
import os
import posixpath
from typing import Iterator
from datetime import datetime, timedelta
import re

import dlt
from dlt.sources import TDataItem, TDataItems

try:
    from .filesystem import FileItemDict, filesystem, readers, read_csv, read_jsonl, read_parquet  # type: ignore
except ImportError:
    from filesystem import (
        FileItemDict,
        filesystem,
        readers,
        read_csv,
        read_jsonl,
        read_parquet,
    )

def replace_none_with_string(data):
    if isinstance(data, dict):
        return {{k: replace_none_with_string(v) for k, v in data.items()}}
    elif isinstance(data, list):
        return [replace_none_with_string(item) for item in data]
    elif data is None:
        return 0
    else:
        return data
        

    
api_endpoint = '{8}'

match = re.search(r"since=(today\(\)\.adddays\(-1\)\.start)&until=(today\(\)\.adddays\(-1\)\.end)", api_endpoint)
if match:
    start_param = match.group(1)
    end_param = match.group(2)
    
    # Check if the parameters match the expected pattern
    if start_param == "today().adddays(-1).start" and end_param == "today().adddays(-1).end":
        # Get yesterday's date
        yesterday = datetime.now() - timedelta(days=1)

        # Start of yesterday (midnight)
        start_of_yesterday = datetime(yesterday.year, yesterday.month, yesterday.day)

        # End of yesterday (last second before midnight of today)
        end_of_yesterday = start_of_yesterday + timedelta(days=1) - timedelta(seconds=1)

        # Convert to Unix timestamps
        start_timestamp = int(start_of_yesterday.timestamp())
        end_timestamp = int(end_of_yesterday.timestamp())
        api_endpoint = re.sub(r"today\(\)\.adddays\(-1\)\.start", str(start_timestamp), api_endpoint)
        api_endpoint = re.sub(r"today\(\)\.adddays\(-1\)\.end", str(end_timestamp), api_endpoint)
        print("Parsed Start Timestamp:", start_timestamp)
        print("Parsed End Timestamp:", end_timestamp)

{1}


# Set headers with Basic Authentication
{2}
{3}
if response.status_code == 200:
    api_data = json.loads(response.text)
else:
    print("Error: "+ str(response.status_code))
    api_data = None

# Create DataFrame if data is available
if api_data:
    df = pd.json_normalize(api_data)
    {11}
    print(df.head())

    pipeline = dlt.pipeline("{0}_pipeline", destination="filesystem", dataset_name="{0}")
    try:
        pipeline.run(df, table_name="{4}", loader_file_format="jsonl")
    except Exception as e:
        if "_dlt_pipeline_state" in str(e) and "FileNotFoundError" in str(e):
            print('')
        else:
            raise
        
    dir_path = '{5}'
    try:
        if os.path.isdir(dir_path):
            
    
            file_paths = [os.path.join(dir_path, filename) for filename in os.listdir(directory_path)]

            for file_path in file_paths:
                filePath = (file_path)
                df = pd.read_json(filePath)
                data = df.to_dict(orient="records",lines=True)
                pipelinef = dlt.pipeline(pipeline_name="{0}_pipeline",destination='{9}',staging={10} ,dataset_name="{0}",)
                load_info = pipelinef.run(data, table_name="{6}")
                print(pipelinef.last_trace.last_normalize_info)
        else:
            directory_path = '{7}'
    
            file_paths = [os.path.join(directory_path, filename) for filename in os.listdir(directory_path)]
    
            for file_path in file_paths:
                filePath = (file_path)
                df = pd.read_json(filePath,lines=True)
                data = df.to_dict(orient="records")
                pipelinef = dlt.pipeline(pipeline_name="{0}_pipeline",destination='{9}',staging={10} ,dataset_name="{0}",)
                load_info = pipelinef.run(data, table_name="{6}")
                print(pipelinef.last_trace.last_normalize_info)
    except Exception as e:
        print(f'An unexpected error occurred: {{e}}')