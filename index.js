const express = require("express");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

const jwtCheck = auth({
  audience: "https://hikemate/api",
  issuerBaseURL: "https://dev-yjwo0kgqimt8b5hc.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

app.use(jwtCheck);

const db = require("./db/models/index");
const { user, itinerary, blog, photo, video, comment, like, rating } = db;

// user router and controller
const UserController = require("./controllers/UserController");
const userController = new UserController(user);

const UserRouter = require("./routers/UserRouter");
const userRouter = new UserRouter(userController, express);

const ItineraryController = require("./controllers/ItineraryController");
const itineraryController = new ItineraryController(itinerary);

const ItineraryRouter = require("./routers/ItineraryRouter");
const itineraryRouter = new ItineraryRouter(itineraryController, express);

const BlogController = require("./controllers/BlogController");
const blogController = new BlogController(blog);

const BlogRouter = require("./routers/BlogRouter");
const blogRouter = new BlogRouter(blogController, express);

const PhotoController = require("./controllers/PhotoController");
const photoController = new PhotoController(photo);

const PhotoRouter = require("./routers/PhotoRouter");
const photoRouter = new PhotoRouter(photoController, express);

const VideoController = require("./controllers/VideoController");
const videoController = new VideoController(video);

const VideoRouter = require("./routers/VideoRouter");
const videoRouter = new VideoRouter(videoController, express);

const CommentController = require("./controllers/CommentController");
const commentController = new CommentController(comment);

const CommentRouter = require("./routers/CommentRouter");
const commentRouter = new CommentRouter(commentController, express);

const LikeController = require("./controllers/LikeController");
const likeController = new LikeController(like);

const LikeRouter = require("./routers/LikeRouter");
const likeRouter = new LikeRouter(likeController, express);

const RatingController = require("./controllers/RatingController");
const ratingController = new RatingController(rating);

const RatingRouter = require("./routers/RatingRouter");
const ratingRouter = new RatingRouter(ratingController, express);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/blog", blogRouter.route());
app.use("/user", userRouter.route());
app.use("/itinerary", itineraryRouter.route());
app.use("/photo", photoRouter.route());
app.use("/video", videoRouter.route());
app.use("/comment", commentRouter.route());
app.use("/like", likeRouter.route());
app.use("/rating", ratingRouter.route());

app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});
app.get("/auth2", function (req, res) {
  res.send("unsecured");
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
