from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from eicxv_api.config import configure_app

app = Flask(__name__)
configure_app(app)
CORS(app, origins=app.config["CORS_WHITELIST"])
db = SQLAlchemy(app)

from eicxv_api import routes
