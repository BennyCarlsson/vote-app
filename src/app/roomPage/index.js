import React from "react"
import { Input } from "semantic-ui-react"
import firebase from "firebase"
import { getQueryParameter } from "../utils/urlParser"

export default class RoomPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roomId: undefined,
      question: "",
      roomRef: undefined
    }
  }
  componentDidMount() {
    const roomId = getQueryParameter("room")
    this.setState({ roomId })
    this.initDatabaseSocket(roomId)
  }

  initDatabaseSocket = roomId => {
    const ref = firebase.database().ref("rooms/" + roomId)
    this.setState({ roomRef: ref })
    ref.on("value", snapshot => {
      const value = snapshot.val()
      this.setState({ question: value.question })
    })
  }

  onQuestionUpdate = question => {
    console.log("question ", question)
    this.state.roomRef.set({
      question
    })
  }

  render() {
    return (
      <div>
        <h1>Welcome to voting room {this.state.roomId}</h1>
        <Input
          size="massive"
          placeholder="Add question"
          defaultValue={this.state.question}
          onChange={event => this.onQuestionUpdate(event.target.value)}
        />
      </div>
    )
  }
}
