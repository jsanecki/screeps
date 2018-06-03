let C = require('role.constants');

/**
* @module planner.worker
* Logging Planner[Worker]
*/
var orderWorkers = {
    buildCreep: function(energyStatus) {
        if(this.buildBasicWorker(energyStatus.available) != ERR_NOT_ENOUGH_ENERGY) {
            console.log(`Planner[Worker]: Creating Worker Creep`);
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
    buildBasicWorker: function(energy) {
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
