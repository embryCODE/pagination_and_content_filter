// Store number of .student-list items (students) in a variable
var numberOfStudents = $(".student-list li").length;

// If numberOfStudents is > 10 add paginationDiv
if (numberOfStudents > 10) {
	var $paginationDiv = $('<div class="pagination"></div>');
	$paginationDiv.append("<ul></ul>");
	var necessaryPages = Math.ceil(numberOfStudents / 10); // Divides numberOfStudents by 10 then rounds up to next integer
	for (var i = 1; i < necessaryPages; i++) {
		$paginationDiv.append('<li><a href="#">' + i + "</a></li>");
	}
	$(".student-list").append($paginationDiv);
}

