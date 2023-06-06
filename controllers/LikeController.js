class LikeController {
  constructor(model) {
    this.model = model;
  }

  get = async (req, res) => {
    try {
      const likes = await this.model.findAll();
      res.json({ likes, message: "success" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
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
      const id = req.params.id;
      const like = await this.model.findByPk(id);
      if (!like) {
        return res.json({ error: "like not found" });
      }
      res.json({ like, message: "success" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };

  update = async (req, res) => {
    try {
      const id = req.params.id;
      const { user_id, itinerary_id, photo_id, video_id, blog_id } = req.body;
      const existingLike = await this.model.findByPk(id);
      if (!existingLike) {
        return res.json({ error: "like not found" });
      }
      await existingLike.update({
        user_id,
        itinerary_id,
        photo_id,
        video_id,
        blog_id,
      });
      res.json({ like: existingLike, message: "like updated successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };

  delete = async (req, res) => {
    try {
      const id = req.params.id;
      const like = await this.model.findByPk(id);
      if (!like) {
        return res.json({ error: "like not found" });
      }
      await like.destroy();
      res.json({ message: "like deleted successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };
}

module.exports = LikeController;
