import Note from "../models/Note.js"

export async function getAllNotes (_, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1}); //newest first

        res.status(200).json(notes)
    } catch (error) {
        
     console.error("Error in getAllNotes Controller". error);
     res.status(500).json({message:"Internal Server Error"}); 
        
    }
}

export async function getNoteById (req,res){
     try {
          const note = await Note.findById(req.params.id)
          if (!note) return res.status(404).json ({message: "Note not found"})
               res.json(note);

     } catch (error) {
          
           console.error("Error in getNoteById Controller". error);
           res.status(500).json({message:"Internal Server Error"});
     }

}

export async function createNotes (req, res) {
    try {
         const {title,content} = req.body;
         const note = new Note ({title, content})

          const savedNote = await note.save();
          res.status(201).json(savedNote);
    } catch (error) {
             console.error("Error in getAllNotes Controller". error);
             res.status(500).json({message:"Internal Server Error"}); 
        
    }
}


export async function updateNotes (req, res) {
    try {
          const {title,content} = req.body
          const updateNotes = await Note.findByIdAndUpdate(req.params.id,{title,content}, {
               new : true,
          });


          if (!updateNotes) return res.status(404).json({message:"Note not found"})

          res.status(200).json(updateNotes);
     } catch (error) {
           console.error("Error in cerateNotes Controller". error);
           res.status(500).json({message:"Internal Server Error"});
          
     }
}

export async function deleteNotes(req, res) {
  try {
    const id = req.params.id;
    console.log("Deleting note with id:", id);

    if (!id) {
      return res.status(400).json({ message: "Note ID is missing" });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNotes Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

