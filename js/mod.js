let modInfo = {
	name: "Shenanigans Tree.",
	id: "olegat",
	author: "Oleg (Holy Broly#0530)",
	pointsName: "plots",
	discordName: "",
	discordLink: "",
	changelogLink: "https://github.com/Acamaeda/The-Modding-Tree/blob/master/changelog.md",
    offlineLimit: 8760,  // In hours
    initialStartPoints: new Decimal (0) // Used for hard resets and new players
}

// Set your version in num and name
let VERSION = {
	num: "0.35.002--",
	name: "The Lazy Update.",
}

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) {
		if (isStuck()) {
			return new Decimal(0.1);
		}
		return new Decimal(0)
	}

	let gain = new Decimal(0.01666666666666666666666666666667)
	if(player.ab.points >= 2) gain = gain.div(60)
	let Adapter = new Decimal(1).div(3).mul(new Decimal(3).add(player.ab.points))
	let Adapter2 = new Decimal(30).add(new Decimal(10).times(player.ab.points))
	if(player.s.buyables[21] <= -1) gain = gain.div(new Decimal(2).pow(new Decimal(player.s.buyables[21]).mul(-1)))
		else gain = gain.mul(new Decimal(2).pow(player.s.buyables[21]));
        let hahaSoftcapGoBrrrrrrrr = new Decimal(1024).mul(Adapter)
		if(player.s.buyables[21] <= -1) hahaSoftcapGoBrrrrrrrr = hahaSoftcapGoBrrrrrrrr.mul(new Decimal(player.s.buyables[21]).mul(-1).add(1))
		else hahaSoftcapGoBrrrrrrrr = hahaSoftcapGoBrrrrrrrr.div(player.s.buyables[21].add(1))
		if(player.c.chaoticEnergy < 0) hahaSoftcapGoBrrrrrrrr.div(0.01)
	    else hahaSoftcapGoBrrrrrrrr.div(new Decimal(1).add(player.c.chaoticEnergy.div(10)).root(10))
        gain = gain.mul(new Decimal(6).pow(bingoSystem()))
        if (inChallenge("s", 12)) {
            if (player.s.buyables[11] > 900 && !hasAchievement("a", 22)) gain = gain.div(new Decimal(10).add(buyableEffect("s", 11).sub(10)))
            else gain = gain.div(new Decimal(10))
	}
        else gain = gain.mul(buyableEffect("s", 11))
        if (hasUpgrade("s", 11)) gain = gain.times(new Decimal(60));
        if (hasUpgrade("s", 12)) gain = gain.times(upgradeEffect("s", 12));
        if (hasUpgrade("s", 13) && player.s.buyables[51].eq(2) && inChallenge("s", 21)) gain = gain.tetrate(upgradeEffect("s", 13));
        else if (hasUpgrade("s", 13) && player.s.buyables[51].eq(1) && inChallenge("s", 21)) gain = gain.pow(upgradeEffect("s", 13));
        else if (hasUpgrade("s", 13)) gain = gain.times(upgradeEffect("s", 13));
		if (hasUpgrade("s", 22) && player.ab.points >=2) gain = gain.mul(layers.diff.effect())
		if (hasUpgrade("c", 21) && player.c.points < 0) gain = gain.mul(0.01)
		else if (hasUpgrade("c", 21)) gain = gain.mul(new Decimal(1).add(player.c.chaoticEnergy.div(10)).root(10))
		if (hasUpgrade("n", 11)) gain = gain.mul(upgradeEffect("n", 11))
		if (hasUpgrade("n", 23)) {
			if(!player.s.activeChallenge == null) gain = gain.mul(player.k.experiences.log(10))
		}
        if (inChallenge("s", 11)) gain = gain.tetrate(new Decimal(0.5));
        if (inChallenge("s", 21)) gain = gain.tetrate(new Decimal(0.000000000000000000000000000000000001)).pow(buyableEffect("s", 12))
        if (inChallenge("s", 21)) {
        for (var i = 2; i < Adapter2; i++) {		
        if (gain.gt(new Decimal(i))) gain = new Decimal(i-1).add(gain.log(new Decimal(2).pow(hahaSoftcapGoBrrrrrrrr)).root(new Decimal(i).pow(i).mul(1024).div(new Decimal(2).pow(new Decimal(i).sub(2))).mul(Adapter).div(layers.t.effect())).max(1))
		}
        if (hasMilestone("c", 2)) gain = gain.add(0.5)
        if (gain.gte(new Decimal(30).mul(Adapter))) gain = new Decimal(30).mul(Adapter)
		}
	return gain
}

function rowReset(row, layer) {
	for (lr in ROW_LAYERS[row]) {
		if (layers[lr].doReset) {
			player[lr].active = null // Exit challenges on any row reset on an equal or higher row
			layers[lr].doReset(layer)
		}
		else
			if (layers[layer].row > layers[lr].row) fullLayerReset(lr)
	}
}

function bingoSystem() {
    let bingoPungo = 0
	if(hasAchievement("a", 11) && hasAchievement("a", 12) && hasAchievement("a", 13) && hasAchievement("a", 14) && hasAchievement("a", 15) && hasAchievement("a", 16)) bingoPungo = bingoPungo + 1
	if(hasAchievement("a", 21) && hasAchievement("a", 22) && hasAchievement("a", 23) && hasAchievement("a", 24) && hasAchievement("a", 25) && hasAchievement("a", 26)) bingoPungo = bingoPungo + 1
	if(hasAchievement("a", 31) && hasAchievement("a", 32) && hasAchievement("a", 33) && hasAchievement("a", 34) && hasAchievement("a", 35) && hasAchievement("a", 36)) bingoPungo = bingoPungo + 1
	if(hasAchievement("a", 41) && hasAchievement("a", 42) && hasAchievement("a", 43) && hasAchievement("a", 44) && hasAchievement("a", 45) && hasAchievement("a", 46)) bingoPungo = bingoPungo + 1
	if(hasAchievement("a", 51) && hasAchievement("a", 52) && hasAchievement("a", 53) && hasAchievement("a", 54) && hasAchievement("a", 55) && hasAchievement("a", 56)) bingoPungo = bingoPungo + 1
	return bingoPungo
}

function challengesCompleted() {
	let help = new Decimal(challengeCompletions("diff", 11) + challengeCompletions("diff", 12)  + challengeCompletions("diff", 21)  + challengeCompletions("diff", 22)  + challengeCompletions("diff", 31))
	return help
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.c.points == 13
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600000) // Default is 1 hour which is just arbitrarily large
}
