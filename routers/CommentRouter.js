class CommentRouter {
  constructor(commentController, express) {
    this.controller = commentController;
    this.express = express;
  }
  route = () => {
    let router = this.express.Router();

    router.get("/", this.controller.get);
    router.post("/", this.controller.create);
    router.put("/:id", this.controller.update);
    router.delete("/:id", this.controller.delete);

    return router;
  };
}

module.exports = CommentRouter;
