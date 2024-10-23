## Goose Translator Design Doc ##

## Overview ##

Android app that "translates" text into a series of audio honks. Features different honk pitches and duration depending on the input text. Built with react native, exported to android. For entertainment purposes only, do not attempt to communicate with geese using this app.

## Required Features ##

  * Single page app
  * Mascot/icon of a goose
  * Text box to input user text
  * Button to submit text
  * Resulting honk audio
  * Resulting honk text "translation"

## Ideal Features ##

  * Multiple pages (credits, start page)
  * Swap icon/mascot
  * Change goose pitch/audio depending on mascot
  * Allow user submission of audio
    * Can be functionally useless (gives a random honk regardless of audio)
    * Or speech to text translation
  * Resulting honk audio has multiple types
  * Resulting honk audio has variable duration
  * Resulting honk audio is deterministic based on input
  * Resulting honk text matches audio
  * Pressing translate button multiple times overlaps honks (or cuts off existing ones)

## User Flow ##

  * User opens app, is greeted with start screen
  * User enters text into text box
  * User presses translate button
  * App produces honk audio
  * App produces honk text translation
  * User is allowed to enter new text

## Roadmap ##

  * Create main page -- Finished
    * Placeholder goose icon/mascot
    * Input text box
    * Translate button
    * Translation display area
  * Create goose mascot -- Finished
    * Multiple mascots
    * Add goose mascot to files and display on main page
  * Create goose honk audio -- Finished
    * Play a random honk audio for each word/clump of letters
  * Create goose honk text translation -- Finished
    * Display honks depending on text length and punctuation
  * Create App Icon and Play Store Assets -- Finished
  * Publish to Play Store -- Currently in review process
  * Future updates
    * Replace goose images with custom art
    * Get better audio clips
    * Allow sharing of translations/sound clips