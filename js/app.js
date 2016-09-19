/*
	
Author: Mason Embry, mason@embrycode.com
Created: 9/19/2016

Tested on current versions of Chrome, Safari, and Firefox.
	
*/

var $students = $(".student-list li"); // Total students regardless of search selection.
var searchResults = $students; // Total students selected by search. Initialized as total students.
var studentsPerPage = 10; // Entered here as variable so it can be changed if desired.
var $studentName = $(".student-details h3"); // Find student name
var $studentEmail = $(".email"); // Find student email
var $rangeIndicator = $('<div id="range-indicator"></div>');



// Create search div
var $searchDiv = $('<div class="student-search"></div>');
var $searchInput = $('<input placeholder="Search for students...">');
var $searchButton = $('<button>Search</button>');
$searchDiv.append($searchInput);

// No need for the search button with instant search results.
// $searchDiv.append($searchButton);

$(".page-header").append($searchDiv);

// Create (and update) pagination div
var createPaginationDiv = function() {
	// First remove previous pagination div.
	$(".pagination").remove();
	
	// Calculate number of pages necessary based on students in search results and students per page.
	var numberOfStudents = searchResults.length;
	var necessaryPages = Math.ceil(numberOfStudents / studentsPerPage);
	
	// Initialize new elements to build pagination div.	
	var $paginationDiv = $('<div class="pagination"></div>')
	var $paginationUl = $("<ul></ul>");
	var $paginationLi;
	var $paginationLink;
	
	// No pagination div created if only one page necessary.
	if (necessaryPages > 1) {
		
		// Create ul outside of loop.
		$paginationDiv.append($paginationUl);
		
		// Loop to create li and a.
		for (var i = 0; i < necessaryPages; i++) {
			$paginationLi = $("<li></li>");
			$paginationLink = $('<a href=#>' + (i + 1) + '</a>')
			
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
	
	var endingStudent;
	
	// Set endingStudent to startingStudent + 10 unless at the end of the searchResults
	if ((startingStudent + studentsPerPage) >= searchResults.length) {
		endingStudent = searchResults.length;
	} else {
		endingStudent = startingStudent + 10;
	}
	
	// Show selected students
	searchResults.slice(startingStudent, endingStudent).show();
	
	// Update range indicator
	if (searchResults.length === 0) {
		$rangeIndicator.html("No students found.");
	} else {
		$rangeIndicator.html(searchResults.length + " student(s) found. Displaying " + (startingStudent + 1) + " - " + endingStudent + ".");
	}
	
	// Write range indicator to page after h2.
	$(".page-header h2").after($rangeIndicator);
}

// Select page by adding .active class and calls displayStudents with starting student
var setActivePage = function(e) {
	e.preventDefault();
	var linkNumber = this.text;
	var startingStudent = (linkNumber - 1) * studentsPerPage;
	
	// Remove .active class from previous page link then add .active class to clicked page link.
	$("div.pagination a.active").removeClass("active");
	$(this).addClass("active");
	
	displayStudents(startingStudent);
}

// Search button event listener
$(".student-search input").keyup(function() {
	var $foundPersons = $(""); // Create empty object to store found persons
	var searchInputText = $(".student-search input").val().toLowerCase(); // Get input text in lower case
	
	// Loop through each student and checks name and email for match with searchInputText.
	$students.each(function() {
		var studentNameText = $(this).find($studentName).text().toLowerCase(); // Get name of current student in loop.
		var studentEmailText = $(this).find($studentEmail).text().toLowerCase(); // Get email of current student in loop.
		// If searchInputText matches student name or email, store current student in $foundPersons variable.
		if (studentNameText.indexOf(searchInputText) !== -1 || studentEmailText.indexOf(searchInputText) !== -1) {
			$foundPersons = $foundPersons.add(this);
		}
	});
	searchResults = $foundPersons; // $foundPersons becomes searchResults for displaying on page.
	createPaginationDiv(); // Update the pagination div with searchResults as input to create necessary number of pages.
	displayStudents(0); // Display students within the new created pagination.
});



// Create initial pagination div. Will not create if searchResults is <= 10.
createPaginationDiv();

// Show initial page of students
displayStudents(0);








