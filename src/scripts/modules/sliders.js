// import { tns } from "tiny-slider";

// Slider #1
const tns1 = tns({
	container: '.work__slider',
	items: 1,
	gutter: 16,
	controls: false,
	nav: true,
	navPosition: 'bottom',
	loop: false,
	responsive: {
		640: {
			items: 2,
			gutter: 32,
		},
		1024: {
			disable: true
		}
	}
});

// Slider #2
const tns2 = tns({
	container: '.features__slider',
	items: 1,
	gutter: 32,
	controls: false,
	nav: true,
	navPosition: 'bottom',
	loop: false,
	responsive: {
		576: {
			items: 2,
		},
		768: {
			items: 3,
		},
		1024: {
			disable: true
		}
	}
});

// Slider #3
const tns3 = tns({
	container: '.slider',
	gutter: 32,
	nav: true,
	navPosition: 'bottom',
	navAsThumbnails: true,
	controlsText: ['', ''],
	loop: true,
	disable: true,
	responsive: {
		640: {
			disable: false,
			items: 2,
		},
		960: {
			items: 3
		},
	}
});
