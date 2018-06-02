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
        return {};
    },
    /** Assigns a source in the world based on avaliablity
    * @return {SourceId}
    */
    assignSource: function() {
        return 0;
    },
    /** Update World View */
    update: function() {
        console.log("Planner[World]: Updating view of World")
        let memory = { "status": "active" }

        memory.soruces = this.sourcePlanning();

        // Create a Memory structure for world planning
        Memory.world = memory;
    }
}

module.exports = worldPlanner;
