/**
 * Controls a RGB LED-strip via telnet
 * @author Lukas Kolletzki <lukas@kolletzki.info>
 * @version 2014-02-13
 * @copyright (c) 2014, Lukas Kolletzki
 * @license http://www.gnu.org/licenses/ GNU General Public License, version 3 (GPL-3.0)
 */

#include <SPI.h>
#include <Ethernet.h>

byte mac[] = {0x00, 0xAA, 0xBB, 0xCC, 0xDE, 0x02}; //mac
IPAddress ip(42, 13, 37, 42); //ip
const int port = 23; //port

const int ledRed = 3; //red led pin (PWM)
const int ledGrn = 5; //green led pin (PWM)
const int ledBlu = 6; //blie led pin (PWM)
const int debug = 0; //debugging via serial on/off

//internal status variables
int r = 0;
int g = 0;
int b = 0;
int readerPos = 0;
int changed = 0;

EthernetClient client;
EthernetServer server(port);

void setup() {
	if(debug) {
		Serial.begin(57600);
		Serial.println("Pin setup");
	}

	pinMode(ledRed, OUTPUT);
	pinMode(ledGrn, OUTPUT);
	pinMode(ledBlu, OUTPUT);

	if(debug) {
		Serial.println("Pin setup completed\nStarting network setup");
	}

	Ethernet.begin(mac, ip);

	if(debug) {
		Serial.print("IP: ");
		for (byte thisByte = 0; thisByte < 4; thisByte++) {
			Serial.print(Ethernet.localIP()[thisByte], DEC);
			Serial.print(".");
		}

		Serial.println("\nNetwork setup completed");
	}

	server.begin();

	 if(debug) {
		Serial.println("Ready");
	}
}

void loop() {
	EthernetClient client = server.available();
	char c;

	while((c = client.read()) > 0) {
		if (c == '#') {
			r = 0;
			b = 0;
			g = 0;

			readerPos = 0;
		}

		if((c >= '0' && c <= '9') || (c >= 'A' && c <= 'F')) {
			int i = 0;
			if(c >= '0' && c <= '9') {
				i = c-'0';
			} else if(c >= 'A' && c <= 'F') {
				i = c-'A'+10;
			}

			if(readerPos == 0 || readerPos == 1) {
				r += i * (readerPos%2? 1: 16);
			} else if(readerPos == 2 || readerPos == 3) {
				g += i * (readerPos%2? 1: 16);
			} else if(readerPos == 4 || readerPos == 5) {
				b += i * (readerPos%2? 1: 16);
			}

			readerPos++;
			changed = 1;

		}
	}

	if(changed) {
		if(debug) {
			Serial.println("Change value to RGB: " + r + ", " + ", " + g + ", "  + b);
		}
		analogWrite(ledRed, r);
		analogWrite(ledGrn, g);
		analogWrite(ledBlu, b);
		changed = 0;
	}
}
