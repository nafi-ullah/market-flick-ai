#!/bin/bash

# Define folder names
FOLDER1="responses"
FOLDER2="knowledge_base"
FOLDER3="figures"

# Create folders
mkdir -p "$FOLDER1"
mkdir -p "$FOLDER2"
mkdir -p "$FOLDER3"

# Print success message
echo "Folders created: $FOLDER1, $FOLDER2, $FOLDER3"

# Set up Python virtual environment
VENV_DIR="venv"
if [ ! -d "$VENV_DIR" ]; then
  python3 -m venv "$VENV_DIR"
  echo "Virtual environment created in $VENV_DIR"
else
  echo "Virtual environment already exists in $VENV_DIR"
fi

# Activate virtual environment
source "$VENV_DIR/bin/activate"

# Install requirements if requirements.txt exists
REQUIREMENTS_FILE="requirements.txt"
if [ -f "$REQUIREMENTS_FILE" ]; then
  pip install -r "$REQUIREMENTS_FILE"
  echo "Dependencies installed from $REQUIREMENTS_FILE"
else
  echo "No $REQUIREMENTS_FILE found, skipping dependency installation"
fi

# Deactivate virtual environment
# deactivate

echo "Setup completed!"