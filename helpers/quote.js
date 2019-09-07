const Quotes = require("../models/quotes");
const quote_helper = {}

quote_helper.getFilteredRecords = async (filterObj) => {
    skip = filterObj.pageSize * filterObj.page;
    try {
        var searchedRecordCount = await Quotes.countDocuments(filterObj.columnFilter);
        var filteredData = await Quotes.aggregate([
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

}

module.exports = quote_helper;