import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () =>{
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    useEffect(() =>{
        axios.get("http://localhost:4001/home")
        .then(result => {
            console.log(result)
            if(result.data !== "Success") {
                navigate('/login');
            }
        })
        .catch( error => console.log(error))
    },[])
    return(
        <div>
            <h2>Home Page</h2>
        </div>
    )
}

export default Home;