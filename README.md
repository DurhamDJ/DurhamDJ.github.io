# DurhamDJ.github.io
Durham DJ Society Website

* **[Updating the website](#Updating-the-website)**
* **[Updating DJ Info](#Updating-DJ-Info)**

## Updating the website
In order to update the website, you first need permission to change it. This can be obtained by contacting the president and/or publicity officer of the society.

Changes are committed using Git, a version control system. There are several methods you can use for this:

### GitHub website
The easiest way to make changes is to use the GitHub website. You can do this by navigating to the file you want to change, and clicking the pencil in the top right. You can then update the file in the web UI, and use the form at the bottom of the page to name and submit your commit.

This isn't a great way to do things long-term, but if you need to make a small change and know what you're doing it's pretty good for that.

### [GitHub Desktop](https://desktop.github.com/)
GitHub provide a desktop application that makes syncing commits etc easy. You log into the app and download ('clone') a copy of the project. You can then change your local copy, and use the app to push your changes to the website. It works similarly to OneDrive or Google Drive, except that syncing happens manually so we can keep track of changes more easily.

This is the method that I'd recommend if you're new to using GitHub. It's particularly good in combination with a good code editor like [Atom](https://atom.io/) which will provide useful features to make updating code easier.

### IDEs
Many Integrated Development Environment (IDEs) provide an all-in-one workflow that allows you to edit code and push changes all in one application. I like [Visual Studio Code](https://code.visualstudio.com/), but [Atom](https://atom.io/) (with the additional [GitHub package](https://github.atom.io/)) is also popular. Using these may involve having to clone the package manually using the command line, and you might also need to install [Git](https://git-scm.com/downloads) separately.

This is the best method in my opinion, but takes quite a bit of setup.

## Updating DJ Info
Data containing the bios, mixes etc of DJs is stored in `DJs.js`.

Each DJ's data should be of the form as follows:

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
            ['mixcloud', 'MIXCLOUD/ID']
        ],
        'socials': {
            'facebook': 'FACEBOOK ID',
            'mixcloud': 'MIXCLOUD ID'
        }
    }
```

This data is stored as a JavaScript structure. That means that:

* `{}` denotes an object (a set of key-value pairs, for example `'bio': 'DJ BIO'`)
* `[]` denotes an array (a list of values)

Bear in mind that both of these require commas after every element inside them except the last item. If you forget to add commas, the code will break.

### DJ Images

DJ images are cropped to a 4:3 aspect ratio when they're displayed to make the site more consistent. That means only the middle of the image will be visible in images taller or wider than 4:3, so make sure any important content (eg the DJ's face) is in the middle.

### Long bios
If a bio is too long to fit on a screen, you can split it across multiple lines to make it more legible. In order to do this:
* Insert a backslash (`\`) where you want to start a new line
* Put in a new line directly after the backslash

You should end up with something like this:
```js
'bio': 'This is a pretty long biography, \
        but you can split it like this.'
```

### Getting Mixcloud / Soundcloud IDs
In order to add mixes or tracks to a DJ's information, you need to get their IDs.

#### Mixcloud
If you visit the mix, inside the address bar will be something along the lines of `https://mixcloud.com/name/mix-name/possibly-other-information`.

The information you need to put inside the DJ's information is the `/name/mix-name/` section. Make sure to put it inside quotes (`''`). If there is no slash on the end, make sure to add one in - the widget won't work otherwise.

The entry in `'music'` should look like `['mixcloud': '/name/mix-name/']`.

#### Soundcloud
Getting Soundcloud information takes a bit more effort. Visit the track, hit 'Share' and then go to the 'Embed' tab.

Copy-paste the code it gives you into the tool at [https://DurhamDJ.github.io/assets/getID/](https://DurhamDJ.github.io/assets/getID). The number you get back (it should look like `253565889`) is the ID.

(If the tool doesn't work, you need to copy the code into a text editor, look for something that looks like `api.soundcloud.com/tracks/253565889&...` and copy the number after `tracks/`.)

The entry in `'music'` should look like `['soundcloud': 'ID-NUMBER']`.

#### YouTube
For a YouTube embed, get the address of the video. It will look like `https://www.youtube.com/watch?v=y6120QOlsfU?possibly-other=information` or  `https://youtu.be/y6120QOlsfU?possibly-other=information`.

Just use the section that's like `y6120QOlsfU`, at the end of the main URL.

The entry in `'music'` should look like `['youtube': 'y6120QOlsfU']`.

### Social Media
Social media links are included in a similar way to music embeds, except that there should be at most one of each type for each DJ. They are included as icons in the bottom corner of the DJ's bio box. Currently supported are:

- Facebook
- Mixcloud
- Soundcloud
- YouTube

For all of these, first visit the user's page. Next, copy the user's ID from the end of the URL (for example from `https://www.example.com/coolguy?maybe-some-other-info` you want to use just `coolguy`). However, YouTube often has URLs in the format of `https://www.youtube.com/urltype/username?maybe-other-info`. In this case, use `urltype/username`.