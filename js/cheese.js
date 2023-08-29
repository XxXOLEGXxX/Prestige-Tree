addLayer("cheese", {
    name: "cheese", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        badCheese: new Decimal(0),
        goodCheese: new Decimal(0),
        cycle: new Decimal(0),
        activity: new Decimal(0),
        bruh: new Decimal(0),
        bruh2: new Decimal(0),
        hunger: new Decimal(5),
        unlocked2: false,
        blessings: new Decimal(0),
        goodBlessings: new Decimal(0),
        currentState: 0,
    }},
    state: [
        ["Neutral", "(No buffs or nerfs are applied)"],
        ["Intrigued", "(x1.1 🧀 gain)"],
        ["Entertained", "(^1.1 🧀 gain)"],
        ["Hunger", "(x0.25 🧀 gain)"],
        ["Satisfaction", "(x1.75 🧀 gain and ???)"],
        ["Boredom", "(x0.8 🧀 gain)"],
        ["Annoyance", "(x0.5 point and 🧀 gain)"],
        ["metal pipe", "(x0 🧀 gain)"],
        ["Entertained...?", "(^0.85 🧀 gain and you can't sacrifice for one minute)"],
    ],
    color: "rgb(255,217,131)",
    requires: new Decimal(10),
    resource: "🧀",
    type: "none",
    bars: {
        feedMe: {
            direction: RIGHT,
            width: 375,
            height: 100,
            progress() { return player.cheese.hunger.div(10) },
            display(){
                return "<h2>Hunger Meter:<br>"+formatWhole(player.cheese.hunger)+"/5"
            },
            fillStyle(){
                return {'background-color': 'brown'}
            }
        }
    },
    upgrades:{
        a0:{
            fullDisplay: `<h3 style='font-family: Bahnschrift SemiBold;'>Downfall</h2><br>
                          <span style='font-family: Bahnschrift SemiBold;'>"It's best if you do not buy this upgrade, god who knows what might happen next."<br>(x4 🧀 gain)<br><br>Cost: 1 blessing`,
            cost: new Decimal(1),
            canAfford(){return player.cheese.blessings.gte(this.cost)},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
            onPurchase(){player.cheese.upgrades.push('a0')},
            style(){
                return {
                    'border': '5px solid',
                    'border-radius': '25%',
                    'border-color': (this.canAfford()&&!hasUpgrade("cheese", this.id)?'rgb(255,172,51)' : ''),
                    'color': (this.canAfford()&&!hasUpgrade("cheese", this.id)?'rgb(244,144,12)' : '')
                }
            }
        },
        b0:{
            fullDisplay(){
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Self-Irony</h2><br>
                        <span style='font-family: Bahnschrift SemiBold;'>"I told you to not buy this!... Oh well, might as well go full-on zaburple mode"<br>(Blessings boost 🧀 gain by x${format(this.effect())})<br><br>Cost: ${formatWhole(this.cost())} blessings`
            },
            effect(){
                return player.cheese.blessings.add(1).log(777).add(1)
            },
            cost(){
                return new Decimal(hasUpgrade("cheese", "b1")?30:10)
            },
            canAfford(){return player.cheese.blessings.gte(this.cost())},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
            onPurchase(){player.cheese.upgrades.push('b0')},
            unlocked(){return hasUpgrade("cheese", "a0")},
            branches: [["a0", "rgb(255,217,131)"]],
            style(){
                return {
                    'border': '5px solid',
                    'border-radius': '25%',
                    'border-color': (this.canAfford()&&!hasUpgrade("cheese", this.id)?'rgb(255,172,51)' : ''),
                    'color': (this.canAfford()&&!hasUpgrade("cheese", this.id)?'rgb(244,144,12)' : '')
                }
            }
        },
        b1:{
            fullDisplay(){
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Permabooster</h2><br>
                        <span style='font-family: Bahnschrift SemiBold;'>"I heard your sacrifices are pretty strong. Let me fight them."<br>(You can sacrifice your blessings for additional 🧀 gain boost)<br><br>Cost: ${formatWhole(this.cost())} blessings`
            },
            cost(){
                return new Decimal(hasUpgrade("cheese", "b0")?30:10)
            },
            canAfford(){return player.cheese.blessings.gte(this.cost())},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
            onPurchase(){player.cheese.upgrades.push('b1')},
            unlocked(){return hasUpgrade("cheese", "a0")},
            branches: [["a0", "rgb(255,217,131)"]],
            style(){
                return {
                    'border': '5px solid',
                    'border-radius': '25%',
                    'border-color': (this.canAfford()&&!hasUpgrade("cheese", this.id)?'rgb(255,172,51)' : ''),
                    'color': (this.canAfford()&&!hasUpgrade("cheese", this.id)?'rgb(244,144,12)' : '')
                }
            }
        },
        c0:{
            fullDisplay(){
                return `<h3 style='font-family: Bahnschrift SemiBold;'>God Forsaken Feedback</h2><br>
                        <span style='font-family: Bahnschrift SemiBold;'>"why would you do this to me bruh"<br>(🧀 boost blessing gain by x${format(this.effect())})<br><br>Cost: ${formatWhole(this.cost())} blessings`
            },
            effect(){
                return player.cheese.points.root(10).add(1).log(10).add(1)
            },
            cost(){
                return new Decimal(hasUpgrade("cheese", "c2")?100:60)
            },
            canAfford(){return player.cheese.blessings.gte(this.cost())},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
            onPurchase(){player.cheese.upgrades.push('c0')},
            unlocked(){return hasUpgrade("cheese", "b0")},
            branches: [["b0", "rgb(255,217,131)"]],
            style(){
                return {
                    'border': '5px solid',
                    'border-radius': '25%',
                    'border-color': (this.canAfford()&&!hasUpgrade("cheese", this.id)?'rgb(255,172,51)' : ''),
                    'color': (this.canAfford()&&!hasUpgrade("cheese", this.id)?'rgb(244,144,12)' : '')
                }
            }
        },
        c1:{
            fullDisplay(){
                return `<h3 style='font-family: Bahnschrift SemiBold;'>THIS IS THE END</h2><br>
                        <span style='font-family: Bahnschrift SemiBold;'>"i'll add upgrades later brb"<br>(Does nothing for now)<br><br>Cost: 2,020 blessings`
            },
            effect(){
                return player.cheese.blessings.add(1).log(777).add(1)
            },
            cost(){
                return new Decimal(2020)
            },
            canAfford(){return player.cheese.blessings.gte(this.cost())},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
            onPurchase(){player.cheese.upgrades.push('c1')},
            unlocked(){return hasUpgrade("cheese", "c0") && hasUpgrade("cheese", "c2")},
            branches: [["c0", "rgb(255,217,131)"], ["c2", "rgb(255,217,131)"]],
            style(){
                return {
                    'border': '5px solid',
                    'border-radius': '25%',
                    'border-color': (this.canAfford()&&!hasUpgrade("cheese", this.id)?'rgb(255,172,51)' : ''),
                    'color': (this.canAfford()&&!hasUpgrade("cheese", this.id)?'rgb(244,144,12)' : '')
                }
            }
        },
        c2:{
            fullDisplay(){
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Cheesy Synchronization</h2><br>
                        <span style='font-family: Bahnschrift SemiBold;'>"An approriate name for such silly upgrade"<br>(Sacrificed blessings affect 🧀 buildings as well)<br><br>Cost: ${formatWhole(this.cost())} blessings`
            },
            effect(){
                return player.cheese.blessings.add(1).log(777).add(1)
            },
            cost(){
                return new Decimal(hasUpgrade("cheese", "c0")?100:60)
            },
            canAfford(){return player.cheese.blessings.gte(this.cost())},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
            onPurchase(){player.cheese.upgrades.push('c2')},
            unlocked(){return hasUpgrade("cheese", "b1")},
            branches: [["b1", "rgb(255,217,131)"]],
            style(){
                return {
                    'border': '5px solid',
                    'border-radius': '25%',
                    'border-color': (this.canAfford()&&!hasUpgrade("cheese", this.id)?'rgb(255,172,51)' : ''),
                    'color': (this.canAfford()&&!hasUpgrade("cheese", this.id)?'rgb(244,144,12)' : '')
                }
            }
        },
    },
    update(diff){
        player.cheese.points = player.cheese.points
                               .add(tmp.cheese.cheeseGain.mul(diff))
        if(player.offTime == undefined) player.cheese.cycle = player.cheese.cycle.add(diff)
        if(player.cheese.cycle.gte(60)){
            player.cheese.cycle = Decimal.dZero
            player.cheese.hunger = player.cheese.hunger
                                   .sub(1)
                                   .max(0)
            player.cheese.currentState = Math.ceil(Math.random()*60)==21?7:
                                      player.cheese.activity.gte(30)&&player.cheese.currentState==1&&player.cheese.bruh2.gte(player.cheese.activity.div(3))?8:
                                      player.cheese.bruh.gte(6)?6:
                                      player.cheese.hunger.gte(6)?4:
                                      player.cheese.hunger.lte(0)?3:
                                      player.cheese.activity.gte(30)&&(player.cheese.currentState==1||player.cheese.currentState==2||player.cheese.currentState==4)?2:
                                      player.cheese.activity.gte(10)||player.cheese.currentState==2?1:
                                      player.cheese.activity.eq(0)||(player.cheese.bruh.gte(player.cheese.activity.div(3)))?5:
                                      0
            player.cheese.activity = Decimal.dZero
            player.cheese.bruh = Decimal.dZero
            player.cheese.bruh2 = Decimal.dZero
            if(new Decimal(Math.random()*60).ceil().eq(21)) player.cheese.currentState = 7
        }
    },
    cheeseGain(){
        return player.cheese.currentState==7?new Decimal(0):
                                          tmp.cheese.buyables[11].effect
                                              .mul(tmp.cheese.buyables[12].effect)
                                              .mul(tmp.cheese.buyables[13].effect)
                                              .mul(tmp.cheese.buyables[21].effect)
                                              .mul(tmp.cheese.buyables[22].effect)
                                              .mul(player.cheese.currentState==6?0.5:
                                                   player.cheese.currentState==4?1.75:
                                                   player.cheese.currentState==3?0.25:
                                                   player.cheese.currentState==1?1.1:
                                                   1)
                                              .mul(hasUpgrade("cheese", "a0")?4:
                                                   1)
                                              .mul(hasUpgrade("cheese", "b0")?tmp.cheese.upgrades["b0"].effect:
                                                   1)
                                              .pow(player.cheese.currentState==8?0.85:
                                                   player.cheese.currentState==2?1.1:
                                                   1)
    },
    buyables:{
        feed:{
            title: "Feed la creatura",
            cost(){
                let cost = player.cheese.buyables["feed"]
                           .add(1)
                           .mul(1000)
                if(tmp.cheese.cheeseGain.gte(cost)) cost = cost.mul(tmp.cheese.cheeseGain.div(cost).pow(1.6))
                return cost
            },
            canAfford(){
                return player.cheese.points.gte(this.cost())&&player.cheese.hunger.lt(10)
            },
            buy(){
                player.cheese.points = player.cheese.points
                                       .sub(this.cost())
                player.cheese.buyables["feed"] = player.cheese.buyables["feed"]
                                                 .add(1)
                player.cheese.hunger = player.cheese.hunger
                                       .add(1)
                player.cheese.activity = player.cheese.activity
                                         .add(1)
            },
            display(){
                return `Requirement: ${format(this.cost())} 🧀`
            },
            style(){
                return {
                    'height': '80px',
                    'border-color': 'rgba(0,0,0,0.125)',
                    'background-color':(this.canAfford()?'#006080' : '')
                }
            },
        },
        prestige:{
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Ascend",
            canAfford(){
                return player.cheese.points.gte(1000000)
            },
            gain(){
                return player.cheese.points
                       .div(1000000)
                       .root(2.95305888531)
                       .mul(hasUpgrade("cheese", "c0")?tmp.cheese.upgrades["c0"].effect:1)
                       .floor()
            },
            getNextAt(){
                return this.gain()
                           .add(1)
                           .div(hasUpgrade("cheese", "c0")?tmp.cheese.upgrades["c0"].effect:1)
                           .pow(2.95305888531)
                           .mul(1000000)
                           .max(1000000)
            },
            buy(){
                let gain = player.cheese.blessings
                           .add(this.gain())
                let keep = [
                           player.cheese.cycle,
                           player.cheese.activity.add(1),
                           player.cheese.bruh,
                           player.cheese.hunger,
                           player.cheese.currentState,
                           player.cheese.buyables["feed"],
                           player.cheese.upgrades,
                           player.cheese.buyables[22],
                           player.cheese.goodBlessings
                           ]
                layerDataReset("cheese")
                player.cheese.cycle = keep[0]
                player.cheese.activity = keep[1]
                player.cheese.bruh = keep[2]
                player.cheese.hunger = keep[3]
                player.cheese.currentState = keep[4]
                player.cheese.buyables["feed"] = keep[5]
                player.cheese.upgrades = keep[6]
                player.cheese.buyables[22] = keep[7]
                player.cheese.goodBlessings = keep[8]
                player.cheese.blessings = gain
                player.cheese.unlocked2 = true
            },
            display(){
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Abandon all of your progress and be blessed by Cheese Overlord in return, gaining +${formatWhole(this.gain())} blessings<br><br>You may be blessed further once you have ${formatWhole(this.getNextAt())} 🧀`
            },
            style(){
                return {
                    'height': '150px',
                    'width': '350px',
                    'border': '5px solid',
                    'border-radius': '300px',
                    'border-color': (this.canAfford()?'rgb(255,172,51)' : ''),
                    'color': (this.canAfford()?'rgb(244,144,12)' : '')
                }
            }
        },
        11:{
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Cheese Generator",
            cost(){
                return player.cheese.buyables[11]
                       .mul(player.cheese.buyables[11]
                       .add(1))
                       .pow(1.15)
                       .pow(player.cheese.buyables[11].gte(100)?player.cheese.buyables[11]
                                                                .sub(100)
                                                                .mul(0.015)
                                                                .add(1):1)
            },
            canAfford(){
                return player.cheese.points.gte(this.cost())
            },
            effect(){
                return player.cheese.buyables[11].mul(hasUpgrade("cheese", "c2")?tmp.cheese.buyables[22].effect:1)
            },
            buy(){
                player.cheese.points=player.cheese.points
                                     .sub(this.cost())
                player.cheese.buyables[11]=player.cheese.buyables[11]
                                           .add(1)
                player.cheese.activity=player.cheese.activity
                                       .add(1)
            },
            display(){
                return `<h3 style='font-family: Bahnschrift SemiBold;'>You currently gain ${format(this.effect())} 🧀/sec<br>Amount: ${formatWhole(player.cheese.buyables[this.id])}<br>Cost: ${format(this.cost())} 🧀`
            },
            style(){
                return {
                    'height': '112px',
                    'border': '5px solid',
                    'border-radius': '112px',
                    'border-color': (this.canAfford()?'rgb(255,172,51)' : ''),
                    'color': (this.canAfford()?'rgb(244,144,12)' : '')
                }
            }
        },
        12:{
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Cheddar Generalizer",
            cost(){
                return new Decimal(400)
                           .mul(Decimal.pow(1.15, player.cheese.buyables[12].pow(1.3)))
                           .pow(player.cheese.buyables[12].gte(100)?player.cheese.buyables[12]
                                                                    .sub(100)
                                                                    .mul(0.03)
                                                                    .add(1):1)
            },
            canAfford(){
                return player.cheese.points.gte(this.cost())
            },
            effect(){
                return Decimal.pow(1.15, player.cheese.buyables[12]).mul(hasUpgrade("cheese", "c2")?tmp.cheese.buyables[22].effect:1)
            },
            buy(){
                player.cheese.points = player.cheese.points
                                       .sub(this.cost())
                player.cheese.buyables[12] = player.cheese.buyables[12]
                                             .add(1)
                player.cheese.activity = player.cheese.activity
                                         .add(1)
            },
            display(){
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Multiplies 🧀 gain by x${format(this.effect())}<br>Amount: ${formatWhole(player.cheese.buyables[this.id])}<br>Cost: ${format(this.cost())} 🧀`
            },
            style(){
                return {
                    'height': '112px',
                    'border': '5px solid',
                    'border-radius': '112px',
                    'border-color': (this.canAfford()?'rgb(255,172,51)' : ''),
                    'color': (this.canAfford()?'rgb(244,144,12)' : '')
                }
            }
        },
        13:{
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Chevre Graduator",
            cost(){return new Decimal(8000)
                              .mul(Decimal.pow(4, player.cheese.buyables[13].pow(1.45)))
                              .pow(player.cheese.buyables[13].gte(100)?player.cheese.buyables[13]
                                                                       .sub(100)
                                                                       .mul(0.045)
                                                                       .add(1):1)
            },
            canAfford(){return player.cheese.points.gte(this.cost())},
            effect(){
                return Decimal.pow(new Decimal(2).root(new Decimal(10).root(player.cheese.points.max(1).root(10))), player.cheese.buyables[13]).mul(hasUpgrade("cheese", "c2")?tmp.cheese.buyables[22].effect:1)
            },
            buy(){
                player.cheese.points = player.cheese.points
                                       .sub(this.cost())
                player.cheese.buyables[13] = player.cheese.buyables[13]
                                             .add(1)
                player.cheese.activity = player.cheese.activity
                                         .add(1)
            },
            display(){
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Multiplies 🧀 gain by x${format(this.effect())} based on 🧀<br>Amount: ${formatWhole(player.cheese.buyables[this.id])}<br>Cost: ${format(this.cost())} 🧀`
            },
            style(){
                return {
                    'height': '112px',
                    'border': '5px solid',
                    'border-radius': '112px',
                    'border-color': (this.canAfford()?'rgb(255,172,51)' : ''),
                    'color': (this.canAfford()?'rgb(244,144,12)' : '')
                }
            }
        },
        21:{
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Sacrifice all of your 🧀 to Cheese Overlord",
            canAfford(){
                return player.cheese.points.gt(0)&&!(tmp.cheese.state==8)
            },
            effect(){
                return player.cheese.goodCheese
                       .add(1)
                       .log(7)
                       .add(1)
                       .max(1)
            },
            buy(){
                player.cheese.goodCheese = player.cheese.goodCheese.add(player.cheese.points)
                player.cheese.points = Decimal.dZero
                player.cheese.activity = player.cheese.activity
                                         .add(1)
                player.cheese.bruh2 = player.cheese.bruh2
                                      .add(1)
            },
            display(){
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Multiplies 🧀 gain by x${format(this.effect())}<br>You'll gain +x${format(player.cheese.points.add(player.cheese.goodCheese).add(1).log(7).add(1).sub(this.effect()).max(0))} upon sacrifice<br>You sacrificed ${format(player.cheese.goodCheese)} 🧀`
            },
            style(){
                return {
                    'height': '144px',
                    'width': '256px',
                    'border': '5px solid',
                    'border-radius': '144px',
                    'border-color': (this.canAfford()?'rgb(255,172,51)' : ''),
                    'color': (this.canAfford()?'rgb(244,144,12)' : '')
                }
            }
        },
        22:{
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Sacrifice all of your blessings to Cheese Overlord",
            canAfford(){
                return player.cheese.blessings.gt(0)&&!(tmp.cheese.state==8)
            },
            effect(){
                return player.cheese.goodBlessings
                       .add(1)
                       .log(77)
                       .add(1)
                       .max(1)
            },
            buy(){
                player.cheese.goodBlessings = player.cheese.goodBlessings.add(player.cheese.blessings)
                player.cheese.blessings = Decimal.dZero
                player.cheese.activity = player.cheese.activity
                                         .add(1)
            },
            display(){
                return `<h3 style='font-family: Bahnschrift SemiBold;'>Permanently multiplies 🧀 gain by x${format(this.effect())}<br>You'll gain +x${format(player.cheese.blessings.add(player.cheese.goodBlessings).add(1).log(77).add(1).sub(this.effect()).max(0))} upon sacrifice<br>You sacrificed ${format(player.cheese.goodBlessings)} blessings`
            },
            style(){
                return {
                    'height': '150px',
                    'width': '300px',
                    'border': '5px solid',
                    'border-radius': '144px',
                    'border-color': (this.canAfford()?'rgb(255,172,51)' : ''),
                    'color': (this.canAfford()?'rgb(244,144,12)' : '')
                }
            },
            unlocked(){
                return hasUpgrade("cheese", "b1")
            }
        },
        /*23:{ (not needed rn)
            title: "<h3 style='font-family: Bahnschrift SemiBold;'>Sacrifice 🧀 to la creatura",
            canAfford(){return true},
            effect(){return player.cheese.badCheese.add(1).root(4)},
            buy(){
                player.cheese.badCheese=player.cheese.badCheese.add(player.cheese.points)
                player.cheese.points=new Decimal(0)
            },
            display(){return `<h3 style='font-family: Bahnschrift SemiBold;'>Permanently multiplies 🧀 gain by x${format(this.effect())}<br>You'll gain +x${format(player.cheese.badCheese.add(player.cheese.points).add(1).root(4).sub(this.effect()).max(0))} upon sacrifice`},
            style(){return {'height' : '160px','border' : '5px solid','border-radius' : '50px','border-color' : 'rgba(0,0,0,0.125)','background-color':(this.canAfford()?'#006080' : '')}},
            unlocked(){return false}
        },*/
    },
    tabFormat:{
        "La Creatura":{
            content: [
                ["display-text", () => `
                    <h2 style='font-family: Bahnschrift SemiBold;'>You have 
                    <h2 style='font-family: Bahnschrift SemiBold; color: ${tmp.cheese.color}; text-shadow: ${tmp.cheese.color} 0 0 5px;'>${formatWhole(player.cheese.points)} 
                    <h2 style='transform: scale(2, 2)'>🧀`
                    +(player.cheese.unlocked2?`<h2 style='font-family: Bahnschrift SemiBold;'> and 
                    <h2 style='font-family: Bahnschrift SemiBold; color: lightyellow; text-shadow: lightyellow 0 0 5px;'>${formatWhole(player.cheese.blessings)}
                    <h2 style='font-family: Bahnschrift SemiBold;'> blessings`:``)+(tmp.cheese.cheeseGain.gte(1)?
                    `<h4 style='font-family: Bahnschrift SemiBold;'>You gain ${format(tmp.cheese.cheeseGain)} 🧀/sec`:``)
                ],
                "blank",
                ["display-text", () => `
                    <h3 style='font-family: Bahnschrift SemiBold;'>AB's Current State:<br> 
                    <h2 style='font-family: Bahnschrift SemiBold;'> ${tmp.cheese.state[player.cheese.currentState][0]}<br>
                    <span style='font-family: Bahnschrift SemiBold;'>${tmp.cheese.state[player.cheese.currentState][1]}<br>Next cycle in ${formatWhole(new Decimal(60).sub(player.cheese.cycle).ceil())} seconds`
                ],
                "blank",
                "blank",
                ["tree", [["ab"]]],
                ["bar", "feedMe"],
                "blank",
                ["buyable", "feed"]
            ],
            buttonStyle(){
                return {
                    'color': 'rgb(0,48,64)',
                    'border-radius': '50px',
                    'border-color': 'rgb(0,84,112)',
                    'background-color': '#006080'
                }
            }
        },
        "Cheese":{
            content: [
                ["display-text", () => `
                    <h2 style='font-family: Bahnschrift SemiBold;'>You have 
                    <h2 style='font-family: Bahnschrift SemiBold; color: ${tmp.cheese.color}; text-shadow: ${tmp.cheese.color} 0 0 5px;'>${formatWhole(player.cheese.points)} 
                    <h2 style='transform: scale(2, 2)'>🧀`
                    +(player.cheese.unlocked2?`<h2 style='font-family: Bahnschrift SemiBold;'> and 
                    <h2 style='font-family: Bahnschrift SemiBold; color: lightyellow; text-shadow: lightyellow 0 0 5px;'>${formatWhole(player.cheese.blessings)}
                    <h2 style='font-family: Bahnschrift SemiBold;'> blessings`:``)+(tmp.cheese.cheeseGain.gte(1)?
                    `<h4 style='font-family: Bahnschrift SemiBold;'>You gain ${format(tmp.cheese.cheeseGain)} 🧀/sec`:``)
                ],
                "blank",
                ["buyables", [1]],
                "blank",
                ["buyable", [21]],
            ],
            buttonStyle(){
                return {
                    'color': 'rgb(244,144,12)',
                    'border-radius': '50px'
                }
            },
        },
        "Cheese Overlord's Heaven":{
            content: [
                ["display-text", () => `
                    <h2 style='font-family: Bahnschrift SemiBold;'>You have 
                    <h2 style='font-family: Bahnschrift SemiBold; color: ${tmp.cheese.color}; text-shadow: ${tmp.cheese.color} 0 0 5px;'>${formatWhole(player.cheese.points)} 
                    <h2 style='transform: scale(2, 2)'>🧀`
                    +(player.cheese.unlocked2?`<h2 style='font-family: Bahnschrift SemiBold;'> and 
                    <h2 style='font-family: Bahnschrift SemiBold; color: lightyellow; text-shadow: lightyellow 0 0 5px;'>${formatWhole(player.cheese.blessings)}
                    <h2 style='font-family: Bahnschrift SemiBold;'> blessings`:``)+(tmp.cheese.cheeseGain.gte(1)?
                    `<h4 style='font-family: Bahnschrift SemiBold;'>You gain ${format(tmp.cheese.cheeseGain)} 🧀/sec`:``)
                ],
                "blank",
                ["buyable", "prestige"],
                "blank",
                ["buyable", [22]],
                "blank",
                ["upgrade", ["a0"]],
                "blank",
                "blank",
                ["row", [
                    ["upgrade", ["b0"]],
                    "blank",
                    "blank",
                    ["upgrade", ["b1"]],
                ]],
                "blank",
                "blank",
                ["row", [
                    ["upgrade", ["c0"]],
                    "blank",
                    "blank",
                    ["upgrade", ["c1"]],
                    "blank",
                    "blank",
                    ["upgrade", ["c2"]],
                ]]
            ],
            buttonStyle(){
                return {
                    'color': 'rgb(244,144,12)',
                    'border-radius': '50px'
                }
            },
            unlocked(){
                return player.cheese.points.gte(1000000)||player.cheese.unlocked2
            },
        }
    },
    row: "side",
    nodeStyle(){
        return {
            'color': 'rgb(244,144,12)',
            'border-color': 'rgb(255,172,51)',
            'font-family': 'Bahnschrift SemiBold;'
        }
    },
    layerShown(){return true},
})

addNode("ab",{
    symbol: "AB",
    color: '#006080',
    layerShown() {return true},
    canClick() {return true},
    onClick() {player.cheese.bruh = player.cheese.bruh
                                    .add(1)
    },
    tooltip() {
        return player.cheese.currentState==8?"Thought you were slick, huh?":
               player.cheese.currentState==7?"shut up bozo<br>https://tenor.com/view/metal-pipe-gif-27050590<br>metal pipe":
               player.cheese.currentState==6?"bruh i ain't big cookie bro":
               player.cheese.currentState==5?". . .":
               player.cheese.currentState==4?"Hell yeah, dude! Here is your reward, as promised":
               player.cheese.currentState==3?"YOU.<br>🧀.<br>ME.<br>NOW.":
               player.cheese.currentState==2?"You're doing some pretty good progress, not gonna lie.":
               player.cheese.currentState==1?"Not bad...":
                                          "Oh, hey there.<br>I'm not quite sure how did I get here, but you don't have to worry about me...<br>Speaking of which. Could you get some 🧀 for me please?"
    },
    nodeStyle(){return{'border-radius' : '50%'}}
})
