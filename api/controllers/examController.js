const Exam = require("../models/examSchema");
const upload = require("../middleware/upload");
const uploadMultiple = upload.array("practicalQuestions", 4);

createExam = async (req, res) => {
  try {
    let examExist = await Exam.findOne({ examId: req.body.examId });
    if (examExist) {
      return res.json({
        message: "Error!",
        response: "Exam with given id already exists",
      });
    } else {
      uploadMultiple(req, res, async (err) => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }
        const filePaths = req.files
          ? req.files.map((file) => {
              return { filePath: file.path };
            })
          : [];
        const payload = {
          ...req.body,
          questions: JSON.parse(req.body.questions),
          practicalQuestions: filePaths,
        };

        let newExam = new Exam(payload);

        let data = await newExam.save();
        return res.send({
          message: "Added",
          examData: data,
        });
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      msg: err.message,
      status: 500,
    });
  }
};

getExams = async (req, res) => {
  try {
    let getExams = await Exam.find({});
    return res.json({
      message: "Found",
      response: getExams,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      msg: err.message,
      status: 500,
    });
  }
};

getExam = async (req, res) => {
  try {
    let getExam = await Exam.findOne({ _id: req.params.id });
    return res.json({
      message: "Success!",
      response: getExam,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      msg: err.message,
      status: 500,
    });
  }
};

updateExam = async (req, res) => {
  try {
    uploadMultiple(req, res, async (err) => {
      let { name, description, questions, duration } = req.body;
      //   Get properties from req.body that are not null/undefined
      const payload = {
        ...(name && { name }),
        ...(description && { description }),
        ...(questions && { questions: JSON.parse(questions) }),
        ...(duration && { duration }),
      };
      const filePaths = req.files
        ? req.files.map((file) => {
            return { filePath: file.path };
          })
        : [];
      // TODO: More testing needed
      let updated = await Exam.findByIdAndUpdate(
        req.params.id,
        {
          $set: payload,
          $push: {
            practicalQuestions: { $each: filePaths },
          },
        },
        { new: true }
      );
      return res.json({
        message: "Success!",
        response: updated,
      });
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      message: err.message,
      response: "Fail to update",
    });
  }
};

deleteExam = async (req, res) => {
  try {
    let deleteExam = await Course.findByIdAndDelete({ _id: req.params.id });
    return res.json({
      message: "Success",
      response: deleteExam,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      message: err.message,
      response: "Fail to update",
    });
  }
};

module.exports = { createExam, getExams, getExam, updateExam, deleteExam };
