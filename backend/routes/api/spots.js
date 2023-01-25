const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth')
const { Spot, User, Image, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')
const router = express.Router();

const validateCreatereview = [
    check('review')
        .exists({ checkFalsy: true})
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true})
        .isInt({ min:0, max:5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

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
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
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
    requireAuth,
    async (req, res) => {
        const { user } = req;
        const spots = await Spot.findAll({
            where: {
                ownerId: user.id
            }
        })
        if (!spots.length) {
            res.status(404);
            return res.json({
                Message: "Spot couldn't be found",
                stateCode: 404
            })
        }
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
            include: [Image, {model: User, as: "Owner"}]
        });
        if (!spot) {
            res.status(404);
            return res.json({
                Message: "Spot couldn't be found",
                stateCode: 404
            })
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
            ownerId, address, city, state, country, lat, lng, name, description, price
        });

        return res.status(201).json(spot)
    }
)

// Delete a spot by spotId
router.delete(
    '/:spotId',
    requireAuth,
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) {
            res.status(404);
            return res.json({ Message: 'Spot not found' })
        }
        if (req.user.id !== spot.ownerId) {
            const err = new Error('Forbidden')
            res.status(403);
            res.json({
                message: err.message,
                statusCode: 403
            })
        }

        await spot.destroy();
        return res.status(200).json({ Message: 'Spot successfully deleted' })
    }

)

// Edit a spot
router.put(
    '/:spotId',
    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const spot = await Spot.scope("currentSpot").findByPk(req.params.spotId);
        if (!spot) res.status(404).json({ Message: "Spot couldn't be found" });
        spot.address = address;
        spot.city = city;
        spot.state = state;
        spot.country = country;
        spot.lat = lat;
        spot.lng = lng;
        spot.name = name;
        spot.description = description;
        spot.price = price;
        await spot.save();
        res.json(spot)
    }
)

// Add a image to a spot by spotId
router.post(
    '/:spotId/images',
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) {
            res.status(404);
            return res.json({
                Message: "Spot couldn't be found",
                stateCode: 404
            })
        }
        const {
            url,
            preview,
        } = req.body;
        const image = await Image.create({
            url, preview,
            imageId: req.params.spotId,
            imageType: "Spot"
        })
        const resObject = {
            id: image.id,
            url: image.url,
            preview: image.preview
        }
        return res.status(201).json(resObject)
    }
)

// Get all reviews by a spotId
router.get(
    '/:spotId/reviews',
    async (req, res) => {
        const spotReview = await Review.findAll({
            where: {
                spotId: req.params.spotId
            },
            include: [User, Image]
        });
        if (!spotReview.length) {
            res.status(404);
            return res.json({
                Message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        res.json(spotReview)
    }
)

// Create a review for a spot by spotId
router.post(
    '/:spotId/reviews',
    validateCreatereview,
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) {
            res.status(404);
            return res.json({
                Message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        const userId = await Review.findOne({
            where: { userId: req.user.id}
        })
        if (userId) {
            const err = new Error('User already has a review for this spot')
            res.status(403).json({
                Message: err.message,
                statusCode: 403,
            })
        }

        const { review, stars } = req.body;
        const newReview = await Review.create({
            userId: req.user.id,
            spotId: req.params.spotId,
            review, stars
        })
        return res.status(201).json(newReview)
    }
)

module.exports = router;
