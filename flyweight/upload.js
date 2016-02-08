/*
 * 享元模式完成文件上传
 */

function Upload (uploadType) {
  this.uploadType = uploadType;
}

Upload.prototype.delFile = function (id) {
  uploadManager.setExternalState(id, this);

  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom);
  } else {
    if (window.confirm('Are you sure to delete the file?' + this.fileName)) {
      return this.dom.parentNode.removeChild(this.dom);
    }
  }
};

UploadFactory = (function () {
  var flyweightObjs = {};

  return {
    create: function (fileType) {
      return flyweightObjs[fileType] || (flyweightObjs[fileType] = new Upload(fileType));
    }
  }
})();

var uploadManager = (function () {
  var uploadObjs = {};

  return {
    add: function (id, fileType, fileSize, fileName) {
      var upload = UploadFactory.create(fileType);
      var dom = document.createElement('div');
      dom.innerHTML =
           '<span>file name: ' + fileName + ', file size: ' + fileSize + '</span>' +
           '<button class="delFile">delete</button>';

      dom.querySelector('.delFile').onclick = function () {
        upload.delFile(id);
      };

      document.body.appendChild(dom);

      uploadObjs[id] = {
        fileName: fileName,
        fileSize: fileSize,
        dom: dom,
      };

      return upload;
    },
    setExternalState: function (id, flyweightObj) {
      var upload = uploadObjs[id];
      for (var i in upload) {
        flyweightObj[i] = upload[i];
      }
    }
  }
})();

var id = 0;

window.startUpload = function (uploadType, files) {
  for (var i = 0, file; file = files[i++]; ) {
    uploadManager.add(++id, uploadType, file.fileSize, file.fileName);
  }
};

startUpload('plugin', [
  {
    fileName: '1.txt',
    fileSize: 1000,
  },
  {
    fileName: '2.txt',
    fileSize: 2000,
  },
]);

startUpload('flash', [
  {
    fileName: '3.txt',
    fileSize: 1500,
  },
  {
    fileName: '4.txt',
    fileSize: 2000,
  },
]);
