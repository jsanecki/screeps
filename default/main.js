var spawnController = require('order.workers');

var workerDispatcher = require('dispatcher.builder');
var workerBehavior = require('creep.behavior');

var invaderBehavior = require('invader.behavior');

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
    
    spawnController.buildCreep();

    workerDispatcher.orderCreeps();
    workerBehavior.run();
    
    invaderBehavior.run();
}