import React from "react"
import { Divider } from "semantic-ui-react"
import FindVoteInput from "./components/FindVoteInput"
import CreateVoteButton from "./components/CreateVoteButton"
import { getQueryParameter } from "../utils/urlParser"
import { NO_ROOM_FOUND } from "../constants/errorCodes"
import colors from "../constants/colors"

export default class StartPage extends React.Component {
  state = {
    errorCode: ""
  }
  componentDidMount() {
    const possibleError = getQueryParameter("errorCode")
    if (possibleError) {
      this.setState({ errorCode: possibleError })
    }
  }
  render() {
    return (
      <div style={styles.container}>
        {this.state.errorCode === NO_ROOM_FOUND ? (
          <div style={styles.errorBar}>
            The requested voting room could not be found
          </div>
        ) : (
          <p />
        )}
        <div>
          <CreateVoteButton changePage={this.props.changePage} />
        </div>
        <div>
          <Divider horizontal>or join a room</Divider>
        </div>
        <div>
          <FindVoteInput changePage={this.props.changePage} />
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  errorBar: {
    position: "absolute",
    top: 0,
    fontSize: "1.3em",
    width: "100%",
    height: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.WARNING
  }
}
