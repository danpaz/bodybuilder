'use strict'

var repl = require('repl')
var bodybuilder = require('./lib/index')

repl.start('bodybuilder > ').context.bodybuilder = bodybuilder
