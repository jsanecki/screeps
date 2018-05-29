const WORKER_COUNT = 10;
const SPECIALIST_COUNT = 1;
const SOLIDERS = 10;

var orderWorkers = {
 
    buildCreep: function() {
        let energyAvailable = 0;
        let energyCapacity = 0;
        for(let spawn in Game.spawns) {
            energyAvailable = Game.spawns[spawn].room.energyAvailable;
            energyCapacity = Game.spawns[spawn].room.energyCapacityAvailable;

        }
        //Maintain at least X worker types
        let creepWorkerCount = _.filter(Game.creeps, (creep) => creep.memory.classifier == 'worker').length;
        let creepSpecialistCount = _.filter(Game.creeps, (creep) => creep.memory.classifier == 'specialist').length;
        let creepRunnerCount = _.filter(Game.creeps, (creep) => creep.memory.classifier == 'runner').length;
        
        if(Game.time % 10 == 0) {
            console.log(`This room Spawner has ${energyAvailable} available energy out of ${energyCapacity}`);
            console.log(`Workers at ${creepWorkerCount} out of ${WORKER_COUNT}, and ${creepSpecialistCount} Specialists, ${creepRunnerCount} Runners`);
        }
        
        if(creepWorkerCount < WORKER_COUNT && energyAvailable > 200) {
            if(this.basic(energyAvailable) != ERR_NOT_ENOUGH_ENERGY) {
                console.log(`Creating Creep`);
            } 
        } else if(creepSpecialistCount < SPECIALIST_COUNT && creepWorkerCount >= WORKER_COUNT) { 
            var name;
            if(energyAvailable >= 1200 && creepSpecialistCount < 1) {
                if(this.tanker() != ERR_NOT_ENOUGH_ENERGY) { console.log(`Creating Tanker`); }
            }
        } else if(creepRunnerCount < 2 && creepWorkerCount >= WORKER_COUNT && energyAvailable > 600) {
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
        console.log(`sets ${ sets}`);
        let limbs = [];
        for(let i = 0; i < sets;i++) {
            limbs = limbs.concat(limbSet);
        }
        console.log(`Making Creep with ${limbs.length} limbs`);
        return this.build(limbs, { 'classifier': 'worker', 'generation': sets});
    }
}

module.exports = orderWorkers;