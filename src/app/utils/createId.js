import firebase from "firebase"
import easyReadIds from "./easy-read-ids"

export const getNewId = async () => {
  // getIdSpaces = 111188000
  const newId = easyReadIds.generate(
    ["adjective", "color", "animal", "number"],
    100
  )
  let exists = false
  await firebase
    .database()
    .ref("rooms/" + newId)
    .once("value", snapshot => {
      if (snapshot.exists()) {
        exists = true
      } else {
        exists = false
      }
    })
  return exists ? getNewId() : newId
}
