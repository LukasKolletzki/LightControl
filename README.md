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
If everything works, you could connect via `telnet <ip> <port>` and send commands like `#FFFFFF`.

Another possibility is, to use the CLI. Make sure, `cli.js` it is executable (`chmod +x cli.js`), and node is installed. Then use `cli.js "#FFFFFF`.

In both cases, remember the leading `#`, this "resets" the color. Also, remember that the letters have to be capitals.

##License
LightControl is a interface for controlling a RGB LED-strip. Copyright (C) 2014 Lukas Kolletzki

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later 
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more 
details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
