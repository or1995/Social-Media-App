import React, {Component} from 'react';
import classes from './Notifications.module.css';
import axios from 'axios';
import {connect} from 'react-redux';
import profilePic from '../../../assets/imgs/profilePicture.png';
import Spinner from '../../../components/UI/Spinner/Spinner';

import { BsBellFill } from 'react-icons/bs';

class Notifications extends Component {
    constructor(props) {
        super(props);
    
        this._isMounted = false;
    // code reset
    }
    state = {
        notifications: null,
        loading: false
    }

    componentDidMount() {
        this._isMounted = true;
        if(this._isMounted) {
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
              }
            
            const notificationsRefresh =  async () => {
                while (this._isMounted) {
                      await sleep(900000);
                      this.setState({loading: true});
                      axios.get('https://socialmedia-2fd3c.firebaseio.com/notifications.json')
                .then( res => {
                    const fetchedNotifications = [];
                    for(let key in res.data) {
                        fetchedNotifications.push({
                            dataBaseId: key,
                            ...res.data[key]
                        });
                    }
    
                    axios.get('https://socialmedia-2fd3c.firebaseio.com/follows.json')
                .then(res => {
                    const fetchedFollows = [];
                    for(let key in res.data) {
                        fetchedFollows.push({
                            dataBaseId: key,
                            ...res.data[key]
                        });
                    }
    
                    const FollowsNumFilter = fetchedFollows.filter(follow => {
                        return follow.userId === this.props.userId;
                    })
    
                    axios.get('https://socialmedia-2fd3c.firebaseio.com/users.json')
                    .then( res => {
                        const fetchedUsers = [];
                        for(let key in res.data) {
                        fetchedUsers.push({
                            dataBaseId: key,
                            ...res.data[key]
                        });
                        }
    
                        const filteredUser = fetchedUsers.filter(user => {
                            let flag =  false;
                            for(let i = 0; i < FollowsNumFilter.length ; i++){
                                flag = flag || user.userId === FollowsNumFilter[i].followedUserId;
                            }
                            return flag
                        });
    
                        const filteredNotifications = fetchedNotifications.filter(noti => {
                            let flag =  false;
                            for(let i = 0; i < filteredUser.length ; i++){
                                flag = flag || noti.userId === filteredUser[i].userId;
                            }
                            return flag
                        })
    
                        this.setState({notifications: filteredNotifications, loading: false});
                    })
                })
    
                })
                  }

                  if(this._isMounted) {
                    notificationsRefresh();
                } 
                  
            };
            
            notificationsRefresh();

            this.setState({loading: true});
            axios.get('https://socialmedia-2fd3c.firebaseio.com/notifications.json')
            .then( res => {
                const fetchedNotifications = [];
                for(let key in res.data) {
                    fetchedNotifications.push({
                        dataBaseId: key,
                        ...res.data[key]
                    });
                }
    
                axios.get('https://socialmedia-2fd3c.firebaseio.com/follows.json')
            .then(res => {
                const fetchedFollows = [];
                for(let key in res.data) {
                    fetchedFollows.push({
                        dataBaseId: key,
                        ...res.data[key]
                    });
                }
    
                const FollowsNumFilter = fetchedFollows.filter(follow => {
                    return follow.userId === this.props.userId;
                })
    
                axios.get('https://socialmedia-2fd3c.firebaseio.com/users.json')
                .then( res => {
                    const fetchedUsers = [];
                    for(let key in res.data) {
                    fetchedUsers.push({
                        dataBaseId: key,
                        ...res.data[key]
                    });
                    }
    
                    const filteredUser = fetchedUsers.filter(user => {
                        let flag =  false;
                        for(let i = 0; i < FollowsNumFilter.length ; i++){
                            flag = flag || user.userId === FollowsNumFilter[i].followedUserId;
                        }
                        return flag
                    });
    
                    const filteredNotifications = fetchedNotifications.filter(noti => {
                        let flag =  false;
                        for(let i = 0; i < filteredUser.length ; i++){
                            flag = flag || noti.userId === filteredUser[i].userId;
                        }
                        return flag
                    })

                    const finalNotifications = filteredNotifications.reverse();
    
                    this.setState({notifications: finalNotifications, loading: false});
                })
            })
    
            })
        }
        
    } 

    componentWillUnmount() {
        this._isMounted = false;
    }

    postSelectedHandler = (id) => {
        this.props.history.push('../posts/' + id);
    }
    
    
    render() {
        let renderedNotifications = null;
        if(this.state.notifications !== null) {
            renderedNotifications = this.state.notifications.map( notification => {
                if (notification.notificationType === 'post') {
                    return <div onClick={() => this.postSelectedHandler(notification.contentId)} key={notification.notificationId} className={this.props.userTheme === 1 ? classes.notificationLinkDark : classes.notificationLink}><div className={this.props.userTheme === 1 ? classes.notificationItemDark : classes.notificationItem}><img src={profilePic}/><h3>{notification.userName} Created a Post</h3></div></div>
                } else if (notification.notificationType === 'comment') {
                    return <div onClick={() => this.postSelectedHandler(notification.contentId)} key={notification.notificationId} className={this.props.userTheme === 1 ? classes.notificationLinkDark : classes.notificationLink}><div className={this.props.userTheme === 1 ? classes.notificationItemDark : classes.notificationItem}><img src={profilePic}/><h3>{notification.userName} Posted a Comment</h3></div></div>
                } else if (notification.notificationType === 'PostLike') {
                    return <div onClick={() => this.postSelectedHandler(notification.contentId)} key={notification.notificationId} className={this.props.userTheme === 1 ? classes.notificationLinkDark : classes.notificationLink}><div className={this.props.userTheme === 1 ? classes.notificationItemDark : classes.notificationItem}><img src={profilePic}/><h3>{notification.userName} Liked a Post</h3></div></div>
                } else if (notification.notificationType === 'PostDislike') {
                    return <div onClick={() => this.postSelectedHandler(notification.contentId)} key={notification.notificationId} className={this.props.userTheme === 1 ? classes.notificationLinkDark : classes.notificationLink}><div className={this.props.userTheme === 1 ? classes.notificationItemDark : classes.notificationItem}><img src={profilePic}/><h3>{notification.userName} Disliked a Post</h3></div></div>
                } 
            })
        }

        
        return (
            <div className={this.props.userTheme === 1 ? classes.notificationsDark : classes.notifications}>
                <div className={this.props.userTheme === 1 ? classes.headerDark : classes.header}>
                    <BsBellFill />
                    <h3>Notifications</h3>
                </div>
                <div className={this.props.userTheme === 1 ? classes.contentDark : classes.content}>
                    {this.state.loading ? <Spinner/> : renderedNotifications}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        userTheme: state.auth.userTheme
    }
}

export default connect(mapStateToProps)(Notifications);