import dlt
from mux import mux_source


def load_yesterday_video_views() -> None:
    pipeline = dlt.pipeline(
        pipeline_name="{0}_pipeline", destination='{2}', staging={3}, dataset_name="{0}"
    )
    load_info = pipeline.run({1})
    print(load_info)


if __name__ == "__main__":
    load_yesterday_video_views()
