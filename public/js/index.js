console.log("working");
var take = document.getElementById("snap");
var photoCount = document.getElementById("photoCount");
var video = document.getElementById("vid");
var contain = document.getElementById("holding");
var sameElementNodes = contain.getElementsByTagName("canvas");
var trash = document.getElementById("goAway");
var selectAll = document.getElementById('selectAll');
var record = document.getElementById("record");

photoCount.textContent = "Photos: " + sameElementNodes.length;

if(navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({video: true}, {audio: true})
    .then((stream) => {
        video.srcObject = stream;
        video.play();

        
        //video taker
        var record = document.getElementById('record');

        var mediaRec = new MediaRecorder(stream, {
            mimeType: "video/webm"
        });

        var chunks = [];

        mediaRec.ondataavailable = (e) => {
            if(e.data && e.data.size > 0){
                chunks.push(e.data);
            }
        }

        //when record button is pressed:
        record.addEventListener('click', () => {
            if(record.className === 'rec'){
                chunks = [];
                mediaRec.start(10);
                record.src = '/stopVid.png';
                record.className = 'stop';
                console.log('rec buton')
            }else {
                mediaRec.stop();
                record.src = '/video.png';
                record.className = 'rec';
                saveVid();
                console.log('stopbuton')
            }
        });

        var saveVid = () => {

            var width = video.videoWidth
            var height = video.videoHeight

            var newVid = document.createElement('video');
            contain.prepend(newVid);
            newVid.controls = true;
            newVid.height = height;
            newVid.width = width;

            var newBr = document.createElement('br');
            contain.prepend(newBr);

            var blob = new Blob(chunks, {type: 'video/webm'});
            var vidUrl = window.URL.createObjectURL(blob);

            newVid.src = vidUrl;
            
            newVid.addEventListener('click', () => {
                var e = event.target;
                if(e.className === 'selected'){
                    e.className = '';
                } else {
                    e.className = 'selected';
                    trash.addEventListener('click', () => {
                        if(e.className === 'selected'){
                            e.parentNode.removeChild(e);
                            contain.removeChild(newBr);
                        }
                    }, false);
                }
            }, false);
        }
        //end of video taking;

    });
}
//take photos
take.addEventListener('click', () => {
    var newCan = document.createElement("canvas");
    var newCtx = newCan.getContext("2d");
    document.getElementById("holding").prepend(newCan);
    
    
    var br = document.createElement("br");
    document.getElementById("holding").prepend(br);
    

    var width = video.videoWidth
    var height = video.videoHeight
    newCan.width = width;
    newCan.height = height;
    newCtx.drawImage(video, 0, 0, width, height);

    var sameElementNodes = contain.getElementsByTagName("canvas");
    photoCount.textContent = "Photos: " + sameElementNodes.length;

    newCan.addEventListener('click', () => {
        var e = event.target;
        if(e.className === "selected"){
            e.className = "";
        }else {
            e.className = "selected";
            trash.addEventListener('click', () => {
                if(e.className === "selected"){
                    e.parentNode.removeChild(e);
                    contain.removeChild(br);
                    photoCount.textContent = "Photos: " + sameElementNodes.length;
                }
            }, false);
        }
    }, false);
}, false);
//end of photo taking

//select all button
selectAll.addEventListener('click', () => {
    var brs = contain.getElementsByClassName('br');
    var cElem = contain.getElementsByTagName('canvas');
    for(i = 0; cElem.length > i; i++){
        cElem[i].className = 'selected';
        trash.addEventListener('click', () => {
            for(i = 0; cElem.length > i; i++){
                if(cElem[i].className === 'selected'){
                    cElem[i].parentNode.removeChild(cElem[i]);
                    photoCount.textContent = "Photos: " + cElem.length;
                    brs[0].parentNode.removeChild(brs[0]);
                }
            }
        }, false);
    }
}, false);
