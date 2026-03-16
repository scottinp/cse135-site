#!/usr/bin/env python3
import os, sys, uuid, urllib.parse
from http import cookies

c = cookies.SimpleCookie(os.environ.get("HTTP_COOKIE", ""))
sid = c["sid"].value if "sid" in c else uuid.uuid4().hex
path = f"/tmp/state_{sid}.txt"

method = os.environ.get("REQUEST_METHOD", "GET")

if method == "POST":
    length = int(os.environ.get("CONTENT_LENGTH", "0"))
    body = sys.stdin.read(length)
    value = urllib.parse.parse_qs(body).get("value", [""])[0]

    with open(path, "w") as f:
        f.write(value)

    print("Content-Type: text/html; charset=utf-8")
    print(f"Set-Cookie: sid={sid}; Path=/hw2/python")
    print("Location: state-view-python.py")
    print()
else:
    print("Content-Type: text/html; charset=utf-8")
    print(f"Set-Cookie: sid={sid}; Path=/hw2/python")
    print()
    print("""
      <form method="POST" action="state-set-python.py">
        <input name="value">
        <button>Save</button>
      </form>
      <p><a href="state-view-python.py">View saved value</a></p>
    """)
