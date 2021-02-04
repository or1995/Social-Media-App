import React from 'react';
import classes from './Button.module.css';
import {connect} from 'react-redux';


const button = (props) => {
    let content;
    if(props.userTheme === 1) {
        content = classes.ButtonDark;
    } else {
        content = classes.Button;
    }
    
    return (<button 
        disabled={props.disabled} 
        className={[content, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>)
};

const mapStateToProps = state => {
    return {
        userTheme: state.auth.userTheme
    }
};

export default connect(mapStateToProps)(button);