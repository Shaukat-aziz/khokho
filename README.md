This folder contains a static HTML/CSS/JS replica of the demo gym site.

Run locally with Python + Flask:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install flask
python app.py
```

Open http://localhost:5000

The contact form is handled by a minimal Flask endpoint that only logs submissions.
