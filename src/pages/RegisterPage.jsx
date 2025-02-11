import { DateRange } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import deleteIcon from "../assets/delete.png";
import { useRef, useState } from "react";

function RegisterPage() {
  const [formdata, setFormdata] = useState({
    fullName: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    telePhone: "",
  });

  const [students, setStudents] = useState([]);

  const form = useRef(null);

  const [alert, setAlert] = useState({ open: false, type: "", message: "" });

  const validateForm = (formData) => {
    const errors = {};
  
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(07[0-9])\d{7}$/; 
  

    if (!formData.fullName.trim()) {
      errors.fullName = "Full Name is required!";
    } else if (!nameRegex.test(formData.fullName)) {
      errors.fullName = "Full Name should only contain letters and spaces!";
    }

    if (!formData.address.trim()) {
      errors.address = "Address is required!";
    }

    const dob = new Date(formData.dateOfBirth);
    const today = new Date();
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of Birth is required!";
    } else if (dob >= today) {
      errors.dateOfBirth = "Date of Birth should be a past date!";
    }

    if (!formData.gender) {
      errors.gender = "Gender is required!";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format! Example: user@example.com";
    }
 
    if (!formData.telePhone.trim()) {
      errors.telePhone = "Telephone is required!";
    } else if (!phoneRegex.test(formData.telePhone)) {
      errors.telePhone = "Invalid telephone number! Must be in format: 07X XXX XXXX";
    }
  
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(formdata);

    if (Object.keys(errors).length > 0) {
      setAlert({ open: true, type: "error", message: Object.values(errors).join("\n") });
      return;
   }

    setStudents([...students, formdata]);

    setFormdata({
      fullName: "",
      address: "",
      dateOfBirth: "",
      gender: "",
      email: "",
      telePhone: "",
    });

    form.current.reset();
  };

  

  const handlePost = async () => {
    try {
      const response = await fetch("https://localhost:7178/api/Student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(students),
      });

      const result = await response.json();
      
      if (!response.ok) {
        if (result.message && result.message.includes("Some students were not added due to duplicates")) {
          setAlert({ open: true, type: "warning", message: result.message });
        } else {
        throw new Error("Failed to submit data");
      }
      return;
    }
      
      setAlert({ open: true, type: "success", message: "Student registered successfully!" });
      setStudents([]); 
    } catch (error) {
      console.error("Error submitting data:", error);
      setAlert({ open: true, type: "error", message: "Failed to register student! Please try again." });
    }
  };

  const handleDelete = (index) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  }

  return (
    <>
    
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: { sm: "80vw", md: "80vw" },
        p: 5,
      }}
    >
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
          Student Registration
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 3,
              color: "#222",
            }}
            ref={form}
          >
            <Stack spacing={4}>
              <Stack
                direction={{ sm: "column", md: "row" }}
                spacing={1}
                sx={{ alignItems: { md: "center" } }}
              >
                <Typography
                  width={{ xs: "100%", md: "30%" }}
                  variant="body2"
                  align="left"
                >
                  Full Name
                </Typography>
                <TextField
                  error=""
                  helperText=""
                  size="small"
                  name="fullName"
                  type="text"
                  placeholder="e.g. Anura Kumara"
                  fullWidth
                  value={formdata.fullName}
                  onChange={(e) => {
                    setFormdata({ ...formdata, fullName: e.target.value });
                  }}
                  required
                />
              </Stack>
              <Stack
                direction={{ sm: "column", md: "row" }}
                spacing={1}
                sx={{ alignItems: { md: "center" } }}
              >
                <Typography
                  width={{ xs: "100%", md: "30%" }}
                  variant="body2"
                  align="left"
                >
                  Address
                </Typography>
                <TextField
                  error=""
                  helperText=""
                  size="small"
                  name="address"
                  type="text"
                  placeholder="address"
                  fullWidth
                  value={formdata.address}
                  onChange={(e) => {
                    setFormdata({ ...formdata, address: e.target.value });
                  }}
                  required
                />
              </Stack>
              <Stack
                direction={{ sm: "column", md: "row" }}
                spacing={1}
                sx={{ alignItems: { md: "center" } }}
              >
                <Typography
                  width={{ xs: "100%", md: "30%" }}
                  variant="body2"
                  align="left"
                >
                  Date of Birth
                </Typography>
                <Stack width={"100%"}>
                  <Stack
                    direction={"row"}
                    spacing={6}
                    justifyContent={"space-between"}
                  >
                    <TextField
                      error=""
                      helperText=""
                      size="small"
                      name="dob"
                      type="date"
                      placeholder="bane"
                      sx={{
                        width: { xs: "100%", lg: "40%" },
                      }}
                      value={formdata.dateOfBirth}
                      onChange={(e) => {
                        setFormdata({
                          ...formdata,
                          dateOfBirth: e.target.value,
                        });
                      }}
                      required
                    />
                    <Stack
                      direction={{ sm: "column", md: "row" }}
                      spacing={2}
                      sx={{
                        display: { xs: "none", lg: "flex" },
                        alignItems: { md: "center" },
                      }}
                    >
                      <Typography width={"auto"} variant="body2" align="left">
                        Gender
                      </Typography>
                      <Stack direction={"row"} spacing={2}>
                        <FormControl>
                          <RadioGroup
                            row
                            value={formdata.gender}
                            onChange={(e) => {
                              setFormdata({
                                ...formdata,
                                gender: e.target.value,
                              });
                            }}
                            sx={{ flexWrap: "nowrap" }}
                          >
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              label="Female"
                              labelPlacement="start"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              label="Male"
                              labelPlacement="start"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                direction={{ sm: "column", md: "row" }}
                spacing={2}
                sx={{
                  display: { xs: "flex", lg: "none" },
                  alignItems: { md: "center" },
                }}
              >
                <Typography
                  width={{ xs: "100%", md: "30%" }}
                  variant="body2"
                  align="left"
                >
                  Gender
                </Typography>
                <Stack width={"100%"}>
                  <Stack direction={"row"} justifyContent={"start"} spacing={2}>
                    <FormControl>
                      <RadioGroup
                        row
                        value={formdata.gender}
                        onChange={(e) => {
                          setFormdata({
                            ...formdata,
                            gender: e.target.value,
                          });
                        }}
                        sx={{ flexWrap: "nowrap" }}
                      >
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                          sx={{ margin: 0 }}
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                          labelPlacement="start"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                direction={{ sm: "column", md: "row" }}
                spacing={1}
                sx={{ alignItems: { md: "center" } }}
              >
                <Typography
                  width={{ xs: "100%", md: "30%" }}
                  variant="body2"
                  align="left"
                >
                  Email
                </Typography>
                <TextField
                  error=""
                  helperText=""
                  size="small"
                  name="email"
                  type="email"
                  placeholder="e.g. name@example.com"
                  fullWidth
                  value={formdata.email}
                  onChange={(e) => {
                    setFormdata({ ...formdata, email: e.target.value });
                  }}
                  required
                />
              </Stack>
              <Stack
                direction={{ sm: "column", md: "row" }}
                spacing={1}
                sx={{ alignItems: { md: "center" } }}
              >
                <Typography
                  width={{ xs: "100%", md: "30%" }}
                  variant="body2"
                  align="left"
                >
                  Telephone
                </Typography>
                <Stack width={"100%"}>
                  <TextField
                    error=""
                    helperText=""
                    size="small"
                    name="telephone"
                    type="tel"
                    placeholder="e.g. 07x xxx xxx"
                    sx={{
                      width: { xs: "100%", lg: "40%" },
                    }}
                    value={formdata.telePhone}
                    onChange={(e) => {
                      setFormdata({ ...formdata, telePhone: e.target.value });
                    }}
                    required
                  />
                </Stack>
              </Stack>
              <Stack direction={"row"} justifyContent={"end"}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: "80px" }}
                >
                  Add
                </Button>
              </Stack>
            </Stack>
          </Box>

          <TableContainer
            component={Paper}
            sx={{ boxShadow: "none", background: "transparent" }}
          >
            <Table sx={{ borderCollapse: "collapse" }}>
              <TableHead>
                <TableRow>
                  {["Name", "Date of Birth", "Email", "Telephone",""].map(
                    (header) => (
                      <TableCell
                        key={header}
                        sx={{
                          fontWeight: "bold",
                          borderTop: "1px solid #BBBBBB",
                          borderBottom: "1px solid #BBBBBB",
                        }}
                      >
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ borderBottom: "none" }}>
                      {student.fullName}
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                      {student.dateOfBirth}
                    </TableCell>
                    <TableCell
                      sx={{ borderBottom: "none", textDecoration: "underline" }}
                    >
                      {student.email}
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                      {student.telePhone}
                    </TableCell>
                    <TableCell sx={{ borderBottom: "none" }}>
                        <img
                            src={deleteIcon}
                            alt="Delete"
                            style={{ width: "18px", cursor: "pointer" }}
                            onClick={() => handleDelete(index)}
                          />
                    </TableCell>
                  </TableRow>
                ))}
                {[...Array(Math.max(0, 2 - students.length))].map(
                  (_, index) => (
                    <TableRow key={`empty-${index}`}>
                      <TableCell
                        colSpan={5}
                        align="center"
                        sx={{
                          borderBottom:
                            index === 1 - students.length
                              ? "1px solid #BBBBBB"
                              : "none",
                          height: 50,
                        }}
                      />
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction={"row"} justifyContent={"end"} p={3}>
            <Button
              onClick={handlePost}
              variant="contained"
              sx={{ width: "80px" }}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Box>
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
}

export default RegisterPage;