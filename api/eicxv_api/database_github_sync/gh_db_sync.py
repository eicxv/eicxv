import requests
from ..models import Post


class GithubDatabaseSync:
    def __init__(self, user, repo, token, db, content_handlers):
        self.user = user
        self.repo = repo
        self.token = token
        self.db = db
        self.content_handlers = {handler.path: handler for handler in content_handlers}
        self.session = requests.Session()
        self.session.auth = (user, token)

    def _run_graphql_query(self, query, variables):  # github GraphQL api
        request = self.session.post(
            "https://api.github.com/graphql",
            json={"query": query, "variables": variables},
        )
        if request.status_code == 200:
            return request.json()
        else:
            raise Exception(
                f"Query failed to run by returning code of {request.status_code}. {query}"
            )

    def _get_repo_data(self, rev="master"):
        # GraphQL query
        query = """
                query ($rev: String, $owner: String!, $repo: String!) {
                    repository(owner: $owner, name: $repo) {
                    name
                    object(expression: $rev) {
                    ... on Blob {
                        text
                    }
                    ... on Tree {
                        entries {
                        name
                        object {
                            ... on Blob {
                            text
                            }
                            ... on Tree {
                            entries {
                                name
                                object {
                                ... on Blob {
                                    text
                                }
                                ... on Tree {
                                    entries {
                                    name
                                    object {
                                        ... on Blob {
                                        text
                                        }
                                    }
                                    }
                                }
                                }
                            }
                            }
                        }
                        }
                    }
                    }
                    }
                    }
                """
        variables = {"rev": f"{rev}:", "owner": self.user, "repo": self.repo}

        result = self._run_graphql_query(query, variables)
        return self._format_result(result)

    def _format_result(self, result):
        def format_folder(folder):
            graph = {}
            for obj in folder:
                try:
                    graph[obj["name"]] = format_folder(obj["object"]["entries"])
                except KeyError:
                    graph[obj["name"]] = obj["object"]["text"]
            return graph

        return format_folder([result["data"]["repository"]])

    def drop_and_add_all_content(self, rev="master"):
        repo = self._get_repo_data(rev=rev)
        content = []
        for handler in self.content_handlers.values():
            handler_folder = repo[self.repo]
            for folder in handler.path:
                handler_folder = handler_folder[folder]
            for folder_name, files in handler_folder.items():
                content.append(handler.create(folder_name, files))
        self.db.drop_all()
        self.db.create_all()
        self.db.session.add_all(content)
        self.db.session.commit()
