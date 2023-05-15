class UserRouter {
  constructor(userController, express) {
    this.controller = userController;
    this.express = express;
  }
  route = () => {
    const router = this.express.Router();

    router.get("/", this.controller.get);
    router.post("/", this.controller.create);
    router.get("/:id", this.controller.getById);
    router.put("/:id", this.controller.update);
    router.delete("/:id", this.controller.delete);
    return router;
  };
}
module.exports = UserRouter;
