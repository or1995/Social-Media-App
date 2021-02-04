import React,{Component} from 'react';

import classes from './Comments.module.css';

import Comment from './Comment/Comment';

import axios from 'axios';

import {connect} from 'react-redux';

import * as actions from '../../../../store/actions/index';

class Comments extends Component {

    componentDidMount() {
        this.props.onGet(this.props.id);
    }

    componentDidUpdate(prevProps) {
        if(this.props.id !== prevProps.id) {
            this.props.onGet(this.props.id);
        }
    }


    render() {
        if(this.props.postLoading) {
            this.props.onGet(this.props.id);
        }

        if(this.props.likeLoading) {
            this.props.onGet(this.props.id);
        }
        
        let comments = this.props.comments.map(comment => (
            <Comment key={comment.commentId} userName={comment.userName} content={comment.content} likes={comment.likes} dbKey={comment.dataBaseId} commentId={comment.commentId} commentUserId={comment.userId}/>
        ));

        return (
            <div className={classes.Comments}>
                {comments}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        comments: state.comments.comments,
        postLoading: state.comments.postCommentLoading,
        likeLoading: state.likes.likeLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGet: (id) => dispatch(actions.getComments(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);