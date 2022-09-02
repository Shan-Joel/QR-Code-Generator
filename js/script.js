const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

form.addEventListener('submit', onGenerateSubmit);

function onGenerateSubmit(e) {
   e.preventDefault();

   clearUI();

   const url = document.getElementById('url').value;
   const size = document.getElementById('size').value;

   console.log(url, size);

   if (url === '') {
      alert('Please enter a URL');
   } else {
      showSpinner();

      setTimeout(() => {
         hideSpinner();
         generateQRCode(url, size);

         setTimeout(() => {
            const saveURL = qr.querySelector('img').src;
            createSaveBtn(saveURL);
         }, 50);
      }, 2000);
   }
}

const generateQRCode = (url, size) => {
   const qrcode = new QRCode('qrcode', {
      text: url,
      width: size,
      height: size,
   });
};

const isValidHttpUrl = (url) => {
   try {
      url = new URL(string);
   } catch (e) {
      alert('Enter a valid url');
   }

   return url.protocol === 'http:' || url.protocol === 'https:';
};

const showSpinner = () => {
   document.getElementById('spinner').style.display = 'block';
};

const hideSpinner = () => {
   document.getElementById('spinner').style.display = 'none';
};

const clearUI = () => {
   qr.innerHTML = '';
   const saveLink = document.getElementById('save-link');
   if (saveLink) {
      saveLink.remove();
   }
};

const createSaveBtn = (saveUrl) => {
   const link = document.createElement('a');
   link.id = 'save-link';
   link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
   link.href = saveUrl;
   link.download = 'qrcode';
   link.innerHTML = 'Download QR Code Image';
   document.getElementById('generated').appendChild(link);
};

hideSpinner();
