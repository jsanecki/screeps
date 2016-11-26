var roleCollector = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        //TODO make a function to calculate slots for draining energy
        var sourceSlots = [0,0,0,1];
        var sources = creep.room.find(FIND_SOURCES);
        
        if(creep.memory.sourceIndex == undefined ) {
            creep.memory.sourceIndex = sourceSlots[Math.floor(Math.random() * 4)];
        }
        
        if(creep.harvest(sources[creep.memory.sourceIndex]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[creep.memory.sourceIndex]);
            //creep.say(`seeking ${creep.memory.sourceIndex}`);
        } else {
            creep.say(creep.carry.energy + '/' + creep.carryCapacity);
        }
        
        if(creep.carry.energy == creep.carryCapacity) {
            delete creep.memory.role;
            delete creep.memory.sourceIndex;
        }
	}
};

module.exports = roleCollector;