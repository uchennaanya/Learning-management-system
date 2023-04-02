const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Exam = new Schema({
  examId: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 60,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: String,
      answerOptions: [
        {
          answerText: String,
          isCorrect: Boolean,
        },
      ]
    }],

  practicalQuestions: [{ filePath: String, dateToSubmit: Date }],
});

module.exports = mongoose.model("exam", Exam);
