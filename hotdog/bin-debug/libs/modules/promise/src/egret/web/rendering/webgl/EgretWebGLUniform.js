//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret;
(function (egret) {
    var web;
    (function (web) {
        /**
         * @private
         */
        var WEBGL_UNIFORM_TYPE;
        (function (WEBGL_UNIFORM_TYPE) {
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["FLOAT_VEC2"] = 35664] = "FLOAT_VEC2";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["FLOAT_VEC3"] = 35665] = "FLOAT_VEC3";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["FLOAT_VEC4"] = 35666] = "FLOAT_VEC4";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["INT_VEC2"] = 35667] = "INT_VEC2";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["INT_VEC3"] = 35668] = "INT_VEC3";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["INT_VEC4"] = 35669] = "INT_VEC4";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["BOOL"] = 35670] = "BOOL";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["BOOL_VEC2"] = 35671] = "BOOL_VEC2";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["BOOL_VEC3"] = 35672] = "BOOL_VEC3";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["BOOL_VEC4"] = 35673] = "BOOL_VEC4";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["FLOAT_MAT2"] = 35674] = "FLOAT_MAT2";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["FLOAT_MAT3"] = 35675] = "FLOAT_MAT3";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["FLOAT_MAT4"] = 35676] = "FLOAT_MAT4";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["SAMPLER_2D"] = 35678] = "SAMPLER_2D";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["SAMPLER_CUBE"] = 35680] = "SAMPLER_CUBE";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["BYTE"] = 65535] = "BYTE";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["SHORT"] = 5122] = "SHORT";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["INT"] = 5124] = "INT";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
            WEBGL_UNIFORM_TYPE[WEBGL_UNIFORM_TYPE["FLOAT"] = 5126] = "FLOAT";
        })(WEBGL_UNIFORM_TYPE = web.WEBGL_UNIFORM_TYPE || (web.WEBGL_UNIFORM_TYPE = {}));
        /**
         * @private
         */
        var EgretWebGLUniform = (function () {
            function EgretWebGLUniform(gl, program, uniformData) {
                this.gl = gl;
                this.name = uniformData.name;
                this.type = uniformData.type;
                this.size = uniformData.size;
                this.location = gl.getUniformLocation(program, this.name);
                this.setDefaultValue();
                this.generateSetValue();
                this.generateUpload();
            }
            EgretWebGLUniform.prototype.setDefaultValue = function () {
                var type = this.type;
                switch (type) {
                    case WEBGL_UNIFORM_TYPE.FLOAT:
                    case WEBGL_UNIFORM_TYPE.SAMPLER_2D:
                    case WEBGL_UNIFORM_TYPE.SAMPLER_CUBE:
                    case WEBGL_UNIFORM_TYPE.BOOL:
                    case WEBGL_UNIFORM_TYPE.INT:
                        this.value = 0;
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_VEC2:
                    case WEBGL_UNIFORM_TYPE.BOOL_VEC2:
                    case WEBGL_UNIFORM_TYPE.INT_VEC2:
                        this.value = [0, 0];
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_VEC3:
                    case WEBGL_UNIFORM_TYPE.BOOL_VEC3:
                    case WEBGL_UNIFORM_TYPE.INT_VEC3:
                        this.value = [0, 0, 0];
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_VEC4:
                    case WEBGL_UNIFORM_TYPE.BOOL_VEC4:
                    case WEBGL_UNIFORM_TYPE.INT_VEC4:
                        this.value = [0, 0, 0, 0];
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_MAT2:
                        this.value = new Float32Array([
                            1, 0,
                            0, 1
                        ]);
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_MAT3:
                        this.value = new Float32Array([
                            1, 0, 0,
                            0, 1, 0,
                            0, 0, 1
                        ]);
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_MAT4:
                        this.value = new Float32Array([
                            1, 0, 0, 0,
                            0, 1, 0, 0,
                            0, 0, 1, 0,
                            0, 0, 0, 1
                        ]);
                        break;
                }
            };
            EgretWebGLUniform.prototype.generateSetValue = function () {
                var type = this.type;
                switch (type) {
                    case WEBGL_UNIFORM_TYPE.FLOAT:
                    case WEBGL_UNIFORM_TYPE.SAMPLER_2D:
                    case WEBGL_UNIFORM_TYPE.SAMPLER_CUBE:
                    case WEBGL_UNIFORM_TYPE.BOOL:
                    case WEBGL_UNIFORM_TYPE.INT:
                        this.setValue = function (value) {
                            var notEqual = this.value !== value;
                            this.value = value;
                            notEqual && this.upload();
                        };
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_VEC2:
                    case WEBGL_UNIFORM_TYPE.BOOL_VEC2:
                    case WEBGL_UNIFORM_TYPE.INT_VEC2:
                        this.setValue = function (value) {
                            var notEqual = this.value[0] !== value.x || this.value[1] !== value.y;
                            this.value[0] = value.x;
                            this.value[1] = value.y;
                            notEqual && this.upload();
                        };
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_VEC3:
                    case WEBGL_UNIFORM_TYPE.BOOL_VEC3:
                    case WEBGL_UNIFORM_TYPE.INT_VEC3:
                        this.setValue = function (value) {
                            this.value[0] = value.x;
                            this.value[1] = value.y;
                            this.value[2] = value.z;
                            this.upload();
                        };
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_VEC4:
                    case WEBGL_UNIFORM_TYPE.BOOL_VEC4:
                    case WEBGL_UNIFORM_TYPE.INT_VEC4:
                        this.setValue = function (value) {
                            this.value[0] = value.x;
                            this.value[1] = value.y;
                            this.value[2] = value.z;
                            this.value[3] = value.w;
                            this.upload();
                        };
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_MAT2:
                    case WEBGL_UNIFORM_TYPE.FLOAT_MAT3:
                    case WEBGL_UNIFORM_TYPE.FLOAT_MAT4:
                        this.setValue = function (value) {
                            this.value.set(value);
                            this.upload();
                        };
                        break;
                }
            };
            EgretWebGLUniform.prototype.generateUpload = function () {
                var gl = this.gl;
                var type = this.type;
                var location = this.location;
                switch (type) {
                    case WEBGL_UNIFORM_TYPE.FLOAT:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform1f(location, value);
                        };
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_VEC2:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform2f(location, value[0], value[1]);
                        };
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_VEC3:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform3f(location, value[0], value[1], value[2]);
                        };
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_VEC4:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform4f(location, value[0], value[1], value[2], value[3]);
                        };
                        break;
                    case WEBGL_UNIFORM_TYPE.SAMPLER_2D:
                    case WEBGL_UNIFORM_TYPE.SAMPLER_CUBE:
                    case WEBGL_UNIFORM_TYPE.BOOL:
                    case WEBGL_UNIFORM_TYPE.INT:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform1i(location, value);
                        };
                        break;
                    case WEBGL_UNIFORM_TYPE.BOOL_VEC2:
                    case WEBGL_UNIFORM_TYPE.INT_VEC2:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform2i(location, value[0], value[1]);
                        };
                        break;
                    case WEBGL_UNIFORM_TYPE.BOOL_VEC3:
                    case WEBGL_UNIFORM_TYPE.INT_VEC3:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform3i(location, value[0], value[1], value[2]);
                        };
                        break;
                    case WEBGL_UNIFORM_TYPE.BOOL_VEC4:
                    case WEBGL_UNIFORM_TYPE.INT_VEC4:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniform4i(location, value[0], value[1], value[2], value[3]);
                        };
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_MAT2:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniformMatrix2fv(location, false, value);
                        };
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_MAT3:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniformMatrix3fv(location, false, value);
                        };
                        break;
                    case WEBGL_UNIFORM_TYPE.FLOAT_MAT4:
                        this.upload = function () {
                            var value = this.value;
                            gl.uniformMatrix4fv(location, false, value);
                        };
                        break;
                }
            };
            return EgretWebGLUniform;
        }());
        web.EgretWebGLUniform = EgretWebGLUniform;
        __reflect(EgretWebGLUniform.prototype, "egret.web.EgretWebGLUniform");
    })(web = egret.web || (egret.web = {}));
})(egret || (egret = {}));
//# sourceMappingURL=EgretWebGLUniform.js.map