import React from "react"
import "./Audiop.css"

export default class Audiop extends React.Component {
  state = { play: false }
  play = startSecond => {
    this.changeCurrentTime(startSecond)
    console.log(this.audio.currentTime)
    // if (this.state.play) {
    //   this.setState({ play: false })
    //   this.audio.pause()
    // } else {
    //   this.setState({ play: true })
    this.audio.play()
    // }
  }

  componentDidMount() {
    if (this.props.clicked) {
      this.play(this.props.startSecond)
    }
  }
  changeCurrentTime = time => {
    this.audio.currentTime = time
  }
  render() {
    return (
      <div>
        <div>
          <audio
            controls
            src={"http://localhost:8080/Google_Gnome.wav"}
            ref={audio => {
              this.audio = audio
            }}
          />
          {/* <button onClick={this.play}> click </button> */}
        </div>
      </div>
    )
  }
}
