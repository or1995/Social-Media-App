import React,{Component} from 'react';
import Input from '../../../UI/Input/Input';

import classes from './SearchBar.module.css';
import Aux from '../../../../hoc/Aux';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';

import axios from 'axios';

class SearchBar extends Component {

    searchChange = (event) => {
        this.props.setSearchedUsers(null);
        this.props.setModalOn();
        this.props.setSearchContent(event.target.value);
        if(event.target.value === '') {
            this.props.onModalCancel();
        }

        axios.get('https://socialmedia-2fd3c.firebaseio.com/users.json')
        .then(res => {
            const fetchedUsers = [];
            for(let key in res.data) {
                fetchedUsers.push({
                    dataBaseId: key,
                    ...res.data[key],
                });
            }

            let filteredUsers = fetchedUsers.filter( user => {
                    if(user.userName.toLowerCase().includes(this.props.searchContent.toLowerCase())) {
                        return true;
                    } else {
                        return false;
                    }
                }
            );

            this.props.setSearchedUsers(filteredUsers);
        })

        axios.get('https://socialmedia-2fd3c.firebaseio.com/posts.json')
        .then(res => {
            const fetchedPosts = [];
            for(let key in res.data) {
                fetchedPosts.push({
                    dataBaseId: key,
                    ...res.data[key],
                });
            }
            console.log(fetchedPosts);

            let filteredPosts = fetchedPosts.filter( post => {
                if(post.content) {
                    if(post.content.toLowerCase().includes(this.props.searchContent.toLowerCase())) {
                        return true;
                    } else {
                        return false;
                        }
                    }
                }
            );

            this.props.setSearchedPosts(filteredPosts);
        })
    }

    modalShow = () => {
        this.props.setModalOn();  
    }

    render() {

        return (
            <Aux>
                <div className={this.props.userTheme === 1 ? classes.searchBarDark : classes.searchBar}>
                    <Input elementType='input' value={this.props.searchContent} elementConfig={{type: 'input', placeholder: 'Search'}} changed={this.searchChange}/>
                    <button className={this.props.userTheme === 1 ? classes.searchButtonDark : classes.searchButton}><svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><title>Search</title><path d='M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z'/></svg></button>
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchContent: state.search.searchContent,
        userTheme: state.auth.userTheme
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setModalOn: () => dispatch(actions.setSearchModalTrue()),
        onModalCancel: () => dispatch(actions.setSearchModalFalse()),
        setSearchContent: (content) => dispatch(actions.setSearchContent(content)),
        setSearchedUsers: (users) => dispatch(actions.setSearchedUsers(users)),
        setSearchedPosts: (posts) => dispatch(actions.setSearchedPosts(posts))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);