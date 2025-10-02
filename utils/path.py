# utils/paths.py
from pathlib import Path
import sys
import os

def get_base_dir():
    """
    Dynamically determines the absolute path to the project's root directory.
    This handles both running from source and running as a frozen executable.
    """
    if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
        # Running as a PyInstaller, cx_Freeze, etc., executable
        return Path(sys._MEIPIPASS).resolve()
    else:
        # Running from source code (e.g., 'python main.py')
        # We assume this script is two levels deep (utils/paths.py) from the root.
        # Adjust '.parent.parent' if this file moves.
        return Path(__file__).resolve().parent.parent

# 1. Define the project's root directory
BASE_DIR = get_base_dir()

def absolute_path(*path_components):
    """
    Generates an absolute path relative to the project root.
    Example: absolute_path("assets", "logo.png") 
    """
    return BASE_DIR.joinpath(*path_components)

# Optionally, you can define constants for key folders:
ASSETS_DIR = absolute_path("assets")
