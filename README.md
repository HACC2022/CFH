<h1 align="center">Menehune URL Compressor</h1>

<div align="center">
	:moyai:
</div>
<div align="center">
  <strong>Developed by Team CFH</strong>
</div>

<div align="center">
  <h3>
  	<a href="https://menehune.azurewebsites.net/">
      Website
    </a>
  	<span> | </span>
    <a href="https://devpost.com/software/cfh">
      Devpost
    </a>
  </h3>
</div>

### Philosophy
External URL shorteners are blocked by the states network due to people using the service to send malicious links. Menehune URL Shortener was created to help increase trust and transparency when using a URL shortener.

### Overview Solution
Menehune is a URL shortening service with a focus on security and transparency. We offer transparency through open-sourcing the code and we offer security through malware detection and user accountability.

### Technical Details 
This web application was built using HTML, CSS, & JavaScript and hosted with Azure. The front-end used Pug as our templating language and Bootstrap for our styling. We used NodeJS and Express to create our back-end and used MongoDB with Mongoose for our storage.

#### Prerequisites
* Install [Git](https://git-scm.com/downloads)
* Install [Node.js (with npm)](https://nodejs.org/en/download/).

#### Setup
* `git clone` this repository

```bash

npm install # Install the required npm modules

npm start
```

Go to `http://localhost:8080/` and create an account.
or
Login using these test credentials:
```
username: admin@gmail.com
password: password

username: test@gmail.com
password: password
```

The `Shortener` category is where you will be able to compress your URL. 
You may provide an alias to customize the name of the compressed link.

The `Urls` category is a dashboard containing all the compressed links. 
You may edit or delete compressed links here.

The `Console` category is the admin area containing a map & graph of where compressed links redirect to. It contains statistics on how many compressed links are http vs https.