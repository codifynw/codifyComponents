var textArray = [
  'Hoàng BX mỗi ngày đều dành 5 phút để suy nghĩ về cuộc sống',
  'Cuộc sống thật tươi đẹp, vui sống khỏe có ích nhé các bạn',
]

function random(min, max) {
  return Math.random() * (max - min) + min
}

var times = 0
function changeText() {
  var getText = textArray[times]

  if (times == textArray.length - 1) {
    times = 0
  } else {
    times++
  }

  $('.split').text(getText)

  var text = $('.split')
  $(text).lettering()
  textConvert = $('.split').html()
  textConvert = textConvert.replace(/span/g, 'div')
  $('.split').html(textConvert)

  $('.split div').each(function (i) {
    $(this).addClass('characters')
    $(this).lettering()
    var width = $(this).find('span').outerWidth(true)
    var height = $(this).find('span').outerHeight(true)
    $(this).css('width', (width != 0 ? width + 1 : 10) + 'px')
    $(this).css('height', height + 'px')
  })

  $('.split div span').each(function (i) {
    $(this).addClass('separate')
    TweenMax.from($(this), 2.5, {
      opacity: 0,
      x: random(-500, 500),
      y: random(-500, 500),
      z: random(-500, 500),
      scale: 0.1,
      delay: i * 0.02,
      yoyo: true,
      repeat: -1,
      repeatDelay: 5,
    })
  })
}
changeText()
setInterval(function () {
  changeText()
}, 12000)
