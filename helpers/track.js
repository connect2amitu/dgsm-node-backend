const Track = require("../models/tracks");
const track_helper = {}

track_helper.getTracksData = async (condition = {}, isMany = false) => {
    try {
        let data = await Track.aggregate([
            {
                $match: condition
            },
            {
                $lookup: {
                    from: "albums",
                    localField: "albumId",
                    foreignField: "_id",
                    as: "album"
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
                    from: "tracks_urls",
                    localField: "_id",
                    foreignField: "trackId",
                    as: "tracks"
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

track_helper.getFilteredRecords = async filterObj => {
    skip = filterObj.pageSize * filterObj.page;
    try {
        var searchedRecordCount = await Track.aggregate([{
            $match: filterObj.columnFilter
        }]);
        var filteredData = await Track.aggregate([
            {
                $lookup: {
                    from: "albums",
                    localField: "albumId",
                    foreignField: "_id",
                    as: "album"
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
                    from: "tracks_urls",
                    localField: "_id",
                    foreignField: "trackId",
                    as: "tracks"
                }
            },
            {
                $match: filterObj.columnFilter
            },
            {
                $sort: filterObj.columnSort
            },
            {
                $skip: skip
            },
            {
                $limit: filterObj.pageSize
            },
        ]);

        let recordCount = searchedRecordCount.length;
        return {
            status: 1,
            message: "Data found",
            data: {
                count: recordCount,
                totalPages: Math.ceil(recordCount / filterObj.pageSize),
                data: filteredData
            }
        };

    } catch (err) {
        return { status: 0, message: "No data found" };
    }
};

module.exports = track_helper;