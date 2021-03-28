import React,{Component} from 'react';
import classes from './Chat.module.css';
import UserSidePanel from '../Home/User/UserSidePanel/UserSidePanel';
import ChatUser from './ChatUsers/ChatUsers';
import ChatPanel from './ChatPanel/ChatPanel';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

class Chat extends Component {
    

    render() {
        if(this.props.userTheme === 1) {
            document.body.style.backgroundColor = "var(--main-dark-color)";    
        } else {
            document.body.style.backgroundColor = "var(--light-dark-color)"; 
        }
        return (
            <div className={this.props.userTheme ? classes.homeDark : classes.home}>
                <div className={this.props.userTheme ? classes.dummyoneDark : classes.dummyone}>
                    <UserSidePanel/>
                    <div className={this.props.userTheme ? classes.footerDark : classes.footer}>
                        <h3>This website is created by <a href="https://or1995.github.io" target="_blank">OMAR ALI</a> &copy;2020.</h3>
                    </div>
                </div>
                <div className={this.props.userTheme ? classes.middleDark : classes.middle}>
                    <Route path='/chat/:id' exact component={ChatPanel} />
                    {this.props.match.url === '/chat' ? <div className={this.props.userTheme ? classes.messageDark : classes.message}><h1>Choose a User to Chat With from Chat Panel!</h1><h3>To chat with other user you both should follow each others</h3></div> : null}
                </div>
                <div className={this.props.userTheme ? classes.dummytwoDark : classes.dummytwo}>
                    <ChatUser match={this.props.match}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userTheme: state.auth.userTheme
    }
}

export default connect(mapStateToProps)(Chat);