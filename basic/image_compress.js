async function compress (base64, quality, mimeType) {
    const canvas = document.createElement('canvas');
    const img = document.createElement('img');
    img.crossOrigin = 'anonymous';
    return new Promise((resolve, reject) => {
        img.src = base64;
        img.onload = (e) => {
            const ctx = canvas.getContext('2d');
            const targetWidth = img.width;
            const targetHeight = img.height;
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            ctx.clearRect(0, 0, targetWidth, targetHeight);
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
            let imageData = canvas.toDataURL(mimeType, quality / 100);
            resolve(imageData);
        }
    });
}

function dataUrlToBlob (base64, mimeType) {
    const bytes = window.atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; ++i) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeType});
}

function uploadFile (url, blob) {
    const formData = new FormData();
    const request = new XMLHttpRequest();
    formData.append('image', blob);
    request.open('POST', url, true);
    request.send(formData);
}


// <input type="file" accept="image/*" onchange="loadFile(event)" />
function loadFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = async function (e) {
        const compressDataUrl = await compress(fileReader.result, 90, 'image/jpeg');
        const compressBlob = dataUrlToBlob(compressDataUrl, 'image/jpeg');
        uploadFile('/xxx', compressBlob);
    }
    fileReader.readAsDataURL(event.target.files[0]);
}