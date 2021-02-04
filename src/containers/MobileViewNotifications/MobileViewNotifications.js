import React from 'react';
import classes from './MobileViewNotifications.module.css';
import Notifications from '../Home/Notifications/Notifications';
import {connect} from 'react-redux';

const mobileViewNotifications = (props) => {
    return (
        <div className={props.userTheme === 1 ? classes.MobileViewNotificationsDark : classes.MobileViewNotifications}>
            <div className={props.userTheme === 1 ? classes.shadowDark : classes.shadow}>
                <Notifications history={props.history}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userTheme: state.auth.userTheme
    }
}

export default connect(mapStateToProps)(mobileViewNotifications);