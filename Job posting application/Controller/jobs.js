const jobModel = require("../models/jobs");

const createJob = async (req, res) => {
  try {
    console.log(req.body);
    const newJob = new jobModel(req.body);
    const newlyInsertedJob = await newJob.save();
    res.json({
      sucess: true,
      message: `New Job Created Successfully. id: ${newlyInsertedJob._id}`,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      message: "Error while creating new job",
    });
  }
};

const getJob = async (req, res) => {
  try {
    console.log(req.body);
    const jobList = await jobModel.find({});
    res.send({
      sucess: true,
      message: "Dummy job get Api",
      results: jobList,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      message: "Something went wrong",
    });
  }
};

const editJob = async (req, res) => {
  try {
    jobModel.updateOne({ _id: req.body._id }, { $set: req.body });
    res.json({
      sucess: true,
      message: "Job edited successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Something went wrong",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    jobModel.deleteOne({ _id: req.body._id });
    res.json({
      sucess: true,
      message: "Job deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createJob,
  getJob,
  editJob,
  deleteJob,
};
