import requests
import json

url = "http://localhost:8001/auth/signup"
headers = {"Content-Type": "application/json"}
payload = {
    "email": "bob@example.com",
    "password": "bob123",
    "name": "Bob Smith"
}

try:
    response = requests.post(url, headers=headers, data=json.dumps(payload), timeout=30)
    print(f"Status code: {response.status_code}")
    try:
        print(f"Response: {response.json()}")
    except:
        print(f"Raw response: {response.text}")
except Exception as e:
    print(f"Exception: {e}")
