from .gh_db_sync import GithubDatabaseSync
from .model_handlers import post_handler
from .. import app
from .. import db

user = app.config["GITHUB_USER"]
repo = app.config["GITHUB_DB_REPO"]
token = app.config["GITHUB_TOKEN"]

db_sync = GithubDatabaseSync(user, repo, token, db, [post_handler])
