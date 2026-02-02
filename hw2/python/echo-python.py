#!/usr/bin/env python3
import os, sys
from datetime import datetime

method = os.environ.get("REQUEST_METHOD", "")
qs = os.environ.get("QUERY_STRING", "")
ctype = os.environ.get("CONTENT_TYPE", "")
ua = os.environ.get("HTTP_USER_AGENT", "")
ip = os.environ.get("HTTP_X_FORWARDED_FOR", os.environ.get("REMOTE_ADDR", "")).split(",")[0].strip()
host = os.environ.get("SERVER_NAME", "")
now = datetime.now().isoformat(timespec="seconds")

try:
    n = int(os.environ.get("CONTENT_LENGTH", "0"))
except ValueError:
    n = 0
body = sys.stdin.read(n) if n > 0 else ""

print("Content-Type: text/plain; charset=utf-8\n")
print(f"hostname: {host}")
print(f"datetime: {now}")
print(f"ip: {ip}")
print(f"user-agent: {ua}")
print(f"method: {method}")
print(f"query: {qs}")
print(f"content-type: {ctype}")
print("body:")
print(body)
