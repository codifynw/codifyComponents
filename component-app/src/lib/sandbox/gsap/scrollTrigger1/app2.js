// inspiration from https://codesandbox.io/s/gsap-scroll-trigger-grhvr?file=/src/index.js:0-1033
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import charming from 'charming'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const headings = document.querySelectorAll('h2')
headings.forEach((el) => {
  charming(el, {
    split: (string) => string.split(/(\s+)/),
    setClassName: (index, char) => char !== ' ' && 'word',
  })

  el.querySelectorAll('.word').forEach((word) => {
    charming(word, { setClassName: () => 'char' })
  })
})

gsap.registerPlugin(ScrollTrigger)

gsap.from('.a .char', {
  scrollTrigger: '.a',
  duration: 1.5,
  stagger: 0.015,
  ease: 'power3.easeOut',
  y: '100%',
})

gsap.from('.b .char', {
  scrollTrigger: {
    trigger: '.b h2',
    toggleActions: 'play reset play reset',
  },
  delay: 0.5,
  stagger: 0.0185,
  duration: 1.25,
  ease: 'Power3.easeOut',
  y: '100%',
})

gsap.from('.c', {
  scrollTrigger: {
    trigger: '.c h2',
    toggleActions: 'play reverse play reverse',
  },
  duration: 1,
  backgroundColor: '#ED7C30',
  ease: 'none',
})
