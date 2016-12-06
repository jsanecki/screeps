let runnerRally = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let flags = [];
        for(flag in Game.flags) {
            if(flag.includes('Expansion')) {
                flags.push(Game.flags[flag]);
            }
        }
        
        creep.moveTo(flags[0]);

        if(creep.room.name == flags[0].pos.roomName) {
            creep.say('reached room');
            creep.memory.expansion = true;
            this.reset(creep);
        }

	},
	reset: function(creep) {
	    delete creep.memory.role;
	}
};

module.exports = runnerRally;