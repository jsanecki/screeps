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
    shouldBePivotCollector: function(creep) {
      let generationPoint = 8; //max gen

      if ((creep.memory.generation >= generationPoint) && Memory.world.status.isPivotPointAvaliable) {
        Memory.world.status.isPivotPointAvaliable = false;
        return false; //TOOD should be true - disabled for now
      }

      return false;
    },
    shouldRenew: function(creep) {
        let generationPoint = 6; // top 2 gens?

        return (creep.carry.energy < (creep.carryCapacity * .2) &&
        creep.ticksToLive < C.CREEP_RENEW_AT &&
        (creep.memory.generation && creep.memory.generation > generationPoint));
    },
    orderCreeps: function() {
        let upgraderCount = this.calNumberOfUpgraders();

        let creeps = _.filter(Game.creeps, (creep) => (creep.memory.classifier == 'worker'));
        for(var name in creeps) {
            let creep = creeps[name];

            if(!creep.memory.role) {
                if(this.shouldRenew(creep)) {
                    console.log(`Worker[Dispatcher]: Dispatching ${creep.name} to Renew at Spawner`);
                    creep.memory.role = C.RENEW;
                } else if(this.shouldBePivotCollector(creep)) {
                    console.log(`Worker[Dispatcher]: Dispatching ${creep.name} to be Pivot Collector`);
                    creep.memory.role = C.PIVOT_COLLECT;
                } else if(creep.carry.energy < (creep.carryCapacity * .2)) {
                    console.log(`Worker[Dispatcher]: Dispatching ${ creep.name } to Collect Energy`);
                    creep.memory.role = C.COLLECT;
                } else {
                    if(creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
                        console.log(`Worker[Dispatcher]: Dispatching ${ creep.name } to Recharge Spawners`);
                        creep.memory.role = C.RECHARGE;
                    } else if (upgraderCount < C.CREEP_ROLE_COUNTS.UPGRADE) {
                        console.log(`Worker[Dispatcher]: Dispatching ${ creep.name } to Upgrade`);
                        upgraderCount++;
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
