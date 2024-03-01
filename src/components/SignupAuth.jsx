import React, { useEffect } from "react";
import '../CSS/signup.css';
import { useState } from "react";
import {auth,googleProvider} from '../firebase/config';
import {createUserWithEmailAndPassword, signInWithPopup,signOut} from 'firebase/auth';


const SignupAuth = () =>{

    const[emails,setEmail]=useState("");
    const[passwords,setPassword]=useState("");
    
    console.log(auth.currentUser?.email); //-> For checking the current user who's signed in.
    // Although we don't require this. Just to show that there are multiple 
    // functionalities of the auth variable that we created in config.js

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
        await createUserWithEmailAndPassword(auth,emails,passwords);
        }catch(err){
            // console.error(err);
            alert(err);
        }
        
    };

    

    const SignInWithGoogle=async()=>{
        try{
            await signInWithPopup(auth,googleProvider);
            }catch(err){
                // console.error(err);
                alert(err);
            }
    }

    const currUser=auth.currentUser?.email;
    const logoutButton=async()=>{
        try{
            await signOut(auth);
            }catch(err){
                // console.error(err);
                alert(err);
            }
    }

        useEffect(()=>{
            
        },SignInWithGoogle)

    return(
        <>
        <div className="signupForm">
            <div>
                <h1>Hello</h1>{currUser?currUser:""}
                <button className="logout" onClick={logoutButton}>Logout</button>
                <form action="" onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
                <input type="password" placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <button type="submit">Signup</button>
                </form>
            </div>
            <div>
                {/* <h3>{auth.currentUser?.email}</h3> */}
                <button onClick={SignInWithGoogle}>SignIn with Google</button>
            </div>
        </div>  

        </>
    ); 
};

export default SignupAuth;