import React, { Component } from "react"
import { Menu, Row, Col } from "antd"
import { Link, navigate } from "gatsby"
import firebase from "firebase/app"
import "firebase/auth"

import styles from "../styles/menu.module.css"

const { Item } = Menu

class NavMenu extends Component {
  state = {
    expand: false,
  }

  expandMenu = () => {
    this.setState({
      expand: !this.state.expand,
    })
  }

  profileClick = () => {
    navigate("/profile/")
    this.setState({
      expand: !this.state.expand,
    })
  }

  logoutClick = () => {
    firebase.auth().signOut()
    this.setState({
      expand: !this.state.expand,
    })
  }

  render() {
    return (
      <div style={this.props.show ? {} : { display: "none" }}>
        <Menu mode={this.props.mode} style={{ float: "right", border: "none" }}>
          <Item className={styles.menuItems}>
            <Link to="/">Home</Link>
          </Item>

          <Item className={styles.menuItems}>
            <Link to="/about/">About</Link>
          </Item>

          <Item className={styles.menuProfile}>
            <img
              className={styles.menuProfileImg}
              src={this.props.user.profile_pic}
              alt=""
              onClick={this.expandMenu}
            />
          </Item>

          <div
            className={
              this.state.expand
                ? styles.dropDown + " " + styles.dropDownShow
                : styles.dropDown
            }
          >
            <Row className={styles.dropDownInfo}>
              <Col span={6}>
                <img src={this.props.user.profile_pic} alt="" />
              </Col>
              <Col span={18}>
                <h3>
                  {this.props.user.first_name} {this.props.user.last_name}
                </h3>
                <h5>{this.props.user.email}</h5>
                <div className={styles.profileBtn} onClick={this.profileClick}>
                  My Profile
                </div>
              </Col>
            </Row>
            <div className={styles.logoutBtn} onClick={this.logoutClick}>
              Logout
            </div>

            {/* <div className={styles.dropDownItem} onClick={this.profileClick}>
              Profile
            </div>
            <div
              className={styles.dropDownItem}
              style={{ color: "#fe5e44" }}
              onClick={this.logoutClick}
            >
              Logout
            </div> */}
          </div>
        </Menu>
      </div>
    )
  }
}

export default NavMenu
