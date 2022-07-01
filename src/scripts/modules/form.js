import { removeStyles } from "./styles.js";
import { getScript, insertCaptcha } from "./captcha.js";

if (typeof MktoForms2 !== "undefined") {
	MktoForms2.whenReady(() => {
		getScript("https://www.google.com/recaptcha/api.js?onload=onloadCallback");
	});

	MktoForms2.whenRendered((form) => {
		removeStyles(form);
	});

	window.onloadCallback = () => {
		MktoForms2.whenReady((form) => {
			insertCaptcha(form);
		});
	}
}
