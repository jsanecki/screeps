/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.constants');
 * mod.thing == 'a thing'; // true
 */

module.exports = Object.freeze({
    'COLLECT':'collector',
    'RECHARGE': 'recharger',
    'BUILD': 'builder',
    'UPGRADE': 'upgrader',
    'TANK': 'tanker',
    'RENEW': 'carousel',
    
    'CLASSIFIER': {
        'WORKER': 'worker',
        'SPECIALIST':'specialist',
        'INVADER':'invader'
    },
    'CREEP_COUNTS': {
        'COLLECTOR': 12
    }
});