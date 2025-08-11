// import { PenSquareIcon, Trash2Icon } from "lucide-react";
// import { Link } from "react-router-dom";  // make sure this is react-router-dom
// import { formatDate } from "../lib/utils";
// import toast from "react-hot-toast";
// import api from "../lib/axios";

// const NoteCard = ({ note, setNotes }) => {
//   const handleDelete = async (e, _id) => {
//     e.preventDefault();
//     e.stopPropagation(); // prevent parent click handlers (like link navigation)

//     if (!window.confirm("Are you sure you want to delete this note?")) return;

//      try {
//         await api.delete(`/notes/${_id}`);
//        setNotes(prev => prev.filter(note => note._id !== _id));
//        toast.success("Note deleted successfully");
//      } catch (error) {
//        console.error("Failed to delete note", error.response || error);
//        toast.error("Failed to delete note");
//      }
//   };

//   return (
//     <div className="card bg-base-100 transition-all duration-200 border-t border-[#00FF9D] hover:border-t-2">
//       <div className="card-body">
//         {/* Only the title is a link */}
//         <h3 className="card-title text-base-content">
//           <Link to={`/note/${note._id}`}>{note.title}</Link>
//         </h3>

//         <p className="text-base-content/70 line-clamp-3">{note.content}</p>

//         <div className="card-actions justify-between items-center mt-4">
//           <span className="text-sm text-base-content/60">
//             {formatDate(new Date(note.createdAt))}
//           </span>

//           <div className="flex items-center gap-1">
//             <PenSquareIcon className="size-4" />
//             <button
//               className="btn btn-ghost btn-xs text-error"
//               onClick={(e) => handleDelete(e, note._id)}
//             >
//               <Trash2Icon className="size-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteCard;


import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // import useNavigate
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";
import api from "../lib/axios";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();

  const handleDelete = async (e, _id) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent triggering parent click/navigation

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${_id}`);
      setNotes(prev => prev.filter(n => n._id !== _id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Failed to delete note", error.response || error);
      toast.error("Failed to delete note");
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent parent navigation if any
    navigate(`/note/${note._id}`);
  };

  return (
    <div className="card bg-base-100 transition-all duration-200 border-t border-[#00FF9D] hover:border-t-2 cursor-pointer">
      <div className="card-body">
        {/* Only the title is a link */}
        <h3 className="card-title text-base-content">
          <Link to={`/note/${note._id}`}>{note.title}</Link>
        </h3>

        <p className="text-base-content/70 line-clamp-3">{note.content}</p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-1">
            {/* Update icon as a button with navigation */}
            <button
              className="btn btn-ghost btn-xs text-primary"
              onClick={handleUpdate}
              aria-label="Edit note"
            >
              <PenSquareIcon className="size-4" />
            </button>

            {/* Delete icon */}
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
              aria-label="Delete note"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
