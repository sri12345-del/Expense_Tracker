import React,{useState} from "react"

const Greet = () => {
    const [isshow, setisshow]=useState(false)

    const changehandler = () => {
        setisshow(true)
    }

    return (
        <div>
            <h1>hello world</h1>
            <p>price</p>
            {isshow && <p>it is visible</p>}
            {!isshow && <p>it is not visible</p>} 
            <button onClick={changehandler}>change content</button>
        </div>
    )
}

export default Greet