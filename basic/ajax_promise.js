function request (url, type, data) {
  return new Promise ((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    type = type.toUpperCase();
    let ret = '';
    for (let key in data) {
      ret += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}&`;
    }
    let random = Math.random();

    if (type === 'GET') {
      xhr.open(type, `${url}?${ret}${random}`);
      xhr.send();
    } else {
      xhr.open(type, url);
      xhr.setRequestHeader('Content-type', 'x-www-form-urlencoded');
      xhr.send(ret);
    }

    xhr.onreadystatechange = function (res) {
      if (xhr.readystate === 4) {
        if (res.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.status);
        }
      }
    }
  });
}