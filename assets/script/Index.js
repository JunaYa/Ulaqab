cc.Class({
    extends: cc.Component,

    properties: {
        loginBoard: {
            default: null,
            type: cc.Node,
        },
        userName: {
            default: null,
            type: cc.EditBox,
        },
        usersBoard: {
            default: null,
            type: cc.Node,
        },
        matchBoard: {
            default: null,
            type: cc.Node,
        },
        userListView: {
            default: null,
            type: cc.ScrollView,
        },
    },

    // use this for initialization
    onLoad: function () {
        
    },

    onLogin() {
        this.loginBoard.active = false;
    },

    onLogout: function () {

    },

    onMatchFriends() {
        const actionFadeOut = cc.fadeOut(1);
        this.matchBoard.runAction(actionFadeOut);
    },

    onMatchMachine() {
        const actionFadeOut = cc.fadeOut(1);
        this.matchBoard.runAction(actionFadeOut);
        this.scheduleOnce(() => {
            cc.director.loadScene('Ulanqab');
        }, 0.5);
    },
});
