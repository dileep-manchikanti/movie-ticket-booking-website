import React, { useState } from "react";
import {Link, useLocation} from 'react-router-dom';
import {Card,CardImg} from 'reactstrap';
import { getAuth } from 'firebase/auth';
import { app } from "../firebase/connect";
import { setDoc, doc, getFirestore } from "firebase/firestore";

function Movie(props) {
    const location=useLocation();
    const  params=location.state;
    const movie=params.movie;
    function getgenres(){
        var genres="";
        movie.genres.forEach(element => {
            genres+=element.name+"   ";
        });
        return genres;
    }
    function getUser(){
        const auth=getAuth();
        const user=auth.currentUser;
        return user;
    }
    function handleRating(e){
        // const db=getFirestore(app);
        // const docRef=doc(db,'ratings',getUser().email);
        // setDoc(docRef,{
        //     rating:e
        // });
        // alert("Your Ratings Submitted Sucessfully");
    }
    const Rating=()=>{
        return(
            <div class="popuptext" id="myPopup">
                <div><button className="text-center pop-button" onClick={handleRating(1)}>1</button></div>
                <div><button className="text-center pop-button" onClick={handleRating(2)}>2</button></div>
                <div><button className="text-center pop-button" onClick={handleRating(3)}>3</button></div>
                <div><button className="text-center pop-button" onClick={handleRating(4)}>4</button></div>
                <div><button className="text-center pop-button" onClick={handleRating(5)}>5</button></div>
            </div>
            // <span class="popuptext" id="myPopup">Popup text...</span>
        );
    }
    return(
        getUser()?
        <>
        <div className="outline">
            <div className="movie">
            <Card className="cardMovie">
            <CardImg  height="100%" width="60%" src={movie.image}></CardImg>
            </Card>
            </div>
            <div className="info">
                <h1 className="text-center">{movie.titleOriginal}</h1>
                <div className="rating"><i className="fa fa-heart fa-lg"></i> {parseFloat(movie.rating.substring(0,3))*10}%</div>
                <div className="review">
                    Add your rating and review<br></br>
                    Your ratings matter<br></br>
                    <button className="btn  rate popup" onClick={()=>{
                        var popup = document.getElementById("myPopup");
                        popup.classList.toggle("show");
                    }}>Rate Movie<i className="fa fa-star fa-lg"></i><Rating /></button>
                </div>
                <div className="genres">
                    {getgenres()}
                </div>
                <div className="description">
                    <h2>About Movie</h2>
                    {movie.description}
                </div>
                <Link to='/tickets' state={{
                    movie:movie
                }
               }><button className="btn btn-primary book" >Book Tickets <i className="fa fa-ticket fa-lg"></i></button></Link>
            </div>
            </div>
            </>:
            <><div className='notSigned'><h1 className='text-center'><i className='fa fa-exclamation-triangle'></i><Link to='/signIn'> SignIn to access page</Link></h1></div></>
           
    );
}


export default Movie;