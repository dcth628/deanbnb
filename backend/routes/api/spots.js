const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth')
const { Spot, User, Image } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const router = express.Router();

const validateCreatespot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true})
        .isLength({ max: 50})
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true})
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true})
        .withMessage('Price per day is required'),
    handleValidationErrors
]

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
    restoreUser,
    async (req, res) => {
        const { user } = req;
        const spots = await Spot.findAll({
            where: {
                ownerId: user.id
            }
        })
        res.json(spots)
    }
)

// Get details of a spot from an id
router.get(
    '/:spotId',
    async (req, res) => {
        const spot = await Spot.findOne({
            where: {
                id: req.params.spotId
            },
            include: [User, Image]
        });
        if (!spot) {
            res.status(404);
            return res.json({ Message: "Spot couldn't be found" })
        }
        res.json(spot);
    }
)

// Create a spot
router.post(
    '/',
    validateCreatespot,
    async (req, res) => {
        const userId = req.user.id
        const {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            ownerId = userId
        } = req.body;
        const spot = await Spot.createspot({
           ownerId, address, city, state, country, lat, lng, name, description,price
        });

        return res.status(201).json({spot})
    }
)

// Delete a spot by spotId
router.delete(
    '/:spotId',
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) {
            res.status(404);
            return res.json({ Message: 'Spot not found'})
        }
        await spot.destroy();
        return res.status(200).json({ Message: 'Spot successfully deleted'})
    }

)

module.exports = router;
