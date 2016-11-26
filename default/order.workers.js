const LIMB_COSTS = {
  "WORK": 100,
  "CARRY": 50,
  "MOVE": 50,
  "ATTACK": 80,
  "RANGED_ATTACK": 150,
  "HEAL": 250,
  "CLAIM": 600,
  "TOUGH": 10
};

var orderWorkers = {
 
    buildCreep: function() {
        let energyAvailable = 0;
        for(let spawn in Game.spawns) {
            energyAvailable = Game.spawns[spawn].room.energyAvailable;
            if(Game.time % 10 == 0) {
                console.log(`spawn has ${energyAvailable} available energy`);
            }
        }
        
        if(Object.keys(Game.creeps).length < 8) {
            var name;
            if(energyAvailable == 500) {
                name = this.collector();
            } else {
                name = this.basic();
            }
            if(name != ERR_NOT_ENOUGH_ENERGY){
                console.log(`Creating Creep ${name}`);
            }
        }
    },
    calcCost: function(limbs) {
        let cost = 0;
        for(let limb in limbs) {
            cost += LIMB_COSTS[limb] 
        }
        return cost;
    },
    build: function(limbs, memory) {
        console.log(`Creating a Collector with a cost of ${this.calcCost(limbs)}`);
        return Game.spawns['core1'].createCreep(limbs, undefined, memory);
    },
    recharger: function() {
        let limbs = [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE];
        return this.build(limbs, { 'function': 'recharger'});
    },
    collector: function() {
        let limbs = [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
        return this.build(limbs, { 'function': 'worker'});
    },
    basic: function() {
        let limbs = [WORK,CARRY,MOVE,MOVE];
        return this.build(limbs, { 'function': 'worker'});
        //console.log(`Creating a Collector with a cost of 300`);
        //return Game.spawns['core1'].createCreep(limbs, undefined, { 'function': 'worker'});
    }
}

module.exports = orderWorkers;