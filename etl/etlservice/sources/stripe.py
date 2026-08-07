from typing import Optional, Tuple
 
import dlt
import json
from pendulum import DateTime
from stripe_analytics import (
    ENDPOINTS,
    INCREMENTAL_ENDPOINTS,
    incremental_stripe_source,
    stripe_source,
)
 
 
def load_data(
    endpoints: Tuple[str, ...] = ENDPOINTS + INCREMENTAL_ENDPOINTS,
    start_date: Optional[DateTime] = None,
    end_date: Optional[DateTime] = None,
) -> None:
   
    pipeline = dlt.pipeline(
        pipeline_name='{0}_pipeline', destination='{1}',staging = {3}, dataset_name='{0}'
      
    )
    source = stripe_source(
        endpoints=endpoints
    )

    # Run the resources together
    load_info = pipeline.run(source)
    print(load_info)
 
if __name__ == "__main__":
    load_data([{2}])
