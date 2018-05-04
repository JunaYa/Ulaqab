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
            default: EMPTY,
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
    },

    start() {

    },

    instancePiece(x, y, role) {
        this.x = x;
        this.y = y;
        this.role = role;
        this.node.x = x;
        this.node.y = y;
        switch (role) {
            case NONE:
                break;
            case EMPTY:
                break;
            case WOLF:
                this.node.color = cc.Color.BLACK;
                this.node.opacity = 255;
                break;
            case SHEEP:
                this.node.color = cc.Color.BLUE;
                this.node.opacity = 255;
                break;
            default:
                break;
        }
    }


});
