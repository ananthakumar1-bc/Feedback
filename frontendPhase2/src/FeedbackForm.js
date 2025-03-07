import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";

const FeedbackForm = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [editId, setEditId] = useState(null);

  // Fetch feedbacks from API
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/feedbacks");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit feedback (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Update feedback
        await axios.put(`http://localhost:5000/feedbacks/${editId}`, formData);
        setEditId(null);
      } else {
        // Create feedback
        await axios.post("http://localhost:5000/feedbacks", formData);
      }
      setFormData({ name: "", email: "", message: "" });
      fetchFeedbacks();
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  // Edit feedback
  const handleEdit = (feedback) => {
    setEditId(feedback.id);
    setFormData({ name: feedback.name, email: feedback.email, message: feedback.message });
  };

  // Delete feedback
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/feedbacks/${id}`);
      fetchFeedbacks();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Feedback Form</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" name="message" value={formData.message} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          {editId ? "Update Feedback" : "Submit Feedback"}
        </Button>
      </Form>

      <h3>Feedback List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.name}</td>
              <td>{feedback.email}</td>
              <td>{feedback.message}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(feedback)}>Edit</Button>
                {' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(feedback.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FeedbackForm;
