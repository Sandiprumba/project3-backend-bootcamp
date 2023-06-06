const models = require("../db/models");

class CommentController {
  constructor(model) {
    this.model = model;
  }

  get = async (req, res) => {
    try {
      const comments = await this.model.findAll({
        include: [
          { model: models.user, as: "user", attributes: ["username"] },
          { model: models.itinerary, as: "itinerary" },
        ],
      });
      const formattedComments = comments.map((comment) => {
        if (!comment || !comment.user || !comment.itinerary) {
          return null;
        }
        return {
          id: comment.id,
          remark: comment.remark,
          username: comment.user.username,
          itinerary_id: comment.itinerary.id,
        };
      });

      res.json({ comments: formattedComments, message: "success" });
      console.log(formattedComments);
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };

  create = async (req, res) => {
    try {
      const {
        remark,
        star_rating,
        photo_id,
        video_id,
        user_id,
        itinerary_id,
        blog_id,
      } = req.body;
      const user = await models.user.findByPk(user_id);
      if (!user) {
        return res.json({ error: "usernot found " });
      }
      const newComment = await this.model.create({
        remark,
        star_rating,
        photo_id,
        video_id,
        user_id,
        itinerary_id,
        blog_id,
      });
      const formattedComment = {
        username: user.username,
        remark: newComment.remark,
      };
      console.log(formattedComment);
      res.json({
        comment: formattedComment,
        message: "comment created successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };

  getById = async (req, res) => {
    try {
      const id = req.params.id;
      const remark = await this.model.findByPk(id);
      if (!remark) {
        return res.json({ error: "remark not found" });
      }
      res.json({ remark, message: "success" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };

  update = async (req, res) => {
    try {
      const id = req.params.id;
      const {
        remark,
        star_rating,
        photo_id,
        video_id,
        user_id,
        itinerary_id,
        blog_id,
      } = req.body;
      const existingComment = await this.model.findByPk(id);
      if (!existingComment) {
        return res.json({ error: "remark not found" });
      }
      await existingComment.update({
        remark,
        star_rating,
        photo_id,
        video_id,
        user_id,
        itinerary_id,
        blog_id,
      });
      res.json({
        remark: existingComment,
        message: "remark updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };

  delete = async (req, res) => {
    try {
      const id = req.params.id;
      const remark = await this.model.findByPk(id);
      if (!remark) {
        return res.json({ error: "remark not found" });
      }
      await remark.destroy();
      res.json({ message: "remark deleted successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };
}

module.exports = CommentController;
