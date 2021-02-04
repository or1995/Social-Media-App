import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {connect} from 'react-redux';
import { BsChatDots, BsHouseDoor, BsPerson, BsBoxArrowDownRight, BsBell, BsHouseDoorFill, BsChatDotsFill, BsPersonFill, BsBellFill  } from 'react-icons/bs';

const navigationItems = (props) =>{
let items;
if(props.isAuth) {
    if(props.type === 'big') {
        items = (<ul className={props.userTheme === 1 ? classes.NavigationItemsDark : classes.NavigationItems}>
            <NavigationItem link="/" exact>
                <div className={classes.user}>
                    <div className='outline'>
                        <BsHouseDoor />
                    </div>
                    <div className='fill'>
                        <BsHouseDoorFill />
                    </div>
                    <h3 className={classes.userName}>Home</h3>
                </div>
                </NavigationItem>
            <NavigationItem link="/chat">
                <div className={classes.user}>
                    <div className='outline'>
                        <BsChatDots />
                    </div>
                    <div className='fill'>
                        <BsChatDotsFill />
                    </div>
                    <h3 className={classes.userName}>Chat</h3>
                </div>   
                </NavigationItem> 
            <NavigationItem link="../../../me/posts" exact>
                <div className={classes.user}>
                    <div className='outline'>
                        <BsPerson />
                    </div>
                    <div className='fill'>
                        <BsPersonFill />
                    </div>
                    <h3 className={classes.userName}>{props.userName}</h3>
                </div>
                </NavigationItem>
            <NavigationItem link="/logout">
                <div className={classes.user}>
                    <div className='outline'>
                        <BsBoxArrowDownRight />
                    </div>
                    <h3 className={classes.userName}>LogOut</h3>
                </div>
                </NavigationItem>
        </ul>)
    } else {
        items = (<ul className={props.userTheme === 1 ? classes.NavigationItemsDark : classes.NavigationItems}>
            <NavigationItem link="/" exact>
                <div className='outline'>
                    <BsHouseDoor />
                </div>
                <div className='fill'>
                    <BsHouseDoorFill />
                </div>
                <span>Home</span>
            </NavigationItem>
            <NavigationItem link="../../../me/notifications">
                <div className='outline'>
                    <BsBell />
                </div>
                <div className='fill'>
                    <BsBellFill />
                </div>
                <span>Notifcations</span>
            </NavigationItem> 
            <NavigationItem link="/chat">
                <div className='outline'>
                    <BsChatDots />
                </div>
                <div className='fill'>
                    <BsChatDotsFill />
                </div>
                <span>Chat</span>
            </NavigationItem> 
            <NavigationItem link="../../../me/posts" exact>
                <div className='outline'>   
                    <BsPerson />
                </div>
                <div className='fill'>
                    <BsPersonFill />
                </div>
                <span>{props.userName}</span>
            </NavigationItem>
            <NavigationItem link="/logout">
                <div className='outline'> 
                    <BsBoxArrowDownRight />
                </div>
                <span>logout</span>
            </NavigationItem>
        </ul>);
    }
} else {
    items = null;
}

return items;

};

const mapStateToProps = state => {
    return {
        userName: state.auth.userName,
        userId: state.auth.userId,
        userTheme: state.auth.userTheme
    }
}



export default connect(mapStateToProps)(navigationItems);