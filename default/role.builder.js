var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.say("Moving to Site");
                creep.moveTo(targets[0]);
            }
        } else {
            delete creep.memory.role;
        }
        
        if(creep.carry.energy == 0) {
            delete creep.memory.role;
        }
	}
};

module.exports = roleBuilder;
