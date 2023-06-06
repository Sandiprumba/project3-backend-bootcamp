const { Op } = require("sequelize");

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
        title,
        description,
        itineraries,
        duration,
        difficulty,
        region,
        altitude,
        cost,
        image_url,
      } = req.body;
      const newItinerary = await this.model.create({
        title,
        description,
        itineraries,
        duration,
        difficulty,
        region,
        altitude,
        cost,
        image_url,
      });
      res.json({
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
      const id = req.params.id;
      const itinerary = await this.model.findByPk(id);
      if (!itinerary) {
        return res.json({ error: "itinerary not found" });
      }
      const days = itinerary.itineraries.split(",");
      itinerary.itineraries = days;
      res.json({ itinerary, message: "success" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };

  update = async (req, res) => {
    try {
      const id = req.params.id;
      const {
        title,
        description,
        itineraries,
        duration,
        difficulty,
        region,
        altitude,
        cost,
        image_url,
      } = req.body;
      const itinerary = await this.model.findByPk(id);
      if (!itinerary) {
        return res.json({ error: "itinerary not found" });
      }
      await itinerary.update({
        title,
        description,
        itineraries,
        duration,
        difficulty,
        region,
        altitude,
        cost,
        image_url,
      });
      res.json({ itinerary, message: "itinerary updated successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };

  delete = async (req, res) => {
    try {
      const id = req.params.id;
      const itinerary = await this.model.findByPk(id);
      if (!itinerary) {
        return res.json({ error: "itinerary not found" });
      }
      await itinerary.destroy();
      res.json({ message: "itinerary deleted successfully" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };

  search = async (req, res) => {
    try {
      const query = req.params.query;
      let itineraries;
      console.log(query);
      console.log(itineraries);
      itineraries = await this.model.findAll({
        where: {
          title: {
            [Op.iLike]: `%${query}%`,
          },
        },
      });

      if (itineraries.length === 0) {
        return res.json({ message: "no itineraries found" });
      }
      res.json({ itineraries, message: "success" });
    } catch (error) {
      console.log(error);
      res.json({ error: "internal server error" });
    }
  };
}

module.exports = ItineraryController;
