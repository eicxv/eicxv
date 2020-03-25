from setuptools import setup

setup(
    name="eicxv_api",
    version="0.0.1",
    packages=["eicxv_api",],
    license="GNU GENERAL PUBLIC LICENSE v3",
    python_requires=">=3.7",
    install_requires=[
        "Flask>=1.1.1",
        "Flask-SQLAlchemy>=2.4.1",
        "Flask-Cors>=3.0.8",
        "requests>=2.23.0",
    ],
)
