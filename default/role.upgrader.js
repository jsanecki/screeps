var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {


	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            delete creep.memory.upgrading;
            delete creep.memory.role;
        }
        
        if(creep.carry.energy == 0) {
            delete creep.memory.upgrading;
            delete creep.memory.role;
	    }
	}
};

module.exports = roleUpgrader;
