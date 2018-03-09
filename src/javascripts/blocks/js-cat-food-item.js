document.addEventListener("DOMContentLoaded", function(event) {

  var list = document.querySelectorAll('.js-cat-food-item');

  Array.prototype.forEach.call(list, function(element) {
    var wrapper = element.querySelector('.js-cat-food-wrapper');
    var link = element.querySelector('.js-cat-food-link');
    setupMouseEvents(link, element);
    setupMouseEvents(wrapper, element);
  });

  function setupMouseEvents(em, rootEm) {
    em.addEventListener('click', selectItem.bind(rootEm), false);
    em.addEventListener('mouseleave', removeNotHover.bind(rootEm), false);
  }

  function selectItem (e) {
    e.preventDefault();
    if (this.classList.contains('cat-food-item_disabled')) {
      return;
    }
    this.classList.toggle('cat-food-item_selected');
    this.classList.add('cat-food-item_not-hover');
  }

  function removeNotHover () {
    this.classList.remove('cat-food-item_not-hover');
  }
});
