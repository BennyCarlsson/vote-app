import React from "react"
import Question from "./components/question"
import AddSuggestion from "./components/AddSuggestion"
import { getQueryParameter } from "../utils/urlParser"
import SuggestionList from "./components/SuggestionList"
import CountDown from "./components/countDown"
import firebase from "firebase"
import Result from "./components/result"
import { NO_ROOM_FOUND } from "../constants/errorCodes"

export default class RoomPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roomId: undefined,
      expirationTime: undefined,
      disabled: false
    }
  }
  componentDidMount() {
    const roomId = getQueryParameter("room")
    this.setState({ roomId })
    firebase
      .database()
      .ref("rooms/" + roomId + "/expires")
      .once("value")
      .then(snapshot => {
        const expirationTime = snapshot.val()
        this.setState({ expirationTime })
        if (!expirationTime) {
          window.location.href = "/?errorCode=" + NO_ROOM_FOUND
        }
      })
  }

  onVotingFinished = () => {
    this.setState({ disabled: true })
  }

  render() {
    return (
      <div style={styles.container}>
        {this.state.disabled ? (
          <Result />
        ) : (
          <div>
            <div style={styles.headerSection}>
              <h3>
                Vote session name: &nbsp;
                {this.state.roomId}
              </h3>
              <div>
                <CountDown
                  seconds={
                    (this.state.expirationTime -
                      new Date(Date.now()).getTime()) /
                    1000
                  }
                  onComplete={() => this.onVotingFinished()}
                />
              </div>
            </div>
            <div style={styles.pageContent}>
              <Question roomId={this.state.roomId} />
            </div>
            <div style={styles.pageContent}>
              <SuggestionList style={StyleSheet.suggestionList} />
              <AddSuggestion />
            </div>
          </div>
        )}
      </div>
    )
  }
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  disabledStyle: {
    backgroundColor: "#af3333"
  },
  suggestionList: {
    alignItems: "center"
  },
  pageContent: {
    display: "flex",
    flex: 1,
    flexDirection: "column"
  },
  headerSection: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "10%",
    marginRight: "10%"
  }
}
