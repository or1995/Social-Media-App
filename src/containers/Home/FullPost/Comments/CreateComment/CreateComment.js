import React, {Component} from 'react';

import Input from '../../../../../components/UI/Input/Input';
import classes from './CreateComment.module.css';
import uniqid from 'uniqid';
import axios from 'axios';
import {connect} from 'react-redux';
import Spinner from '../../../../../components/UI/Spinner/Spinner';

import * as actions from '../../../../../store/actions/index';

class CreateComment extends Component {
    state = {
        content: '',
    }

    postComment = (e) => {
        if (e.key === 'Enter') {
            console.log(this.props.id);
            const data ={
                postId: this.props.id,
                userId: this.props.userId,
                userName: this.props.userName,
                content: this.state.content,
                likes: 0,
                commentId: uniqid()
            }
            if(this.state.content !== '') {
            this.props.onCommentPost(data);
            this.setState({content: ''});
        }

        const notificationsData = {
            notificationType: 'comment',
            contentId: this.props.id,
            userId: this.props.userId,
            userName: this.props.userName,
            notificationId: uniqid()
        }

        axios.post('https://socialmedia-2fd3c.firebaseio.com/notifications.json',notificationsData);
    }
        
    }


    render() {
        let content;
        if(this.props.postLoading) {
            content = (
                <div className={this.props.userTheme === 1 ? classes.CreateCommentDark : classes.CreateComment}>
                    <Spinner />
                </div>
            )
        } else {
            content = (<div className={this.props.userTheme === 1 ? classes.CreateCommentDark : classes.CreateComment}>
                <Input elementType='textarea' value={this.state.content} elementConfig={{type: 'input', placeholder: 'Write a Comment.'}} changed={(event) => this.setState({content: event.target.value})} keyDown={this.postComment}/>
                        </div>);
        }

        return content;
    };
};

const mapStateToProps = state => {
    return {
        userName: state.auth.userName,
        userId: state.auth.userId,
        postLoading: state.comments.postCommentLoading,
        userTheme: state.auth.userTheme
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCommentPost: (data) => dispatch(actions.postComments(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
