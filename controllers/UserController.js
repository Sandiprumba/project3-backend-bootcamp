class UserController {
  constructor(model) {
    this.model = model;
  }

  get = async (req, res) => {
    try {
      const user = await this.model.findAll();
      res.json({ user, message: "success" });
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  };

  getByEmail = async (req, res) => {
    try {
      const email = req.params.email;
      console.log(email);
      const user = await this.model.findOne({ where: { email } });
      if (!user) {
        return res.json({ error: "User not found" });
      }
      res.json({ user, message: "success" });
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  };

  create = async (req, res) => {
    const { email, username, bio, profile_picture } = req.body;
    try {
      const existingUser = await this.model.findOne({ where: { email } });
      if (existingUser) {
        return res.json({ message: "A user with this email already exists" });
      }
      const newUser = await this.model.create({
        email,
        username,
        bio,
        profile_picture,
      });
      res.json({ user: newUser, message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  };

  update = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const { email, username, bio, profile_picture } = req.body;
    console.log(email, username, bio, profile_picture);
    try {
      const user = await this.model.findByPk(id);
      if (!user) {
        return res.json({ error: "User not found" });
      }
      const existingUser = await this.model.findOne({
        where: { email: email },
      });
      if (existingUser && existingUser.id !== id) {
        await user.update({ email, username, bio, profile_picture });
        return res.json({ message: "user updated success" });
      }
      await user.update({ email, username, bio, profile_picture });
      res.json({ user, message: "User updated successfully" });
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  };

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await this.model.findByPk(id);
      if (!user) {
        return res.json({ error: "User not found" });
      }
      await user.destroy();
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  };
}

module.exports = UserController;
