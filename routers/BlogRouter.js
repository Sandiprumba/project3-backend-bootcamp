class BlogRouter {
  constructor(blogController, express) {
    this.controller = blogController;
    this.express = express;
  }

  route = () => {
    let router = this.express.Router();

    router.get("/", this.controller.get);
    router.post("/", this.controller.create);
    router.get("/:id", this.controller.getById);
    router.put("/:id", this.controller.update);
    router.delete("/:id", this.controller.delete);

    return router;
  };
}
module.exports = BlogRouter;
