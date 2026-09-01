import dlt

# Configuration values injected at pipeline generation time
connection_type = "{9}"
auth_type = "{8}"
tablename = "{5}" 
tables = [t.strip() for t in tablename.split(",")]

# Presto connection configuration
PRESTO_HOST = "{1}"
PRESTO_PORT = int("{2}")
PRESTO_USER = "{3}"
PRESTO_PASSWORD = "{7}"
PRESTO_CATALOG = "{4}"
PRESTO_SCHEMA = "{6}"
PRESTO_HTTP_SCHEME = "{10}"

# Trino connection configuration
TRINO_HOST = "{1}"
TRINO_PORT = int("{2}")
TRINO_USER = "{3}"
TRINO_PASSWORD = "{7}"
TRINO_CATALOG = "{4}"
TRINO_SCHEMA = "{6}"
TRINO_HTTP_SCHEME = "{10}"

def presto_generator(query):
    try:
        from prestodb.dbapi import connect as presto_connect
        from prestodb import auth as presto_auth
    except Exception as e:
        raise RuntimeError("Missing prestodb package: pip install presto-python-client") from e

    if auth_type.lower() == "authentication":
        conn = presto_connect(
            host=PRESTO_HOST,
            port=PRESTO_PORT,
            user=PRESTO_USER,
            catalog=PRESTO_CATALOG,
            schema=PRESTO_SCHEMA,
            http_scheme=PRESTO_HTTP_SCHEME,
            auth=presto_auth.BasicAuthentication(PRESTO_USER, PRESTO_PASSWORD),
            source="dlt-presto-auth"
        )
    else:
        conn = presto_connect(
            host=PRESTO_HOST,
            port=PRESTO_PORT,
            user=PRESTO_USER,
            catalog=PRESTO_CATALOG,
            schema=PRESTO_SCHEMA,
            http_scheme=PRESTO_HTTP_SCHEME,
            source="dlt-presto-no-auth"
        )

    cur = conn.cursor()
    cur.execute(query)
    cols = [d[0] for d in cur.description]
    for row in cur.fetchall():
        yield dict(zip(cols, row))

def trino_generator(query):
    try:
        import trino
    except Exception as e:
        raise RuntimeError("Missing trino package: pip install trino") from e

    if auth_type.lower() == "authentication":
        auth = trino.auth.BasicAuthentication(TRINO_USER, TRINO_PASSWORD)
        conn = trino.dbapi.connect(
            host=TRINO_HOST,
            port=TRINO_PORT,
            user=TRINO_USER,
            catalog=TRINO_CATALOG,
            schema=TRINO_SCHEMA,
            http_scheme=TRINO_HTTP_SCHEME,
            auth=auth
        )
    else:
        conn = trino.dbapi.connect(
            host=TRINO_HOST,
            port=TRINO_PORT,
            user=TRINO_USER,
            catalog=TRINO_CATALOG,
            schema=TRINO_SCHEMA,
            http_scheme=TRINO_HTTP_SCHEME
        )

    cur = conn.cursor()
    cur.execute(query)
    cols = [d[0] for d in cur.description]
    for row in cur.fetchall():
        yield dict(zip(cols, row))

def get_source(query):
    if connection_type.lower() == "presto":
        return presto_generator(query)
    else:
        return trino_generator(query)

def main():
    pipeline = dlt.pipeline(
        pipeline_name="{0}_duckdb",
        destination="duckdb",
        dataset_name="{0}"
    )

    
    for table in tables:
        query = f"SELECT * FROM {{PRESTO_CATALOG}}.{{PRESTO_SCHEMA}}.{{table}}"
    
        info = pipeline.run(
            get_source(query),
            table_name=table
        )

if __name__ == "__main__":
    main()