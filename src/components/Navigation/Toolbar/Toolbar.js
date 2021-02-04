import React, { Component } from 'react';

import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../../assets/Logo/Logo';
import SearchBar from '../Search/SearchBar/SearchBar';
import {connect} from 'react-redux';
import classnames from "classnames";
import { render } from '@testing-library/react';

class Toolbar extends Component {
    state= {
        prevScrollpos: window.pageYOffset,
        visible: true
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
      }


    
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }



    handleScroll = () => {
        const { prevScrollpos } = this.state;
      
        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollpos > currentScrollPos;
      
        this.setState({
          prevScrollpos: currentScrollPos,
          visible
        });
      };

    render() {
        return (
            <header className={this.props.userTheme === 1 ? classnames(classes.ToolbarDark, {'ToolbarHidden' : !this.state.visible}) : classnames(classes.Toolbar, {'ToolbarHidden' : !this.state.visible})}>
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
            </header>
        )
    }};

const mapStateToProps = state => {
    return {
        userTheme: state.auth.userTheme
    }
}

export default connect(mapStateToProps)(Toolbar);
