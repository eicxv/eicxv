import os


class BaseConfig:
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = "sqlite://"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_WHITELIST = []


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///eicxv.db"
    CORS_WHITELIST = ["http://127.0.0.1:3000", "http://localhost:3000"]


class ProductionConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = "sqlite://"
    CORS_WHITELIST = ["http://eicxv.com/", "http://www.eicxv.com/"]


config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": ProductionConfig,
}


def configure_app(app):
    config_name = os.getenv("FLASK_ENV", "default")
    app.config.from_object(config[config_name])
