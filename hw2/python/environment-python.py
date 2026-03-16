#!/usr/bin/env python3
import os

print("Content-Type: text/html; charset=utf-8\n")
print("<h1>Environment (Python)</h1><pre>")
for k in sorted(os.environ):
    print(f"{k}={os.environ[k]}")
print("</pre>")
