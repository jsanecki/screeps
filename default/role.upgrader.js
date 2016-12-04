var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
        
        if(creep.carry.energy == 0) {
            this.reset(creep);
	    }
	},
	reset: function(creep) {
	    delete creep.memory.upgrading;
        delete creep.memory.role;
	}
};

module.exports = roleUpgrader;
