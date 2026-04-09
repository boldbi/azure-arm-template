import sqlalchemy as sa
import pandas as pd
import duckdb
import sys, json, traceback
from sqlalchemy.exc import ProgrammingError, DBAPIError

# ---------- CONFIG ---------- 
Pg_DB = "{0}"
Pg_Host = "{1}"
Pg_Password = "{2}"
Pg_Port = {3}
Pg_User = "{4}"
Pg_driver = "{5}"

duckdb_path = "{6}"
query = """{7}"""
# ---------- CONNECTION ----------
# Use pg8000 driver via SQLAlchemy
engine = sa.create_engine(
    f"{{Pg_driver}}://{{Pg_User}}:{{Pg_Password}}@{{Pg_Host}}:{{Pg_Port}}/{{Pg_DB}}"
)

# Postgres to DuckDB to Parquet 
def cube_to_duckdb():
    try:
        df = pd.read_sql_query(query, engine)
        con = duckdb.connect(database=duckdb_path, read_only=False)
        con.register('tmp_df', df)
        con.execute('CREATE TABLE query_result AS SELECT * FROM tmp_df')
        con.close()
    except DBAPIError as e:
        # err = {{"type": e.__class__.__name__, "message": str(e)}}
        if getattr(e, "orig", None) is not None:
            # err["dbapi_type"] = e.orig.__class__.__name__
            # err["dbapi_message"] = str(e.orig)
            print(json.dumps({{"error": str(e.orig)}}), file=sys.stderr, flush=True)
        return 3
    except ProgrammingError as e:
            if getattr(e, "orig", None) is not None:
                # err["dbapi_type"] = e.orig.__class__.__name__
                # err["dbapi_message"] = str(e.orig)
                print(json.dumps({{"error": str(e.orig)}}), file=sys.stderr, flush=True)
            return 2
    except Exception as e:
        traceback.print_exc()
        return 1
    

if __name__ == "__main__":
    # Flip small_data depending on scale
    cube_to_duckdb()