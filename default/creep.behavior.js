var roleCollector = require('role.collector');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRecharge = require('role.recharger');
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.behavior');
 * mod.thing == 'a thing'; // true
 */
const creepTypes = {
    "COLLECT":"collector",
    "RECHARGE": "recharger",
    "BUILD": "builder",
    "UPGRADE": "upgrader"
    };
    
var creepBehavior = {
    run: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            
            if(creep.memory.role) {
                if(creep.memory.role == creepTypes.COLLECT) {
                    roleCollector.run(creep);
                }
                if(creep.memory.role == creepTypes.RECHARGE) {
                    roleRecharge.run(creep);
                }
                if(creep.memory.role == creepTypes.BUILD) {
                   roleBuilder.run(creep);
                }
                if(creep.memory.role == creepTypes.UPGRADE) {
                    roleUpgrader.run(creep);
                }
            }
        }
    },
    TYPES : function() { return creepTypes }
}
module.exports = creepBehavior;