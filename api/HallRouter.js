const express = require("express");
const Hall = require("../models/Hall");
const HallRouter = express.Router();

/*------------------------------get----------------------------------*/

HallRouter.get("/", async (req, res) => {
  let hall = await Hall.find({});
  return res.json({
    success: true,
    hall,
  });
});

HallRouter.get("/find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let hall = await Hall.findById(id).populate("user");

    return res.json({
      success: true,
      hall,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

/*----------------------------post---------------------------*/

HallRouter.post("/", async (req, res) => {
  const { hallname, game, user } = req.body;
  try {
    if (!hallname || !game || !user) {
      return res.status(400).json({
        success: false,
        message: "fill the required information.",
      });
    }
    let hall = new Hall({
      hallname,
      game,
      user,
    });

    let newHall = await hall.save();
    return res.status(201).json({
      success: true,
      hall: newHall,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = HallRouter;
