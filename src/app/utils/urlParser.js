export const getQueryParameter = parameter => {
  var urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(parameter)
}

export const addUrlParameter = (key, value) => {
  const newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?" +
    key +
    "=" +
    value
  window.history.pushState({ path: newurl }, "", newurl)
}
