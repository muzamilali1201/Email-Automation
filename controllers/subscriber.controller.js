const Subscriber = require("../models/Subscriber");
const customError = require("../utils/error");
const emailSender = require("../utils/nodemailer");
const List = require("../models/List");

const subscriberController = {
  subscribeUser: async (req, res) => {
    const { name, email } = req.body;
    const { listid } = req.params;
    const UserwithListId = await List.findOne({ _id: listid });
    if (!name || !email) {
      throw new customError(400, "All fields are required");
    }
    const existingSubscriber = await Subscriber.findOne({
      listid: listid,
    });
    if (existingSubscriber)
      throw new customError(409, "You already subscribed");
    const newSubscriber = await Subscriber.create({
      name,
      email,
      listid: listid,
    });
    const recipient = {
      mail: userSub.email,
      subject: "Subscription Acknowledment",
      message: `
          <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Newsletter!</title>
    <style>
        /* Add your custom CSS styles here */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1, p {
            margin: 0;
            color: #333333;
        }
        h1 {
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
        }
        p {
            font-size: 16px;
            margin-bottom: 10px;
        }
        ul {
            margin: 0;
            padding-left: 20px;
        }
        li {
            margin-bottom: 5px;
            color: #666666;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 16px;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Our Newsletter!</h1>
        <p>Dear ${name},</p>
        <p>Thank you for subscribing to our newsletter! You have successfully subscribed "${listUser.listname}" list. We're thrilled to have you on board.</p>
        <p>Here's what you can expect from our newsletter:</p>
        <ul>
            <li>Exciting updates about our products/services</li>
            <li>Exclusive offers and promotions</li>
            <li>Helpful tips and resources</li>
        </ul>
        <p>We promise to keep your inbox interesting and relevant. If you ever have any questions or feedback, feel free to reach out to us.</p>
        <p>Stay tuned for our upcoming emails!</p>
        <p style="text-align: center;"><a href="#" class="button">Explore Our Website</a></p>
        <p style="text-align: center;">Best regards,</p>
        <p style="text-align: center;">${listUser.orgname} Team</p>
    </div>
</body>
</html>

          
          
          `,
    };
    emailSender(recipient);
    return res.status(200).json({ message: "User successfully Subscribed" });
  },
  getAllSubscribers: async (req, res) => {
    const allSubscribers = await Subscriber.find();
    if (!allSubscribers) throw new customError(404, "Nothing Found!");
    return res.status(200).json({ Subscribers: allSubscribers });
  },
  removeSubscriberById: async (req, res) => {
    const { subscriberid } = req.params;
    const deleteSubscriber = await Subscriber.findByIdAndDelete(subscriberid);
    if (!deleteSubscriber) throw new customError(404, "Subscriber didn't find");
    return res
      .status(200)
      .json({ message: "Subscriber removed successfully!" });
  },
};

module.exports = { subscriberController };
