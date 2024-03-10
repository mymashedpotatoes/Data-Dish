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

  /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


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
