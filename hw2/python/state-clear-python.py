#!/usr/bin/env python3
import os
from http import cookies

c = cookies.SimpleCookie(os.environ.get("HTTP_COOKIE", ""))
sid = c["sid"].value if "sid" in c else ""
path = f"/tmp/state_{sid}.txt"

if sid and os.path.exists(path):
    os.remove(path)

print("Set-Cookie: sid=; Path=/hw2/python; Max-Age=0")
print("Location: state-set-python.py")
print()
