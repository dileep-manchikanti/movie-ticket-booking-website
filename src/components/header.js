import React, { Component } from 'react';
import { Navbar, NavbarBrand,Nav,NavbarToggler,Collapse,NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore,doc,getDoc } from 'firebase/firestore';
import { app } from '../firebase/connect';
class Header extends Component {
  constructor(props){
    super(props);
    this.state={
      isNavOpen:false,
      user:null
    };
    this.toggleNav=this.toggleNav.bind(this);
  }
  toggleNav(){
    this.setState({
      isNavOpen:!this.state.isNavOpen
    });}
  render(){
    const auth=getAuth();
    const user=auth.currentUser;
    const db=getFirestore(app);
    var username=[];
    if(user!=null){const docRef = doc(db, "names", user.email);
    username.push(getDoc(docRef)
    .then((data)=>{
      console.log(data.data().name);
      return data.data().name;
    }));
  }
    return(
    <React.Fragment>
      <Navbar dark expand='md'>
        <div>
          <NavbarToggler onClick={this.toggleNav} />
          </div>
      <Collapse isOpen={this.state.isNavOpen} navbar>
      <Nav navbar>
        <NavbarBrand>
          {user?user.email:""}
        </NavbarBrand>
        <NavItem>
          <NavLink  to='/dashboard' className='icon-dashboard'>
            <i className='fa fa-film fa-md'></i> Dashboard
          </NavLink>
        </NavItem>
        <NavItem >
          <NavLink  to='/signIn' className='icon-signIn'>
            <i className='fa fa-sign-in fa-md'></i>  signIn
          </NavLink>
        </NavItem>
        <NavItem >
          <NavLink  to='/' className='icon-signUp'>
            <i className='fa fa-user-plus fa-md'></i>  signUp
          </NavLink>
        </NavItem>
        <NavItem>
          <button onClick={()=>{
            signOut(auth)
            .then(()=>{
              alert("Signed out successfully");
              this.props.navigate('/signIn');
            }
            )
          }} className='icon-signOut'>
            <i className='fa fa-sign-out fa-md' aria-hidden={true}></i> signOut
          </button>
        </NavItem>
      </Nav>
        
      </Collapse>
      </Navbar> 
    </React.Fragment>
    );
  }
}

export default Header;