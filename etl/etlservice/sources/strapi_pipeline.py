from typing import List
import dlt
from strapi import strapi_source


def load(endpoints: List[str] = None) -> None:
    endpoints = ["athletes"] or endpoints
    pipeline = dlt.pipeline(
        pipeline_name="{0}_pipeline", destination='{2}', staging={3}, dataset_name="{0}"
    )

    # run the pipeline with your parameters
    load_info = pipeline.run(strapi_source(endpoints=endpoints))
    # pretty print the information on data that was loaded
    print(load_info)


if __name__ == "__main__":
    # add your desired endpoints to the list
    endpoints = [{1}]
    load(endpoints)
