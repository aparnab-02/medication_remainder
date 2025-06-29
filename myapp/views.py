
# views.py
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth import logout
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
import subprocess
from .models import Medication  # Import your model here
def index(request):
    # Your view logic here
    return render(request, 'index.html')


@login_required
@csrf_exempt

def submit_form(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        time = request.POST.get('time')

        # Get the current user
        user = request.user

        # Save data to the database with the user information
        medication = Medication.objects.create(name=name, time=time, user=user)
        # subprocess.Popen(['python', 'main.py'])
        subprocess.Popen(['python', 'main.py', '--username', user.username])
        return JsonResponse({'message': 'Reminder added successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})


@login_required
def index(request):
    username = request.user.username
    return render(request, 'index.html', {'username': username})




def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        # Authenticate user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # User authenticated, log the user in
            login(request, user)
            return redirect('index')
        else:
            # Authentication failed, show error message
            error_message = "Invalid username or password"
            return render(request, 'login.html', {'error_message': error_message})
    return render(request, 'login.html')



def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        # Create user in the main Django User database
        user = User.objects.create_user(username=username, password=password)

        return redirect('login')
    return render(request, 'register.html')

# def user_logout(request):
#     logout(request)
#     return JsonResponse({'message': 'Logged out successfully'})


def waiting_page(request):
    return render(request, 'waiting.html')