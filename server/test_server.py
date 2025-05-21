from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Test server running"}

@app.get("/skip-email-verification")
async def skip_email():
    import os
    skip = os.getenv("SKIP_EMAIL_VERIFICATION", "false").lower() == "true"
    return {
        "skip_email_verification": skip,
        "email_username": os.getenv("EMAIL_USERNAME", ""),
        "email_password": os.getenv("EMAIL_PASSWORD", "")
    }

if __name__ == "__main__":
    import os
    os.system("uvicorn test_server:app --host 0.0.0.0 --port 8000")
