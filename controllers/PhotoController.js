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
      res.status(500).json({ error: "internal server error" });
    }
  };
  create = async (req, res) => {
    try {
      const { title, description, image_url } = req.body;
      const newPhoto = await this.model.create({
        title,
        description,
        image_url,
      });
      res
        .status(201)
        .json({ photo: newPhoto, message: "photo uploaded succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const photo = await this.model.findByPk(id);
      if (!photo) {
        return res.status(404).json({ error: "photo not found" });
      }
      res.json({ photo, message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, image_url } = req.body;
      const photo = await this.model.findByPk(id);
      if (!photo) {
        return res.status(404).json({ error: "photo not found" });
      }
      photo.title = title;
      photo.description = description;
      photo.image_url = image_url;
      await photo.save();
      res.json({ photo, message: "photo updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const photo = await this.model.findByPk(id);
      if (!photo) {
        return res.status(404).json({ error: "photo not found" });
      }
      await photo.destroy();
      res.json({ message: "photo deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
}
module.exports = PhotoController;
