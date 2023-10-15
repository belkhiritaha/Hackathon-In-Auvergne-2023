import mongoose from "mongoose";
import express from "express";

import Sensor from "../models/sensorModel.js";

import { io } from "../api.js";

const sensorsRouter = express.Router();

// GET /sensors - get all sensors
sensorsRouter.get("/", async (req, res) => {
    const sensors = await Sensor.find({});
    res.json(sensors);
});

// POST /sensors - create a new sensor
sensorsRouter.post("/", async (req, res) => {
    const { name, description, position } = req.body;

    const sensor = new Sensor({
        name,
        description,
        position,
    });

    const savedSensor = await sensor.save();

    res.json(savedSensor);
});

// GET /sensors/:id - get sensor by id
sensorsRouter.get("/:id", async (req, res) => {
    const sensor = await Sensor.findById(req.params.id);
    res.json(sensor);
});

// POST /sensors/:id/data - add data to sensor
sensorsRouter.post("/:id/data", async (req, res) => {
    const { y, expected } = req.body;
    console.log(y, expected);

    const sensor = await Sensor.findById(req.params.id);

    sensor?.y.push(y);
    sensor?.expected.push(expected);

    if (Math.abs(y - expected) > 20) {
        io.emit("alert", { sensorId: req.params.id, y, expected });
    }

    const savedSensor = await sensor?.save();

    res.json(savedSensor);
});

export default sensorsRouter;