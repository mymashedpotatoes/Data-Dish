const newUserFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#new-username').value;
    const email = document.querySelector('#new-email').value.trim();
    const password = document.querySelector('#new-password').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users/newUser', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create account');
      }
    }
  };

  document
    .querySelector('.newUser-form')
    .addEventListener('submit', newUserFormHandler);
  