function Ajax (type, url, data, success, fail) {
  var xhr = null;

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject();
  }

  type = type.toUpperCase();

  var random = Math.random();

  var dataString = '';
  if (typeof(data) == 'object') {
    for (var key in data) {
      dataString += key + '=' + data[key] + '&';
    }
    dataString = dataString.replace(/&$/, '');
  }
  

  if (type == 'GET') {
    if (data) {
      xhr.open(type, url + '?' + dataString, true);
    } else {
      xhr.open(type, url + '?t=' + random);
    }
    xhr.send();
  } else {
    xhr.open(type, url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(dataString);
  }

  xhr.onreadystatechange = function (res) {
    if (xhr.readystate == 4) {
      if (xhr.status == 200) {
        success(xhr.responseText);
      } else {
        if (fail) {
          fail(xhr.status);
        }
      }
    }
  }
}
