import mongoose from "mongoose";
import express from "express";

import Plot from "../models/plotModel.js";
import Sensor from "../models/sensorModel.js";

const plotsRouter = express.Router();

// GET /plots - get all plots
plotsRouter.get("/", async (req, res) => {
    const plots = await Plot.find({});
    res.json(plots);
});

// GET /plots/:id/sensors - get all sensors data in plot
plotsRouter.get("/:id/sensors", async (req, res) => {
    const plot = await Plot.findById(req.params.id);
    const sensorIds = plot?.captors;
    const sensors = await Sensor.find({ _id: { $in: sensorIds } });
    res.json(sensors);
});

// GET /plots/:id - get plot by id
plotsRouter.get("/:id", async (req, res) => {
    const plot = await Plot.findById(req.params.id);
    res.json(plot);
});

export default plotsRouter;