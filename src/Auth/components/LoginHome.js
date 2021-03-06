import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import xclose from "../../Img/xclose.png"
import FadeLoader from "react-spinners/FadeLoader"


import {
  loginEmailValidator,
  loginPasswordValidator,
  nameValidator,
  emailValidator,
  passwordValidator,
  confirmPasswordValidator
} from "../utilities/validator";
import { TrendingUpRounded } from "@material-ui/icons";


class LoginHome extends Component {

  /**
  * Class constructor
  * @param {Object} props
  */
  constructor(props) {
    super(props);

    this.state = {
      propStyles: {
        background: this.props.buttonColor,
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        width: 300,
        padding: "0 30px",
        fontSize: "18px",
        fontFamily: this.props.fontFamily
      },
      font: {
        fontFamily: this.props.fontFamily
      },
      error: {
        open: this.props.errorEnable,
        usernameMessage: "",
        passwordMessage: "",
        confirmPasswordMessage: "",
        emailMessage: "",
        message: this.props.errorMessage
      },
      disabledButton: {
        background: this.props.disabledButtonColor,
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        width: 300,
        padding: "0 30px",
        fontSize: "18px",
        fontFamily: this.props.fontFamily
      },
      navigatePage: true,
      signUpStyles: {
        color: this.props.buttonColor,
        cursor: "pointer"
      },
      errorMessageStyles: {
        margin: "auto",
        width: "100%",
        paddingBottom: "30px",
        color: "#FF0000",
        font: this.props.fontFamily
      },
      
      signUpPassword: "",
      signUpUsername: "",
      signUpConfirmPassword: "",
      signUpEmail: "",
      loginEmail: "",
      loginPassword: "",
      showSpinner: false
    };
  }

  handleCloseModal = () => {
    this.props.handleClose()

  }

  /**
   * Handle login page navigation using props
   */
  handleLogin = () => {
    
    this.setState({
      showSpinner: true,
      // error: {
      //   message: ""
      // }
    })

    const { loginEmail, loginPassword } = this.state
    this.props.handleLogin(loginEmail, loginPassword);

  }

  /**
   * Hanlde sign up page navigation using props
   */
  handleSignUp = () => {
    this.setState({
      showSpinner: true,
      // error: {
      //   message: ""
      // }
    })

    const { signUpEmail, signUpPassword } = this.state
    this.props.handleSignup(signUpEmail, signUpPassword);

  }

  /**
   * Handle rendering sign up content
   */
  navigateSignup = () => {
    let error = this.state.error;
    this.setState({
      navigatePage: true,
      error
    });
  };


  navigateLogin = () => {
    let error = this.state.error;
    this.setState({
      navigatePage: false,
      error
    });
  };

  /**
   * Handle setting login usernmae state
   * @param  {String} event Changer event of the login username
   */
  handleLoginEmail = event => {
    const username = `${event.target.value}`;
    let error = this.state.error;

    // error.usernameMessage = loginEmailValidator(username);

    this.setState({
      error,
      loginEmail: username
    });
  };

  /**
   * Handle setting login password state
   * @param  {String} event Changer event of the login password
   */
  handleLoginPassword = event => {
    const password = `${event.target.value}`;
    let error = this.state.error;

    // error.passwordMessage = loginPasswordValidator(password);

    this.setState({
      error,
      loginPassword: password
    });
  };

  /**
   * Handle button hover event for mouse enter
   */
  handleButtonHoverEnter = () => {
    const propStyles = {
      ...this.state.propStyles,
      background: this.props.buttonHoverColor
    };
    this.setState({
      propStyles
    });
  };

  /**
   * Handle button hover event for mouse leave
   */
  handleButtonHoverLeave = () => {
    const propStyles = {
      ...this.state.propStyles,
      background: this.props.buttonColor
    };
    this.setState({
      propStyles
    });

  };

  /**
   * Handle sign up button hover for mouse enter
   */
  handleSignUpHoverEnter = () => {
    const signUpStyles = {
      ...this.state.signUpStyles,
      color: this.props.buttonHoverColor
    };
    this.setState({
      signUpStyles
    });
  };

  /**
   * Handle sign up button hover for mouse leave
   */
  handleSignUpHoverLeave = () => {
    const signUpStyles = {
      ...this.state.signUpStyles,
      color: this.props.buttonColor
    };
    this.setState({
      signUpStyles
    });
  };

  /**
  * Handle setting signup username state
  * @param  {String} event Changer event of the signup username


  /**
   * Handle setting signup password state
   * @param  {String} event Changer event of the signup password
   */
  handleSignupPassword = event => {
    const password = `${event.target.value}`;
    let error = this.state.error;
    let confirmPassword = this.state.signUpConfirmPassword;

    error.passwordMessage = loginPasswordValidator(password);
    error.passwordMessage = passwordValidator(password);

    error.confirmPasswordMessage = confirmPasswordValidator(
      password,
      confirmPassword
    );

    this.setState({
      error,
      signUpPassword: password
    });
  };

  /**
   * Handle setting signup email state
   * @param  {String} event Changer event of the signup email
   */
  handleSignupEmail = event => {
    const email = `${event.target.value}`;
    let error = this.state.error;

    //   error.emailMessage = (password);
    error.emailMessage = emailValidator(email);

    this.setState({
      error,
      signUpEmail: email
    });
  };

  /**
   * Handle setting signup confirm password state
   * @param  {String} event Changer event of the signup confirm password
   */
  handleSignupConfirmPassword = event => {
    const confirmPassword = `${event.target.value}`;
    let error = this.state.error;
    let password = this.state.signUpPassword;

    error.confirmPasswordMessage = confirmPasswordValidator(
      password,
      confirmPassword
    );

    this.setState({
      error,
      signUpConfirmPassword: confirmPassword
    });
  };

  /**
  * Describes the elements on the login and sign up
  * @return {String} HTML elements
  */
  render() {
    const {
      propStyles,
      font,
      error,
      disabledButton,
      navigatePage,
      signUpStyles,
      signUpPassword,
      signUpConfirmPassword,
      signUpEmail,
      signUpUsername,
      loginEmail,
      loginPassword,
      errorMessageStyles
    } = this.state;

    let loginButton = null;
    let errorText = null;
    let mainContent = null;
    let errorList = null;
    let signupButton = null;

    let { usernameError, passwordError, emailError, confirmPasswordError } = "";

    if (error.usernameMessage || error.passwordMessage || error.emailMessage) {
      errorText = `${error.usernameMessage} ${error.passwordMessage} ${error.emailMessage}`;
    } else if (error.open) {
      errorText = error.message;
    }

    if (navigatePage) {
      usernameError = error.usernameMessage;
      passwordError = error.passwordMessage;
      emailError = error.emailMessage;
      confirmPasswordError = error.confirmPasswordMessage;

      errorList = (
        <div style={errorMessageStyles}>
          <div style={font}>
            <div>{usernameError}</div>
            <div>{passwordError}</div>
            <div>{emailError}</div>
            <div>{confirmPasswordError}</div>
          </div>
        </div>
      );
    }

    let enebledSignUpButton = (
      <button
        type="button"
        style={propStyles}
        onClick={this.handleSignUp}
        onMouseEnter={this.handleButtonHoverEnter}
        onMouseLeave={this.handleButtonHoverLeave}
      >
        Sign up
      </button>
    );

    let disbaleSignupButton = (
      <button type="button" style={disabledButton} disabled={true}>
        Sign up
      </button>
    );
    const errorMessage = <div style={errorMessageStyles} ><div style={font}>{errorText}</div></div>;

    if (
      !signUpPassword.length ||
      !signUpConfirmPassword ||
      !signUpEmail
    ) {
      signupButton = disbaleSignupButton;
    } else if (
      error.confirmPasswordMessage ||
      error.emailMessage ||
      error.passwordMessage
    ) {
      signupButton = disbaleSignupButton;
    } else {
      signupButton = enebledSignUpButton;
    }

    let enebledLoginButton = (
      <button
        type="button"
        style={propStyles}
        onClick={this.handleLogin}
        onMouseEnter={this.handleButtonHoverEnter}
        onMouseLeave={this.handleButtonHoverLeave}
      >
        Login
      </button>
    );

    let disbaleLoginButton = (
      <button type="button" style={disabledButton} disabled={true}>
        Login
      </button>
    );


    if (!loginEmail || !loginPassword) {
      loginButton = disbaleLoginButton;
    } else if (error.confirmPasswordMessage || error.emailMessage) {
      loginButton = disbaleLoginButton;
    } else if (error.open) {
      loginButton = disbaleLoginButton;
    } else {
      loginButton = enebledLoginButton;
    }

    const login = (

      <div className="loginContainer">
        <img onClick={this.handleCloseModal} className="xclose" src={xclose} alt="close dialog" />
        {/* <img className="secure-login-badge" src={require('../../Img/security-icon.png').default} alt=""/> */}

        Login
        {this.state.showSpinner && !this.props.showPasswordError &&
          <FadeLoader className="Clip-loader" loading={true} color={'#6b8bba'} size={60}></FadeLoader>

        }
        {errorMessage}
        {this.props.showPasswordError && <div style={errorMessageStyles} ><div style={font}>{"Invalid Credentials"}</div></div>}
        <div className="loginGroup">

          <input
            className="modal-input"
            type="text"
            required
            style={font}
            onChange={this.handleLoginEmail}
          ></input>
          <label style={font}>Email</label>
        </div>


        <div className="loginGroup">
          <input
            className="modal-input"
            style={font}
            required
            type="password"
            onChange={this.handleLoginPassword}
          ></input>
          <label style={font}>Password</label>
        </div>

        <div style={font}>
          {loginButton}

          <div
            style={signUpContentStyles}
            onClick={this.navigateSignup}
            onMouseEnter={this.handleSignUpHoverEnter}
            onMouseLeave={this.handleSignUpHoverLeave}
          >
            Don't have an account? <b style={signUpStyles}>Sign Up</b>
          </div>
        </div>
      </div>
    );

    const signUp = (

      <div>
        <div className="loginContainer">
          <img onClick={this.handleCloseModal} className="xclose" src={xclose} alt="close dialog" />
          {/* <img className="secure-login-badge" src={require('../../Img/security-icon.png').default} alt=""/> */}

          Sign Up
          {this.state.showSpinner && !this.props.showPasswordError &&
          <FadeLoader className="Clip-loader" loading={true} color={'#6b8bba'} size={60}></FadeLoader>
          }
          {errorList}

          <div className="loginGroup">
            <input className="modal-input"
              type="text"
              required
              style={font}
              onChange={this.handleSignupEmail}
            ></input>
            <label style={font}>Email</label>
          </div>

          <div className="loginGroup">
            <input
              className="modal-input"
              required
              style={font}
              type="password"
              onChange={this.handleSignupPassword}
            ></input>
            <label style={font}>Password</label>
          </div>
          <div className="loginGroup">
            <input
              className="modal-input"
              type="password"
              required
              style={font}
              onChange={this.handleSignupConfirmPassword}
            ></input>
            <label style={font}>Confirm Password</label>
          </div>

          <div style={font}>
            {signupButton}
            <div
              style={signUpContentStyles}
              onClick={this.navigateLogin}
              onMouseEnter={this.handleSignUpHoverEnter}
              onMouseLeave={this.handleSignUpHoverLeave}
            >
              Already have an account? <b style={signUpStyles}>Log In</b>
            </div>
          </div>
        </div>
      </div>
    );

    navigatePage === false ? (mainContent = login) : (mainContent = signUp);

    return <div>

      {mainContent}</div>;
  }
}

export default LoginHome;

LoginHome.propTypes = {
  buttonColor: PropTypes.string,
  fontFamily: PropTypes.string,
  disabledButtonColor: PropTypes.string,
  buttonHoverColor: PropTypes.string,
  errorMessage: PropTypes.string,
  handleSignup: PropTypes.func,
  handleLogin: PropTypes.func,
  errorEnable: PropTypes.bool
};

LoginHome.defaultProps = {
  buttonColor: "#5264AE",
  buttonHoverColor: "#6373b6",
  disabledButtonColor: "#a8b1d6",
  fontFamily: "Nunito, Roboto, Arial, sans-serif",
  errorMessage: "Username or password is incorrect❓",
  handleLogin: () => {},
  handleSignup: () => {},
  handleCloseModal: () => {},

  errorEnable: false
};

const signUpContentStyles = {
  margin: "auto",
  width: "80%",
  paddingTop: "40px"
};
