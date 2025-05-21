import requests
import json

url = "http://localhost:8001/auth/signup"
headers = {"Content-Type": "application/json"}
payload = {
    "email": "alice@example.com",
    "password": "alice123",
    "name": "Alice Smith"
}

response = requests.post(url, headers=headers, data=json.dumps(payload))
print(f"Status code: {response.status_code}")
try:
    print(f"Response: {response.json()}")
except:
    print(f"Raw response: {response.text}")
