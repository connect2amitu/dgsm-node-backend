const Albums = require("../models/albums");
const album_helper = {}

album_helper.getFilteredRecords = async filterObj => {
    skip = filterObj.pageSize * filterObj.page;
    try {
        var searchedRecordCount = await Albums.countDocuments(filterObj.columnFilter);

        var filteredData = await Albums.aggregate([{
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
            status: 1, message: "Data found",
            count: searchedRecordCount,
            totalPages: Math.ceil(
                searchedRecordCount / filterObj.pageSize
            ),
            data: filteredData
        };

    } catch (err) {
        return { status: 0, message: "No data found" };
    }
};

module.exports = album_helper;