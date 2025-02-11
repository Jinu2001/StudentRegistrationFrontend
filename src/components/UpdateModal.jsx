import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Snackbar, 
  Alert
} from "@mui/material";
import axios from "axios";

const UpdateStudentModal = ({ open, handleClose, student}) => { //fetchStudents 
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    telePhone: "",
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });



  useEffect(() => {
    if (student) {
      setFormData({
        fullName: student.fullName || "",
        address: student.address || "",
        dateOfBirth: student.dateOfBirth || "",
        gender: student.gender || "",
        email: student.email || "",
        telePhone: student.telePhone || "",
      });
    }
  }, [student]);

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(07[0-9])\d{7}$/; // Sri Lankan phone format

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required!";
    } else if (!nameRegex.test(formData.fullName)) {
      newErrors.fullName = "Full Name should only contain letters and spaces!";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required!";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required!";
    } else if (new Date(formData.dateOfBirth) >= new Date()) {
      newErrors.dateOfBirth = "Date of Birth must be a past date!";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required!";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format!";
    }

    if (!formData.telePhone.trim()) {
      newErrors.telePhone = "Telephone is required!";
    } else if (!phoneRegex.test(formData.telePhone)) {
      newErrors.telePhone = "Invalid phone format! (e.g., 0712345678)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await axios.put(`https://localhost:7178/api/Student/${student.id}`, {
        id: student.id,
        ...formData,
      });

      //fetchStudents(); 
      setAlert({ open: true, type: "success", message: "Student updated successfully!" });
      handleClose();
    } catch (error) {
      console.error("Error updating student:", error);
      if (error.response && error.response.status === 400) {
        setAlert({ open: true, type: "warning", message: error.response.data });
      } else {
        setAlert({ open: true, type: "error", message: "Failed to update student! Please try again." });
      }
    }
    }
  

  return (
    <>

<Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Update Student
        </Typography>

        <TextField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.fullName}
          helperText={errors.fullName}
        />

        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.address}
          helperText={errors.address}
        />

        <TextField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.dateOfBirth}
          helperText={errors.dateOfBirth}
        />

        <FormControl component="fieldset" margin="normal">
          <Typography variant="body2" sx={{ mb: 1 }}>
            Gender
          </Typography>
          <RadioGroup
            row
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
          {errors.gender && <Typography color="error">{errors.gender}</Typography>}
        </FormControl>

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Telephone"
          name="telePhone"
          value={formData.telePhone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.telePhone}
          helperText={errors.telePhone}
        />

        <Box mt={2} sx={{ display: "flex", justifyContent: "center",gap:2 }}>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Box>
      </Box>
    </Modal>

    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={() => setAlert({ ...alert, open: false })}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert 
        onClose={() => setAlert({ ...alert, open: false })} 
        severity={alert.type} 
        variant="filled"
      >
        {alert.message}
      </Alert>
    </Snackbar>

    </>
    
    
  );
};

export default UpdateStudentModal;
