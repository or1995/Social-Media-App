import React, { Component } from 'react';

import Post from '../Home/Posts/Post/Post';
import classes from './UnfollowedPosts.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';


class UnfollowedPosts extends Component{

    postSelectedHandler = (id) => {
        this.props.history.push('../../../posts/' + id);
    };



    render () {
        let renderedPosts = this.props.posts.map(post => {
            return <Post key={post.postId} postId={post.postId} content={post.content} postUserId={post.userId} postUserName={post.userName} likes={post.likes} vidUrl={post.videoUrl} picUrl={post.pictureUrl} dbKey={post.dataBaseId} getPosts={this.props.onGet} clicked={() => this.postSelectedHandler(post.postId)}/>
        });

        renderedPosts.reverse();

        return (<div className={classes.posts}>
                    {renderedPosts}
                </div>);
    }
};

const mapStateToProps = state => {
    return {
        loading: state.posts.postLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGet: () => dispatch(actions.getPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UnfollowedPosts);