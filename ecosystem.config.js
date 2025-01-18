module.exports = {
  apps : [{
    name: "server",
    script: "cd server && source venv/bin/activate && uvicorn main:app --host 0.0.0.0 --port 8000",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }, {
     name: 'client',
     script: 'cd client && npm run start'
  }]
}

