import React,{Component} from 'react';
import classes from './OtherUser.module.css';

import OtherUserPosts from './OtherUserPosts/OtherUserPosts';
import OtherUserComments from './OtherUserComments/OtherUserComments';
import OtherUserLikes from './OtherUserLikes/OtherUserLikes';
import OtherUserFollows from './OtherUserFollows/OtherUserFollows';
import OtherUserSidePanel from './OtherUserSidePanel/OtherUserSidePanel';
import { Route, Switch} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

import Notifications from '../Home/Notifications/Notifications';

class OtherUser extends Component {
    state = {
        userId: null,
        userName: null
    }
    
    UNSAFE_componentWillMount() {
        this.setState({userId: this.props.match.params.id});

        axios.get('https://socialmedia-2fd3c.firebaseio.com/users.json')
        .then(res => {
            const fetchedUsers = [];
            for(let key in res.data) {
                fetchedUsers.push({
                    dataBaseId: key,
                    ...res.data[key]
                });
            }

            const filteredUser = fetchedUsers.filter(user => {
                return user.userId === this.state.userId;
            });

            this.setState({userName: filteredUser[0].userName});
        })
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({userId: this.props.match.params.id});

            axios.get('https://socialmedia-2fd3c.firebaseio.com/users.json')
            .then(res => {
                const fetchedUsers = [];
                for(let key in res.data) {
                    fetchedUsers.push({
                        dataBaseId: key,
                        ...res.data[key]
                    });
                }
    
                const filteredUser = fetchedUsers.filter(user => {
                    return user.userId === this.state.userId;
                });
    
                this.setState({userName: filteredUser[0].userName});
            })  
        }
    }
    
    render() {
        return (
            <div className={this.props.userTheme ? classes.OtherUserDark : classes.OtherUser}>
                    <div className={this.props.userTheme ? classes.dummyoneDark : classes.dummyone}>
                        <OtherUserSidePanel otherUserId={this.state.userId} otherUserName={this.state.userName} history={this.props.history}/>
                    </div>
                    <div className={this.props.userTheme ? classes.middleDark : classes.middle}>
                        <Switch>
                            <Route path='/users/:id' exact component={() =><OtherUserPosts otherUserId={this.state.userId} userName={this.state.userName} history={this.props.history}/>} />
                            <Route path='/users/:id/comments' exact component={() =><OtherUserComments otherUserId={this.state.userId} userName={this.state.userName} history={this.props.history}/>} />
                            <Route path='/users/:id/likes' exact component={() =><OtherUserLikes otherUserId={this.state.userId} userName={this.state.userName} history={this.props.history}/>} />
                            <Route path='/users/:id/follows' exact component={() =><OtherUserFollows otherUserId={this.state.userId} userName={this.state.userName} history={this.props.history}/>} />
                        </Switch>
                    </div>
                    <div className={this.props.userTheme ? classes.dummytwoDark : classes.dummytwo}>
                        <Notifications history={this.props.history}/>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userTheme: state.auth.userTheme
    }
}

export default connect(mapStateToProps)(OtherUser);