var dispatcher = {
    
    run: function() {
        let runner = _.filter(Game.creeps, (creep) => creep.memory.classifier == 'runner');
        for(var name in runner) {
            let creep = runner[name];

            if(!creep.memory.role) {
                if(!creep.memory.expansion) {
                   creep.memory.role = 'rally';
                } else if(creep.memory.expansion && creep.carryCapacity == 0) {
                    creep.memory.role = 'collector';
                } else if(creep.memory.expansion && creep.carryCapacity > 0) {
                    creep.memory.role = 'return';
                } else if(!creep.memory.expansion && creep.carryCapacity > 0) {
                    creep.memory.role = 'recharger'
                } else {
                    creep.memory.role = 'rally';
                }
            }
        }
    }
}

module.exports = dispatcher;