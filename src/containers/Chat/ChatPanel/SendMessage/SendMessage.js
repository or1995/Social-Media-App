import React,{Component} from 'react';
import classes from './SendMessage.module.css';
import Input from '../../../../components/UI/Input/Input';
import uniqid from 'uniqid';
import axios from 'axios';
import {connect} from 'react-redux';
import Spinner from '../../../../components/UI/Spinner/Spinner';

class SendMessage extends Component {
    state = {
        content: '',
        messageLoading: false
    }

    postMessage = (e) => {

        if(this.state.content !== '') {
            if (e.key === 'Enter') {
                this.setState({messageLoading: true});
                let finalContent = this.state.content;
                this.setState({content: ''});
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
                        return chat.chatId === this.props.chatId;
                    })
    
                    let userType;
    
                    if (filteredChats[0].FirstUserId === this.props.userId) {
                        userType = 1
                    } else if (filteredChats[0].secondUserId === this.props.userId) {
                        userType = 2
                    }
    
                    const data ={
                        chatId: this.props.chatId,
                        userId: this.props.userId,
                        userName: this.props.userName,
                        content: finalContent,
                        userType: userType,
                        messageId: uniqid()
                    }
    
                    axios.post('https://socialmedia-2fd3c.firebaseio.com/chatMessages.json', data)
                    .then( res =>{
                        this.setState({messageLoading: false});
                        this.props.posted();
                    })
                }) 
            
            }
        }
        
    }

    render() {
        let content;
        if(this.state.messageLoading) {
            content = (
                <div className={this.props.userTheme === 1 ? classes.SendMessageDark : classes.SendMessage}>
                    <div className={classes.spinnerDiv}>
                        <Spinner />
                    </div>
                </div>
            )
        } else {
            content = (<div className={this.props.userTheme === 1 ? classes.SendMessageDark : classes.SendMessage}>
                <Input elementType='textarea' value={this.state.content} elementConfig={{type: 'input', placeholder: 'Write a Message.'}} changed={(event) => this.setState({content: event.target.value})} keyDown={this.postMessage}/>
                        </div>);
        }

        return content;
    };
}

const mapStateToProps = state => {
    return {
        userName: state.auth.userName,
        userId: state.auth.userId,
        userTheme: state.auth.userTheme
    }
}

export default connect(mapStateToProps)(SendMessage);