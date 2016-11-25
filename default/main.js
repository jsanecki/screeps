var orderWorkers = require('order.workers');
var dispatcher = require('dispatcher.builder');
var behavior = require('creep.behavior');

var SPAWN_NAME = 'core1';

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
    
    orderWorkers.buildCreep();

    dispatcher.orderCreeps();
    
    behavior.run();
}