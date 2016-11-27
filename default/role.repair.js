var roleRepairer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(STRUCTURE_ROAD);
        if(targets.length) {
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            creep.say(`Done`);
            delete creep.memory.role;
        }
        
        if(creep.carry.energy == 0) {
            creep.say(`Empty`);
            delete creep.memory.role;
        }
	}
};

module.exports = roleRepairer;
