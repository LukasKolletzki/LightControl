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

var client = net.connect(port, ip, function(){
	switch(process.argv[2]) {
		case "blink":
			blink(process.argv[3], process.argv[4], process.argv[5], process.argv[6], function() {
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
