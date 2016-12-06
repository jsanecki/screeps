let collector = require('role.collector');
let rally = require('runner.rally');
let returnHome = require('runner.return');
let recharge = require('role.recharger');

const Roles = {
    'COLLECT':'collector',
    'RECHARGE': 'recharger',
    'RALLY': 'rally',
    'RETURN': 'return'
    };

let dispatcher = {
    
    run: function() {
         let runner = _.filter(Game.creeps, (creep) => creep.memory.classifier == 'runner');
         for(var name in runner) {
            let creep = runner[name];
            
            switch (creep.memory.role) {
                case Roles.COLLECT:
                    collector.run(creep);
                    break;
                case Roles.RETURN:
                    returnHome.run(creep);
                    break;
                case Roles.RALLY:
                    rally.run(creep);
                    break;
                case Roles.RECHARGE: 
                    recharge.run(creep);
                    break;
                default:
                    console.log(`${creep.name} failed to be dispatched`)
            }
        }

    }
}

module.exports = dispatcher;