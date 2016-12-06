let spawnController = require('order.workers');

let workerDispatcher = require('dispatcher.builder');
let workerBehavior = require('creep.behavior');

let invaderBehavior = require('invader.behavior');

let runnerDispatcher = require('runner.dispatcher');
let runnerBehavior = require('runner.behavior');

let SPAWN_NAME = 'core1';

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    spawnController.buildCreep();

    workerDispatcher.orderCreeps();
    workerBehavior.run();
    
    invaderBehavior.run();
    
    runnerDispatcher.run();
    runnerBehavior.run();
}