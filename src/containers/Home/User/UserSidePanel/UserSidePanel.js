import React,{Component} from 'react'

import classes from './UserSidePanel.module.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actions from '../../../../store/actions/index';
import { BsCollection, BsChatSquareQuote, BsPeople, BsHeart, BsMoon ,BsSun, BsCollectionFill, BsChatSquareQuoteFill, BsPeopleFill, BsHeartFill  } from 'react-icons/bs'; 

import profilePic from '../../../../assets/imgs/profilePicture.png';

class UserSidePanel extends Component {
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
                console.log(user.userId , this.props.userId);
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
            <div className={this.props.userTheme ? classes.userSidePanelDark : classes.userSidePanel}>
                <div className={this.props.userTheme ? classes.userAreaDark : classes.userArea}>
                    <div className={this.props.userTheme ? classes.topDark : classes.top}>
                        <img src={profilePic}/>
                        <h1>{this.props.userName}</h1>
                    </div>
                    <div className={this.props.userTheme ? classes.likesDark : classes.likes}>
                        <h3 className={this.props.userTheme ? classes.likeDark : classes.like}>Likes: {sum}</h3>
                        <h3 className={this.props.userTheme ? classes.friendDark : classes.friend}>Followers: {this.state.numOfFollowers}</h3>
                    </div>
                </div>
                <div className={this.props.userTheme ? classes.userStuffDark : classes.userStuff}>
                    <NavLink className={this.props.userTheme ? classes.navDark : classes.nav} to='/me/posts' exact activeClassName={this.props.userTheme ? classes.activeDark : classes.active}>
                        <div className={this.props.userTheme ? classes.itemDark : classes.item}>
                            <div className="outlineUser">
                                <BsCollection />
                            </div>
                            <div className="fillUser">
                                <BsCollectionFill />
                            </div>
                            <h3>Posts</h3>
                        </div>
                    </NavLink>
                    <NavLink className={this.props.userTheme ? classes.navDark : classes.nav}  to='/me/comments' exact activeClassName={this.props.userTheme ? classes.activeDark : classes.active}>
                        <div className={this.props.userTheme ? classes.itemDark : classes.item}>
                            <div className="outlineUser">
                                <BsChatSquareQuote />
                            </div>
                            <div className="fillUser">
                                <BsChatSquareQuoteFill />
                            </div>
                            <h3>Comments</h3>
                        </div>
                    </NavLink>
                    <NavLink className={this.props.userTheme ? classes.navDark : classes.nav}  to='/me/follows' exact activeClassName={this.props.userTheme ? classes.activeDark : classes.active}>
                        <div className={this.props.userTheme ? classes.itemDark : classes.item}>
                            <div className="outlineUser">
                                <BsPeople />
                            </div>
                            <div className="fillUser">
                                <BsPeopleFill />
                            </div>
                            <h3>Follows</h3>
                        </div>
                    </NavLink>
                    <NavLink className={this.props.userTheme ? classes.navDark : classes.nav}  to='/me/likes' exact activeClassName={this.props.userTheme ? classes.activeDark : classes.active}>
                        <div className={this.props.userTheme ? classes.itemDark : classes.item}>
                            <div className="outlineUser">
                                <BsHeart />
                            </div>
                            <div className="fillUser">
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userName: state.auth.userName,
        userId: state.auth.userId,
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

export default connect(mapStateToProps, mapDispatchToProps)(UserSidePanel);