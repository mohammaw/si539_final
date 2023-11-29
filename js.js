function createWindow({
  id,
  content,
  title,
  windowStatus,
  onWindowClose,
  onWindowExpand,
  style = {}
}) {
  const _style = {
    width: 'auto',
    height: 'auto',
    bottom: 32,
    top: 0,
    display: 'block',
    position: 'fixed',
    ...style
  }

  const $section = $(`<section class="app">`)
  $section.css(_style);


  $section.click(function() {
    let zIndex = findMaxZIndex() +1 ;

      console.log( {zIndex})
    $section.css('z-index', zIndex)
  });

  $section.attr('id', id);
  $section.html(`
  <header class="titlebar">
  <div class="title">
    <div class="pull-right close expand" >
      <button class="minimize" id="minimize1" aria-label="minimize"><span class="fa fa-minus"></span></button>
      <button class="square" id="square1" aria-label="maximize"><span class="fa fa-square-o"></span></button>
      <button class="times" id="times1" aria-label="close"><span class="fa fa-times"></span></button>
    </div>
    <h1>
      <div class="icon-my-computer">${title}</div>
    </h1>
  </div>
  <ul class="toolbar">
    <li><u>F</u>ile</li>
    <li><u>E</u>dit</li>
    <li><u>V</u>iew</li>
    <li><u>H</u>elp</li>
  </ul>
</header>
<nav class="toolbars-container">
  <div class="toolbar menubar has-grip">
    <div class="statusbar">
      <div class="left">${windowStatus}</div>
    </div>
  </div>
</nav>
<div class="window-content">${content}</div>
`);

  const $close = $('.close button.times', $section);
  $close.click(onWindowClose);

  const $expand = $('.expand button.square', $section);
  $expand.click(function(e) {
    e.preventDefault();
    $($section).toggleClass('fullscreen');
  });

  const $minimize = $('.close button.minimize', $section);
  $minimize.click(function(e) {
    e.preventDefault();
    $($section).hide();
  });

  return $section;
}

function createStartButton({
  id,
  title
}) {
  const $button = $('<button class="start-button-pages">');
  $button.attr('id', id);
  $button.text(title);
  return $button;
}

function attachWindowWithButton($window, $startButton) {
  $startButton.click(function(e) {
    e.preventDefault();
    if ($($window).is(':visible')) {
      $($window).hide();
    } else {
      $($window).show();
    }
  });
}

function showWindowOnDesktop($window, $startButton) {
  const $desktop = $('.desktop');
  const zIndex = findMaxZIndex() + 1;
  $($window).css('z-index', zIndex);
  $desktop.append($window);

  const $startMenu = $('.menu-starter');
  $startMenu.append($startButton);
}

function createWindowAndShowOnDesktop({
  id,
  title,
  content,
  windowStatus,
  windowStyle
}) {
  if ($(`section#${id}`).length) {
    return;
  }
  const $startButton = createStartButton({
    id: id,
    title: title,
  });
  const $window = createWindow({
    id: id,
    title: title,
    windowStatus: windowStatus,
    content: content,
    style: windowStyle,
    onWindowClose: function(e) {
      e.preventDefault();
      $($window).remove();
      $($startButton).remove();
    },
    onWindowExpand: function(e) {
      e.preventDefault();
      $($window).remove();
      $($startButton).remove();
    }
  });
  $($window).draggable({
    handle: '.titlebar'
  });
  $($window).click(function() {
    $($window).removeClass('active');
    $(this).addClass('active');
  });
  attachWindowWithButton($window, $startButton);
  showWindowOnDesktop($window, $startButton);
}

createWindowAndShowOnDesktop({
  id: 'readmedoc',
  title: 'Readme',
  content: `
	<div class="readme">
		<h3>Welcome to my portfolio</h3>
		<div class="readme-text">
		<p style='font-size:12px'>
            				I'm a 2nd Year MHI student. This was created for my SI 539 Final Project. My current portfolio is a Windows95
            				operating system theme. I chose this OS because it was one of the first OS I operated on.
            				At the same time, I was clicking through the Windows95 emulator, appreciating the
            				easy/simple usability it had. It is still a work in progress.
      </p>
			<h5 style='margin-bottom:0'>Existing Features:</h5>
            			<p style='font-size:12px'>
            				Resizing windows (bottom right corner) <br>
            				Dragging windows <br>
                    Responsive windows tab when closing out <br>
            				Closing/opening out of windows <br>
                    Maximizing windows <br>
      </p>

	</div>
	`,
  windowStatus: 'Readme',
  windowStyle: {
    width: 390,
    height: 502,
    left: 10,
    top: 4,
    display: 'block',
    position: 'fixed'
  }
});

function handleMHSIconClick() {
  createWindowAndShowOnDesktop({
    id: 'MHS',
    title: 'MHS',
    content: `<iframe src='media/MHS_Final_Brand-Guideline.pdf' style='width:100%'></iframe>`,
    windowStatus: 'MHS',
    windowStyle: {
      width: 550,
      height: 262,
      left: 257,
      top: 119,
      display: 'block',
      position: 'fixed'
    }
  });
}

createWindowAndShowOnDesktop({
  id: 'resume',
  title: 'My Resume',
  content: `<iframe src="media/Resume 2023.pdf" style="width:100%" aria-label='resumes'></iframe>`,
  windowStatus: 'Updated resume',
  windowStyle: {
    width: 550,
    height: 262,
    left: 489,
    top: 23,
    display: 'block',
    position: 'fixed'
  }
});

function updateTime() {
  const currentTimeElement = document.getElementById('current-time');
  const currentDateTime = moment().format('h:mm A');
  currentTimeElement.textContent = currentDateTime;
}

window.onload = function () {
  updateTime();
  setInterval(updateTime, 1000);
}



