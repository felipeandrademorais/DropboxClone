const Box = require("../models/Box");

class BoxController {
  async store(req, res) {
    const box = await Box.create({ owner: req.userId });

    return res.json(box);
  }

  async show(req, res) {
    const box_id = await Box.find({ owner: req.params.id });
    const box = await Box.findById(box_id).populate({
      path: "files",
      options: { sort: { createdAt: -1 } }
    });

    return res.json(box);
  }
}

module.exports = new BoxController();
