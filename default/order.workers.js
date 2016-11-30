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
            if(energyAvailable >= 800 && creepTankerCount < 1) {
                name = this.tanker();
            } else if(energyAvailable >= 550 && energyCapacity <= 800) {
                name = this.collector();
            } else if(energyAvailable >= 300 && energyCapacity < 500) {
                name = this.basic();
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
    build: function(limbs, memory) {
        console.log(`Creating a Collector with a cost of ${this.calcCost(limbs)}`);
        return Game.spawns['core1'].createCreep(limbs, undefined, memory);
    },
    tanker: function() {
        let limbs = [WORK,
        WORK,
        WORK,
        CARRY,CARRY,
        CARRY,CARRY,
        CARRY,CARRY,
        CARRY,CARRY,
        MOVE,MOVE];
        return this.build(limbs, { 'function': 'worker', 'role': 'tanker'});
    },
    defender: function() {
        let limbs = [ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE];
        return this.build(limbs, { 'function': 'solider', 'role': 'melee'});
    },
    collector: function() {
        let limbs = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE];
        return this.build(limbs, { 'function': 'worker'});
    },
    basic: function() {
        let limbs = [WORK,WORK,CARRY,MOVE];
        return this.build(limbs, { 'function': 'worker'});
    }
}

module.exports = orderWorkers;