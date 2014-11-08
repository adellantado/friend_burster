/**
 * Created by maxpaint on 08.11.2014.
 */
/**
 * This is the description for maxpaint_backgroundImages.
 * This is pludin for Jquery, it can load background Images
 *
 * @class backgroundImages
 * @constructor
 */
;(function ($, window, undefined) {
    'use strict';

    var defaults = {  };

    $.fn.maxpaint_backgroundImages = function(images, params){
        var imgs = parseImageSource(images);
        if(imgs === null)
            return;

        debug(imgs);

        // при многократном вызове функции настройки будут сохранятся, и замещаться при необходимости
        var options = $.extend({}, defaults, params);
        var that = $(this);
        // add  style
        that.css(style.wrap);
        var img = createBackground( imgs, that );
        img.appendTo(that);
        return this;
    };


    /**
     * createBackground method description.
     * Create Image and load image
     *
     *
     * @method createBackground
     * @param {Array} array of images
     * @return {$image} Returns wrapped image
     */
    function createBackground(imgs){
        debug("Start Load Images");
        var src = imgs[0];
        var $img;
        var img = new Image();
        img.src = src;
        img.onerror = function (e) {
            debug(e.message);
        };

        img.onload = function (e) {
            debug("Images Loaded");
        };

        img.onprogress = function(e) {
            debug(e.loaded / e.total);
        };

        $img =  $(img); //Equivalent: $(document.createElement('img'))
        $img.attr('src', src);
        $img.css(style.img);
        return $img;
    }

    /**
     * debug method description.
     * write all data to console
     *
     * @method debug
     * @return {null}
     */
    function debug( ) {
        if(arguments == null || arguments[0] == null)
            return;

        if ( console && console.log ) {
            var obj;
            if( $.isArray(arguments[0]) ){
                obj = arguments[0];
                console.log(getCurrentTime( ) + " -> "  + obj.join(" "));
                return;
            }

            var len = arguments.length - 1;
            for(var i = len;  i >= 0; --i){
                console.log( getCurrentTime( ) + " -> "  + arguments[i].toString());
            }

        }
    };

    /**
     * parseImageSource method description.
     * parce first param and return result
     *
     * @method parseImageSource
     * @param {Array}
     * @param {String} path to folder
     * @param {String} contains only one image
     * @return {Array} Returns Arrray of images url
     */
    function parseImageSource(images){
        if (images === undefined || images.length === 0) {
            $.error("No images were supplied for load");
            return null;
        }

        if($.isArray(images)){
            return images;
        }

        if( isPath(images) ){
            var imagesFromPath = getAllImagesByPath(images);
            return imagesFromPath;
        }else{
            var result = [];
            result.push(images);
            return result;
        }
    }

    /**
     * getCurrentTime method description.
     * Create time String for debug
     * String look lika as 727ms: 3s: 55min
     *
     * @method getCurrentTime
     * @param {} null
     * @return {String} Returns true is folder links
     */
    function getCurrentTime( ){
        var time = new Date();
        var timeREs = [];
        timeREs.push(time.getMilliseconds().toString() + "ms");
        timeREs.push(time.getSeconds().toString() + "s");
        timeREs.push(time.getMinutes().toString() + "min");
        return timeREs.join(": ");
    }

    /**
     * isPath method description.  checks is string contain link to images
     * or on the folder
     *
     * @method isPath
     * @param {String} path Argument 1
     * @return {Boolean} Returns true is folder links
     */
    function isPath(path){
        var match = path.match(/\.(jpg|png|gif)\b/);
        if (match != null) {
            return false;
        } else {
            return true;
        }
    }

    // Private function do not used
    function getAllImagesByPath(path){
        $.ajax({
            url: path,
            success: function(data){
                $(data).find("td > a").each(function(){
                    // will loop through
                    alert("Found a file: " + $(this).attr("href"));
                });
            }
        });
    }

    /**
     * Set Style for div and image background,
     * contains two children property,
     * wrap for div and
     * img for image
     * @property wrap
     * @property img
     * @type {Object}
     */
    var style = {
        wrap: {
            position: 'fixed',
            top: '-50%',
            left: '-50%',
            height: '200%',
            width: '200%',
            zIndex: -999999
        },

        img: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 'auto',
            minWidth: '50%',
            minHeight: '50%',
            zIndex: -99999
        }
    };

})(jQuery);
