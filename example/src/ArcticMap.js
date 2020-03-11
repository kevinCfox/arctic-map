'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var async = require('async');
var async__default = _interopDefault(async);
var reactArcgis = require('react-arcgis');
var ReactDOM = _interopDefault(require('react-dom'));
var arcgisToGeojsonUtils = require('@esri/arcgis-to-geojson-utils');

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".ArcticMap_simple-form-group__3yxCc {\r\n    margin-bottom: 1rem;\r\n  }\r\n  .ArcticMap_simple-text-label__JFxOr {\r\n    display: block;\r\n    color: red;\r\n  }\r\n  .ArcticMap_simple-text-input__2Da66 {\r\n    display: inline-block;\r\n    margin-bottom: 0.5rem;\r\n    font-size: 16px;\r\n    font-weight: 400;\r\n    color: rgb(33, 37, 41);\r\n  }\r\n\r\n#ArcticMap_bottomleftbar__1Odoz{\r\n  background: #fff;\r\n  position: absolute;\r\n  bottom: 30px;\r\n  left: 15px;\r\n  padding: 0px;\r\n  font-family: 'Avenir Next W00\",\"Helvetica Neue\",Helvetica,Arial,sans-serif'\r\n}\r\n\r\n#ArcticMap_bottomleftbar__1Odoz p{\r\n  padding-left: 12px;\r\n  padding-right: 12px;\r\n}\r\n  \r\n#ArcticMap_bottombar__qE1e6 {\r\n    background: #fff;\r\n    position: absolute;\r\n    bottom: 30px;\r\n    right: 15px;\r\n    padding: 0;\r\n  }\r\n\r\n  .ArcticMap_action-button__MaMS6 {\r\n    font-size: 16px;\r\n    background-color: transparent;\r\n    border: 1px solid #D3D3D3;\r\n    color: #6e6e6e;\r\n    height: 32px;\r\n    width: 32px;\r\n    text-align: center;\r\n    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);\r\n  }\r\n\r\n  .ArcticMap_action-button__MaMS6:hover,\r\n  .ArcticMap_action-button__MaMS6:focus {\r\n    background: #0079c1;\r\n    color: #e4e4e4;\r\n  }\r\n\r\n  .ArcticMap_active__1K4ZI {\r\n    background: #0079c1;\r\n    color: #e4e4e4;\r\n  }";
styleInject(css);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var ArcticMapButton = function (_React$Component) {
    inherits(ArcticMapButton, _React$Component);

    function ArcticMapButton(props) {
        classCallCheck(this, ArcticMapButton);

        var _this = possibleConstructorReturn(this, (ArcticMapButton.__proto__ || Object.getPrototypeOf(ArcticMapButton)).call(this, props));

        _this.state = {
            enabled: true,
            useEsriIcon: props.esriicon !== null,
            active: props.showactive !== undefined && props.showactive === true

        };

        _this.fireclick = function (e) {
            if (this.props.onclick) {
                this.props.onclick(e);
            }
        };

        return _this;
    }

    createClass(ArcticMapButton, [{
        key: 'render',
        value: function render() {

            var style = {
                arcticButton: {
                    padding: "5px",
                    height: "32px",
                    width: "32px",
                    backgroundColor: "#fff",
                    color: '#6e6e6e',
                    border: 'none',
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: "#ccc"
                    }
                }
            };

            if (this.state.useEsriIcon) {
                if (this.props.showactive && this.props.showactive == true) {
                    style.arcticButton.backgroundColor = "#d4d1d1";
                } else {
                    style.arcticButton.backgroundColor = "#fff";
                }

                var esriClassName = 'esri-icon esri-icon-' + this.props.esriicon;

                return React.createElement(
                    'button',
                    { style: style.arcticButton, onClick: this.fireclick.bind(this), title: this.props.title },
                    React.createElement('span', { style: { height: "15px", width: "15px" }, 'aria-hidden': true, className: esriClassName })
                );
            } else {
                return React.createElement('div', null);
            }
        }
    }]);
    return ArcticMapButton;
}(React.Component);

ArcticMapButton.displayName = 'ArcticMapButton';

var style = {
    bg: {
        zIndex: "100",
        position: "absolute",
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#5856569e'

    }

};
var loadingtext = {
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
};

var ArcticMapLoader = function (_React$Component) {
    inherits(ArcticMapLoader, _React$Component);

    function ArcticMapLoader(props) {
        classCallCheck(this, ArcticMapLoader);
        return possibleConstructorReturn(this, (ArcticMapLoader.__proto__ || Object.getPrototypeOf(ArcticMapLoader)).call(this, props));
    }

    createClass(ArcticMapLoader, [{
        key: 'render',
        value: function render() {

            console.log(this.props);
            if (this.props.loading === true) {

                return React.createElement(
                    'div',
                    { style: style.bg },
                    React.createElement(
                        'h1',
                        { style: loadingtext },
                        'Working...'
                    )
                );
            }
            return null;
        }
    }]);
    return ArcticMapLoader;
}(React.Component);

ArcticMapLoader.displayName = 'ArcticMapLoader';

var ArcticMap$1 = function (_React$Component) {
  inherits(ArcticMap, _React$Component);

  function ArcticMap(props) {
    classCallCheck(this, ArcticMap);

    var _this = possibleConstructorReturn(this, (ArcticMap.__proto__ || Object.getPrototypeOf(ArcticMap)).call(this, props));

    _this.state = {
      map: null,
      view: null,
      hideBasemapButton: false,
      loading: false,
      lat: props.lat,
      lng: props.lng,
      mode: props.mode || "view",
      basemap: props.basemap || "hybrid",
      sr: Number.parseInt(props.sr || "102100")
    };

    _this.handleMapLoad = _this.handleMapLoad.bind(_this);
    _this.handleMapClick = _this.handleMapClick.bind(_this);
    _this.layers = [];
    return _this;
  }

  createClass(ArcticMap, [{
    key: 'render',
    value: function render() {
      var self = this;
      var index = 0;
      this.layers = [];

      self.childrenElements = [];

      var children = React.Children.map(this.props.children, function (child) {
        if (child.type.displayName === 'ArcticMapLayer') {
          return React.cloneElement(child, {
            ref: function ref(c) {
              if (c) {
                self.layers.push(c);
              }
            }
          });
        } else if (child.type.displayName === 'ArcticMapEdit') {
          // console.log(self.refs);
          return React.cloneElement(child, {
            // ref: 'editor'

          });
        }

        // else if (child.type.name === 'ArcticMapLLDSearch') {

        //   return React.cloneElement(child, {
        //   })

        // } 

        else {
            return React.cloneElement(child, {
              am: self,
              //ref: 'child-' + (index++)
              ref: function ref(c) {
                if (c) {
                  self.childrenElements.push(c);
                }return 'child-' + index++;
              }
            });
          }
      });

      if (children) {
        children = children.sort(function (l) {
          return l.type.displayName === 'ArcticMapEdit';
        }).reverse();
      } else {
        children = React.createElement('div', null);
      }

      // console.log(this.props.children);
      // this.props.children.forEach((child) =>{
      //         child.ref = (c) => {this.layers.push(c) };
      // });


      return React.createElement(
        reactArcgis.Map,
        { 'class': 'full-screen-map',
          mapProperties: { basemap: this.state.basemap }, onLoad: this.handleMapLoad, onClick: this.handleMapClick },
        children,
        React.createElement(
          'div',
          { id: 'bottombar', style: { position: 'absolute', right: '10px', bottom: '20px' } },
          this.state.hideBasemapButton === false && React.createElement(ArcticMapButton, { esriicon: 'basemap', title: 'Map Layers', onclick: this.handleShowBasemaps.bind(this) })
        ),
        React.createElement(ArcticMapLoader, { loading: this.state.loading })
      );
    }
  }, {
    key: 'handleShowBasemaps',
    value: function handleShowBasemaps(event) {
      this.state.view.ui.add(this.basemapGallery, {
        position: 'bottom-right'
      });

      this.setState({ hideBasemapButton: true });
    }
  }, {
    key: 'handleMapClick',
    value: function handleMapClick(event) {
      // console.log(event);
    }
  }, {
    key: 'createElementFromHTML',
    value: function createElementFromHTML(htmlString) {
      var div = document.createElement('div');
      div.innerHTML = htmlString.trim();

      // Change this to div.childNodes to support multiple top-level nodes
      return div.firstChild;
    }
  }, {
    key: 'setEdit',
    value: function setEdit(json, nofire, type) {
      if (nofire === null) {
        nofire = false;
      }

      if (type === null) {
        type = "polygon";
      }

      if (this.state.map.editor) {
        this.state.map.editor.setEditFeature(json, nofire, type);
      }
    }
  }, {
    key: 'setMode',
    value: function setMode(val) {
      this.setState({ mode: val });
      if (val == "identify") {
        this.state.view.cursor = "help";
      }
      if (val == "view") {
        this.state.view.cursor = "grab";
      }
      if (val == "select") {
        this.state.view.cursor = "auto";
      }
      if (val == "edit") {
        this.state.view.cursor = "crosshairs";
      }
    }
  }, {
    key: 'setJson',
    value: function setJson(json) {
      if (this.state.map.editor) {
        this.state.map.editor.setEditFeature(json, true);
      }
    }
  }, {
    key: 'handleMapLoad',
    value: function handleMapLoad(map, view) {
      var _this2 = this;

      this.setState({ map: map, view: view });

      var self = this;
      self.state.map.amlayers = [];
      var centerSplit = this.props.center.split('|');
      view.center = [parseFloat(centerSplit[1]), parseFloat(centerSplit[0])];
      view.zoom = parseInt(centerSplit[2]);

      reactArcgis.loadModules(['esri/widgets/LayerList', 'esri/widgets/Locate', 'esri/widgets/BasemapGallery', 'esri/widgets/Home', 'esri/widgets/Zoom', 'esri/widgets/Search',
      // 'esri/tasks/Locator',
      'esri/geometry/geometryEngine', "esri/geometry/Polygon", "esri/request", "esri/geometry/Point"]).then(function (_ref) {
        var _ref2 = slicedToArray(_ref, 10),
            LayerList = _ref2[0],
            Locate = _ref2[1],
            BasemapGallery = _ref2[2],
            Home = _ref2[3],
            Zoom = _ref2[4],
            Search = _ref2[5],

        // Locator,
        geometryEngine = _ref2[6],
            Polygon = _ref2[7],
            Request = _ref2[8],
            Point = _ref2[9];

        window._request = Request;
        window._map = self;
        self.request = Request;

        if (self.state.mode == "identify") {
          self.state.view.cursor = "help";
        }
        if (self.state.mode == "view") {
          self.state.view.cursor = "grab";
        }
        if (self.state.mode == "edit") {
          self.state.view.cursor = "crosshairs";
        }

        if (self.state.mode == "select") {
          self.state.view.cursor = "auto";
        }

        //   self.state.view.spatialReference = {
        //     wkid: self.state.sr,
        //  };

        var layerList = new LayerList({
          view: self.state.view,
          listItemCreatedFunction: function listItemCreatedFunction(event) {
            var item = event.item;
            item.panel = {
              content: 'legend',
              open: false
            };
          }
        });

        view.popup.dockEnabled = true;
        view.popup.dockOptions.position = 'bottom-left';
        //var layers = React.Children.toArray(this.props.children).filter((ele) => ele.type.name === "ArcticMapLayer");


        // console.log(layers);
        view.popup.watch('selectedFeature', function (graphic) {
          if (graphic) {
            var graphicTemplate = graphic.getEffectivePopupTemplate();
            graphicTemplate.actions = [{
              id: 'select-item',
              title: 'Select',
              image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTQyREM3RDkwQzVGMTFFNTk4QkI4OTBEOTYzQTg5MzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTQyREM3REEwQzVGMTFFNTk4QkI4OTBEOTYzQTg5MzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NDJEQzdENzBDNUYxMUU1OThCQjg5MEQ5NjNBODkzMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NDJEQzdEODBDNUYxMUU1OThCQjg5MEQ5NjNBODkzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Prb3PqgAAACTSURBVHjaYvz//z8DJYCJgVJAjgsiIyMFQBjEZgQZwMjISJJmILUXynVmIdVmqGZ9qFAe0S7AonnR8uXLk5jItBmsGSUWgIriSdUMNwCoaB6QmgulidaM7AKYgjiYIcRohkdjVFQUhmIoG69mlHSAxUYGQppRAhGo6AMoYQDxRWI1Y02JSC65SEgz3IABzY0AAQYAhIhWWCl3Pj0AAAAASUVORK5CYII="

            }];

            graphicTemplate.actions.items[0].visible = self.state.map.editor !== undefined; // graphic.attributes.website ? true : false;
            //self.state.view.goTo(graphic);
          }
        });
        view.popup.viewModel.on('trigger-action', function (event) {
          if (event.action.id === 'select-item') {
            self.state.map.editor.setEditFeature(event.target.selectedFeature, null, null, false, true);
            view.popup.close();
          }
        });

        view.on('click', function (event) {

          //hide stuff


          if (self.state.hideBasemapButton && self.state.hideBasemapButton === true) {
            self.state.view.ui.remove(self.basemapGallery);
            self.setState({ hideBasemapButton: false });
            return;
          }

          if (self.state.mode == "view") {
            return;
          }

          if (self.state.map.editor && self.state.map.editor.state.editing === true) {
            return;
          }

          var currentmode = self.state.mode;
          if (currentmode !== 'select') {
            self.setMode("view");
          }

          // console.log(event);
          // need to work on identify and add to a single popup
          // https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=tasks-identify

          var identresults = [];
          //document.getElementsByClassName('esri-view-root')[0].style.cursor = 'wait';
          self.setState({ loading: true });

          var identLayers = self.layers.filter(function (layer) {
            var mapzoom = view.zoom;

            if (layer.props.identMaxZoom !== undefined) {
              if (Number.parseInt(layer.props.identMaxZoom, 10) > mapzoom) {
                return layer;
              }
            }

            return layer;
          });

          identLayers = identLayers.concat(self.state.map.amlayers);

          async__default.eachSeries(identLayers, function (layer, cb) {
            layer.identify(event, function (results) {
              if (results) {
                results.layer = layer;
                identresults.push(results);
              }
              cb();
            });
          }, function (err) {
            var results = identresults.map(function (ir) {
              ir.results.forEach(function (res) {
                res.layer = ir.layer;
                res.acres = -1;
                if (res.feature.geometry) {
                  res.acres = geometryEngine.geodesicArea(res.feature.geometry, 'acres');
                }
              });
              return ir.results;
            }) || [].reduce(function (a, b) {
              return a.concat(b);
            });
            self.setState({ loading: false });

            results = results.flat();

            results = results.sort(function (r1, r2) {
              if (r1.acres > r2.acres) {
                return 1;
              }
              return -1;
              //r.feature.attributes.Shape_Area
            });

            if (currentmode == "identify") {

              //results = results.reverse();
              var popupresults = results.map(function (result) {
                var feature = result.feature;
                var layerName = result.layerName;

                feature.attributes.layerName = layerName;

                feature.popupTemplate = { // autocasts as new PopupTemplate()
                  title: layerName,
                  content: result.layer.renderPopup(feature, result),
                  actions: [{ title: "Select", id: "select-action" }]
                };

                return feature;
              });

              if (popupresults.length > 0) {
                view.popup.close();
                view.popup.currentSearchResultFeature = null;
                self.state.view.popup.open({
                  features: popupresults,
                  location: event.mapPoint
                });
                popupresults[0].setCurrentPopup();

                self.state.view.popup.on('trigger-action', function (e) {
                  if (e.action.id === 'select-action') ;
                });
              }
              self.setState({ loading: false });
            }

            if (currentmode == "select") {
              console.log(results);
              self.state.map.editor.setEditFeature(results[0].feature, null, null, false, true);
            }

            //document.getElementsByClassName('esri-view-root')[0].style.cursor = 'auto';
          });

          // self.layers.forEach(layer => {
          //     layer.identify(event);
          // })
          //}, 100);
        });

        // Add widget to the top right corner of the view
        self.state.view.ui.add(layerList, 'top-left');

        if (_this2.props.locate) {
          var locateBtn = new Locate({
            view: self.state.view
          });

          self.state.view.ui.add(locateBtn, {
            position: 'top-right'
          });
        }

        _this2.basemapGallery = new BasemapGallery({
          view: self.state.view
        });

        _this2.basemapGallery.watch('activeBasemap', function (newValue, oldValue, property, object) {
          self.state.view.ui.remove(self.basemapGallery);
          self.setState({ hideBasemapButton: false });
        });

        map.on("basemap-change", function (a) {
          //this.basemapGallery.on('click', function () {

          alert("BM CHanegd");
        });

        // Add the widget to the top-right corner of the view

        if (_this2.props.home) {
          var homeBtn = new Home({
            view: view
          });

          // Add the home button to the top left corner of the view
          view.ui.add(homeBtn, 'top-right');
        }

        view.ui.remove('zoom');

        var zoom = new Zoom({
          view: self.state.view
        });

        view.ui.add(zoom, 'top-right');

        if (self.props.search) {

          // find search elemets
          var searchitems = self.childrenElements.filter(function (ele) {

            if (ele.constructor.name.toLowerCase().includes('search')) {
              return ele;
            }
          });

          var searchsources = searchitems.map(function (i) {
            if (i.search) {
              i.search();
            }
          });

          var searchWidget = new Search({
            view: view,
            sources: searchsources,
            includeDefaultSources: true
          });

          searchWidget.on("search-complete", function (event) {});

          searchWidget.on('select-result', function (evt) {

            view.popup.currentSearchResultFeature = evt.result.feature;
            view.popup.close();
            // view.popup.open({
            //  location: evt.result.feature.geometry,  // location of the click on the view
            //  feature: evt.result.feature,
            //  title: "Search Result",  // title displayed in the popup
            //  content: evt.result.name, // content displayed in the popup
            // });
          });

          view.ui.add(searchWidget, {
            position: "top-right",
            index: 0
          });
        }

        //       var elestring = this.createElementFromHTML( `<input type="text" placeholder="Find address or place" aria-label="Search" autocomplete="off" tabindex="0" class="esri-input esri-search__input" aria-autocomplete="list" aria-haspopup="true" aria-owns="1687b00a338-widget-1-suggest-menu" role="textbox" data-node-ref="_inputNode" title="Find address or place">`);

        //  view.ui.add(elestring, {
        //         position: "top-right",
        //         index: 0
        //       });

        _this2.getEditFeature = function () {
          _this2.state.map.editor.state.tempGraphicsLayer.graphics.items[0];
        };

        setTimeout(function () {
          var evt = new Event('mapready', { bubbles: true });
          Object.defineProperty(evt, 'target', { value: self, enumerable: true });

          if (self.props.onmapready) {
            self.props.onmapready(evt);
          }
        }, 500);
      });
    }
  }]);
  return ArcticMap;
}(React.Component);

ArcticMap$1.displayName = 'ArcticMap';

var styles = {
    rightWidgetFull: {
        "position": "absolute",
        "right": "2px",
        "top": "2px",
        "bottom": "2px",
        "zIndex": "100",

        "minWidth": '30%',
        paddingTop: '30px'
    },
    widgetContainer: {
        position: 'realative',
        "paddingRight": "18px",
        "paddingLeft": "18px",
        "overflowY": 'auto',
        "maxHeight": '100%'
    }

};

var ArcticMapPanel = function (_React$Component) {
    inherits(ArcticMapPanel, _React$Component);

    function ArcticMapPanel(props) {
        classCallCheck(this, ArcticMapPanel);

        var _this = possibleConstructorReturn(this, (ArcticMapPanel.__proto__ || Object.getPrototypeOf(ArcticMapPanel)).call(this, props));

        _this.toggle = function () {

            var currvalue = this.state.open;
            this.setState({ open: !currvalue });
        };

        _this.mapFrame = document.getElementsByClassName('esri-view-root')[0];
        _this.renderEle = document.createElement("span");
        _this.mapFrame.appendChild(_this.renderEle);
        _this.state = {
            open: _this.props.open || false
        };

        return _this;
    }

    createClass(ArcticMapPanel, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.renderPanel();
        }
    }, {
        key: 'render',
        value: function render() {

            return React.createElement(
                'span',
                null,
                React.createElement(ArcticMapButton, { esriicon: this.props.esriicon, onclick: this.toggle.bind(this), title: this.props.title })
            );
        }
    }, {
        key: 'renderPanel',
        value: function renderPanel() {
            // refactor this
            if (this.state.open) {
                var ele = React.createElement('div', { className: 'esri-widget', style: styles.rightWidgetFull }, React.createElement('h2', { style: { marginTop: '6px', position: 'absolute', left: '8px', top: '0' } }, this.props.title), React.createElement('span', { style: { position: 'absolute', top: '0', right: '0' } }, React.createElement(ArcticMapButton, { esriicon: 'close', onclick: this.toggle.bind(this) })), React.createElement('div', { style: styles.widgetContainer }, React.createElement('div', null, this.props.children)));

                ReactDOM.render(ele, this.renderEle);
            } else {
                var eleempty = React.createElement('span', null);
                ReactDOM.render(eleempty, this.renderEle);
            }
        }
    }]);
    return ArcticMapPanel;
}(React.Component);

ArcticMapPanel.displayName = 'ArcticMapPanel';

var ArcticMapLayer = function (_React$Component) {
    inherits(ArcticMapLayer, _React$Component);

    function ArcticMapLayer(props) {
        classCallCheck(this, ArcticMapLayer);

        var _this = possibleConstructorReturn(this, (ArcticMapLayer.__proto__ || Object.getPrototypeOf(ArcticMapLayer)).call(this, props));

        _this.state = {
            map: props.map,
            view: props.view,
            graphic: null,
            title: props.title,
            blockSelect: props.blockIdentSelect !== undefined
        };
        return _this;
    }

    createClass(ArcticMapLayer, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.view.graphics.remove(this.state.graphic);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var self = this;
            reactArcgis.loadModules(['esri/Graphic', "esri/layers/FeatureLayer", "esri/layers/MapImageLayer", "esri/layers/ImageryLayer", "esri/layers/GraphicsLayer", "esri/tasks/IdentifyTask", "esri/tasks/support/IdentifyParameters", "esri/geometry/Point", "esri/symbols/SimpleMarkerSymbol", "esri/layers/GroupLayer"]).then(function (_ref) {
                var _ref2 = slicedToArray(_ref, 10),
                    Graphic = _ref2[0],
                    FeatureLayer = _ref2[1],
                    MapImageLayer = _ref2[2],
                    ImageryLayer = _ref2[3],
                    GraphicsLayer = _ref2[4],
                    IdentifyTask = _ref2[5],
                    IdentifyParameters = _ref2[6],
                    Point = _ref2[7],
                    SimpleMarkerSymbol = _ref2[8],
                    GroupLayer = _ref2[9];

                // Create a polygon geometry


                var children = React.Children.map(_this2.props.children, function (child) {
                    if (child.type.displayName === 'ArcticMapLayerPopup') {
                        return child;
                        // return React.cloneElement(child, {
                        //     // ref: 'editor'
                        //   })
                    }
                });

                self.layerRenderers = children;

                // this.setState({ graphic });

                if (self.props.type === "feature") {

                    var featureLayer = new FeatureLayer({
                        url: self.props.src,
                        outFields: ["*"]
                    });
                    self.layerRef = featureLayer;
                    self.state.map.add(featureLayer);
                }

                if (self.props.type === "group") {
                    var gtrans = 1;
                    if (self.props.transparency) {
                        gtrans = Number.parseFloat(self.props.transparency);
                    }
                    var srcsplit = self.props.src.split(',');

                    var gmaplayer = new GroupLayer({
                        //url: self.props.src,
                        opacity: gtrans

                    });
                    if (self.props.title) {

                        gmaplayer.title = self.props.title;
                    }

                    srcsplit.forEach(function (src) {
                        var glayer = new MapImageLayer({
                            url: src,
                            opacity: gtrans

                        });
                        gmaplayer.layers.add(glayer);
                    });

                    self.layerRef = gmaplayer;
                    self.state.map.add(gmaplayer);
                }

                if (self.props.type === "dynamic") {

                    var trans = 1;
                    if (self.props.transparency) {
                        trans = Number.parseFloat(self.props.transparency);
                    }

                    var maplayer = new MapImageLayer({
                        url: self.props.src,
                        opacity: trans

                    });

                    if (self.props.childsrc) ;

                    if (self.props.title) {

                        maplayer.title = self.props.title;
                    }
                    maplayer.when(function () {

                        var layerids = [];
                        maplayer.allSublayers.items.forEach(function (sublayer) {
                            layerids.push(sublayer.id);
                        });
                        layerids.reverse();

                        self.identifyTask = new IdentifyTask(self.props.src);
                        self.params = new IdentifyParameters();
                        self.params.tolerance = 3;
                        self.params.layerIds = layerids;
                        self.params.layerOption = "visible";
                        self.params.width = self.state.view.width;
                        self.params.height = self.state.view.height;
                        self.params.returnGeometry = true;
                        self.params.returnGeometry = self.state.blockSelect;

                        //  console.log(self.params);
                    });

                    self.layerRef = maplayer;
                    self.state.map.add(maplayer);
                }

                if (self.props.type === "image") {

                    var imagelayer = new ImageryLayer({
                        url: self.props.src,
                        format: "jpgpng" // server exports in either jpg or png format
                    });
                    self.layerRef = imagelayer;
                    self.state.map.add(imagelayer);
                }

                if (self.props.type === "geojson") {

                    var geojsonLayer = new GraphicsLayer({ title: 'GeoJSON Layer', listMode: "hide" });
                    // var geojsonLayer = new GeoJSONLayer({
                    //     //source: self.props.src,
                    //     //copyright: "USGS Earthquakes",
                    //     //popupTemplate: template
                    //   });
                    var dataarr = [];

                    if (_typeof(self.props.src) === 'object') {
                        if (self.props.src.features) {
                            dataarr = self.props.src.features;
                        } else {
                            dataarr = self.props.src;
                        }
                    }

                    if (self.props.title) {

                        geojsonLayer.title = self.props.title;
                    }

                    dataarr.forEach(function (obj) {
                        //var esrijson = geojsonToArcGIS(obj);
                        if (obj.geometry.type === "Point") {

                            var popupTemplate = {
                                title: "{Name}",
                                content: self.props.template
                            };

                            var point = new Point({
                                longitude: obj.geometry.coordinates[1],
                                latitude: obj.geometry.coordinates[0]

                            });

                            // Create a symbol for drawing the point
                            var markerSymbol = new SimpleMarkerSymbol({
                                color: [226, 119, 40],
                                outline: {
                                    color: [255, 255, 255],
                                    width: 1
                                }
                            });

                            // Create a graphic and add the geometry and symbol to it
                            var pointGraphic = new Graphic({
                                geometry: point,
                                symbol: markerSymbol,
                                attributes: obj.properties,
                                popupTemplate: popupTemplate
                                // extent : new Extent().centerAt(point)
                            });

                            // Add the graphic to the view
                            geojsonLayer.graphics.add(pointGraphic);
                        }
                    });

                    self.layerRef = geojsonLayer;
                    self.state.map.add(geojsonLayer);
                    // var imagelayer = new ImageryLayer({
                    //     url: self.props.src,
                    //     format: "jpgpng" // server exports in either jpg or png format
                    // });
                    // self.layerRef = imagelayer;
                    // self.state.map.add(imagelayer);
                }

                self.layerRef.when(function () {
                    setTimeout(function () {
                        var evt = new Event('ready', { bubbles: true });
                        Object.defineProperty(evt, 'target', { value: self, enumerable: true });

                        if (self.props.onready) {
                            self.props.onready(evt);
                        }
                    }, 500);
                });

                //this.state.view.graphics.add(graphic);
            }); //.catch ((err) => console.error(err));
        }
    }, {
        key: 'zoomto',
        value: function zoomto() {
            if (this.layerRef.graphics) {
                this.state.view.goTo(this.layerRef.graphics.items);
            }
        }
    }, {
        key: 'renderPopup',
        value: function renderPopup(feature, result) {

            if (result.layerId !== undefined && this.layerRenderers) {
                var popuprender = this.layerRenderers.find(function (l) {
                    return l.props.layerid === result.layerId.toString();
                });

                if (popuprender && popuprender.props.popup !== undefined) {
                    var ele = popuprender.props.popup(feature, result);

                    if (ele) {
                        var workingdiv = document.createElement('div');
                        ReactDOM.render(ele, workingdiv);
                        return workingdiv;
                    }
                }
            }

            var popupText = "";
            var atts = Object.getOwnPropertyNames(feature.attributes);
            atts.forEach(function (att) {
                if (att === 'layerName') ; else {
                    popupText += '<b>' + att + '</b> : ' + feature.attributes[att] + '<br/>';
                }
            });

            return popupText;
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }, {
        key: 'identify',
        value: function identify(event, callback) {

            var self = this;
            if (this.props.type === "geojson") {

                this.state.view.hitTest(event).then(function (htresponse) {

                    // console.log("Identify on geojson");
                    //console.log(htresponse);
                    var mapPoint = event.mapPoint;
                    var response = {
                        layer: self.layerRef,
                        results: htresponse.results.map(function (r) {
                            return { feature: r.graphic, layerName: self.layerRef.title };
                        })
                    };
                    callback(response);
                });
            } else {

                if (!this.params) {
                    callback(null);return;
                }

                this.params.geometry = event.mapPoint;
                this.params.mapExtent = this.state.view.extent;
                this.params.returnGeometry = true;
                //document.getElementById("viewDiv").style.cursor = "wait";
                this.identifyTask.execute(this.params).then(function (response) {

                    callback(response);
                });
            }
        }
    }]);
    return ArcticMapLayer;
}(React.Component);

ArcticMapLayer.displayName = "ArcticMapLayer";

var css$1 = "\r\n#ArcticMapEdit_topbar__2WB6X {\r\n    background: #fff;\r\n   \r\n   \r\n    padding: 2px;\r\n  }\r\n\r\n  .ArcticMapEdit_action-button__3NbvD {\r\n    display: block;\r\n    font-size: 16px;\r\n    background-color: transparent;\r\n    border: 1px solid #D3D3D3;\r\n    color: #6e6e6e;\r\n    height: 32px;\r\n    width: 32px;\r\n    text-align: center;\r\n    box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);\r\n    padding: 2px;\r\n  }\r\n\r\n  .ArcticMapEdit_action-button__3NbvD:hover,\r\n  .ArcticMapEdit_action-button__3NbvD:focus {\r\n    background: #0079c1;\r\n    color: #e4e4e4;\r\n  }\r\n\r\n  .ArcticMapEdit_active__2wj6f {\r\n    background: #0079c1;\r\n    color: #e4e4e4;\r\n  }";
styleInject(css$1);

var ArcticMapEdit$1 = function (_React$Component) {
    inherits(ArcticMapEdit, _React$Component);

    function ArcticMapEdit(props) {
        classCallCheck(this, ArcticMapEdit);

        var _this = possibleConstructorReturn(this, (ArcticMapEdit.__proto__ || Object.getPrototypeOf(ArcticMapEdit)).call(this, props));

        props.map.editor = _this;
        _this.state = {
            map: props.map,
            view: props.view,
            graphic: null,
            hideEditors: false,
            editing: false,
            showUploading: false
        };

        _this.uploadPanel = React.createRef();
        return _this;
    }

    createClass(ArcticMapEdit, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.props.view.graphics.remove(this.state.graphic);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            var self = this;
            reactArcgis.loadModules(["esri/Graphic", "esri/layers/GraphicsLayer", "esri/widgets/Sketch/SketchViewModel", "esri/geometry/Geometry", "esri/geometry/Polygon", "esri/geometry/geometryEngine"]).then(function (_ref) {
                var _ref2 = slicedToArray(_ref, 6),
                    Graphic = _ref2[0],
                    GraphicsLayer = _ref2[1],
                    SketchViewModel = _ref2[2],
                    Geometry = _ref2[3],
                    Polygon = _ref2[4],
                    geometryEngine = _ref2[5];

                var tempGraphicsLayer = new GraphicsLayer({ title: 'Edit Layer', listMode: "hide" });
                self.setState({ tempGraphicsLayer: tempGraphicsLayer });

                self.state.map.add(tempGraphicsLayer);

                var sketchViewModel = new SketchViewModel({
                    view: self.state.view,
                    layer: tempGraphicsLayer,
                    pointSymbol: {
                        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                        style: "circle",
                        color: "yellow",
                        size: "3px",
                        outline: { // autocasts as new SimpleLineSymbol()
                            color: [255, 255, 255],
                            width: 3
                        }
                    },
                    polylineSymbol: {
                        type: "simple-line", // autocasts as new SimpleLineSymbol()
                        color: "yellow",
                        width: "3",
                        style: "solid"
                    },
                    polygonSymbol: {
                        type: "simple-fill", // autocasts as new SimpleFillSymbol()
                        color: "rgba(224, 206, 69, 0.8)",
                        style: "solid",
                        outline: {
                            color: "yellow",
                            width: 3
                        }
                    }
                });

                self.setState({ tempGraphicsLayer: tempGraphicsLayer, sketchViewModel: sketchViewModel });

                self.setUpClickHandler.bind(_this2);

                sketchViewModel.on("create", function (event) {

                    if (event.state === 'complete') {

                        tempGraphicsLayer.graphics = [event.graphic];
                        if (_this2.props.single) {

                            _this2.setState({ hideEditors: true });
                        }

                        setTimeout(function () {

                            self.setState({ geojson: arcgisToGeojsonUtils.arcgisToGeoJSON(event.graphic.geometry.toJSON()), datajson: event.graphic.toJSON(), editing: false });
                            self.firenewfeature();
                        }, 1000);
                    }
                });

                sketchViewModel.on("update", function (event) {
                    self.setState({ editing: true });
                    if (event.state === 'complete' || event.state === 'cancel') {
                        // const graphic = new Graphic({
                        //     geometry: event.graphic.geometry,
                        //     symbol: event.graphic.symbol
                        // });
                        //tempGraphicsLayer.add(event.graphic);
                        // if (this.props.single) {
                        //     console.log("Added one feature");
                        //     this.setState({ hideEditors: true });
                        // }

                        setTimeout(function () {
                            self.setState({ geojson: arcgisToGeojsonUtils.arcgisToGeoJSON(event.graphics[0].geometry.toJSON()), datajson: event.graphics[0].toJSON() });
                            //this.geojson = event.geometry;
                            self.firenewfeature();
                        }, 1000);
                    }
                });

                // Listen the sketchViewModel's update-complete and update-cancel events
                sketchViewModel.on("update-complete", function (event) {
                    event.graphic.geometry = event.geometry;
                    tempGraphicsLayer.graphics = [event.graphic];
                    //tempGraphicsLayer.add(event.graphic);

                    // set the editGraphic to null update is complete or cancelled.
                    self.state.editGraphic = null;

                    console.log("UPDATED");
                });

                _this2.top_right_node = document.createElement("div");
                self.state.view.ui.add(_this2.top_right_node, "top-right");

                self.setState({ loaded: true });

                //self.setUpClickHandler();


                // scoped methods
                self.setEditFeature = function (feature, nofire, type, zoomto, addto) {
                    if (nofire === null) {
                        nofire = false;
                    }

                    if (type === null) {
                        type = "polygon";
                    }

                    if (zoomto === null) {
                        zoomto = true;
                    }

                    if (addto === null) {
                        addto = false;
                    }

                    if (!feature.geometry.type) {
                        if (type === "polygon") {

                            feature.geometry = new Polygon(feature.geometry);
                            feature.geometry.type = "polygon";
                        }
                    }

                    _this2.state.sketchViewModel.cancel();
                    if (!addto) {
                        _this2.state.tempGraphicsLayer.removeAll();
                    }
                    _this2.setState({ hideEditors: false, geojson: null });

                    var graphic = null;
                    if (!feature.geometry.toJSON && feature.symbol) {
                        graphic = Graphic.fromJSON(feature);
                    } else {

                        graphic = new Graphic({
                            geometry: feature.geometry,
                            symbol: _this2.state.sketchViewModel.polygonSymbol
                        });
                    }

                    if (graphic.geometry === null) {
                        graphic.geometry = feature.geometry;
                    }

                    //console.log(feature);
                    _this2.state.tempGraphicsLayer.add(graphic);

                    if (_this2.state.tempGraphicsLayer.graphics.items.length > 0) {

                        var geometrys = _this2.state.tempGraphicsLayer.graphics.items.map(function (i) {
                            return i.geometry;
                        });

                        var merge = geometryEngine.union(geometrys);
                        console.log(merge);
                        graphic = new Graphic({
                            geometry: merge,
                            symbol: _this2.state.sketchViewModel.polygonSymbol
                        });
                        _this2.state.tempGraphicsLayer.graphics = [graphic];
                    }
                    //this.state.tempGraphicsLayer.graphics = [graphic];
                    if (_this2.props.single) {

                        _this2.setState({ hideEditors: true });
                    }

                    if (zoomto) {

                        self.state.view.goTo(graphic);
                    }

                    var geometry = feature.geometry;
                    if (geometry && !geometry.toJSON) {
                        geometry = Geometry.fromJSON(geometry);
                    }

                    _this2.setState({ geojson: arcgisToGeojsonUtils.arcgisToGeoJSON(geometry.toJSON()), datajson: graphic.toJSON() });

                    if (nofire === true) ; else {
                        self.firenewfeature();
                    }
                };

                self.setEditFeature = self.setEditFeature.bind(self);

                self.setGeoJson = function (geojson) {
                    //var esrijson = geojsonToArcGIS(geojson);


                };
                self.setGeoJson = self.setGeoJson.bind(self);
            }); //.catch ((err) => console.error(err));

        }
    }, {
        key: "firenewfeature",
        value: function firenewfeature() {
            var self = this;
            var evt = new Event('newfeature', { bubbles: true });
            Object.defineProperty(evt, 'target', { value: this, enumerable: true });
            evt.data = self.state.datajson;

            if (self.props.onnewfeature) {
                self.props.onnewfeature(evt);
            }

            setTimeout(function () {
                self.setState({ editing: false });
            }, 200);
        }
    }, {
        key: "addPointClick",
        value: function addPointClick() {
            this.state.sketchViewModel.create("point", { mode: "click" });
            this.setState({ editing: true });
        }
    }, {
        key: "addLineClick",
        value: function addLineClick() {
            this.state.sketchViewModel.create("polyline", { mode: "click" });
            this.setState({ editing: true });
        }
    }, {
        key: "addPolyClick",
        value: function addPolyClick() {
            this.state.sketchViewModel.create("polygon", { mode: "click" });
            this.setState({ editing: true });
        }
    }, {
        key: "addRecClick",
        value: function addRecClick() {
            this.state.sketchViewModel.create("rectangle", { mode: "click" });
            this.setState({ editing: true });
        }
    }, {
        key: "addCircleClick",
        value: function addCircleClick() {
            this.state.sketchViewModel.create("circle", { mode: "click" });
            this.setState({ editing: true });
        }
    }, {
        key: "fileUploaded",
        value: function fileUploaded(evt) {
            var self = this;
            var fileName = evt.target.value.toLowerCase();
            if (fileName.indexOf(".zip") !== -1) {
                // console.log("addEventListener", self);
                self.processShapeFile(fileName, evt.target);
            } else if (fileName.indexOf(".kml") !== -1) {
                // console.log("addEventListener", self);
                self.processKMLFile(fileName, evt.target);
            } else if (fileName.indexOf(".geojson") !== -1) {
                // console.log("addEventListener", self);

                self.processGeojsonFile(fileName, evt.target);
            } else {
                document.getElementById("upload-status").innerHTML = '<p style="color:red">Only shapefile(.zip), .kml, or .geojson are supported</p>';
            }
        }
    }, {
        key: "readTextFile",
        value: function readTextFile(file) {
            return new Promise(function (res, rej) {
                var fr = new FileReader();
                fr.onload = function (evt) {
                    res(evt.target.result);
                };
                fr.readAsText(file);
            });
        }
    }, {
        key: "kmlColor",
        value: function kmlColor(v) {
            var color, opacity;
            v = v || '';
            if (v.substr(0, 1) === '#') {
                v = v.substr(1);
            }
            if (v.length === 6 || v.length === 3) {
                color = v;
            }
            if (v.length === 8) {
                opacity = parseInt(v.substr(0, 2), 16) / 255;
                color = '#' + v.substr(6, 2) + v.substr(4, 2) + v.substr(2, 2);
            }
            return [color, isNaN(opacity) ? undefined : opacity];
        }
    }, {
        key: "processKMLFile",
        value: function processKMLFile(fileName, form) {
            var file = fileName.replace(/^.*[\\\/]/, '');
            var self = this;

            this.readTextFile(form.files[0]).then(function (text) {
                var parser = new DOMParser();
                var gj = self.fc();
                var xmlDoc = parser.parseFromString(text, "text/xml");
                var placemarks = self.get(xmlDoc, "Placemark");
                var styles = self.get(xmlDoc, "Style");
                var styleMaps = self.get(xmlDoc, "StyleMap");
                var styleIndex = {};
                var styleByHash = {};
                var styleMapIndex = {};
                for (var k = 0; k < styles.length; k++) {
                    var hash = self.okhash(self.xml2str(styles[k])).toString(16);
                    styleIndex['#' + self.attr(styles[k], 'id')] = hash;
                    styleByHash[hash] = styles[k];
                }
                for (var l = 0; l < styleMaps.length; l++) {
                    styleIndex['#' + self.attr(styleMaps[l], 'id')] = self.okhash(self.xml2str(styleMaps[l])).toString(16);
                    var pairs = self.get(styleMaps[l], 'Pair');
                    var pairsMap = {};
                    for (var m = 0; m < pairs.length; m++) {
                        pairsMap[self.nodeVal(self.get1(pairs[m], 'key'))] = self.nodeVal(self.get1(pairs[m], 'styleUrl'));
                    }
                    styleMapIndex['#' + self.attr(styleMaps[l], 'id')] = pairsMap;
                }
                for (var j = 0; j < placemarks.length; j++) {
                    gj.features = gj.features.concat(self.getPlacemark(placemarks[j]));
                }

                var features = [];

                gj.features.forEach(function (f) {
                    var esrijson = arcgisToGeojsonUtils.geojsonToArcGIS(f);

                    features.push(esrijson);
                });
                self.addGeojsonToMap(features, file);
                self.uploadPanel.current.toggle();
            });
        }
    }, {
        key: "getPlacemark",
        value: function getPlacemark(root) {
            var geomsAndTimes = this.getGeometry(root),
                i,
                properties = {},
                name = this.nodeVal(this.get1(root, 'name')),
                address = this.nodeVal(this.get1(root, 'address')),
                styleUrl = this.nodeVal(this.get1(root, 'styleUrl')),
                styleIndex = {},
                styleMapIndex = {},
                styleByHash = {},
                description = this.nodeVal(this.get1(root, 'description')),
                timeSpan = this.get1(root, 'TimeSpan'),
                timeStamp = this.get1(root, 'TimeStamp'),
                extendedData = this.get1(root, 'ExtendedData'),
                lineStyle = this.get1(root, 'LineStyle'),
                polyStyle = this.get1(root, 'PolyStyle'),
                visibility = this.get1(root, 'visibility');

            if (!geomsAndTimes.geoms.length) return [];
            if (name) properties.name = name;
            if (address) properties.address = address;

            if (styleUrl) {
                if (styleUrl[0] !== '#') {
                    styleUrl = '#' + styleUrl;
                }
                properties.styleUrl = styleUrl;
                if (styleIndex[styleUrl]) {
                    properties.styleHash = styleIndex[styleUrl];
                }
                if (styleMapIndex[styleUrl]) {
                    properties.styleMapHash = styleMapIndex[styleUrl];
                    properties.styleHash = styleIndex[styleMapIndex[styleUrl].normal];
                }
                var style = styleByHash[properties.styleHash];
                if (style) {
                    if (!lineStyle) lineStyle = this.get1(style, 'LineStyle');
                    if (!polyStyle) polyStyle = this.get1(style, 'PolyStyle');
                    var iconStyle = this.get1(style, 'IconStyle');
                    if (iconStyle) {
                        var icon = this.get1(iconStyle, 'Icon');
                        if (icon) {
                            var href = this.nodeVal(this.get1(icon, 'href'));
                            if (href) properties.icon = href;
                        }
                    }
                }
                if (description) properties.description = description;
                if (timeSpan) {
                    var begin = this.nodeVal(this.get1(timeSpan, 'begin'));
                    var end = this.nodeVal(this.get1(timeSpan, 'end'));
                    properties.timespan = { begin: begin, end: end };
                }
                if (timeStamp) {
                    properties.timestamp = this.nodeVal(this.get1(timeStamp, 'when'));
                }
                if (lineStyle) {
                    var linestyles = this.kmlColor(this.nodeVal(this.get1(lineStyle, 'color'))),
                        color = linestyles[0],
                        opacity = linestyles[1],
                        width = parseFloat(this.nodeVal(this.get1(lineStyle, 'width')));
                    if (color) properties.stroke = color;
                    if (!isNaN(opacity)) properties['stroke-opacity'] = opacity;
                    if (!isNaN(width)) properties['stroke-width'] = width;
                }
                if (polyStyle) {
                    var polystyles = this.kmlColor(this.nodeVal(this.get1(polyStyle, 'color'))),
                        pcolor = polystyles[0],
                        popacity = polystyles[1],
                        fill = this.nodeVal(this.get1(polyStyle, 'fill')),
                        outline = this.nodeVal(this.get1(polyStyle, 'outline'));
                    if (pcolor) properties.fill = pcolor;
                    if (!isNaN(popacity)) properties['fill-opacity'] = popacity;
                    if (fill) properties['fill-opacity'] = fill === '1' ? properties['fill-opacity'] || 1 : 0;
                    if (outline) properties['stroke-opacity'] = outline === '1' ? properties['stroke-opacity'] || 1 : 0;
                }
                if (extendedData) {
                    var datas = this.get(extendedData, 'Data'),
                        simpleDatas = this.get(extendedData, 'SimpleData');

                    for (i = 0; i < datas.length; i++) {
                        properties[datas[i].getAttribute('name')] = this.nodeVal(this.get1(datas[i], 'value'));
                    }
                    for (i = 0; i < simpleDatas.length; i++) {
                        properties[simpleDatas[i].getAttribute('name')] = this.nodeVal(simpleDatas[i]);
                    }
                }
                if (visibility) {
                    properties.visibility = this.nodeVal(visibility);
                }
                if (geomsAndTimes.coordTimes.length) {
                    properties.coordTimes = geomsAndTimes.coordTimes.length === 1 ? geomsAndTimes.coordTimes[0] : geomsAndTimes.coordTimes;
                }
                var feature = {
                    type: 'Feature',
                    geometry: geomsAndTimes.geoms.length === 1 ? geomsAndTimes.geoms[0] : {
                        type: 'GeometryCollection',
                        geometries: geomsAndTimes.geoms
                    },
                    properties: properties
                };
                if (this.attr(root, 'id')) feature.id = this.attr(root, 'id');
                return [feature];
            }
        }
    }, {
        key: "getGeometry",
        value: function getGeometry(root) {
            var geotypes = ['Polygon', 'LineString', 'Point', 'Track', 'gx:Track'];
            var geomNode,
                geomNodes,
                i,
                j,
                k,
                geoms = [],
                coordTimes = [];
            if (this.get1(root, 'MultiGeometry')) {
                return this.getGeometry(this.get1(root, 'MultiGeometry'));
            }
            if (this.get1(root, 'MultiTrack')) {
                return this.getGeometry(this.get1(root, 'MultiTrack'));
            }
            if (this.get1(root, 'gx:MultiTrack')) {
                return this.getGeometry(this.get1(root, 'gx:MultiTrack'));
            }
            for (i = 0; i < geotypes.length; i++) {
                geomNodes = this.get(root, geotypes[i]);
                if (geomNodes) {
                    for (j = 0; j < geomNodes.length; j++) {
                        geomNode = geomNodes[j];
                        if (geotypes[i] === 'Point') {
                            geoms.push({
                                type: 'Point',
                                coordinates: this.coord1(this.nodeVal(this.get1(geomNode, 'coordinates')))
                            });
                        } else if (geotypes[i] === 'LineString') {
                            geoms.push({
                                type: 'LineString',
                                coordinates: this.coord(this.nodeVal(this.get1(geomNode, 'coordinates')))
                            });
                        } else if (geotypes[i] === 'Polygon') {
                            var rings = this.get(geomNode, 'LinearRing'),
                                coords = [];
                            for (k = 0; k < rings.length; k++) {
                                console.log("rings[k]", rings[k]);
                                coords.push(this.coord(this.nodeVal(this.get1(rings[k], 'coordinates'))));
                            }
                            geoms.push({
                                type: 'Polygon',
                                coordinates: coords
                            });
                        } else if (geotypes[i] === 'Track' || geotypes[i] === 'gx:Track') {
                            var track = this.gxCoords(geomNode);
                            geoms.push({
                                type: 'LineString',
                                coordinates: track.coords
                            });
                            if (track.times.length) coordTimes.push(track.times);
                        }
                    }
                }

                return {
                    geoms: geoms,
                    coordTimes: coordTimes
                };
            }
        }
    }, {
        key: "nodeVal",
        value: function nodeVal(x) {
            if (x) {
                this.norm(x);
            }
            return x && x.textContent || '';
        }
    }, {
        key: "fc",
        value: function fc() {
            return {
                type: 'FeatureCollection',
                features: []
            };
        }
    }, {
        key: "xml2str",
        value: function xml2str(str) {
            var serializer;
            if (typeof XMLSerializer !== 'undefined') {
                /* istanbul ignore next */
                serializer = new XMLSerializer();
            }
            if (str.xml !== undefined) return str.xml;
            return serializer.serializeToString(str);
        }
    }, {
        key: "okhash",
        value: function okhash(x) {
            if (!x || !x.length) return 0;
            for (var i = 0, h = 0; i < x.length; i++) {
                h = (h << 5) - h + x.charCodeAt(i) | 0;
            }return h;
        }
    }, {
        key: "get",
        value: function get$$1(x, y) {
            return x.getElementsByTagName(y);
        }
    }, {
        key: "attr",
        value: function attr(x, y) {
            return x.getAttribute(y);
        }
    }, {
        key: "attrf",
        value: function attrf(x, y) {
            return parseFloat(this.attr(x, y));
        }
    }, {
        key: "get1",
        value: function get1(x, y) {
            var n = this.get(x, y);
            return n.length ? n[0] : null;
        }
    }, {
        key: "norm",
        value: function norm(el) {
            if (el.normalize) {
                el.normalize();
            }return el;
        }
    }, {
        key: "coord1",
        value: function coord1(v) {
            var removeSpace = /\s*/g;
            return this.numarray(v.replace(removeSpace, '').split(','));
        }
    }, {
        key: "coord",
        value: function coord(v) {
            var trimSpace = /^\s*|\s*$/g;
            var splitSpace = /\s+/;
            var coords = v.replace(trimSpace, '').split(splitSpace),
                o = [];

            for (var i = 0; i < coords.length; i++) {
                o.push(this.coord1(coords[i]));
            }
            console.log("coord o", o);
            return o;
        }
    }, {
        key: "gxCoord",
        value: function gxCoord(v) {
            return this.numarray(v.split(' '));
        }
    }, {
        key: "numarray",
        value: function numarray(x) {

            for (var j = 0, o = []; j < x.length; j++) {
                o[j] = parseFloat(x[j]);
            }
            return o;
        }
    }, {
        key: "gxCoords",
        value: function gxCoords(root) {
            var elems = this.get(root, 'coord', 'gx'),
                coords = [],
                times = [];
            if (elems.length === 0) elems = this.get(root, 'gx:coord');
            for (var i = 0; i < elems.length; i++) {
                coords.push(this.gxCoord(this.nodeVal(elems[i])));
            }var timeElems = this.get(root, 'when');
            for (var j = 0; j < timeElems.length; j++) {
                times.push(this.nodeVal(timeElems[j]));
            }return {
                coords: coords,
                times: times
            };
        }
    }, {
        key: "processGeojsonFile",
        value: function processGeojsonFile(fileName, form) {

            var file = fileName.replace(/^.*[\\\/]/, '');
            var self = this;
            this.readTextFile(form.files[0]).then(function (text) {

                var geojson = JSON.parse(text);
                var features = [];

                geojson.features.forEach(function (f) {
                    var esrijson = arcgisToGeojsonUtils.geojsonToArcGIS(f);

                    features.push(esrijson);
                });

                self.addGeojsonToMap(features, file);
                self.uploadPanel.current.toggle();
            });
        }
    }, {
        key: "processShapeFile",
        value: function processShapeFile(fileName, form) {

            var self = this;
            self.uploadPanel.current.toggle();
            var name = fileName.split(".");
            name = name[0].replace("c:\\fakepath\\", "");

            var parms = {
                name: name,
                targetSR: self.state.view.extent.spatialReference,
                maxRecordCount: 1000,
                enforceInputFileSizeLimit: true,
                enforceOutputJsonSizeLimit: true
            };

            parms.generalize = true;
            parms.maxAllowableOffset = 10;
            parms.reducePrecision = true;
            parms.numberOfDigitsAfterDecimal = 0;
            var myContent = {
                filetype: "shapefile",
                publishParameters: JSON.stringify(parms),
                f: "json",
                'content-type': 'multipart/form-data'
            };

            var portalUrl = "https://www.arcgis.com";

            var query = Object.keys(myContent).map(function (k) {
                return escape(k) + '=' + escape(myContent[k]);
            }).join('&');

            reactArcgis.loadModules(['esri/request']).then(function (_ref3) {
                var _ref4 = slicedToArray(_ref3, 1),
                    request = _ref4[0];

                request(portalUrl + "/sharing/rest/content/features/generate", {
                    query: myContent,
                    body: new FormData(form.form),
                    //body: document.getElementById("uploadForm"),
                    responseType: "json"
                }).then(function (response) {
                    var layerName = response.data.featureCollection.layers[0].layerDefinition.name;
                    self.addShapefileToMap(response.data.featureCollection, layerName);
                });
            });
        }
    }, {
        key: "addShapefileToMap",
        value: function addShapefileToMap(featureCollection, layerName) {
            var self = this;
            reactArcgis.loadModules(['esri/Graphic', 'esri/layers/FeatureLayer', 'esri/layers/support/Field', 'esri/PopupTemplate']).then(function (_ref5) {
                var _ref6 = slicedToArray(_ref5, 4),
                    Graphic = _ref6[0],
                    FeatureLayer = _ref6[1],
                    Field = _ref6[2],
                    PopupTemplate = _ref6[3];

                var sourceGraphics = [];
                var layers = featureCollection.layers.map(function (layer) {

                    var graphics = layer.featureSet.features.map(function (feature) {
                        var gfx = Graphic.fromJSON(feature);
                        gfx.symbol = {
                            type: "simple-fill", // autocasts as new SimpleFillSymbol()
                            color: "rgba(224, 206, 69, 0.8)",
                            style: "solid",
                            outline: {
                                color: "yellow",
                                width: 3
                            }
                        };
                        return gfx;
                    });
                    sourceGraphics = sourceGraphics.concat(graphics);
                    var featureLayer = new FeatureLayer({
                        title: "Shape File: " + layerName,
                        //objectIDField: "FID",
                        source: graphics,
                        fields: layer.layerDefinition.fields.map(function (field) {
                            return Field.fromJSON(field);
                        })
                    });
                    return featureLayer;
                });

                layers[0].title = layerName;

                self.state.map.addMany(layers);

                self.state.view.goTo(sourceGraphics);

                var props = {
                    title: "Shape File: " + layerName,
                    transparency: ".32",
                    identmaxzoom: "13",
                    blockidentselect: true,
                    type: "geojson",
                    src: "",
                    map: self.state.map,
                    view: self.state.view
                };

                var aml = new ArcticMapLayer(props);
                aml.layerRef = layers[0];
                aml.context = window._map.layers[0].context;
                aml.layerRef.title = props.title;
                //aml.componentDidMount();
                //console.log("aml", aml);
                self.state.map.amlayers.push(aml);
                //window._map.props.childern.push(aml);

                //self.setState({ fileLayer:  aml });
            });
        }
    }, {
        key: "addGeojsonToMap",
        value: function addGeojsonToMap(featureCollection, layerName) {
            var self = this;
            reactArcgis.loadModules(['esri/Graphic', 'esri/layers/FeatureLayer', 'esri/layers/support/Field', 'esri/PopupTemplate', "esri/renderers/SimpleRenderer"]).then(function (_ref7) {
                var _ref8 = slicedToArray(_ref7, 5),
                    Graphic = _ref8[0],
                    FeatureLayer = _ref8[1],
                    Field = _ref8[2],
                    PopupTemplate = _ref8[3],
                    SimpleRenderer = _ref8[4];
                var symbol = {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    color: "rgba(224, 206, 69, 0.8)",
                    style: "solid",
                    outline: {
                        color: "red",
                        width: 2
                    }
                };

                var i = 0;
                var graphics = featureCollection.map(function (feature) {

                    feature.attributes["OBJECTID"] = i++;
                    var gfx = Graphic.fromJSON(feature);

                    gfx.symbol = symbol;
                    return gfx;
                });

                var featureLayer = new FeatureLayer({
                    title: "GEOJSON File: " + layerName,
                    objectIdField: "OBJECTID",
                    //renderer : SimpleRenderer.fromJSON(symbol) ,
                    source: graphics
                    // fields: layer.layerDefinition.fields.map(function (field) {
                    //     return Field.fromJSON(field);
                    // })

                });

                self.state.map.add(featureLayer);
                self.state.view.goTo(graphics);

                var props = {
                    title: "GEOJSON File: " + layerName,
                    transparency: ".32",
                    identmaxzoom: "13",
                    blockidentselect: true,
                    type: "geojson",
                    src: "",
                    map: self.state.map,
                    view: self.state.view
                };

                var aml = new ArcticMapLayer(props);
                aml.layerRef = featureLayer;
                aml.context = window._map.layers[0].context;
                aml.layerRef.title = props.title;

                self.state.map.amlayers.push(aml);
            });
        }
    }, {
        key: "reset",
        value: function reset() {
            this.state.sketchViewModel.cancel();
            this.state.tempGraphicsLayer.removeAll();
            this.setState({ hideEditors: false, geojson: null });
        }
    }, {
        key: "widgetRender",
        value: function widgetRender() {
            return React.createElement(
                "div",
                { id: "topbar" },
                this.state.hideEditors === false && React.createElement(
                    "span",
                    null,
                    this.props.point && React.createElement(ArcticMapButton, { esriicon: "blank-map-pin", onclick: this.addPointClick.bind(this), title: "Draw point" }),
                    this.props.line && React.createElement(ArcticMapButton, { esriicon: "polyline", onclick: this.addLineClick.bind(this), title: "Draw polyline" }),
                    this.props.polygon && React.createElement(ArcticMapButton, { esriicon: "polygon", onclick: this.addPolyClick.bind(this), title: "Draw polygon" }),
                    this.props.square && React.createElement(ArcticMapButton, { esriicon: "checkbox-unchecked", onclick: this.addRecClick.bind(this), title: "Draw rectangle" }),
                    this.props.circle && React.createElement(ArcticMapButton, { esriicon: "radio-unchecked", onclick: this.addCircleClick.bind(this), title: "Draw circle" }),
                    this.props.upload && React.createElement(
                        ArcticMapPanel,
                        { esriicon: "upload", title: "Upload Polygon", ref: this.uploadPanel },
                        React.createElement("br", null),
                        React.createElement(
                            "form",
                            { encType: "multipart/form-data", method: "post", id: "uploadForm" },
                            React.createElement(
                                "div",
                                { className: "field" },
                                React.createElement(
                                    "label",
                                    { className: "file-upload" },
                                    React.createElement(
                                        "p",
                                        null,
                                        React.createElement(
                                            "strong",
                                            null,
                                            "Select File"
                                        )
                                    ),
                                    React.createElement("input", { type: "file", name: "file", id: "inFile", onChange: this.fileUploaded.bind(this) })
                                )
                            )
                        ),
                        React.createElement("br", null),
                        React.createElement("span", { id: "upload-status" })
                    )
                ),
                React.createElement(ArcticMapButton, { esriicon: "trash", onclick: this.reset.bind(this), title: "Clear graphics" })
            );
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            if (this.top_right_node) {
                ReactDOM.render(this.widgetRender(), this.top_right_node);
            }
        }
    }, {
        key: "render",
        value: function render() {

            //return (<h2>Test</h2>);


            return React.createElement(
                "span",
                null,
                this.state.fileLayer
            );
        }
    }, {
        key: "addGraphic",
        value: function addGraphic(event) {
            // Create a new graphic and set its geometry to
            // `create-complete` event geometry.
            // const graphic = new Graphic({
            //     geometry: event.geometry,
            //     symbol: sketchViewModel.graphic.symbol
            // });
            // tempGraphicsLayer.add(graphic);
        }
    }, {
        key: "updateGraphic",
        value: function updateGraphic(event) {
            // event.graphic is the graphic that user clicked on and its geometry
            // has not been changed. Update its geometry and add it to the layer
            // event.graphic.geometry = event.geometry;
            // tempGraphicsLayer.add(event.graphic);

            // // set the editGraphic to null update is complete or cancelled.
            // editGraphic = null;
        }
    }, {
        key: "setUpClickHandler",
        value: function setUpClickHandler() {
            var self = this;
            self.state.view.on("click", function (event) {
                event.stopPropagation();
                console.log("HERE!!");
                self.state.view.hitTest(event).then(function (response) {
                    var results = response.results;
                    // Found a valid graphic
                    if (results.length && results[results.length - 1].graphic) {
                        // Check if we're already editing a graphic
                        // if (!self.state.editGraphic) {
                        // Save a reference to the graphic we intend to update
                        self.state.editGraphic = results[results.length - 1].graphic;
                        // Remove the graphic from the GraphicsLayer
                        // Sketch will handle displaying the graphic while being updated
                        // self.state.tempGraphicsLayer.spatialReference = self.state.editGraphic.geometry.spatialReference;
                        // self.state.view.spatialReference = self.state.editGraphic.geometry.spatialReference;
                        //self.state.tempGraphicsLayer.remove(self.state.editGraphic);
                        self.state.tempGraphicsLayer.graphics = [self.state.editGraphic];
                        //self.state.sketchViewModel.updateGraphics = [self.state.editGraphic];

                        self.state.sketchViewModel.update([self.state.editGraphic]);

                        //self.state.tempGraphicsLayer.graphics = [self.state.editGraphic];

                        //}
                    }
                });
            });
        }
    }, {
        key: "setActiveButton",
        value: function setActiveButton(selectedButton) {
            // focus the view to activate keyboard shortcuts for sketching
            // view.focus();
            // var elements = document.getElementsByClassName("active");
            // for (var i = 0; i < elements.length; i++) {
            //     elements[i].classList.remove("active");
            // }
            // if (selectedButton) {
            //     selectedButton.classList.add("active");
            // }
        }
    }]);
    return ArcticMapEdit;
}(React.Component);

ArcticMapEdit$1.displayName = 'ArcticMapEdit';

var css$2 = ".ArcticMapLLDSearch_lldsearchbar__1eLzA {\r\n    background: #fff;\r\n\r\n    vertical-align: top; \r\n  }\r\n\r\n\r\n  .ArcticMapLLDSearch_lldsearchbar__1eLzA div{\r\n    display: inline;\r\n  }";
var style$1 = { "lldsearchbar": "ArcticMapLLDSearch_lldsearchbar__1eLzA" };
styleInject(css$2);

// WY060140N0660W0SN180ANENE

var ArcticMapLLDSearch = function (_React$Component) {
    inherits(ArcticMapLLDSearch, _React$Component);

    function ArcticMapLLDSearch(props) {
        classCallCheck(this, ArcticMapLLDSearch);

        var _this = possibleConstructorReturn(this, (ArcticMapLLDSearch.__proto__ || Object.getPrototypeOf(ArcticMapLLDSearch)).call(this, props));

        _this.state = {
            map: props.map,
            view: props.view,
            graphic: null
        };

        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }

    createClass(ArcticMapLLDSearch, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var self = this;
            reactArcgis.loadModules(['esri/Graphic', 'esri/geometry/Geometry', 'esri/geometry/Polygon', "esri/widgets/Search/SearchSource"]).then(function (_ref) {
                var _ref2 = slicedToArray(_ref, 4),
                    Graphic = _ref2[0],
                    Geometry = _ref2[1],
                    Polygon = _ref2[2],
                    SearchSource = _ref2[3];

                //var elestring = this.createElementFromHTML( `<input type="text" placeholder="Find address or place" aria-label="Search" autocomplete="off" tabindex="0" class="esri-input esri-search__input" aria-autocomplete="list" aria-haspopup="true" aria-owns="1687b00a338-widget-1-suggest-menu" role="textbox" data-node-ref="_inputNode" title="Find address or place">`);

                self.top_right_node = document.createElement("div");

                self.Graphic = Graphic;
                self.Geometry = Geometry;
                self.Polygon = Polygon;

                self.state.view.ui.add(self.top_right_node, {
                    position: "top-right",
                    index: 0
                });

                self.search = function () {
                    return new SearchSource({
                        name: 'Legal Land Description',
                        placeholder: "example: NV 21 T38N R56E SEC 10 ALIQ SESW",

                        getSuggestions: function getSuggestions(params) {

                            return fetch("https://gis.blm.gov/arcgis/rest/services/Cadastral/BLM_Natl_PLSS_CadNSDI/MapServer/exts/CadastralSpecialServices/FindLD?legaldescription=" + params.suggestTerm.replace(/ /g, "+") + "+&returnalllevels=&f=json").then(function (r) {
                                return r.json();
                            }).then(function (data) {

                                return data.features.map(function (feature) {
                                    return {
                                        key: "name",
                                        text: feature.attributes.landdescription,
                                        sourceIndex: params.sourceIndex
                                    };
                                });
                            });
                        },

                        getResults: function getResults(params) {

                            return fetch("https://gis.blm.gov/arcgis/rest/services/Cadastral/BLM_Natl_PLSS_CadNSDI/MapServer/exts/CadastralSpecialServices/FindLD?legaldescription=" + params.suggestResult.text.replace(/ /g, "+") + "+&returnalllevels=&f=json").then(function (r) {
                                return r.json();
                            }).then(function (data) {

                                return data.features.map(function (feature) {

                                    var outfeature = Graphic.fromJSON(feature);

                                    return {
                                        key: "name",
                                        text: feature.attributes.landdescription,
                                        sourceIndex: params.sourceIndex,
                                        feature: outfeature,

                                        name: feature.attributes.landdescription
                                    };
                                });
                            });
                        }
                    });
                };
            });
        }
    }, {
        key: "searchLLD",
        value: function searchLLD(event) {

            var self = this;

            fetch("https://gis.blm.gov/arcgis/rest/services/Cadastral/BLM_Natl_PLSS_CadNSDI/MapServer/exts/CadastralSpecialServices/FindLD?legaldescription=" + this.state.searchinput + "+&returnalllevels=&f=json").then(function (r) {
                return r.json();
            }).then(function (data) {

                var popupresults = data.features.map(function (feature) {

                    feature.geometry = self.Polygon.fromJSON(feature.geometry);

                    feature = new self.Graphic(feature);

                    var displayValue = feature.attributes.landdescription;

                    feature.popupTemplate = { // autocasts as new PopupTemplate()
                        title: 'Legal Land Description',
                        content: "<b>LLD</b>: " + displayValue,
                        actions: [{ title: "Select", id: "select-action" }]
                    };

                    return feature;
                });

                if (popupresults.length > 0) {
                    self.state.view.popup.open({
                        features: popupresults,
                        location: event.mapPoint
                    });
                }
            });
        }
    }, {
        key: "handleChange",
        value: function handleChange(event) {
            this.setState({ searchinput: event.target.value });
        }
    }, {
        key: "widgetRender",
        value: function widgetRender() {
            return React.createElement(
                "div",
                { className: style$1.lldsearchbar },
                React.createElement(
                    "div",
                    { style: { display: 'inline-block', height: '32px', marginTop: '0px' } },
                    React.createElement("input", { style: { display: 'inline-block', height: '32px', verticalAlign: 'top' }, value: this.state.searchinput, onChange: this.handleChange, type: "text", placeholder: "Find legal land description", "aria-label": "Search", className: "esri-input", title: "Find leagal land desription" }),
                    React.createElement(
                        "div",
                        { style: { display: 'inline-block', width: '32px', height: '32px', verticalAlign: 'top' }, role: "button", title: "Search", className: "esri-search__submit-button esri-widget--button", onClick: this.searchLLD.bind(this) },
                        React.createElement("span", { style: { display: 'block', paddingTop: '8px' }, "aria-hidden": "true", role: "presentation", className: "esri-icon-search" })
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return null;
        }
    }]);
    return ArcticMapLLDSearch;
}(React.Component);

ArcticMapLLDSearch.displayName = 'ArcticMapLLDSearch';

var ArcticMapLayerPopup = function (_React$Component) {
    inherits(ArcticMapLayerPopup, _React$Component);

    function ArcticMapLayerPopup(props) {
        classCallCheck(this, ArcticMapLayerPopup);
        return possibleConstructorReturn(this, (ArcticMapLayerPopup.__proto__ || Object.getPrototypeOf(ArcticMapLayerPopup)).call(this, props));
    }

    createClass(ArcticMapLayerPopup, [{
        key: 'render',
        value: function render() {

            return React.createElement('span', null);
        }
    }, {
        key: 'renderPopup',
        value: function renderPopup(context) {
            if (this.props.popup) {
                return this.props.popup(context);
            }
        }
    }]);
    return ArcticMapLayerPopup;
}(React.Component);

ArcticMapLayerPopup.displayName = 'ArcticMapLayerPopup';

var ArcticMapControlArea = function (_React$Component) {
    inherits(ArcticMapControlArea, _React$Component);

    function ArcticMapControlArea(props) {
        classCallCheck(this, ArcticMapControlArea);

        var _this = possibleConstructorReturn(this, (ArcticMapControlArea.__proto__ || Object.getPrototypeOf(ArcticMapControlArea)).call(this, props));

        _this.controlNode = document.createElement("div");
        _this.props.view.ui.add(_this.controlNode, _this.props.location);
        return _this;
    }

    createClass(ArcticMapControlArea, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.controlNode) {
                ReactDOM.render(this.widgetRender(), this.controlNode, function () {});
            }
        }
    }, {
        key: 'widgetRender',
        value: function widgetRender() {

            var self = this;

            var children = React.Children.map(this.props.children, function (child) {

                // else if (child.type.name === 'ArcticMapLLDSearch') {

                //   return React.cloneElement(child, {
                //   })

                // } 


                return React.cloneElement(child, {
                    am: self.props.am
                    //ref: 'child-' + (index++)
                    //ref: (c) => { if (c) { self.childrenElements.push(c); } return 'child-' + (index++) }
                });
            });

            return React.createElement(
                'span',
                { className: 'arcticmap-area' },
                children
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement('span', null);
        }
    }]);
    return ArcticMapControlArea;
}(React.Component);

ArcticMapControlArea.displayName = 'ArcticMapControlArea';

var ArcticMapIdentify = function (_React$Component) {
  inherits(ArcticMapIdentify, _React$Component);

  function ArcticMapIdentify(props) {
    classCallCheck(this, ArcticMapIdentify);

    var _this = possibleConstructorReturn(this, (ArcticMapIdentify.__proto__ || Object.getPrototypeOf(ArcticMapIdentify)).call(this, props));

    _this.state = { mode: 1 };

    return _this;
  }

  createClass(ArcticMapIdentify, [{
    key: 'setmaptoidentify',
    value: function setmaptoidentify() {
      this.props.am.setMode("identify");
      this.setState({ mode: "identify" });
    }
  }, {
    key: 'setmaptoselect',
    value: function setmaptoselect() {

      if (this.props.am.state.mode === "select") {
        this.props.am.setMode("view");
        this.setState({ mode: "view" });
      } else {

        this.props.am.setMode("select");
        this.setState({ mode: "select" });
      }
    }
  }, {
    key: 'render',
    value: function render() {

      //cursor

      return React.createElement(
        'span',
        null,
        React.createElement(ArcticMapButton, { showactive: this.props.am.state.mode === "identify", esriicon: 'question', title: 'Identify', onclick: this.setmaptoidentify.bind(this) }),
        React.createElement(ArcticMapButton, { showactive: this.props.am.state.mode === "select", esriicon: 'cursor', title: 'Select', onclick: this.setmaptoselect.bind(this) })
      );
    }
  }]);
  return ArcticMapIdentify;
}(React.Component);

ArcticMapIdentify.displayName = 'ArcticMapIdentify';

exports.ArcticMap = ArcticMap$1;
exports.ArcticMapEdit = ArcticMapEdit$1;
exports.ArcticMapLayer = ArcticMapLayer;
exports.ArcticMapLLDSearch = ArcticMapLLDSearch;
exports.ArcticMapLayerPopup = ArcticMapLayerPopup;
exports.ArcticMapControlArea = ArcticMapControlArea;
exports.ArcticMapButton = ArcticMapButton;
exports.ArcticMapPanel = ArcticMapPanel;
exports.ArcticMapIdentify = ArcticMapIdentify;
//# sourceMappingURL=ArcticMap.js.map
