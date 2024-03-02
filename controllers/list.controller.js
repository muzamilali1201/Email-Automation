const List = require("../models/List");
const customError = require("../utils/error");
const Subscriber = require("../models/Subscriber");

const ListController = {
  addList: async (req, res) => {
    const { userid } = req;
    const { listname } = req.body;
    const listExist = await List.findOne({
      listname: listname,
    });
    if (listExist) {
      throw new customError(409, "List with this name already exists");
    }
    const list = await List.create({
      userid,
      listname,
    });
    if (!list) throw new customError(500, "Something went wrong");
    return res.status(201).json("List successfully created!");
  },
  selectList: async (req, res) => {
    const { listid } = req.params;
    const subscribersByListId = await Subscriber.find({ listid: listid });
    const lists = await List.find({ _id: listid });
    if (!subscribersByListId && !lists)
      throw new customError(404, "Nothing Found!");
    return res
      .status(200)
      .json({ Lists: lists, subscriberList: subscribersByListId });
  },
  removeList: async (req, res) => {
    const { listid } = req.params;
    const removeListById = await List.findByIdAndDelete(listid);
    const subscribersWithId = await Subscriber.deleteMany({
      listid: listid,
    });
    if (!removeListById) {
      throw new customError(404, "List not found!");
    }
    return res
      .status(200)
      .json({ message: "List has been removed sucessfully!" });
  },
};

module.exports = { ListController };
