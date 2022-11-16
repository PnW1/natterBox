import React, { Component } from "react";
import { FaTwitter } from "react-icons/fa";

class LoginPage extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5" >
        <div className="signin_twitter_div m-auto p-5 text-center text-white" style={{background: '#2C2C2E',
        boxShadow: '11.7355px 11.7355px 29.3386px rgba(0, 0, 0, 0.5)',
        borderRadius: '19.5591px'}}>
          <div className="card-content center-align">
            <h2 className="mb-4">Sign In</h2>
            <p>Use existing social network account to sign in</p>
            <a
              className="align-items-center text-white btn "
              href={`${process.env.REACT_APP_SERVERURL}/auth/twitter`}
            >
              <FaTwitter /> Sign in with Twitter
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginPage;
