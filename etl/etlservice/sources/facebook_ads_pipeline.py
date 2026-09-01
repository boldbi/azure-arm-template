import dlt

from facebook_ads import (
    facebook_ads_source,
    facebook_insights_source,
    DEFAULT_ADCREATIVE_FIELDS,
    AdCreative,
    enrich_ad_objects,
)


def load_all_ads_objects() -> None:
    """Loads campaigns, ad sets, ads, ad creatives and leads"""
    pipeline = dlt.pipeline(
        pipeline_name="{0}",
        destination='{3}',
        staging={4},
        dataset_name="{0}",
        full_refresh=True,
    )
    info = pipeline.run(facebook_ads_source())
    print(info)


def merge_ads_objects() -> None:
    """Shows how to convert the source into a merge one, where subsequent loads add or update records but not delete old ones"""
    pipeline = dlt.pipeline(
        pipeline_name="facebook_insights",
        destination='{3}',
        staging={4},
        dataset_name="facebook_insights_data",
        full_refresh=True,
    )
    fb_ads = facebook_ads_source()
    # enable root key propagation on a source that is not a merge one by default. this is not required if you always use merge but below we start
    # with replace
    fb_ads.root_key = True
    # load only disapproved ads
    fb_ads.ads.bind(states=("DISAPPROVED",))
    info = pipeline.run(fb_ads.with_resources("ads"), write_disposition="replace")
    # merge the paused ads. the disapproved ads stay there!
    fb_ads = facebook_ads_source()
    fb_ads.ads.bind(states=("PAUSED",))
    info = pipeline.run(fb_ads.with_resources("ads"), write_disposition="merge")
    print(info)
    # prove we have them all
    with pipeline.sql_client() as c:
        with c.execute_query("SELECT id, name, effective_status FROM ads") as q:
            print(q.df())


def load_ads() -> None:
    """Shows how to change the fields loaded for a particular object"""
    pipeline = dlt.pipeline(
        pipeline_name="{0}",
        destination='{3}',
        staging={4},
        dataset_name="{0}",
        full_refresh=True,
    )
    fb_ads = facebook_ads_source()
    {1}





if __name__ == "__main__":
     # load_all_ads_objects()
    # merge_ads_objects()
    # load_ads_with_custom_fields()
    # load_only_disapproved_ads()
    # load_and_enrich_objects()
    # load_insights()
      {2}
