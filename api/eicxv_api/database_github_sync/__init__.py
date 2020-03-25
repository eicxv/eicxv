from .gh_db_sync import GithubDatabaseSync
from .. import app
from .. import db

user = app.config["GITHUB_USER"]
repo = app.config["GITHUB_DB_REPO"]
token = app.config["GITHUB_TOKEN"]

db_sync = GithubDatabaseSync(user, repo, token, db)
