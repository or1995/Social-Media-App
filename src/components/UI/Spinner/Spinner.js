import React from 'react';
import {connect} from 'react-redux';

import classes from './Spinner.module.css';

const spinner = (props) => (
    <div className={props.userTheme === 1 ? classes.ldsEllipsisDark : classes.ldsEllipsis}><div></div><div></div><div></div><div></div></div>
);

const mapStateToProps = state => {
    return {
        userTheme: state.auth.userTheme
    }
}


export default connect(mapStateToProps)(spinner);