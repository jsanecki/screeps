var roleRepairer = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        
        if(closestDamagedStructure) {
            if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestDamagedStructure);
            }
        } else {
            creep.say(`Done`);
            this.unset(creep);
        }
        
        if(creep.carry.energy == 0) {
            creep.say(`Empty`);
            this.unset(creep);
        }
	},
	set: function(creep) {
	    creep.memory.role = 'recharger'
	},
	unset: function(creep) {
	    delete creep.memory.role;
	}
};

module.exports = roleRepairer;
