import requests
import json

url = "http://localhost:8000/auth/login"
headers = {"Content-Type": "application/json"}
payload = {
    "email": "bob@example.com",
    "password": "bob123"
}

try:
    response = requests.post(url, headers=headers, data=json.dumps(payload), timeout=30)
    print(f"Status code: {response.status_code}")
    try:
        print(f"Response: {response.json()}")
    except Exception:
        print(f"Raw response: {response.text}")
except Exception as e:
    print(f"Exception: {e}")
