var roleRenew = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var spawn = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_SPAWN;
            }
        });

        status = spawn[0].renewCreep(creep);
        if(status == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn[0]);
        } else if (status == ERR_FULL) {
            this.reset(creep);
        }
    },
    reset: function(creep) {
        delete creep.memory.role;
    }
};

module.exports = roleRenew;
