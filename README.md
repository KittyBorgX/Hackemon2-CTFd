# Hackemon 2.0 CTFd

### Deploy locally:

Using `uv`: 

1. Make a virtual env: 
```
uv venv --python=3.11
source .venv/bin/activate
```

2. Install dependencies: 
```
uv pip install -r requirements.txt
```

3. Either `python serve.py` or `uv run serve.py` in a terminal to drop into debug mode.

### Deploy prod:

You can use the auto-generated Docker images with the following command:

`docker run -p 8000:8000 -it ctfd/ctfd`

Or you can use Docker Compose with the following command from the source repository:

`docker compose up`

Check out the [CTFd docs](https://docs.ctfd.io/) for [deployment options](https://docs.ctfd.io/docs/deployment/installation) and the [Getting Started](https://docs.ctfd.io/tutorials/getting-started/) guide
