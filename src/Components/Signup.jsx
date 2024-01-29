import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import "./mix.css";
import {BACKEND_URL} from "../static";

const Signup = () =>{

       const [passShow, setPassShow] = useState(false);
       const [cpassShow, setCPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });

    console.log(inpval);

    const setVal= (e) => {

        const {name,value} = e.target;

        setInpval({...inpval,[name]:value});

    }

    const  addUserData = async (e) =>{
          
          e.preventDefault();

          const {fname, email, password, cpassword} = inpval;

          if(fname=== " ")
            alert("Please enter your name")

          else if (email ==="")
            alert("Please enter your email")

         else if (!email.includes("@"))
            alert("Enter a valid email")

         else if(password === "")
            alert("Please enter password")

        else if(password.length<6)
            alert ("Password must be atleast 6 characters")

        else if(cpassword === "")
            alert("Please enter confirm password")

        else if(password !== cpassword)
            alert("Password and confirm password do not match")

        else
        {
               try{
                  var response = await axios.post(`${BACKEND_URL}/register`, 
                 { 
                    user:{
                    name:fname, 
                    email: email, 
                    password: password, 
                    confirmPassword: cpassword
                  } 
              }
                );

                    console.log(response.data);

                    if(response.status===200){
                        alert("user registration successful");
                        setInpval({...inpval,fname:"",email:"",password:"", cpassword:""});
                    }
                  }
                  catch(err){
                    console.log("catch block error",err);
                    alert(err.response.data);
                  }                                                             
        }
           
    }

	return(

        <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }}>We are glad that you will be using CodeHUB to upskill <br />
                            yourself! We hope that you like it.</p>
                    </div>

                    <form>

                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" name="fname" id="fname" onChange = {setVal} value ={inpval.fname} placeholder='Enter Your Name' />
                        </div>

                        <div className="form_input">
                            <label htmlFor="email">Email</label><br/>
                            <input type="email" name="email" id="email" onChange = {setVal} value ={inpval.email} placeholder='Enter Your Email Address' />
                        </div>

                         <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                            <input type = {!passShow ? "password" : "text"} name="password" id="password" value ={inpval.password} onChange = {setVal} placeholder='Enter Your password' />
                            <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                             </div>
                            </div>
                          </div>

                         <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type = {!cpassShow ? "password" : "text"} name="cpassword" id="cpassword" value ={inpval.cpassword} onChange = {setVal} placeholder='Confirm password' />
                                     <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                        {!cpassShow ? "Show" : "Hide"}
                                     </div>
                            </div>
                          </div>

                          <button className='btn' onClick={addUserData}>Sign Up</button>
                        <p>Have an acount already? <NavLink to="/"> Log In </NavLink></p>                                                               

                     </form>
                 </div>
          </section>


 )
}

export default Signup;