import React,{Component} from 'react';
import classes from './UserLikes.module.css';
import UnfollowedPosts from '../../../UnfollowedPosts/UnfollowedPosts';

import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import {BsHeartFill} from 'react-icons/bs';

class UserLikes extends Component {
    state = {
        renderedPosts: <Spinner />
   }

   componentDidMount() {
        axios.get('https://socialmedia-2fd3c.firebaseio.com/likes.json')
                .then( res => {
                    const fetchedLikes = [];
                    for(let key in res.data) {
                    fetchedLikes.push({
                        dataBaseId: key,
                        ...res.data[key],
                    });
                    }

                    let userLikes = fetchedLikes.filter(like => {
                        if(like.userId === this.props.userId && like.likeType === 1 && like.contentType === 'post') {
                            return true;
                        } else {
                            return false;
                        }
                    })

                    let userLikesId = userLikes.map(like =>{
                        return like.contentId
                    })

                    let filteredPosts = this.props.posts.filter(post => {
                        for (let i=0 ; i < userLikesId.length ; i++) {
                            if (userLikesId[i] === post.postId) {
                                return true;
                            }
                        }
                        return false;
                    })

                    this.setState({renderedPosts: <UnfollowedPosts posts={filteredPosts} history={this.props.history}/>})
                })
    }

    render() {
        

        return (
            <div className={classes.UserLikes} >
                <div className={classes.header}>
                    <BsHeartFill/>
                    <h3>Posts You Like</h3>
                </div>
                {this.state.renderedPosts}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(UserLikes);