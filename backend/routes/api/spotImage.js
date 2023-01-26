const express = require('express')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth')
const { Spot, User, Image, Review, Booking, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const e = require('express');
const router = express.Router();


// Delete a spot image
router.delete(
    '/:spotImageId',
    async (req, res) => {
        const image = await Image.findOne({
            where: {
                imageId: req.params.spotImageId,
                imageType: "Spot"
            },
            include: {
                model: Spot, where: { id: req.params.spotImageId }
            }
        });
        if (!image) {
            return res.status(404).json({
                message: "Spot Image couldn't be found",
                statusCode: 404
            })
        } else {
            await image.destroy();
            return res.status(200).json({
                message: "Successfully deleted",
                statusCode: 200
            })
        }
    }
)

module.exports = router;
