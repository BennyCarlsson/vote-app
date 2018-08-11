import React from "react"
import { List, Icon } from "semantic-ui-react"

export default class Suggestion extends React.Component {
  render() {
    return (
      <List.Item
        style={StyleSheet.container}
        onClick={() => console.log(this.props.suggestionId)}
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
