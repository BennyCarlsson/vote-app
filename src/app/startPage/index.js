import React from "react"
import { Divider } from "semantic-ui-react"
import FindVoteInput from "./components/FindVoteInput"
import CreateVoteButton from "./components/CreateVoteButton"

export default class StartPage extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <div>
          <CreateVoteButton changePage={this.props.changePage} />
        </div>
        <div>
          <Divider horizontal>or join a vote</Divider>
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
  }
}
