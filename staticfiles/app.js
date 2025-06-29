// document.addEventListener('DOMContentLoaded', function() {
//     const addReminderForm = document.getElementById('add-reminder-form');

//     addReminderForm.addEventListener('submit', function(e) {
//         e.preventDefault();

//         const name = document.getElementById('name').value;
//         const time = document.getElementById('time').value;

//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('time', time);

//         fetch('/submit_form/', {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 'X-CSRFToken': getCookie('csrftoken')
//             }
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Response:', data);
//             alert('Reminder set');
//             // Reload the page
//             location.reload();
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             // Handle error response
//         });
//     });

//     // Function to get CSRF token from cookie
//     function getCookie(name) {
//         let cookieValue = null;
//         if (document.cookie && document.cookie !== '') {
//             const cookies = document.cookie.split(';');
//             for (let i = 0; i < cookies.length; i++) {
//                 const cookie = cookies[i].trim();
//                 if (cookie.startsWith(name + '=')) {
//                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                     break;
//                 }
//             }
//         }
//         return cookieValue;
//     }
// });


// document.addEventListener('DOMContentLoaded', function() {
//     const addReminderForm = document.getElementById('add-reminder-form');

//     addReminderForm.addEventListener('submit', function(e) {
//         e.preventDefault();

//         const name = document.getElementById('name').value;
//         const time = document.getElementById('time').value;

//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('time', time);

//         fetch('/submit_form/', {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 'X-CSRFToken': getCookie('csrftoken')
//             }
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Response:', data);
//             alert('Reminder set');
//             // Logout the user
//             fetch('/user_logout/', {
//                 method: 'POST',
//                 headers: {
//                     'X-CSRFToken': getCookie('csrftoken')
//                 }
//             })
//             .then(response => {
//                 if (response.ok) {
//                     // Logout successful, redirect to the login page
//                     window.location.href = '/login/';
//                 } else {
//                     console.error('Logout failed');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             // Handle error response
//         });
//     });

//     // Function to get CSRF token from cookie
//     function getCookie(name) {
//         let cookieValue = null;
//         if (document.cookie && document.cookie !== '') {
//             const cookies = document.cookie.split(';');
//             for (let i = 0; i < cookies.length; i++) {
//                 const cookie = cookies[i].trim();
//                 if (cookie.startsWith(name + '=')) {
//                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                     break;
//                 }
//             }
//         }
//         return cookieValue;
//     }
// });

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
  
        // Trigger Django logout by sending a POST request
        fetch('/user_logout/', {
          method: 'POST',
          headers: {
            'X-CSRFToken': getCookie('csrftoken')
          }
        })
        .then(logoutResponse => {
          console.log('Logout response:', logoutResponse);
          // Handle successful logout response (optional)
          alert('You have been logged out.');
  
          // Redirect to login page after successful logout
          window.location.href = '/login/';
        })
        .catch(logoutError => {
          console.error('Logout error:', logoutError);
          // Handle logout error (optional)
        });
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
  
  