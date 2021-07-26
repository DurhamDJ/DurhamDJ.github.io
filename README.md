# Durham DJ Society Website

* **[Updating the website](#Updating-the-website)**
* **[Updating DJ Info](#Updating-DJ-Info)**

## Updating the website
In order to update the website, you first need permission to change it. This can be obtained by contacting the president and/or publicity officer of the society.

Changes are committed using Git, a version control system. It works similarly to OneDrive or Google Drive, except that changes get named and uploaded manually so we can keep track of changes more easily. There are several methods you can use for this:

### GitHub website
The fastest way to make changes is to use the GitHub website directly. You can do this by navigating to the file you want to change, and clicking the pencil in the top right. You can then update the file in the web UI, and use the form at the bottom of the page to name and submit your commit.

This isn't a great way to do things long-term, but if you need to make a small change and know what you're doing it's pretty good for that.

### [GitHub Desktop](https://desktop.github.com/)
GitHub provide a desktop application that makes syncing commits etc easy. You log into the app and download ('clone') a copy of the project. You can then change your local copy, and use the app to push your changes to the website.

This is the method that I'd recommend if you're new to using GitHub. It's particularly good in combination with a good code editor like [Atom](https://atom.io/) which will provide useful features to make updating code easier.

### IDEs
Many Integrated Development Environment (IDEs) provide an all-in-one workflow that allows you to edit code and push changes all in one application. I like [Visual Studio Code](https://code.visualstudio.com/), but [Atom](https://atom.io/) (with the additional [GitHub package](https://github.atom.io/)) is also popular. Using these may involve having to clone the package manually using the command line, and you might also need to install [Git](https://git-scm.com/downloads) separately.

This is the best method in my opinion, but takes a bit more setup to start with.

## Updating DJ Info
Data containing the bios, mixes etc of DJs is stored in `DJs.js`.

Each DJ's data should look like this:

```js
    'DJ NAME': {        // name of DJ
        'bio': 'DJ BIO',                // DJ biography: SEE BELOW if it gets too long to fit on your screen
        'img': 'PATH/TO/DJ_IMAGE.JPG',  // path to DJ photo (preferably in assets/djimg)
        'genres': [         // list of genres:
            'GENRE 1',          // make sure they are spelt the same as any
            'GENRE 2',          // existing genres, otherwise they will appear as
            'GENRE 3'           // different options in the dropdown
        ],
        'music': [          // any mixes or tracks that need to be shown for the DJ
            ['soundcloud', 'SOUNDCLOUD ID'],
            ['mixcloud', 'MIXCLOUD ID'],
            ['youtube', 'YOUTUBE ID'],
            ['hearthis.at', 'HEARTHIS.AT ID']
        ],
        'socials': {
            'facebook': 'FACEBOOK ID',
            'mixcloud': 'MIXCLOUD ID'
        }
    }
```

This data is stored as a JavaScript structure. `{}` denotes an object, which works like a dictionary with lots of `name: value` pairs, and `[]` denotes an array, which is simply a series of values. Both of these structures can contain other structures inside themselves, which is how we can build more useful data structures like the one above.

JavaScript doesn't care about spaces and new lines in these structures, so the above structure can simply be written on one line. It is split across several lines and indented like you see to aid with legibility, but it may be useful to remember that the following pairs of structures are equivalent:
```js
[
    item,
    item,
    item
]

[item, item, item]
```

```js
{
    key: value,
    key: value,
    key: value
}

{key: value,  key: value,  key: value}
```

Bear in mind that both of these require commas (`,`) to separate items. If you forget to add commas, the code will break.

## Information to store about each DJ

- [Name](#name)
- [Biography](#biography)
- [Image](#image)
- [Music Embeds](#music-embeds)
- [Social Media Links](#social-media-links)


### Name

A DJ's name is the 'key' for the structure containing their information inside the 'main' object. That is, the main object looks like:

```js
{
    "DJ Name 1": {
        ...info
    },
    "DJ Name 2": {
        ...info
    },
    "DJ Name 3": {
        ...info
    }
}
```

A DJ's name can be any string of characters. It's preferable to keep it short if possible. For example, 'Joe Bloggs' or 'Joe "JoeB" Bloggs'.

### Biography
The biography should be a short paragraph about the DJ, describing what experience they have, what their skills are and what kinds of events they are looking to perform at.

If a bio is too long to fit on a screen, you can split it across multiple lines to make it more legible. In order to do this:
* Insert a backslash (`\`) where you want to start a new line
* Put in a new line directly after the backslash

More generally, the backslash (`\`) can be used to 'escape' characters that you don't want to affect how the biography is read. For example, if a biography has an apostrophe in, you don't want to end up with a situation like this:
```js
'bio': 'I can't and won't play liquid jazz gabba. It's just a fad.'
```

Instead, you can use the backslash to specify which apostrophes should be ignored:
```js
'bio': 'I can\'t and won\'t play liquid jazz gabba. It\'s just a fad.'
```

You should end up with something like this:
```js
'bio': 'This is a pretty long biography, \
        but you\'ll be able to split it \
        like this.'
```

### Image

DJ images are cropped to a 4:3 aspect ratio when they're displayed to make the site more consistent. That means only the middle of the image will be visible in images taller or wider than 4:3, so make sure any important content (eg the DJ's face) is in the middle.

Images should be placed in the folder `assets/djimg`. If you're replacing an existing image, remember to remove the old one as they can get pretty cluttered otherwise.

Once you've added an image to the folder, you just need to point to it in the data structure. This can be done by just putting the file path (eg `'assets/djimg/DJKhaled.jpg'`) into the `img` field for that DJ. You should end up with something like:
```js
'img': 'assets/djimg/JoeBloggs.jpg'
```

### Music Embeds
In order to add mixes or tracks to a DJ's information, you need to get the ID of that information so it can be embedded in their music box.

#### Mixcloud
If you visit the mix, inside the address bar will be something along the lines of `https://mixcloud.com/name/mix-name/possibly-other-information`.

The information you need to put inside the DJ's information is the `/name/mix-name/` section. Make sure to put it inside quotes (`''`). If there is no slash on the end, make sure to add one in - the widget won't work otherwise.

The entry in `'music'` should look like `['mixcloud', '/name/mix-name/']`.

#### Soundcloud
Getting Soundcloud information takes a bit more effort. Visit the track, hit 'Share' and then go to the 'Embed' tab.

Copy-paste the code it gives you into the tool at [https://ddjs.uk/assets/getID](https://ddjs.uk/assets/getID). The number you get back (it should look like `253565889`) is the ID.

(If the tool doesn't work, you need to copy the code into a text editor, look for something that looks like `api.soundcloud.com/tracks/253565889&...` and copy the number after `tracks/`.)

The entry in `'music'` should look like `['soundcloud', '253565889']`.

#### YouTube
For a YouTube embed, get the address of the video. It will look like `https://www.youtube.com/watch?v=y6120QOlsfU?possibly-other=information` or  `https://youtu.be/y6120QOlsfU?possibly-other=information`.

Just use the section that's like `y6120QOlsfU`, at the end of the main URL. You can also optionally provide a start time for the video in seconds; this can be added at the end of the structure (eg `['youtube', 'y6120QOlsfU', '84']`).

The entry in `'music'` should look like `['youtube', 'y6120QOlsfU']`.

#### hearthis.at
For a [hearthis.at](https://hearthis.at) embed, visit the mix and click 'Social'. You should see a 'Short Link' field that looks like `https://hearthis.at/MIX-ID/`. That `MIX-ID` is what you want to use.

The entry in `'music'` should look like `['hearthis.at', 'MIX-ID']`.

#### Spotify
For a Spotify track, just right click the track in the Spotify website or application, hit 'Share' and then 'Copy Song Link'. You'll probably get something along the lines of  `https://open.spotify.com/track/623rRTKwGmgjH6sjE9uWLh?si=abcdefg123456789`. Just grab the text between `track/` and `?` and enter that into the `'music'` field under `'spotify-track'`.

The entry in `'music'` should look like `['spotify-track', '623rRTKwGmgjH6sjE9uWLh']`.

### Social Media Links
Social media links are included in a similar way to music embeds, except that there should be at most one of each type for each DJ. They are included as icons in the top-right corner of the DJ's bio box. Currently supported are:

- Facebook
- Mixcloud
- Soundcloud
- YouTube

For all of these except YouTube, first visit the user's page. Next, copy the user's ID from the end of the URL (for example from `https://www.example.com/coolguy?maybe-some-other-info` you want to use just `coolguy`).

YouTube needs to work a bit differently because it has several different kinds of URLs, all in the format of `https://www.youtube.com/urltype/username?maybe-other-info`. In this case, follow the steps above but use `urltype/username` rather than just `username`.