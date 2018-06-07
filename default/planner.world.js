/**
* @module planner.world
* Logging Planner[World]
*
* World Planner is a strategic view of the world. Planning is at a multiple
* room view. The world planner will not have an up to the tick view and status.
* Module updates will have a more periodic look, as the world doesn't change
* that much. To save cpu costs, this module only needs to be updated once in a
* while. Decisions drive off the analytics about the world provided by this module.
*/
var worldPlanner = {

    /** Plans out avaliablity of sources in the area
    * @return {Sources}
    */
    sourcePlanning: function() {
        Memory.world.sources = {};
    },
    /** Assigns a source in the world based on avaliablity
    * @return {SourceId}
    */
    assignSource: function() {
        return 0;
    },
    /** Detects Pivot Load Points Flags, so that creeps can be assigned to it to
     * load enegry into a container.
    */
    detectPivots: function() {
        if(!Memory.world.pivots) {
          Memory.world.pivots = {};
        }

        let flags = _.filter(Game.flags, (flag) => flag.name.indexOf('pivot') >= 0).map((flag) => flag.name);
        _.forEach(flags, function(flag) {
            if(!Memory.world.pivots[flag]) {
              Memory.world.pivots[flag] = {
                'creep': null
              };
            }
        });
        _.forEach(Object.keys(Memory.world.pivots), function(flag) {
            if(_.indexOf(flags, flag) == -1) {
                delete Memory.world.pivots[flag];
            }
        });
        
    },
    /** Update World View */
    update: function() {
        console.log("Planner[World]: Updating view of World")
        if(!Memory.world) {
          Memory.world = { "status": "active" };
        }

        this.sourcePlanning();
        this.detectPivots();


    }
}

module.exports = worldPlanner;
