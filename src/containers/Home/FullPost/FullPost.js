import React,{Component} from 'react';

import classes from './FullPost.module.css';
import {connect} from 'react-redux';

import CreateComment from './Comments/CreateComment/CreateComment';
import Comments from './Comments/Comments';
import uniqid from 'uniqid';
import ReactPlayer from 'react-player';

import axios from 'axios';
import {Link} from 'react-router-dom';
import * as actions from '../../../store/actions/index';   

import profilePic from '../../../assets/imgs/profilePicture.png';


class FullPost extends Component {
    state = {
        userName: null,
        content: '',
        likes: null,
        currentLike: null,
        dbKey: null,
        postId: null,
        vidUrl: null,
        picUrl: null,
        likeClass: classes.likeButton,
        disLikeClass: classes.unlikeButton,
        postUserId: null,
        likesUpdater: null
    }


    componentDidMount() {
        window.scrollTo(0, 0);
        this.setState({likesUpdater: this.props.likes});
        if(this.props.userTheme === 1) {
            this.setState({likeClass: classes.likeButtonDark, disLikeClass: classes.unlikeButtonDark})
        } else {
            this.setState({likeClass: classes.likeButton, disLikeClass: classes.unlikeButton})
        }
        const postsWithId = this.props.posts.filter(post => post.postId === this.props.match.params.id);
        this.setState({userName: postsWithId[0].userName, content: postsWithId[0].content, likes: postsWithId[0].likes, dbKey: postsWithId[0].dataBaseId, postId: postsWithId[0].postId, postUserId: postsWithId[0].userId, likesUpdater: postsWithId[0].likes, vidUrl: postsWithId[0].videoUrl , picUrl: postsWithId[0].pictureUrl });

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
                        return like.userId === this.props.userId && like.contentId === this.state.postId;
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
        if (this.props.match.params.id !== prevProps.match.params.id) {
            const postsWithId = this.props.posts.filter(post => post.postId === this.props.match.params.id);
        this.setState({userName: postsWithId[0].userName, content: postsWithId[0].content, likes: postsWithId[0].likes, dbKey: postsWithId[0].dataBaseId, postId: postsWithId[0].postId, postUserId: postsWithId[0].userId, vidUrl: postsWithId[0].videoUrl , picUrl: postsWithId[0].pictureUrl});

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
                        return like.userId === this.props.userId && like.contentId === this.state.postId;
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


        if(this.props.userTheme !== prevProps.userTheme) {
            if(this.props.userTheme === 1) {
                this.setState({likeClass: classes.likeButtonDark, disLikeClass: classes.unlikeButtonDark})
            } else {
                this.setState({likeClass: classes.likeButton, disLikeClass: classes.unlikeButton})
            }
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
                        return like.userId === this.props.userId && like.contentId === this.state.postId;
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
                        return like.userId === this.props.userId && like.contentId === this.state.postId;
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
                        contentId: this.state.postId,
                        contentType: 'post',
                        likeType: 1,
                        userId: this.props.userId
                    };
        
                    this.props.likeDatabasePost(data);
                    this.props.likeUpdate(this.state.dbKey, this.state.likes + 1);
                    if(this.props.userTheme === 1) {
                        this.setState({likeClass: classes.likeButtonClicked, disLikeClass: classes.unlikeButtonDark , likesUpdater: this.state.likesUpdater + 1});
                    } else {
                        this.setState({likeClass: classes.likeButtonClicked, disLikeClass: classes.unlikeButton , likesUpdater: this.state.likesUpdater + 1});
                    }

                    const notificationsData = {
                        notificationType: 'PostLike',
                        contentId: this.state.postId,
                        userId: this.props.userId,
                        userName: this.props.userName,
                        notificationId: uniqid()
                    }
            
                    axios.post('https://socialmedia-2fd3c.firebaseio.com/notifications.json',notificationsData);

                } else {
                    if (this.state.currentLike.likeType === 1) {
                        axios.get('https://socialmedia-2fd3c.firebaseio.com/posts/' + this.state.dbKey + '/likes.json')
                        .then(res => {
                            let data = res.data - 1;
                            this.props.likeUpdate(this.state.dbKey, data);
                            this.props.likeDatabaseDelete(this.state.currentLike.dataBaseId);
                            if(this.props.userTheme === 1) {
                                this.setState({likeClass: classes.likeButtonDark, disLikeClass: classes.unlikeButtonDark, likesUpdater: this.state.likesUpdater - 1});
                            } else {
                                this.setState({likeClass: classes.likeButton, disLikeClass: classes.unlikeButton, likesUpdater: this.state.likesUpdater - 1});
                            }
                            
                        })
                    } else if (this.state.currentLike.likeType === 2) {
                        axios.get('https://socialmedia-2fd3c.firebaseio.com/posts/' + this.state.dbKey + '/likes.json')
                        .then(res => {
                            let data = res.data + 2;
                            this.props.likeUpdate(this.state.dbKey, data);
                            const likeflag = 1;
                            this.props.likeDatabaseUpdate(this.state.currentLike.dataBaseId, likeflag);
                            if(this.props.userTheme === 1) {
                                this.setState({likeClass: classes.likeButtonClicked, disLikeClass: classes.unlikeButtonDark, likesUpdater: this.state.likesUpdater + 2});
                            } else {
                                this.setState({likeClass: classes.likeButtonClicked, disLikeClass: classes.unlikeButton, likesUpdater: this.state.likesUpdater + 2});
                            }

                            const notificationsData = {
                                notificationType: 'PostLike',
                                contentId: this.state.postId,
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
                        return like.userId === this.props.userId && like.contentId === this.state.postId;
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
                        contentId: this.state.postId,
                        contentType: 'post',
                        likeType: 2,
                        userId: this.props.userId
                    };
        
                    this.props.likeDatabasePost(data);
                    this.props.likeUpdate(this.state.dbKey, this.state.likes - 1);
                    if(this.props.userTheme === 1) {
                        this.setState({disLikeClass: classes.unlikeButtonClicked, likeClass: classes.likeButtonDark, likesUpdater: this.state.likesUpdater - 1});
                    } else {
                        this.setState({disLikeClass: classes.unlikeButtonClicked, likeClass: classes.likeButton, likesUpdater: this.state.likesUpdater - 1});
                    }
                    

                    const notificationsData = {
                        notificationType: 'PostDislike',
                        contentId: this.state.postId,
                        userId: this.props.userId,
                        userName: this.props.userName,
                        notificationId: uniqid()
                    }
            
                    axios.post('https://socialmedia-2fd3c.firebaseio.com/notifications.json',notificationsData);
                } else {
                    if (this.state.currentLike.likeType === 1) {
                        axios.get('https://socialmedia-2fd3c.firebaseio.com/posts/' + this.state.dbKey + '/likes.json')
                        .then(res => {
                            let data = res.data - 2;
                            this.props.likeUpdate(this.state.dbKey, data);
                            const likeflag = 2;
                            this.props.likeDatabaseUpdate(this.state.currentLike.dataBaseId, likeflag);
                            if(this.props.userTheme === 1) {
                                this.setState({disLikeClass: classes.unlikeButtonClicked, likeClass: classes.likeButtonDark, likesUpdater: this.state.likesUpdater - 2});
                            } else {
                                this.setState({disLikeClass: classes.unlikeButtonClicked, likeClass: classes.likeButton, likesUpdater: this.state.likesUpdater - 2});
                            }

                            const notificationsData = {
                                notificationType: 'PostDislike',
                                contentId: this.state.postId,
                                userId: this.props.userId,
                                userName: this.props.userName,
                                notificationId: uniqid()
                            }
                    
                            axios.post('https://socialmedia-2fd3c.firebaseio.com/notifications.json',notificationsData);

                        })
                    } else if (this.state.currentLike.likeType === 2) {
                        axios.get('https://socialmedia-2fd3c.firebaseio.com/posts/' + this.state.dbKey + '/likes.json')
                        .then(res => {
                            let data = res.data + 1;
                            this.props.likeUpdate(this.state.dbKey, data);
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

        if(this.props.userTheme === 1) {

        } 

        let likesContent = (<h3 className={this.props.userTheme === 1 ? classes.likesDark : classes.likes}>{this.state.likesUpdater}</h3>);
        if(this.state.likesUpdater > 0) {
            likesContent = (<h3 className={this.props.userTheme === 1 ? classes.likesUpDark : classes.likesUp}>{this.state.likesUpdater}</h3>);
        } else if(this.state.likesUpdater < 0) {
            likesContent = (<h3 className={this.props.userTheme === 1 ? classes.likesDownDark : classes.likesDown}>{this.state.likesUpdater}</h3>);
        }

        return (
            <div className={this.props.userTheme === 1 ? classes.FullPostDark : classes.FullPost}>
                <div className={this.props.userTheme === 1 ? classes.PostDark : classes.Post}>
                    <div className={this.props.userTheme === 1 ? classes.PostContentDark : classes.PostContent}>
                        <div className={this.props.userTheme === 1 ? classes.userAreaDark : classes.userArea}>
                            <Link to={this.props.userId === this.state.postUserId ? '/me/posts' : "/users/" + this.state.postUserId} ><img className={this.props.userTheme === 1 ? classes.profileImgDark : classes.profileImg} src={profilePic} alt={this.state.userName}/></Link>
                            <h3 className={this.props.userTheme === 1 ? classes.userNameDark : classes.userName}><Link to={this.props.userId === this.state.postUserId ? '/me/posts' : "/users/" + this.state.postUserId} >{this.state.userName}</Link></h3>
                        </div>
                        <h3 className={this.props.userTheme === 1 ? classes.contentDark : classes.content}>{this.state.content}</h3>
                        {this.state.picUrl ? <a className={classes.imgExternalLink} href={this.state.picUrl}  target="_blank" rel='noopener noreferrer'><img className={classes.contentImg} src={this.state.picUrl} /></a> : null }
                        {this.state.vidUrl ? <div className={classes.player}><ReactPlayer url={this.state.vidUrl} controls={true} width='100%'/></div> : null}
                    </div>
                    <div className={this.props.userTheme === 1 ? classes.likeAreaDark : classes.likeArea}>
                        <div className={this.props.userTheme === 1 ? classes.likeButtonsDark : classes.likeButtons}>
                        <button className={this.state.likeClass} onClick={this.Like} disabled={this.props.buttonDisabled}>Like</button>
                        <button className={this.state.disLikeClass} onClick={this.disLike} disabled={this.props.buttonDisabled}>Dislike</button>
                        {likesContent}
                        </div>
                    </div>
                </div>
                <div className={this.props.userTheme === 1 ? classes.CommentAreaDark : classes.CommentArea}>
                    <CreateComment id={this.props.match.params.id}/>
                    <Comments id={this.props.match.params.id}/>
                </div>
            </div>
        );
    } 
};

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
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
        likeDatabaseDelete: (id) => dispatch(actions.userLikeDelete(id)),
        getPosts: () => dispatch(actions.getPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullPost);