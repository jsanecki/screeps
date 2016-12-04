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
        let creepWorkerCount = _.filter(Game.creeps, (creep) => creep.memory.function == 'worker').length;
        let creepSpecialistCount = _.filter(Game.creeps, (creep) => creep.memory.function == 'tanker').length;
        
        if(Game.time % 10 == 0) {
            console.log(`This room Spawner has ${energyAvailable} available energy out of ${energyCapacity}`);
            console.log(`Workers at ${creepWorkerCount} out of ${WORKER_COUNT}, and ${creepSpecialistCount} Specialists`);
        }
        
        if(creepWorkerCount < WORKER_COUNT) {
            var name;
            if(energyAvailable >= 400) {
                name = this.basic(energyAvailable);
            } else if(energyAvailable >= 200 && creepWorkerCount < 3) {
                name = this.basic(energyAvailable);
            }
            
            if(name && name != ERR_NOT_ENOUGH_ENERGY){
                console.log(`Creating Creep ${name}`);
            }
        } else if(creepSpecialistCount < SPECIALIST_COUNT) { 
            var name;
            if(energyAvailable >= 1200 && creepSpecialistCount < 1) {
                if(this.tanker() != ERR_NOT_ENOUGH_ENERGY) {
                    console.log(`Creating Tanker`);
                }
            }
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
        console.log(`Creating a Collector with a cost of ${this.calcCost(limbs)}`);
        return Game.spawns['core1'].createCreep(limbs, undefined, memory);
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
        return this.build(limbs, { 'function': 'tanker', 'role': 'tanker', 'classifier': 'Specialist'});
    },
    defender: function(energy) {
        let limbSet = [ATTACK,TOUGH,TOUGH,MOVE,MOVE];
        let stucture = this.maxLimbs(limbSet, energy)
        return this.build(stucture.limbs, { 'function': 'solider', 'role': 'defender', 'classifier': 'soldier', 'generation': stucture.generation });
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
        return this.build(limbs, { 'function': 'worker', 'classifier': 'worker', 'generation': sets});
    }
}

module.exports = orderWorkers;