#!/usr/bin/env python3
"""Pipeline to load Salesforce data."""
import dlt
from salesforce import salesforce_source


def load() -> None:
    """Execute a pipeline from Salesforce."""

    pipeline = dlt.pipeline(
        pipeline_name="{0}_pipeline", destination='{2}', staging={3}, dataset_name="{0}"
    )
    # Execute the pipeline
    load_info = pipeline.run({1})

    # Print the load info
    print(load_info)


if __name__ == "__main__":
    load()
