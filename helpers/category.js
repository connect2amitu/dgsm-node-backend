const Category = require("../models/categories");
const category_helper = {}

category_helper.getFilteredRecords = async filterObj => {
    skip = filterObj.pageSize * filterObj.page;
    try {
        var searchedRecordCount = await Category.aggregate([{
            $match: filterObj.columnFilter
        }]);

        var filteredData = await Category.aggregate([{
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
            count: searchedRecordCount.length,
            totalPages: Math.ceil(
                searchedRecordCount.length / filterObj.pageSize
            ),
            data: filteredData
        };

    } catch (err) {
        return { status: 0, message: "No data found" };
    }
};

module.exports = category_helper;