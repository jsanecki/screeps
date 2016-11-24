var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        
        if(creep.memory.sourceIndex == undefined ) {
            creep.memory.sourceIndex = Math.floor(Math.random() * 2);
        }
        
        if(creep.harvest(sources[creep.memory.sourceIndex]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[creep.memory.sourceIndex]);
            creep.say(`seeking ${creep.memory.sourceIndex}`);
        } else {
            creep.say(creep.carry.energy + '/' + creep.carryCapacity);
        }
        
        if(creep.carry.energy == creep.carryCapacity) {
            delete creep.memory.role;
            delete creep.memory.sourceIndex;
        }
	}
};

module.exports = roleHarvester;