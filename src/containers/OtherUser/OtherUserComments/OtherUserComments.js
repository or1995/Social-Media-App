import React,{Component} from 'react';
import UnfollowedPosts from '../../UnfollowedPosts/UnfollowedPosts';

import {connect} from 'react-redux';
import axios from 'axios';

import classes from './OtherUserComments.module.css';

import Spinner from '../../../components/UI/Spinner/Spinner';
import {BsChatSquareQuoteFill} from 'react-icons/bs';

class OtherUserComments extends Component {
    state = {
        renderedPosts: <Spinner />
    }

    UNSAFE_componentWillMount() {
        axios.get('https://socialmedia-2fd3c.firebaseio.com/comments.json')
        .then(res => {
            const fetchedComments = [];
            for(let key in res.data) {
                fetchedComments.push({
                    dataBaseId: key,
                    ...res.data[key],
                });
            }

            let filteredComments = fetchedComments.filter(comment => {
                return comment.userId === this.props.otherUserId
            });

            let filteredPostsIds = filteredComments.map(comment => {
                return comment.postId;
            });

            let filteredPosts = this.props.posts.filter(post => {
                for(let i=0 ; i <= filteredPostsIds.length ; i++) {
                    if(filteredPostsIds[i] === post.postId) {
                        return true;
                    }
                }
                return false;
            });

        this.setState({renderedPosts: <UnfollowedPosts posts={filteredPosts} history={this.props.history}/>});

        });
    }

    render() {
        return (
            <div className={classes.OtherUserComments}>
                 <div className={classes.header}>
                    <BsChatSquareQuoteFill/>
                    <h3>Posts {this.props.userName} Commented On</h3>
                </div>
                {this.state.renderedPosts}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts
    }
}

export default connect(mapStateToProps)(OtherUserComments);