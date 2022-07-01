const acc = document.querySelector(".accordion");
const accTrigger = acc.querySelector(".acc__trigger");
const accContent = acc.querySelector(".acc__content");

setBorderRadius(accTrigger, "8px");

accTrigger.addEventListener("click", (e) => {
	e.preventDefault();
	accTrigger.classList.toggle("acc__trigger--open");

	accHeight();

	if (accTrigger.classList.contains("acc__trigger--open")) {
		setBorderRadius(accTrigger, "0px");
	} else {
		setTimeout(function() {
			setBorderRadius(accTrigger, "8px")
		}, 200)
	}
});

window.addEventListener('resize', () => {
	if (!accTrigger.classList.contains("acc__trigger--open")) {
		accHeight();
	} 
});

function accHeight() {
	if (accContent.style.maxHeight) {
		accContent.style.maxHeight = null;
	} else {
		accContent.style.maxHeight = accContent.scrollHeight + "px";
	}
}

function setBorderRadius(el, value) {
	el.style.borderBottomLeftRadius = value;
	el.style.borderBottomRightRadius = value;
}
