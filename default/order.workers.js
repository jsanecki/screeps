var orderWorkers = {
 
    buildCreep: function() {
        if(Object.keys(Game.creeps).length < 8) {
            var name = this.collector();
            if(name != ERR_NOT_ENOUGH_ENERGY){
                console.log(`Creating Creep ${name}`);
            }
        }
    },
    collector: function() {
        return Game.spawns['Mojotanus'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, { 'function': 'worker'});
    },
    basic: function() {
        return Game.spawns['Mojotanus'].createCreep([WORK,CARRY,MOVE,MOVE], undefined, { 'function': 'worker'});
    }
}

module.exports = orderWorkers