import express from "express";
const app = express();
export default app;

import morgan from "morgan";

import usersRouter from "#api/users";
import tracksRouter from "#api/tracks";
import playlistsRouter from "#api/playlists";
import getUserFromToken from "#middleware/getUserFromToken";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.use(getUserFromToken);

app.use("/users", usersRouter);
app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

app.use((err, req, res, next) => {
  
  switch (err.code) {
    
    case "22P02":
      return res.status(400).send(err.message);
    
    case "23505":
    
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});