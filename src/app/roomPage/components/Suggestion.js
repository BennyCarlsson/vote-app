import React from 'react'
import { List, Icon } from 'semantic-ui-react'
import firebase from 'firebase'
import { getQueryParameter } from '../../utils/urlParser'
import colors from '../../constants/colors'

export default class Suggestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: ''
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
    const roomId = getQueryParameter('room')
    this.removeUsersLastVote()
    const addRef = firebase
      .database()
      .ref(
        'rooms/' + roomId + '/suggestions/' + this.props.suggestionId + '/votes'
      )
    addRef.push(this.state.userId)
  }

  removeUsersLastVote = () => {
    const roomId = getQueryParameter('room')
    firebase
      .database()
      .ref('rooms/' + roomId + '/suggestions/')
      .once('value')
      .then(snapshot => {
        const data = snapshot.val()
        Object.keys(data).forEach(key => {
          const suggestionObject = data[key]
          for (let voteId in suggestionObject.votes) {
            if (suggestionObject.votes[voteId] === this.state.userId) {
              firebase
                .database()
                .ref(
                  'rooms/' + roomId + '/suggestions/' + key + '/votes/' + voteId
                )
                .remove()
            }
          }
        })
      })
  }

  render() {
    return (
      <List.Item
        className="cardShadow"
        style={{
          ...styles.container,
          ...{
            backgroundColor: Object.keys(this.props.votes).length
              ? colors.PRIMARY_TRANSPARENT
              : '#ffffff'
          }
        }}
        onClick={() => this.onPlacingVote()}
      >
        <Icon name="thumbs up outline" />
        <List.Content style={styles.content}>
          <List.Header>
            {this.props.text} &nbsp;&nbsp;&nbsp;{' '}
            {Object.keys(this.props.votes).length}
          </List.Header>
        </List.Content>
      </List.Item>
    )
  }
}

const styles = {
  container: {
    fontSize: '2em',
    margin: '2px',
    borderRadius: '5px',
    padding: '5px',
    paddingLeft: '15px',
    display: 'flex',
    minWidth: '350px'
  },
  content: {}
}
