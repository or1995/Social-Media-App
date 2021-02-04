import React from 'react';

import classes from './DrawerToggle.module.css';
import {connect} from 'react-redux';

const drawerToggle = (props) => (
     <div className={classes.DrawerToggle} onClick={props.clicked}>
         <div className={props.userTheme === 1 ? classes.dark : classes.blue}></div>
         <div className={props.userTheme === 1 ? classes.dark : classes.blue}></div>
         <div className={props.userTheme === 1 ? classes.dark : classes.blue}></div>
     </div>
);

const mapStateToProps = state => {
    return {
        userTheme: state.auth.userTheme
    }
}

export default connect(mapStateToProps)(drawerToggle);