from ..models import Post
from .. import db
from functools import partial
import json


class ModelHandler:
    db = db

    def __init__(self, Model, path, files, create):
        self.Model = Model
        self.path = path
        self.files = files
        self.create = partial(create, self)


def create_post(self, post_name, post_files):
    content = post_files["post.md"]
    meta = json.loads(post_files["meta.json"])
    del meta["categories"]
    p = Post(url=post_name, content=content, **meta)
    return p


post_handler = ModelHandler(Post, ("posts",), ["post.md", "meta.json"], create_post)
