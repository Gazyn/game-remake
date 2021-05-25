class Upgrade {
    constructor(all) {
        for(let i in all) {
            this[i]=all[i];
        }
        if(this.name === undefined) {this.name = "Unnamed Upgrade"};
        if(this.buttonName === undefined) {this.buttonName = "unnamed"};
        if(this.user === undefined) {this.user = ['bruh']};

        if(this.unlockLevel === undefined) {this.unlockLevel = 1};
        if(this.unlockFunc === undefined) {this.unlockFunc = function(){return true}}; //Both level and function must be met to unlock

        if(this.showLevel === undefined) {this.showLevel = this.unlockLevel-2};
        if(this.showFunc === undefined) {this.showFunc = function(){return false}}; //Either level or function must be met to show

        if(this.bought === undefined) {this.bought = 0};
        if(this.maxLevel === undefined) {this.maxLevel = Infinity};

        if(this.costCalc === undefined) {this.costCalc = function(n){return n}};
        if(this.effectCalc === undefined) {this.effectCalc = function(n){return 1+n}};

        if(this.iconPath === undefined) {this.iconPath = this.user.toString().replace(/,/g, "")}; //takes the user array and reads it completely straight
        this.iconPath = "assets/"+this.iconPath+".png";

        if(this.tooltipCalc === undefined) {this.tooltipCalc = function(start, end) {return this.effectCalc(this.bought)+" -> "+this.effectCalc(this.bought+player.bulkAmount)}};
        if(this.displayStyle === undefined) {this.displayStyle = "+X name"}
        
        this.buttonDom = "placeholder";
        this.createButton = function(div) {
            let btn = document.createElement("button");
            btn.textContent = "what's up";
            let remember = this; //must use remember instead of this because this becomes the button itself after the function is finished
            btn.onclick = function(){remember.buyUpgrade()};

            if(this.domClasses !== undefined) {btn.className += " "+this.domClasses};
            div.appendChild(btn);
            this.buttonDom = btn;
            this.update();
            this.updateStat();
        }

        this.cost = 0;
        this.effect = 0;

        this.update = function() {
            this.cost = Math.floor(this.costCalc(this.bought));
            this.effect = this.effectCalc(this.bought);
            this.buttonDom.textContent = this.displayStyle.replace("X", Math.round((this.effectCalc(this.bought+player.bulkAmount)-this.effectCalc(this.bought))*1e8)/1e8).replace("name", this.buttonName)+"\n"+this.tooltipCalc()+"\nCost: "+this.cost;
            if(this.bought+player.bulkAmount>this.maxLevel) {
                this.bought = this.maxLevel;
                this.buttonDom.disabled = true;
            }
        }

        this.updateStat = function(value) {
            if(this.user.length === 2) {window[this.user[0]][this.user[1]] = value}
            else {window[this.user[0]] = value}
        }

        this.buyUpgrade = function(n) {
            if(this.bought+player.bulkAmount<=this.maxLevel) {
                this.bought += player.bulkAmount;
            } else {
                this.bought = this.maxLevel;
                this.buttonDom.disabled = true;
            }
            this.update();
            this.updateStat(this.effect);
        }
    }
}
