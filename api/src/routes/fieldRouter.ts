import mongoose from "mongoose";
import express from "express";
import Field from "../models/fieldModel.js";
import Plot from "../models/plotModel.js";
import PlotInField from "../models/isIn.js";
import Sensor from "../models/sensorModel.js";

const fieldRouter = express.Router();

// GET /fields - get all fields
fieldRouter.get("/", async (req, res) => {
    const fields = await Field.find({});
    res.json(fields);
});

// POST /fields - create a new field
fieldRouter.post("/", async (req, res) => {
    const { description, image, soil_type, humidity, temperature, arosage, quantity } = req.body;

    const field = new Field({
        description,
    });

    const savedField = await field.save();

    res.json(savedField);
});

// GET /genData - generate data
fieldRouter.get("/genData", async (req, res) => {
    const grid1 = [
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [2, 2, 2, 0, 0, 1, 1, 1, 1, 1],
        [2, 2, 2, 0, 0, 1, 1, 1, 1, 1],
        [2, 2, 2, 0, 0, 1, 1, 1, 1, 1],
        [2, 2, 2, 0, 0, 1, 1, 1, 1, 1],
        [2, 2, 2, 0, 0, 1, 1, 1, 1, 0],
        [2, 2, 2, 0, 0, 1, 1, 1, 1, 0],
        [2, 2, 2, 0, 0, 0, 1, 1, 1, 0],
        [2, 2, 2, 0, 0, 0, 1, 1, 1, 1],
        [2, 2, 2, 0, 0, 0, 1, 1, 1, 1],
    ];
    
    const expoitation1 = [
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
        [12, 12, 12, 0, 0, 1, 1, 1, 1, 1],
        [12, 12, 12, 0, 0, 1, 2, 2, 2, 2],
        [12, 12, 11, 0, 0, 1, 2, 2, 2, 2],
        [12, 11, 11, 0, 0, 1, 2, 2, 2, 2],
        [12, 11, 11, 0, 0, 3, 3, 3, 3, 0],
        [12, 11, 11, 0, 0, 4, 4, 3, 3, 0],
        [12, 11, 11, 0, 0, 0, 4, 5, 5, 0],
        [12, 11, 11, 0, 0, 0, 4, 5, 5, 5],
        [12, 11, 11, 0, 0, 0, 4, 5, 5, 5],
    ];
    
    const field1 = new Field({
        description: "field1",
    });

    const savedField = await field1.save();

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10 ; j++) {
            const plot = new Plot({
                id: `${i}-${j}`,
                captors: [],
                currentCulture: expoitation1[i][j],
                cultureRotation: [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)],
                field: savedField._id,
            });

            // 3 types of sensors : humidity, temperature, arosage
            // generate between 2 and 3 sensors per plot
            const sensorTypes = ["humidity", "temperature", "fertility"];
            const sensorDataBaseLineHumidity = [60, 57, 62, 65, 59, 61, 63, 64, 58, 60];
            const sensorDataBaseLineTemperature = [28, 29, 27, 26, 30, 28, 29, 27, 26, 30];
            const sensorDataBaseLineFertility = [0.5, 0.6, 0.4, 0.5, 0.6, 0.4, 0.5, 0.6, 0.4, 0.5];

            const sensorDataBase = [sensorDataBaseLineHumidity, sensorDataBaseLineTemperature, sensorDataBaseLineFertility];

            const nbSensors = Math.floor(Math.random() * 2) + 1;
            const sensorTypesIndexes : number[] = [];
//             var arr = [];
// while(arr.length < 8){
//     var r = Math.floor(Math.random() * 100) + 1;
//     if(arr.indexOf(r) === -1) arr.push(r);
// }
            while (sensorTypesIndexes.length < nbSensors) {
                const r = Math.floor(Math.random() * 3);
                if (sensorTypesIndexes.indexOf(r) === -1) sensorTypesIndexes.push(r);
            }

            for (let k = 0; k < nbSensors; k++) {
                const sensorType = sensorTypesIndexes[k];
                const y = sensorDataBase[sensorType].map((x) => x + Math.floor(Math.random() * 5) - 1);   
                const expected = y.map((x) => { const sign = Math.random() > 0.5 ? 1 : -1; return x + sign * Math.floor(Math.random() * 5) - 1; }); 
                const sensor = new Sensor({
                    name: `${i}-${j}-${k}`,
                    description: sensorTypes[sensorType],
                    position: [i, j],
                    x: [],
                    y: y,
                    expected: expected,
                });
                plot.captors.push(sensor._id);
                await sensor.save();
                console.log(plot.captors);
            }
            await plot.save();

            const plotInField = new PlotInField({
                fieldId: savedField._id,
                plotId: plot._id,
            });
            await plotInField.save();
        }
    }

    res.json(savedField);
});

// GET /fields/:id/plot - get plots by field id
fieldRouter.get("/:id/plots", async (req, res) => {
    console.log("requesting plots");
    const plots = await PlotInField.find({ fieldId: req.params.id }).populate("plotId");
    res.json(plots);
});

// GET /fields/:id - get field by id
fieldRouter.get("/:id", async (req, res) => {
    const field = await Field.findById(req.params.id);
    res.json(field);
});

// PUT /field/:id - update field by id
fieldRouter.put("/:id", async (req, res) => {
    const { description } = req.body;

    const field = await Field.findByIdAndUpdate(req.params.id, {
        description,
    });

    res.json(field);
});

export default fieldRouter;