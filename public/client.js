let localStream ;
async function joinMeeting(){
    console.log('Join Meeting Call');
    localStream = await navigator.mediaDevices.getUserMedia({audio:true, video:{facingMode: 'user'}})
    // const promise = navigator.mediaDevices.getUserMedia({audio:true, video:{facingMode: 'user'}})
    const video = document.querySelector('#local-video')
    video.srcObject = localStream;
    video.muted=true;
    video.playsInLine=true;
}