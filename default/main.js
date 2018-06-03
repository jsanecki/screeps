let planner_world = require('planner.world');
let planner_creep = require('planner.creep');

let worker_dispatcher = require('worker.dispatcher');
let worker_behavior = require('worker.behavior');

//let warrior_behavior = require('warrior.behavior');

//let runnerDispatcher = require('runner.dispatcher');
//let runnerBehavior = require('runner.behavior');

let SPAWN_NAME = 'Mojo-Core';

module.exports.loop = function () {

    // Periodic update and processing, to save on CPU
    if(Game.time % 100 == 0) {
      for(var name in Memory.creeps) {
          if(!Game.creeps[name]) {
              delete Memory.creeps[name];
              console.log('Main: Clearing non-existing creep memory:', name);
          }
      }

      planner_world.update();
    }

    // For each Tick planning
    planner_creep.run();

    // worker logic
    worker_dispatcher.orderCreeps();
    worker_behavior.run();

    // warrior logic
    //warrior_behavior.run();

    // explorer logic
    //runnerDispatcher.run();
    //runnerBehavior.run();
}
