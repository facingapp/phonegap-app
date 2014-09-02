(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var $, Bus, Leg, methods, tourbus,
    __slice = [].slice;

  $ = jQuery;

  Bus = require('./modules/bus');

  Leg = require('./modules/leg');

  tourbus = $.tourbus = function() {
    var args, method;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    method = args[0];
    if (methods.hasOwnProperty(method)) {
      args = args.slice(1);
    } else if (method instanceof $) {
      method = 'build';
    } else if (typeof method === 'string') {
      method = 'build';
      args[0] = $(args[0]);
    } else {
      $.error("Unknown method of $.tourbus --", args);
    }
    return methods[method].apply(this, args);
  };

  $.fn.tourbus = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return this.each(function() {
      args.unshift($(this));
      tourbus.apply(null, ['build'].concat(__slice.call(args)));
      return this;
    });
  };

  methods = {
    build: function(el, options) {
      var built;
      if (options == null) {
        options = {};
      }
      options = $.extend(true, {}, tourbus.defaults, options);
      built = [];
      if (!(el instanceof $)) {
        el = $(el);
      }
      el.each(function() {
        return built.push(new Bus(this, options));
      });
      if (built.length === 0) {
        $.error("" + el.selector + " was not found!");
      }
      if (built.length === 1) {
        return built[0];
      }
      return built;
    },
    destroyAll: function() {
      var bus, index, _ref, _results;
      _ref = Bus._busses;
      _results = [];
      for (index in _ref) {
        bus = _ref[index];
        _results.push(bus.destroy());
      }
      return _results;
    },
    expose: function(global) {
      return global.tourbus = {
        Bus: Bus,
        Leg: Leg
      };
    }
  };

  tourbus.defaults = {
    debug: false,
    autoDepart: false,
    container: 'body',
    "class": null,
    startAt: 0,
    onDepart: function() {
      return null;
    },
    onStop: function() {
      return null;
    },
    onLegStart: function() {
      return null;
    },
    onLegEnd: function() {
      return null;
    },
    leg: {
      "class": null,
      scrollTo: null,
      scrollSpeed: 150,
      scrollContext: 100,
      orientation: 'bottom',
      align: 'left',
      width: 'auto',
      margin: 10,
      top: null,
      left: null,
      zindex: 9999,
      arrow: "50%"
    }
  };

}).call(this);

},{"./modules/bus":2,"./modules/leg":3}],2:[function(require,module,exports){
(function() {
  var $, Bus, Leg, utils,
    __slice = [].slice;

  $ = jQuery;

  Leg = require('./leg');

  utils = require('./utils');

  module.exports = Bus = (function() {
    Bus._busses = {};

    Bus._tours = 0;

    Bus.uniqueId = function() {
      return this._tours++;
    };

    function Bus(el, options) {
      this.options = options;
      this.id = this.constructor.uniqueId();
      this.elId = "tourbus-" + this.id;
      this.constructor._busses[this.id] = this;
      this.$original = $(el);
      this.rawData = this.$original.data();
      this.$container = $(utils.dataProp(this.rawData.container, this.options.container));
      this.$original.data({
        tourbus: this
      });
      this.currentLegIndex = null;
      this.legs = [];
      this.legEls = this.$original.children('li');
      this.totalLegs = this.legEls.length;
      this._configureElement();
      this._setupEvents();
      if (utils.dataProp(this.rawData.autoDepart, this.options.autoDepart)) {
        this.$original.trigger('depart.tourbus');
      }
      this._log('built tourbus with el', el.toString(), 'and options', this.options);
    }

    Bus.prototype.depart = function() {
      this.running = true;
      this.options.onDepart(this);
      this._log('departing', this);
      this.currentLegIndex = utils.dataProp(this.rawData.startAt, this.options.startAt);
      return this.showLeg();
    };

    Bus.prototype.stop = function() {
      if (!this.running) {
        return;
      }
      $.each(this.legs, $.proxy(this.hideLeg, this));
      this.currentLegIndex = null;
      this.options.onStop(this);
      return this.running = false;
    };

    Bus.prototype.on = function(event, selector, fn) {
      return this.$container.on(event, selector, fn);
    };

    Bus.prototype.currentLeg = function() {
      if (this.currentLegIndex === null) {
        return null;
      }
      return this.legs[this.currentLegIndex];
    };

    Bus.prototype.buildLeg = function(i) {
      var $legEl, data, leg;
      $legEl = $(this.legEls[i]);
      data = $legEl.data();
      this.legs[i] = leg = new Leg({
        bus: this,
        original: $legEl,
        target: data.el || 'body',
        index: i,
        rawData: data
      });
      leg.render();
      this.$el.append(leg.$el);
      leg._position();
      leg.hide();
      return leg;
    };

    Bus.prototype.showLeg = function(index) {
      var leg, preventDefault;
      if (index == null) {
        index = this.currentLegIndex;
      }
      leg = this.legs[index] || this.buildLeg(index);
      this._log('showLeg:', leg);
      preventDefault = this.options.onLegStart(leg, this);
      if (preventDefault !== false) {
        leg.show();
      }
      if (++index < this.totalLegs && !this.legs[index]) {
        return this.buildLeg(index);
      }
    };

    Bus.prototype.hideLeg = function(index) {
      var leg, preventDefault;
      if (index == null) {
        index = this.currentLegIndex;
      }
      leg = this.legs[index];
      if (leg.visible) {
        this._log('hideLeg:', leg);
        preventDefault = this.options.onLegEnd(leg, this);
        if (preventDefault !== false) {
          leg.hide();
        }
      }
      if (--index > 0 && !this.legs[index]) {
        return this.buildLeg(index);
      }
    };

    Bus.prototype.repositionLegs = function() {
      return $.each(this.legs, function() {
        return this.reposition();
      });
    };

    Bus.prototype.next = function() {
      this.hideLeg();
      this.currentLegIndex++;
      if (this.currentLegIndex > this.totalLegs - 1) {
        return this.$original.trigger('stop.tourbus');
      } else {
        return this.showLeg();
      }
    };

    Bus.prototype.prev = function(cb) {
      this.hideLeg();
      this.currentLegIndex--;
      if (this.currentLegIndex < 0) {
        return this.$original.trigger('stop.tourbus');
      } else {
        return this.showLeg();
      }
    };

    Bus.prototype.destroy = function() {
      $.each(this.legs, function() {
        return this.destroy();
      });
      this.legs = [];
      delete this.constructor._busses[this.id];
      this._teardownEvents();
      this.$original.removeData('tourbus');
      return this.$el.remove();
    };

    Bus.prototype._configureElement = function() {
      this.$el = $("<div class='tourbus-container'></div>");
      this.el = this.$el[0];
      this.$el.attr({
        id: this.elId
      });
      this.$el.addClass(utils.dataProp(this.rawData["class"], this.options["class"]));
      return this.$container.append(this.$el);
    };

    Bus.prototype._log = function() {
      if (!utils.dataProp(this.rawData.debug, this.options.debug)) {
        return;
      }
      return console.log.apply(console, ["TOURBUS " + this.id + ":"].concat(__slice.call(arguments)));
    };

    Bus.prototype._setupEvents = function() {
      this.$original.on('depart.tourbus', $.proxy(this.depart, this));
      this.$original.on('stop.tourbus', $.proxy(this.stop, this));
      this.$original.on('next.tourbus', $.proxy(this.next, this));
      return this.$original.on('prev.tourbus', $.proxy(this.prev, this));
    };

    Bus.prototype._teardownEvents = function() {
      return this.$original.off('.tourbus');
    };

    return Bus;

  })();

}).call(this);

},{"./leg":3,"./utils":4}],3:[function(require,module,exports){
(function() {
  var $, Leg, utils, _addRule;

  $ = jQuery;

  utils = require('./utils');

  module.exports = Leg = (function() {
    function Leg(options) {
      this.options = options;
      this.$original = this.options.original;
      this.bus = this.options.bus;
      this.rawData = this.options.rawData;
      this.index = this.options.index;
      this.$target = $(this.options.target);
      this.id = "" + this.bus.id + "-" + this.options.index;
      this.elId = "tourbus-leg-" + this.id;
      this.visible = false;
      if (this.$target.length === 0) {
        throw "" + this.$target.selector + " is not an element!";
      }
      this.content = this.$original.html();
      this._setupOptions();
      this._configureElement();
      this._configureTarget();
      this._configureScroll();
      this._setupEvents();
      this.bus._log("leg " + this.index + " made with options", this.options);
    }

    Leg.prototype.render = function() {
      var arrowClass, html;
      arrowClass = this.options.orientation === 'centered' ? '' : 'tourbus-arrow';
      this.$el.addClass(" " + arrowClass + " tourbus-arrow-" + this.options.orientation + " ");
      html = "<div class='tourbus-leg-inner'>\n  " + this.content + "\n</div>";
      this.$el.css({
        width: this.options.width,
        zIndex: this.options.zindex
      }).html(html);
      return this;
    };

    Leg.prototype.destroy = function() {
      this.$el.remove();
      return this._teardownEvents();
    };

    Leg.prototype.reposition = function() {
      this._configureTarget();
      return this._position();
    };

    Leg.prototype._position = function() {
      var css, keys, rule, selector;
      if (this.options.orientation !== 'centered') {
        rule = {};
        keys = {
          top: 'left',
          bottom: 'left',
          left: 'top',
          right: 'top'
        };
        if (typeof this.options.arrow === 'number') {
          this.options.arrow += 'px';
        }
        rule[keys[this.options.orientation]] = this.options.arrow;
        selector = "#" + this.elId + ".tourbus-arrow";
        this.bus._log("adding rule for " + this.elId, rule);
        _addRule("" + selector + ":before, " + selector + ":after", rule);
      }
      css = this._offsets();
      this.bus._log('setting offsets on leg', css);
      return this.$el.css(css);
    };

    Leg.prototype.show = function() {
      this.visible = true;
      this.$el.css({
        visibility: 'visible',
        opacity: 1.0,
        zIndex: this.options.zindex
      });
      return this.scrollIntoView();
    };

    Leg.prototype.hide = function() {
      this.visible = false;
      if (this.bus.options.debug) {
        return this.$el.css({
          visibility: 'visible',
          opacity: 0.4,
          zIndex: 0
        });
      } else {
        return this.$el.css({
          visibility: 'hidden'
        });
      }
    };

    Leg.prototype.scrollIntoView = function() {
      var scrollTarget;
      if (!this.willScroll) {
        return;
      }
      scrollTarget = utils.dataProp(this.options.scrollTo, this.$el);
      this.bus._log('scrolling to', scrollTarget, this.scrollSettings);
      return $.scrollTo(scrollTarget, this.scrollSettings);
    };

    Leg.prototype._setupOptions = function() {
      var dataProps, globalOptions, prop, _i, _len, _results;
      globalOptions = this.bus.options.leg;
      dataProps = ['class', 'top', 'left', 'scrollTo', 'scrollSpeed', 'scrollContext', 'margin', 'arrow', 'align', 'width', 'zindex', 'orientation'];
      _results = [];
      for (_i = 0, _len = dataProps.length; _i < _len; _i++) {
        prop = dataProps[_i];
        _results.push(this.options[prop] = utils.dataProp(this.rawData[prop], globalOptions[prop]));
      }
      return _results;
    };

    Leg.prototype._configureElement = function() {
      this.$el = $("<div class='tourbus-leg'></div>");
      this.el = this.$el[0];
      this.$el.attr({
        id: this.elId
      });
      this.$el.addClass(this.options["class"]);
      return this.$el.css({
        zIndex: this.options.zindex
      });
    };

    Leg.prototype._setupEvents = function() {
      this.$el.on('touchstart mousedown', '.tourbus-next', $.proxy(this.bus.next, this.bus));
      this.$el.on('touchstart mousedown', '.tourbus-prev', $.proxy(this.bus.prev, this.bus));
      return this.$el.on('touchstart mousedown', '.tourbus-stop', $.proxy(this.bus.stop, this.bus));
    };

    Leg.prototype._teardownEvents = function() {
      return this.$el.off('touchstart mousedown');
    };

    Leg.prototype._configureTarget = function() {
      this.targetOffset = this.$target.offset();
      if (utils.dataProp(this.options.top, false)) {
        this.targetOffset.top = this.options.top;
      }
      if (utils.dataProp(this.options.left, false)) {
        this.targetOffset.left = this.options.left;
      }
      this.targetWidth = this.$target.outerWidth();
      return this.targetHeight = this.$target.outerHeight();
    };

    Leg.prototype._configureScroll = function() {
      this.willScroll = $.fn.scrollTo && this.options.scrollTo !== false;
      return this.scrollSettings = {
        offset: -this.options.scrollContext,
        easing: 'linear',
        axis: 'y',
        duration: this.options.scrollSpeed
      };
    };

    Leg.prototype._offsets = function() {
      var dimension, elHalf, elHeight, elWidth, offsets, targetHalf, targetHeightOverride, validOrientations;
      elHeight = this.$el.height();
      elWidth = this.$el.width();
      offsets = {};
      switch (this.options.orientation) {
        case 'centered':
          targetHeightOverride = $(window).height();
          offsets.top = this.options.top;
          if (!utils.dataProp(offsets.top, false)) {
            offsets.top = (targetHeightOverride / 2) - (elHeight / 2);
          }
          offsets.left = (this.targetWidth / 2) - (elWidth / 2);
          break;
        case 'left':
          offsets.top = this.targetOffset.top;
          offsets.left = this.targetOffset.left - elWidth - this.options.margin;
          break;
        case 'right':
          offsets.top = this.targetOffset.top;
          offsets.left = this.targetOffset.left + this.targetWidth + this.options.margin;
          break;
        case 'top':
          offsets.top = this.targetOffset.top - elHeight - this.options.margin;
          offsets.left = this.targetOffset.left;
          break;
        case 'bottom':
          offsets.top = this.targetOffset.top + this.targetHeight + this.options.margin;
          offsets.left = this.targetOffset.left;
      }
      validOrientations = {
        top: ['left', 'right'],
        bottom: ['left', 'right'],
        left: ['top', 'bottom'],
        right: ['top', 'bottom']
      };
      if (utils.include(this.options.orientation, validOrientations[this.options.align])) {
        switch (this.options.align) {
          case 'right':
            offsets.left += this.targetWidth - elWidth;
            break;
          case 'bottom':
            offsets.top += this.targetHeight - elHeight;
        }
      } else if (this.options.align === 'center') {
        if (utils.include(this.options.orientation, validOrientations.left)) {
          targetHalf = this.targetWidth / 2;
          elHalf = elWidth / 2;
          dimension = 'left';
        } else {
          targetHalf = this.targetHeight / 2;
          elHalf = elHeight / 2;
          dimension = 'top';
        }
        if (targetHalf > elHalf) {
          offsets[dimension] += targetHalf - elHalf;
        } else {
          offsets[dimension] -= elHalf - targetHalf;
        }
      }
      return offsets;
    };

    return Leg;

  })();

  _addRule = (function(styleTag) {
    var sheet;
    styleTag.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(styleTag);
    sheet = document.styleSheets[document.styleSheets.length - 1];
    return function(selector, css) {
      var key, propText;
      propText = $.map((function() {
        var _results;
        _results = [];
        for (key in css) {
          _results.push(key);
        }
        return _results;
      })(), function(p) {
        return "" + p + ":" + css[p];
      }).join(';');
      try {
        if (sheet.insertRule) {
          sheet.insertRule("" + selector + " { " + propText + " }", (sheet.cssRules || sheet.rules).length);
        } else {
          sheet.addRule(selector, propText);
        }
      } catch (_error) {}
    };
  })(document.createElement('style'));

}).call(this);

},{"./utils":4}],4:[function(require,module,exports){
(function() {
  module.exports = {
    dataProp: function(possiblyFalsy, alternative) {
      if (possiblyFalsy === null || typeof possiblyFalsy === 'undefined') {
        return alternative;
      }
      return possiblyFalsy;
    },
    include: function(value, array) {
      return $.inArray(value, array || []) !== -1;
    }
  };

}).call(this);

},{}]},{},[1,2,3,4]);

var hljs=new function(){function l(o){return o.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function b(p){for(var o=p.firstChild;o;o=o.nextSibling){if(o.nodeName=="CODE"){return o}if(!(o.nodeType==3&&o.nodeValue.match(/\s+/))){break}}}function h(p,o){return Array.prototype.map.call(p.childNodes,function(q){if(q.nodeType==3){return o?q.nodeValue.replace(/\n/g,""):q.nodeValue}if(q.nodeName=="BR"){return"\n"}return h(q,o)}).join("")}function a(q){var p=(q.className+" "+q.parentNode.className).split(/\s+/);p=p.map(function(r){return r.replace(/^language-/,"")});for(var o=0;o<p.length;o++){if(e[p[o]]||p[o]=="no-highlight"){return p[o]}}}function c(q){var o=[];(function p(r,s){for(var t=r.firstChild;t;t=t.nextSibling){if(t.nodeType==3){s+=t.nodeValue.length}else{if(t.nodeName=="BR"){s+=1}else{if(t.nodeType==1){o.push({event:"start",offset:s,node:t});s=p(t,s);o.push({event:"stop",offset:s,node:t})}}}}return s})(q,0);return o}function j(x,v,w){var p=0;var y="";var r=[];function t(){if(x.length&&v.length){if(x[0].offset!=v[0].offset){return(x[0].offset<v[0].offset)?x:v}else{return v[0].event=="start"?x:v}}else{return x.length?x:v}}function s(A){function z(B){return" "+B.nodeName+'="'+l(B.value)+'"'}return"<"+A.nodeName+Array.prototype.map.call(A.attributes,z).join("")+">"}while(x.length||v.length){var u=t().splice(0,1)[0];y+=l(w.substr(p,u.offset-p));p=u.offset;if(u.event=="start"){y+=s(u.node);r.push(u.node)}else{if(u.event=="stop"){var o,q=r.length;do{q--;o=r[q];y+=("</"+o.nodeName.toLowerCase()+">")}while(o!=u.node);r.splice(q,1);while(q<r.length){y+=s(r[q]);q++}}}}return y+l(w.substr(p))}function f(q){function o(s,r){return RegExp(s,"m"+(q.cI?"i":"")+(r?"g":""))}function p(y,w){if(y.compiled){return}y.compiled=true;var s=[];if(y.k){var r={};function z(A,t){t.split(" ").forEach(function(B){var C=B.split("|");r[C[0]]=[A,C[1]?Number(C[1]):1];s.push(C[0])})}y.lR=o(y.l||hljs.IR,true);if(typeof y.k=="string"){z("keyword",y.k)}else{for(var x in y.k){if(!y.k.hasOwnProperty(x)){continue}z(x,y.k[x])}}y.k=r}if(w){if(y.bWK){y.b="\\b("+s.join("|")+")\\s"}y.bR=o(y.b?y.b:"\\B|\\b");if(!y.e&&!y.eW){y.e="\\B|\\b"}if(y.e){y.eR=o(y.e)}y.tE=y.e||"";if(y.eW&&w.tE){y.tE+=(y.e?"|":"")+w.tE}}if(y.i){y.iR=o(y.i)}if(y.r===undefined){y.r=1}if(!y.c){y.c=[]}for(var v=0;v<y.c.length;v++){if(y.c[v]=="self"){y.c[v]=y}p(y.c[v],y)}if(y.starts){p(y.starts,w)}var u=[];for(var v=0;v<y.c.length;v++){u.push(y.c[v].b)}if(y.tE){u.push(y.tE)}if(y.i){u.push(y.i)}y.t=u.length?o(u.join("|"),true):{exec:function(t){return null}}}p(q)}function d(D,E){function o(r,M){for(var L=0;L<M.c.length;L++){var K=M.c[L].bR.exec(r);if(K&&K.index==0){return M.c[L]}}}function s(K,r){if(K.e&&K.eR.test(r)){return K}if(K.eW){return s(K.parent,r)}}function t(r,K){return K.i&&K.iR.test(r)}function y(L,r){var K=F.cI?r[0].toLowerCase():r[0];return L.k.hasOwnProperty(K)&&L.k[K]}function G(){var K=l(w);if(!A.k){return K}var r="";var N=0;A.lR.lastIndex=0;var L=A.lR.exec(K);while(L){r+=K.substr(N,L.index-N);var M=y(A,L);if(M){v+=M[1];r+='<span class="'+M[0]+'">'+L[0]+"</span>"}else{r+=L[0]}N=A.lR.lastIndex;L=A.lR.exec(K)}return r+K.substr(N)}function z(){if(A.sL&&!e[A.sL]){return l(w)}var r=A.sL?d(A.sL,w):g(w);if(A.r>0){v+=r.keyword_count;B+=r.r}return'<span class="'+r.language+'">'+r.value+"</span>"}function J(){return A.sL!==undefined?z():G()}function I(L,r){var K=L.cN?'<span class="'+L.cN+'">':"";if(L.rB){x+=K;w=""}else{if(L.eB){x+=l(r)+K;w=""}else{x+=K;w=r}}A=Object.create(L,{parent:{value:A}});B+=L.r}function C(K,r){w+=K;if(r===undefined){x+=J();return 0}var L=o(r,A);if(L){x+=J();I(L,r);return L.rB?0:r.length}var M=s(A,r);if(M){if(!(M.rE||M.eE)){w+=r}x+=J();do{if(A.cN){x+="</span>"}A=A.parent}while(A!=M.parent);if(M.eE){x+=l(r)}w="";if(M.starts){I(M.starts,"")}return M.rE?0:r.length}if(t(r,A)){throw"Illegal"}w+=r;return r.length||1}var F=e[D];f(F);var A=F;var w="";var B=0;var v=0;var x="";try{var u,q,p=0;while(true){A.t.lastIndex=p;u=A.t.exec(E);if(!u){break}q=C(E.substr(p,u.index-p),u[0]);p=u.index+q}C(E.substr(p));return{r:B,keyword_count:v,value:x,language:D}}catch(H){if(H=="Illegal"){return{r:0,keyword_count:0,value:l(E)}}else{throw H}}}function g(s){var o={keyword_count:0,r:0,value:l(s)};var q=o;for(var p in e){if(!e.hasOwnProperty(p)){continue}var r=d(p,s);r.language=p;if(r.keyword_count+r.r>q.keyword_count+q.r){q=r}if(r.keyword_count+r.r>o.keyword_count+o.r){q=o;o=r}}if(q.language){o.second_best=q}return o}function i(q,p,o){if(p){q=q.replace(/^((<[^>]+>|\t)+)/gm,function(r,v,u,t){return v.replace(/\t/g,p)})}if(o){q=q.replace(/\n/g,"<br>")}return q}function m(r,u,p){var v=h(r,p);var t=a(r);if(t=="no-highlight"){return}var w=t?d(t,v):g(v);t=w.language;var o=c(r);if(o.length){var q=document.createElement("pre");q.innerHTML=w.value;w.value=j(o,c(q),v)}w.value=i(w.value,u,p);var s=r.className;if(!s.match("(\\s|^)(language-)?"+t+"(\\s|$)")){s=s?(s+" "+t):t}r.innerHTML=w.value;r.className=s;r.result={language:t,kw:w.keyword_count,re:w.r};if(w.second_best){r.second_best={language:w.second_best.language,kw:w.second_best.keyword_count,re:w.second_best.r}}}function n(){if(n.called){return}n.called=true;Array.prototype.map.call(document.getElementsByTagName("pre"),b).filter(Boolean).forEach(function(o){m(o,hljs.tabReplace)})}function k(){window.addEventListener("DOMContentLoaded",n,false);window.addEventListener("load",n,false)}var e={};this.LANGUAGES=e;this.highlight=d;this.highlightAuto=g;this.fixMarkup=i;this.highlightBlock=m;this.initHighlighting=n;this.initHighlightingOnLoad=k;this.IR="[a-zA-Z][a-zA-Z0-9_]*";this.UIR="[a-zA-Z_][a-zA-Z0-9_]*";this.NR="\\b\\d+(\\.\\d+)?";this.CNR="(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";this.BNR="\\b(0b[01]+)";this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";this.BE={b:"\\\\[\\s\\S]",r:0};this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[this.BE],r:0};this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[this.BE],r:0};this.CLCM={cN:"comment",b:"//",e:"$"};this.CBLCLM={cN:"comment",b:"/\\*",e:"\\*/"};this.HCM={cN:"comment",b:"#",e:"$"};this.NM={cN:"number",b:this.NR,r:0};this.CNM={cN:"number",b:this.CNR,r:0};this.BNM={cN:"number",b:this.BNR,r:0};this.inherit=function(q,r){var o={};for(var p in q){o[p]=q[p]}if(r){for(var p in r){o[p]=r[p]}}return o}}();hljs.LANGUAGES.javascript=function(a){return{k:{keyword:"in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const",literal:"true false null undefined NaN Infinity"},c:[a.ASM,a.QSM,a.CLCM,a.CBLCLM,a.CNM,{b:"("+a.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[a.CLCM,a.CBLCLM,{cN:"regexp",b:"/",e:"/[gim]*",i:"\\n",c:[{b:"\\\\/"}]},{b:"<",e:">;",sL:"xml"}],r:0},{cN:"function",bWK:true,e:"{",k:"function",c:[{cN:"title",b:"[A-Za-z$_][0-9A-Za-z$_]*"},{cN:"params",b:"\\(",e:"\\)",c:[a.CLCM,a.CBLCLM],i:"[\"'\\(]"}],i:"\\[|%"}]}}(hljs);hljs.LANGUAGES.css=function(a){var b={cN:"function",b:a.IR+"\\(",e:"\\)",c:[a.NM,a.ASM,a.QSM]};return{cI:true,i:"[=/|']",c:[a.CBLCLM,{cN:"id",b:"\\#[A-Za-z0-9_-]+"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{cN:"at_rule",b:"@",e:"[{;]",eE:true,k:"import page media charset",c:[b,a.ASM,a.QSM,a.NM]},{cN:"tag",b:a.IR,r:0},{cN:"rules",b:"{",e:"}",i:"[^\\s]",r:0,c:[a.CBLCLM,{cN:"rule",b:"[^\\s]",rB:true,e:";",eW:true,c:[{cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:true,i:"[^\\s]",starts:{cN:"value",eW:true,eE:true,c:[b,a.NM,a.QSM,a.ASM,a.CBLCLM,{cN:"hexcolor",b:"\\#[0-9A-F]+"},{cN:"important",b:"!important"}]}}]}]}]}}(hljs);hljs.LANGUAGES.xml=function(a){var c="[A-Za-z0-9\\._:-]+";var b={eW:true,c:[{cN:"attribute",b:c,r:0},{b:'="',rB:true,e:'"',c:[{cN:"value",b:'"',eW:true}]},{b:"='",rB:true,e:"'",c:[{cN:"value",b:"'",eW:true}]},{b:"=",c:[{cN:"value",b:"[^\\s/>]+"}]}]};return{cI:true,c:[{cN:"pi",b:"<\\?",e:"\\?>",r:10},{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},{cN:"comment",b:"<!--",e:"-->",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[b],starts:{e:"</style>",rE:true,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[b],starts:{e:"<\/script>",rE:true,sL:"javascript"}},{b:"<%",e:"%>",sL:"vbscript"},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:"[^ />]+"},b]}]}}(hljs);