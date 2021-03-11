import React, { Component } from 'react'
import './GoldenRectangle.css'
import ApiContext from '../../ApiContext'
const birdTweet = require('../../Img/birdtweet1.png')
const dogBark = require('../../Img/dogbark1.png')


export default class GoldenRectangle extends Component {

  static contextType = ApiContext;

    state = {

        sets: [[34, 21, 13, 8, 5, 3], [21, 13, 8, 5, 3, 2], [89, 55, 34, 21, 13, 8], [55, 34, 21, 13, 8, 5]],
        setIndex: 3,
        pauseForModal: false,
        alarmIcon: ""
    }

    changeSpiralNumbers() {
        if (this.state.setIndex === 3) {
            this.setState(prevState => {
                return { setIndex: 0 }
            })
        } else {
            this.setState(prevState => {
                return { setIndex: prevState.setIndex + 1 }
            })
        }

    }

    SetAlarmIcon = (selectedValue) => {
        //this needs to check if its currenctly on a brek period, you could check the dom text
        const breakValue = this.context.prefs[selectedValue]

        if(breakValue > 0){

            this.setState(prevState => {
                return { alarmIcon: birdTweet}
            })

        }else{
            this.setState(prevState => {
                //this will be dog bark on break
                return { alarmIcon: birdTweet}
            })
        }
    }

    render() {
        const currentIndex = this.state.sets[this.state.setIndex]

        return (
            <>
                <div className="container">

                    
                    {this.state.alarmIcon !== "" ?
                    <img className="alarm-sound" src={this.state.alarmIcon} alt=""/> :
                    <img className="alarm" src={require('../../Img/whitealarm2.png')} alt=""/>
                    }
                    <div className="item box7"><button className="clickable" onClick={() => {this.props.updateCycle(currentIndex[0]) ; this.SetAlarmIcon(currentIndex[0])}}>{currentIndex[0]}</button></div>
                    <div className="item box6"><button className="clickable" onClick={() => {this.props.updateCycle(currentIndex[1]) ; this.SetAlarmIcon(currentIndex[1])}}>{currentIndex[1]}</button></div>
                    <div className="item box5"><button className="clickable" onClick={() => {this.props.updateCycle(currentIndex[2]) ; this.SetAlarmIcon(currentIndex[2])}}>{currentIndex[2]}</button></div>
                    <div className="item box3"><button className="clickable" onClick={() => {this.props.updateCycle(currentIndex[3]) ; this.SetAlarmIcon(currentIndex[3])}}>{currentIndex[3]}</button></div>
                    <div className="item box2"><button className="clickable" onClick={() => {this.props.updateCycle(currentIndex[4]) ; this.SetAlarmIcon(currentIndex[4])}}>{currentIndex[4]}</button></div>
                    <div className="item box1"><button className="clickable" onClick={() => {this.props.updateCycle(currentIndex[5]) ; this.SetAlarmIcon(currentIndex[5])}}>{currentIndex[5]}</button></div>
                    <div className="item box0"><button className="clickable" onClick={() => this.changeSpiralNumbers()}>
                        <span className="plus-minus">-</span></button>
                    </div>
                </div>
            </>
        )
    }

}