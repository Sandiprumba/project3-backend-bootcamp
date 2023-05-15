class RatingController {
  constructor(model) {
    this.model = model;
  }
  get = async (req, res) => {
    try {
      const ratings = await this.model.findAll();
      res.json({ ratings, message: "rating retrieved successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "server error" });
    }
  };
  create = async (req, res) => {
    try {
      const { rating, user_id, itinerary_id } = req.body;
      const newRating = await this.model.create({
        rating,
        user_id,
        itinerary_id,
      });
      res.json({ rating: newRating, message: "rating created sucessfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "server error" });
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const rating = await this.model.findByPk(id);
      if (!rating) {
        return res.json({ error: "rating not found" });
      }
      res.json({ rating, message: "rating retrieved successfuly" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const { rating } = req.body;
      const ratingToUpdate = await this.model.findByPk(id);
      if (!ratingToUpdate) {
        return res.json({ error: "rating not found" });
      }
      await ratingToUpdate.update({ rating });
      res.json({
        rating: ratingToUpdate,
        message: "rating updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({ error: "server error" });
    }
  };
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const ratingToDelete = await this.model.findByPk(id);
      if (!ratingToDelete) {
        return res.json({ error: "rating not found" });
      }
      await ratingToDelete.destroy();
      res.json({ message: "rating deleted successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "server error" });
    }
  };
}
module.exports = RatingController;
