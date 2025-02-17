function calculateGrade(marks, attendance) {
    let finalMarks = marks;

    if (attendance > 90) {
      finalMarks += 5;
    }

    if (finalMarks > 100) {
      finalMarks = 100;
    }

    let grade = "";
    if (finalMarks >= 90) {
      grade = "A";
    } else if (finalMarks >= 80) {
      grade = "B";
    } else if (finalMarks >= 70) {
      grade = "C";
    } else if (finalMarks >= 60) {
      grade = "D";
    } else {
      grade = "F";
    }
  
    return {
      finalMarks: finalMarks,
      grade: grade
    };
  }

  document.getElementById("grade-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let marks = parseInt(document.getElementById("marks").value);
    let attendance = parseInt(document.getElementById("attendance").value);

    if (isNaN(marks) || isNaN(attendance) || marks < 0 || marks > 100 || attendance < 0 || attendance > 100) {
      document.getElementById("result").innerText = "Please enter valid marks (0-100) and attendance (0-100).";
      return;
    }
  
    let result = calculateGrade(marks, attendance);

    document.getElementById("result").innerText = `
      Marks: ${marks}\n
      Attendance: ${attendance}%\n
      Final Marks (after extra credit): ${result.finalMarks}\n
      Grade: ${result.grade}
    `;
  });
  