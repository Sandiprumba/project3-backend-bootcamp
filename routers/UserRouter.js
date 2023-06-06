class UserRouter {
  constructor(userController, express) {
    this.controller = userController;
    this.express = express;
  }

  route() {
    let router = this.express.Router();

    router.get("/", this.controller.get);
    router.get("/:email", this.controller.getByEmail);
    router.post("/:email", this.controller.create);
    router.put("/:id", this.controller.update);
    router.delete("/:id", this.controller.delete);

    return router;
  }
}

module.exports = UserRouter;
