from datetime import datetime
from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(
    app, origins=["http://127.0.0.1:3000", "http://localhost:3000"],
)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///eicxv.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


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


@app.route("/read-post/<url>", methods=["GET"])
def read_post(url):
    post = Post.query.get(url)
    if post is None:
        abort(404)
    output = {
        "content": post.content,
        "date_posted": post.date_posted.strftime("%B %d, %Y"),
        "last_edited": post.last_edited.strftime("%B %d, %Y")
        if post.last_edited
        else None,
    }
    return jsonify(output)


@app.route("/read-post-previews", methods=["GET"])
def read_post_preview():
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per-page", 20, type=int)
    posts = Post.query.paginate(page=page, per_page=per_page).items
    keys = ["url", "intro_title", "intro_image", "intro_content"]
    output = [{key: getattr(post, key) for key in keys} for post in posts]
    return jsonify(output)


if __name__ == "__main__":
    app.run(host="0.0.0.0")

