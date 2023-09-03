const audio = {
    attackSound: new Howl({
        src: "/audio/attackSound.wav",
        html5: true,
        volume: 0.5,
    }),

    Map: new Howl({
        src: "./audio/fightBgm.wav",
        html5: true,
        volume: 1,
        loop: true
    }),

    attackKenji1: new Howl({
        src: "./audio/attackKenji1.wav",
        html5: true,
        volume: 0.5,

    }),

    jumpSound: new Howl({
        src: "./audio/jumpSound.wav",
        html5: true,
        volume: 0.2,

    }),

    kenjiJump: new Howl({
        src: "./audio/kenjiJump.wav",
        html5: true,
        volume: 0.2,

    }),

    hitSound: new Howl({
        src: "./audio/tackleHit.wav",
        html5: true,
        volume: 0.05,

    }),

    shububWins: new Howl({
        src: "./audio/shububWins.wav",
        html5: true,
        volume: 1,
        loop: false

    }),

    juwaWins: new Howl({
        src: "./audio/juwaWins.wav",
        html5: true,
        volume: 1,
        loop: false

    })




}