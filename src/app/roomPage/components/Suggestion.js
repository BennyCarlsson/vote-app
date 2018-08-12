import React from "react"
import { List, Icon } from "semantic-ui-react"
import firebase from "firebase"
import { getQueryParameter } from "../../utils/urlParser"

export default class Suggestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: ""
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userId: user.uid })
      }
    })
  }

  onPlacingVote() {
    const ref = firebase
      .database()
      .ref(
        "rooms/" +
          getQueryParameter("room") +
          "/suggestions/" +
          this.props.suggestionId +
          "/votes"
      )
    ref.push(this.state.userId)
  }

  render() {
    return (
      <List.Item
        style={StyleSheet.container}
        onClick={() => this.onPlacingVote()}
      >
        <Icon name="thumbs up outline" />
        <List.Content>
          <List.Header>
            {this.props.text} &nbsp;&nbsp;&nbsp;{" "}
            {Object.keys(this.props.votes).length}
          </List.Header>
        </List.Content>
      </List.Item>
    )
  }
}

const styles = {
  container: {
    fontSize: "2em"
  }
}
