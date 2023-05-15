class VideoController {
  constructor(model) {
    this.model = model;
  }
  get = async (req, res) => {
    try {
      const videos = await this.model.findAll();
      res.json({ videos, message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };

  create = async (req, res) => {
    try {
      const { title, video_url, user_id, itinerary_id } = req.body;
      const newVideo = await this.model.create({
        title,
        video_url,
        user_id,
        itinerary_id,
      });
      res
        .status(201)
        .json({ video: newVideo, message: "video created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const video = await this.model.findByPk(id);
      if (!video) {
        return res.status(400).json({ error: "video not found" });
      }
      res.json({ video, message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, video_url, user_id, itinerary_id } = req.body;
      const video = await this.model.findByPk(id);
      if (!video) {
        return res.status(404).json({ error: "video not found" });
      }
      video.title = title;
      video.vide_url = video_url;
      video.user_id = user_id;
      video.itinerary = itinerary_id;
      await video.save();
      res.json({ video, message: "video uploaded successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const video = await this.model.findByPk(id);
      if (!video) {
        return res.status(404).json({ error: "video not found" });
      }
      await video.destroy();
      res.json({ message: "video deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
}
module.exports = VideoController;
