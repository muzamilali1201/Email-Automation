const List = require("../models/List");
const EmailQueue = require("../models/EmailQueue");
const Subscriber = require("../models/Subscriber");

const dashboardController = {
  mailTracker: async (req, res) => {
    const userid = req.userid;
    const Lists = await List.find({ userid: userid });
    const mails = await EmailQueue.find({ userid: userid }).select("-text");
    let MailTrackerList = [];

    for (let list of Lists) {
      list = list.toObject();
      list.subsciberCount = await Subscriber.countDocuments({
        listid: list._id,
      });
      MailTrackerList.push(list);
    }
    res.status(200).json({ Lists: MailTrackerList, Mails: mails });
  },
};

module.exports = { dashboardController };
