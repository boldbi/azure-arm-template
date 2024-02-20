/*!
*  filename: ej1.map.all.js
*  version : 7.4.11
*  Copyright Syncfusion Inc. 2001 - 2024. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
*/

/**
* @fileOverview Plugin to style the Html Map elements
* @copyright Copyright SyncfusionBoldBIDashboard Inc. 2001 - 2013. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
* @version 12.1 
* @author &lt;a href="mailto:licensing@syncfusion.com"&gt;SyncfusionBoldBIDashboard Inc&lt;/a&gt;
*/

(function (bbdesigner$, BoldBIDashboard, undefined) {

    BoldBIDashboard.widget("BoldBIDashboardMap", "BoldBIDashboard.datavisualization.Map", {

        validTags: ["div"],
        _initPrivateProperties: function () {
            this._rootgroup = null;
            this._bubblegroup = null;
            this._scale = 1;
            this._prevDistance = 0;
            this._tileTranslatePoint = { x: 0, y: 0 };
            this._translatePoint = { x: 0, y: 0 };
            this._prevPoint = null;
            this._Tiles = [];
            this._prevScale = 0;
            this._tileDiv = null;
            this._containerWidth = 500;
            this._containerHeight = 400;
            this._baseTranslatePoint = { x: 0, y: 0 };
            this._isDragging = false;
            this._prevLevel = 1;
            this._startPoint = { x: 0, y: 0 };
            this._stopPoint = { x: 0, y: 0 };
            this.mouseClickable = false;
            this._browser = null;
            this._baseScale = 0;
            this._mapBounds = null;
            this._svgns = "http://www.w3.org/2000/svg";
            this._ispanning = false;
            this._dragStartX = 0;
            this._isNavigationPressed = false;
            this._iskeyboardKeysPressed = false;
            this._isPolygonSelected = false;
            this._dragStartY = 0;
            this._width = 350;
            this._height = 350;
            this._isMapCoordinates = true;
            this._margintop = 0;
            this._marginleft = 0;
            this._svgDocument = null;
            this._tooltipElement = null;
            this._templateDiv = null;
            this._scrollLegendDiv = null;
            this._legendContainer = null;
            this._legendDiv = null;
            this._legendDivHeight = 0;
            this._legendDivWidth = 0;
            this._mapContainer = null;
            this._isSVG = true;
            this._VMLPathFractionCount = 0;
            this._sliderControl = null;
            this._isTileMap = false;
            this._isRendered = false;
            this._urlTemplate = null;
            this._polylineCount = 0;
            this._pointscount = 0;
            this._isPinching = false;
            this._groupSize = null;
            this._groupBorder = { x: 0, y: 0 };
			this._duplicateItems = [];
			this._duplicateItemValue = null;
        },


        defaults: {
            enableRightClick: false,
            enableRTL: false,
            background: "white",
            zoomSettings: {
                minValue: 1,
                maxValue: 100,
                factor: 1,
                level: 1,
                enableZoomOnSelection: false,
                enableZoom: true,
            },
            centerPosition: null,
            enableResize: true,
            isResponsive: true,
            enableAnimation: false,
            draggingOnSelection: false,
            navigationControl: {
                enableNavigation: false,
                content: null,
                orientation: 'vertical',
                absolutePosition: [0, 0],
                dockPosition: 'centerleft',
            },
            enableLayerChangeAnimation: false,
            enablePan: true,
            baseMapIndex: 0,
            shapeSelected: "",
            markerSelected: "",
            zoomedIn: "",
            onRenderComplete: "",
            refreshed: "",
            panned: "",
            zoomedOut: "",
            mouseover: "",
            mouseleave: "",
            click: "",
            doubleClick: "",
			legendItemRendering: "",
			shapeRendering: "",
			bubbleRendering: "",
			onLoad:"",
            layers: []
        },

        observables: [
            "baseMapIndex",
            "enablePan",
            "enableResize",
            "enableAnimation",
            "zoomSettings.level",
			"zoomSettings.minValue",
            "zoomSettings.maxValue",
            "zoomSettings.factor",
            "zoomSettings.enableZoom",
			"zoomSettings.enableZoomOnSelection",
            "navigationControl.enableNavigation",
            "navigationControl.orientation",
            "navigationControl.absolutePosition",
            "navigationControl.dockPosition",
        ],

        _tags: [{
            tag: "layers",
            attr: ["legendSettings.showLegend", "legendSettings.positionX", "legendSettings.positionY", "legendSettings.type", "legendSettings.labelOrientation",
                    "legendSettings.title", "legendSettings.mode", "legendSettings.position", "legendSettings.dockOnMap", "legendSettings.dockPosition",
                    "legendSettings.leftLabel", "legendSettings.rightLabel", "bubbleSettings.showBubble", "bubbleSettings.valuePath", "bubbleSettings.minValue",
                    "bubbleSettings.maxValue", "bubbleSettings.color", "enableSelection", "enableMouseHover", "showTooltip", "showMapItems", "mapItemsTemplate", "shapeData",
                    "dataSource", "shapePropertyPath", "shapeDataPath", "layerType", "bingMapType", "urltemplate", "shapeSettings.highlightColor",
                    "shapeSettings.highlightBorderWidth", "shapeSettings.selectionColor", "shapeSettings.fill", "shapeSettings.strokeThickness", "shapeSettings.selectionStrokeWidth",
                    "shapeSettings.stroke", "shapeSettings.selectionStroke", "shapeSettings.highlightStroke", "shapeSettings.colorValuePath", "shapeSettings.valuePath",
                    "shapeSettings.autoFill", "shapeSettings.enableGradient",

			        [{
			            tag: "markers",
			            attr: ["label", "latitude", "longitude"],
			            singular: "marker",
			        },
                    {
                        tag: "bubbleSettings.colorMappings.rangeColorMapping",
                        attr: ["from", "to", "color"],
                        singular: "bubblerangeColorMap",
                    },
                    {
                        tag: "bubbleSettings.colorMappings.equalColorMapping",
                        attr: ["value", "color"],
                        singular: "bubbleequalColorMap",
                    },
                    {
                        tag: "shapeSettings.colorMappings.rangeColorMapping",
                        attr: ["from", "to", "color"],
                        singular: "shaperangeColorMap",
                    },
                    {
                        tag: "shapeSettings.colorMappings.equalColorMapping",
                        attr: ["value", "color"],
                        singular: "shapeequalColorMap",
                    },

			        {
			            tag: "subLayers",
			            attr: ["legendSettings.showLegend", "legendSettings.positionX", "legendSettings.positionY", "legendSettings.type", "legendSettings.labelOrientation",
                                "legendSettings.title", "legendSettings.mode", "legendSettings.position", "legendSettings.dockOnMap", "legendSettings.dockPosition",
                                "legendSettings.leftLabel", "legendSettings.rightLabel", "bubbleSettings.showBubble", "bubbleSettings.valuePath", "bubbleSettings.minValue",
                                "bubbleSettings.maxValue", "bubbleSettings.color", "enableSelection", "enableMouseHover", "showTooltip", "showMapItems", "mapItemsTemplate", "shapeData",
								"dataSource", "shapePropertyPath", "shapeDataPath", "layerType", "bingMapType", "key", "urltemplate", "shapeSettings.highlightColor",
								"shapeSettings.highlightBorderWidth", "shapeSettings.selectionColor", "shapeSettings.fill", "shapeSettings.strokeThickness", "shapeSettings.selectionStrokeWidth",
								"shapeSettings.stroke", "shapeSettings.selectionStroke", "shapeSettings.highlightStroke", "shapeSettings.colorValuePath", "shapeSettings.valuePath",
								"shapeSettings.autoFill", "shapeSettings.enableGradient",
                                [{
                                    tag: "markers",
                                    attr: ["label", "latitude", "longitude"],
                                    singular: "marker",
                                },
                                {
                                    tag: "bubbleSettings.colorMappings.rangeColorMapping",
                                    attr: ["from", "to", "color"],
                                    singular: "bubblerangeColorMap",
                                },
                                {
                                    tag: "bubbleSettings.colorMappings.equalColorMapping",
                                    attr: ["value", "color"],
                                    singular: "bubbleequalColorMap",
                                },
                                {
                                    tag: "shapeSettings.colorMappings.rangeColorMapping",
                                    attr: ["from", "to", "color", "highlightcolor"],
                                    singular: "shaperangeColorMap",
                                },
                                {
                                    tag: "shapeSettings.colorMappings.equalColorMapping",
                                    attr: ["value", "color"],
                                    singular: "shapeequalColorMap",
                                }
                                ],
			            ],
			            singular: "subLayer",
			        }]
            ],
            singular: "layer",
        }],

        enableZoom: BoldBIDashboard.util.valueFunction("zoomSettings.enableZoom"),
        enableZoomOnSelection: BoldBIDashboard.util.valueFunction("zoomSettings.enableZoomOnSelection"),
        zoomLevel: BoldBIDashboard.util.valueFunction("zoomSettings.level"),
        minZoom: BoldBIDashboard.util.valueFunction("zoomSettings.minValue"),
        zoomFactor: BoldBIDashboard.util.valueFunction("zoomSettings.factor"),
        maxZoom: BoldBIDashboard.util.valueFunction("zoomSettings.maxValue"),
        baseMapIndex: BoldBIDashboard.util.valueFunction("baseMapIndex"),
        enablePan: BoldBIDashboard.util.valueFunction("enablePan"),
        enableResize: BoldBIDashboard.util.valueFunction("enableResize"),
        enableAnimation: BoldBIDashboard.util.valueFunction("enableAnimation"),
        enableNavigation: BoldBIDashboard.util.valueFunction("navigationControl.enableNavigation"),
        orientation: BoldBIDashboard.util.valueFunction("navigationControl.orientation"),
        absolutePosition: BoldBIDashboard.util.valueFunction("navigationControl.absolutePosition"),
        dockPosition: BoldBIDashboard.util.valueFunction("navigationControl.dockPosition"),

        dataTypes: {
            layers: "array"
        },

        _destroy: function () {
            this._unWireEvents();
            if (_isSVG) {
                bbdesigner$(this.element).removeClass("e-datavisualization-map e-js").find("#svgDocument").remove();
            }
            else {
                bbdesigner$(this.element).removeClass("e-datavisualization-map e-js").find("#rootGroup").remove();
            }
        },

        _setModel: function (options) {
            for (var prop in options) {
                switch (prop) {
                    case "zoomSettings":
                        if (this.enableZoom()) {
                            this.zoom(this.zoomLevel());
                        }
                        break;
                    case "baseMapIndex":
                        this.baseMapIndex(options[prop]);
                        var map = this;
                        if (this.enableAnimation()) {
                            this.model.enableLayerChangeAnimation = true;
                            bbdesigner$(this._mapContainer).animate({ opacity: 0 }, 500, function () {
                                map.refresh();
                            });

                        } else {
                            this.refresh();
                        }

                        break;
                    case "background":
                        bbdesigner$(this._mapContainer).css('background-image', this.model.background);
                }
            }
        },

        _layers: function (index, property, value, old) {
            if (property == "shapeSettings.fill" || property == "shapeSettings.strokeThickness" || property == "shapeSettings.selectionColor" || property == "shapeSettings.highlightColor") {
                this.clearShapeSelection();
            }
            else if (property == "showMapItems" || property == "dataSource") {
                this.refreshLayers();
            }
            else {
                this.refresh();
            }
        },

        _layers_markers: function (index, property, value, old) {
            this.refreshMarkers();
        },

        _layers_subLayers: function (index, property, value, old) {
            if (property == "showMapItems" || property == "dataSource") {
                this.refreshLayers();
            }
            else {
                this.refresh();
            }
        },

        _init: function () {
            var proxy = this;
            this._navigationStyle = null;
            this.navigationControlData = null;
            this._initPrivateProperties();
            bbdesigner$.each(this.model.layers, function (index) {
                proxy._layerInitialize(index);
            });
            this._mapContainer = this.element;
            bbdesigner$(this._mapContainer).css({ "overflow": "hidden" });
            if (document.documentMode == 8) {
                bbdesigner$(this._mapContainer).css({ "overflow": "hidden", "position": "relative" });
            }
            this.refresh();            
            this._isRendered = true;
            if (_isSVG) {
                bbdesigner$(this._svgDocument).pinchZoom(this._rootgroup, this);
            }
        },

        _layerInitialize: function (layerindex) {
            var proxy = this;
            if (this.model.layers[layerindex] != null) {
                bbdesigner$.each(this.model.layers, function (index, element) {
                    element = proxy._checkArrayObject(element, index);
                    var obj = new shapeLayer();
                    bbdesigner$.extend(obj, element);
                    bbdesigner$.extend(element, obj);
                    bbdesigner$.each(element.subLayers, function (subindex, subelement) {
                        subelement = proxy._checkArrayObject(subelement, subindex);
                        var subobj = new shapeLayer();
                        bbdesigner$.extend(subobj, subelement);
                        bbdesigner$.extend(subelement, subobj);
                    });
                });
            }
            else {

                this.layers[0] = new shapeLayer();

            }
        },

        _checkArrayObject: function (element, initialName) {
            var proxy = this;
            bbdesigner$.each(element, function (name, innerElement) {
                if (innerElement instanceof Array) {
                    proxy._checkArrayObject(innerElement, name);
                }
                else if (innerElement != null && typeof innerElement == "object") {
                    var allObjects = new shapeLayer();
                    proxy._loadIndividualDefaultValues(innerElement, allObjects, (typeof name === "number") ? initialName : name);
                }
            });
            return element;
        },

        _loadIndividualDefaultValues: function (obj, allObjects, name) {
            var defaultObj = null;
            var proxy = this;
            bbdesigner$.each(allObjects, function (n, element) {
                if (name == n) {
                    defaultObj = element;
                    return;
                }
            });
            if (defaultObj instanceof Array) defaultObj = defaultObj[0];

            bbdesigner$.each(obj, function (objName, ele) {
                if (ele instanceof Array) {
                    proxy._checkArrayObject(ele, name);
                }
                else if (ele != null && typeof ele == "object") {
                    proxy._loadIndividualDefaultValues(ele, ele, (typeof objName === "number") ? name : objName);
                }
            });

            bbdesigner$.extend(defaultObj, obj);
            bbdesigner$.extend(obj, defaultObj);
            return obj;
        },

        _refreshWithAnimation: function () {
            this.model.layers[this.baseMapIndex()]._setMapItemsPositionWithAnimation(this);
            for (var key = 0; key < this.model.layers[this.baseMapIndex()].subLayers.length; key++) {
                this.model.layers[this.baseMapIndex()].subLayers[key]._setMapItemsPositionWithAnimation(this);
            }
        },

        _resizeShape: function () {
            this.model.layers[this.baseMapIndex()]._resizeShapes(this);
            for (var key = 0; key < this.model.layers[this.baseMapIndex()].subLayers.length; key++) {
                this.model.layers[this.baseMapIndex()].subLayers[key]._resizeShapes(this);
            }

        },

        _refrshLayers: function () {
            this.model.layers[this.baseMapIndex()]._setMapItemsPosition(this);
            for (var key = 0; key < this.model.layers[this.baseMapIndex()].subLayers.length; key++) {
                this.model.layers[this.baseMapIndex()].subLayers[key]._setMapItemsPosition(this);
            }

        },

        _panTileMap: function (factorX, factorY, centerPosition) {

            var totalSize = Math.pow(2, this.zoomLevel()) * 256;
            this._tileTranslatePoint.x = (factorX / 2) - (totalSize / 2);
            this._tileTranslatePoint.y = (factorY / 2) - (totalSize / 2);
            var position = this._convertTileLatLongtoPoint(centerPosition[0], centerPosition[1]);
            this._tileTranslatePoint.x -= position.x - (factorX / 2);
            this._tileTranslatePoint.y -= position.y - (factorY / 2);

        },

        _generateTiles: function (zoomLevel) {
            var userLang = navigator.language || navigator.userLanguage;
            this.Tiles = [];
            var xcount, ycount;
            xcount = ycount = Math.pow(2, zoomLevel);
            var baseLayer = this.model.layers[this.baseMapIndex()];
            var endY = Math.min(ycount, ((-this._tileTranslatePoint.y + this._height) / 256) + 1);
            var endX = Math.min(xcount, ((-this._tileTranslatePoint.x + this._width) / 256) + 1);
            var startX = (-(this._tileTranslatePoint.x + 256) / 256);
            var startY = (-(this._tileTranslatePoint.y + 256) / 256);
            for (var i = Math.round(startX) ; i < Math.round(endX) ; i++) {
                for (var j = Math.round(startY) ; j < Math.round(endY) ; j++) {
                    var x = 256 * i + this._tileTranslatePoint.x;
                    var y = 256 * j + this._tileTranslatePoint.y;
                    if (x > -256 && x <= this._width && y > -256 && y < this._height) {
                        if (i >= 0 && j >= 0) {
                            var tile = new Tile(i, j);
                            tile.left = x;
                            tile.top = y;
                            if (baseLayer.layerType == BoldBIDashboard.datavisualization.Map.LayerType.Bing) {
                                tile.src = this._getBingMap(tile, baseLayer.key, baseLayer.bingMapType, userLang);
                            } else {
                                tile.src = this._urlTemplate.replace("level", this.zoomLevel()).replace('tileX', tile.X).replace('tileY', tile.Y);
                            }
                            this.Tiles.push(tile);
                        }
                    }
                }
            }
            var proxTiles = bbdesigner$.extend(true, [], this.Tiles);
            for (var layerIndex = 0; layerIndex < this.model.layers[this.baseMapIndex()].subLayers.length; layerIndex++) {
                var layer = this.model.layers[this.baseMapIndex()].subLayers[layerIndex];
                if (layer.layerType == BoldBIDashboard.datavisualization.Map.LayerType.OSM || layer.layerType == BoldBIDashboard.datavisualization.Map.LayerType.Bing) {
                    for (var tileIndex = 0; tileIndex < proxTiles.length; tileIndex++) {
                        var baseTile = proxTiles[tileIndex];
                        var subtile = bbdesigner$.extend(true, {}, baseTile);
                        if (layer.layerType == BoldBIDashboard.datavisualization.Map.LayerType.Bing) {
                            subtile.src = this._getBingMap(subtile, layer.key, layer.bingMapType, userLang);
                        } else {
                            subtile.src = layer.urlTemplate.replace("level", this.zoomLevel()).replace('tileX', baseTile.X).replace('tileY', baseTile.Y);
                        }
                        this.Tiles.push(subtile);
                    }

                }
            }
            this._arrangeTiles();
        },

        _getBingMap: function (tile, key, type, lang) {
            var quadKey = "";
            for (var i = this.zoomLevel() ; i > 0; i--) {
                var digit = 0;
                var mask = 1 << (i - 1);
                if ((tile.X & mask) != 0) {
                    digit++;
                }
                if ((tile.Y & mask) != 0) {
                    digit += 2;
                }
                quadKey = quadKey + "" + digit;
            }
            var layerType;
            if (type == BoldBIDashboard.datavisualization.Map.BingMapType.Aerial) {
                layerType = "A,G";
            }
            else if (type == BoldBIDashboard.datavisualization.Map.BingMapType.AerialWithLabel) {
                layerType = "A,G,L";
            } else {
                layerType = "G,VE,BX,L,LA";
            }
            var imageUrl = "http://ak.dynamic.t2.tiles.virtualearth.net/comp/ch/" + quadKey + "?mkt=" + lang + "&ur=IN&it=" + layerType + "&shading=hill&og=45&n=z&Key=" + key;
            return imageUrl;
        },

        _arrangeTiles: function () {
            var pathTemplate = "<div><div style='position:absolute;left:{{:left}}px;top:{{:top}}px;height:{{:height}}px;width:{{:width}}px;'><img src={{:src}}></img></div></div>";
            var tmpl2 = bbdesigner$.templates(pathTemplate);
            var htmlString = tmpl2.render(this.Tiles);
            var first = this._mapContainer[0].children[0];
            this._tileDiv.html(htmlString);
        },

        _generatePath: function () {

            var baseLayer = this.model.layers[this.baseMapIndex()];
			var layerIndex = this.baseMapIndex();
            var pathCollection = '';
            this._polylineCount = 0;
            this._pointscount = 0;
            _isSVG = (window.SVGSVGElement) ? true : false;


            if (baseLayer.layerType == BoldBIDashboard.datavisualization.Map.LayerType.Geometry) {
                if (baseLayer != undefined && baseLayer.shapeData != null) {
                    baseLayer._isBaseLayer = true;
                    this._isTileMap = false;
                    this._scale = this.zoomLevel();
                    pathCollection = this._readShapeData(baseLayer, layerIndex, null);
                }
            }
            else {
                this._isTileMap = true;
                this._scale = Math.pow(2, this.zoomLevel() - this.zoomFactor());
            }
            for (var key = 0; key < baseLayer.subLayers.length; key++) {
                if (baseLayer.subLayers[key].layerType == BoldBIDashboard.datavisualization.Map.LayerType.Geometry && baseLayer.subLayers[key].shapeData != null) {
                    baseLayer.subLayers[key]._isBaseLayer = false;
                    pathCollection += this._readShapeData(baseLayer.subLayers[key], layerIndex, key);
                }
            }
            if (_isSVG) {
                var htmlstring = '<div style="position:relative;" id="tileDiv"/><svg xmlns="http://www.w3.org/2000/svg" style= "overflow:hidden;z-index:0;float:left;left:0,top:0"' +
                             'id="svgDocument"> <g id="rootGroup">' + pathCollection + '</g></svg>';
                this._mapContainer.html(htmlstring);
                this._svgDocument = this.element.find("#svgDocument")[0];
                this._tileDiv = this.element.find("#tileDiv");

            }
            else {
                document.createStyleSheet().addRule(".vml", "behavior:url(#default#VML);display:inline-block");
                document.namespaces.add('v', 'urn:schemas-microsoft-com:vml', "#default#VML");
                var vmlGroup = '<div id="tileDiv"/><v:group   id = "rootGroup" style="position:absolute; width:' + this._width + 'px;height:' + this._height + 'px;" coordorigin = "0 0" coordsize="' + this._width + ' ' + this._height + '">' + pathCollection + '</v:group>';
                this._mapContainer.html(vmlGroup);
                this._tileDiv = this.element.find("#tileDiv");
                this._bubblegroup = this._createGroup(false, "bubbleGroup");
                this._bubblegroup.style.position = "absolute";
                this.element.append(this._bubblegroup);
            }
            if (baseLayer.layerType == BoldBIDashboard.datavisualization.Map.LayerType.OSM || baseLayer.layerType == BoldBIDashboard.datavisualization.Map.LayerType.Bing) {
                this._urlTemplate = baseLayer.urlTemplate;
                if (this.model.centerPosition != null) {
                    this._panTileMap(this._width, this._height, this.model.centerPosition);
                }
                else {
                    this._panTileMap(this._width, this._height, [0, 0]);
                }
                this._generateTiles(this.zoomLevel());
                if (_isSVG) {
                    bbdesigner$(this._svgDocument).css("position", "relative");
                }
            }
            if (_isSVG) {
                bbdesigner$(this._mapContainer).css("position", "relative");
            }
            this._rootgroup = this.element.find("#rootGroup")[0];

            this._on(bbdesigner$(this.element), BoldBIDashboard.eventType.mouseDown, { map: this }, this.dragDown);
            this._on(bbdesigner$(this.element), BoldBIDashboard.eventType.mouseMove, { map: this }, this.dragMove);
            this._on(bbdesigner$(this.element), BoldBIDashboard.eventType.mouseUp, { map: this }, this.dragUp);

        },

        _calculateBBox: function (polygonDatas, polylineDatas, pointData) {
            var minLatitude = maxLatitude = minLongitude = maxLongitude = 0;
            var isEntered = false,
			minMaxLatLng = { minLatitude : 0, maxLatitude : 0, minLongitude : 0, maxLongitude : 0};
            if (polygonDatas != null && polygonDatas.length > 0) {
                for (var i = 0; i < polygonDatas.length; i++) {
                    var currentData = polygonDatas[i];                
                    coords = currentData.geometry != null ? currentData.geometry.coordinates :  currentData.coordinates;                    
                    this._isMultipolygon(coords) ? this._calculateMultiPolygonBBox(coords, minMaxLatLng, i > 0) : this._calculatePolygonBBox(coords, minMaxLatLng, i > 0);                   
                }
            }
			minLatitude = minMaxLatLng.minLatitude;
            maxLatitude = minMaxLatLng.maxLatitude;
            minLongitude = minMaxLatLng.minLongitude;
            maxLongitude = minMaxLatLng.maxLongitude;
            if (pointData != null && pointData.length > 0) {
                for (var i = 0; i < pointData.length; i++) {
                    var currentData = pointData[i];
                    subData = currentData.geometry.coordinates;
                    if (!isEntered) {
                        minLatitude = maxLatitude = subData[1]; // (φ)
                        minLongitude = maxLongitude = subData[0];
                        isEntered = true;
                    } else {
                        minLatitude = Math.min(minLatitude, subData[1]);
                        maxLatitude = Math.max(maxLatitude, subData[1]);
                        minLongitude = Math.min(minLongitude, subData[0]);
                        maxLongitude = Math.max(maxLongitude, subData[0]);
                    }
                }
            }
            if (polylineDatas != null && polylineDatas.length > 0) {
                for (var i = 0; i < polylineDatas.length; i++) {
                    var coordinates;
                    if (polylineDatas[i].geometry == null) {
                        coordinates = polylineDatas[i].coordinates;
                    }
                    else {
                        coordinates = polylineDatas[i].geometry.coordinates;
                    }
                    for (var k = 0; k < coordinates.length; k++) {
                        if (!isEntered) {
                            minLatitude = maxLatitude = coordinates[k][1]; // (φ)
                            minLongitude = maxLongitude = coordinates[k][0];
                            isEntered = true;
                        } else {
                            minLatitude = Math.min(minLatitude, coordinates[k][1]);
                            maxLatitude = Math.max(maxLatitude, coordinates[k][1]);
                            minLongitude = Math.min(minLongitude, coordinates[k][0]);
                            maxLongitude = Math.max(maxLongitude, coordinates[k][0]);
                        }
                    }
                }
            }

            if (this._groupSize == null && !this._isMapCoordinates) {
                this._groupSize = { minX: minLongitude, maxX: maxLongitude, minY: minLatitude, maxY: maxLatitude };
            }
            return [[minLongitude, minLatitude], [maxLongitude, maxLatitude]];
        },
		
		_isMultipolygon: function(coords){
            return coords.length > 0 && coords[0].length > 0 && coords[0][0].length > 0 && coords[0][0][0].length > 0;
        },
		
		_calculateMultiPolygonBBox: function(coords, minMaxLatLng, isEntered){
            for(var i=0; i<coords.length;i++)
                minMaxLatLng = this._calculatePolygonBBox(coords[i], minMaxLatLng, isEntered || i > 0);
            return true;                
        },
		
		_calculatePolygonBBox: function(coords, minMaxLatLng, isEntered){
            var currentDataLength = coords.length;
            for (var j = 0; j < currentDataLength; j++) {
                var subData = '';
                if (currentDataLength > 1) {
                    subData = coords[j][0];
                    if (subData.length <= 2)
                        subData = coords[j];
                } else
                    subData = coords[j];
                if (subData.length > 2) {
                    for (var k = 0; k < subData.length; k++) {
                        if(subData[k][1]!=null && subData[k][0]!=null){
                            if (!isEntered) {
                                minMaxLatLng.minLatitude = minMaxLatLng.maxLatitude = subData[k][1];
                                minMaxLatLng.minLongitude = minMaxLatLng.maxLongitude = subData[k][0];
                                isEntered = true;
                            } else {
                                minMaxLatLng.minLatitude = Math.min(minMaxLatLng.minLatitude, subData[k][1]);
                                minMaxLatLng.maxLatitude = Math.max(minMaxLatLng.maxLatitude, subData[k][1]);
                                minMaxLatLng.minLongitude = Math.min(minMaxLatLng.minLongitude, subData[k][0]);
                                minMaxLatLng.maxLongitude = Math.max(minMaxLatLng.maxLongitude, subData[k][0]);
                            }
                        }
                    }
                } else {
                    if(subData[1]!=null && subData[0]!=null){
                        if (!isEntered) {
                            minMaxLatLng.minLatitude = minMaxLatLng.maxLatitude = subData[1];
                            minMaxLatLng.minLongitude = minMaxLatLng.maxLongitude = subData[0];
                            isEntered = true;
                        } else {
                            minMaxLatLng.minLatitude = Math.min(minMaxLatLng.minLatitude, subData[1]);
                            minMaxLatLng.maxLatitude = Math.max(minMaxLatLng.maxLatitude, subData[1]);
                            minMaxLatLng.minLongitude = Math.min(minMaxLatLng.minLongitude, subData[0]);
                            minMaxLatLng.maxLongitude = Math.max(minMaxLatLng.maxLongitude, subData[0]);
                        }
                    }
                }
            }
            return minMaxLatLng;
        },

        _readShapeData: function (layer, layerIndex, sublayerIndex) {
            var map = this;
            if (layer.shapeData != null) {
                if (typeof layer.shapeData == 'string') {
                    var dataManger = new BoldBIDashboard.DataManager(layer.shapeData);
                    var query = BoldBIDashboard.Query().from(layer);
                    dataManger.executeQuery(query).done(function (e) {
                        if (e.result != null) {
                            return map._getPathCollection(e.result, layer, layerIndex, sublayerIndex);
                        }
                    });

                } else {
                    return this._getPathCollection(layer.shapeData, layer, layerIndex, sublayerIndex);
                }

            }
        },

        _getFactor: function () {
            var contHeight;
            var contWidth;
            var heightfactor;
            var widthfactor
            if (this._mapBounds != null) {
                var startpoint = this._convertTileLatLongtoPointForShapes(this._mapBounds[0][1], this._mapBounds[0][0], this._mapBounds);
                var endpoint = this._convertTileLatLongtoPointForShapes(this._mapBounds[1][1], this._mapBounds[1][0], this._mapBounds);
                var minDiff = 0;
                var widthfactor = heightfactor = 1;
                contHeight = endpoint.y - startpoint.y;
                contWidth = endpoint.x - startpoint.x;
            }
            else {
                contHeight = 500;
                contWidth = 500;
            }
            if (contHeight < this._height) {
                heightfactor = parseFloat(Math.abs(this._height / contHeight + "e+1").toString().split('.')[0] / 10);
            }
            else {
                heightfactor = (this._height / contHeight);
            }
            if (contWidth < this._width) {
                widthfactor = parseFloat(Math.abs(this._width / contWidth + "e+1").toString().split('.')[0] / 10);
            }
            else {
                widthfactor = (this._width / contWidth);
            }

            return Math.min(widthfactor, heightfactor);
        },

        _getPathCollection: function (data, layer, layerIndex, sublayerIndex) {
            var shapePath = "";
            var type = "";
            var dataManager = "";
            if (data.features != null) {
                dataManager = new BoldBIDashboard.DataManager(data.features);
                type = "geometry.type";
                if (layer._isBaseLayer) {
                    this._mapBounds = data.bbox;
                }
            }
            else if (data.geometries != null) {
                dataManager = new BoldBIDashboard.DataManager(data.geometries);
                type = "type";
                if (layer._isBaseLayer) {
                    if (data.bbox != null)
                        this._mapBounds = [[data.bbox[0], data.bbox[1]], [data.bbox[2], data.bbox[3]]];
                }
            }
            if (data.geometries != null || data.features != null) {
                var queryPolyLine = BoldBIDashboard.Query().from(layer).where(type, BoldBIDashboard.FilterOperators.equal, 'LineString');
                var queryPolygon = BoldBIDashboard.Query().from(layer).where(type, BoldBIDashboard.FilterOperators.equal, 'Polygon');
                var queryMulitiPolygon = BoldBIDashboard.Query().from(layer).where(type, BoldBIDashboard.FilterOperators.equal, 'MultiPolygon');
                var polylineDatas = dataManager.executeLocal(queryPolyLine);
                var polygonDatas = dataManager.executeLocal(queryPolygon);
                var queryPoint = BoldBIDashboard.Query().from(layer).where(type, BoldBIDashboard.FilterOperators.equal, 'Point');
                var pointData = dataManager.executeLocal(queryPoint);
                var multiPolygonDatas = dataManager.executeLocal(queryMulitiPolygon);
                this._polylineCount = this._polylineCount + polylineDatas.length;
                this._pointscount = this._pointscount + pointData.length;
                bbdesigner$.merge(polygonDatas, multiPolygonDatas);
                if (layer._isBaseLayer && layer.geometryType == BoldBIDashboard.datavisualization.Map.GeometryType.Normal) {
                    this._isMapCoordinates = false;
                }
                if (this._mapBounds == null && layer._isBaseLayer) {
                    this._mapBounds = this._calculateBBox(polygonDatas, polylineDatas, pointData);
                }
                else if (this._mapBounds == null)
                    this._mapBounds = [[-180, -85], [180, 85]];

                var factor = this._getFactor();

                layer._newBounds = [];
                var pointHtml = "";
				
				if(this._groupSize != null)
				{
					minX = this._groupSize.minX;
					maxX = this._groupSize.maxX;
					minY = this._groupSize.minY;
					maxY = this._groupSize.maxY;
				}

                var minX, maxX, minY, maxY, flag = true;
                if (pointData.length > 0) {
                    for (var i = 0; i < pointData.length; i++) {
                        var currentData = pointData[i];
                        var check = '';
                        subData = currentData.geometry.coordinates;
                        var data = [];
                        var data_clean = [];
                        data.push({
                            lat: parseFloat(subData[1]),
                            lng: parseFloat(subData[0])
                        });
                        var l = 0;

                        var point = data[0];
                        latitude = point.lat; // (φ)
                        longitude = point.lng;   // (λ)                   
                        var p = this._convertTileLatLongtoPointForShapes(latitude, longitude, this._mapBounds, factor);
                        var boundingBox = this._mapBounds;
                        if ((longitude >= boundingBox[0][0] && longitude <= boundingBox[1][0] && latitude >= boundingBox[0][1] && latitude <= boundingBox[1][1])) {

                            if (flag) {
                                minX = maxX = p.x;
                                minY = maxY = p.y;
                                flag = false;
                            }
                            else {
                                minX = Math.min(minX, p.x);
                                maxX = Math.max(maxX, p.x);
                                minY = Math.min(minY, p.y);
                                maxY = Math.max(maxY, p.y);
                            }

                            if (_isSVG) {
                                data_clean.push({ x: p.x, y: p.y, lat: point.lat, lng: point.lng });
                            }
                            else {
                                data_clean.push({ x: p.x - ((10 / this._scale) / 2), y: p.y - ((10 / this._scale) / 2), lat: point.lat, lng: point.lng });
                            }

                            if (_isSVG) {
                                pointHtml += '<circle cx="' + data_clean[0].x + '" cy="' + data_clean[0].y + '" r="' + layer.shapeSettings.radius / this._scale + '" stroke="' + layer.shapeSettings.stroke + '" stroke-width="' + layer.shapeSettings.strokeThickness + '" fill="' + layer.shapeSettings.fill + '" />';
                            }
                            else {
                                var pointHtmlString = '<v:oval display="block" fill="' + layer.shapeSettings.fill + '" style="position:absolute;top: ' + data_clean[0].y + 'px;left:' + data_clean[0].x + 'px;width:' + 10 / this._scale + 'px;height:' + 10 / this._scale + 'px;stroke-width:' + layer.shapeSettings.strokeThickness + 'px;"></v:oval>';
                                pointHtml += pointHtmlString;
                            }
                        } else {
                            pointData.splice(i, 1);
                            i--;
                        }
                    }

                }
                if (polygonDatas.length > 0) {
                    var currentData, midCoordinate, midCoordinateLength, bubbleCenterPos, boundsPushed, coords, shapeIndex;
                    for (var i = 0; i < polygonDatas.length; i++) {
                        currentData = polygonDatas[i];
						shapeIndex = i;
                        midCoordinate = 0;
                        boundsPushed = false;
                        bubbleCenterPos = {};

                        if (currentData.properties) {
                            var centerX = typeof currentData.properties.centerX == "number" ? currentData.properties.centerX : undefined;
                            var centerY = typeof currentData.properties.centerY == "number" ? currentData.properties.centerY : undefined;
                            bubbleCenterPos = { centerX: centerX, centerY: centerY };
                        }
                        if (currentData.geometry != null) {
                            coords = currentData.geometry.coordinates;
                        }
                        else {
                            coords = currentData.coordinates;
                        }
                        midCoordinateLength = coords[0][0].length;
                        var currentDataLength = coords.length;
                        if (currentDataLength > 1) {
                            var lst = coords;
                            for (var index = 0; index < lst.length; index++) {
                                if (midCoordinateLength < lst[index][0].length) {
                                    midCoordinateLength = lst[index][0].length;
                                    midCoordinate = index;
                                }
                            }
                        }
                        var path_code = '';
                        for (var j = 0; j < currentDataLength; j++) {
                            var subData = '';
                            if (currentDataLength > 1) {
                                subData = coords[j][0];
                                if (subData.length <= 2) {
                                    subData = coords[j];
                                }
                            }
                            else {
                                subData = coords[j];
                            }
                            var data = [];
                            var data_clean = [];
                            if (subData.length > 2) {
                                for (var k = 0; k < subData.length; k++) {
                                    data.push({
                                        lat: parseFloat(subData[k][1]),
                                        lng: parseFloat(subData[k][0])
                                    });
                                }
                            }
							else if (this._isMultipolygon(coords)) {
								for (var m = 0; m < subData.length; m++) {
									if (subData[m].length > 2) {
										for (var k = 0; k < subData[m].length; k++) {
											data.push({
												lat: parseFloat(subData[m][k][1]),
												lng: parseFloat(subData[m][k][0])
											});
										}
									}
								}
							}
                            else {
                                data.push({
                                    lat: parseFloat(subData[1]),
                                    lng: parseFloat(subData[0])
                                });
                            }
                            for (var l = 0; l < data.length - 1 || (data.length == 1 && l == 0) ; l++) {
                                var point = data[l];
                                latitude = point.lat; // (φ)
                                longitude = point.lng;   // (λ                           
                                var boundingBox = this._mapBounds;
                                if (this._isTileMap || (longitude >= boundingBox[0][0] && longitude <= boundingBox[1][0] && latitude >= boundingBox[0][1] && latitude <= boundingBox[1][1])) {

                                    var p = this._convertTileLatLongtoPointForShapes(latitude, longitude, boundingBox, factor);
                                    if (flag) {
                                        minX = maxX = p.x;
                                        minY = maxY = p.y;
                                        flag = false;
                                    }
                                    else {
                                        minX = Math.min(minX, p.x);
                                        maxX = Math.max(maxX, p.x);
                                        minY = Math.min(minY, p.y);
                                        maxY = Math.max(maxY, p.y);
                                    }
                                    if (_isSVG) {
                                        data_clean.push({ x: p.x, y: p.y, lat: point.lat, lng: point.lng });
                                    }
                                    else {
                                        data_clean.push({ x: p.x, y: p.y, lat: point.lat, lng: point.lng });
                                    }
                                }

                            }
                            if (j == midCoordinate) {
                                var bounds = this._findMidPointofPoylgon(data_clean, bubbleCenterPos);
                                if (bounds) {
                                    layer._newBounds.push(bounds);
                                    boundsPushed = true;
                                }
                            }

                            if (data_clean.length > 0) {
                                if (_isSVG) {
                                    path_code += "M" + (data_clean[0].x) + "," + (data_clean[0].y);
                                    for (m = 1; m < data_clean.length; m++) {
                                        path_code += "," + (data_clean[m].x) + "," + (data_clean[m].y);
                                    }
                                    path_code += "Z";
                                }
                                else {
                                    path_code += "m" + parseInt(data_clean[0].x) + "," + parseInt(data_clean[0].y);
                                    path_code += " l" + parseInt(data_clean[0].x) + "," + parseInt(data_clean[0].y);
                                    for (m = 1; m < data_clean.length; m++) {
                                        path_code += "," + parseInt(data_clean[m].x) + "," + parseInt(data_clean[m].y);
                                    }
                                    path_code += " e";
                                }
                            }

                        }
                        if (path_code != "") {
							var id = this._id + '_layerIndex' + layerIndex + (BoldBIDashboard.util.isNullOrUndefined(sublayerIndex) ? '' : '_sublayerIndex' + sublayerIndex) + '_shapeIndex' + i;
                            if (_isSVG) {
                                shapePath += '<path class="mapShape" stroke=' + layer.shapeSettings.stroke +
                                            ' stroke-width=' + (layer.shapeSettings.strokeThickness / this._scale) +
                                             ' fill= ' + layer.shapeSettings.fill + ' d="' + path_code + '"  stroke-linejoin= round stroke-linecap= square' + ' id="' + id + '"' + '></path>';
                            }
                            else {
                                shapePath += '<v:shape  style="width:' + this._width + 'px;height:' + this._height + 'px;"  coordsize="'
                                    + this._width + ' ' + this._height + '" coordorigin="0 0" strokecolor=' + layer.shapeSettings.stroke +
                                               ' stroke-width=' + (layer.shapeSettings.strokeThickness / this._scale) + 'px"' +
                                                ' fillcolor= ' + layer.shapeSettings.fill + ' path="' + path_code + '"></v:shape>';
                            }

                            if (!boundsPushed) //if map set zoomfactor, some shape render with cut off and mid point not found
                                layer._newBounds.push({ x: 0, y: 0 });
                        }
                        else {
                            polygonDatas.splice(i, 1);
                            i--;
                        }

                    }

                }

                if (polylineDatas.length > 0) {

                    for (var i = 0; i < polylineDatas.length; i++) {
                        var coordinates;
                        if (polylineDatas[i].geometry == null) {
                            coordinates = polylineDatas[i].coordinates;
                        }
                        else {
                            coordinates = polylineDatas[i].geometry.coordinates;
                        }
                        var linedata = '';
                        for (var k = 0; k < coordinates.length; k++) {
                            var factor = this._getFactor();
                            var points = this._convertTileLatLongtoPointForShapes(coordinates[k][1], coordinates[k][0], this._mapBounds, factor);
							if (flag) {
								minX = maxX = points.x;
								minY = maxY = points.y;
								flag = false;
							}
							else {
								minX = Math.min(minX, points.x);
								maxX = Math.max(maxX, points.x);
								minY = Math.min(minY, points.y);
								maxY = Math.max(maxY, points.y);
							}
                            linedata += points.x + "," + points.y;
                            if (k != coordinates.length - 1)
                                linedata += ",";
                        }

                        if (_isSVG) {
                            shapePath += '<polyline stroke=' + layer.shapeSettings.stroke +
                                        ' stroke-width=' + (layer.shapeSettings.strokeThickness / this._scale) + ' fill="transparent" stroke-width="1" points="' + linedata + '" ></polyline>';

                        }
                        else {
                            shapePath += '<v:polyline coordsize="' + this._width + ',' + this._height + '" coordorigin="0 0" strokecolor=' + layer.shapeSettings.stroke +
                                                                   ' strokeweight=' + (layer.shapeSettings.strokeThickness / this._scale) + 'px"' +
                                                                    ' fillcolor=' + layer.shapeSettings.fill + '  points="' + linedata + '"/>';


                        }
                    }

                }
                if (this._isMapCoordinates) {
                    this._groupSize = { minX: minX, maxX: maxX, minY: minY, maxY: maxY };
                }
                var lines = [].concat(polygonDatas, polylineDatas);
                layer._polygonData = bbdesigner$.merge(lines, pointData);
                return shapePath + pointHtml;
            }
            else {
                layer._polygonData = [];
                return null;
            }
        },

        _createGroup: function (isRoot, name) {

            var vmlGroup;
            vmlGroup = document.createElement('<v:group class=' + name + '>');
            vmlGroup.style.width = this._width + 'px';
            vmlGroup.style.height = this._height + 'px';
            vmlGroup.coordorigin = "0 0";
            vmlGroup.coordsize = this._width + ' ' + this._height;
            if (isRoot) {
                this._rootgroup = vmlGroup;
                vmlGroup.style.left = '20px';
                vmlGroup.style.top = '20px';
            }
            return vmlGroup;
        },

        _generatePaletteColorsForShape: function (shape, shapelayer, palette, palettesettings) {

            if (palettesettings != null) {
                shapelayer.shapeSettings.highlightColor = palettesettings.highlightColor;
                shapelayer.shapeSettings.highlightStroke = palettesettings.highlightStroke;
                shapelayer.shapeSettings.selectionColor = palettesettings.SelectionColor;
                shapelayer.shapeSettings.selectionStroke = palettesettings.SelectionStroke;

            }

            if (_isSVG) {
                shape.setAttribute("fill", palette[shapelayer._prevPaletteIndex]);
            }
            else {
                shape.fillcolor = palette[shapelayer._prevPaletteIndex];
            }
            shapelayer._prevPaletteIndex = shapelayer._prevPaletteIndex + 1;
            if (shapelayer._prevPaletteIndex > palette.length - 1)
                shapelayer._prevPaletteIndex = 0;
        },

        _drawCustomBubble: function (layer, shape, item, bubbleData, proxyControl, id, ValueObject, minValue, maxValue, _isSVG, proxySVG, bounds) {
            var position;
            if (layer.bubbleSettings != null && layer.bubbleSettings.valuePath != null) {
                if (_isSVG)
                    var circle = document.createElementNS(proxyControl._svgns, "circle");
                else {
                    var bubbleID = shape.id + "_bubble_" + id;
                    var bubbleHtmlString = '<v:oval class="mapBubble" id=' + bubbleID + ' display="block" style="position:absolute;top: ' + 0 + 'px;left:' + 0 + 'px;width:100px;height:100px;stroke-width:' + 0 + 'px;"><v:fill opacity="0.9"/></v:oval>';
                    this._bubblegroup.innerHTML = this._bubblegroup.innerHTML + bubbleHtmlString;
                    var circle = document.getElementById("bubble_" + id);
                }
                var bubbleValue = proxyControl._reflection(bubbleData, layer.bubbleSettings.valuePath);
                var bubblecolorValue = proxyControl._reflection(bubbleData, layer.bubbleSettings.colorValuePath);
                if (this._isTileMap) {
                    position = this._convertTileLatLongtoPoint(bubbleData.latitude, bubbleData.longitude);
                }
                else {
                    position = this._convertTileLatLongtoPointForShapes(bubbleData.latitude, bubbleData.longitude, this._mapBounds, this._getFactor());
                }
                layer._bounds.push({ x: isNaN(position.x) ? bounds.x : position.x, y: isNaN(position.y) ? bounds.y : position.y, isMultiBubble: true });
                if (layer.bubbleSettings.colorMappings != null)
                    layer._fillColors(bubblecolorValue, layer.bubbleSettings.colorMappings, circle, this, item, ValueObject, true);
                else {
                    var color = layer.bubbleSettings.color;
                    color = color.indexOf(',') ? color.split(',')[0] : color;
                    if (_isSVG)
                        circle.setAttribute("fill", color);
                    else {
                        circle.strokecolor = color;
                        circle.fillcolor = color;
                    }
                }

                var radius = proxyControl._getRatioOfBubble(layer.bubbleSettings.minValue, layer.bubbleSettings.maxValue, bubbleValue, minValue, maxValue);
                if (_isSVG) {
                    bbdesigner$(circle).attr({
                        "cx": (isNaN(position.x) ? bounds.x : position.x), "cy": (isNaN(position.y) ? bounds.y : position.y), "id" : shape.id + "_bubble_" + dataIndex,
                        "fill-opacity": layer.bubbleSettings.bubbleOpacity, "r": isNaN(radius) ? 0 : radius, "class": "mapBubble",
                    });
                    if (proxyControl.enableAnimation() && !this._isTileMap)
                        bbdesigner$(circle).css("display", "none");
                }
                else
                    bbdesigner$(circle).css({
                        "height": +2 * radius + "px",
                        "width": +2 * radius + "px"
                    });

                if (layer.bubbleSettings.showTooltip == true) {
                    var tooltipTemplateDiv = bbdesigner$("<div class='bubbleToolTip'  style='position:absolute;display:none;z-index:9999'/>");
                    var template_ID = null;
                    if (layer.bubbleSettings.tooltipTemplate != null)
                        template_ID = layer.bubbleSettings.tooltipTemplate;
                    else
                        bbdesigner$(tooltipTemplateDiv).append('<div class="bubbleToolTip"  style="margin-left:10px;margin-top:-25px;"><div class="defaultToolTip"><p style="margin-top:-4px"><label  style="color:rgb(27, 20, 20);font-size:14px;font-weight:normal;font-family:Segoe UI">' + bubbleValue + '</label></p></div></div>');
                    bbdesigner$(circle).mouseenter({ htmlobj: tooltipTemplateDiv, templateID: template_ID, itemsrc: bubbleData }, proxyControl._bubbleEnterFunction);
                    bbdesigner$(circle).mousemove({ htmlobj: tooltipTemplateDiv }, proxyControl._bubbleOverFunction);
                    bbdesigner$(circle).mouseleave({ htmlobj: tooltipTemplateDiv }, proxyControl._bubbleleaveFunction);
                } else
                    bbdesigner$(circle).css("pointer-events", "none");

                if (_isSVG)
                    proxySVG.appendChild(circle);
                layer._bubbles.push(circle);
                layer._mapItems.push(bbdesigner$("<div></div>"));
            }

        },

        _renderLayers: function (layer, pathCount, mapObject) {

            layer._prevPaletteIndex = 0;
            layer._initializeLocalValues();
            if (layer.selectedItems == null) {
                layer.selectedItems = [];
            }
            var proxyrootGroup = this._rootgroup;
            var proxySVG = this._svgDocument;
            var proxyControl = this;
            var shapelayer = layer, checkAlternatePath = layer.alternateDataPath || layer.alternatePropertyPath, bubble = shapelayer.bubbleSettings;
            var minValue = [];
            var maxValue = [];
            var sum = 0, bubbledata = [];
            if (shapelayer.dataSource != null && bubble != null && bubble.valuePath != null) {
                if (bubble.colorValuePath == null && bubble.valuePath != null) {
                    bubble.colorValuePath = bubble.valuePath.indexOf(',') != -1 ? null : bubble.valuePath;
                }
                for (var i = 0; i < shapelayer.dataSource.length; i++) {
                    var m_valuePath = bubble.valuePath.split(","), valuePath;
                    for(var m=0; m<m_valuePath.length; m++){
                        valuePath = m_valuePath[m];
                        bubbledata[m] = parseFloat(this._reflection(shapelayer.dataSource[i], valuePath));
                        if (isNaN(bubbledata[m])) {
                            var bubbleItem = this._reflection(shapelayer.dataSource[i], bubble.bubblePath);
                            if(bubbleItem){
                                bubbledata[m] = 0;
                                for(var k=0; k<bubbleItem.length;k++){
                                    var tempValue = parseFloat(this._reflection(bubbleItem[k], valuePath));                            
                                    if(!isNaN(tempValue))
                                        bubbledata[m] += tempValue;
                                }
                            }
                        }
                        if (i != 0) {
                            if (bubbledata[m] > maxValue[m] || maxValue[m] == null) {
                                maxValue[m] = bubbledata[m];
                            } else if (bubbledata[m] < minValue[m] || minValue[m] == null) {
                                minValue[m] = bubbledata[m];
                            }
                        } else {
                            minValue[m] = maxValue[m] = bubbledata[m];
                        }
                    }
                }
            }			
            this._generateTooltipForLayers(shapelayer);
			layer._renderedShapes = shapelayer.dataSource;
            if (shapelayer.shapeData != null) {
                var shapesource = [], type, shapeData = shapelayer.shapeData, dataManager = "",
                    pointData = [], pointsource = [];
                if (shapeData.features != null) {
                    dataManager = new BoldBIDashboard.DataManager(shapeData.features);
                    type = "geometry.type";
                }
                else if (shapeData.geometries != null) {
                    dataManager = new BoldBIDashboard.DataManager(shapeData.geometries);
                    type = "type";
                }
                var queryPoint = BoldBIDashboard.Query().from(shapelayer).where(type, BoldBIDashboard.FilterOperators.equal, 'Point');
                var geoPoint = dataManager.executeLocal(queryPoint);

                if (shapelayer.dataSource != null) {
                    for (var key = 0; key < shapelayer.dataSource.length; key++) {
                        var shapeitem = shapelayer.dataSource[key];
                        var shapeItemValue = proxyControl._reflection(shapeitem, shapelayer.shapeDataPath);
                        if (shapeItemValue != null) {
                            shapeItemValue = shapeItemValue.toLowerCase();
                        }
                        var dataName = "";
                        for (var t = 0; t < geoPoint.length; t++) {
                            dataName = geoPoint[t].properties[shapelayer.shapePropertyPath].toLowerCase();
                            if (dataName == shapeItemValue && bubble.showBubble) {
                                pointsource.push(shapeitem);
                                pointData.push(dataName);
                                break;
                            }
                        }
                        shapesource.push(shapeItemValue);
                    }
                }
                for (var dataIndex = 0; dataIndex < shapelayer._polygonData.length; dataIndex++) {
                    var ValueObject = shapelayer._polygonData[dataIndex].properties;
                    var DBFValue = proxyControl._reflection(ValueObject, shapelayer.shapePropertyPath);
                    var dbfCondition, colorPath = shapelayer.bubbleSettings.colorPath;
                    if (DBFValue != null && (typeof DBFValue) == "string") {
                        dbfCondition = DBFValue.toLowerCase();
                    }
                    var shape = this._rootgroup.childNodes[dataIndex + pathCount];
                    if (_isSVG) {
                        shape.setAttribute("fill", shapelayer.shapeSettings.fill);
                    }
                    else {
                        shape.fillcolor = shapelayer.shapeSettings.fill;
                        shape.strokecolor = shapelayer.shapeSettings.stroke;
                    }
                    var obj = {};
                    var bounds = shapelayer._newBounds[dataIndex];
                    if (bounds == null) {
                        bounds = { x: 0, y: 0 };
                    }
                    if (shapelayer.shapeSettings.autoFill) {
                        switch (shapelayer.shapeSettings.colorPalette) {
                            case BoldBIDashboard.datavisualization.Map.ColorPalette.Palette1:
                                this._generatePaletteColorsForShape(shape, shapelayer, shapelayer.colorPalettes.Palette1, shapelayer._colorPaletteSettings.Palette1);
                                break;
                            case BoldBIDashboard.datavisualization.Map.ColorPalette.Palette2:
                                this._generatePaletteColorsForShape(shape, shapelayer, shapelayer.colorPalettes.Palette2, shapelayer._colorPaletteSettings.Palette2);
                                break;
                            case BoldBIDashboard.datavisualization.Map.ColorPalette.Palette3:
                                this._generatePaletteColorsForShape(shape, shapelayer, shapelayer.colorPalettes.Palette3, shapelayer._colorPaletteSettings.Palette3);
                                break;
                            case BoldBIDashboard.datavisualization.Map.ColorPalette.CustomPalette:
                                this._generatePaletteColorsForShape(shape, shapelayer, shapelayer.shapeSettings.customPalette, null);
                                break;
                        }
                    }
                    var shapeIndex = shapesource.indexOf(dbfCondition);
                    shapeIndex = (shapeIndex < 0 && checkAlternatePath) ? shapelayer._checkAlternatePath(shapelayer, ValueObject, dbfCondition, shapesource) : shapeIndex;
                    if (shapeIndex !== false && shapeIndex != -1) {
                        var item = shapelayer.dataSource[shapeIndex];
                        var ItemValue = DBFValue;
						item.shape = shape;
						item.shapeIndex = dataIndex;
						item._showBubble = true;
                        if (item != null) {
                            if (shape != null) {

                                var id = ItemValue;
                            }
                            var pointItem = pointsource[pointData.indexOf(dbfCondition)];
                            if (pointItem && bounds.x == 0 && bounds.y == 0) {//If shape is point, get point position from shape and stored in bounds. Otherwise it returns undefined.
                                bounds.x = parseFloat(bbdesigner$(shape).attr("cx")); bounds.y = parseFloat(bbdesigner$(shape).attr("cy"));
                            }
                            layer._bounds.push(bounds);
                            if (shapelayer.showMapItems) {
                                var itemTemplateDiv = bbdesigner$("<div class='mapItems' style='display:block;position:absolute;pointer-events: none;'></div>");
                                itemTemplateDiv[0].className = ItemValue;
                                proxyControl._templateDiv.append(itemTemplateDiv);
                                bbdesigner$(itemTemplateDiv).css({ "left": bounds.x, "top": bounds.y });
                                var htmlString;
                                if (shapelayer.mapItemsTemplate == null) {
                                    htmlString = bbdesigner$(' <div><label>{{:' + shapelayer.shapeSettings.valuePath + '}}</label></div>').render(item);;
                                }
                                else {
                                    htmlString = bbdesigner$("#" + shapelayer.mapItemsTemplate).render(item);
                                }
                                bbdesigner$(itemTemplateDiv).html(htmlString);
                                layer._mapItems.push(itemTemplateDiv);
                            }
							var shapeValue = proxyControl._reflection(item, shapelayer.shapeSettings.colorValuePath);
							var shapeColor = (!BoldBIDashboard.util.isNullOrUndefined(shapelayer.shapeSettings.shapeFillColor)) ?  shapelayer.shapeSettings.shapeFillColor : shapelayer.shapeSettings.fill;
                            if (shapelayer.shapeSettings.colorMappings != null || shapelayer.shapeSettings.colorPath) {
                                if (shapelayer.shapeSettings.colorValuePath == null) {
                                    shapelayer.shapeSettings.colorValuePath = shapelayer.shapeSettings.valuePath;
                                }
                                if (shapeValue != null && !shapelayer.shapeSettings.autoFill) {
                                    if (((shapelayer.legendSettings != null && shapelayer.legendSettings.mode == BoldBIDashboard.datavisualization.Map.LegendMode.Interactive) || shapelayer.shapeSettings.enableGradient) && shapelayer.shapeSettings.colorMappings.rangeColorMapping != null) {
                                        obj["legendrect"] = shapelayer._updateLegendRange(shapeValue, shapelayer, shape, item);                                        
                                        if (obj["legendrect"] != undefined) {
                                            shapeColor = obj["legendrect"].color;
                                        }
                                        if (_isSVG) {
                                            shape.setAttribute("fill", shapeColor);
                                        }
                                        else {
                                            shape.fillcolor = shapeColor;
                                        }
                                    } else {
										if(!BoldBIDashboard.util.isNullOrUndefined(shapelayer.shapeSettings.shapeFillColor)){
											if (_isSVG) {
												shape.setAttribute("fill", shapeColor);
											}
											else {
												shape.fillcolor = shapeColor;
											}
										}
                                        shapelayer._fillColors(shapeValue, shapelayer.shapeSettings.colorMappings, shape, mapObject, item, ValueObject);
                                    }
                                }
                            }
                            else if (!shapelayer.shapeSettings.autoFill) {
                                if (_isSVG) {
                                    shape.setAttribute("fill", shapeColor);
                                }
                                else {
                                    shape.fillcolor = shapeColor;
                                    shape.strokecolor = shapelayer.shapeSettings.stroke;
                                }
                            }
                            if (bubble.showBubble) {
                                if (bubble != null && bubble.valuePath != null ) {
                                    var m_valuePath = this.sortbyRadius(bubble, minValue, maxValue, item, bubble.valuePath.split(',')), valuePath;
                                    for(var m = 0; m<m_valuePath.length; m++){
                                        if(m!=0)
                                            layer._bounds.push(bounds);
                                        valuePath = m_valuePath[m].valuePath;
                                        if (_isSVG) {
                                            var circle = document.createElementNS(proxyControl._svgns, "circle");
                                        }
                                        else {
                                            var bubbleID = shape.id + "_bubble_" + id;
                                            var bubbleHtmlString = '<v:oval class="mapBubble" id=' + bubbleID + ' display="block" style="position:absolute;top: ' + 0 + 'px;left:' + 0 + 'px;width:100px;height:100px;stroke-width:' + 0 + 'px;"><v:fill opacity="0.9"/></v:oval>';
                                            this._bubblegroup.innerHTML = this._bubblegroup.innerHTML + bubbleHtmlString;
                                            var circle = document.getElementById("bubble_" + id);
                                        }

                                        var bubbleValue = m_valuePath[m].bubbleValue;
                                        var bubblecolorValue = proxyControl._reflection(item, bubble.colorPath || bubble.colorValuePath);
                                        var color = bubble.color.indexOf(',') ? bubble.color.split(',')[m] : bubble.color;										
                                            if (_isSVG) {
                                                circle.setAttribute("fill", color);
                                            }
                                            else {
                                                circle.strokecolor = color;
                                                circle.fillcolor = color;
                                            }										
										if (bubble.colorMappings != null || bubble.colorPath != null ){
											shapelayer._fillColors(bubblecolorValue, bubble.colorMappings, circle, this, shapelayer.dataSource[shapeIndex], ValueObject, true);
										}
                                        
                                        var radius = m_valuePath[m].radius;
                                        if (_isSVG) {
                                            bbdesigner$(circle).attr({
                                                "cx": bounds.x, "cy": bounds.y, "id" : shape.id + "_bubble_" + dataIndex,
                                                "fill-opacity": bubble.bubbleOpacity, "r": isNaN(radius) ? 0 : radius, "class": "mapBubble",
                                            });
                                            if (proxyControl.enableAnimation()&& !this._isTileMap) {
                                                bbdesigner$(circle).css("display", "none");
                                            }
                                        }
                                        else {
                                            bbdesigner$(circle).css({
                                                "height": +2 * radius + "px",
                                                "width": +2 * radius + "px"
                                            });
                                        }
                                        if (bubble.showTooltip == true) {
                                            var tooltipTemplateDiv = bbdesigner$("<div class='bubbleToolTip'  style='position:absolute;display:none;z-index:9999'/>");
                                            var template_ID = null;
                                            if (bubble.tooltipTemplate != null) {
                                                template_ID = bubble.tooltipTemplate;
                                            } else {
                                                bbdesigner$(tooltipTemplateDiv).append('<div class="bubbleToolTip"  style="margin-left:10px;margin-top:-25px;"><div class="defaultToolTip"><p style="margin-top:-4px"><label  style="color:rgb(27, 20, 20);font-size:14px;font-weight:normal;font-family:Segoe UI">' + bubbleValue + '</label></p></div></div>');
                                            }
                                            bbdesigner$(circle).mouseenter({ htmlobj: tooltipTemplateDiv, templateID: template_ID, itemsrc: item }, proxyControl._bubbleEnterFunction);
                                            bbdesigner$(circle).mousemove({ htmlobj: tooltipTemplateDiv }, proxyControl._bubbleOverFunction);
                                            bbdesigner$(circle).mouseleave({ htmlobj: tooltipTemplateDiv }, proxyControl._bubbleleaveFunction);
                                        } else {
                                            bbdesigner$(circle).css("pointer-events", "none");
                                        }
                                        if (_isSVG) {
                                            proxySVG.appendChild(circle);
                                            layer._bubbles.push(circle);
                                        }
                                        else {
                                            layer._bubbles.push(circle);
                                        }
                                        if(item[bubble.bubblePath] != null)
                                        {
                                            var bubbles = item[bubble.bubblePath];
                                            for(var i=0; i<bubbles.length && bubbles[i]; i++){
                                                this._drawCustomBubble(layer, shape, item, bubbles[i], proxyControl, id, ValueObject, minValue[m], maxValue[m], _isSVG, proxySVG, bounds);
                                            }
                                        }
                                    }
                                }
                            }
                            obj["data"] = item;
                        }
                    }
                    var labelElement;
                    if (layer.labelSettings != null && layer.labelSettings.showLabels && layer.labelSettings.labelPath != null && shapelayer.geometryType != BoldBIDashboard.datavisualization.Map.GeometryType.Normal) {
                        var labelValue = proxyControl._reflection(ValueObject, layer.labelSettings.labelPath);
                        if (labelValue != null) {
                            if (bounds == null) {
                                //bounds = (shape);
                            }
                            labelElement = bbdesigner$("<div class='labelStyle'id="+ "'" + this._id +'labelStyle_'+ dataIndex + "'" + "></div>");
                            bbdesigner$(labelElement).css({ "pointer-events": "none", "position": "absolute" });
                            labelElement[0].innerHTML = labelValue;
                            this._templateDiv.append(labelElement);
                            if (layer.legendSettings.showLegend && layer.legendSettings.dockOnMap && layer.legendSettings.dockPosition == "top") {
                                bbdesigner$(this._templateDiv).css({ "margin-top": this._margintop });
                            }
                            else if (layer.legendSettings.showLegend && layer.legendSettings.dockOnMap && layer.legendSettings.dockPosition == "left") {
                                bbdesigner$(this._templateDiv).css({ "margin-left": this._marginleft });
                            }
                            bbdesigner$(labelElement).css({ "left": bounds.x, "top": bounds.y });
                            proxyControl._off(bbdesigner$(labelElement), BoldBIDashboard.eventType.mouseUp, proxyControl._polyClickFunction);
                            //if (this.model.enableRightClick)
                                //proxyControl._off(bbdesigner$(labelElement), "contextmenu", proxyControl._polyClickFunction);
                            proxyControl._on(bbdesigner$(labelElement), BoldBIDashboard.eventType.mouseUp, { Param1: null, Param2: layer, Param3: shape }, proxyControl._polyClickFunction);
                            //if (this.model.enableRightClick)
                                //proxyControl._on(bbdesigner$(labelElement), "contextmenu", { Param1: null, Param2: layer, Param3: shape }, proxyControl._polyClickFunction);
                            proxyControl._off(bbdesigner$(labelElement), BoldBIDashboard.eventType.mouseLeave, proxyControl._polyLeaveFunction);
                            proxyControl._on(bbdesigner$(labelElement), BoldBIDashboard.eventType.mouseLeave, { Param1: layer, map: this }, proxyControl._polyLeaveFunction);
                            labelElement[0].setAttribute("nodeValue", shape.getAttribute("fill"));
                            layer._labelCollection.push(labelElement);
                            layer._labelBounds.push(bounds);
                            layer._labelData.push(labelValue);

                        }
                    }
                    obj["shapeIndex"] = dataIndex;
                    obj["shape"] = shape;
                    obj["shapeData"] = layer._polygonData[dataIndex];
                    proxyControl._off(bbdesigner$(labelElement), BoldBIDashboard.eventType.mouseMove, proxyControl._polyMoveFunction);
                    proxyControl._on(bbdesigner$(labelElement), BoldBIDashboard.eventType.mouseMove, { Param1: shapelayer, Param2: obj }, proxyControl._polyMoveFunction);
                    if (shape != null) {
                        var shapefill = null;
                        if (_isSVG) {
                            shapefill = shape.getAttribute("fill");
                            if (shapefill == "undefined")
                                shapefill = layer.shapeSettings.fill;
                            shape.setAttribute("nodeValue", shapefill);
                        }
                        else {
                            shapefill = shape.fillcolor.value;
                            if (shapefill == "undefined")
                                shapefill = layer.shapeSettings.fill;
                            shape.style.behavior = shapefill;
                        }
                    }
                    if (proxyControl.enableZoomOnSelection()) {
                        bbdesigner$(shape).hover(function () {
                            bbdesigner$(this).css('cursor', 'pointer');
                        }, function () {
                            bbdesigner$(this).css('cursor', 'auto');
                        });
                    }
                    layer._mapShapes.push(obj);					
                    bbdesigner$(shape).mouseenter({ Param1: shapelayer, Param2: obj, map: proxyControl }, proxyControl._polyEnterFunction);
                    this._off(bbdesigner$(shape), BoldBIDashboard.eventType.mouseDown, proxyControl._polyMouseDown);
                    this._on(bbdesigner$(shape), BoldBIDashboard.eventType.mouseDown, { Param1: obj, Param2: shapelayer }, proxyControl._polyMouseDown);
                    this._off(bbdesigner$(shape), BoldBIDashboard.eventType.mouseUp, proxyControl._polyClickFunction);
                    //if (this.model.enableRightClick)
                        //this._off(bbdesigner$(shape), "contextmenu", proxyControl._polyClickFunction);
                    this._on(bbdesigner$(shape), BoldBIDashboard.eventType.mouseUp, { Param1: obj, Param2: shapelayer, Param3: shape }, proxyControl._polyClickFunction);
                    //if (this.model.enableRightClick)
                        //this._on(bbdesigner$(shape), "contextmenu", { Param1: obj, Param2: shapelayer, Param3: shape }, proxyControl._polyClickFunction);
                    this._off(bbdesigner$(shape), BoldBIDashboard.eventType.mouseMove, proxyControl._polyMoveFunction);
                    this._on(bbdesigner$(shape), BoldBIDashboard.eventType.mouseMove, { Param1: shapelayer, Param2: obj }, proxyControl._polyMoveFunction);
                    this._off(bbdesigner$(shape), BoldBIDashboard.eventType.mouseLeave, proxyControl._polyLeaveFunction);
                    this._on(bbdesigner$(shape), BoldBIDashboard.eventType.mouseLeave, { Param1: shapelayer, Param2: obj, map: this }, proxyControl._polyLeaveFunction);
                    this._off(bbdesigner$(shape), BoldBIDashboard.eventType.mouseUp, proxyControl._polyUpFunction);
                    this._on(bbdesigner$(shape), BoldBIDashboard.eventType.mouseUp, { Param1: obj, Param2: shapelayer, Param3: shape }, proxyControl._polyUpFunction);
					if (dataIndex == 0) {
					    if (this._legendDiv == null) {
					        this._legendDiv = bbdesigner$("<div class='LegendDiv'/>");
					    }
						if (shapelayer.legendSettings != null && (shapelayer.shapeSettings.colorMappings != null || shapelayer.shapeSettings.colorPath != null) && (shapelayer.legendSettings.type == undefined || shapelayer.legendSettings.type == BoldBIDashboard.datavisualization.Map.LegendType.Layers))
							shapelayer._generateLegends(this);
						if (this.model.enableRTL && shapelayer.shapeSettings.colorMappings && shapelayer.shapeSettings.colorMappings.rangeColorMapping)
							shapelayer.shapeSettings.colorMappings.rangeColorMapping.reverse();
						else if (this.model.enableRTL && shapelayer.shapeSettings.colorMappings && shapelayer.shapeSettings.colorMappings.equalColorMapping)
							shapelayer.shapeSettings.colorMappings.equalColorMapping.reverse();
						if (shapelayer.legendSettings != null && (bubble.colorMappings != null || bubble.colorPath != null) && (shapelayer.legendSettings.type == BoldBIDashboard.datavisualization.Map.LegendType.Bubbles))
							shapelayer._generateBubbleLegends(this);
						if (shapelayer.shapeSettings.colorMappings != null && shapelayer.shapeSettings.colorMappings.rangeColorMapping != null) {

							shapelayer.shapeSettings.colorMappings.rangeColorMapping.sort(this._orderByNameAscending);
						}
						if (bubble.colorMappings != null && bubble.colorMappings.rangeColorMapping != null) {
							bubble.colorMappings.rangeColorMapping.sort(this._orderByNameAscending);
						}
					}
                }
            }

            if (shapelayer._isBaseLayer && shapelayer.geometryType == BoldBIDashboard.datavisualization.Map.GeometryType.Normal && shapelayer.labelSettings.showLabels) {

                shapelayer._generateLabels(this);
                shapelayer._labelSizeCalculation(this);
                this._applyTransform(this._scale, this._translatePoint);
            }

        },
        sortbyRadius: function (bubble, minValue, maxValue, item, valuePath) {
            var radiusCollection = [], bubbleValue, radius;
            for (var i = 0; i < valuePath.length; i++) {
                bubbleValue = this._reflection(item, valuePath[i]);
                radius = this._getRatioOfBubble(bubble.minValue, bubble.maxValue, bubbleValue, minValue[i], maxValue[i]);
                radiusCollection.push({ valuePath: valuePath[i], radius: radius, bubbleValue: bubbleValue });
            }
            // For sorting array in descending based on radius
            radiusCollection.sort(function (a, b) {
                return b.radius - a.radius;
            });
            return radiusCollection;
        },
        validateBubblePosition: function (polygon, midpoint, bubblerad) {
            var leftPoints = [], rightPoints = [];
            bubblerad = parseFloat(bubblerad);
            if (!this.isPointInPolygon(polygon, midpoint, true)) {
                var previouspoint = 0;
                for (var j = 0; j < polygon.length; j++) {
                    var point = { x: (polygon[j].x + this._translatePoint.x) * this._scale, y: (polygon[j].y + this._translatePoint.y) * this._scale };
                    if ((point.y < midpoint.y && previouspoint.y >= midpoint.y) || (previouspoint.y < midpoint.y && point.y >= midpoint.y)) {
                        if (point.x < midpoint.x)
                            leftPoints.push(point.x);
                        else
                            rightPoints.push(point.x);
                    }
                    previouspoint = point;
                }

                if (!leftPoints.length > 0 || !rightPoints.length > 0) {
                    if (leftPoints.length > 0) {
                        var j = midpoint.x + bubblerad;
                        if (!this.isPointInPolygon(polygon, { x: j - 2, y: midpoint.y }, true)) {
                            j = j - 2;
                        }
                        midpoint.x = parseFloat(j - 2 - bubblerad);
                    }
                    if (rightPoints.length > 0) {
                        var j = midpoint.x - bubblerad;
                        if (!this.isPointInPolygon(polygon, { x: j + 2, y: midpoint.y }, true)) {
                            j = j + 2;
                        }
                        midpoint.x = parseFloat(j + 2 + bubblerad);
                    }
                }
            }
            return midpoint;
        },

        isPointInPolygon: function (polygon, point, needTranslate) {
            if (polygon == null) return true;
            var insidePolygon = false, currentPoint, previousPoint;

            for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
                currentPoint = { x: polygon[i].x, y: polygon[i].y };
                previousPoint = { x: polygon[j].x, y: polygon[j].y };

                if (needTranslate) {
                    currentPoint = { x: (polygon[i].x + this._translatePoint.x) * this._scale, y: (polygon[i].y + this._translatePoint.y) * this._scale };
                    previousPoint = { x: (polygon[j].x + this._translatePoint.x) * this._scale, y: (polygon[j].y + this._translatePoint.y) * this._scale };
                }

                //Check the bubble point placed within the polygon shape
                ((currentPoint.y > point.y) != (previousPoint.y > point.y))
                    && (point.x < (previousPoint.x - currentPoint.x) * (point.y - currentPoint.y) / (previousPoint.y - currentPoint.y) + currentPoint.x)
                && (insidePolygon = !insidePolygon);
            }
            return insidePolygon;
        },

        dragDown: function (event) {

            var map = event.data.map;
            var layer = map.model.layers[0];

            var mapArea = this._mapContainer;

            if (event.type == "mousedown") {
                map._startPoint = { x: event.pageX - mapArea[0].offsetLeft, y: event.pageY - mapArea[0].offsetTop };
                map._stopPoint = { x: event.pageX - mapArea[0].offsetLeft, y: event.pageY - mapArea[0].offsetTop };
            }
            else if (event.type == "touchstart") {
                map._startPoint = { x: event.originalEvent.changedTouches[0].pageX - mapArea[0].offsetLeft, y: event.originalEvent.changedTouches[0].pageY - mapArea[0].offsetTop };
                map._stopPoint = { x: event.originalEvent.changedTouches[0].pageX - mapArea[0].offsetLeft, y: event.originalEvent.changedTouches[0].pageY - mapArea[0].offsetTop };
            }
            else if (event.type == "MSPointerDown") {
                map._startPoint = { x: event.originalEvent.pageX - mapArea[0].offsetLeft, y: event.originalEvent.pageY - mapArea[0].offsetTop };
                map._stopPoint = { x: event.originalEvent.pageX - mapArea[0].offsetLeft, y: event.originalEvent.pageY - mapArea[0].offsetTop };
            }
            map.mouseClickable = true;

            if (map.model.draggingOnSelection) {

                if (layer._prevSelectedShapes.length > 0) {

                    for (var i = 0; i < layer._prevSelectedShapes.length; i++) {
                        layer._prevSelectedShapes[i].setAttribute("class", "mapShape");
                        if (_isSVG) {
                            layer._prevSelectedShapes[i].setAttribute("fill", layer._prevSelectedShapes[i].getAttribute("nodeValue"));
                            layer._prevSelectedShapes[i].setAttribute("stroke", layer.shapeSettings.stroke);
                            layer._prevSelectedShapes[i].setAttribute("stroke-width", layer.shapeSettings.strokeThickness / this._scale);
                        }
                        else {
                            layer.fillcolor = layer._prevSelectedShapes[i].getAttribute("nodeValue");
                            layer.strokecolor = layer.shapeSettings.stroke
                            layer.strokeweight = layer.shapeSettings.strokeThickness / this._scale;
                        }
                    }
                    layer._prevSelectedShapes = [];
                }
            }
        },

        dragMove: function (event) {

            var map = event.data.map;
            var layer = map.model.layers[0];
            var width; var height;

            var mapArea = this._mapContainer;

            if (map.model.draggingOnSelection) {

                if (map.mouseClickable) {
                    map.ispanning = false;


                    if (event.type == "mousemove")
                        map._stopPoint = { x: event.pageX - mapArea[0].offsetLeft, y: event.pageY - mapArea[0].offsetTop };
                    else if (event.type == "touchmove")
                        map._stopPoint = { x: event.originalEvent.changedTouches[0].pageX - mapArea[0].offsetLeft, y: event.originalEvent.changedTouches[0].pageY - mapArea[0].offsetTop };
                    else if (event.type == "MSPointerMove")
                        map._stopPoint = { x: event.originalEvent.pageX - mapArea[0].offsetLeft, y: event.originalEvent.pageY - mapArea[0].offsetTop };

                    bbdesigner$('.e-mapDragSelection').remove();
                    var div = bbdesigner$('<div class = "e-mapDragSelection"></div>');

                    width = Math.abs(map._stopPoint.x - map._startPoint.x),
                    height = Math.abs(map._stopPoint.y - map._startPoint.y);

                    bbdesigner$(div).css({ "top": Math.min(map._startPoint.y, map._stopPoint.y), "left": Math.min(map._startPoint.x, map._stopPoint.x), width: width, height: height, position: "absolute", "z-index": 100 });
                    bbdesigner$(div).appendTo("#maps");
                }
            }
        },

        dragUp: function (event) {
            var map = event.data.map;
            var width = Math.abs(map._stopPoint.x - map._startPoint.x);
            var height = Math.abs(map._stopPoint.y - map._startPoint.y);
            var layer = map.model.layers[0];
            var mapArea = this._mapContainer;

            if (map.model.draggingOnSelection) {

                bbdesigner$('.e-mapDragSelection').remove();
                bbdesigner$(".e-mapDragSelection").css({
                    "display": "none"
                });
                map.mouseClickable = false;

                for (var i = 0; i < map.model.layers[0]._mapShapes.length; i++) {
                    var shape = map.model.layers[0]._mapShapes[i].shape;
                    var rect = shape.getBoundingClientRect();
                    if (!(rect.left - mapArea[0].offsetLeft + rect.width < Math.min(map._startPoint.x, map._stopPoint.x) || Math.min(map._startPoint.x, map._stopPoint.x) + width < rect.left - mapArea[0].offsetLeft ||
                           rect.top - mapArea[0].offsetTop + rect.height < Math.min(map._startPoint.y, map._stopPoint.y) || Math.min(map._startPoint.y, map._stopPoint.y) + height < rect.top - mapArea[0].offsetTop)) {

                        if (!map.model.layers[0]._contains(layer._prevSelectedShapes, shape))

                            layer._prevSelectedShapes.push(shape);
                    }
                }


                for (var i = 0; i < layer._prevSelectedShapes.length; i++) {
                    var shape = layer._prevSelectedShapes[i];
                    var rect = shape.getBoundingClientRect();
                    if(!shape.removeSelectionCSS)
                        shape.setAttribute("class", "e-mapSelectedShape mapShape");
                    if (_isSVG) {
                        shape.setAttribute("fill", layer.shapeSettings.selectionColor);
                        shape.setAttribute("stroke", layer.shapeSettings.selectionStroke);
                        shape.setAttribute("stroke-width", (layer.shapeSettings.selectionStrokeWidth / map._scale));
                    }
                }
            }
        },

        isIntersectBubbles: function () {
            var listofBounds = [];
            for (var k = 0; k < this.model.layers.length; k++) {
                var layer = this.model.layers[k];
                Array.prototype.push.apply(listofBounds, layer._bubbleCollection);
                for (var i = 0; i < layer.subLayers.length; i++) {
                    Array.prototype.push.apply(listofBounds, layer.subLayers[i]._bubbleCollection);
                }
            }

            for (var i = 0; i < listofBounds.length; i++) {
                var x = listofBounds[i].getAttribute('cx');
                var y = listofBounds[i].getAttribute('cy');
                var r = listofBounds[i].getAttribute('r');
                for (var j = i + 1; j < listofBounds.length; j++) {

                    var x1 = listofBounds[j].getAttribute('cx');
                    var y1 = listofBounds[j].getAttribute('cy');
                    var r1 = listofBounds[j].getAttribute('r');
                    var distBubble = Math.sqrt(((x - x1) * (x - x1)) + ((y - y1) * (y - y1)));
                    var rad = parseFloat(r) + parseFloat(r1);

                    if (distBubble <= rad) {
                        return true;
                    }
                }
            }
            return false;
        },

        _zooming: function (delta, e) {
            var position = this._getCurrentPoint(e);
            if (delta >= 120) {
                this._zoomingIn(position.x, position.y, e);
            }
            else {
                this._zoomingOut(position.x, position.y, e);
            }
        },

        _zoomingIn: function (x, y, event, isAnimate) {
            var map = this;
            if (map.enableZoom() && map.zoomLevel() >= map.minZoom() && map.zoomLevel() <= map.maxZoom()) {
                var scal = map._scale;
                var position = { x: x, y: y };
                map._prevScale = scal;
                if (!this._isTileMap) {
                    map._prevPoint = { x: map._translatePoint.x, y: map._translatePoint.y };
                    map._translatePoint.x -= (map._width / map._scale - map._width / (map._scale + map.zoomFactor())) / (map._width / x);
                    map._translatePoint.y -= (map._height / map._scale - map._height / (map._scale + map.zoomFactor())) / (map._height / y);
                    map._scale = scal + map.zoomFactor();
                    map.zoomLevel(map.zoomLevel() + map.zoomFactor());
                }
                else {
                    this._tileZoom(map.zoomLevel() - map.zoomFactor(), map.zoomLevel(), position);
                    var prevLevel = map.zoomLevel();
                    map.zoomLevel(map.zoomLevel() + map.zoomFactor());
                    this._generateTiles(this.zoomLevel());
                    map._translatePoint.x = (map._tileTranslatePoint.x - (0.5 * Math.pow(2, prevLevel))) / (Math.pow(2, prevLevel));
                    map._translatePoint.y = (map._tileTranslatePoint.y - (0.5 * Math.pow(2, prevLevel))) / (Math.pow(2, prevLevel));
                    map._scale = (Math.pow(2, prevLevel));
                }

                map._trigger("zoomedIn", { originalEvent: event, zoomLevel: map.zoomLevel() });
                map._applyTransform(map._scale, map._translatePoint);
                map._refrshLayers();
                map._resizeShape();

                map._updateSliderValue();
            }
        },

        _zoomingOut: function (x, y, event, isAnimate) {
            var map = this;
            if (map.enableZoom()) {
                if (map.zoomLevel() > this.minZoom()) {

                    var scal = map._scale;
                    var position = { x: x, y: y };
                    map._prevScale = scal;
                    if (!map._isTileMap) {
                        if (map._scale > 1) {
                            map._prevPoint = { x: map._translatePoint.x, y: map._translatePoint.y };
                            map._translatePoint.x -= (map._width / map._scale - map._width / (map._scale - map.zoomFactor())) / (map._width / x);
                            map._translatePoint.y -= (map._height / map._scale - map._height / (map._scale - map.zoomFactor())) / (map._height / y);
                            map._scale = map._scale - map.zoomFactor();
                            map.zoomLevel(map.zoomLevel() - map.zoomFactor());
                        }
                    }
                    else {
                        map._tileZoom(map.zoomLevel() + map.zoomFactor(), map.zoomLevel(), position);
                        var prevLevel = map.zoomLevel();
                        map.zoomLevel(map.zoomLevel() - map.zoomFactor());

                        map._generateTiles(map.zoomLevel());
                        map._translatePoint.x = (map._tileTranslatePoint.x - (0.5 * Math.pow(2, map.zoomLevel() - map.zoomFactor()))) / (Math.pow(2, map.zoomLevel() - map.zoomFactor()));
                        map._translatePoint.y = (map._tileTranslatePoint.y - (0.5 * Math.pow(2, map.zoomLevel() - map.zoomFactor()))) / (Math.pow(2, map.zoomLevel() - map.zoomFactor()));
                        map._scale = (Math.pow(2, map.zoomLevel() - map.zoomFactor()));
                    }
                    if (map.zoomLevel() < map.minZoom()) {
                        map.zoomLevel(map.minZoom());
                        map.zoom(map.zoomLevel());
                    }

                    map._applyTransform(map._scale, map._translatePoint);
                    map._refrshLayers();
                    map._resizeShape();

                    map._updateSliderValue();
                }
                else {
                    map.zoom(map.minZoom(), false);
                }
                map._trigger("zoomedOut", { originalEvent: event, zoomLevel: map.zoomLevel() });
            }
        },

        _getRatioOfBubble: function (min, max, value, minValue, maxValue) {
            var diff = Math.max(Math.abs(value - minValue),1), delta = Math.max(Math.abs(maxValue - minValue),1), percent = diff / delta;
            bubbleRadius = max * percent;
            if (bubbleRadius < min && value != null)
                bubbleRadius = min;
            else if (bubbleRadius > max)
                bubbleRadius = max;
            return bubbleRadius;
        },

        _reflection: function (Source, path) {
            var ShapeValues = Source;
            if (path != null && Source != null) {
                var parts = path.split(".");
                var i = 0;
                parts.push(path);
                for (; i < parts.length; i++) {
                    if (Source != undefined && ShapeValues != null) {
                        var hasProperty = ShapeValues.hasOwnProperty(parts[i]);
                        if (hasProperty) {
                            bbdesigner$.each(ShapeValues, function (prop, propval) {
                                if (prop == parts[i]) {
                                    ShapeValues = propval;
                                    return false;
                                }

                            });
                        }
                    }
                }
                return ShapeValues;
            }
            else {
                return null;
            }

        },

        clearShapeSelection: function () {
            var index = this.baseMapIndex();
            this.model.layers[index]._clearShapeWidth(this._scale);
            for (var key = 0; key < this.model.layers[index].subLayers.length; key++) {
                (this.model.layers[index].subLayers[key])._clearShapeWidth(this._scale);
            }
        },
        shapeSelectionOnResize: function () {
            var index = this.baseMapIndex();
            this.model.layers[index]._shapeSelection();
            for (var key = 0; key < this.model.layers[index].subLayers.length; key++) {
                (this.model.layers[index].subLayers[key])._shapeSelection();
            }
        },

        refreshMarkers: function () {
            var index = this.baseMapIndex();
            this.model.layers[index]._generateMarkerForLayers(this);
            for (var key = 0; key < this.model.layers[index].subLayers.length; key++) {
                (this.model.layers[index].subLayers[key])._generateMarkerForLayers(this);
            }
        },

        _generateTooltipForLayers: function (layer) {
            if (layer.showTooltip) {
                if (document.documentMode == 8) {
                    var tooltip = document.querySelectorAll("shapeToolTip");
                }
                else {
                    var tooltip = document.getElementsByClassName("shapeToolTip");
                }
                if (tooltip != null && tooltip.length == 0) {
                    var tooltip_templateDiv = bbdesigner$("<div class='shapeToolTip' style='display:none;position:absolute;z-index:1000;pointer-events:none;'></div>");
                    bbdesigner$(document.body).append(tooltip_templateDiv);
                    layer._tooltipElement = tooltip_templateDiv;
                }
                else {
                    layer._tooltipElement = tooltip[0];
                }
                if (layer.tooltipTemplate == null) {
                    var path = layer.shapeSettings.valuePath;
                    if (path != null) {
                        layer.tooltipTemplate = 'defaultTooltip';
                        this._mapContainer.append(bbdesigner$('<div  id="defaultTooltip" style="display:none;"><div style="margin-left:10px;margin-top:-25px;"><div class="defaultToolTip"><p style="margin-top:-4px"><label  style="color:rgb(27, 20, 20);font-size:14px;font-weight:normal;font-family:Segoe UI">{{:#data["' + path + '"]}}</label></p></div></div></div>'));
                    }
                }
            }
        },

        _orderByNameAscending: function (a, b) {
            if (a.Range == b.Range) {
                return 0;
            } else if (a.Range > b.Range) {
                return 1;
            }
            return -1;
        },

        _resizingContainer: function () {
            this._scale = this._isTileMap ? Math.pow(2, this.zoomLevel() - 1) : 1;
            if (this._isTileMap) {
                this._translatePoint.x = this._tileTranslatePoint.x / this._scale;
                this._translatePoint.y = this._tileTranslatePoint.y / this._scale;
            }
            else {
                this._translatePoint.x = this._tileTranslatePoint.x / this._scale;
                this._translatePoint.y = this._tileTranslatePoint.y / this._scale;
            }
            this._applyTransform(this._scale, this._translatePoint);
            if (this.zoomLevel() > 1) {
                this._scale = this._isTileMap ? Math.pow(2, this.zoomLevel() - this.zoomFactor()) : this.zoomLevel();
                this._applyTransform(this._scale, this._previosTranslatePoint);
            }
            this._baseScale = 1;
            this._baseTranslatePoint = { x: (this._translatePoint.x * 2), y: (this._translatePoint.y * 2) };

        },

        _calculateMarginConditions: function () {
            var trans = this._calculateMinMax();
            if (this._translatePoint.y > trans.maxY) {
                this._translatePoint.y = trans.maxY;
            }
            else if (this._translatePoint.y < trans.minY) {
                this._translatePoint.y = trans.minY;
            }
            if (this._translatePoint.x > trans.maxX) {
                this._translatePoint.x = trans.maxX;
            }
            else if (this._translatePoint.x < trans.minX) {
                this._translatePoint.x = trans.minX;
            }
        },

        _calculateMinMax: function () {
            var bounds = this._groupBorder;
            var maximumTransX, maximumTransY, minimumTransX, minimumTransY;
            if (this._containerHeight * this._scale <= this._height) {
                maximumTransY = (this._height - this._containerHeight * this._scale) / (2 * this._scale) - bounds.y;
                minimumTransY = (this._height - this._containerHeight * this._scale) / (2 * this._scale) - bounds.y;
            } else {
                maximumTransY = -bounds.y + 1;
                minimumTransY = (this._height - this._containerHeight * this._scale) / (this._scale) - bounds.y - 1;
            }
            if (this._containerWidth * this._scale <= this._width) {
                maximumTransX = (this._width - this._containerWidth * this._scale) / (2 * this._scale) - bounds.x;
                minimumTransX = (this._width - this._containerWidth * this._scale) / (2 * this._scale) - bounds.x;
            } else {
                maximumTransX = -bounds.x + 1;
                minimumTransX = (this._width - this._containerWidth * this._scale) / (this._scale) - bounds.x - 1;
            }
            return { minX: minimumTransX, maxX: maximumTransX, minY: minimumTransY, maxY: maximumTransY };
        },

        _findMidPointofPoylgon: function (points, bubblePostion) {
            if (points.length > 0) {
                var xSum = 0, ySum = 0, point;
                if (bubblePostion.centerX == undefined && bubblePostion.centerY == undefined) {
                    var min = 0, max = points.length,
                        initialPoint = points[0],
                        minX = initialPoint.x, maxX = initialPoint.x,
                        minY = initialPoint.y, maxY = initialPoint.y,
                        startX, startY, startX1, startY1, sum = 0, prevPoint;

                    for (var i = min; i <= max - 1; i++) {
                        prevPoint = points[i];
                        startX = prevPoint.x;
                        startY = prevPoint.y;
                        if (i == max - 1) {
                            startX1 = initialPoint.x;
                            startY1 = initialPoint.y;
                        }
                        else {
                            var nextPoint = points[i + 1];
                            startX1 = nextPoint.x;
                            startY1 = nextPoint.y;
                        }
                        sum = sum + Math.abs(((startX * startY1)) - (startX1 * startY));
                        xSum = xSum + Math.abs(((startX + startX1) * (((startX * startY1) - (startX1 * startY)))));
                        ySum = ySum + Math.abs(((startY + startY1) * (((startX * startY1) - (startX1 * startY)))));

                    }
                    sum = 0.5 * sum;
                    xSum = (1 / (4 * sum)) * xSum;
                    ySum = (1 / (4 * sum)) * ySum;
                } else {
                    var l = points.length, maxValue = Number.MAX_VALUE,
                    maxX = -maxValue, minX = maxValue,
                    maxY = -maxValue, minY = maxValue;

                    while (l--) {
                        point = points[l];
                        maxX = Math.max(maxX, point.x);
                        minX = Math.min(minX, point.x)

                        maxY = Math.max(maxY, point.y);
                        minY = Math.min(minY, point.y);
                    }
                    // Calculate center position of bubble and dataLabel for the polygon
                    xSum = minX + (maxX - minX) * (bubblePostion.centerX != undefined ? bubblePostion.centerX : 0.5);
                    ySum = minY + (maxY - minY) * (bubblePostion.centerY != undefined ? bubblePostion.centerY : 0.5);
                }

                /* Code for finding nearest points in polygon related to midPoint*/
                var _rightMinPoint = { x: 0, y: 0 },
                    _rightMaxPoint = { x: 0, y: 0 },
                    _leftMinPoint = { x: 0, y: 0 },
                    _leftMaxPoint = { x: 0, y: 0 };

                for (var i = min; i <= max - 1; i++) {
                    point = points[i];
                    if (point.x > xSum) {
                        if (point.y < ySum && ySum - point.y < ySum - _rightMinPoint.y)
                            _rightMinPoint = { x: point.x, y: point.y };
                        else if (point.y > ySum && (_rightMaxPoint.y == 0 || point.y - ySum < _rightMaxPoint.y - ySum))
                            _rightMaxPoint = { x: point.x, y: point.y };
                    }
                    else {
                        if (point.y < ySum && ySum - point.y < ySum - _leftMinPoint.y)
                            _leftMinPoint = { x: point.x, y: point.y };
                        else if (point.y > ySum && (_leftMaxPoint.y == 0 || point.y - ySum < _leftMaxPoint.y - ySum))
                            _leftMaxPoint = { x: point.x, y: point.y };
                    }
                }

                return { x: xSum, y: ySum, rightMin: _rightMinPoint, rightMax: _rightMaxPoint, leftMin: _leftMinPoint, leftMax: _leftMaxPoint, points: points };
            }
        },
        _convertPointToLatLong: function (pixelX, pixelY, bounds, factor) {

            var Size;
            if (bounds == null) { bounds = [[-180, -85], [180, 85]] }
            if (this._isTileMap) {
                Size = Math.pow(2, 1) * 256;
            }
            else {
                if (factor == null)
                    Size = Math.min(this._height, this._width);
                else
                    Size = Math.min(this._height, this._width) * factor;
            }

            var x = (Math.min(pixelX, 0, Size - 1) / Size) - 0.5;
            var y = 0.5 - (Math.min(pixelY, 0, Size - 1) / Size);
            latitude = 90 - 360 * Math.atan(Math.exp(-y * 2 * Math.PI)) / Math.PI;
            longitude = 360 * x;
            return { x: latitude, y: longitude };


        },
        _convertTileLatLongtoPointForShapes: function (lat, lng, bounds, factor) {
            var Size;
            if (bounds == null) { bounds = [[-180, -85], [180, 85]] }
            if (this._isTileMap) {
                Size = Math.pow(2, 1) * 256;
            }
            else {
                if (factor == null)
                    Size = Math.min(this._height, this._width);
                else
                    Size = Math.min(this._height, this._width) * factor;
            }

            var x = (lng + 180) / 360;
            var sinLatitude = Math.sin(lat * Math.PI / 179.5);
            if (sinLatitude == -1)
                sinLatitude = -0.5;
            var y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);
            if (this._isMapCoordinates) {
                var pixelX = (Math.min(Math.max(x * Size + 0.5, 0), Size - 1));
                var pixelY = (Math.min(Math.max(y * Size + 0.5, 0), Size - 1));
            }
            else if (factor != null) {

                var pixelX = Math.abs((lng - this._mapBounds[0][0]) * factor);
                var pixelY = Math.abs((this._mapBounds[1][1] - lat) * factor);
            }
            else {

                var pixelX = lng;
                var pixelY = lat;
            }



            return { x: pixelX, y: pixelY };


        },

        _convertTileLatLongtoPoint: function (lat, lng) {
            var Size = Math.pow(2, this.zoomLevel()) * 256;
            var x = (lng + 180) / 360;
            var sinLatitude = Math.sin(lat * Math.PI / 180);
            var y = 0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (4 * Math.PI);
            if (this._isMapCoordinates) {
                var pixelX = (x * Size + 0.5) + this._tileTranslatePoint.x;
                var pixelY = (y * Size + 0.5) + this._tileTranslatePoint.y;
            }
            else if (factor != null) {

                var pixelX = Math.abs((lng - this._mapBounds[0][0]) * factor);
                var pixelY = Math.abs((this._mapBounds[1][1] - lat) * factor);
            }
            else {

                var pixelX = lng;
                var pixelY = lat;
            }
            return { x: pixelX, y: pixelY };
        },

        _convertLatLongtoPointforMarker: function (lat, lng) {
            var factor = this._getFactor();
            var point = this._convertTileLatLongtoPointForShapes(lat, lng, this._mapBounds, factor);
            return { x: (point.x + this._translatePoint.x) * this._scale, y: (point.y + this._translatePoint.y) * this._scale };

        },

        _animate: function (animateduration) {
            this._calculateMarginConditions();
            bbdesigner$(this._rootgroup).stop(true, false);
            if (this._sliderControl != null) {
                bbdesigner$(this._sliderControl).stop(true, false);
            }
            var map = this;
            var currentTranformation = { x: this._translatePoint.x, y: this._translatePoint.y };
            var startPoint = [this._prevPoint.x, this._prevPoint.y];
            var endPoint = [this._translatePoint.x, this._translatePoint.y];

            function slope(horizontal, vertical) {

                if (horizontal[0] == vertical[0]) {
                    return null;
                }
                return (vertical[1] - horizontal[1]) / (vertical[0] - horizontal[0]);
            }

            function intercept(point, slopeValue) {
                if (slopeValue === null) {
                    return point[0];
                }
                return point[1] - slopeValue * point[0];
            }

            var slopeFactor = slope(startPoint, endPoint);
            var slopeIntersection = intercept(startPoint, slopeFactor);
            var horizontalDifference = endPoint[0] - startPoint[0];
            var verticalDifference = endPoint[1] - startPoint[1];
            var scaleDifference = this._scale - this._prevScale;
            var currentScale = this._scale;
            this._updateSliderValue();
            bbdesigner$(this._rootgroup).animate(
                {
                    count: 10
                },
                {
                    duration: animateduration,
                    step: function (now, fx) {
                        var scaleX = map._prevScale + ((now * (scaleDifference / fx.end)));
                        var transX = startPoint[0] + (now * (horizontalDifference / fx.end)) / (scaleX / currentScale);
                        var transY;
                        if (slopeFactor == null) {
                            transY = startPoint[1] + (now * (verticalDifference / fx.end));
                        } else {
                            transY = ((slopeFactor * transX) + slopeIntersection);
                        }
                        if (_isSVG) {
                            if (scaleX < 1) {
                                scaleX = 1;
                                transX = map._initialTransform.x;
                                transY = map._initialTransform.y;
                            }
                            map._rootgroup.setAttribute('transform', 'scale(' + scaleX + ') translate(' + transX + ', ' + transY + ')');
                        }
                        else {
                            map._rootgroup.coordorigin = -transX + ',' + -transY;
                            map._rootgroup.coordsize = (map._width / scaleX) + ',' + (map._height / scaleX);
                        }
                        map._translatePoint.x = transX;
                        map._translatePoint.y = transY;
                        map._scale = scaleX;
                        map._refrshLayers();
                        map._resizeShape();
                    },
                    complete: function () {
                        map._translatePoint.x = currentTranformation.x;
                        map._translatePoint.y = currentTranformation.y;
                        map._scale = currentScale;
                        this.count = 0;
                    }
                }
            );

        },

        _applyTransform: function (scale, translatePoint) {
            this._scale = scale;
            this._translatePoint = translatePoint;
            if (!this._isTileMap)
                this._calculateMarginConditions();
            if ((this._translatePoint.x != Number.POSITIVE_INFINITY) && (this._translatePoint.y != Number.POSITIVE_INFINITY)) {
                if (_isSVG) {
                    this._rootgroup.setAttribute('transform', 'scale(' + this._scale + ') translate(' + this._translatePoint.x + ', ' + this._translatePoint.y + ')');
                    this._initialTransform = { x: this._translatePoint.x, y: this._translatePoint.y };
                }
                else {
                    this._rootgroup.coordorigin = (-this._translatePoint.x) + ',' + (-this._translatePoint.y);
                    this._rootgroup.coordsize = (this._width / scale) + ',' + (this._height / scale);
                }
            }
        },

        _mouseMove: function (event) {
            if (event.type == "touchmove" && event.originalEvent.touches.length > 1) {
                this._isPinching = true;
            }
            else {
                var map = this;
                if (map.ispanning && map.enablePan()) {
                    event.preventDefault();
                    var position;
                    if (event.type == "mousemove")
                        position = { x: event.pageX, y: event.pageY };
                    else if (event.type == "touchmove")
                        position = { x: event.originalEvent.changedTouches[0].pageX, y: event.originalEvent.changedTouches[0].pageY };
                    else if (event.type == "MSPointerMove")
                        position = { x: event.originalEvent.pageX, y: event.originalEvent.pageY };
                    if (this._isTileMap) {
                        var curtileX = this._tileTranslatePoint.x - (this._dragStartX - position.x);
                        var curtileY = this._tileTranslatePoint.y - (this._dragStartY - position.y);
                        this._tileTranslatePoint.x = curtileX;
                        this._tileTranslatePoint.y = curtileY;
                        this._generateTiles(this.zoomLevel());
                    }
                    var curX = map._translatePoint.x - (map._dragStartX - position.x) / map._scale;
                    var curY = map._translatePoint.y - (map._dragStartY - position.y) / map._scale;
                    if (curX != map._translatePoint.x || curY != map._translatePoint.y) {
                        map._isDragging = true;
                    }
                    this._translatePoint.x = curX;
                    this._translatePoint.y = curY;
                    map._applyTransform(map._scale, map._translatePoint);
                    map._dragStartX = position.x;
                    map._dragStartY = position.y;
                    map._refrshLayers();
                }
            }
        },

        _svgMouseLeave: function (event) {
            var map = this;
            map.ispanning = false;
        },

        _mouseWheel: function (event) {
            if (this.enableZoom()) {
                if (this.enableAnimation()) {
                    bbdesigner$(this._rootgroup).stop(true, false);
                }
                var e = event.originalEvent;
                var original = event;
                if (!_isSVG) {
                    e = event;
                }
                if (event.target.className != "LegendDiv" && event.target.className != "e-defaultLegendLabel") {
                    e.preventDefault ? e.preventDefault() : original.preventDefault();
                    if (_isSVG) {
                        this._zooming(event.originalEvent.wheelDelta, event.originalEvent);
                    }
                    else {
                        this._zooming(event.originalEvent.wheelDelta, e);
                    }
                }
            }
        },

        _mouseButtonUp: function (event) {

            var map = this;
            if (map.ispanning) {
                map._trigger("panned", { originalEvent: event });
            }
            map.ispanning = false;
        },

        _mouseUp: function (event) {
            this.ispanning = false;
            this._isDragging = false;
        },

        _mapClick: function (e) {
            var end, eventArgs;
            if (this.model.click != '') {
                eventArgs = { model: this.model, data: { event: e } };
                this._trigger("click", eventArgs);
            }
			
			if(this.model.layers[this.baseMapIndex()].legendSettings.toggleVisibility){
				this.model.layers[this.baseMapIndex()]._legendToggleVisibility(this.model.layers[this.baseMapIndex()],e,this);
				for (var key = 0; key < this.model.layers[this.baseMapIndex()].subLayers.length; key++) {
					this.model.layers[this.baseMapIndex()].subLayers[key]._legendToggleVisibility(this.model.layers[this.baseMapIndex()].subLayers[key],e,this);
				}
			}
			
            if (this.model.doubleClick != '') {
                end = new Date();
                if (this._doubleTapTimer != null && end - this._doubleTapTimer < 300) {
                    eventArgs = { model: this.model, data: { event: e } };
                    this._trigger("doubleClick", eventArgs);
                }
                this._doubleTapTimer = end;
            }
        },

        _mouseButtonDown: function (event) {
            this._isPinching = false;
            if (event.target.className != "e-vhandle") {
                this._isNavigationPressed = false;
                if (this.enableAnimation()) {
                    bbdesigner$(this._rootgroup).stop(true, false);
                    if (this._sliderControl != null) {
                        bbdesigner$(this._sliderControl).stop(true, false);
                    }
                }
                if (event.type == "touchstart" && event.originalEvent.touches.length > 1)
                { }
                else {
                    if (this.model.doubleClick != '')
                        window.setTimeout(event.preventDefault, 10);
                    else
                        event.preventDefault();
                    var position;
                    if (event.type == "mousedown")
                        position = { x: event.pageX, y: event.pageY };
                    else if (event.type == "touchstart")
                        position = { x: event.originalEvent.changedTouches[0].pageX, y: event.originalEvent.changedTouches[0].pageY };
                    else if (event.type == "MSPointerDown")
                        position = { x: event.originalEvent.pageX, y: event.originalEvent.pageY };
                    var map = this;
                    map.ispanning = true;
                    map._dragStartX = position.x;
                    map._dragStartY = position.y;
                }
            }
        },

        _getCurrentPoint: function (event) {
            var map = this._mapContainer;
            var xPos = event.pageX - map.offset().left;
            var yPos = event.pageY - map.offset().top;
            return { x: xPos, y: yPos };
        },

        _legendDoubleClick: function (event) {

            var node = event.target;
            while (node.parentNode != null && node.parentNode.className != "ScrollLegendDiv e-scroller e-js e-widget") {
                node = node.parentNode;
            }
            if (node.parentNode != null && node.parentNode.className == "ScrollLegendDiv e-scroller e-js e-widget") {
                this._isNavigationPressed = true;
            }
        },

        _doubleClick: function (event) {
            var map = this;
            var prevLevel1 = map.zoomLevel();
            map._legendDoubleClick(event);
            if (!this._isNavigationPressed && event.target.className.toString().indexOf("e-icon1") == -1) {
                var position = this._getCurrentPoint(event);
                if (map.enableZoom() && map.zoomLevel() + map.zoomFactor() >= map.minZoom() && map.zoomLevel() + map.zoomFactor() <= map.maxZoom()) {
                    var scal = map._scale;
                    map._prevScale = scal;
                    if (!this._isTileMap) {
                        map._prevPoint = { x: map._translatePoint.x, y: map._translatePoint.y };
                        map._translatePoint.x -= (map._width / map._scale - map._width / (map._scale + map.zoomFactor())) / (map._width / position.x);
                        map._translatePoint.y -= (map._height / map._scale - map._height / (map._scale + map.zoomFactor())) / (map._height / position.y);
                        map._scale = scal + map.zoomFactor();
                        map.zoomLevel(map.zoomLevel() + map.zoomFactor());
                    }
                    else {
                        this._tileZoom(map.zoomLevel() - map.zoomFactor(), map.zoomLevel(), position);
                        var prevLevel = map.zoomLevel();
                        map.zoomLevel(map.zoomLevel() + map.zoomFactor());
                        this._generateTiles(this.zoomLevel());
                        map._translatePoint.x = (map._tileTranslatePoint.x - (0.5 * Math.pow(2, prevLevel))) / (Math.pow(2, prevLevel));
                        map._translatePoint.y = (map._tileTranslatePoint.y - (0.5 * Math.pow(2, prevLevel))) / (Math.pow(2, prevLevel));
                        map._scale = (Math.pow(2, prevLevel));
                    }
                    if (prevLevel1 < map.zoomLevel()) {
                        map._trigger("zoomedIn", { originalEvent: null, zoomLevel: map.zoomLevel() });
                    }
                    if (map.enableAnimation() && !this._isTileMap) {
                        map._animate(600);
                    }
                    else {
                        map._applyTransform(map._scale, map._translatePoint);
                        map._refrshLayers();
                        map._resizeShape();
                    }
                    map._updateSliderValue();
                }
            }
        },

        _tileZoom: function (prevlevel, level, position) {

            var map = this;
            if (level > 0 && level < 20) {
                this._tileDiv.html("");
                var prevSize = Math.pow(2, prevlevel) * 256;
                if (position == undefined) {
                    position = { x: this._width / 2, y: this._height / 2 };
                }
                var totalSize = Math.pow(2, level) * 256;
                var percentX = ((position.x - this._tileTranslatePoint.x) / prevSize) * 100;
                var percentY = ((position.y - this._tileTranslatePoint.y) / prevSize) * 100;
                var pointX = (percentX * totalSize) / 100;
                var pointY = (percentY * totalSize) / 100;
                this._tileTranslatePoint.x = position.x - pointX;
                this._tileTranslatePoint.y = position.y - pointY;

            }
        },

        _bubbleEnterFunction: function (event) {
            if (event.data.templateID != null) {
                var tooltiphtmlString = bbdesigner$("#" + event.data.templateID).render(event.data.itemsrc);
                bbdesigner$(event.data.htmlobj).html(tooltiphtmlString);
            }
            bbdesigner$(document.body).append(event.data.htmlobj);
            return bbdesigner$(event.data.htmlobj).css("display", "block").css({ "left": (event.pageX + 8) + "px", "top": (event.pageY + 6) + "px" });
        },

        _bubbleleaveFunction: function (event) {
            bbdesigner$(event.data.htmlobj).remove();
            return bbdesigner$(event.data.htmlobj).css("display", "none");
        },

        _bubbleOverFunction: function (event) {
            return bbdesigner$(event.data.htmlobj).css("display", "block").css({ "left": (event.pageX + 8) + "px", "top": (event.pageY + 6) + "px" });
        },

        _polyEnterFunction: function (event) {
            var layer = event.data.Param1;
            var shape = event.data.Param2["shape"];
            var map = event.data.map;
            var legend = bbdesigner$.grep(layer._smartLabels, function (obj) { return obj.shape == shape });
            if (layer.enableMouseHover) {
                layer._clearShapeWidth(map._scale);
                if (layer._prevHoverdLegend != null && !layer._contains(layer._prevSelectedLegends, layer._prevHoverdLegend)) {
                    layer._prevHoverdLegend.css("background-color", _isSVG ? layer._prevHoveredShape.getAttribute("fill") : layer._prevHoveredShape.fillcolor.value);
                }
                if (_isSVG) {
                    shape.setAttribute("stroke-width", (layer.shapeSettings.highlightBorderWidth / map._scale));
                    shape.setAttribute('stroke', layer.shapeSettings.highlightStroke);
                } else {
                    shape.strokeweight = layer.shapeSettings.highlightBorderWidth;
                    shape.strokecolor = layer.shapeSettings.highlightStroke / map._scale;
                }

                if (layer.shapeSettings.highlightColor != null) {
                    if (layer.shapeSettings.highlightColor != "transparent" && !layer._contains(layer._prevSelectedShapes, shape)) {
                        shape.setAttribute("class", "e-mapHighlightedShape mapShape");
                        if (_isSVG) {
                            if (layer.shapeSettings.highlightColor != 'none' && shape.highlightcolor == null) {
                                shape.setAttribute('fill', layer.shapeSettings.highlightColor);
                            }
                            else {
                                shape.setAttribute('fill', shape.highlightcolor);
                            }
                            shape.setAttribute("stroke-width", (layer.shapeSettings.highlightBorderWidth / map._scale));
                            shape.setAttribute('stroke', layer.shapeSettings.highlightStroke);
                        } else {
                            shape.fillcolor = layer.shapeSettings.highlightColor;
                        }
                    }
                    if (legend.length > 0 && !layer._contains(layer._prevSelectedLegends, legend[0].legend)) {
                        legend[0].legend.setAttribute("class", "e-mapHighlightedShape mapShape");
                        legend[0].legend.css("background-color", layer.shapeSettings.highlightColor);
                        layer._prevHoverdLegend = legend[0].legend;
                    }

                    layer._prevHoveredShape = shape;
                }

                if (layer.legendSettings != null && layer.legendSettings.mode == BoldBIDashboard.datavisualization.Map.LegendMode.Interactive && layer.shapeSettings.colorMappings != null && layer.shapeSettings.colorMappings.rangeColorMapping != null
                     && !layer.shapeSettings.autoFill && (layer.legendSettings.showLegend == undefined || layer.legendSettings.showLegend)) {
                    for (var i = 0; i < layer._mapShapes.length; i++) {
                        var mapshape = layer._mapShapes[i].shape;
                        if (mapshape == shape) {
                            var mappings = null;
                            if (layer.shapeSettings.colorMappings.rangeColorMapping != undefined) {
                                mappings = layer.shapeSettings.colorMappings.rangeColorMapping;
                            }
                            var _legendwidth = layer.legendSettings.width;
                            if (layer.legendSettings.width == undefined)
                                _legendwidth = 150;

                            var rectwidth = (_legendwidth / mappings.length) / 10;
                            if (layer._mapShapes[i].legendrect != null) {
                                var rectPosition = layer._mapShapes[i].legendrect.marginLeft;
                                bbdesigner$(layer._interactiveArrow).css({ "margin-left": rectPosition + Math.ceil(rectwidth) - layer._interactiveArrow.width() / 2, "display": "block" });
                                break;
                            }
                        }
                    }
                }
                map._trigger("mouseover", { originalEvent: event.data.Param2 });
            }

        },

        _updateShapeRect: function (layer) {

            for (var index = 0; index < layer._mapShapes.length; index++) {
                var obj = layer._mapShapes[index];
                if (obj.left == null) {
                    obj["left"] = layer._mapShapes[index].shape.getBoundingClientRect().left;
                    obj["right"] = layer._mapShapes[index].shape.getBoundingClientRect().right;
                    obj["top"] = layer._mapShapes[index].shape.getBoundingClientRect().top;
                    obj["bottom"] = layer._mapShapes[index].shape.getBoundingClientRect().bottom;
                    layer._mapShapes[index] = obj;
                }
            }
        },

        _polyUpFunction: function (event) {
            var layer = event.data.Param2;
            var shape = event.data.Param3;
            if (event.which == 3 && this.model.enableRightClick)
                return;
            if (this.enableZoomOnSelection() && !this._isDragging && !this._isTileMap && !this._isPinching) {
                if (_isSVG) {
                    var bounds = shape.getBBox();
                    this._zoomOnSelection(bounds);
                } else {
                    this._updateShapeRect(layer);

                    for (var index = 0; index < layer._mapShapes.length; index++) {
                        if (shape == layer._mapShapes[index].shape) {
                            var left = layer._mapShapes[index].left;
                            var top = layer._mapShapes[index].top;
                            var right = layer._mapShapes[index].right;
                            var bottom = layer._mapShapes[index].bottom;
                            var bound = { x: left, y: top, width: right - left, height: bottom - top };
                            this._zoomOnSelection(bound);
                            break;
                        }
                    }
                }
                this.ispanning = false;
            }
            var element = layer._tooltipElement;
            if (element != null) {
                bbdesigner$(element).delay(200).queue(function (next) {
                    bbdesigner$(this).css('display', 'none');
                    next();

                });
            }
        },

        _markerPressed: function (event) {
            this._trigger("markerSelected", { originalEvent: event.data });
        },

        _polyMouseDown: function (event) {

            var layer = event.data.Param2;
            var position;
            if (event.type == "mousedown")
                position = { x: event.pageX, y: event.pageY };
            else if (event.type == "touchstart")
                position = { x: event.originalEvent.changedTouches[0].pageX, y: event.originalEvent.changedTouches[0].pageY };
            else if (event.type == "MSPointerDown")
                position = { x: event.originalEvent.pageX, y: event.originalEvent.pageY };

            if (event.data.Param1.hasOwnProperty("data") && layer.showTooltip) {
                var element = layer._tooltipElement;
                var template = layer.tooltipTemplate;
                var parentSize = bbdesigner$(this._mapContainer).offset();
                if (parentSize == null)
                    parentSize = { left: 0, width: 0, height: 0 };
                var tooltipSize = layer._tooltipSize;
                var tooltipdisplayheight = this._height;
                var tooltipdisplaywidth = this._width;

                if (element != null && template != null) {
                    bbdesigner$(element).css({ "display": "block" });
                    var htmlString = bbdesigner$("#" + template).render(event.data.Param1["data"]);
                    bbdesigner$(element).html(htmlString);
                    var height = element[0] != null ? element[0].clientHeight : element.clientHeight;
                    var width = element[0] != null ? element[0].clientWidth : element.clientWidth;
                    tooltipSize = { height: height, width: width };



                    var xPos = position.x - bbdesigner$(this._mapContainer).offset().left;
                    var yPos = position.y - bbdesigner$(this._mapContainer).offset().top;

                    var xnewPos = position.x;
                    var ynewPos = position.y;

                    if (tooltipSize.width + xPos >= tooltipdisplaywidth) {
                        if (xnewPos - tooltipSize.width > parentSize.left)
                            xnewPos = ((parentSize.left + tooltipdisplaywidth) - (tooltipdisplaywidth - xPos)) - tooltipSize.width;
                        else
                            xnewPos -= (tooltipSize.width + xPos - tooltipdisplaywidth);
                    }
                    if (tooltipSize.height > tooltipdisplayheight) {
                        if (tooltipdisplayheight + tooltipSize.height > this._height + yPos)
                            ynewPos -= parentSize.top + 10;
                    }
                    else if (tooltipSize.height + yPos >= tooltipdisplayheight) {
                        ynewPos -= (tooltipSize.height + yPos - tooltipdisplayheight);
                    }

                    bbdesigner$(element).css({ "left": xnewPos + 10, "top": ynewPos + 10 });
                }
            }
        },

        _polyClickFunction: function (event) {

            var ctrlkey = event.ctrlKey;
            var layer = event.data.Param2;
            var map = this;
            var shape = event.data.Param3, rightClickItemValue = [], selectedShapeValue = [];
            var legend = bbdesigner$.grep(layer._smartLabels, function (obj) { return obj.shape == shape });
            map._isPolygonSelected = true;
            if (event.which == 3) {
                if (map.model.enableRightClick) {
                    event.preventDefault();
                    rightClickItemValue.push(event.data.Param1);
                    if(!BoldBIDashboard.util.isNullOrUndefined(rightClickItemValue[0].data))
                        map._trigger("shapeSelected", { originalEvent: rightClickItemValue, selectedItemValues: layer.selectedItems, rightClick: true });
                }
                return;
            }
            if(!BoldBIDashboard.util.isNullOrUndefined(event.data.Param1.data)){
				    selectedShapeValue.push(event.data.Param1);
					var eventArgs = { originalEvent: selectedShapeValue, rightClick: false };
					map._trigger("shapeSelected", eventArgs);
			}
			var args = BoldBIDashboard.util.isNullOrUndefined(eventArgs) ? false : eventArgs.cancel; 
            if (layer.enableSelection && !args) {

                if (ctrlkey && layer.selectionMode == BoldBIDashboard.datavisualization.Map.SelectionMode.Multiple) {
                    if (legend != null && legend.length > 0) {
                        if (bbdesigner$.inArray(legend[0].legend, layer._prevSelectedLegends) == -1) {
                            legend[0].legend.setAttribute("class", "e-mapSelectedShape mapShape");
                            legend[0].legend.css("background-color", layer.shapeSettings.selectionColor);
                            layer._prevSelectedLegends.push(legend[0].legend);
                        }
                        else {
                            var index = layer._prevSelectedLegends.indexOf(legend[0].legend);
                            legend[0].legend[0].setAttribute("class", "mapShape");
                            legend[0].legend.css("background-color", legend[0].legend[0].getAttribute("nodeValue"));
                            layer._prevSelectedLegends.splice(index, 1);
                        }
                    }
                    if (bbdesigner$.inArray(shape, layer._prevSelectedShapes) == -1) {
                        if(!shape.removeSelectionCSS)
                            shape.setAttribute("class", "e-mapSelectedShape mapShape");
                        if (_isSVG) {
                            shape.setAttribute("fill", layer.shapeSettings.selectionColor);
                            shape.setAttribute("stroke", layer.shapeSettings.selectionStroke);
                            shape.setAttribute("stroke-width", (layer.shapeSettings.selectionStrokeWidth / map._scale));
                        }
                        else {
                            shape.fillcolor = layer.shapeSettings.selectionColor;
                            shape.strokecolor = layer.shapeSettings.selectionStroke
                            shape.strokeweight = layer.shapeSettings.selectionStrokeWidth / map._scale;
                        }
                        layer._prevSelectedShapes.push(shape);
                        layer.selectedItems.push(event.data.Param1);
                    }
                    else {
                        shape.setAttribute("class", "mapShape");
                        shape.setAttribute("fill", shape.getAttribute("nodeValue"));
                        shape.setAttribute("stroke", layer.shapeSettings.stroke);
                        shape.setAttribute("stroke-width", layer.shapeSettings.strokeThickness / this._scale);
                        var index = layer._prevSelectedShapes.indexOf(shape);
                        layer._prevSelectedShapes.splice(index, 1);
                        layer.selectedItems.splice(index, 1);
                    }
                }

                else {
                    for (var i = 0; i < layer._prevSelectedLegends.length; i++) {
                        layer._prevSelectedLegends[i][0].setAttribute("class", "mapShape");
                        layer._prevSelectedLegends[i].css("background-color", layer._prevSelectedLegends[i][0].getAttribute("nodeValue"));
                    }
                    if ((legend != null && legend.length > 0)) {
                        legend[0].legend.setAttribute("class", "e-mapSelectedShape mapShape");
                        legend[0].legend.css("background-color", layer.shapeSettings.selectionColor);
                        layer._prevSelectedLegends.push(legend[0].legend);
                    }

                    for (var i = 0; i < layer._prevSelectedShapes.length; i++) {
                        layer._prevSelectedShapes[i].setAttribute("class", "mapShape");
                        if (_isSVG) {
                            layer._prevSelectedShapes[i].setAttribute("fill", layer._prevSelectedShapes[i].getAttribute("nodeValue"));
                            layer._prevSelectedShapes[i].setAttribute("stroke", layer.shapeSettings.stroke);
                            layer._prevSelectedShapes[i].setAttribute("stroke-width", layer.shapeSettings.strokeThickness / this._scale);
                        }
                        else {
                            layer.fillcolor = layer._prevSelectedShapes[i].getAttribute("nodeValue");
                            layer.strokecolor = layer.shapeSettings.stroke
                            layer.strokeweight = layer.shapeSettings.strokeThickness / this._scale;
                        }
                    }
                    if (!this._isPinching && (bbdesigner$.inArray(shape, layer._prevSelectedShapes) == -1)) {
                        if(!shape.removeSelectionCSS)
                            shape.setAttribute("class", "e-mapSelectedShape mapShape");
                        layer._prevSelectedShapes = [];
                        layer.selectedItems = [];
                        if (_isSVG) {
                            shape.setAttribute("fill", layer.shapeSettings.selectionColor);
                            shape.setAttribute("stroke", layer.shapeSettings.selectionStroke);
                            shape.setAttribute("stroke-width", (layer.shapeSettings.selectionStrokeWidth / map._scale));
                        }
                        else {
                            shape.fillcolor = layer.shapeSettings.selectionColor;
                            shape.strokecolor = layer.shapeSettings.selectionStroke;
                            shape.strokeweight = layer.shapeSettings.selectionStrokeWidth / map._scale;
                        }

                        layer._prevSelectedShapes.push(shape);
                        layer.selectedItems.push(event.data.Param1);
                    }
                    else {
                        layer._prevSelectedShapes = [];
                        layer.selectedItems = [];
                    }


                    var legendSettings = layer.legendSettings, mapshape;
                    if (legendSettings.mode == "interactive" && layer.shapeSettings.colorMappings != null && layer.shapeSettings.colorMappings.rangeColorMapping != null
                    && !layer.shapeSettings.autoFill && (legendSettings.showLegend)) {
                        for (var i = 0; i < layer._mapShapes.length; i++) {
                            mapshape = layer._mapShapes[i].shape;
                            if (mapshape == shape) {
                                var mappings = null;
                                if (layer.shapeSettings.colorMappings.rangeColorMapping != undefined) {
                                    mappings = layer.shapeSettings.colorMappings.rangeColorMapping;
                                }
                                var _legendwidth = legendSettings.width;
                                if (legendSettings.width == undefined)
                                    _legendwidth = 150;

                                var rectwidth = (_legendwidth / mappings.length) / 10;
                                if (layer._mapShapes[i].legendrect != null) {
                                    var rectPosition = layer._mapShapes[i].legendrect.marginLeft;
                                    bbdesigner$(layer._interactiveArrow).css({ "margin-left": rectPosition + Math.ceil(rectwidth) - layer._interactiveArrow.width() / 2, "display": "block" });
                                    break;
                                }
                            }
                        }
                    }

                }
            }
        },

        _updateSelection: function (layer, shape, data) {
            if (layer.enableSelection) {
                if (layer.selectionMode != BoldBIDashboard.datavisualization.Map.SelectionMode.Multiple) {
                    layer._prevSelectedShapes.pop();
                    layer.selectedItems.pop();
                }
                if (bbdesigner$.inArray(shape, layer._prevSelectedShapes) == -1) {
                    layer._prevSelectedShapes.push(shape);
                }
            }
        },

        _zoomOnSelection: function (bounds) {
            var layerScale;
            if (!_isSVG) {
                bounds.x = (bounds.x - (this._baseTranslatePoint.x / 2)) - (bounds.width / 2);
                bounds.y = (bounds.y - (this._baseTranslatePoint.y / 2)) - (bounds.height / 2);
            }
            var boundwidth = bounds.width;
            var boundHeight = bounds.height;
            if ((this._width - 100) / (this._height - 100) > boundwidth / boundHeight) {
                layerScale = (this._height - 100) / boundHeight;
            } else {
                layerScale = (this._width - 100) / boundwidth;
            }
            this._prevScale = this._scale;
            this._scale = layerScale;
            this._prevPoint = { x: this._translatePoint.x, y: this._translatePoint.y };
            this.zoomLevel(this._scale - this._baseScale + 1);
            var level = this.zoomLevel();
            if (!(level > this.minZoom() && level < this.maxZoom())) {
                this.zoomLevel(level > (((this.maxZoom() - this.minZoom()) / 2) + this.minZoom()) ? this.maxZoom() : this.minZoom());
                this._scale = this.zoomLevel() + this._baseScale - 1;
            }
            var leftMargin = (this._width / 2) - ((boundwidth * this._scale) / 2);
            var leftPos = leftMargin / this._scale;
            var topMargin = (this._height / 2) - ((boundHeight * this._scale) / 2);
            var topPos = topMargin / this._scale;
            this._translatePoint.x = -bounds.x + leftPos;
            this._translatePoint.y = -bounds.y + topPos;
            if (this.enableAnimation() && !this._isTileMap) {
                this._animate(1200);
            }
            else {
                this._applyTransform(this._scale, this._translatePoint);
                this._updateSliderValue();
            }
        },

        _polyMoveFunction: function (event) {
            var map = event.data.Param1;
            if (this.model != null) {
                var baseLayer = this.model.layers[this.baseMapIndex()];
                var element = map._tooltipElement;
                var template = map.tooltipTemplate;
                var tooltipObject = event.data.Param2;
                var tooltipSize = map._tooltipSize;
                var parentSize = bbdesigner$(this._mapContainer).offset();
                var mapContainer = document.getElementById(this._id);
                var scale = mapContainer.getBoundingClientRect().width / mapContainer.offsetWidth;
                if (parentSize == null)
                    parentSize = { left: 0, top: 0, width: 0, height: 0 };

                if (baseLayer.legendSettings.dockOnMap && baseLayer.legendSettings.dockPosition == "right") {
                    width = this._width + baseLayer.legendSettings.width + 20 + (baseLayer.legendSettings.leftLabel.length * 10) + (baseLayer.legendSettings.rightLabel.length * 10);
                }
                else {
                    width = this._width;
                }
                var tooltipdisplayheight = this._height;
                var tooltipdisplaywidth = width;

                var xPos = event.pageX - parentSize.left;
                var yPos = event.pageY - parentSize.top;

                var xnewPos = event.pageX;
                var ynewPos = event.pageY;

                if (element != null && template != null && tooltipObject.hasOwnProperty("data") && event.data.Param1.showTooltip) {
                    bbdesigner$(element).css({ "display": "block" });
                    var htmlString = bbdesigner$("#" + template).render(tooltipObject["data"]);
                    bbdesigner$(element).html(htmlString);
                    var height = element[0] != null ? element[0].clientHeight : element.clientHeight;
                    var width = element[0] != null ? element[0].clientWidth : element.clientWidth;
                    tooltipSize = { height: height, width: width };

                    if (tooltipSize.width + xPos >= (scale * tooltipdisplaywidth) && !this.model.enableRTL) {
                        if (xnewPos - tooltipSize.width > parentSize.left)
                            xnewPos = ((parentSize.left + tooltipdisplaywidth) - (tooltipdisplaywidth - xPos)) - tooltipSize.width;
                        else
                            xnewPos -= (tooltipSize.width + xPos - tooltipdisplaywidth);
                    }
                    if (tooltipSize.height > tooltipdisplayheight) {
                        if (tooltipdisplayheight + tooltipSize.height > this._height + yPos)
                            ynewPos -= parentSize.top + 10;
                    }
                    else if (tooltipSize.height + yPos >= (tooltipdisplayheight * scale)) {
                        ynewPos -= (tooltipSize.height + yPos - tooltipdisplayheight);
                    }
                    bbdesigner$(element).css({ "left": !this.model.enableRTL ? xnewPos + 10 : !(xPos - tooltipSize.width < 0) ? xnewPos - width : xnewPos + 10, "top": ynewPos });
                }
            }
        },

        _polyLeaveFunction: function (event) {
            var layer = event.data.Param1;
            var map = event.data.map;
            var shape = event.data.Param2.shape;
            var element = layer._tooltipElement;
            var selectedshape = layer._prevSelectedShapes;
            if (selectedshape.length > 0) {
                shape.setAttribute("class", "mapShape");
                for (i = 0; i < selectedshape.length; i++) {
                    if(!selectedshape[i].removeSelectionCSS)
                        selectedshape[i].setAttribute("class", "e-mapSelectedShape mapShape");
                }
            }
            else {
                shape.setAttribute("class", "mapShape");
            }
            if (element != null) {
                bbdesigner$(element).css("display", "none");
            }
            if (layer.legendSettings != null && layer.legendSettings.mode == BoldBIDashboard.datavisualization.Map.LegendMode.Interactive && layer._interactiveArrow != null)
                bbdesigner$(layer._interactiveArrow).css("display", "none");
            layer._clearShapeWidth(map._scale);
            map._trigger("mouseleave", { originalEvent: event.data.Param2 });
        },

        _wireEvents: function () {
            bbdesigner$(this._mapContainer).off();
            var matched = bbdesigner$.uaMatch(navigator.userAgent);
            var browser = matched.browser.toLowerCase();
            this._on(bbdesigner$(this._mapContainer), BoldBIDashboard.eventType.mouseDown, this._mouseButtonDown);
            bbdesigner$(document).keydown({ className: "home", map: this }, this._keyboardKeysPressed);
            this._on(bbdesigner$(this._mapContainer), BoldBIDashboard.eventType.mouseMove, this._mouseMove);
            this._on(bbdesigner$(document), BoldBIDashboard.eventType.mouseUp, this._mouseUp);
            var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
            if (isIE11)
                browser = "msie";
            if (window.navigator.msPointerEnabled) {
                this._on(bbdesigner$(this._mapContainer), "MSPointerUp", this._mouseButtonUp);
                bbdesigner$(this._mapContainer).css('-ms-touch-action', 'none');
            }
            else {
                this._on(bbdesigner$(this._mapContainer), "mouseup", this._mouseButtonUp);
            }
            var map = this;
            this._browser = browser;
            if (browser != "mozilla") {
                this._on(bbdesigner$(this._mapContainer), "mousewheel", this._mouseWheel);
            }
            else {
                var elem = this._svgDocument;
                if (elem.addEventListener) {
                    // Mouse Scrolling event for firefox
                    elem.addEventListener("DOMMouseScroll", MouseWheel, false);
                }

            }
            function MouseWheel(event) {
                if (map.enableAnimation()) {
                    bbdesigner$(map._rootgroup).stop(true, false);
                }
                event.preventDefault(event);
                map._zooming(-40 * event.detail, event);
            }
            if (!BoldBIDashboard.isTouchDevice()) {
                this._on(bbdesigner$(this._mapContainer), "click", this._mapClick);
                this._on(bbdesigner$(this._mapContainer), "dblclick", this._doubleClick);
            }
            else
                this._on(bbdesigner$(this._mapContainer), "touchend", this._mapClick);

            if (this.model.enableResize || this.model.isResponsive) {
                if (!BoldBIDashboard.isTouchDevice())
                    this._on(bbdesigner$(window), "resize", this._mapResize);
                else
                    this._on(bbdesigner$(window), "orientationchange", this._mapResize);
            }
        },

        clip: function (n, minValue, maxValue) {
            return Math.min(Math.max(n, minValue), maxValue);
        },

        pointToLatLong: function (pointX, pointY) {
            var map = this;
            var factor = map._getFactor();
            var translateX = (pointX / map._scale) - (map._translatePoint.x);
            var translateY = (pointY / map._scale) - (map._translatePoint.y);
            var mapSize = Math.min(map._height, map._width) * factor;
            var transformX = (map.clip(translateX, 0, mapSize - 1) / mapSize) - 0.5;
            var transformy = 0.5 - (map.clip(translateY, 0, mapSize - 1) / mapSize);

            latitude = 90 - 360 * Math.atan(Math.exp(-transformy * 2 * Math.PI)) / Math.PI;
            longitude = 360 * transformX;
            return { latitude: latitude, longitude: longitude };

        },

        _mapResize: function (event) {
            event.preventDefault();
            event.stopPropagation();
            var oldSize = { width: this._width, height: this._height };
            var oldTranslatePoint = this._translatePoint;
            var map = this;
            if (this.resizeTO) clearTimeout(this.resizeTO);
            this.resizeTO = setTimeout(function () {
                map.refresh();
                if (!map._isTileMap) {
                    map._translatePoint.x = (oldTranslatePoint.x / oldSize.width) * map._width;
                    map._translatePoint.y = (oldTranslatePoint.y / oldSize.height) * map._height;
                    map._applyTransform(map._scale, map._translatePoint);
                    map._refrshLayers();
                }
            }, 500);
        },

        _isDevice: function () {
            return (/mobile|tablet|android|kindle/i.test(navigator.userAgent.toLowerCase()));
        },

        _unWireEvents: function () {
            var matched = bbdesigner$.uaMatch(navigator.userAgent);
            var browser = matched.browser.toLowerCase();
            this._on(bbdesigner$(document), BoldBIDashboard.eventType.mouseUp, this._mouseUp);
            var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
            if (isIE11)
                browser = "msie";
            if (browser != "mozilla") {
                this._off(bbdesigner$(this._mapContainer), "mousewheel", this._mouseWheel);
            }
            if (window.navigator.msPointerEnabled) {
                this._off(bbdesigner$(this._mapContainer), "MSPointerDown", this._mouseButtonDown);
                this._off(bbdesigner$(this._mapContainer), "MSPointerMove", this._mouseMove);
                this._off(bbdesigner$(this._mapContainer), "MSPointerUp", this._mouseButtonUp);
                bbdesigner$(this._mapContainer).css('-ms-touch-action', 'none');
            }
            else if (browser == "webkit" || browser == "chrome" || browser == "mozilla") {
                this._off(bbdesigner$(this._mapContainer), "mousedown", this._mouseButtonDown);
                this._off(bbdesigner$(this._mapContainer), "mousemove", this._mouseMove);
                this._off(bbdesigner$(this._mapContainer), "mouseup", this._mouseButtonUp);

            }
            else {
                this._off(bbdesigner$(this._mapContainer), "mousedown", this._mouseButtonDown);
                this._off(bbdesigner$(this._mapContainer), "mousemove", this._mouseMove);
                this._off(bbdesigner$(this._mapContainer), "mouseup", this._mouseButtonUp);

            }
            this._off(bbdesigner$(this._mapContainer), "dblclick", this._doubleClick);
            this._off(bbdesigner$(this._mapContainer), "click", this._mapClick);
        },

        navigateTo: function (latitude, longitude, level, isAnimate) {
            if (isAnimate == undefined) {
                isAnimate = this.enableAnimation();
            }
            level = parseFloat(level);
            if (level == undefined) level = this.zoomLevel();
            if (level > this.minZoom() && level < this.maxZoom()) {
                this.zoomLevel(level);
            }
            else {
                this.zoomLevel(level > (((this.maxZoom() - this.minZoom()) / 2) + this.minZoom()) ? this.maxZoom() : this.minZoom());

            }
            var factor = this._getFactor();
            var translatePoint = this._convertTileLatLongtoPointForShapes(latitude, longitude, this._mapBounds, factor);
            this._prevPoint = { x: this._translatePoint.x, y: this._translatePoint.y };
            this._prevScale = this._scale;
            this._scale = this._baseScale + ((level - 1) * this.zoomFactor());
            var leftPosition = ((this._containerWidth + this._baseTranslatePoint.x) / 2) / this._scale;
            var topPosition = ((this._containerHeight + this._baseTranslatePoint.y) / 2) / this._scale;
            this._translatePoint.x = -translatePoint.x + leftPosition;
            this._translatePoint.y = -translatePoint.y + topPosition;
            if (isAnimate && !this._isTileMap) {
                this._animate(1200);
            }
            else {
                this._applyTransform(this._scale, this._translatePoint);
            }
            this._updateSliderValue();
            this._refrshLayers();
        },

        selectShape: function (obj, layer, isZoom) {
            if (obj != null) {
                if (layer == null) {
                    layer = this.model.layers[this.baseMapIndex()];
                }
                for (var i = 0; i < layer._mapShapes.length; i++) {
                    var data = layer._mapShapes[i].data;
                    var shape = layer._mapShapes[i].shape;
                    if (data != null && obj == this._reflection(data, layer.shapeSettings.valuePath)) {

                        if (layer._prevSelectedShapes.length != 0 && layer.selectionMode != BoldBIDashboard.datavisualization.Map.SelectionMode.Multiple) {
                            for (var i = 0; i < layer._prevSelectedShapes.length; i++) {
                                if (_isSVG) {
                                    layer._prevSelectedShapes[i].setAttribute("fill", layer._prevSelectedShapes[i].getAttribute("nodeValue"));
                                    layer._prevSelectedShapes[i].setAttribute("stroke", layer.shapeSettings.stroke);
                                    layer._prevSelectedShapes[i].setAttribute("stroke-width", layer.shapeSettings.strokeThickness / this._scale);
                                } else {
                                    layer._prevSelectedShapes[i].fillcolor = layer._prevSelectedShapes[i].style.behavior;
                                    layer._prevSelectedShapes[i].strokecolor = layer.shapeSettings.stroke;
                                    layer._prevSelectedShapes[i].strokeweight = layer.shapeSettings.strokeThickness / this._scale;
                                }
                            }
                        }
                        if (layer.enableSelection) {
                            if (_isSVG) {
                                if (layer.shapeSettings.selectionColor != "none") {
                                    shape.setAttribute("fill", layer.shapeSettings.selectionColor);
                                }
                                shape.setAttribute("stroke", layer.shapeSettings.selectionStroke);
                                shape.setAttribute("stroke-width", (layer.shapeSettings.selectionStrokeWidth / this._scale));
                            } else {
                                if (layer.shapeSettings.selectionColor != "none") {
                                    shape.fillcolor = layer.shapeSettings.selectionColor;
                                }
                                shape.strokecolor = layer.shapeSettings.selectionStroke;
                                shape.strokeweight = layer.shapeSettings.selectionStrokeWidth / this._scale;
                            }
                            this._updateSelection(layer, shape, obj);
                            if (!layer._contains(layer.selectedItems, layer._mapShapes[i]))
                                layer.selectedItems.push(layer._mapShapes[i]);
                            this._trigger("shapeSelected", { originalEvent: layer.selectedItems, rightClick: false });
                        }
                        if (isZoom && this.enableZoomOnSelection()) {
                            this._zoomOnSelection(shape.getBBox());
                        }
                        i = layer._mapShapes.length;
                    }
                }
            }

        },

        _getIntersectedElements: function (evt, shapes) {
            evt.width += 5;
            evt.height += 5;
            if (_isSVG && this._browser != 'mozilla' && this._browser != 'webkit') {
                var rpos = this._svgDocument.createSVGRect();
                rpos.x = evt.left;
                rpos.y = evt.top;
                rpos.width = evt.width;
                rpos.height = evt.height;
                return this._svgDocument.getIntersectionList(rpos, null);
            }
            else {
                var elements = [];
                var parentSize = bbdesigner$(this._mapContainer).offset();
                var parentLeft = parentSize.left;
                var parentTop = parentSize.top;
                for (var i = 0; i < shapes.length; i++) {
                    var shape = shapes[i].shape;
                    var bounds = shape.getBoundingClientRect();
                    var leftPos = bbdesigner$(shape).offset().left - parentLeft;
                    var topPos = bbdesigner$(shape).offset().top - parentTop;
                    if (this._isIntersect(evt, { left: leftPos, top: topPos, height: (bounds.bottom - bounds.top), width: (bounds.right - bounds.left) })) {
                        elements.push(shape);
                        return elements;
                    }
                }
                return elements;
            }


        },

        _isIntersect: function (rect1, rect2) {

            if (rect1.left >= (rect2.left + rect2.width) || rect1.left + rect1.width <= rect2.left ||
                rect1.top >= rect2.top + rect2.height || rect1.top + rect1.height <= rect2.top) {
                return false;
            }
            return true;

        },

        pan: function (direction) {
            var map = this;
            var Xdiff = 0;
            var Ydiff = 0;
            if (this.zoomLevel() != 1) {
                switch (direction) {

                    case 'right':
                        {
                            Xdiff = this._width / 7;
                            Ydiff = 0;
                            break;
                        }
                    case 'top':
                        {
                            Xdiff = 0;
                            Ydiff = -(this._height / 7);
                            break;
                        } n
                    case 'left':
                        {
                            Xdiff = -(this._width / 7);
                            Ydiff = 0;
                            break;
                        }
                    case 'bottom':
                        {
                            Xdiff = 0;
                            Ydiff = this._height / 7;
                            break;
                        }
                }
                if (map.enablePan()) {
                    if (this._isTileMap) {
                        var curtileX = this._tileTranslatePoint.x - Xdiff / map._scale;
                        var curtileY = this._tileTranslatePoint.y - Ydiff / map._scale;
                        this._tileTranslatePoint.x = curtileX;
                        this._tileTranslatePoint.y = curtileY;
                        this._generateTiles(this.zoomLevel());
                    }
                    var curX = map._translatePoint.x - Xdiff / map._scale;
                    map._prevScale = map._scale;
                    var curY = map._translatePoint.y - Ydiff / map._scale;
                    map._prevPoint = { x: this._translatePoint.x, y: this._translatePoint.y };
                    this._translatePoint.x = curX;
                    this._translatePoint.y = curY;
                    if (map.enableAnimation() && !this._isTileMap) {
                        map._animate(600);
                    }
                    else {
                        map._applyTransform(map._scale, map._translatePoint);
                    }
                    map._refrshLayers();
                }
            }

        },

        zoom: function (level, isAnimate) {
            var map = this;
            var prevLevel = map.zoomLevel();
            if (level <= this.maxZoom() && level >= this.minZoom()) {
                if (this._isTileMap) {
                    this._tileZoom(map.zoomLevel(), level, { x: this._width / 2, y: this._height / 2 });
                    var prevLevel = map.zoomLevel();
                    map.zoomLevel(level);
                    this._generateTiles(this.zoomLevel());
                    map._translatePoint.x = (map._tileTranslatePoint.x - (0.5 * Math.pow(2, prevLevel))) / (Math.pow(2, prevLevel));
                    map._translatePoint.y = (map._tileTranslatePoint.y - (0.5 * Math.pow(2, prevLevel))) / (Math.pow(2, prevLevel));
                    map._scale = (Math.pow(2, prevLevel));
                }
                else {
                    var fac = level;
                    map._prevPoint = { x: map._translatePoint.x, y: map._translatePoint.y };
                    map._prevScale = map._scale;
                    map._translatePoint.x -= (map._width / map._scale - map._width / fac) / 2;
                    map._translatePoint.y -= (map._height / map._scale - map._height / fac) / 2;
                    map._scale = fac;
                    map.zoomLevel(level);

                    if (map.enableAnimation() && isAnimate || isAnimate == undefined) {
                        map._animate(600);
                    }
                }
                if (!map.enableAnimation() || !isAnimate) {
                    map._applyTransform(map._scale, map._translatePoint);
                    map._refrshLayers();
                    map._resizeShape();
                }
                map._updateSliderValue();

            }
            else if (level <= this.minZoom()) {
                this.zoomLevel(this.minZoom());
                this.zoom(this.zoomLevel());
            }
            else if (level >= this.maxZoom()) {
                this.zoomLevel(this.maxZoom());
                this.zoom(this.zoomLevel());
            }
            if (prevLevel < level) {
                map._trigger("zoomedIn", { originalEvent: null, zoomLevel: map.zoomLevel() });
            }
            else if (prevLevel > level) {
                map._trigger("zoomedOut", { originalEvent: null, zoomLevel: map.zoomLevel() });
            }

        },

        refresh: function () {
            this._trigger("onLoad");
            this._unWireEvents();
			bbdesigner$('#' + this._id).find('.LegendDiv').parent().children().empty();
			
            bbdesigner$(this._svgDocument).empty();
            if (this._svgDocument != null) {
                this._svgDocument = null;
            }
            bbdesigner$(this._mapContainer).empty();
            this._scale = 1;
            this._margintop = 0;
            this._marginleft = 0;
            this._previosTranslatePoint = this._translatePoint;
            this._translatePoint = { x: 0, y: 0 };
            this._height = this._mapContainer.height();
            this._width = this._mapContainer.width();
            if (this._height == 0) {
                this._height = this._mapContainer[0].parentElement.clientHeight != 0 ? this._mapContainer[0].parentElement.clientHeight : bbdesigner$(document).height();
            }
            if (this._width == 0) {
                this._width = this._mapContainer[0].parentElement.clientWidth != 0 ? this._mapContainer[0].parentElement.clientWidth : bbdesigner$(document).width();
            }
            if (this.baseMapIndex() >= this.model.layers.length) {
                this.baseMapIndex(0);
            }
            var baseLayer = this.model.layers[this.baseMapIndex()];
            if (baseLayer.legendSettings != null && baseLayer.legendSettings.showLegend && ((baseLayer.shapeSettings.colorMappings != null || baseLayer.shapeSettings.colorPath != null) || (baseLayer.bubbleSettings.colorMappings != null || baseLayer.bubbleSettings.colorPath != null))) {
                baseLayer._sizeCalculation(this);
            }
            this._generatePath();
            if (this._groupSize != null) {

                if (this._isMapCoordinates) {
                    this._containerHeight = this._groupSize.maxY - this._groupSize.minY;
                    this._containerWidth = this._groupSize.maxX - this._groupSize.minX;
                    this._groupBorder = { x: this._groupSize.minX, y: this._groupSize.minY };
                }
                else {
                    var factor = this._getFactor();
                    this._containerHeight = Math.abs((this._groupSize.maxY - this._groupSize.minY) * factor);
                    this._containerWidth = Math.abs((this._groupSize.maxX - this._groupSize.minX) * factor);
                }
            }
            this._resizingContainer();
            this._renderMapElements();

            if ((baseLayer.legendSettings != null && baseLayer.legendSettings.showLegend) && ((baseLayer.shapeSettings.colorMappings != null || baseLayer.shapeSettings.colorPath != null) || ( baseLayer.bubbleSettings.colorMappings != null || baseLayer.bubbleSettings.colorPath != null))) {

                this._renderLegend();

            }
            if (_isSVG) {
                bbdesigner$(this._svgDocument).css({ height: this._height, width: this._width, "margin-top": this._margintop, "margin-left": this._marginleft });

            }
            if (this.model.enableLayerChangeAnimation) {
                bbdesigner$(this._mapContainer).animate({ opacity: 1 }, 500);
            }
            if (this.model.centerPosition != null && !this._isTileMap) {
                this.navigateTo(this.model.centerPosition[0], this.model.centerPosition[1], this.zoomLevel(), false);
            }
            if (this._legendContainer != null) {
                this._legendContainer.css({

                    "height": this._legendSize.height


                })
            }
            this._trigger("refreshed");
			this._trigger("onRenderComplete");
        },

        _updateSliderValue: function (isAnimate) {
            var slider = this._sliderControl;
            if (isAnimate == undefined) isAnimate = this.enableAnimation();
            if (slider != null) {
                var obj = slider.data("BoldBIDashboardSlider");
                obj.option("value", this.zoomLevel());
            }
        },

        _createDivElement: function (parent, child, base, classname) {
            var parentElement = parent;
            var childElement = child;
            childElement.appendTo(parentElement);
            parentElement.appendTo(base);
            this._on(childElement, BoldBIDashboard.eventType.mouseDown, { className: classname, map: this }, this._navigationControlPressed);

        },

        _navigationControlPressed: function (event) {

            event.stopPropagation();
            this._isNavigationPressed = true;
            var map = event.data.map;
            var isAnimate = map.enableAnimation();
            if (event.data.className == "zoomIn") {
                map.zoom(map.zoomLevel() + map.zoomFactor(), true);
                if (!isAnimate) {
                    map._updateSliderValue();
                }
                map._refrshLayers();
            }
            else if (event.data.className == "zoomOut") {
                map.zoom(map.zoomLevel() - map.zoomFactor(), true);
                if (!isAnimate) {
                    map._updateSliderValue();
                }
            }
            else if (event.data.className == "panLeft") {
                map.pan("left");
            }
            else if (event.data.className == "panRight") {
                map.pan("right");
            }
            else if (event.data.className == "panTop") {
                map.pan("top");
            }
            else if (event.data.className == "panBottom") {
                map.pan("bottom");
            }
            else if (event.data.className == "home") {
                map.zoom(1, true);
                if (!isAnimate) {
                    map._updateSliderValue();
                }
            }

        },

        _keyboardKeysPressed: function (event) {
            this._iskeyboardKeysPressed = true;
            var map = event.data.map;
            var isAnimate = map.enableAnimation();
            if (event.ctrlKey && event.keyCode == 38) {
                map._zoomingIn(map._width / 2, map._height / 2, event, isAnimate);
            }
            else if (event.ctrlKey && event.keyCode == 40) {
                map._zoomingOut(map._width / 2, map._height / 2, event, isAnimate);
            }
            else if (event.keyCode == 37) {
                map.pan("left");
            }
            else if (event.keyCode == 39) {
                map.pan("right");
            }
            else if (event.keyCode == 38) {
                map.pan("top");
            }
            else if (event.keyCode == 40) {
                map.pan("bottom");
            }
        },

        refreshNavigationControl: function (navigation) {

            var baseLayer = this.model.layers[this.baseMapIndex()];
            var prevNav = this._mapContainer.find("#ejNavigation");
            if (prevNav.length > 0) {
                this._mapContainer[0].removeChild(prevNav[0]);
            }
            if (this.model.navigationControl != null && this.enableNavigation()) {
                if (navigation == undefined) {
                    navigation = this.model.navigationControl;
                }
                var navigationOrientation = BoldBIDashboard.Orientation.Vertical;
                var controlSize;
                var navigationHeight = 120;
                var navigationWidth = 12;
                controlSize = { width: 90, height: 320 };
                var navigationControl = bbdesigner$("<div id='ejNavigation' class='e-map-navigation e-orientation-vert'/>");
                if (this.model.navigationControl.content == null) {
                    var sliderDiv = bbdesigner$("<div style='height:120px;width:10px;margin-top:-197px;margin-left: 34px;' />");
                }
                if (navigation.orientation == 'horizontal') {
                    navigationOrientation = BoldBIDashboard.Orientation.Horizontal;
                    navigationHeight = 12;
                    navigationWidth = 120;
                    controlSize = { width: 320, height: 90 };
                    navigationControl = bbdesigner$("<div id='ejNavigation' class='e-map-navigation e-orientation-horz' />");
                    if (this.model.navigationControl.content == null) {
                        sliderDiv = bbdesigner$("<div style='height:10px;width:120px;margin-top:-18px' />");
                    }
                }
                if (this.model.navigationControl.content == null) {
                    var baseDiv = bbdesigner$("<div class='e-panContainer'/>");
                    var isHor = navigationOrientation == 'horizontal' ? 'Horz' : 'Vert';
                    if (navigation.orientation == 'horizontal') {
                        var zoominOutDiv = bbdesigner$("<div style='margin-left: 94px;' />");
                        var slidercontrol = bbdesigner$("<div style='margin-left: 137px;'/>");
                    }
                    else {
                        var zoominOutDiv = bbdesigner$("<div />");
                        var slidercontrol = bbdesigner$("<div style='margin-top: 34px;'/>");
                    }
                    baseDiv.appendTo(navigationControl);
                    zoominOutDiv.appendTo(navigationControl);
                    sliderDiv.appendTo(slidercontrol);
                    slidercontrol.appendTo(navigationControl);
                    this._sliderControl = sliderDiv;
                    var navPos = { x: 0, y: 0 };
                    if (navigation.dockPosition == null || navigation.dockPosition == BoldBIDashboard.datavisualization.Map.Position.None) {
                        navPos.x = (this._width * navigation.absolutePosition.x) / 100;
                        navPos.y = (this._height * navigation.absolutePosition.y) / 100;
                    } else {
                        navPos = this._getPosition(navigation.dockPosition, controlSize);
                    }
                    navigationControl.css({ "margin-left": navPos.x + "px", "margin-top": navPos.y + "px" });
                }
                var map = this;
                var changeZoom = this._height * 0.0025;
                if (this.model.navigationControl.content == null) {
                    if (this._browser != 'chrome' && this._browser != 'msie') {
                        navigationStyle = bbdesigner$('<style> .e-map-navigation {width: 90px;height: 320px;position:absolute;z-index:2;zoom:' + changeZoom + ';}</style>');
                    }
                    else {
                        navigationStyle = bbdesigner$('<style> .e-map-navigation {width: 90px;height: 320px;position:absolute;z-index:2;-moz-transform: scale(' + changeZoom + ');}</style>');
                    }
                }
                else {
                    var contentHeight = bbdesigner$("#" + this.model.navigationControl.content).height() || bbdesigner$(this.navigationControlData[0]).height();
                    var contentWidth = bbdesigner$("#" + this.model.navigationControl.content).width() || bbdesigner$(this.navigationControlData[0]).width();
                    if (this._browser != 'mozilla' && this._browser != 'chrome') {
                        navigationStyle = bbdesigner$('<style> .e-map-navigation {width: ' + contentWidth + 'px;height: ' + contentHeight + 'px;position:absolute;z-index:2;}</style>');
                    } else {
                        navigationStyle = bbdesigner$('<style> .e-map-navigation {width: ' + contentWidth + 'px;height: ' + contentHeight + 'px;position:absolute;z-index:2;}</style>');
                    }
                }
                if (this._browser != 'mozilla' && this._browser != 'chrome') {
                    navigationStyle.remove();
                    bbdesigner$('html > head').append(navigationStyle);
                }
                else {
                    bbdesigner$('html > head').append(navigationStyle);
                }
                if (this.model.navigationControl.content == null) {
                    bbdesigner$(sliderDiv).BoldBIDashboardSlider({
                        orientation: navigationOrientation,
                        sliderType: BoldBIDashboard.SliderType.MinRange,
                        value: 1,
                        animationSpeed: 1200,
                        minValue: this.minZoom(),
                        showTooltip: true,
                        enableAnimation: false,
                        maxValue: this.maxZoom(),
                        incrementStep: this.zoomFactor(),
                        slide: onslide,
                        change: onchange,
                        height: navigationHeight,
                        width: navigationWidth
                    });
                    navigationControl.appendTo(this._mapContainer);
                    if (navigation.orientation == 'horizontal') {
                        this._createDivElement(bbdesigner$("<div title='ZoomIn' class='e-icon1 e-incrementButton  icon_margin1' />"), bbdesigner$("<div class='e-icon1 nav-inc-" + isHor + "  e-innerIncrement'/>"), zoominOutDiv, "zoomIn");
                        this._createDivElement(bbdesigner$("<div title='ZoomOut'class='e-icon1 e-incrementButton icon_margin2'/>"), bbdesigner$("<div class='e-icon1 nav-dec-" + isHor + " e-innerDecrement'/>"), zoominOutDiv, "zoomOut");
                    }
                    else {
                        this._createDivElement(bbdesigner$("<div title='ZoomIn' class='e-icon1 e-incrementButton  icon_margin1' />"), bbdesigner$("<div class='e-icon1 nav-inc-" + isHor + "  e-innerIncrement'/>"), zoominOutDiv, "zoomIn");
                        this._createDivElement(bbdesigner$("<div title='ZoomOut' class='e-icon1 e-incrementButton icon_margin2'/>"), bbdesigner$("<div class='e-icon1 nav-dec-" + isHor + " e-innerDecrement'/>"), zoominOutDiv, "zoomOut");
                    }
                    this._createDivElement(bbdesigner$("<div title='PanTop' class='e-icon1 e-radialTop'/>"), bbdesigner$("<div class='e-icon1 e-arrowUp'/>"), baseDiv, "panTop");
                    this._createDivElement(bbdesigner$("<div title='PanLeft' class='e-icon1 e-radialLeft'/>"), bbdesigner$("<div class='e-icon1 e-arrowLeft'/>"), baseDiv, "panLeft");
                    this._createDivElement(bbdesigner$("<div title='PanRight' class='e-icon1 e-radialRight'/>"), bbdesigner$("<div class='e-icon1 e-arrowRight'/>"), baseDiv, "panRight");
                    this._createDivElement(bbdesigner$("<div title='PanBottom' class='e-icon1 e-radialBottom'/>"), bbdesigner$("<div class='e-icon1 e-arrowDown'/>"), baseDiv, "panBottom");
                    var homeDiv = bbdesigner$("<div title='Home' class='e-icon1 e-home-bg'><div class='e-icon1 e-map-home'></div>");
                    homeDiv.appendTo(baseDiv);
                    homeDiv.mousedown({ className: "home", map: this }, this._navigationControlPressed);
                }
                else {
                    if (this.navigationControlData == null) {
                        this.navigationControlData = bbdesigner$("#" + this.model.navigationControl.content);
                        this.navigationControlData.css({ 'display': 'block' });
                        this.navigationControlData.appendTo(navigationControl);
                    }
                    else {
                        this.navigationControlData.appendTo(navigationControl);
                    }
                    navigationControl.appendTo(this._mapContainer);

                    controlSize = { width: this.navigationControlData[0].getBoundingClientRect().right - this.navigationControlData[0].getBoundingClientRect().left, height: this.navigationControlData[0].getBoundingClientRect().bottom - this.navigationControlData[0].getBoundingClientRect().top };
                    var navPos = { x: 0, y: 0 }, legendSettings = baseLayer.legendSettings;
                    if (navigation.dockPosition == null || navigation.dockPosition == BoldBIDashboard.datavisualization.Map.Position.None) {
                        navPos.x = (this._width * navigation.absolutePosition.x) / 100;
                        navPos.y = (this._height * navigation.absolutePosition.y) / 100;
                    } else {
                        navPos = this._getPosition(navigation.dockPosition, controlSize);
                    }

                    if (legendSettings.showLegend && legendSettings.dockOnMap && legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Top && legendSettings.mode == BoldBIDashboard.datavisualization.Map.LegendMode.Interactive) {
                        navigationControl.css({ "margin-left": navPos.x + "px", "margin-top": (map._mapContainer.height() - controlSize.height) + "px" });
                    }
                    else if (legendSettings.showLegend && legendSettings.dockOnMap && legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Left && legendSettings.mode == BoldBIDashboard.datavisualization.Map.LegendMode.Interactive) {
                        navigationControl.css({ "margin-left": navPos.x + baseLayer.legendSettings.width + 20 + (baseLayer.legendSettings.leftLabel.length * 10) + (baseLayer.legendSettings.rightLabel.length * 10) + "px", "margin-top": navPos.y + "px" });
                    }
                    else if (legendSettings.showLegend && legendSettings.dockOnMap && legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Top && legendSettings.mode == BoldBIDashboard.datavisualization.Map.LegendMode.Default) {
                        navigationControl.css({ "margin-left": navPos.x + "px", "margin-top": navPos.y + baseLayer.legendSettings.height + "px" });
                    }
                    else if (legendSettings.showLegend && legendSettings.dockOnMap && legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Left && legendSettings.mode == BoldBIDashboard.datavisualization.Map.LegendMode.Default) {
                        navigationControl.css({ "margin-left": navPos.x + baseLayer.legendSettings.width + "px", "margin-top": navPos.y + "px" });
                    }
                    else {
                        navigationControl.css({ "margin-left": navPos.x + "px", "margin-top": navPos.y + "px" });
                    }
                }
            }

            function onchange(args) {
                if (map != null && map._isRendered && map.zoomLevel() != args.value) {
                    map.zoom(args.value, false);
                }

            }

            function onslide(args) {
                if (map != null && map._isRendered && map.zoomLevel() != args.value) {
                    map.zoom(args.value, false);
                }
            }
        },

        _getPosition: function (position, size) {
            var Position = { x: 0, y: 0 };
            switch (position) {
                case BoldBIDashboard.datavisualization.Map.Position.TopLeft:
                    break;
                case BoldBIDashboard.datavisualization.Map.Position.TopCenter:
                    Position.x = (this._width / 2) - (size.width / 2);
                    break;
                case BoldBIDashboard.datavisualization.Map.Position.TopRight:
                    Position.x = this._width - size.width;
                    break;
                case BoldBIDashboard.datavisualization.Map.Position.CenterLeft:
                    Position.y = (this._height / 2) - (size.height / 2);
                    break;
                case BoldBIDashboard.datavisualization.Map.Position.Center:
                    Position.x = (this._width / 2) - (size.width / 2);
                    Position.y = (this._height / 2) - (size.height / 2);
                    break;
                case BoldBIDashboard.datavisualization.Map.Position.CenterRight:
                    Position.x = this._width - size.width;
                    Position.y = (this._height / 2) - (size.height / 2);
                    break;
                case BoldBIDashboard.datavisualization.Map.Position.BottomLeft:
                    Position.y = this._height - size.height;
                    break;
                case BoldBIDashboard.datavisualization.Map.Position.BottomCenter:
                    Position.x = (this._width / 2) - (size.width / 2);
                    Position.y = this._height - size.height;
                    break;
                case BoldBIDashboard.datavisualization.Map.Position.BottomRight:
                    Position.x = this._width - size.width;
                    Position.y = this._height - size.height;
                    break;

            }
            return Position;
        },

        _renderMapElements: function () {
            this._templateDiv = bbdesigner$("<div class='TemplateDiv'/>");
            this._templateDiv.appendTo(this._mapContainer);
            this._templateDiv.css({
                'pointer-events': 'none', 'overflow': 'hidden', "position": "absolute",
                'z-index': '1', 'height': this._height, 'width': this._width
            });
            this._wireEvents();
            this.refreshLayers();
            this.refreshNavigationControl(this.model.navigationControl);
        },

        _renderLegend: function () {

            var baseLayer = this.model.layers[this.baseMapIndex()];

            this._scrollLegendDiv = bbdesigner$("<div class='ScrollLegendDiv'/>");

            this._scrollLegendDiv.appendTo(this._mapContainer);

            this._legendContainer = bbdesigner$("<div id='LegendcontainerDiv'/>");
            this._legendContainer.appendTo(this._scrollLegendDiv);

            //this._legendDiv = bbdesigner$("<div class='LegendDiv'/>");

            this._legendDiv.css({
                'height': this._legendDivHeight + "px", 'width': this._legendDivWidth + "px", 'position' : 'absolute'
            })
            this._isNavigationPressed = true;
            this._legendDiv.appendTo(this._legendContainer);
            this._legendDiv[0].getBoundingClientRect();
            this._legendContainer.css({
                "position": "relative"
            })

            this._scrollLegendDiv.BoldBIDashboardScroller({ height: Math.round(this._legendSize.height), width: Math.round(this._legendSize.width) });

            if (baseLayer.legendSettings.labelOrientation == undefined)
                baseLayer.legendSettings.labelOrientation == BoldBIDashboard.datavisualization.Map.LabelOrientation.Vertical;
            if (!baseLayer.legendSettings.dockOnMap) {
                if (baseLayer.legendSettings.labelOrientation == BoldBIDashboard.datavisualization.Map.LabelOrientation.Horizontal || baseLayer.legendSettings.labelOrientation == BoldBIDashboard.datavisualization.Map.LabelOrientation.Vertical) {

                    var position = (baseLayer.legendSettings.position == undefined) ? "topleft" : baseLayer.legendSettings.position;
                    var legendPos = this._getPosition(position, this._legendSize);
                    this._scrollLegendDiv.css({
                        "position": "absolute",
                        'z-index': '2', "margin-left": legendPos.x + "px", "margin-top": legendPos.y
                    });
                }
            }
            else {

                if (baseLayer.legendSettings.mode == BoldBIDashboard.datavisualization.Map.LegendMode.Interactive) {
                    pos = "none";
                    height = baseLayer.legendSettings.height + 50;
                    width = baseLayer.legendSettings.width + 20 + (baseLayer.legendSettings.leftLabel.length * 10) + (baseLayer.legendSettings.rightLabel.length * 10);
                }
                else {
                    pos = "auto";
                    height = baseLayer.legendSettings.height;
                    width = baseLayer.legendSettings.width;
                }
                this._scrollLegendDiv.css({
                    "position": "absolute",
                    'z-index': '2', 'height': this._legendSize.height, 'width': this._legendSize.width
                });

                if ((baseLayer.legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Top || baseLayer.legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Bottom) && baseLayer.legendSettings.alignment == BoldBIDashboard.datavisualization.Map.Alignment.Center) {
                    this._scrollLegendDiv.css({
                        "margin-left": (this._width / 2) - (this._legendSize.width / 2)
                    });
                }
                else if ((baseLayer.legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Top || baseLayer.legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Bottom) && baseLayer.legendSettings.alignment == BoldBIDashboard.datavisualization.Map.Alignment.Far) {
                    this._scrollLegendDiv.css({
                        "margin-left": this._width - this._legendSize.width
                    });
                }
                else if ((baseLayer.legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Left || baseLayer.legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Right) && baseLayer.legendSettings.alignment == BoldBIDashboard.datavisualization.Map.Alignment.Center) {
                    this._scrollLegendDiv.css({
                        "margin-top": (this._height / 2) - (this._legendSize.height / 2)
                    });
                }
                else if ((baseLayer.legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Left || baseLayer.legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Right) && baseLayer.legendSettings.alignment == BoldBIDashboard.datavisualization.Map.Alignment.Far) {
                    this._scrollLegendDiv.css({
                        "margin-top": this._height - this._legendSize.height
                    });
                }

                if (baseLayer.legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Bottom) {
                    this._scrollLegendDiv.css({
                        "margin-top": this._height
                    });
                }
                else if (baseLayer.legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Right) {

                    this._scrollLegendDiv.css({

                        "margin-left": this._width

                    });
                }
            }


            //this.refreshLayers();
            this.refreshNavigationControl(this.model.navigationControl);
        },

        _renderMapLayers: function () {

            bbdesigner$(this._templateDiv).empty();
            var prevPathCount = 0;
            var baseLayer = this.model.layers[this.baseMapIndex()];
            if (baseLayer.layerType == BoldBIDashboard.datavisualization.Map.LayerType.Geometry) {
                this._renderLayers(baseLayer, prevPathCount, this);
                if (baseLayer.shapeData != null)
                    prevPathCount = baseLayer._polygonData.length;
            }
            else {
                baseLayer._initializeLocalValues();
                var contribution = bbdesigner$("<div class='map-contribution'>");
                contribution[0].innerHTML = baseLayer.contribution;
                this._mapContainer.append(contribution);
            }
            for (var key = 0; key < this.model.layers[this.baseMapIndex()].subLayers.length; key++) {
                var sublayer = this.model.layers[this.baseMapIndex()].subLayers[key];
                sublayer._isBaseLayer = false;
                if (sublayer.layerType == BoldBIDashboard.datavisualization.Map.LayerType.Geometry && sublayer.shapeData != null) {
                    this._renderLayers(sublayer, prevPathCount, this);
                    prevPathCount += sublayer._polygonData.length;
                }
                else {
                    sublayer._initializeLocalValues();
                }
            }
            this.refreshMarkers();
            if (_isSVG && this.enableAnimation() && !this._isTileMap) {
                this._refreshWithAnimation();
            }
            else {
                this._refrshLayers();
            }

        },

        refreshLayers: function () {
            var baseLayer = this.model.layers[this.baseMapIndex()];
            this._processOData(baseLayer, this);
            this.shapeSelectionOnResize();
        },

        _processOData: function (layer, map) {
            if (layer.dataSource != null) {
                if (layer.dataSource instanceof BoldBIDashboard.DataManager) {
                    var queryPromise = layer.dataSource.executeQuery(layer.query);
                    queryPromise.done(function (e) {
                        if (e.result != null) {
                            layer.dataSource = e.result;
                            map._renderMapLayers();
                        }
                    });
                }
                else {
                    map._renderMapLayers();
                }
            }
            else {
                map._renderMapLayers();
            }
        }



    });



    var Tile = function (x, y) {
        this.X = x;
        this.Y = y;
        this.left = 0;
        this.top = 0;
        this.height = 256;
        this.width = 256;
        this.src = null;
    };

    var shapeLayer = function () {

        this.enableSelection = true;
        this.selectionMode = "default";
        this.bingMapType = "aerial";
        this.key = "";
        this.selectedItems = [];
        this.enableMouseHover = false;
        this.shapeData = null;
        this.markers = [];
        this.dataSource = null;
        this.urlTemplate = 'http://a.tile.openstreetmap.org/level/tileX/tileY.png';
        this.showTooltip = false;
        this.tooltipTemplate = null;
        this.mapItemsTemplate = null;
        this.enableAnimation = false;

        this.legendSettings = {
            showLegend: false,
            showLabels: false,
            rowSpacing: 10,
            columnSpacing: 10,
            position: "topleft",
            positionX: 0,
            positionY: 0,
            height: 0,
            width: 0,
            iconHeight: 20,
            iconWidth: 20,
            type: "layers",
            mode: "default",
            title: "",
            leftLabel: "",
            rightLabel: "",
            icon: "rectangle",
            dockOnMap: false,
            dockPosition: "top",
            labelOrientation: "vertical",
            alignment: "bottom",
            columnCount: 0,
			toggleVisibility:false,
        };

        this.labelSettings = {
            showLabels: false,
            labelPath: "",
            enableSmartLabel: false,
            smartLabelSize: "fixed",
            labelLength: 2
        };
        this.markerTemplate = null;
        this.showMapItems = false;
        this.layerType = 'geometry';
        this.geometryType = "geographic";
        this._colorPaletteSettings = {
            'Palette1':
            {
                'highlightColor': '#F7CD1C',
                'highlightStroke': 'white',
                'SelectionColor': '#F96C0D',
                'SelectionStroke': 'white'

            },
            'Palette2':
            {
                'highlightColor': '#68A3EA',
                'highlightStroke': 'White',
                'SelectionColor': '#116EF4',
                'SelectionStroke': 'White'

            },
            'Palette3':
            {
                'highlightColor': '#CCCCCC',
                'highlightStroke': 'white',
                'SelectionColor': '#4D4D4D',
                'SelectionStroke': 'white'

            }
        };
        this.colorPalettes = {
            'Palette1': ['#4A3825', '#736F3D', '#F2DABD', '#BF9D7E', '#7F6039', '#7F715F', '#70845D', '#CC995C', '#736F3D', '#89541B'],
            'Palette2': ['#E51400', '#730202', '#EF6535', '#C63477', '#BF004D', '#F0A30B', '#CE1B1B', '#97993D', '#D6BF38', '#835A2C'],
            'Palette3': ['#A4C400', '#008B00', '#1BA0E2', '#0050EF', '#AA00FF', '#D90073', '#E51400', '#F96800', '#E3C800', '#A20026']
        };

        this._prevPaletteIndex = 0;
        this._newBounds = [];
        this.subLayers = [];

        this.shapeSettings = {
            highlightColor: "gray",
            highlightBorderWidth: 1,
            selectionColor: "gray",
            fill: "#E5E5E5",
			shapeFillColor: null,
            radius: 5,
            strokeThickness: "0.2",
            stroke: "#C1C1C1",
            colorPalette: 'palette1',
            highlightStroke: "#C1C1C1",
            selectionStroke: "#C1C1C1",
            selectionStrokeWidth: 1,
            colorValuePath: null,
            valuePath: null,
            enableGradient: false,
            colorMappings: null,
            autoFill: false
        };


        this.bubbleSettings = {
            showBubble: true,
            bubbleOpacity: "0.9",
            minValue: 10,
            maxValue: 20,
            color: "gray",
            colorValuePath: null,
            valuePath: null,
            colorMappings: null,
            showTooltip: false,
            tooltipTemplate: null
        };
    };

    shapeLayer.prototype =
    {
        dataTypes: {
            enableRightClick: "boolean",
            dataSource: "data",
            markers: "array",
            subLayers: "array",
            shapeSettings: {
                colorMappings: "array"
            },
            bubbleSettings: {
                colorMappings: "array"
            }

        },

        _initializeLocalValues: function () {
            this._svgns = "http://www.w3.org/2000/svg";
            this._bounds = [];
            this._bubbleCollection = [];
            this._prevSelectedShapes = [];
            this._prevSelectedLegends = [];
            this._isBaseLayer = true;
            this._prevHoverdLegend = null;
            this._prevHoveredShape = null;
            this._labelCollection = [];
            this._scrollBar = null;
            this._mapShapes = [];
            this._bubbles = [];
            this._labelBounds = [];
            this._bubbleCount = 0;
            this._mapItems = [];
            this._mapMarkers = [];
            this.selectedItems;
            this._tooltipSize = { height: 0, width: 0 };
            this._smartLabels = [];
            this._labelData = [];
            this._interactiveArrow = null;
            this._legendRects = [];
			this._legendIconPosition = [];

        },

        _generateMarkerForLayers: function (map) {
            this._mapMarkers = [];
            var rootTop = map._rootgroup.getBoundingClientRect().top;
            var rootLeft = map._rootgroup.getBoundingClientRect().left;
            for (var key = 0; key < this.markers.length; key++) {
                var markerObeject = this.markers[key];
                if (this.markerTemplate != null) {
                    var markerTemplateDiv = bbdesigner$('.markerTemplateDiv');
                    markerTemplateDiv = bbdesigner$("<div class='mapMarker' style='display:block;position:absolute;pointer-events: stroke;'></div>");
                    map._templateDiv.append(markerTemplateDiv);
                    bbdesigner$(markerTemplateDiv).css({ height: this._height, width: this._width, "margin-top": this._margintop, "margin-left": this._marginleft });
                    var htmlString = bbdesigner$("#" + this.markerTemplate).render(markerObeject);
                    if (map.model.markerSelected == "") {

                        bbdesigner$(markerTemplateDiv).css({ "pointer-events": "none" });
                    }
                    bbdesigner$(markerTemplateDiv).html(htmlString);
                    map._on(bbdesigner$(markerTemplateDiv), BoldBIDashboard.eventType.mouseDown, { marker: bbdesigner$(markerTemplateDiv), data: markerObeject }, map._markerPressed);
                    this._mapMarkers.push(markerTemplateDiv);
                }
                else {
                    var markerItem = bbdesigner$(' <div class="mapMarker" style="display:block;position:absolute;pointer-events: stroke;"><label>' + markerObeject.label + '</label></div>');// document.createElementNS(this._svgns, "text");
                    if (_isSVG) {
                        map._templateDiv.append(markerItem);
                    }
                    else {
                        markerItem.appendTo(map._templateDiv);
                    }
                    if (map.model.markerSelected == "") {

                        bbdesigner$(markerItem).css({ "pointer-events": "none" });
                    }
                    map._on(bbdesigner$(markerItem), BoldBIDashboard.eventType.mouseDown, { marker: bbdesigner$(markerItem), data: markerObeject }, map._markerPressed);
                    this._mapMarkers.push(markerItem);

                }
                var baseLayer = this;
                if (baseLayer.legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Left) {
                    this._height = this._height;
                    this._width = this._width - parseFloat(width);
                    this._marginleft = parseFloat(width);
                }
            }
        },

        _contains: function (array, actualobj) {
            var length = array.length;
            if (length > 0) {
                while (length--) {
                    if (array[length] === actualobj) {
                        return true;
                    }
                }
            }
            return false;
        },

        _shapeContains: function (array, actualobj) {
            var length = array.length;
            if (length > 0) {
                while (length--) {
                    if (array[length].shapeIndex === actualobj) {
                        return { isContains: true, index: array.length - length };
                    }
                }
            }
            return { isContains: false };

        },

        _labelSizeCalculation: function (map) {

            var size = document.getElementsByClassName("e-map-labelContainer");
            var totalHeight = size[0].offsetHeight;
            var totalWidth = size[0].offsetWidth;

            map._width = map._width - totalWidth;
            map._marginleft = totalWidth;

        },

        _sizeCalculation: function (map) {

            var colorMappings = this.shapeSettings.colorMappings || this.bubbleSettings.colorMappings;
            var isRange = false, colormap = false;
            if ((this.shapeSettings.colorMappings != null || this.shapeSettings.colorPath != null) || (this.bubbleSettings.colorMappings != null || this.bubbleSettings.colorPath != null)) {
				if (colorMappings != null) {
					if (colorMappings.rangeColorMapping != null) {
						colorMappings = colorMappings.rangeColorMapping;
						isRange = true;
					}
					if (colorMappings.equalColorMapping != null) {
						colorMappings = colorMappings.equalColorMapping;
					}
				}
				else if (this.shapeSettings.colorPath != null || this.bubbleSettings.colorPath != null ) {
		             colorMappings = this.dataSource;
		             colormap = true;
		         }

                var width = 0;
                var height = 0;
                var rowSpacing = this.legendSettings.rowSpacing;
                var columnSpacing = this.legendSettings.columnSpacing;
                var iconWidth = this.legendSettings.iconWidth + 5;
                var iconHeight = this.legendSettings.iconHeight + 5;
                var legendHeight = iconHeight + rowSpacing;
                var totalHeight = this.legendSettings.iconHeight + rowSpacing;
				var titleHeight = this._calcHeight(this.legendSettings.title);
                var totalWidth = 0;
                var yPos = 10;
                var xPos = 10;
                var legendSettings = this.legendSettings;
                var columnCount = this.legendSettings.columnCount;
                if (legendSettings.height == 0 && legendSettings.width == 0 && columnCount == 0) {
                    for (var i = 0; i < colorMappings.length; i++) {
                        var label = colorMappings[i].legendLabel != null ? colorMappings[i].legendLabel : (isRange ? colorMappings[i].from : colormap ? colorMappings[i][legendSettings.textPath] : colorMappings[i].value);
                        var labelwidth = this._calcWidth(label);
                        var legendWidth = iconWidth + labelwidth + columnSpacing;

                        if ((legendSettings.dockOnMap && (legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Top || legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Bottom)) || !legendSettings.dockOnMap) {
                            if (map._width < (width + legendWidth)) {
                                totalHeight = ((iconHeight) + rowSpacing) + totalHeight;
                                totalWidth = Math.max(totalWidth, width);
                                width = legendWidth;
                            }
                            else {
                                width += (legendWidth + 5);
                            }
                        }
                        else {

                            if (map._height < (height + iconHeight + rowSpacing)) {
                                totalWidth += width;
                                totalHeight = Math.max(totalHeight, height);
                                width = legendWidth;
                                height = 0;
                            }
                            else {
                                height += (iconHeight + rowSpacing);
                                width = Math.max(legendWidth, width);
                            }
                        }


                    }
                    if ((legendSettings.dockOnMap && (legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Top || legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Bottom)) || !legendSettings.dockOnMap) {
                        totalWidth = Math.max(totalWidth, width);
						if(legendSettings.title != null && legendSettings.title != "")							
							totalHeight += titleHeight;
						else
							totalHeight += 5;
                    }
                    else {
                        totalWidth += (width + columnSpacing);
                        totalHeight = Math.max(totalHeight, height);
                    }

                }
                else if (columnCount == 0) {
                    if ((legendSettings.height.toString().indexOf("%")) != -1) {

                        totalHeight = (map._height / 100) * parseInt(legendSettings.height.toString().replace('%', ''))
                    }
                    else {

                        totalHeight = legendSettings.height;
                    }
                    if ((legendSettings.width.toString().indexOf("%")) != -1) {

                        totalWidth = (map._width / 100) * parseInt(legendSettings.width.replace('%', ''))
                    }
                    else {

                        totalWidth = legendSettings.width;
                    }

                }

                if (legendSettings.height == 0 && legendSettings.width == 0 && columnCount != 0) {

                    for (var i = 0; i < colorMappings.length; i++) {
                        var label = colorMappings[i].legendLabel != null ? colorMappings[i].legendLabel : (isRange ? colorMappings[i].from : colormap ? colorMappings[i][legendSettings.textPath] : colorMappings[i].value);
                        var labelwidth = this._calcWidth(label);

                        var legendWidth = iconWidth + labelwidth + columnSpacing;

                        if (i % columnCount != 0) {
                            width += legendWidth;
                            if (i == columnCount - 1) {
                                totalWidth = Math.max(totalWidth, width);
                            }

                        }
                        else {
                            if (i != 0)
                                totalHeight = (iconWidth + rowSpacing) + totalHeight;
                            totalWidth = Math.max(totalWidth, width);
                            width = legendWidth;
                        }
                    }
                }
            }


            if (legendSettings.height != 0 && legendSettings.width != 0) {
                totalHeight = legendSettings.height;
                totalWidth = legendSettings.width;
            }

            map._legendSize = { height: totalHeight, width: totalWidth };
            if (legendSettings.dockOnMap) {
                if (legendSettings.mode == BoldBIDashboard.datavisualization.Map.LegendMode.Interactive) {
                    totalHeight = 55;
                }
                if (this.legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Bottom) {
                    map._height = map._height - parseFloat(totalHeight);
                    this.legendSettings.tempWidth = width;
                }

                else if (this.legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Top) {
                    map._height = map._height - parseFloat(totalHeight);
                    map._margintop = parseFloat(totalHeight);
                }
                else if (this.legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Left) {

                    map._width = map._width - totalWidth;
                    map._marginleft = totalWidth;
                }
                else if (this.legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Right) {
                    map._height = map._height;
                    map._width = map._width - totalWidth;
                }
            }



        },


        _clearShapeWidth: function (scale) {
            if (scale == null) scale = 1;
            for (var index = 0; index < this._mapShapes.length; index++) {
                var mapshape = this._mapShapes[index];
                if (!this._contains(this._prevSelectedShapes, mapshape.shape)) {
                    if (_isSVG) {
                        if (this.shapeSettings.colorMappings != null || this.shapeSettings.autoFill || this.shapeSettings.colorPath != null || !BoldBIDashboard.util.isNullOrUndefined(this.shapeSettings.shapeFillColor)) {
                            mapshape.shape.setAttribute("fill", mapshape.shape.getAttribute("nodeValue"));

                        }
                        else {
                            mapshape.shape.setAttribute("fill", this.shapeSettings.fill);
                        }

                        mapshape.shape.setAttribute("stroke-width", (this.shapeSettings.strokeThickness / scale));
                        mapshape.shape.setAttribute("stroke", this.shapeSettings.stroke);
                    }
                    else {
                        mapshape.shape.fillcolor = mapshape.shape.style.behavior;
                        mapshape.shape.strokeweight = this.shapeSettings.strokeThickness;
                        mapshape.shape.strokecolor = this.shapeSettings.stroke;
                    }
                }
            }



        },

        _shapeSelection: function () {
            for (var index = 0; index < this._mapShapes.length; index++) {
                var mapshape = this._mapShapes[index];
                var check = this._shapeContains(this.selectedItems, mapshape.shapeIndex);
                if (check.isContains) {
                    if (!this._contains(this._prevSelectedShapes, mapshape.shape))
                        this._prevSelectedShapes.push(mapshape.shape);
                    if (_isSVG) {
                        mapshape.shape.setAttribute("fill", this.shapeSettings.selectionColor);
                        mapshape.shape.setAttribute("stroke-width", this.shapeSettings.selectionStrokeWidth);
                        mapshape.shape.setAttribute("stroke", this.shapeSettings.selectionStroke);
                    }
                    else {
                        mapshape.shape.fillcolor = this.shapeSettings.selectionColor;
                        mapshape.shape.strokeweight = this.shapeSettings.selectionStrokeWidth;
                        mapshape.shape.strokecolor = this.shapeSettings.selectionStroke;
                    }
                }
            }
        },
		
		_rgbToHex: function(R, G, B) {
             return "#" + this._toHex(R) + this._toHex(G) + this._toHex(B);
        },
                
        _toHex: function (n) {
            var charstr = "0123456789ABCDEF";
            n = parseInt(n, 10);
            if (isNaN(n)) return "00";
            n = Math.max(0, Math.min(n, 255));
            return charstr.charAt((n - n % 16) / 16)
                + charstr.charAt(n % 16);
        },
                
        _hexToR: function(h) {
             return parseInt((this._cropHex(h)).substring(0, 2), 16);
        },
               
        _hexToG: function(h) {
             return parseInt((this._cropHex(h)).substring(2, 4), 16);
        },
       
        _hexToB: function(h) {
             return parseInt((this._cropHex(h)).substring(4, 6), 16);
        },
      
        _cropHex: function(h) {
             return (h.charAt(0) == "#") ? h.substring(1, 7) : h;
        },
                
        _getRangeColorValues: function(range, start, end) {
            var rangeColorValues = [];
            rangeColorValues.push(start);
            if (start > end) {
                var rangeValue = (start - end) / (range-1);
                for (var i = range; i > 2; i--) {
                    start = start - rangeValue;
                    rangeColorValues.push(start);
                }
            }
            else {
                var rangeValue = (end - start) / (range-1);
                for (var i = 2; i < range; i++) {
                    start = start + rangeValue;
                    rangeColorValues.push(start + rangeValue);
                }
            }
            rangeColorValues.push(end);
            return rangeColorValues;
		},

       _generateGradientCollection: function(gradientColors) {
            var gradientCollection = [];
            var startRangeColor = gradientColors[0].charAt(0) == "#" ? gradientColors[0] : this._colorNameToHex(gradientColors[0]);
            var endRangeColor = gradientColors[0].charAt(0) == "#" ? gradientColors[gradientColors.length - 1] : this._colorNameToHex(gradientColors[gradientColors.length - 1]);
            var startR = this._hexToR(startRangeColor);
            var startG = this._hexToG(startRangeColor);
            var startB = this._hexToB(startRangeColor);
            var endR = this._hexToR(endRangeColor);
            var endG = this._hexToG(endRangeColor);
            var endB = this._hexToB(endRangeColor);
            var range = 10;
            var rRange = this._getRangeColorValues(range, startR, endR);
            var gRange = this._getRangeColorValues(range, startG, endG);
            var bRange = this._getRangeColorValues(range, startB, endB);
            for (var i = 0; i < range; i++) {
                gradientCollection.push(this._rgbToHex(rRange[i], gRange[i], bRange[i]));
            }
            return gradientCollection;
	   },
                	
        _calculateTextWidth: function (text) {
            var span = bbdesigner$('<span>' + text + '</span>');
            bbdesigner$('body').append(span);
            var width = span.width();
            span.remove();
            return width;
        },

        _trimFunction: function (str, width) {

            var span = bbdesigner$("#spantag").text(str);
            var text = str;
            while (span.width() > width) {
                text = text.slice(0, -2);
                span.text(text + "...");
            }

            return text;

        },

        _createLabel: function (content, xpos, ypos, className, index, map, colorMapping) {
            var label;
			if(this.legendSettings.mode == "interactive")
				label = bbdesigner$("<div class=" + className + " align = left></div>"); // document.createElementNS(this._svgns, "text");
			else
				label = bbdesigner$("<div class=' " + className + " ' " +  "id='" + map._id +"LegendText_"+index+"'" + ">" + "</div>");
            label[0].innerHTML = content;
            label.css({
                "left": xpos + "px",
                "top": ypos + "px",
                "position": "absolute",
				"cursor": (!BoldBIDashboard.util.isNullOrUndefined(colorMapping) && colorMapping.legendSettings.toggleVisibility) ? "pointer" : "default",
            });
            return label;
        },

        _createInteractiveArrow: function (xpos, ypos) {

            var interactiveElement = bbdesigner$("<div class='e-icon1 e-interactiveArrow'></div>");
            interactiveElement[0].innerHTML = "&#9650";

            interactiveElement.css({
                "margin-left": xpos + "px",
                "margin-top": ypos + "px",
                "position": "absolute",

            });
            return interactiveElement;
        },
        _getEllipseLegend: function (xPos, yPos, colormapping, index, map) {

            var rect = bbdesigner$("<div class='e-mapLegend'id='"+ map._id +"Legend_"+index+ "'" + "/>");
            rect.css({
                "height": colormapping.legendSettings.iconHeight + "px",
                "width": colormapping.legendSettings.iconWidth + "px",
                "border-radius": colormapping.legendSettings.iconHeight / 2 + "px",
                "left": xPos + "px",
                "top": yPos + "px",
                "position": "absolute",
				"cursor": this.legendSettings.toggleVisibility ? "pointer" : "default",
            });
			//yPos = yPos + rect.height;
            return rect;

        },

        _getRectLegend: function (xPos, yPos, colormapping, index, map) {
            var rect = bbdesigner$("<div id='"+ map._id +"Legend_"+index+ "'" + " />");
            rect.css({
                "height": this.legendSettings.iconHeight + "px",
                "width": this.legendSettings.iconWidth + "px",
                "left": xPos + "px",
                "top": yPos + "px",
                "position": "absolute",
				"cursor": this.legendSettings.toggleVisibility ? "pointer" : "default",
            });
            return rect;
        },
		
		_layerLegendLocation:function(colormapping, isRange, map, colormap){
			var iconPosition;
			for (var i = 0; i < colormapping.length; i++) {
				var legendsettings = bbdesigner$.extend(true, null, this.legendSettings);	
				var colorLegendLabel = colormapping[i].colorMaplegendLabel = colormapping[i].legendLabel != null ? true : false; 
				var label = colormapping[i].legendLabel = colormapping[i].legendLabel != null ? colormapping[i].legendLabel : (isRange ? colormapping[i].from : colormap ? colormapping[i][legendsettings.textPath] : colormapping[i].value);								
				commonEventArgs = {
                    legendSettings: legendsettings, legendLabel: colormapping[i].legendLabel,
                    fill: !isRange ? colormapping[i][this.shapeSettings.colorPath] : colormapping[i].color,
                    mapping: !isRange ? undefined : colormapping[i],
                    dataSource: !isRange ? colormapping[i] : undefined,					
                };
                map._trigger("legendItemRendering", { model: map.model, data: commonEventArgs });
                var labelwidth = this._calcWidth(label);
                var legendWidth = commonEventArgs.legendSettings.iconWidth + legendsettings.columnSpacing + labelwidth;
                var legendHight = commonEventArgs.legendSettings.iconHeight;
				iconPosition = this._highestIconValueCalculation(commonEventArgs, i);
			}
			return iconPosition;
		},

        _generateLegend: function (map) {

            var isRange = true, isEqual = false, colormap = false;
            var colormapping = null;
			if (this.shapeSettings.colorMappings != null) {
				if (this.shapeSettings.colorMappings.rangeColorMapping != undefined) {
					colormapping = this.shapeSettings.colorMappings.rangeColorMapping;
            } else if (this.shapeSettings.colorMappings.equalColorMapping != undefined) {
                colormapping = this.shapeSettings.colorMappings.equalColorMapping;
                isRange = false;
                isEqual = true;
            }
			}
			else if (this.shapeSettings.colorPath != null) {
		        colormap = true;
		        isRange = false;
		        colormapping = this.dataSource;
		    }
            if (map._reversed) {
                colormapping.reverse();
                map._reversed = false;
            }
            var xPos = 0;
            var yPos = 0;
            var legendSettings = this.legendSettings;
            var columnWidth = 0;
            var height1;
            var width1;

            var rowSpacing = legendSettings.rowSpacing;
            var columnSpacing = legendSettings.columnSpacing;
            var iconwidth = legendSettings.iconWidth + 5;
            var totalHeight = legendSettings.iconHeight + rowSpacing;
			var titleHeight = this._calcHeight(legendSettings.title);
			var titleWidth = this._calcWidth(legendSettings.title);
            var totalWidth = 0;
            var columnCount = legendSettings.columnCount, legendIconCalc;
			if (legendSettings.title != null && legendSettings.title != "") {										
				var text = titleText = legendSettings.title;
				var textcon = this._createLabel(text, xPos, yPos, 'e-defaultLegend-title', 'title', map);
				textcon[0].title = titleText;					
				textcon.appendTo(map._legendDiv);					
				yPos += titleHeight + columnSpacing;
			}
			
			legendIconCalc = this._layerLegendLocation(colormapping,isRange,map, colormap);
			legendPosition = this._removeDuplicateItems(legendIconCalc.legendPosition);
				for (var i = 0; i < legendPosition.length; i++) {								              
					var ymidval, yheight;
					ymidval = legendPosition[i].iconHeight/2 - legendPosition[i].textHeight/2;
					legendIconCalc.ymidval = ymidval;
					legendIconCalc.textWidth = this._calcWidth(legendPosition[i].legendLabel);
					var legendWidth = legendIconCalc.highWidth + columnSpacing + legendIconCalc.highTextWidth + titleWidth;
					var legendHight = legendIconCalc.highHeight;
					if (columnCount != 0) {
						if (i % columnCount != 0) {
							xPos = this._drawLegend(legendPosition[i].legendItems, xPos, yPos, map, isRange, i, legendIconCalc);
						}
						else {
							if (i != 0){
								yheight = legendPosition[i-1].iconHeight;							
								yPos = yPos + yheight + columnSpacing;	
							}                                                
							xPos = this._drawLegend(legendPosition[i].legendItems, xPos, yPos, map, isRange, i, legendIconCalc);
						}
					}
                else {
                    if (legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Top || legendSettings.dockPosition == BoldBIDashboard.datavisualization.Map.DockPosition.Bottom) {

                        if (map._legendSize.width < xPos + legendWidth) {

                            
                            xPos = 0;
                            this._drawLegend(legendPosition[i].legendItems, xPos, yPos, map, isRange, i, legendIconCalc);
							yPos += (legendSettings.iconHeight + rowSpacing);
                           // xPos += legendIconCalc.legendWidth;
                        }
                        else {
                            this._drawLegend(legendPosition[i].legendItems, xPos, yPos, map, isRange, i, legendIconCalc);
                            xPos += legendPosition[i].iconWidth + legendPosition[i].textWidth;
							yPos += (legendSettings.iconHeight + rowSpacing);
                        }
                    }
                    else {

                        if (map._legendSize.height < yPos + legendSettings.iconHeight) {

                            yPos = 0;
                            xPos += (columnWidth + (columnSpacing));
                            this._drawLegend(legendPosition[i].legendItems, xPos, yPos, map, isRange, i, legendIconCalc);
                            columnWidth = 0;
                            yPos += (legendSettings.iconHeight + rowSpacing);
                        }
                        else {
                            this._drawLegend(legendPosition[i].legendItems, xPos, yPos, map, isRange, i, legendIconCalc);
                            columnWidth = Math.max(columnWidth, legendWidth);
                            yPos += (legendSettings.iconHeight + rowSpacing);
                        }
                    }
					

                }

                if (map._legendDivHeight > yPos) {
                    height1 = map._legendDivHeight;
                }
                else {
                    height1 = yPos + legendHight;
                }

                if (map._legendDivWidth > xPos + legendWidth) {
                    width1 = map._legendDivWidth;
                }
                else {
                    width1 = xPos + legendWidth;
                }

                map._legendDivWidth = width1;
                map._legendDivHeight = height1;

            }
        },
        _drawLegend: function (colormapping, xPos, yPos, map, isRange, index, legendIconCalc) {
			var labelText , columnCount = colormapping.legendSettings.columnCount;
			var midvalue = legendIconCalc.highWidth/2;
			var icw = legendIconCalc.legendPosition[index].iconWidth/2;			
            if (!map.model.enableRTL) {
				xPos = colormapping.legendSettings.columnCount != 0 ? (index % columnCount != 0 && index != 0) ? xPos + ( legendIconCalc.highWidth + legendIconCalc.highTextWidth + 10 ) : midvalue - icw : midvalue - icw;
                this._drawLegendShape(colormapping, xPos, yPos, map, isRange, index, legendIconCalc);				
				labelText = this._legendTextCalculation(legendIconCalc, index, xPos, yPos, map);
				labelText.labelTextXPos = legendIconCalc.highWidth != legendIconCalc.legendPosition[index].iconWidth ? labelText.labelTextXPos : xPos + legendIconCalc.legendPosition[index].iconWidth + 10;
                this._drawLegendText(colormapping, labelText.labelTextXPos, labelText.legendTextYPos, map, isRange, index);
            }
            else {                			
				labelText = this._legendTextCalculation(legendIconCalc, index, xPos, yPos, map);
			    this._drawLegendText(colormapping, labelText.labelTextXPos, labelText.legendTextYPos, map, isRange, index);
				xPos += legendIconCalc.highTextWidth + 10;
				xPos += midvalue - icw;
				this._drawLegendShape(colormapping, xPos, yPos, map, isRange, index, legendIconCalc);				
            }
			 return xPos;
        },
        _drawLegendShape: function (colormapping, xPos, yPos, map, isRange, index, legendIconCalc) {
            var legendItem, labelText;
            if (this.legendSettings.icon.toLowerCase() == "rectangle")
                legendItem = this._getRectLegend(xPos, yPos, colormapping, index, map);
            else
                legendItem = this._getEllipseLegend(xPos, yPos, colormapping, index, map);
			bbdesigner$(legendItem).css("background", !isRange ? colormapping.dataSource._color != undefined ? colormapping.dataSource._color : colormapping.fill != undefined ? colormapping.fill : colormapping.dataSource.color : colormapping.mapping._color ? colormapping.mapping._color : colormapping.fill);		    
			if (isRange) {
					if(!BoldBIDashboard.util.isNullOrUndefined(colormapping.mapping.gradientColors)){
						var gradLength = colormapping.mapping.gradientColors.length;
						var grad = "linear-gradient" + "(" + "to right" + ",";
						var x = colormapping.mapping.gradientColors[0];
						for(var i=1;i<gradLength;i++)
							x += "," + colormapping.mapping.gradientColors[i] ;												
						grad  = grad + x + ")";							
						colormapping.mapping.color = grad;
						bbdesigner$(legendItem).css("background",colormapping.mapping.color);
					}
				}            
            legendItem.appendTo(map._legendDiv);
            //return xPos;
        },
        _drawLegendText: function (colormapping, xPos, yPos, map, isRange, index) {
            var legendText = bbdesigner$("<div class='e-defaultLegendLabel' id='"+ map._id +"LegendText_"+index+ "'" + "/>");
            legendText.css({
                "left": xPos + "px",
                "top": yPos + "px",
                "position": "absolute",
                "text-overflow": "ellipsis",
                "white-space": "nowrap",
                "overflow": "hidden",
				"cursor": this.legendSettings.toggleVisibility ? "pointer" : "default",
            });
            legendText[0].title = colormapping.legendLabel;
            legendText[0].innerHTML = colormapping.legendLabel;
            legendText.appendTo(map._legendDiv);
            //xPos += this._calcWidth(colormapping.legendLabel);
            //return xPos;
        },

        _generateLegends: function (map) {
            var colorMappings = this.shapeSettings.colorMappings;
            if (this.shapeSettings.colorPath != null || (colorMappings.rangeColorMapping != null) || (colorMappings.equalColorMapping != null)) {
                var xPos = 0;
                var yPos = 0;
                var legendSettings = this.legendSettings;
                var columnWidth = 0;
                var width = 0;
                var height = 0;
                var iconWidth = this.legendSettings.iconWidth + 5;
                var iconHeight = this.legendSettings.iconHeight + 5;
                var rowSpacing = this.legendSettings.rowSpacing;
                var columnSpacing = this.legendSettings.columnSpacing;
                var legendHeight = this.legendSettings.iconHeight + this.legendSettings.rowSpacing;
                var totalHeight = iconHeight + this.legendSettings.rowSpacing;
                var totalWidth = 0;
                var leftLabel = map.model.enableRTL ? this.legendSettings.rightLabel : this.legendSettings.leftLabel;
                var rightLabel = map.model.enableRTL ? this.legendSettings.leftLabel : this.legendSettings.rightLabel;
                if ((this.legendSettings.showLegend == undefined || this.legendSettings.showLegend) && !this.shapeSettings.autoFill) {
                    bbdesigner$(map._mapContainer).append(bbdesigner$('<div  id="labelTooltip" style="display:none;background-color:grey;padding-left:5px; padding-right:5px;position:absolute;z-index:1000;pointer-events:none;"/>'));
                    var baseLayer = this;
                    var xpos = 10;
                    var ypos = 0;

                    var totalHeight = this.iconHeight + this.legendSettings.rowSpacing;
                    var _legendheight = this.legendSettings.height;
                    var _legendwidth = this.legendSettings.width;
                    var legenddiv = bbdesigner$("<div/>");
                    if (baseLayer.legendSettings.dockOnMap) {
                        legenddiv = bbdesigner$(map._legendDiv);
                    }
                    else if (!baseLayer.legendSettings.dockOnMap && (baseLayer.legendSettings.mode != BoldBIDashboard.datavisualization.Map.LegendMode.Interactive)) {
                        legenddiv = bbdesigner$(map._legendDiv);
                    }
                    else {
                        if (_isSVG) {
                            legenddiv.appendTo(map._templateDiv);
                        }
                        else {
                            map._templateDiv.append(legenddiv);
                        }
                    }


                    if ((this.legendSettings.type == undefined || this.legendSettings.type == BoldBIDashboard.datavisualization.Map.LegendType.Layers) && (this.shapeSettings.colorMappings != null || this.shapeSettings.colorPath != null)
                       && (this.legendSettings.mode == undefined || this.legendSettings.mode == BoldBIDashboard.datavisualization.Map.LegendMode.Default || (this.legendSettings.mode == BoldBIDashboard.datavisualization.Map.LegendMode.Interactive
                       && this.shapeSettings.colorMappings.equalColorMapping != null))) {

                        this._generateLegend(map);


                    } else if ((this.legendSettings.type == undefined || this.legendSettings.type == BoldBIDashboard.datavisualization.Map.LegendType.Layers) && this.legendSettings.mode == BoldBIDashboard.datavisualization.Map.LegendMode.Interactive && this.shapeSettings.colorMappings != null) {
                        var textcon = '';

                        if (this.legendSettings.height == 0)
                            _legendheight = 18;
                        if (this.legendSettings.width == 0)
                            _legendwidth = 150;

                        if (this.legendSettings.leftLabel == null)
                            this.legendSettings.leftLabel = '';
                        if (this.legendSettings.title != null) {
                            var newxpos = xpos;
                            var titleObj = document.createElement("Label");
                            titleObj.innerHTML = this.legendSettings.title;
                            document.body.appendChild(titleObj);
                            if (!this.legendSettings.showLabels)
                                newxpos = !map.model.enableRTL ? xpos + this.legendSettings.leftLabel.length * 10 : xpos + (_legendwidth - (titleObj.offsetWidth / 2));
                            titleObj.className = "e-interactivelegend-title";
							var text = titleText = this.legendSettings.title;
                            var _legendtitlewidth = this._calcWidth(text);
                           

                            if (_legendtitlewidth > _legendwidth) {
                                var dotPadding = 10;
                                for (var i = titleText.toString().length; i >= 1; i--) {
                                    text = text.toString().substring(0, i - 1);
                                    titleObj.innerHTML = text;
                                    _legendtitlewidth = this._calcWidth(text);
                                    if (_legendtitlewidth + dotPadding <= _legendwidth) {
                                        titleText = text += "...";
										titleTrimWidth = this._calcWidth(titleText);
										if(titleTrimWidth + dotPadding <= _legendwidth)
											break;
                                    }
                                }
                            }
                            titleObj.parentNode.removeChild(titleObj);
                            var textcon = this._createLabel(text, newxpos, ypos, 'e-interactivelegend-title');
                            textcon[0].title = titleText;
                            textcon.css({
                                "width": _legendwidth + "px"
                            });
                            if (_isSVG)
                                textcon.appendTo(legenddiv);
                            else
                                legenddiv.append(textcon);
                            ypos += 25;
                        }

                        if (this.legendSettings.showLabels)
                            ypos += 25;

                        if (leftLabel != null && !this.legendSettings.showLabels) {
                            var textcon = this._createLabel(leftLabel, xpos, ypos - 3, 'e-interactivelegend-leftlabel');

                            if (_isSVG)
                                textcon.appendTo(legenddiv);
                            else
                                legenddiv.append(textcon);
                            xpos = xpos + this._calcWidth(leftLabel) + 5;
                        }

                        var interactiveElement = this._createInteractiveArrow(xpos, ypos + _legendheight);
                        interactiveElement.appendTo(legenddiv);
                        this._interactiveArrow = interactiveElement;

                        var _legendgroup = null;
                        if (!_isSVG && this.shapeSettings.enableGradient) {
                            _legendgroup = map._createGroup(false, "legendGroup");
                            _legendgroup.style.left = 0 + 'px';
                            _legendgroup.style.top = 0 + 'px';
                            _legendgroup.style.position = "relative";
                            legenddiv.append(_legendgroup);
                        }
                        if (map.model.enableRTL) {
                            if (!map._reversed) {
                                var mappings = colorMappings.rangeColorMapping.reverse();
                                map._reversed = true;
                            }
                            else
                                var mappings = colorMappings.rangeColorMapping;
                        }
                        else {
                            if (map._reversed) {
                                var mappings = colorMappings.rangeColorMapping.reverse();
                                map._reversed = false;
                            }
                            else
                                var mappings = colorMappings.rangeColorMapping;
                        }
                        for (var key = 0; key < mappings.length; key++) {
                            var colorMapping = mappings[key];
                            if (!colorMapping.hideLegend) {
                                var gradientCollection = [];
                                if (this.shapeSettings.enableGradient && !BoldBIDashboard.util.isNullOrUndefined(colorMapping.gradientColors)) {
                                    gradientCollection = this._generateGradientCollection(colorMapping.gradientColors);
                                }

                                var obj = {};
                                if (this.shapeSettings.enableGradient && !BoldBIDashboard.util.isNullOrUndefined(colorMapping.gradientColors)) {
                                    if (_isSVG) {
                                        var canvas = bbdesigner$("<canvas/>");
                                        var ctx = canvas[0].getContext("2d");
                                        var grd = ctx.createLinearGradient(0, 0, 300, 0);
                                        var temp = 0;
                                        for (var i = 0; i < 10; i++) {
                                            temp = temp + (1 / 10);
                                            if (i == 0 || colorMapping.gradientColors.length == 1) {
                                                grd.addColorStop(0, colorMapping.gradientColors[0]);
                                                grd.addColorStop(temp, gradientCollection[i]);
                                            } else if (i == gradientCollection.length - 1) {
                                                grd.addColorStop(temp - (1 / 10), gradientCollection[i]);
                                                grd.addColorStop(temp, colorMapping.gradientColors[1]);
                                            } else {
                                                grd.addColorStop(temp - (1 / 10), gradientCollection[i]);
                                                grd.addColorStop(temp, gradientCollection[i + 1]);
                                            }
                                        }
                                        ctx.fillStyle = grd;
                                        ctx.fillRect(0, 0, 300, 300);
                                        canvas.css({
                                            "height": _legendheight + "px",
                                            "width": (_legendwidth / mappings.length) + "px",
                                            "margin-left": xpos + "px",
                                            "margin-top": ypos + "px",
                                            "opacity": "0.9",
                                            "filter": "alpha(opacity=90)", /* For IE8 and earlier */
                                            "position": "absolute"
                                        });
                                        canvas.appendTo(map._legendDiv);
                                    } else {
                                        var legendID = "legend" + key;
                                        var legendHtmlString = '<v:rect id=' + legendID + ' display="block" style="position:absolute;top: ' + (ypos - 2) + 'px;left:' + xpos + 'px;width:' + (_legendwidth / mappings.length) + 'px;height:' + _legendheight + 'px;"><v:fill opacity="0.9px" type="gradient" method="linear sigma" angle="270"/><v:stroke opacity="0px"/></v:rect>';
                                        _legendgroup.innerHTML = _legendgroup.innerHTML + legendHtmlString;
                                        var legendelement = document.getElementById(legendID);
                                        legendelement.fillcolor = colorMapping.gradientColors[0];
                                        legendelement.fill.color2 = colorMapping.gradientColors[1];
                                    }
                                }
                                else {
                                    var rect = bbdesigner$("<div/>");
                                    rect.css({
                                        "height": _legendheight + "px",
                                        "width": _legendwidth / this.shapeSettings.colorMappings.rangeColorMapping.length + "px",
                                        "background-color": colorMapping.color,
                                        "margin-left": xpos + "px",
                                        "margin-top": ypos + "px",
                                        "opacity": "0.9",
                                        "filter": "alpha(opacity=90)",/* For IE8 and earlier */
                                        "position": "absolute"
                                    });

                                    if (_isSVG)
                                        rect.appendTo(legenddiv);
                                    else
                                        legenddiv.append(rect);
                                }

                                for (var i = 0; i < 10; i++) {
                                    obj = {};
                                    obj["marginLeft"] = xpos;
                                    this._legendRects.push(obj);
                                    xpos = xpos + (_legendwidth / mappings.length) / 10;
                                }
                                if (map.model.enableRTL && key == mappings.length - 2) {
                                    interactiveElement.css({ "margin-left": xpos + "px" });
                                }
                                if (this.legendSettings.showLabels) {
                                    var labelxpos = xpos - (_legendwidth / mappings.length);
                                    var labelypos = ypos - 25;
                                    var startlabel = this._createLabel((colorMapping.from), labelxpos, labelypos, 'e-legend-rangestartlabel');
                                    labelxpos = xpos;
                                    var endlabel = this._createLabel((colorMapping.to), labelxpos, labelypos);
                                    if (colorMapping.legendLabel != undefined)
                                        endlabel = this._createLabel((colorMapping.legendLabel), labelxpos - (colorMapping.legendLabel.length * 10) / 2, labelypos, 'e-legend-rangeendlabel', colorMapping);
                                    if (_isSVG) {
                                        if (colorMapping == mappings[0])
                                            startlabel.appendTo(legenddiv);
                                        endlabel.appendTo(legenddiv);
                                    }
                                    else {
                                        if (colorMapping == mappings[0])
                                            legenddiv.append(startlabel);
                                        legenddiv.append(endlabel);
                                    }
                                }
                            }
                        }

                        if (rightLabel != null && !this.legendSettings.showLabels) {
                            var textcon = this._createLabel(rightLabel, xpos + 10, ypos - 3, 'e-interactivelegend-rightlabel');
                            if (_isSVG)
                                textcon.appendTo(legenddiv);
                            else
                                legenddiv.append(textcon);
                            xpos = xpos + this.legendSettings.rightLabel.length * 10;
                        }

                        totalwidth = xpos + 10;
                        totalheight = ypos + _legendheight + 10;
                        map._legendSize = { width: totalwidth, height: totalheight };
                        if (baseLayer.legendSettings.dockOnMap) {
                            if (this.legendSettings.dockPosition == 'left')
                                map._marginleft = totalwidth;
                            else if (this.legendSettings.dockPosition == 'top')
                                map._margintop = totalheight;

                        }
                    }

                    if (!baseLayer.legendSettings.dockOnMap && this.legendSettings.position == 'none') {
                        var posx = (map._width * this.legendSettings.positionX) / 100;
                        var posy = (map._height * this.legendSettings.positionY) / 100;
                        legenddiv.css({ "margin-left": posx + "px", "margin-top": posy + "px" });

                    }
                    else if (!baseLayer.legendSettings.dockOnMap && (this.legendSettings.mode == BoldBIDashboard.datavisualization.Map.LegendMode.Interactive)) {
                        var position = (this.legendSettings.position == undefined) ? "topleft" : this.legendSettings.position;
                        var controlSize = { width: totalwidth, height: totalheight };
                        var navPos = map._getPosition(position, controlSize);
                        legenddiv.css({ "margin-left": navPos.x + "px", "margin-top": navPos.y });

                    }
                }




            }
        },

        _generateLabels: function (map) {

            var labeldiv = bbdesigner$("<div class='e-map-labelContainer'></div>");

            bbdesigner$(labeldiv).css({ "position": "absolute", "overflow": "scroll" });

            for (var dataIndex = 0; dataIndex < this._polygonData.length; dataIndex++) {

                var ValueObject = this._polygonData[dataIndex].properties;
                var labelValue = map._reflection(ValueObject, this.labelSettings.labelPath);
                var labelElement = bbdesigner$("<div class='e-map-label'></div>");
                bbdesigner$(labelElement).css({ "margin-top": dataIndex * 20, "position": "absolute" });
                labelElement[0].innerHTML = labelValue;
                labeldiv.append(labelElement);
                map._mapContainer.append(labeldiv);
                labelElement.mouseenter({ Param1: this, Param2: this._mapShapes[dataIndex], map: map }, map._polyEnterFunction);


                map._off(bbdesigner$(labelElement), BoldBIDashboard.eventType.mouseUp, map._polyClickFunction);
                if (this.model.enableRightClick)
                    map._off(bbdesigner$(labelElement), "contextmenu", map._polyClickFunction);
                map._on(bbdesigner$(labelElement), BoldBIDashboard.eventType.mouseUp, { Param1: this._mapShapes[dataIndex], Param2: this, Param3: this._mapShapes[dataIndex].shape }, map._polyClickFunction);
                if (this.model.enableRightClick)
                    map._on(bbdesigner$(labelElement), "contextmenu", { Param1: this._mapShapes[dataIndex], Param2: this, Param3: this._mapShapes[dataIndex].shape }, map._polyClickFunction);
            }

        },

        _calcWidth: function (text) {
            var span = bbdesigner$('<span  class="e-defaultLegendLabel">' + text + '</span>');
            bbdesigner$('body').append(span);
            var width = span.width() + 5;
            span.remove();
            return width;
        },
		
		_calcHeight: function(text){
			var ele = bbdesigner$('<div class ="e-defaultLegend-title" >' + text + '</div>');			
		    bbdesigner$('body').append(ele);
			var height = ele.height();
			ele.remove();
            return height;
		},
		
		_legendTextCalculation: function(legendIconPosition,key, xpos, ypos, map){	
            var columnCount = legendIconPosition.legendPosition[key].legendItems.legendSettings.columnCount;
			var iconWidth =  legendIconPosition.legendPosition[key].iconWidth;
			var labelXPos = !map.model.enableRTL ? columnCount == 0 && this.legendSettings.type == "layers" ? xpos + iconWidth + 10 :  this.legendSettings.type == "bubbles" ? legendIconPosition.highWidth + 10  : legendIconPosition.highWidth + 10 : xpos ;
			textHeight = this._calcHeight(legendIconPosition.legendPosition[key].legendLabel);
			textWidth = this._calcWidth(legendIconPosition.legendPosition[key].legendLabel);			
			ymidvalue = ((legendIconPosition.legendPosition[key].iconHeight/2) - (textHeight/2)) ; // to render the legend text in the mid of the icon height
			labelYAlterPos = ypos + ymidvalue ;
			var highTextValue = labelXPos + legendIconPosition.highTextWidth;			
			labelXAlterPos = legendIconPosition.highTextWidth <= textWidth ? labelXPos : highTextValue - textWidth; 
			return { labelTextXPos : labelXAlterPos, legendTextYPos: labelYAlterPos, MidYPos : ymidvalue, textWidth: textWidth ,textHeight: textHeight };
		},
		
		_highestIconValueCalculation: function(legendItems, index){
			var legendPosition;
			var label = legendItems.legendLabel;
			var legend = {
				iconWidth: legendItems.legendSettings.iconWidth,
				iconHeight: legendItems.legendSettings.iconHeight,
				highWidth: highWidth,
				highHeight: highHeight,
				legendItems: legendItems,
				textWidth : this._calcWidth(label),
				textHeight: this._calcHeight(label),
				highTextWidth: highTextWidth,
				legendLabel: label,
				colorMaplegendLabel: legendItems.colorMaplegendLabel
			};
							
			var highWidth, highHeight, highestIndex, textWidth, highTextWidth;						
			this._legendIconPosition.push(legend);	
			legendPosition = this._legendIconPosition;						
			highTextWidth = this._calcWidth(legendPosition[0].legendItems.legendLabel);
			highWidth = legendPosition[0].iconWidth;
			highHeight = legendPosition[0].iconHeight;
			for(var l=0;l<legendPosition.length;l++){
				if(highWidth < legendPosition[l].iconWidth)
					highWidth = legendPosition[l].iconWidth;											
				if(highHeight < legendPosition[l].iconHeight)
					highHeight = legendPosition[l].iconHeight;												
				if(highTextWidth < legendPosition[l].textWidth)
					highTextWidth = legendPosition[l].textWidth;				
			}
								
		return { highWidth: highWidth,
				 highHeight: highHeight, 														
				 highTextWidth: highTextWidth, legendPosition: legendPosition };
				
	},			
	

		_bubbleLegend: function(map, colorMapping, xpos, ypos, mappings, totalwidth, totalheight, _bubblelegendwidth, iconPosition, isRange){
			legendPosition = this._removeDuplicateItems(iconPosition.legendPosition);
			var midvalue = iconPosition.highWidth/2, legendText;							
			for(var key=0;key<legendPosition.length;key++){
				var textHeight = legendPosition[key].textHeight;
				var icw = legendPosition[key].iconWidth/2;
				if (!colorMapping.hideLegend) {
                        var rect = bbdesigner$("<div class='e-mapBubbleLegend' id='"+ map._id +"Legend_"+key+ "'" + "/>");							
						if(!map.model.enableRTL) {							
								xpos = midvalue - icw;
                                this._drawBubbleLegendIcon(legendPosition[key].legendItems, xpos, ypos, rect);
								legendText = this._legendTextCalculation(iconPosition, key, xpos, ypos,map);
								legendText.labelTextXPos = iconPosition.highWidth != legendPosition[key].iconWidth ? legendText.labelTextXPos : xpos + legendPosition[key].iconWidth + 10;
                                var textcon = this._createLabel(legendPosition[key].legendItems.legendLabel, legendText.labelTextXPos, legendText.legendTextYPos, 'e-legendlabeltext', key, map, iconPosition.legendPosition[key].legendPosition);
                        } else {
                            xpos = 10;								
							legendText = this._legendTextCalculation(iconPosition, key, xpos, ypos,map);	
                            var textcon = this._createLabel(legendPosition[key].legendItems.legendLabel, legendText.labelTextXPos, legendText.legendTextYPos, 'e-legendlabeltext', key, map, iconPosition.legendPosition[key].legendPosition);
                            xpos += iconPosition.highTextWidth;							
							xpos += midvalue - icw;
                            this._drawBubbleLegendIcon(legendPosition[key].legendItems, xpos, ypos, rect);
                        }							
                            //var textcon = this._createLabel(legendIconPosition[key].colorMapping.legendLabel, xpos + legendIconPosition[key].colorMapping.legendSettings.iconWidth + 5, ypos + ymidvalue, 'e-legendlabeltext',key, map, legendIconPosition[key].colorMapping);
                        if (legendPosition[key].legendItems.legendLabel != null) {
                            textcon[0].innerText = legendPosition[key].legendItems.legendLabel;
						} else {
                            legendPosition[key].legendItems.legendLabel = textcon[0].innerText = isRange ? legendPosition[key].legendItems.colorMapping.from : legendPosition[key].legendItems.colorMapping.value;
                        }
                        if (map._isSVG) {
                            rect.appendTo(map._legendDiv);
                            textcon.appendTo(map._legendDiv);
                        }
                        else {
                            bubblelegenddiv.append(rect);
                            bubblelegenddiv.append(textcon);
                        }
                        if (totalwidth < (textcon[0].innerText.length * 10) + _bubblelegendwidth)
                            totalwidth = (textcon[0].innerText.length * 10) + _bubblelegendwidth;                           
                            var rectHeight = rect.height();
                            if (textHeight > rectHeight) {
                                ypos += (textHeight + 5);
                            } else {
                                ypos += (rectHeight + 5 );
                            }
                }
			}
		},
		
		_removeDuplicateItems: function(items, mapObj){			
			var y =0;
			for(var z=0;z<items.length;z++){
				var value = items[z].legendLabel ? items[z].colorMaplegendLabel ? null : items[z].legendLabel : items[z][this.legendSettings.textPath];
				for(var x=0;x<items.length;x++){
					var value2 = items[x].legendLabel ? items[x].legendLabel : items[x][this.legendSettings.textPath];
					if(value == value2){
						y++;
						if(y>1){
							if(mapObj)							
								mapObj._duplicateItems.push(items[x]);
							items.splice(x, 1);
						}
					}
				}
				y=0;
			}			
			return items;
		},

        _generateBubbleLegends: function (map) {
            if (this.legendSettings.showLegend == undefined || this.legendSettings.showLegend) {
                var xpos = 10;
                var ypos = 10;
                var _bubblelegendheight = this.legendSettings.iconHeight,legendIconPosition = [];
                var _bubblelegendwidth = this.legendSettings.iconWidth, iconPosition;
				var titleHeight = this._calcHeight(this.legendSettings.title);
				var titleWidth = this._calcWidth(this.legendSettings.title);
				if (this.legendSettings.title != null && this.legendSettings.title != "") {										
					var text = titleText = this.legendSettings.title;
					var textcon = this._createLabel(text, 0, ypos, 'e-defaultLegend-title', 'title', map);
					textcon[0].title = titleText;					
					textcon.appendTo(map._legendDiv);					
					ypos += titleHeight + this.legendSettings.columnSpacing;
				}
                var bubblelegenddiv = bbdesigner$("<div/>");
                if (map._isSVG) {
                    bubblelegenddiv.appendTo(map._templateDiv);
                }
                else {
                    map._templateDiv.append(bubblelegenddiv);
                }
                var totalwidth = 0;
                var totalheight = 0;
                var isRange = true;
                var mappings = null;
				var iscolorPath = false;
				if (this.bubbleSettings.colorMappings != null) {
					if (this.bubbleSettings.colorMappings.rangeColorMapping != undefined) {
						mappings = this.bubbleSettings.colorMappings.rangeColorMapping;
					} else if (this.bubbleSettings.colorMappings.equalColorMapping != undefined) {
						mappings = this.bubbleSettings.colorMappings.equalColorMapping;
						isRange = false;
					}
				}
				else if (this.bubbleSettings.colorPath) {
                    mappings = this.dataSource;
                    isRange = false, iscolorPath = true;
                }
                if ((this.legendSettings.type == BoldBIDashboard.datavisualization.Map.LegendType.Bubbles) && (this.bubbleSettings.colorMappings != null || this.bubbleSettings.colorPath)
                   && (this.legendSettings.mode == undefined || this.legendSettings.mode == BoldBIDashboard.datavisualization.Map.LegendMode.Default || (this.legendSettings.mode == BoldBIDashboard.datavisualization.Map.LegendMode.Interactive
                   && this.bubbleSettings.colorMappings.equalColorMapping != null))) {
                    if (this.legendSettings.iconHeight == undefined)
                        this.legendSettings.iconHeight = 20;
                    if (this.legendSettings.iconWidth == undefined)
                        this.legendSettings.iconWidth = 20;
					
                    for (var key = 0; key < mappings.length; key++) {
						var legendsettings = bbdesigner$.extend(true, null, this.legendSettings);						
						if (!BoldBIDashboard.util.isNullOrUndefined(mappings[key].gradientColors)) {														
							var gradLength = mappings[key].gradientColors.length;
							var grad = "linear-gradient" + "(" + "to right" + ",";
							var x = mappings[key].gradientColors[0];
							for(var i=1;i<gradLength;i++)
								x += "," + mappings[key].gradientColors[i] ;												
							grad  = grad + x + ")";							
							mappings[key].color = grad;					
						}
					   
                       var colorMapping = {
                            fill: mappings[key]._bubblecolor ? mappings[key]._bubblecolor : mappings[key].color ? mappings[key].color : mappings[key][this.bubbleSettings.colorPath],
							colorMaplegendLabel: mappings[key].legendLabel != null ? true : false ,
                            legendLabel: mappings[key].legendLabel != null ? mappings[key].legendLabel : !isRange ? mappings[key].value != null ? mappings[key].value : mappings[key][this.legendSettings.textPath] : mappings[key].from,
                            dataSource: mappings[key],
                            legendSettings: legendsettings,
							
                        };
                        map._trigger("legendItemRendering", { model: map.model, data: colorMapping });						
						iconPosition = this._highestIconValueCalculation(colorMapping, key);													
                    }
					
					this._bubbleLegend(map, colorMapping, xpos, ypos, mappings, totalwidth, totalheight, _bubblelegendwidth, iconPosition, isRange);
                    totalheight = ypos;
					totalwidth = xpos + iconPosition.highWidth + iconPosition.highTextWidth + titleWidth;
                }
				map._legendDivHeight = this.legendSettings.height + titleHeight + this.legendSettings.columnSpacing;
                map._legendDivWidth = totalwidth;
                if (this.legendSettings.position == 'none') {
                    var posx = (map._width * this.legendSettings.positionX) / 100;
                    var posy = (map._height * this.legendSettings.positionY) / 100;
					if (map._legendDiv)
						 map._legendDiv.css({ "margin-left": posx + "px", "margin-top": posy + "px" });
                } else {
                    var position = (this.legendSettings.position == undefined) ? "topleft" : this.legendSettings.position;
                    var controlSize = { width: totalwidth, height: totalheight };
                    var navPos = map._getPosition(position, controlSize);
					if (map._legendDiv)
						map._legendDiv.css({ "margin-left": navPos.x + "px", "margin-top": navPos.y + "px" });
                }
            }

        },
		
		_drawBubbleLegendIcon: function (colorMapping, xpos, ypos, rect) {
		    if (
                colorMapping.legendSettings.icon == BoldBIDashboard.datavisualization.Map.LegendIcons.Circle) {
		        rect.css({
		            "height": colorMapping.legendSettings.iconHeight + "px",
		            "width": colorMapping.legendSettings.iconWidth + "px",
		            "border-radius": colorMapping.legendSettings.iconHeight / 2 + "px",					
						"background": colorMapping.fill,
		            "left": xpos + "px",
		            "top": ypos + "px",
		            "position": "absolute",
					"cursor": colorMapping.legendSettings.toggleVisibility ? "pointer" : "default"
		        });
		    }
		    else {
		        rect.css({
		            "height": colorMapping.legendSettings.iconHeight + "px",
		            "width": colorMapping.legendSettings.iconWidth + "px",
		            "background": colorMapping.fill,
		            "left": xpos + "px",
		            "top": ypos + "px",
		            "position": "absolute",
					"cursor": colorMapping.legendSettings.toggleVisibility ? "pointer" : "default"
		        });
		    }
		},

        _animateBubble: function (element, delayInterval) {
            var radius = element.getAttribute("r");
            var scaleVal;
            var bbdesigner$ele = bbdesigner$(element);
            var layer = this;
            bbdesigner$ele.delay(delayInterval).each(function () { }).animate(
                {
                    r: radius
                },
                {
                    duration: 700,

                    step: function (now) {
                        scaleVal = now;
                        if (_isSVG) {
                            bbdesigner$ele.attr("style", "display:block;" + layer.bubbleSettings.showTooltip ? "" : "pointer-events:stroke;");
                            bbdesigner$ele[0].setAttribute("r", scaleVal);
                        }
                        else {
                        }
                    },
                    complete: function () {
                        layer._bubbleCount++;
                        if (layer._bubbleCount == layer._bubbles.length) {
                            layer._setMapElements();
                        }
                    }
                }

            );
        },

        _setMapElements: function () {
            for (var key = 0; key < this._mapItems.length; key++) {
                var item = this._mapItems[key];
                bbdesigner$(item).css({ "display": "block" });
            }
        },

        _setMapItemsPositionWithAnimation: function (map) {
            this._bubbleCollection = [];
            for (var key = 0; key < this._bubbles.length; key++) {
                var bubble = this._bubbles[key];
                var bubblerad = this._bubbles[key].getAttribute('r');
                var position = this._bounds[key];
                var xpos = ((position.x + map._translatePoint.x) * map._scale);
                var ypos = ((position.y + map._translatePoint.y) * map._scale);

                var finalPosition = map.validateBubblePosition(position.points, { x: xpos, y: ypos }, bubblerad);

                var ubound = 20;
                var lbound = 0;
                var randomValue = Math.floor(Math.random() * (ubound - lbound) + lbound);
                var delayInterval = parseInt(randomValue * 50);
                if (_isSVG) {
                    bbdesigner$(bubble).attr({ "cx": finalPosition.x, "cy": finalPosition.y });
                }
                this._animateBubble(bubble, delayInterval);
                this._bubbleCollection.push(bubble);
            }
            for (var key = 0; key < this._mapMarkers.length; key++) {
                var item = this._mapMarkers[key];
                var marker;
                if (this.markers.length > 0) {
                    marker = this.markers[key];
                }
                var position;
                if (map._isTileMap) {
                    position = map._convertTileLatLongtoPoint(marker.latitude, marker.longitude);
                }
                else {
                    position = map._convertLatLongtoPointforMarker(marker.latitude, marker.longitude);
                }

                if (_isSVG) {
                    var xpos = position.x;
                }
                else {
                    var xpos = ((position.x + map._transformX) * map._scale);
                }
                var ypos = position.y;
                bbdesigner$(item).css({ "display": "block", "left": xpos, "top": ypos - 100 });
                bbdesigner$(item).delay(500).each(function () { }).animate({ "top": ypos }, 500);

            }
            for (var key = 0; key < this._mapItems.length; key++) {
                var item = this._mapItems[key];
                var position = this._bounds[boundsCount] == this._bounds[boundsCount-1] ? this._bounds[++boundsCount] : this._bounds[boundsCount];
                boundsCount++;
                var box = item[0].getBoundingClientRect();
                var xpos = ((position.x + map._translatePoint.x) * map._scale) - (box.width / 2);
                var ypos = ((position.y + map._translatePoint.y) * map._scale) - (box.height / 4);
                if (this._bubbles.length > 0)
                    bbdesigner$(item).css({ "left": xpos, "top": ypos, "display": "none" });
                else
                    bbdesigner$(item).css({ "left": xpos, "top": ypos, "display": "block" });

            }
            for (var key = 0; key < this._labelCollection.length; key++) {
                var item = this._labelCollection[key];
                var position = this._labelBounds[key];
                bbdesigner$(item).css("display", "block");
                var box = item[0].getBoundingClientRect();
                var boxwidth = _isSVG ? box.width : box.right - box.left;
                var boxheight = _isSVG ? box.height : box.bottom - box.top;
                var xpos = ((position.x + map._translatePoint.x) * map._scale) - (boxwidth / 2);
                var ypos = ((position.y + map._translatePoint.y) * map._scale) - (boxheight / 2);
                if (item[0].className = "smartLabelStyle") {
                    item[0].className = "labelStyle";
                    bbdesigner$(item[0]).css({ "pointer-events": "none", "position": "absolute" });
                }
                item[0].innerHTML = this._labelData[key];
                bbdesigner$(item).css({ "left": xpos, "top": ypos });

            }
            if (this.labelSettings != null && this.labelSettings.showLabels) {
                this._validateSmartLabel(map);
            }
        },
		
		_toggleLegendGradientColorMapping: function(mappings,index){
			var legendFillColor;			
			if (!BoldBIDashboard.util.isNullOrUndefined(mappings[index].gradientColors)) {														
				var gradLength = mappings[index].gradientColors.length;
				var grad = "linear-gradient" + "(" + "to right" + ",";
				var x = mappings[index].gradientColors[0];
				for(var i=1;i<gradLength;i++)
					x += "," + mappings[index].gradientColors[i] ;												
				grad  = grad + x + ")";							
				legendFillColor = grad;					
			}
			else
				legendFillColor = mappings[index].color;
			return legendFillColor;
		},
		
		_duplicateIndexValue: function(itemCollection, singleItem, mapObj, map){		
			var bindValue = map.legendSettings.textPath;
			var itemCollectionValue = mapObj._reflection(itemCollection,bindValue);
			var singleItemValue = mapObj._reflection(singleItem,bindValue);						
				if(itemCollectionValue == singleItemValue)					
					return { duplicate : true };							
			return { duplicate: false };
			
		},
		
		_toggle : function(map, e , mapObj, k, legendData, legendArgs, duplicate){
			var renderShape =  map._renderedShapes[k];
			var targetId = e.target.id;
			var mapIndex = renderShape.shapeIndex;					
			var targetIdLength = targetId.length;
			var targetPosition = targetId.indexOf('_'), 
			ID = parseFloat(targetId.substring((targetPosition + 1), targetIdLength)), indexValue, shapesId, bindValue;
			if(duplicate){						
				var duplicateIndexValue = this._duplicateIndexValue(map._renderedShapes[ID],mapObj._duplicateItems[k],mapObj, map);
				if(duplicateIndexValue.duplicate){						
					renderShape = mapObj._duplicateItems[k];
					mapIndex = renderShape.shapeIndex;
					k = ID;							
				}
				else
					return;						
			}
					
			// To get and bind the datasource color value 
			bindValue = map.legendSettings.type == "bubbles" ? map.bubbleSettings.colorPath : map.shapeSettings.colorPath;
			var shapeColorPath = renderShape;
			var DBFValue = mapObj._reflection(shapeColorPath, bindValue);
			var dbfCondition;
			if (DBFValue != null && (typeof DBFValue) == "string") {
				dbfCondition = DBFValue.toLowerCase();
			}
			//To get the map index and legend fill color value for legend type as layers in color mapping 
				if(map.shapeSettings.colorMappings != null && map.legendSettings.type == "layers"){
					if(renderShape.mapRangeShapeIndex != null){
							mapShapeColorMappingIndex = renderShape.mapRangeShapeIndex.index;
							indexValue = mapShapeColorMappingIndex;
							shapesId = '#'+ renderShape.shape.id;
							var shapeColor = renderShape.mapRangeShapeIndex.shapeColor;
							//get the legend fill color after toggle visibility
							var colorMapping = map.shapeSettings.colorMappings.rangeColorMapping || map.shapeSettings.colorMappings.equalColorMapping; 
							legendFillColor = this._toggleLegendGradientColorMapping(colorMapping, mapShapeColorMappingIndex);																	  
						}
					}
					//To get the map index and legend fill color value for legend type as bubbles in color mapping 
					else if(map.bubbleSettings.colorMappings != null && map.legendSettings.type == "bubbles"){
						if(renderShape.mapRangeBubbleIndex != null){
							mapBubbleColorMappingIndex = renderShape.mapRangeBubbleIndex.index;
							indexValue = mapBubbleColorMappingIndex;
							shapesId = '#'+ renderShape.shape.id + '_bubble_' + mapIndex;
							var colorMapping = map.bubbleSettings.colorMappings.rangeColorMapping || map.bubbleSettings.colorMappings.equalColorMapping; 
								//get the legend color after toggle visibility							
							legendFillColor = this._toggleLegendGradientColorMapping(colorMapping, mapBubbleColorMappingIndex);										  
						}
						
					}
					//To get the map index value and legend color for the legend type as layer
					else if(map.legendSettings.type == "layers"){
						indexValue = k;
						shapesId = '#'+ renderShape.shape.id;
						//get the legend color after toggle visibility
						legendFillColor =  map.shapeSettings.colorPath != null ? dbfCondition : map.shapeSettings.fill;	
					}
					//To get the map index value for the legend type as bubble
					else if(map.legendSettings.type == "bubbles"){
						indexValue = k;
						shapesId = '#'+ renderShape.shape.id + '_bubble_' + mapIndex;
						//get the legend color after toggle visibility
						legendFillColor =  map.bubbleSettings.colorPath != null ? dbfCondition : map.bubbleSettings.fill;
					}
					// In range color mapping and equal color mapping the given range does not match with map shapes or bubble shapes get the legend color value
					/*if((map.shapeSettings.colorMappings != null || map.bubbleSettings.colorMappings != null) && indexValue == null){
						indexValue = ID;
						mapIndex = null;
						var color = bbdesigner$('#' + targetId).css("background");
						if(renderShape._showBubble)
							this._legendFillColor = color;
						else 
							legendFillColor = this._legendFillColor; 
					}*/
					//target id matches with the map shapes/bubble shapes the legend has been hidden and the shapes has been hidden
					var LegendSelector = (targetId == mapObj._id + "Legend_" + indexValue || targetId == mapObj._id + "LegendText_" + indexValue);
					if(LegendSelector){
						mapObj._trigger("legendItemClick", legendArgs);
						if(!legendArgs.cancel && map.legendSettings.toggleVisibility)
						{
							//compare the target ID with bubble/layer type legend id and set the bubble/shapes visibility as hidden
							if((ID == indexValue) && renderShape._showBubble ){
								if(map.legendSettings.type == "bubbles"){
									bbdesigner$(shapesId).css({ "visibility": "hidden" });
								}
								else{
									bbdesigner$(shapesId).css({ "fill": map.shapeSettings.fill });
								}
								bbdesigner$('#'+ mapObj._id +'Legend_' + indexValue).css({ "background": "grey" });
								bbdesigner$('#'+ mapObj._id +'LegendText_' + indexValue).css({ "color": "grey" });
								bbdesigner$('#'+ mapObj._id +'labelStyle_' + mapIndex).css({ "visibility": "hidden" });
								renderShape._showBubble = false;
							}
							//compare the target ID with bubble/layer type legend id and set the bubble/shapes to visibile again
							else if((ID == indexValue) && !renderShape._showBubble){
								if(map.legendSettings.type == "bubbles"){
									bbdesigner$(shapesId).css({ "visibility": "visible" });
								}
								else if(map.shapeSettings.enableGradient && BoldBIDashboard.util.isNullOrUndefined(map.shapeSettings.colorMappings.equalColorMapping)){
									bbdesigner$(shapesId).css({ "fill": shapeColor });
								}
								else
								{
									bbdesigner$(shapesId).css({ "fill": legendFillColor });
								}
								bbdesigner$('#'+ mapObj._id +'Legend_' + indexValue).css( {"background": legendFillColor} );
								bbdesigner$('#'+ mapObj._id +'LegendText_' + indexValue).css( {"color": "black" });
								bbdesigner$('#'+ mapObj._id +'labelStyle_' + mapIndex).css({ "visibility": "visible" });
								renderShape._showBubble = true;
							}
													
						}
					}
			
		},
		
		_legendToggleVisibility: function(map, e, mapObj){
			var legendData = map.legendSettings;
			var legendArgs = { data : legendData, model: mapObj };
			if(map.dataSource != null){				
				var bubbleCount = map._renderedShapes.length, mapShapeColorMappingIndex, mapBubbleColorMappingIndex, legendFillColor;
				map._renderedShapes = (map.shapeSettings.colorMappings != null || map.bubbleSettings.colorMappings) ? map._renderedShapes : this._removeDuplicateItems(map._renderedShapes, mapObj);
				for(var k=0;k<map._renderedShapes.length;k++){
					map._toggle(map, e , mapObj, k, legendData, legendArgs);									
				}
				
				if(mapObj._duplicateItems.length > 0){					
					for(var z=0;z<mapObj._duplicateItems.length;z++){
						map._toggle(map, e , mapObj, z, legendData, legendArgs, true);									
					}
				}												
			}
		},
		
        _resizeShapes: function (map) {
            var thickness = this.shapeSettings.strokeThickness / map._scale;
            if (this._mapShapes != undefined) {
                for (var i = 0; i < this._mapShapes.length; i++) {
                    var element = this._mapShapes[i].shape;
                    if (_isSVG) {
                        if (element.localName == 'circle') {
                            element.setAttribute("r", this.shapeSettings.radius / map._scale);
                        }
                        if (this._contains(this._prevSelectedShapes, element)) {
                            element.setAttribute("stroke-width", this.shapeSettings.selectionStrokeWidth / map._scale);
                        } else {
                            element.setAttribute("stroke-width", thickness);
                        }
                    } else {
                        if (element.nodeName == 'oval') {

                        } else {
                            if (this._contains(this._prevSelectedShapes, element)) {
                                element.strokeweight = this.shapeSettings.selectionStrokeWidth / map._scale;
                            } else {
                                element.strokeweight = thickness;
                            }
                        }
                    }
                }
            }
        },

        _setMapItemsPosition: function (map) {
            this._bubbleCollection = [];
            if (this._mapItems != undefined) {
                for (var key = 0; key < this._mapItems.length; key++) {
                    var item = this._mapItems[key];
                    var position = this._bounds[key];
                    bbdesigner$(item).css({ "display": "block" });
                    var box = item[0].getBoundingClientRect();
                    var boxwidth = _isSVG ? box.width : box.right - box.left;
                    var boxheight = _isSVG ? box.height : box.bottom - box.top;
                    var xpos = ((position.x + map._translatePoint.x) * map._scale) - (boxwidth / 2);
                    var ypos = ((position.y + map._translatePoint.y) * map._scale) - (boxheight / 4);
                    bbdesigner$(item).css({ "left": xpos, "top": ypos });
                }
            }
            if (this._bubbles != undefined) {
                for (var key = 0; key < this._bubbles.length; key++) {
                    var bubble = this._bubbles[key];
                    var bubblerad = this._bubbles[key].getAttribute('r');
                    var position = this._bounds[key];
                    if (_isSVG) {
                        var xpos = ((position.x + map._translatePoint.x) * map._scale);
                        var ypos = ((position.y + map._translatePoint.y) * map._scale);

                        var finalPosition = map.validateBubblePosition(position.points, { x: xpos, y: ypos }, bubblerad);

                        bbdesigner$(bubble).attr({ "cx": finalPosition.x, "cy": finalPosition.y });
                    }
                    else {
                        bubble = document.getElementById(bubble.id);
                        var xpos = ((position.x + map._translatePoint.x) * map._scale);
                        var ypos = ((position.y + map._translatePoint.y) * map._scale);

                        var finalPosition = map.validateBubblePosition(position.points, { x: xpos, y: ypos }, bubblerad);

                        var bubbleTop = finalPosition.y - (bubble.getBoundingClientRect().bottom - bubble.getBoundingClientRect().top) / 2;
                        var bubbleLeft = finalPosition.x - (bubble.getBoundingClientRect().right - bubble.getBoundingClientRect().left) / 2;

                        bbdesigner$(bubble).css({
                            "left": bubbleLeft,
                            "top": bubbleTop
                        });
                    }
                    this._bubbleCollection.push(bubble);
                }
            }
            if (this._mapMarkers != undefined) {
                for (var key = 0; key < this._mapMarkers.length; key++) {
                    var item = this._mapMarkers[key];

                    var marker;
                    if (this.markers.length > 0) {
                        marker = this.markers[key];
                    }
                    var position;
                    if (map._isTileMap) {
                        position = map._convertTileLatLongtoPoint(marker.latitude, marker.longitude);
                    }
                    else {
                        position = map._convertLatLongtoPointforMarker(marker.latitude, marker.longitude);
                    }
                    var xpos = position.x;
                    var ypos = position.y;
                    bbdesigner$(item).css({ "left": xpos, "top": ypos });
                }
            }
            if (this._labelCollection != undefined) {
                for (var key = 0; key < this._labelCollection.length; key++) {
                    var item = this._labelCollection[key];
                    var position = this._labelBounds[key];
                    bbdesigner$(item).css("display", "block");
                    var box = item[0].getBoundingClientRect();
                    var boxwidth = _isSVG ? box.width : box.right - box.left;
                    var boxheight = _isSVG ? box.height : box.bottom - box.top;
                    var xpos = ((position.x + map._translatePoint.x) * map._scale) - (boxwidth / 2);
                    var ypos = ((position.y + map._translatePoint.y) * map._scale) - (boxheight / 2);
                    if (item[0].className = "smartLabelStyle") {
                        item[0].className = "labelStyle";
                        bbdesigner$(item[0]).css("background-color", "transparent");
                        bbdesigner$(item[0]).css({ "pointer-events": "none", "position": "absolute" });
                    }
                    item[0].innerHTML = this._labelData[key];
                    bbdesigner$(item).css({ "left": xpos, "top": ypos });

                }
            }
            if (this.labelSettings != null && this.labelSettings.showLabels) {
                this._validateSmartLabel(map);
            }
        },

        _validateSmartLabel: function (map) {
            this._smartLabels = [];
            var filledRects = [];
            if (this._labelCollection.length > 0) {
                for (var index = 0; index < this._mapShapes.length; index++) {
                    var shapemidPoint = this._labelBounds[index];
                    var midPoint = { x: (shapemidPoint.x + map._translatePoint.x) * map._scale, y: (shapemidPoint.y + map._translatePoint.y) * map._scale };

                    var rightMinPoint = { x: (shapemidPoint.rightMin.x + map._translatePoint.x) * map._scale, y: (shapemidPoint.rightMin.y + map._translatePoint.y) * map._scale };
                    var rightMaxPoint = { x: (shapemidPoint.rightMax.x + map._translatePoint.x) * map._scale, y: (shapemidPoint.rightMax.y + map._translatePoint.y) * map._scale };
                    var leftMinPoint = { x: (shapemidPoint.leftMin.x + map._translatePoint.x) * map._scale, y: (shapemidPoint.leftMin.y + map._translatePoint.y) * map._scale };
                    var leftMaxPoint = { x: (shapemidPoint.leftMax.x + map._translatePoint.x) * map._scale, y: (shapemidPoint.leftMax.y + map._translatePoint.y) * map._scale };

                    var labelElement = this._labelCollection[index];
                    if (midPoint.x > 0 && midPoint.x < map._width && midPoint.y > 0 && midPoint.y < map._height) {
                        var shape = this._mapShapes[index].shape;
                        var bounds = shape.getBoundingClientRect();
                        var flag = false;
                        var labelSize = labelElement[0].getBoundingClientRect();
                        var labelHeight = labelSize.height;
                        var labelWidth = labelSize.width;
                        if (!_isSVG) {
                            bounds = { width: (bounds.right * map._scale) - (bounds.left * map._scale), height: (bounds.bottom * map._scale) - (bounds.top * map._scale) };
                            labelHeight = labelSize.bottom - labelSize.top;
                            labelWidth = labelSize.right - labelSize.left;
                        }

                        var rightIntersect = false, leftIntersect = false;
                        if ((labelWidth / 2 > rightMinPoint.x - midPoint.x || labelWidth / 2 > rightMaxPoint.x - midPoint.x)
                            && (labelHeight / 2 > midPoint.y - rightMinPoint.y || labelHeight / 2 > rightMaxPoint.y - midPoint.y)) {
                            rightIntersect = true;
                        }
                        else if ((labelWidth / 2 > midPoint.x - leftMinPoint.x || labelWidth / 2 > midPoint.x - leftMaxPoint.x)
                            && (labelHeight / 2 > midPoint.y - leftMinPoint.y || labelHeight / 2 > leftMaxPoint.y - midPoint.y)) {
                            leftIntersect = true;
                        }

                        var leftPosition = 0;
                        var topPosition = 0;
                        var factor = 20;
                        var xArray = [];
                        var yArray = [];
                        if (labelHeight > bounds.height || labelWidth > bounds.width || (rightIntersect || leftIntersect)) {

                            if (this.labelSettings.enableSmartLabel) {
                                if (this.labelSettings.smartLabelSize == BoldBIDashboard.datavisualization.Map.LabelSize.Fixed) {
                                    labelHeight = 25;
                                    labelWidth = 15 * this.labelSettings.labelLength;
                                }
                                else {
                                    labelWidth *= 1.3;
                                    labelHeight = 25;
                                }
                                while (!flag) {
                                    if (factor > 400) {
                                        flag = true;
                                    }
                                    xArray = pushToArray(factor);
                                    yArray = xArray;
                                    for (var xIndex = 0; xIndex < xArray.length; xIndex++) {
                                        for (var yIndex = 0; yIndex < xArray.length; yIndex++) {
                                            leftPosition = yArray[yIndex];
                                            topPosition = xArray[xIndex];
                                            if (midPoint.x + leftPosition + labelWidth > map._width && midPoint.x < map._width) {
                                                leftPosition -= (midPoint.x + leftPosition + labelWidth) - map._width;
                                            }
                                            if (midPoint.x + leftPosition < 0) {
                                                leftPosition = 0;
                                            }
                                            if (midPoint.y + topPosition < 0) {
                                                topPosition = 0;
                                            }
                                            if (midPoint.y + topPosition + labelHeight > map._height && midPoint.y < map._height) {
                                                topPosition -= (midPoint.y + topPosition + labelHeight) - map._height;
                                            }
                                            var rect = { left: midPoint.x + leftPosition, top: midPoint.y + topPosition, height: labelHeight, width: labelWidth };
                                            if (isEmpty(rect)) {
                                                var ele = map._getIntersectedElements(rect, this._mapShapes);
                                                if (ele != null && ele.length == 0) {
                                                    flag = true;
                                                    xIndex = xArray.length;
                                                    yIndex = xArray.length;
                                                    labelElement[0].className = 'smartLabelStyle';
                                                    bbdesigner$(labelElement).css({ "pointer-events": "stroke", "position": "absolute" });

                                                    if (this.labelSettings.smartLabelSize == BoldBIDashboard.datavisualization.Map.LabelSize.Fixed) {
                                                        labelElement[0].innerHTML = labelElement[0].innerHTML.substring(0, this.labelSettings.labelLength);
                                                    }
                                                    labelElement.mouseenter({ Param1: this, Param2: this._mapShapes[index], map: map }, map._polyEnterFunction);
                                                    labelElement.mousemove({ Param1: this, Param2: this._mapShapes[index] }, map._polyMoveFunction);
                                                    bbdesigner$(labelElement).css({ left: midPoint.x + leftPosition, top: midPoint.y + topPosition, "background-color": _isSVG ? shape.getAttribute("fill") : shape.fillcolor.value });
                                                    filledRects.push(rect);
                                                    var labelObj = {};
                                                    labelObj["shape"] = shape;
                                                    labelObj["legend"] = labelElement;
                                                    this._smartLabels.push(labelObj);
                                                }
                                            }
                                        }
                                    }
                                    factor += 10;
                                }
                            } else {
                                var canExecute = true;
                                var minY = 0;
                                var maxY = 0;
                                var flag = true;

                                // Finding Minimum and Maximum Y position point calculation
                                for (var j = 0; j < shapemidPoint.points.length; j++) {
                                    var point = { x: (shapemidPoint.points[j].x + map._translatePoint.x) * map._scale, y: (shapemidPoint.points[j].y + map._translatePoint.y) * map._scale };
                                    if (flag) {
                                        minY = point.y;
                                        maxY = point.y;
                                        flag = false;
                                    }
                                    else {
                                        minY = Math.min(minY, point.y);
                                        maxY = Math.max(maxY, point.y);
                                    }
                                }

                                var heightfactor = Math.floor((maxY - minY) / labelHeight);
                                var shapePoints = [];

                                // Grouping points based on label height
                                for (var k = 0; k < heightfactor; k++) {
                                    var groupPoints = [];
                                    shapePoints.push(groupPoints);
                                }

                                for (var j = 0; j < shapemidPoint.points.length; j++) {
                                    var point = { x: (shapemidPoint.points[j].x + map._translatePoint.x) * map._scale, y: (shapemidPoint.points[j].y + map._translatePoint.y) * map._scale };
                                    var positionfactor = Math.floor((point.y - minY) / labelHeight);
                                    if (positionfactor > 0)
                                        positionfactor -= 1;
                                    var groupPoints = shapePoints[positionfactor];
                                    if (groupPoints == undefined)
                                        groupPoints = [];
                                    groupPoints.push({ x: point.x, y: point.y });
                                    shapePoints[positionfactor] = groupPoints;
                                }

                                // Finding minimum and maximum x point calculation 
                                for (var j = 0; j < shapePoints.length; j++) {
                                    var groupPoints = shapePoints[j];
                                    flag = true;
                                    var minX = 0, maxX = 0, top = 0;
                                    var leftPoints = [], rightPoints = [];

                                    for (var k = 0; k < groupPoints.length; k++) {
                                        if (flag) {
                                            minX = groupPoints[k].x;
                                            maxX = groupPoints[k].x;
                                            top = groupPoints[k].y;
                                            flag = false;
                                        }
                                        else {
                                            minX = Math.min(minX, groupPoints[k].x);
                                            maxX = Math.max(maxX, groupPoints[k].x);
                                            if (groupPoints[k].x == maxX)
                                                top = groupPoints[k].y;
                                        }
                                        if (groupPoints[k].x < midPoint.x)
                                            leftPoints.push(groupPoints[k].x);
                                        if (groupPoints[k].x > midPoint.x)
                                            rightPoints.push(groupPoints[k].x);
                                    }

                                    if (bounds.left < map._mapContainer[0].getBoundingClientRect().left + 1) {
                                        minX = map._mapContainer[0].getBoundingClientRect().left + 1 - bounds.left;
                                        leftPoints.push(minX);
                                    }

                                    //  Checking intersection of points with label.
                                    var intersect = false;
                                    for (var k = 0; k < leftPoints.length; k++) {
                                        if (maxX - leftPoints[k] < labelWidth + 1) {
                                            intersect = true;
                                            break;
                                        }
                                    }
                                    if (!intersect) {
                                        for (var k = 0; k < rightPoints.length; k++) {
                                            if (rightPoints[k] - minX < labelWidth + 1) {
                                                intersect = true;
                                                break;
                                            }
                                        }
                                    }
                                    if (maxX - minX > labelWidth + 1 && !intersect) {
                                        labelElement.css("left", bounds.left * map._scale + (minX - bounds.left * map._scale) + (maxX - minX) / 2 - labelWidth / 2 + "px");
                                        labelElement.css("top", top + "px");
                                        if (maxY - top < labelHeight)
                                            labelElement.css("top", top - labelHeight + "px");
                                        canExecute = false;
                                        break;
                                    }
                                }
                                if (canExecute)
                                    labelElement.css("display", "none");
                            }
                        }
                    }
                }
            }

            function pushToArray(value) {
                var array = [];
                array.push(0);
                for (var j = 10; j <= value; j += 20) {
                    array.push(-j);
                    array.push(j);
                }

                return array;
            }

            function isEmpty(rect) {
                for (var i = 0; i < filledRects.length; i++) {
                    if (isIntersect(rect, filledRects[i]))
                        return false;
                }
                return true;
            }

            function isIntersect(rect1, rect2) {

                if (rect1.left - 2 >= (rect2.left + rect2.width) || rect1.left - 2 + rect1.width <= rect2.left - 2 ||
                    rect1.top - 2 >= rect2.top + rect2.height || rect1.top + rect1.height <= rect2.top - 2) {
                    return false;
                }
                return true;
            }


        },
		
		_fillIndividualColors: function (item, shape, shapeSettings, map, isBubble, shapePropertyData) {
            var eventArgs = { fill: item[shapeSettings.colorPath], stroke: shapeSettings.stroke, strokeThickness: shapeSettings.strokeThickness, shapeData: item, shapeProperties: shapePropertyData };
            map._trigger("shapeRendering", { model: map.model, data: eventArgs });
            if (eventArgs.fill != item[shapeSettings.colorPath] || eventArgs.fill == null) {
                eventArgs.fill = eventArgs.fill == null ? shapePropertyData[shapeSettings.colorPath] ? shapePropertyData[shapeSettings.colorPath] : shapeSettings.fill : eventArgs.fill;
                item._color = eventArgs.fill;
            }
            if (map._isSVG) {
                shape.setAttribute('fill', eventArgs.fill);
                shape.setAttribute('stroke', eventArgs.stroke);
                shape.setAttribute('stroke-width', eventArgs.strokeThickness);
            }
            else {
                shape.fillcolor = eventArgs.fill;
                shape.strokecolor = eventArgs.stroke;
                shape.strokeweight = eventArgs.strokeThickness;
            }
            shape.highlightcolor = shape.highlightcolor;
        },

        _fillColors: function (value, colorMapping, shape, mapObject, item, shapePropertyData, isBubble) {

            if (colorMapping != null && colorMapping.rangeColorMapping != null) {

                this._fillRangeColors(value, colorMapping.rangeColorMapping, shape, mapObject, isBubble, item, shapePropertyData);
            }
            else if (colorMapping != null && colorMapping.equalColorMapping != null) {
                this._fillEqualColors(value, colorMapping, shape, shapePropertyData, isBubble, item);
            }
			else if (this.shapeSettings.colorPath != null || this.bubbleSettings.colorPath != null){
				var propertySettings = isBubble ?  this.bubbleSettings : this.shapeSettings;
                this._fillIndividualColors(item, shape, propertySettings, mapObject, isBubble, shapePropertyData);
			}
        },

        _fillEqualColors: function (value, colorMapping, shape, shapePropertyData, isBubble, item) {
            var layer = this,_RangeShapes ,mapRangeShapeIndex;
            bbdesigner$.each(colorMapping.equalColorMapping, function (index, gValue) {			
                if (gValue.value == value || layer._checkColorMapProperty(layer, shapePropertyData, colorMapping, gValue, value)) {
					if (!isBubble){                        
						rangeShapes = {index : index};
                        item.mapRangeShapeIndex = rangeShapes;
					}
                    else{                        
						rangeBubbles = {index : index};
                        item.mapRangeBubbleIndex = rangeBubbles;
					}
                    if (_isSVG) {
                        shape.setAttribute("fill", gValue.color);
                    }
                    else {
                        shape.fillcolor = gValue.color;
                    }
                    shape.highlightcolor = gValue.highlightcolor;
                }
            });
        },

        isArray: function (array) {
            if (!Array.isArray) {
                Array.isArray = function (arg) {
                    return Object.prototype.toString.call(arg) === '[object Array]';
                };
            }
            return Array.isArray(array);
        },

        _checkAlternateDataPath: function (dataSource, altPath, cmpValue) {
            var altData, data;
            if (altPath && this.isArray(altPath))
                return this._compareArrayWithValue(altPath, cmpValue);
            else if (typeof altPath === 'string' || altPath instanceof String) {
                var altData = dataSource[altPath];
                if (altData && this.isArray(altData))
                    return this._compareArrayWithValue(altData, cmpValue);
                else if (altData != null) {
                    altData = altData.split(",");
                    for (var i = 0; i < altData.length; i++) {
                        data = dataSource[altData[i]];
                        if (data && this._checkString(data, cmpValue))
                            return true;
                    }
                    return false;
                }
            }
        },

        _checkColorMapProperty: function (layer, shapePropertyData, colorMap, colorValue, cmpValue) {
            return this._checkString(shapePropertyData[layer.shapePropertyPath], colorValue.value)
                    || (colorValue.alternateValues && this._checkAlternateDataPath(colorValue, "alternateValues", cmpValue))
                     || (colorValue.alternatePropertyValues && this._checkAlternatePropertyPath(shapePropertyData, colorValue.alternatePropertyValues, colorValue.value));
        },

        _checkString: function (value1, value2, caseSensitive) {
            if (caseSensitive)
                return value1 === value2;
            return value1 != null && value2 != null && value1.toString().toLowerCase() === value2.toString().toLowerCase();
        },

        _checkAlternatePropertyPath: function (properties, altPath, cmpValue) {
            var altData, j, data;
            if (this.isArray(altPath))
                return this._compareArrayWithValue(altPath, cmpValue);
            else if (typeof altPath === 'string' || altPath instanceof String) {
                altData = altPath.split(',');
                for (j = 0; j < altData.length; j++) {
                    data = properties[altData[j]]
                    if (data && this._checkString(data, cmpValue))
                        return true;
                }
            }
            return false;
        },

        _compareArrayWithValue: function (array, value) {
            if (this.isArray(array))
                for (var i = 0; i < array.length; i++)
                    if (this._checkString(array[i], value))
                        return true;
        },

        _checkAlternatePath: function (layer, shapeData, cmpValue, shapeSource) {
            var altPath = layer.alternateDataPath, altDataPath = layer.shapeDataPath,
                data = layer.dataSource, property = layer.alternatePropertyPath, i;
            for (i = 0; i < data.length; i++)
                if (this._checkAlternateDataPath(data[i], altPath, cmpValue)
                    || this._checkAlternatePropertyPath(shapeData, property, data[i][altDataPath]))
                    return i;
            return false;
        },
		
		_colorNameToHex: function (colour) {
            var color = colour;
            var colours = {
                "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
                "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
                "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
                "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
                "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
                "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
                "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
                "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
                "honeydew": "#f0fff0", "hotpink": "#ff69b4",
                "indianred ": "#cd5c5c", "indigo ": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
                "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
                "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
                "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
                "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
                "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
                "navajowhite": "#ffdead", "navy": "#000080",
                "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
                "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
                "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
                "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
                "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
                "violet": "#ee82ee",
                "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
                "yellow": "#ffff00", "yellowgreen": "#9acd32"
            };

            if (Object.prototype.toString.call(color) == '[object Array]')
                return color;

            if (typeof colours[color.toLowerCase()] != 'undefined')
                return colours[color.toLowerCase()];

            return color;
        },

        _updateLegendRange: function (value, shapelayer, shape, item) {
            var colormapping = shapelayer.shapeSettings.colorMappings.rangeColorMapping;
            for (var index = 0; index < colormapping.length; index++) {
                var gradientCollection = null;
                var mapping = colormapping[index];
                if (shapelayer.shapeSettings.enableGradient && !BoldBIDashboard.util.isNullOrUndefined(mapping.gradientColors)) {
                   gradientCollection = this._generateGradientCollection(mapping.gradientColors);
                }
                if (value >= mapping.from && value <= mapping.to) {
                    var minValue = index;					
                    if (index != 0)
                        minValue = index * 10;
					var rangeShapes = {index : index , color : mapping.color, shapeColor : null};
					    item.mapRangeShapeIndex = rangeShapes;
                    var minRange = mapping.from;
                    var maxRange = mapping.from + ((mapping.to - mapping.from) / 10);
                    for (var i = minValue; i < minValue + 10; i++) {
                        if (value >= minRange && value <= maxRange) {
                            var obj = {};
                            var shapeOpacity = this._getColorRatio(0.7, 1, value, mapping.from, mapping.to);
                            if (shapelayer._legendRects[i] != undefined)
                                obj = shapelayer._legendRects[i];
                            if (shapelayer.shapeSettings.enableGradient && !BoldBIDashboard.util.isNullOrUndefined(mapping.gradientColors)) {
                                if (index != 0) {
                                    obj["color"] = gradientCollection[i - index * 10];
                                } else {
                                    obj["color"] = gradientCollection[i];
                                }
                                
                            } else
                                obj["color"] = mapping.color;
                            bbdesigner$(shape).css({ "opacity": shapeOpacity });
							rangeShapes.shapeColor = obj["color"];
                            return obj;
                        }
                        minRange = maxRange;
                        maxRange = maxRange + ((mapping.to - mapping.from) / 10);
                    }
                }
            }
        },

        _fillRangeColors: function (value, colormapping, shape, mapObject, isBubble, item, shapePropertyData) {
          var rangeShapes , mapRangeShapeIndex, rangeBubbles, mapRangeBubbleIndex, eventArgs, shapeOpacity;
            for (var index = 0; index < colormapping.length; index++) {
                var mapping = colormapping[index];
				if (!BoldBIDashboard.util.isNullOrUndefined(mapping.gradientColors)) {
                   gradientCollection = this._generateGradientCollection(mapping.gradientColors);
                }
                if (value >= mapping.from && value <= mapping.to) {
                    //var shapeOpacity = this._getColorRatio(0.7, 1, value, mapping.from, mapping.to);
					var minValue = index;
                    if (index != 0)
                        minValue = index * 10;
					var minRange = mapping.from;
					var DiffValue = Math.ceil((mapping.to - mapping.from) / 10);
                    var maxRange = mapping.from + DiffValue;
                    for (var i = minValue; i < minValue + 10; i++) {
                        if (value >= minRange && value <= maxRange) {
                            if(isBubble && !BoldBIDashboard.util.isNullOrUndefined(mapping.gradientColors))
								shapeOpacity = this._getColorRatio(0.7, 1, value, mapping.from, mapping.to);
							else
								shapeOpacity =  this.bubbleSettings.bubbleOpacity;
							eventArgs = { from: mapping.from, to: mapping.to, fill: mapping.color, value: value, bubbleOpacity: this.bubbleSettings.bubbleOpacity ,shapeData: item, shapeProperty: shapePropertyData };                                           
							if (!isBubble) {
                        rangeShapes = {index : index , color : mapping.color};
					    item.mapRangeShapeIndex = rangeShapes;
						mapObject._trigger("shapeRendering", { model: mapObject.model, data: eventArgs });
                    }
                    else{                        
                        rangeBubbles = {index : index , color : mapping.color, isBubble: isBubble};
						item.mapRangeBubbleIndex = rangeBubbles;
						mapObject._trigger("bubbleRendering", { model: mapObject.model, data: eventArgs });
                    }
                            if (!BoldBIDashboard.util.isNullOrUndefined(mapping.gradientColors)) {
                                if (index != 0) {
                                    mapping.color = gradientCollection[i - index * 10];
                                } else {
                                    mapping.color = gradientCollection[i];
                                }
                                
                            } 
							if (_isSVG) {
								shape.setAttribute("fill", mapping.color);
							}
							else {
								shape.fillcolor = mapping.color;
							}							
							shape.highlightcolor = mapping.highlightcolor;
                            bbdesigner$(shape).css({ "opacity": shapeOpacity });
                        }
                        minRange = maxRange;
                        maxRange = maxRange + DiffValue;
                    }
                }
            }
			return mapping.color;
        },

        _getColorRatio: function (min, max, value, minValue, maxValue) {
            var percent = (100 / (maxValue - minValue)) * (value - minValue);
            var colorCode = (((parseFloat(max) - parseFloat(min)) / 100) * percent) + parseFloat(min);
            return colorCode;
        }

    };

    bbdesigner$.fn.pinchZoom = function (rootgroup, map) {

        var stateOrigin,
                    stateTf,
                    root = this[0],
                    startTouches = [],

           getTouchEventPoint = function (evt) {

               var p = root.createSVGPoint(),
                   targetTouches = evt.targetTouches,
                   offsetX,
                   offsetY;

               if (targetTouches.length) {
                   var touch = targetTouches[0];
                   offsetX = touch.pageX;
                   offsetY = touch.pageY;
               }

               p.x = offsetX;
               p.y = offsetY;

               return p;
           };

        handleTouchStart = function (evt) {
            var g = rootgroup;
            stateTf = g.getCTM().inverse();
            stateOrigin = getTouchEventPoint(evt).matrixTransform(stateTf);
            var touches = evt.touches;
            if (touches.length >= 2) {
                for (var i = 0; i < touches.length; i++) {
                    var touch = touches[i]
                      , found = false;
                    for (var j = 0; j < startTouches.length; j++) {
                        var startTouch = startTouches[j];
                        if (touch.identifier === startTouch.identifier) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        var touchCopy = bbdesigner$.extend({}, touch);
                        startTouches.push(touchCopy);
                    }
                }
            }

            evt.preventDefault();
        };

        getDistance = function (touch1, touch2) {
            var x = touch2.pageX - touch1.pageX,
                y = touch2.pageY - touch1.pageY;
            return Math.sqrt((x * x) + (y * y));
        };

        setCTM = function (element, matrix) {
            var isZoomIn = null;
            var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
            if (matrix.a > map._baseScale && map.enableZoom() && map.enablePan()) {
                if (matrix.a > map._scale) {
                    isZoomIn = true;
                }
                else if (matrix.a < map._scale) {
                    isZoomIn = false;
                }
                map._scale = matrix.a;
                map._translatePoint.x = matrix.e / matrix.a;
                map._translatePoint.y = matrix.f / matrix.a;
                map._applyTransform(map._scale, map._translatePoint);
                map.zoomLevel(map._scale - map._baseScale + 1);
                if (isZoomIn != null && isZoomIn) {
                    map._trigger("zoomedIn", { originalEvent: null, zoomLevel: map.zoomLevel() });
                    map._updateSliderValue(false);
                    map._resizeShape();
                }
                else if (isZoomIn != null) {
                    map._trigger("zoomedOut", { originalEvent: null, zoomLevel: map.zoomLevel() });
                    map._updateSliderValue(false);
                    map._resizeShape();
                }
                map._isDragging = true;
                map._refrshLayers();
            }

        };

        handleTouchEnd = function (evt) {
            var changedTouches = evt.changedTouches;
            for (var i = 0; i < changedTouches.length; i++) {
                var changedTouch = changedTouches[i];
                for (var j = 0; j < startTouches.length; j++) {
                    var startTouch = startTouches[j];
                    if (startTouch.identifier === changedTouch.identifier) {
                        var idx = startTouches.indexOf(startTouch);
                        startTouches.splice(idx, 1);
                    }
                }
            }
        };

        updateTouch = function (dstTouch, srcTouch) {
            dstTouch.pageX = srcTouch.pageX;
            dstTouch.pageY = srcTouch.pageY;
        };

        handleTouchMove = function (evt) {
            evt.preventDefault();

            var g = rootgroup,
                touches = evt.touches,
                z,
                p,
                k;

            if (touches.length >= 2) {
                var touch0 = touches[0]
                  , touch1 = touches[1]
                  , startTouch0 = startTouches[0]
                  , startTouch1 = startTouches[1];
                z = getDistance(touch0, touch1) / getDistance(startTouch0, startTouch1);
                p = root.createSVGPoint();
                p.x = (touch0.pageX + touch1.pageX) / 2;
                p.y = (touch0.pageY + touch1.pageY) / 2;
                p = p.matrixTransform(g.getCTM().inverse());
                k = root.createSVGMatrix().translate(p.x, p.y).scale(z).translate(-p.x, -p.y);
                setCTM(g, g.getCTM().multiply(k));
                if (typeof stateTf === "undefined") {
                    stateTf = g.getCTM().inverse();
                }
                stateTf = stateTf.multiply(k.inverse());
                updateTouch(startTouch0, touch0);
                updateTouch(startTouch1, touch1);
            } else if (!startTouches.length) {
                p = getTouchEventPoint(evt).matrixTransform(stateTf);
                setCTM(g, stateTf.inverse().translate(p.x - stateOrigin.x, p.y - stateOrigin.y));
            }
        };
        this[0].addEventListener('touchstart', handleTouchStart, false);
        this[0].addEventListener('touchend', handleTouchEnd, false);
        this[0].addEventListener('touchmove', handleTouchMove, false);


    };

    bbdesigner$.uaMatch = function (ua) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];

        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };

    BoldBIDashboard.datavisualization.Map.LayerType = {
        Geometry: "geometry",
        OSM: "osm",
        Bing: "bing"
    };

    BoldBIDashboard.datavisualization.Map.LegendIcons = {
        Rectangle: "rectangle",
        Circle: "circle"
    };

    BoldBIDashboard.datavisualization.Map.LabelSize = {
        Fixed: "fixed",
        Default: "default"
    };

    BoldBIDashboard.datavisualization.Map.LegendMode = {
        Default: "default",
        Interactive: "interactive"
    };

    BoldBIDashboard.datavisualization.Map.BingMapType = {
        Aerial: "aerial",
        AerialWithLabel: "aerialwithlabel",
        Road: "road",
    };

    BoldBIDashboard.datavisualization.Map.GeometryType = {
        Normal: "normal",
        Geographic: "geographic"

    };

    BoldBIDashboard.datavisualization.Map.SelectionMode = {
        Default: "default",
        Multiple: "multiple"
    };

    BoldBIDashboard.datavisualization.Map.ColorPalette = {
        Palette1: "palette1",
        Palette2: "palette2",
        Palette3: "palette3",
        CustomPalette: "custompalette"
    };

    BoldBIDashboard.datavisualization.Map.LegendType = {
        Layers: "layers",
        Bubbles: "bubbles"
    }

    BoldBIDashboard.datavisualization.Map.Position = {
        None: "none",
        TopLeft: "topleft",
        TopCenter: "topcenter",
        TopRight: "topright",
        CenterLeft: "centerleft",
        Center: "center",
        CenterRight: "centerright",
        BottomLeft: "bottomleft",
        BottomCenter: "bottomcenter",
        BottomRight: "bottomright"
    }

    BoldBIDashboard.datavisualization.Map.DockPosition = {
        Top: "top",
        Bottom: "bottom",
        Right: "right",
        Left: "left"
    };
    BoldBIDashboard.datavisualization.Map.Alignment = {

        Near: "near",
        Center: "center",
        Far: "far"
    };

    BoldBIDashboard.datavisualization.Map.LabelOrientation = {
        Horizontal: "horizontal",
        Vertical: "vertical"
    };

})(bbdesigner$, SyncfusionBoldBIDashboard);
;