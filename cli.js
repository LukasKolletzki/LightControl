#!/usr/bin/node
/** 
 * Simple CLI for LED-strip 
 * @author Lukas Kolletzki <lukas@kolletzki.info>
 * @version 2014-02-14
 * @copyright (c) 2014, Lukas Kolletzki
 * @license http://www.gnu.org/licenses/ GNU General Public License, version 3 (GPL-3.0)
 */

var ip = "42.13.37.42"; //arduino's ip
var port = 23; //arduino's port
var randomColors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#FFFFFF"]; //colors used by random function
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

function d2h(dec) {
	var hex = dec.toString(16);
	if(hex.length == 1) {
		return "0" + hex;
	} else {
		return hex;
	}
}

function fade(colors, timeout, steps, counter, stepSizes, cb) {
	if(counter < steps) {
		var newColors = colors.map(function(current, index, array) {
			return current + counter * stepSizes[index];
		});

		var newColor = ("#" + d2h(Math.round(newColors[0])) + d2h(Math.round(newColors[1])) + d2h(Math.round(newColors[2]))).toUpperCase();

		setTimeout(function() {
			client.write(newColor, "utf8", function() {
				fade(colors, timeout, steps, ++counter, stepSizes, cb);
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
			random(randomColors, process.argv[3], process.argv[4], function() {
				process.exit(0);
			});
			break;
		case "fade":
			var regex = /#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})/;
	        var colorStart = process.argv[3].match(regex).splice(1, 3).map(function(current, index, array) {
    	        return parseInt(current, 16);
        	});
			var colorEnd = process.argv[4].match(regex).splice(1, 3).map(function(current, index, array) {
				return parseInt(current, 16);
			});

			var stepSizes = colorStart.map(function(current, index, array) {
				return (colorEnd[index] - current) / (process.argv[6] - 1);
			});

			fade(colorStart, process.argv[5], process.argv[6], 0, stepSizes, function() {
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

