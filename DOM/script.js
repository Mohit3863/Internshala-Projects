document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.querySelector('#studentTable tbody');

    // Load records from local storage
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Adding Student Records 
    function renderTable() {
        studentTableBody.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.contact}</td>
            <td>${student.email}</td>
            <td><button class="edit-button" onclick="editStudent(${index})">Edit</button></td>
            <td><button class="delete-button" onclick="deleteStudent(${index})">Delete</button></td>
        `;


            studentTableBody.appendChild(row);
        });
    }


    studentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const studentIDField = document.getElementById('studentID');
        const studentNameField = document.getElementById('studentName');
        const contactNumberField = document.getElementById('contactNumber');
        const studentEmailField = document.getElementById('studentEmail');

        const studentID = studentIDField.value.trim();
        const studentName = studentNameField.value.trim();
        const contactNumber = contactNumberField.value.trim();
        const studentEmail = studentEmailField.value.trim();

        // Validate inputs
        if (!studentID || !studentName || !contactNumber || !studentEmail) {
            alert('All fields are required');
            return;
        }

        // Check if Student ID and Contact Number are numeric
        if (!isNumericFieldValid(studentID)) {
            alert('Student ID must contain only numbers');
            return;
        }

        if (!isNumericFieldValid(contactNumber)) {
            alert('Contact Number must contain only numbers');
            return;
        }

        // Check if Student Name contains only letters
        if (!isAlphabeticFieldValid(studentName)) {
            alert('Student Name must contain only letters');
            return;
        }

        // Check for valid email
        if (!isValidEmail(studentEmail)) {
            alert('Invalid email format');
            return;
        }

        // Add student to the list and save to local storage
        students.push({ id: studentID, name: studentName, contact: contactNumber, email: studentEmail });
        localStorage.setItem('students', JSON.stringify(students));

        // Clear the form and re-render the table
        studentForm.reset();
        renderTable();
    });

    // Function to validate that the input contains only numbers
    function isNumericFieldValid(value) {
        return value !== '' && !isNaN(value) && Number.isInteger(+value) && +value > 0;
    }

    // Function to validate that the name contains only letters
    function isAlphabeticFieldValid(name) {
        return /^[A-Za-z\s]+$/.test(name); // Allows letters and spaces
    }

    // Function to validate the email format
    function isValidEmail(email) {
        // Simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Edit student record
    document.editStudent = (index) => {
        const student = students[index];
        document.getElementById('studentID').value = student.id;
        document.getElementById('studentName').value = student.name;
        document.getElementById('contactNumber').value = student.contact;
        document.getElementById('studentEmail').value = student.email;

        // Delete the record before adding updated values
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    };

    // Delete student record
    document.deleteStudent = (index) => {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    };

    // Render the table initially
    renderTable();
});
