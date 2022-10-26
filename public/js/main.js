/* eslint-env jquery, browser */
$(document).ready(() => {
  // Place JavaScript code here...
  $('#submit-btn').on('click', async () => {
    $('#error-message').addClass('invisible');
    $('#error-message').addClass('d-none');
    $('#result').addClass('invisible');
    $('#result').addClass('d-none');

    const userLongURL = $('input[name="longUrl"]').val();
    const currentUserEmail = $('p#currentUserEmail').text();

    const {
      error, message,
      slug, longUrl, shortUrl, clickCounter, date
    } = await getURL(userLongURL, currentUserEmail);

    console.log(error);
    console.log(message);

    if (error) {
      $('#error-message').removeClass('invisible');
      $('#error-message').removeClass('d-none');
      $('#error-message').text("⚠️ " + message);
      return;
    }

    $('#result').removeClass('invisible');
    $('#result').removeClass('d-none');

    $('#shortUrl').text(slug);
    // $("body").append(slugEl, shortURLEl, longURLEL, clickCounterEl, dateEl);
  });
});

async function getURL(userURL, currentUserEmail) {
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({longUrl: userURL, user: currentUserEmail})
  }
  const response = await fetch("/shorten", options)

  const json = await response.json();
  
  return json;
}