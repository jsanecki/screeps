var roleRenew = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var spawn = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_SPAWN;
            }
        });
        
        if(spawn[0].renewCreep(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn[0]);
        }
        
        if(creep.ticksToLive > 1000) {
            this.reset(creep);
        }
    },
    reset: function(creep) {
        delete creep.memory.role;
    }
};

module.exports = roleRenew;