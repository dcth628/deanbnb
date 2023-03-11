const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth')
const { Spot, User, Image, Review} = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const router = express.Router()

const validateEditreview = [
    check('review')
        .exists({ checkFalsy: true})
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true})
        .isInt({ min:0, max:5})
        .withMessage('Stars must be from 1 to 5'),
    handleValidationErrors
]

// Get all reviews
router.get(
    '/',
    async (req, res) => {
        const reviews = await Review.findAll()
        res.json(reviews)
    }
)

// Get all reviews of the current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const { user } = req;
        const reviews = await Review.findAll({
            where: {
                userId: user.id
            },
            include: [{
                model: User,
                attributes: { exclude: ['username','email','hashedPassword','createdAt','updatedAt']}

            }, {
                model: Spot,
                attributes: { exclude: ['createdAt','updatedAt']}
            }, {
                model: Image, as: "ReviewImages",
                attributes: { exclude: ['imageType', 'imageId', 'preview','createdAt','updatedAt']}
            }]
        })
        if (!reviews.length) {
            res.status(404);
            return res.json({
                message: "Couldn't found reviews",
                statusCode: 404
            })
        }

        res.json({Reviews: reviews})
    }
)

// Add an image to a review by reviewId
router.post(
    '/:reviewId/images',
    async (req, res) => {
        const review = await Review.findByPk(req.params.reviewId);
        if (!review) {
            res.status(404).json({
                message: "Review couldn't be found",
                statusCode: 404
            })
        }
        const allReviews = await Image.findAll({
            where: {imageId: req.params.reviewId}
            });
        if (allReviews.length >= 10) {
            res.status(403).json({
                message: "Maximum number of images for this resource was reached",
                statusCode: 403
            })
        }
        const { url } = req.body;
        const image = await Image.create({
            url,
            imageId: req.params.reviewId,
            imageType: 'Review'
        })
        const resObject = {
            id: image.id,
            url: image.url
        }
        return res.status(201).json(resObject)
    }
)

//Edit a review
router.put(
    '/:reviewId',
    validateEditreview,
    async (req, res) => {
        const { review, stars} = req.body;
        const reviews= await Review.findByPk(req.params.reviewId
            ,{
             include: [{
                model: User,
                attributes: { exclude: ['username','email','hashedPassword','createdAt','updatedAt']}

            }]
        }
        );
        if (!reviews) {
            res.status(404).json({
                message: "Review couldn't be found",
                statusCode: 404
            })
        }
        reviews.review = review;
        reviews.stars = stars;
        reviews.userId = req.user.id;
        reviews.spotId = reviews.spotId;
        await reviews.save()
        res.json(reviews)
    }
)

// Delete a review
router.delete(
    '/:reviewId',
    requireAuth,
    async (req, res) => {
        const review = await Review.findByPk(req.params.reviewId);
        if (!review) {
            res.status(404).json({
                message: "Review couldn't be found",
                statusCode: 404
            })
        }
        if (req.user.id !== review.userId) {
            const err = new Error('Forbidden')
            res.status(403).json({
                message: err.message,
                statusCode: 403
            })
        }
        await review.destroy();
        return res.status(200).json(review)
    }
)

// // Delete a review image
// router.delete(
//     '/:reviewId/images/:imageId',
//     async (req, res) => {
//         const image = await Image.findByPk(req.params.imageId, {
//             include: {
//                 model: Review, where: { id: req.params.reviewId}
//             }
//         });
//         if (!image) {
//             return res.status(404).json({
//                 message: "Review Image couldn't be found",
//                 statusCode: 404
//             })
//         } else {
//             await image .destroy();
//             return res.status(200).json({
//                 message: "Successfully deleted",
//                 statusCode: 200
//             })
//         }
//     }
// )

module.exports = router;
