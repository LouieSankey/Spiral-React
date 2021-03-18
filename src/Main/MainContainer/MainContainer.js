import React, { Component } from 'react';
import TaskEntryBar from '../TaskEntryBar/TaskEntryBar'
import GoldenRectangle from '../GoldenRectangle/GoldenRectangle'
import AllProjectsModal from '../Modals/ProjectsModal';
import NewProjectModal from '../Modals/NewProjectModal'
import BreakPrefsModal from '../Modals/BreakPrefsModal'
import './MainContainer.css'
import ApiContext from '../../ApiContext'
import  useSound from 'use-sound';




export default class Main extends Component {

  static contextType = ApiContext;

  state = {
    cycle: 0,
    showPrefs: false,
    showProjects: false,
    showAddProject: false,
    pauseTimer: false,
    taskName: "",
    noClockStop: 0
 
  };


  updateCycle = (cycleTime) => {
    this.setState({ cycle: cycleTime })
  }

  showBreakPrefsModal = () => {
    this.setState({
      showPrefs: true,
    });
  };
  hideBreakPrefsModal = () => {
    this.setState({
      showPrefs: false,
    });
  };

  showAllProjectsModal = () => {
    this.setState(prevState => ({
      showProjects: !prevState.showProjects,
     noClockStop: prevState.noClockStop+1
    }));

  };

  hideAllProjectsModal = () => {
    this.setState(prevState => ({
      showProjects: false,
      noClockStop: prevState.noClockStop+1 
      }));
  };

  showNewProjectModal = () => {
    this.setState(prevState => ({
      showAddProject: true,
      noClockStop: prevState.noClockStop+1  
      }));
  };

  hideNewProjectModal = () => {
    this.setState(prevState => ({
      showAddProject: false,
      noClockStop: prevState.noClockStop+1
        }));
  };

  noClockStop = () => {
    this.setState(prevState => ({
      noClockStop: prevState.noClockStop+1
        }));
  }





  render() {
    return (
      <>
   
        <BreakPrefsModal showPrefs={this.state.showPrefs} handleClose={this.hideBreakPrefsModal}></BreakPrefsModal>
        <TaskEntryBar setTaskName={this.setLocalTaskName}  cycle={this.state.cycle} noClockStop={this.state.noClockStop} showProjectsModal={this.showAllProjectsModal}></TaskEntryBar>
        <GoldenRectangle updateCycle={this.updateCycle}></GoldenRectangle>
        <AllProjectsModal show={this.state.showProjects} handleClose={this.hideAllProjectsModal} showAdd={this.showNewProjectModal}>
        </AllProjectsModal>
        <NewProjectModal show={this.state.showAddProject} noClockStop={this.noClockStop} handleClose={this.hideNewProjectModal}>
        </NewProjectModal>
        <br />
      </>
    )
  }
}