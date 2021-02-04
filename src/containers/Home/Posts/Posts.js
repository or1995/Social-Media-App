import React, { Component } from 'react';

import Post from './Post/Post';
import classes from './posts.module.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';

import InfiniteScroll from 'react-infinite-scroll-component';


class Posts extends Component{
    state = {
        posts: [],
        renderedPosts: [],
        hasMore: true,
        reMount: false
    }

    componentDidMount () {
        this.setState({renderedPosts: []});
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


            const filteredPosts = this.props.posts.filter(post => {
                let flag =  false;
                for(let i = 0; i < userFollows.length ; i++){
                    flag = flag || post.userId === userFollows[i].followedUserId;
                }

                flag = flag || post.userId === this.props.userId;
                return flag
            })

            filteredPosts.reverse();

            this.setState({posts: filteredPosts,renderedPosts: filteredPosts.slice(0, 4) });
            if(this.state.hasMore === false) {
                this.setState({reMount: true});
            }

        })
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.posts.length !== prevProps.posts.length) {
            this.setState({renderedPosts: [], hasMore: true});
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
    
    
                const filteredPosts = this.props.posts.filter(post => {
                    let flag =  false;
                    for(let i = 0; i < userFollows.length ; i++){
                        flag = flag || post.userId === userFollows[i].followedUserId;
                    }
                    flag = flag || post.userId === this.props.userId;
                    return flag
                })
    
    
                filteredPosts.reverse();
    
                this.setState({posts: filteredPosts,renderedPosts: filteredPosts.slice(0, 4) });
                if(this.state.hasMore === false) {
                    this.setState({reMount: true});
                }
            })
        }
      };

    addDataToRender = () => {
        // this just for infinite scrolling testing not real use because i fetched all the posts from the firebase database already
        let newState;
        if(this.state.posts.length === 0) {
            this.setState({renderedPosts: this.state.posts, hasMore: true});
        } else if(this.state.renderedPosts.length + 4 <= this.state.posts.length) {
            newState = this.state.posts.slice(0, this.state.renderedPosts.length + 4);
            this.setState({renderedPosts: newState, hasMore: true});


        } else if (this.state.renderedPosts.length + 4 > this.state.posts.length && this.state.renderedPosts.length !== this.state.posts.length){
            this.setState({renderedPosts: this.state.posts , hasMore: false});
        } else {
            this.setState({renderedPosts: this.state.posts, hasMore: false});
        }
         
    }

    postSelectedHandler = (id) => {
        this.props.history.push('../../../posts/' + id);
    };



    render () {

        if(this.state.reMount) {

        }
        let renderedPosts = [];
        if(this.state.renderedPosts.length > 0) {
            renderedPosts = this.state.renderedPosts.map(post => {
                return <Post key={post.postId} postId={post.postId} content={post.content} postUserId={post.userId} postUserName={post.userName} likes={post.likes} dbKey={post.dataBaseId} vidUrl={post.videoUrl} picUrl={post.pictureUrl} getPosts={this.props.onGet} clicked={() => this.postSelectedHandler(post.postId)}/>
            });
        }

    
        return (<div className={classes.posts}>
                    <InfiniteScroll
                        dataLength={this.state.renderedPosts.length}
                        next={this.addDataToRender}
                        hasMore={this.state.hasMore}
                        loader={renderedPosts.length === 0 ? null : <Spinner/>}
                        endMessage={
                            <h3 className={this.props.userTheme === 1 ? classes.endOfPostsDark : classes.endOfPosts}>No more posts!</h3>
                        }
                        prefill={true}
                        >
                        {renderedPosts.length === 0 ? <h3 className={this.props.userTheme === 1 ? classes.NoPostsMessagesDark : classes.NoPostsMessages}>Search for Users and Follow Them to See Posts</h3> : renderedPosts}
                    </InfiniteScroll>  
                </div>);
        
    };
}

const mapStateToProps = state => {
    return {
        loading: state.posts.postLoading,
        userId: state.auth.userId,
        userTheme: state.auth.userTheme
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGet: () => dispatch(actions.getPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);