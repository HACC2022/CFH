/* eslint-env jquery, browser */
$(document).ready(() => {
  // Place JavaScript code here...
  $('#submit-btn').on('click', async () => {
    const userLongURL = $('input[name="longUrl"]').val();
    const {slug, longUrl, shortUrl, clickCounter, date} = await getURL(userLongURL);

      const slugEl = `<p>Slug is: ${slug}</p>`
      const shortURLEl = `<p>ShortUrl is: ${shortUrl}</p>`
      const longURLEL = `<p>longUrl is: ${longUrl}</p>`
      const clickCounterEl = `<p>ClickCounter is: ${clickCounter}</p>`
      const dateEl = `<p>Date is: ${date}</p>`
      $("body").append(slugEl, shortURLEl, longURLEL, clickCounterEl, dateEl);
  });
});

async function getURL(userURL) {
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({longUrl: userURL})
  }
  const response = await fetch("/shorten", options)
  
  return await response.json();
}