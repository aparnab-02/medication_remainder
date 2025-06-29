document.addEventListener('DOMContentLoaded', function() {
    const addReminderForm = document.getElementById('add-reminder-form');

    addReminderForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const time = document.getElementById('time').value;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('time', time);

        fetch('/submit_form/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data);
            alert('Reminder set');
            // Reload the page
            window.location.href =  "/waiting_page/";
            // location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error response
        });
    });

    // Function to get CSRF token from cookie
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});


