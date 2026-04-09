import dlt
import elasticsearch
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
from elasticsearch import Elasticsearch
import pandas as pd
from datetime import datetime, timedelta
import duckdb
import json
import tempfile
import os


# Elasticsearch configuration
ELASTICSEARCH_HOST = '{0}:{1}'
INDEX_NAME = '{2}'
API_KEY = '{3}'
{10}
# Function to fetch data from Elasticsearch with pagination and load into DataFrame
def fetch_data_and_load_into_dataframe(scroll_size={4}):
    es = Elasticsearch([ELASTICSEARCH_HOST], {11})    

    all_records = []
    scroll_id = None
    total_docs = float('inf')

    while len(all_records) < total_docs:
     # First scroll request
        if scroll_id is None:
            res = es.search(index=INDEX_NAME, scroll='1m', size=scroll_size {9})
        else:
        # Subsequent scroll requests
            res = es.scroll(scroll_id=scroll_id, scroll='1m')

    # Break the loop if there are no more documents
        if not res['hits']['hits']:
           break

    # Process hits
        hits = res['hits']['hits']
        all_records.extend(hits)
        total_docs = res['hits']['total']['value']
    
    # Extend all_records with hits and include _id field
        scroll_id = res['_scroll_id']


    # Load data into DataFrame
    print("Total records count:", len(all_records))
    temp_file = tempfile.NamedTemporaryFile(mode='w+', delete=False, suffix='.json', dir="{7}")
    json.dump(all_records, temp_file)
    temp_file.close()
    print(format(temp_file.name))
    conn = duckdb.connect('{5}')
    conn.execute("CREATE SCHEMA IF NOT EXISTS {6}")
    if len(all_records) > 0:
        conn.execute("{8}".format(temp_file.name))
        conn.execute("{13}")
    print("Data fetched successfully")

# Call function to fetch data and load into DataFrame
fetch_data_and_load_into_dataframe()

# Display DataFrame