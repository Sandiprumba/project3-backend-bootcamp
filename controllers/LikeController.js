class LikeController {
  constructor(model) {
    this.model = model;
  }
  get = async (req, res) => {
    try {
      const likes = await this.model.findALl();
      res.json({ likes, message: "likes retrieved successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "server error" });
    }
  };
  create = async (req, res) => {
    try {
      const { user_id, itinerary_id, photo_id, video_id, blog_id } = req.body;
      const newLike = await this.model.create({
        user_id,
        itinerary_id,
        photo_id,
        video_id,
        blog_id,
      });
      res.json({ like: newLike, message: "like created successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };
  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const like = await this.model.findByPk(id);
      if (!like) {
        return res.json({ error: "like not found" });
      }
      res.json({ like, message: "like retrieved successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "server error" });
    }
  };
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const likeToUpdate = await this.model.findByPk(id);
      if (!likeToUpdate) {
        return res.json({ error: "like not found" });
      }
      const updatedLike = await likeToUpdate.update(req.body);
      res.json({ like: updatedLike, message: "like updated successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "server error" });
    }
  };
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const likeToDelete = await this.model.findByPk(id);
      if (!likeToDelete) {
        return res.json({ error: "like not found" });
      }
      await likeToDelete.destroy();
      res.json({ message: "like deleted successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };
}
module.exports = LikeController;
