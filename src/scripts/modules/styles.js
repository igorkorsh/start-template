import { swapNodes } from "./swap-nodes.js";

export function removeStyles(mktoForm, cb) {
	const _array_from = getSelection.call.bind([].slice);
	const formEl = mktoForm.getFormElem()[0];
	const inlineStyles = _array_from(formEl.querySelectorAll("[style]")).concat(formEl);
	const styleSheets = _array_from(document.styleSheets);
	const styleEl = formEl.querySelector("style");
	const textFields = _array_from(formEl.querySelectorAll('.mktoField.mktoHasWidth'));

	// Удаляем инлайновые стили
	inlineStyles.forEach((attr) => attr.removeAttribute("style"));

	// Отключаем стили по умолчанию
	styleSheets.forEach((elem) => {
		if ([mktoForms2BaseStyle, mktoForms2ThemeStyle].indexOf(elem.ownerNode || elem.ownerNode.previousSibling) != -1 || formEl.contains(elem.ownerNode)) {
			elem.disabled = true
		}
	});

	// Удаляем тег <style> внутри формы
	styleEl.parentNode.removeChild(styleEl);

	// Меняем местами элементы label и input. Добавляем атрибут placeholder к элементам формы, если он отсутствует
	textFields.forEach((elem) => {
		const label = elem.parentNode.querySelector("label[for]");
		const labelName = label.textContent.split("*")[1].split(":")[0];

		if (!elem.placeholder) {
			elem.placeholder = labelName;
		} else {
			label.textContent = elem.placeholder
		}
	
		swapNodes(label, elem);
	});

	if (!cb) {
		formEl.classList.add('mktoFormReady');
	}
}
