import {
    NONE,
    EMPTY,
    WOLF,
    SHEEP,
} from './Role';

const ROW_COUNT = 9;
const COLUMN_COUNT = 5;

cc.Class({
    extends: cc.Component,

    properties: {
        startX: {
            default: 0,
            type: cc.Float,
        },
        startY: {
            default: 0,
            type: cc.Float,
        },
        chessBoardWidth: {
            default: 0,
            type: cc.Float,
        },
        chessBoardHeight: {
            default: 0,
            type: cc.Float,
        },
        margin: {
            default: 0,
            type: cc.Float,
        },
        PiecePrefab: {
            default: null,
            type: cc.Prefab,
        }
    },

    // use this for initialization
    onLoad: function () {
        this.initSize();
        this.scheduleOnce(() => {
            this.drawChessBoard();
            this.initPiecesLayout();
        }, 0.5);
    },

    // called every frame
    update: function (dt) { },

    initSize() {
        let width = cc.view.getVisibleSizeInPixel().width;
        let height = cc.view.getVisibleSizeInPixel().height;
        let tempItemWidth = width / (COLUMN_COUNT + 1);
        this.margin = tempItemWidth / 2;
        this.chessItemWidth = tempItemWidth;
        this.chessItemHeight = this.chessItemWidth;
        this.chessBoardWidth = this.chessItemWidth * COLUMN_COUNT; // draw rect
        this.chessBoardHeight = this.chessItemHeight * COLUMN_COUNT;

        this.startX = tempItemWidth / 2;
        this.node.height = this.chessBoardHeight + 4 * tempItemWidth;
    },

    drawChessBoard() {
        let painter = this.getComponent(cc.Graphics);
        if (painter === null) {
            this.node.addComponent(cc.Graphics);
            painter = this.getComponent(cc.Graphics);
        }

        painter.strokeColor = cc.Color.BLACK;
        painter.lineWidth = 2;

        this.drawChessRow(painter);
        this.drawChessColumn(painter);
        this.drawDiagonalLeftTop(painter);
        this.drawDiagonalLeftBottom(painter);
        this.drawDiagonalRightTop(painter);
        this.drawDiagonalRightBottom(painter);
        this.drawHeadTopCenter(painter);
        this.drawHeadBottomCenter(painter);
        this.drawHeadTopSideLeft(painter);
        this.drawHeadTopSideRight(painter);
        this.drawHeadBottomSideLeft(painter);
        this.drawHeadBottomSideRight(painter);
    },

    // draw Chess column
    drawChessColumn(painter) {
        let center = Math.floor(COLUMN_COUNT / 2);
        for (let i = 0; i < COLUMN_COUNT; i++) {
            if (i === center) {
                let moveX = this.startX + i * this.chessItemWidth + this.margin;
                let moveY = this.startY + this.margin;
                painter.moveTo(moveX, moveY);
                let lineX = this.startX + i * this.chessItemWidth + this.margin;
                let lineY =
                    this.startY +
                    this.chessBoardHeight -
                    this.margin +
                    4 * this.chessItemHeight;
                painter.lineTo(lineX, lineY);
                painter.stroke();
            } else {
                let moveX = this.startX + i * this.chessItemWidth + this.margin;
                let moveY = this.startY + 2 * this.chessItemHeight + this.margin;
                painter.moveTo(moveX, moveY);
                let lineX = this.startX + i * this.chessItemWidth + this.margin;
                let lineY = this.startY + this.chessBoardHeight + 2 * this.chessItemHeight - this.margin;
                painter.lineTo(lineX, lineY);
                painter.stroke();
            }
        }
    },

    //draw Chess row
    drawChessRow(painter) {
        for (let i = 2; i < ROW_COUNT - 2; i++) {
            let moveX = this.startX + this.margin;
            let moveY = this.startY + i * this.chessItemHeight + this.margin;
            painter.moveTo(moveX, moveY);
            let lineX = this.startX + this.chessBoardWidth - this.margin;
            let lineY = this.startY + i * this.chessItemHeight + this.margin;
            painter.lineTo(lineX, lineY);
            painter.stroke();
        }
    },

    //draw diagonal let-top
    drawDiagonalLeftTop(painter) {
        let moveX = this.startX + this.margin;
        let moveY = this.startY + 4 * this.chessItemHeight + this.margin;
        painter.moveTo(moveX, moveY);
        let lineX = this.startX + 3 * this.chessItemWidth + this.margin;
        let lineY = this.startY + 7 * this.chessItemHeight + this.margin;
        painter.lineTo(lineX, lineY);
        painter.stroke();
    },

    //draw diagonal let-Bottom
    drawDiagonalLeftBottom(painter) {
        let moveX = this.startX + this.margin;
        let moveY = this.startY + 4 * this.chessItemHeight + this.margin;
        painter.moveTo(moveX, moveY);
        let lineX = this.startX + 3 * this.chessItemWidth + this.margin;
        let lineY = this.startY + this.chessItemHeight + this.margin;
        painter.lineTo(lineX, lineY);
        painter.stroke();
    },

    //draw diagonal right-top
    drawDiagonalRightTop(painter) {
        let moveX = this.startX + 4 * this.chessItemWidth + this.margin;
        let moveY = this.startY + 4 * this.chessItemHeight + this.margin;
        painter.moveTo(moveX, moveY);
        let lineX = this.startX + this.chessItemWidth + this.margin;
        let lineY = this.startY + 7 * this.chessItemHeight + this.margin;
        painter.lineTo(lineX, lineY);
        painter.stroke();
    },

    //draw diagonal right-Bottom
    drawDiagonalRightBottom(painter) {
        let moveX = this.startX + 4 * this.chessItemWidth + this.margin;
        let moveY = this.startY + 4 * this.chessItemHeight + this.margin;
        painter.moveTo(moveX, moveY);
        let lineX = this.startX + this.chessItemWidth + this.margin;
        let lineY = this.startY + this.chessItemHeight + this.margin;
        painter.lineTo(lineX, lineY);
        painter.stroke();
    },

    //draw top head center line
    drawHeadTopCenter(painter) {
        let moveX = this.startX + this.chessItemWidth + this.margin;
        let moveY = this.startY + 7 * this.chessItemHeight + this.margin;
        painter.moveTo(moveX, moveY);
        let lineX = this.startX + 3 * this.chessItemWidth + this.margin;
        let lineY = this.startY + 7 * this.chessItemHeight + this.margin;
        painter.lineTo(lineX, lineY);
        painter.stroke();
    },

    //draw Bottom head center line
    drawHeadBottomCenter(painter) {
        let moveX = this.startX + this.chessItemWidth + this.margin;
        let moveY = this.startY + this.chessItemHeight + this.margin;
        painter.moveTo(moveX, moveY);
        let lineX = this.startX + 3 * this.chessItemWidth + this.margin;
        let lineY = this.startY + this.chessItemHeight + this.margin;
        painter.lineTo(lineX, lineY);
        painter.stroke();
    },

    //draw Top head sede left line
    drawHeadTopSideLeft(painter) {
        let moveX = this.startX + this.chessItemWidth + this.margin;
        let moveY = this.startY + 7 * this.chessItemHeight + this.margin;
        painter.moveTo(moveX, moveY);
        let lineX = this.startX + 2 * this.chessItemWidth + this.margin;
        let lineY = this.startY + 8 * this.chessItemHeight + this.margin;
        painter.lineTo(lineX, lineY);
        painter.stroke();
    },

    //draw Top head sede right line
    drawHeadTopSideRight(painter) {
        let moveX = this.startX + 3 * this.chessItemWidth + this.margin;
        let moveY = this.startY + 7 * this.chessItemHeight + this.margin;
        painter.moveTo(moveX, moveY);
        let lineX = this.startX + 2 * this.chessItemWidth + this.margin;
        let lineY = this.startY + 8 * this.chessItemHeight + this.margin;
        painter.lineTo(lineX, lineY);
        painter.stroke();
    },

    //draw Bottom head sede left line
    drawHeadBottomSideLeft(painter) {
        let moveX = this.startX + this.chessItemWidth + this.margin;
        let moveY = this.startY + this.chessItemHeight + this.margin;
        painter.moveTo(moveX, moveY);
        let lineX = this.startX + 2 * this.chessItemWidth + this.margin;
        let lineY = this.startY + this.margin;
        painter.lineTo(lineX, lineY);
        painter.stroke();
    },

    //draw Bottom head side right line
    drawHeadBottomSideRight(painter) {
        let moveX = this.startX + 3 * this.chessItemWidth + this.margin;
        let moveY = this.startY + this.chessItemHeight + this.margin;
        painter.moveTo(moveX, moveY);
        let lineX = this.startX + 2 * this.chessItemWidth + this.margin;
        let lineY = this.startY + this.margin;
        painter.lineTo(lineX, lineY);
        painter.stroke();
    },

    onTouchStart(e) { },

    onTouchEnd(e) {
        const selectedPiece = e.target;
        if (this.currentPiece === undefined) {
            if (selectedPiece.role === EMPTY) {
                return;
            }
            this.currentPiece = selectedPiece;
            return;
        }
        const allowSwitch = this.allowSwitchPosition(selectedPiece, this.currentPiece);
        if (!allowSwitch) {
            return;
        }
        const enableSwitchSheepPosition = this.enableSwitchSheepPosition(selectedPiece, this.currentPiece);
        if (enableSwitchSheepPosition) {
            this.switchPosition(selectedPiece, this.currentPiece);
            this.currentPiece = undefined;
            return;
        }
        const enableSwitchWolfPosition = this.enableSwitchWolfPosition(selectedPiece, this.currentPiece);
        if (enableSwitchWolfPosition) {
            this.switchPosition(selectedPiece, this.currentPiece);
            this.currentPiece = undefined;
            return;
        }
    },

    initPiecesLayout() {
        let coordinateArr = [];
        for (let x = 0; x < COLUMN_COUNT; x++) {
            let columnArr = [];
            for (let y = 0; y < ROW_COUNT; y++) {
                let rowArr = [x * this.chessItemWidth, y * this.chessItemHeight];
                columnArr.push(rowArr);
                const role = this.filterRole(x, y);
                this.instancePiece(x, y, role);
            }
            coordinateArr.push(columnArr);
        }
    },

    instancePiece(x, y, role) {
        const posX = this.startX + x * this.chessItemWidth + this.margin;
        const posY = this.startY + y * this.chessItemHeight + this.margin;
        let piece = cc.instantiate(this.PiecePrefab);
        let pieceComponent = piece.getComponent('Piece');
        piece.name = `piece-${x}-${y}`;
        pieceComponent.instancePiece(x, y, posX, posY, role);
        pieceComponent.registerEventCallback(
            (e) => {
                // event start
                this.onTouchStart(e);
            },
            (e) => {
                // event end
                this.onTouchEnd(e);
            })
        this.node.addChild(piece);
    },

    filterRole(x, y) {

        let role = EMPTY;

        if (x < 2) {
            if (y < 1 || y > ROW_COUNT - 2) {
                // none
                role = NONE;
            }
        }

        if (x > COLUMN_COUNT - 3) {
            if (y < 1 || y > ROW_COUNT - 2) {
                // none
                role = NONE;
            }
        }

        if ((x === 0 || x === COLUMN_COUNT - 1) && (y === 1 || y === ROW_COUNT - 2)) {
            // none
            role = NONE;
        }

        if (x === 2 && (y === 2 || y === ROW_COUNT - 3)) {
            // wolf
            role = WOLF;
        }

        if (x > 0 && x < COLUMN_COUNT - 1) {
            if (y > 2 && y < ROW_COUNT - 3) {
                // sheep
                if (x === 2 && y === 4) {
                    //empty
                    role = EMPTY;
                } else {
                    role = SHEEP;
                }
            }
        }

        return role;
    },

    switchPosition(newNode, oldNode) {
        const newX = newNode.x;
        const newY = newNode.y;
        const newPoint = newNode.point;
        const oldPoint = oldNode.point;
        const newName = newNode.name;
        const oldName = oldNode.name;

        newNode.x = oldNode.x;
        newNode.y = oldNode.y;
        oldNode.x = newX;
        oldNode.y = newY;

        newNode.point = oldPoint;
        oldNode.point = newPoint;

        newNode.name = oldName;
        oldNode.name = newName;
    },

    enableSwitchSheepPosition(newNode, oldNode) {
        let enable = true;

        if (oldNode.role !== SHEEP) {
            enable = false;
        }

        let diffX = Math.abs(newNode.point.x - oldNode.point.x);
        let diffY = Math.abs(newNode.point.y - oldNode.point.y);

        if (diffX + diffY === 1) {
            const allowSpecialArea = this.allowSpecialArea(newNode, oldNode);
            if (allowSpecialArea) {
                enable = false;
            }
        }

        if (diffX + diffY === 2) {
            const allowDiagonal = this.allowDiagonal(newNode, oldNode);
            if (!allowDiagonal) {
                enable = false;
            }
        }

        if (diffX + diffY > 2) {
            enable = false;
        }

        return enable;
    },

    enableSwitchWolfPosition(newNode, oldNode) {
        let enable = true;

        if (oldNode.role !== WOLF) {
            enable = false;
        }

        const diffX = Math.abs(newNode.point.x - oldNode.point.x);
        const diffY = Math.abs(newNode.point.y - oldNode.point.y);

        const diff = diffX + diffY;
        const allowDiagonal = this.allowDiagonal(newNode, oldNode);
        const allowSpecialArea = this.allowSpecialArea(newNode, oldNode);
        switch (diff) {
            case 1:
                if (allowSpecialArea) {
                    enable = false;
                }
                break;
            case 2:
                if (diffX === 0 || diffY === 0) {
                    enable = true;
                    // judge wolf can eat sheep
                    let centerPiece = this.getCenterPiece(newNode, oldNode);
                    enable = this.allowAcrossCenter(centerPiece);
                    this.onWolfEatSheep(centerPiece);
                } else {
                    if (!allowDiagonal) {
                        enable = false;
                    }
                }
                break;
            case 3:
                if (!allowDiagonal) {
                    enable = false;
                }
                if ((diffX === 0) || (diffY === 0)) {
                    enable = false;
                }
                break;
            case 4:
                if (!allowDiagonal) {
                    enable = false;
                } else {
                    // judge wolf can eat sheep
                    let centerPiece = this.getCenterPiece(newNode, oldNode);
                    enable = this.allowAcrossCenter(centerPiece);
                    this.onWolfEatSheep(centerPiece);
                }
                break;
            default:
                enable = false;
                break;
        }

        return enable;
    },

    allowSwitchPosition(newNode, oldNode) {
        const newRole = newNode.role;
        const oldRole = oldNode.role;

        let allow = true;
        if (newRole === oldNode) {
            allow = false;
        }
        if (newRole === WOLF && oldRole === SHEEP) {
            allow = false;
        }
        if (newRole === SHEEP && oldRole === WOLF) {
            allow = false;
        }
        return allow;
    },

    allowDiagonal(newNode, oldNode) {
        const newPoint = newNode.point;
        const oldPoint = oldNode.point;
        let count = 0;
        if (newPoint.x === oldPoint.x) {
            return;
        }
        diagonalPoints.forEach(point => {
            if (newPoint.x === point.x && newPoint.y === point.y) {
                count += 1;
            }

            if (oldPoint.x === point.x && oldPoint.y === point.y) {
                count += 1;
            }
        });
        return count === 2;
    },

    allowSpecialArea(newNode, oldNode) {
        const newPoint = newNode.point;
        const oldPoint = oldNode.point;
        let count = 0;
        restrictedArea.forEach(point => {
            if (newPoint.x === point.x && newPoint.y === point.y) {
                count += 1;
            }

            if (oldPoint.x === point.x && oldPoint.y === point.y) {
                count += 1;
            }
        });
        return count === 2;
    },

    allowAcrossCenter(centerPiece) {
        let enable = false;
        if (centerPiece.role === SHEEP) {
            centerPiece.role = EMPTY;
            enable = true;
        }
        return enable;
    },

    getCenterPiece(newNode, oldNode) {
        const diffXWithDirection = newNode.point.x - oldNode.point.x;
        const diffYWithDirection = newNode.point.y - oldNode.point.y;
        const diffX = Math.abs(diffXWithDirection);
        const diffY = Math.abs(diffYWithDirection);
        const diff = diffX + diffY;
        let centerPieceX = 0;
        let centerPieceY = 0;

        if (diff === 2) {
            if (diffY === 0) {
                centerPieceY = newNode.point.y;
                centerPieceX = newNode.point.x - diffXWithDirection / 2;
            }
            if (diffX === 0) {
                centerPieceX === newNode.point.x;
                centerPieceY = newNode.point.y - diffYWithDirection / 2;
            }
        }

        if (diff === 4) {
            centerPieceX = newNode.point.x - diffXWithDirection / 2;
            centerPieceY = newNode.point.y - diffYWithDirection / 2;
        }
        const centerPiece = this.node.getChildByName(`piece-${centerPieceX}-${centerPieceY}`);
        return centerPiece;
    },

    onWolfEatSheep(piece) {
        if (this.deadSheepCount === undefined) {
            this.deadSheepCount = 0;
        }
        const pieceComponent = piece.getComponent('Piece');
        pieceComponent.placeRole(EMPTY);
        this.deadSheepCount += 1;
    },

});

const diagonalPoints =
    [
        { x: 0, y: 4 },
        { x: 1, y: 1 },
        { x: 1, y: 3 },
        { x: 1, y: 5 },
        { x: 1, y: 7 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
        { x: 2, y: 6 },
        { x: 2, y: 8 },
        { x: 3, y: 1 },
        { x: 3, y: 3 },
        { x: 3, y: 5 },
        { x: 3, y: 7 },
        { x: 4, y: 4 }
    ]

const restrictedArea =
    [
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 6 },
        { x: 1, y: 7 },
        { x: 3, y: 1 },
        { x: 3, y: 2 },
        { x: 3, y: 6 },
        { x: 3, y: 7 },
    ]