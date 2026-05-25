import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [students, setStudents] = useState([]);

  const [student, setStudent] = useState({
    name: '',
    email: '',
    course: ''
  });

  const [editingId, setEditingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getStudents();
  }, []);

  // GET ALL STUDENTS
  const getStudents = async () => {
    const response = await axios.get('http://localhost:8080/students');
    setStudents(response.data);
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  // ADD STUDENT
  const addStudent = async () => {

    if (
      student.name === '' ||
      student.email === '' ||
      student.course === ''
    ) {
      alert("Please fill all fields");
      return;
    }

    await axios.post(
      'http://localhost:8080/students',
      student
    );

    getStudents();

    resetForm();
  };

  // DELETE STUDENT
  const deleteStudent = async (id) => {
    await axios.delete(
      `http://localhost:8080/students/${id}`
    );

    getStudents();
  };

  // EDIT BUTTON CLICK
  const editStudent = (s) => {

    setStudent({
      name: s.name,
      email: s.email,
      course: s.course
    });

    setEditingId(s.id);
  };

  // UPDATE STUDENT
  const updateStudent = async () => {

    await axios.put(
      `http://localhost:8080/students/${editingId}`,
      student
    );

    getStudents();

    resetForm();

    setEditingId(null);
  };

  // RESET FORM
  const resetForm = () => {
    setStudent({
      name: '',
      email: '',
      course: ''
    });
  };

  // SEARCH FILTER
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div style={{ padding: '20px' }}>

      <h2>Student CRUD App</h2>

      {/* SEARCH BOX */}
      <input
        type="text"
        placeholder="Search Student"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: '20px',
          padding: '8px',
          width: '250px'
        }}
      />

      <br />

      {/* FORM */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={student.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="course"
        placeholder="Course"
        value={student.course}
        onChange={handleChange}
      />

      {/* CONDITIONAL BUTTON */}
      {
        editingId ? (
          <button onClick={updateStudent}>
            Update Student
          </button>
        ) : (
          <button onClick={addStudent}>
            Add Student
          </button>
        )
      }

      <hr />

      {/* TABLE */}
      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {
            filteredStudents.map((s) => (

              <tr key={s.id}>

                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.course}</td>

                <td>

                  <button
                    onClick={() => editStudent(s)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteStudent(s.id)}
                    style={{ marginLeft: '10px' }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default App;