from datetime import datetime
from eicxv_api import db


class Post(db.Model):
    url = db.Column(db.String(120), primary_key=True)
    intro_title = db.Column(db.String(120), nullable=False)
    intro_image = db.Column(db.String(120))
    intro_content = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    last_edited = db.Column(db.DateTime, default=None)

    def __init__(self, **kwargs):
        url = kwargs["intro_title"].strip().lower().replace(" ", "-")
        super().__init__(url=url, **kwargs)

    def __repr__(self):
        return f"Post({self.intro_title}, {self.url}, {self.date_posted})"

