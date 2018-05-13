import {
    NONE,
    EMPTY,
    WOLF,
    SHEEP,
} from './Role';

cc.Class({
    extends: cc.Component,

    properties: {
        role: {
            default: NONE,
            type: cc.Integer,
        },
        x: {
            default: 0,
            type: cc.Integer,
        },
        y: {
            default: 0,
            type: cc.Integer,
        },
        pieceNode: {
            default: null,
            type: cc.Node,
        },
    },

    start() {
    },

    instancePiece(x, y, posX, posY, role) {
        const point = {
            x: x,
            y: y,
        }
        this.node.point = point;
        this.role = role;
        this.x = posX;
        this.y = posY;
        this.node.x = posX;
        this.node.y = posY;
        this.node.role = role;
        this.setRole(role);
    },

    setRole(role) {
        switch (role) {
            case NONE:
                break;
            case EMPTY:
                this.pieceNode.color = cc.Color.WHITE;
                this.node.opacity = 0;
                break;
            case WOLF:
                this.pieceNode.color = cc.Color.BLACK;
                this.node.color = cc.Color.BLACK;
                this.node.opacity = 255;
                break;
            case SHEEP:
                this.pieceNode.color = cc.Color.BLUE;
                this.node.color = cc.Color.BLUE;
                this.node.opacity = 255;
                break;
            default:
                break;
        }
    },

    placeRole(role) {
        this.role = role;
        this.node.role = role;
        this.setRole(role);
    },

    activate() {
        this.node.color = cc.Color.YELLOW;
    },

    rest() {
        this.node.color = this.pieceNode.color;
     },

    registerEventCallback(eventStart, eventEnd) {
        if (this.role === NONE) {
            return;
        }
        this.node.on(cc.Node.EventType.TOUCH_START, eventStart);
        this.node.on(cc.Node.EventType.TOUCH_END, eventEnd);
    }

});
