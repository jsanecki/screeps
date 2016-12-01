const WORKER_COUNT = 10;

var orderWorkers = {
 
    buildCreep: function() {
        let energyAvailable = 0;
        let energyCapacity = 0;
        for(let spawn in Game.spawns) {
            energyAvailable = Game.spawns[spawn].room.energyAvailable;
            energyCapacity = Game.spawns[spawn].room.energyCapacityAvailable;
            if(Game.time % 10 == 0) {
                console.log(`This room Spawner has ${energyAvailable} available energy out of ${energyCapacity}`);
            }
        }
        //Maintain at least X worker types
        let creepWorkerCount = _.filter(Game.creeps, (creep) => creep.memory.function == 'worker').length;
        let creepTankerCount = _.filter(Game.creeps, (creep) => creep.memory.function == 'tanker').length;
        if(creepWorkerCount < WORKER_COUNT) {
            console.log(`At ${creepWorkerCount} out of ${WORKER_COUNT}`);
            var name;
            if(energyAvailable >= 800 && creepTankerCount < 3) {
                name = this.tanker();
            } else if(energyAvailable >= 300) {
                name = this.basic(energyAvailable);
            }
            
            if(name && name != ERR_NOT_ENOUGH_ENERGY){
                console.log(`Creating Creep ${name}`);
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
        let sets = Math.round(energy / this.calcCost(limbSet));
        let limbs = [];
        for(let i = 0; i < sets;i++) {
            limbs = limbs.concat(limbSet);
        }
        return limbs;
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
        CARRY,CARRY,
        CARRY,CARRY,
        CARRY,CARRY,
        MOVE,CARRY];
        return this.build(limbs, { 'function': 'tanker', 'role': 'tanker'});
    },
    defender: function(energy) {
        let limbs = [ATTACK,TOUGH,TOUGH,MOVE,MOVE];
        return this.build(this.maxLimbs(limbs, energy), { 'function': 'solider', 'role': 'melee'});
    },
    basic: function(energy) {
        let sets = Math.round(energy / 200);
        let limbs = [];
        let limbSet= [WORK,CARRY,MOVE];
        for(let i = 0; i < sets;i++) {
            limbs = limbs.concat(limbSet);
        }
        console.log(`Making Creep with ${limbs.length} limbs`);
        return this.build(limbs, { 'function': 'worker'});
    }
}

module.exports = orderWorkers;