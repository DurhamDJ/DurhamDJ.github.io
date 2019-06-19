/**
 *  THIS WORK IS LICENSED UNDER THE GPL 3.0 LICENSE BY DURHAM UNIVERSITY DJ SOCIETY.
 *  PLEASE SEE https://github.com/DurhamDJ/DurhamDJ.github.io/blob/master/LICENSE FOR MORE INFORMATION.
 */

// shuffle DJs, initialise variables
let djNames = shuffle(Object.keys(djs));
let genres = [];
let list = $('#dj-list');
let selected = 'all';

// for each DJ
for (let i of djNames) {
    let dj = djs[i];

    // add them to the page
    list.append('<div class="dj-card"><div class="row"><div class="col-md-3 dj-img"><img></div><div class="col-md-8 dj-content"><h3></h3><div class="dj-bio"><p></p></div><ul class="genre-list"></ul></div><div class="col-md-1 dropdown-container"><img src="assets/dropdown.svg" class="music-expand" onclick="toggleMusic(this)"></div></div><div class="dj-music-container"><div class="dj-music"></div></div></div>');
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

    // add Soundcloud etc embeds into the music section
    let musicDiv = card.find('dj-music');
    if (dj.music.length === 0) {
        card.find('.dropdown-container').remove();
        card.find('.dj-content').attr('class', 'col-md-9 dj-content');
        musicDiv.remove();
    }
    else {
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
}

// when the page is fully loaded
window.onload = () => {
    // hide the CDJ loading spinner
    $('#load-cover').css('opacity', '0');
    // start loading iframes
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
    // find the music panel
    let musicDiv = $(elem).closest('div.dj-card').find('.dj-music');
    // if the music panel isn't shown
    if (musicDiv.css('margin-top') !== '0px') {
        // rotate the toggler
        $(elem).css('transform', 'translateY(-50%) rotate(180deg)');
        // show the music panel
        musicDiv.css('margin-top', '0px');
        // hide other music panels that might be open
        $('.dj-music').not(musicDiv).each((index, el) => {
            $(el).css('margin-top', '-' + $(el).outerHeight() + 'px');
        });
        // and spin back any togglers that are rotated
        $('.music-expand').not(elem).each((index, el) => {
            $(el).css('transform', 'translateY(-50%) rotate(0deg)');
        })
    }
    else {
        // if the music panel is open, hide it and spin the toggler back around
        musicDiv.css('margin-top', '-' + musicDiv.outerHeight() + 'px');
        $(elem).css('transform', 'translateY(-50%) rotate(0deg)');
    }
}

/**
 * filter DJs by the given genre
 * @param {string} value the genre to filter DJs by (as written in the genre lists)
 */
function filterGenres(value) {
    // if we are selecting the existing value (ie clicking a genre that's already being filtered)
    if (value !== 'all' && value === selected) {
        // remove the filter
        filterGenres('all');
        return;
    }
    else {
        // otherwise, remember the new value
        selected = value;
    }

    // update the genre dropdown to reflect the selected genre
    $('#genre-filter').val(value);
    
    // if we've selected 'all'
    if (value === 'all') {
        for (let i of djNames) {
            let card = djs[i].card;
            // deselect all genres inside dj cards
            card.find('li').each((index, elem) => {
                elem = $(elem);
                elem.removeClass('genre-selected');
            });

            // show the DJ cards
            card.show();
        }
    }
    else {
        // if we've selected a genre
        for (let i of djNames) {
            let dj = djs[i];
            let card = dj.card;
            // for DJs that don't have that genre
            if (!dj.genres.includes(value)) {
                // hide that DJ
                card.hide();
                
                // and deselect all genre buttons
                card.find('li').each((index, elem) => {
                    elem = $(elem);
                    elem.removeClass('genre-selected');
                });
            }
            else {
                // if the DJ has that genre
                card.find('li').each((index, elem) => {
                    elem = $(elem);
                    // add the genre-selected class to the relevant genre
                    if (elem.text() === value) {
                        elem.addClass('genre-selected');
                    }
                    else {
                        elem.removeClass('genre-selected');
                    }
                });
                // and make sure that DJ's card is visible
                card.show();
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