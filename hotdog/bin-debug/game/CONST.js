var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CONST = (function () {
    function CONST() {
    }
    CONST.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    CONST.stageWidth = 480;
    CONST.stageHeight = 720;
    CONST.goal = 0;
    /**
     * 创建敌人时间间隔
     */
    CONST.enemyGap = 50;
    /**
     * 创建子弹时间间隔
     */
    CONST.heroBulletGap = 50;
    return CONST;
}());
__reflect(CONST.prototype, "CONST");
//# sourceMappingURL=CONST.js.map