#!/usr/bin/env python3
import os, json
from datetime import datetime

ip = os.environ.get("HTTP_X_FORWARDED_FOR", os.environ.get("REMOTE_ADDR", "")).split(",")[0].strip()
now = datetime.now().isoformat(timespec="seconds")

print("Content-Type: application/json; charset=utf-8\n")
print(json.dumps({"language":"python","datetime":now,"ip":ip}))
