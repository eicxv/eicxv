from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(
    app, origins=["http://127.0.0.1:3000", "http://localhost:3000"],
)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///eicxv.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

from eicxv_api import routes
