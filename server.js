const express = require("express");
const methodOverride = require('method-override')
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const router = express.Router();
require('dotenv').config()

//connection to the models folder
const Workout = require("./models/workoutMode");
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.mongoURI
const app = express()

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))
app.use(methodOverride('_method'))


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/wtracker", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});



//creates a new Workout Object and saves in the db
app.post("/api/workouts", function (req, res) {
    var workout = new Workout(req.body)

    workout.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(workout);
    })
})

app.get("/api/workouts", function (req, res) {

    Workout.find({}).then(function (data, err) {
        if (err) throw err
        res.send(data)
    })
})

app.get("/api/workouts/:id", function (req, res) {

    Workout.findOne({


        _id: req.params.id
    })
        .then((doc) => {
            if (doc) {
                console.log(doc);
            } else {
                console.log("no data exist for this id");
            }



        }
        )
})

app.put("/api/workouts/", function (req, res) {
    var query = req.body
    Workout.update({}, { sort: { name: 1 } }).then(function (data, err) {

        console.log(data)// executes
        res.send(data)
        if (err) throw err

    })
})

app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
});

module.exports = app
module.exports = router
