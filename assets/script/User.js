cc.Class({
    extends: cc.Component,

    properties: {
        nameLabel: {
            default: null,
            type: cc.Label,
        },
        stateLabel: {
            default: null,
            type: cc.Label,
        },
    },

    instanceUser(user) {
        this.nameLabel.string = user.name;
        this.stateLabel.string = user.state;
    }

});
