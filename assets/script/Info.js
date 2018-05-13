cc.Class({
    extends: cc.Component,

    properties: {
        sheepResidueCount: {
            default: null,
            type: cc.Label,
        },
    },

    start() {
        this.sheepResidueCountLabel = this.sheepResidueCount.getComponent(cc.Label);
    },

    update(dt) {
        this.sheepResidueCountLabel.string = `剩余 ${G.residueSheepCount} 只🐑可用`;
    },
});
