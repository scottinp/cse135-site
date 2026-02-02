#!/usr/bin/env python3
import os

sid = os.environ.get("HTTP_COOKIE","").replace("sid=","")
path = f"/tmp/{sid}.txt"

if os.path.exists(path):
    os.remove(path)

print("Set-Cookie: sid=; Max-Age=0")
print("Location: state-set-python.py\n")
