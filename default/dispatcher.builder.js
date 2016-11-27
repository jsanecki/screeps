var behavior = require('creep.behavior');

const TYPES = behavior.TYPES();

var dispatcher = {
    
    calNumberOfUpgraders: function() {
        let count = 0
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == TYPES.UPGRADE) {
                count++;
            }
        }
        return count;
    },
    orderCreeps: function() {
        let upgraderCount = this.calNumberOfUpgraders();
        //console.log(`Count of Upgraders is at ${upgraderCount}`);
        
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            
            if(!creep.memory.role) {
                //console.log('Dispatching');
                //console.log(`Sites Detected ${Object.keys(creep.room.find(FIND_CONSTRUCTION_SITES)).length}`);
                if(creep.carry.energy < (creep.carryCapacity * .2)) {
                    console.log(`Dispatching ${ creep.name } to Collect Energy`);
                    creep.memory.role = TYPES.COLLECT;
                } else {
                    if(creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
                        console.log(`Dispatching ${ creep.name } to Recharge Spawners`);
                        creep.memory.role = TYPES.RECHARGE;
                    } else if (upgraderCount < 3) {
                        console.log(`Dispatching ${ creep.name } to Upgrade`);
                        creep.memory.role = TYPES.UPGRADE;
                    } else if(0 < Object.keys(creep.room.find(FIND_CONSTRUCTION_SITES)).length) {
                        console.log(`Dispatching ${ creep.name } to Builder`);
                        creep.memory.role = TYPES.BUILD;
                    } else {
                        console.log(`Nothing to do so Dispatching ${ creep.name } to Upgrade`);
                        creep.memory.role = TYPES.UPGRADE;
                    }
                }
            }
        }
    }
}

module.exports = dispatcher;