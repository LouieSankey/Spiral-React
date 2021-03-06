import React, { Component } from 'react'
import { BrowserRouter as Redirect, useLocation, Route, Link, withRouter } from "react-router-dom"
import { FaAlignRight } from 'react-icons/fa';
import Home from '../Main/MainContainer/MainContainer'
import Tracking from '../Tracking/TrackingHome/Tracking'
import Landing from '../Landing/Landing'
import MainContext from '../MainContext'
import config from '../config'
import './App.css'
import APIService from '../api-services';
import Sidebar from '../Sidebar/sidebar'
import '../Sidebar/sidebar.css'

const token = localStorage.getItem("spiral_jwt_token")

class App extends Component {
  constructor(props) {
    super(props);
    this.handleAPIRequest = this.handleAPIRequest.bind(this);
    this.timerRef = React.createRef();
  }

  state = {
    toggleMobileNav: false,
    account_id: null,
    tasks: [],
    timeUntilBreakFromDB: 0
  }

  componentDidMount = () => {

    document.title = "Spiral"
    let account_id = localStorage.getItem('account_id')
    let token = localStorage.getItem("spiral_jwt_token")
    account_id = Number(account_id)
    if (account_id) {
      this.handleAPIRequest(account_id, token)

    } else {
      this.props.history.push('/Spiral')
    }
  }

  handleAPIRequest = (account_id, token) => {


    Promise.all([

      fetch(`${config.API_ENDPOINT}/account/${account_id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }),
      fetch(`${config.API_ENDPOINT}/project/account/${account_id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }),
      fetch(`${config.API_ENDPOINT}/pref/account/${account_id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }),

      fetch(`${config.API_ENDPOINT}/task/account/${account_id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }),
    ])
      .then(([accountRes, projectRes, prefsRes, tasksRes]) => {
        if (!accountRes.ok)
          return accountRes.json().then(e => Promise.reject(e))
        if (!projectRes.ok)
          return projectRes.json().then(e => Promise.reject(e))
        if (!prefsRes.ok)
          return prefsRes.json().then(e => Promise.reject(e))
        if (!tasksRes.ok)
          return tasksRes.json().then(e => Promise.reject(e))

        return Promise.all([
          accountRes.json(),
          projectRes.json(),
          prefsRes.json(),
          tasksRes.json()
        ])
      })
      .then(([account, projects, prefsRes, tasksRes]) => {
        for (const key in prefsRes) {
          if (key.charAt(0) === "_") {
            delete Object.assign(prefsRes, { [key.substring(1)]: prefsRes[key] })[key];
          }
        }
        const currentProject = projects[0]
        this.setState({ account, projects, prefsRes, account_id, currentProject, tasksRes, 
        
        timeUntilBreakFromDB: Number(prefsRes['elapsed_time_until_break'])
        })
        localStorage.setItem("recent_projects", JSON.stringify(projects))

      })
      .catch(error => {
        console.error({ error })
      })
  }

  //timeUntilBreak... gets set intially from DB then gets reset when value is changed in sidebar.
  //that's what this function is for
  setTimeUntilBreakFromDB = (newTime) => {
    this.setState(prevState => ({
      timeUntilBreakFromDB: newTime
  }))
  }


  handleAddProject = newProject => {
    this.setState({
      currentProject: newProject,
      projects: [
        ...this.state.projects,
        newProject
      ]
    })
  }

  setCurrentProject = (project) => {
    this.setState({
      currentProject: project
    })
    localStorage.setItem("recent_project", JSON.stringify(project))
  }

  ToggleMobileNav = () => {
    this.setState({ toggleMobileNav: !this.state.toggleMobileNav })
  }

  renderMainRoutes() {
    return (
      <>
        <Route
          path='/spiral'
          component={Landing} />

        <Route path="/tracking">
          <Tracking />
        </Route>
        <Route
          exact
          path='/'
          render={(props) => <Home {...props} timeUntilBreakFromDB={this.state.timeUntilBreakFromDB}/>} />
      </>

    )
  }



  Logout = () => {

    localStorage.setItem("account_id", null)
    this.setState({
      account: {},
      prefsRes: {},
      projects: [],
      tasks: [],
      account_id: null
    })
    this.ToggleMobileNav()
  }


  changeBreakPrefs = (newPrefs) => {
    let prefs = {}
    let dbPrefs = {}
    for (const key in newPrefs) {
      if (newPrefs[key] !== null) {
        prefs[key] = newPrefs[key]
        dbPrefs[key] = newPrefs[key]
      }
    }

    const promises = []
    for (const key in prefs) {
      promises.push(Promise.resolve(
        this.setState(prevState => ({
          prefsRes: {
            ...prevState.prefsRes,
            [`${key}`]: Number(prefs[key])
          }

        }))))
    }

    

    Promise.all(promises).then(() => {
      APIService.saveUserPrefs(dbPrefs, this.state.account_id)
    })
  }


  render() {
    const value = {
      account_id: this.state.account_id,
      account: this.state.account,
      tasksRes: this.state.tasksRes,
      projects: this.state.projects,
      currentProject: this.state.currentProject,
      prefs: this.state.prefsRes,
      setTimeUntilBreakFromDB: this.setTimeUntilBreakFromDB,
      changeBreakPrefs: this.changeBreakPrefs,
      setCurrentProject: this.setCurrentProject,
      handleAddProject: this.handleAddProject,
      handleAPIRequest: this.handleAPIRequest,
      handleAddTask: this.handleAddTask,
      timerRef: this.timerRef

    }

    return (
      <MainContext.Provider value={value}>
        <Sidebar logout={this.Logout} ></Sidebar>
        {this.renderMainRoutes()}
      </MainContext.Provider>

    )
  }

}

export default withRouter(App)

