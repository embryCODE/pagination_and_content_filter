var students = $(".student-list li");
var studentsPerPage = 10;

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
	students.slice(low, high).show();
}

// Hide all students then load first page of students.
students.hide();







