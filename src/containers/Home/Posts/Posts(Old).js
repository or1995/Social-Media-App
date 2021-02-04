import React, { Component } from 'react';

import Post from './Post/Post';
import classes from './posts.module.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';


class Posts extends Component{
    state = {
        posts: null
    }

    componentDidMount () {
        axios.get('https://socialmedia-2fd3c.firebaseio.com/follows.json')
        .then(res => {
            const fetchedFollows = [];
            for(let key in res.data) {
                fetchedFollows.push({
                    dataBaseId: key,
                    ...res.data[key]
                });
            }

            const userFollows = fetchedFollows.filter(follow => {
                return follow.userId === this.props.userId;
            })

            console.log(userFollows);

            const filteredPosts = this.props.posts.filter(post => {
                let flag =  false;
                for(let i = 0; i < userFollows.length ; i++){
                    flag = flag || post.userId === userFollows[i].followedUserId || post.userId === this.props.userId;
                }
                return flag
            })

            console.log(filteredPosts);

            this.setState({posts: filteredPosts});

        })
    }

    postSelectedHandler = (id) => {
        console.log(this.props.history);
        this.props.history.push('../../../posts/' + id);
    };



    render () {
        let renderedPosts = <Spinner />
        if(this.state.posts !== null) {
            renderedPosts = this.state.posts.map(post => {
                return <Post key={post.postId} postId={post.postId} content={post.content} postUserId={post.userId} postUserName={post.userName} likes={post.likes} dbKey={post.dataBaseId} getPosts={this.props.onGet} clicked={() => this.postSelectedHandler(post.postId)}/>
            });
            renderedPosts.reverse();
        }
    
        return (<div className={classes.posts}>
                    {renderedPosts}
                </div>);
    }
};

const mapStateToProps = state => {
    return {
        loading: state.posts.postLoading,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGet: () => dispatch(actions.getPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);