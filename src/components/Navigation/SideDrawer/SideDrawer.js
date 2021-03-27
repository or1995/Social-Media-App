import React,{Component, Fragment} from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../../assets/Logo/Logo';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import axios from 'axios'; 
import { BsCollection, BsChatSquareQuote, BsPeople, BsHeart, BsMoon ,BsSun, BsCollectionFill, BsChatSquareQuoteFill, BsPeopleFill, BsHeartFill  } from 'react-icons/bs'; 
import * as actions from '../../../store/actions/index';
import profilePic from '../../../assets/imgs/profilePicture.png';

class SideDrawer extends Component {
    state = {
        numOfFollowers: null
    }

    UNSAFE_componentWillMount() {
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
                    return follow.followedUserId === this.props.userId;
                })

                this.setState({numOfFollowers: FollowsNumFilter.length});
        })
    }

    changeTheme = () => {
        axios.get('https://socialmedia-2fd3c.firebaseio.com/users.json')
        .then(res => {
            const fetchedUsers = [];
            for(let key in res.data) {
                fetchedUsers.push({
                    dataBaseId: key,
                    ...res.data[key]
                });
            }

            const currentUser = fetchedUsers.filter(user => {
                return user.userId === this.props.userId;
            })

            if(currentUser[0].theme === 1) {
                axios.delete('https://socialmedia-2fd3c.firebaseio.com/users/' + currentUser[0].dataBaseId + '/theme.json')
                .then(res => {
                    
                });
                this.props.getUserTheme(0);
            } else {
                const data = 1;
                axios.put('https://socialmedia-2fd3c.firebaseio.com/users/' + currentUser[0].dataBaseId + '/theme.json', data)
                .then(res => {
                    axios.get('https://socialmedia-2fd3c.firebaseio.com/users.json')
                    .then(res => {
                        
                    });
                    this.props.getUserTheme(1);
                })
            }
        })
    }

    render() {
        let attachedClasses = [classes.SideDrawer, classes.Close];
    if (this.props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

        let attachedClassesDark = [classes.SideDrawerDark, classes.Close];
    if (this.props.open) {
        attachedClassesDark = [classes.SideDrawerDark, classes.Open];
    }

    let filteredPosts = this.props.posts.filter(post => {
        return this.props.userId === post.userId
    });

    let likesArray = filteredPosts.map(post => {
        return post.likes
    });

    let sum = 0;
    for(let i = 0 ; i < likesArray.length ; i++) {
        sum = sum + likesArray[i];
    }

    let filteredComments = this.props.comments.filter(comment => {
        return this.props.userId === comment.userId
    })

    let commentLikesArray = filteredComments.map(comment => {
        return comment.likes
    })

    for(let i = 0 ; i < commentLikesArray.length ; i++) {
        sum = sum + commentLikesArray[i];
    }

    
    return (
        <Fragment>
            <Backdrop show={this.props.open} clicked={this.props.closed} index='high'/>
            <div className={this.props.userTheme === 1 ? attachedClassesDark.join(' ') : attachedClasses.join(' ')} onClick={this.props.closed} >
                <div className={this.props.userTheme === 1 ? classes.LogoDark : classes.Logo}>
                    <div className={this.props.userTheme === 1 ? classes.userDark : classes.user}>
                        <img src={profilePic} />
                        <h3>{this.props.userName}</h3>
                    </div>
                    <div className={this.props.userTheme === 1 ? classes.likesDark : classes.likes}>
                        <h3 className={this.props.userTheme === 1 ? classes.likeDark : classes.like}>Likes: {sum}</h3>
                        <h3 className={this.props.userTheme === 1 ? classes.friendDark : classes.friend}>Followers: {this.state.numOfFollowers}</h3>
                    </div>
                </div>
                <nav>
                    <NavigationItems type='small'  isAuth={this.props.isAuth}/>
                    <div className={this.props.userTheme === 1 ? classes.userStuffDark : classes.userStuff}>
                    <NavLink className={this.props.userTheme === 1 ? classes.navDark : classes.nav} to='/me/posts' exact activeClassName={this.props.userTheme === 1 ? classes.activeDark : classes.active}>
                        <div className={this.props.userTheme === 1 ? classes.itemDark : classes.item}>
                        <div className="outlineSide">
                                <BsCollection />
                            </div>
                            <div className="fillSide">
                                <BsCollectionFill />
                            </div>
                            <h3>Posts</h3>
                        </div>
                    </NavLink>
                    <NavLink className={this.props.userTheme === 1 ? classes.navDark : classes.nav} to='/me/comments' exact activeClassName={this.props.userTheme === 1 ? classes.activeDark : classes.active}>
                        <div className={this.props.userTheme === 1 ? classes.itemDark : classes.item}>
                        <div className="outlineSide">
                                <BsChatSquareQuote />
                            </div>
                            <div className="fillSide">
                                <BsChatSquareQuoteFill />
                            </div>
                            <h3>Comments</h3>
                        </div>
                    </NavLink>
                    <NavLink className={this.props.userTheme === 1 ? classes.navDark : classes.nav} to='/me/follows' exact activeClassName={this.props.userTheme === 1 ? classes.activeDark : classes.active}>
                        <div className={this.props.userTheme === 1 ? classes.itemDark : classes.item}>
                            <div className="outlineSide">
                                <BsPeople />
                            </div>
                            <div className="fillSide">
                                <BsPeopleFill />
                            </div>
                            <h3>Follows</h3>
                        </div>
                    </NavLink>
                    <NavLink className={this.props.userTheme === 1 ? classes.navDark : classes.nav} to='/me/likes' exact activeClassName={this.props.userTheme === 1 ? classes.activeDark : classes.active}>
                        <div className={this.props.userTheme === 1 ? classes.itemDark : classes.item}>
                        <div className="outlineSide">
                                <BsHeart />
                            </div>
                            <div className="fillSide">
                                <BsHeartFill />
                            </div>
                            <h3>Likes</h3>
                        </div>
                    </NavLink>
                    <div className={this.props.userTheme ? classes.navDark : classes.nav}  onClick={this.changeTheme}>
                        <div className={this.props.userTheme ? classes.itemDark : classes.item}>
                            {this.props.userTheme === 1 ? <BsSun /> : <BsMoon />}
                            <h3>{this.props.userTheme === 1 ? 'Light' : 'Dark'} Mode</h3>
                        </div>
                    </div>
                </div>
                </nav>
            </div>
        </Fragment>
    );
    }
};

const mapStateToProps = state => {
    return {
        userName: state.auth.userName,
        userId: state.auth.userId,
        posts: state.posts.posts,
        posts: state.posts.posts,
        comments: state.comments.allComments,
        userTheme: state.auth.userTheme
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserTheme: (theme) => dispatch(actions.getUserTheme(theme))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);