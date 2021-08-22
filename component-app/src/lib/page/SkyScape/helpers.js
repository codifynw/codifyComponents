let current = 0
let target = 0
let ease = 0.075
const scrollable = document.getElementById('main-scroll-area')

let handleScroll = function () {
  // Set height
  document.body.style.height = `${scrollable.getBoundingClientRect().height}px`
  smoothScroll()
}

// Linear interpolation used for smooth scrolling
function lerp(start, end, t) {
  return start * (1 - t) + end * t
}

function smoothScroll() {
  target = window.scrollY
  current = lerp(current, target, ease)
  scrollable.style.transform = `translate3d(0, ${-current}px, 0)`
  requestAnimationFrame(smoothScroll)
}

export { handleScroll }
