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
    
api_endpoint = '{8}'
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