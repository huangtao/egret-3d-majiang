////////////////////////////////////////////////////////////////////////////////////////
////
////  Copyright (c) 2014-present, Egret Technology.
////  All rights reserved.
////  Redistribution and use in source and binary forms, with or without
////  modification, are permitted provided that the following conditions are met:
////
////     * Redistributions of source code must retain the above copyright
////       notice, this list of conditions and the following disclaimer.
////     * Redistributions in binary form must reproduce the above copyright
////       notice, this list of conditions and the following disclaimer in the
////       documentation and/or other materials provided with the distribution.
////     * Neither the name of the Egret nor the
////       names of its contributors may be used to endorse or promote products
////       derived from this software without specific prior written permission.
////
////  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
////  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
////  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
////  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
////  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
////  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
////  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
////  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
////  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
////  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
////
////////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RES;
(function (RES) {
    /**
     * SpriteSheet解析器
     * @private
     */
    var SheetAnalyzer = (function (_super) {
        __extends(SheetAnalyzer, _super);
        function SheetAnalyzer() {
            var _this = _super.call(this) || this;
            _this.sheetMap = {};
            _this.textureMap = {};
            /**
             * ImageLoader对象池
             */
            _this.recyclerIamge = [];
            _this._dataFormat = egret.HttpResponseType.TEXT;
            return _this;
        }
        SheetAnalyzer.prototype.getRes = function (name) {
            var res = this.fileDic[name];
            if (!res) {
                res = this.textureMap[name];
            }
            if (!res) {
                var prefix = RES.AnalyzerBase.getStringPrefix(name);
                res = this.fileDic[prefix];
                if (res) {
                    var tail = RES.AnalyzerBase.getStringTail(name);
                    res = res.getTexture(tail);
                }
            }
            return res;
        };
        /**
         * 一项加载结束
         */
        SheetAnalyzer.prototype.onLoadFinish = function (event) {
            var request = event.target;
            var data = this.resItemDic[request.$hashCode];
            delete this.resItemDic[request.hashCode];
            var resItem = data.item;
            var compFunc = data.func;
            resItem.loaded = (event.type == egret.Event.COMPLETE);
            if (resItem.loaded) {
                if (request instanceof egret.HttpRequest) {
                    resItem.loaded = false;
                    var imageUrl = this.analyzeConfig(resItem, request.response);
                    if (imageUrl) {
                        this.loadImage(imageUrl, data);
                        this.recycler.push(request);
                        return;
                    }
                }
                else {
                    var texture = new egret.Texture();
                    texture._setBitmapData(request.data);
                    this.analyzeBitmap(resItem, texture);
                }
            }
            if (request instanceof egret.HttpRequest) {
                this.recycler.push(request);
            }
            else {
                this.recyclerIamge.push(request);
            }
            compFunc.call(data.thisObject, resItem);
        };
        /**
         * 解析并缓存加载成功的配置文件
         */
        SheetAnalyzer.prototype.analyzeConfig = function (resItem, data) {
            var name = resItem.name;
            var config;
            var imageUrl = "";
            try {
                var str = data;
                config = JSON.parse(str);
            }
            catch (e) {
                egret.$warn(1017, resItem.url, data);
            }
            if (config) {
                this.sheetMap[name] = config;
                imageUrl = this.getRelativePath(resItem.url, config["file"]);
            }
            return imageUrl;
        };
        /**
         * 解析并缓存加载成功的位图数据
         */
        SheetAnalyzer.prototype.analyzeBitmap = function (resItem, texture) {
            var name = resItem.name;
            if (this.fileDic[name] || !texture) {
                return;
            }
            var config = this.sheetMap[name];
            delete this.sheetMap[name];
            var targetName = resItem.data && resItem.data.subkeys ? "" : name;
            var spriteSheet = this.parseSpriteSheet(texture, config, targetName);
            this.fileDic[name] = spriteSheet;
        };
        /**
         * 获取相对位置
         */
        SheetAnalyzer.prototype.getRelativePath = function (url, file) {
            url = url.split("\\").join("/");
            var params = url.match(/#.*|\?.*/);
            var paramUrl = "";
            if (params) {
                paramUrl = params[0];
            }
            var index = url.lastIndexOf("/");
            if (index != -1) {
                url = url.substring(0, index + 1) + file;
            }
            else {
                url = file;
            }
            return url + paramUrl;
        };
        SheetAnalyzer.prototype.parseSpriteSheet = function (texture, data, name) {
            var frames = data.frames;
            if (!frames) {
                return null;
            }
            var spriteSheet = new egret.SpriteSheet(texture);
            var textureMap = this.textureMap;
            for (var subkey in frames) {
                var config = frames[subkey];
                var texture_1 = spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
                if (config["scale9grid"]) {
                    var str = config["scale9grid"];
                    var list = str.split(",");
                    texture_1["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
                }
                if (textureMap[subkey] == null) {
                    textureMap[subkey] = texture_1;
                    if (name) {
                        this.addSubkey(subkey, name);
                    }
                }
            }
            return spriteSheet;
        };
        SheetAnalyzer.prototype.destroyRes = function (name) {
            var sheet = this.fileDic[name];
            if (sheet) {
                delete this.fileDic[name];
                var texture = void 0;
                for (var subkey in sheet._textureMap) {
                    if (texture == null) {
                        texture = sheet._textureMap[subkey];
                        this.onResourceDestroy(texture);
                        texture = null;
                    }
                    delete this.textureMap[subkey];
                }
                if (sheet.dispose) {
                    sheet.dispose();
                }
                return true;
            }
            return false;
        };
        SheetAnalyzer.prototype.loadImage = function (url, data) {
            var loader = this.getImageLoader();
            this.resItemDic[loader.hashCode] = data;
            loader.load(RES.$getVirtualUrl(url));
        };
        SheetAnalyzer.prototype.getImageLoader = function () {
            var loader = this.recyclerIamge.pop();
            if (!loader) {
                loader = new egret.ImageLoader();
                loader.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
                loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
            }
            return loader;
        };
        SheetAnalyzer.prototype.onResourceDestroy = function (texture) {
            if (texture) {
                texture.dispose();
            }
        };
        return SheetAnalyzer;
    }(RES.BinAnalyzer));
    RES.SheetAnalyzer = SheetAnalyzer;
    __reflect(SheetAnalyzer.prototype, "RES.SheetAnalyzer");
})(RES || (RES = {}));
//# sourceMappingURL=SheetAnalyzer.js.map