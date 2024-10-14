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

  * Create main page
    * Placeholder goose icon/mascot
    * Input text box
    * Translate button
    * Translation display area
  * Create goose mascot
    * Multiple mascots ? or just small/medium/large size, color changes
    * Add goose mascot to files and display on main page
  * Create goose honk audio
    * Initially, just a few different honks
      * On translation, play a random honk audio for each word/clump of letters
    * Prefer: split honk into 3 pieces
      * honk start (played once)
      * honk middle (played on repeat for unknown duration)
      * honk end (played once)
      * On translation, play a random honk start, play honk middle on repeat, play honk end
  * Create goose honk text translation
    * Initially, display honks corresponding to text length
    * Consider changing to match the audio (?)
    