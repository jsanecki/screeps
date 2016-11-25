var roleCollector = require('role.collector');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRecharge = require('role.recharger');

const LOUD_CREEPS = true;
const TYPES = {
    "COLLECT":"collector",
    "RECHARGE": "recharger",
    "BUILD": "builder",
    "HARVEST": "harvester",
    "UPGRADE": "upgrader"
}

var dispatcher = {
    
    orderCreeps() {
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
                    } else if(0 < Object.keys(creep.room.find(FIND_CONSTRUCTION_SITES)).length) {
                        console.log(`Dispatching ${ creep.name } to Builder`);
                        creep.memory.role = TYPES.BUILD;
                    } else {
                        console.log(`Dispatching ${ creep.name } to Upgrade`);
                        creep.memory.role = 'upgrader';
                    }
                }
            }
        }
    }
}

module.exports = dispatcher;