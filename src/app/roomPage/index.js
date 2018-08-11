import React from "react"
import firebase from "firebase"
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
      <div>
        <h1>Welcome to voting room {this.state.roomId}</h1>
        <Question roomId={this.state.roomId} />
        <SuggestionList style={StyleSheet.suggestionList} />
        <AddSuggestion />
      </div>
    )
  }
}

const styles = {
  suggestionList: {
    alignItems: "center"
  }
}
