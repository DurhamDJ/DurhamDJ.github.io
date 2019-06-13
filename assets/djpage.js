let djNames = shuffle(Object.keys(djs));
let genres = [];
let list = $('#dj-list');
for (let i of djNames) {
    let dj = djs[i];
    list.append('<div class="dj-card"><div class="row"><div class="col-md-3 dj-img"><img></div><div class="col-md-8 dj-content"><h3></h3><div class="dj-bio"><p></p></div><ul class="genre-list"></ul></div><div class="col-md-1"><img src="assets/dropdown.svg" class="music-expand" onclick="toggleMusic(this)"></div></div><div class="dj-music-container"><div class="dj-music"></div></div></div>');
    let card = $('#dj-list .dj-card:last-child');
    dj.card = card;
    card.find('.dj-content h3').html(i);
    card.find('.dj-img img').attr('src', dj.img);
    card.find('.dj-bio p').html(dj.bio);

    for (let j of dj.genres) {
        card.find('.genre-list').append('<li onclick="filterGenres(this.innerText)">' + j + '</li>')
        if (!genres.includes(j)) {
            genres.push(j);
            $('#genre-filter').append('<option value="' + j + '">' + j + '</select>')
        }
    }

    let musicDiv = card.find('dj-music');
    for (j of dj.music) {
        if (j[0] == 'mixcloud') {
            card.find('.dj-music').append('<iframe height="120" scrolling="no" frameborder="0" source="https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=' + j[1] + '">Loading...</iframe>');
        }
        else if (j[0] == 'soundcloud') {
            card.find('.dj-music').append('<iframe height="120" scrolling="no" frameborder="no" allow="autoplay" source="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + j[1] + '&color=%23a32691&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true">Loading...</iframe>')
        }
    }
    musicDiv.css('margin-top', '-' + musicDiv.outerHeight() + 'px');
}

window.onload = () => {
    $('#load-cover').css('opacity', '0');
    $('iframe').each((index, elem) => {
        $(elem).attr('src', $(elem).attr('source'));
    });
    setTimeout(removeLoad, 1000);
};

/**
 * Remove the CDJ loading screen after it fades out
 */
function removeLoad() {
    $('#load-cover').css('display', 'none');
}

/**
 * Toggle the music panel for the DJ to whom the given toggler belongs
 * @param {object} elem the toggler element triggering the function
 */
function toggleMusic(elem) {
    let musicDiv = $(elem).closest('div.dj-card').find('.dj-music');
    if (musicDiv.css('margin-top') !== '0px') {
        $(elem).css('transform', 'translateY(-50%) rotate(180deg)');
        musicDiv.css('margin-top', '0px');
        $('.dj-music').not(musicDiv).each((index, el) => {
            $(el).css('margin-top', '-' + $(el).outerHeight() + 'px');
        });
        $('.music-expand').not(elem).each((index, el) => {
            $(el).css('transform', 'translateY(-50%) rotate(0deg)');
        })
    }
    else {
        musicDiv.css('margin-top', '-' + musicDiv.outerHeight() + 'px');
        $(elem).css('transform', 'translateY(-50%) rotate(0deg)');
    }
}

/**
 * filter DJs by the given genre
 * @param {string} value the genre to filter DJs by (as written in the genre lists)
 */
function filterGenres(value) {
    $('#genre-filter').val(value);
    if (value === 'all') {
        for (let i of djNames) {
            djs[i].card.show();
        }
    }
    else {
        for (let i of djNames) {
            let dj = djs[i];
            if (!dj.genres.includes(value)) {
                dj.card.hide();
            }
            else {
                dj.card.show();
            }
        }
    }
}

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
function shuffle(array) {
	let currentIndex = array.length;
	let temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}