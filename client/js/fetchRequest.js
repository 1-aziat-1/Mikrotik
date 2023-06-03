// const URL = `http://localhost:3000`;

const fetchRequest = async (
  URL,
  method = 'GET',
  // headers,
  // body,
  data = null,
) => {
  try {
    console.log(URL);
    // const options = {
    //   method,
    // };


    // if (body) options.body = JSON.stringify(body);
    // if (headers) options.headers = headers;

    // const response = await fetch(URL, options);
    // if (response.ok) {
    //   const data = await response.json();
    //   console.log(data);
    //   if (callback) return callback(null, data, counter);
    // }
    const headers = {};
    let body;
    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }
    const response = await fetch(URL, {
      method,
      headers,
      body,
    });

    return await response.json();

    //throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  }catch (err) {
    console.warn(err.message);
  }
};

export default fetchRequest;

