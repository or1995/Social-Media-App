import React,{Component} from 'react';

import {connect} from 'react-redux';
import axios from 'axios';

import classes from './UserFollows.module.css';
import profilePic from '../../../../assets/imgs/profilePicture.png';
import {Link} from 'react-router-dom';
import {BsPeopleFill} from 'react-icons/bs';

import Spinner from '../../../../components/UI/Spinner/Spinner';

class UserFollows extends Component {
    state = {
        followedUsers: null
    }

    componentDidMount() {
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

                const content = filteredUser.map( followedUser => (
                    <Link to={'../users/' + followedUser.userId} key={followedUser.userId} className={this.props.userTheme === 1 ? classes.followLinkDark : classes.followLink}>
                        <div className={this.props.userTheme === 1 ? classes.followedUserDark : classes.followedUser}>
                            <img src={profilePic} alt={followedUser.userName}/>
                            <h3>{followedUser.userName}</h3>
                        </div>
                    </Link>
                ))

                this.setState({followedUsers: content});
            })
        })
    }

    componentDidUpdate(prevProps) {
        if(this.props.userTheme !== prevProps.userTheme) {
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
    
                    const content = filteredUser.map( followedUser => (
                        <Link to={'../users/' + followedUser.userId} key={followedUser.userId} className={this.props.userTheme === 1 ? classes.followLinkDark : classes.followLink}>
                            <div className={this.props.userTheme === 1 ? classes.followedUserDark : classes.followedUser}>
                                <img src={profilePic} alt={followedUser.userName}/>
                                <h3>{followedUser.userName}</h3>
                            </div>
                        </Link>
                    ))
    
                    this.setState({followedUsers: content});
                })
            })  
        }
    }

    render() {

        let content = <Spinner/>

        if(this.state.followedUsers !== null) {
            content = this.state.followedUsers;
        }

        return (
            <div className={this.props.userTheme === 1 ? classes.userFollowsDark : classes.userFollows}>
                <div className={this.props.userTheme === 1 ? classes.headerDark : classes.header}>
                    <BsPeopleFill />
                    <h3>People You Follow</h3>
                </div>
                {content}
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

export default connect(mapStateToProps)(UserFollows);