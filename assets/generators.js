const emptyDJCard = '\
    <div class="dj-card col">\
        <div class="row">\
            <div class="col-md-3 dj-img">\
                <svg width="4" height="3">\
            </div>\
            <div class="col-md-9 dj-content">\
                <div class="row content-row">\
                    <div class="col-10">\
                        <h3></h3>\
                        <div class="dj-bio">\
                            <p></p>\
                        </div>\
                        <ul class="genre-list"></ul>\
                        <div class="social-container"></div>\
                    </div>\
                    <div class="col-2 dropdown-container">\
                        <img src="assets/img/dropdown.svg" alt="Music Dropdown Button" class="music-expand" onclick="toggleMusic(this)">\
                    </div>\
                </div>\
            </div>\
        </div>\
        <div class="dj-music-container">\
            <div class="dj-music"></div>\
        </div>\
    </div>\
';

frameFunctions = {
    'mixcloud': generateMixcloudFrame,
    'soundcloud': generateSoundcloudFrame,
    'youtube': generateYouTubeFrame,
    'hearthis.at': generateHearthIsFrame
}

function generateFrame([platform, id]) {
    const frame = frameFunctions[platform](id);
    return frame;
}

const defaultIframeProps = 'scrolling="no" frameborder="0"';

function generateMixcloudFrame(id) {
    const iframeProps = defaultIframeProps + ' height="120" title="Embedded Mixcloud mix"';
    return `<iframe ${iframeProps} source="https://www.mixcloud.com/widget/iframe/?feed=${id}&hide_cover=1">Loading...</iframe>`;
}
function generateSoundcloudFrame(id) {
    const iframeProps = defaultIframeProps + ' height="120" title="Embedded Soundcloud content"';
    const urlProps = '&color=%23a32691&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false';
    return `<iframe ${iframeProps} source="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}${urlProps}">Loading...</iframe>`;
}
function generateYouTubeFrame(id) {
    const iframeProps = defaultIframeProps + ' height="400" allow="accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture" allowfullscreen title="Embedded YouTube video"';
    return `<iframe ${iframeProps} source="https://www.youtube-nocookie.com/embed/${id}">Loading...</iframe>`;
}
function generateHearthIsFrame(id) {
    const iframeProps = defaultIframeProps + ` height="150" allowtransparency allow="autoplay" id="hearthis_at_track_${id}" title="Embedded hearthis.at content"`;
    const urlProps = '?hcolor=ffffff&color=aaaaaa&style=2&block_size=2&block_space=1&background=1&waveform=0&cover=0&autoplay=0';
    return `<iframe ${iframeProps} source="https://app.hearthis.at/embed/${id}/transparent_black/${urlProps}">Loading...</iframe>`;
}