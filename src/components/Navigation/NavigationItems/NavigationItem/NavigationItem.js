import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.module.css';
import {connect} from 'react-redux';

const navigationItem = (props)  => (
    <li className={props.userTheme === 1 ? classes.NavigationItemDark : classes.NavigationItem}>
        <NavLink 
            to={props.link} 
            exact={props.exact}
            activeClassName={classes.active}>{props.children}</NavLink>
    </li>
);

const mapStateToProps = state => {
    return {
        userTheme: state.auth.userTheme
    }
}

export default connect(mapStateToProps)(navigationItem);