import express from "express";
import { UserFields } from "../types";
import User from "../models/User";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import TrackHistory from "../models/TrackHistory";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res) => {
  const userData: UserFields = {
    username: req.body.username,
    password: req.body.password,
    token: randomUUID(),
  };

  try {
    const user = new User(userData);
    await user.save();
    res.send(user);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({ message: e.message });
    }
    res.sendStatus(500);
  }
});

usersRouter.post("/sessions", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(400).send({ message: "Invalid data" });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (!isMatch) {
    return res.status(400).send({ message: "Invalid password" });
  }

  user.token = randomUUID();
  await user.save();

  res.send({ message: "Username and password are correct", user });
});

usersRouter.post("/track_history", async (req, res) => {
  const token = req.get("Authorization");

  if (!token) {
    return res.status(401).send({ error: "No token present" });
  }
  
  const user = await User.findOne({ token });

  if (!user) {
    return res.status(401).send({ error: "Wrong token" });
  }

  const { track } = req.body;

  if (!track) {
    return res.status(400).send({ error: "Track not found" });
  }

  const trackHistory = {
    user: user._id.toString(),
    track: track,
    datetime: new Date(),
  };

  try {
    const history = new TrackHistory(trackHistory);
    await history.save();
    res.send(history);
  } catch (error) {
    console.error("TRACK HISTORY ERROR:", error);
    res.sendStatus(500);
  }
});

export default usersRouter;
