var $students = $(".student-list li");
var numberOfStudents = $students.length;
var studentsPerPage = 10;
var necessaryPages = Math.ceil(numberOfStudents / studentsPerPage); // Necessary pages to fit all students



// Show a range of students
var showRangeOfStudents = function(low, high) {
	$students.hide(); // Hides all students first.
	$students.slice(low, (high + 1)).show();
}

// Create pagination div
var createPaginationDiv = function() {
	var $paginationDiv = $('<div class="pagination"><ul></ul></div>') // Creates pagination div with empty ul.
	var ulContent = ''; // Creates empty string for building ul content in loop

	for (var i = 0; i < necessaryPages; i++) {
		ulContent += "<li><a href=#>" + (i + 1) + "</a></li>"; // Builds html of ul, incrementing the link text
	}
	
	$paginationDiv.find("ul").append(ulContent);
	$(".student-list").append($paginationDiv);
}

var setActivePage = function(activePage) {
	$(".pagination ul li a").removeClass("active"); // First remove .active class from all page links
	$(".pagination ul li a").eq(activePage - 1).addClass("active"); // "activePage - 1" to adjust for zero-based index
}

// If numberOfStudents is > 10 add paginationDiv and set first page link to .active
if (numberOfStudents > studentsPerPage) {
	createPaginationDiv();
	setActivePage(1);
}








