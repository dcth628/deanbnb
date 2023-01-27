const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth')
const { Spot, User, Image, Review, Booking, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const router = express.Router();

// Delete a review image
router.delete(
    '/:reviewImageId',
    async (req, res) => {
        const image = await Image.findOne({
            where:{
                imageId: req.params.reviewImageId,
                imageType: "Review"
            },
            include: {
                model: Review, where: { id: req.params.reviewImageId}
            }
        });
        const review =  await Review.findByPk(req.params.reviewImageId)
        console.log(review)
        console.log(req.params.reviewImageId)
        console.log(image)
        if (!image) {
            return res.status(404).json({
                message: "Review Image couldn't be found",
                statusCode: 404
            })
        } else {
            await image .destroy();
            return res.status(200).json({
                message: "Successfully deleted",
                statusCode: 200
            })
        }
    }
)

module.exports = router;
