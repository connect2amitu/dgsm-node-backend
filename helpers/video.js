const Video = require("../models/videos");
const video_helper = {}

video_helper.getVideosData = async (condition = {}, isMany = false) => {
    try {
        let data = await Video.aggregate([
            {
                $match: condition
            },
            {
                $lookup: {
                    from: "albums",
                    as: "album",
                    localField: "albumId",
                    foreignField: "_id"
                }
            },
            {
                $unwind: "$album"
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },
            {
                $lookup: {
                    from: "videos_urls",
                    localField: "_id",
                    foreignField: "videoId",
                    as: "videos"
                }
            },
        ]);
        if (!isMany == false) {
            data = data[0];
        }
        return { status: 1, message: "Data found", data };
    } catch (error) {
        return { status: 0, message: "No data found" };
    }

}

module.exports = video_helper;