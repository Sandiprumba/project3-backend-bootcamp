class PhotoController {
  constructor(model) {
    this.model = model;
  }

  get = async (req, res) => {
    try {
      const photos = await this.model.findAll();
      res.json({ photos, message: "success" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };

  create = async (req, res) => {
    try {
      const { title, description, image_url, user_id, like_id } = req.body;
      const newPhoto = await this.model.create({
        title,
        description,
        image_url,
        user_id,
        like_id,
      });
      res.json({ photo: newPhoto, message: "photo created successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };

  getById = async (req, res) => {
    try {
      const id = req.params.id;
      const photo = await this.model.findByPk(id);
      if (!photo) {
        return res.json({ error: "photo not found" });
      }
      res.json({ photo, message: "success" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };

  update = async (req, res) => {
    try {
      const id = req.params.id;
      const { title, description, image_url, user_id, like_id } = req.body;
      const photo = await this.model.findByPk(id);
      if (!photo) {
        return res.json({ error: "photo not found" });
      }
      await photo.update({
        title,
        description,
        image_url,
        user_id,
        like_id,
      });
      res.json({ photo, message: "photo updated successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };

  delete = async (req, res) => {
    try {
      const id = req.params.id;
      const photo = await this.model.findByPk(id);
      if (!photo) {
        return res.json({ error: "photo not found" });
      }
      await photo.destroy();
      res.json({ message: "photo deleted successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };
}

module.exports = PhotoController;
