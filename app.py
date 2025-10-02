import sys
from PyQt6.QtWidgets import QApplication, QMainWindow, QMessageBox
from PyQt6.QtGui import QIcon
from views.ui.login.ui import Ui_MainWindow 
from services.auth_service import get_user_by_email
from utils.path import absolute_path # Your robust path utility

class LoginWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        
        # Load the compiled UI
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        
        # Set Window Properties using Absolute Paths
        self.setWindowTitle("OptiRupe - Login")
        
        # Load the application icon using the absolute_path utility
        app_icon_path = absolute_path("assets", "icon.jpeg")
        self.setWindowIcon(QIcon(str(app_icon_path)))

        # Connect Signals (Buttons/Actions) to Slots (Methods)
        # You will need to design your button and input fields in login.ui
        # self.ui.login_button.clicked.connect(self.handle_login)

    def handle_login(self):
        # Example of connecting UI inputs to your service layer
        email = self.ui.email_input.text() 
        
        user = get_user_by_email(email)

        if user:
            QMessageBox.information(self, "Success", f"Welcome, {user.name}!")
            # Code to open the main application dashboard
        else:
            QMessageBox.warning(self, "Error", "Invalid email or password.")
            
if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = LoginWindow()
    window.show()
    sys.exit(app.exec())