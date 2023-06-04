// const URL = `http://localhost:3000`;

const fetchRequest = async (
  URL,
  method = 'GET',
  data = null,
) => {
  try {

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
  }catch (err) {
    console.warn(err.message);
  }
};

export default fetchRequest;

