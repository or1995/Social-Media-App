import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'; 
import { updateObject, checkValidaity } from '../../shared/utility';
import Logo from '../../assets/Logo/Logo';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                    },
                valid: false,
                touched: false,
                signUpOnly: false
                },
            userName: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'User Name'
                },
                value: '',
                validation: {
                    required: true
                    },
                valid: false,
                touched: false,
                signUpOnly: true
                },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                    },
                valid: false,
                touched: false,
                signUpOnly: false
                }
        },
        isSignup: false
    };

    componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidaity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        this.setState({
            controls: updatedControls
        });
    };

    

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.controls.userName.value, this.state.isSignup);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            };
        })
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };

        let form = formElementsArray.map(formElement => {
            if(this.state.isSignup) {
                return (
                    <Input 
                    key={formElement.id} 
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value} 
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation} 
                    touched={formElement.config.touched} 
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />);
            } else {
                if(!formElement.config.signUpOnly) {
                    return (
                        <Input 
                        key={formElement.id} 
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value} 
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation} 
                        touched={formElement.config.touched} 
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />);
                } else {
                    return null;
                }
            }
            
        });

        if(this.props.loading) {
            form= <div className={classes.spinnerDiv}><Spinner /></div>
        };

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;

        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.fullAuth}>
                <Logo type="white" />
                <div className={classes.Auth}>
                    {authRedirect}
                    {errorMessage}
                    <form onSubmit={this.submitHandler} className={classes.signform}>
                        <div className={classes.logo}>
                            <Logo type="small"/>
                        </div>
                        <h3 className={classes.message}>{this.state.isSignup ? 'Sign Up' : 'Sign In'}</h3>
                        <div className={classes.inputs}>
                            {form}
                        </div> 
                        <Button btnType="green">SUBMIT</Button>
                    </form>
                    <Button
                        clicked={this.switchAuthModeHandler} 
                        btnType="pink">{this.state.isSignup ? 'LOGIN HERE' : 'SIGNUP HERE'}</Button>
                </div>
                <div className={classes.footer}>
                    <h3>This website is created by <a href="omaralidev.com" target="_blank" rel='noopener noreferrer'>OMAR ALI</a> &copy;2020. This background image is  <a href="http://www.freepik.com" target="_blank">Designed by Freepik</a></h3>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, userName, isSignup) => dispatch(actions.auth(email, password, userName, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);