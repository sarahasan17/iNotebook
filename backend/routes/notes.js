const express = require("express");
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/FetchUser");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/getAllNotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

router.post(
  "/addNotes",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Enter a valid description").exists(),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ result: result.array() });
    }
    const notes=new Notes({
        title,description,tag,user: req.user.id
    })
    const savednote=await notes.save()
    res.json(savednote)
  }
);

module.exports = router;
