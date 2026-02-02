import os, json, sys, urllib.parse
from datetime import datetime, timezone

def now_iso():
    return datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")

def client_ip():
    xff = os.environ.get("HTTP_X_FORWARDED_FOR", "")
    if xff:
        return xff.split(",")[0].strip()
    return os.environ.get("REMOTE_ADDR", "")

def hostname():
    return os.uname().nodename

def user_agent():
    return os.environ.get("HTTP_USER_AGENT", "")

def method():
    return os.environ.get("REQUEST_METHOD", "GET").upper()

def read_raw_body():
    try:
        length = int(os.environ.get("CONTENT_LENGTH") or "0")
    except ValueError:
        length = 0
    return sys.stdin.read(length) if length > 0 else ""

def parse_query():
    qs = os.environ.get("QUERY_STRING", "")
    parsed = urllib.parse.parse_qs(qs, keep_blank_values=True)
    return {k: (v[0] if len(v)==1 else v) for k, v in parsed.items()}

def parse_body(raw):
    ctype = (os.environ.get("CONTENT_TYPE") or "").split(";")[0].strip().lower()
    if not raw:
        return {"content_type": ctype, "parsed": {}, "raw": ""}

    if ctype == "application/json":
        try:
            return {"content_type": ctype, "parsed": json.loads(raw), "raw": raw}
        except json.JSONDecodeError:
            return {"content_type": ctype, "parsed": {}, "raw": raw, "error": "invalid_json"}

    if ctype == "application/x-www-form-urlencoded":
        parsed = urllib.parse.parse_qs(raw, keep_blank_values=True)
        parsed = {k: (v[0] if len(v)==1 else v) for k, v in parsed.items()}
        return {"content_type": ctype, "parsed": parsed, "raw": raw}

    # fallback
    return {"content_type": ctype, "parsed": {}, "raw": raw}

def send_json(obj, status="200 OK"):
    print(f"Status: {status}")
    print("Content-Type: application/json; charset=utf-8")
    print()
    print(json.dumps(obj, indent=2, ensure_ascii=False))

def send_html(html, status="200 OK"):
    print(f"Status: {status}")
    print("Content-Type: text/html; charset=utf-8")
    print()
    print(html)
