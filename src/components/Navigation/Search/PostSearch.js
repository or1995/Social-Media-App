import React, {Component} from 'react';

import Spinner from '../../UI/Spinner/Spinner';
import {connect} from 'react-redux';
import classes from './PostSearch.module.css';
import {Link} from 'react-router-dom';
import * as actions from '../../../store/actions/index';

class PostSearch extends Component {

    removeSearchModal = () => {
        this.props.setModalOff();
        this.props.resetSearch('');
    }

    render() {

        let rendered;
        if(this.props.searchedPosts === null) {
            rendered = <div className={classes.spinnerDiv}><Spinner/></div>
        } else {
            if(this.props.searchedPosts.length > 0) {
            rendered = this.props.searchedPosts.map( post => {
                return (<Link key={post.postId} className={this.props.userTheme === 1 ? classes.postLinkDark : classes.postLink} to={'../../../posts/' + post.postId}><div className={classes.searchRes} onClick={this.removeSearchModal}>
                            <h3 className={this.props.userTheme === 1 ? classes.userDark : classes.user}>{post.userName}</h3>
                            <h3 className={this.props.userTheme === 1 ? classes.contentDark : classes.content}>{post.content.length > 26 ? post.content.substring(0,25) + '...' : post.content}</h3>
                        </div></Link>)
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
        searchedPosts: state.search.searchedPosts,
        userTheme: state.auth.userTheme
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setModalOff: () => dispatch(actions.setSearchModalFalse()),
        resetSearch: (content) => dispatch(actions.setSearchContent(content))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostSearch);