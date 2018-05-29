/**
 * role.collector
 * 
 * creep role for collecting energy from nodes. If the the creep doesn't have a
 * node to focus on, then a node will be selected and set to it's memory.
 * 
 * This role will also handle collecting energy and storing it.
 * 
 * TODO make a function to calculate slots for draining energy for each source
**/
let roleCollector = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        let sources = creep.room.find(FIND_SOURCES);
        let sourceCount = sources.length;
        
        if(creep.memory.sourceIndex == undefined ) {
            if(sources.length === 1) {
                creep.memory.sourceIndex = 0;
            } else {
                creep.memory.sourceIndex = Math.floor(Math.random() * sourceCount);
            }
        }

        if(sources[creep.memory.sourceIndex].energy == 0) {
            let storage = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_STORAGE
                }
            });
            
            if(creep.withdraw(storage[0], RESOURCE_ENERGY, creep.energyCapacity) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage[0]);
            }
        } else { 
            if(creep.harvest(sources[creep.memory.sourceIndex]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.sourceIndex]);
            } else {
                creep.say(creep.carry.energy + '/' + creep.carryCapacity);
            }
        } 
    
        if(creep.carry.energy == creep.carryCapacity) {
            delete creep.memory.role;
            delete creep.memory.sourceIndex;
        }
	}
};

module.exports = roleCollector;