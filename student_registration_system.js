window.onload = function () {
  const form = document.getElementById("registrationForm");
  const tableBody = document.getElementById("studentTableBody");

  let students = JSON.parse(localStorage.getItem("students")) || [];

  function renderStudents() {
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
          <button class="edit" onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  function validateForm(name, id, email, contact) {
    const nameRegex = /^[A-Za-z ]+$/;
    const idRegex = /^\d+$/;
    const contactRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !id || !email || !contact) return false;
    if (!nameRegex.test(name)) return false;
    if (!idRegex.test(id)) return false;
    if (!emailRegex.test(email)) return false;
    if (!contactRegex.test(contact)) return false;

    return true;
  }

  form.onsubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById("studentName").value.trim();
    const id = document.getElementById("studentID").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    if (!validateForm(name, id, email, contact)) {
      alert("Please enter valid details.");
      return;
    }

    const existingIndex = students.findIndex((s) => s.id === id);
    if (existingIndex !== -1) {
      students[existingIndex] = { name, id, email, contact };
    } else {
      students.push({ name, id, email, contact });
    }

    localStorage.setItem("students", JSON.stringify(students));
    form.reset();
    renderStudents();
  };

  window.editStudent = function(index) {
    const student = students[index];
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentID").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;
  }

  window.deleteStudent = function(index) {
    if (confirm("Are you sure you want to delete this record?")) {
      students.splice(index, 1);
      localStorage.setItem("students", JSON.stringify(students));
      renderStudents();
    }
  }

  renderStudents();
};
