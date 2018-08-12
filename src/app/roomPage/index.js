import React from "react"
import Question from "./components/question"
import AddSuggestion from "./components/AddSuggestion"
import { getQueryParameter } from "../utils/urlParser"
import SuggestionList from "./components/SuggestionList"

export default class RoomPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roomId: undefined,
      newQuestion: ""
    }
  }
  componentDidMount() {
    const roomId = getQueryParameter("room")
    this.setState({ roomId })
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.pageContent}>
          <h3>
            Vote session name: &nbsp;
            {this.state.roomId}
          </h3>
          <Question roomId={this.state.roomId} />
        </div>
        <div style={styles.pageContent}>
          <SuggestionList style={StyleSheet.suggestionList} />
          <AddSuggestion />
        </div>
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
  suggestionList: {
    alignItems: "center"
  },
  pageContent: {
    display: "flex",
    flex: 1,
    flexDirection: "column"
  }
}
