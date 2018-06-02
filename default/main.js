let spawnController = require('order.workers');

let workerDispatcher = require('dispatcher.builder');
let workerBehavior = require('creep.behavior');

let invaderBehavior = require('invader.behavior');

let runnerDispatcher = require('runner.dispatcher');
let runnerBehavior = require('runner.behavior');

let plannerWorld = require('planner.world');

let SPAWN_NAME = 'Mojo-Core';

module.exports.loop = function () {

    if(Game.time % 20 == 0) {
      for(var name in Memory.creeps) {
          if(!Game.creeps[name]) {
              delete Memory.creeps[name];
              console.log('Main: Clearing non-existing creep memory:', name);
          }
      }

      plannerWorld.update();
    }

    spawnController.buildCreep();

    workerDispatcher.orderCreeps();
    workerBehavior.run();

    //invaderBehavior.run();

    runnerDispatcher.run();
    runnerBehavior.run();
}
