const customFieldNumber = (obj) => {
  const form = obj.getFormElem()[0];
  const input = form.querySelectorAll('[type="number"]');

  input.forEach((elem) => {
    elem.insertAdjacentHTML('afterend', '<div class="quantity"><div class="quantity__btn quantity__btn--up">&plus;</div><div class="quantity__btn quantity__btn--down">&minus;</div></div>');

    const btnUp = elem.nextElementSibling.querySelector('.quantity__btn--up');
    const btnDown = elem.nextElementSibling.querySelector('.quantity__btn--down');
    const minValue = +elem.min;
    const maxValue = +elem.max;
    let initialValue = +elem.value || minValue;

    btnUp.addEventListener('click', (event) => {
      event.preventDefault();

      if (!maxValue) {
        initialValue += 1;
      } else {
        if (initialValue >= maxValue) {
          initialValue = maxValue
        } else {
          initialValue += 1;
        }
      }

      elem.value = initialValue;
    });

    btnDown.addEventListener('click', (event) => {
      event.preventDefault();
      if (!minValue) {
        initialValue -= 1;
      } else {
        if (initialValue <= minValue) {
          initialValue = minValue
        } else {
          initialValue -= 1;
        }
      }

      elem.value = initialValue;
    });
  });
}

export default MktoForms2.whenRendered(obj => {
  customFieldNumber(obj);
});
