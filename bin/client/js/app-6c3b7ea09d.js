var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app =
/******/function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/var installedModules = {};

	/******/ // The require function
	/******/function __webpack_require__(moduleId) {

		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId])
			/******/return installedModules[moduleId].exports;

		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/exports: {},
			/******/id: moduleId,
			/******/loaded: false
			/******/ };

		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ // Flag the module as loaded
		/******/module.loaded = true;

		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}

	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;

	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;

	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "";

	/******/ // Load entry module and return exports
	/******/return __webpack_require__(0);
	/******/
}(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

	/*global require, console*/
	/*jshint -W097*/
	/*jshint browser: true*/
	"use strict";

	// Fundamental requires <3

	var global = __webpack_require__(1);
	var util = __webpack_require__(2);

	// ======================================================================
	// Chat System.
	// ======================================================================
	var modifyOverlyLongName = function modifyOverlyLongName(name, fontSize, maxLength) {
		var nameLength = measureText(name, fontSize);

		// Need to check the length of name in pixels, otherwise,
		// Arabic names tend to mess up the display.
		// Examples:
		// ﷽﷽﷽﷽﷽﷽﷽﷽﷽
		// ﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽﷽
		if (nameLength >= maxLength) {
			return 'a spoopy 👻';
		} else {
			return name;
		}
	};
	// ======================================================================


	// Get color
	var config = {
		graphical: {
			screenshotMode: false,
			borderChunk: 6,
			barChunk: 5,
			mininumBorderChunk: 3,
			deathBlurAmount: 3,
			darkBorders: false,
			fancyAnimations: true,
			colors: 'normal',
			pointy: true,
			fontSizeBoost: 1,
			neon: false
		},
		gui: {
			expectedMaxSkillLevel: 9
		},
		lag: {
			unresponsive: false,
			memory: 60
		}
	};
	var color = {};
	util.pullJSON('color').then(function (data) {
		return color = data;
	});

	// Color functions
	var mixColors = function () {
		/** https://gist.github.com/jedfoster/7939513 **/
		function d2h(d) {
			return d.toString(16);
		} // convert a decimal value to hex
		function h2d(h) {
			return parseInt(h, 16);
		} // convert a hex value to decimal 
		return function (color_2, color_1) {
			var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;

			if (weight === 1) return color_1;
			if (weight === 0) return color_2;
			var col = "#";
			for (var i = 1; i <= 6; i += 2) {
				// loop through each of the 3 hex pairs—red, green, and blue, skip the '#'
				var v1 = h2d(color_1.substr(i, 2)),

				// extract the current pairs
				v2 = h2d(color_2.substr(i, 2)),


				// combine the current pairs from each source color, according to the specified weight
				val = d2h(Math.floor(v2 + (v1 - v2) * weight));

				while (val.length < 2) {
					val = '0' + val;
				} // prepend a '0' if val results in a single digit        
				col += val; // concatenate val to our new color string
			}
			return col; // PROFIT!
		};
	}();
	function getColor(colorNumber) {
		switch (colorNumber) {
			case 0:
				return color.teal;
			case 1:
				return color.lgreen;
			case 2:
				return color.orange;
			case 3:
				return color.yellow;
			case 4:
				return color.lavender;
			case 5:
				return color.pink;
			case 6:
				return color.vlgrey;
			case 7:
				return color.lgrey;
			case 8:
				return color.guiwhite;
			case 9:
				return color.black;
			case 10:
				return color.blue;
			case 11:
				return color.green;
			case 12:
				return color.red;
			case 13:
				return color.gold;
			case 14:
				return color.purple;
			case 15:
				return color.magenta;
			case 16:
				return color.grey;
			case 17:
				return color.dgrey;
			case 18:
				return color.white;
			case 19:
				return color.guiblack;

			default:
				return '#FF0000';
		}
	}
	function getColorDark(givenColor) {
		var dark = config.graphical.neon ? color.white : color.black;
		if (config.graphical.darkBorders) return dark;
		return mixColors(givenColor, dark, color.border);
	}
	function getZoneColor(cell, real) {
		switch (cell) {
			case 'bas1':
				return color.blue;
			case 'bas2':
				return color.green;
			case 'bas3':
				return color.red;
			case 'bas4':
				return color.pink;
			//case 'nest': return (real) ? color.purple : color.lavender;     
			default:
				return real ? color.white : color.lgrey;
		}
	}
	function setColor(context, givenColor) {
		if (config.graphical.neon) {
			context.fillStyle = getColorDark(givenColor);
			context.strokeStyle = givenColor;
		} else {
			context.fillStyle = givenColor;
			context.strokeStyle = getColorDark(givenColor);
		}
	}

	// Get mockups <3
	var mockups = [];
	util.pullJSON('mockups').then(function (data) {
		return mockups = data;
	});
	// Mockup functions
	function getEntityImageFromMockup(index) {
		var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : mockups[index].color;

		var mockup = mockups[index];
		return {
			time: 0,
			index: index,
			x: mockup.x,
			y: mockup.y,
			vx: 0,
			vy: 0,
			size: mockup.size,
			realSize: mockup.realSize,
			color: color,
			render: { status: {
					getFade: function getFade() {
						return 1;
					},
					getColor: function getColor() {
						return '#FFFFFF';
					},
					getBlend: function getBlend() {
						return 0;
					},
					health: { get: function get() {
							return 1;
						} },
					shield: { get: function get() {
							return 1;
						} }
				} },
			facing: mockup.facing,
			shape: mockup.shape,
			name: mockup.name,
			score: 0,
			tiggle: 0,
			layer: mockup.layer,
			guns: { length: mockup.guns.length, getPositions: function getPositions() {
					var a = [];mockup.guns.forEach(function () {
						return a.push(0);
					});return a;
				}, update: function update() {} },
			turrets: mockup.turrets.map(function (t) {
				var o = getEntityImageFromMockup(t.index);
				o.realSize = o.realSize / o.size * mockup.size * t.sizeFactor;
				o.size = mockup.size * t.sizeFactor;
				o.angle = t.angle;
				o.offset = t.offset;
				o.direction = t.direction;
				o.facing = t.direction + t.angle;
				return o;
			})
		};
	}

	// Define clickable regions
	global.clickables = function () {
		var Region = function () {
			// Protected classes
			function Clickable() {
				var region = {
					x: 0, y: 0, w: 0, h: 0
				};
				var active = false;
				return {
					set: function set(x, y, w, h) {
						region.x = x;
						region.y = y;
						region.w = w;
						region.h = h;
						active = true;
					},
					check: function check(target) {
						var dx = Math.round(target.x - region.x);
						var dy = Math.round(target.y - region.y);
						return active && dx >= 0 && dy >= 0 && dx <= region.w && dy <= region.h;
					},
					hide: function hide() {
						active = false;
					}
				};
			}
			// Return the constructor
			return function (size) {
				// Define the region
				var data = [];
				for (var i = 0; i < size; i++) {
					data.push(Clickable());
				}
				// Return the region methods
				return {
					place: function place(index) {
						var _data$index;

						for (var _len = arguments.length, a = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
							a[_key - 1] = arguments[_key];
						}

						if (index >= data.length) {
							console.log(index);console.log(data);throw new Error('Trying to reference a clickable outside a region!');
						}
						(_data$index = data[index]).set.apply(_data$index, a);
					},
					hide: function hide() {
						data.forEach(function (r) {
							return r.hide();
						});
					},
					check: function check(x) {
						return data.findIndex(function (r) {
							return r.check(x);
						});
					}
				};
			};
		}();
		return {
			stat: Region(10),
			upgrade: Region(8),
			hover: Region(1),
			skipUpgrades: Region(1)
		};
	}();
	global.statHover = false;
	global.upgradeHover = false;

	// Prepare stuff
	var player = { //Set up the player
		id: -1,
		x: global.screenWidth / 2,
		y: global.screenHeight / 2,
		vx: 0,
		vy: 0,
		renderx: global.screenWidth / 2,
		rendery: global.screenHeight / 2,
		renderv: 1,
		slip: 0,
		view: 1,
		time: 0,
		screenWidth: global.screenWidth,
		screenHeight: global.screenHeight,
		target: { x: global.screenWidth / 2, y: global.screenHeight / 2 }
	};
	var entities = [],
	    users = [],
	    minimap = [],
	    upgradeSpin = 0,
	    messages = [],


	// ============================================================
	// Chat System.
	// ============================================================
	chatMessages = [],


	// ============================================================

	messageFade = 0,
	    newMessage = 0,
	    metrics = {
		latency: 0,
		lag: 0,
		rendertime: 0,
		updatetime: 0,
		lastlag: 0,
		lastrender: 0,
		rendergap: 0,
		lastuplink: 0
	},
	    lastPing = 0,
	    renderTimes = 0,
	    updateTimes = 0,
	    target = { x: player.x, y: player.y },
	    roomSetup = [['norm']],
	    roomSpeed = 0;
	var _gui = {
		getStatNames: function getStatNames(num) {
			switch (num) {
				case 1:
					return ['Body Damage', 'Max Health', 'Bullet Speed', 'Bullet Health', 'Bullet Penetration', 'Bullet Damage', 'Engine Acceleration', 'Movement Speed', 'Shield Regeneration', 'Shield Capacity'];
				case 2:
					return ['Body Damage', 'Max Health', 'Drone Speed', 'Drone Health', 'Drone Penetration', 'Drone Damage', 'Respawn Rate', 'Movement Speed', 'Shield Regeneration', 'Shield Capacity'];
				case 3:
					return ['Body Damage', 'Max Health', 'Drone Speed', 'Drone Health', 'Drone Penetration', 'Drone Damage', 'Max Drone Count', 'Movement Speed', 'Shield Regeneration', 'Shield Capacity'];
				case 4:
					return ['Body Damage', 'Max Health', 'Swarm Speed', 'Swarm Health', 'Swarm Penetration', 'Swarm Damage', 'Reload', 'Movement Speed', 'Shield Regeneration', 'Shield Capacity'];
				case 5:
					return ['Body Damage', 'Max Health', 'Placement Speed', 'Trap Health', 'Trap Penetration', 'Trap Damage', 'Reload', 'Movement Speed', 'Shield Regeneration', 'Shield Capacity'];
				case 6:
					return ['Body Damage', 'Max Health', 'Weapon Speed', 'Weapon Health', 'Weapon Penetration', 'Weapon Damage', 'Reload', 'Movement Speed', 'Shield Regeneration', 'Shield Capacity'];
				default:
					return ['Body Damage', 'Max Health', 'Bullet Speed', 'Bullet Health', 'Bullet Penetration', 'Bullet Damage', 'Reload', 'Movement Speed', 'Shield Regeneration', 'Shield Capacity'];
			}
		},
		skills: [{
			amount: 0,
			color: 'purple',
			cap: 1,
			softcap: 1
		}, {
			amount: 0,
			color: 'pink',
			cap: 1,
			softcap: 1
		}, {
			amount: 0,
			color: 'blue',
			cap: 1,
			softcap: 1
		}, {
			amount: 0,
			color: 'lgreen',
			cap: 1,
			softcap: 1
		}, {
			amount: 0,
			color: 'red',
			cap: 1,
			softcap: 1
		}, {
			amount: 0,
			color: 'yellow',
			cap: 1,
			softcap: 1
		}, {
			amount: 0,
			color: 'green',
			cap: 1,
			softcap: 1
		}, {
			amount: 0,
			color: 'teal',
			cap: 1,
			softcap: 1
		}, {
			amount: 0,
			color: 'gold',
			cap: 1,
			softcap: 1
		}, {
			amount: 0,
			color: 'orange',
			cap: 1,
			softcap: 1
		}],
		points: 0,
		upgrades: [],
		playerid: -1,
		__s: function () {
			var truscore = 0;
			var levelscore = 0;
			var deduction = 0;
			var level = 0;
			var score = Smoothbar(0, 10);
			return {
				setScore: function setScore(s) {
					if (s) {
						score.set(s);
						if (deduction > score.get()) {
							level = 0;deduction = 0;
						}
					} else {
						score = Smoothbar(0, 10);
						level = 0;
					}
				},
				update: function update() {
					levelscore = Math.ceil(1.8 * Math.pow(level + 1, 1.8) - 2 * level + 1);
					if (score.get() - deduction >= levelscore) {
						deduction += levelscore;
						level += 1;
					}
				},
				getProgress: function getProgress() {
					return levelscore ? Math.min(1, Math.max(0, (score.get() - deduction) / levelscore)) : 0;
				},
				getScore: function getScore() {
					return score.get();
				},
				getLevel: function getLevel() {
					return level;
				}
			};
		}(),
		type: 0,
		fps: 0,
		color: 0,
		accel: 0,
		topspeed: 1
	};
	global.clearUpgrades = function () {
		_gui.upgrades = [];
	};
	// Build the leaderboard object
	var _leaderboard = function () {
		var entries = {};
		// Define a handler for a particular entry
		function Entry() {
			var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
			var bar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
			var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

			// The data
			var index = 0,
			    truscore = 0,
			    score = Smoothbar(0, 10);
			// These are the io functions
			return {
				update: function update(i, s) {
					index = i;
					score.set(s);
				},
				publish: function publish() {
					// Return the data package
					var ref = mockups[index];
					return {
						image: getEntityImageFromMockup(index, color),
						position: ref.position,
						barcolor: getColor(bar),
						label: name === '' ? ref.name : name + ' - ' + ref.name,
						score: score.get()
					};
				}
			};
		}
		// Return the leaderboard methods
		return {
			get: function get() {
				var out = [],
				    maxscore = 1;
				for (var e in entries) {
					if (!entries.hasOwnProperty(e)) continue;
					var data = entries[e].publish();
					out.push(data);
					if (data.score > maxscore) {
						maxscore = data.score;
					}
				}
				out.sort(function (a, b) {
					return b.score - a.score;
				});
				return { data: out, max: maxscore };
			},
			remove: function remove(index) {
				if (entries['_' + index] === undefined) {
					console.log('Warning: Asked to removed an unknown leaderboard entry.');return -1;
				}
				delete entries['_' + index];
			},
			add: function add(data) {
				var newentry = Entry(data.name, data.barcolor, data.color);
				newentry.update(data.index, data.score);
				entries['_' + data.id] = newentry;
			},
			update: function update(data) {
				if (entries['_' + data.id] === undefined) {
					console.log('Warning: Asked to update an unknown leaderboard entry.');return -1;
				}
				entries['_' + data.id].update(data.index, data.score);
			},
			purge: function purge() {
				entries = {};
			}
		};
	}();
	// The ratio finder
	var getRatio = function getRatio() {
		return Math.max(global.screenWidth / player.renderv, global.screenHeight / player.renderv / 9 * 16);
	};

	global.target = target;
	global.player = player;

	// ============================================================
	// Chat system.
	// ============================================================
	global.playersList = [];
	global.playersListIndex = 0;
	global.selectedPlayerId = 0;
	// ============================================================

	global.canUpgrade = false;
	global.canSkill = false;
	global.message = '';
	global.time = 0;

	// Window setup <3
	global.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
	var serverName = 'Unknown Server';
	window.onload = function () {
		// Server name stuff
		switch (window.location.hostname) {
			case '139.162.69.30':
				serverName = '🇯🇵 arras-linode-tokyo';break;
			case '172.104.9.164':
				serverName = '🇺🇸 arras-linode-newark';break;
		}
		document.getElementById('serverName').innerHTML = '<h4 class="nopadding">' + serverName + '</h4>';
		// Save forms
		util.retrieveFromLocalStorage('playerNameInput');
		util.retrieveFromLocalStorage('playerKeyInput');
		util.retrieveFromLocalStorage('optScreenshotMode');
		util.retrieveFromLocalStorage('optPredictive');
		util.retrieveFromLocalStorage('optFancy');
		util.retrieveFromLocalStorage('optColors');
		util.retrieveFromLocalStorage('optNoPointy');
		util.retrieveFromLocalStorage('optBorders');
		// Set default theme
		if (document.getElementById('optColors').value === '') {
			document.getElementById('optColors').value = 'normal';
		}
		if (document.getElementById('optBorders').value === '') {
			document.getElementById('optBorders').value = 'normal';
		}
		// Game start stuff
		document.getElementById('startButton').onclick = function () {
			return startGame();
		};
		document.onkeydown = function (e) {
			var key = e.which || e.keyCode;
			if (key === global.KEY_ENTER && (global.dead || !global.gameStart)) {
				startGame();
			}
		};
		// Resizing stuff
		window.addEventListener('resize', function () {
			player.screenWidth = c.width = global.screenWidth = window.innerWidth;
			player.screenHeight = c.height = global.screenHeight = window.innerHeight;
		});
	};

	// Prepare canvas stuff
	var Canvas = __webpack_require__(3);
	window.canvas = new Canvas();
	var c = window.canvas.cv;
	var ctx = c.getContext('2d');
	var c2 = document.createElement('canvas');
	var ctx2 = c2.getContext('2d');ctx2.imageSmoothingEnabled = false;

	// Animation things
	function isInView(x, y, r) {
		var mid = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

		var ratio = getRatio();
		r += config.graphical.borderChunk;
		if (mid) {
			ratio *= 2;
			return x > -global.screenWidth / ratio - r && x < global.screenWidth / ratio + r && y > -global.screenHeight / ratio - r && y < global.screenHeight / ratio + r;
		}
		return x > -r && x < global.screenWidth / ratio + r && y > -r && y < global.screenHeight / ratio + r;
	}
	function Smoothbar(value, speed) {
		var sharpness = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;

		var time = Date.now();
		var display = value;
		var oldvalue = value;
		return {
			set: function set(val) {
				if (value !== val) {
					oldvalue = display;
					value = val;
					time = Date.now();
				}
			},
			get: function get() {
				var timediff = (Date.now() - time) / 1000;
				display = timediff < speed ? oldvalue + (value - oldvalue) * Math.pow(timediff / speed, 1 / sharpness) : value;
				return display;
			}
		};
	}

	// Some stuff we need before we can set up the socket
	var sync = [];
	var clockDiff = 0;
	var serverStart = 0;
	var lag = function () {
		var lags = [];
		return {
			get: function get() {
				if (!lags.length) return 0;
				var sum = lags.reduce(function (a, b) {
					return a + b;
				});
				return sum / lags.length;
			},
			add: function add(l) {
				lags.push(l);
				if (lags.length > config.lag.memory) {
					lags.splice(0, 1);
				}
			}
		};
	}();
	var getNow = function getNow() {
		return Date.now() - clockDiff - serverStart;
	};
	var player = {
		vx: 0,
		vy: 0,
		lastvx: 0,
		lastvy: 0,
		renderx: player.x,
		rendery: player.y,
		lastx: player.x,
		lasty: player.y,
		target: window.canvas.target,
		name: '',
		lastUpdate: 0,
		time: 0
	};

	// Jumping the gun on motion
	var moveCompensation = function () {
		var xx = 0,
		    yy = 0,
		    vx = 0,
		    vy = 0;
		return {
			reset: function reset() {
				xx = 0;
				yy = 0;
			},
			get: function get() {
				if (config.lag.unresponsive) {
					return {
						x: 0,
						y: 0
					};
				}
				return {
					x: xx,
					y: yy
				};
			},
			iterate: function iterate(g) {
				if (global.died || global.gameStart) return 0;
				// Add motion
				var damp = _gui.accel / _gui.topSpeed,
				    len = Math.sqrt(g.x * g.x + g.y * g.y);
				vx += _gui.accel * g.x / len;
				vy += _gui.accel * g.y / len;
				// Dampen motion
				var motion = Math.sqrt(vx * vx + vy * vy);
				if (motion > 0 && damp) {
					var finalvelocity = motion / (damp / roomSpeed + 1);
					vx = finalvelocity * vx / motion;
					vy = finalvelocity * vy / motion;
				}
				xx += vx;
				yy += vy;
			}
		};
	}();

	// Prepare the websocket for definition
	var socketInit = function () {
		// Inital setup stuff
		window.WebSocket = window.WebSocket || window.MozWebSocket;
		var protocol = __webpack_require__(4);
		// This is what we use to figure out what the hell the server is telling us to look at
		var convert = function () {
			// Make a data crawler
			var get = function () {
				var index = 0,
				    crawlData = [];
				return {
					next: function next() {
						if (index >= crawlData.length) {
							console.log(crawlData);
							throw new Error('Trying to crawl past the end of the provided data!');
						} else {
							return crawlData[index++];
						}
					},
					set: function set(data) {
						crawlData = data;index = 0;
					}
				};
			}();
			// Return our handlers 
			return {
				begin: function begin(data) {
					return get.set(data);
				},
				// Make a data convertor
				data: function () {
					// Make a converter
					var process = function () {
						// Some status manager constructors
						var GunContainer = function () {
							function physics(g) {
								g.isUpdated = true;
								if (g.motion || g.position) {
									// Simulate recoil
									g.motion -= 0.2 * g.position;
									g.position += g.motion;
									if (g.position < 0) {
										// Bouncing off the back
										g.position = 0;
										g.motion = -g.motion;
									}
									if (g.motion > 0) {
										g.motion *= 0.5;
									}
								}
							}
							return function (n) {
								var a = [];
								for (var i = 0; i < n; i++) {
									a.push({ motion: 0, position: 0, isUpdated: true });
								}
								return {
									getPositions: function getPositions() {
										return a.map(function (g) {
											return g.position;
										});
									},
									update: function update() {
										return a.forEach(physics);
									},
									fire: function fire(i, power) {
										if (a[i].isUpdated) a[i].motion += Math.sqrt(power) / 20;a[i].isUpdated = false;
									},
									length: a.length
								};
							};
						}();
						function Status() {
							var state = 'normal',
							    time = getNow();
							return {
								set: function set(val) {
									if (val !== state || state === 'injured') {
										if (state !== 'dying') time = getNow();
										state = val;
									}
								},
								getFade: function getFade() {
									return state === 'dying' || state === 'killed' ? 1 - Math.min(1, (getNow() - time) / 300) : 1;
								},
								getColor: function getColor() {
									return '#FFFFFF';
								},
								getBlend: function getBlend() {
									var o = state === 'normal' || state === 'dying' ? 0 : 1 - Math.min(1, (getNow() - time) / 80);
									if (getNow() - time > 500 && state === 'injured') {
										state = 'normal';
									}
									return o;
								}
							};
						}
						// Return our function
						return function () {
							var z = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

							var isNew = z.facing == null; // For whatever reason arguments.length is uglified poorly...
							// Figure out what kind of data we're looking at
							var type = get.next();
							// Handle it appropiately
							if (type & 0x01) {
								// issa turret
								z.facing = get.next();
								z.layer = get.next();
							} else {
								// issa something real
								z.interval = metrics.rendergap;
								z.id = get.next();
								// Determine if this is an new entity or if we already know about it
								var iii = entities.findIndex(function (x) {
									return x.id === z.id;
								});
								if (iii !== -1) {
									// remove it if needed (this way we'll only be left with the dead/unused entities)
									z = entities.splice(iii, 1)[0];
								}
								// Change the use of the variable
								isNew = iii === -1;
								// If it's not new, save the memory data
								if (!isNew) {
									z.render.draws = true; // yay!!
									z.render.lastx = z.x;
									z.render.lasty = z.y;
									z.render.lastvx = z.vx;
									z.render.lastvy = z.vy;
									z.render.lastf = z.facing;
									z.render.lastRender = player.time;
								}
								// Either way, keep pulling information
								z.index = get.next();
								z.x = get.next();
								z.y = get.next();
								z.vx = get.next();
								z.vy = get.next();
								z.size = get.next();
								z.facing = get.next();
								z.vfacing = get.next();
								z.twiggle = get.next();
								z.layer = get.next();
								z.color = get.next();

								// ============================================================
								// Rectangular maze walls.
								// ============================================================
								z.sizeVert = get.next();
								z.rotation = get.next();
								// ============================================================

								// =============================================
								// Chat System.
								// =============================================
								z.roleColorIndex = get.next();
								// =============================================

								// Update health, flagging as injured if needed
								if (isNew) {
									z.health = get.next() / 255;
									z.shield = get.next() / 255;
								} else {
									var hh = z.health,
									    ss = z.shield;
									z.health = get.next() / 255;
									z.shield = get.next() / 255;
									// Update stuff
									if (z.health < hh || z.shield < ss) {
										z.render.status.set('injured');
									} else if (z.render.status.getFade() !== 1) {
										// If it turns out that we thought it was dead and it wasn't
										z.render.status.set('normal');
									}
								}
								z.drawsHealth = !!(type & 0x02); // force to boolean
								// Nameplates
								if (type & 0x04) {
									// has a nameplate
									z.name = get.next();
									z.score = get.next();
								}
								z.nameplate = type & 0x04;
								// If it's new, give it rendering information
								if (isNew) {
									z.render = {
										draws: false,
										expandsWithDeath: z.drawsHealth,
										lastRender: player.time,
										x: z.x,
										y: z.y,
										lastx: z.x - metrics.rendergap * config.roomSpeed * (1000 / 30) * z.vx,
										lasty: z.y - metrics.rendergap * config.roomSpeed * (1000 / 30) * z.vy,
										lastvx: z.vx,
										lastvy: z.vy,
										lastf: z.facing,
										f: z.facing,
										h: z.health,
										s: z.shield,
										interval: metrics.rendergap,
										slip: 0,
										status: Status(),
										health: Smoothbar(z.health, 0.5, 5),
										shield: Smoothbar(z.shield, 0.5, 5)
									};
								}
								// Update the rendering healthbars
								z.render.health.set(z.health);
								z.render.shield.set(z.shield);
								// Figure out if the class changed (and if so, refresh the guns and turrets)
								if (!isNew && z.oldIndex !== z.index) isNew = true;
								z.oldIndex = z.index;
							}
							// If it needs to have a gun container made, make one
							var gunnumb = get.next();
							if (isNew) {
								z.guns = GunContainer(gunnumb);
							} else if (gunnumb !== z.guns.length) {
								throw new Error('Mismatch between data gun number and remembered gun number!');
							}
							// Decide if guns need to be fired one by one
							for (var i = 0; i < gunnumb; i++) {
								var time = get.next(),
								    power = get.next();
								if (time > player.lastUpdate - metrics.rendergap) {
									// shoot it
									z.guns.fire(i, power);
								}
							}
							// Update turrets
							var turnumb = get.next();
							if (turnumb) {
								var b = 1;
							}
							if (isNew) {
								z.turrets = [];
								for (var _i = 0; _i < turnumb; _i++) {
									z.turrets.push(process());
								}
							} else {
								if (z.turrets.length !== turnumb) {
									throw new Error('Mismatch between data turret number and remembered turret number!');
								}
								z.turrets.forEach(function (tur) {
									tur = process(tur);
								});
							}
							// Return our monsterous creation
							return z;
						};
					}();
					// And this is the function we return that crawls some given data and reports it
					return function () {
						// Set up the output thingy+
						var output = [];
						// Get the number of entities and work through them
						for (var i = 0, len = get.next(); i < len; i++) {
							output.push(process());
						}
						// Handle the dead/leftover entities
						entities.forEach(function (e) {
							// Kill them
							e.render.status.set(e.health === 1 ? 'dying' : 'killed');
							// And only push them if they're not entirely dead and still visible
							if (e.render.status.getFade() !== 0 && isInView(e.render.x - player.renderx, e.render.y - player.rendery, e.size, true)) {
								output.push(e);
							} else {
								if (e.render.textobjs != null) e.render.textobjs.forEach(function (o) {
									return o.remove();
								});
							}
						});
						// Save the new entities list
						entities = output;
						entities.sort(function (a, b) {
							var sort = a.layer - b.layer;
							if (!sort) sort = b.id - a.id;
							if (!sort) throw new Error('tha fuq is up now');
							return sort;
						});
					};
				}(),
				// Define our gui convertor
				gui: function gui() {
					var index = get.next(),


					// Translate the encoded index
					indices = {
						topspeed: index & 0x0100,
						accel: index & 0x0080,
						skills: index & 0x0040,
						statsdata: index & 0x0020,
						upgrades: index & 0x0010,
						points: index & 0x0008,
						score: index & 0x0004,
						label: index & 0x0002,
						fps: index & 0x0001
					};
					// Operate only on the values provided
					if (indices.fps) {
						_gui.fps = get.next();
					}
					if (indices.label) {
						_gui.type = get.next();
						_gui.color = get.next();
						_gui.playerid = get.next();
					}
					if (indices.score) {
						_gui.__s.setScore(get.next());
					}
					if (indices.points) {
						_gui.points = get.next();
					}
					if (indices.upgrades) {
						_gui.upgrades = [];
						for (var i = 0, len = get.next(); i < len; i++) {
							_gui.upgrades.push(get.next());
						}
					}
					if (indices.statsdata) {
						for (var _i2 = 9; _i2 >= 0; _i2--) {
							_gui.skills[_i2].name = get.next();
							_gui.skills[_i2].cap = get.next();
							_gui.skills[_i2].softcap = get.next();
						}
					}
					if (indices.skills) {
						var skk = parseInt(get.next(), 36).toString(16);
						skk = '0000000000'.substr(skk.length) + skk;
						_gui.skills[0].amount = parseInt(skk.slice(0, 1), 16);
						_gui.skills[1].amount = parseInt(skk.slice(1, 2), 16);
						_gui.skills[2].amount = parseInt(skk.slice(2, 3), 16);
						_gui.skills[3].amount = parseInt(skk.slice(3, 4), 16);
						_gui.skills[4].amount = parseInt(skk.slice(4, 5), 16);
						_gui.skills[5].amount = parseInt(skk.slice(5, 6), 16);
						_gui.skills[6].amount = parseInt(skk.slice(6, 7), 16);
						_gui.skills[7].amount = parseInt(skk.slice(7, 8), 16);
						_gui.skills[8].amount = parseInt(skk.slice(8, 9), 16);
						_gui.skills[9].amount = parseInt(skk.slice(9, 10), 16);
					}
					if (indices.accel) {
						_gui.accel = get.next();
					}
					if (indices.topspeed) {
						_gui.topspeed = get.next();
					}
				},
				// Make a minimap convertor
				minimap: function () {
					var loop = function () {
						// A test function
						function challenge(value, challenger) {
							return value[0] === challenger[0] && value[1] === challenger[1] && value[2] === challenger[2] &&
							// ============================================================
							// Rectangular maze walls.
							// ============================================================
							value[3] === challenger[3] && value[4] === challenger[4] && value[5] === challenger[5];
							// ============================================================
						}
						// The loop function definition
						return function () {
							// Pull the update order
							var type = get.next(),
							    x = get.next() * global.gameWidth / 255,
							    y = get.next() * global.gameHeight / 255,
							    color = get.next(),


							// ============================================================
							// Rectangular maze walls.
							// ============================================================
							size = get.next(),
							    sizeVert = get.next(),
							    rotation = get.next();
							// ============================================================

							// Fufill the order
							switch (type) {
								case -1:
									{
										// removal

										// ============================================================
										// Rectangular maze walls.
										// ============================================================
										var index = minimap.findIndex(function (e) {
											return challenge(e, [x, y, color, size, sizeVert, rotation]);
										});
										// ============================================================

										if (index === -1) {
											console.log('Warning: Remove request for a minimap node we were not aware of.');
										} else {
											minimap.splice(index, 1);
										}
									}break;
								case 1:
									{
										//insertion
										// ============================================================
										// Rectangular maze walls.
										// ============================================================
										minimap.push([x, y, color, size, sizeVert, rotation]);
										// ============================================================
									}break;
								default:
									console.log('Unknown minimap update request.');
							}
						};
					}();
					// The update function
					return function () {
						for (var i = 0, len = get.next(); i < len; i++) {
							loop();
						}
					};
				}(),
				// Define our leaderboard convertor
				leaderboard: function leaderboard() {
					var whoopswedesynced = false;
					// First crawl the remove orders
					var first = get.next();
					if (first === -1) {
						// o shit its a full refresh, nuke it and start over
						_leaderboard.purge();
					} else {
						// Remove things normally
						for (var i = 0, len = first; i < len; i++) {
							_leaderboard.remove(get.next());
						}
					}
					// Then do the next things
					for (var _i3 = 0, _len2 = get.next(); _i3 < _len2; _i3++) {
						var next = get.next();
						if (next < 0) {
							// It's an add index!
							var toadd = {
								id: -next,
								score: get.next(),
								index: get.next(),
								name: get.next(),
								color: get.next(),
								barcolor: get.next()
							};
							_leaderboard.add(toadd);
						} else {
							// It's an update index!
							var w = _leaderboard.update({
								id: next,
								score: get.next(),
								index: get.next()
							});
							if (w === -1) whoopswedesynced = true;
						}
					}
					return whoopswedesynced;
				}
			};
		}();
		// The initialization function (this is returned)
		return function (port) {
			var socket = new WebSocket('ws://' + window.location.hostname + ':' + port);
			// Set up our socket
			socket.binaryType = 'arraybuffer';
			socket.open = false;
			// Handle commands
			socket.cmd = function () {
				var flag = false;
				var commands = [false, // up
				false, // down
				false, // left
				false, // right
				false, // lmb
				false, // mmb
				false, // rmb 
				false];
				return {
					set: function set(index, value) {
						if (commands[index] !== value) {
							commands[index] = value;flag = true;
						}
					},
					talk: function talk() {
						flag = false;
						var o = 0;
						for (var i = 0; i < 8; i++) {
							if (commands[i]) o += Math.pow(2, i);
						}
						var ratio = getRatio();
						socket.talk('C', Math.round(window.canvas.target.x / ratio), Math.round(window.canvas.target.y / ratio), o);
					},
					check: function check() {
						return flag;
					},
					getMotion: function getMotion() {
						return { x: commands[3] - commands[2], y: commands[1] - commands[0] };
					}
				};
			}();
			// Learn how to talk
			socket.talk = function () {
				for (var _len3 = arguments.length, message = Array(_len3), _key2 = 0; _key2 < _len3; _key2++) {
					message[_key2] = arguments[_key2];
				}

				// Make sure the socket is open before we do anything
				if (!socket.open) return 1;
				socket.send(protocol.encode(message));
			};
			// Websocket functions for when stuff happens
			// This is for when the socket first opens
			socket.onopen = function socketOpen() {
				socket.open = true;
				global.message = 'That token is invalid, expired, or already in use on this server. Please try another one!';
				socket.talk('k', global.playerKey);console.log('Token submitted to the server for validation.');
				// define a pinging function
				socket.ping = function (payload) {
					socket.talk('p', payload);
				};
				socket.commandCycle = setInterval(function () {
					if (socket.cmd.check()) socket.cmd.talk();
				});
			};
			// Handle incoming messages
			socket.onmessage = function socketMessage(message) {
				// Make sure it looks legit.
				var m = protocol.decode(message.data);
				if (m === -1) {
					throw new Error('Malformed packet.');
				}
				// Decide how to interpret it
				switch (m.splice(0, 1)[0]) {
					case 'w':
						{
							// welcome to the game
							if (m[0]) {
								// Ask to spawn                    
								console.log('The server has welcomed us to the game room. Sending spawn request.');
								socket.talk('s', global.playerName, 1);
								global.message = '';
							}
						}break;

					// =============================================================
					// Chat System.
					// =============================================================
					// Receive player id.
					case 'I':
						{
							if (global.player) {
								console.log('Player id received: ' + m[0]);
								player.id = m[0];
								global.player.id = m[0];
							}
						}break;

					// Receive player name.
					case 'N':
						{
							if (global.player) {
								console.log('Player name received: ' + m[0]);
								global.playerName = player.name = m[0];
							}
						}break;

					// Receive players list.
					case 'L':
						{
							// ==================================================
							// The array contains alternate id and name.
							// For example:
							// m[0] => Player Id
							// m[1] => Player Name
							// m[2] => Player Id
							// m[3] => Player Name
							// ==================================================
							global.playersList = m;
						}break;
					// =============================================================

					//
					case 'R':
						{
							// room setup
							global.gameWidth = m[0];
							global.gameHeight = m[1];
							roomSetup = JSON.parse(m[2]);
							serverStart = JSON.parse(m[3]);
							config.roomSpeed = m[4];
							console.log('Room data recieved. Commencing syncing process.');
							// Start the syncing process
							socket.talk('S', getNow());
						}break;
					case 'c':
						{
							// force camera move
							player.renderx = player.x = m[0];
							player.rendery = player.y = m[1];
							player.renderv = player.view = m[2];
							console.log('Camera moved!');
						}break;
					case 'S':
						{
							// clock syncing
							var clientTime = m[0],
							    serverTime = m[1],
							    laten = (getNow() - clientTime) / 2,
							    delta = getNow() - laten - serverTime;
							// Add the datapoint to the syncing data
							sync.push({ delta: delta, latency: laten });
							// Do it again a couple times
							if (sync.length < 10) {
								// Wait a bit just to space things out
								setTimeout(function () {
									socket.talk('S', getNow());
								}, 10);
								global.message = "Syncing clocks, please do not tab away. " + sync.length + "/10...";
							} else {
								// Calculate the clock error
								sync.sort(function (e, f) {
									return e.latency - f.latency;
								});
								var median = sync[Math.floor(sync.length / 2)].latency;
								var sd = 0,
								    sum = 0,
								    valid = 0;
								sync.forEach(function (e) {
									sd += Math.pow(e.latency - median, 2);
								});
								sd = Math.sqrt(sd / sync.length);
								sync.forEach(function (e) {
									if (Math.abs(e.latency - median) < sd) {
										sum += e.delta;valid++;
									}
								});
								clockDiff = Math.round(sum / valid);
								// Start the game
								console.log(sync);
								console.log('Syncing complete, calculated clock difference ' + clockDiff + 'ms. Beginning game.');
								global.gameStart = true;
								global.message = '';
							}
						}break;

					// Original.
					// case 'm': { // message
					//     messages.push({
					//         text: m[0],
					//         status: 2,
					//         alpha: 0,
					//         time: Date.now(),
					//     });
					// } break;

					// =============================================================================
					// Chat System.
					// =============================================================================
					case 'm':
						{
							// message
							messages.push({
								text: m[0],
								status: 2,
								alpha: 0,
								time: Date.now(),
								colorIndex: m[1]
							});
						}break;

					case 'h':
						{
							// Chat message
							chatMessages.push({
								status: 2,
								alpha: 0,
								time: Date.now(),
								playerName: m[0],
								text: m[1],
								colorIndex: m[2]
							});
						}break;
					// =============================================================================


					case 'u':
						{
							// uplink
							// Pull the camera info
							var camtime = m[0],
							    camx = m[1],
							    camy = m[2],
							    camfov = m[3],
							    camvx = m[4],
							    camvy = m[5],


							// We'll have to do protocol decoding on the remaining data
							theshit = m.slice(6);
							// Process the data
							if (camtime > player.lastUpdate) {
								// Don't accept out-of-date information. 
								// Time shenanigans
								lag.add(getNow() - camtime);
								player.time = camtime + lag.get();
								metrics.rendergap = camtime - player.lastUpdate;
								if (metrics.rendergap <= 0) {
									console.log('yo some bullshit is up wtf');
								}
								player.lastUpdate = camtime;
								// Convert the gui and entities
								convert.begin(theshit);
								convert.gui();
								convert.data();
								// Save old physics values
								player.lastx = player.x;
								player.lasty = player.y;
								player.lastvx = player.vx;
								player.lastvy = player.vy;
								// Get new physics values
								player.x = camx;
								player.y = camy;
								player.vx = global.died ? 0 : camvx;
								player.vy = global.died ? 0 : camvy;
								// Figure out where we're rendering if we don't yet know
								if (isNaN(player.renderx)) {
									player.renderx = player.x;
								}
								if (isNaN(player.rendery)) {
									player.rendery = player.y;
								}
								moveCompensation.reset();
								// Fov stuff
								player.view = camfov;
								if (isNaN(player.renderv) || player.renderv === 0) {
									player.renderv = 2000;
								}
								// Metrics
								metrics.lastlag = metrics.lag;
								metrics.lastuplink = getNow();
							} else {
								console.log("Old data! Last given time: " + player.time + "; offered packet timestamp: " + camtime + ".");
							}
							// Send the downlink and the target
							socket.talk('d', Math.max(player.lastUpdate, camtime));
							socket.cmd.talk();
							updateTimes++; // metrics                                        
						}break;
					case 'b':
						{
							// broadcasted minimap
							convert.begin(m);
							convert.minimap();
							if (convert.leaderboard()) {
								// Request an update because of desync
								socket.talk('z');
							}
						}break;
					case 'p':
						{
							// ping
							metrics.latency = global.time - m[0];
						}break;
					case 'F':
						{
							// to pay respects
							global.finalScore = Smoothbar(0, 4);global.finalScore.set(m[0]);
							global.finalLifetime = Smoothbar(0, 5);global.finalLifetime.set(m[1]);
							global.finalKills = [Smoothbar(0, 3), Smoothbar(0, 4.5), Smoothbar(0, 2.5)];
							global.finalKills[0].set(m[2]);global.finalKills[1].set(m[3]);global.finalKills[2].set(m[4]);
							global.finalKillers = [];
							for (var i = 0; i < m[5]; i++) {
								global.finalKillers.push(m[6 + i]);
							}
							global.died = true;
							window.onbeforeunload = function () {
								return false;
							};
						}break;
					case 'K':
						{
							// kicked
							window.onbeforeunload = function () {
								return false;
							};
						}break;
					default:
						throw new Error('Unknown message index.');
				}
			};
			// Handle closing 
			socket.onclose = function socketClose() {
				socket.open = false;
				global.disconnected = true;
				clearInterval(socket.commandCycle);
				window.onbeforeunload = function () {
					return false;
				};
				console.log('Socket closed.');
			};
			// Notify about errors
			socket.onerror = function socketError(error) {
				console.log('WebSocket error: ' + error);
				global.message = 'Socket error. Maybe another server will work.';
			};
			// Gift it to the rest of the world
			return socket;
		};
	}();

	// This starts the game and sets up the websocket
	function startGame() {
		// Get options
		util.submitToLocalStorage('optScreenshotMode');
		config.graphical.screenshotMode = document.getElementById('optScreenshotMode').checked;
		util.submitToLocalStorage('optFancy');
		config.graphical.pointy = !document.getElementById('optNoPointy').checked;
		util.submitToLocalStorage('optNoPointy');
		config.graphical.fancyAnimations = !document.getElementById('optFancy').checked;
		util.submitToLocalStorage('optPredictive');
		config.lag.unresponsive = document.getElementById('optPredictive').checked;
		util.submitToLocalStorage('optBorders');
		switch (document.getElementById('optBorders').value) {
			case 'normal':
				config.graphical.darkBorders = config.graphical.neon = false;
				break;
			case 'dark':
				config.graphical.darkBorders = true;config.graphical.neon = false;
				break;
			case 'glass':
				config.graphical.darkBorders = false;config.graphical.neon = true;
				break;
			case 'neon':
				config.graphical.darkBorders = config.graphical.neon = true;
				break;
		}
		util.submitToLocalStorage('optColors');
		var a = document.getElementById('optColors').value;
		color = color[a === '' ? 'normal' : a];
		// Other more important stuff
		var playerNameInput = document.getElementById('playerNameInput');
		var playerKeyInput = document.getElementById('playerKeyInput');
		// Name and keys
		util.submitToLocalStorage('playerNameInput');
		util.submitToLocalStorage('playerKeyInput');
		global.playerName = player.name = playerNameInput.value;
		global.playerKey = playerKeyInput.value.replace(/(<([^>]+)>)/ig, '').substring(0, 64);
		// Change the screen
		global.screenWidth = window.innerWidth;
		global.screenHeight = window.innerHeight;
		document.getElementById('startMenuWrapper').style.maxHeight = '0px';
		document.getElementById('gameAreaWrapper').style.opacity = 1;
		// Set up the socket
		if (!global.socket) {
			global.socket = socketInit(3000);
		}
		if (!global.animLoopHandle) {
			animloop();
		}
		window.canvas.socket = global.socket;
		minimap = [];
		setInterval(function () {
			return moveCompensation.iterate(global.socket.cmd.getMotion());
		}, 1000 / 30);
		document.getElementById('gameCanvas').focus();
		window.onbeforeunload = function () {
			return true;
		};
	}

	// Background clearing
	function clearScreen(clearColor, alpha) {
		ctx.fillStyle = clearColor;
		ctx.globalAlpha = alpha;
		ctx.fillRect(0, 0, global.screenWidth, global.screenHeight);
		ctx.globalAlpha = 1;
	}

	// Text functions
	var measureText = function () {
		var div = document.createElement('div');document.body.appendChild(div);
		return function (text, fontSize) {
			var twod = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

			fontSize += config.graphical.fontSizeBoost;
			var w, h;
			div.style.font = 'bold ' + fontSize + 'px Ubuntu';
			div.style.padding = '0';
			div.style.margin = '0';
			div.style.position = 'absolute';
			div.style.visibility = 'hidden';
			div.innerHTML = text;
			w = div.clientWidth;
			h = div.clientHeight;
			return twod ? { width: w, height: h } : w;
		};
	}();
	var TextObj = function () {
		// A thing
		var floppy = function floppy() {
			var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			var flagged = true;
			// Methods
			return {
				update: function update(newValue) {
					var eh = false;
					if (value == null) {
						eh = true;
					} else {
						if ((typeof newValue === "undefined" ? "undefined" : _typeof(newValue)) != (typeof value === "undefined" ? "undefined" : _typeof(value))) {
							eh = true;
						}
						// Decide what to do based on what type it is
						switch (typeof newValue === "undefined" ? "undefined" : _typeof(newValue)) {
							case 'number':
							case 'string':
								{
									if (newValue !== value) {
										eh = true;
									}
								}break;
							case 'object':
								{
									if (Array.isArray(newValue)) {
										if (newValue.length !== value.length) {
											eh = true;
										} else {
											for (var i = 0, len = newValue.length; i < len; i++) {
												if (newValue[i] !== value[i]) eh = true;
											}
										}
										break;
									}
								} // jshint ignore:line
							default:
								console.log(newValue);
								throw new Error('Unsupported type for a floppyvar!');
						}
					}
					// Update if neeeded
					if (eh) {
						flagged = true;
						value = newValue;
					}
				},
				publish: function publish() {
					return value;
				},
				check: function check() {
					if (flagged) {
						flagged = false;
						return true;
					}
					return false;
				}
			};
		};
		// An index
		var index = 0;
		return function () {
			var textcanvas = document.createElement('canvas');
			var canvasId = 'textCanvasNo' + index++;
			textcanvas.setAttribute('id', canvasId);
			var tctx = textcanvas.getContext('2d');
			tctx.imageSmoothingEnabled = false;
			// Init stuff
			var floppies = [floppy(''), floppy(0), floppy(0), floppy(1), floppy('#FF0000'), floppy('left')];
			var vals = floppies.map(function (f) {
				return f.publish();
			});
			var xx = 0;
			var yy = 0;
			return {
				draw: function draw(text, x, y, size, fill) {
					var align = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'left';
					var center = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
					var fade = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;

					size += config.graphical.fontSizeBoost;
					// Update stuff
					floppies[0].update(text);
					floppies[1].update(x);
					floppies[2].update(y);
					floppies[3].update(size);
					floppies[4].update(fill);
					floppies[5].update(align);
					// Check stuff
					if (floppies.some(function (f) {
						return f.check();
					})) {
						// Get text dimensions and resize/reset the canvas
						var offset = Math.max(3, size / 5);
						var dim = measureText(text, size - config.graphical.fontSizeBoost, true);
						tctx.canvas.height = dim.height + 2 * offset;
						tctx.canvas.width = dim.width + 2 * offset;
						// Redraw it
						switch (align) {
							case 'left':
							case 'start':
								xx = offset;
								break;
							case 'center':
								xx = tctx.canvas.width / 2;
								break;
							case 'right':
							case 'end':
								xx = tctx.canvas.width - offset;
								break;
						}
						yy = tctx.canvas.height / 2;
						// Draw it
						tctx.lineWidth = offset;
						tctx.font = 'bold ' + size + 'px Ubuntu';
						tctx.textAlign = align;tctx.textBaseline = 'middle';
						tctx.strokeStyle = color.black;
						tctx.fillStyle = fill;
						tctx.lineCap = 'round';
						tctx.lineJoin = 'round';
						tctx.strokeText(text, xx, yy);
						tctx.fillText(text, xx, yy);
					}
					// Draw the cached text
					ctx.save();
					ctx.imageSmoothingEnabled = false;
					ctx.drawImage(tctx.canvas, x - xx, y - yy * (1.05 + !center * 0.45));
					ctx.restore();
				},
				remove: function remove() {
					var element = document.getElementById(canvasId);
					if (element != null) element.parentNode.removeChild(element);
				}
			};
		};
	}();

	// Gui drawing functions
	function drawGuiRect(x, y, length, height) {
		var stroke = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

		switch (stroke) {
			case true:
				ctx.strokeRect(x, y, length, height);break;
			case false:
				ctx.fillRect(x, y, length, height);break;
		}
	}

	function drawGuiLine(x1, y1, x2, y2) {
		ctx.beginPath();
		ctx.lineTo(Math.round(x1) + 0.5, Math.round(y1) + 0.5);
		ctx.lineTo(Math.round(x2) + 0.5, Math.round(y2) + 0.5);
		ctx.closePath();
		ctx.stroke();
	}

	function drawBar(x1, x2, y, width, color) {
		ctx.beginPath();
		ctx.lineTo(x1, y);
		ctx.lineTo(x2, y);
		ctx.lineWidth = width;
		ctx.strokeStyle = color;
		ctx.closePath();
		ctx.stroke();
	}

	// Entity drawing (this is a function that makes a function)
	var drawEntity = function () {
		// ============================================================
		// Rectangular maze walls.
		// ============================================================
		function drawRectangle(context, centerX, centerY, width, height) {
			context.save();
			context.beginPath();
			var rectX = centerX - width;
			var rectY = centerY - height;

			context.rect(rectX, rectY, width * 2, height * 2);
			context.closePath();
			context.stroke();
			context.fill();
			context.restore();
		}
		// ============================================================

		// Sub-drawing functions
		function drawPoly(context, centerX, centerY, radius, sides) {
			var angle = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
			var fill = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;

			angle += sides % 2 ? 0 : Math.PI / sides;
			// Start drawing
			context.beginPath();
			if (!sides) {
				// Circle
				context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
			} else if (sides < 0) {
				// Star
				if (config.graphical.pointy) context.lineJoin = 'miter';
				var dip = 1 - 6 / sides / sides;
				sides = -sides;
				context.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
				for (var i = 0; i < sides; i++) {
					var theta = (i + 1) / sides * 2 * Math.PI;
					var htheta = (i + 0.5) / sides * 2 * Math.PI;
					var c = {
						x: centerX + radius * dip * Math.cos(htheta + angle),
						y: centerY + radius * dip * Math.sin(htheta + angle)
					};
					var p = {
						x: centerX + radius * Math.cos(theta + angle),
						y: centerY + radius * Math.sin(theta + angle)
					};
					context.quadraticCurveTo(c.x, c.y, p.x, p.y);
				}
			} else if (sides > 0) {
				// Polygon
				for (var _i4 = 0; _i4 < sides; _i4++) {
					var _theta = _i4 / sides * 2 * Math.PI;
					var x = centerX + radius * Math.cos(_theta + angle);
					var y = centerY + radius * Math.sin(_theta + angle);
					context.lineTo(x, y);
				}
			}
			context.closePath();
			context.stroke();
			if (fill) {
				context.fill();
			}
			context.lineJoin = 'round';
		}
		function drawTrapezoid(context, x, y, length, height, aspect, angle) {
			var h = [];
			h = aspect > 0 ? [height * aspect, height] : [height, -height * aspect];
			var r = [Math.atan2(h[0], length), Math.atan2(h[1], length)];
			var l = [Math.sqrt(length * length + h[0] * h[0]), Math.sqrt(length * length + h[1] * h[1])];

			context.beginPath();
			context.lineTo(x + l[0] * Math.cos(angle + r[0]), y + l[0] * Math.sin(angle + r[0]));
			context.lineTo(x + l[1] * Math.cos(angle + Math.PI - r[1]), y + l[1] * Math.sin(angle + Math.PI - r[1]));
			context.lineTo(x + l[1] * Math.cos(angle + Math.PI + r[1]), y + l[1] * Math.sin(angle + Math.PI + r[1]));
			context.lineTo(x + l[0] * Math.cos(angle - r[0]), y + l[0] * Math.sin(angle - r[0]));
			context.closePath();
			context.stroke();
			context.fill();
		}
		// The big drawing function
		return function (x, y, instance, ratio) {
			var scale = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
			var rot = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
			var turretsObeyRot = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
			var assignedContext = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
			var turretInfo = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
			var render = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : instance.render;

			var context = assignedContext ? assignedContext : ctx;
			var fade = turretInfo ? 1 : render.status.getFade(),
			    drawSize = scale * ratio * instance.size,
			    m = mockups[instance.index],
			    xx = x,
			    yy = y,
			    source = turretInfo === false ? instance : turretInfo;
			if (render.expandsWithDeath) drawSize *= 1 + 0.5 * (1 - fade);
			if (config.graphical.fancyAnimations && assignedContext != ctx2 && fade !== 1) {
				context = ctx2;
				context.canvas.width = context.canvas.height = drawSize * m.position.axis + ratio * 20;
				xx = context.canvas.width / 2 - drawSize * m.position.axis * m.position.middle.x * Math.cos(rot) / 4;
				yy = context.canvas.height / 2 - drawSize * m.position.axis * m.position.middle.x * Math.sin(rot) / 4;
			}
			context.lineCap = 'round';
			context.lineJoin = 'round';
			// Draw turrets beneath us
			if (source.turrets.length === m.turrets.length) {
				for (var i = 0; i < m.turrets.length; i++) {
					var t = m.turrets[i];
					if (t.layer === 0) {
						var ang = t.direction + t.angle + rot,
						    len = t.offset * drawSize;
						drawEntity(xx + len * Math.cos(ang), yy + len * Math.sin(ang), t, ratio, drawSize / ratio / t.size * t.sizeFactor, source.turrets[i].facing + turretsObeyRot * rot, turretsObeyRot, context, source.turrets[i], render);
					}
				}
			} else {
				throw new Error("Mismatch turret number with mockup.");
			}
			// Draw guns  
			source.guns.update();
			context.lineWidth = Math.max(config.graphical.mininumBorderChunk, ratio * config.graphical.borderChunk);
			setColor(context, mixColors(color.grey, render.status.getColor(), render.status.getBlend()));
			if (source.guns.length === m.guns.length) {
				var positions = source.guns.getPositions();
				for (var _i5 = 0; _i5 < m.guns.length; _i5++) {
					var g = m.guns[_i5],
					    position = positions[_i5] / (g.aspect === 1 ? 2 : 1),
					    gx = g.offset * Math.cos(g.direction + g.angle + rot) + (g.length / 2 - position) * Math.cos(g.angle + rot),
					    gy = g.offset * Math.sin(g.direction + g.angle + rot) + (g.length / 2 - position) * Math.sin(g.angle + rot);
					drawTrapezoid(context, xx + drawSize * gx, yy + drawSize * gy, drawSize * (g.length / 2 - (g.aspect === 1 ? position * 2 : 0)), drawSize * g.width / 2, g.aspect, g.angle + rot);
				}
			} else {
				throw new Error("Mismatch gun number with mockup.");
			}
			// Draw body
			context.globalAlpha = 1;
			setColor(context, mixColors(getColor(instance.color), render.status.getColor(), render.status.getBlend()));

			// ============================================================
			// Rectangular maze walls.
			// ============================================================
			if (instance.layer === 3) {
				// To understand why a specific value (10 in this case) is used,
				// look at the method "this.updateAABB" in server.js where x1,y1,x2,y2
				// are calculated (AABB is inflated by 10). Here, only 8 is used.
				var drawWidth = ratio * instance.size - 8 * ratio;
				var drawHeight = ratio * instance.sizeVert - 8 * ratio;

				drawRectangle(context, xx, yy, drawWidth, drawHeight);
			}
			// ============================================================
			else {
					drawPoly(context, xx, yy, drawSize / m.size * m.realSize, m.shape, rot);
				}

			// Draw turrets above us
			if (source.turrets.length === m.turrets.length) {
				for (var _i6 = 0; _i6 < m.turrets.length; _i6++) {
					var _t = m.turrets[_i6];
					if (_t.layer === 1) {
						var _ang = _t.direction + _t.angle + rot,
						    _len4 = _t.offset * drawSize;
						drawEntity(xx + _len4 * Math.cos(_ang), yy + _len4 * Math.sin(_ang), _t, ratio, drawSize / ratio / _t.size * _t.sizeFactor, source.turrets[_i6].facing + turretsObeyRot * rot, turretsObeyRot, context, source.turrets[_i6], render);
					}
				}
			} else {
				throw new Error("Mismatch turret number with mockup.");
			}
			if (assignedContext == false && context != ctx) {
				ctx.save();
				ctx.globalAlpha = fade;
				ctx.imageSmoothingEnabled = false;
				//ctx.globalCompositeOperation = "overlay";
				ctx.filter = 'blur(' + Math.round(config.graphical.deathBlurAmount - config.graphical.deathBlurAmount * fade) + 'px)';
				ctx.drawImage(context.canvas, x - xx, y - yy);
				ctx.restore();
				//ctx.globalCompositeOperation = "source-over";
			}
		};
	}();

	function drawHealth(x, y, instance, ratio) {
		// Draw health bar
		ctx.globalAlpha = Math.pow(instance.render.status.getFade(), 2);
		var size = instance.size * ratio;
		var m = mockups[instance.index];
		var realSize = size / m.size * m.realSize;
		// Draw health
		if (instance.drawsHealth) {
			var health = instance.render.health.get();
			var shield = instance.render.shield.get();
			if (health < 1 || shield < 1) {
				var yy = y + 1.1 * realSize + 15;
				drawBar(x - size, x + size, yy, 3 + config.graphical.barChunk, color.black);
				drawBar(x - size, x - size + 2 * size * health, yy, 3, color.lgreen);
				if (shield) {
					ctx.globalAlpha = 0.3 + shield * 0.3;
					drawBar(x - size, x - size + 2 * size * shield, yy, 3, color.teal);
					ctx.globalAlpha = 1;
				}
			}
		}
		// Draw label
		if (instance.nameplate && instance.id !== _gui.playerid) {
			if (instance.render.textobjs == null) instance.render.textobjs = [TextObj(), TextObj()];
			if (instance.name !== "\0") {
				// ================================================================================
				// Chat System.
				// ================================================================================
				var nameColor = color.guiwhite;
				var colorIndex = instance.roleColorIndex;

				if (colorIndex) {
					nameColor = getColor(colorIndex);
				}

				var playerNameFontSize = 16;
				var playerName = modifyOverlyLongName(instance.name, playerNameFontSize, 600);

				// Draw other players' names.
				instance.render.textobjs[0].draw(playerName, x, y - realSize - 30, playerNameFontSize, nameColor, 'center');
				// ================================================================================

				// Original.
				// instance.render.textobjs[0].draw(
				//     instance.name,
				//     x, y - realSize - 30, 16, color.guiwhite, 'center'
				// );

				instance.render.textobjs[1].draw(util.handleLargeNumber(instance.score, true), x, y - realSize - 16, 8, color.guiwhite, 'center');
			} else {
				instance.render.textobjs[0].draw('a spoopy 👻', x, y - realSize - 30, 16, color.lavender, 'center');
				instance.render.textobjs[1].draw(util.handleLargeNumber(instance.score, true), x, y - realSize - 16, 8, color.lavender, 'center');
			}
		}
	}

	// Start animation
	window.requestAnimFrame = function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
			//window.setTimeout(callback, 1000 / 60);
		};
	}();
	window.cancelAnimFrame = function () {
		return window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	}();

	// Drawing states
	var gameDraw = function () {
		var statMenu = Smoothbar(0, 0.7, 1.5);
		var upgradeMenu = Smoothbar(0, 2, 3);
		// Define the graph constructor
		function graph() {
			var data = [];
			return function (point, x, y, w, h, col) {
				// Add point and push off old ones
				data.push(point);
				while (data.length > w) {
					data.splice(0, 1);
				}
				// Get scale
				var min = Math.min.apply(Math, data),
				    max = Math.max.apply(Math, data),
				    range = max - min;
				// Draw zero
				if (max > 0 && min < 0) {
					drawBar(x, x + w, y + h * max / range, 2, color.guiwhite);
				}
				// Draw points
				ctx.beginPath();
				var i = -1;
				data.forEach(function (p) {
					if (!++i) {
						ctx.moveTo(x, y + h * (max - p) / range);
					} else {
						ctx.lineTo(x + i, y + h * (max - p) / range);
					}
				});
				ctx.lineWidth = 1;
				ctx.strokeStyle = col;
				ctx.stroke();
			};
		}
		// Lag compensation functions
		var compensation = function () {
			// Protected functions
			function interpolate(p1, p2, v1, v2, ts, tt) {
				var k = Math.cos((1 + tt) * Math.PI);
				return 0.5 * (((1 + tt) * v1 + p1) * (k + 1) + (-tt * v2 + p2) * (1 - k));
			}
			function extrapolate(p1, p2, v1, v2, ts, tt) {
				return p2 + (p2 - p1) * tt; /*v2 + 0.5 * tt * (v2 - v1) * ts*/
			}
			// Useful thing
			function angleDifference(sourceA, targetA) {
				var mod = function mod(a, n) {
					return (a % n + n) % n;
				};
				var a = targetA - sourceA;
				return mod(a + Math.PI, 2 * Math.PI) - Math.PI;
			}
			// Constructor
			return function () {
				// Protected vars
				var timediff = 0,
				    t = 0,
				    tt = 0,
				    ts = 0;
				// Methods
				return {
					set: function set() {
						var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : player.time;
						var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : metrics.rendergap;

						t = Math.max(getNow() - time - 80, -interval);
						if (t > 150 && t < 1000) {
							t = 150;
						}
						if (t > 1000) {
							t = 1000 * 1000 * Math.sin(t / 1000 - 1) / t + 1000;
						}
						tt = t / interval;
						ts = config.roomSpeed * 30 * t / 1000;
					},
					predict: function predict(p1, p2, v1, v2) {
						return t >= 0 ? extrapolate(p1, p2, v1, v2, ts, tt) : interpolate(p1, p2, v1, v2, ts, tt);
					},
					predictFacing: function predictFacing(f1, f2) {
						return f1 + (1 + tt) * angleDifference(f1, f2);
					},
					getPrediction: function getPrediction() {
						return t;
					}
				};
			};
		}();
		// Make graphs
		var timingGraph = graph(),
		    lagGraph = graph(),
		    gapGraph = graph();
		// The skill bar dividers
		var ska = function () {
			function make(x) {
				return Math.log(4 * x + 1) / Math.log(5);
			}
			var a = [];
			for (var i = 0; i < config.gui.expectedMaxSkillLevel * 2; i++) {
				a.push(make(i / config.gui.expectedMaxSkillLevel));
			}
			// The actual lookup function
			return function (x) {
				return a[x];
			};
		}();
		// Text objects
		var text = {
			skillNames: [TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj()],
			skillKeys: [TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj()],
			skillValues: [TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj()],
			skillPoints: TextObj(),
			score: TextObj(),
			name: TextObj(),
			class: TextObj(),
			debug: [TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj()],
			lbtitle: TextObj(),
			leaderboard: [TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj()],
			upgradeNames: [TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj()],
			upgradeKeys: [TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj(), TextObj()],
			skipUpgrades: TextObj()
		};
		// The drawing loop
		return function (ratio) {
			//lag.set();
			var GRAPHDATA = 0;
			// Prep stuff
			renderTimes++;

			var px = void 0,
			    py = void 0;
			{
				// Move the camera
				var motion = compensation();motion.set();
				var smear = { x: 0, y: 0 }; // moveCompensation.get();
				GRAPHDATA = motion.getPrediction();
				// Don't move the camera if you're dead. This helps with jitter issues
				player.renderx = motion.predict(player.lastx, player.x, player.lastvx, player.vx) + smear.x;
				player.rendery = motion.predict(player.lasty, player.y, player.lastvy, player.vy) + smear.y;
				//player.renderx += (desiredx - player.renderx) / 5;
				//player.rendery += (desiredy - player.rendery) / 5;
				px = ratio * player.renderx;
				py = ratio * player.rendery;
			}

			{
				// Clear the background + draw grid 
				clearScreen(color.white, 1);
				clearScreen(color.guiblack, 0.1);

				var W = roomSetup[0].length,
				    H = roomSetup.length,
				    i = 0;
				roomSetup.forEach(function (row) {
					var j = 0;
					row.forEach(function (cell) {
						var left = Math.max(0, ratio * j * global.gameWidth / W - px + global.screenWidth / 2),
						    top = Math.max(0, ratio * i * global.gameHeight / H - py + global.screenHeight / 2),
						    right = Math.min(global.screenWidth, ratio * (j + 1) * global.gameWidth / W - px + global.screenWidth / 2),
						    bottom = Math.min(global.screenHeight, ratio * (i + 1) * global.gameHeight / H - py + global.screenHeight / 2);
						ctx.globalAlpha = 1;
						ctx.fillStyle = config.graphical.screenshotMode ? color.guiwhite : color.white;
						ctx.fillRect(left, top, right - left, bottom - top);
						ctx.globalAlpha = 0.3;
						ctx.fillStyle = config.graphical.screenshotMode ? color.guiwhite : getZoneColor(cell, true);
						ctx.fillRect(left, top, right - left, bottom - top);
						j++;
					});
					i++;
				});
				ctx.lineWidth = 1;
				ctx.strokeStyle = config.graphical.screenshotMode ? color.guiwhite : color.guiblack;
				ctx.globalAlpha = 0.04;
				ctx.beginPath();
				var gridsize = 30 * ratio;
				for (var x = (global.screenWidth / 2 - px) % gridsize; x < global.screenWidth; x += gridsize) {
					ctx.moveTo(x, 0);
					ctx.lineTo(x, global.screenHeight);
				}
				for (var y = (global.screenHeight / 2 - py) % gridsize; y < global.screenHeight; y += gridsize) {
					ctx.moveTo(0, y);
					ctx.lineTo(global.screenWidth, y);
				}
				ctx.stroke();
				ctx.globalAlpha = 1;
			}

			{
				// Draw things 
				entities.forEach(function entitydrawingloop(instance) {
					if (!instance.render.draws) {
						return 1;
					}
					var motion = compensation();
					if (instance.render.status.getFade() === 1) {
						motion.set();
					} else {
						motion.set(instance.render.lastRender, instance.render.interval);
					}
					instance.render.x = motion.predict(instance.render.lastx, instance.x, instance.render.lastvx, instance.vx);
					instance.render.y = motion.predict(instance.render.lasty, instance.y, instance.render.lastvy, instance.vy);
					instance.render.f = instance.id === _gui.playerid && !instance.twiggle ? Math.atan2(target.y, target.x) : motion.predictFacing(instance.render.lastf, instance.facing);
					var x = instance.id === _gui.playerid ? 0 : ratio * instance.render.x - px,
					    y = instance.id === _gui.playerid ? 0 : ratio * instance.render.y - py;
					x += global.screenWidth / 2;
					y += global.screenHeight / 2;
					drawEntity(x, y, instance, ratio, 1.1, instance.render.f);
				});
				if (!config.graphical.screenshotMode) {
					entities.forEach(function entityhealthdrawingloop(instance) {
						var x = instance.id === _gui.playerid ? 0 : ratio * instance.render.x - px,
						    y = instance.id === _gui.playerid ? 0 : ratio * instance.render.y - py;
						x += global.screenWidth / 2;
						y += global.screenHeight / 2;
						drawHealth(x, y, instance, ratio);
					});
				}
			}

			// Draw GUI       
			var alcoveSize = 200 / Math.max(global.screenWidth, global.screenHeight * 16 / 9);
			var spacing = 20;
			_gui.__s.update();
			var lb = _leaderboard.get();
			var max = lb.max;

			{
				// Draw messages
				var vspacing = 4;
				var len = 0;
				var height = 18;
				var _x25 = global.screenWidth / 2;
				var _y = spacing;
				// Draw each message
				for (var _i7 = messages.length - 1; _i7 >= 0; _i7--) {
					var msg = messages[_i7],
					    txt = msg.text,
					    _text = txt; //txt[0].toUpperCase() + txt.substring(1);  
					// Give it a textobj if it doesn't have one
					if (msg.textobj == null) msg.textobj = TextObj();
					if (msg.len == null) msg.len = measureText(_text, height - 4);
					// Draw the background
					ctx.globalAlpha = 0.5 * msg.alpha;
					drawBar(_x25 - msg.len / 2, _x25 + msg.len / 2, _y + height / 2, height, color.black);
					// Draw the text
					ctx.globalAlpha = Math.min(1, msg.alpha);

					// ==================================================================================
					// Chat System.
					// ==================================================================================
					var chatColor = getColor(msg.colorIndex);
					msg.textobj.draw(_text, _x25, _y + height / 2, height - 4, chatColor, 'center', true);
					// ==================================================================================

					// Iterate and move
					_y += vspacing + height;
					if (msg.status > 1) {
						_y -= (vspacing + height) * (1 - Math.sqrt(msg.alpha));
					}
					if (msg.status > 1) {
						msg.status -= 0.05;
						msg.alpha += 0.05;
					} else if (_i7 === 0 && (messages.length > 5 || Date.now() - msg.time > 10000)) {
						msg.status -= 0.05;
						msg.alpha -= 0.05;
						// Remove
						if (msg.alpha <= 0) {
							messages[0].textobj.remove();
							messages.splice(0, 1);
						}
					}
				}
				ctx.globalAlpha = 1;
			}

			// ==============================================================================
			// Chat System.
			// ==============================================================================
			{
				// Draw chat messages
				var _vspacing = 4;
				var _height = 22;
				var _x26 = 50;
				var _y2 = global.screenHeight / 3 + spacing;

				ctx.save();
				ctx.lineCap = 'miter';
				ctx.lineJoin = 'miter';

				// Draw each message
				for (var _i8 = chatMessages.length - 1; _i8 >= 0; _i8--) {
					var chatMessageObj = chatMessages[_i8];
					var playerName = chatMessageObj.playerName;
					var message = chatMessageObj.text;

					var tmpPlayerName = playerName;
					var tmpMessage = message;

					// Give it a textobj if it doesn't have one
					if (chatMessageObj.textobj == null) {
						chatMessageObj.textobj = TextObj();
					}

					if (chatMessageObj.playerNameDrawWidth == null) {
						chatMessageObj.playerNameDrawWidth = measureText(tmpPlayerName, _height - 4);
					}

					if (chatMessageObj.messageDrawWidth == null) {
						chatMessageObj.messageDrawWidth = measureText(tmpMessage, _height - 4);
					}

					var totalDrawWidth = chatMessageObj.playerNameDrawWidth + chatMessageObj.messageDrawWidth;

					if (totalDrawWidth < 1000) {
						// Player name.
						var playerNameX1 = _x26 - 4;
						var playerNameX2 = _x26 + chatMessageObj.playerNameDrawWidth + 4;

						// Chat message.
						var chatX1 = playerNameX2; // + 10;
						var chatX2 = chatX1 + chatMessageObj.messageDrawWidth + 12;
						ctx.globalAlpha = 1.0;
						drawBar(chatX1, chatX2, _y2 + _height / 2, _height, color.black);

						var messageColor = getColor(chatMessageObj.colorIndex);
						chatMessageObj.textobj.draw(tmpMessage, chatX1 + 2, _y2 + _height / 2 + 1, _height - 4, messageColor, 'left', true);

						// Draw player name and background on top of the message.
						ctx.globalAlpha = 0.6;
						drawBar(playerNameX1, playerNameX2, _y2 + _height / 2, _height, color.black);

						var playerNameColor = getColor(chatMessageObj.colorIndex);
						ctx.globalAlpha = 0.8;
						chatMessageObj.textobj.draw(tmpPlayerName, playerNameX1, _y2 + _height / 2 + 1, _height - 4, playerNameColor, 'left', true);

						// Iterate and move
						_y2 += _vspacing + _height;
					}
				}
				ctx.restore();

				ctx.globalAlpha = 1;
			}
			// ==============================================================================


			{
				// Draw skill bars
				global.canSkill = !!_gui.points;
				statMenu.set(0 + (global.canSkill || global.died || global.statHover));
				global.clickables.stat.hide();

				var _vspacing2 = 4;
				var _height2 = 15;
				var gap = 35;
				var _len5 = alcoveSize * global.screenWidth; // The 30 is for the value modifiers
				var save = _len5;
				var _x27 = -spacing - 2 * _len5 + statMenu.get() * (2 * spacing + 2 * _len5);
				var _y3 = global.screenHeight - spacing - _height2;
				var ticker = 11;
				var namedata = _gui.getStatNames(mockups[_gui.type].statnames || -1);
				_gui.skills.forEach(function drawASkillBar(skill) {
					// Individual skill bars 
					ticker--;
					var name = namedata[ticker - 1],
					    level = skill.amount,
					    col = color[skill.color],
					    cap = skill.softcap,
					    maxLevel = skill.cap;
					if (cap) {
						_len5 = save;
						var _max = config.gui.expectedMaxSkillLevel,
						    extension = cap > _max,
						    blocking = cap < maxLevel;
						if (extension) {
							_max = cap;
						}
						drawBar(_x27 + _height2 / 2, _x27 - _height2 / 2 + _len5 * ska(cap), _y3 + _height2 / 2, _height2 - 3 + config.graphical.barChunk, color.black);
						drawBar(_x27 + _height2 / 2, _x27 + _height2 / 2 + (_len5 - gap) * ska(cap), _y3 + _height2 / 2, _height2 - 3, color.grey);
						drawBar(_x27 + _height2 / 2, _x27 + _height2 / 2 + (_len5 - gap) * ska(level), _y3 + _height2 / 2, _height2 - 3.5, col);
						// Blocked-off area
						if (blocking) {
							ctx.lineWidth = 1;
							ctx.strokeStyle = color.grey;
							for (var j = cap + 1; j < _max; j++) {
								drawGuiLine(_x27 + (_len5 - gap) * ska(j), _y3 + 1.5, _x27 + (_len5 - gap) * ska(j), _y3 - 3 + _height2);
							}
						}
						// Vertical dividers
						ctx.strokeStyle = color.black;
						ctx.lineWidth = 1;
						for (var _j = 1; _j < level + 1; _j++) {
							drawGuiLine(_x27 + (_len5 - gap) * ska(_j), _y3 + 1.5, _x27 + (_len5 - gap) * ska(_j), _y3 - 3 + _height2);
						}
						// Skill name
						_len5 = save * ska(_max);
						var textcolor = level == maxLevel ? col : !_gui.points || cap !== maxLevel && level == cap ? color.grey : color.guiwhite;
						text.skillNames[ticker - 1].draw(name, Math.round(_x27 + _len5 / 2) + 0.5, _y3 + _height2 / 2, _height2 - 5, textcolor, 'center', true);
						// Skill key
						text.skillKeys[ticker - 1].draw('[' + ticker % 10 + ']', Math.round(_x27 + _len5 - _height2 * 0.25) - 1.5, _y3 + _height2 / 2, _height2 - 5, textcolor, 'right', true);
						if (textcolor === color.guiwhite) {
							// If it's active
							global.clickables.stat.place(ticker - 1, _x27, _y3, _len5, _height2);
						}
						// Skill value
						if (level) {
							text.skillValues[ticker - 1].draw(textcolor === col ? 'MAX' : '+' + level, Math.round(_x27 + _len5 + 4) + 0.5, _y3 + _height2 / 2, _height2 - 5, col, 'left', true);
						}
						// Move on 
						_y3 -= _height2 + _vspacing2;
					}
				});
				global.clickables.hover.place(0, 0, _y3, 0.8 * _len5, 0.8 * (global.screenHeight - _y3));
				if (_gui.points !== 0) {
					// Draw skillpoints to spend
					text.skillPoints.draw('x' + _gui.points, Math.round(_x27 + _len5 - 2) + 0.5, Math.round(_y3 + _height2 - 4) + 0.5, 20, color.guiwhite, 'right');
				}
			}

			{
				// Draw name, exp and score bar
				var _vspacing3 = 4;
				var _len6 = 1.65 * alcoveSize * global.screenWidth;
				var _height3 = 25;
				var _x28 = (global.screenWidth - _len6) / 2;
				var _y4 = global.screenHeight - spacing - _height3;

				ctx.lineWidth = 1;
				// Handle exp
				// Draw the exp bar
				drawBar(_x28, _x28 + _len6, _y4 + _height3 / 2, _height3 - 3 + config.graphical.barChunk, color.black);
				drawBar(_x28, _x28 + _len6, _y4 + _height3 / 2, _height3 - 3, color.grey);
				drawBar(_x28, _x28 + _len6 * _gui.__s.getProgress(), _y4 + _height3 / 2, _height3 - 3.5, color.gold);
				// Draw the class type
				text.class.draw('Level ' + _gui.__s.getLevel() + ' ' + mockups[_gui.type].name, _x28 + _len6 / 2, _y4 + _height3 / 2, _height3 - 4, color.guiwhite, 'center', true);
				_height3 = 14;
				_y4 -= _height3 + _vspacing3;
				// Draw the %-of-leader bar
				drawBar(_x28 + _len6 * 0.1, _x28 + _len6 * 0.9, _y4 + _height3 / 2, _height3 - 3 + config.graphical.barChunk, color.black);
				drawBar(_x28 + _len6 * 0.1, _x28 + _len6 * 0.9, _y4 + _height3 / 2, _height3 - 3, color.grey);
				drawBar(_x28 + _len6 * 0.1, _x28 + _len6 * (0.1 + 0.8 * (max ? Math.min(1, _gui.__s.getScore() / max) : 1)), _y4 + _height3 / 2, _height3 - 3.5, color.green);
				// Draw the score
				text.score.draw('Score: ' + util.handleLargeNumber(_gui.__s.getScore()), _x28 + _len6 / 2, _y4 + _height3 / 2, _height3 - 2, color.guiwhite, 'center', true);
				// Draw the name
				ctx.lineWidth = 4;
				text.name.draw(player.name, Math.round(_x28 + _len6 / 2) + 0.5, Math.round(_y4 - 10 - _vspacing3) + 0.5, 32, color.guiwhite, 'center');
			}

			{
				// Draw minimap and FPS monitors
				var _len7 = alcoveSize * global.screenWidth;
				var _height4 = _len7;
				var _x29 = global.screenWidth - _len7 - spacing;
				var _y5 = global.screenHeight - _height4 - spacing;

				ctx.globalAlpha = 0.5;
				var _W = roomSetup[0].length,
				    _H = roomSetup.length,
				    _i9 = 0;
				roomSetup.forEach(function (row) {
					var j = 0;
					row.forEach(function (cell) {
						ctx.fillStyle = getZoneColor(cell, false);
						drawGuiRect(_x29 + j++ * _len7 / _W, _y5 + _i9 * _height4 / _H, _len7 / _W, _height4 / _H);
					});
					_i9++;
				});
				ctx.fillStyle = color.grey;
				drawGuiRect(_x29, _y5, _len7, _height4);

				// ============================================================
				// Rectangular maze walls.
				// ============================================================
				var minimapWidth = alcoveSize * global.screenWidth;
				var minimapHeight = minimapWidth;
				var minimapX = global.screenWidth - minimapWidth - spacing;
				var minimapY = global.screenHeight - minimapHeight - spacing;
				// ============================================================

				minimap.forEach(function (o) {
					if (o[2] === 17) {
						ctx.fillStyle = mixColors(getColor(o[2]), color.black, 0.5);
						ctx.globalAlpha = 0.8;
						drawGuiRect(_x29 + o[0] / global.gameWidth * _len7, _y5 + o[1] / global.gameHeight * _height4, 1, 1);
					}
					// ============================================================
					// Rectangular maze walls.
					// ============================================================
					else if (o[2] === 16) {
							ctx.fillStyle = mixColors(getColor(o[2]), color.black, 0.5);
							ctx.globalAlpha = 0.8;

							var wallWidth = o[3] * 2 / global.gameWidth * minimapWidth;
							var wallHeight = o[4] * 2 / global.gameHeight * minimapHeight;

							var wallX = minimapX + o[0] / global.gameWidth * minimapWidth - wallWidth / 2;
							var wallY = minimapY + o[1] / global.gameHeight * minimapHeight - wallHeight / 2;

							drawGuiRect(wallX, wallY, wallWidth, wallHeight);
						}
						// ============================================================
						else {
								ctx.strokeStyle = mixColors(getColor(o[2]), color.black, 0.5);
								ctx.lineWidth = 1;
								ctx.globalAlpha = 1;
								drawGuiRect(_x29 + o[0] / global.gameWidth * _len7 - 1, _y5 + o[1] / global.gameWidth * _height4 - 1, 3, 3, true);
								ctx.lineWidth = 3;
							}
				});
				ctx.globalAlpha = 1;
				ctx.lineWidth = 1;
				ctx.strokeStyle = color.black;
				drawGuiRect( // My position
				_x29 + player.x / global.gameWidth * _len7 - 1, _y5 + player.y / global.gameWidth * _height4 - 1, 3, 3, true);
				ctx.lineWidth = 3;
				ctx.fillStyle = color.black;
				drawGuiRect(_x29, _y5, _len7, _height4, true); // Border

				drawGuiRect(_x29, _y5 - 40, _len7, 30);
				lagGraph(lag.get(), _x29, _y5 - 40, _len7, 30, color.teal);
				gapGraph(metrics.rendergap, _x29, _y5 - 40, _len7, 30, color.pink);
				timingGraph(GRAPHDATA, _x29, _y5 - 40, _len7, 30, color.yellow);
				// Text
				text.debug[5].draw('Prediction: ' + Math.round(GRAPHDATA) + 'ms', _x29 + _len7, _y5 - 50 - 5 * 14, 10, color.guiwhite, 'right');
				text.debug[4].draw('Update Rate: ' + metrics.updatetime + 'Hz', _x29 + _len7, _y5 - 50 - 4 * 14, 10, color.guiwhite, 'right');
				text.debug[3].draw('Latency: ' + metrics.latency + 'ms', _x29 + _len7, _y5 - 50 - 3 * 14, 10, color.guiwhite, 'right');
				text.debug[2].draw('Client FPS: ' + metrics.rendertime, _x29 + _len7, _y5 - 50 - 2 * 14, 10, color.guiwhite, 'right');
				text.debug[1].draw('Server Speed: ' + (100 * _gui.fps).toFixed(2) + '%' + (_gui.fps === 1 ? '' : ' OVERLOADED!'), _x29 + _len7, _y5 - 50 - 1 * 14, 10, _gui.fps === 1 ? color.guiwhite : color.orange, 'right');
				text.debug[0].draw(serverName, _x29 + _len7, _y5 - 50, 10, color.guiwhite, 'right');
			}

			{
				// Draw leaderboard
				var _vspacing4 = 4;
				var _len8 = alcoveSize * global.screenWidth;
				var _height5 = 14;
				var _x30 = global.screenWidth - _len8 - spacing;
				var _y6 = spacing + _height5 + 7;
				text.lbtitle.draw('Leaderboard:', Math.round(_x30 + _len8 / 2) + 0.5, Math.round(_y6 - 6) + 0.5, _height5 + 4, color.guiwhite, 'center');
				var _i10 = 0;
				lb.data.forEach(function (entry) {
					drawBar(_x30, _x30 + _len8, _y6 + _height5 / 2, _height5 - 3 + config.graphical.barChunk, color.black);
					drawBar(_x30, _x30 + _len8, _y6 + _height5 / 2, _height5 - 3, color.grey);
					var shift = Math.min(1, entry.score / max);
					drawBar(_x30, _x30 + _len8 * shift, _y6 + _height5 / 2, _height5 - 3.5, entry.barcolor);

					// ==============================================================
					// Chat System.
					// ==============================================================
					var leaderboardNameFontSize = _height5 - 5;
					var leaderboardName = modifyOverlyLongName(entry.label, leaderboardNameFontSize, 200);
					// ==============================================================

					// Leadboard name + score 
					text.leaderboard[_i10++].draw(leaderboardName + ': ' + util.handleLargeNumber(Math.round(entry.score)), _x30 + _len8 / 2, _y6 + _height5 / 2, _height5 - 5, color.guiwhite, 'center', true);
					// Mini-image
					var scale = _height5 / entry.position.axis,
					    xx = _x30 - 1.5 * _height5 - scale * entry.position.middle.x * 0.707,
					    yy = _y6 + 0.5 * _height5 + scale * entry.position.middle.x * 0.707;
					drawEntity(xx, yy, entry.image, 1 / scale, scale * scale / entry.image.size, -Math.PI / 4, true);
					// Move down
					_y6 += _vspacing4 + _height5;
				});
			}

			{
				// Draw upgrade menu
				upgradeMenu.set(0 + (global.canUpgrade || global.upgradeHover));
				var glide = upgradeMenu.get();
				global.clickables.upgrade.hide();
				if (_gui.upgrades.length > 0) {
					global.canUpgrade = true;
					// var getClassUpgradeKey = function(number) {
					//     switch (number) {
					//         case 0: return 'y';
					//         case 1: return 'h';
					//         case 2: return 'u';
					//         case 3: return 'j';
					//         case 4: return 'i';
					//         case 5: return 'k';
					//         case 6: return 'o';
					//         case 7: return 'l';
					//     }
					// };
					var internalSpacing = 8;
					var _len9 = alcoveSize * global.screenWidth / 2 * 1;
					var _height6 = _len9;
					var _x31 = glide * 2 * spacing - spacing;
					var _y7 = spacing;
					var xo = _x31;
					var xxx = 0;
					var yo = _y7;
					var _ticker = 0;
					upgradeSpin += 0.01;
					var colorIndex = 10;
					var _i11 = 0;
					_gui.upgrades.forEach(function drawAnUpgrade(model) {
						if (_y7 > yo) yo = _y7;
						xxx = _x31;
						global.clickables.upgrade.place(_i11++, _x31, _y7, _len9, _height6);
						// Draw box
						ctx.globalAlpha = 0.5;
						ctx.fillStyle = getColor(colorIndex);
						drawGuiRect(_x31, _y7, _len9, _height6);
						ctx.globalAlpha = 0.1;
						ctx.fillStyle = getColor(-10 + colorIndex++);
						drawGuiRect(_x31, _y7, _len9, _height6 * 0.6);
						ctx.fillStyle = color.black;
						drawGuiRect(_x31, _y7 + _height6 * 0.6, _len9, _height6 * 0.4);
						ctx.globalAlpha = 1;
						// Find offset location with rotation
						var picture = getEntityImageFromMockup(model, _gui.color),
						    position = mockups[model].position,
						    scale = 0.6 * _len9 / position.axis,
						    xx = _x31 + 0.5 * _len9 - scale * position.middle.x * Math.cos(upgradeSpin),
						    yy = _y7 + 0.5 * _height6 - scale * position.middle.x * Math.sin(upgradeSpin);
						drawEntity(xx, yy, picture, 1, scale / picture.size, upgradeSpin, true);
						// Tank name
						text.upgradeNames[_i11 - 1].draw(picture.name, _x31 + 0.9 * _len9 / 2, _y7 + _height6 - 6, _height6 / 8 - 3, color.guiwhite, 'center');
						// Upgrade key
						// text.upgradeKeys[i-1].draw(
						//     '[' + getClassUpgradeKey(ticker) + ']',
						//     x + len - 4, y + height - 6,
						//     height/8 - 3, color.guiwhite, 'right'
						// );
						ctx.strokeStyle = color.black;
						ctx.globalAlpha = 1;
						ctx.lineWidth = 3;
						drawGuiRect(_x31, _y7, _len9, _height6, true); // Border
						if (_ticker++ % 2) {
							_y7 -= _height6 + internalSpacing;
							_x31 += glide * (_len9 + internalSpacing);
						} else {
							_y7 += _height6 + internalSpacing;
						}
					});
					// Draw box
					var h = 14,
					    _msg = "Don't Upgrade",
					    m = measureText(_msg, h - 3) + 10;
					var xx = xo + (xxx + _len9 + internalSpacing - xo) / 2,
					    yy = yo + _height6 + internalSpacing;
					drawBar(xx - m / 2, xx + m / 2, yy + h / 2, h + config.graphical.barChunk, color.black);
					drawBar(xx - m / 2, xx + m / 2, yy + h / 2, h, color.white);
					text.skipUpgrades.draw(_msg, xx, yy + h / 2, h - 2, color.guiwhite, 'center', true);
					global.clickables.skipUpgrades.place(0, xx - m / 2, yy, m, h);
				} else {
					global.canUpgrade = false;
					global.clickables.upgrade.hide();
					global.clickables.skipUpgrades.hide();
				}
			}

			metrics.lastrender = getNow();
		};
	}();

	var gameDrawDead = function () {
		var text = {
			taunt: TextObj(),
			level: TextObj(),
			score: TextObj(),
			time: TextObj(),
			kills: TextObj(),
			death: TextObj(),
			playagain: TextObj()
		};
		var getKills = function getKills() {
			var finalKills = [Math.round(global.finalKills[0].get()), Math.round(global.finalKills[1].get()), Math.round(global.finalKills[2].get())];
			var b = finalKills[0] + 0.5 * finalKills[1] + 3 * finalKills[2];
			return (b === 0 ? '🌼' : b < 4 ? '🎯' : b < 8 ? '💥' : b < 15 ? '💢' : b < 25 ? '🔥' : b < 50 ? '💣' : b < 75 ? '👺' : b < 100 ? '🌶️' : '💯') + (finalKills[0] || finalKills[1] || finalKills[2] ? ' ' + (finalKills[0] ? finalKills[0] + ' kills' : '') + (finalKills[0] && finalKills[1] ? ' and ' : '') + (finalKills[1] ? finalKills[1] + ' assists' : '') + ((finalKills[0] || finalKills[1]) && finalKills[2] ? ' and ' : '') + (finalKills[2] ? finalKills[2] + ' visitors defeated' : '') : ' A true pacifist') + '.';
		};
		var getDeath = function getDeath() {
			var txt = '';
			if (global.finalKillers.length) {
				txt = '🔪 Succumbed to';
				global.finalKillers.forEach(function (e) {
					txt += ' ' + util.addArticle(mockups[e].name) + ' and';
				});txt = txt.slice(0, -4) + '.';
			} else {
				txt += '🤷 Well that was kinda dumb huh';
			}
			return txt;
		};
		return function () {
			clearScreen(color.black, 0.25);
			var x = global.screenWidth / 2,
			    y = global.screenHeight / 2 - 50;
			var picture = getEntityImageFromMockup(_gui.type, _gui.color),
			    len = 140,
			    position = mockups[_gui.type].position,
			    scale = len / position.axis,
			    xx = global.screenWidth / 2 - scale * position.middle.x * 0.707,
			    yy = global.screenHeight / 2 - 35 + scale * position.middle.x * 0.707;
			drawEntity(xx - 190 - len / 2, yy - 10, picture, 1.5, 0.5 * scale / picture.realSize, -Math.PI / 4, true);
			text.taunt.draw('lol you died', x, y - 80, 8, color.guiwhite, 'center');
			text.level.draw('Level ' + _gui.__s.getLevel() + ' ' + mockups[_gui.type].name + '.', x - 170, y - 30, 24, color.guiwhite);
			text.score.draw('Final score: ' + util.formatLargeNumber(Math.round(global.finalScore.get())), x - 170, y + 25, 50, color.guiwhite);
			text.time.draw('⌚ Survived for ' + util.timeForHumans(Math.round(global.finalLifetime.get())) + '.', x - 170, y + 55, 16, color.guiwhite);
			text.kills.draw(getKills(), x - 170, y + 77, 16, color.guiwhite);
			text.death.draw(getDeath(), x - 170, y + 99, 16, color.guiwhite);
			text.playagain.draw('Press enter to play again!', x, y + 125, 16, color.guiwhite, 'center');
		};
	}();

	var gameDrawBeforeStart = function () {
		var text = {
			connecting: TextObj(),
			message: TextObj()
		};
		return function () {
			clearScreen(color.white, 0.5);
			text.connecting.draw('Connecting...', global.screenWidth / 2, global.screenHeight / 2, 30, color.guiwhite, 'center');
			text.message.draw(global.message, global.screenWidth / 2, global.screenHeight / 2 + 30, 15, color.lgreen, 'center');
		};
	}();

	var gameDrawDisconnected = function () {
		var text = {
			disconnected: TextObj(),
			message: TextObj()
		};
		return function () {
			clearScreen(mixColors(color.red, color.guiblack, 0.3), 0.25);
			text.disconnected.draw('💀 Disconnected. 💀', global.screenWidth / 2, global.screenHeight / 2, 30, color.guiwhite, 'center');
			text.message.draw(global.message, global.screenWidth / 2, global.screenHeight / 2 + 30, 15, color.orange, 'center');
		};
	}();

	// ===============================================================
	// Chat System.
	// ===============================================================
	setInterval(cleanUpChatMessages, 9000);

	function cleanUpChatMessages() {
		try {
			if (chatMessages) {
				if (chatMessages.length >= 8) {
					while (chatMessages.length >= 8) {
						chatMessages[0].textobj.remove();
						chatMessages.splice(0, 1);
					}
				} else {
					if (chatMessages.length > 0) {
						// Display chat for at most 8 seconds.
						if (Date.now() - chatMessages[0].time >= 8000) {
							chatMessages[0].textobj.remove();
							chatMessages.splice(0, 1);
						}
					}
				}
			}
		} catch (error) {
			console.log('[cleanUpChatMessages()]');
			console.log(error);
		}
	}
	// ===============================================================

	// The main function
	function animloop() {
		global.animLoopHandle = window.requestAnimFrame(animloop);
		player.renderv += (player.view - player.renderv) / 30;
		var ratio = config.graphical.screenshotMode ? 2 : getRatio();
		// Set the drawing style
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.filter = 'none';
		// Draw the game
		if (global.gameStart && !global.disconnected) {
			global.time = getNow();
			if (global.time - lastPing > 1000) {
				// Latency
				// Do ping.
				global.socket.ping(global.time);
				lastPing = global.time;
				// Do rendering speed.
				metrics.rendertime = renderTimes;
				renderTimes = 0;
				// Do update rate.
				metrics.updatetime = updateTimes;
				updateTimes = 0;
			}
			metrics.lag = global.time - player.time;
		}
		if (global.gameStart) {
			gameDraw(ratio);
		} else if (!global.disconnected) {
			gameDrawBeforeStart();
		}
		if (global.died) {
			gameDrawDead();
		}
		if (global.disconnected) {
			gameDrawDisconnected();
		}
	}

	/***/
},
/* 1 */
/***/function (module, exports) {

	/*jslint esversion: 6*/
	/*global require, module, exports, console*/
	/*jshint -W097*/
	"use strict";

	module.exports = {
		// Keys and other mathematical constants
		KEY_ESC: 27,
		KEY_ENTER: 13,
		KEY_CHAT: 13,
		KEY_FIREFOOD: 119,
		KEY_SPLIT: 32,
		KEY_LEFT: 65,
		KEY_UP: 87,
		KEY_RIGHT: 68,
		KEY_DOWN: 83,
		KEY_LEFT_ARROW: 37,
		KEY_UP_ARROW: 38,
		KEY_RIGHT_ARROW: 39,
		KEY_DOWN_ARROW: 40,
		KEY_AUTO_SPIN: 67,
		KEY_AUTO_FIRE: 69,
		KEY_OVER_RIDE: 82,
		KEY_UPGRADE_ATK: 49,
		KEY_UPGRADE_HTL: 50,
		KEY_UPGRADE_SPD: 51,
		KEY_UPGRADE_STR: 52,
		KEY_UPGRADE_PEN: 53,
		KEY_UPGRADE_DAM: 54,
		KEY_UPGRADE_RLD: 55,
		KEY_UPGRADE_MOB: 56,
		KEY_UPGRADE_RGN: 57,
		KEY_UPGRADE_SHI: 48,
		KEY_MOUSE_0: 32,
		KEY_MOUSE_1: 86,
		KEY_MOUSE_2: 16,
		KEY_CHOOSE_1: 89,
		KEY_CHOOSE_2: 72,
		KEY_CHOOSE_3: 85,
		KEY_CHOOSE_4: 74,
		KEY_CHOOSE_5: 73,
		KEY_CHOOSE_6: 75,
		KEY_CHOOSE_7: 79,
		KEY_CHOOSE_8: 76,
		KEY_LEVEL_UP: 78,
		KEY_FUCK_YOU: 191,

		// Canvas
		screenWidth: window.innerWidth,
		screenHeight: window.innerHeight,
		gameWidth: 0,
		gameHeight: 0,
		xoffset: -0,
		yoffset: -0,
		gameStart: false,
		disconnected: false,
		died: false,
		kicked: false,
		continuity: false,
		startPingTime: 0,
		toggleMassState: 0,
		backgroundColor: '#f2fbff',
		lineColor: '#000000',

		// ===============================
		// Chat system.
		// ===============================
		isChatMode: false
		// ===============================
	};

	/***/
},
/* 2 */
/***/function (module, exports) {

	exports.submitToLocalStorage = function (name) {
		localStorage.setItem(name + 'Value', document.getElementById(name).value);
		localStorage.setItem(name + 'Checked', document.getElementById(name).checked);
		return false;
	};
	exports.retrieveFromLocalStorage = function (name) {
		document.getElementById(name).value = localStorage.getItem(name + 'Value');
		document.getElementById(name).checked = localStorage.getItem(name + 'Checked') === 'true';
		return false;
	};
	exports.handleLargeNumber = function (a) {
		var cullZeroes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

		if (cullZeroes && a == 0) {
			return '';
		}

		if (a < Math.pow(10, 3)) {
			return '' + a.toFixed(0);
		}

		if (a < Math.pow(10, 6)) {
			return (a / Math.pow(10, 3)).toFixed(2) + "k";
		}

		if (a < Math.pow(10, 9)) {
			return (a / Math.pow(10, 6)).toFixed(2) + "m";
		}

		if (a < Math.pow(10, 12)) {
			return (a / Math.pow(10, 9)).toFixed(2) + "b";
		}

		if (a < Math.pow(10, 15)) {
			return (a / Math.pow(10, 12)).toFixed(2) + "t";
		}

		return (a / Math.pow(10, 15)).toFixed(2) + "q";
	};
	exports.timeForHumans = function (x) {
		// ought to be in seconds
		var seconds = x % 60;
		x /= 60;x = Math.floor(x);
		var minutes = x % 60;
		x /= 60;x = Math.floor(x);
		var hours = x % 24;
		x /= 24;x = Math.floor(x);
		var days = x;
		var y = '';
		function weh(z, text) {
			if (z) {
				y = y + (y === '' ? '' : ', ') + z + ' ' + text + (z > 1 ? 's' : '');
			}
		}
		weh(days, 'day');
		weh(hours, 'hour');
		weh(minutes, 'minute');
		weh(seconds, 'second');
		if (y === '') {
			y = 'less than a second';
		}
		return y;
	};
	exports.addArticle = function (string) {
		return (/[aeiouAEIOU]/.test(string[0]) ? 'an ' + string : 'a ' + string
		);
	};
	exports.formatLargeNumber = function (x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	exports.pullJSON = function (filename) {
		var request = new XMLHttpRequest();
		var url = "/json/" + filename + ".json?v=" + VERSION;
		// Set up the request
		console.log("Loading JSON from " + url);
		request.responseType = 'json';
		// Return a promise
		return new Promise(function (resolve, reject) {
			request.open('GET', url);
			request.onload = function () {
				resolve(request.response);console.log('JSON load complete.');
			};
			request.onerror = function () {
				reject(request.statusText);console.log('JSON load failed.');console.log(request.statusText);
			};
			request.send();
		});
	};

	/***/
},
/* 3 */
/***/function (module, exports, __webpack_require__) {

	var global = __webpack_require__(1);

	var Canvas = function () {
		function Canvas(params) {
			_classCallCheck(this, Canvas);

			this.directionLock = false;
			this.target = global.target;
			this.reenviar = true;
			this.socket = global.socket;
			this.directions = [];
			var self = this;

			this.cv = document.getElementById('gameCanvas');
			this.cv.width = global.screenWidth;
			this.cv.height = global.screenHeight;
			this.cv.addEventListener('mousemove', this.gameInput, false);
			this.cv.addEventListener('keydown', this.keyboardDown, false);
			this.cv.addEventListener('keyup', this.keyboardUp, false);
			this.cv.addEventListener("mousedown", this.mouseDown, false);
			this.cv.addEventListener("mouseup", this.mouseUp, false);
			this.cv.parent = self;
			global.canvas = this;
		}

		_createClass(Canvas, [{
			key: "keyboardDown",
			value: function keyboardDown(event) {
				switch (event.keyCode) {
					case 13:
						if (global.died) this.parent.socket.talk('s', global.playerName, 0);global.died = false;break; // Enter to respawn

					// ======================================================================
					// Chat system.
					// ======================================================================
					// H
					case 72:
						if (!global.died) {
							if (global.isChatMode === false) {
								// Chat input textbox.
								var chatInput = document.createElement('input');
								chatInput.id = 'chatInput';
								chatInput.tabindex = 4;
								chatInput.style.font = 'bold 18px Ubuntu';
								chatInput.maxlength = '200';
								chatInput.placeholder = 'Enter to send.Esc to cancel.Введите,чтобы отправить.Esc,чтобы отменить.';

								// =============================================
								// Players list drop down list.
								// =============================================
								var playersDropDownList = document.createElement("select");
								playersDropDownList.id = "playersList";
								playersDropDownList.className = 'players-list';

								// Add default option.
								var allOption = document.createElement("option");
								allOption.value = '0';
								allOption.text = '-- All --';
								playersDropDownList.appendChild(allOption);

								try {
									var players = global.playersList;

									//Create and append the options
									for (var i = 0; i < players.length; i += 2) {
										var option = document.createElement("option");
										option.value = players[i];
										option.text = players[i + 1];
										playersDropDownList.appendChild(option);
									}

									// Try to set the value to previously selected player id.
									playersDropDownList.value = global.selectedPlayerId;

									// Player does not exist anymore?
									if (playersDropDownList.value != global.selectedPlayerId) {
										// Change to default index.
										playersDropDownList.selectedIndex = 0;
									}
								} catch (error) {
									console.log(error);
								}

								// =============================================
								// Chat input wrapper div.
								var chatInputWrapper = document.createElement('div');
								chatInputWrapper.style.position = 'absolute';
								chatInputWrapper.style.width = '720px';

								chatInputWrapper.style.left = '50%';
								chatInputWrapper.style.bottom = '100px';
								chatInputWrapper.style.transform = 'translate(-50%, -50%)';
								chatInputWrapper.style.margin = '0 auto';
								chatInputWrapper.style.visibility = 'hidden';

								chatInputWrapper.appendChild(playersDropDownList);
								chatInputWrapper.appendChild(chatInput);
								document.body.appendChild(chatInputWrapper);

								// Sending chat.
								chatInput.addEventListener('keydown', function (event) {
									if (event.key === 'Enter' || event.keyCode === 13) {
										// ========================================================================
										// Check again if the player died, otherwise, it hangs the client.
										// There will be an error saying that "color is undefined" in app.js file.
										// ========================================================================
										// Death chat experiment.
										if (global.died) {
											global.socket.talk('s', global.playerName, 0);
											global.died = false;
										} else {
											var chatMessage = chatInput.value;

											if (chatMessage) {
												var maxLen = 100;
												var trimmedMessage = chatMessage.length > maxLen ? chatMessage.substring(0, maxLen - 3) + "..." : chatMessage.substring(0, maxLen);

												var ddl = playersDropDownList;
												if (ddl) {
													global.playersListIndex = ddl.selectedIndex;
													global.selectedPlayerId = ddl.options[ddl.selectedIndex].value;
												}

												global.socket.talk('h', trimmedMessage, global.selectedPlayerId);

												chatInputWrapper.removeChild(playersDropDownList);
												chatInputWrapper.removeChild(chatInput);
												document.body.removeChild(chatInputWrapper);

												var gameCanvas = document.getElementById('gameCanvas');
												gameCanvas.focus();

												global.isChatMode = false;
											}
										}
									}
								});

								// Cancelling chat - pressing ESC in players dropdown list.
								playersDropDownList.addEventListener('keydown', function (event) {
									if (event.key === 'Esc' || event.keyCode === 27) {
										chatInputWrapper.removeChild(playersDropDownList);
										chatInputWrapper.removeChild(chatInput);
										document.body.removeChild(chatInputWrapper);

										var gameCanvas = document.getElementById('gameCanvas');
										gameCanvas.focus();
										global.isChatMode = false;
									}
								});

								// Cancelling chat.
								chatInput.addEventListener('keydown', function (event) {
									if (event.key === 'Esc' || event.keyCode === 27) {
										chatInputWrapper.removeChild(playersDropDownList);
										chatInputWrapper.removeChild(chatInput);
										document.body.removeChild(chatInputWrapper);

										var gameCanvas = document.getElementById('gameCanvas');
										gameCanvas.focus();
										global.isChatMode = false;
									}
								});

								global.isChatMode = true;

								// To remove initial "i" letter.
								setTimeout(function () {
									chatInput.value = '';
									chatInputWrapper.style.visibility = 'visible';
									chatInput.focus();
								}, 10);
							} else {
								// Already in chat mode, focus the chat input textbox.
								var existingChatInput = document.getElementById('chatInput');
								if (existingChatInput) {
									// Remove 'h' from the input.
									var oldValue = existingChatInput.value;
									existingChatInput.value = '';
									existingChatInput.focus();
									existingChatInput.value = oldValue;
								}
							}
						}
						break;
					// ===========================================

					case global.KEY_UP_ARROW:
					case global.KEY_UP:
						this.parent.socket.cmd.set(0, true);break;
					case global.KEY_DOWN_ARROW:
					case global.KEY_DOWN:
						this.parent.socket.cmd.set(1, true);break;
					case global.KEY_LEFT_ARROW:
					case global.KEY_LEFT:
						this.parent.socket.cmd.set(2, true);break;
					case global.KEY_RIGHT_ARROW:
					case global.KEY_RIGHT:
						this.parent.socket.cmd.set(3, true);break;
					case global.KEY_MOUSE_0:
						this.parent.socket.cmd.set(4, true);break;
					case global.KEY_MOUSE_1:
						this.parent.socket.cmd.set(5, true);break;
					case global.KEY_MOUSE_2:
						this.parent.socket.cmd.set(6, true);break;
					case global.KEY_LEVEL_UP:
						this.parent.socket.talk('L');break;
					case global.KEY_FUCK_YOU:
						this.parent.socket.talk('0');break;
				}
				if (!event.repeat) {
					switch (event.keyCode) {
						case global.KEY_AUTO_SPIN:
							this.parent.socket.talk('t', 0);break;
						case global.KEY_AUTO_FIRE:
							this.parent.socket.talk('t', 1);break;
						case global.KEY_OVER_RIDE:
							this.parent.socket.talk('t', 2);break;
					}
					if (global.canSkill) {
						switch (event.keyCode) {
							case global.KEY_UPGRADE_ATK:
								this.parent.socket.talk('x', 0);break;
							case global.KEY_UPGRADE_HTL:
								this.parent.socket.talk('x', 1);break;
							case global.KEY_UPGRADE_SPD:
								this.parent.socket.talk('x', 2);break;
							case global.KEY_UPGRADE_STR:
								this.parent.socket.talk('x', 3);break;
							case global.KEY_UPGRADE_PEN:
								this.parent.socket.talk('x', 4);break;
							case global.KEY_UPGRADE_DAM:
								this.parent.socket.talk('x', 5);break;
							case global.KEY_UPGRADE_RLD:
								this.parent.socket.talk('x', 6);break;
							case global.KEY_UPGRADE_MOB:
								this.parent.socket.talk('x', 7);break;
							case global.KEY_UPGRADE_RGN:
								this.parent.socket.talk('x', 8);break;
							case global.KEY_UPGRADE_SHI:
								this.parent.socket.talk('x', 9);break;
						}
					}
					// if (global.canUpgrade) {
					//     switch (event.keyCode) {
					//     case global.KEY_CHOOSE_1:  this.parent.socket.talk('U', 0); break;
					//     case global.KEY_CHOOSE_2:  this.parent.socket.talk('U', 1); break;
					//     case global.KEY_CHOOSE_3:  this.parent.socket.talk('U', 2); break;
					//     case global.KEY_CHOOSE_4:  this.parent.socket.talk('U', 3); break;
					//     case global.KEY_CHOOSE_5:  this.parent.socket.talk('U', 4); break;
					//     case global.KEY_CHOOSE_6:  this.parent.socket.talk('U', 5); break;
					//     case global.KEY_CHOOSE_7:  this.parent.socket.talk('U', 6); break;
					//     case global.KEY_CHOOSE_8:  this.parent.socket.talk('U', 7); break;
					//     }
					// }
				}
			}
		}, {
			key: "keyboardUp",
			value: function keyboardUp(event) {
				switch (event.keyCode) {
					case global.KEY_UP_ARROW:
					case global.KEY_UP:
						this.parent.socket.cmd.set(0, false);break;
					case global.KEY_DOWN_ARROW:
					case global.KEY_DOWN:
						this.parent.socket.cmd.set(1, false);break;
					case global.KEY_LEFT_ARROW:
					case global.KEY_LEFT:
						this.parent.socket.cmd.set(2, false);break;
					case global.KEY_RIGHT_ARROW:
					case global.KEY_RIGHT:
						this.parent.socket.cmd.set(3, false);break;
					case global.KEY_MOUSE_0:
						this.parent.socket.cmd.set(4, false);break;
					case global.KEY_MOUSE_1:
						this.parent.socket.cmd.set(5, false);break;
					case global.KEY_MOUSE_2:
						this.parent.socket.cmd.set(6, false);break;
				}
			}
		}, {
			key: "mouseDown",
			value: function mouseDown(mouse) {
				switch (mouse.button) {
					case 0:
						var mpos = { x: mouse.clientX, y: mouse.clientY };
						var statIndex = global.clickables.stat.check(mpos);
						if (statIndex !== -1) this.parent.socket.talk('x', statIndex);else if (global.clickables.skipUpgrades.check(mpos) !== -1) global.clearUpgrades();else {
							var upgradeIndex = global.clickables.upgrade.check(mpos);
							if (upgradeIndex !== -1) this.parent.socket.talk('U', upgradeIndex);else this.parent.socket.cmd.set(4, true);
						}
						break;
					case 1:
						this.parent.socket.cmd.set(5, true);break;
					case 2:
						this.parent.socket.cmd.set(6, true);break;
				}
			}
		}, {
			key: "mouseUp",
			value: function mouseUp(mouse) {
				switch (mouse.button) {
					case 0:
						this.parent.socket.cmd.set(4, false);break;
					case 1:
						this.parent.socket.cmd.set(5, false);break;
					case 2:
						this.parent.socket.cmd.set(6, false);break;
				}
			}
			// Mouse location (we send target information in the heartbeat)

		}, {
			key: "gameInput",
			value: function gameInput(mouse) {
				this.parent.target.x = mouse.clientX - this.width / 2;
				this.parent.target.y = mouse.clientY - this.height / 2;
				global.target = this.parent.target;
				global.statHover = global.clickables.hover.check({ x: mouse.clientX, y: mouse.clientY }) === 0;
			}
		}]);

		return Canvas;
	}();

	module.exports = Canvas;

	/***/
},
/* 4 */
/***/function (module, exports) {

	/*jslint esversion: 6*/
	/*global require, exports, console*/
	/*jshint -W097*/
	"use strict";

	function checkEndian() {
		var arrayBuffer = new ArrayBuffer(2);
		var uint8Array = new Uint8Array(arrayBuffer);
		var uint16array = new Uint16Array(arrayBuffer);
		uint8Array[0] = 0xAA; // set first byte
		uint8Array[1] = 0xBB; // set second byte
		if (uint16array[0] === 0xBBAA) return 0;
		if (uint16array[0] === 0xAABB) return 1;else throw new Error("Something crazy just happened");
	}

	/*var isBigEndian = new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x12;
 var isLittleEndian = new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x78;*/

	exports.encode = function () {
		// unsigned 8-bit integer
		var arrUint8 = new Uint8Array(1);
		// unsigned 16-bit integer
		var arrUint16 = new Uint16Array(1);
		var charUint16 = new Uint8Array(arrUint16.buffer);
		// unsigned 32-bit integer
		var arrUint32 = new Uint32Array(1);
		var charUint32 = new Uint8Array(arrUint32.buffer);
		// 32-bit float
		var arrFloat32 = new Float32Array(1);
		var charFloat32 = new Uint8Array(arrFloat32.buffer);
		// build some useful internal functions
		var typeEncoder = function typeEncoder(type, number) {
			var output = '';
			switch (type) {
				case 'RawUint8':
					arrUint8[0] = number;
					return String.fromCharCode(arrUint8[0]);
				case 'RawUint16':
					arrUint16[0] = number;
					return String.fromCharCode(charUint16[0], charUint16[1]);
				case 'Uint8':
					arrUint8[0] = number;
					return '0' + String.fromCharCode(arrUint8[0]);
				case 'Uint16':
					arrUint16[0] = number;
					return '1' + String.fromCharCode(charUint16[0], charUint16[1]);
				case 'Uint32':
					arrUint32[0] = number;
					return '2' + String.fromCharCode(charUint32[0], charUint32[1], charUint32[2], charUint32[3]);
				case 'Sint8':
					arrUint8[0] = -1 - number;
					return '3' + String.fromCharCode(arrUint8[0]);
				case 'Sint16':
					arrUint16[0] = -1 - number;
					return '4' + String.fromCharCode(charUint16[0], charUint16[1]);
				case 'Sint32':
					arrUint32[0] = -1 - number;
					return '5' + String.fromCharCode(charUint32[0], charUint32[1], charUint32[2], charUint32[3]);
				case 'Float32':
					arrFloat32[0] = number;
					return '6' + String.fromCharCode(charFloat32[0], charFloat32[1], charFloat32[2], charFloat32[3]);
				case 'String8':
					return '7' + typeEncoder('RawUint16', number.length) + number;
				case 'String16':
					for (var i = 0, strLen = number.length; i < strLen; i++) {
						output += typeEncoder('RawUint16', number.charCodeAt(i));
					}
					return '8' + typeEncoder('RawUint16', output.length) + output;
				default:
					throw new Error('Unknown encoding type.');
			}
		};
		var findType = function findType(value) {
			if (typeof value === 'string') {
				for (var i = 0; i < value.length; i++) {
					if (value.charCodeAt(i) > 255) return 'String16';
				}
				return 'String8';
			}
			if (typeof value === 'boolean') return 'Uint8';
			if (typeof value !== 'number') {
				throw new Error('Unencodable data type');
			}
			if (value != Math.round(value)) return 'Float32';
			if (value < 0) {
				if (value >= -256) return 'Sint8';
				if (value >= -65535) return 'Sint16';
				if (value >= -4294967295) return 'Sint32';
			} else {
				if (value < 256) return 'Uint8';
				if (value < 65535) return 'Uint16';
				if (value < 4294967295) return 'Uint32';
			}
			return 'Float32';
		};
		// build the function
		return function (arr) {
			var verbose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var output = arr.splice(0, 1)[0];
			if (typeof output !== 'string') throw new Error('No identification code!');
			arr.forEach(function (value) {
				output += typeEncoder(findType(value), value);
			});
			var len = output.length;
			var buffer = new ArrayBuffer(len);
			var integerView = new Uint8Array(buffer);
			for (var i = 0; i < len; i++) {
				integerView[i] = output.charCodeAt(i);
			}
			if (verbose) {
				console.log('OUTPUT: ' + integerView);
				console.log('RAW OUTPUT: ' + output);
				console.log('SIZE: ' + len);
			}
			return buffer;
		};
	}();

	exports.decode = function () {
		// unsigned 8-bit integer (none needed)
		// unsigned 16-bit integer
		var arrUint16 = new Uint16Array(1);
		var charUint16 = new Uint8Array(arrUint16.buffer);
		// unsigned 32-bit integer
		var arrUint32 = new Uint32Array(1);
		var charUint32 = new Uint8Array(arrUint32.buffer);
		// 32-bit float
		var arrFloat32 = new Float32Array(1);
		var charFloat32 = new Uint8Array(arrFloat32.buffer);
		// build a useful internal function
		var typeDecoder = function typeDecoder(str, type, offset) {
			switch (type) {
				case 'Uint8':
					return str.charCodeAt(offset++);
				case 'Uint16':
					for (var i = 0; i < 2; i++) {
						charUint16[i] = str.charCodeAt(offset++);
					}
					return arrUint16[0];
				case 'Uint32':
					for (var _i12 = 0; _i12 < 4; _i12++) {
						charUint32[_i12] = str.charCodeAt(offset++);
					}
					return arrUint32[0];
				case 'Sint8':
					return -1 - str.charCodeAt(offset++);
				case 'Sint16':
					for (var _i13 = 0; _i13 < 2; _i13++) {
						charUint16[_i13] = str.charCodeAt(offset++);
					}
					return -1 - arrUint16[0];
				case 'Sint32':
					for (var _i14 = 0; _i14 < 4; _i14++) {
						charUint32[_i14] = str.charCodeAt(offset++);
					}
					return -1 - arrUint32[0];
				case 'Float32':
					for (var _i15 = 0; _i15 < 4; _i15++) {
						charFloat32[_i15] = str.charCodeAt(offset++);
					}
					return arrFloat32[0];
				default:
					throw new Error('Unknown decoding type.');
			}
		};
		// actually decode it 
		return function (raw) {
			try {
				var intView = new Uint8Array(raw);
				var str = '';
				for (var i = 0, len = intView.length; i < len; i++) {
					str += String.fromCharCode(intView[i]);
				}
				var offset = 1;
				var output = [str.charAt(0)];
				while (offset < str.length) {
					switch (str[offset++]) {
						case '0':
							output.push(typeDecoder(str, 'Uint8', offset));offset++;break;
						case '1':
							output.push(typeDecoder(str, 'Uint16', offset));offset += 2;break;
						case '2':
							output.push(typeDecoder(str, 'Uint32', offset));offset += 4;break;
						case '3':
							output.push(typeDecoder(str, 'Sint8', offset));offset++;break;
						case '4':
							output.push(typeDecoder(str, 'Sint16', offset));offset += 2;break;
						case '5':
							output.push(typeDecoder(str, 'Sint32', offset));offset += 4;break;
						case '6':
							output.push(typeDecoder(str, 'Float32', offset));offset += 4;break;
						case '7':
							{
								// String8
								var _len10 = typeDecoder(str, 'Uint16', offset);offset += 2;
								output.push(str.slice(offset, offset + _len10));
								offset += _len10;
							}break;
						case '8':
							{
								// String16
								var _len11 = typeDecoder(str, 'Uint16', offset);offset += 2;
								var arr = str.slice(offset, offset + _len11);
								var buf = new Uint16Array(_len11 / 2);
								for (var _i16 = 0; _i16 < _len11; _i16 += 2) {
									buf[_i16 / 2] = typeDecoder(arr, 'Uint16', _i16);
								}
								output.push(String.fromCharCode.apply(null, buf));
								offset += _len11;
							}break;
						default:
							offset = str.length;throw new Error('Unknown decoding command. Decoding exited.');
					}
				}
				return output;
			} catch (err) {
				console.log(err);return -1;
			}
		};
	}();

	/***/
}]
/******/);