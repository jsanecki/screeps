let denfender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let flags = [];
        for(flag in Game.flags) {
            if(flag.includes('Gate')) {
                flags.push(Game.flags[flag]);
            }
        }
        
        creep.moveTo(flags[0]);
	},
	reset: function(creep) {
	    delete creep.memory.role;
	}
};

module.exports = defender;