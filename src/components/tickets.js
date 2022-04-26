import { getAuth } from "firebase/auth";
import React, { Component, } from "react";
import { MdEventSeat } from 'react-icons/md'
import {Link} from 'react-router-dom';
// import { initializeApp } from 'firebase/app';
import { doc, arrayUnion, getFirestore,setDoc } from "firebase/firestore";
import { getTickets } from "./database";
import { app } from "../firebase/connect";
class Tickets extends Component{
    constructor(props){
        super(props);
        this.state={
            movie:this.props.location.state.movie,
            bookedTickets:{
                "Fast & Furious 6":['A4','A5','B8','D1','D2','E13','E14','J10','J11'],
                "Socios por Accidente":['B4','B5','E8','E9','G2','G3','G4','I10','I11'],
                "Girl Most Likely":['C1','C2','F10','F11','H4','H5','I7','I8'],
                "Jauja":['A7','A8','B1','B2','B3','D11','D12','E1','J9'],
                "Ellos Volvieron":['B6','B7','E2','E3','G1','G4','I9','I10'],
                "Barbie in Princess Power":['C3','C4','F1','F2','H10','H11','I5','I6'],
                "The Equalizer":['A1','A2','B9','B10','D3','D4','D5','E4','J3','J4'],
                "Scooby-Doo! and the Loch Ness Monster":['F3','F4','F5','H8','H9','H10','J1','J2'],
                "John Wick":['E5','E6','G7','G8','G9','I1','I2','I3'],
                "Ouija":['A3','A6','A7','F9','F10','E6','D4','J8'],
                "Mickey, Donald, Goofy: The Three Musketeers":['A4','A5','B8','D1','D2','E13','E14','J10','J11'],
                "Lucy":['B4','B5','E8','E9','G2','G3','G4','I10','I11'],
                "Obediencia Perfecta":['C1','C2','F10','F11','H4','H5','I7','I8'],
                "In Time":['A7','A8','B1','B2','B3','D11','D12','E1','J9'],
                "Edge of Tomorrow":['B6','B7','E2','E3','G1','G4','I9','I10'],
                "Sex Tape":['C3','C4','F1','F2','H10','H11','I5','I6'],
                "Day Earth Stood Still":['A1','A2','B9','B10','D3','D4','D5','E4','J3','J4'],
                "Fantastic Four: Rise of the Silver Surfer":['F3','F4','F5','H8','H9','H10','J1','J2'],
                "Night at Museum: Battle of Smithsonian":['E5','E6','G7','G8','G9','I1','I2','I3'],
                "Night at the Museum":['A3','A6','A7','F9','F10','E6','D4','J8'],
                "If I Stay":['B6','B7','E2','E3','G1','G4','I9','I10'],
                "Fantastic Four":['A1','A2','B9','B10','D3','D4','D5','E4','J3','J4'],
                "The Fault in Our Stars":['C1','C2','F10','F11','H4','H5','I7','I8'],
            },
            vip:[],
            gold:[],
            silver:[],
            Tickets:[],
            navigate:this.props.navigate
        }
        this.handleBooking=this.handleBooking.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
    }

    // componentDidMount()
    // {
    //     //  this.fetchBooked(this.state.movie.titleOriginal);
    // }
    getUser(){
        const auth=getAuth();
        const user=auth.currentUser;
        return user;
    }
    getNextChar(char) {
        return String.fromCharCode(char.charCodeAt(0) + 1);
      }
    handleBooking(){
        const db=getFirestore(app);
        console.log(this.state.Tickets);
        if(this.state.Tickets.length===0)alert("Select at least 1 seat to book tickets");
        else {
            const docref = doc(db,"tickets",this.state.movie.titleOriginal);
            for(var i=0;i<this.state.Tickets.length;i++){
                // this.state.booked.push(this.state.Tickets[i]);
            setDoc(docref,{tickets:arrayUnion(this.state.Tickets[i])},{merge:true});
            }
            console.log(this.state.booked);
            alert("confirmed booking");
            this.props.navigate('/dashboard');
        }
    }
    handleSelect(event){
        event.preventDefault();
            console.log(event.target.id);
            if(event.target.style['color']==='green'){
                event.target.style['color']='white';
                this.state.Tickets=this.state.Tickets.filter((ticket)=>{
                    return ticket!==event.target.id;
                });
                console.log(this.state.Tickets);
            }
            else {event.target.style["color"]="green";
            this.state.Tickets.push(event.target.id);}
        }
    render(){
      var i=0,j=0;
    //   this.fetchBooked();
      var row='A';
    for(i=0;i<12;i++){
        var id=row+(i+1);
        if(this.state.bookedTickets[this.state.movie.titleOriginal]!=null && this.state.bookedTickets[this.state.movie.titleOriginal].indexOf(id)!==-1)this.state.vip.push(<MdEventSeat id={id} className='booked' onClick={()=>{
            alert("THIS SEAT IS ALREADY BOOKED!!!");
        }} />)
        else this.state.vip.push(<i onClick={this.handleSelect}><MdEventSeat id={id}/></i>);
    }
    row=this.getNextChar(row);
    for(i=0;i<4;i++){
        for(j=0;j<14;j++){
            var id=row+(j+1);
            if(this.state.bookedTickets[this.state.movie.titleOriginal]!=null && this.state.bookedTickets[this.state.movie.titleOriginal].indexOf(id)!==-1)this.state.gold.push(<MdEventSeat id={id} className='booked' onClick={()=>{
                alert("THIS SEAT IS ALREADY BOOKED!!!");
            }} />)
            else this.state.gold.push(<MdEventSeat id={id} onClick={this.handleSelect}/>);
            // console.log(this.state.booked);
         }
        row=this.getNextChar(row);
        this.state.gold.push(<br></br>);
    }
    for(i=0;i<6;i++){
        for(j=0;j<11;j++){
            var id=row+(j+1);
            if(this.state.bookedTickets[this.state.movie.titleOriginal]!=null && this.state.bookedTickets[this.state.movie.titleOriginal].indexOf(id)!==-1)this.state.silver.push(<MdEventSeat id={id} className='booked' onClick={()=>{
                alert("THIS SEAT IS ALREADY BOOKED!!!");
            }} />)
            else this.state.silver.push(<MdEventSeat id={id} onClick={this.handleSelect}/>);
        }
        row=this.getNextChar(row);
        this.state.silver.push(<br></br>);
    }
    var genres=[];
    this.props.location.state.movie.genres.forEach((genre)=>{
        genres.push(<div className="genre">{genre.name}</div>);
    });
    console.log(this.state.booked);
        return(
        // 
        this.getUser()?
        <>
        <div className="theatre">
        <div className="title">
            <div className="name">{this.state.movie.titleOriginal}<br></br></div>
            <div className="ticket-rating"><i className="fa fa-heart fa-heart-lg">  {parseFloat(this.state.movie.rating.substring(0,3))*10}%</i></div>
            {genres}
        </div>
        <div className='vip text-center'>
            <div className="type">VIP</div>
            <hr></hr>
            {this.state.vip}
        </div>
        <div className="gold text-center">
        <div className="type">GOLD</div>
            <hr></hr>
            {this.state.gold}
        </div>
        <div className="silver text-center">
        <div className="type">SILVER</div>
            <hr></hr>
            {this.state.silver}
        </div>
        <button className="bookTicket" type='submit' onClick={()=>{
            this.handleBooking(Tickets);
        }}>Confirm Booking</button>
        
        </div>
        </>:
        <>
        <div className='notSigned'><h1 className='text-center'><i className='fa fa-exclamation-triangle'></i><Link to='/signIn'> SignIn to access page</Link></h1></div>
        </>
    );
    }
}

export default Tickets;