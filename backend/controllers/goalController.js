const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");
const User = require("../model/userModel");

//@desc Get goals
//@route GET /api/goals
//@access private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

//@desc Set goal
//@route POST /api/goals
//@access private

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(404);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

//@desc Update goal
//@route PUT /api/goals/:id
//@access private

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.user.toStrin() != req.user.id) {
    res.status(401);
    throw new Error("Unathorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

//@desc Delete goal
//@route DELETE /api/goals/:id
//@access private

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);

    throw new Error("Goal not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.user.toStrin() != req.user.id) {
    res.status(401);
    throw new Error("Unathorized");
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
