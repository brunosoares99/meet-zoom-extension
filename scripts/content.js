chrome.runtime.onMessage.addListener(
  (request) => {
    listenerChanges()
    getVideoAndBox()
  }
);

const listenerChanges = () => {
  let observer = new MutationObserver(mutations => {
    for(let mutation of mutations) {
         console.log(mutation.addedNodes, mutation.removedNodes)
         mutation.addedNodes.forEach(node => {
            if(node.className === 'dkjMxf') {
              getVideoAndBox()
            }
         })
         mutation.removedNodes.forEach(node => {
            if(node.className === 'dkjMxf') {
              getVideoAndBox()
            }
         })
     }
 });
 observer.observe(document, { childList: true, subtree: true });
}

let boxexs = []
let scale = 1

let getVideoAndBox = () => {
  boxes = []
  scale = 1
  boxes = document.querySelectorAll('.dkjMxf')
  handleError()
}



const handleError = () => {
  if(boxes.length) {
    onMouseWheelMove()
    return
  }
  alert('Algo deu errado, tente novamente')
}

const onMouseWheelMove = () => {
  boxes.forEach(box => {
    box.addEventListener("wheel", (e) => {
      let video
      const videos = box.getElementsByTagName('video') || []
      Array.from(videos).forEach(el => {
        if(el.style.display !== 'none') video = el
      })
      const x = e.clientX - video.offsetLeft - video.getBoundingClientRect().x
      const y = e.clientY - video.offsetTop - video.getBoundingClientRect().y
      if(e.deltaY < 0) {
        video.style.transformOrigin = `${x}px ${y}px`
        if(scale + 0.1 > 1.8) {
          scale = 1.8
          video.style.transform = `scale(${scale})`
          return
        }
        video.style.transform = `scale(${scale += 0.1})`
      } else {
        scale = 1
        video.style.transformOrigin = 'center center'
        video.style.transform = 'scale(1)'
      }
    })
  })
}
  
