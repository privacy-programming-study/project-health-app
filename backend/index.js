const express = require('express');
require('dotenv').config();
const app = express();
const backupRouter = require("./backup");
const userRouter = require("./api/user/user.router");
const appointmentsRouter = require("./api/appointment/appointment.route");
const doctorRouter = require("./api/doctor/doctor.route")
const healthRecordsRouter = require("./api/health-records/health-records.route")
const emailRouter = require("./api/email.js");

app.use(express.json());

app.use(
    express.urlencoded({
      extended: true,
    })
);  

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});  

// for users/patients
app.use("/user", userRouter);

// for doctors
app.use("/doctor", doctorRouter);

// for appointments
app.use("/appointments", appointmentsRouter);

// for patient health records
app.use("/health-records", healthRecordsRouter);

// for email server
app.use("/email", emailRouter);

// for backup
app.use("/backup", backupRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });
  
app.listen(process.env.SER_PORT, ()=>{
    console.log("Server up and running", process.env.SER_PORT);
});