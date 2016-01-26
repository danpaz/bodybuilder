'use strict'

var repl = require('repl')
var Bodybuilder = require('./lib/index')

repl.start('bodybuilder > ').context.Bodybuilder = Bodybuilder
