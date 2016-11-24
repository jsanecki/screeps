var orderWorkers = {
 
    buildWorker: function() {
        var newName = Game.spawns['Mojotanus'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {});
        //console.log('Spawning new heavy (250) harvester: ' + newName);
    },
    calcAvaliableEnergy: function() {
        var spawners = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN);
            }
        });
        
        return 0;
    }
}

module.exports = orderWorkers