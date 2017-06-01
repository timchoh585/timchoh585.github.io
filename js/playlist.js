// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);

jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'https://s3.us-east-2.amazonaws.com/sermons.cityhillchurch.org/Sermons/',
            extension = '',
            tracks = [{
                "date": "May 28, 2017",
                "passage": "Mark 2:13-14 'His Will To Call You'",
                "speaker": "Pastor Robin Cho",
                "length": "30:35",
                "file": "Mark+2_13-14"
            }, {
                "date": "May 7, 2017",
                "passage": "Colossians 4:2-6 'Downtime'",
                "speaker": "Pastor David Lee (Guest Preacher)",
                "length": "41:14",
                "file": "Downtime"
            }, {
                "date": "April 30, 2017",
                "passage": "Matthew 5:43-48 'Why do we love our enemies'",
                "speaker": "Pastor David Lee (Guest Preacher)",
                "length": "33:23",
                "file": "Matthew+5_43-48"
            }, {
                "date": "April 23, 2017",
                "passage": "Mark 2:1-12 'The Forgiveness of Sin'",
                "speaker": "Pastor Robin Cho",
                "length": "33:23",
                "file": "Mark+2_1-12"
            }, {
                "date": "April 17, 2017",
                "passage": "Mark 1:40-45 'The Spritual Leper'",
                "speaker": "Pastor Robin Cho",
                "length": "30:24",
                "file": "Mark+1_40-45"
            }, {
                "date": "April 9, 2017",
                "passage": "Mark 1:35-39 'The Priority of Jesus'",
                "speaker": "Pastor Robin Cho",
                "length": "37:12",
                "file": "Mark+1_35-39"
            }, {
                "date": "April 2, 2017",
                "passage": "1 Peter 2:11-12 'As a People out of this World'",
                "speaker": "Pastor David Lee (Guest Preacher)",
                "length": "48:09",
                "file": "1+Peter+2_11-12"
            }, {
                "date": "Mar 26, 2017",
                "passage": "Galatians 6:1-10 'Bearing One Another's Burdens'",
                "speaker": "Pastor David Lee (Guest Preacher)",
                "length": "40:39",
                "file": "Galatians+6_1-10"
            },  {
                "date": "Mar 19, 2017",
                "passage": "Galatians 5:1-6 'Avoid the Sewage and Enjoy the Spring'",
                "speaker": "Pastor Sam Kang (Guest Preacher)",
                "length": "34:58",
                "file": "Galatians+5_1-6"
            }, {
                "date": "Mar 12, 2017",
                "passage": "Mark 1:29-34 'The Healer'",
                "speaker": "Pastor Robin Cho",
                "length": "37:22",
                "file": "March+1_29-34"
            }, {
                "date": "Mar 5, 2017",
                "passage": "Mark 1:21-28 'The Holy One Of God'",
                "speaker": "Pastor Robin Cho",
                "length": "27:03",
                "file": "The+Holy+One+of+God+-+Mark+1_21-28"
            }, {
                "date": "Feb 26, 2017",
                "passage": "Exodus 7:1-13 'Optimism is Sharing the Gospel to Hardened Hearts'",
                "speaker": "Pastor David Lee (Guest Preacher)",
                "length": "44:00",
                "file": "Exodus+7_1-13"
            }, {
                "date": "Feb 19, 2017",
                "passage": "Mark 1:16-20 'Fishers of Men'",
                "speaker": "Pastor Robin Cho",
                "length": "32:27",
                "file": "Mark+1_16-20"
            }, {
                "date": "Feb 12, 2017",
                "passage": "Mark 1:14-15 'What Jesus First Preached'",
                "speaker": "Paster Robin Cho",
                "length": "40:37",
                "file": "Mark+1_14-15"
            }, {
                "date": "Feb 5, 2017",
                "passage": "Daniel 6 'The Lion's Den'",
                "speaker": "Pastor Stephen Jon (Guest Preacher)",
                "length": "49:46",
                "file": "Daniel+6+Stephen+Jon"
            }, {
                "date": "Jan 29, 2017",
                "passage": "Mark 1:12-13 'Wilderness Qualified'",
                "speaker": "Pastor Robin Cho",
                "length": "37:54",
                "file": "Jan+29+Mark+1_12-13"
            }, {
                "date": "Jan 22, 2017",
                "passage": "Mark 1:9-11 'Vicarious Christ'",
                "speaker": "Pastor Robin Cho",
                "length": "34:21",
                "file": "Jan+22+Mark+1_9-11"
            }],
            buildPlaylist = $.each(tracks, function(key, value) {
                var trackNumber = key+1,
                    trackDate = value.date,
                    trackPassage = value.passage,
                    trackSpeaker = value.speaker,
                    trackLength = value.length;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                } else {
                    trackNumber = '' + trackNumber;
                }
                $('#plList').append('<li><div class="plItem"><div class="plNum">' +
                trackNumber + '.</div><div class="plTitle">' +
                trackPassage + '<br>' + trackSpeaker + ' - ' + trackDate +
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
                npTitle.text(tracks[id].passage);
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
