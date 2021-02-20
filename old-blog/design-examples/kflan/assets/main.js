window.locations = [
  ".contact-page",
  ".main-page",
  ".about-page"
];
window.pageDesc = [
  'Contact',
  'Home',
  'About'
];
window.currentLoc = 1;

function placeCorrectDescribers() {
  let curr = window.currentLoc;
  // get +1
  let right = (curr >= window.locations.length-1)? "...": window.pageDesc[curr+1];
  let left  = (curr == 0)? "...": window.pageDesc[curr-1];
  $('.right-describer').html(right);
  $('.left-describer').html(left);
}
function moveRight() {
  // moving +1 in queue
  let currentLoc = window.currentLoc;
  // error-safety
  if (currentLoc >= window.locations.length-1) {
    console.log("too far, not possible to go further right");
    return false;
  }
  // performing change
  window.currentLoc += 1;
  pushFromCurrentLoc("right");
}

function moveLeft() {
  // moving -1 in queue
  let currentLoc = window.currentLoc;
  // error-safety
  if (currentLoc == 0) {
    console.log("too far, not possible to go further left");
    return false;
  }
  // performing change
  window.currentLoc -= 1;
  pushFromCurrentLoc("left");
}

function pushFromCurrentLoc(direction=false) {
  let currentLoc = window.currentLoc;
  pushClass(window.locations[currentLoc], direction=direction);
}

function pushClass(className, direction=false) {
  if (direction !== false) {
    // means we have to do fancy animations...
    if (direction === "left") var antidirection = "right";
    if (direction === "right") var antidirection = "left";

    $('.main').effect('slide', { direction: antidirection, mode: 'hide', duration: 300 });
    $('.main').effect('slide', { direction: direction, mode: 'show', duration: 300 });
    setTimeout(function(){
      $('.main').html( $(className).html() );
    }, 300);
  }
  else {
    $('.main').html('');
    $('.main').html( $(className).html() );
  }
  setTimeout(placeCorrectDescribers, 300);
}

$(document).ready(() => {

    // normal load, getting content desired
    let currentContentClass = window.locations[window.currentLoc];
    // alert(currentContentClass);
    pushClass(currentContentClass);

    $(document).on('click', '.right', moveRight);
    $(document).on('click', '.left', moveLeft);

    // var hammertime = new Hammer($('html')[0]);
    // $('html').on('swiperight', (event) => {
    //   alert("swiped right");
    // });
    $('body').swipe({
      swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
        console.log(`moved in ${direction}`);
        if (direction == "left") moveRight();
        else if (direction == "right") moveLeft();
      },
      threshold: 0
    });


    $('.left').hover(
      (event) => { // in
        $('.left-describer').css({"left":"20px"});
      },
      (event) => { // out
        $('.left-describer').css({"left":"-150px"});
      }
    )
    $('.right').hover(
      (event) => { // in
        $('.right-describer').css({"right":"20px"});
      },
      (event) => { // out
        $('.right-describer').css({"right":"-150px"});
      }
    )

});
