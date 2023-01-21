const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { Spot } = require('../../db/models');
const { Check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const router = express.Router();

// Get all spots
router.get(
    '/',
    async (req, res) => {
        const spots = await Spot.findAll()
        res.json(spots)
    }
)

// Get all spots owned by the current user
router.get(
    '/current',
    async (req, res) => {
        const spots = await Spot.findByPk()
    }
)

// Get details of a spot from an id
router.get(
    '/:spotId',
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) {
            res.status(404);
            return res.json({ Message: "Spot couldn't be found" })
        }
        res.json(spot);
    }
)

module.exports = router;
