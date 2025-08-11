
// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar"
// import RateLimitedUI from "../components/RateLimitedUI";
// import axios from "axios";
// import toast from "react-hot-toast";

// const HomePage = () => {
//   const [isRateLimited, setIsRateLimited] = useState (false);
//   const [notes, setNotes] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//   const fetchNotes = async () => {

//    try {
//   const res = await axios.get("http://localhost:5005/api/notes");
//   console.log(res.data);
//   setNotes(res.data);
//   setIsRateLimited(false);
// } catch (error) {
//   console.log("Error fetching notes");
//   console.log(error);
//   if (error.response?.status === 429) {
//     setIsRateLimited(true);
//   } else {
//     toast.error("Failed to fetch notes");
//   }
// } finally {
//   setLoading(false);
// }

//   };

//   fetchNotes();

//   }, [])


//   return (
//     <div className="min-h-screen">
//       <Navbar/>

//       {isRateLimited && <RateLimitedUI />}

//       <div className="max-w-7xl mx-auto p-4 mt-6">
//         {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

//         {notes.length > 0 && !isRateLimited &&(
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {notes.map(note => (
//              <NoteCard key={note._id} note={note}/>
//             ))}

//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;





// import { useEffect, useState } from "react";
// import axios from "axios";

// const HomePage = () => {
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5005/api/notes")
//       .then(res => {
//         setNotes(res.data);
//       })
//       .catch(err => {
//         console.error("Failed to fetch notes", err);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Notes</h1>
//       {notes.length === 0 ? (
//         <p>No notes yet</p>
//       ) : (
//         notes.map(note => (
//           <div key={note._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
//             <h3>{note.title}</h3>
//             <p>{note.content}</p>
//             <small>{new Date(note.createdAt).toLocaleString()}</small>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default HomePage;

 
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading notes...
          </div>
        )}

        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {!loading && notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;



