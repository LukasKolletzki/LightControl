#LightControl
Interface for controlling a RGB LED-strip

##Setup

###Hardware
Put your network shield on your Arduino and plug in your LAN-cable.

Connect your LED-Strip to your arduino like this:
![circuit](http://arduino4projects.com/wp-content/uploads/2013/04/RGB-LED-Strip-Circuit.jpg)

###Arduino software
Open `lightcontrol.ino` in a text editor.
Edit the variables, if neccessary.
Upload it to your Arduino.

###CLI
Open `cli.js` in a text editor.
Edit the first two variables, if neccessary.

##Usage
###Telnet
If everything works, you could connect via `telnet <ip> <port>` and send commands like `#FFFFFF`.

###CLI
The CLI provides some more functions.

####Set color
Use this like telnet command: `./cli.js "#00FF00"`

####Blink
To let your strip blink, use this: `./cli.js "blink" "FIRST_COLOR" "SECOND_COLOR" TIMEOUT TIMES`

- __FIRST_COLOR__: e.g. `#FF00FF`
- __SECOND_COLOR__: e.g. `#00FF00`
- __TIMEOUT__: Delay between color changes in milliseconds. Values smaller than 100ms may not work correctly
- __TIMES__: Optional, you may specify an amount of blinks. If left out, it will blink (nearly) forever

####Random
To let your strip show random colors, use this: `./cli.js "random" TIMEOUT TIMES`

- __TIMEOUT__: Delay between color changes in milliseconds. Values smaller than 100ms may not work correctly
- __TIMES__: Optional, you may specify an amount of color changes. If left out, it will change (nearly) forever

####Fade
You are able to fade from one color to another. Use this: `./cli.js "fade" "FIRST_COLOR" "SECOND_COLOR" TIMEOUT STEPS`

- __FIRST_COLOR__: e.g. `#FF00FF`
- __SECOND_COLOR__: e.g. `#00FF00`
- __TIMEOUT__: Delay between color changes in milliseconds. Values smaller than 100ms may not work correctly
- __STEPS__: Step size, greater value = slower but smoother fade, smaller value = faster but snatchier fade

---

In all cases, remember the leading `#`, this "resets" the color. Also, remember that the letters have to be capitals.

##License
LightControl is a interface for controlling a RGB LED-strip. Copyright (C) 2014 Lukas Kolletzki

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later 
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more 
details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
