# OptiRupe

OptiRupe is a financial management application designed to help users manage products, investments, transactions, and analytics efficiently. The project is modular, with clear separation between models, controllers, services, views, and utilities.

## Features

- User authentication and management
- Product management (CRUD operations)
- Investment tracking and analytics
- Transaction history and reporting
- Chatbot for user assistance
- Modern UI built with Qt Designer (`.ui` files)
- Seed data for easy setup and testing

## Project Structure

```
assets/         # Images and icons
controllers/    # Business logic for products and users
data/           # Seed data scripts
models/         # Data models for products and users
services/       # Authentication and other services
utils/          # Helper functions, logging, validation
views/          # UI forms and main window
views/ui/       # Qt Designer .ui files for all screens
tests/          # Unit tests for models and controllers
config.py       # Configuration settings
database.py     # Database setup and connection
main.py         # Application entry point
requirements.txt# Python dependencies
setup.py        # Project setup script
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/harshada2576/OptiRupe.git
   cd OptiRupe
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. (Optional) Seed the database:
   ```bash
   python data/seed_data.py
   ```

## Usage

Run the application:
```bash
python main.py
```

## Testing

Run unit tests:
```bash
python -m unittest discover tests
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the terms of the LICENSE file.
