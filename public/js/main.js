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
    const userSlug = $('input[name="slug"]').val();

    const {
      error, message,
      slug, longUrl, shortUrl, clickCounter, date
    } = await getURL(userLongURL, currentUserEmail, userSlug);

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
    $('#copy-btn').removeClass('invisible');
    $('#copy-btn').removeClass('d-none');

    $('#shortUrl').text(shortUrl);
    // $("body").append(slugEl, shortURLEl, longURLEL, clickCounterEl, dateEl);

  });

  $("#copy-btn").on("click", () => {
    const copyText = document.getElementById("shortUrl").innerText;

    const textareaEl = document.createElement("textarea")
    textareaEl.value = copyText;
    // Select the text field
    textareaEl.select();
    textareaEl.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(textareaEl.value);

    // Alert the copied text
    alert("Copied the text: " + textareaEl.value);

    textareaEl.remove();

  })

  $("[id^=copyUrlBtn]").on("click", (e) => {
    const urlID = e.currentTarget.id
    const indexNum = urlID.substring(urlID.lastIndexOf("-") + 1, urlID.length);
    const link = $(`#shortLink-${indexNum}`).prop("href");
    navigator.clipboard.writeText(link);
    alert("Copied the text: " + link);
  })

});

async function getURL(userURL, currentUserEmail, userSlug) {
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ slug: userSlug, longUrl: userURL, user: currentUserEmail, })
  }
  console.log(userSlug);
  const response = await fetch("/shorten", options)

  const json = await response.json();

  return json;
}