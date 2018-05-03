const ROW_COUNT = 5;
const COLUMN_COUNT = 5;

cc.Class({
  extends: cc.Component,

  properties: {
    startX: {
      default: 0,
      type: cc.Float
    },
    startY: {
      default: 0,
      type: cc.Float
    },
    chestBoardWidth: {
      default: 0,
      type: cc.Float
    },
    chestBoardHeight: {
      default: 0,
      type: cc.Float
    },
    margin: {
      default: 0,
      type: cc.Float
    }
  },

  // use this for initialization
  onLoad: function() {
    this.initSize();
    this.drawChestBoard();
  },

  // called every frame
  update: function(dt) {},

  initSize() {
    let width = cc.view.getVisibleSizeInPixel().width;
    let height = cc.view.getVisibleSizeInPixel().height;
    let tempItemWidth = width / (COLUMN_COUNT + 1);
    this.margin = tempItemWidth / 2;
    this.chestItemWidth = tempItemWidth;
    this.chestItemHeight = this.chestItemWidth;
    this.chestBoardWidth = this.chestItemWidth * ROW_COUNT;
    this.chestBoardHeight = this.chestItemHeight * COLUMN_COUNT;

    this.startY = 2 * tempItemWidth;
    this.node.height = this.chestBoardHeight + 4 * tempItemWidth;
  },

  drawChestBoard() {
    let painter = this.getComponent(cc.Graphics);
    if (painter === null) {
      this.node.addComponent(cc.Graphics);
      painter = this.getComponent(cc.Graphics);
    }

    painter.strokeColor = cc.Color.BLACK;

    // draw column
    for (let i = 0; i < COLUMN_COUNT; i++) {
      if (i === 2) {
        let moveX = this.startX + i * this.chestItemWidth + this.margin;
        let moveY = this.startY + this.margin - 2 * this.chestItemHeight;
        painter.moveTo(moveX, moveY);
        let lineX = this.startX + i * this.chestItemWidth + this.margin;
        let lineY =
          this.startY +
          this.chestBoardHeight -
          this.margin +
          2 * this.chestItemHeight;
        painter.lineTo(lineX, lineY);
        painter.stroke();
      } else {
        let moveX = this.startX + i * this.chestItemWidth + this.margin;
        painter.moveTo(moveX, this.startY + this.margin);
        let lineX = this.startX + i * this.chestItemWidth + this.margin;
        painter.lineTo(
          lineX,
          this.startY + this.chestBoardHeight - this.margin
        );
        painter.stroke();
      }
    }

    //draw row
    for (let i = 0; i < ROW_COUNT; i++) {
      let moveY = this.startY + i * this.chestItemHeight + this.margin;
      painter.moveTo(this.startX + this.margin, moveY);
      let lineY = this.startY + i * this.chestItemHeight + this.margin;
      painter.lineTo(this.startX + this.chestBoardWidth - this.margin, lineY);
      painter.stroke();
    }

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

  //draw diagonal let-top
  drawDiagonalLeftTop(painter) {
    let x0 = this.startX + this.margin;
    let y0 = this.startY + 2 * this.chestItemHeight + this.margin;
    painter.moveTo(x0, y0);
    let x1 = this.startX + 3 * this.chestItemWidth + this.margin;
    let y1 = this.startY + 5 * this.chestItemHeight + this.margin;
    painter.lineTo(x1, y1);
    painter.stroke();
  },

  //draw diagonal let-Bottom
  drawDiagonalLeftBottom(painter) {
    let moveX = this.startX + this.margin;
    let moveY = this.startY + 2 * this.chestItemHeight + this.margin;
    painter.moveTo(moveX, moveY);
    let lineX = this.startX + 3 * this.chestItemWidth + this.margin;
    let lineY = this.startY - this.chestItemHeight + this.margin;
    painter.lineTo(lineX, lineY);
    painter.stroke();
  },

  //draw diagonal right-top
  drawDiagonalRightTop(painter) {
    let moveX = this.startX + 4 * this.chestItemWidth + this.margin;
    let moveY = this.startY + 2 * this.chestItemHeight + this.margin;
    painter.moveTo(moveX, moveY);
    let lineX = this.startX + this.chestItemWidth + this.margin;
    let lineY = this.startY + 5 * this.chestItemHeight + this.margin;
    painter.lineTo(lineX, lineY);
    painter.stroke();
  },

  //draw diagonal right-Bottom
  drawDiagonalRightBottom(painter) {
    let moveX = this.startX + 4 * this.chestItemWidth + this.margin;
    let moveY = this.startY + 2 * this.chestItemHeight + this.margin;
    painter.moveTo(moveX, moveY);
    let lineX = this.startX + this.chestItemWidth + this.margin;
    let lineY = this.startY - this.chestItemHeight + this.margin;
    painter.lineTo(lineX, lineY);
    painter.stroke();
  },

  //draw top head center line
  drawHeadTopCenter(painter) {
    let moveX = this.startX + this.chestItemWidth + this.margin;
    let moveY = this.startY + 5 * this.chestItemHeight + this.margin;
    painter.moveTo(moveX, moveY);
    let lineX = this.startX + 3 * this.chestItemWidth + this.margin;
    let lineY = this.startY + 5 * this.chestItemHeight + this.margin;
    painter.lineTo(lineX, lineY);
    painter.stroke();
  },

  //draw Bottom head center line
  drawHeadBottomCenter(painter) {
    let moveX = this.startX + this.chestItemWidth + this.margin;
    let moveY = this.startY - this.chestItemHeight + this.margin;
    painter.moveTo(moveX, moveY);
    let lineX = this.startX + 3 * this.chestItemWidth + this.margin;
    let lineY = this.startY - this.chestItemHeight + this.margin;
    painter.lineTo(lineX, lineY);
    painter.stroke();
  },

  //draw Top head sede left line
  drawHeadTopSideLeft(painter) {
    let moveX = this.startX + this.chestItemWidth + this.margin;
    let moveY = this.startY + 5 * this.chestItemHeight + this.margin;
    painter.moveTo(moveX, moveY);
    let lineX = this.startX + 2 * this.chestItemWidth + this.margin;
    let lineY = this.startY + 6 * this.chestItemHeight + this.margin;
    painter.lineTo(lineX, lineY);
    painter.stroke();
  },

  //draw Top head sede right line
  drawHeadTopSideRight(painter) {
    let moveX = this.startX + 3 * this.chestItemWidth + this.margin;
    let moveY = this.startY + 5 * this.chestItemHeight + this.margin;
    painter.moveTo(moveX, moveY);
    let lineX = this.startX + 2 * this.chestItemWidth + this.margin;
    let lineY = this.startY + 6 * this.chestItemHeight + this.margin;
    painter.lineTo(lineX, lineY);
    painter.stroke();
  },

  //draw Bottom head sede left line
  drawHeadBottomSideLeft(painter) {
    let moveX = this.startX + this.chestItemWidth + this.margin;
    let moveY = this.startY - this.chestItemHeight + this.margin;
    painter.moveTo(moveX, moveY);
    let lineX = this.startX + 2 * this.chestItemWidth + this.margin;
    let lineY = this.startY - 2 * this.chestItemHeight + this.margin;
    painter.lineTo(lineX, lineY);
    painter.stroke();
  },

  //draw Bottom head side right line
  drawHeadBottomSideRight(painter) {
    let moveX = this.startX + 3 * this.chestItemWidth + this.margin;
    let moveY = this.startY - this.chestItemHeight + this.margin;
    painter.moveTo(moveX, moveY);
    let lineX = this.startX + 2 * this.chestItemWidth + this.margin;
    let lineY = this.startY - 2 * this.chestItemHeight + this.margin;
    painter.lineTo(lineX, lineY);
    painter.stroke();
  }
});
