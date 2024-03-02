const EmailQueue = require("../models/EmailQueue");
const Subscriber = require("../models/Subscriber");
const customError = require("../utils/error");
const ScheduledJob = require("../utils/mailScheduler");

const EmailQueueController = {
  createEmail: async (req, res) => {
    const { subject, text, date } = req.body;
    const listid = req.params.listid;
    const emails = await EmailQueue.find({ listid: listid });
    const newEmail = await EmailQueue.create({
      subject,
      text,
      listid,
      timetosend: date,
    });
    if (!newEmail) throw new customError(500, "Something went wrong");

    ScheduledJob(newEmail);
    return res.status(201).json({ message: "Email created successfully" });
  },
};

module.exports = { EmailQueueController };
