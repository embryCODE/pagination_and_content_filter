var students = $(".student-list li");
var studentsPerPage = 10;
var $rangeIndicator = $('<p id="range-indicator"></p>')

// Store number of students in a variable.
var numberOfStudents = students.length;

// If numberOfStudents is > 10 add paginationDiv.
if (numberOfStudents > studentsPerPage) {
	var $paginationDiv = $('<div class="pagination"></div>');
	$paginationDiv.append("<ul></ul>");
	var necessaryPages = Math.ceil(numberOfStudents / studentsPerPage); // Divides numberOfStudents by 10 then rounds up to next integer.
	
	// Add a li to the paginationDiv ul for every necessary page.
	for (var i = 1; i < necessaryPages; i++) {
		$paginationDiv.append('<li><a href="#" class="page-link-' + i + '">' + i + "</a></li>");
	}
	$(".student-list").append($paginationDiv);
}

// Show a range of students
var showRangeOfStudents = function(low, high) {
	students.slice(low, (high + 1)).show();
}

var selectPageOfStudents = function(pageNumber) {
	lastStudentToShow = pageNumber * 10;
	firstStudentToShow = lastStudentToShow - 9;
	showRangeOfStudents((firstStudentToShow - 1), (lastStudentToShow -1));
	
	// Update range indicator
	$rangeIndicator.append("Showing student number " + firstStudentToShow + " through " + lastStudentToShow + ".");
	$(".page-header").append($rangeIndicator);
}

// Create search div


// Hide all students then load first page of students.
students.hide();
selectPageOfStudents(1);







