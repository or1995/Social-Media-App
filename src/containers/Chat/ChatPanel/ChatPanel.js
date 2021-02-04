import React,{Component} from 'react';
import classes from './ChatPanel.module.css';
import SendMessage from './SendMessage/SendMessage';
import axios from 'axios';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';
import profilePic from '../../../assets/imgs/profilePicture.png';
import { animateScroll } from "react-scroll";

class ChatPanel extends Component {
    constructor(props) {
        super(props);
    
        this._isMounted = false;
    // code reset
    }

    state = {
        chatUser: false,
        messages: null,
        secondUser: null,
        loading: false
    }

    UNSAFE_componentWillMount() {
        this.setState({messages: null});
    }

    componentDidMount() {
        this._isMounted = true;
        /*const queryParams = '?auth=' + this.props.token + '&orderBy="chatId"&equalTo="' + this.props.match.params.id + '"';  (bad request 400) will try this again later */
        if(this._isMounted) {
            this.setState({loading: true});
        axios.get('https://socialmedia-2fd3c.firebaseio.com/chatMessages.json'/* + queryParams*/)
        .then(res => {
            const fetchedChatMessages = [];
                for(let key in res.data) {
                    fetchedChatMessages.push({
                        dataBaseId: key,
                        ...res.data[key]
                    });
            }

            const filteredChatMessages = fetchedChatMessages.filter( message => {
                return message.chatId === this.props.match.params.id;
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
                    return chat.chatId === this.props.match.params.id;
                })

                let userType;

                if (filteredChats[0].FirstUserId === this.props.userId) {
                    userType = 1
                } else if (filteredChats[0].secondUserId === this.props.userId) {
                    userType = 2
                }

                if(userType === 1) {
                    this.setState({secondUser: filteredChats[0].secondUserName})
                } else if (userType === 2) {
                    this.setState({secondUser: filteredChats[0].FirstUserName})
                }

                const renderedChatMessages = filteredChatMessages.map(message => {
                    if(message.userType === userType) {
                        return (
                            <div key={message.messageId} className={this.props.userTheme === 1 ? classes.myMessagesDark : classes.myMessages}>
                                <div className={this.props.userTheme === 1 ? classes.messageOneDark : classes.messageOne}>
                                    <h3>{message.content}</h3>
                                    <img src={profilePic} alt='1'/>
                                </div>
                            </div> 
                        )
                    } else {
                        return (
                            <div key={message.messageId} className={this.props.userTheme === 1 ? classes.otherMessagesDark : classes.otherMessages}>
                                <div className={this.props.userTheme === 1 ? classes.messageTwoDark : classes.messageTwo}>
                                    <img src={profilePic} alt='2'/>
                                    <h3>{message.content}</h3>
                                </div>
                            </div> 
                        )
                    }
                })

                this.setState({messages: renderedChatMessages, loading: false});
                this.scrollToBottom();
            })
        })

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }

        const chatRefresh =  async () => {
            while(this._isMounted) {
                await sleep(1000);

                axios.get('https://socialmedia-2fd3c.firebaseio.com/chatMessages.json')
                .then(res => {
                    const fetchedChatMessages = [];
                        for(let key in res.data) {
                            fetchedChatMessages.push({
                                dataBaseId: key,
                                ...res.data[key]
                            });
                    }

                    const filteredChatMessages = fetchedChatMessages.filter( message => {
                        return message.chatId === this.props.match.params.id;
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
                            return chat.chatId === this.props.match.params.id;
                        })

                        let userType;

                        if (filteredChats[0].FirstUserId === this.props.userId) {
                            userType = 1
                        } else if (filteredChats[0].secondUserId === this.props.userId) {
                            userType = 2
                        }

                        if(userType === 1) {
                            this.setState({secondUser: filteredChats[0].secondUserName})
                        } else if (userType === 2) {
                            this.setState({secondUser: filteredChats[0].FirstUserName})
                        }

                        const renderedChatMessages = filteredChatMessages.map(message => {
                            if(message.userType === userType) {
                                return (
                                    <div key={message.messageId} className={this.props.userTheme === 1 ? classes.myMessagesDark : classes.myMessages}>
                                        <div className={this.props.userTheme === 1 ? classes.messageOneDark : classes.messageOne}>
                                            <h3>{message.content}</h3>
                                            <img src={profilePic} alt='1'/>
                                        </div>
                                    </div> 
                                )
                            } else {
                                return (
                                    <div key={message.messageId} className={this.props.userTheme === 1 ? classes.otherMessagesDark : classes.otherMessages}>
                                        <div className={this.props.userTheme === 1 ? classes.messageTwoDark : classes.messageTwo}>
                                            <img src={profilePic} alt='2'/>
                                            <h3>{message.content}</h3>
                                        </div>
                                    </div> 
                                )
                            }
                        })

                        this.setState({messages: renderedChatMessages});
                    })
                })

            }
            if(this._isMounted) {
                chatRefresh();
            } 
        }

        chatRefresh();
        }
        
    }

    scrollToBottom() {
        animateScroll.scrollToBottom({
            duration: 0,
            delay: 0,
            containerId: "ContainerElementID"
        });
    }


    postedMessage = () => {
        if(this._isMounted) {
            axios.get('https://socialmedia-2fd3c.firebaseio.com/chatMessages.json')
        .then(res => {
            const fetchedChatMessages = [];
                for(let key in res.data) {
                    fetchedChatMessages.push({
                        dataBaseId: key,
                        ...res.data[key]
                    });
            }

            const filteredChatMessages = fetchedChatMessages.filter( message => {
                return message.chatId === this.props.match.params.id;
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
                    return chat.chatId === this.props.match.params.id;
                })

                let userType;

                if (filteredChats[0].FirstUserId === this.props.userId) {
                    userType = 1
                } else if (filteredChats[0].secondUserId === this.props.userId) {
                    userType = 2
                }

                if(userType === 1) {
                    this.setState({secondUser: filteredChats[0].secondUserName})
                } else if (userType === 2) {
                    this.setState({secondUser: filteredChats[0].FirstUserName})
                }

                const renderedChatMessages = filteredChatMessages.map(message => {
                    if(message.userType === userType) {
                        return (
                            <div key={message.messageId} className={this.props.userTheme === 1 ? classes.myMessagesDark : classes.myMessages}>
                                <div className={this.props.userTheme === 1 ? classes.messageOneDark : classes.messageOne}>
                                    <h3>{message.content}</h3>
                                    <img src={profilePic} alt='1'/>
                                </div>
                            </div> 
                        )
                    } else {
                        return (
                            <div key={message.messageId} className={this.props.userTheme === 1 ? classes.otherMessagesDark : classes.otherMessages}>
                                <div className={this.props.userTheme === 1 ? classes.messageTwoDark : classes.messageTwo}>
                                    <img src={profilePic} alt='2'/>
                                    <h3>{message.content}</h3>
                                </div>
                            </div> 
                        )
                    }
                })

                this.setState({messages: renderedChatMessages, loading: false});
                this.scrollToBottom();
            })
        })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({messages: null});
            this.scrollToBottom();
            if(this._isMounted){
                this.setState({loading: true});
        axios.get('https://socialmedia-2fd3c.firebaseio.com/chatMessages.json'/* + queryParams*/)
        .then(res => {
            const fetchedChatMessages = [];
                for(let key in res.data) {
                    fetchedChatMessages.push({
                        dataBaseId: key,
                        ...res.data[key]
                    });
            }

            const filteredChatMessages = fetchedChatMessages.filter( message => {
                return message.chatId === this.props.match.params.id;
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
                    return chat.chatId === this.props.match.params.id;
                })

                let userType;

                if (filteredChats[0].FirstUserId === this.props.userId) {
                    userType = 1
                } else if (filteredChats[0].secondUserId === this.props.userId) {
                    userType = 2
                }

                if(userType === 1) {
                    this.setState({secondUser: filteredChats[0].secondUserName})
                } else if (userType === 2) {
                    this.setState({secondUser: filteredChats[0].FirstUserName})
                }

                const renderedChatMessages = filteredChatMessages.map(message => {
                    if(message.userType === userType) {
                        return (
                            <div key={message.messageId} className={this.props.userTheme === 1 ? classes.myMessagesDark : classes.myMessages}>
                                <div className={this.props.userTheme === 1 ? classes.messageOneDark : classes.messageOne}>
                                    <h3>{message.content}</h3>
                                    <img src={profilePic} alt='1'/>
                                </div>
                            </div> 
                        )
                    } else {
                        return (
                            <div key={message.messageId} className={this.props.userTheme === 1 ? classes.otherMessagesDark : classes.otherMessages}>
                                <div className={this.props.userTheme === 1 ? classes.messageTwoDark : classes.messageTwo}>
                                    <img src={profilePic} alt='2'/>
                                    <h3>{message.content}</h3>
                                </div>
                            </div> 
                        )
                    }
                })

                this.setState({messages: renderedChatMessages, loading: false});
                this.scrollToBottom();
            })
        })
            }

        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    backToChatUsers = () => {
        this.props.history.push('../../../chat');
    }


    render() {

        let content = null;
        if(this.state.loading === false) {
            content = this.state.messages;
        } else {
            content = <div className={classes.spinnerDiv}><Spinner/></div>;
        }

        return (
            <div className={this.props.userTheme === 1 ? classes.ChatPanelDark : classes.ChatPanel}>
                <div className={this.props.userTheme === 1 ? classes.headerDark : classes.header}>
                    <h3>{this.state.secondUser}</h3>
                    <h3 className={this.props.userTheme === 1 ? classes.exitDark : classes.exit} onClick={this.backToChatUsers}>&#10006;</h3>
                </div>
                <div className={this.props.userTheme === 1 ? classes.outerMessagesDark : classes.outerMessages}>
                    <div className={this.props.userTheme === 1 ? classes.chatMessagesDark : classes.chatMessages} id="ContainerElementID">
                        {content}
                    </div>
                </div>
                <SendMessage chatId={this.props.match.params.id} posted={this.postedMessage}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userName: state.auth.userName,
        userId: state.auth.userId,
        token: state.auth.token,
        userTheme: state.auth.userTheme
    }
}

export default connect(mapStateToProps)(ChatPanel);