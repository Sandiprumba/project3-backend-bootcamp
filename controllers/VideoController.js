class VideoController {
  constructor(videoModel) {
    this.Video = videoModel;
  }

  get = async (req, res) => {
    try {
      const videos = await this.Video.findAll();
      res.json({ videos, message: "Success" });
    } catch (error) {
      console.error(error);
      res.json({ error: "Internal server error" });
    }
  };

  getById = async (req, res) => {
    const id = req.params.id;
    try {
      const video = await this.Video.findByPk(id);
      if (!video) {
        return res.json({ error: "Video not found" });
      }
      res.json({ video, message: "Success" });
    } catch (error) {
      console.error(error);
      res.json({ error: "Internal server error" });
    }
  };

  create = async (req, res) => {
    try {
      const { title, description, video_url } = req.body;
      const newVideo = await this.Video.create({
        title,
        description,
        video_url,
      });
      res.json({ video: newVideo, message: "Video created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  update = async (req, res) => {
    const id = req.params.id;
    try {
      const { title, description, video_url } = req.body;
      const video = await this.Video.findByPk(id);
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }
      await video.update({ title, description, video_url });
      res.json({ video, message: "Video updated successfully" });
    } catch (error) {
      console.error(error);
      res.json({ error: "Internal server error" });
    }
  };

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      const video = await this.Video.findByPk(id);
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }
      await video.destroy();
      res.json({ message: "Video deleted successfully" });
    } catch (error) {
      console.error(error);
      res.json({ error: "Internal server error" });
    }
  };
}

module.exports = VideoController;
