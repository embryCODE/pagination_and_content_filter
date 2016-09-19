var $students = $(".student-list li");
var numberOfStudents = $students.length;
var studentsPerPage = 10;



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
}

var createPaginationDiv = function() {
	console.log('pagination created');
}

// Hide all students then load first page of students.
$students.hide();

// If numberOfStudents is > 10 add paginationDiv.
if (numberOfStudents > studentsPerPage) {
	createPaginationDiv();
}

selectPageOfStudents(1);








