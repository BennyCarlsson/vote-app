import React from "react"
import ReactCountdownClock from "react-countdown-clock"
import colors from "../../constants/colors"
import { LASTING_MINUTES } from "../../constants/configs"

export default class CountDown extends React.Component {
  render() {
    return (
      <div>
        <ReactCountdownClock
          seconds={this.props.seconds || 60 * LASTING_MINUTES}
          color={this.props.seconds < 60 ? colors.SECUNDARY : colors.PRIMARY}
          alpha={0.9}
          size={130}
          weight={20}
          onComplete={() => this.props.onComplete()}
        />
      </div>
    )
  }
}
