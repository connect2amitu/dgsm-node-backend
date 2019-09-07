const Image = require("../models/images");
const image_helper = {}

image_helper.getImagesData = async (condition = {}, isMany = false) => {
    try {
        let data = await Image.aggregate([
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
                    from: "images_urls",
                    localField: "_id",
                    foreignField: "imageId",
                    as: "images"
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

image_helper.getFilteredRecords = async filterObj => {
    skip = filterObj.pageSize * filterObj.page;
    try {
        var searchedRecordCount = await Image.countDocuments(filterObj.columnFilter);
        var filteredData = await Image.aggregate([
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
                    from: "images_urls",
                    localField: "_id",
                    foreignField: "imageId",
                    as: "images"
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

        return {
            status: 1,
            message: "Data found",
            data: {
                count: searchedRecordCount,
                totalPages: Math.ceil(searchedRecordCount / filterObj.pageSize),
                data: filteredData
            }
        };

    } catch (err) {
        return { status: 0, message: "No data found" };
    }
};


module.exports = image_helper;