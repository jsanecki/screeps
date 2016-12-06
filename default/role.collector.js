let roleCollector = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //TODO make a function to calculate slots for draining energy
        let sourceSlots = [1];
        let sources = creep.room.find(FIND_SOURCES);
 
        if(creep.memory.sourceIndex == undefined ) {
            if(sources.length === 1) {
                creep.memory.sourceIndex = 0;
            } else {
                creep.memory.sourceIndex = sourceSlots[Math.floor(Math.random() * sourceSlots.length)];
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