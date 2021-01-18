const router = require('express').Router();
const Consent = require('../models/consentModel');

router.get("/", async (req, res) => {
    const consent = await Consent.find();
    res.json(consent);
});

router.post("/", async (req, res) => {
    try {
        let { patient, signature } = req.body;

        // VALIDATE IF FIELDS ARE EMPTY
        if( !patient || !signature ){
            return res.status(400).json({ msg: 'Please Enter Every Field' });
        }

        const newConsent = new Consent({
            patient, 
            signature
        });

        const savedConsent = await newConsent.save();
        res.json(savedConsent);
    } catch (err) {
        res.status(500).json( { error: err.message } )
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedConsent = await Consent.findByIdAndDelete(id);
        res.json(deletedConsent);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.put("/:id", async (req, res) => {
    try {
        let consent = {}
        if (!req.body.patient || !req.body.signature){
            return res.status(400).json({ msg: 'Please Enter Every Field' });
        } else {            
            consent.patient = req.body.patient;
            consent.signature = req.body.signature;
        }

        Consent.updateOne({_id: req.params.id}, consent).then(() => {
            res.status(200).send(consent);
        }).catch((err) => {
            res.status(500).json( { error: err.message } );
        })
    } catch (err) {
        res.status(500).json( { error: err.message } )
    }    
});

module.exports = router;