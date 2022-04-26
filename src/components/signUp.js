import React,{Component} from 'react';
import {Form,Button,Input,FormGroup,Col} from 'reactstrap';
import {auth} from '../firebase/auth';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {Link} from 'react-router-dom';
import { setDoc,doc, getFirestore } from 'firebase/firestore';
import { app } from '../firebase/connect';
// import {useHistory} from 'react-router-dom';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries;
// Your web app's Firebase configuration
class SignUp extends Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            email:"",
            mobile:"",
            password:"",
            touched:{
                username:false,
                email:false,
                mobile:false,
                password:false
            },
            redirect:"/signIn"
        }
        this.handleInput=this.handleInput.bind(this);
        this.handleBlur=this.handleBlur.bind(this);
        this.signUp=this.signUp.bind(this);
    }
    handleInput(event){
        const target=event.target;
        const name=target.name;
        const value=target.value;
        this.setState({
            [name]:value
        });
    }
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }
    validate(username,email,password){
        const errors={
            username:"",
            email:"",
            password:"",
        }
        if(this.state.touched.username && username.length<3)errors.username="Username must be at least 3 Characters long"
        if(this.state.touched.email && email.indexOf('@')===-1)errors.email="Not a valid email Address";
        if(this.state.touched.password && password.length<3)errors.password="Password must be at least 3 Characters long";
        return errors;
    }
    signUp(e){
        e.preventDefault();
        const username=this.state.username;
        const password=this.state.password;
        const email=this.state.email;
        const db=getFirestore(app);
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            // const user = userCredential.user;
            const docref = doc(db,"names",email);
            setDoc(docref,{
                name:username
            });
            alert("Signed Up succesfully.your credentials are saved sucessfully...");  
            this.props.navigate('/signIn');
          })
        .catch((error)=>{
            alert("Error: "+error.code +" "+error.message);
        })
    }
    render(){
        const errors=this.validate(this.state.username,this.state.email,this.state.password);
        return(
        <div className="container">
            <h1 className='text-center'>SignUp</h1>
            <div className='row row-content signUp' >
            <Form onSubmit={this.signUp}>
                <FormGroup>
                    <Col>
                        <Input id='username' className='input' placeholder="Enter Your Username" type='text' name="username" value={this.state.username} onChange={this.handleInput} onBlur={this.handleBlur("username")} valid={errors.username===""} invalid={errors.username!==""} />
                        <span>{errors.username}</span>
                    </Col>
                </FormGroup>
                <FormGroup>
                    {/* <Label md={3} htmlFor='email'>Email</Label> */}
                    <Col>
                        <Input  className='input' type='text' id='email' name='email' placeholder='Enter Your Mail Address' value={this.state.email} onChange={this.handleInput} onBlur={this.handleBlur("email")} valid={errors.email===""} invalid={errors.email!==""} />
                        <span>{errors.email}</span>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col>
                    <Input className='input' type='text' name='mobile' placeholder='Enter Your Mobile Number' value={this.state.mobile} onChange={this.handleInput} onBlur={this.handleBlur("mobile")} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col>
                        <Input type='password' className='input' name='password' placeholder='Enter Your Password' value={this.state.password} onChange={this.handleInput} onBlur={this.handleBlur("password")} valid={errors.password===""} invalid={errors.password!==""}/>
                        <span>{errors.password}</span>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col>
                        <Button className='btn btn-primary' type='submit'  color='primary'>SignUp  <i className='fa fa-user-plus fa-lg'></i></Button><Link to='signIn' className='up'>Already Have an Account</Link>
                    </Col>
                </FormGroup>
            </Form>
            </div>
        </div>
);
}
}

export default SignUp;