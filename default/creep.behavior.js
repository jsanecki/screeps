var roleCollector = require('role.collector');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRecharge = require('role.recharger');
var roleRepair = require('role.repair');
var roleTanker = require('role.tanker');
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.behavior');
 * mod.thing == 'a thing'; // true
 */
const creepTypes = {
    'COLLECT':'collector',
    'RECHARGE': 'recharger',
    'BUILD': 'builder',
    'UPGRADE': 'upgrader',
    'TANK': 'tanker'
    };
    
var creepBehavior = {
    run: function() {
        
        var tower = Game.getObjectById('583b5efc3ae26bf86d6f6f0b');
        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.hits < 250000
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
    
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }
        
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            
            if(creep.memory.role) {
                if(creep.memory.role == creepTypes.COLLECT) {
                    roleCollector.run(creep);
                } else if(creep.memory.role == creepTypes.RECHARGE) {
                    roleRecharge.run(creep);
                } else if(creep.memory.role == creepTypes.BUILD) {
                   roleBuilder.run(creep);
                } else if(creep.memory.role == creepTypes.UPGRADE) {
                    roleUpgrader.run(creep);
                } else if(creep.memory.role == creepTypes.TANK) {
                    roleTanker.run(creep);
                }
            }
        }
    },
    TYPES : function() { return creepTypes }
}
module.exports = creepBehavior;