/**
 * @module role.constants
 * Creep based Constants
 */
module.exports = Object.freeze({
    'COLLECT':'collector',
    'RECHARGE': 'recharger',
    'BUILD': 'builder',
    'UPGRADE': 'upgrader',
    'TANK': 'tanker',
    'RENEW': 'carousel',
    'PIVOT_COLLECT':'pivot',

    'CLASSIFIER': {
        'WORKER': 'worker',
        'EXPLORER':'explorer',
        'WARRIOR':'warrior'
    },
    'CREEP_COUNTS': {
        'COLLECTOR': 10
    },
    'CREEP_ROLE_COUNTS': {
        'UPGRADE': 2
    },
    'CREEP_RENEW_AT': 500
});
