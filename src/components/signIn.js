import React,{Component} from 'react';
import {auth} from '../firebase/auth';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {Form,Input,Col,FormGroup,Button} from 'reactstrap';
import {Link} from 'react-router-dom';

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            touched:{
                email:false,
                password:false
            }
        }
        this.handleInput=this.handleInput.bind(this);
        this.handleBlur=this.handleBlur.bind(this);
        this.signIn=this.signIn.bind(this);
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
    validate(email,password){
        const errors={
            email:"",
            password:"",
        }
        if(this.state.touched.email && email.indexOf('@')===-1)errors.email="Not a valid email Address";
        if(this.state.touched.password && password.length<3)errors.password="Password must be at least 3 Characters long";
        return errors;
    }
    signIn(e)
    {   e.preventDefault();
        const email=this.state.email;
        const password=this.state.password;
        signInWithEmailAndPassword(auth,email,password)
        .then(()=>{
            this.props.navigate("/dashboard");
        })
        .catch((error)=>{
            alert(error.message);
            console.log(error.message);
        });
    }
    render(){
        const errors=this.validate(this.state.email,this.state.password);
        return(
            <div className="container">
            <h1 className='text-center'>SignIn</h1>
            <div className='row row-content signIn' onClick={this.changeStyle}>
                <Form onSubmit={this.signIn}>
                    <FormGroup>
                        {/* <Label md={3} htmlFor='email'>Email</Label> */}
                        <Col>
                            <Input  className='input' type='text' id='email' name='email' placeholder='Enter Your Mail Address' value={this.state.email} onChange={this.handleInput} onBlur={this.handleBlur("email")} valid={errors.email===""} invalid={errors.email!==""} />
                            <span>{errors.email}</span>
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
                            <Button to='signIn' className='btn btn-primary' type='submit'  color='primary'>signIn  <i className='fa fa-sign-in fa-lg'></i></Button><Link to='/' className='in'>Dont Have an Account</Link>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
            </div>
        );
    }
        
    }

export default SignIn;;