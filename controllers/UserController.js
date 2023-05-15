class UserController {
  constructor(model) {
    this.model = model;
  }
  get = async (req, res) => {
    try {
      const users = await this.model.findAll();
      res.json({ users, message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  create = async (req, res) => {
    try {
      const { username, email, profilePicture, bio } = req.body;
      const newUser = await this.model.create({
        username,
        email,
        profilePicture,
        bio,
      });
      res
        .status(201)
        .json({ user: newUser, message: "user created successfull" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.model.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
      res.json({ user, message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, profilePicture, bio } = req.body;
      const user = await this.model.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
      user.username = username;
      user.email = email;
      user.profilePicture = profilePicture;
      user.bio = bio;
      res.json({ user, message: "user updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.model.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }
      await user.destroy();
      res.json({ message: "user deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
}
module.exports = UserController;
