import React, { useEffect, useState } from "react";
import '../CSS/movieList.css';
import {db,auth,storage} from "../firebase/config";
import { getDocs,collection, addDoc,deleteDoc, doc,updateDoc} from "firebase/firestore";
import { ref,uploadBytes } from "firebase/storage";


const MovieList=()=>{
    const [movies,setMovies]=useState([]);

    // New movie states
    const [newMovie,setNewMovie] = useState("");
    const [newReleaseDate,setNewReleaseDate] = useState(0);
    const [newRatings,setNewRatings] = useState(0);
    const [newMovieRecommended,setNewMovieRecommended] = useState(false);
    // Update title state
    const [updatedTitle,setUpdatedTitle]=useState("");
    const moviesCollectionRef=collection(db,"movies");


    // File upload states
    const [fileUpload,setFileUpload]=useState(null);

    // getting movie list from firestore collection
    
    const onSubmitMovie=async(e)=>{
        e.preventDefault();
        
        try{
            await addDoc(moviesCollectionRef,{
                Title:newMovie,
                releaseDate:newReleaseDate,
                RecommendToWatch:newMovieRecommended,
                Ratings:newRatings,
                userId:auth?.currentUser?.uid, 
            });
               
            }
        catch(err){
            alert(err);
        }
        };
    
    // useEffect(()=>{
    // Adding a movie to firestore collection
        const getMovies=async()=>{

            // Read data from db, and set movies.
            try{
                const data=await getDocs(moviesCollectionRef);
                // console.log(data);
                const filteredData=data.docs.map((doc)=>({
                    ...doc.data(),
                    id:doc.id,
                }));
                // console.log(filteredData);
                setMovies(filteredData);
            }catch(err){
                // console.error(err);
                console.log("Some error in getting movies");
            }
        };

        getMovies();
    // },[onSubmitMovie]);
    

    

        // Deleting a movie from firestore collection
        const deleteMovie=async(id)=>{
                const movieDoc=doc(db,"movies",id) ;
                await deleteDoc(movieDoc);
        }
        
    // Updating a movie title to firestore collection
        const updateMovieTitle=async(id)=>{
            const movieDoc=doc(db,"movies",id) ;
            await updateDoc(movieDoc,{Title:updatedTitle})
        }



    // Function for movie upload

    const uploadFile=async()=>{
        if(!fileUpload) return;  // if there is no file, return, because we dont want to send empty file to storage.
        const filesFolderRef=ref(storage,`projectFiles/${fileUpload.name}`);
        try{
        await uploadBytes(filesFolderRef,fileUpload);
        }catch(err){
            alert(err);
        }
    }
    return(
        <>
        <div >
            <form onSubmit={onSubmitMovie} className="addMovie" >
            <input type="text" placeholder="Movie name..." onChange={(e)=>setNewMovie(e.target.value)}/>
            <input type="number" placeholder="Release Date..." onChange={(e)=>setNewReleaseDate(Number(e.target.value))}/>
            <input type="number" placeholder="Ratings..." onChange={(e)=>setNewRatings(Number(e.target.value))}/>
            <label>Recommended?<input type="checkbox" checked={newMovieRecommended} onChange={(e)=>setNewMovieRecommended(e.target.checked)}/></label>
            <button type="submit">Add Movie</button>
            </form>
        </div>

        <div className="movieLists">
        {movies.map((movie,index)=>(
            <div>
                <h1 style={{color:movie.RecommendToWatch?"green":"red"}}>{index+1}. {movie.Title}</h1>
                <p>Release Date: {movie.releaseDate}</p>
                <p>Ratings: {movie.Ratings}/10</p>
                <button onClick={()=>deleteMovie(movie.id)}>Delete movie</button>
                <br/>
                <input type="text" placeholder="Update movie Title.." onChange={(e)=>{setUpdatedTitle(e.target.value)}} />
                <button onClick={()=>updateMovieTitle(movie.id)}>Update Title</button>
                <hr/>
            </div>
        ))}
        </div>

            {/* For file upload */}
        <div>
            <input type="file" onChange={(e)=>setFileUpload(e.target.files[0])}/>
            <button onClick={uploadFile}>Upload File</button>
        </div>
        </>
    );
};

export default MovieList;