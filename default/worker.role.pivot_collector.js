/**
 * Pivot Collector sit in one location and load up containers
 **/
var rolePivotCollector = {
    /** @param {Creep} creep **/
    run: function(creep) {

        // if it needs to renew, swap it out
        if(creep.ticksToLive < C.CREEP_RENEW_AT) {
            delete creep.memory.role;
            delete creep.memory.mode;
            return;
        }

        if(creep.carry.energy == 0) {
            creep.say('recharging');
            creep.memory.mode = 'recharge';
        }

        if(creep.memory.mode == 'recharge') {
            var sources = creep.room.find(FIND_SOURCES);

            if(creep.harvest(sources[creep.memory.sourceIndex]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.sourceIndex]);
            }
        } else {
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) &&
                    (structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
                }
            });
            if(containers.length > 0) {
                if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
                }
            }
        }
    }
};

module.exports = rolePivotCollector;
