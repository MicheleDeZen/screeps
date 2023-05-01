module.exports = {

    tick: function(){
         // Spawns desired creeps
         var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
         //console.log('Harvesters: ' + harvesters.length);
     
         if(harvesters.length < 2) {
             var newHName = 'Harvester' + Game.time;
             console.log('Spawning new harvester: ' + newHName);
             Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newHName, 
                 {memory: {role: 'harvester'}});        
         }
     
         var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
         if(upgraders.length < 1) {
             var newUpName = 'Upgrader' + Game.time;
             console.log('Spawning new upgrader: ' + newUpName);
             Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newUpName, 
                 {memory: {role: 'upgrader'}});        
         }

         var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
         if(builders.length < 1) {
             var newBuildName = 'Builder' + Game.time;
             console.log('Spawning new builder: ' + newBuildName);
             Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newBuildName, 
                 {memory: {role: 'builder'}});        
         }

         if(Game.spawns['Spawn1'].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1, 
                Game.spawns['Spawn1'].pos.y, 
                {align: 'left', opacity: 0.8});
        }
    }

};