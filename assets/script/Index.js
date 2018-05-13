import api, { FETCH_FRIENDS_RESULT } from './API';

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
        userPrefab: {
            default: null,
            type: cc.Prefab,
        },
    },

    // use this for initialization
    onLoad() {
        this.initSocket();
    },

    onLogin() {
        let self = this;
        G.indexSocket.on(api.RESULT_LOGIN, (data) => {
            console.log(data);
            if (data.code === 200 && data.state === "onLine") {
                G.userInfo = data.userInfo;
                self.loginBoard.active = false;
            }
        });
        G.indexSocket.on(api.INDEX_INFO, (data) => {
            console.log(data)
            if (data.code === 200) {
                self.updateUserListView(data.users);
            }
        });

        const userNickName = this.userName.string;
        G.userInfo = { "name": userNickName };
        G.indexSocket.emit(api.LOGIN, G.userInfo);
    },

    onLogout() {
        G.indexSocket.on('logout result', (data) => {
            if (data === 200) {
                if (data.state === 0) {
                    G.indexSocket.disconnect();
                }
            }
        });
        G.indexSocket.emit('logout', userNickName);
    },

    onMatchFriends() {
        this.usersBoard.active = true;
    },

    onCloseUserBoard(){
        this.usersBoard.active = false;
    },

    onMatchMachine() {
        const actionFadeOut = cc.fadeOut(1);
        this.matchBoard.runAction(actionFadeOut);
        this.scheduleOnce(() => {
            cc.director.loadScene('Ulanqab');
        }, 0.5);
    },

    initSocket: function () {
        let self = this;
        G.globalSocket = io.connect(api.BASE);
        G.indexSocket = io.connect(api.INDEX, { 'force new connection': true });
    },

    updateUserListView(userList) {
        if (userList === undefined || userList === null) {
            return;
        }
        userList.map((userItem, index) => {
            function onTouchStart(event) {
                console.log('touch start');
            }
            function onTouchEnd(event) {
                console.log('touch end');
            }
            let user = cc.instantiate(this.userPrefab);
            user.on(cc.Node.EventType.TOUCH_START, onTouchStart, this);
            user.on(cc.Node.EventType.TOUCH_END, onTouchEnd, this);
            user.data = userItem;
            user.getComponent('User').instanceUser(userItem);
            this.userListView.content.addChild(user);
        });
    },

});
