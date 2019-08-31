const Albums = require("../models/albums");
const track_helper = {}

track_helper.getPlayList = async (condition = {}, isMany = false) => {
  try {
    let aggregate = [
      {
        $match:
          condition
      },
      {
        $lookup:
        {
          from: 'tracks_urls',
          localField: '_id',
          foreignField: 'albumId',
          as: 'tracks_url'
        }
      },
      {
        $unwind: "$tracks_url"
      },
      {
        $lookup:
        {
          from: 'categories',
          localField: 'tracks_url.categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: "$category"
      },
      { $addFields: { "tracks_url.categoryName": "$category.name" } }
      ,
      {
        $group: {
          _id: "$_id",
          cover: { $first: "$cover" },
          createdAt: { $first: "$createdAt" },
          language: { $first: "$language" },
          modifiedAt: { $first: "$modifiedAt" },
          name: { $first: "$name" },
          slug: { $first: "$slug" },
          tracks_url: { $addToSet: "$tracks_url" }
        }
      }
    ]
    // let aggregate = [
    //   {
    //     $match:
    //       condition
    //   },
    //   {
    //     $lookup:
    //     {
    //       from: 'tracks_urls',
    //       localField: '_id',
    //       foreignField: 'albumId',
    //       as: 'tracks_url'
    //     }
    //   }
    // ]

    let data = await Albums.aggregate(aggregate);
    if (isMany == false) {
      data = data[0];
    }
    return { status: 1, message: "Data found", data };
  } catch (error) {
    return { status: 0, message: "No data found" };
  }

}

module.exports = track_helper;