let C = require('role.constants');
let planner_worker = require('planner.worker');

/**
* @module planner.creep
* Logging Planner[Creep]
*
* Plans for when to create a creep and the allotments of types, worker, warrior,
* etc. There should be a planner module for each category which will handle the
* design and any role specialist such as for warriors, range attacker verse healer.
*/
var planner = {

    getCreepStatus: function() {
      return {
        'worker': _.filter(Game.creeps, (creep) => creep.memory.classifier == C.CLASSIFIER.WORKER).length,
        'warrior': _.filter(Game.creeps, (creep) => creep.memory.classifier == C.CLASSIFIER.WARRIOR).length,
        'explorer': _.filter(Game.creeps, (creep) => creep.memory.classifier == C.CLASSIFIER.EXPLORER).length
      };
    },
    getEnergyStatus: function() {
      let energyAvailable = 0;
      let energyCapacity = 0;
      for(let spawn in Game.spawns) {
          energyAvailable = Game.spawns[spawn].room.energyAvailable;
          energyCapacity = Game.spawns[spawn].room.energyCapacityAvailable;
      }

      return {
        'available': energyAvailable,
        'capacity': energyCapacity
      }
    },
    run: function() {
        const CREEPER_STATUS = this.getCreepStatus();
        const ENERGY_STATUS = this.getEnergyStatus();

        // Report on current Status
        if(Game.time % 10 == 0) {
            console.log(`Planner[Creep] This room Spawner has ${ENERGY_STATUS.available} available energy out of ${ENERGY_STATUS.capacity}`);
            console.log(`Planner[Creep]: Status is Workers at ${CREEPER_STATUS.worker}, Warriors at ${CREEPER_STATUS.warrior}, and explorers at ${CREEPER_STATUS.explorer}`);
        }

        if(CREEPER_STATUS.worker < C.CREEP_COUNTS.COLLECTOR && ENERGY_STATUS.available > 200) {
            planner_worker.buildCreep(ENERGY_STATUS);
        }
    }
}

module.exports = planner;
