import React,{Component} from 'react';

import axios from 'axios';
import {connect} from 'react-redux';
import classes from './OtherUserFollows.module.css';
import profilePic from '../../../assets/imgs/profilePicture.png';
import {Link} from 'react-router-dom';

import Spinner from '../../../components/UI/Spinner/Spinner';
import {BsPeopleFill} from 'react-icons/bs';

class OtherUserFollows extends Component {
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
                return follow.userId === this.props.otherUserId;
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
                    <Link to={followedUser.userId === this.props.userId ? '/me/posts' : '../../../users/' + followedUser.userId} key={followedUser.userId} className={this.props.userTheme === 1 ? classes.followLinkDark : classes.followLink}>
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
                return follow.userId === this.props.otherUserId;
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
                    <Link to={followedUser.userId === this.props.userId ? '/me/posts' : '../../../users/' + followedUser.userId} key={followedUser.userId} className={this.props.userTheme === 1 ? classes.followLinkDark : classes.followLink}>
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
                    <BsPeopleFill/>
                    <h3>People {this.props.userName} Follow</h3>
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

export default connect(mapStateToProps)(OtherUserFollows);