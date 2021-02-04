import React,{Component} from 'react';
import classes from './OtherUserLikes.module.css';
import UnfollowedPosts from '../../UnfollowedPosts/UnfollowedPosts';

import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {BsHeartFill} from 'react-icons/bs';

class OtherUserLikes extends Component {
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
                        if(like.userId === this.props.otherUserId && like.likeType === 1 && like.contentType === 'post') {
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
            <div className={classes.OtherUserLikes}>
                <div className={classes.header}>
                    <BsHeartFill />
                    <h3>Posts {this.props.userName} Likes</h3>
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

export default connect(mapStateToProps)(OtherUserLikes);