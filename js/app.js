var $students = $(".student-list li"); // Total students regardless of search selection.
var searchSelected = $students; // Total students selected by search. Initialized as total students.
var studentsPerPage = 10; // Entered here as variable so it can be changed if desired.


// Create pagination div
var createPaginationDiv = function() {
	
	// Calculate number of pages necessary based on students in search results and students per page.
	var numberOfStudents = searchSelected.length;
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
			$paginationLi.append($paginationLink);
			$paginationUl.append($paginationLi);
			
			// Set click handler on each link 
			$paginationLink.click(setActivePage);
		}
		
		$(".student-list").append($paginationDiv);
	}
}

// Show a range of students
var showRangeOfStudents = function(low, high) {
	$students.hide(); // Hides all students first.
	$students.slice(low, high).show();
}

// "Turn the page" to the page indicated by pagination click handler
var turnThePage = function(page) {
	var startIndex;
	var endIndex;
	
	// Set first and last student to show based on studentsPerPage
	if (page === 1) {
		startIndex = 0; // If on page one, the first student is in index 0
		endIndex = studentsPerPage; // The slice method will actually stop one lower than this high number. 0-9.
	} else {
		startIndex = (page * studentsPerPage) - studentsPerPage;
		endIndex = startIndex + studentsPerPage;
	}
	
	showRangeOfStudents(startIndex, endIndex);
}

// Set .active link
var setActivePage = function(activePage) {
	// Pagination click handler
$(".pagination ul li a").on("click", function(e) {
	e.preventDefault();
	var whichPageLinkClicked = parseInt($(this).text());
	setActivePage(whichPageLinkClicked);
	turnThePage(whichPageLinkClicked);
});
	$(".pagination ul li a").removeClass("active"); // First remove .active class from all page links
	$(".pagination ul li a").eq(activePage - 1).addClass("active"); // "activePage - 1" to adjust for zero-based index
}


createPaginationDiv();
setActivePage(1);
turnThePage(1);








