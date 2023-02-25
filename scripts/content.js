chrome.runtime.onMessage.addListener(
  (request) => {
    listenerChanges()
    getVideoAndBox()
  }
);

const listenerChanges = () => {
  let observer = new MutationObserver(mutations => {
    for(let mutation of mutations) {
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

let boxes = []
let scale = 1

let getVideoAndBox = () => {
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
    box.addEventListener("wheel", (event) => {
      event.preventDefault()
      let video
      const videos = box.getElementsByTagName('video') || []
      Array.from(videos).forEach(element => {
        if(element.style.display !== 'none') video = element
      })
      if(scale === 1) {
        box.addEventListener('mousemove', (eventBox) => {
          handleOrigin(eventBox, video)
        })
      }
      handleLimits(event, video)
    })
  })
}

const handleLimits = (event, video) => {
  const { clientX, clientY, deltaY } = event
  const x = clientX - video.offsetLeft - video.getBoundingClientRect().x
  const y = clientY - video.offsetTop - video.getBoundingClientRect().y
  if(deltaY < 0) {
    video.style.transformOrigin = `${x / scale}px ${y / scale}px`
    if(scale + 0.1 > 2.5) {
      scale = 2.5
      video.style.transform = `scale(${scale})`
      return
    }
    video.style.transform = `scale(${scale += 0.1})`
  } else {
    scale = 1
    video.style.transformOrigin = 'center center'
    video.style.transform = 'scale(1)'
  }
}


const handleOrigin = (event, video) => {
  const { clientX, clientY } = event
  const x = clientX - video.offsetLeft - video.getBoundingClientRect().x
  const y = clientY - video.offsetTop - video.getBoundingClientRect().y
  video.style.transformOrigin = `${x / scale}px ${y / scale}px`
}
