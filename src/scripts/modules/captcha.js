export function getScript(url, cb) {
	let script = document.createElement('script');
	script.async = script.defer = true;
	script.src = url;
	document.head.appendChild(script);

	script.onload = script.onreadystatechange = (_, isAbort) => {
		if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
			script.onload = script.onreadystatechange = null;
			script = undefined;

			if (!isAbort && cb) setTimeout(cb, 0);
		}
	}
}

export function insertCaptcha(form) {
	const formEl = form.getFormElem()[0];
	const GOOGLE_RECAPTCHA_KEY = '6Lf2eUQUAAAAAC-GQSZ6R2pjePmmD6oA6F_3AV7j';
	
	if (formEl && grecaptcha) {
		let divEl = document.createElement('div');
		let widgetId = grecaptcha.render(divEl, {sitekey: GOOGLE_RECAPTCHA_KEY});
		const buttonRow = formEl.querySelector('.mktoButtonRow');
		const button = buttonRow.querySelector('.mktoButton');
	
		const submitHandler = (event) => {
			const recaptchaResponse = grecaptcha && grecaptcha.getResponse(widgetId);
			event.preventDefault();
	
			if (form.validate()) {
				if (!recaptchaResponse) {
					divEl.setAttribute('data-error', 'true');
				} else {
					divEl.setAttribute('data-error', 'false');
					form.addHiddenFields({ reCAPTCHAFormResponse: recaptchaResponse });
					form.submit();
				}
			}
		}
		
		divEl.setAttribute('data-widget-id', widgetId);
		divEl.classList.add('g-recaptcha');
	
		if (button) {
			button.addEventListener('click', submitHandler);
		}
	
		if (buttonRow) {
			formEl.insertBefore(divEl, buttonRow);
		}
	}
}
