const express = require("express");
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/FetchUser");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/getAllNotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});
//add notes
router.post(
  "/addNotes",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Enter a valid description").exists(),
  ],
  async (req, res) => {
   try {
     const { title, description, tag } = req.body;
     const result = validationResult(req);
     if (!result.isEmpty()) {
       return res.status(400).json({ result: result.array() });
     }
     const notes = new Notes({
       title,
       description,
       tag,
       user: req.user.id,
     });
     const savednote = await notes.save();
     res.json(savednote);
   } catch (error) {
     console.error(error.message);
     res.status(500).json("Bad request found");
   }
   }
);

//update notes
router.put(
  "/updateNotes/:id",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Enter a valid description").exists(),
  ],
  
    async (req, res) => {
      try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) {
          newNote.title = title;
        }
        if (description) {
          newNote.description = description;
        }
        if (tag) {
          newNote.tag = tag;
        }
        let note = await Notes.findById(req.params.id);
        if (!note) {
          res.status(404).send("Not allowed");
        }
        if (note.user.toString() !== req.user.id) {
          res.status(401).send("Not valid match found");
        }
        note = await Notes.findByIdAndUpdate(
          req.params.id,
          { $set: newNote },
          { new: true }
        );
        res.json({ note });
      } catch (error) {
        console.error(error.message);
        res.status(500).json("Bad request found");
      }
  }
);

//delete notes
router.delete(
  "/deleteNotes/:id",
  fetchUser,
  async (req, res) => {
    try {
      let note = await Notes.findById(req.params.id);
      if (!note) {
        res.status(404).send("Not allowed");
      }
      if (note.user.toString() !== req.user.id) {
        res.status(401).send("Not valid match found");
      }
      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({ Success: "deletion complete" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Bad request found");
    }
  }
);
module.exports = router;
