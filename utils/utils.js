exports.validateUrl = (value) => {
  var regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  return regexp.test(value)
}

const fileNotDenyListed = (url) => {
  const denylist = [
    'deepMiner.js',
    'deepMiner.min.js',
    'crypto-js.min.js',
    'cryptonight.js',
    'coin-hive.js',
    'coin-hive.min.js',
    'rockyou.txt',
    'darkc0de.lst'
  ];

  const filename = url.split('/').pop();

  if (denylist.includes(filename)) {
    return "That URL redirects to a known malicious file";
  }

  return true;
};

const urlNotDenylisted = (url) => {
  const denylist = [
    "menehune.azurewebsites.net", // Prevent recursive shortening
    "4chan.org", // Hackers known as 4chan
    "localhost" // Prevent self destruction
  ];

  let urlObj = {};
  try {
    urlObj = new URL(url);
  } catch (err) {
    return 'Invalid URL';
  }

  if (denylist.includes(urlObj.hostname) || denylist.includes(urlObj.host)) {
    return "That URL domain is banned";
  }

  return true;
}

const validators = [
  urlNotDenylisted,
  fileNotDenyListed
];

exports.isUrlValid = (longUrl) => {
  if (!this.validateUrl(longUrl)) {
    return {status: 401, error: true, message: "Invalid Url"}
  }
  for (const validator of validators) {
    const validationResult = validator(longUrl);
    if (validationResult !== true) {
      return {status: 400, error: true, message: validationResult}
    }
  }
  return true;
}