const router = require('express').Router();
const Facility = require('../models/facilitiesModel');

router.get("/", async (req, res) => {
    const facility = await Facility.find();
    res.json(facility);
});

router.post("/", async (req, res) => {
    try {
        let { nameOfDoctor, doctorDepartment, treatmentDuration, medicalCondition, purposeOfVisit, location, lastVisit } = req.body;

        // VALIDATE IF FIELDS ARE EMPTY
        if( !nameOfDoctor || !doctorDepartment || !treatmentDuration || !medicalCondition || !purposeOfVisit || !location || !lastVisit ){
            return res.status(400).json({ msg: 'Please Enter Every Field' });
        }

        const newFacility = new Facility({
            nameOfDoctor, 
            doctorDepartment,
            treatmentDuration,
            medicalCondition,
            purposeOfVisit,
            location,
            lastVisit
        });

        const savedFacility = await newFacility.save();
        res.json(savedFacility);
    } catch (err) {
        res.status(500).json( { error: err.message } )
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedFacility = await Facility.findByIdAndDelete(id);
        res.json(deletedFacility);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.put("/:id", async (req, res) => {
    try {
        let facility = {}
        if (!req.body.nameOfDoctor || !req.body.doctorDepartment || !req.body.treatmentDuration || !req.body.medicalCondition || !req.body.purposeOfVisit || !req.body.location || !req.body.lastVisit){
            return res.status(400).json({ msg: 'Please Enter Every Field' });
        } else {            
            facility.nameOfDoctor = req.body.nameOfDoctor;
            facility.doctorDepartment = req.body.doctorDepartment;
            facility.treatmentDuration = req.body.treatmentDuration;
            facility.medicalCondition = req.body.medicalCondition;
            facility.purposeOfVisit = req.body.purposeOfVisit;
            facility.location = req.body.location;
            facility.lastVisit = req.body.lastVisit;
        }

        Facility.updateOne({_id: req.params.id}, facility).then(() => {
            res.status(200).send(facility);
        }).catch((err) => {
            res.status(500).json( { error: err.message } );
        })
    } catch (err) {
        res.status(500).json( { error: err.message } )
    }    
});

module.exports = router;