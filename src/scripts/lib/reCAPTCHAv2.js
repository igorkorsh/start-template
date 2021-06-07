const getScript = (url, callback) => {
  let script = document.createElement('script');
  script.async = true;
  script.defer = true;

  script.onload = script.onreadystatechange = (_, isAbort) => {
    if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
      script.onload = script.onreadystatechange = null;
      script = undefined;

      if (!isAbort && callback) setTimeout(callback, 0);
    }
  };

  script.src = url;
  document.head.appendChild(script);
};

const GOOGLE_RECAPTCHA_SITE_KEY = '6Lf2eUQUAAAAAC-GQSZ6R2pjePmmD6oA6F_3AV7j';

const insertGoogleRecaptcha = (obj) => {
  const form = obj.getFormElem()[0];
  const buttonRow = form.querySelector('.mktoButtonRow');
  const button = buttonRow ? buttonRow.querySelector('.mktoButton') : null;
  const cDiv = document.createElement('div');

  const submitHandler = (event) => {
    const recaptchaResponse = grecaptcha && grecaptcha.getResponse();
    event.preventDefault();

    if (obj.validate()) {
      if (!recaptchaResponse) {
        cDiv.setAttribute('data-error', 'true');
      } else {
        cDiv.setAttribute('data-error', 'false');

        obj.addHiddenFields({
          reCAPTCHAFormResponse: recaptchaResponse
        });

        obj.submit();
      }
    }
  };

  if (form && window.grecaptcha) {
    cDiv.id = 'g-recaptcha-' + obj.getId();
    cDiv.classList.add('googleRecaptcha');

    if (button) {
      button.addEventListener('click', submitHandler);
    }

    if (buttonRow) {
      form.insertBefore(cDiv, buttonRow);
    };

    if (grecaptcha.render) {
      grecaptcha.render(cDiv, {
        'sitekey': GOOGLE_RECAPTCHA_SITE_KEY
      });
      form.style.display = '';
    };
  }
};

export default MktoForms2.whenReady(obj => {
  obj.getFormElem().get(0).style.display = 'none';
  getScript('https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit');

  window.onloadCallback = () => {
    insertGoogleRecaptcha(obj);
  };
});
