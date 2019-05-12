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
          from: 'tracks',
          localField: '_id',
          foreignField: 'albumId',
          as: 'tracks'
        }
      },
      { $unwind: '$tracks' },
      {
        $lookup:
        {
          from: 'tracks_urls',
          localField: 'tracks._id',
          foreignField: 'trackId',
          as: 'tracks_url'
        }
      }]

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