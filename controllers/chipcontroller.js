const express = require('express');
const router = express.Router();
const Chip = require('../db').import('../models/chip');
const validateSession = require('../middleware/validate-session');


router.post('/', validateSession, (req, res) => {
    if (!req.errors) {
        const chipFromRequest = {
            artist: req.body.chip.artist,
            chipType: req.body.chip.chipType,
            chipFlavor: req.body.chip.chipFlavor,
            rating: req.body.chip.rating,
            imageURL: req.body.chip.imageURL 
        }
        Chip.create(chipFromRequest)
          .then(chip => res.status(200).json(chip))
          .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
});

router.get('/', (req, res) => {
        Chip.findAll()
            .then(chip => res.status(200).json(chip))
            .catch(err => res.json(500).json({error:err}))

});

router.get('/artist', (req, res) => {
        Chip.findAll({where: {artist: req.body.artist}})
            .then(chip => res.status(200).json(chip))
            .catch(err => res.json(500).json({error:err}))

});

router.delete('/:id', (req, res) => {
    if (!req.errors) {
        Chip.destroy({ where: {id: req.params.id }})
            .then(chip => res.status(200).json(chip))
            .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
});

router.put('/:id', (req, res) => {
    if (!req.errors) {
        Chip.update(req.body, {where: {id: req.params.id}})
            .then(chip => res.status(200).json(chip))
            .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
});

module.exports = router;