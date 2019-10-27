// 1. for all .obsertext divs, iter rep

$('.obsertext').each((index, elem) => {
  $elem = $(elem);
  // 1. get inner html
  // 2. split by " "
  // 3. map "<span>" wrapper
  // 4. re-join, and re-place html
  let text = $elem.html().replace(/(\r\n|\n|\r)/gm, "");
  let spit = text.split(" ");
  let wrapped = spit.map(elem => {
    if (elem == "") return "";
    return `<span class='obsword'>${elem}</span>`;
  });
  let combine = wrapped.join(" ");
  $elem.html(combine);
});

function observableText() {
  $all = $('.obsword').filter(":onScreen");
  const constructedOb = [];
  $all.each((index, elem) => {
    $span = $(elem);
    let word = $span.html();
    constructedOb.push(word);
  });
  return constructedOb.join(" ");
}
setInterval(function(){
  console.clear();
  console.log(observableText());
}, 1000);
