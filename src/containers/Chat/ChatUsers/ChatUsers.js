import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import classes from './ChatUsers.module.css';
import profilePic from '../../../assets/imgs/profilePicture.png';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ChatPanel from '../ChatPanel/ChatPanel';
import { Route } from 'react-router-dom';
import { BsPeopleFill } from 'react-icons/bs';

class ChatUsers extends Component {
    constructor(props) {
        super(props);
    
        this._isMounted = false;
    // code reset
    }
    state = {
        theChat : [],
        loading: false
    }

    componentDidMount() {
        this._isMounted = true;
        if(this._isMounted) {
            this.setState({loading: true});
        axios.get('https://socialmedia-2fd3c.firebaseio.com/follows.json')
        .then(res => {
            const fetchedFollows = [];
            for(let key in res.data) {
                fetchedFollows.push({
                    dataBaseId: key,
                    ...res.data[key]
                });
            }

            const FollowsNumFilter = fetchedFollows.filter(follow => {
                return follow.userId === this.props.userId;
            })

            axios.get('https://socialmedia-2fd3c.firebaseio.com/users.json')
            .then( res => {
                const fetchedUsers = [];
                for(let key in res.data) {
                fetchedUsers.push({
                    dataBaseId: key,
                    ...res.data[key]
                });
                }

                const filteredUser = fetchedUsers.filter(user => {
                    let flag =  false;
                    for(let i = 0; i < FollowsNumFilter.length ; i++){
                        flag = flag || user.userId === FollowsNumFilter[i].followedUserId;
                    }
                    return flag
                });

                const twoWayUsers = filteredUser.filter(user => {
                    let flag =  false;
                    for(let i=0; i < fetchedFollows.length; i++) {
                        flag = flag || this.props.userId === fetchedFollows[i].followedUserId && user.userId === fetchedFollows[i].userId;
                    }
                    return flag
                }) 

                axios.get('https://socialmedia-2fd3c.firebaseio.com/chat.json')
                .then(res => {
                    const fetchedChat = [];
                        for(let key in res.data) {
                            fetchedChat.push({
                                dataBaseId: key,
                                ...res.data[key]
                            });
                        }

                    const filteredChats = fetchedChat.filter( chat => {
                        return chat.FirstUserId === this.props.userId || chat.secondUserId === this.props.userId;
                    })

                    const content = twoWayUsers.map( followedUser => {
                        for(let i = 0; i < filteredChats.length; i++) {
                            if(filteredChats[i].FirstUserId === followedUser.userId || filteredChats[i].secondUserId === followedUser.userId) {
                                return (<Link to={'../chat/' + filteredChats[i].chatId} key={followedUser.userId} className={this.props.userTheme === 1 ? classes.userLinkDark : classes.userLink}>
                                    <div className={this.props.userTheme === 1 ? classes.followedUserDark : classes.followedUser}>
                                        <img src={profilePic} alt={followedUser.userName}/>
                                        <h3>{followedUser.userName}</h3>
                                    </div>
                                </Link>)
                            }
                        }
                    })

                    this.setState({chatUsers: content});
                    this.setState({loading: false});
                });
            })
        })
        }
        
    }

    componentDidUpdate(prevProps) {
        if(this.props.userTheme !== prevProps.userTheme) {
            axios.get('https://socialmedia-2fd3c.firebaseio.com/follows.json')
        .then(res => {
            const fetchedFollows = [];
            for(let key in res.data) {
                fetchedFollows.push({
                    dataBaseId: key,
                    ...res.data[key]
                });
            }

            const FollowsNumFilter = fetchedFollows.filter(follow => {
                return follow.userId === this.props.userId;
            })

            axios.get('https://socialmedia-2fd3c.firebaseio.com/users.json')
            .then( res => {
                const fetchedUsers = [];
                for(let key in res.data) {
                fetchedUsers.push({
                    dataBaseId: key,
                    ...res.data[key]
                });
                }

                const filteredUser = fetchedUsers.filter(user => {
                    let flag =  false;
                    for(let i = 0; i < FollowsNumFilter.length ; i++){
                        flag = flag || user.userId === FollowsNumFilter[i].followedUserId;
                    }
                    return flag
                });

                const twoWayUsers = filteredUser.filter(user => {
                    let flag =  false;
                    for(let i=0; i < fetchedFollows.length; i++) {
                        flag = flag || this.props.userId === fetchedFollows[i].followedUserId && user.userId === fetchedFollows[i].userId;
                    }
                    return flag
                }) 

                axios.get('https://socialmedia-2fd3c.firebaseio.com/chat.json')
                .then(res => {
                    const fetchedChat = [];
                        for(let key in res.data) {
                            fetchedChat.push({
                                dataBaseId: key,
                                ...res.data[key]
                            });
                        }

                    const filteredChats = fetchedChat.filter( chat => {
                        return chat.FirstUserId === this.props.userId || chat.secondUserId === this.props.userId;
                    })

                    const content = twoWayUsers.map( followedUser => {
                        for(let i = 0; i < filteredChats.length; i++) {
                            if(filteredChats[i].FirstUserId === followedUser.userId || filteredChats[i].secondUserId === followedUser.userId) {
                                return (<Link to={'../chat/' + filteredChats[i].chatId} key={followedUser.userId} className={this.props.userTheme === 1 ? classes.userLinkDark : classes.userLink}>
                                    <div className={this.props.userTheme === 1 ? classes.followedUserDark : classes.followedUser}>
                                        <img src={profilePic} alt={followedUser.userName}/>
                                        <h3>{followedUser.userName}</h3>
                                    </div>
                                </Link>)
                            }
                        }
                    })

                    this.setState({chatUsers: content});
                    this.setState({loading: false});
                });
            })
        })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <Fragment>
                <div className={this.props.userTheme === 1 ? classes.smallScreenDark : classes.smallScreen}>
                    {this.props.match.params.id ? <Route path='/chat/:id' exact component={ChatPanel}/> : null}
                </div>
                {!this.props.match.params.id && window.innerWidth <= 850 ?
                <div className={this.props.userTheme === 1 ? classes.userChatDark : classes.userChat}>
                    <div className={this.props.userTheme === 1? classes.headerDark : classes.header}>
                        <BsPeopleFill/>
                        <h3>Chat</h3>
                    </div>
                    <div className={this.props.userTheme === 1? classes.chatDark : classes.chat}>
                        {this.state.loading ? <Spinner/> : this.state.chatUsers}
                    </div>
                </div> : null}
                {window.innerWidth > 850 ?
                <div className={this.props.userTheme === 1? classes.userChatDark : classes.userChat}>
                    <div className={this.props.userTheme === 1? classes.headerDark : classes.header}>
                        <BsPeopleFill/>
                        <h3>Chat</h3>
                    </div>
                    <div className={this.props.userTheme === 1? classes.chatDark : classes.chat}>
                        {this.state.loading ? <Spinner/> : this.state.chatUsers}
                    </div>
                </div> : null}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        userTheme: state.auth.userTheme
    }
}

export default connect(mapStateToProps)(ChatUsers);