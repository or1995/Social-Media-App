import React, {Component} from 'react';

import classes from './Post.module.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../../../../store/actions/index';
import profilePic from '../../../../assets/imgs/profilePicture.png';
import ReactPlayer from 'react-player';
import uniqid from 'uniqid';

import axios from 'axios';


class Post extends Component {
    state= {
        currentLike: null,
        likeClass: classes.likeButton,
        disLikeClass: classes.unlikeButton,
        likesUpdater: null
    }

    componentDidMount() {

        if(this.props.userTheme === 1) {
            this.setState({likeClass: classes.likeButtonDark, disLikeClass: classes.unlikeButtonDark})
        }

        this.setState({likesUpdater: this.props.likes});
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
                        return like.userId === this.props.userId && like.contentId === this.props.postId;
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
                        return like.userId === this.props.userId && like.contentId === this.props.postId;
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
                        contentId: this.props.postId,
                        contentType: 'post',
                        likeType: 1,
                        userId: this.props.userId
                    };
        
                    this.props.likeDatabasePost(data);
                    this.props.likeUpdate(this.props.dbKey, this.props.likes + 1);
                    if(this.props.userTheme === 1) {
                        this.setState({likeClass: classes.likeButtonClicked, disLikeClass: classes.unlikeButtonDark , likesUpdater: this.state.likesUpdater + 1});
                    } else {
                        this.setState({likeClass: classes.likeButtonClicked, disLikeClass: classes.unlikeButton , likesUpdater: this.state.likesUpdater + 1});
                    }

                    const notificationsData = {
                        notificationType: 'PostLike',
                        contentId: this.props.postId,
                        userId: this.props.userId,
                        userName: this.props.userName,
                        notificationId: uniqid()
                    }
            
                    axios.post('https://socialmedia-2fd3c.firebaseio.com/notifications.json',notificationsData);
                } else {
                    if (this.state.currentLike.likeType === 1) {
                        axios.get('https://socialmedia-2fd3c.firebaseio.com/posts/' + this.props.dbKey + '/likes.json')
                        .then(res => {
                            let data = res.data - 1;
                            this.props.likeUpdate(this.props.dbKey, data);
                            this.props.likeDatabaseDelete(this.state.currentLike.dataBaseId);
                            if(this.props.userTheme === 1){
                                this.setState({likeClass: classes.likeButtonDark, disLikeClass: classes.unlikeButtonDark ,likesUpdater: this.state.likesUpdater - 1});
                            } else {
                                this.setState({likeClass: classes.likeButton, disLikeClass: classes.unlikeButton,likesUpdater: this.state.likesUpdater - 1});
                            }
                        })
                    } else if (this.state.currentLike.likeType === 2) {
                        axios.get('https://socialmedia-2fd3c.firebaseio.com/posts/' + this.props.dbKey + '/likes.json')
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
                            

                            const notificationsData = {
                                notificationType: 'PostLike',
                                contentId: this.props.postId,
                                userId: this.props.userId,
                                userName: this.props.userName,
                                notificationId: uniqid()
                            }
                    
                            axios.post('https://socialmedia-2fd3c.firebaseio.com/notifications.json',notificationsData);
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
                        return like.userId === this.props.userId && like.contentId === this.props.postId;
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
                        contentId: this.props.postId,
                        contentType: 'post',
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
                    

                    const notificationsData = {
                        notificationType: 'PostDislike',
                        contentId: this.props.postId,
                        userId: this.props.userId,
                        userName: this.props.userName,
                        notificationId: uniqid()
                    }
            
                    axios.post('https://socialmedia-2fd3c.firebaseio.com/notifications.json',notificationsData);
                } else {
                    if (this.state.currentLike.likeType === 1) {
                        axios.get('https://socialmedia-2fd3c.firebaseio.com/posts/' + this.props.dbKey + '/likes.json')
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
                            

                            const notificationsData = {
                                notificationType: 'PostDislike',
                                contentId: this.props.postId,
                                userId: this.props.userId,
                                userName: this.props.userName,
                                notificationId: uniqid()
                            }
                    
                            axios.post('https://socialmedia-2fd3c.firebaseio.com/notifications.json',notificationsData);
                        })
                    } else if (this.state.currentLike.likeType === 2) {
                        axios.get('https://socialmedia-2fd3c.firebaseio.com/posts/' + this.props.dbKey + '/likes.json')
                        .then(res => {
                            let data = res.data + 1;
                            this.props.likeUpdate(this.props.dbKey, data);
                            this.props.likeDatabaseDelete(this.state.currentLike.dataBaseId);
                            if(this.props.userTheme === 1) {
                                this.setState({disLikeClass: classes.unlikeButtonDark, likeClass: classes.likeButtonDark, likesUpdater: this.state.likesUpdater + 2});
                            } else {
                                this.setState({disLikeClass: classes.unlikeButton, likeClass: classes.likeButton, likesUpdater: this.state.likesUpdater + 2});
                            }
                        })
                    }
                }
            }); 
    }

    componentDidUpdate(prevProps) {
        if(this.props.userTheme !== prevProps.userTheme) {
            if(this.props.userTheme === 1) {
                this.setState({likeClass: classes.likeButtonDark, disLikeClass: classes.unlikeButtonDark})
            } else {
                this.setState({likeClass: classes.likeButton, disLikeClass: classes.unlikeButton})
            }
    
            this.setState({likesUpdater: this.props.likes});
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
                            return like.userId === this.props.userId && like.contentId === this.props.postId;
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

    render() {
        let likesContent = (<h3 className={this.props.userTheme === 1 ? classes.likesDark : classes.likes}>{this.state.likesUpdater}</h3>);
        if(this.state.likesUpdater > 0) {
            likesContent = (<h3 className={this.props.userTheme === 1 ? classes.likesUpDark : classes.likesUp}>{this.state.likesUpdater}</h3>);
        } else if(this.state.likesUpdater < 0) {
            likesContent = (<h3 className={this.props.userTheme === 1 ? classes.likesDownDark : classes.likesDown}>{this.state.likesUpdater}</h3>);
        }
        
        return (
            <div className={this.props.userTheme ? classes.postDark : classes.post}>
                <div className={this.props.userTheme ? classes.userAreaDark : classes.userArea}>
                    <Link to={this.props.userId === this.props.postUserId ? '/me/posts' : "/users/" + this.props.postUserId} ><img className={this.props.userTheme === 1 ? classes.profileImgDark : classes.profileImg} src={profilePic} alt={this.props.postUserName}/></Link>
                    <h3 className={this.props.userTheme ? classes.userDark : classes.user}><Link to={this.props.userId === this.props.postUserId ? '/me/posts' : "/users/" + this.props.postUserId} >{this.props.postUserName}</Link></h3>
                </div>
                <h3 className={this.props.userTheme ? classes.contentDark : classes.content}  onClick={this.props.clicked}>{this.props.content}</h3>
                {this.props.picUrl ? <a className={classes.imgExternalLink} href={this.props.picUrl}  target="_blank" rel='noopener noreferrer'><img className={classes.contentImg} src={this.props.picUrl} /></a> : null }
                {this.props.vidUrl ? <div className={classes.player}><ReactPlayer url={this.props.vidUrl} controls={true} width='100%'/></div> : null}
                <div className={classes.likeArea}>
                    <div className={classes.likeSection}>
                        <button className={this.state.likeClass} onClick={this.Like} disabled={this.props.buttonDisabled}>Like</button>
                        <button className={this.state.disLikeClass} onClick={this.disLike} disabled={this.props.buttonDisabled}>Dislike</button>
                        {likesContent}
                    </div>
                    <div>
                        <button className={this.props.userTheme === 1 ? classes.commentsDark : classes.comments} onClick={this.props.clicked} >Comments</button>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        likeLoading: state.posts.likeLoading,
        buttonDisabled: state.likes.buttonDisabled,
        userName: state.auth.userName,
        userTheme: state.auth.userTheme
    }
}

const mapDispatchToProps = dispatch => {
    return {
        likeUpdate: (dbpost, likes) => dispatch(actions.updatePostsLikes(dbpost, likes)),
        likeDatabasePost: (data) => dispatch(actions.userLikePost(data)),
        likeDatabaseUpdate: (id, data) => dispatch(actions.userLikePut(id, data)),
        likeDatabaseDelete: (id) => dispatch(actions.userLikeDelete(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);