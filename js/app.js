/*
	
Author: Mason Embry, mason@embrycode.com
Created: 9/19/2016

Tested on current versions of Chrome, Safari, and Firefox.
	
*/

var $students = $(".student-list li"); // All students regardless of search selection.
var searchResults = $students; // All students selected by search. Initialized as all students.
var studentsPerPage = 10; // Entered here as variable so it can be changed if desired.
var $studentName = $(".student-details h3"); // Find h3 containing student name.
var $studentEmail = $(".email"); // Find student email.
var $rangeIndicator = $('<div id="range-indicator"></div>'); // Initialize range indicator div.



// Create search div.
var $searchDiv = $('<div class="student-search"></div>');
var $searchInput = $('<input placeholder="Search for students...">');
var $searchButton = $('<button>Search</button>');
$searchDiv.append($searchInput);
// $searchDiv.append($searchButton); // No need for the search button with instant search results.
$(".page-header").append($searchDiv);

// Create (or update) pagination div.
var createPaginationDiv = function() {
	// First, remove previous pagination div.
	$(".pagination").remove();
	
	// Calculate number of pages necessary.
	var necessaryPages = Math.ceil(searchResults.length / studentsPerPage);
	
	// Initialize new elements to build pagination div.	
	var $paginationDiv = $('<div class="pagination"></div>')
	var $paginationUl = $('<ul></ul>');
	var $paginationLi;
	var $paginationLink;
	
	// No pagination div created if only one page necessary.
	if (necessaryPages > 1) {
		
		// Append ul outside of loop.
		$paginationDiv.append($paginationUl);
		
		// Loop to create li and a.
		for (var i = 0; i < necessaryPages; i++) {
			$paginationLi = $('<li></li>');
			$paginationLink = $('<a href=#>' + (i + 1) + '</a>') // Uses i to create page link label.
			
			// First link created has .active class
			if (i === 0) {
				$paginationLink.addClass("active");
			}
			
			$paginationLi.append($paginationLink);
			$paginationUl.append($paginationLi);
			
			// Set click handler on each link 
			$paginationLink.click(setActivePage);
		}
		
		$(".student-list").append($paginationDiv);
	}
}

// Display students
var displayStudents = function(startingStudent) {
	$students.hide(); // Hides all students first.
	
	// Set endingStudent to startingStudent + 10 unless at the end of the searchResults
	var endingStudent;
	if ((startingStudent + studentsPerPage) >= searchResults.length) {
		endingStudent = searchResults.length;
	} else {
		endingStudent = startingStudent + 10;
	}
	
	// Show selected students
	searchResults.slice(startingStudent, endingStudent).fadeIn(); // fadeIn() creates the subtle animation.
	
	// Update range indicator
	if (searchResults.length === 0) {
		$rangeIndicator.html("No students found.");
	} else {
		$rangeIndicator.html(searchResults.length + " student(s) found. Displaying " + (startingStudent + 1) + " - " + endingStudent + ".");
	}
	
	// Write range indicator to page after h2.
	$(".page-header h2").after($rangeIndicator);
}

// Select page by adding .active class and calling displayStudents with starting student.
var setActivePage = function(e) {
	e.preventDefault();
	var linkNumber = this.text; // Get desired page using text of clicked link.
	var startingStudent = (linkNumber - 1) * studentsPerPage; // Set starting student based on text of clicked link.
	
	// Remove .active class from previous page link then add .active class to clicked page link.
	$("div.pagination a.active").removeClass("active");
	$(this).addClass("active");
	
	displayStudents(startingStudent);
}

// Search button event listener
$(".student-search input").keyup(function() { // Listens for keyup on input instead of click on button.
	var $foundPersons = $(""); // Create empty object to store found persons.
	var searchInputText = $(".student-search input").val().toLowerCase(); // Get input text in lower case.
	
	// Loop through each student and check name and email for match with searchInputText.
	$students.each(function() {
		var studentNameText = $(this).find($studentName).text().toLowerCase(); // Get name of current student in loop in lower case.
		var studentEmailText = $(this).find($studentEmail).text().toLowerCase(); // Get email of current student in loop in lower case.
		
		// If searchInputText matches student name or email, store current student in $foundPersons variable.
		if (studentNameText.indexOf(searchInputText) !== -1 || studentEmailText.indexOf(searchInputText) !== -1) {
			$foundPersons = $foundPersons.add(this);
		}
	});
	
	searchResults = $foundPersons; // $foundPersons becomes searchResults for displaying on page.
	createPaginationDiv(); // Update the pagination div with searchResults as input to create necessary number of pages.
	displayStudents(0); // Display students within the newly created pagination, starting on the first one.
});



// Create initial pagination div. Will not create if searchResults is <= 10.
createPaginationDiv();

// Show initial page of students, starting on the first one.
displayStudents(0);

