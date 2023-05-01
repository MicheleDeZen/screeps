module.exports = {
    blocked: false,
    levels: [
        {
            harvesterCount: 2,
            workerCount: 2,
            soldierCount: 0,
            worker: [WORK, CARRY, MOVE],
            soldier: [ATTACK, MOVE]
        },
        {
            harvesterCount: 2,
            workerCount: 4,
            soldierCount: 0,
            worker: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
            soldier: [ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE]
        },
        {
            harvesterCount: 2,
            workerCount: 4,
            soldierCount: 0,
            worker: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
            soldier: [ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        }
    ],
    
    tick: function() {
        if(this.blocked) {
            console.log("Spawner blocked")
            return
        }
        let level = this.getLevel();
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
        
        var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });
        var extensionConstructionSites = Game.spawns.Spawn1.room.find(FIND_CONSTRUCTION_SITES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });
        var numExtensions = extensions.length + extensionConstructionSites.length
        
        console.log


        if(harvesters.length < level.harvesterCount) {
            console.log('spawn harvester')
            var newHarvesterName = 'Harvester' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(level.worker, newHarvesterName, {memory: {role: 'harvester'}})
        }
        if(workers.length < level.workerCount) {
            var newWorkerName = 'Worker' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(level.worker, newWorkerName, {memory: {role: 'worker'}})
        } 
        if (soldiers.length < level.soldierCount) {
            var newSoldierName = 'Soldier' + Game.time;
            Game.spawns['Spawn1'].spawnCreep(level.soldier, newSoldierName, {memory: {role: 'soldier', target: Game.spawns['Spawn1'].room.name}})
        }
    },
    
    getLevel: function(){
        let max = Game.spawns.Spawn1.room.energyCapacityAvailable;
        if (max < (300 + 5 * 50)) {
            //console.log('0')
            return this.levels[0]
        } else if (max < (300 + 10*50)) {
            //console.log('1')
            return this.levels[1]
        } else if (max < (300 + 20*50)) {
            //console.log('2')
            return this.levels[2]
        } else {
            console.log("Update designs!")
            return this.levels[2]
        }
    }

};