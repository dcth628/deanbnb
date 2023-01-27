const express = require('express')
const { Op } = require('sequelize')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth')
const { Spot, User, Image, Review, Booking, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const router = express.Router();

const validateCreatebooking = [
    check('endDate')
        .exists()
        .isBefore('startDate')
        .withMessage('endDate cannot be on or before startDate'),
    check('endDate')
        .exists()
        .isAfter('startDate')
        .withMessage('startDate cannot be on or after endDate'),
    handleValidationErrors
]

const validateCreatereview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 0, max: 5 })
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
        let { page, size } = req.query;

        page = Number(page);
        size = Number(size);

        if (Number.isNaN(page)) page = 0;
        if (Number.isNaN(size)) size = 20
        console.log(page, size)
        // const rating = await Spot.findAll({
        //     attributes: {
        //         include: [
        //             [sequelize.fn('AVG',sequelize.col('Reviews.stars')),
        //             'avgRating']
        //         ],
        //     },
        //     include: [
        //         { model: Review, attributes: [] },
        //     ],
        // })

        const spots = await Spot.findAll({
            //     attributes: {
            //         include: [
            //             [sequelize.fn('COALESCE', sequelize.fn('AVG',sequelize.col('Reviews.stars')), 0), 'avgRating']
            //         ],
            //     },
            //     include: [
            //         { model: Review, attributes: [] },
            //     ],
            // },{
            limit: size,
            offset: size * (page - 1),
        })
        res.json({
            Spots: spots, page, size
        })
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
            },
            attributes: {
                include: [
                    // [
                    //     sequelize.fn('AVG', sequelize.col("Reviews.stars")),
                    //     "avgRating"
                    // ],
                    // [
                    //     sequelize.fn('COALESCE', sequelize.col("Images.url")),
                    //     "previewImage"
                    // ]
                ],
            },
            include: [
                { model: Review, attributes: [] },
                // { model: Image, as: "ReviewImages"}
            ]
        })
        if (!spots.length) {
            res.status(404);
            return res.json({
                message: "Spot couldn't be found",
                stateCode: 404
            })
        }
        res.json({ Spots: spots })
    }
)

// Get details of a spot from an id
router.get(
    '/:spotId',
    async (req, res) => {
        const spot = await Spot.findByPk(req.params.spotId, {
            attributes: {
                include: [
                    [
                        sequelize.fn('AVG', sequelize.col("Reviews.stars")),
                        "avgRating"
                    ],
                    [
                        sequelize.fn('COUNT', sequelize.col("Reviews.id")),
                        "numReviews"
                    ]
                ],
                exclude: ['previewImage']
            },
            include: [
                { model: Image, as: "ReviewImages" },
                { model: User, as: "Owner" },
                { model: Review, attributes: [] }
            ]
        });
        console.log(spot)
        if (spot.id === null) {
            res.status(404);
            return res.json({
                message: "Spot couldn't be found",
                stateCode: 404
            })
        }
        res.json({ Spot: spot });
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
            return res.json({ message: 'Spot not found' })
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
        return res.status(200).json({ message: 'Spot successfully deleted' })
    }

)

// Edit a spot
router.put(
    '/:spotId',
    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const spot = await Spot.scope("currentSpot").findByPk(req.params.spotId);
        if (!spot) res.status(404).json({ message: "Spot couldn't be found" });
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
                message: "Spot couldn't be found",
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
            include: [{
                model: User,
                attributes: { exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt'] }
            }, {
                model: Image, as: "ReviewImages",
                attributes: { exclude: ['imageType', 'imageId', 'preview', 'createdAt', 'updatedAt'] }
            }]
        });
        if (!spotReview.length) {
            res.status(404);
            return res.json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        res.json({ Reviews: spotReview })
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
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        const userId = await Review.findOne({
            where: { userId: req.user.id }
        })
        if (userId) {
            const err = new Error('User already has a review for this spot')
            res.status(403).json({
                message: err.message,
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


//Get all bookings by spotId
router.get(
    '/:spotId/bookings',
    async (req, res) => {

        const spot = await Spot.findByPk(req.params.spotId)
        if (!spot) {
            res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        }
        if (spot.ownerId === req.user.id) {
            const bookings = await Booking.findAll({
                where: {
                    spotId: req.params.spotId,
                    userId: req.user.id
                },
                include: {
                    model: User,
                    attributes: { exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt'] }
                },
            })
            return res.status(200).json({ Bookings: bookings })
        } else {
            const bookings = await Booking.findAll({
                where: {
                    spotId: req.params.spotId,
                },
                attributes: {
                    exclude: ['id', 'userId', 'createdAt', 'updatedAt']
                }
            })
            return res.status(200).json({ Bookings: bookings })
        }
    }
)

//Create a bookings by spotId
router.post(
    '/:spotId/bookings',
    // validateCreatebooking,
    async (req, res) => {
        const { startDate, endDate } = req.body;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const spot = await Spot.findByPk(req.params.spotId);
        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
        };

        const booking = await Booking.findOne({
            where: {
                spotId: req.params.spotId,
                startDate: {
                    [Op.eq]: start
                },
                endDate: {
                    [Op.eq]: end
                }
            },
            include: {
                model: Spot,
                where: {
                    id: req.params.spotId
                }
            }
        })


        if (!booking) {
            const booking = await Booking.create({
                spotId: req.params.spotId,
                userId: req.user.id,
                startDate, endDate
            })
            return res.status(201).json(booking)
        }

        if (start >= end) {
            return res.status(400).json({
                message: "Validation error",
                statusCode: 400,
                error: ["endDate cannot be on or before startDate"]
            })
        } else if (start.getTime() === booking.startDate.getTime() || end.getTime() === booking.endDate.getTime()) {
            return res.status(403).json({
                message: 'Sorry, this spot is already booked for the specified dates',
                statusCode: 403,
                errors: [
                    "Start date conflicts with an existing booking",
                    "End date conflicts with an existing booking"
                ]
            })
        }
        // else {
        //     const booking = await Booking.create({
        //         spotId: req.params.spotId,
        //         userId: req.user.id,
        //         startDate, endDate
        //     })

        //     return res.status(201).json(booking)
        // }
    }
)

// Delete a spot image
// router.delete(
//     '/spot-images/:spotImageId',
//     async (req, res) => {
//         const image = await Image.findOne({
//             where: {
//                 imageId: req.params.spotImageId,
//                 imageType: "Spot"
//             },
//             include: {
//                 model: Spot, where: { id: req.params.spotImageId }
//             }
//         });
//         if (!image) {
//             return res.status(404).json({
//                 message: "Spot Image couldn't be found",
//                 statusCode: 404
//             })
//         } else {
//             await image.destroy();
//             return res.status(200).json({
//                 message: "Successfully deleted",
//                 statusCode: 200
//             })
//         }
//     }
// )



module.exports = router;
