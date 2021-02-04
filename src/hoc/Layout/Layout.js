import React, {  Component } from 'react';

import Aux from '../Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
import Modal from '../../components/UI/Modal/Modal';
import * as actions from '../../store/actions/index';
import UserSearch from '../../components/Navigation/Search/UserSearch';
import PostSearch from '../../components/Navigation/Search/PostSearch';

class Layout extends Component {
    state = {
           showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
         this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {

        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
   }
   
   modalCancelHandler = () => {
        this.props.onModalCancel();
        console.log(this.props.modalSearchOn);
   }

   render () {
       return (
           <Aux>
           <Toolbar 
               drawerToggleClicked={this.sideDrawerToggleHandler} 
               isAuth={this.props.isAuthenticated}/>
            <Modal show={this.props.modalSearchOn} modalClosed={this.modalCancelHandler}>
                <div className={classes.userSearch}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><title>ionicons-v5-j</title><path d='M336,256c-20.56,0-40.44-9.18-56-25.84-15.13-16.25-24.37-37.92-26-61-1.74-24.62,5.77-47.26,21.14-63.76S312,80,336,80c23.83,0,45.38,9.06,60.7,25.52,15.47,16.62,23,39.22,21.26,63.63h0c-1.67,23.11-10.9,44.77-26,61C376.44,246.82,356.57,256,336,256Zm66-88h0Z'/><path d='M467.83,432H204.18a27.71,27.71,0,0,1-22-10.67,30.22,30.22,0,0,1-5.26-25.79c8.42-33.81,29.28-61.85,60.32-81.08C264.79,297.4,299.86,288,336,288c36.85,0,71,9,98.71,26.05,31.11,19.13,52,47.33,60.38,81.55a30.27,30.27,0,0,1-5.32,25.78A27.68,27.68,0,0,1,467.83,432Z'/><path d='M147,260c-35.19,0-66.13-32.72-69-72.93C76.58,166.47,83,147.42,96,133.45,108.86,119.62,127,112,147,112s38,7.66,50.93,21.57c13.1,14.08,19.5,33.09,18,53.52C213.06,227.29,182.13,260,147,260Z'/><path d='M212.66,291.45c-17.59-8.6-40.42-12.9-65.65-12.9-29.46,0-58.07,7.68-80.57,21.62C40.93,316,23.77,339.05,16.84,366.88a27.39,27.39,0,0,0,4.79,23.36A25.32,25.32,0,0,0,41.72,400h111a8,8,0,0,0,7.87-6.57c.11-.63.25-1.26.41-1.88,8.48-34.06,28.35-62.84,57.71-83.82a8,8,0,0,0-.63-13.39C216.51,293.42,214.71,292.45,212.66,291.45Z'/></svg>
                    <h3>Users</h3>
                </div>
                <UserSearch content={this.props.searchContent} auth={this.props.isAuthenticated}/>
                <div className={classes.postSearch}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><title>ionicons-v5-e</title><path d='M298.39,248a4,4,0,0,0,2.86-6.8l-78.4-79.72a4,4,0,0,0-6.85,2.81V236a12,12,0,0,0,12,12Z'/><path d='M197,267A43.67,43.67,0,0,1,184,236V144H112a64.19,64.19,0,0,0-64,64V432a64,64,0,0,0,64,64H256a64,64,0,0,0,64-64V280H228A43.61,43.61,0,0,1,197,267Z'/><path d='M372,120h70.39a4,4,0,0,0,2.86-6.8l-78.4-79.72A4,4,0,0,0,360,36.29V108A12,12,0,0,0,372,120Z'/><path d='M372,152a44.34,44.34,0,0,1-44-44V16H220a60.07,60.07,0,0,0-60,60v36h42.12A40.81,40.81,0,0,1,231,124.14l109.16,111a41.11,41.11,0,0,1,11.83,29V400h53.05c32.51,0,58.95-26.92,58.95-60V152Z'/></svg>
                    <h3>Posts</h3>
                </div>
                <PostSearch content={this.props.searchContent} auth={this.props.isAuthenticated}/>
            </Modal>
           <SideDrawer 
               open={this.state.showSideDrawer} 
               closed={this.sideDrawerClosedHandler} 
               isAuth={this.props.isAuthenticated}/>/>
           <main className={classes.Content}>
               {this.props.children}
           </main>
           </Aux>
       )
       
   }
   
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        modalSearchOn: state.search.SearchModalOn,
        searchContent: state.search.searchContent
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onModalCancel: () => dispatch(actions.setSearchModalFalse())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);