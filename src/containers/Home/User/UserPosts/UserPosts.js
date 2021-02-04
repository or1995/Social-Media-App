import React,{Component} from 'react';
import classes from './UserPosts.module.css';
import UnfollowedPosts from '../../../UnfollowedPosts/UnfollowedPosts';

import {connect} from 'react-redux';
import {BsCollectionFill} from 'react-icons/bs';

class User extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        let filteredPosts = this.props.posts.filter(post => {
            return post.userId === this.props.userId
        });

        return (
            <div className={classes.UserPosts}>
                <div className={classes.header}>
                    <BsCollectionFill />
                    <h3>Your Posts</h3>
                </div>
                <UnfollowedPosts posts={filteredPosts} history={this.props.history}/>
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

export default connect(mapStateToProps)(User);