const node_schedule = require("node-schedule");
const EmailQueue = require("../models/EmailQueue");
const Subscriber = require("../models/Subscriber");
const emailSender = require("../utils/nodemailer");

const ScheduledJob = async (email) => {
  if (email?.send == false) {
    node_schedule.scheduleJob(email?.timetosend, async () => {
      console.log("Email is sending at : ", email.timetosend);
      const listid = email.listid;
      const subscriberList = await Subscriber.find({ listid: listid });
      console.log(subscriberList);
      subscriberList.forEach(async (elem) => {
        const recipient = {
          email: elem.email,
          subject: email.subject,
          message: email.text,
        };
        emailSender(recipient);
      });
      email.send = true;
      await email.save();
    });
  }
};

const mailScheduler = async () => {
  const emails = await EmailQueue.find();
  emails.forEach(async (elem) => {
    if (elem.send == false) {
      ScheduledJob(elem);
    }
  });
};
module.exports = mailScheduler;
