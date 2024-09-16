let bg;
let stopped = true;
let playing = false;
let ffwd = false;
let rwind = false;
let position = 0;
let playbackDir = 1;
let posMod = 0;
let midX;
let midY;
let buffer = new Tone.ToneAudioBuffer("tp_short_2.mp3", () => {
    console.log('buffer loaded');
})
const player = new Tone.Player(buffer).toDestination();
player.loop = true;

function preload() {
    bg = loadImage('tp_05.jpg')
}

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    background(0);
    rectMode(CENTER);
    imageMode(CENTER);
    noFill();
    stroke(0);
    strokeWeight(10)
    midX = windowWidth / 2;
    midY = windowHeight / 2;
    image(bg, midX, midY);
}

function draw() {
    if (player.loaded) {
        image(bg, midX, midY);
        if (stopped || ffwd || rwind) {
            fill(0, 100);
            // noFill();
        } else {
            fill(250, 200);
        }
        triangle(midX - 100, midY - 100, midX + 100, midY, midX - 100, midY + 100)
        if (ffwd) {
            fill(250, 200);
        } else {
            fill(0, 100)
                // noFill();
        }
        triangle(windowWidth - 200, midY - 50, windowWidth - 100, midY, windowWidth - 200, midY + 50)
        triangle(windowWidth - 250, midY - 50, windowWidth - 150, midY, windowWidth - 250, midY + 50)
        if (rwind) {
            fill(250, 200);
        } else {
            fill(0, 100)
                // noFill();
        }
        triangle(200, midY - 50, 100, midY, 200, midY + 50)
        triangle(250, midY - 50, 150, midY, 250, midY + 50)
    } else {
        fill(255);
        circle((midX - 100) + frameCount % 200, midY, 30)
        if (frameCount % 200 == 0) {
            image(bg, midX, midY);
        }
    }
    if (playing) {
        if (frameCount % 60 == 0) {
            position += player.playbackRate * playbackDir;
            posMod = (buffer.duration + position) % buffer.duration
        }
    }
}

// function mousePressed() {
//     // console.log(player.state);
//     if (player.loaded) {
//         if (mouseX > (windowWidth / 2 - 50) && mouseX < (windowWidth / 2 + 50)) {
//             if (stopped) {
//                 player.start(0, posMod);
//                 stopped = false;
//                 playing = true;
//             } else if (ffwd || rwind) {
//                 // player.start(0, position);
//                 player.playbackRate = 1;
//                 ffwd = false;
//                 rwind = false;
//                 player.reverse = false;
//                 playbackDir = 1;
//                 player.start(0, posMod);
//             } else {
//                 player.stop();
//                 stopped = true;
//                 playing = false;
//             }
//         } else if (mouseX > (windowWidth / 2 + 200) && mouseX < windowWidth) {
//             player.playbackRate = 5;
//             player.reverse = false;
//             ffwd = true;
//             playbackDir = 1;
//         } else if (mouseX < (windowWidth / 2 - 200) && mouseX > 0) {
//             player.playbackRate = 5;
//             player.reverse = true;
//             rwind = true;
//             playbackDir = -1;
//         }
//     }
// }

function touchStarted() {
    if (touches.length > 0) {
        let x = touches[0].x;
        let y = touches[0].y;
        if (player.loaded) {
            if (y < midY + 200 && y > midY - 200) {
                if (x > (windowWidth / 2 - 100) && x < (windowWidth / 2 + 100)) {
                    if (stopped) {
                        player.start(0, posMod);
                        stopped = false;
                        playing = true;
                    } else if (ffwd || rwind) {
                        // player.start(0, position);
                        player.playbackRate = 1;
                        ffwd = false;
                        rwind = false;
                        player.reverse = false;
                        playbackDir = 1;
                        player.start(0, posMod);
                    } else {
                        player.stop();
                        stopped = true;
                        playing = false;
                    }
                } else if (x > (windowWidth / 2 + 200) && x < windowWidth) {
                    player.playbackRate = 5;
                    player.reverse = false;
                    ffwd = true;
                    playbackDir = 1;
                } else if (x < (windowWidth / 2 - 200) && x > 0) {
                    player.playbackRate = 5;
                    player.reverse = true;
                    rwind = true;
                    playbackDir = -1;
                }
            }
        }
        console.log(touches[0].x)
    }
}