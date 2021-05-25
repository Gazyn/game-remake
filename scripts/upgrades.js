upgrades = {
    dmg: new Upgrade({
        name: "Damage",
        buttonName: "dmg",
        user: ["archer", "dmg"],
        maxLevel: 10,
        effectCalc: function(n){return 2**n}
    }),
    critPower: new Upgrade({
        name: "Crit Power",
        buttonName: "crit power",
        user: ["archer", "critPower"],
        maxLevel: 50,
        effectCalc: function(n){return n*(n+1)/2},
        costCalc: function(n){return 10**n},
        displayStyle: "+X% name",
        tooltipCalc: function(start, end) {return this.effectCalc(this.bought)+"% -> "+this.effectCalc(this.bought+player.bulkAmount)+"%"}
    }),
    goldBonus: new Upgrade({
        name: "Gold Bonus",
        buttonName: "gold",
        user: ["player", "goldBonus"],
        maxLevel: 100,
        effectCalc: function(n){return Math.round((Math.log(n+1)**3+1.7)*100)/100},
        costCalc: function(n){return 2**(n**0.7)},
        displayStyle: "+X% name",
        tooltipCalc: function(start, end) {return Math.round(this.effectCalc(this.bought)*100)/100+"% -> "+Math.round(this.effectCalc(this.bought+player.bulkAmount)*100)/100+"%"}
    })
}


for(let i in upgrades) {
    upgrades[i].createButton(document.querySelector("#holder"));
}