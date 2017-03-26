// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://s3.us-east-2.amazonaws.com/sermons.cityhillchurch.org/Sermons/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Mar 19 - Galatians 5:1-15 'Avoid the Sewage and Enjoy the Spring' - Pastor Sam (Guest Preacher)",
                "length": "34:58",
                "file": "Galatians+5_1-6"
            }, {
                "track": 2,
                "name": "Mar 12 - Mark 1:29-34 'The Healer' - Pastor Robin Cho",
                "length": "37:22",
                "file": "March+1_29-34"
            }, {
                "track": 3,
                "name": "Mar 5 - Mark 1:21-28 'The Holy One Of God' - Pastor Robin Cho",
                "length": "27:03",
                "file": "The+Holy+One+of+God+-+Mark+1_21-28"
            }, {
                "track": 4,
                "name": "Feb 26 - Exodus 7:1-13 'Optimism is Sharing the Gospel to Hardened Hearts' - David Lee (Guest Preacher)",
                "length": "44:00",
                "file": "Exodus+7_1-13"
            }, {
                "track": 5,
                "name": "Feb 19 - Mark 1:16-20 'Fishers of Men' - Pastor Robin Cho",
                "length": "32:27",
                "file": "Mark+1_16-20"
            }, {
                "track": 6,
                "name": "Feb 12 - Mark 1:14-15 'What Jesus First Preached' - Paster Robin Cho",
                "length": "40:37",
                "file": "Mark+1_14-15"
            }, {
                "track": 7,
                "name": "Feb 5 - Daniel 6 'The Lions Den' - Pastor Stephen Jon (Guest Preacher)",
                "length": "49:46",
                "file": "Daniel+6+Stephen+Jon"
            }, {
                "track": 8,
                "name": "Jan 29 - Mark 1:12-13 'Wilderness Qualified' - Pastor Robin Cho",
                "length": "37:54",
                "file": "Jan+29+Mark+1_12-13"
            }, {
                "track": 9,
                "name": "Jan 22 - Mark 1:9-11 'Vicarious Christ' - Pastor Robin Cho",
                "length": "34:21",
                "file": "Jan+22+Mark+1_9-11"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackLength = value.length;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                } else {
                    trackNumber = '' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><div class="plNum">' +
                trackNumber + '.</div><div class="plTitle">' + trackName +
                '</div><div class="plLength">' + trackLength + '</div></div></li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.m4a' : audio.canPlayType('audio/ogg') ? '.ogg' : audio.canPlayType('audio/mp4') ? '.mp4a' : '';
        loadTrack(index);
    }
});