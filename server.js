const express = require('express');
const { default: axios } = require('axios');
const { Agent } = require('https');
const path = require('path');
const app = express();


const setting = {
  host: '',
  user: '',
  password: '',
  port: 443, // default 443
  secure: false, // default false
};

const rosRest = ({ host, port = 443, user, password, secure = false }) => {
  const instance = axios.create({
    httpsAgent: new Agent({ rejectUnauthorized: secure }),
    auth: {
      username: user,
      password,
    },
    baseURL: `https://${host}:${port}/rest`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return {
    print: (path) => instance.get(path),
    add: (path, body) => instance.put(path, body),
    set: (path, body) => instance.patch(path, body),
    remove: (path, body) => instance.delete(path, body),
    command: (path, body) => instance.post(path, body),
  };
};

app.use(express.json());

app.post('/api/connect', (req, res) => {
  console.log(req.body);
  setting.host  = req.body.ip;
  setting.user  =  req.body.login;
  setting.password  = req.body.password;
  res.status(201);
});


app.get('/api/print', (req, res) => {
  console.log(setting);
  rosRest(setting).print('ip/arp')
    .then((result) => {
      res.status(200).json(result.data);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
});

app.post('/api/remove', (req, res) => {
  rosRest(setting).remove(`ip/arp/*${req.body.id}`)
    .then((result) => {
      res.status(200).json(result.data);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
});

app.post('/api/add', (req, res) => {
  rosRest(setting).add(`ip/arp`,{
    address: req.body.ip,
    'mac-address': req.body.mac,
    interface: req.body.eth,
  })
    .then((result) => {
      res.status(200).json(result.data);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
});

app.post('/api/set', (req, res) => {
  rosRest(setting).set(`ip/arp/${req.body.id}`,{
    address: req.body.ip,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(200).json(err);
    })
});



app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => console.log('Server has been started on port 3000...'));