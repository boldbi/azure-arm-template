import dlt

from github import github_reactions, github_repo_events


def load_duckdb_repo_reactions_issues_only() -> None:
    """Loads issues, their comments and reactions for duckdb"""
    pipeline = dlt.pipeline(
        "{0}",
        destination='{2}',
        staging = {3},
        dataset_name="{0}",
        full_refresh=True,
    )
    # get only 100 items (for issues and pull request)
    {1}


    

if __name__ == "__main__":
    load_duckdb_repo_reactions_issues_only()
    #load_airflow_events()
    # load_dlthub_dlt_all_data()
