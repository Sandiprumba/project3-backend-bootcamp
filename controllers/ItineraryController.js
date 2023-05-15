class ItineraryController {
  constructor(model) {
    this.model = model;
  }
  get = async (req, res) => {
    try {
      const itineraries = await this.model.findAll();
      res.json({ itineraries, message: "success" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };
  create = async (req, res) => {
    try {
      const {
        name,
        description,
        duration,
        difficulty,
        region,
        altitude,
        cost,
        image_url,
      } = req.body;
      const newItinerary = await this.model.create({
        name,
        description,
        duration,
        difficulty,
        region,
        altitude,
        cost,
        image_url,
      });
      res.status(201).json({
        itinerary: newItinerary,
        message: "itinerary created successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };
  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const itinerary = await this.model.findByPk(id);
      if (!itinerary) {
        return res.status(404).json({ error: "itinerary not found" });
      }
      res.json({ itinerary, message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        description,
        duration,
        difficulty,
        region,
        altitude,
        cost,
        image_url,
      } = req.body;
      const itinerary = await this.model.findByPk(id);
      if (!itinerary) {
        return res.status(404).json({ error: "itinerary not found" });
      }
      await itinerary.update({
        name,
        description,
        duration,
        difficulty,
        region,
        altitude,
        cost,
        image_url,
      });
      res.json({ itinerary, message: "itinerary updated succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const itinerary = await this.model.findByPk(id);
      if (!itinerary) {
        return res.status(400).json({ error: "itinerary not found" });
      }
      await itinerary.destroy();
      res.json({ message: "itinerary deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  };
}
module.exports = ItineraryController;
