/* eslint-env jquery, browser */
$(document).ready(() => {
  // Place JavaScript code here...
  $('#submit-btn').on('click', async () => {
    const route = await getURL();
    if(route)
    {
      const urlEl = `<p>Your shortened route is: ${route}</p>`
      $("body").append(urlEl);
    }
  });
});

async function getURL() {
  const response = await fetch("/url")
  const {route: data} = await response.json();
  return data ?? undefined;
}