# Subtitle SSA

This is a pretty straightforward module for parsing and writing SSA/ASS/Aegisub/SubStation Alpha files which has been designed to closely resemble the two most popular SRT modules I could find, subtitles-parser and subtitle, following the latter's format slightly closer due to it using milleseconds by default in its object time properites. This is part of a series of subtitle related modules which I will be publishing over the next while and have been scoped out in an earlier project on my github.

Written in ES5 purely because I thought it'd be a good restriction to put on myself.
I'd like to thank [G. Santiago](https://github.com/gsantiago) for giving me a great base to work from of how to prepare an npm package with his pretty wonderful looking subtitle.js package and I'm sure I'll refer to it's README as I build mine.

# Setup

Dependencies: None

- `npm run build` compiles a minified bundle file to use in the /dist folder, last I checked it was 3.3kb, which seems pretty good!
- `npm run test` tests code and assesses coverage
- `npm run lint` fairly simple ES5 lint checks on both source code and test files

# Initial objectives

- [x] Build tests (travisCI)[![Build Status](https://travis-ci.org/padraigfl/subtitle-ssa.svg?branch=master)](https://travis-ci.org/padraigfl/subtitle-ssa)
- [ ] Code coverage (nyc/coveralls) [![Coverage Status](https://coveralls.io/repos/github/padraigfl/subtitle-ssa/badge.svg?branch=master)](https://coveralls.io/github/padraigfl/subtitle-ssa?branch=master)
- [x] Maintainabilty checks [![Maintainability](https://api.codeclimate.com/v1/badges/d30d1df26be3154dff5b/maintainability)](https://codeclimate.com/github/padraigfl/subtitle-ssa/maintainability)
- [ ] Enter NPM registry
