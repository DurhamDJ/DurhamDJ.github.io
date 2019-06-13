# DurhamDJ.github.io
Durham DJ Society Website

## Updating DJ Info
Data containing the bios, mixes etc of DJs is stored in `assets/djs.js`.

Each DJ's data should be of the form as follows:

```js
    'DJ NAME': {        // name of DJ
        'bio': 'DJ BIO',                // DJ biography
        'img': 'PATH/TO/DJ_IMAGE.JPG',  // path to DJ photo (preferably in assets/djimg)
        'genres': [         // list of genres:
            'GENRE 1',          // make sure they are spelt the same as any
            'GENRE 2',          // existing genres, otherwise they will appear as
            'GENRE 3'           // in the dropdown different options
        ],
        'music': [          // any mixes or tracks that need to be shown for the DJ
            ['soundcloud', 'SOUNDCLOUD ID'],    // make sure to include the platform
            ['mixcloud', 'MIXCLOUD/ID']       // as well as the ID
        ]
    }
```

This data is stored as a JavaScript structure. That means that:

* `{}` denotes an object (a set of key-value pairs, for example `'bio': 'DJ BIO'`)
* `[]` denotes an array (a list of values)

Bear in mind that both of these require commas after every element inside them except the last item. If you forget to add commas, the code will break.

## Getting Mixcloud / Soundcloud IDs
In order to add mixes or tracks to a DJ's information, you need to get their IDs.

### Mixcloud
If you visit the mix, inside the address bar will be something along the lines of `https://mixcloud.com/name/mix-name/possibly-other-information`.

The information you need to put inside the DJ's information is the `/name/mix-name/` section. Make sure to put it inside quotes (`''`). If there is no slash on the end, make sure to add one in - the widget won't work otherwise.

The entry in `'music'` should look like `['mixcloud': '/name/mix-name/']`.

### Soundcloud
Getting Soundcloud information takes a bit more effort. Visit the track, hit 'Share' and then go to the 'Embed' tab.

Copy-paste the code it gives you into the tool at [https://DurhamDJ.github.io/assets/getID/](https://DurhamDJ.github.io/assets/getID). The number you get back (it should look like `253565889`) is the ID.

(If the tool doesn't work, you need to copy the code into a text editor, look for something that looks like `api.soundcloud.com/tracks/253565889&...` and copy the number after `tracks/`.)

The entry in `'music'` should look like `['soundcloud': 'ID-NUMBER']`.