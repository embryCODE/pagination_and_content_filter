var $students = $(".student-list li");
var numberOfStudents = $students.length;
var studentsPerPage = 10;
var $rangeIndicator = $('<p id="range-indicator"></p>')


// Create pagination div
var createPaginationDiv = function() {
	var $paginationDiv = $('<div class="pagination"></div>');
	$paginationDiv.append("<ul></ul>");
	var necessaryPages = Math.ceil(numberOfStudents / studentsPerPage); // Divides numberOfStudents by 10 then rounds up to next integer.
	
	// Add a list item to the paginationDiv ul for every necessary page.
	for (var i = 1; i < necessaryPages; i++) {
		$paginationDiv.find('ul').append('<li><a href="#" class="page-link">' + i + "</a></li>");
	}
	$(".student-list").append($paginationDiv);
}

// Show a range of students
var showRangeOfStudents = function(low, high) {
	$students.hide(); // Hides all students first, just in case.
	$students.slice(low, (high + 1)).show();
}

// Select a page of students
var selectPageOfStudents = function(pageNumber) {
	lastStudentToShow = pageNumber * studentsPerPage;
	firstStudentToShow = lastStudentToShow - (studentsPerPage - 1);
	showRangeOfStudents((firstStudentToShow - 1), (lastStudentToShow -1));
	
	// Add .active class to selected page
	$(".pagination ul li:nth-child(" + pageNumber + ")").find('a').addClass("active");
	
	// Update range indicator
	$rangeIndicator.append("Showing student number " + firstStudentToShow + " through " + lastStudentToShow + ".");
	$(".page-header").append($rangeIndicator);
}

// When I click on a pagination li a
	// Call selectPageOfStudents([correct page number])

// Create search div

// Hide all students then load first page of students.
$students.hide();

// If numberOfStudents is > 10 add paginationDiv.
if (numberOfStudents > studentsPerPage) {
	createPaginationDiv();
}

selectPageOfStudents(1);







