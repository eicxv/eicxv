from distutils.core import setup

setup(
    name="eicxv_api",
    version="1.0.0",
    packages=["eicxv_api",],
    license="GNU GENERAL PUBLIC LICENSE v3",
    python_requires=">=3.7",
    install_requires=["Flask>=1.1.1", "Flask-Cors>=3.0.8"],
)
