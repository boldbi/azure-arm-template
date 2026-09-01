from datetime import datetime
from helper.bingadsauthhelper import *
from helper.bingadsreporthelper import *
from bingads.v13.reporting import *
from bingads.service_client import ServiceClient
from bingads.authorization import AuthorizationData, OAuthDesktopMobileAuthCodeGrant
import pandas as pd
from dateutil import parser
import dlt

# You must provide credentials in oauth.py.

# The report file extension type.
REPORT_FILE_FORMAT='Csv'
CLIENT_ID = '{1}'
CLIENT_SECRET = '{2}'
DEVELOPER_TOKEN='{3}'
REFRESH_TOKEN='{4}'

# The maximum amount of time (in milliseconds) that you want to wait for the report download.
TIMEOUT_IN_MILLISECONDS=3600000


def download_report(reporting_download_parameters, reporting_service_manager):
    """ You can get a Report object by submitting a new download request via ReportingServiceManager. 
    Although in this case you will not work directly with the file, under the covers a request is 
    submitted to the Reporting service and the report file is downloaded to a local directory.  """

    report_container = reporting_service_manager.download_report(reporting_download_parameters)


    if(report_container == None):
        output_status_message("There is no report data for the submitted report request parameters.")
        sys.exit(0)

    #Once you have a Report object via either workflow above, you can access the metadata and report records. 

    #Output the report metadata


    columns = [str(c) for c in report_container.report_columns]
    rows = []
    for rec in report_container.report_records:
        row = {{col: rec.value(col) for col in columns}}
        rows.append(row)

    report_records = report_container.report_records  # This is a common way to access records
    df = pd.DataFrame(rows, columns=columns)

    # #read the downloaded report as a dataframe
    # pd.set_option('display.max_columns', 100)
    # file_path = reporting_download_parameters.result_file_directory + reporting_download_parameters.result_file_name
    # df = pd.read_csv(file_path, header=9, skipfooter=2, engine='python')
    pipelinef = dlt.pipeline(pipeline_name="{0}_pipeline",destination='{9}',staging={10} ,dataset_name="{0}",)
    load_info = pipelinef.run(df.to_dict(orient="records"), table_name="{11}")
    # print(df)
    
    #Be sure to close the report.
    report_container.close()

def get_report_request(account_id):
    """ 
    Use a sample report request or build your own. 
    """


    report_type = '{6}'
    aggregation = '{8}'
    exclude_column_headers=False
    exclude_report_footer=False
    exclude_report_header=False
    return_only_complete_data=False
    time=reporting_service.factory.create('ReportTime')
    # You can either use a custom date range or predefined time.
{5}


    columns = {7}
    if report_type == "campaign performance":
        return get_campaign_performance_report_request(
            account_id, aggregation, exclude_column_headers, exclude_report_footer,
            exclude_report_header, REPORT_FILE_FORMAT, return_only_complete_data,
            time, reporting_service, columns
        )
    elif report_type == "account performance":
        return get_account_performance_report_request(
            account_id, aggregation, exclude_column_headers, exclude_report_footer,
            exclude_report_header, REPORT_FILE_FORMAT, return_only_complete_data,
            time, reporting_service, columns
        )
    elif report_type == "ad group performance":
        return get_ad_group_performance_report_request(
            account_id, aggregation, exclude_column_headers, exclude_report_footer,
            exclude_report_header, REPORT_FILE_FORMAT, return_only_complete_data,
            time, reporting_service, columns
        )
    elif report_type == "conversion performance":
        return get_conversion_performance_report_request(
            account_id, aggregation, exclude_column_headers, exclude_report_footer,
            exclude_report_header, REPORT_FILE_FORMAT, return_only_complete_data,
            time, reporting_service, columns
        )
    elif report_type == "keyword performance":
        return get_keyword_performance_report_request(
            account_id, aggregation, exclude_column_headers, exclude_report_footer,
            exclude_report_header, REPORT_FILE_FORMAT, return_only_complete_data,
            time, reporting_service, columns
        )
    elif report_type == "budget summary":
        return get_budget_summary_report_request(
            account_id, aggregation, exclude_column_headers, exclude_report_footer,
            exclude_report_header, REPORT_FILE_FORMAT, return_only_complete_data,
            time, reporting_service, columns
        )
    elif report_type == "search query performance":
        return get_search_query_performance_report_request(
            account_id, aggregation, exclude_column_headers, exclude_report_footer,
            exclude_report_header, REPORT_FILE_FORMAT, return_only_complete_data,
            time, reporting_service, columns
        )
    elif report_type == "user location performance":
        return get_user_location_performance_report_request(
            account_id, aggregation, exclude_column_headers, exclude_report_footer,
            exclude_report_header, REPORT_FILE_FORMAT, return_only_complete_data,
            time, reporting_service, columns
        )
    elif report_type == "goals and funnels":
        return get_goals_and_funnels_report_request(
            account_id, aggregation, exclude_column_headers, exclude_report_footer,
            exclude_report_header, REPORT_FILE_FORMAT, return_only_complete_data,
            time, reporting_service, columns
        )
    elif report_type == "ad extension detail":
        return get_ad_extension_detail_report_request(
            account_id, aggregation, exclude_column_headers, exclude_report_footer,
            exclude_report_header, REPORT_FILE_FORMAT, return_only_complete_data,
            time, reporting_service, columns
        )
    elif report_type == "conversion goals detail":
        return get_conversion_goals_detail_report_request(
            account_id, aggregation, exclude_column_headers, exclude_report_footer,
            exclude_report_header, REPORT_FILE_FORMAT, return_only_complete_data,
            time, reporting_service, columns
        )
    elif report_type == "geo location performance":
        return get_geo_location_performance_report_request(
            account_id, aggregation, exclude_column_headers, exclude_report_footer,
            exclude_report_header, REPORT_FILE_FORMAT, return_only_complete_data,
            time, reporting_service, columns
        )
    elif report_type == "age gender audience":
        return get_age_gender_audience_report_request(
            account_id, aggregation, exclude_column_headers, exclude_report_footer,
            exclude_report_header, REPORT_FILE_FORMAT, return_only_complete_data,
            time, reporting_service, columns
        )
    elif report_type == "ad dynamic text performance":
        return get_ad_dynamic_text_performance_report_request(
            account_id, aggregation, exclude_column_headers, exclude_report_footer,
            exclude_report_header, REPORT_FILE_FORMAT, return_only_complete_data,
            time, reporting_service, columns
        )
    else:
        raise ValueError(f"Unknown report_type: " + report_type)


def parse_date(date_str):
    try:
        dt = parser.parse(date_str)
        date_obj = reporting_service.factory.create('Date')
        date_obj.Day = dt.day
        date_obj.Month = dt.month
        date_obj.Year = dt.year
        return date_obj
    except ValueError:
        raise ValueError("Invalid date format: " + date_obj)

# Main execution
if __name__ == '__main__':

    print("Loading the web service client proxies...")

    authorization_data=AuthorizationData(
        account_id={12},
        customer_id={13},
        developer_token=DEVELOPER_TOKEN,
        authentication=None,
    )

    authenticate(authorization_data, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN)

    reporting_service_manager=ReportingServiceManager(
        authorization_data=authorization_data, 
        poll_interval_in_milliseconds=5000, 
        environment=ENVIRONMENT,
    )

    # In addition to ReportingServiceManager, you will need a reporting ServiceClient 
    # to build the ReportRequest.

    reporting_service=ServiceClient(
        service='ReportingService', 
        version=13,
        authorization_data=authorization_data, 
        environment=ENVIRONMENT,
    )
    try:
        report_request = get_report_request({12})
    
        params = ReportingDownloadParameters(
            report_request=report_request,
            overwrite_result_file=True,
            timeout_in_milliseconds=TIMEOUT_IN_MILLISECONDS
        )
        output_status_message("-----\nAwaiting download_report...")
    except WebFault as ex:
        output_webfault_errors(ex)
    except Exception as ex:
        output_status_message(ex)

    download_report(params, reporting_service_manager)



