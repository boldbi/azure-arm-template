from typing import List, Set

import questionary

from .parser.endpoint_collection import Endpoints, Endpoint


def questionary_endpoint_selection(endpoints: Endpoints) -> Set[str]:
    """Endpoint selection with questionary. Returns a Set of endpoint names"""
    choices: List[Endpoint] = []
    prev_table_name = ""
    for endpoint in endpoints.all_endpoints_to_render:
        if prev_table_name != endpoint.table_name:
            choices.append(endpoint.table_name)
        prev_table_name = endpoint.table_name

    selected_endpoints: List[Endpoint] = []
    for endpoint in endpoints.all_endpoints_to_render:
        selected_endpoints.append(endpoint)

        # for tag, collection in endpoints.endpoints_by_tag.items():
        #     if not collection.endpoints_to_render:
        #         continue
        #     choices.append(questionary.Separator(f"\n{tag} endpoints:\n"))
        # for endpoint in collection.endpoints_to_render:
        # text = [("bold", str(endpoint.python_name))]  # , ("italic fg:ansigray", f" {endpoint.path}")]

    selected_names = set()
    for ep in selected_endpoints:
        selected_names.add(ep.name)
        if ep.transformer and ep.parent:
            # TODO: Generalize traversing ancestry chain
            selected_names.add(ep.parent.name)
    return selected_names