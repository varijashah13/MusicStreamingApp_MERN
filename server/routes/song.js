const express = require("express");
const passport = require("passport");
const router = express.Router();
const Song = require("../models/Song");
const User = require("../models/User");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { name, thumbnail, track } = req.body;
    if (!name || !thumbnail || !track) {
      return res.status(301).json({ err: "Insufficient details" });
    }
    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  }
);

router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const songs = await Song.find({ artist: req.user._id }).populate("artist");
    return res.status(200).json({ data: songs });
  }
);

router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { artistId } = req.params;
    const artist = await User.findOne({ _id: artistId });
    if (!artist) {
      return res.status(301).json({ err: "Artist does not exist" });
    }

    const songs = await Song.find({ artist: artistId });
    return res.status(200).json({ data: songs });
  }
);

router.get(
  "/get/allsongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const songs = await Song.find().populate("artist");
    return res.status(200).json({ data: songs });
  }
);

router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songName } = req.params;
    const songs = await Song.find({ name: songName }).populate("artist");
    return res.status(200).json({ data: songs });
  }
);

router.post(
  "/add/likedsongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { songId} = req.body;
    const currentUser = req.user;
    const song = await Song.findOne({ _id: songId });
    if (!song) {
      return res.status(304).json({ err: "Song does not exist" });
    }
    currentUser.likedSongs.push(songId);
    await currentUser.save();

    return res.status(200).json({ currentUser });
  }
);

router.get(
  "/get/likedsongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = await User.findOne({_id : req.user._id}).populate({
      path: "likedSongs",
      populate: {
        path: "artist",
      },
    });
    const likedSongs = currentUser.likedSongs
    return res.status(200).json({ likedSongs });
  }
);



module.exports = router;
