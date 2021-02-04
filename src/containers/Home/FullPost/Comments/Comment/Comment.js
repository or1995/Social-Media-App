import React, { Component } from 'react';

import classes from './Comment.module.css';

import {connect} from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import axios from 'axios';
import {Link} from 'react-router-dom';
import profilePic from '../../../../../assets/imgs/profilePicture.png';

class Comment extends Component {
    state= {
        currentLike: null,
        likeClass: classes.likeButton,
        disLikeClass: classes.unlikeButton,
        numOfLikes: null,
        likesUpdater: null
    }

    componentDidMount() {
        if(this.props.userTheme === 1) {
            this.setState({likeClass: classes.likeButtonDark, disLikeClass: classes.unlikeButtonDark})
        } else {
            this.setState({likeClass: classes.likeButton, disLikeClass: classes.unlikeButton})
        }

        axios.get('https://socialmedia-2fd3c.firebaseio.com/comments/' + this.props.dbKey + '/likes.json')
            .then(res => {
                this.setState({numOfLikes: res.data, likesUpdater: res.data});
            });

        axios.get('https://socialmedia-2fd3c.firebaseio.com/likes.json')
            .then(res => {
                const fetchedPosts = [];
                for(let key in res.data) {
                fetchedPosts.push({
                    dataBaseId: key,
                    ...res.data[key]
                    });
                }
                
                if(res.data !== null){
                    const likes = fetchedPosts.filter(like => {
                        return like.userId === this.props.userId && like.contentId === this.props.commentId;
                    });
                    this.setState({currentLike: likes[0]});

                    } 
                if(this.state.currentLike) {
                    if(this.state.currentLike.likeType === 1) {
                        if(this.props.userTheme === 1) {
                            this.setState({likeClass: classes.likeButtonClicked, disLikeClass: classes.unlikeButtonDark});
                        } else {
                            this.setState({likeClass: classes.likeButtonClicked, disLikeClass: classes.unlikeButton});
                        }
                    } else if(this.state.currentLike.likeType === 2) {
                        if(this.props.userTheme === 1) {
                            this.setState({disLikeClass: classes.unlikeButtonClicked, likeClass: classes.likeButtonDark});
                        } else {
                            this.setState({disLikeClass: classes.unlikeButtonClicked, likeClass: classes.likeButton});
                        }
                    }
                }
            })
    }

    componentDidUpdate(prevProps) {
        if(this.props.userTheme !== prevProps.userTheme) {
            if(this.props.userTheme === 1) {
                this.setState({likeClass: classes.likeButtonDark, disLikeClass: classes.unlikeButtonDark})
            } else {
                this.setState({likeClass: classes.likeButton, disLikeClass: classes.unlikeButton})
            }
    
            axios.get('https://socialmedia-2fd3c.firebaseio.com/comments/' + this.props.dbKey + '/likes.json')
                .then(res => {
                    this.setState({numOfLikes: res.data, likesUpdater: res.data});
                });
    
            axios.get('https://socialmedia-2fd3c.firebaseio.com/likes.json')
                .then(res => {
                    const fetchedPosts = [];
                    for(let key in res.data) {
                    fetchedPosts.push({
                        dataBaseId: key,
                        ...res.data[key]
                        });
                    }
                    
                    if(res.data !== null){
                        const likes = fetchedPosts.filter(like => {
                            return like.userId === this.props.userId && like.contentId === this.props.commentId;
                        });
                        this.setState({currentLike: likes[0]});
    
                        } 
                    if(this.state.currentLike) {
                        if(this.state.currentLike.likeType === 1) {
                            if(this.props.userTheme === 1) {
                                this.setState({likeClass: classes.likeButtonClicked, disLikeClass: classes.unlikeButtonDark});
                            } else {
                                this.setState({likeClass: classes.likeButtonClicked, disLikeClass: classes.unlikeButton});
                            }
                        } else if(this.state.currentLike.likeType === 2) {
                            if(this.props.userTheme === 1) {
                                this.setState({disLikeClass: classes.unlikeButtonClicked, likeClass: classes.likeButtonDark});
                            } else {
                                this.setState({disLikeClass: classes.unlikeButtonClicked, likeClass: classes.likeButton});
                            }
                        }
                    }
                })
        }
    }

    Like = () => {
        axios.get('https://socialmedia-2fd3c.firebaseio.com/likes.json')
            .then(res => {
                const fetchedPosts = [];
                for(let key in res.data) {
                fetchedPosts.push({
                    dataBaseId: key,
                    ...res.data[key]
                    });
                }

                if(res.data !== null){
                    const likes = fetchedPosts.filter(like => {
                        return like.userId === this.props.userId && like.contentId === this.props.commentId;
                    })
                    if(likes.length < 1) {
                        this.setState({currentLike: null});
                    } else {
                        this.setState({currentLike: likes[0]});
                    }
                } else if (res.data === null){
                    this.setState({currentLike: null});
                }

                if(this.state.currentLike === null) {
                    const data = {
                        contentId: this.props.commentId,
                        contentType: 'comment',
                        likeType: 1,
                        userId: this.props.userId
                    };
        
                    this.props.likeDatabasePost(data);
                    this.props.likeUpdate(this.props.dbKey, this.props.likes + 1);
                    if(this.props.userTheme === 1) {
                        this.setState({likeClass: classes.likeButtonClicked, disLikeClass: classes.unlikeButtonDark, likesUpdater: this.state.likesUpdater + 1});
                    } else {
                        this.setState({likeClass: classes.likeButtonClicked, disLikeClass: classes.unlikeButton, likesUpdater: this.state.likesUpdater + 1});
                    }
    
                } else {
                    if (this.state.currentLike.likeType === 1) {
                        axios.get('https://socialmedia-2fd3c.firebaseio.com/comments/' + this.props.dbKey + '/likes.json')
                        .then(res => {
                            let data = res.data - 1;
                            this.props.likeUpdate(this.props.dbKey, data);
                            this.props.likeDatabaseDelete(this.state.currentLike.dataBaseId);
                            if(this.props.userTheme === 1) {
                                this.setState({likeClass: classes.likeButtonDark, disLikeClass: classes.unlikeButtonDark, likesUpdater: this.state.likesUpdater - 1});
                            } else {
                                this.setState({likeClass: classes.likeButton, disLikeClass: classes.unlikeButton, likesUpdater: this.state.likesUpdater - 1});
                            }
                            
                        })
                    } else if (this.state.currentLike.likeType === 2) {
                        axios.get('https://socialmedia-2fd3c.firebaseio.com/comments/' + this.props.dbKey + '/likes.json')
                        .then(res => {
                            let data = res.data + 2;
                            this.props.likeUpdate(this.props.dbKey, data);
                            const likeflag = 1;
                            this.props.likeDatabaseUpdate(this.state.currentLike.dataBaseId, likeflag);
                            if(this.props.userTheme === 1) {
                                this.setState({likeClass: classes.likeButtonClicked, disLikeClass: classes.unlikeButtonDark, likesUpdater: this.state.likesUpdater + 2});
                            } else {
                                this.setState({likeClass: classes.likeButtonClicked, disLikeClass: classes.unlikeButton, likesUpdater: this.state.likesUpdater + 2});
                            }   
                        })
                    }
                }
            }); 
    }

    disLike = () => {
        axios.get('https://socialmedia-2fd3c.firebaseio.com/likes.json')
            .then(res => {
                const fetchedPosts = [];
                for(let key in res.data) {
                fetchedPosts.push({
                    dataBaseId: key,
                    ...res.data[key]
                    });
                }

                if(res.data !== null){
                    const likes = fetchedPosts.filter(like => {
                        return like.userId === this.props.userId && like.contentId === this.props.commentId;
                    })
                    if(likes.length < 1) {
                        this.setState({currentLike: null});
                    } else {
                        this.setState({currentLike: likes[0]});
                    }
                } else if (res.data === null){
                    this.setState({currentLike: null});
                }

                if(this.state.currentLike === null) {
                    const data = {
                        contentId: this.props.commentId,
                        contentType: 'comment',
                        likeType: 2,
                        userId: this.props.userId
                    };
        
                    this.props.likeDatabasePost(data);
                    this.props.likeUpdate(this.props.dbKey, this.props.likes - 1);
                    if(this.props.userTheme === 1) {
                        this.setState({disLikeClass: classes.unlikeButtonClicked, likeClass: classes.likeButtonDark, likesUpdater: this.state.likesUpdater - 1});
                    } else {
                        this.setState({disLikeClass: classes.unlikeButtonClicked, likeClass: classes.likeButton, likesUpdater: this.state.likesUpdater - 1});
                    }
                    
                } else {
                    if (this.state.currentLike.likeType === 1) {
                        axios.get('https://socialmedia-2fd3c.firebaseio.com/comments/' + this.props.dbKey + '/likes.json')
                        .then(res => {
                            let data = res.data - 2;
                            this.props.likeUpdate(this.props.dbKey, data);
                            const likeflag = 2;
                            this.props.likeDatabaseUpdate(this.state.currentLike.dataBaseId, likeflag);
                            if(this.props.userTheme === 1) {
                                this.setState({disLikeClass: classes.unlikeButtonClicked, likeClass: classes.likeButtonDark, likesUpdater: this.state.likesUpdater - 2});
                            } else {
                                this.setState({disLikeClass: classes.unlikeButtonClicked, likeClass: classes.likeButton, likesUpdater: this.state.likesUpdater - 2});
                            }
                            
                        })
                    } else if (this.state.currentLike.likeType === 2) {
                        axios.get('https://socialmedia-2fd3c.firebaseio.com/comments/' + this.props.dbKey + '/likes.json')
                        .then(res => {
                            let data = res.data + 1;
                            this.props.likeUpdate(this.props.dbKey, data);
                            this.props.likeDatabaseDelete(this.state.currentLike.dataBaseId);
                            if(this.props.userTheme === 1) {
                                this.setState({disLikeClass: classes.unlikeButtonDark, likeClass: classes.likeButtonDark, likesUpdater: this.state.likesUpdater + 1});
                            } else {
                                this.setState({disLikeClass: classes.unlikeButton, likeClass: classes.likeButton, likesUpdater: this.state.likesUpdater + 1});
                            }  
                        })
                    }
                }
            }); 
    }

    render() {
        let likesContent = (<h3 className={this.props.userTheme === 1 ? classes.likesDark : classes.likes}>{this.state.likesUpdater}</h3>);
        if(this.state.likesUpdater > 0) {
            likesContent = (<h3 className={this.props.userTheme === 1 ? classes.likesUpDark : classes.likesUp}>{this.state.likesUpdater}</h3>);
        } else if(this.state.likesUpdater < 0) {
            likesContent = (<h3 className={this.props.userTheme === 1 ? classes.likesDownDark : classes.likesDown}>{this.state.likesUpdater}</h3>);
        }

        return (
            <div className={this.props.userTheme === 1 ? classes.CommentDark : classes.Comment}>
                <div className={this.props.userTheme === 1 ? classes.userAreaDark : classes.userArea}>
                    <Link to={this.props.userId === this.props.commentUserId ? '/me/posts' : "/users/" + this.props.commentUserId} ><img className={this.props.userTheme === 1 ? classes.profileImgDark : classes.profileImg} src={profilePic} alt={this.props.userName}/></Link>
                    <h2 className={this.props.userTheme === 1 ? classes.UserDark : classes.User}><Link to={this.props.userId === this.props.commentUserId ? '/me/posts' : "/users/" + this.props.commentUserId} >{this.props.userName}</Link></h2>
                </div>
                <h3 className={this.props.userTheme === 1 ? classes.contentDark : classes.content}>{this.props.content}</h3>
                <div className={this.props.userTheme === 1 ? classes.likeAreaDark : classes.likeArea}>
                    <button className={this.state.likeClass} onClick={this.Like}>Like</button>
                    <button className={this.state.disLikeClass} onClick={this.disLike}>Dislike</button>
                    {likesContent}
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        likeLoading: state.posts.likeLoading,
        buttonDisabled: state.likes.buttonDisabled,
        userTheme: state.auth.userTheme
    }
}

const mapDispatchToProps = dispatch => {
    return {
        likeUpdate: (dbpost, likes) => dispatch(actions.updateCommentsLikes(dbpost, likes)),
        likeDatabasePost: (data) => dispatch(actions.userLikePost(data)),
        likeDatabaseUpdate: (id, data) => dispatch(actions.userLikePut(id, data)),
        likeDatabaseDelete: (id) => dispatch(actions.userLikeDelete(id))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Comment);