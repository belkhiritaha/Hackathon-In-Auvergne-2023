import mongoose from "mongoose";
import express from "express";
import Activity from "../models/activityModel.js";

const activityRouter = express.Router();

// GET /activities - get all activities
activityRouter.get("/", async (req, res) => {
    const activities = await Activity.find({});
    res.json(activities);
});

// POST /activities - create a new activity
activityRouter.post("/", async (req, res) => {
    const { description, image, soil_type, humidity, temperature, arosage, quantity } = req.body;

    const activity = new Activity({
        description,
        image,
        soil_type,
        humidity,
        temperature,
        arosage,
        quantity,
    });

    const savedActivity = await activity.save();

    res.json(savedActivity);
});

// PUT /activities/:id - update activity by id
activityRouter.put("/:id", async (req, res) => {
    const { description, image, soil_type, humidity, temperature, arosage, quantity } = req.body;

    const activity = await Activity.findByIdAndUpdate(req.params.id, {
        description,
        image,
        soil_type,
        humidity,
        temperature,
        arosage,
        quantity,
    });

    res.json(activity);
});

export default activityRouter;