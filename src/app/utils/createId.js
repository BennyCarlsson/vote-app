import firebase from "firebase"

export const getNewId = async () => {
  let words = [
    "Teddybear",
    "Goldfish",
    "Killer",
    "Slayer",
    "Joker",
    "TheThird",
    "Eagle",
    "Freedom",
    "Mario",
    "ButterFly",
    "Flying",
    "Car",
    "Drunk",
    "Santa",
    "Rock",
    "Fast",
    "Jumping",
    "Super",
    "Awesome",
    "Ok",
    "Perfect",
    "Lame",
    "Salmon",
    "Bike",
    "Girl",
    "Boy",
    "Lord",
    "Dog",
    "Cat"
  ]
  const newId =
    words[Math.floor(Math.random() * words.length)] +
    words[Math.floor(Math.random() * words.length)] +
    words[Math.floor(Math.random() * words.length)]
  let exists = false
  await firebase
    .database()
    .ref("rooms/" + newId)
    .once("value", snapshot => {
      if (snapshot.exists()) {
        e.log(true)
        exists = true
      } else {
        exists = false
      }
    })
  return exists ? getNewId() : newId
}
