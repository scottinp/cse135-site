#!/usr/bin/env python3
import os
from datetime import datetime

ip = os.environ.get("HTTP_X_FORWARDED_FOR", os.environ.get("REMOTE_ADDR", "")).split(",")[0].strip()
now = datetime.now().isoformat(timespec="seconds")

print("Content-Type: text/html; charset=utf-8\n")
print(f"<h1>Hello (Python)</h1><p>language: python</p><p>datetime: {now}</p><p>ip: {ip}</p>")
