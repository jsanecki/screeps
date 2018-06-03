let C = require('role.constants');

var dispatcher = {

    calNumberOfUpgraders: function() {
        let count = 0
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == C.UPGRADE && creep.memory.classifier == 'worker') {
                count++;
            }
        }
        return count;
    },
    orderCreeps: function() {
        let upgraderCount = this.calNumberOfUpgraders();

        let creeps = _.filter(Game.creeps, (creep) => (creep.memory.classifier == 'worker'));
        for(var name in creeps) {
            let creep = creeps[name];

            if(!creep.memory.role) {
                // If the creep is generation 4 or more, then allow it to renew, verse die and be replaced.
                if(creep.carry.energy < (creep.carryCapacity * .2) && creep.ticksToLive < C.CREEP_RENEW_AT && (creep.memory.generation && creep.memory.generation > 3)) {
                    console.log(`Worker[Dispatcher]: Dispatching ${creep.name} to Renew at Spawner`)
                    creep.memory.role = C.RENEW;
                } else if(creep.carry.energy < (creep.carryCapacity * .2)) {
                    console.log(`Worker[Dispatcher]: Dispatching ${ creep.name } to Collect Energy`);
                    creep.memory.role = C.COLLECT;
                } else {
                    if(creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
                        console.log(`Worker[Dispatcher]: Dispatching ${ creep.name } to Recharge Spawners`);
                        creep.memory.role = C.RECHARGE;
                    } else if (upgraderCount < C.CREEP_ROLE_COUNTS.UPGRADE) {
                        console.log(`Worker[Dispatcher]: Dispatching ${ creep.name } to Upgrade`);
                        creep.memory.role = C.UPGRADE;
                    } else if(0 < Object.keys(creep.room.find(FIND_CONSTRUCTION_SITES)).length) {
                        console.log(`Worker[Dispatcher]: Dispatching ${ creep.name } to Builder`);
                        creep.memory.role = C.BUILD;
                    } else {
                        console.log(`Worker[Dispatcher]: Nothing to do so Dispatching ${ creep.name } to Upgrade`);
                        creep.memory.role = C.UPGRADE;
                    }
                }
            }
        }
    }
}

module.exports = dispatcher;
