import React from "react"
import { List, Icon } from "semantic-ui-react"
import firebase from "firebase"
import { getQueryParameter } from "../../utils/urlParser"

export default class Suggestion extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}

  onPlacingVote() {
    const ref = firebase
      .database()
      .ref(
        "rooms/" +
          getQueryParameter("room") +
          "/suggestions/" +
          this.props.suggestionId
      )
    ref.update({ votes: this.props.votes + 1 })
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
            {this.props.text} &nbsp;&nbsp;&nbsp; {this.props.votes}
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
