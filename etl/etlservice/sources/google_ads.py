import dlt
from dlt.common.pipeline import LoadInfo
from google_ads import google_ads


def load_pipeline() -> LoadInfo:
    """
    Loads custom queries and default tables
    """

    pipeline = dlt.pipeline(
        pipeline_name="{0}_pipeline",
        destination='{2}',
        staging={3},
        dataset_name="{0}",
    )
    data_default = {1}
    info = pipeline.run(data=[data_default], write_disposition="merge")
    return info


if __name__ == "__main__":
    load_info = load_pipeline()
    print(load_info)