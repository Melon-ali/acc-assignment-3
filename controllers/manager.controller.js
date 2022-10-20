const {
    getAllJobsServices,
    getJobByIdServices,
  } = require("../services/manager.services");
  
  const getAllJobs = async (req, res) => {
    try {
      const email = req.user.email;
      const jobs = await getAllJobsServices(email);
  
      if (!jobs) {
        return res.status(500).json({
          status: "Fail",
          message: "Couldn't Get Job",
          error: error.message,
        });
      }
  
      res.status(200).json({
        status: "Ok",
        message: "Successfully Get Jobs",
        jobs,
      });
    } catch (error) {
      res.status(500).json({
        status: "Fail",
        message: "Couldn't Get Job",
        error: error.message,
      });
    }
  };
  
  const getJobById = async (req, res) => {
    try {
      const { id } = req.params;
      const email = req.user.email;
      const job = await getJobByIdServices(email, id);
  
      if (!job) {
        return res.status(400).json({
          status: "Fail",
          message: "Couldn't Get Job With This Id",
          error: error.message,
        });
      }
  
      res.status(200).json({
        status: "Ok",
        message: "Successfully Get Job",
        job,
      });
    } catch (error) {
      res.status(400).json({
        status: "Fail",
        message: "Couldn't Get Job With This Id",
        error: error.message,
      });
    }
  };
  
  module.exports = { getAllJobs, getJobById };
  