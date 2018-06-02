let C = require('role.constants');

const WORKER_COUNT = C.CREEP_COUNTS.COLLECTOR;
const SPECIALIST_COUNT = 1;
const SOLIDERS = 10;

var orderWorkers = {

    getCreepStatus: function() {
      return {
        'worker': _.filter(Game.creeps, (creep) => creep.memory.classifier == 'worker').length,
        'specialist': _.filter(Game.creeps, (creep) => creep.memory.classifier == 'specialist').length,
        'runner': _.filter(Game.creeps, (creep) => creep.memory.classifier == 'runner').length
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
    buildCreep: function() {
        const CREEPER_STATUS = this.getCreepStatus();
        const ENERGY_STATUS = this.getEnergyStatus();

        //Report on current Status
        if(Game.time % 10 == 0) {
            console.log(`This room Spawner has ${ENERGY_STATUS.available} available energy out of ${ENERGY_STATUS.capacity}`);
            console.log(`Workers at ${CREEPER_STATUS.worker} out of ${WORKER_COUNT}, and ${CREEPER_STATUS.specialist} Specialists, ${CREEPER_STATUS.runner} Runners`);
        }

        if(CREEPER_STATUS.worker < WORKER_COUNT && ENERGY_STATUS.available > 200) {
            if(this.basic(ENERGY_STATUS.available) != ERR_NOT_ENOUGH_ENERGY) {
                console.log(`Creating Creep`);
            }
        } else if(CREEPER_STATUS.specialist < SPECIALIST_COUNT && CREEPER_STATUS.worker >= WORKER_COUNT) {
            var name;
            if(ENERGY_STATUS.available >= 1200 && CREEPER_STATUS.specialist < 1) {
                if(this.tanker() != ERR_NOT_ENOUGH_ENERGY) { console.log(`Creating Tanker`); }
            }
        } else if(CREEPER_STATUS.runner < 2 && CREEPER_STATUS.worker >= WORKER_COUNT && ENERGY_STATUS.available > 600) {
                if(this.runner() != ERR_NOT_ENOUGH_ENERGY) { console.log(`Creating Runner`); }
        }

    },
    calcCost: function(limbs) {
        return limbs.map(function(value) {
            return BODYPART_COST[value];
        }).reduce(function(a, b) {
            return a + b;
        }, 0);
    },
    maxLimbs: function(limbSet, energy) {
        let sets = Math.floor(energy / this.calcCost(limbSet));
        let limbs = [];
        for(let i = 0; i < sets;i++) {
            limbs = limbs.concat(limbSet);
        }
        return { 'limbs': limbs, 'generation': sets };
    },
    build: function(limbs, memory) {
        console.log(`Creating a Creep with a cost of ${this.calcCost(limbs)}`);
        return Game.spawns['Mojo-Core'].createCreep(limbs, undefined, memory);
    },
    runner: function() {
        let limbs = [WORK,WORK,WORK,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE];
        return this.build(limbs, { 'classifier':'runner', 'role': 'collector' });
    },
    tanker: function() {
        let limbs = [WORK,
        WORK,
        WORK,
        WORK,
        WORK,
        WORK,
        CARRY,CARRY,
        CARRY,CARRY,
        CARRY,CARRY,
        CARRY,CARRY,
        CARRY,CARRY,
        CARRY,CARRY,
        MOVE,MOVE];
        return this.build(limbs, { 'role': 'tanker', 'classifier': 'specialist'});
    },
    defender: function(energy) {
        let limbSet = [ATTACK,TOUGH,TOUGH,MOVE,MOVE];
        let stucture = this.maxLimbs(limbSet, energy)
        return this.build(stucture.limbs, { 'role': 'defender', 'classifier': 'soldier', 'generation': stucture.generation });
    },
    basic: function(energy) {
        let limbSet= [WORK,CARRY,MOVE];
        let sets = Math.floor(energy / this.calcCost(limbSet));
        console.log(`generation will be ${ sets}`);
        let limbs = [];
        for(let i = 0; i < sets;i++) {
            limbs = limbs.concat(limbSet);
        }
        console.log(`Making Creep with ${limbs.length} limbs`);
        return this.build(limbs, { 'classifier': 'worker', 'generation': sets});
    }
}

module.exports = orderWorkers;
