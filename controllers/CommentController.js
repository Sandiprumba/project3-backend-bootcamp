class CommentController {
  constructor(model) {
    this.model = model;
  }
  get = async (req, res) => {
    try {
      const comments = await this.model.findAll();
      res.json({ comments, message: "success" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };
  create = async (req, res) => {
    try {
      const { text, user_id, itinerary_id, photo_id, video_id, blog_id } =
        req.body;
      const newComment = await this.model.create({
        text,
        user_id,
        itinerary_id,
        photo_id,
        video_id,
        blog_id,
      });
      res.json({ comment: newComment, message: "comment created " });
    } catch (error) {
      console.log(error);
      res.json({ error: "server error" });
    }
  };
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { text, user_id, itinerary_id, photo_id, video_id, blog_id } =
        req.body;
      const commentToUpdate = await this.model.findByPk(id);
      if (!commentToUpdate) {
        return res.json({ error: "comment not found" });
      }
      await commentToUpdate.update({
        text,
        user_id,
        itinerary_id,
        photo_id,
        video_id,
        blog_id,
      });
      res.json({
        comment: commentToUpdate,
        message: "comment updated succesfully",
      });
    } catch (error) {
      console.log(error);
      res.json({ error: "server error" });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const commentToDelete = await this.model.findByPk(id);
      if (!commentToDelete) {
        return res.json({ error: "comment not found" });
      }
      await commentToDelete.destroy();
      res.json({ message: "comment deleted successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "server error" });
    }
  };
}
module.exports = CommentController;
