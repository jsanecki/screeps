const Roles = {
    'COLLECT':'collector',
    'RECHARGE': 'recharger'
    };

var dispatcher = {
    
    run: function() {
         var invaders = _.filter(Game.creeps, (creep) => creep.memory.classifer == 'invader');
         for(var name in invaders) {
            var creep = Game.creeps[name];
            
            switch (creep.memory.role) {
                default:
                    console.log('default');
            }
        }
    }
}

module.exports = dispatcher;