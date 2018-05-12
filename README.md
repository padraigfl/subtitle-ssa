# Subtitle SSA

[![Build Status](https://travis-ci.org/padraigfl/subtitle-ssa.svg?branch=master)](https://travis-ci.org/padraigfl/subtitle-ssa) [![Coverage Status](https://coveralls.io/repos/github/padraigfl/subtitle-ssa/badge.svg?branch=master)](https://coveralls.io/github/padraigfl/subtitle-ssa?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/d30d1df26be3154dff5b/maintainability)](https://codeclimate.com/github/padraigfl/subtitle-ssa/maintainability)

A pretty straightforward module for parsing and writing SSA/ASS/Aegisub/SubStation Alpha files which has been designed to closely resemble the two most popular SRT modules I could find, subtitles-parser and subtitle, following the latter's format slightly closer due to it using milleseconds by default in its object time properites.

This is part of a series of subtitle related modules which I will be publishing over the next while and have been scoped out in an earlier project on my github. As they were all originally part of a bigger project, there are doubtlessly some weird overlaps that need to be ironed out.

Written in ES5 purely because I thought it'd be a good restriction to put on myself (I won't be doing that again).

## Setup

Dependencies: None!

- `npm run build` compiles a minified bundle file to use in the /dist folder, last I checked it was 3.3kb, which seems pretty good!
- `npm run test` tests code and assesses coverage
- `npm run lint` fairly simple ES5 lint checks on both source code and test files

## Exported Functions

### `parse(data: String, [omitInlineStyles]) -> Array`

Converts an SSA formatted string into a simple array of objects.

`omitInlineStyles` The optional second argument, which defaults to false, removes any inline styling provided in the subtitle file's dialogue field.

### `convert(subArray: Array, [styles: String, [heading: String]]) -> String`

Converts an array of formatted objects into an SSA string.

`styles` refers to the style definition heading located at the top of the file, this string is not validated so please ensure you pass in a valid format for SSA/ASS. If none is passed a default style block is used. I've created another module for the sole purpose of handling this portion of an SSA file https://github.com/padraigfl/subtitle-ssa-styler
This style will always be called 'primary' so any passed in style needs to share that name.

`heading` operates the same as styles, except for the top most definitions of the subtitle file, there's very little reason to use this.

### `toMS(ssaTime: String) -> Number`

Converts hh:mm:ss.HH (HH for hundreths as that's SSA's default) to a millisecond integer

### `toSsaTime(mseconds: Number) -> String`

Opposite of `toMS`

## Subtitle Object

The object format used is as follows

```js
{
  start: 123, // start time of subtitle in milliseconds
  end: 456, // end time
  text: 'text', // the text displayed for the subtitle
  secondaryText: 'subtext', // text for displaying subtitles in a separate format
}
```

It should be pretty easy to readapt for any other format if required. I may write up some gists to copy and paste for modules such as subtitles-parser. An optional fourth attribute exists for the ability to add captions, notes and secondary subtitle tracks; it will be styled under the name 'secondary'

## Concessions

- Due to the considerable additional overhead involved, general styles are not preserved.
- As this project stems from a project revolving around merging subtitle files, there are two lines of code which are specifically related to accommodating that but hopefully have other use cases
- Subtitles must be already in UTF-8 format, they seem to work regardless with latin alphabet characters if not but anything else is a wildcard

## Contribution Notes

- I don't really expect anyone to but if they do, please flag an issue first and I'll get back within a day
- When flagging an issue, please inform me of the subtitle file which failed and what the possible causes may have been
- Ideas for extra functionality and more optimised code are very strongly encouraged!

## Thanks

I'd like to thank [G. Santiago](https://github.com/gsantiago) for giving me a great base to work from of how to prepare an npm package with his pretty wonderful looking [subtitle.js package](https://github.com/gsantiago/subtitle.js/) and I'm sure I'll refer to his README as I build mine.
