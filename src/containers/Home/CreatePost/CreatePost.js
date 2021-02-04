import React, {Component} from 'react';
import classes from './CreatePost.module.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import uniqid from 'uniqid';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../../hoc/auxiliary';
import {connect} from 'react-redux';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

import * as actions from '../../../store/actions/index';
import Modal from '../../../components/UI/Modal/Modal';
import {BsCollectionPlay,BsAspectRatio} from 'react-icons/bs';

class CreatePost extends Component {
    state = {
        content: '',
        clicked: false,
        vidModal: false,
        picModal: false,
        vidUrl: '',
        picUrl: '',
        vidUrlFinal: '',
        picUrlFinal: ''
    }

    postToDataBase = () => {
        let data;
        let postId = uniqid();
        if(this.state.vidUrlFinal !== '') {
            data = {
                content: this.state.content,
                userName: this.props.userName,
                userId: this.props.userId,
                likes: 0,
                postId: postId,
                videoUrl: this.state.vidUrlFinal
            }
        } else if (this.state.picUrlFinal !== '') {
            data = {
                content: this.state.content,
                userName: this.props.userName,
                userId: this.props.userId,
                likes: 0,
                postId: postId,
                pictureUrl: this.state.picUrlFinal
            }
        } else {
            data = {
                content: this.state.content,
                userName: this.props.userName,
                userId: this.props.userId,
                likes: 0,
                postId: postId
            }
        }

        if(this.state.content !== '' || this.state.picUrlFinal !== '' || this.state.vidUrlFinal !== '') {
            this.props.onPost(data);
            this.setState({content: '',vidUrl: '', picUrl: '', vidUrlFinal: '', picUrlFinal: '' });
            this.setState({clicked: false});
        }

        const notificationsData = {
            notificationType: 'post',
            contentId: postId,
            userId: this.props.userId,
            userName: this.props.userName,
            notificationId: uniqid()
        }

        axios.post('https://socialmedia-2fd3c.firebaseio.com/notifications.json',notificationsData);

    };

    finalVidUrlAdd = () => {
        this.setState({vidUrlFinal: this.state.vidUrl, picUrlFinal: '', vidModal: false});
    }

    finalPicUrlAdd = () => {
        this.setState({picUrlFinal: this.state.picUrl, vidUrlFinal: '', picModal: false});
    }

    addVideo = () => {
        this.setState({vidModal: true});
    }

    removeAddVideo = () => {
        this.setState({vidModal: false, vidUrl: '', vidUrlFinal: ''});
    }

    addPicture = () => {
        this.setState({picModal: true});
    }

    removeAddPicture = () => {
        this.setState({picModal: false, picUrl: '', picUrlFinal: ''});
    }

    removeButtons = () => {
        this.setState({clicked: false});
    };

    showButtons = () => {
        if(!this.state.clicked) {
            this.setState({clicked: true});
        }
    };


    render() {
        let content;
        if(this.props.loading) {
            content = <Spinner/>;
        } else {
            content = (
                <Aux>
                    <Input elementType='textarea' value={this.state.content} elementConfig={{type: 'input', placeholder: 'Create a Post.'}} changed={(event) => this.setState({content: event.target.value})}/>
                    <CSSTransition in={this.state.clicked} timeout={200} classNames={"my-node"} unmountOnExit>
                        <div className={classes.buttonArea}>
                            <div className={classes.posting}>
                                <Button key="1" btnType='pink' clicked={this.postToDataBase} disabled={this.props.disableCreate}>Post</Button>
                                <Button key="2" btnType='green' clicked={this.removeButtons} disabled={this.props.disableCreate}>Cancel</Button>
                            </div>
                            <div className={classes.url}>
                                <div className={this.props.userTheme === 1 ? classes.urlPicButtonDark : classes.urlPicButton} key="4" onClick={this.addPicture}><BsAspectRatio title="Add Picture URL"/></div>
                                <div className={this.props.userTheme === 1 ? classes.urlVidButtonDark : classes.urlVidButton} key="3" onClick={this.addVideo}><BsCollectionPlay title="Add Video URL"/></div>
                            </div>
                        </div>
                    </CSSTransition>
                </Aux>
            );
        }
        return (
            <div className={this.props.userTheme === 1 ? classes.CreatePostDark : classes.CreatePost} onClick={this.showButtons}>
                <Modal show={this.state.vidModal} modalClosed={this.removeAddVideo} type='middle'>
                    <div className={classes.modalTextArea}>
                        <Input elementType='textarea' value={this.state.vidUrl} elementConfig={{type: 'input', placeholder: 'Type the Video URL.'}} changed={(event) => this.setState({vidUrl: event.target.value})}/>
                    </div>
                    <div className={classes.modalButtonArea}>
                        <Button btnType='pink' clicked={this.finalVidUrlAdd}>Ok</Button>
                        <Button btnType='green' clicked={this.removeAddVideo}>Cancel</Button> 
                    </div>
                </Modal>
                <Modal show={this.state.picModal} modalClosed={this.removeAddPicture} type='middle'>
                    <div className={classes.modalTextArea}>
                    <Input elementType='textarea' value={this.state.picUrl} elementConfig={{type: 'input', placeholder: 'Type the Picture URL.'}} changed={(event) => this.setState({picUrl: event.target.value})}/>
                    </div>
                    <div className={classes.modalButtonArea}>
                        <Button btnType='pink' clicked={this.finalPicUrlAdd}>Ok</Button>
                        <Button btnType='green' clicked={this.removeAddPicture}>Cancel</Button> 
                    </div>
                </Modal>
                {content}
            </div>
        )
    };
};

const mapStateToProps = state => {
    return {
        loading: state.posts.postloading,
        userId: state.auth.userId,
        userTheme: state.auth.userTheme
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onPost: (data) => dispatch(actions.postPosts(data))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(CreatePost);
