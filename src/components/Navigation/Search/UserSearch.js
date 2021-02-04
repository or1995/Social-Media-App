import React, {Component} from 'react';

import Spinner from '../../UI/Spinner/Spinner';
import {connect} from 'react-redux';
import profilePic from '../../../assets/imgs/profilePicture.png';
import classes from './UserSearch.module.css';
import {Link} from 'react-router-dom';
import * as actions from '../../../store/actions/index';

class UserSearch extends Component {

    removeSearchModal = () => {
        this.props.setModalOff();
        this.props.resetSearch('');
    }

    render() {

        let rendered;
        if(this.props.searchedUsers === null) {
            rendered = <div className={classes.spinnerDiv}><Spinner/></div>
        } else {
            
            if(this.props.searchedUsers.length > 0) {
                rendered = this.props.searchedUsers.map( user => {
                    return (
                        <Link key={user.userId} className={this.props.userTheme === 1 ? classes.postLinkDark : classes.postLink} to={this.props.userId === user.userId ? '/me/posts' : '../../../users/' + user.userId} onClick={this.removeSearchModal}>
                            <div className={this.props.userTheme === 1 ? classes.searchResDark : classes.searchRes} key={user.userId}>
                                <img src={profilePic} alt={user.userName} />
                                <h3 className={this.props.userTheme === 1 ? classes.userNameDark : classes.userName}>{user.userName}</h3>
                            </div>
                        </Link>)
            });      
            } else {
                rendered = <h3 className={this.props.userTheme === 1 ? classes.noResDark : classes.noRes}>No Results!</h3>
            }
        }
        return (
            <div className={this.props.userTheme === 1 ? classes.searchDark : classes.search}>
                {rendered}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchedUsers: state.search.searchedUsers,
        userId: state.auth.userId,
        userTheme: state.auth.userTheme
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setModalOff: () => dispatch(actions.setSearchModalFalse()),
        resetSearch: (content) => dispatch(actions.setSearchContent(content))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);