#!/usr/bin/env python3
import os

sid = os.environ.get("HTTP_COOKIE","").replace("sid=","")
path = f"/tmp/{sid}.txt"

value = open(path).read() if sid and os.path.exists(path) else "(none)"

print("Content-Type: text/html\n")
print(f"<p>Saved value: {value}</p>")
print('<a href="state-clear-python.py">Clear</a>')
