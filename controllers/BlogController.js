class BlogController {
  constructor(model) {
    this.model = model;
  }

  get = async (req, res) => {
    try {
      const blogs = await this.model.findAll();
      res.json({ blogs, message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  create = async (req, res) => {
    try {
      const { title, content, user_id, image_url } = req.body;
      const newBlog = await this.model.create({
        title,
        content,
        user_id,
        image_url,
      });
      res
        .status(201)
        .json({ blog: newBlog, message: "blog created successfull" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await this.model.finfByPk(id);
      if (!blog) {
        return res.status(404).json({ error: "blog not found" });
      }
      res.json({ blog, message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, user_id, image_url } = req.body;
      const blog = await this.model.findByPk(id);
      if (!blog) {
        return res.status(404).json({ error: "blog not found" });
      }
      blog.title = title;
      blog.content = content;
      blog.user_id = user_id;
      blog.image_url = image_url;
      await blog.save();
      res.json({ blog, message: "blog updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await this.model.findByPk(id);
      if (!blog) {
        return res.status(404).json({ error: "blog not found" });
      }
      await blog.destroy();
      res.json({ message: "blog deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
}
module.exports = BlogController;
