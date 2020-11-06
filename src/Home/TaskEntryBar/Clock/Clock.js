import React from 'react'
import './Clock.css'
import useSound from 'use-sound';
import bark from './Sounds/dog_bark.wav';
import tweet from './Sounds/bird-tweet.mp3';
import gong from './Sounds/opening_gong.wav'
import { SkipNext, Stop, PausePresentation, PlayCircleOutline } from '@material-ui/icons';
import ApiContext from '../../../ApiContext'


//the class that implements this functional component is at the bottom
function Countdown(props) {

  const [timer, setTimer] = React.useState({
    name: 'timer',
    onBreak: false,
    firstStart: true,
    isPaused: true,
    pauseForModal: false,
    time: 0,
    timeRemaining: 0,
    timerHandler: null,
    cycle: 0,
    timeEqualsTimeRemaning: true,
    showToolbar: false

  })

  const [taskBarCounter] = React.useState({
    counter: 0
  })

  let taskBarProps = props.taskBarCounter
  let allowCountdownRestart = (taskBarCounter.counter !== taskBarProps) ? true : false
  const context = React.useContext(ApiContext);
  let breakDurations = context.prefs

  React.useEffect(() => {
    if (allowCountdownRestart) {
      taskBarCounter.counter = taskBarCounter.counter + 1
      allowCountdownRestart = false
    } else {
      allowCountdownRestart = true
    }
  }, [props, allowCountdownRestart])

  React.useEffect(() => {
    if (props.pauseForModal) {
      timer.pauseForModal = true
      handlePause()
    } else {
      setTimeout(() => {
        timer.pauseForModal = false
        handleStart()
      }, 300);
    }
  }, [props.pauseForModal])

  React.useEffect(() => {
    if (allowCountdownRestart) {
      if (!timer.pauseForModal) {
        setTimer((timer) => ({
          ...timer,
          time: props.cycle * 60,
          timeRemaining: props.cycle * 60,
          cycle: props.cycle,
          onBreak: false
        }));
      }
      if (timer.isPaused) {
        timer.isPaused = false;
      }
    }

  }, [props])

  React.useEffect(() => {
    if (timer.time === 0 && !timer.firstStart) {
      setTimeout(function () {
        if (timer.onBreak) {
          playBark()
          timer.showToolbar = false
          if (timer.cycle !== 0) {
            props.updateDB(timer.cycle)
          }
          timer.onBreak = false
        } else {
          const breakDuration = breakDurations[timer.cycle] * 60
          if (breakDuration !== 0) {
            playTweet()
            setTimer((timer) => ({
              ...timer,
              onBreak: true,
              time: breakDuration,
              timeRemaining: breakDuration
            }));
          } else {
            playBark()
            timer.showToolbar = false
          }
          props.updateDB(timer.cycle)
        }
      }, 1000);

    } else {

      if (timer.time === timer.timeRemaining) {
        timer.firstStart = false
        timer.showToolbar = true
        handleStart()
      }

    }

  }, [timer.time, timer.time === timer.timeRemaining])


  React.useEffect(() => {

    if (timer.timeRemaining === 0) {
      clearInterval(timer.timerHandler)
      setTimer((timer) => ({
        ...timer,
        time: 0,
        isPaused: true
      }));

    }

  }, [timer.timeRemaining])

  const updateTimeRemaining = e => {
    setTimer(prev => {
      return { ...prev, timeRemaining: prev.timeRemaining - 1 }
    })
  }
  const handleStart = e => {
    if (timer.time !== 0) {
      clearInterval(timer.timerHandler)
      const handle = setInterval(updateTimeRemaining, 1000);
      setTimer({ ...timer, isPaused: false, timerHandler: handle })
    }
  }
  const handlePause = e => {
    clearInterval(timer.timerHandler)
    setTimer({ ...timer, isPaused: true })
  }

  const timeFormat = (duration) => {

    if (duration > 0) {
      var hrs = ~~(duration / 3600);
      var mins = ~~((duration % 3600) / 60);
      var secs = ~~duration % 60;
      var ret = "";
      if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    } else {
      return "00:00"
    }
  }

  const handleSkip = () => {
    clearInterval(timer.timerHandler)
    setTimer({ ...timer, timeRemaining: 0 })
  }

  const handleStop = () => {
    clearInterval(timer.timerHandler)
    setTimer({ ...timer, onBreak: true, cycle: 0, timeRemaining: 0 })

  }

  const [playBark] = useSound(bark,
    { volume: 0.35 }
  );

  const [playTweet] = useSound(tweet,
    { volume: 0.20 }
  );

  const [playGong] = useSound(gong,
    { volume: 0.20 }
  );


  return <React.Fragment>

    {timer.onBreak ?
      <h2>On Break: {timeFormat(timer.timeRemaining)}</h2>
      : <h2> Time Left: {timeFormat(timer.timeRemaining)}</h2>}

    {timer.showToolbar &&
      <div className="toolbar-container">
        <div className="toolbar-icons">
          <i className="tooltip"><Stop className="toolbar-icon" onClick={handleStop}></Stop>
            <span class="tooltiptext">Stop</span></i>
          <i className="tooltip"><SkipNext className="toolbar-icon" onClick={handleSkip} ></SkipNext>
            <span class="tooltiptext">Skip to Break</span></i>
          {!timer.isPaused ?
            <i className="tooltip"><PausePresentation className="toolbar-icon" onClick={handlePause}></PausePresentation>
              <span class="tooltiptext">Pause</span></i>
            :
            <i className="tooltip"><PlayCircleOutline className="toolbar-icon" onClick={handleStart}></PlayCircleOutline>
              <span class="tooltiptext">Play</span></i>
          }
        </div>
      </div>}

  </React.Fragment>
}


class Clock extends React.Component {
  render() {
    return (
      <>
        <div className="floatLeft">
          <div id="timer">
            <Countdown updateDB={this.props.updateDB} pauseForModal={this.props.pauseForModal} cycle={this.props.cycle} taskBarCounter={this.props.taskBarCounter}>
            </Countdown>
          </div>
        </div>
      </>
    );
  }

}

export default Clock;