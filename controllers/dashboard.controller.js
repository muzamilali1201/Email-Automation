const Sublist = require("../models/Sublist");
const EmailQueue = require("../models/EmailQueue");
const Subscriber = require("../models/Subscriber");

const dashboardController = {
  mailTracker: async (req, res) => {
    const userid = req.id;
    const Lists = await Sublist.find({ userid: userid });
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
