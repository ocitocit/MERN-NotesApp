import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION)
  .then(() => {
    console.log("mongoose connected");
    app.listen(port, () => {
      console.log(`server running on port ${port} http://localhost:${port}/`);
    });
  })
  .catch(console.error);
