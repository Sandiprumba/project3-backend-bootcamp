class ItineraryRouter {
  constructor(itineraryController, express) {
    this.controller = itineraryController;
    this.express = express;
  }

  route = () => {
    let router = this.express.Router();

    router.get("/", this.controller.get);
    router.post("/", this.controller.create);
    router.get("/search/:query", this.controller.search);
    router.get("/:id", this.controller.getById);
    router.put("/:id", this.controller.update);
    router.delete("/:id", this.controller.delete);

    return router;
  };
}

module.exports = ItineraryRouter;
