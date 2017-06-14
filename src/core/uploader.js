(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Uploader"] = factory();
	else
		root["Uploader"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* html5 xhr uploader
	 * h5 upload is singleton pattern
	 *
	 **/
	var util = __webpack_require__(1);
	var WARNNING_OUT_OF_SIZE = 'Files with files size zero cannot be uploaded or multiple file uploads are not supported by your browser';
	var noop = function () {
	}

	module.exports = {
	    options: {
	        //trigger       : '#upload', //tell the uploader which element will trigger an upload action.
	        isShowProgress: false,
	        multiple      : true,
	        uploadUrl     : "/upload-handler",
	        accept        : ['image/*', 'video/*'],
	        data          : {}, // Add additional data with file_upload on xhr
	        sourceType    : ['album', 'camera'],

	        selected: noop,
	        start   : noop,
	        success : noop,
	        fail    : noop,
	        progress: noop
	    },

	    init: function (options) {
	        var self = this,
	            input = this.input = document.createElement('input'),
	            arr, i, len, opts;

	        self.options = opts = util.extend({}, self.options, options);
	        self.uploadsQueue = [];
	        self.callbacks = {};
	        self.maxUploads = opts.maxUploads || -1;
	        self.activeUploads = 0;
	        self.uploadUrl = opts.uploadUrl;

	        input.setAttribute('type', 'file');
	        // input.setAttribute('capture', 'camera');
	        input.setAttribute('name', opts.name);
	        input.style.position = 'absolute';
	        input.style.clip = 'rect(1px,1px,1px,1px)';
	        input.style.left = '-9999px';
	        input.style.top = '-9999px';

	        if (opts.multiple) {
	            input.setAttribute('multiple', 'multiple');
	        }

	        if (opts.accept && opts.accept.length > 0) {
	            arr = [];
	            for (i = 0, len = opts.accept.length; i < len; i++) {
	                arr.push(opts.accept[i]);
	            }
	            input.setAttribute('accept', arr.join(','));
	        }
	        document.body.appendChild(input);
	        input.addEventListener('change', function (e) {
	            self.files = e.target.files;

	            /* why clone node? */
	            //var fn = arguments.callee,
	            //    clone;
	            // reset input
	            //clone = this.cloneNode(true);
	            //clone.value = null;
	            //this.parentNode.replaceChild(clone, this);
	            //
	            //input.off();
	            //input = $(clone).on('change', fn);

	            self.trigger("selected", {
	                files: self.files
	            });
	        });

	        return self;
	    },

	    chooseFiles: function () {
	        util.trigger(this.input, 'click');
	    },

		reset: function () {
			this.input.value = '';
		},

	    _generateUid: function () {
	        var id = 0;
	        return function () {
	            return id++;
	        }();
	    },

	    _getFile: function (fileObj) {
	        var self = this,
	            name;
	        if (fileObj instanceof window.File || fileObj instanceof window.Blob) {
	            name = fileObj.fileName || fileObj.name;
	        } else {
	            return;
	        }

	        return {
	            id    : self._generateUid(),
	            params: self.options.params,
	            name  : name,
	            size  : fileObj.fileSize || fileObj.size,
	            ext   : name ? name.split(".").pop().toLowerCase() : "",
	            file  : fileObj
	        }
	    },

	    // upload files cached in Uploader, if you pass no file-obj in params.
	    uploadFiles: function (files) {
	        var self = this;

	        files = files || self.files;

	        for (var i = 0, len = files.length; i < len; i += 1) {
	            self.uploadFile(files[i]);
	        }
	        self.files = [];
	    },

	    uploadFile: function (file) {
	        if (file.size === 0) {
	            console.log(WARNNING_OUT_OF_SIZE);
	            return;
	        }

	        var upload = this._getFile(file);
	        this._uploadFile(upload);

	    },

	    _uploadFile: function (upload) {
	        var self = this;

	        if (self.activeUploads === self.maxUploads) {
	            self.uploadsQueue.push(upload);
	            return;
	        }

	        self._ajaxUpload(upload);
	    },

	    _ajaxUpload: function (upload) {
	        var self = this,
	            xhr,
	            formData,
	            fileName,
	            file = upload.file,
	            prop,
	            data = self.options.data,
	            key = self.options.filekey || 'file';

	        self.activeUploads += 1;

	        xhr = new window.XMLHttpRequest();
	        formData = new window.FormData();
	        fileName = file.name;

	        xhr.open('POST', self.options.uploadUrl);
	        xhr.setRequestHeader('Accept', 'application/json, text/javascript', '*/*');

	        xhr.upload.onloadstart = function () {
	            // File size is not reported during start!
	            //console.log('Upload started: ' + fileName);
	            self.trigger('start', {
	                fileName: fileName
	            })
	        };

	        xhr.upload.onprogress = function (event) {
	            if (!event.lengthComputable) {
	                return;
	            }

	            self.trigger("progress", {
	                total : event.total,
	                loaded: event.loaded
	            });
	        };

	        xhr.onload = function (event) {
	            var data;

	            if ((this.status >= 200 && this.status < 300) || this.status == 304) {

	                self.activeUploads -= 1;

	                if (self.uploadsQueue.length) {
	                    self._ajaxUpload(self.uploadsQueue.shift());
	                }

	                try {
	                    data = JSON.parse(event.target.responseText);
	                } catch (e) {
	                    throw e;
	                }

					self.reset();
	                return self.trigger("success", data);
	            }

				self.reset();
	            return self.trigger("fail");

	        };

	        // Triggered when upload fails:
	        xhr.onerror = function () {
				self.reset();
	            return self.trigger("fail", {
	                filename: upload.fileName
	            });
	        };

	        // Append additional data if provided:
	        if (data) {
	            for (prop in data) {
	                if (data.hasOwnProperty(prop)) {
	                    formData.append(prop, data[prop]);
	                }
	            }
	        }

	        formData.append(key, file);
	        xhr.send(formData);
	    },

	    // trigger callback view.
	    trigger: function (type, data) {
	        var callback = this.options[type];

	        if (!callback) return;

	        data = Array.prototype.slice.call(arguments, 1);

	        //this.element.trigger(event, args);
	        if (typeof callback === 'function') {
	            return callback.apply(this, data);
	        }
	    }
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	/*****
	 * Provide a set of utilities that used for hjsdk mobile-web-side.
	 * And tool-belt of jquery
	 */
	var ua = navigator.userAgent.toLowerCase(),
	    browsers = {
	        qq     : /QQbrowser/ig,
	        uc     : /ucbrowser/ig,
	        firefox: /firefox/ig,
	        miui   : /miuibrowser/ig,
	        opera  : /opr/ig,
	        samsung: /samsung/ig
	    },

	    __hasProp = Object.prototype.hasOwnProperty,
	    __typeof = Object.prototype.toString,
	    __slice = Array.prototype.slice,

	    __isPlainObject = function(obj) { // copyed from jquery
	        /* jshint eqeqeq: false */
	        // Must be an Object.
	        // Because of IE, we also have to check the presence of the constructor property.
	        // Make sure that DOM nodes and window objects don't pass through, as well
	        if (!obj || __typeof.call(obj) !== '[object Object]' ||
	            obj.nodeType || (obj != null && obj == obj.window)) {
	            return false;
	        }

	        try {
	            // Not own constructor property must be Object
	            if (obj.constructor &&
	                !__hasProp.call(obj, "constructor") &&
	                !__hasProp.call(obj.constructor.prototype, "isPrototypeOf")) {
	                return false;
	            }
	        } catch (e) { // IE8,9 Will throw exceptions on certain host objects #9897
	            return false;
	        }
	        var key;
	        for (key in obj) {}

	        return key === undefined || __hasProp.call(obj, key);
	    },

	    __extend = function(target) { //deep clone a plain object
	        var input = __slice.call(arguments, 1),
	            key,
	            value;
	        for (var i = 0, length = input.length; i < length; i++) {
	            for (key in input[i]) {
	                value = input[i][key];
	                if (input[i].hasOwnProperty(key) && value !== undefined) {
	                    // Clone objects
	                    if (__isPlainObject(value)) {
	                        target[key] = __isPlainObject(target[key]) ?
	                            __extend({}, target[key], value) :
	                            // Don't extend strings, arrays, etc. with objects
	                            __extend({}, value);
	                        // Copy everything else by reference
	                    } else {
	                        target[key] = value;
	                    }
	                }
	            }
	        }
	        return target;
	    }

	module.exports = {
	    ua      : ua,
	    /**
	     * If current page is browsed in wechat client
	     * @returns {boolean}
	     */
	    isWeixin: function () {
	        return (/micromessenger/i).test(ua);
	    },

	    browserType: function () {
	        for (var key in browsers) {
	            if (browsers[key].test(ua)) return key;
	        }
	        return 'unknown';
	    },

	    genSearchString: function (params) {
	        //params.value;

	        var list = [];
	        for (var key in params) {
	            var search = key + '=' + encodeURIComponent(params[key]);
	            list.push(search);
	        }

	        return list.join('&');
	    },

	    trigger: function(el, eventName, data){
	        var event;
	        if (window.CustomEvent) {
	            event = new CustomEvent(eventName, {detail: data});
	        } else {
	            event = document.createEvent('CustomEvent');
	            event.initCustomEvent(eventName, true, true, data);
	        }

	        el.dispatchEvent(event);
	    },

	    extend: __extend
	}

/***/ }
/******/ ])
});
;