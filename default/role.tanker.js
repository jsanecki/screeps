/**
 * Tankers are slow, large energy movers, that load up containers and towers only
 **/
var roleTanker = {
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.energyAvailable == 0) {
            creep.memory.mode = 'recharge';
        }
        
        if(creep.energyAvailable == creep.energyCapacityAvailable) {
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
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_TOWER) && 
                            structure.energy < structure.energyCapacity;
                }
            });
            
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                } 
            }
        }
    }
};

module.exports = roleTanker;