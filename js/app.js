/*

Author: Mason Embry, mason@embrycode.com
Created: 9/19/2016
Last updated: 9/21/2016

Tested on current versions of Chrome, Safari, and Firefox.

*/

var $students = $(".student-list li"); // Finds all students.
var studentsPerPage = 10; // Entered here as variable so it can be changed if desired.


// Function to create search div.
var createSearchDiv = function() {
	var $searchDiv = $('<div class="student-search"></div>');
	var $searchInput = $('<input placeholder="Search for students...">');
	// var $searchButton = $('<button>Search</button>'); // No need for the search button with instant search results.
	$searchDiv.append($searchInput);
	// $searchDiv.append($searchButton); // No need for the search button with instant search results.
	$(".page-header").append($searchDiv);
	// Bind searchStudents to any change on the search input.
	$(".student-search input").on("input", searchAndUpdate);
		// NOTE: I tried listening for "keyup" but the arrow keys triggered the event. Listening for "change" was fine except you had to hit enter to do the search. on("input") was the best option to achieve a search on every keystroke while ignoring arrow keys.
};

// Function to search students.
var searchStudents = function() {
	var $studentName = $(".student-details h3"); // Find h3 containing student name.
	var $studentEmail = $(".email"); // Find student email.

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

	return $foundPersons;
};

// Function to call search function then update pagination div.
var searchAndUpdate = function() {
	var studentsToDisplay = searchStudents();

	// First, remove previous pagination div.
	$(".pagination").remove();

	// Calculate number of pages necessary.
	var necessaryPages = Math.ceil(studentsToDisplay.length / studentsPerPage);

	// Initialize new elements to build pagination div.
	var $paginationDiv = $('<div class="pagination"></div>');
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
			$paginationLink = $('<a href=#>' + (i + 1) + '</a>'); // Uses i to create page link label.

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
	turnPage(0); // Sets page to page 1.
};

// Select a page of students and update range indicator.
var turnPage = function(startingStudent) {
	var studentsToDisplay = searchStudents();

	$students.hide(); // Hides all students first.

	// Set endingStudent to startingStudent + 10 unless at the end of the searchResults
	var endingStudent;
	if ((startingStudent + studentsPerPage) >= studentsToDisplay.length) {
		endingStudent = studentsToDisplay.length;
	} else {
		endingStudent = startingStudent + 10;
	}

	// Show selected students
	studentsToDisplay.slice(startingStudent, endingStudent).fadeIn(); // fadeIn() creates the subtle animation.

	// Update range indicator
	$("#range-indicator").remove(); // Remove previous range indicator.
	var $rangeIndicator = $('<div id="range-indicator"></div>'); // Initialize range indicator div.
	if (studentsToDisplay.length === 0) {
		$rangeIndicator.html("No students found.");
	} else {
		$rangeIndicator.html(studentsToDisplay.length + " student(s) found. Displaying " + (startingStudent + 1) + " - " + endingStudent + ".");
	}

	// Write range indicator to page after h2.
	$(".page-header h2").after($rangeIndicator);
};

// Select page by adding .active class and calling displayStudents with starting student.
var setActivePage = function(e) {
	e.preventDefault();
	var linkNumber = this.text; // Get desired page using text of clicked link.
	var startingStudent = (linkNumber - 1) * studentsPerPage; // Set starting student based on text of clicked link.

	// Remove .active class from previous page link then add .active class to clicked page link.
	$("div.pagination a.active").removeClass("active");
	$(this).addClass("active");

	turnPage(startingStudent);
};



// Create search div.
createSearchDiv();

// Create initial pagination div. Will not create if searchResults is <= 10.
searchAndUpdate();
