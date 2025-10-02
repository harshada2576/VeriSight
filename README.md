OptiRupe
OptiRupe is a desktop-based personal finance and expense management application designed to help users effectively track and optimize their spending and financial goals.

The name "OptiRupe" is a portmanteau of Optimize and Rupee (₹), reflecting its purpose to help Indian users optimize their finances.

🚀 Key Features
User Authentication: Secure login and user management system.

Data Tracking: Functionality to track financial data, including products or assets (inferred from models/product and seed_data.py).

Robust Data Storage: Utilizes PostgreSQL for reliable and secure data persistence.

Database Seeding: Initial data can be loaded easily using a dedicated seeding script.

Intuitive Desktop Interface: Built as a standalone desktop application for a fluid user experience (indicated by views/ui/login.ui and project scope).

🛠️ Technology Stack
Backend Language: Python

Database: PostgreSQL

Database ORM: SQLAlchemy

GUI Framework: Likely a Python desktop framework like PyQt or PySide (inferred from .ui file and project type)

💻 Setup and Installation
Follow these steps to get your local copy of OptiRupe up and running.

1. Prerequisites
Python (3.x recommended)

PostgreSQL installed and running

2. Clone the Repository
Bash

git clone https://github.com/harshada2576/optirupe.git
cd optirupe
3. Environment Setup
It is highly recommended to use a virtual environment:

Bash

python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
4. Install Dependencies
The project uses psycopg2 for PostgreSQL connectivity.

Bash

pip install -r requirements.txt
# Note: You may need to install other dependencies for the GUI framework (e.g., PyQt5/PySide2)
5. Database Configuration
Create a file named .env in the root directory to store your database credentials.

The current configuration points to a local PostgreSQL instance.

Replace yourpassword with your actual PostgreSQL password.

.env

DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/opti_rupe
6. Initialize the Database
Run the main file to create the necessary tables (users, products, etc.) defined in your models:

Bash

python main.py
7. Seed Initial Data (Optional)
If you have a seed_data.json file, you can populate your database with initial data:

Bash

python data/seed_data.py
▶️ Running the Application
(This step will depend on your chosen GUI framework. Assuming a standard entry point.)

Run the main application file:

Bash

# Example command, adjust based on your final main application file
python app.py
(If your main application logic is in main.py, the command would be python main.py, but it currently only handles database creation.)

🖼️ Logo & Icon
The project logo and icon can be found in the assets/ directory:

Logo: assets/logo.png

Icon: assets/icon.jpeg

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

Copyright (c) 2025 Harshada Avhad.

🧑‍💻 Author
Harshada Avhad