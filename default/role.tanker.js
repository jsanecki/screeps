/**
 * Tankers are slow, large energy movers, that load up containers and towers only
 **/
var roleTanker = {
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.carry.energy == 0 && creep.memory.mode != 'recharge') {
            creep.say('recharging');
            creep.memory.mode = 'recharge';
        }
        
        if(creep.carry.energy == creep.carryCapacity) {
            delete creep.memory.mode;
        }

        if(creep.memory.mode == 'recharge') {
            var sourceSlots = [0];
            var sources = creep.room.find(FIND_SOURCES);
            
            if(creep.memory.sourceIndex == undefined ) {
                creep.memory.sourceIndex = sourceSlots[Math.floor(Math.random() * sourceSlots.length)];
            }
            
            if(creep.harvest(sources[creep.memory.sourceIndex]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.sourceIndex]);
            } else {
                creep.say(creep.carry.energy + '/' + creep.carryCapacity);
            }
        } else {
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) &&
                    //structure.structureType == STRUCTURE_CONTAINER) &&
                    (structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
                }
            });
            console.log(`Tanker looking at ${containers.length} Containers`);
            if(containers.length > 0) {
                if(creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
                }
            }
        }
    }
};

module.exports = roleTanker;