let roleCollector = require('role.collector');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleRecharge = require('role.recharger');
//let roleRepair = require('role.repair');
let rolePivotCollector = require('worker.role.pivot_collector');
let roleRenew = require('role.renew');
let C = require('role.constants');

/*
 * Creep Design
 * Creeps will have a Classifer that will sets what behaviors can be dispatched to them
 * Classifer types include - Worker, Solider, Specialist, Scout, Invader
 *
 * Role is the current behavior that the creep is performing
 *
 * Generation is the size of the creep based on it limbs, this only for creeps that build based on energy avaliable
 */
var creepBehavior = {
    run: function() {
        let towers = [];
        towers.push(Game.getObjectById('5b1211ae3687ff15c7f90a6e'));
        towers.push(Game.getObjectById('5b18d99396c64057ad0539b6'));

        _.forEach(towers, function(tower) {
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
        });

        let creeps = _.filter(Game.creeps, (creep) => (creep.memory.classifier === C.CLASSIFIER.WORKER || creep.memory.classifier === C.CLASSIFIER.SPECIALIST));
        for(var name in creeps) {
            var creep = creeps[name];

            switch (creep.memory.role) {
                case C.COLLECT:
                    roleCollector.run(creep);
                    break;
                case C.RECHARGE:
                    roleRecharge.run(creep);
                    break;
                case C.BUILD:
                   roleBuilder.run(creep);
                   break;
                case C.UPGRADE:
                    roleUpgrader.run(creep);
                    break;
                case C.PIVOT_COLLECT:
                    rolePivotCollector.run(creep);
                    break;
                case C.RENEW:
                    roleRenew.run(creep);
                    break;
                default:
                    console.log(`${creep.name} has unknown role of ${creep.memory.role}`);
            }
        }
    }
}
module.exports = creepBehavior;
