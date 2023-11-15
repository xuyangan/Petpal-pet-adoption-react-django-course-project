#!/bin/bash

# Exit on any error
set -e

# Update system packages
echo "Updating system packages..."
sudo apt-get update -y

# Install Python3 and Pip if they are not installed
echo "Installing Python3 and Pip..."
sudo apt-get install python3-pip python3-venv python3-dev -y

# Install the prerequisites for the Python Imaging Library (Pillow)
echo "Installing prerequisites for Pillow..."
sudo apt-get install libjpeg-dev zlib1g-dev libpng-dev libtiff5-dev libjpeg8-dev -y

# Create a virtual environment in the project directory if it doesn't exist
echo "Setting up virtual environment..."
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Upgrade pip to the latest version
echo "Upgrading pip..."
pip install --upgrade pip

# Install required pip packages from requirements.txt
echo "Installing required pip packages from requirements.txt..."
pip install -r requirements.txt

# Navigate to the directory containing manage.py (if necessary)
cd petpal

# Run Django migrations
echo "Running Django migrations..."
python manage.py migrate

# Deactivate the virtual environment
deactivate

echo "Startup script completed."


# #!/bin/bash

# # Exit on any error
# set -e

# # Check if Homebrew is installed, install if it's not
# if ! which brew > /dev/null; then
#     echo "Homebrew not found. Installing Homebrew..."
#     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# fi

# # Update Homebrew packages
# echo "Updating Homebrew packages..."
# brew update

# # Install Python3 and Pip if they are not installed
# echo "Installing Python3 and Pip..."
# brew install python

# # Install the prerequisites for the Python Imaging Library (Pillow)
# echo "Installing prerequisites for Pillow..."
# brew install jpeg zlib libpng libtiff

# # Create a virtual environment in the project directory if it doesn't exist
# echo "Setting up virtual environment..."
# python3 -m venv venv

# # Activate the virtual environment
# source venv/bin/activate

# # Upgrade pip to the latest version
# echo "Upgrading pip..."
# pip install --upgrade pip

# # Install required pip packages from requirements.txt
# echo "Installing required pip packages from requirements.txt..."
# pip install -r requirements.txt

# # Navigate to the directory containing manage.py (if necessary)
# # cd path/to/your/django/project

# # Run Django migrations
# # echo "Running Django migrations..."
# # python manage.py migrate

# # Deactivate the virtual environment
# # deactivate

# echo "Startup script completed."

