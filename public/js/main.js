/* eslint-env jquery, browser */
$(document).ready(() => {
  // Place JavaScript code here...
  $('#submit-btn').on('click', async () => {
    const userLongURL = $('input[name="longUrl"]').val();
    const route = await getURL(userLongURL);
    if(route)
    {
      const urlEl = `<p>Your shortened route is: ${route}</p>`
      $("body").append(urlEl);
    }
  });
});

async function getURL(userURL) {
  const options = {
    method: "POST",
    mode: "no-cors",
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body:JSON.stringify({userRoute: userURL})
  }
  const response = await fetch("/url", options)
  const {route: data} = await response.json();
  return data ?? undefined;
}