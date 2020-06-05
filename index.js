const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { simple, private } = require('./helpers/getToken');
const app = express();

//using middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));

function serveFile(name) {
  return path.join(__dirname + `/views/${name}.html`);
}

app.get('/', (req, res) => res.sendFile(serveFile('index')));

app.post('/centrifuge/refresh', (req, res) =>
  res.status(200).json({
    status: 200,
    token: simple
  })
);

app.post('/centrifuge/subscribe', (req, res) =>
  res.json({
    channels: req.body.channels.map(channel => ({
      channel: channel,
      token: private(req.body.client, channel)
    }))
  })
);

app.listen(3000, () => console.log('server is up at 3000'));
