console.log("Welcome to Spotify");
// Initialize the Variables
let songIndex=0;
let audioElement = new Audio('1.mp3');
let masterplay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');

let songItems = Array.from(document.getElementsByClassName('songItem'));

let song = [
    {songName: "Naseeb Se", filepath: "1.mp3", coverpath: "covers/1.jpg"},
    {songName: "Breaking The Rules", filepath: "2.mp3", coverpath: "covers/2.jpg"},
    {songName: "Phir Aur kya Chahiye", filepath: "3.mp3", coverpath: "covers/3.jpg"},
    {songName: "King Of Indian Hip Hop", filepath: "4.mp3", coverpath: "covers/4.jpg"},
    {songName: "Krishna tere Ho Gyi Jaani", filepath: "5.mp3", coverpath: "covers/5.jpg"},
    {songName: "Kya Loge Tum Jaani", filepath: "6.mp3", coverpath: "covers/6.jpg"},
    {songName: "Pyar Ho Gya Jaani Dilshad", filepath: "7.mp3", coverpath: "covers/7.jpg"},
    {songName: "Tere Vaaste Zara", filepath: "8.mp3", coverpath: "covers/8.jpg"},
]
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src= song[i].coverpath; 
    element.getElementsByClassName("songName")[0].innerText= song[i].songName; 
})

// audioElement.play();
//Handle play/pause click
masterplay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
            audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }

})

// Listen to Events

audioElement.addEventListener('timeupdate',()=>{
   
    //update Seekabar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    if(progress==100)
    {
        nextplay();
    }
    
    myProgressBar.value = progress;
    console.log(audioElement.duration);
    
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
}) 

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        console.log(songIndex);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `${songIndex+1}.mp3`;
        masterSongName.innerText = song[songIndex].songName;
     //   audioElement.src='3.mp3';
        audioElement.currentTime=0;
        audioElement.play();
        
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        
    })
})
document.getElementById('next').addEventListener('click', nextplay);
function nextplay(){
    console.log("called");
    if(songIndex>=7){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

}
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
})