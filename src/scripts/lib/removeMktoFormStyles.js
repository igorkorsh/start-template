const removeMkFormStyles = (obj, ready) => {
  const form = obj.getFormElem()[0];
  const inlineStyles = Array.from(form.querySelectorAll('[class*="mkto"][style]')).concat(form);
  const styleSheets = Array.from(document.styleSheets);
  const extraElements = form.querySelectorAll('.mktoClear, .mktoGutter, .mktoOffset')

  inlineStyles.forEach(elem => {
    elem.removeAttribute('style')
  });

  styleSheets.forEach(ss => {
    if (([mktoForms2BaseStyle, mktoForms2ThemeStyle].indexOf(ss.ownerNode) != -1 || form.contains(ss.ownerNode)) || (ss.ownerNode.previousSibling.id === "mktoForms2ThemeStyle")) {
      ss.disabled = 'true'
    }
  });

  extraElements.forEach(ee => {
    ee.parentNode.removeChild(ee);
  })

  if (!ready) {
    form.setAttribute('data-styles-ready', 'true');
  }
};

export default MktoForms2.whenRendered(obj => {
  removeMkFormStyles(obj);
});
