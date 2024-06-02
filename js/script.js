// /*
// Treehouse Techdegree:
// FSJS Project 2 - Data Pagination and Filtering
// */

// /*
// For assistance:
//    Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
//    Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
// */

// /*
// Create the `showPage` function
// This function will create and insert/append the elements needed to display a "page" of nine students
// */

// /*
// Create the `addPagination` function
// This function will create and insert/append the elements needed for the pagination buttons
// */

// // Call functions



console.log(data);


// Function to display a page of students
function showPage(list, page) {
   // Calculate the index for the first and last student on the page
   const itemsPerPage = 9;
   const startIndex = (page - 1) * itemsPerPage;
   const endIndex = Math.min(startIndex + itemsPerPage - 1, list.length - 1);

   // Select the element with a class of `student-list` and assign it to a variable
   const studentList = document.querySelector('.student-list');

   // Set the innerHTML property of the `studentList` variable to an empty string
   studentList.innerHTML = '';

   // Loop over the list of students to display
   for (let i = startIndex; i <= endIndex; i++) {
      // Create the elements needed to display the student information
      const studentItem = document.createElement('li');
      const studentDetails = `
         <div class="student-details">
            <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
            <h3 class="name">${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
         </div>
      `;
      // Set the innerHTML of the studentItem to the studentDetails
      studentItem.innerHTML = studentDetails;
      // Append the studentItem to the studentList
      studentList.appendChild(studentItem);
   }
}

// Function to add pagination buttons
function addPagination(list) {
   // Calculate the number of pages needed
   const itemsPerPage = 9;
   const numOfPages = Math.ceil(list.length / itemsPerPage);

   // Select the element with a class of `link-list` and assign it to a variable
   const linkList = document.querySelector('.link-list');

   // Set the innerHTML property of the variable you just created to an empty string
   linkList.innerHTML = '';

   // Loop over the number of pages needed
   for (let i = 1; i <= numOfPages; i++) {
      // Create the elements needed to display the pagination button
      const button = `
         <li>
            <button type="button">${i}</button>
         </li>
      `;
      // Insert the above elements
      linkList.insertAdjacentHTML('beforeend', button);
   }

   // Give the first pagination button a class of "active"
   const firstButton = linkList.querySelector('button');
   firstButton.classList.add('active');

   // Create an event listener on the `link-list` element
   linkList.addEventListener('click', (event) => {
      // If the click target is a button
      if (event.target.tagName === 'BUTTON') {
         const clickedButton = event.target;
         const activeButton = linkList.querySelector('.active');

         // Remove the "active" class from the previous button
         activeButton.classList.remove('active');
         // Add the active class to the clicked button
         clickedButton.classList.add('active');
         // Call the showPage function passing the `list` parameter and page to display as arguments
         showPage(list, parseInt(clickedButton.textContent));
      }
   });
}

// Search functionality
document.getElementById('searchButton').addEventListener('click', function() {
   const searchInput = document.getElementById('search').value.trim().toLowerCase();
   const filteredList = data.filter(student => {
      const fullName = `${student.name.first.toLowerCase()} ${student.name.last.toLowerCase()}`;
      return fullName.includes(searchInput);
   });
   showPage(filteredList, 1);
   addPagination(filteredList);
});

// Call the showPage function to display the first page of students
showPage(data, 1);
// Call the addPagination function to create pagination buttons
addPagination(data);



