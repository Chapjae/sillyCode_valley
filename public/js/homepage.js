const makeVideo = document.getElementById('make-video')

function renderRoom() {
    console.log('hello')
    document.location.replace('/room')
}

makeVideo.addEventListener('click', renderRoom)