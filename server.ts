// Loads the environment file. If .env is missing this wont work.
require("dotenv").config();
import app from "./app";
import mongodbConnect from "./mongodb/mongodb.connect";

mongodbConnect();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Listening on port " + port);
});
