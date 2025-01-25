import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Modal, Button } from 'react-bootstrap'; // You can use any modal library or custom modal
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    section: '',
    rollNumber: '',
    // add other fields here
  });

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, 'students'));
      setStudents(querySnapshot.docs.map((doc) => doc.data()));
    };

    fetchStudents();
  }, []);

  const handleAddStudent = async () => {
    await addDoc(collection(db, 'students'), newStudent);
    setShowModal(false);
    setNewStudent({});
  };

  return (
    <div>
      <h2>Students List</h2>
      <button onClick={() => setShowModal(true)}>Add Student</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Roll Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.rollNumber}</td>
              <td>
                <button>View</button>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form fields for student information */}
          <input
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          {/* Add other form fields here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddStudent}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentsPage;
