#!/usr/bin/node
/** 
 * Simple CLI for LED-strip 
 * @author Lukas Kolletzki <lukas@kolletzki.info>
 * @version 2014-02-13
 * @copyright (c) 2014, Lukas Kolletzki
 * @license http://www.gnu.org/licenses/ GNU General Public License, version 3 (GPL-3.0)
 */

var ip = "42.13.37.42"; //arduino's ip
var port = 23; //arduino's port
var randomcolors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#FFFFFF"]; //colors used by random function
var net = require("net");

function blink(color1, color2, timeout, times, cb) {
	if(times || times == undefined) {
		if(times == undefined) {
			newTimes = times;
		} else {
			newTimes = times -1;
		}

		setTimeout(function() {
			client.write(color1, "utf8", function() {
				setTimeout(function() {
					client.write(color2, "utf8", function() {
						blink(color1, color2, timeout, newTimes, cb);
					});
				}, timeout);
			});
		}, timeout);
	} else {
		cb();
	}
}

function random(colors, timeout, times, cb) {
	if(times || times == undefined) {
		if(times == undefined) {
			newTimes = times;
		} else {
			newTimes = times -1;
		}

		setTimeout(function() {
			client.write(colors[Math.floor(Math.random() * colors.length)], "utf8", function() {
				random(colors, timeout, newTimes, cb);
			});
		}, timeout);
	} else {
		cb();
	}
}

var client = net.connect(port, ip, function(){
	switch(process.argv[2]) {
		case "blink":
			blink(process.argv[3], process.argv[4], process.argv[5], process.argv[6], function() {
				process.exit(0);
			});
			break;
		case "random":
			random(randomcolors, process.argv[3], process.argv[4], function() {
				process.exit(0);
			});
			break;
		default:
			client.write(process.argv[2], "utf8", function() {
		        process.exit(0);
			 });
			break;
	}
});

client.setNoDelay();

