/// <reference path="../bodybuilder.d.ts" />

import bodybuilder = require('bodybuilder');

bodybuilder().query('match_all');
bodybuilder().query('match', 'someId', 2);
bodybuilder().query('match', 'someId', 'someId');