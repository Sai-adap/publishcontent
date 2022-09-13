// import { useState, useEffect } from "react";
// import CommentForm from "./commentform";
// import Comment from "./comment";
// import {
//   getComments as getCommentsApi,
//   createComment as createCommentApi,
// } from "../api";
// import Mainpage from "./mainpage";
// import { Link } from "react-router-dom";



// const Comments = ({currentUserId }) => {
//     const authToken = localStorage.getItem("authorization");
//     const [Data, setData] = useState([]);
//   const [backendComments, setBackendComments] = useState([]);
//   const [activeComment, setActiveComment] = useState(null);
//   const rootComments = backendComments.filter(
//     (backendComment) => backendComment.parentId === null
//   );
//   const getReplies = (commentId) =>
//     backendComments
//       .filter((backendComment) => backendComment.parentId === commentId)
//       .sort(
//         (a, b) =>
//           new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//       );
//   const addComment = (text, parentId) => {
//     createCommentApi(text, parentId).then((comment) => {
//       setBackendComments([comment, ...backendComments]);
//       setActiveComment(null);
//     });
//   };



//   useEffect(() => {
//     getCommentsApi().then((data) => {
//       setBackendComments(data);
//     });
//     fetch("http://localhost:3002/content/history", {
//             headers: {
//                 authorization: authToken
//             }
//         }).then((res)=>res.json()).then((data)=> {
//             setData(data)
//             //console.log(data)
//         })
//   }, []);

//   return (
//     <>
//     <Mainpage/>
//     <div className="comments-page">
//     {
//          Data.length ?
//          <div>
//          {
//             Data.map((con,i)=>{
//                 return (
//                     <div className="comment-page">
//                       <div className="content-border">

//                         <h1 style={{fontSize: 45}} >{con.heading}</h1>
//                         <h2 style={{fontSize: 25}} >{con.context}</h2>
//                         </div>
//                         <div className="comments">
//           <h3 className="comments-title">Comments</h3>
//           <div className="comment-form-title">Write comment</div>
//           <CommentForm submitLabel="Write" handleSubmit={addComment} />
//           <div className="comments-container">
//             {rootComments.map((rootComment) => (
//               <Comment
//                 key={rootComment.id}
//                 comment={rootComment}
//                 replies={getReplies(rootComment.id)}
//                 activeComment={activeComment}
//                 setActiveComment={setActiveComment}
//                 addComment={addComment}
//                 currentUserId={currentUserId}
//               />
//             ))}
//           </div>
//         </div>
//                     </div>
//                 )
//             })
//         }
//         </div>
//          :
//             <section>
//                 <div>No history</div>
//                 <Link to="/create">create one</Link>
//             </section>
//     }
    
//     </div>
//     </>
//   );
// };

// export default Comments;