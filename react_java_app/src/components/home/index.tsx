import axios from "axios";
import { useEffect } from "react";

const Home = () => {

    // useEffect(() => {
    //      axios.get("http://localhost:8082/api/categories").then(resp => {
    //         console.log("resp = ", resp);
    //      });
    // }, [])
    
    return (
        <>
            <h1 className='text-3xl font-bold underline'>Hello React!</h1>
        </>
    );
}

export default Home;