export function swapNodes(elem1, elem2) {
	elem1.replaceWith(elem2);
	elem2.parentNode.insertBefore(elem1, elem2.nextSibling);
}
