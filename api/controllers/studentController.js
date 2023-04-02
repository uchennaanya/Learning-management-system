const Student = require("../models/studentSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

createStudent = async (req, res) => {
  try {
    let studentExist = await Student.findOne({
      studentEmail: req.body.studentEmail,
    });
    if (studentExist) {
      return res.json({
        message: "Error!",
        response: "Student already exist",
      });
    } else {
      const newStudent = new Student(req.body);

      let savedStudent = await newStudent.save();

      let studentPayLoad = {
        studentNames: savedStudent.studentNames,
        studentEmail: savedStudent.studentEmail,
      };

      const studentToken = jwt.sign(studentPayLoad, process.env.SECRETKEY);

      return res.send({
        message: "Saved",
        userData: {
          regCode: savedStudent.regCode,
          studentToken,
        },
      });
    }
  } catch (err) {
    console.log(err.name);
    return res.status(500).send({
      msg: err.message,
      status: 500,
    });
  }
};

studentLogin = async (req, res) => {
  const { regCode, password } = req.body;
  if (!regCode || !password) {
    return res.status(400).send({ message: "Missing required fields" });
  }
  const student = await Student.findOne({ regCode: req.body.regCode });

  if (student == null)
    return res.status(400).send({ message: "User not found!" });
  try {
    if (student.comparePassword(req.body.password, student.password)) {
      let loggedInPayload = { studentEmail: student.studentEmail };
      const loginToken = jwt.sign(loggedInPayload, process.env.SECRETKEY);

      res.send({
        success: true,
        student: {
          id: student._id,
          name: student.studentNames,
        },
        token: loginToken,
        message: "User logged in",
      });
    } else {
      res.status(400).send({ message: "Invalid credentials!" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server error", reason: error.message });
  }
};

getStudents = async (req, res) => {
  try {
    let getStudents = await Student.find({});
    if (getStudents === true) console.log("Table is empty ");
    return res.json({
      message: "Success!",
      response: getStudents,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: err.message,
      status: 500,
    });
  }
};

getStudent = async (req, res) => {
  try {
    let getStudents = await Student.findOne({ _id: req.params.id });
    return res.json({
      message: "Success!",
      response: getStudents,
    });
  } catch (err) {
    console.log(err.name);
    res.status(500).send({
      msg: err.message,
      status: 500,
    });
  }
};

updateStudent = async (req, res) => {
  try {
    let {
      studentNames,
      studentPhone,
      regCode,
      studentAddress,
      courseDuration,
      courseOfStudy,
      guardianName,
      relationship,
      trainingFees,
      amountDeposited,
      balance,
      gender,
    } = req.body;
    let updated = await Student.findByIdAndUpdate(
      req.params.id,
      {
        studentNames,
        studentPhone,
        regCode,
        studentAddress,
        courseDuration,
        courseOfStudy,
        guardianName,
        relationship,
        trainingFees,
        amountDeposited,
        balance,
        gender,
      },
      { new: true }
    );
    return res.json({
      message: "Success!",
      response: updated,
    });
  } catch (err) {
    console.log(err.name);
    return res.json({
      message: err.message,
      response: "Fail to update",
    });
  }
};

deleteStudent = async (req, res) => {
  try {
    let deletestudent = await Student.findByIdAndDelete({ _id: req.params.id });
    return res.json({
      message: "Success",
      response: deletestudent,
    });
  } catch (err) {
    console.log(err.name);
    return res.json({
      message: err.message,
      response: "Fail to update",
    });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  studentLogin,
};
