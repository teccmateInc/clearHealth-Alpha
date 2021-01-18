const router = require('express').Router();
const Record = require('../models/recordModel');

router.get("/", async (req, res) => {
    const record = await Record.find();
    res.json(record);
});

router.post("/", async (req, res) => {
    try {
        let { patient, facility, title, description, pdfFile } = req.body;

        // VALIDATE IF FIELDS ARE EMPTY
        if( !patient || !facility || !title || !description || !pdfFile ){
            return res.status(400).json({ msg: 'Please Enter Every Field' });
        }

        const newRecord = new Record({
            patient, 
            facility,
            title,
            description,
            pdfFile
        });

        const savedRecord = await newRecord.save();
        res.json(savedRecord);
    } catch (err) {
        res.status(500).json( { error: err.message } )
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedRecord = await Record.findByIdAndDelete(id);
        res.json(deletedRecord);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.put("/:id", async (req, res) => {
    try {
        let record = {}
        if (!req.body.patient || !req.body.facility || !req.body.title || !req.body.description || !req.body.pdfFile){
            return res.status(400).json({ msg: 'Please Enter Every Field' });
        } else {            
            record.patient = req.body.patient;
            record.facility = req.body.facility;
            record.title = req.body.title;
            record.description = req.body.description;
            record.pdfFile = req.body.pdfFile;
        }

        Record.updateOne({_id: req.params.id}, record).then(() => {
            res.status(200).send(record);
        }).catch((err) => {
            res.status(500).json( { error: err.message } );
        })
    } catch (err) {
        res.status(500).json( { error: err.message } )
    }    
});

module.exports = router;