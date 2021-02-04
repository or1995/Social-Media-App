import React, {Component} from 'react';

import classes from './Post.module.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../../../../store/actions/index';


class Post extends Component {

    componentDidMount(){
        this.props.likeDatabaseGet(this.props.userId, this.props.postId);
    }

    Like = () => {
    
        if(this.props.currentLike === null) {
            console.log('first like');
            const data = {
                contentId: this.props.postId,
                contentType: 'post',
                likeType: 'like',
                userId: this.props.userId
            };

            this.props.likeDatabasePost(data);
            this.props.likeUpdate(this.props.dbKey, this.props.likes + 1);
            this.props.likeDatabaseGet(this.props.userId, this.props.postId);

        } else {
            if (this.props.currentLike.likeType === 'like') {
                console.log('like after like')
                this.props.likeUpdate(this.props.dbKey, this.props.likes - 1);
                this.props.likeDatabaseDelete(this.props.currentLike.dataBaseId);
                this.props.likeDatabaseGet(this.props.userId, this.props.postId);
            } else if (this.props.currentLike.likeType === 'dislike') {
                console.log('like after dislike')
                this.props.likeUpdate(this.props.dbKey, this.props.likes + 2);
                this.props.likeDatabaseUpdate(this.props.currentLike.dataBaseId, 'like');
                this.props.likeDatabaseGet(this.props.userId, this.props.postId);
            }
        }
    }

    disLike = () => {
        
        if(this.props.currentLike === null) {
            console.log('first dislike');
            const data = {
                contentId: this.props.postId,
                contentType: 'post',
                likeType: 'dislike',
                userId: this.props.userId
            };

            this.props.likeDatabasePost(data);
            this.props.likeUpdate(this.props.dbKey, this.props.likes - 1);

        } else {
            if (this.props.currentLike.likeType === 'like') {
                console.log('dislike after like')
                this.props.likeUpdate(this.props.dbKey, this.props.likes - 2);
                this.props.likeDatabaseUpdate(this.props.currentLike.dataBaseId, 'like');
            } else if (this.props.currentLike.likeType === 'dislike') {
                console.log('dislike after dislike');
                this.props.likeUpdate(this.props.dbKey, this.props.likes + 1);
                this.props.likeDatabaseDelete(this.props.currentLike.dataBaseId);
            }
        }
    }


    render() {
        return (
            <div className={classes.post}>
                <h3 className={classes.user}><Link to={"/users/" + this.props.userId} exact>{this.props.userName}</Link></h3>
                <h3 className={classes.content}  onClick={this.props.clicked}>{this.props.content}</h3>
                <div className={classes.likeArea}>
                    <button className={classes.likeButton} onClick={this.Like}>LIKE</button>
                    <button className={classes.unlikeButton} onClick={this.disLike}>DISLIKE</button>
                    <h3 className={classes.likes}>{this.props.likes}</h3>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        currentLike: state.likes.currentLike
    }
}

const mapDispatchToProps = dispatch => {
    return {
        likeUpdate: (dbpost, likes) => dispatch(actions.updatePostsLikes(dbpost, likes)),
        likeDatabasePost: (data) => dispatch(actions.userLikePost(data)),
        likeDatabaseGet: (id, contentId) => dispatch(actions.userLikeGet(id, contentId)),
        likeDatabaseUpdate: (id, data) => dispatch(actions.userLikePut(id, data)),
        likeDatabaseDelete: (id) => dispatch(actions.userLikeDelete(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);