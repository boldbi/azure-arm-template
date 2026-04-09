""" Loads the pipeline for Google Analytics V4. """

import time
from typing import Any

import dlt
from google_analytics import google_analytics
from dlt.sources.credentials import GcpServiceAccountCredentials
from dlt.sources.credentials import GcpOAuthCredentials


# this can also be filled in config.toml and be left empty as a parameter.


def simple_load() -> Any:
    """
    Just loads the data normally. Incremental loading for this pipeline is on,
    the last load time is saved in dlt_state, and the next load of the pipeline will have the last load as a starting date.

    Returns:
        Load info on the pipeline that has been run.
    """
    # FULL PIPELINE RUN
    pipeline = dlt.pipeline(
        pipeline_name="{0}_pipeline",
        destination='{4}',
        staging={5},
        full_refresh=False,
        dataset_name="{0}",
    )
    # Google Analytics source function - taking data from QUERIES defined locally instead of config
    # TODO: pass your google analytics property id
    credentials = {6}
    data_analytics = google_analytics(credentials= credentials,property_id={1}, queries={2}, {3})
    info = pipeline.run(data=data_analytics)
    print(info)
    return info


def simple_load_config() -> Any:
    """
    Just loads the data normally. QUERIES are taken from config. Incremental loading for this pipeline is on,
    the last load time is saved in dlt_state, and the next load of the pipeline will have the last load as a starting date.

    Returns:
        Load info on the pipeline that has been run.
    """
    # FULL PIPELINE RUN
    pipeline = dlt.pipeline(
        pipeline_name="dlt_google_analytics_pipeline",
        destination='{4}',
        staging={5},
        full_refresh=False,
        dataset_name="eltapp",
    )
    # Google Analytics source function - taking data from QUERIES defined locally instead of config
    data_analytics = google_analytics()
    info = pipeline.run(data=data_analytics)
    print(info)
    return info

    


if __name__ == "__main__":
    start_time = time.time()
    simple_load()
    end_time = time.time()
    print(f"Time taken: {{end_time-start_time}}")