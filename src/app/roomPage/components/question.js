import React from "react"
import { Input } from "semantic-ui-react"
import firebase from "firebase"
import { getQueryParameter } from "../../utils/urlParser"

export default class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: "",
      roomRef: undefined
    }
  }

  componentDidMount() {
    this.initDatabaseSocket()
  }

  initDatabaseSocket = () => {
    const ref = firebase.database().ref("rooms/" + getQueryParameter("room"))
    this.setState({ roomRef: ref })

    ref.on("value", snapshot => {
      const value = snapshot.val()
      this.setState({ question: value.question })
    })
  }

  onQuestionUpdate = question => {
    this.state.roomRef.update({
      question
    })
  }

  render() {
    return (
      <div>
        <Input
          style={styles.inputField}
          size="massive"
          placeholder="Add question"
          value={this.state.question}
          onChange={event => this.onQuestionUpdate(event.target.value)}
        />
      </div>
    )
  }
}

const styles = {
  inputField: {
    minWidth: "60%"
  }
}
