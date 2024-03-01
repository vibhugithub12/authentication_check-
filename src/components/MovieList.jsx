import React, { useEffect, useState } from "react";
import '../CSS/movieList.css';
import {db} from "../firebase/config";
import { getDocs,collection, addDoc} from "firebase/firestore";

const MovieList=()=>{
    const [movies,setMovies]=useState([]);

    const [newMovie,setNewMovie] = useState("");
    const [newReleaseDate,setNewReleaseDate] = useState(0);
    const [newRatings,setNewRatings] = useState(0);
    const [newMovieRecommended,setNewMovieRecommended] = useState(false);

    const moviesCollectionRef=collection(db,"movies");

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
            console.error(err);
        }
    };
    
    useEffect(()=>{
        
    },[]);
    
    getMovies();
    
    const onSubmitMovie=async(e)=>{
        e.preventDefault();
        
        try{
            await addDoc(moviesCollectionRef,{
                Title:newMovie,
                releaseDate:newReleaseDate,
                RecommendToWatch:newMovieRecommended,
                Ratings:newRatings,});
                // getMovies(); 
               
            }
        catch(err){
            console.error(err);
        }
        };

    
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
            </div>
        ))}
        </div>
        </>
    );
};

export default MovieList;