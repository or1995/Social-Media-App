import React  from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => (
    props.show ? <div className={props.index === 'high' ? classes.BackdropHigh : classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;