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
SQL_QUERY = '{14}'
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

# Function to fetch data from Elasticsearch using SQL query
def fetch_data_via_sql(sql_query):
    es = Elasticsearch([ELASTICSEARCH_HOST], {11})

    all_records = []
    cursor = None
    columns = None

    while True:
        if cursor is None:
            print("Executing SQL query")
            res = es.sql.query(body={{"query": sql_query, "fetch_size": {4}}})
        else:
            print("Fetching next page using cursor")
            res = es.sql.query(body={{"cursor": cursor}})

        if columns is None:
            columns = [col["name"] for col in res.get("columns", [])]
            
        rows = res.get("rows", [])

        if not rows:
            break

        for row in rows:
            all_records.append(dict(zip(columns, row)))

        cursor = res.get("cursor")
        if not cursor:
            break

    print("Total records count:", len(all_records))
    temp_file = tempfile.NamedTemporaryFile(mode='w+', delete=False, suffix='.json', dir="{7}")
    json.dump(all_records, temp_file)
    temp_file.close()
    print(format(temp_file.name))
    conn = duckdb.connect('{5}')
    conn.execute("CREATE SCHEMA IF NOT EXISTS {6}")
    if len(all_records) > 0:
        conn.execute("{8}".format(temp_file.name))
    print("Data fetched successfully via SQL query")
    
# Route to the appropriate fetch function based on whether a SQL query is provided
if 'SQL_QUERY' in dir() and SQL_QUERY:
    fetch_data_via_sql(SQL_QUERY)
else:
    # Call function to fetch data and load into DataFrame
    fetch_data_and_load_into_dataframe()

# Display DataFrame