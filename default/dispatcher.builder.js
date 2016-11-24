var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRecharge = require('role.recharger');

const LOUD_CREEPS = true;
const TYPES = {
    "COLLECT":"collector",
    "RECHARGE": "recharger",
    "BUILD": "builder",
    "HARVEST": "harvester"
}

var dispatcher = {
    
    orderCreeps() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            
            if(creep.memory.role) {
                //console.log(`Processing ${creep.memory.role}`);
                if(creep.memory.role == TYPES.COLLECT) {
                    roleHarvester.run(creep);
                }
                if(creep.memory.role == TYPES.RECHARGE) {
                    roleRecharge.run(creep);
                }
                if(creep.memory.role == TYPES.HARVEST) {
                    roleHarvester.run(creep);   
                }
                if(creep.memory.role == 'builder') {
                   roleBuilder.run(creep);
                }
                if(creep.memory.role == 'upgrader') {
                    roleUpgrader.run(creep);
                }
            } else {
                //console.log('Dispatching');
                if(creep.carry.energy < creep.carryCapacity) {
                    console.log(`dispatching ${ creep.name } to collect`);
                    creep.memory.role = TYPES.COLLECT;
                } else {
                    if(Game.spawns['Mojotanus'].energy < Game.spawns['Mojotanus'].energyCapacity) {
                        console.log(`Dispatching ${ creep.name } to recharge`);
                        creep.memory.role = TYPES.RECHARGE;
                    } else {
                        console.log(`Dispatching ${ creep.name } to build`);
                        creep.memory.role = 'upgrader';
                    }
                }
            }
        }
    }
}

module.exports = dispatcher