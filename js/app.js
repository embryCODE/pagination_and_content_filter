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
		ulContent += "<li><a>" + (i + 1) + "</a></li>"; // Builds html of ul, incrementing the link text
	}
	
	$paginationDiv.find("ul").append(ulContent);
	$(".student-list").append($paginationDiv);
}



// If numberOfStudents is > 10 add paginationDiv.
if (numberOfStudents > studentsPerPage) {
	createPaginationDiv();
}








