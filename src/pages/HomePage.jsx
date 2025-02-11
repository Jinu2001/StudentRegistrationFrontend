import React, { useState, useEffect } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Divider,
  Alert,
  Snackbar
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import UpdateModal from "../components/UpdateModal.jsx"

const HomePage = () => {
  const [students, setStudents] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });

  const fetchStudents = () => {
    axios.get("https://localhost:7178/api/Student")
      .then((response) => {
        setStudents(Array.isArray(response.data) ? response.data : response.data ? [response.data] : []);

      })
      .catch(() => setStudents([]));
  };

  useEffect(() => {
    fetchStudents();
  }, [students]);

  const handleSearch = () => {
    if (searchPhone.trim() === "") return;
    axios.get(`https://localhost:7178/api/Student/${searchPhone}`)
      .then((response) => {
        setStudents(Array.isArray(response.data) ? response.data : [response.data]);
      })
      .catch(() => setStudents([]));
  };

  const handleDelete = (studentId) => {
    fetch(`https://localhost:7178/api/Student/${studentId}`, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => {
        setAlert({ open: true, type: "success", message: "Student deleted successfully!" });
        console.log("Deleted successfully");
        //fetchStudents();
      })
      .catch((error) => {
        setAlert({ open: true, type: "error", message: "Failed to delete student! Please try again." });
        console.error("Error deleting student:", error);
      });
  };
  

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setOpenModal(true);
  };

  return (
    <>
    
    <Box  sx={{
      bgcolor: "#FFFFFF",
      minHeight: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: { sm: "80vw", md: "80vw" },
      p: 5,
    }}>
       <Box
        sx={{
          bgcolor: "#F8F8F8",
          width: "90%",
          maxWidth: "1200px",
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 3,
          border: "2px solid #E4E4E4",
        }}
      >
      <Typography
          variant="h5"
          gutterBottom
          sx={{
            textAlign: "left",
            width: "100%",
            fontSize: "20px",
            color: "#222",
          }}
        >
          Student List
        </Typography>
        <Divider sx={{ width: "100%", mb: 3, bgcolor: "#C3C3C3" }} />
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            p: 4,
            paddingX: 10,
            borderRadius: 3,
            width: "100%",
            maxWidth: "1100px",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, mb: 12 }}>
            <TextField
              label="Telephone"
              variant="outlined"
              size="small"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
            />
            <button 
              onClick={handleSearch}
              style={{ backgroundColor: "#1B91FF", color: "white", border: "1.5px solid #BCBCBC", padding: "8px 16px", fontSize: "17px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer", letterSpacing: "2%" }}
            >
              Search
            </button>
            <Link to="/register">
            <button 
              style={{ backgroundColor: "#1B91FF", color: "white", border: "1.5px solid #BCBCBC", padding: "8px 16px", fontSize: "17px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer", letterSpacing: "2%" }}
            >
              Register Student
            </button>
            </Link>
            
          </Box>
          <TableContainer sx={{ boxShadow: "none", background: "transparent", }}>
            <Table sx={{ borderCollapse: "collapse",mb:32 }}>
              <TableHead>
                <TableRow>
                  {['Name', 'Date of Birth', 'Email', 'Telephone', 'Action'].map((header) => (
                    <TableCell key={header} sx={{ fontWeight: "bold", borderTop: "1px solid #BBBBBB", borderBottom: "1px solid #BBBBBB" }}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ borderBottom: "none" }}>{student.fullName}</TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>{student.dateOfBirth}</TableCell>
                    <TableCell sx={{ borderBottom: "none", textDecoration: "underline" }}>{student.email}</TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>{student.telePhone}</TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                      <img
                        src={editIcon}
                        alt="Edit"
                        style={{ width: "20px", cursor: "pointer", marginRight: "10px" }}
                        onClick={() => handleEdit(student)}
                      />
                      <img
                        src={deleteIcon}
                        alt="Delete"
                        style={{ width: "18px", cursor: "pointer" }}
                        onClick={() => handleDelete(student.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {[...Array(Math.max(0, 3 - students.length))].map((_, index) => (
                  <TableRow key={`empty-${index}`}>
                    <TableCell colSpan={5} align="center" sx={{ borderBottom: index === 2 - students.length ? "1px solid #BBBBBB" : "none", height: 50 }} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <UpdateModal 
  open={openModal} 
  handleClose={() => setOpenModal(false)} 
  student={selectedStudent} 
  //fetchStudents={fetchStudents} 
/>

    </Box>
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

export default HomePage;
