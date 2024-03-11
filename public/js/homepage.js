
//Function to logout
const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);
  

// WIP Function to add meal to day of the week
const addMealMonday = async () => {

    const meal_name = document.querySelector('#email-login').value.trim();
    const meal_date = document.querySelector('#password-login').value.trim();
  
    if (meal_name && meal_date) {
      const response = await fetch('/api/meals/monday', {
        method: 'POST',
        body: JSON.stringify({ meal_name, meal_date }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to add meal');
      }
    }
  };


  const addMealTuesday = function() {
    console.log("it works")
  }


  const addMealWednesday = function() {
    console.log("it works")
  }


  const addMealThursday = function() {
    console.log("it works")
  }


  const addMealFriday = function() {
    console.log("it works")
  }


  const addMealSaturday = function() {
    console.log("it works")
  }


  const addMealSunday = function() {
    console.log("it works")
  }
