var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var orderWorkers = require('order.workers');
var dispatcher = require('dispatcher.builder');

var SPAWN_NAME = 'Mojotanus';

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builders');
    // if(Game.spawns[SPAWN_NAME].energy == Game.spawns[SPAWN_NAME].energyCapacity) {
    //     if(harvesters.length) {
    //         console.log('switching role from harvester to builder');
    //         harvesters[0].memory.role = 'builder';
    //     }
    // } 
    
    orderWorkers.buildWorker();

    dispatcher.orderCreeps();
}