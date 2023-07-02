import React,{useEffect, useState} from "react";

const Async = () => {

    const [posts, setposts] = useState([])
    const [visible, setvisible] = useState(false)
    
    const changehandler = () => {
        setvisible(true)
    }

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data=>setposts(data))
 },[])
    
    return (
        <div>
            <h1>i am srinivas</h1>
            {visible && <p>this is visible</p>}
            {!visible && <p>this is not visible</p>}
            <ul>
                {posts.map(item => <li key={item.id}>{ item.title}</li>)}
            </ul>
            
            <button onClick={changehandler}>close</button>
        </div>

    )
}

export default Async;