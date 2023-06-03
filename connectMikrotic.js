const { default: axios } = require('axios');
const { Agent } = require('https');

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

const clientRosRest = rosRest({
  host: '192.168.0.20',
  user: 'admin',
  password: '123',
  port: 443, // default 443
  secure: false, // default false
});

clientRosRest
  .print('ip/arp')
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log('error:', err);
  });