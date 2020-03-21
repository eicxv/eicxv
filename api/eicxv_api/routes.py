from flask import request, jsonify, abort
from eicxv_api import app
from eicxv_api.models import Post


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
    print(output)
    return jsonify(output)
