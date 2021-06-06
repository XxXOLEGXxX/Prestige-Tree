addLayer("s", {
        startData() { return {
            unlocked: true,
            points: new Decimal(0),
            upgradeTime: new Decimal(0),
			bigBrainBoredom: new Decimal(0),
			bigBoi: new Decimal(1),
			lel: new Decimal(0),
			lel: new Decimal(0)
	    };},

        name: "Shenanigans",
        color: "#791C29",
        resource: "shenanigans",
        row: 0,
		position: 1,
        resetDescription: "Obliterate your plots for ",
        baseResource: "plots",
        baseAmount() {return player.points},
        requires() { let require = new Decimal(1)
		             if (inChallenge("s", 11) || inChallenge("s", 12) || inChallenge("s", 21)) require = new Decimal(Infinity)
                     else require = new Decimal(1)
					 if (player.ab.points >= 1) require = require.mul(2)
		             if (player.s.buyables[21] >= 1) require = require.div(new Decimal(2).pow(player.s.buyables[21]).root(2));
                     else if (player.s.buyables[21] <= -1) require = require.div(new Decimal(0.70710678118654752440084436210485).pow(new Decimal(player.s.buyables[21]).mul(-1)).root(2))
					 return require
                   },
        type: "normal",
        exponent: 0.5,

        gainMult() {
            let mult = new Decimal(1)
			mult = mult.mul(new Decimal(6).pow(bingoSystem()))
			if (player.c.unlocked) mult = mult.mul(layers.c.effect())
		    if (hasUpgrade("s", 33)) mult = mult.mul(upgradeEffect("s", 33));
			if (hasChallenge("s", 11) && hasAchievement("a", 16) && !inChallenge("diff", 22)) mult = mult.mul(5)
            else if (hasChallenge("s", 11) && !inChallenge("diff", 22)) mult = mult.mul(3)
            if(inChallenge("diff", 22)) mult = mult.mul(new Decimal(1.5).mul(new Decimal(challengeCompletions("diff", 22)).add(1).min(5)).log(1.5).add(1).pow(3))
            else if (hasUpgrade("s", 34)) mult = mult.mul(buyableEffect("s", 11).sub(1).div(10).add(1))
            if (inChallenge("s", 11) || inChallenge("s", 12) || inChallenge("s", 21)) mult = new Decimal(0)
            return mult;
        },
        gainExp() {
            return new Decimal(1);
        },

        update(diff) {
        if(hasUpgrade(this.layer, 13) && upgradeEffect(this.layer, 13).gt(1) && player.ab.points >= 1 && hasAchievement("a", 15)) player[this.layer].upgradeTime = player[this.layer].upgradeTime.add(new Decimal(diff).mul(2).mul(layers.diff.effect()))
        else if(hasUpgrade(this.layer, 13) && upgradeEffect(this.layer, 13).gt(1) && player.ab.points >= 1) player[this.layer].upgradeTime = player[this.layer].upgradeTime.add(new Decimal(diff).mul(4).mul(layers.diff.effect()))
        else if(hasUpgrade(this.layer, 13) && upgradeEffect(this.layer, 13).gt(1)) player[this.layer].upgradeTime = player[this.layer].upgradeTime.add(new Decimal(diff).mul(layers.diff.effect()))
        if(player[this.layer].upgradeTime.gt(60)) player[this.layer].upgradeTime = new Decimal(60)
        if(hasChallenge(this.layer, 12) && hasAchievement("a", 16)  && !inChallenge("diff", 22)) player.s.buyables[11] = player.s.buyables[11].add(new Decimal(diff).mul(15).mul(layers.diff.effect()))
        else if(hasChallenge(this.layer, 12)  && !inChallenge("diff", 22)) player.s.buyables[11] = player.s.buyables[11].add(new Decimal(diff).mul(10).mul(layers.diff.effect()))
		if(hasAchievement("a", 21) && hasAchievement("a", 16) && hasChallenge("s", 11) && !inChallenge("diff", 22)) player.s.points = player.s.points.add(new Decimal(getPointGen().mag).mul(new Decimal(diff).mul(layers.diff.effect())).mul(5))
		else if(hasAchievement("a", 21) && hasChallenge("s", 11) && !inChallenge("diff", 22)) player.s.points = player.s.points.add(new Decimal(getPointGen().mag).mul(new Decimal(diff).mul(layers.diff.effect())).mul(3))
		else if(hasAchievement("a", 21)) player.s.points = player.s.points.add(new Decimal(getPointGen().mag).mul(new Decimal(diff).mul(layers.diff.effect())))
		if(inChallenge("diff", 12)) { player.s.buyables[11] = player.s.buyables[11].add(new Decimal(diff).mul(layers.diff.effect().pow(challengeCompletions("diff", 12) + 1)))
		                              player.s.bigBrainBoredom = player.s.bigBrainBoredom.add(new Decimal(diff).mul(layers.diff.effect().pow(challengeCompletions("diff", 12) + 1))) }
		else { player.s.buyables[11] = player.s.buyables[11].sub(player.s.bigBrainBoredom)
		       player.s.bigBrainBoredom = new Decimal(0) }
	    if(inChallenge("diff", 21)) { player.s.lel = challengeCompletions("diff", 21)
		                              if (player.s.bigBoi == 1) {player.s.buyables[21] = new Decimal(player.s.buyables[21]).sub(new Decimal(5).mul(new Decimal(challengeCompletions("diff", 21)).add(1).min(5)))
									                             player.s.bigBoi = player.s.bigBoi.sub(1)}
									  if (player.s.bigBoi == 0) {player.s.bigBoi = player.s.bigBoi}
		}
		else {if(player.s.bigBoi == 0) player.s.buyables[21] = new Decimal(player.s.buyables[21]).add(new Decimal(5).mul(new Decimal(challengeCompletions("diff", 21)).add(1).min(5)))
			  if(player.s.lel < challengeCompletions("diff", 21) && challengeCompletions("diff", 21) < 5 && player.s.lel2 == new Decimal(0)) { player.s.buyables[21] = new Decimal(player.s.buyables[21]).sub(5)
			                                                        player.s.lel = challengeCompletions("diff", 21) }
		      player.s.bigBoi = new Decimal(1)}			  
	},

        layerShown() {return true;},

        tabFormat: {
            "Shenanigans": {
                buttonStyle() {return  {'color': 'white'};},
                content:
                    ["main-display",
                    "prestige-button",
                    ["blank", "5px"], // Height
                    "upgrades", "clickables", "challenges"],
        },
            "Impatience": {
                buttonStyle() {return  {'border-color': 'red', 'color': 'red'};},
                content:
                    [
                    ["display-text",
                    function() {
                                let absolutecost = new Decimal(100)
                                let absoluteoof
                                if (player.s.buyables[21] >= 1) { for (absoluteoof = 0; absoluteoof < player.s.buyables[21]; absoluteoof++) {
                                absolutecost = absolutecost.sub(absolutecost.div(10))
                                }
								}
								let antiabsolutecost = new Decimal(0)
								let antiabsoluteoof
								if (player.s.buyables[21] <= -1) { for (antiabsoluteoof = 0; antiabsoluteoof > player.s.buyables[21]; antiabsoluteoof--) {
                                antiabsolutecost = antiabsolutecost.add(new Decimal(10).mul(new Decimal(1.1).pow(player.s.buyables[21].mul(-1).sub(1))))
                                }
								}
                                if (player.s.buyables[21] >= 0) return player.s.buyables[21] >= 1 ? "You have " + formatWhole(player.s.buyables[21]) + " softcap warpers, lowering the Impatience upgrades's costs by " + format(new Decimal(100).sub(absolutecost)) + "%, increasing plot gain by " + formatWhole(new Decimal(2).pow(player.s.buyables[21])) + "x, dividing shenanigans's requirement by " + format(new Decimal(2).pow(player.s.buyables[21]).root(2)) + "/ and weakening softcaps's tetration by " + format(player.s.buyables[21].add(1).mul(new Decimal(1).add(player.c.chaoticEnergy.div(10)).root(10))) + "/." : ""
								else return player.s.buyables[21] <= -1 ? "You have " + formatWhole(player.s.buyables[21]) + " softcap warpers, increasing the Impatience upgrades's costs by " + format(antiabsolutecost) + "%, increasing plot gain by " + format(new Decimal(0.5).pow(new Decimal(player.s.buyables[21]).mul(-1))) + "x, dividing shenanigans's requirement by " + format(new Decimal(0.70710678118654752440084436210485).pow(new Decimal(player.s.buyables[21]).mul(-1)).root(2)) + "/ and strengthing softcaps's tetration by " + format(player.s.buyables[21].mul(-1).add(1).div(new Decimal(1).add(player.c.chaoticEnergy.div(10)).root(10))) + "x." : ""},
                    {"color": "dark purple", "font-size": "25px",}],
                    ["blank", "5px"],
                    ["display-text",
                    function() {let Adapter = new Decimal(1).div(3).mul(new Decimal(3).add(player.ab.points))
					            let Adapter2 = new Decimal(28).add(new Decimal(10).times(player.ab.points))
						        if (getPointGen().mag < new Decimal(Adapter2).add(2).add(0.5) && hasMilestone("c", 2)) return getPointGen().mag >= new Decimal(2) && inChallenge("s", 21) ? format(new Decimal(getPointGen().mag) - (new Decimal(1).add(0.5))) + " out of " + formatWhole(Adapter2) + " softcap levels are currently activated." : ""
                                else if (getPointGen().mag < new Decimal(Adapter2).add(2)) return getPointGen().mag >= new Decimal(2) && inChallenge("s", 21) ? format(new Decimal(getPointGen().mag) - (new Decimal(1))) + " out of " + formatWhole(Adapter2) + " softcap levels are currently activated." : ""
                                else return inChallenge("s", 21) ? formatWhole(Adapter2) + " out of " + formatWhole(Adapter2) + " softcap levels are currently activated." : ""},
                    {"color": "white", "font-size": "15px",}],
                    ["blank", "5px"],
                    ["display-text",
                    function() {let Adapter = new Decimal(1).div(3).mul(new Decimal(3).add(player.ab.points))
						        return getPointGen().mag >= new Decimal(30).mul(Adapter) && inChallenge("s", 21) ? "get hardcapped lmao." : ""},
                    {"color": "white", "font-size": "10px", "font-family": "Comic Sans MS",}],
                    ["blank", "5px"],
                    ["row", [["column", [["buyable", 11]]], ["blank", "14px"], ["column", [["buyable", 12]]]]], ["blank", "14px"], ["buyable", 21], ["blank", "14px"], ["buyable", 31], ["blank", "14px"], ["buyable", 41], ["blank", "14px"], ["buyable", 51], ["blank", "14px"], ["buyable", 61], ["blank", "14px"], ["buyable", 71]],
        },
    },

    upgrades: {
        rows: 7,
        cols: 4,
        11: {
            title: "Every 60 seconds, a minute passes in real life.",
            description: "Boosts your plot gain by ALOT.",
            cost: new Decimal(1),
        },
        12: {
            title: "Vibing.",
            description: "Boosts your plot gain by unspent shenanigans.",
            cost() { if(player.ab.points >= 2) return new Decimal(10).pow(new Decimal(player.ab.points).root(2))
                     else return new Decimal(10) },
            unlocked(){ 
                let unlockable = true
                if (inChallenge("s", 21)) unlockable = false
                else unlockable = hasUpgrade(this.layer, 11);
                if (inChallenge("s", 21) && player[this.layer].buyables[61] >= 2 && hasUpgrade("s", 11)) unlockable = true
                return unlockable
            },
            effect() {
				let vibeCheck = new Decimal(1)
				if (hasAchievement("a", 12)) vibeCheck = player.s.points.root(2)
                let ret = player[this.layer].points.add(1).root(new Decimal(2).root(vibeCheck));
                if (hasUpgrade("s", 21)) ret = ret.pow(upgradeEffect("s", 21));
                if (hasUpgrade("s", 23)) ret = ret.pow(upgradeEffect("s", 23));
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31));
                if (inChallenge("s", 21) && player[this.layer].buyables[61] >= 2) ret = ret
                else if (inChallenge("s", 21)) ret = new Decimal(1);
                if (inChallenge("s", 21) && player[this.layer].buyables[71] >= 1 && player[this.layer].buyables[61] >= 2) ret = ret.mul(buyableEffect("s", 71));
				if (ret > 28672 && !inChallenge("s", 21) && hasUpgrade("n", 15)) ret = ret.log(1.01).add(27640.509040831862570450875580445)
				else if (ret > 2048 && !inChallenge("s", 21)) ret = ret.log(1.01).add(1281.7321141706762185344390997409)
                return ret;
            },
            effectDisplay() {
				if (this.effect() >= 2048) return format(this.effect()) + "x (Softcapped)"
                else return format(this.effect()) + "x";
            },
        },
        13: {
            title: "Degrading Upgrade.",
            description() {if(inChallenge("s", 21) && player[this.layer].buyables[51].eq(2)) return "Boosts your plot gain by ^^5 initally and decreases over time."
                    else if(inChallenge("s", 21) && player[this.layer].buyables[51].eq(1)) return "Boosts your plot gain by ^5 initally and decreases over time."
                    else return "Boosts your plot gain by 5x initally and decreases over time."
	    },
            cost() { if(player.ab.points >= 2) return new Decimal(1200).pow(new Decimal(player.ab.points).root(2))
                     else return new Decimal(1200) },
            unlocked(){ 
                if(inChallenge("s", 11) || inChallenge("diff", 22)) return false;
				else return hasUpgrade(this.layer, 22);                
            },
            effect () {
                let zatime = new Decimal(5)
                zatime = zatime.sub(player[this.layer].upgradeTime.div(15))
                if(inChallenge("s", 11)) zatime = new Decimal(1)
                if(hasMilestone("c", 5)) zatime = new Decimal(5)
                if(inChallenge("diff", 22)) return new Decimal (1)
				else return zatime
            },
            effectDisplay() {
                if(inChallenge("s", 21) && player[this.layer].buyables[51].eq(2)) return "^^" + format(this.effect());
                else if(inChallenge("s", 21) && player[this.layer].buyables[51].eq(1)) return "^" + format(this.effect());
                else return format(this.effect()) + "x";
            },
        },
        14: {
            title: "Negotiator.",
            description: "Unlocks a button, which resets \"Degrading Upgrade.\"'s effect.",
            cost() { if(player.ab.points >= 2) return new Decimal(1800).pow(new Decimal(player.ab.points).root(2))
                     else return new Decimal(1800) },
            unlocked(){ 
                if(inChallenge("s", 11) || inChallenge("diff", 22)) return false;
                else return hasUpgrade(this.layer, 13) && !hasMilestone("c", 5); 
            },
        },
        21: {
            title: "Tiny desk exponent.",
            description() {
                if (hasAchievement("a", 13)) return "Adds ^1.05 to \"Vibing.\" upgrade and boosts \"A.E...?\" by 1.05x."
			    else return "Adds ^1.05 to \"Vibing.\" upgrade."
			},
            cost() { if(player.ab.points >= 2) return new Decimal(20).pow(new Decimal(player.ab.points).root(2))
                     else return new Decimal(20) },
            unlocked(){ 
                return hasUpgrade(this.layer, 12);
            },
            effect() {
                let ret = new Decimal(1.05);
                if (hasUpgrade("s", 23)) ret = ret.pow(upgradeEffect("s", 23));
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31));
                if(inChallenge("s", 21) && player[this.layer].buyables[51] >= 1) ret = ret.pow(buyableEffect("s", 12));
                return ret;
            },
            effectDisplay() {
                return "^" + format(this.effect());
            },
        },
        22: {
            title: "Supreme Hexagonity.",
            description() {if(hasAchievement("a", 21)) return "Unlocks 3 more upgrades, 2 challenges, halves \"But enough grinding, have at you!\"'s root effect and diff's effect boosts point gain."
			               else return "Unlocks 3 more upgrades, 2 challenges and halves \"But enough grinding, have at you!\"'s root effect."},
            cost() { if(player.ab.points >= 2) return new Decimal(999).pow(new Decimal(player.ab.points).root(2))
                     else return new Decimal(999) },
            unlocked(){ 
                if(inChallenge("diff", 22)) return false;
                else return hasUpgrade(this.layer, 21);
            },
            style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#1a9cb2',
                    'border-color': '#00353F',
                    'height': '200px',
                    'width': '200px',
                    }
                    else if (!canAffordUpgrade(this.layer, this.id))  return {
                            'height': '200px',
                            'width':  '200px',
                        }
                    return {
                            'background-color': '#00353F', 
                            'border-color': '#1a9cb2',
                            'height': '200px',
                            'width':  '200px',
		        }
	          },
	    },
        23: {
            title: "Another exponent...?",
            description: "Adds another ^1.05 to both \"T.D.E.\" and \"Vibing.\" upgrades.",
            cost() { if(player.ab.points >= 2) return new Decimal(100).pow(new Decimal(player.ab.points).root(2))
                     else return new Decimal(100) },
            unlocked(){ 
                return hasUpgrade(this.layer, 21);
            },
            effect() {
                let ret = new Decimal(1.05);
                if (hasUpgrade("s", 21) && hasAchievement("a", 13)) ret = ret.mul(1.05);
                if (hasUpgrade("s", 31)) ret = ret.pow(upgradeEffect("s", 31));
                if (inChallenge("s", 21) && player[this.layer].buyables[51] >= 1) ret = ret.pow(buyableEffect("s", 12));
                return ret;
            },
            effectDisplay() {
                return "^" + format(this.effect());
            },
        },
        31: {
            title: "But enough grinding, have at you!",
            description: "Exponents most of upgrades around \"S.H.\" based on unspent points.",
            cost() { if(player.ab.points >= 2) return new Decimal(250).pow(new Decimal(player.ab.points).root(2))
                     else return new Decimal(250) },
            unlocked() { 
                let unlockable = true
                if (inChallenge("s", 21)) unlockable = false
                else unlockable = hasUpgrade(this.layer, 23);
                if (inChallenge("s", 21) && player[this.layer].buyables[61] >= 1 && hasUpgrade("s", 23)) unlockable = true
                return unlockable
            },
            effect() {
                let ret = {};
				if (hasAchievement("a", 14) && hasUpgrade("s", 22)) ret = player.points.add(1).root(16);
                else if (hasUpgrade("s", 22)) ret = player.points.add(1).root(32);
                else ret = player.points.add(1).root(64);
                if (hasUpgrade("s", 32)) ret = ret.pow(1.42).pow(1.42);
                if (inChallenge("s", 21) && player[this.layer].buyables[61] >= 1) ret = ret
                else if(inChallenge("s", 21)) ret = new Decimal(1);
                if (ret.gt(2)) ret = ret.log(84).add(1.8435622116579284502939499524034);
                if (ret.gt(3)) ret = ret.log(422).add(2.8853355548008346985287640482641);
                if (ret.gt(4)) ret = ret.log(35448).add(3.9338336244075997599970639650263);
                if (ret.gt(5)) ret = ret.log(new Decimal(422).pow(84)).add(4.9986349470809623178396281434317);
                if (ret.gt(6)) ret = ret.log(new Decimal(84).pow(422)).add(5.9996292943404216313988008292711);
                if (ret.gte(9000)) ret = new Decimal(8999.99);
                return ret;
            },
            effectDisplay() {
            if (this.effect().gte(9000)) return "^" + format(this.effect()) + " (Hardcapped)"
            else if (this.effect().gt(2)) return "^" + format(this.effect()) + " (Softcapped)";
            else return "^" + format(this.effect());
	    },
        },
        32: {
            title: "Tetrate-inator.",
            description: "Exponents the upgrade left to it by 1.420. Twice.",
            cost() { if(player.ab.points >= 2) return new Decimal(400).pow(new Decimal(player.ab.points).root(2))
                     else return new Decimal(400) },
            unlocked(){ 
                let unlockable = true
                if (inChallenge("s", 21)) unlockable = false
                else unlockable = hasUpgrade(this.layer, 31);
                if (inChallenge("s", 21) && player[this.layer].buyables[61] >= 1 && hasUpgrade("s", 23)) unlockable = true
                return unlockable
            },
            effectDisplay() {
                return "^1.42^1.42";
            },
        },
        33: {
            title: "haha shenanigans go brrrr.",
            description: "Boosts shenanigans gain by the passed time at reduced rate.",
            cost() { if(player.ab.points >= 2) return new Decimal(2500).pow(new Decimal(player.ab.points).root(2))
                     else return new Decimal(2500) },
            unlocked(){ 
                if(inChallenge("diff", 22)) return false;
                else return hasUpgrade(this.layer, 22);
            },
            effect() {
            let ret = new Decimal(1).mul((new Decimal(player.timePlayed)).max(1).log(60).add(1));
            if (inChallenge("s", 21) && player[this.layer].buyables[51] >= 1) ret = ret.pow(buyableEffect("s", 12));
            if(inChallenge("diff", 22)) return new Decimal(1);
            else return ret
            },
            effectDisplay() {
                return format(this.effect()) + "x";
            },
        },
        34: {
            title: "Ughh...",
            description: "\"Predicted boredom.\" now weakly boosts shenanigans gain too, apparently.",
            cost() { if(player.ab.points >= 2) return new Decimal(15000).pow(new Decimal(player.ab.points).root(2))
                     else return new Decimal(15000) },
            unlocked(){ 
                if(inChallenge("diff", 22)) return false;
                else return hasUpgrade(this.layer, 22);
            },
        },
    },
    buyables: {
        rows: 7,
        cols: 2,
        11: {
            title: "Predicted boredom.",
            unlocked() { return player[this.layer].unlocked; }, 
            canAfford() { return false; },
            buy() {
            if (hasChallenge("s", 12)) player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id]
            else player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
        },
            effect() {
            let eff = player[this.layer].buyables[this.id].mul(0.01).add(1)
            if (inChallenge("s", 11)) eff = eff.pow(2)
		    if (hasUpgrade("t", 31)) eff = eff.pow(3)
			if (inChallenge("diff", 12)) eff = eff.div(eff.pow(2))
            return eff;
        },
        display() { // Everything else displayed in the buyable button after the title
		    if (hasAchievement("a", 22)) {
                if (inChallenge("s", 12) && hasUpgrade("s", 34)) return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by 0.1x and shenanigans gain by " + format(buyableEffect(this.layer, this.id).sub(1).div(10).add(1)) + "x.";
	            else if (hasUpgrade("s", 34)) return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by " + format(buyableEffect(this.layer, this.id)) + "x and shenanigans gain by " + format(buyableEffect(this.layer, this.id).sub(1).div(10).add(1)) + "x.";
		        else if (inChallenge("s", 12)) return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by 0.1x.";
	            else return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by " + format(buyableEffect(this.layer, this.id)) + "x.";
			}
            else if (inChallenge("s", 12) && hasUpgrade("s", 34) && !inChallenge("diff", 22) && player.s.buyables[11] > 900) return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by " + format(new Decimal(1).div(new Decimal(10).add(buyableEffect("s", 11).sub(10)))) + "x and shenanigans gain by " + format(buyableEffect(this.layer, this.id).sub(1).div(10).add(1)) + "x.";
            else if (inChallenge("s", 12) && hasUpgrade("s", 34) && !inChallenge("diff", 22)) return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by 0.1x and shenanigans gain by " + format(buyableEffect(this.layer, this.id).sub(1).div(10).add(1)) + "x.";
            else if (inChallenge("s", 12) && player[this.layer].buyables[this.id] > 900) return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by " + format(new Decimal(1).div(new Decimal(10).add(buyableEffect("s", 11).sub(10)))) + "x.";
            else if (inChallenge("s", 12)) return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by 0.1x.";
            else if (hasUpgrade("s", 34) && !inChallenge("diff", 22)) return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by " + format(buyableEffect(this.layer, this.id)) + "x and shenanigans gain by " + format(buyableEffect(this.layer, this.id).sub(1).div(10).add(1)) + "x.";
            else return "Knowing that you're being forced to grind the plots to death, you're getting more bored and it somehow magically boosts your plot gain by " + format(buyableEffect(this.layer, this.id)) + "x.";
	    },
        style() {
            if(player[this.layer].unlocked) return {
                'background-color': '#808080',
                'border-color': '#707070',
                'height': '175px',
                'width': '250px'
                }
                return {
                'border-color': '#707070',
                'height': '175px',
                'width': '250px'
		}
	    },
	},
        12: {
            title: "Impatient Transformation.",
            unlocked() { return inChallenge("s", 21); }, 
            canAfford() { return false; },
            buy() {;
        },
            effect() {
            let eff = player.points.div(100).add(1)
            eff = eff.pow(player.points.max(1))
            if (player.s.buyables[41] >= 1) eff = eff.pow(buyableEffect("s", 41))
            return eff;
        },
        display() {
        return "\"Really? No, seriously, this game is a buggy mess.\" You said. \"How does that dude think I'm gonna reach such a goal without these two ever-expanding upgrades? I swear to god, I WILL bend this game to my will, even if that means I'll have to break the game.\" Your impatience is getting transformed into anger, exponentionally boosting your plots gain and it's own effect by ^"  + format(buyableEffect(this.layer, this.id)) + "."; 
	},
        style() {
            if(player[this.layer].unlocked) return {
                'background-color': '#AE4242',
                'border-color': '#9D3131',
                'height': '175px',
                'width': '250px'
                }
                return {
                'background-color': '#AE4242',
                'border-color': '#9D3131',
                'height': '175px',
                'width': '250px'
		}
	    },
	},
        21: {
            title: "Warp of Nonsense.",
            unlocked() { let cheapener = 1
			             if(hasAchievement("a", 43)) cheapener = cheapener - 0.05
			             if(hasAchievement("a", 25)) cheapener = cheapener - 0.05
			             if(hasUpgrade("c", 22)) return inChallenge("s", 21) && getPointGen().mag >= new Decimal(2).mul(upgradeEffect("c", 22)).mul(cheapener)
                         else return inChallenge("s", 21) && getPointGen().mag >= new Decimal(2).mul(cheapener) }, 
            canAfford() { let cheapener = 1
			              if(hasAchievement("a", 43)) cheapener = cheapener - 0.05
						  if(hasAchievement("a", 25)) cheapener = cheapener - 0.05
			              if(hasUpgrade("c", 22)) return getPointGen().mag >= new Decimal(2).add(player[this.layer].buyables[this.id]).mul(upgradeEffect("c", 22)).mul(cheapener)
                          else return getPointGen().mag >= new Decimal(2).add(player[this.layer].buyables[this.id]).mul(cheapener) },
			buy() { 
			player.s.lel2 == new Decimal(1)
			if (hasAchievement("a", 24)) {
				while(layers.s.buyables[21].canAfford()) {
			        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
				}
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].sub(1)
		    }
			if (!hasMilestone("t", 2)) {
            if (hasMilestone("c", 3)) layerDataReset("s", ["buyables", "challenges"])
            else layerDataReset("s", ["buyables"])
            player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
            player[this.layer].buyables[11] = new Decimal(0)
            player[this.layer].buyables[41] = new Decimal(0)
            player[this.layer].buyables[51] = new Decimal(0)
            player[this.layer].buyables[61] = new Decimal(0)
			if (player.ab.points >= 1 && !hasMilestone("c", 3)) player.s.upgrades = [11]
			if (player.ab.points >= 1) player.s.buyables[11] = new Decimal(-99)
            if (hasMilestone("c", 1)) player[this.layer].buyables[71] = player[this.layer].buyables[71]
            else player[this.layer].buyables[71] = new Decimal(0)
            player.points = new Decimal(0)
			}
			else player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
			player.s.lel2 == new Decimal(0)
        },
        display() { let cheapener = 1
			        if(hasAchievement("a", 43)) cheapener = cheapener - 0.05
			        if(hasAchievement("a", 25)) cheapener = cheapener - 0.05
            if(hasUpgrade("c", 22)) return "As you were about to hyperinflate the hell out of this layer, your plot gain suddenly got softcapped tremendously. You've lost your hope, knowing that it's basically impossible to complete this challenge... Until you notice this mythical button. <br> Pressing it will reset your progress. In exchange, you'll be granted with a single softcap warper, which decreases Impatience upgrades's cost, boosts your plot and shenanigans gain and weakens \"The Endgamer\"'s softcaps. <br> You need to generate " + format(new Decimal(2).add(player[this.layer].buyables[this.id]).mul(upgradeEffect("c", 22)).mul(cheapener)) + " plots per second in order to reset."
			else return "As you were about to hyperinflate the hell out of this layer, your plot gain suddenly got softcapped tremendously. You've lost your hope, knowing that it's basically impossible to complete this challenge... Until you notice this mythical button. <br> Pressing it will reset your progress. In exchange, you'll be granted with a single softcap warper, which decreases Impatience upgrades's cost, boosts your plot and shenanigans gain and weakens \"The Endgamer\"'s softcaps. <br> You need to generate " + format(new Decimal(2).add(player[this.layer].buyables[this.id]).mul(cheapener)) + " plots per second in order to reset.";
	    },
        style() {
            if(player[this.layer].unlocked) return {
                    'background-color': '#c37fd0',
                    'border-color': '#b26ebf',
                    'height': '250px',
                    'width': '250px',
                    }
                    else if (!canAffordBuyable(this.layer, this.id)) return {
                    'height': '250px',
                    'width': '250px',
		    }
                    return {
                    'background-color': '#6e3978',
                    'border-color': '#5d7867',
                    'height': '250px',
                    'width': '250px',
		}
	    },
	},
        31: {
            title: "Predict unpredicted boredom.",
            unlocked() { if (hasChallenge("s", 12)) return false; 
                         else return player[this.layer].unlocked;}, 
            canAfford() { return true },
            buy() {
            player[this.layer].buyables[11] = player[this.layer].buyables[11].add(1);
            },
            style() { if (player[this.layer].unlocked) return {
            'height': '54px',
            'width': '200px',
	            }
                },
	    },
        41: {
            title: "Hatred.",
            unlocked(){
                return inChallenge(this.layer, 21);
	    },
            canAfford() { return player.points.gte(layers["s"].buyables[41].cost()) },
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            cost(x=player[this.layer].buyables[this.id]) { 
                let cost1 = new Decimal(10)
                let oof1
                if (player.s.buyables[21] >= 0) { for (oof1 = 0; oof1 < player.s.buyables[21]; oof1++) {
                cost1 = cost1.sub(cost1.div(10))
                }
				}
				else cost1 = new Decimal(11)
                let cost = new Decimal(10).sub(new Decimal(10).sub(cost1)).mul(new Decimal(1.1).pow(x))
                return cost
            },
            buy() {
                player.points = player.points.sub(layers["s"].buyables[41].cost())
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
            },
            effect() {
            if (hasAchievement("a", 23)) return player.points.max(1).pow(player[this.layer].buyables[this.id].max(1)).mul(layers.c.effect()).pow(player.points.max(1).pow(player[this.layer].buyables[this.id].max(1).mul(layers.c.effect()))).pow(2)
			else return player.points.max(1).pow(player[this.layer].buyables[this.id].max(1)).mul(layers.c.effect()).pow(player.points.max(1).pow(player[this.layer].buyables[this.id].max(1).mul(layers.c.effect())))
	    },
            display() {
				if (hasAchievement("a", 23)) {
			        if (player[this.layer].buyables[41].gte(1)) return "\"Impatience Transformation\"'s effect will be now exponented by ^(" + format(player.points.max(1).pow(player[this.layer].buyables[this.id].add(1).max(1)).mul(layers.c.effect())) + "^" + format(player.points.max(1).pow(player[this.layer].buyables[this.id].add(1).max(1)).mul(layers.c.effect())) + "^2) instead. <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                    else return "\"Impatience Transformation\"'s effect will be exponented by ^(" + format(player.points.max(1).mul(layers.c.effect())) + "^" + format(player.points.max(1).mul(layers.c.effect())) + "^2). <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
				}
                else if (player[this.layer].buyables[41].gte(1)) return "\"Impatience Transformation\"'s effect will be now exponented by ^(" + format(player.points.max(1).pow(player[this.layer].buyables[this.id].add(1).max(1)).mul(layers.c.effect())) + "^" + format(player.points.max(1).pow(player[this.layer].buyables[this.id].add(1).max(1)).mul(layers.c.effect())) + ") instead. <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                else return "\"Impatience Transformation\"'s effect will be exponented by ^(" + format(player.points.max(1).mul(layers.c.effect())) + "^" + format(player.points.max(1).mul(layers.c.effect())) + "). <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                },
            style() {
                    if (player.points.gte(layers["s"].buyables[41].cost())) return {  
                    'background-color': '#CC2112',
                    'border-color': '#BB1001',
                    'height': '150px',
                    'width': '480px',
                    }
                    else if (player.points.lt(layers["s"].buyables[41].cost())) return {
                    'background-color': '#630303',
                    'border-color': '#451212',
                    'height': '150px',
                    'width': '480px',
		    }
                    return {
                    'background-color': '#AE4242',
                    'border-color': '#9D3131',
                    'height': '150px',
                    'width': '480px',
		    }
	       },
          },
        51: {
            title: "Ascended Annoyance.",
            unlocked(){
                return inChallenge(this.layer, 21);
	    },
            canAfford() { return player.points.gte(layers["s"].buyables[51].cost()) && player[this.layer].buyables[this.id].lt(2) },
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            cost(x=player[this.layer].buyables[this.id]) { 
                let cost2 = new Decimal(150)
                let oof2
                if (player.s.buyables[21] >= 0) { for (oof2 = 0; oof2 < player.s.buyables[21]; oof2++) {
                cost2 = cost2.sub(cost2.div(10))
                }
				}
				else cost2 = new Decimal(165)
                let cost = new Decimal(150).sub(new Decimal(150).sub(cost2)).mul(new Decimal(4).pow(x))
                return cost
            },
            buy() {
                player.points = player.points.sub(layers["s"].buyables[51].cost())
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
            },
            display() {if (player[this.layer].buyables[61].gte(1) && player[this.layer].buyables[this.id].eq(0)) return "\"Impatience Transformation\" boosts all the upgrades (excluding \"Every 60 seconds, a minute passes in real life.\", \"Tetrate-inator\" and instead of boosting \"Degrading Upgrade.\" like the rest of upgrades, it's multiplier is replaced by ^). <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                       else if (player[this.layer].buyables[this.id].eq(0)) return "\"Impatience Transformation\" boosts all the upgrades (excluding \"Every 60 seconds, a minute passes in real life.\" and instead of boosting \"Degrading Upgrade.\" like the rest of upgrades, it's multiplier is replaced by ^). <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                       if (player[this.layer].buyables[this.id].eq(1)) return "\"Degrading Upgrade.\"'s exponent is replaced with tetration. <nr> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                       if (player[this.layer].buyables[this.id].eq(2)) return "[LOCKED]"
		       },
            style() {
                    if (player[this.layer].buyables[this.id].gte(2)) return {
                    'background-color': '#AE4242',
                    'border-color': '#9D3131',
                    'height': '150px',
                    'width': '480px',
		    }
                    else if (player.points.gte(layers["s"].buyables[51].cost())) return {  
                    'background-color': '#CC2112',
                    'border-color': '#BB1001',
                    'height': '150px',
                    'width': '480px',
                    }
                    else if (player.points.lt(layers["s"].buyables[51].cost())) return {
                    'background-color': '#630303',
                    'border-color': '#451212',
                    'height': '150px',
                    'width': '480px',
		    }
	       },
          },
        61: {
            title: "THE GREATEST SHENANIGANS.",
            unlocked(){
                return inChallenge(this.layer, 21);
	    },
            canAfford() { return player.points.gte(layers["s"].buyables[61].cost()) && player[this.layer].buyables[this.id].lt(2)},
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            cost(x=player[this.layer].buyables[this.id]) { 
                let cost3 = new Decimal(10)
                let oof3
                if (player.s.buyables[21] >= 0) { for (oof3 = 0; oof3 < player.s.buyables[21]; oof3++) {
                cost3 = cost3.sub(cost3.div(10))
                }
				}
				else cost3 = new Decimal(11)
                let cost = new Decimal(10).sub(new Decimal(10).sub(cost3)).mul(new Decimal(1.5).pow(x))
                return cost
            },
            buy() {
                player.points = player.points.sub(layers["s"].buyables[61].cost())
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
            },
            display() {
                if(player[this.layer].buyables[this.id].eq(0)) return "Nullifies some of second part of \"The Endgamer\"'s effect, bringing you back two out of three previously removed upgrades. <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                if(player[this.layer].buyables[this.id].eq(1)) return "Nullifies second part of \"The Endgamer\"'s effect completely, bringing you back \"Vibing.\" upgrade. <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                if(player[this.layer].buyables[this.id].eq(2)) return "\"I've upgraded enough. I'm satisfied.\""
            },
            style() {
                    if (player[this.layer].buyables[this.id].gte(2)) return {
                    'background-color': '#AE4242',
                    'border-color': '#9D3131',
                    'height': '150px',
                    'width': '480px',
		    }
                    else if (player.points.gte(layers["s"].buyables[61].cost())) return {  
                    'background-color': '#CC2112',
                    'border-color': '#BB1001',
                    'height': '150px',
                    'width': '480px',
                    }
                    else if (player.points.lt(layers["s"].buyables[61].cost())) return {
                    'background-color': '#630303',
                    'border-color': '#451212',
                    'height': '150px',
                    'width': '480px',
		    }
	       },
          },
        71: {
            title() {
                let seventeenone2 = new Decimal(100)
                let seventeenonesvalue2
                for (seventeenonesvalue2 = 0; seventeenonesvalue2 < player.s.buyables[71]; seventeenonesvalue2++) {
                seventeenone2 = seventeenone2.pow(seventeenone2)
                }
                if (player[this.layer].buyables[71].gte(1)) return "DUCK IT, I'M " + format(seventeenone2) + " TIMES MORE BUFFED NOW."
                else return "DUCK IT, I'M 100 TIMES MORE BUFFED NOW."
	    },
            unlocked(){
                return inChallenge(this.layer, 21) && player[this.layer].buyables[61].gte(2);
	    },
            canAfford() { return player.points.gte(layers["s"].buyables[71].cost())},
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            cost(x=player[this.layer].buyables[this.id]) { 
                let cost4 = new Decimal(10)
                let oof4
                if (player.s.buyables[21] >= 0) { for (oof4 = 0; oof4 < player.s.buyables[21]; oof4++) {
                cost4 = cost4.sub(cost4.div(10))
                }
				}
				else cost4 = new Decimal(11)
                let cost = new Decimal(10).sub(new Decimal(10).sub(cost4)).mul(new Decimal(2.5).pow(x))
                return cost
            },
            effect() {
            let seventeenone = new Decimal(100)
            let seventeenonesvalue
            for (seventeenonesvalue = 1; seventeenonesvalue < player.s.buyables[71]; seventeenonesvalue++) {
            seventeenone = seventeenone.pow(seventeenone)
            }
            if (player[this.layer].buyables[71].gte(2)) return seventeenone
            else if (player[this.layer].buyables[71].eq(1)) return new Decimal(100)
	    },
            buy() {
                player.points = player.points.sub(layers["s"].buyables[71].cost())
                player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1);
            },
            display() {
                if (player[this.layer].buyables[71].eq(0)) return "You know what? Let's just crank the #%@& up and boost \"Vibing.\" upgrade by 100 times. <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                else if (player[this.layer].buyables[71].eq(1)) return "Exponents \"Vibing.\" upgrade by itself (NOW THAT'S A LOT OF MULTIPLIER). <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
                else if (player[this.layer].buyables[71].gte(2)) return "Exponents \"Vibing.\" upgrade by itself, again (HOW ABOUT A LITTLE MORE?). <br> <br> Cost: " + format(layers[this.layer].buyables[this.id].cost()) + " plots."
            },
            style() {
                    if (player.points.gte(layers["s"].buyables[71].cost())) return {  
                    'background-color': '#CC2112',
                    'border-color': '#BB1001',
                    'height': '150px',
                    'width': '480px',
                    }
                    else if (player.points.lt(layers["s"].buyables[71].cost())) return {
                    'background-color': '#630303',
                    'border-color': '#451212',
                    'height': '150px',
                    'width': '480px',
		    }
                    return {
                    'background-color': '#AE4242',
                    'border-color': '#9D3131',
                    'height': '150px',
                    'width': '480px',
		    }
	       },
          },
    },
clickables: {
        rows: 1,
        cols: 1,
        masterButtonPress() {
        if (player[this.layer].upgradeTime.eq(60) || hasMilestone("c", 0)) return player[this.layer].upgradeTime = new Decimal(0);
        },
        masterButtonText() {
        if (player[this.layer].upgradeTime.lt(60) && hasMilestone("c", 0)) return "Reset 3rd upgrade's effect.";
        else if (player[this.layer].upgradeTime.lt(60)) return "Wait for " + Math.round(new Decimal(60).sub(player[this.layer].upgradeTime).div(layers.diff.effect())) + " more second(s).";
        if (player[this.layer].upgradeTime.eq(60)) return "Reset 3rd upgrade's effect.";
	},// **optional** text to display on the Master Button
        showMasterButton() {
        if(inChallenge("s", 11) || inChallenge("diff", 22)) return false;
        else return hasUpgrade(this.layer, 14) && !hasMilestone("c", 5);
        },
    },
    challenges: {
        rows: 2,
        cols: 2,
        11: {
            name: "Typical Challenge",
            challengeDescription() {if(hasUpgrade(this.layer, 34)) return "Tetrates your plot gain by 0.5 and removes \"Degrading Upgrade.\" and \"Negotiator.\", but \"Predicted boredom.\"'s first effect is increased to the power of 2.";
                                   else return "Tetrates your plot gain by 0.5 and removes \"Degrading Upgrade.\" and \"Negotiator.\", but \"Predicted boredom.\"'s effect is increased to the power of 2."
	    },
            unlocked() {
                if(inChallenge("diff", 22)) return false;
                else return hasUpgrade(this.layer, 22) || hasMilestone("c", 3) && hasChallenge("s", 11);
            },
            rewardDescription() {
                if(hasAchievement("a", 16)) return "Quintuples your shenanigans gain because you were a good boy."
				else return "Triples your shenanigans gain because you were a good boy."
			},
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            goal: new Decimal("24000"),
	},
        12: {
            name: "The Reverser",
            challengeDescription() {if(hasAchievement("a", 22)) {
				                    if(hasUpgrade(this.layer, 34)) return "\"Predicted boredom.\"'s first effect is divided by ten."
                                    else return "\"Predicted boredom.\"'s effect is divided by ten."
			                        }
				                    else if(hasUpgrade(this.layer, 34)) return "\"Predicted boredom.\"'s first effect is divided by ten and then some (scales up once \"Predicted boredom.\"'s first effect reaches 10.01x)."
                                    else return "\"Predicted boredom.\"'s effect is divided by ten and then some (scales up once \"Predicted boredom.\"'s effect reaches 10.01x)."
	    },
            unlocked() {
                if(inChallenge("diff", 22)) return false;
                else return hasUpgrade(this.layer, 22) || hasMilestone("c", 3) && hasChallenge("s", 12);
            },
            rewardDescription() {
                if(hasAchievement("a", 16)) return "You lose the ability to gain \"Predict boredom.\" by yourself and \"Predict boredom.\" becomes passive, growing up at the rate of 15 clicks per second."
				else return "You lose the ability to gain \"Predict boredom.\" by yourself and \"Predict boredom.\" becomes passive, growing up at the rate of 10 clicks per second."
			},
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            goal: new Decimal("50000"),
	},
        21: {
            name: "The Endgamer",
            challengeDescription: "Tetrates your plots gain by undecillionth times and removes \"Vibing.\", \"B.E.G,H.A.Y!\" and \"Tetrate-inator.\" upgrades. (Don't even think about bursting through it with hyperinflation, smartass).",
            unlocked() {
                if(inChallenge("diff", 22)) return false;
                else return hasChallenge(this.layer, 11) && hasChallenge(this.layer, 12);
            },
            rewardDescription: "no.",
            currencyDisplayName: "plots",
            currencyInternalName: "points",
            goal: new Decimal("1e420"),
	},
    },
	hotkeys: [
		{ key: "s", desc: "S: Reset for shenanigans.", onPress() { doReset(this.layer); } },
	],
    doReset(resettingLayer){ // Triggers when this layer is being reset, along with the layer doing the resetting. Not triggered by lower layers resetting, but is by layers on the same row.
        if(layers[resettingLayer].row == layers.ab.row) {
        layerDataReset("s")
        player.s.buyables[21] = new Decimal(-1)
		player.s.buyables[11] = new Decimal(-99)
		player.s.upgrades = [11]
		player.c.upgrades = [32]
		player.s.points = new Decimal(0)
		player.s.upgradeTime.mag = new Decimal(0)
        }
        else if(layers[resettingLayer].row > this.row) {
        if(hasMilestone("c", 4))  layerDataReset("s",["upgrades"])
        else layerDataReset("s")
        player.s.buyables[21] = new Decimal(0)
		if(player.ab.points >= 1) {
		if(!hasMilestone("c", 4)) player.s.upgrades = [11]
		player.s.buyables[21] = new Decimal(-1)
		player.s.buyables[11] = new Decimal(-99)
        if(hasMilestone("a", 0)) player.s.points = new Decimal(100)
		else player.s.points = new Decimal(0)
		}
	    else layerDataReset("s")
        player.s.buyables[21] = new Decimal(0)
		if(player.ab.points >= 1) {
		if(!hasMilestone("c", 4)) player.s.upgrades = [11]
		player.s.buyables[21] = new Decimal(-1)
		player.s.buyables[11] = new Decimal(-99)
        if(hasMilestone("a", 0)) player.s.points = new Decimal(100)
		else player.s.points = new Decimal(0)
        }
		}
    }
});

addLayer("c", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: false,                    // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
            best: new Decimal(0),
            total: new Decimal(0),
            chaoticEnergy: new Decimal(0),
        }},
        effect() {
            eff = player.c.points.add(1).pow(player.c.points.add(1))
            return eff
        },
        effectDescription() {
            return "boosting your shenanigans gain and \"Hatred.\"'s effect by " + format(this.effect()) + "x."
        },
    midsection: [
        ["display-text", function() {if(hasUpgrade("c", 21) && player.c.chaoticEnergy < 0) return "You have " + format(player["c"].chaoticEnergy) + " chaotic energies, which boosts your softcap warpers's last effect and plot gain by 0.01x."
			                         else if(hasUpgrade("c", 21)) return "You have " + format(player["c"].chaoticEnergy) + " chaotic energies, which boosts your softcap warpers's last effect and plot gain by " + format(new Decimal(1).add(player.c.chaoticEnergy.div(10)).root(10)) + "x."
		                             else if (player.c.chaoticEnergy < 0) return "You have " + format(player["c"].chaoticEnergy) + " chaotic energies, which boosts your softcap warpers's last effect by 0.01x."
		                             else return "You have " + format(player["c"].chaoticEnergy) + " chaotic energies, which boosts your softcap warpers's last effect by " + format(new Decimal(1).add(player.c.chaoticEnergy.div(10)).root(10)) + "x."},
        {"color": "white", "font-size": "17.6px",}],
    ],
        name: "Chaos",
        color: "#6d6dc0",                       // The color for this layer, which affects many elements
        resource: "condensed chaoses",            // The name of this layer's main prestige resource
        row: 1,                                 // The row this layer is on (0 is the first row)
        resetDescription: "YEET all of your softcap warpers into the void for ",
        baseResource() {if (player.s.buyables[21] >= 1 || player[this.layer].total >= 1 || player.ab.points >= 1) return "softcap warpers"
                        else return "???"
		       },                 // The name of the resource your prestige gain is based on
        baseAmount() {return player.s.buyables[21]},    // A function to return the current value of that resource

        requires: new Decimal(2),            // The amount of the base needed to  gain 1 of the prestige currency.
                                                // Also the amount required to unlock the layer.
        
        type: "static",                         // Determines the formula used for calculating prestige currency.
        base: 1.5,
        exponent: 1,                          // "normal" prestige gain is (currency^exponent)
        roundUpCost: true,
	    canBuyMax() {return hasMilestone("t", 0)},
		position: 1,

        gainMult() {                            // Returns your multiplier to your gain of the prestige resource
            return new Decimal(1)               // Factor in any bonuses multiplying gain here
        },

        update(diff) {
			let chaoticGrowth = new Decimal(diff).mul(layers.diff.effect())
			if(hasUpgrade(this.layer, 11)) chaoticGrowth = chaoticGrowth * upgradeEffect("c", 11)
			if(hasAchievement("a", 35)) chaoticGrowth * player.t.points.log(3)
            if(hasUpgrade(this.layer, 12)) player[this.layer].chaoticEnergy = player[this.layer].chaoticEnergy.add(chaoticGrowth)
            if(hasMilestone("c", 3)) generatePoints("s", diff / 100)
	},

        gainExp() {                             // Returns your exponent to your gain of the prestige resource
            return new Decimal(1)
        },

        layerShown() {return true},             // Returns a bool for if this layer's node should be visible in the tree.

        branches: ["s"],

        milestones: {
            0: {
               requirementDescription: "1 Condensed Chaos",
               effectDescription: "Allows you to reset \"Degrading Upgrade.\"'s effect whenever you want.",
               done: function() {return player.c.best.gte(1)},
               },
            1: {
               requirementDescription: "2 Condensed Chaoses",
               effectDescription: "You keep your \"DUCK IT, I'M (insert the current number here) TIMES MORE BUFFED.\" upgrades on \"Warp of Nonsense.\" reset.",
               done: function() {return player.c.best.gte(2)},
               },
            2: {
               requirementDescription: "3 Condensed Chaoses",
               effectDescription: "You'll gain +0.5 plots per second (that are immune against softcaps.) in \"The Endgamer.\" challenge.",
               done: function() {return player.c.best.gte(3)},
               },
            3: {
               requirementDescription() {if(player.ab.points == 0) return "4 Condensed Chaoses"
			   else return "LOCKED"},
               effectDescription() {if(player.ab.points == 0) return "You keep both \"Typical Challenge\" and \"The Reverser\" challenges completion on \"Warp of Nonsense.\" reset. You also gain 1% of shenanigans gain per second."
			                        else return ""},
               done: function() {return player.c.best.gte(4) && player.ab.points == 0},
               },
            4: {
               requirementDescription: "5 Condensed Chaoses",
               effectDescription: "You keep Shenanigans upgrades on Chaos reset.",
               done: function() {return player.c.best.gte(5)},
			   },
            5: {
               requirementDescription: "7 Condensed Chaoses",
               effectDescription: "\"Degrading Upgrade\"'s effect never decreases. Period.",
               done: function() {return player.c.best.gte(7)},
			   },
	},

    upgrades: {
        rows: 3,
        cols: 3,
        11: {
            title: "Warp Dilation.",
            description: "Softcap warpers boosts your chaotic energy production.",
            cost: new Decimal(1),
			unlocked(){ 
            return hasUpgrade(this.layer, 12); 
            },
			effect() {
			return player.s.buyables[21].add(1).root(1.35)
            },
			effectDisplay() {
            return format(this.effect()) + "x";
            },
		    },
		12: {
            title: "Endless Possibilities.",
            description: "Generates one chaotic energy per second.",
            cost: new Decimal(1),
		    },
		13: {
            title: "Full House.",
            description: "You permanently keep one Impatience upgrade each on \"Warp of Nonsense.\".",
            cost: new Decimal(1),
			unlocked(){ 
            return hasUpgrade(this.layer, 12); 
            },
			effect() {
			if (player.s.buyables[41] < 1 && hasUpgrade(this.layer, 13)) player.s.buyables[41] = new Decimal(1)
			else player.s.buyables[41] = player.s.buyables[41]
			if (player.s.buyables[51] < 1 && hasUpgrade(this.layer, 13)) player.s.buyables[51] = new Decimal(1)
			else player.s.buyables[51] = player.s.buyables[51]
			if (player.s.buyables[61] < 1 && hasUpgrade(this.layer, 13)) player.s.buyables[61] = new Decimal(1)
			else player.s.buyables[61] = player.s.buyables[61]
            if (hasMilestone("c", 1) && player.s.buyables[71] < 1) player.s.buyables[71] = new Decimal(1)
            else if (hasMilestone("c", 1)) player.s.buyables[71] = player.s.buyables[71]
			else if (player.s.buyables[71] < 1 && hasUpgrade(this.layer, 13)) player.s.buyables[71] = new Decimal(1)
			},
            },
        21: {
            title: "Live and Learn.",
            description: "Chaotic energies boosts your plot gain too.",
            cost: new Decimal(3),
			unlocked(){ 
            return hasUpgrade(this.layer, 12); 
            },
		    },
        22: {
            title: "Box of C.B.B.",
            description: "\"Warp of Nonsense.\"'s reqirement is decreased by 10% (where the hell did this box came from anyways?).",
            cost: new Decimal(3),
			unlocked(){ 
            return hasUpgrade(this.layer, 12); 
            },
			effect() {
			if(hasUpgrade("t", 21)) return new Decimal(0.9).mul(upgradeEffect("t", 21))
		    else return new Decimal(0.9)
			},
			effectDisplay() {
            return format(new Decimal(100).sub(this.effect().mul(100))) + "%";
		    },
		    },
        31: {
            title() {let Adapter = new Decimal(1).div(3).mul(new Decimal(3).add(player.ab.points))
				     if (hasUpgrade(this.layer, 32) || getPointGen().mag >= new Decimal(30).mul(Adapter)) return "Open Your Heart,"
			         else return "Open Your Heart."
		    },
            description: "Unlocks a new layer.",
            cost: new Decimal(10),
            currencyLocation() {return player.s.buyables},
            currencyDisplayName: "softcap warpers",
            currencyInternalName: 21,
			unlocked(){ 
            return hasUpgrade(this.layer, 21) || hasUpgrade(this.layer, 22); 
            },
		    },
        32: {
            title: "It's Was Terrible.",
            description: "Unlocks an another layer... Wait, what?",
            cost: new Decimal(194),
            currencyLocation() {return player.s.buyables},
            currencyDisplayName: "softcap warpers",
            currencyInternalName: 21,
			unlocked(){let Adapter = new Decimal(1).div(3).mul(new Decimal(3).add(player.ab.points))
            return getPointGen().mag >= new Decimal(30).mul(Adapter) && inChallenge("s", 21) && player.ab.points == 0; 
            },
		    },
        },
	hotkeys: [
		{ key: "c", desc: "C: Reset for condensed chaoses.", onPress() { doReset(this.layer); } },
	],
    doReset(resettingLayer){ // Triggers when this layer is being reset, along with the layer doing the resetting. Not triggered by lower layers resetting, but is by layers on the same row.
        if(layers[resettingLayer].row == layers.ab.row) {
        layerDataReset("c")
        player.c.chaoticEnergy = new Decimal(-2000)
        }
        else if(layers[resettingLayer].row > this.row) {
        layerDataReset("c")
        }
    },
    });
	
addLayer("t", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                    // You can add more variables here to add them to your layer.
            points: new Decimal(1),             // "points" is the internal name for the main resource of the layer.
        }},

        update(diff) {
			let TransPower = new Decimal(1)
			if(hasMilestone("t", 1) && hasUpgrade("t", 11) && hasUpgrade("t", 32)) TransPower = TransPower.add(player.t.points.log(player.t.points.root(1.7)))
		    else if(hasMilestone("t", 1) && hasUpgrade("t", 11)) TransPower = TransPower.add(player.t.points.log(player.t.points.root(1.8)))
			else if(hasMilestone("t", 1)) TransPower = TransPower.add(player.t.points.log(player.t.points.root(2)))
		    if(hasUpgrade("c", 31) && hasUpgrade("t", 32) && hasUpgrade("t", 33)) player.t.points = player.t.points.add(new Decimal(diff).mul(layers.diff.effect()).mul(TransPower).mul(new Decimal(4.5).mul(upgradeEffect("t", 33))))
			else if(hasUpgrade("c", 31) && hasUpgrade("t", 32)) player.t.points = player.t.points.add(new Decimal(diff).mul(layers.diff.effect()).mul(TransPower).mul(4.5))
		    else if(hasUpgrade("c", 31) && hasUpgrade("t", 33)) player.t.points = player.t.points.add(new Decimal(diff).mul(layers.diff.effect()).mul(TransPower).mul(new Decimal(3).mul(upgradeEffect("t", 33))))
			else if(hasUpgrade("c", 31) && hasUpgrade("t", 22)) player.t.points = player.t.points.add(new Decimal(diff).mul(layers.diff.effect()).mul(TransPower).mul(3))
		    else if(hasUpgrade("c", 31)) player.t.points = player.t.points.add(new Decimal(diff).mul(layers.diff.effect()).mul(TransPower))
	},

        color: "#fefbaa",                       // The color for this layer, which affects many elements
        resource: "Transcended points",            // The name of this layer's main prestige resource
        row: 1,                                 // The row this layer is on (0 is the first row)

        baseResource: "Transcended points",                 // The name of the resource your prestige gain is based on
        baseAmount() {return player.t.points},    // A function to return the current value of that resource
		position: 3,

		effect() {
            eff = player.t.points.add(1).log(3).max(1)
            return eff
        },
        effectDescription() {
            return "nerfing softcap's root effect by " + format(this.effect()) + "/."
        },
        type: "none",                         // Determines the formula used for calculating prestige currency.
		
        branches: ["s", "c"],

        layerShown() {return hasUpgrade("c", 31)},             // Returns a bool for if this layer's node should be visible in the tree.
  milestones: {
           0: {
               requirementDescription: "Unlock Transcendence layer",
               effectDescription: "You can bulk buy condensed chaoses now.",
               done: function() {return hasUpgrade("c", 31)}
               },
           1: {
               requirementDescription() {
			   if (player.ab.points >= 1) return "60 Transcended points"
			   else return "10 Transcended points"
			   },
               effectDescription: "Transcended points gain is now stronger based on transcended points.",
               done: function() {if (player.ab.points >= 1) return player.t.points.gte(60)
			                     else return player.t.points.gte(10)},
               },
           2: {
               requirementDescription() {
			   if (player.ab.points >= 1) return "10000 Transcended points"
			   else return "5000 Transcended points"
			   },
               effectDescription: "\"Warp of Nonsense.\" no longer resets anything.",
               done: function() {if (player.ab.points >= 1) return player.t.points.gte(10000)
				                 else return player.t.points.gte(5000)},
               },
	},
	upgrades: {
	    rows: 4,
        cols: 3,
		  11: {
			   title: "Ascended Transcendence.",
               description: "2nd milestone's effect is buffed.",
               cost: new Decimal(75),		   
			   },
		  21: {
			   title: "Transcended C.B.B.",
               description: "\"Box of C.B.B.\"'s effect is stronger based on Transcendence upgrades.",
               cost: new Decimal(300),
			   unlocked(){ 
               return hasUpgrade(this.layer, 11); 
               },
               effect() {
                   let eff = new Decimal(0.9)
                   if(hasUpgrade("t", 32)) eff = new Decimal(0.85)
				   if(hasUpgrade("t", 41)) return new Decimal(eff).pow(player.t.upgrades.length).mul(upgradeEffect("t", 41))
                   else return new Decimal(eff).pow(player.t.upgrades.length)	   
			   },
               effectDisplay() {
                   return "+???%";
               },
		       },
		  22: {
			   title: "M O R E .",
               description: "Your transcendend points gain is tripled.",
               cost: new Decimal(400),		
			   unlocked(){ 
               return hasUpgrade(this.layer, 11); 
               },			   
			   },
		  31: {
			   title: "AND THIS IS... TO GO... EVEN FURTHER BEYOND!",
               description: "Predicted boredom's effect is heavily buffed.",
               cost: new Decimal(1500),		
			   unlocked(){ 
               return hasUpgrade(this.layer, 21) && hasUpgrade(this.layer, 22); 
               },			   
			   },
		  32: {
			   title: "Peace and Tranquility",
               description: "Boosts upgrades above by 1.5x.",
               cost: new Decimal(3000),		
			   unlocked(){ 
               return hasUpgrade(this.layer, 21) && hasUpgrade(this.layer, 22); 
               },			   
			   },
		  33: {
			   title: "Goal is relative too.",
               description: "\"haha shenanigans go brrrr.\" boosts transcended points gain at reduced rate.",
               cost: new Decimal(1800),		
			   unlocked(){ 
               return hasUpgrade(this.layer, 21) && hasUpgrade(this.layer, 22); 
               },			   
			   effect() {
               return new Decimal(1).mul((new Decimal(player.timePlayed)).max(1).log(60).add(1)).root(2)
			   },
			   effectDisplay() {
			   return format(this.effect()) + "x"
		       },
		       },
		  41: {
			   title: "Yo dawg, I heard you liked references...",
               description: "\"T.C.B.B.\"'s effect is stronger based on Chaos upgrades.",
               cost: new Decimal(35),	
               currencyLocation() {return player.s.buyables},
               currencyDisplayName: "softcap warpers",
               currencyInternalName: 21,			   
			   unlocked(){ 
               return hasUpgrade(this.layer, 31) && hasUpgrade(this.layer, 32) && hasUpgrade(this.layer, 33); 
               },			   
               effect() {
                   return new Decimal(0.9).pow(player.c.upgrades.length)					   
			   },
               effectDisplay() {
                   return "+???%";
               },
		       },
	},
});

addLayer("ab", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: false,                    // You can add more variables here to add them to your layer.
            points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
        }},

        color: "#006080",                       // The color for this layer, which affects many elements
        resource: "anti-balancers",            // The name of this layer's main prestige resource
        row: 2,                                 // The row this layer is on (0 is the first row
		symbol: "AB",
		effect(){
		let eff = player.ab.points.mul(10)
		return eff
		},
		effectDescription() {
			return "increasing hardcap's limit by " + format(this.effect()) + " plots per second."
		},

        midsection: [
		["display-text", function() {if(!inChallenge("s", 21)) return "To be able to prestige, enter the \"The Endgamer\" challenge."}],
		"blank",
        ["display-text", function() {if(player.ab.points.eq(0))  return "Current mod: N/A <br> <br> The next mod: NG- <br> <br> The next feature: Achievements"
	                                 else if(player.ab.points.eq(1)) return "Current mod: NG- <br> <br> The next mod: NG-- <br> <br> The next feature: Three new layers"
		                             else if(player.ab.points.eq(2)) return "Current mod: NG-- [The current endgame] <br> <br> The next mod: NG---"
		                             else if(player.ab.points.eq(3)) return "Current mod: NG--- <br> <br> The next mod: NG----"
		                             else if(player.ab.points.eq(4)) return "Current mod: NG---- <br> <br> The next mod: NG-----"
		                             else if(player.ab.points.eq(5)) return "Current mod: NG----- <br> <br> The next mod: NG+... wait."
		                             },
        {"color": "white", "font-size": "17.6px",}],
        ],

        baseResource: "plots per second",                 // The name of the resource your prestige gain is based on
        baseAmount() {return getPointGen()},    // A function to return the current value of that resource

        requires(){
		if(inChallenge("s", 21)){
        if(player.ab.points.eq(0)) return new Decimal(30)
	    else if(player.ab.points.eq(1)) return new Decimal(40)
		else if(player.ab.points.eq(2)) return new Decimal(51)
		else if(player.ab.points.eq(3)) return new Decimal(60)
		else if(player.ab.points.eq(4)) return new Decimal(70)
		else if(player.ab.points.eq(5)) return new Decimal(80)
		}
	    else return new Decimal(Infinity)
		},

        resetDescription: "Abandon your progress entirely, getting ",
        
        type: "normal",                         // Determines the formula used for calculating prestige currency.
        exponent: 1.7e308,                          // "normal" prestige gain is (currency^exponent)
	    canBuyMax() {return false},

        gainMult() {                            // Returns your multiplier to your gain of the prestige resource
            return new Decimal(1)               // Factor in any bonuses multiplying gain here
        },
        gainExp() {                             // Returns your exponent to your gain of the prestige resource
            return new Decimal(1)
        },

        layerShown() {return inChallenge("s", 21) && hasUpgrade("c", 32) || player.ab.points >= 1},             // Returns a bool for if this layer's node should be visible in the tree.

        branches: ["s"],
    });

addLayer("a", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                    // You can add more variables here to add them to your layer.
			achievementsLol: new Decimal(0),
			bingoPungo: new Decimal(0),
        }},

        color() {
			if(player.a.achievementsLol == 24) return "#5AC467"
            else return "A3A3A3"
		},

        row: "side",                                 // The row this layer is on (0 is the first row)

        baseAmount() {return player.ab.points},    // A function to return the current value of that resource

        gainMult() {                            // Returns your multiplier to your gain of the prestige resource
            return new Decimal(1)               // Factor in any bonuses multiplying gain here
        },
        gainExp() {                             // Returns your exponent to your gain of the prestige resource
            return new Decimal(1)
        },

        layerShown() {return player.ab.points >= 1},             // Returns a bool for if this layer's node should be visible in the tree.
		
        tooltip() {
			return "Achievements"
		},
		
        tabFormat: {
			"Achievements": {
                buttonStyle() {return  {'border-color': 'lime', 'color': 'white'};},
                content:
				    ["main-display",
                    ["display-text",
                    function() {return formatWhole(player.a.achievementsLol) + " out of 24 achievements are completed."},
                    {"color": "white", "font-size": "17px", "font-family": "Inconsolata"}],
                    ["display-text",
                    function() {return "You've got " + bingoSystem() + " bad Bingo Pungo, multiplying your plot and shenanigans gain by " + formatWhole(new Decimal(6).pow(bingoSystem())) + "x."},
                    {"color": "white", "font-size": "17px", "font-family": "Inconsolata"}],
                    "achievements"],
            },
			"Milestones": {
                buttonStyle() {return  {'border-color': 'lime', 'color': 'white'};},
                content:
				    ["main-display",
                    "milestones"],
            },
	    },
		
        achievements: {
        rows: 5,
        cols: 6,
        11: {
            name: "The Beginning of End",
			done() {return player.ab.points.gte(1)},
            tooltip: "Do your first Anti-Balance reset. \n Reward: You get to keep your first upgrade, so you wouldn't literally die from boredom.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		12: {
            name: "Vibe Check",
			done() {return hasUpgrade("s", 12) && player.ab.points.gte(1)},
            tooltip: "Get \"Vibing.\" upgrade. \n Reward: \"Vibing.\"'s root effect is weakened based on your unspent shenanigans.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
		},
		13: {
			name: "It's Raining Exponents!",
			done() {return hasUpgrade("s", 21) && hasUpgrade("s", 23) && hasUpgrade("s", 31) && hasUpgrade("s", 32) && player.ab.points.gte(1)},
			tooltip: "Get all 3 exponent-based Shenanigans upgrades. \n Reward: \"Tiny Desk Exponent.\" boosts \"Another Exponent...?\" back.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		14: {
            name: "Hyper Hexagonest",
			done() {return hasUpgrade("s", 22) && player.ab.points.gte(1)},
            tooltip: "Get \"Supreme Hexagonity.\" upgrade. \n Reward: \"Supreme Hexagonity.\" halves \"B.E.G,H.A.Y!\"'s root effect again.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		15: {
            name: "Megaupgrade",
			done() {return hasUpgrade("s", 14) && hasUpgrade("s", 32) && hasUpgrade("s", 22) && hasUpgrade("s", 34) && player.ab.points.gte(1)},
            tooltip: "Get all of Shenanigans upgrades. \n Reward: \"Degrading Upgrade.\"'s effect decreases twice slower.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		16: {
            name: "Truthgod",
			done() {return hasChallenge("s", 11) && hasChallenge("s", 12) && player.ab.points.gte(1)},
            tooltip: "Complete the first two Shenanigans challenges. \n Reward: Shenanigans challenges has better rewards.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
        21: {
            name: "i want to die",
			done() {return player.ab.points.gte(2)},
            tooltip() {if(player.ab.points >= 2) return "Do your second Anti-Balance reset. \n Reward: You passively gain shenanigans based on plot gain and diff's effect and \"Supreme Hexagonity\" gets one more effect."
			           else return "Do your second Anti-Balance reset. \n Reward: You passively gain shenanigans based on plot gain and ███'s effect and \"Supreme Hexagonity\" gets one more effect."},
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		22: {
            name: "Unkillable Boredom",
			done() {return player.s.buyables[11] >= 900 && player.ab.points.gte(1)},
            tooltip: "Exceed \"Predicted boredom.\"'s effect up to 10x. \n Reward: \"The Reversal\"'s effect no longer scales with \"Predicted boredom.\"'s effect.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
		},
		23: {
			name: "REEEEEEEEEEE \n" + "EEEEEEEEEEEE \n" + "EEEEEEEEEEEE \n" + "EEEEEEEEEEEE \n" + "EEEEEEEEEEEE",
			done() {return buyableEffect("s", 41) >= 1.79e308 && inChallenge("s", 21) && player.s.buyables[41] >= 1 && player.ab.points.gte(1)},
			tooltip: "Exceed your \"Hatred.\"'s total effect up to 1.79e308. \n Reward: ^2 is added to the \"Hatred.\"'s formula.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		24: {
            name: "At Last, but Finally...",
			done() {return player.s.buyables[21] >= 0 && player.ab.points.gte(1)},
            tooltip: "Get down to 0 softcap warpers. \n Reward: A quick relief, knowing you can finally buy max softcap warpers.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		25: {
            name: "To Infniity... and Beyond",
			done() {return inChallenge("s", 21) && getPointGen().mag >= 10 && player.ab.points.gte(1)},
            tooltip: "Reach 10 plots per second or more in \"The Endgamer\" challenge. \n Reward: \"Warp of Nonsense.\"'s requirement is decreased by 5%",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		26: {
            name: "YOU CAN GET- no",
			done() {return player.s.buyables[21] >= 50 && player.ab.points.gte(1)},
            tooltip: "Get 50 softcap warpers. \n Reward: You get nothing! You lose! Good day, sir!",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
        31: {
            name: "Halfway there",
			done() {return player.ab.points.gte(3)},
            tooltip: "Do your third Anti-Balance reset. \n Reward: N/A",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		32: {
            name: "I CAN DO ANYTHING",
			done() {return hasUpgrade("c", 12) && player.ab.points.gte(1)},
            tooltip: "Begin generating chaotic energies.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
		},
		33: {
			name: "Biscuitmaster",
			done() {return hasUpgrade("c", 22) && player.ab.points.gte(1)},
			tooltip: "Get \"Box of C.B.B.\" upgrade.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		34: {
            name: "But I wanted 4th Chaos milestone...",
			done() {return player.c.best >= 4 && player.ab.points.gte(1)},
            tooltip: "Get 4 best condensed chaoses.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		35: {
            name: "Metamorphpsis",
			done() {return player.c.chaoticEnergy >= 2000 && player.ab.points.gte(1)},
            tooltip: "Exceed 2000 chaotic energies. \n Reward: Chaotic energies gain is multiplied by the amount of transcended points you have at log(3) rate.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		36: {
            name: "You mean THOSE chaoses!?",
			done() {return hasMilestone("c", 5) && player.ab.points.gte(1)},
            tooltip: "Get the last Chaos milestone.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
        41: {
            name: "Holy Broly did nothing wrong",
			done() {return player.ab.points.gte(4)},
            tooltip: "Do your fourth Anti-Balance reset. \n Reward: N/A",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		42: {
            name: "A s c e n d e n c e",
			done() {return hasUpgrade("c", 31) && player.ab.points.gte(1)},
            tooltip: "Unlock Transcendence layer.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
		},
		43: {
			name: "All Hail C.B.B!",
			done() {return hasUpgrade("t", 21) && player.ab.points.gte(1)},
			tooltip: "Get \"Transcended C.B.B.\" upgrade. \n Reward: \"Warp of Nonsense.\"'s requirement is decreased by additional 5% (10% in total)",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		44: {
            name: "Bugs and Crashes",
			done() {return hasUpgrade("t", 32) && player.ab.points.gte(1)},
            tooltip: "Get \"Peace and Tranquility\" upgrade.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		45: {
            name: "Wait, that's illegal",
			done() {return hasUpgrade("t", 41) && player.ab.points.gte(1)},
            tooltip: "Get \"Yo dawg, I heard you liked references...\" upgrade.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
		46: {
            name: "IT'S OVER 9000!... Or was it over 8000?",
			done() {return player.t.points >= 10000 && player.ab.points.gte(1)},
            tooltip: "Exceed 10000 transcended points.",
			onComplete() {return player.a.achievementsLol = player.a.achievementsLol.add(1)},
        },
    },

  milestones: {
           0: {
               requirementDescription: "1st achievement row completed.",
               effectDescription() {
               if(hasAchievement("a", 11) && hasAchievement("a", 12) && hasAchievement("a", 13) && hasAchievement("a", 14) && hasAchievement("a", 15) && hasAchievement("a", 16)) return "You start with 100 Shenanigans after 2nd row resets."
			   else return "???"
			   },
               done: function() {return hasAchievement("a", 11) && hasAchievement("a", 12) && hasAchievement("a", 13) && hasAchievement("a", 14) && hasAchievement("a", 15) && hasAchievement("a", 16)},
               },
           1: {
               requirementDescription: "2nd achievement row completed.",
               effectDescription() {
               if(hasAchievement("a", 21) && hasAchievement("a", 22) && hasAchievement("a", 23) && hasAchievement("a", 24) && hasAchievement("a", 25) && hasAchievement("a", 26)) return "You lose only half of your diff upon layer reset."
			   else return "???"
			   },
               done: function() {return hasAchievement("a", 21) && hasAchievement("a", 22) && hasAchievement("a", 23) && hasAchievement("a", 24) && hasAchievement("a", 25) && hasAchievement("a", 26)},
               },
           2: {
               requirementDescription: "3rd achievement row completed.",
               effectDescription() {
               if(hasAchievement("a", 31) && hasAchievement("a", 32) && hasAchievement("a", 33) && hasAchievement("a", 34) && hasAchievement("a", 35) && hasAchievement("a", 36)) return "You start with 100 Shenanigans after 2nd row resets."
			   else return "???"
			   },
               done: function() {return hasAchievement("a", 31) && hasAchievement("a", 32) && hasAchievement("a", 33) && hasAchievement("a", 34) && hasAchievement("a", 35) && hasAchievement("a", 36)},
               },
           3: {
               requirementDescription: "4th achievement row completed.",
               effectDescription() {
               if(hasAchievement("a", 41) && hasAchievement("a", 42) && hasAchievement("a", 43) && hasAchievement("a", 44) && hasAchievement("a", 45) && hasAchievement("a", 46)) return "You start with 100 Shenanigans after 2nd row resets."
			   else return "???"
			   },
               done: function() {return hasAchievement("a", 41) && hasAchievement("a", 42) && hasAchievement("a", 43) && hasAchievement("a", 44) && hasAchievement("a", 45) && hasAchievement("a", 46)},
               },
           4: {
               requirementDescription: "5th achievement row completed.",
               effectDescription() {
               if(hasAchievement("a", 51) && hasAchievement("a", 52) && hasAchievement("a", 53) && hasAchievement("a", 54) && hasAchievement("a", 55) && hasAchievement("a", 56)) return "You start with 100 Shenanigans after 2nd row resets."
			   else return "???"
			   },
               done: function() {return hasAchievement("a", 51) && hasAchievement("a", 52) && hasAchievement("a", 53) && hasAchievement("a", 54) && hasAchievement("a", 55) && hasAchievement("a", 56)},
			   unlocked() {return player.ab.points >= 69},
		   },
  },
    doReset(resettingLayer){ // Triggers when this layer is being reset, along with the layer doing the resetting. Not triggered by lower layers resetting, but is by layers on the same row.
        if(layers[resettingLayer].row == layers.ab.row) {
	    player.a.achievementsLol = new Decimal(0)
		player.a.milestones = []
        player.a.achievements = []
        }
    } 
})

addLayer("diff", {
        startData() { return {                  // startData is a function that returns default data for a layer. 
            unlocked: true,                    // You can add more variables here to add them to your layer.
			points: new Decimal(1)
        }},

        color() {
			return "#C0C0C0"
		},

        update(diff) {
			if(player.ab.points >= 2) player.diff.points = player.diff.points.add(new Decimal(diff).mul(layers.diff.effect()))
		},

        tabFormat: ["main-display",
                   ["display-text", function() {return hasUpgrade("n", 14) ? "You have " + formatWhole(challengesCompleted()) + " diff challenges completed, multiplying diff base in diff's effect by " + format(new Decimal(16.6666).add(player.n.total.div(50)).pow(challengesCompleted())) + "x.<br/><br/>Note: Doing any layer reset will reset diff points back to 1.<br/><br/>You have been warned." : "You have " + formatWhole(challengesCompleted()) + " diff challenges completed, multiplying diff base in diff's effect by " + format(new Decimal(16.6666).pow(challengesCompleted())) + "x.<br/><br/>Note: Doing any layer reset will reset diff points back to 1.<br/><br/>You have been warned."}],
				   "challenges"],

        row: 0,                                 // The row this layer is on (0 is the first row)
	    symbol: "D",
		position: 2,
        resource: "diff points",
		effect() { let effyes = new Decimal(16.6666)
		           if(hasUpgrade("n", 14)) effyes = effyes.add(player.n.total.div(50))
		           let eff = player.diff.points.mul(player.diff.points).mul(new Decimal(effyes).pow(challengesCompleted())).log(2).add(1)
		           if(inChallenge("diff", 11)) eff = eff.root(new Decimal(challengeCompletions("diff", 11)).add(2).min(6))
				   if(player.n.total >= 1) eff = eff.mul(layers.n.effect())
				   return eff},
		effectDescription() { return "multiplying diff gain in all functions by " + format(this.effect()) + "." },
        baseAmount() {return player.diff.points},    // A function to return the current value of that resource

        gainMult() {                            // Returns your multiplier to your gain of the prestige resource
            return new Decimal(1)               // Factor in any bonuses multiplying gain here
        },
        gainExp() {                             // Returns your exponent to your gain of the prestige resource
            return new Decimal(1)
        },

        layerShown() {return player.ab.points >= 2},             // Returns a bool for if this layer's node should be visible in the tree. 
		
		challenges: {
			rows: 3,
			cols: 2,
			11: {
				name() { if(challengeCompletions("diff", 11) == 0) return "diff's squared root"
				         if(challengeCompletions("diff", 11) == 1) return "diff's cubed root"
						 if(challengeCompletions("diff", 11) == 2) return "diff's tesseracted root"
						 if(challengeCompletions("diff", 11) == 3) return "diff's pentaractedroot"
						 if(challengeCompletions("diff", 11) >= 4) return "diff's hexeracted root"
				},
			    challengeDescription() { return "Roots the diff's effect by whatever the title says.<br/>Challenge completed: " + formatWhole(challengeCompletions("diff", 11)) + "/" + formatWhole(this.completionLimit) },
				goal: new Decimal(48000),
				completionLimit: new Decimal(5),
				rewardDescription: "nope.avi",
                currencyDisplayName: "plots",
                currencyInternalName: "points"
			},
			12: {
				name: "Dear god no...",
			    challengeDescription() { if(challengeCompletions("diff", 12) >= 1) return "Predicted boredom is passively generated by diff's effect to the power of " + formatWhole(challengeCompletions("diff", 12) + 1) + ", but it's effects are divided by themselves twice.<br/>Challenge completed: " + formatWhole(challengeCompletions("diff", 12)) + "/" + formatWhole(this.completionLimit)
				                         else return "Predicted boredom is passively generated by diff, but it's effects are divided by themselves twice.<br/>Challenge completed: " + formatWhole(challengeCompletions("diff", 12)) + "/" + formatWhole(this.completionLimit) },
				goal() { return new Decimal(4050).mul(new Decimal(challengeCompletions("diff", 12)).add(1).min(5).pow(1.1)) },
				completionLimit: new Decimal(5),
				rewardDescription: "A ticket to the \"TMT Kindergarten\".",
                currencyDisplayName: "plots",
                currencyInternalName: "points"
			},
			21: {
			    challengeDescription() { return "You get " + formatWhole(new Decimal(5).mul(-1).mul(new Decimal(challengeCompletions("diff", 21)).add(1).min(5))) + " softcap warpers in this challenge.<br/>Challenge completed: " + formatWhole(challengeCompletions("diff", 21)) + "/" + formatWhole(this.completionLimit) },
				name: "Anti-Motivation",
				goal: new Decimal(11400),
				completionLimit: new Decimal(5),
				rewardDescription: "An early access to Shenanigans Tree's NG--- mode.",
                currencyDisplayName: "plots",
                currencyInternalName: "points",
                unlocked() { return false }
			},
			22: {
				name: "No more hexagons.",
			    challengeDescription() { return "\"Supreme Hexagonity\" upgrade and everything it unlocks are non-existent, Shenanigans's requirement is also increased by " + format(new Decimal(1.5).mul(new Decimal(challengeCompletions("diff", 22)).add(1).min(5)).log(1.5).add(1).pow(3)) + "x.<br/>Challenge completed: " + formatWhole(challengeCompletions("diff", 22)) + "/" + formatWhole(this.completionLimit) },
				goal() { return new Decimal(10000000).mul(new Decimal(7.5).pow(new Decimal(challengeCompletions("diff", 22)).min(4))) },
				completionLimit: new Decimal(5),
				rewardDescription: "An oddly hyper realistic demonic hexagon.",
                currencyDisplayName: "shenanigans",
                currencyInternalName: "points",
                currencyLayer: "s"
			},
			31: {
				name: "NG--: HD Edition",
			    challengeDescription() { return "The NG--'s effect (dividing point gain) is 60x more powerful and achievements are non-existent in this challenge.<br/>Good luck beating it. >:]" },
				goal: new Decimal(96000),
				completionLimit: new Decimal(1),
				rewardDescription: "get w.i.p.'d lmao",
                currencyDisplayName: "plots",
                currencyInternalName: "points",
				unlocked() { return challengesCompleted() >= 20 }
			},
		},

    doReset(resettingLayer){ // Triggers when this layer is being reset, along with the layer doing the resetting. Not triggered by lower layers resetting, but is by layers on the same row.
        if(layers[resettingLayer].row >= layers[this.layer].row) {
		if(layers[resettingLayer] == layers.n && hasUpgrade("n", 12)) player.diff.points = player.diff.points
        else if(hasMilestone("a", 1)) player.diff.points = player.diff.points.div(2).max(1)
		else player.diff.points = new Decimal(1)
        }
    } 
})

addLayer("n", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
		total: new Decimal(0),
		yes: new Decimal(0),
    }},

    color: "#8A7983",                       // The color for this layer, which affects many elements.
    resource: "symbols",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).
	position: 0,

    baseResource: "shenanigans",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.s.points },  // A function to return the current amount of baseResource.
	
	effect() { return player.n.total.div(100).add(1) },
	
	update(diff) {
		if(hasUpgrade("n", 25)) player.k.yes = new Decimal(2)
		else if(hasUpgrade("n", 15)) player.k.yes = new Decimal(1)
		else player.k.yes = new Decimal(0)
	},
	
	midsection: ["blank",
	            ["display-text", function() { return "Your total symbols boosts diff's effect by " + format(layers.n.effect()) + "x."} ],
				"blank",
	            ["display-text", function() { return "Each completed row of upgrades increases symbol's exponent cost by +^0.5. The current cost exponent is ^" + format(new Decimal(2).add(new Decimal(0.5).mul(player.k.yes))) + "."} ],
	],

    requires() { if(hasUpgrade("k", 22)) return new Decimal(81611021.7).mul(0.9)
	             else return new Decimal(81611021.7)},              // The amount of the base needed to  gain 1 of the prestige currency.
	canBuyMax() { return false },

    type: "static",                         // Determines the formula used for calculating prestige currency.
	base: 1.16,
    exponent() { return new Decimal(2).add(new Decimal(0.5).times(player.k.yes)) },                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns your exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
	
	branches: ["s"],

    layerShown() { return challengeCompletions("diff", 11) >= 1 && challengeCompletions("diff", 12) >= 1 && challengeCompletions("diff", 22) >= 1},            // Returns a bool for if this layer's node should be visible in the tree.
	
	upgrades: {
        rows: 3,
        cols: 5,
        11: {
            title: "We're",
            description: "Boosts plot gain based on Neverup upgrades bought.",
            cost: new Decimal(5),
			effect() { return new Decimal(1.5).pow(player.n.upgrades.length) },
			effectDisplay() { return format(this.effect()) + "x" }
        },
        12: {
            title: "no",
            description: "Neverup reset doesn't reset diff points.",
            cost: new Decimal(2),
			unlocked() { return hasUpgrade("n", 11) }
        },
        13: {
            title: "strangers",
            description: "Fulfill 2nd diff challenge's reward yourself.",
            cost: new Decimal(9),
			unlocked() { return hasUpgrade("n", 12) }
        },
        14: {
            title: "to",
            description() { return "Your total symbols adds up to diff challenge completions's base effect by +" + format(player.n.total.div(50)) + "." },
            cost: new Decimal(2),
			unlocked() { return hasUpgrade("n", 13) }
        },
        15: {
            title: "love",
            description: "With the power of love, \"Vibing.\"'s softcap starts later.<br/>(2,048x => 28,672x)",
            cost: new Decimal(4),
			unlocked() { return hasUpgrade("n", 14) }
        },
        21: {
            title: "You",
            description: "Total symbols's effect affects experience gain",
            cost: new Decimal(3),
			unlocked() { return hasUpgrade("n", 15) }
        },
        22: {
            title: "know",
            description: "Total symbols's effect affects knowledge gain",
            cost: new Decimal(4),
			unlocked() { return hasUpgrade("n", 21) }
        },
        23: {
            title: "the rules",
            description: "Experience DO give some benefits outside Knowledge layer.<br/>(note: you'll find out anyways).",
            cost: new Decimal(8),
			unlocked() { return hasUpgrade("n", 22) }
        },
        24: {
            title: "and",
            description: "Neverup reset doesn't reset shenanigans.",
            cost: new Decimal(3),
			unlocked() { return hasUpgrade("n", 25) }
        },
        25: {
            title: "so do I",
            description: "With the power of love, \"Vibing.\"'s softcap starts later.<br/>(2,048x => 28,672x)",
            cost: new Decimal(5),
			unlocked() { return hasUpgrade("n", 24) }
        },
        31: {
            title: "A full",
            description: "With the power of love, \"Vibing.\"'s softcap starts later.<br/>(2,048x => 28,672x)",
            cost: new Decimal(5),
			unlocked() { return hasUpgrade("n", 25) }
        },
        32: {
            title: "commitment's",
            description: "With the power of love, \"Vibing.\"'s softcap starts later.<br/>(2,048x => 28,672x)",
            cost: new Decimal(11),
			unlocked() { return hasUpgrade("n", 31) }
        },
	},
    doReset(resettingLayer){ // Triggers when this layer is being reset, along with the layer doing the resetting. Not triggered by lower layers resetting, but is by layers on the same row.
        if(layers[resettingLayer] == layers.n) {
        if(!hasUpgrade("n", 24)) player.s.points = new Decimal(0)
        }
    },
})

addLayer("k", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
		experiences: new Decimal(0),
    }},

    color: "#4BDC13",                       // The color for this layer, which affects many elements.
    resource: "knowledge",            // The name of this layer's main prestige resource.
    row: 1,                                 // The row this layer is on (0 is the first row).
	position: 0,

    update(diff){
		if (layers.k.layerShown() == true) {
	    hasUpgrade("n", 21) ? player.k.experiences = player.k.experiences.add(new Decimal(diff).div(100).mul(layers.n.effect())) : player.k.experiences = player.k.experiences.add(diff / 100)
		if(hasUpgrade("k", 11)) hasUpgrade("n", 21) ? player.k.experiences = player.k.experiences.add(new Decimal(diff).div(100).mul(layers.n.effect())) : player.k.experiences = player.k.experiences.add(diff / 100)
		if(hasUpgrade("k", 12)) hasUpgrade("n", 21) ? player.k.experiences = player.k.experiences.add(new Decimal(diff).div(50).mul(layers.n.effect())) : player.k.experiences = player.k.experiences.add(diff / 50)
		if(hasUpgrade("k", 13)) hasUpgrade("n", 21) ? player.k.experiences = player.k.experiences.add(new Decimal(diff).div(20).mul(layers.n.effect())) : player.k.experiences = player.k.experiences.add(diff / 20)
		if(hasUpgrade("k", 21)) hasUpgrade("n", 21) ? player.k.experiences = player.k.experiences.add(new Decimal(diff / 100).mul(upgradeEffect("k", 21).mul(100).mul(layers.n.effect()))) : player.k.experiences = player.k.experiences.add(new Decimal(diff / 100).mul(upgradeEffect("k", 21).mul(100)));
		if(player.k.experiences >= 1) hasUpgrade("k", 23) ? player.k.points = player.k.points.add(player.k.experiences.div(69).mul(diff)) : player.k.points = player.k.points.add(player.k.experiences.div(100).mul(diff));
		}
	},

	tabFormat: [["display-text", function() { return "Welcome to the TMT Kindergarten, you little tiny babies. <br/> Today we're going to learn how to make your first mod, in which you'll throw all of your common senses into the trash and go crazy with your creativity. Cool, isn't it?<br/>Now where was I?.. Oh yeah, do your homework or some @$@! yourself, I'm not your personal teacher." }],
	            "blank",
	            "main-display",
	           ["display-text", function() { return hasUpgrade("n", 23) ? "You have " + format(player.k.experiences) + " experiences, boosting point gain in any challenges by " + format(player.k.experiences.log(10)) + "x" : "You have " + format(player.k.experiences) + " experiences. Not like you'll need it anyways, unless..." }],
			   "blank",
               ["display-text", function() { return player.k.experiences >= 1 && hasUpgrade("k", 23) ? "You're generating " + format(player.k.experiences.div(69)) + " knowledges per second." : player.k.experiences >= 1 ? "You're generating " + format(player.k.experiences.div(100)) + " knowledges per second." : "" }],
			   "upgrades"],			   

    type: "none",                         // Determines the formula used for calculating prestige currency.

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns your exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return hasUpgrade("n", 13) },            // Returns a bool for if this layer's node should be visible in the tree.
	
	upgrades: {
		rows: 2,
		cols: 5,
		11: {
			title: "Read Acamaeda's tutorial",
			description: "You gain 0.01 more experience per second.",
			cost: new Decimal(1)
		},
		12: {
			title: "Download Github Desktop",
			description: "You gain 0.02 more experience per second.",
			cost: new Decimal(1),
			unlocked() { return hasUpgrade("k", 11) }
		},
		13: {
			title: "Read Acamaeda's documentation and experiment",
			description: "You gain 0.05 more experience per second.",
			cost: new Decimal(1),
			unlocked() { return hasUpgrade("k", 12) }
		},
		14: {
			title: "Programm your first upgrade",
			description: "Creates a single upgrade nearby.",
			cost: new Decimal(5),
			unlocked() { return hasUpgrade("k", 13) }
		},
		15: {
			title: "Accept row's existence",
			description: "Creates three upgrades on the 2nd row.",
			cost: new Decimal(17),
			unlocked() { return hasUpgrade("k", 14) }
		},
		21: {
			title: "\"Apes together strong\"",
			description: "You gain 0.01 more experience per second for each Kindergarten upgrade bought.",
			cost: new Decimal(1),
			effect() { return new Decimal(player.k.upgrades.length).div(100) },
			effectDisplay() { return "+" + format(this.effect()) },
			unlocked() { return hasUpgrade("k", 15) }
		},
		22: {
			title: "The less the better",
			description: "Lowers Symbol's initial cost.<br/>(100% => 90%)",
			cost: new Decimal(2),
			unlocked() { return hasUpgrade("k", 15) }
		},
		23: {
			title: "Optimization",
			description: "You learn how to use ?, : and !, buffing your knowledge gain. It also creates two more upgrades on 2nd row. [W.I.P.]",
			cost: new Decimal(1),
			unlocked() { return hasUpgrade("k", 15) }
		},
	}
})
