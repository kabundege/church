import '../scss/components/auth.scss';
import { connect } from 'react-redux';
import React,{ Component } from 'react';
import Loader from "react-spinners/BeatLoader";
import { SignUp } from '../store/actions/actions';

class Register extends Component{
    state = {
        amazina:"",
        itorero_ryibanze:"",
        subtmitted: false,
        phonenumber:localStorage.getItem('phoneNumber')
    }
    handlerchange = e => {
        const { name,value } = e.target;
        this.setState({ [name]:value });
    }

    handlerSubmit = e => {
        e.preventDefault()

        const { amazina,itorero_ryibanze,phonenumber } = this.state;

        this.setState({ submitted:true })

        this.props.Signup({ 
            phonenumber,
            amazina :`${amazina}`.toLowerCase(),
            itorero_ryibanze: `${itorero_ryibanze}`.toLowerCase(),
            role:'Christian'
        })
    }

    componentDidUpdate(){
        const { submitted } = this.state;
        const { loading,signupError } = this.props.Authdata;
        if(!loading&&submitted){
            if(signupError === null){
                this.props.history.push('/parrish')
            }
        }

        if(localStorage.getItem("token") !== null){
            this.props.history.push('/parrish')
        }
    }
    
    componentDidMount(){
        this.props.dawn();
        if(localStorage.getItem("token") !== null){
            this.props.history.push('/parrish')
        }
    }

    render(){
        const { amazina,itorero_ryibanze,phonenumber } = this.state;
        const { loading,signupError } = this.props.Authdata;
        return(
            <div className="auth">
                <section className="bg"></section>
                <form onSubmit={this.handlerSubmit}>
                    <h1 className="brand">                    
                        <i className="fas fa-church"></i>
                    </h1>
                    <div className="parent">
                        <h1>Rema Konti 🖊</h1>
                        <div className="input-field">
                            <span>👤</span>
                            <input 
                                type="text" 
                                value={amazina} 
                                name="amazina" 
                                placeholder="Amazina" 
                                onChange={this.handlerchange} 
                                required/>
                        </div>
                        <div className="input-field">
                            <span>👥</span>
                            <input
                                type="text" 
                                value={itorero_ryibanze} 
                                name="itorero_ryibanze" 
                                placeholder="Itorero ry'ibanze" 
                                onChange={this.handlerchange}
                                required/>
                        </div>
                        <div className="input-field">
                            <span>☎</span>
                            <input 
                                type="text" 
                                value={phonenumber} 
                                name="phonenumber" 
                                placeholder="Phone Number" 
                                onChange={this.handlerchange}
                                required/>
                        </div>
                        
                        { signupError !== "" && <p id="error">  <i className="fas fa-exclamation-triangle"></i> {signupError} </p>}

                        <button>
                            {   !loading ?
                                <>Komeza <i className="fas fa-sign-in-alt"></i> </>:
                                <Loader/>
                            }
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    Authdata : state.auth,
})

const mapDispathToProp = dispatch => ({
    Signup : (payload)=> dispatch(SignUp(payload)),
    dawn: () => dispatch({type:"clear",undefined})
})

export default connect(mapStateToProps,mapDispathToProp)(Register);
