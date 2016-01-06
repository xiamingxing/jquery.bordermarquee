/*! Bordermarquee - v0.1.0 - 2016-01-06
* https://github.com/xiamingxing/jquery.bordermarquee
* Copyright (c) 2016 xiamingxing; Licensed MIT */
(function ($) {

    // Collection method.
    $.fn.bordermarquee = function (option) {

        option = $.extend({}, $.fn.bordermarquee.options, option);

        return this.each(function () {

            var buildFrames = function (type, direction, containerConf, lineStyle) {
                type = type || 0;
                var height = containerConf['height'],
                    width = containerConf['width'],
                    top = containerConf['top'],
                    left = containerConf['left'],
                    frames = [];

                switch (type) {
                    case 0:
                        frames[0] = [
                            {
                                cssText: {
                                    border: 'none',
                                    borderLeft: lineStyle,
                                    borderTop: lineStyle
                                },
                                animation: {
                                    width: width,
                                    height: 0,
                                    left: left,
                                    top: top
                                }
                            },
                            {
                                cssText: {
                                    border: 'none',
                                    borderTop: lineStyle,
                                    borderRight: lineStyle
                                },
                                animation: {
                                    width: 0,
                                    height: height,
                                    left: left + width,
                                    top: top
                                }
                            },
                            {
                                cssText: {
                                    border: 'none',
                                    borderRight: lineStyle,
                                    borderBottom: lineStyle
                                },
                                animation: {
                                    width: width,
                                    height: 0,
                                    left: left,
                                    top: top + height
                                }
                            },
                            {
                                cssText: {
                                    border: 'none',
                                    borderBottom: lineStyle,
                                    borderLeft: lineStyle
                                },
                                animation: {
                                    width: 0,
                                    height: height,
                                    left: left,
                                    top: top
                                }
                            }
                        ];
                        break;
                    default :
                        break;
                }
                return frames;
            };

            var getContainerConf = function ($container) {
                return {
                    height: $container.height(),
                    width: $container.width(),
                    left: ($container.offset() || {})['left'],
                    top: ($container.offset() || {})['top']
                };
            };

            var excute = function ($eles, frames, frameNo, rate, counter, callback) {
                frameNo = frameNo || 0;
                var $ele, nextFrameNo, lineFrames, lineFrame, cssText, animation;

                $.each(frames, function (i, item){
                    nextFrameNo = (frameNo + 1) % item.length;
                    lineFrames = item || {};
                    lineFrame = lineFrames[frameNo] || {};
                    cssText = lineFrame['cssText'];
                    animation = lineFrame['animation'];
                    $eles
                        .eq(i)
                        .css(cssText)
                        .animate(animation, rate, function () {
                            $ele = $(this);
                            if (counter > 1) {
                                excute($eles, frames, nextFrameNo, rate, counter - 1, callback);
                            }
                            else {
                                $ele.css("display", 'none');
                                callback($ele);
                            }
                        });
                });
            };

            var create = function (cssText, length) {
                if (!length || length <= 0) {
                    throw new Error("frames length error!");
                }

                var template = '<div class="borderMarquee"></div>',
                    tpls = [];

                for (; length--;) {
                    tpls.push(template);
                }

                return $(tpls.join('')).css(cssText).appendTo('body');
            };

            var run = function ($container, option) {
                var type = option['type'],
                    direction = option['direction'],
                    lineStyle = option['lineStyle'],
                    rate = option['rate'],
                    times = option['times'],
                    autoDestroy = option['autoDestroy'],
                    complete = option['complete'],

                    containerConf = getContainerConf($container),
                    cssText = $.extend({}, containerConf, option['cssText']),
                    frames = buildFrames(type, direction, containerConf, lineStyle),
                    linesNum = frames.length || 1,
                    $eles = create(cssText, linesNum),
                    frameLength = frames[0].length,
                    counter = times * frameLength;

                if ($eles.is(':animated')) {
                    $eles.stop();
                }
                excute($eles, frames, 0, rate, counter, function ($eles) {
                    if (complete){
                        complete($eles);
                    }
                    if (autoDestroy){
                        $eles.remove();
                    }
                });
            };

            run($(this), option);
        });
    };

    // Static method default options.
    $.fn.bordermarquee.options = {
        punctuation: '1.0.0',
        cssText: {
            display: 'block',
            position: 'absolute',
            zIndex: 100,
            border: 'none',
            height: 0,
            width: 0
        },
        rate: 200,
        times: 3,
        autoDestroy: true,
        lineStyle: "1px solid #000",
        direction: 1,
        complete: null
    };

}(jQuery));
