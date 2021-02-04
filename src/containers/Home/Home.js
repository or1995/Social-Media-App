import React, { Component } from 'react';
import classes from './Home.module.css';
import CreatePost from './CreatePost/CreatePost';
import Posts from './Posts/Posts';
import { Route, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import FullPost from './FullPost/FullPost';
import UserSidePanel from './User/UserSidePanel/UserSidePanel';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import UserPosts from './User/UserPosts/UserPosts';
import UserComments from './User/UserComments/UserComments';
import UserLikes from './User/UserLikes/UserLikes';
import UserFollows from './User/UserFollows/UserFollows';
import Notifications from './Notifications/Notifications';


class Home extends Component {
    state = {
        disabledCreate: true
    }

    UNSAFE_componentWillMount() {
        window.scrollTo(0, 0);
    };

    componentDidMount() {
        this.props.onGet();
        this.props.onGetComments();
        setTimeout(() => {
            if(this.props.userId !== null) {
                axios.get('https://socialmedia-2fd3c.firebaseio.com/users.json')
                .then(res => {
                    let username;
                    for(let key in res.data) {
                       if(res.data[key].userId === this.props.userId ) {
                            username = res.data[key].userName;
                            this.props.getUser(username);
                            this.props.getUserTheme(res.data[key].theme);
                       };
                    };
                });
            this.setState({disabledCreate:false});
            } 
        }, 2000);
    }

    


    render () {
        if(this.props.userTheme === 1) {
            document.body.style.backgroundColor = "#322d57";    
        } else {
            document.body.style.backgroundColor = "#f1f0f7"; 
        }

        let redirection = (<Redirect to="/auth"/>);
        let userWrong;

        let content;
        if(this.props.isAuthenticated) {
            redirection = null;
        }

        if(this.props.loading) {
            this.props.onGet();
            content = <Posts posts={this.props.posts} history={this.props.history}/>;
        } else {
            content = <Posts posts={this.props.posts} history={this.props.history}/>;
        }

        if(this.props.likeLoading) {
            this.props.onGet();
            content = <Posts posts={this.props.posts} history={this.props.history}/>;
        } else {
            content = <Posts posts={this.props.posts} history={this.props.history}/>;
        }

        let routeOrPosts = (<div className={classes.middle}>
            <CreatePost userName={this.props.userName} disableCreate={this.state.disabledCreate}/>
            {content}
        </div>);

        if(this.props.match.url !== '/') {
            routeOrPosts = (<div className={classes.middle}>
                <Switch>
                    <Route path='/me/posts' exact component={UserPosts} />
                    <Route path='/me/comments' exact component={UserComments} />
                    <Route path='/me/likes' exact component={UserLikes} />
                    <Route path='/me/follows' exact component={UserFollows} />
                    <Route path='/posts/:id' exact component={FullPost} />
                </Switch>
            </div>);
        }
       
        
        
        return (
                <div className={classes.home} id="home">
                    {userWrong}
                    {redirection}
                    <div className={this.props.userTheme === 1 ? classes.dummyoneDark : classes.dummyone}>
                        <UserSidePanel/>
                        <div className={this.props.userTheme === 1 ? classes.footerDark : classes.footer}>
                            <h3>This website is created by <a href="https://or1995.github.io" target="_blank" rel="noopener noreferrer">OMAR ALI</a> &copy;2020.</h3>
                        </div>
                    </div>
                    <div className={classes.middle}>
                        {routeOrPosts}
                    </div>
                    <div className={this.props.userTheme === 1 ? classes.dummytwoDark : classes.dummytwo}>
                        <Notifications history={this.props.history}/>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        posts: state.posts.posts,
        loading: state.posts.postLoading,
        userId: state.auth.userId,
        userName: state.auth.userName,
        likeLoading: state.posts.likeLoading,
        userTheme: state.auth.userTheme
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onGet: () => dispatch(actions.getPosts()),
        onGetComments: () => dispatch(actions.getAllComments()),
        getUser: (user) => dispatch(actions.getUserName(user)),
        getUserTheme: (theme) => dispatch(actions.getUserTheme(theme))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);