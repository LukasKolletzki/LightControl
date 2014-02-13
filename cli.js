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

var net = require('net');
var client = net.connect(port, ip, function(){
	client.write(process.argv[2], "utf8", function() {
		process.exit(0);
	});
});
