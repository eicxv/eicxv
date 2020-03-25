import requests
from ..models import Post
import json


class GithubDatabaseSync:
    def __init__(self, user, repo, token, db):
        self.user = user
        self.repo = repo
        self.token = token
        self.db = db
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

    def _get_all_post_data(self, rev="master"):
        # GraphQL query
        query = """
                query ($rev: String, $owner: String!, $repo: String!) {
                repository(owner: $owner, name: $repo) {
                    object(expression: $rev) {
                    ... on Tree {
                        entries {
                        name
                        object {
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
                """
        variables = {"rev": f"{rev}:posts/", "owner": self.user, "repo": self.repo}

        result = self._run_graphql_query(query, variables)
        return self._format_posts(result)

    def _format_posts(self, result):
        folders = result["data"]["repository"]["object"]["entries"]
        result = {
            folder["name"]: {
                file_["name"]: file_["object"]["text"]
                for file_ in folder["object"]["entries"]
            }
            for folder in folders
        }
        return result

    def drop_and_add_all_posts(self, rev="master"):
        self.db.drop_all()
        self.db.create_all()
        posts = self._get_all_post_data(rev=rev)
        for post_name, post_data in posts.items():
            content = post_data["post.md"]
            meta = json.loads(post_data["meta.json"])
            del meta["categories"]
            p = Post(url=post_name, content=content, **meta)
            self.db.session.add(p)
        self.db.session.commit()
