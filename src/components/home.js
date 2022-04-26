import React,{Component} from 'react';
import {Card,CardImg} from 'reactstrap';
import { Link } from 'react-router-dom';
import { movies } from '../movies';
import {getAuth} from 'firebase/auth';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com',
// 		'X-RapidAPI-Key': 'fa716db22dmshbfc9d7bfcfa55cdp1f6addjsn05f1a6bd08e8'
// 	}
// };
class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            movies:movies,
            modalOpen:false,
            selected:0
        }
        this.handleChange=this.handleChange.bind(this);
    }
    genreMatch(movie,key){
        for (var i = 0; i < movie.genres.length; i++) {
            if (movie.genres[i].name.toLowerCase().indexOf(key) === 0) {
                return true;
            }
        }
        return false;
    }
    handleChange(event){
        var key=event.target.value.toLowerCase();
        var result=[];
        movies.forEach((movie)=>{
            if(movie.titleOriginal.toLowerCase().includes(key) || this.genreMatch(movie,key))result.push(movie);
        });
        
        this.setState({
            movies:result
        })
    }
    
    render(){
        const auth=getAuth();
        const user=auth.currentUser;
        const movies=this.state.movies.map((movie)=>{
            return(
                <div>
                    <button>
                        <Link to='/movie' state={{
                            movie:movie
                        }} >
                        <Card className='card'>
                            <CardImg className='cardImg' width="100%" height="100%" src={movie.image} alt={movie.title}  />
                        </Card>
                        </Link>
                    </button>
                </div>
            );
        });
        return(
            user?<>
            <div className='home'>
                <div className='search'>
                {/* <i className="fa fa-search"></i> */}
                <input type='text' className='form-control' placeholder="Enter name or genre type of movie to search" onChange={this.handleChange}></input>
                </div>
                <div>
                    {movies}
                </div>
            </div>
            </>:
            <>
            <div className='notSigned'><h1 className='text-center'><i className='fa fa-exclamation-triangle'></i><Link to='/signIn'> SignIn to access page</Link></h1></div>
            </>
        );
    }
}
export default Home;