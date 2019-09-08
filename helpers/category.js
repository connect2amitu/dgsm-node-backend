const Category = require("../models/categories");
const category_helper = {}

category_helper.getFilteredRecords = async filterObj => {
    skip = filterObj.pageSize * filterObj.page;
    try {
        var searchedRecordCount = await Category.countDocuments(filterObj.columnFilter);
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
            count: searchedRecordCount,
            totalPages: Math.ceil(
                searchedRecordCount / filterObj.pageSize
            ),
            data: filteredData
        };

    } catch (err) {
        console.info('------------------------------------');
        console.info(`err => `, err);
        console.info('------------------------------------');

        return { status: 0, message: "No data found" };
    }
};


category_helper.getCategoryTracks = async condition => {
    try {
      var filteredData = await Category.aggregate([
        {
          $match: condition
        },
        {
          $lookup:
          {
            from: 'tracks_urls',
            localField: '_id',
            foreignField: 'categoryId',
            as: 'tracks_url'
          }
        },
        {
          $unwind: "$tracks_url"
        },
        { $addFields: { "tracks_url.categoryName": "$name" } },
        {
          $group: {
            _id: "$_id",
            cover: { $first: "$cover" },
            createdAt: { $first: "$createdAt" },
            modifiedAt: { $first: "$modifiedAt" },
            name: { $first: "$name" },
            slug: { $first: "$slug" },
            tracks_url: { $addToSet: "$tracks_url" }
          }
        }
      ]);

        return {
            status: 1, message: "Data found",
            data: filteredData.length > 0 ? filteredData[0] : null
        };

    } catch (err) {
        console.info('------------------------------------');
        console.info(`err => `, err);
        console.info('------------------------------------');

        return { status: 0, message: "No data found" };
    }
};

module.exports = category_helper;