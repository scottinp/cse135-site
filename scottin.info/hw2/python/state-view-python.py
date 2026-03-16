#!/usr/bin/env python3
import os
from http import cookies

c = cookies.SimpleCookie(os.environ.get("HTTP_COOKIE", ""))
sid = c["sid"].value if "sid" in c else ""
path = f"/tmp/state_{sid}.txt"

value = "(none)"
if sid and os.path.exists(path):
    with open(path) as f:
        value = f.read()

print("Content-Type: text/html; charset=utf-8")
print()
print(f"<p>Saved value: {value}</p>")
print('<p><a href="state-set-python.py">Back</a></p>')
print('<p><a href="state-clear-python.py">Clear</a></p>')
