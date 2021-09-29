import React from 'react'

class Timer extends React.Component {
    constructor() {
        super();

        this.state = {
            isSession: true,
            timerSecond: 0,
            intervalId: 0,
            alarmColor: { color: 'white' },
            timer: 1500
        }
        this.play = this.play.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.decreseTimer = this.decreseTimer.bind(this);
        this.warning = this.warning.bind(this);
        this.buzzer = this.buzzer.bind(this);
        this.switchTimer = this.switchTimer.bind(this);
    }

    play() {
        let intervalId = setInterval(this.decreseTimer, 1000);
        this.props.onPlayStopTimer(true)
        this.setState({
            intervalId: intervalId
        })
    }

    decreseTimer(){
        switch(this.state.timerSecond){
            case 0:
                if(this.props.timerMinute === 0){
                    if(this.state.isSession){
                        this.setState({
                            isSession: false
                        })
                        this.props.toggleInterval(this.state.isSession)
                
                    } else {
                        this.setState({
                            isSession: true
                        })
                        this.props.toggleInterval(this.state.isSession)
                    }
                }else{
                    this.props.updateTimerMinute()
                this.setState({
                    timerSecond:59
                })

                }
                break;
                default:
                    this.setState((prevState) => {
                        return{
                            timerSecond:prevState.timerSecond - 1
                        }
                    })
                    break;
        }
    }

    stop(){
        clearInterval(this.state.intervalId)
        this.props.onPlayStopTimer(false)
    }

    reset(){
        this.stop()
        this.props.resetTimer();
        this.props.onPlayStopTimer(false)
        this.setState({
            timerSecond: 0,
            isSession: true
        })

    }
    phaseControl() {
        let timer = this.state.timer;
        this.warning(timer);
        this.buzzer(timer);
        if (timer < 0) {
          if (this.state.intervalId) {
            this.state.intervalId.cancel();
          }
          if (this.state.timerType === 'Session') {
            this.beginCountDown();
            this.switchTimer(this.state.breakLength * 60, 'Break');
          } else {
            this.beginCountDown();
            this.switchTimer(this.state.sessionLength * 60, 'Session');
          }
        }
      }
      warning(_timer) {
        if (_timer < 61) {
          this.setState({ alarmColor: { color: '#a50d0d' } });
        } else {
          this.setState({ alarmColor: { color: 'white' } });
        }
      }
      buzzer(_timer) {
        if (_timer === 0) {
          this.audioBeep.play();
        }
      }
      switchTimer(num, str) {
        this.setState({
          timer: num,
          timerType: str,
          alarmColor: { color: 'white' }
        });
      }

    render() {
        return(
            <section className="div-timer">
                <div className="timer-container">
                    <h4>{this.state.isSession === true ? "Session" : "Break"}</h4>
                    <span className="timer">{this.props.timerMinute}</span>
                    <span className="timer">:</span>
                    <span className="timer">{this.state.timerSecond === 0 ? "00" : this.state.timerSecond < 10 ? "0" + this.state.timerSecond : this.state.timerSecond}</span>
                </div>
                <div className="btn-action">
                    <button onClick={this.play}>Play</button>
                    <button onClick={this.stop}>Stop</button>
                    <button onClick={this.reset}>Reset</button>
                </div>

                <div className="autor">
                    <h3 className="autor-d">CREATE BY DAVID</h3>
                    <a className="fab" href="https://github.com/DavidCardonaG"><i class="fab fa-github"></i></a>
                    <a className="fab" href="mailto:davidcardonagarcia711@gmail.com"><i class="fas fa-envelope-open-text"></i></a>
                    <a className="fab" href="https://api.whatsapp.com/send?phone=573104027113&text=Hola%2C%20me%20llamo%20David%20soy%20Desarrollador%20Front-End%20%C2%A1Gracias%20por%20Contactarme!%F0%9F%98%80%F0%9F%92%BB"><i class="fab fa-whatsapp"></i></a>
                </div>
            </section>
        )

    }
}

export default Timer;