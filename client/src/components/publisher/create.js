import Mainpage from "./mainpage";
import axios from "axios";
import { useState } from "react";

function Create(){
    const authToken = localStorage.getItem("authorization");
    const [content, setcontent] = useState({heading: "", context: ""})
    const handlesubmit=()=>{
        if(content.heading.length===0 || content.context.length===0){
            alert("please enter details")
        }else{
            axios({
                url: "http://localhost:3001/content/create",
                method: "POST",
                headers: {
                    authorization: authToken
                },
                data: {heading: content.heading, context: content.context}
            }).then((res)=> {
                //console.log(data)
                alert(res.data)
               //localStorage.setItem("authorization", loginData.data.authToken);
               //navigate("/comments")
            }).catch((err)=> {
                console.log(err)
            })
        }

    }

    return (
        <>
        <Mainpage/>
        <div className="create-body" >
        <label htmlFor="name">Question: </label>
        <input className="content-tag" type="text" id="name"  size="50" onChange={(e)=> {setcontent({...content, heading: e.target.value})}} ></input>
        <div>
        <label htmlFor="name">Answer: </label>
        <input className="content-tag" type="text" id="name" size="100" onChange={(e)=> {setcontent({...content, context: e.target.value})}} ></input>
        </div>
        <button onClick={handlesubmit}>Submit</button>
        </div>
        </>
    )
}

export default Create