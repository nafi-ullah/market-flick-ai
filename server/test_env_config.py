import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Print all environment variables
print("Environment Variables:")
for key, value in os.environ.items():
    print(f"{key}: {value}")

# Print specific variables we're interested in
print("\nAuth-related Environment Variables:")
variables = [
    "JWT_SECRET_KEY",
    "JWT_ALGORITHM",
    "ACCESS_TOKEN_EXPIRE_MINUTES",
    "EMAIL_SENDER",
    "EMAIL_SERVER",
    "EMAIL_PORT",
    "EMAIL_USERNAME",
    "EMAIL_PASSWORD",
    "FRONTEND_URL",
    "SKIP_EMAIL_VERIFICATION"
]

for var in variables:
    print(f"{var}: {os.getenv(var, 'Not set')}")

print("\nSKIP_EMAIL_VERIFICATION is set to:", os.getenv("SKIP_EMAIL_VERIFICATION", "Not set"))
print("Which evaluates to:", os.getenv("SKIP_EMAIL_VERIFICATION", "false").lower() == "true")
