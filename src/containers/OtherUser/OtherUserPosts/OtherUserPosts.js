import React,{Component} from 'react';
import classes from './OtherUserPosts.module.css';
import {connect} from 'react-redux';
import UnfollowedPosts from '../../UnfollowedPosts/UnfollowedPosts';
import {BsCollectionFill} from 'react-icons/bs';

class OtherUserPosts extends Component {

    componentDidMount() {
        window.scrollTo(0, 0);
    }
    
    render() {

        let filteredPosts = this.props.posts.filter(post => {
            return post.userId === this.props.otherUserId
        });

        return (
            <div className={classes.OtherUserPosts}>
                <div className={classes.header}>
                    <BsCollectionFill />
                    <h3>{this.props.userName} Posts</h3>
                </div>
                <UnfollowedPosts posts={filteredPosts} history={this.props.history}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts
    }
}

export default connect(mapStateToProps)(OtherUserPosts);