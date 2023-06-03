const express = require('express');
const { default: axios } = require('axios');
const { Agent } = require('https');
const path = require('path');
const app = express();

const setting = {
  host: '192.168.0.20',
  user: 'admin',
  password: '123',
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

app.get('/api/print', (req, res) => {
  rosRest({
    host: '192.168.0.21',
    user: 'admin',
    password: '123',
    port: 443, // default 443
    secure: false, // default false
  }).print('ip/arp')
    .then((result) => {
      res.status(200).json(result.data);
    })
    .catch((err) => {
      res.status(404).json(err);
    })
});

app.post('/api/remove', (req, res) => {
  rosRest({
    host: '192.168.0.21',
    user: 'admin',
    password: '123',
    port: 443, // default 443
    secure: false, // default false
  }).remove(`ip/arp/*${req.body.id}`)
    .then((result) => {
      res.status(200).json(result.data);
    })
    .catch((err) => {
      res.status(404).json(err);
    })
  //   // .then((result) => {
  //   //   res.status(200).json(result.data);
  //   // })
  //   // .catch((err) => {
  //   //   res.status(200).json(err);
  //   // })
});

app.get('/api/connect', (req, res) => {
  res.status(200).json(res.data);
});


app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => console.log('Server has been started on port 3000...'));