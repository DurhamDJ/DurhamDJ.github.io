/**
 *  THIS WORK IS LICENSED UNDER THE GPL 3.0 LICENSE BY DURHAM UNIVERSITY DJ SOCIETY.
 *  PLEASE SEE https://github.com/DurhamDJ/DurhamDJ.github.io/blob/master/LICENSE FOR MORE INFORMATION.
 */

// shuffle DJs, initialise variables
const djNames = shuffle(Object.keys(djs));
let genres = [];
const listDiv = $('#dj-list-container');
let selected = 'all';
const socialMappings = {
    'facebook': [
        'fab fa-facebook-f',
        'https://www.facebook.com/'
    ],
    'mixcloud': [
        'fab fa-mixcloud',
        'https://www.mixcloud.com/'
    ],
    'soundcloud': [
        'fab fa-soundcloud',
        'https://www.soundcloud.com/'
    ],
    'youtube': [
        'fab fa-youtube',
        'https://www.youtube.com/'
    ],
    'instagram': [
        'fab fa-instagram',
        'https://www.instagram.com/'
    ]/*,
    'hearthis.at': [
        'No icon',
        'https://hearthis.at/'
    ]*/
}, supportedSocials = Object.keys(socialMappings);

// for each DJ
for (let i of djNames) {
    let dj = djs[i];

    // add them to the page
    listDiv.append(emptyDJCard);
    let card = $('#dj-list .dj-card:last-child');
    dj.card = card;
    card.find('.dj-content h3').html(i);
    card.find('.dj-img svg').attr('style', `background-image: url("${dj.img}")`);
    card.find('.dj-bio p').html(dj.bio);
    for (let j of dj.genres) {
        card.find('.genre-list').append(`<li onclick="filterGenres(this.innerText)">${j}</li>`);
        if (!genres.includes(j)) {
            genres.push(j);
        }
    }

    // add Soundcloud etc embeds into the music section
    let musicDiv = card.find('.dj-music');
    if (!dj.music || dj.music.length === 0) {
        card.find('.dropdown-container').remove();
        //card.find('.col-10').attr('class', 'col-12');
        musicDiv.remove();
    }
    else {
        for (j of dj.music) {
            musicDiv.append(generateFrame(j));
        }
    }
    musicDiv.css('margin-top', `-${musicDiv.outerHeight()}px`);

    // add social links
    let socialsDiv = card.find('.social-container');
    

    // skip adding socials if the DJ doesn't have any
    if (!dj.socials) {
        socialsDiv.remove();
        continue;
    }
    let socialKeys = Object.keys(dj.socials);
    if (socialKeys.length === 0) {
        socialsDiv.remove();
        continue;
    }
    else {
        for (j of socialKeys) {
            if (supportedSocials.includes(j)) {
                let map = socialMappings[j];
                socialsDiv.append(`<a href="${map[1]}${dj.socials[j]}" target="_blank"><i class="${map[0]}"></i></a>`)
            }
        }
    }
}

// function to sort genres alphabetically regardless of case
function genreSort(a, b) {
    a = a.toLowerCase(), b = b.toLowerCase();
    if (a < b) {
        return -1;
    }
    if (b < a) {
        return 1;
    }
    return 0;
}
// sort genres using genreSort()
genres.sort(genreSort);
// add genres to the filter box
for (j of genres) {
    $('#genre-filter').append(`<option value="${j}">${j}</select>`);
}

// when the page is fully loaded
window.onload = () => {
    // hide the CDJ loading spinner
    $('#load-cover').css('opacity', '0');
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
    
    if (!musicDiv.data('loaded')) {
        musicDiv.find('iframe').each((index, elem) => {
            $(elem).attr('src', $(elem).attr('source'));
        });
        musicDiv.data('loaded', true);
    }

    // if the music panel isn't shown
    if (musicDiv.css('margin-top') !== '0px') {
        // rotate the toggler
        $(elem).css('transform', 'translateY(-50%) translateX(-50%) rotate(180deg)');
        // show the music panel
        musicDiv.css('margin-top', '0px');
        // hide other music panels that might be open
        $('.dj-music').not(musicDiv).each((index, el) => {
            $(el).css('margin-top', `-${$(el).outerHeight()}px`);
        });
        // and spin back any togglers that are rotated
        $('.music-expand').not(elem).each((index, el) => {
            $(el).css('transform', 'translateY(-50%) translateX(-50%) rotate(0deg)');
        })
    }
    else {
        // if the music panel is open, hide it and spin the toggler back around
        musicDiv.css('margin-top', `-${musicDiv.outerHeight()}px`);
        $(elem).css('transform', 'translateY(-50%) translateX(-50%) rotate(0deg)');
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