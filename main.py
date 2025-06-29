
import os
import sys
import django
import argparse
import schedule
import datetime
import time
import pyttsx3
import speech_recognition as sr

# Get the parent directory by getting the dirname of the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)

# Add the parent directory to the Python path
sys.path.append(parent_dir)

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myproject.settings")

# Configure Django settings
django.setup()

# Now you can import your models
from myapp.models import Medication
from django.contrib.auth.models import User

# Parse command line arguments
parser = argparse.ArgumentParser()
parser.add_argument('--username', type=str, help='Username of the logged-in user')
args = parser.parse_args()

if args.username:
    print("Username from login:", args.username)
else:
    print("No username provided from login")


def speak(text, rate=130):
    """Converts text to speech."""
    engine = pyttsx3.init()
    # Set speech rate
    engine.setProperty('rate', rate)
    engine.say(text)
    engine.runAndWait()


def schedule_reminders():
    # Get the current user
    current_user = User.objects.get(username=args.username)  # Retrieve the user by username
    print("Current user:", current_user.username)  # Print current user for debugging

    # Filter medications for the current user with 'taken' set to False
    medications = Medication.objects.filter(user=current_user, taken=False)
    print("Medications for current user:", medications)  # Print medications for debugging

    for medication in medications:
        # Debugging statements
        print("Medication name:", medication.name)
        print("Medication time:", medication.time)
        print("Medication taken:", medication.taken)

        # Extract hour and minute from time field
        hour = medication.time.hour
        minute = medication.time.minute

        # Convert name to string
        medication_name = str(medication.name)

        # Schedule reminder using 24-hour format
        schedule.every().day.at(f"{hour:02d}:{minute:02d}").do(
            lambda: speak(f"Its Time to take medicine {medication.name}!")
        )

        # Mark medication as taken
        medication.taken = True
        medication.save()


if __name__ == "__main__":
    print("entered main")
    # Start the scheduling thread
    schedule_reminders()
    # The script will continue to run the schedule in the background
    while True:
        schedule.run_pending()
        time.sleep(1)
