
  function findMaxZIndex() {
    const $sections = Array.from($('section.ui-draggable'));
    const maxZIndex = $sections.reduce((zIndex, $section) => {
      let _zIndex = parseInt($($section).css('z-index'));
      if (isNaN(_zIndex)) {
        _zIndex = 1;
      }
      return _zIndex > zIndex ? _zIndex : zIndex;
    }, -1);
    return maxZIndex;
  }
