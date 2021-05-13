import React, { Component } from 'react';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../../assets/Logo/Logo';
import SearchBar from '../Search/SearchBar/SearchBar';
import {connect} from 'react-redux';
import classnames from "classnames";
import { Fragment } from 'react';

class Toolbar extends Component {
    state= {
        prevScrollpos: window.pageYOffset,
        visible: true,
        showToolBar: this.props.isAuthenticated,
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
      }

    componentDidUpdate(prevProps,prevState) {
        if(prevProps.isAuthenticated !== this.props.isAuthenticated) {
            this.setState({showToolBar: this.props.isAuthenticated});
        }
    }


    
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }



    handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const visible = 122 > currentScrollPos;
      
        this.setState({
          prevScrollpos: currentScrollPos,
          visible
        });
      };

    render() {
        return (
            <Fragment>
            {this.state.showToolBar ? <header className={this.props.userTheme === 1 ? classnames(classes.ToolbarDark, {'ToolbarHidden' : !this.state.visible}) : classnames(classes.Toolbar, {'ToolbarHidden' : !this.state.visible})}>
                <div className={classes.mainContent}>
                    {this.props.isAuth ? <DrawerToggle clicked={this.props.drawerToggleClicked}/> : null}
                    <div className={classes.Logo}>
                        <Logo type="big"/>
                    </div>
                    <nav className={classes.DesktopOnly}>
                        <NavigationItems type='big' isAuth={this.props.isAuth}/>
                    </nav>
                </div>
                {this.props.isAuth ? <SearchBar /> : null}
            </header> : null}
            </Fragment>
        )
    }};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userTheme: state.auth.userTheme,
    }
}

export default connect(mapStateToProps)(Toolbar);
