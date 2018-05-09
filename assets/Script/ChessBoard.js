
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
    },

    start() {
        this.initSize();
        this.drawChessBoard();
    },

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

});
