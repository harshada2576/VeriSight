
```markdown
# 💰 OptiRupe: Desktop Finance Manager

**OptiRupe** is a desktop-based personal finance and expense management application designed to help users **track, analyze, and optimize** their spending and achieve financial goals.

The name **OptiRupe** is a portmanteau of **Optimize** and **Rupee (₹)**, reflecting its core purpose: helping Indian users make smarter financial decisions.

---

## 🚀 Key Features

- **🔐 User Authentication** – Secure login and user management system, backed by the `auth_service.py` service layer.
- **📊 Data Tracking** – Functionality to track income, expenses, products, and assets (inferred from `models/product` and `seed_data.py`).
- **🗄️ Robust Storage** – Uses **PostgreSQL** for secure and reliable persistence, configured via `.env`.
- **🌱 Database Seeding** – Easily load initial data using the `data/seed_data.py` script.
- **🖥️ Intuitive Desktop Interface** – Built as a standalone desktop app using a UI definition file for the login screen.

---

## 🛠️ Technology Stack

| Component            | Technology                  |
|----------------------|-----------------------------|
| **Backend Language** | Python                      |
| **Database**         | PostgreSQL                  |
| **ORM**              | SQLAlchemy                  |
| **GUI Framework**    | Likely PyQt / PySide        |

---

## ⚙️ Installation & Setup

Follow these steps to set up OptiRupe locally:

### 1. Prerequisites

- Python **3.x** (recommended)
- PostgreSQL (installed & running)

### 2. Clone the Repository

```bash
git clone https://github.com/harshada2576/optirupe.git
cd optirupe
```

### 3. Setup Virtual Environment

```bash
python -m venv venv
# Activate environment
source venv/bin/activate    # On Linux/Mac
# venv\Scripts\activate     # On Windows
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
# The project requires psycopg2 for PostgreSQL.
# Note: Install additional GUI framework dependencies if required (e.g., PyQt5 / PySide2)
```

### 5. Configure Database

Create a `.env` file in the project root:

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/opti_rupe
```

Replace `yourpassword` with your actual PostgreSQL password.

### 6. Initialize Database

```bash
python main.py
```

This runs `main.py` to create all required database tables (users, products, etc.).

### 7. (Optional) Seed Initial Data

```bash
python data/seed_data.py
```

### ▶️ Running the Application

Run the main application file to start the GUI:

```bash
python app.py
```

> Note: If your main GUI loop is in `main.py`, use `python main.py` instead.

---

## 📂 Project Structure Breakdown

| Folder / File     | Purpose                        | Key Files                          |
|-------------------|--------------------------------|------------------------------------|
| Root Files        | Configuration & Setup          | `database.py`, `main.py`, `.env`, `requirements.txt`, `LICENSE` |
| `assets/`         | Static Media & Branding        | `logo.png`, `icon.jpeg`            |
| `data/`           | Initial Data                   | `seed_data.py`                     |
| `models/`         | Database Schemas (ORM)         | `user.py`                          |
| `services/`       | Business Logic Layer           | `auth_service.py`                  |
| `views/ui/`       | User Interface Definitions     | `login.ui`                         |

---

## 📄 License & Author

This project is licensed under the **MIT License**.

© 2025 Harshada Avhad

**Author**: Harshada Avhad, Developer & Creator of OptiRupe
```
