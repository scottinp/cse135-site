#!/usr/bin/env python3
import os, uuid

sid = os.environ.get("HTTP_COOKIE","").replace("sid=","") or str(uuid.uuid4())
path = f"/tmp/{sid}.txt"

if os.environ["REQUEST_METHOD"] == "POST":
    length = int(os.environ.get("CONTENT_LENGTH","0"))
    data = os.read(0, length).decode()
    open(path,"w").write(data.split("=")[1])
    print(f"Set-Cookie: sid={sid}")
    print("Location: state-view-python.py\n")
else:
    print("Content-Type: text/html\n")
    print('<form method="POST"><input name="value"><button>Save</button></form>')
