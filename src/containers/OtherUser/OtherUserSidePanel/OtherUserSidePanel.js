import React,{Component} from 'react';
import classes from './OtherUserSidePanel.module.css';

import {NavLink} from 'react-router-dom';
import profilePic from '../../../assets/imgs/profilePicture.png';
import axios from 'axios';

import Button from '../../../components/UI/Button/Button';
import { connect } from 'react-redux';
import { BsCollection, BsChatSquareQuote, BsPeople, BsHeart, BsCollectionFill, BsChatSquareQuoteFill, BsPeopleFill, BsHeartFill  } from 'react-icons/bs'; 

import uniqid from 'uniqid';

class OtherUserSidePanel extends Component {
    state = {
        followed: false,
        loading: false,
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


                const filteredFollows = fetchedFollows.filter(follow => {
                    return follow.followedUserId === this.props.otherUserId && follow.userId === this.props.userId;
                })

                const FollowsNumFilter = fetchedFollows.filter(follow => {
                    return follow.followedUserId === this.props.otherUserId;
                })

                this.setState({numOfFollowers: FollowsNumFilter.length});

                if(filteredFollows.length === 0) {
                    this.setState({followed: false});
                } else {
                    this.setState({followed: true});
                }
        })
    }

    follow = () => {
        this.setState({loading: true});
        axios.get('https://socialmedia-2fd3c.firebaseio.com/follows.json')
            .then(res => {
                const fetchedFollows = [];
                for(let key in res.data) {
                    fetchedFollows.push({
                        dataBaseId: key,
                        ...res.data[key]
                    });
                }


                const filteredFollows = fetchedFollows.filter(follow => {
                    return follow.followedUserId === this.props.otherUserId && follow.userId === this.props.userId;
                })

                if(filteredFollows.length === 0) {
                    let data = {
                        followedUserId:  this.props.otherUserId,
                        userId: this.props.userId
                    }
                    axios.post('https://socialmedia-2fd3c.firebaseio.com/follows.json', data);
                    this.setState({followed: true});

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
                            return follow.userId === this.props.otherUserId && follow.followedUserId === this.props.userId;
                        })

                        if(FollowsNumFilter.length > 0) {
                            const data = {
                                chatId: uniqid(),
                                FirstUserId: this.props.otherUserId,
                                secondUserId: this.props.userId,
                                FirstUserName: this.props.otherUserName,
                                secondUserName: this.props.userName
                            }
                            axios.post('https://socialmedia-2fd3c.firebaseio.com/chat.json', data);
                    }
                })    
                } else {
                    axios.delete('https://socialmedia-2fd3c.firebaseio.com/follows/' + filteredFollows[0].dataBaseId + '.json');
                    this.setState({followed: false});
                }

                this.setState({loading: false});
            })   
    }

    render() {
        let filteredPosts = this.props.posts.filter(post => {
            return this.props.otherUserId === post.userId
        });

        let likesArray = filteredPosts.map(post => {
            return post.likes
        });

        let sum = 0;
        for(let i = 0 ; i < likesArray.length ; i++) {
            sum = sum + likesArray[i];
        }

        let filteredComments = this.props.comments.filter(comment => {
            return this.props.otherUserId === comment.userId
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
                    <div className={this.props.userTheme ? classes.smallDark : classes.small}>
                        <div className={this.props.userTheme ? classes.topDark : classes.top}>
                            <img src={profilePic} alt={this.props.otherUserName}/>
                            <h1>{this.props.otherUserName}</h1>
                        </div>
                        <div className={this.props.userTheme ? classes.likesDark : classes.likes}>
                            <h3 className={this.props.userTheme ? classes.likeDark : classes.like}>Likes: {sum}</h3>
                            <h3 className={this.props.userTheme ? classes.friendDark : classes.friend}>Followers: {this.state.numOfFollowers}</h3>
                        </div>
                    </div>
                    <Button btnType={this.state.followed ? "green" : "pink"} clicked={this.follow} disabled={this.state.loading}>{this.state.followed ? "Unfollow" : "Follow"}</Button>
                </div>
                <div className={this.props.userTheme ? classes.userStuffDark : classes.userStuff}>
                    <NavLink className={this.props.userTheme ? classes.navDark : classes.nav} to={'/users/' + this.props.otherUserId} exact activeClassName={this.props.userTheme ? classes.activeDark : classes.active}>
                        <div className={this.props.userTheme ? classes.itemDark : classes.item}>
                        <div className="outlineOtherUser">
                                <BsCollection />
                            </div>
                            <div className="fillOtherUser">
                                <BsCollectionFill />
                            </div>
                            <h3>Posts</h3>
                        </div>
                    </NavLink>
                    <NavLink className={this.props.userTheme ? classes.navDark : classes.nav}  to={'/users/' + this.props.otherUserId + '/comments'} exact activeClassName={this.props.userTheme ? classes.activeDark : classes.active}>
                        <div className={this.props.userTheme ? classes.itemDark : classes.item}>
                            <div className="outlineOtherUser">
                                <BsChatSquareQuote />
                            </div>
                            <div className="fillOtherUser">
                                <BsChatSquareQuoteFill />
                            </div>
                            <h3>Comments</h3>
                        </div>
                    </NavLink>
                    <NavLink className={this.props.userTheme ? classes.navDark : classes.nav}  to={'/users/' + this.props.otherUserId + '/follows'} exact activeClassName={this.props.userTheme ? classes.activeDark : classes.active}>
                        <div className={this.props.userTheme ? classes.itemDark : classes.item}>
                        <div className="outlineOtherUser">
                                <BsPeople />
                            </div>
                            <div className="fillOtherUser">
                                <BsPeopleFill />
                            </div>
                            <h3>Follows</h3>
                        </div>
                    </NavLink>
                    <NavLink className={this.props.userTheme ? classes.navDark : classes.nav}  to={'/users/' + this.props.otherUserId + '/likes'} exact activeClassName={this.props.userTheme ? classes.activeDark : classes.active}>
                        <div className={this.props.userTheme ? classes.itemDark : classes.item}>
                        <div className="outlineOtherUser">
                                <BsHeart />
                            </div>
                            <div className="fillOtherUser">
                                <BsHeartFill />
                            </div>
                            <h3>Likes</h3>
                        </div>
                    </NavLink>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        comments: state.comments.allComments,
        userId: state.auth.userId,
        userName: state.auth.userName,
        userTheme: state.auth.userTheme
    }
}

export default connect(mapStateToProps)(OtherUserSidePanel);