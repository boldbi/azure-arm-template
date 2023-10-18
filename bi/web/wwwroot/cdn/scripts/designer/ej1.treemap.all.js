/*!
*  filename: ej1.treemap.all.js
*  version : 6.15.11
*  Copyright Syncfusion Inc. 2001 - 2023. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
*/

/**
* @fileOverview Plugin to style the Html TreeMap elements
* @copyright Copyright SyncfusionBoldBIDashboard Inc. 2001 - 2013. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
* @version 12.1 
* @author &lt;a href="mailto:licensing@syncfusion.com"&gt;SyncfusionBoldBIDashboard Inc&lt;/a&gt;
*/
(function (bbdesigner$, BoldBIDashboard, undefined) {
   
    BoldBIDashboard.widget("BoldBIDashboardTreeMap", "BoldBIDashboard.datavisualization.TreeMap", {

        validTags: ["div"],

        defaults: {           
			colorPath: null,
            legendItemRendering: null,
			itemRendering: null,
            leafItemSettings: {               
                borderThickness: 1,               
                borderBrush: "white",
                showLabels: false,
                labelPath: null,
                gap:0,
                itemTemplate: null,
                labelPosition: "topleft",
                labelVisibilityMode: "visible"
            },
            dataSource: null,
            groupColorMapping:[],			
            enableDrillDown: false,
            enableDrillDownArrow: true,
            isVirtualRender: false,
            drillDownLevel:0,
			drillDownDataValue:null,
			drilledStateLevel:0,
            drillDownHeaderColor: null,
            drillDownSelectionColor: '#000000',          			
            colorValuePath: null,
			fill:"gray",
            weightValuePath: null,			
            treeMapItems: [],
            showLegend: false,
			showSubItems: true,
            borderBrush: "white",
            borderThickness: 1,
            enableResize: true,
			enableGradient: false,
            isResponsive: true,
            itemsLayoutMode: "squarified",						
            levels: [],
            doubleClick: "",
            click: "",
                       
           legendSettings: {
                template: "",
                iconHeight: 15,
                iconWidth: 15,
                height: 0,
                width: 0,
				textPath: null,
                mode: "default",
                leftLabel: "",
                rightLabel: "",
                dockPosition: "top",
                alignment: "near",
				toggleVisibility:false,
                columnCount: 0
            },         			         
            rangeColorMapping: [],

            uniColorMapping: { 			
                color: null 
            },
			            
            desaturationColorMapping: { 				            
                from:0, 				               
                to:0,				              
                color: "",								
                rangeMinimum:0,				
                rangeMaximum:0
            },

            paletteColorMapping: {                
                colors:[], 
            },            
            highlightOnSelection: false,			           
			selectionMode: "default",		
            highlightGroupOnSelection: false,
			groupSelectionMode: "default",
			draggingOnSelection: false,
			draggingGroupOnSelection: false,
            showTooltip: false,
            tooltipTemplate: null,
            highlightBorderThickness: 5,
            highlightGroupBorderThickness: 4,
            highlightBorderBrush: "gray",
            highlightGroupBorderBrush: "gray"

        },
        
        dataTypes: {
            dataSource: "data",
            treeMapItems: "array",
            levels: "array",
            rangeColorMapping: "array",
            paletteColorMapping: "object",
            groupColorMapping: "array"
        },
		
        observables: ["dataSource",
              "colorValuePath",
              "weightValuePath",
              "showLegend",
              "enableResize",
              "highlightOnSelection",
			  "selectionMode",
			  "groupSelectionMode",
             "highlightGroupOnSelection",
             "enableDrillDown",
              "drillDownHeaderColor",
             "drillDownSelectionColor",
             "showTooltip",
             "highlightBorderThickness",
             "highlightBorderBrush",
               "itemsLayoutMode",
              "leafItemSettings.borderThickness",
              "leafItemSettings.borderBrush",
              "leafItemSettings.showLabels",
              "leafItemSettings.labelPath",
              "legendSettings.iconWidth",
              "legendSettings.iconHeight",
			  "legendSettings.textPath",
              "legendSettings.dockPosition",
              "legendSettings.height",
              "legendSettings.width",
              "uniColorMapping.color",
              "desaturationColorMapping.from",
              "desaturationColorMapping.to",
              "desaturationColorMapping.color",
              "desaturationColorMapping.rangeMinimum",
              "desaturationColorMapping.rangeMaximum"              
        ],
        _tags: [
            {
                tag: "levels",
                attr: ["groupPath", "groupGap", "headerHeight", "showHeader", "groupPadding", "groupBackground", "groupBorderColor", "groupBorderThickness"],
                singular: "level"
            },
            {
                tag: "rangeColorMapping",
                attr: ["color", "legendLabel", "from", "to"],
                singular: "rangeColor"
            },           
            {
                tag: "groupColorMapping",
                attr: ["groupID",
            {
                tag: "groupColorMapping.rangeColorMapping",
                attr: ["color", "legendLabel", "from", "to"],
                singular: "groupRangeColor"
            },            

              "uniColorMapping.color",
              "desaturationColorMapping.from",
              "desaturationColorMapping.to",
              "desaturationColorMapping.color",
              "desaturationColorMapping.rangeMinimum",
              "desaturationColorMapping.rangeMaximum"
                ],
                singular: "groupColor"
            }

        ],

        dataSource: BoldBIDashboard.util.valueFunction("dataSource"),
        colorValuePath: BoldBIDashboard.util.valueFunction("colorValuePath"),
		colorPath: BoldBIDashboard.util.valueFunction("colorPath"),
        weightValuePath: BoldBIDashboard.util.valueFunction("weightValuePath"),
        showLegend: BoldBIDashboard.util.valueFunction("showLegend"),
        enableResize: BoldBIDashboard.util.valueFunction("enableResize"),
        highlightOnSelection: BoldBIDashboard.util.valueFunction("highlightOnSelection"),
		selectionMode:BoldBIDashboard.util.valueFunction("selectionMode"),
        highlightGroupOnSelection: BoldBIDashboard.util.valueFunction("highlightGroupOnSelection"),
		groupSelectionMode:BoldBIDashboard.util.valueFunction("groupSelectionMode"),
        enableDrillDown: BoldBIDashboard.util.valueFunction("enableDrillDown"),
        enableDrillDownArrow: BoldBIDashboard.util.valueFunction("enableDrillDownArrow"),
        drillDownHeaderColor: BoldBIDashboard.util.valueFunction("drillDownHeaderColor"),
        drillDownSelectionColor: BoldBIDashboard.util.valueFunction("drillDownSelectionColor"),
        showTooltip: BoldBIDashboard.util.valueFunction("showTooltip"),
        highlightBorderThickness: BoldBIDashboard.util.valueFunction("highlightBorderThickness"),
        itemsLayoutMode: BoldBIDashboard.util.valueFunction("itemsLayoutMode"),
        highlightBorderBrush: BoldBIDashboard.util.valueFunction("highlightBorderBrush"),
        borderThickness: BoldBIDashboard.util.valueFunction("leafItemSettings.borderThickness"),
        borderBrush: BoldBIDashboard.util.valueFunction("leafItemSettings.borderBrush"),
        showLabels: BoldBIDashboard.util.valueFunction("leafItemSettings.showLabels"),
        labelPath: BoldBIDashboard.util.valueFunction("leafItemSettings.labelPath"),
        iconWidth: BoldBIDashboard.util.valueFunction("legendSettings.iconWidth"),
        iconHeight: BoldBIDashboard.util.valueFunction("legendSettings.iconHeight"),
		textPath: BoldBIDashboard.util.valueFunction("legendSettings.textPath"),
        dockPosition: BoldBIDashboard.util.valueFunction("legendSettings.dockPosition"),
        legendheight: BoldBIDashboard.util.valueFunction("legendSettings.height"),
        legendwidth: BoldBIDashboard.util.valueFunction("legendSettings.width"),
        itemTemplate: BoldBIDashboard.util.valueFunction("leafItemSettings.itemTemplate"),
        uniColor: BoldBIDashboard.util.valueFunction("uniColorMapping.color"),
        _color: BoldBIDashboard.util.valueFunction("desaturationColorMapping.color"),
        _from: BoldBIDashboard.util.valueFunction("desaturationColorMapping.from"),
        _to: BoldBIDashboard.util.valueFunction("desaturationColorMapping.to"),
        _rangeMinimum: BoldBIDashboard.util.valueFunction("desaturationColorMapping.rangeMinimum"),
        _rangeMaximum: BoldBIDashboard.util.valueFunction("desaturationColorMapping.rangeMaximum"),

        _initPrivateProperties: function () {
            this._svgDocument = null;
            this._templateDiv = null;
            this._legenddiv = null;
            this._drillHeaderDiv = null;
            this._drillHoverDiv = null;
            this._legendHeight = 0;
            this._backgroundTile = null;
            this._prevData = [];
            this._prevLevels = [];
            this._prevLegend = [];
            this._tooltipSize = { height: 0, width: 0 };
            this._height = 500;
            this._margintop = null;
            this._marginleft = null;
            this._startPoint = { x: 0, y: 0 };
            this._stopPoint = { x: 0, y: 0 };
            this.mouseClickable = false;
            this.dragDiv = null;
            this._initDiv = null;
            this._width = 500;
            this._svgns = "http://www.w3.org/2000/svg";
            this._prevSelectedItems=[];
            this._prevSelectedHeaders = [];
            this._isLevelColors;
			 if (this.selectedItems == null)
                this.selectedItems = [];
            this.treeMapItemSelected = null;
            this.treeMapGroupSelected = null;
            this._browser = null;
            this._toolTipElement = null;
            this._rootTreeMapItems = [];
            this.treemapgroups = [];
            this._drillHeader = null;
            this._drilldownItem = null;
            this._drilldownItems = [];
            this._treeMapHeaders = [];
            this._drilldownHeaders = [];
			this.preRender = null;
            this.drillStarted = null;
			this.headerTemplateRendering = null;
            this.drillDownItemSelected = null;
            this._treeMapLabels = [];
            this._labelTemplateElements = [];
            this._itemGroups = [];
            this._prevSelectedGroupDatas = [];
            this._interactiveArrow = null;
            this._legendRects = [];
			this._toggle = [];
			if (this._rangeInVisibility == null)
				this._rangeInVisibility = [];
			if (this._tog == null)
				this._tog = [];
			if	(this._rangevisible == null)
				this._rangevisible = [];
			if(this._levelItemCollections == null)
				this._levelItemCollections = [];
			this._levelChangedItemCollections = [];
			this._drillDownLevelData = null;
			this._allowDoubleClick = false;
            this._allowItemSelectEvent = false;
        },

        _setModel: function (options) {
            for (var prop in options) {
                switch (prop) {
                    case "itemsLayoutMode":
                        this.itemsLayoutMode(options[prop]);
                        this.refresh();
                        break;
                }
            }
        },
		
		
		
        _levels: function(index, property, value, old){
            this.refresh();
        },
        _rangeColorMapping: function(index, property, value, old){
            this._setColorMappings(this._rootTreeMapItems, this.model);
        },
        _groupColorMapping: function(index, property, value, old){
            this._setColorMappings(this._rootTreeMapItems, this.model);
        },
        _groupColorMapping_rangeColorMapping: function(index, property, value, old){
            this._setColorMappings(this._rootTreeMapItems, this.model);
        },
      
        _init: function () {

            this._initPrivateProperties();
            var style = bbdesigner$('<style>.drillGroupRect:hover{ background-color:' + this.drillDownSelectionColor() + ';}</style>');
            bbdesigner$('html > head').append(style);
            this._levelInitialize();

            this.refresh();           

        },

        _destroy: function() {
            this._unWireEvents();
            bbdesigner$(this.element).removeClass("e-treemap e-js").find().remove(".tooltipelement");
            bbdesigner$(this.element).empty();
        },
       
        _levelInitialize: function () {
            var proxy = this;
            if (this.model.levels != null) {
                bbdesigner$.each(this.model.levels, function (index, element) {                    
                    element = proxy._checkArrayObject(element, index);
                    var obj = new treeMapLevel();                    
                    bbdesigner$.extend(obj, element);
                    bbdesigner$.extend(element, obj);                    
                });
            }
            else {
                this.levels.treeMapLevel = new treeMapLevel();

            }
			
            bbdesigner$(document).click({treeMap: this}, this._docClickFunction);
        },

        _checkArrayObject: function (element, initialName) {
            var proxy = this;
            bbdesigner$.each(element, function (name, innerElement) {
                if (innerElement instanceof Array) {
                    proxy._checkArrayObject(innerElement, name);
                }
                else if (innerElement != null && typeof innerElement == "object") {
                    var allObjects = new treeMapLevel();
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

        refresh: function (isClear, legend) {
            var isHierarchicalDrilldown = this.model.drillDownLevel > 0;
            this._unWireEvents();
			this._groupLevelItemCollection();
            if (!isClear) {
                this._drilldownItems = [];
            }
            if (this.model.enableResize || this.model.isResponsive || isHierarchicalDrilldown) {
                if (this._drilldownItems.length == 0 && !isHierarchicalDrilldown) {
                    this._initPrivateProperties();
                }
                else
                    this._legenddiv = null;
            }
            else {
                this._initPrivateProperties();
            }

            bbdesigner$(this.element).empty();
            if (this._svgDocument != null) {
                bbdesigner$(this._svgDocument).empty();
            }
            this._height = this.element.height();
            this._width = this.element.width();
            if (this._height == 0) {
                this._height = this.element[0].parentElement.clientHeight != 0 ? this.element[0].parentElement.clientHeight : bbdesigner$(document).height();
            }
            if (this._width == 0) {
                this._width = this.element[0].parentElement.clientWidth != 0 ? this.element[0].parentElement.clientWidth : bbdesigner$(document).width();
            }
            if (this.showLegend()) {
                if (this.enableDrillDown() && this.model.colorPath != null) {
                    var cloneItems = this._getGroupitem(this.model.levels[0].groupPath, this.model.dataSource, this.model.levels[0].headerHeight,0);
                    cloneItems.sort(function (a, b) {
                        return parseFloat(b.weight) - parseFloat(a.weight);
                    });
                }
				this._sizeCalculation(cloneItems);
            }            
            var matched = bbdesigner$.uaMatch(navigator.userAgent);
            var browser = matched.browser.toLowerCase();
            var isIE11 = !!navigator.userAgent.match(/Trident\/7\./);
            this._browser = browser;
            bbdesigner$(this.element).css({ 'position': 'relative' });			
           
            if (this._height != 0 && this._width != 0) {                
                this._setTreemapSize(isHierarchicalDrilldown, legend);
				this._backgroundTile = bbdesigner$('<div id="backgroundTile" style="overflow:hidden;z-index:0;"></div>');
				 if(this.showLegend()) {
                    if (this.model.legendSettings != null) {
                        this._renderLegend();                       
                    }
                }
                if(this.dataSource()!=null){
                    if (this._drilldownItems.length > 0) {
                        if (this.enableDrillDown() && this.model.levels.length >= 1 && ((this._drilldownItem != null) || this._drilldownItem == null)) {
                            for (var i = 0; i < this._drillHeaderDiv[0].children[0].children.length; i++) {
                                if (this._drillHeaderDiv[0].children[0].children[i].className == "e-drilldownlabel")
                                    header = this._drillHeaderDiv[0].children[0].children[i].innerHTML;
                            }
                            this._backgroundTile[0].innerHTML = "";
                            this._drillHeaderDiv[0].innerHTML = "";
                            this._templateDiv[0].innerHTML = "";
                            this._drillHoverDiv[0].innerHTML = "";
                            this._drillDownHeader(true, this.model.levels[0], this.model.dataSource);
                            this._groupdrillDownLevels(this._drilldownItems[this._drilldownItems.length - 1], this._drilldownItems.length);
                        }
                        /*if (this.showLegend()) {
                            this._generateLegend();
                        }*/
                        this._generateToolTip();
                    }
                    else if(isHierarchicalDrilldown){
                        this._backgroundTile[0].innerHTML = "";
                        this._drillHeaderDiv[0].innerHTML = "";
                        this._templateDiv[0].innerHTML = "";
                        this._drillHoverDiv[0].innerHTML = "";
                        this.runTimeSubitems(this._prevData.pop(), null, this._prevLevels.pop(), this._prevLegend.pop(), true);
                        if (this.showLegend())
                            this._generateLegend(legend);
                        this._generateToolTip();
                    }
                    else {
                        if (this.model.dataSource instanceof BoldBIDashboard.DataManager) {
                            this._processOData(this);
                        }
                        else {
                            this._renderTreeMap(this.dataSource());
                        }
                    }
                }
                if (this.enableResize() || this.model.isResponsive) {
                    this._on(bbdesigner$(window), "resize", this._treeMapResize);
                }
            }
            this._selectItemResize();
            this._wireEvents();
			var data = { model: this.model };
			this._trigger("loaded", data);
        },
		_setTreemapSize: function(isHierarchicalDrilldown, legend){
		
			if(!this._templateDiv){
			   this._templateDiv = bbdesigner$("<div class='_templateDiv'></div>");
                this._templateDiv.css({
                    'pointer-events': 'none', 'overflow': 'hidden', 'float': 'left',
                    'z-index': '2', 'height': this._height, 'width': this._width, "margin-top": this._margintop,  "margin-left": this._marginleft, "position": "absolute", "left": "0", "top": "0"
                });
			} else this._templateDiv.css({'height': this._height, 'width': this._width});
                if (this.enableDrillDown() && this._drilldownItems.length == 0 || isHierarchicalDrilldown) {
					if(!this._drillHeaderDiv){
                    this._drillHeaderDiv = bbdesigner$("<div class='_drillHeaderDiv'></div>");
                    this._drillHeaderDiv.css({
                        'overflow': 'hidden', 'float': 'left',
                        'z-index': '3', "position": "absolute", "left": "0", "top": "0"
                    });
                    this._drillHoverDiv = bbdesigner$("<div class='_drillHoverDiv'></div>");
                    this._drillHoverDiv.css({
                        'overflow': 'hidden', 'float': 'left',
                        'z-index': '3', 'height': this._height - 20, 'width': this._width, "position": "absolute", "left": "0", "top": "30px"
                    });
					} else  this._drillHoverDiv.css({'height': this._height - 20, 'width': this._width});
                }
                
                if(this.showLegend()) {
                    if (this.model.legendSettings != null || legend != null) {
                        this._renderLegend();                       
                    }
                }
		},
       _renderTreeMap: function (data) {
            var preRenderEventData = this._getPreRenderEventData(data);
            if (this.enableDrillDown()) { 
                var min,max;
                for (var k = 0 ; k < preRenderEventData.length ; k++) {
                    var preRenderEventData1 = this._getPreRenderEventData(preRenderEventData[k].Data, this._drilldownItems.length + 1);
                    for (var j = 0; j < preRenderEventData1.length; j++) {
                        min = min === undefined ? preRenderEventData1[j] : (min.colorWeight > preRenderEventData1[j].colorWeight ? preRenderEventData1[j] : min);
						max = max === undefined ? preRenderEventData1[j] : (max.colorWeight > preRenderEventData1[j].colorWeight ? max : preRenderEventData1[j]);
                    }
                }
                if(BoldBIDashboard.isNullOrUndefined(this._currentToggle))
					this._trigger("preRender", { model: this, maximumValue: preRenderEventData[0], minimumValue: min ,max:max, level: (this._drilldownHeaders.length - 1 === -1) ? 0 : this._drilldownHeaders.length - 1 });
            }
            else {
                var items = this._getGroupitem(this.model.levels[0].groupPath, data, this.model.levels[0].headerHeight,0)
                this._getTopLevels(items, this.model.levels[0]);
                this._trigger("preRender", { model: this, maximumValue: items[0], minimumValue: items[items.length - 1] });
            }
            if (this.showLegend() && this.model.legendSettings.mode == "interactive")
                this._generateLegend();
            if(this.model.drilledStateLevel == 0 || this.model.drilledStateLevel == null || this._initialLevel){
				this._groupLevels(data);
			    this._drillDownDataValue = data;
				this._renderWithDrilledLevel = false;
				this._headerClick = false;
			}
			else{
				var dataItem = this._getPreRenderEventData(this.model.dataSource,this.model.drilledStateLevel-1);
				this._drillCurrentItem = dataItem;
				if (this.enableDrillDown()) {
					for(var i= 0;i<dataItem.length;i++){
						this._originalHeaders = [];
						this.renderHeader = true;
						if(dataItem[i].header == this.model.drillDownDataValue){
							if (this.model.levels.length > 0) {
								this.model.levels[this.model.drilledStateLevel].groupingLevel = 0;
								this._drilldownHeaders.push(this.model.header || this.model.levels[0].groupPath);
								this._originalHeaders.push(this.model.header || this.model.levels[0].groupPath);
								if(this.model.drilledStateLevel > 1){
									var previousItem = this._getPreRenderEventData(this.model.dataSource,this.model.drilledStateLevel-2);
									this._drillPreviousItem = previousItem;
									var item = dataItem[i].Data[0];
									for(var k=2;k<=this.model.drilledStateLevel;k++){
										var path = this.model.levels[k-2].groupPath;
										var itemValue = this._reflection(item, path);
										dataItem[i]._previousHeader = itemValue;
										this._drilldownHeaders.push(dataItem[i]._previousHeader);
										this._originalHeaders.push(dataItem[i]._previousHeader);
									}
								}
								this._drilldownHeaders.push(this.model.drillDownDataValue);	
								this._originalHeaders.push(this.model.drillDownDataValue);
								this._drillDownHeader(true, this.model.levels[this.model.drilledStateLevel-1], dataItem[i]);
							}
							else {
								this._drilldownHeaders.push("");
								this._drillDownHeader(false);
							}
							this._groupdrillDownLevels(dataItem[i], this.model.drilledStateLevel);
							this._renderWithDrilledLevel = true;
							this._initialLevel = true;
						}
					}
				}
			}					
            this.renderHeader = false;
            this._generateToolTip();
            this._renderLabels();
			if (this.showLegend() && this.model.legendSettings.mode != "interactive") {
                this._generateLegend();				
            }
        },
		
		_groupLevelItemCollection : function(){
			
			if(!BoldBIDashboard.util.isNullOrUndefined(this._levelItemCollections) && this._levelItemCollections.length > 0){
                var legendItemIndex = this._levelItemCollections.length;
                if (this._levelItemCollections[legendItemIndex - 1].length > 0) {
                    if (this._levelItemCollections[legendItemIndex - 1][0].groupPath != this.model.colorPath && (!BoldBIDashboard.util.isNullOrUndefined(this.model.colorPath) ||
                        !BoldBIDashboard.util.isNullOrUndefined(this.textPath()))) {
                        var treemapLevelItems = this._getGroupitem(this.textPath() || this.model.colorPath, this.dataSource(), this.model.levels[0].headerHeight);
                        this._levelItemCollections[legendItemIndex - 1] = treemapLevelItems;
                    }
                }
				this._levelItemCollections = this._levelItemCollections;
				if(this._headerClick){
					for(var k=0;k<this.dataSource().length;k++){
						if(!this.dataSource()[k]._isVisible)
							this.dataSource()[k]._isVisible=true;							
					}
					
				}
				
				if(BoldBIDashboard.util.isNullOrUndefined(this._currentLevel)){
					
					for(var y=0;y<this._levelItemCollections.length;y++)
					{
						for(z=0;z<this._levelItemCollections[y].length;z++){
							if(!this._levelItemCollections[y][z].isVisible)
							this._levelItemCollections[y][z].isVisible = true;
						}
						
					}
				}
				if(!BoldBIDashboard.util.isNullOrUndefined(this._invisibility) && this._invisibility.length > 0){
					for(var x=0;x<this.model.levels.length;x++)
					{
						var treemapLevelItems = this._getGroupitem(this.model.levels[x].groupPath, this.dataSource(), this.model.levels[x].headerHeight);					
						this._levelChangedItemCollections.push(treemapLevelItems);
					}
				}
			}
			else{
				for(var x=0;x<this.model.levels.length;x++)
				{
					var treemapLevelItems = this._getGroupitem(this.model.levels[x].groupPath, this.dataSource(), this.model.levels[x].headerHeight);									 						 		
					this._levelItemCollections.push(treemapLevelItems);
				}
				if(this.textPath() != null || this.model.colorPath != null){
					var treemapLevelItems = this._getGroupitem(this.textPath() || this.model.colorPath, this.dataSource(), this.model.levels[0].headerHeight);									 						 		
					this._levelItemCollections.push(treemapLevelItems);	
						var levelItems = this._levelItemCollections;
				}
			}
			
			return levelItems;			
		},
		
		_identityGroupPathItem: function(path){
			var drillDownItems = [];
			for(var x=0;x<this._levelItemCollections.length;x++){
				var validatePath = this._levelItemCollections[x][0] ? this._levelItemCollections[x][0].groupPath : this._levelItemCollections[x].groupPath;
				if(validatePath == path){
					var items = this._levelItemCollections[x];
				}
			}
				if(this._headerClick && !BoldBIDashboard.util.isNullOrUndefined(this._currentLevel) && this._currentLevel != 0){
					for(var y=0;y<this._drillDownLevelData.Data.length;y++){
						var Obj = this._drillDownLevelData.Data[y];
						var expectedValue = this._reflection(Obj,path);
						var colorValue = this._reflection(Obj,this.colorPath());
						if(this._drillDownLevelData.color == this._drillDownLevelData.header)
							items[y].color = this._drillDownLevelData.color;
						for(var z=0;z<items.length;z++){
							if(expectedValue == items[z].label){
								items[z].color = colorValue;
								drillDownItems.push(items[z]);
							}
						}
					}
					var items = drillDownItems;
				}
			return items;
		},
		
   _renderLegend: function () {
          if(!this._legenddiv){
             this._legenddiv = bbdesigner$("<div class='LegendDiv' align='left'/>");
             this._legenddiv.appendTo(this.element);

             this._legenddiv.css({
                'pointer-events': 'auto',
				'overflow': 'hidden', "position": "absolute",
                'z-index': '2', 
				'height': this._legendSize.height, 'width': this._legendSize.width
             });			 
		   } else  this._legenddiv.css({'height': this._legendSize.height, 'width': this._legendSize.width });
        },

        _processOData: function (treemap) {  
            var treeMap= this;		 
            var queryPromise = treemap.model.dataSource.executeQuery(treemap.model.query);
            queryPromise.done(function (e) {
                if(e.result!=null)
                {
                    treeMap._renderTreeMap(e.result);
                }
            });        
        },

        _treeMapResize: function (event) {
            event.preventDefault();
            event.stopPropagation();
            var treemap = this;
            if (this.resizeTO) clearTimeout(this.resizeTO);
            this.resizeTO = setTimeout(function () {
                treemap.refresh(true);
            }, 500);
        },
              
        _unWireEvents: function(){
            var matched = bbdesigner$.uaMatch(navigator.userAgent);
            var browser = matched.browser.toLowerCase();            
            this._off(bbdesigner$(this.element), (BoldBIDashboard.isTouchDevice() ? "touchend" : "click"), this._tmClick);
        },

        _wireEvents: function(){
            this._on(bbdesigner$(this.element), (BoldBIDashboard.isTouchDevice() ? "touchend" : "click"), this._tmClick);
        },

        _tmClick: function(e){
            var eventArgs, end, treeMap = this;
			this._allowDoubleClick = false;
            if(this.model.click != ''){
                eventArgs = { model: this.model, data:{ event: e }};
                this._trigger("click", eventArgs);
            }
			if(this.model.legendSettings.toggleVisibility)
				this._legendToggleVisibility(e);
            if(this.model.doubleClick != '')
            {
                end = new Date();
				for (var i = 0; i < treeMap._rootTreeMapItems.length; i++) {
					var item = treeMap._rootTreeMapItems[i];
					var rect = item.Rectangle.getBoundingClientRect();
					if (!BoldBIDashboard.util.isNullOrUndefined(event) && rect.left < event.clientX && rect.left + rect.width > event.clientX
							&& rect.top < event.clientY && rect.top + rect.height > event.clientY) {                   
						break;
					}
				}
                if(this._doubleTapTimer != null && (end - this._doubleTapTimer < 300))
                {
					this._allowDoubleClick = true;
                    !eventArgs && (eventArgs = { model: this.model, data:{ event: e }, selectedItems: [item.Data], doubleClick:true});
                    this._trigger("doubleClick", eventArgs);
                }
                this._doubleTapTimer = end;                
            }
        },
		
		_legendToggleVisibility: function(e){	           
			var legendCount = this.model.rangeColorMapping.length > 0 ? this.model.rangeColorMapping.length : this._legendTreemapItems.length;
			this._invisibility =[], this.currentItem = [], this._currentInvisibleItem = [];
			var targetId = e.target.id;
			if(targetId.search("Legend") != -1){
			this._isremoved=false;
			var targetIdLength = targetId.length;			
			var targetPosition = targetId.indexOf('_'), 
			ID = targetId.substring((targetPosition + 1), targetIdLength);
			if(this._legendTreemapItems){
				if(this.model.rangeColorMapping.length > 0) {
					for(var j=0;j<legendCount;j++){
						var legendTxt1 = targetId;
						var index1 = legendTxt1.indexOf('_') + 1;
						var index2 = legendTxt1.length;
						var index3 = legendTxt1.substring(index1,index2);						
						var legendTxt = this.model.rangeColorMapping[index3].from + '-' + this.model.rangeColorMapping[index3].to;
						var splitTxtCount = legendTxt.indexOf('_');
						var splitText = legendTxt.substring((splitTxtCount + 1),legendTxt.length);
						this._currentToggle = splitText;
						var splitTxtCount1 = splitText.indexOf('-');
						var splitTxt1 = splitText.substring((splitTxtCount1 + 1),legendTxt.length);
						var splitTxt1Length = splitTxt1.length;
						var splitTxt2 = splitText.substring(0,splitTxtCount1);
						if(j == index3){
							if(!this.model.rangeColorMapping[j].isVisible)
								this.model.rangeColorMapping[j].isVisible = true;
							else
								this.model.rangeColorMapping[j].isVisible = false;
						}
						if(!this.model.rangeColorMapping[j].isVisible){
							for(var k=0;k<this._legendTreemapItems.length;k++){
								visible = true;
								if(splitTxt2 <= this._legendTreemapItems[k].colorWeight && this._legendTreemapItems[k].colorWeight <= splitTxt1){
									this._legendTreemapItems[k].isVisible = false;
								}
								if(!this._legendTreemapItems[k].isVisible){
									if (bbdesigner$.inArray(splitText, this._currentInvisibleItem) == -1) 
										this._currentInvisibleItem.push(splitText);
									if (bbdesigner$.inArray(this._legendTreemapItems[k].header, this._currentInvisibleItem) == -1)
										this._currentInvisibleItem.push(this._legendTreemapItems[k].header);
								}
							}
							for(var x=0;x<this._currentInvisibleItem.length;x++){
								if (bbdesigner$.inArray(this._currentInvisibleItem[x], this._invisibility) == -1) 
									this._invisibility.push(this._currentInvisibleItem[x]);
							}
						}
						else{
							for(var z=0;z<this._tog.length;z++){
								if(legendTxt == this._currentToggle && this._tog[z] == this._currentToggle){
									this._isremoved = true;
									this._tog.splice(z,1);
									this._rangevisible = this._rangeInVisibility[z];
									this._rangeInVisibility.splice(z,1);
								}
							}
						}
					}
					if(this._rangeInVisibility.length > 0){
						for(var x=0;x<this._rangeInVisibility.length;x++){
							if(Object.prototype.toString.call(this._rangeInVisibility[x]) === '[object Array]'){
								if(this._tog[x] == this._rangeInVisibility[x][0]){
									for(var y=0;y<this._rangeInVisibility[x].length;y++){
										if (bbdesigner$.inArray(this._rangeInVisibility[x][y], this._invisibility) == -1) 
											this._invisibility.push(this._rangeInVisibility[x][y]);
									}
								}
							}
						}
					}					
				}				
				else{
					for(var j=0;j<this._legendTreemapItems.length;j++){
						var treemapItemID = this._legendTreemapItems[ID].legendLabel;
						//ID = ID.replace('_',' ');
						//if(treemapItemID.indexOf(ID) > -1){
							visible = true;
							var legendId = ID;
								var legendText = this._legendTreemapItems[ID].label;
								if(j == ID){
									//this._legendToggle = legendId;
									if(!this._legendTreemapItems[j].isVisible){
										this._legendTreemapItems[j].isVisible = true;
									}
									else{
										this._legendToggle = legendText;
										this._legendTreemapItems[j].isVisible = false;
									}
								}
						//}
						if(!this._legendTreemapItems[j].isVisible){
							if (bbdesigner$.inArray(this._legendTreemapItems[j].label, this._invisibility) == -1) 
								this._invisibility.push(this._legendTreemapItems[j].label);
						}
					}
				}				
			}
			if(this.enableDrillDown())
				this.refresh(true);
			else
				this.refresh();
			}
		},

        _groupLevels: function (data) {
           
            var subItems = null,preRenderEventData;var items;
			var fillColor = this.model.fill;
          if (this.enableDrillDown()) {
                this._originalHeaders = [];
                this.renderHeader = true;
                if (this.model.levels.length > 0) {
                    this.model.levels[0].groupingLevel = 0;
                    this._drilldownHeaders.push(this.model.header || this.model.levels[0].groupPath);
                    this._originalHeaders.push(this.model.levels[0].groupPath);
                    this._drillDownHeader(false, this.model.levels[0], data);
                }
                else {
                    this._drilldownHeaders.push("");
                    this._drillDownHeader(false);
                }
            }
            var rootItems = this._getTopGroupitem(this.labelPath(), data, 0);
            subItems = rootItems;
            if (this.model.levels.length == 0) {
                var levelItem = this.model.leafItemSettings;
                this._rootTreeMapItems = rootItems;
                this._getTopLevels(rootItems[0].innerItems, levelItem);
                this._generateTreeMapItems(rootItems[0].innerItems, fillColor, this.colorValuePath());
                if (this.showLabels())
                    this._generateLabels(rootItems[0].innerItems, levelItem);
             }
            else if(this.model.levels.length>0){
                for (var i = 0; i <= this.model.levels.length; i++) {
                    var levelItem = this.model.levels[i];
                  if (levelItem != null) {
                        if (!bbdesigner$.isNumeric(levelItem.groupGap)) levelItem.groupGap = 0;
                        if (!bbdesigner$.isNumeric(levelItem.groupPadding)) levelItem.groupPadding = 0;
                        if (!bbdesigner$.isNumeric(levelItem.groupBorderThickness)) levelItem.groupBorderThickness = 0;
                    }
                    if (i != 0) {
                        var cloneItems = subItems;
                        var PrevItem = this.model.levels[i - 1];
                        subItems = [];
                        if (levelItem == null) levelItem = this.model.leafItemSettings;
                        this._generateSubItems(cloneItems, levelItem, subItems, PrevItem,null,null,i-1);
                        
                        this._rootTreeMapItems = subItems;                        
                        if (this.enableDrillDown())
                        {
                            if (i == 1) {
								items = this.model.showSubItems ? subItems:rootItems1;
                                this._generateTreeMapItems(items, fillColor, PrevItem.DisplayPath, cloneItems);                                
                                return false;                          
                            }
                        }
                        else if (i == this.model.levels.length) {
                            this._generateTreeMapItems(subItems, fillColor, PrevItem.DisplayPath, cloneItems);
                        }                                                  
                        if (this.showLabels() && i == this.model.levels.length) {
                            this._generateLabels(subItems, levelItem);
                        }
                      
                    }
                    else {
                        var rootItems1 = this._getGroupitem(levelItem.groupPath, rootItems[0].Data, levelItem.headerHeight,i);
                        this._rootTreeMapItems = rootItems1;
                        this._getTopLevels(rootItems1, levelItem);
                        subItems = rootItems1;                        
                    }
                }
                
            }
        },
        
        _groupdrillDownLevels: function (data, actualindex) {       
			this._drillDownLevelData = data;
          
		    bbdesigner$(this._legenddiv).empty(); // empty the legend items on drilldown
            var subItems = null;
			var fillColor = this.model.fill;
            if (actualindex == this.model.levels.length-1)
            {
                this._drillHoverDiv.css("pointer-events", "none");
            }
            else
            {
                this._drillHoverDiv.css("pointer-events", "auto");
            }
            if (this.model.levels.length > 0) {
                var canExecute = false;
                for (var i = 0; i < this.model.levels.length; i++) {                   
                    var levelItem = this.model.levels[i];
                  if (levelItem != null) {
                        if (!bbdesigner$.isNumeric(levelItem.groupGap)) levelItem.groupGap = 0;
                        if (!bbdesigner$.isNumeric(levelItem.groupPadding)) levelItem.groupPadding = 0;
                        if (!bbdesigner$.isNumeric(levelItem.groupBorderThickness)) levelItem.groupBorderThickness = 0;
                    }
                    if (i != 0) {
                        var cloneItems = subItems;
                        var PrevItem = this.model.levels[i - 1];
                        subItems = [];
                        if (levelItem == null) {
                            levelItem = this.model.leafItemSettings;
                        }
                        if (i == actualindex + 1) {
                            this._generateSubItems(cloneItems, levelItem, subItems, PrevItem, null, (actualindex + 1 != i),data.GroupingLevel);

                        }
                        else {
                            this._generateSubItems(cloneItems, levelItem, subItems, PrevItem, true, (actualindex + 1 != i),data.GroupingLevel);

                        }
						if(subItems.length > 0)
							this._rootTreeMapItems = subItems;
                        if ((i == actualindex + 1 || i == this.model.levels.length - 1) && !canExecute) {
							    if (this.showLegend() && this.model.colorPath) {
									this._height = this.element.height();
									this._width = this.element.width();
									this._sizeCalculation(i == actualindex + 1 ? cloneItems : subItems);
									//this._legenddiv.empty();
									this._legenddiv.css({
										"width": this._legendSize.width + "px",
										"height": this._legendSize.height + "px"
									});
									if (this.model.legendSettings.dockPosition.toLowerCase() == "top") {
										this._templateDiv.css({
											"margin-top": this._margintop
										});
										this._drillHeaderDiv.css({
											"top": this._legendSize.height
										});

										this._drillHoverDiv.css({
											"top": 30 + this._legendSize.height
										})
									}
									else if (this.model.legendSettings.dockPosition.toLowerCase() == "left") {
										this._drillHeaderDiv.css({
											"left": this._legendSize.width
										});
										this._drillHoverDiv.css({                                       
											"left": this._legendSize.width
										});
										this._templateDiv.css({
											"margin-left": this._marginleft
										});
									}
								}
							if(this._legendToggle){
								var y;
								for(var z=0;z<subItems.length;z++){
									var dataValue = subItems[z].Data[0];
									var equateValue = this._reflection(dataValue, this.textPath());
									if(equateValue == this._legendToggle)
										subItems._isVisible = false;
								}
							}
							this._generateTreeMapItems(subItems, fillColor, PrevItem.DisplayPath, i == actualindex + 1 ? cloneItems : subItems);
							
                            canExecute = true;
                        }                        
                         if (!this.model.showSubItems)
                        {
                            if (i == actualindex + 1 )
                                this._generateTreeMapItems(cloneItems, fillColor, PrevItem.DisplayPath, i == actualindex + 1 ? cloneItems : subItems);
                            else if(i == this.model.levels.length - 1)
                                this._generateTreeMapItems(subItems, fillColor, PrevItem.DisplayPath, i == actualindex + 1 ? cloneItems : subItems);

                        }
                        if (actualindex == this.model.levels.length - 1 && i == actualindex && levelItem.showLabels) {
                            this._generateLabels(subItems, levelItem);
                        }
                         this.renderHeader = (i == data.GroupingLevel)? true : false;
                    }
                    else {
						var rootItems1 = this._getGroupitem(levelItem.groupPath, data.Data, levelItem.headerHeight,i);
                        this._rootTreeMapItems = rootItems1;
                        this._getTopLevels(rootItems1, levelItem);
                        subItems = rootItems1;
                    }
					
					if (this.showLegend() && actualindex == i) {
									this._generateLegend(null,this._legendTreemapItems, actualindex);
					}
                }
				
				
            }
            
            this._renderLabels();
			this.renderHeader = false;
			if(BoldBIDashboard.util.isNullOrUndefined(this._drillDownArgs)){
				//this._trigger("drillDownItemSelected", { level: actualindex, header: this.getDrillDownHeader(this._drilldownHeaders), prevLevel: actualindex - 1, doubleClick:(this._doubleTapTimer != null && (new Date() - this._doubleTapTimer < 300)),rightClick:false });	
			}
        },
		
		drillDown: function(value,drilledLevel){
		   bbdesigner$(this.element).find('._templateDiv').parent().children().empty();
		   this.model.tooltipTemplate = this.element.parents(".e-dashboardviewer.e-js").attr("id") + "_" + this.element.attr("data-controlid") + "_toolTip" + drilledLevel;
			this._drilldownHeaders = [];
			var data = this.model.dataSource;
			if(drilledLevel == 0 || this.model.drilledStateLevel == null){
				this._groupLevels(data);
				this._renderWithDrilledLevel = false;
			}
			else{
				var dataItem = this._getPreRenderEventData(this.model.dataSource,drilledLevel-1);
				this._drillCurrentItem = dataItem;
				if (this.enableDrillDown()) {
					for(var i= 0;i<dataItem.length;i++){
						this._originalHeaders = [];
						this.renderHeader = true;
						if(dataItem[i].header == value){
							if (this.model.levels.length > 0) {
								this.model.levels[drilledLevel].groupingLevel = 0;
								this._drilldownHeaders.push(this.model.header || this.model.levels[0].column || this.model.levels[0].groupPath);
                                this._originalHeaders.push(this.model.header || this.model.levels[0].column || this.model.levels[0].groupPath);
								if(drilledLevel > 1){
									var previousItem = this._getPreRenderEventData(this.model.dataSource,drilledLevel-2);
									this._drillPreviousItem = previousItem;
									var item = dataItem[i].Data[0];
									for(var k=2;k<=drilledLevel;k++){
										var path = this.model.levels[k-2].groupPath;
										var itemValue = this._reflection(item, path);
										dataItem[i]._previousHeader = itemValue;
										this._drilldownHeaders.push(dataItem[i]._previousHeader);
										this._originalHeaders.push(dataItem[i]._previousHeader);
									}
								}
								this._drilldownHeaders.push(value);	
								this._originalHeaders.push(value);
								this._drillDownHeader(true, this.model.levels[drilledLevel-1], dataItem[i]);
								this._drilldownItem = dataItem[i];
								this._drilldownItems.push(dataItem[i]);
							}
							else {
								this._drilldownHeaders.push("");
								this._drillDownHeader(false);
							}
							var rootItem1, min, rootItems2, max;
							if(this.model.enableRightClick){
								rootItem1 = this._getPreRenderEventData(this._drilldownItem.Data);	
								for(var z=0;z<rootItem1.length;z++){
									var min, rootItems2,max;
									if(this._drilldownItems.length + 1 >= this.model.levels.length)
										rootItems2 = rootItem1;
									else
										rootItems2 = this._getPreRenderEventData(rootItem1[z].Data, this._drilldownItems.length + 1);
									for (var j = 0; j < rootItems2.length; j++) { 
										min = min === undefined? rootItems2[j]:(min.colorWeight > rootItems2[j].colorWeight?rootItems2[j]: min);
										max = max === undefined ? rootItems2[j] : (max.colorWeight > rootItems2[j].colorWeight ? max : rootItems2[j] );
									}	
								}
								this._trigger("preRender", { model: this.model, maximumValue: rootItem1[0], minimumValue: min ,max : max, level: (this._drilldownHeaders.length - 1 === -1) ? 0 : this._drilldownHeaders.length - 1 });
							}
							else{
									if(this._drilldownItems.length + 1 >= this.model.levels.length)
										rootItems2 = dataItem;
									else
										rootItems2 = this._getPreRenderEventData(dataItem[i].Data, this._drilldownItems.length + 1);
									for (var j = 0; j < rootItems2.length; j++) { 
										min = min === undefined? rootItems2[j]:(min.colorWeight > rootItems2[j].colorWeight?rootItems2[j]: min);
										max = max === undefined ? rootItems2[j] : (max.colorWeight > rootItems2[j].colorWeight ? max : rootItems2[j] );
									}
								this._trigger("preRender", { model: this.model, maximumValue: dataItem[0], minimumValue: min ,max : max, level: (this._drilldownHeaders.length - 1 === -1) ? 0 : this._drilldownHeaders.length - 1 });
							}	
							var drillData = { event: event, drillDownLevel: this._drilldownItems.length, headerLabel: value };
							this._trigger("drillStarted", drillData);
							this._groupdrillDownLevels(dataItem[i], drilledLevel);
							this._renderWithDrilledLevel = true;
							this._initialLevel = true;
						}
					}
				}				
			}
			
		},

        _getTopLevels: function (rootItems, level) {
            var gap = (level.groupGap != null) ? level.groupGap : 0;
            var layout = this.itemsLayoutMode();
            var legendHeight = 0;
            var defaultspacing = 0;
            if (this.enableDrillDown()) {
                defaultspacing = 20;
            }
            if (this.showLegend() && this.model.legendSettings != null) {
                legendHeight = legendHeight;                    
            }
                
            this._legendHeight = legendHeight;
            if (this.enableDrillDown()) {
                this._drillHeaderDiv.css({
                    "top": this.showLegend() && this.model.legendSettings.dockPosition.toLowerCase() == "top" ? this._legendSize.height : legendHeight
                });

                this._drillHoverDiv.css({
                    "top": defaultspacing + (this.showLegend() && this.model.legendSettings.dockPosition.toLowerCase() == "top" ? this._legendSize.height : legendHeight)
                })
            }               
                
            if (layout == BoldBIDashboard.datavisualization.TreeMap.ItemsLayoutMode.SliceAndDiceHorizontal) {
                this._calculateSliceAndDiceItemSize(rootItems, 0, legendHeight, this._width, this._height, gap, defaultspacing, true, legendHeight);
            }
            else if (layout == BoldBIDashboard.datavisualization.TreeMap.ItemsLayoutMode.SliceAndDiceVertical) {
                this._calculateSliceAndDiceItemSize(rootItems, 0, legendHeight, this._width, this._height, gap, defaultspacing, false, legendHeight);
            }
            else if (layout == BoldBIDashboard.datavisualization.TreeMap.ItemsLayoutMode.SliceAndDiceAuto) {
                this._calculateSliceAndDiceItemSize(rootItems, 0, legendHeight, this._width, this._height, gap, defaultspacing, null, legendHeight);
            }
            else {
                this._calculateSquarifiedItemSize(rootItems, 0, legendHeight, this._width, this._height, gap, defaultspacing, legendHeight);
            }
            
        },
      
        _generateSubItems: function (cloneItems, levelItem, subItems, PrevItem, disablelabels, disablebackground,groupingLevel, legendCalculation) {
            var grouppading = PrevItem.groupPadding;
            if (grouppading == "") { grouppading = 0; }
            var layout = this.itemsLayoutMode();
            var cloneItemsCount = cloneItems.length;
            var path = levelItem.groupPath;
            if (path == null) path = this.labelPath();
            if (path == null) path = this.weightValuePath();
            var gap = (levelItem.groupGap != null) ? levelItem.groupGap : (levelItem.gap != null) ? levelItem.gap:0;
            var headerHeight = ((PrevItem.showHeader || PrevItem.showHeader == null) && !this.enableDrillDown()) ? PrevItem.headerHeight : (this.renderHeader && PrevItem.showHeader ? PrevItem.headerHeight : 0);
            var totalItemsCount = 0;
			
			for (var j = 0; j < cloneItemsCount; j++) {
                var treeItems = this._getGroupitem(path, cloneItems[j].Data, levelItem.headerHeight,groupingLevel);
				if (!legendCalculation) {
					if (layout == BoldBIDashboard.datavisualization.TreeMap.ItemsLayoutMode.SliceAndDiceHorizontal) {
						this._calculateSliceAndDiceItemSize(treeItems, cloneItems[j].LeftPosition + parseFloat(grouppading), cloneItems[j].TopPosition + parseFloat(grouppading), cloneItems[j].ItemWidth - (PrevItem.groupBorderThickness + (2 * parseFloat(grouppading))), cloneItems[j].ItemHeight - (PrevItem.groupBorderThickness + (2 * parseFloat(grouppading))), parseFloat(gap), headerHeight, true, 0);
					}
					else if (layout == BoldBIDashboard.datavisualization.TreeMap.ItemsLayoutMode.SliceAndDiceVertical) {
						this._calculateSliceAndDiceItemSize(treeItems, cloneItems[j].LeftPosition + parseFloat(grouppading), cloneItems[j].TopPosition + parseFloat(grouppading), cloneItems[j].ItemWidth - (PrevItem.groupBorderThickness + (2 * parseFloat(grouppading))), cloneItems[j].ItemHeight - (PrevItem.groupBorderThickness + (2 * parseFloat(grouppading))), parseFloat(gap), headerHeight, false, 0);
					}
					else if (layout == BoldBIDashboard.datavisualization.TreeMap.ItemsLayoutMode.SliceAndDiceAuto) {
						this._calculateSliceAndDiceItemSize(treeItems, cloneItems[j].LeftPosition + parseFloat(grouppading), cloneItems[j].TopPosition + parseFloat(grouppading), cloneItems[j].ItemWidth - (PrevItem.groupBorderThickness + (2 * parseFloat(grouppading))), cloneItems[j].ItemHeight - (PrevItem.groupBorderThickness + (2 * parseFloat(grouppading))), parseFloat(gap), headerHeight, null, 0);
					}
					else {
						this._calculateSquarifiedItemSize(treeItems, cloneItems[j].LeftPosition + parseFloat(grouppading), cloneItems[j].TopPosition + parseFloat(grouppading), cloneItems[j].ItemWidth - (PrevItem.groupBorderThickness + (2 * parseFloat(grouppading))), cloneItems[j].ItemHeight - (PrevItem.groupBorderThickness + (2 * parseFloat(grouppading))), parseFloat(gap), headerHeight, 0);
					}                
					var headerItem = this._rootTreeMapItems[j];                
					headerItem.headerHeight = PrevItem.headerHeight;
					headerItem.showHeader = PrevItem.showHeader;
					headerItem.headerWidth = cloneItems[j].ItemWidth;
					headerItem.headerTemplate = PrevItem.headerTemplate;
					headerItem.headerLeftPosition = cloneItems[j].LeftPosition;
					headerItem.headerTopPosition = cloneItems[j].TopPosition;

					if (this.enableDrillDown())
						this._createBackGround(headerItem, PrevItem, cloneItems[j], disablebackground);                

					if (PrevItem.showHeader || PrevItem.showHeader == null) {
                   
						if(!this.enableDrillDown()){
							this._createBackGround(headerItem, PrevItem, cloneItems[j]);
							this._trigger("headerTemplateRendering", {
								levelItems: this._rootTreeMapItems,
								childItems: headerItem.Data,
								headerItem: headerItem,
								groupPath: PrevItem.groupPath,
								groupingLevel: groupingLevel,
								prevItem: PrevItem
							});
							this._generateHeaders(headerItem, PrevItem);
						}
						else {
							if (!this.renderHeader) {
								this.previousItem = headerItem;
							}
							if (groupingLevel == 0 || groupingLevel == undefined || groupingLevel == null)
								this.previousItem = null;
							if (this.renderHeader) {
								this._trigger("headerTemplateRendering", {
									levelItems: this._rootTreeMapItems,
									childItems: headerItem.Data,
									headerItem: headerItem,
									groupPath: PrevItem.groupPath,
									groupingLevel: BoldBIDashboard.util.isNullOrUndefined(groupingLevel) ? 0 : groupingLevel,
									prevItem: this.previousItem
								});
								this._generateHeaders(headerItem, PrevItem);
							}
						}
					}
                }
                cloneItems[j].ChildtreeMapItems = treeItems;
                cloneItems[j].GroupingLevel = this.model.levels.indexOf(PrevItem) + 1;
				
                if (this.model.levels.indexOf(PrevItem) == 0 && !legendCalculation){
                    if (this.model.groupColorMapping != null && this.model.groupColorMapping.length > 0){
                        this._isLevelColors= true;
                        for (var a = 0; a < this.model.groupColorMapping.length; a++){
                            var colormapping = this.model.groupColorMapping[a];
                            if (colormapping.groupID == headerItem.header){
                                this._setColorMappings(treeItems, colormapping);
                            }
                        }
                    }
                }
                else if( this.model.levels.indexOf(PrevItem) > 0 && !legendCalculation)
                {				
                    if (this.model.groupColorMapping != null  && this.model.groupColorMapping.length > 0){
                        for (var a = 0; a < this.model.groupColorMapping.length; a++){				
                            var colormapping = this.model.groupColorMapping[a];
                            if (colormapping.groupID == cloneItems[j].ParentHeader){
                                this._setColorMappings(treeItems, colormapping);
                            }
                        }
                    }
                }
				
                for (var k = 0; k < treeItems.length; k++) {
                    subItems[totalItemsCount] = treeItems[k];
                    if (treeItems[k].backgroundColor == null)
                        treeItems[k].backgroundColor = cloneItems[j].backgroundColor;
                    if (treeItems[k].backgroundOpacity == null)
                        treeItems[k].backgroundOpacity = cloneItems[j].backgroundOpacity;                   
                    if (((this.enableDrillDown()) || (subItems[totalItemsCount].ItemHeight < headerItem.ItemHeight - headerItem.headerHeight)) && !legendCalculation) {
                        subItems[totalItemsCount].ParentHeader = headerItem.header;
                        subItems[totalItemsCount].ItemHeight -= grouppading;
                        subItems[totalItemsCount].ItemWidth -= grouppading;
                        subItems[totalItemsCount].LeftPosition += PrevItem.groupBorderThickness;
                        subItems[totalItemsCount].TopPosition += PrevItem.groupBorderThickness;
                       
                    }
                    totalItemsCount++;
                }              
            }
            if (disablelabels == undefined &&  PrevItem.showLabels && !legendCalculation) {
                this._generateLabels(cloneItems, PrevItem);
            }
        },
       
        _createBackGround: function (header, level,parentitem, disablebackground) {            
            var rect = bbdesigner$("<div id='"+ this._id +'_'+ header.header + "'" +"/>");
            var height = (header.showHeader || header.showHeader == null || this.enableDrillDown()) ? header.ItemHeight - (2 * level.groupBorderThickness) : 0;
            var top = (header.showHeader || header.showHeader == null || this.enableDrillDown()) ? header.TopPosition : 0;
            rect.css({
                "height": height + "px",
                "width": header.ItemWidth - (2 * level.groupBorderThickness) + "px",
                "left": header.LeftPosition + "px",
                "top": top + "px",
                "border-style": "solid",
                "-webkit-user-select": "none",
                "user-select": "none",
                "-webkit-touch-callout": "none", 
                "outline":0,
                "border-width": level.groupBorderThickness+"px",
                "position": "absolute"               
            });

            if(level.groupBorderColor!=null)
            {
                rect.css("border-color",level.groupBorderColor);
            }
            if(level.groupBackground!=null)
            {
                rect.css("background-color",level.groupBackground);
            }
            this.treemapgroups.push(rect);
            rect.appendTo(this._backgroundTile);
            var height = parseFloat(rect[0].style.top) - 20 - this._legendHeight + "px";            
            if (this.enableDrillDown() && !disablebackground) {
                var hoverrect = bbdesigner$("<div class='drillGroupRect'/>");
                hoverrect.css({
                    "height": rect[0].style.height,
                    "width": rect[0].style.width,
                    "left": rect[0].style.left,
                    "top": height,
                    "position": "absolute",
                    "opacity": 0.2,
                    "display": "block"
                });
                this._drillHoverDiv.append(hoverrect);
                bbdesigner$(hoverrect).mousedown({ treemap: this, level: level, param1: parentitem }, this._headerClickFunction);
			//	bbdesigner$(hoverrect).contextmenu({ treemap: this, level: level, param1: parentitem }, this.rightClick);
                bbdesigner$(hoverrect).mouseleave({ treemap: this, param1: header.header }, this._mouseLeaveFunction);
                var hoverData = { data: header.Data, label:header.header, header: header.header };
                bbdesigner$(hoverrect).mousemove({ treemap: this, hoverItem: hoverData }, this._mouseRectHoverFunction);
				bbdesigner$(hoverrect).on("mouseenter",{ Param1: hoverData, Param2: this }, this._rectMouseEnter);				
				bbdesigner$(hoverrect).mouseleave({ treeMap: this }, this._rectMouseLeave);
            }
            bbdesigner$(rect).mousedown({ treemap: this, level: level, param1: parentitem }, this._headerClickFunction);
            bbdesigner$(rect).mousemove({ treemap: this, hoverItem: header.Data }, this._mouseRectHoverFunction);
        },

        _mouseRectHoverFunction: function (event) {
          
            var treeMap = event.data.treemap;
            var item = event.data.hoverItem, spacing = 10;
            if (treeMap.showTooltip()) {
                var treeMapContainer = document.getElementById(treeMap._id);
                var treemapBounds = treeMapContainer.getBoundingClientRect();
				var drilldownlabel = document.getElementsByClassName('e-drilldownHeader');
				var drilldownlabelBounds = drilldownlabel[0].getBoundingClientRect();
                var element = treeMap._toolTipElement;
				bbdesigner$(element).css({"visibility": "visible" });
                var template = treeMap.model.tooltipTemplate;
                var scale = treemapBounds.width / treeMapContainer.offsetWidth;
                if (element != null && template != null) {
                    bbdesigner$(element).css({ "left": event.pageX + 10, "top": event.pageY + 10, "display": "block" });
                    var htmlString = bbdesigner$("#" + template).render(item);
                    bbdesigner$(element).html(htmlString);
                    var height = element[0] != null ? element[0].clientHeight : element.clientHeight;
                    var width = element[0] != null ? element[0].clientWidth : element.clientWidth;
                    treeMap._tooltipSize = { height: height, width: width };
                }

                var tooltipSize = treeMap._tooltipSize;
                if (tooltipSize.width + event.pageX >= treemapBounds.x + treemapBounds.width) {
                    event.pageX -= scale * tooltipSize.width;
                    if (event.pageX < 0) {
                        event.pageX = 10;
                    }
                }
                if (tooltipSize.height + event.pageY + drilldownlabelBounds.height + (spacing * 2) >= treemapBounds.y + treemapBounds.height) {
                    event.pageY -= scale * tooltipSize.height;
                    if (event.pageY < 0) {
                        event.pageY = 10;
                    }
                }
                if (element != null) {

                    if (treeMap.enableDrillDown()) {
                        bbdesigner$(element).css({ "left": event.pageX , "top": event.pageY , "display": "block" });

                    }
                    else {
                        bbdesigner$(element).css({ "left": event.pageX + 10, "top": event.pageY + 10, "display": "none" });

                    }

                }

            }
        },		        
               
        _mouseLeaveFunction: function (event) {
            var treeMap = event.data.treemap;
            if (treeMap.showTooltip())
            {
                if (treeMap._toolTipElement != null) {
                    bbdesigner$(treeMap._toolTipElement).css("display", "none");
                }
            }
        },
		       
        _headerClickFunction: function (event) {
            var level = event.data.level;
            var data = event.data.param1;
            var ctrlkey = event.ctrlKey;
            var treeMap = event.data.treemap;
			treeMap._invisibility = null;
			treeMap._drillDownLevelData = data;
			treeMap._levelItemCollections = [];
			treeMap._groupLevelItemCollection();
			treeMap._headerClick = true;
			var	onDemandArgs = {
				evt:event,level: level, header: data, treeMap: treeMap, data:data, prevLevel: data.Data,selectedItems: [data.Data],rightClick:false,
				doubleClick:(treeMap._doubleTapTimer != null && (new Date() - treeMap._doubleTapTimer < 300)), 	
				};	
            if (treeMap.highlightGroupOnSelection()) {
                if (treeMap._browser != "msie") {
                    var lastItem = treeMap._backgroundTile[0].children[treeMap._backgroundTile[0].children.length - 0];
                    treeMap._backgroundTile[0].insertBefore(this, lastItem);
                }
                if (treeMap.groupSelectionMode() == "multiple" &&  ctrlkey) {

                    if (bbdesigner$.inArray(this,treeMap._prevSelectedHeaders)==-1) {
                        bbdesigner$(this).css({ "border-width": treeMap.model.highlightGroupBorderThickness, "border-color": treeMap.highlightBorderBrush() });
                        treeMap._prevSelectedHeaders.push(this);
                        treeMap._prevSelectedGroupDatas.push(event.data.Param1);
                    }
                    else {
                        
                        bbdesigner$(this).css({ "border-width": level.groupBorderThickness, "border-color": level.groupBorderColor });
                        var index = treeMap._prevSelectedHeaders.indexOf(this);
                        treeMap._prevSelectedHeaders.splice(index, 1);
                        treeMap._prevSelectedGroupDatas.splice(index, 1);
                    }
                }
                else {
                    for (var k = 0; k < treeMap._prevSelectedHeaders.length; k++) {
		               
                        bbdesigner$(treeMap._prevSelectedHeaders[k]).css({ "border-width": level.groupBorderThickness, "border-color": level.groupBorderColor });
                    }

                    if (bbdesigner$.inArray(this, treeMap._prevSelectedHeaders) == -1) {
                        bbdesigner$(this).css({ "border-width": treeMap.model.highlightGroupBorderThickness, "border-color": treeMap.highlightBorderBrush() });
                        treeMap._prevSelectedHeaders = [];
                        treeMap._prevSelectedHeaders.push(this);
                    }
                    else {
                        treeMap._prevSelectedHeaders = [];
                    }
		            
                    treeMap._prevSelectedGroupDatas.push(event.data.Param1);
                }
            }
            
            if (treeMap.enableDrillDown() && treeMap.model.levels.length > 1 && ((treeMap._drilldownItem != null && treeMap._drilldownItem.header != data.header) || treeMap._drilldownItem == null) && !treeMap.model.isVirtualRender) {
				    var args = { evt:event,level: treeMap._drilldownItems.length + 1, treeMap: treeMap, header: treeMap.getDrillDownHeader(treeMap._drilldownHeaders), prevLevel: treeMap._drilldownItems.length - 1 , selectedItems: data.Data,cancel:false,rightClick:false,
				                 doubleClick:(treeMap._doubleTapTimer != null && (new Date() - treeMap._doubleTapTimer < 300)), };
					if (event.which == 3) {
						if (treeMap.model.enableRightClick) {
							event.preventDefault(); 
							args.rightClick=true;
						//	treeMap._trigger("drillDownItemSelected", args );
						}
						return;
                    }
                    var item = treeMap._getSelectedItem(event, treeMap, treeMap.highlightGroupOnSelection() ? treeMap.treemapgroups : treeMap._rootTreeMapItems);
                    args.isSelected = item && bbdesigner$.inArray(item.Rectangle || item, treeMap.highlightGroupOnSelection() ? treeMap._prevSelectedHeaders :treeMap._prevSelectedItems) != -1;
                    args.selectedItems = [item.Data];
                    if (!event.private) { 					
					treeMap._trigger("drillDownItemAction", args );
					}
					treeMap._drillDownArgs = args;
					if(args.cancel){
						treeMap.rectClick(event);
						return false;
			        }
                    var header = "";
                    for(var i=0;i< treeMap._drillHeaderDiv[0].children[0].children.length;i++)
                    {
                        if (treeMap._drillHeaderDiv[0].children[0].children[i].className == "e-drilldownlabel")
                            header = treeMap._drillHeaderDiv[0].children[0].children[i].innerHTML;
                    }
                    treeMap._backgroundTile[0].innerHTML = "";
                    treeMap._labelTemplateElements = [];
                    treeMap._drillHeaderDiv[0].innerHTML = "";
                    treeMap._templateDiv[0].innerHTML = "";
                    treeMap._drillHoverDiv[0].innerHTML = "";
                    treeMap._originalHeaders.push(data.header);
                    treeMap._drilldownHeaders.push(data.header);
                    var treemapLevel = treeMap.model.levels[treeMap._drilldownHeaders.length - 1];
                    treemapLevel.groupingLevel = data.GroupingLevel;
                    treeMap._drillDownHeader(true, treemapLevel, data.Data);
                    treeMap._drilldownItem = data;
					if(treeMap._renderWithDrilledLevel){
						var previousData = treeMap._drillCurrentItem;
						for(j=0;j<previousData.length;j++){
							if(previousData[j].header == treeMap.model.drillDownDataValue){
								if(treeMap._drilldownItems.length == 0){
									treeMap._drilldownItems.push(previousData[j]);
								}
							}
						}
					}					
                    treeMap._drilldownItems.push(data);
                     var label = null;
                     for (var j = 0; j < treeMap._drilldownHeaders.length; j++) {
                         if (label == null)
                             label = treeMap._drilldownHeaders[j];
                         else label = label + "|~|" + treeMap._drilldownHeaders[j];
                     }
                    var rootItems1 = treeMap._getPreRenderEventData(data.Data);
                    var min, rootItems2,max
                    for (var k = 0 ; k < rootItems1.length ; k++) {
                        if(treeMap._drilldownItems.length + 1 >= treeMap.model.levels.length)                        
                            rootItems2 = rootItems1;
                        else
                            rootItems2 = treeMap._getPreRenderEventData(rootItems1[k].Data, treeMap._drilldownItems.length + 1);                            
                        for (var j = 0; j < rootItems2.length; j++) { 
                            min = min === undefined? rootItems2[j]:(min.colorWeight > rootItems2[j].colorWeight?rootItems2[j]: min);
							max = max === undefined ? rootItems2[j] : (max.colorWeight > rootItems2[j].colorWeight ? max : rootItems2[j] );
                        }
                    }
                    treeMap._trigger("preRender", { model: treeMap.model, maximumValue: rootItems1[0], minimumValue: min ,max : max, level: (treeMap._drilldownHeaders.length - 1 === -1) ? 0 : treeMap._drilldownHeaders.length - 1 });
                    var drillData = { event: event, drillDownLevel: treeMap._drilldownItems.length, headerLabel: label };
					treeMap._trigger("drillStarted", drillData);
					if (treeMap.showLegend()){
						treeMap._height = treeMap.element.height();
                        treeMap._width = treeMap.element.width();
                        treeMap._sizeCalculation();
					}            
					treeMap._setTreemapSize();
					if(!BoldBIDashboard.util.isNullOrUndefined(treeMap._toolTipElement)){
						var element = treeMap._toolTipElement;
						bbdesigner$(element).css({"visibility": "hidden" });
					}
                    treeMap._groupdrillDownLevels(data, treeMap._drilldownItems.length);
                    return false;
		       		        
			}
			else if (treeMap.enableDrillDown() && treeMap.model.isVirtualRender)
			{			    
			    treeMap._trigger("drillStarted", { treemap: treeMap.model });
                if (event.which == 3) {
						if (treeMap.model.enableRightClick) {
							event.preventDefault(); 
							onDemandArgs.rightClick=true;
							//treeMap._trigger("drillDownItemSelected", onDemandArgs );
						}
						return;
                    }			    
                var item = treeMap._getSelectedItem(event, treeMap, treeMap.highlightGroupOnSelection() ? treeMap.treemapgroups : treeMap._rootTreeMapItems);
                onDemandArgs.isSelected = item && bbdesigner$.inArray(item.Rectangle || item, treeMap.highlightGroupOnSelection() ? treeMap._prevSelectedHeaders :treeMap._prevSelectedItems) != -1;
                onDemandArgs.selectedItem = item;
			    setTimeout(function(){
					treeMap._trigger("drillDownItemSelected", onDemandArgs);
				}, 500);
                if(data.cancelDrilldown === true)
                {
                    treeMap.model.drillDownLevel--;
                    treeMap.runTimeSubitems(treeMap._prevData.pop(), null, treeMap._prevLevels.pop(), treeMap._prevLegend.pop());
                }
			}

        },

        _getPreRenderEventData: function (data, level) {
            var rootItems1, rootItems, currentLevel, 
            level = level >= this.model.levels.length - 1? this.model.levels.length -1 : level;
            if(level === undefined)
                currentLevel = this.model.levels[this._drilldownItems.length];
            else
                currentLevel = this.model.levels[level];
			
				var path = level == 0 ? !BoldBIDashboard.isNullOrUndefined(this.textPath()) ? this.textPath() : currentLevel.groupPath : currentLevel.groupPath; 
			/*if(this._headerClick){
			for(var q=0;q<this._levelItemCollections[0][0].Data.length;q++){
						var items1 = this._levelItemCollections[0][0].Data[q];
						if(!this._levelItemCollections[0][0].Data[q]._isVisible)
							this._levelItemCollections[0][0].Data[q]._isVisible = true;
						if(!this._levelItemCollections[0][0].isVisible)
							this._levelItemCollections[0][0].Data[q]._isVisible = true;
					}
			}*/
            rootItems1 = this._getGroupitem(path, data, currentLevel.headerHeight,level);
            var totalWeight = this._getTotalWeight(rootItems1);
            for (var i = rootItems1.length - 1; i >= 0; i--) {
                var item = rootItems1[i];
                item["AreaByWeight"] = item.weight / totalWeight;

            }
            var OrderedItems = rootItems1.sort(this._orderByAreaWight);

            return OrderedItems;
        },

        _getDynamicPreRenderEventData: function(data, level){
            var rootItems1 = this._getGroupitem(level.groupPath, data, level.headerHeight,level),
                totalWeight = this._getTotalWeight(rootItems1);
            for (var i = rootItems1.length - 1; i >= 0; i--) {
                var item = rootItems1[i];
                item["AreaByWeight"] = item.weight / totalWeight;
            }
            return rootItems1.sort(this._orderByAreaWight);
        },

        runTimeSubitems: function(objValue, header, level, legend, legendDrawn)
        {
            var colorMapping, items;
			var fillColor = this.model.fill;
            this._prevData.push(objValue);
            this._prevLevels.push(level);
            this._prevLegend.push(legend);
            header && this._drilldownHeaders.push(header);
            if(!legendDrawn){
                items = this._getDynamicPreRenderEventData(objValue, level || this.model.levels[0]);                                      
                this._trigger("preRender", { model: this.model, maximumValue: items[0], minimumValue: items[items.length - 1], legend: legend || this.model.legendSettings });
            }
            if (this.showLegend() && legend && !legendDrawn)                 
                this.refresh(true, legend);
            else{                
                this._generateRuntimeSubItems(objValue, fillColor, this.colorValuePath(), level);
                this._drillHeaderDiv[0].innerHTML = "";            
                this._drillDownHeader(true,level,objValue);            
            }
        },

        _generateRuntimeSubItems: function (Items, fill, path, levelItem)
        {
            this._labelTemplateElements = [];
            var itemColection = [];
			var fillColor = this.model.fill;
            var rootItems = this._getTopGroupitem(this.labelPath(), Items, 0);            
            levelItem = levelItem ? levelItem : (this.model.levels[this.model.drillDownLevel] || this.model.leafItemSettings);

                this._rootTreeMapItems = rootItems;
                this._getTopLevels(rootItems[0].innerItems, levelItem);
                this._generateTreeMapItems(rootItems[0].innerItems, fillColor, this.colorValuePath());                              
                if (levelItem.showLabels) {
                    this._generateLabels(rootItems[0].innerItems, levelItem);
                    this._renderLabels();
                }
        },
         rightClick: function (event) {
            var treeMap = this;
			var data = event.data.Param1;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var rect = item.Rectangle.getBoundingClientRect();
                if (rect.left < event.clientX && rect.left + rect.width > event.clientX
                    && rect.top < event.clientY && rect.top + rect.height > event.clientY) {                   
                    break;
                }
            }
			var items = treeMap._getSelectedItem(event, treeMap, treeMap.highlightGroupOnSelection() ? treeMap.treemapgroups : treeMap._rootTreeMapItems);
            var isSelected = item && bbdesigner$.inArray(items.Rectangle || items, treeMap.highlightGroupOnSelection() ? treeMap._prevSelectedHeaders :treeMap._prevSelectedItems) != -1;
            treeMap._trigger("treeMapItemRightSelected", { selectedItems: [item.Data], isSelected: isSelected, selectedItemLabel: item.ParentHeader, selectedItemLevel: treeMap._drilldownHeaders.length - 1, treeMap: treeMap, evt: event, rightClick: true, doubleClick:false });           
        },

        _getSelectedItem: function(event, treeMap, items){
            var x = event.clientX, y = event.clientY, item, rect;
            for (var i = 0; i < items.length; i++) {
                item = items[i];
                rect = (item[0] || item.Rectangle).getBoundingClientRect();
           
                if (rect.left < x && rect.left + rect.width > x
                && rect.top < y && rect.top + rect.height > y) {
                   
                    return item;
                }
            }
        },

            rectClick:function(event)
            {
                if (event.which == 3)
                    return;
                var treeMap = event.data.treemap;
                var itemCollection = event.data.Param1;
                var level = treeMap.model.levels[0];                
                var isContain, isSelected = false;
                var ctrlkey = event.ctrlKey;
                var clientX = event.clientX || this.getClientX(event), clientY = event.clientY || this.getClientY(event);
				treeMap._allowItemSelectEvent = false;
                if (treeMap.highlightGroupOnSelection()) {
                    for (var i = 0; i < treeMap.treemapgroups.length; i++) {
                        var item = treeMap.treemapgroups[i];
                        var rect = item[0].getBoundingClientRect();
                   
                        if (rect.left < event.clientX && rect.left + rect.width > event.clientX
                        && rect.top < event.clientY && rect.top + rect.height > event.clientY) {
                            bbdesigner$(item).css({
                                "border-width": treeMap.model.highlightGroupBorderThickness, "border-color": treeMap.highlightBorderBrush(),
                                "box-sizing":"border-box",
                                "-moz-box-sizing":"border-box",
                                "-webkit-box-sizing":"border-box",
                                "-webkit-user-select": "none",
                                "user-select": "none",
                                "-webkit-touch-callout": "none",
                                "outline":0,
                            });
							isContain = true;
                            break;
                        }
                    }
					if(isContain)
					{
                        if (treeMap.groupSelectionMode() == "multiple" && ctrlkey) {

                            if (bbdesigner$.inArray(item, treeMap._prevSelectedHeaders) == -1) {
                                bbdesigner$(item).css({ "border-width": treeMap.model.highlightGroupBorderThickness, "border-color": treeMap.highlightBorderBrush()});
                                treeMap._prevSelectedHeaders.push(item);
                                treeMap._prevSelectedGroupDatas.push(event.data.Param1);
                            }
                            else {
                                isSelected = true;
                                bbdesigner$(item).css({ "border-width": level.groupBorderThickness, "border-color": level.groupBorderColor,});
                                var index = treeMap._prevSelectedHeaders.indexOf(item);
                                treeMap._prevSelectedHeaders.splice(index, 1);
                                treeMap._prevSelectedGroupDatas.splice(index, 1);
                            }
                        }
                        else {
                            for (var k = 0; k < treeMap._prevSelectedHeaders.length; k++) {

                                bbdesigner$(treeMap._prevSelectedHeaders[k]).css({ "border-width": level.groupBorderThickness, "border-color": level.groupBorderColor });
                            }

                            if (bbdesigner$.inArray(item, treeMap._prevSelectedHeaders) == -1) {
                                bbdesigner$(item).css({ "border-width": treeMap.model.highlightGroupBorderThickness, "border-color": treeMap.highlightBorderBrush() });
                                treeMap._prevSelectedHeaders = [];
                           
                                treeMap._prevSelectedHeaders.push(item);
                            }
                            else {
                                isSelected = true;
                                treeMap._prevSelectedHeaders = [];                                              
                            }

                            treeMap._prevSelectedGroupDatas.push(event.data.Param1);
                        }								
					}
					treeMap._trigger("treeMapGroupSelected", { selectedItem: item, isSelected : isSelected, selectedGroups: treeMap._prevSelectedHeaders, orginalEvent: event });
                }

                if (treeMap.highlightOnSelection()) {

                    for (var i = 0; i < treeMap._rootTreeMapItems.length; i++) {
                        var item = treeMap._rootTreeMapItems[i];
                        var rect = item.Rectangle.getBoundingClientRect();
                        if (rect.left < clientX && rect.left + rect.width > clientX
                            && rect.top < clientY && rect.top + rect.height > clientY) { 
                            bbdesigner$(item.Rectangle).css({
                                "border-width": treeMap.highlightBorderThickness(), "border-color": treeMap.highlightBorderBrush(),
                                "box-sizing": "border-box",
                                "-moz-box-sizing": "border-box",
                                "-webkit-box-sizing": "border-box",
                                "-webkit-user-select": "none",
                                "user-select": "none",
                                "-webkit-touch-callout": "none",
                                "outline":0,
                            });
                            isContain = true;
                            break;
                        }
                    }

                    if (isContain) {
                        if (treeMap.selectionMode() == "multiple" && ctrlkey) {
                            if (bbdesigner$.inArray(item.Rectangle, treeMap._prevSelectedItems) == -1) {
                                bbdesigner$(item.Rectangle).css({
                                    "border-width": treeMap.highlightBorderThickness(), "border-color": treeMap.highlightBorderBrush(),
                                    "box-sizing": "border-box",
                                    "-moz-box-sizing": "border-box",
                                    "-webkit-box-sizing": "border-box",
                                    "-webkit-user-select": "none",
                                    "user-select": "none",
                                    "-webkit-touch-callout": "none"
                                });
                                treeMap._prevSelectedItems.push(item.Rectangle);
                                treeMap.selectedItems.push(item.Data);
                            }
                            else {
                                isSelected = true;
                                bbdesigner$(item.Rectangle).css({ "border-width": treeMap.borderThickness(), "border-color": treeMap.borderBrush() });
                                var index = treeMap._prevSelectedItems.indexOf(item.Rectangle);
                                treeMap._prevSelectedItems.splice(index, 1);
                                treeMap.selectedItems.splice(index, 1);
                            }
                        }
                        else {
                            for (var k = 0; k < treeMap._prevSelectedItems.length; k++) {
                                bbdesigner$(treeMap._prevSelectedItems[k]).css({ "border-width": treeMap.borderThickness(), "border-color": treeMap.borderBrush() });
                            }

                            if (bbdesigner$.inArray(item.Rectangle, treeMap._prevSelectedItems) == -1) {
                                bbdesigner$(item.Rectangle).css({ "border-width": treeMap.highlightBorderThickness(), "border-color": treeMap.highlightBorderBrush() });
                                treeMap._prevSelectedItems = [];
                                treeMap.selectedItems = [];
                                treeMap._prevSelectedItems.push(item.Rectangle);
                                treeMap.selectedItems.push(item.Data);
                            }
                            else {
                                isSelected = true;
                                treeMap._prevSelectedItems = [];
                                treeMap.selectedItems = [];
                            }
                        }
                        setTimeout(function(){
						if(!event.public)
							if(!treeMap._allowItemSelectEvent) {
                                treeMap._allowItemSelectEvent = true;
                                treeMap._trigger("treeMapItemSelected", { selectedItem: item, isSelected: isSelected, selectedItems: treeMap.selectedItems, originalEvent: event, rightClick: false, treeMap: treeMap, doubleClick: treeMap._allowDoubleClick });
                            }
						}, 500);
					}
                    
                }

            
        },

        getClientX: function(event){
            return event.pageX - bbdesigner$(document).scrollLeft();
        },

        getClientY: function(event){
            return event.pageY - bbdesigner$(document).scrollTop();
        },
        
            dragDown: function (event) {

                var treeMap = event.data.treemap;
                var level = treeMap.model.levels[0];

                var treeMapArea = treeMap.element;
                if (event.type == "mousedown") {
                    treeMap._startPoint = { x: event.pageX - treeMapArea[0].offsetLeft, y: event.pageY - treeMapArea[0].offsetTop };
                    treeMap._stopPoint = { x: event.pageX - treeMapArea[0].offsetLeft, y: event.pageY - treeMapArea[0].offsetTop };
                }
                else if (event.type == "touchstart") {
                    treeMap._startPoint = { x: event.originalEvent.changedTouches[0].pageX - treeMapArea[0].offsetLeft, y: event.originalEvent.changedTouches[0].pageY - treeMapArea[0].offsetTop };
                    treeMap._stopPoint = { x: event.originalEvent.changedTouches[0].pageX - treeMapArea[0].offsetLeft, y: event.originalEvent.changedTouches[0].pageY - treeMapArea[0].offsetTop };
                }
                else if (event.type == "MSPointerDown") {
                    treeMap._startPoint = { x: event.originalEvent.pageX - treeMapArea[0].offsetLeft, y: event.originalEvent.pageY - treeMapArea[0].offsetTop };
                    treeMap._stopPoint = { x: event.originalEvent.pageX - treeMapArea[0].offsetLeft, y: event.originalEvent.pageY - treeMapArea[0].offsetTop };
                }

                treeMap.mouseClickable = true;

                if (treeMap.model.draggingGroupOnSelection) {

                    if (treeMap._prevSelectedGroupDatas.length > 0) {
                        for (var i = 0; i < treeMap._prevSelectedGroupDatas.length; i++) {
                            var item = treeMap._prevSelectedGroupDatas[i][0];
                            var rect = item.getBoundingClientRect();
                            if (bbdesigner$.inArray(item, treeMap._prevSelectedGroupDatas[i][0]) == -1) {
                                bbdesigner$(treeMap._prevSelectedGroupDatas[i]).css({ "border-width": level.groupBorderThickness, "border-color": treeMap.model.highlightGroupBorderBrush });
                            }
                        }
                        treeMap._prevSelectedGroupDatas = [];
                    }
                }

                if (treeMap.model.draggingOnSelection) {

                    if (treeMap._prevSelectedItems.length > 0) {
                        for (var i = 0; i < treeMap._prevSelectedItems.length; i++) {
                            var item = treeMap._prevSelectedItems[i].rectangle;
                            var rect = item.getBoundingClientRect();
                            if (bbdesigner$.inArray(item, treeMap._prevSelectedItems[i].rectangle) == -1) {
                                bbdesigner$(treeMap._prevSelectedItems[i].rectangle).css({ "border-width": level.groupBorderThickness, "border-color": treeMap.model.highlightGroupBorderBrush });
                            }
                        }
                        treeMap._prevSelectedItems = [];
                    }
                }
            },

            dragMove: function (event) {

                var width; var height;
                var treeMap = event.data.treemap;
                var treeMapArea = treeMap.element;

                if (treeMap.model.draggingGroupOnSelection || treeMap.model.draggingOnSelection) {

                    if (treeMap.mouseClickable) {

                        if (event.type == "mousemove")
                            treeMap._stopPoint = { x: event.pageX - treeMapArea[0].offsetLeft, y: event.pageY - treeMapArea[0].offsetTop };
                        else if (event.type == "touchmove")
                            treeMap._stopPoint = { x: event.originalEvent.changedTouches[0].pageX - treeMapArea[0].offsetLeft, y: event.originalEvent.changedTouches[0].pageY - treeMapArea[0].offsetTop };
                        else if (event.type == "MSPointerMove")
                            treeMap._stopPoint = { x: event.originalEvent.pageX - treeMapArea[0].offsetLeft, y: event.originalEvent.pageY - treeMapArea[0].offsetTop };


                        bbdesigner$('#dragDiv').remove();
                        var div = bbdesigner$('<div id = "dragDiv"></div>');

                        width = Math.abs(treeMap._stopPoint.x - treeMap._startPoint.x),
                        height = Math.abs(treeMap._stopPoint.y - treeMap._startPoint.y);
                        bbdesigner$(div).css({ "top": Math.min(treeMap._startPoint.y, treeMap._stopPoint.y), "left": Math.min(treeMap._startPoint.x, treeMap._stopPoint.x), width: width, height: height, border: "1px solid green", position: "absolute", "z-index": 100 });
                        bbdesigner$(div).appendTo("#svgDocument");
                    }
                }
            },

            dragUp: function (event) {

                var treeMap = event.data.treemap;
                var width = Math.abs(treeMap._stopPoint.x - treeMap._startPoint.x);
                var height = Math.abs(treeMap._stopPoint.y - treeMap._startPoint.y);
                var treeMapArea = treeMap.element;

                if (treeMap.model.draggingGroupOnSelection || treeMap.model.draggingOnSelection) {

                    bbdesigner$('#dragDiv').remove();
                    bbdesigner$("#dragDiv").css({
                        "display": "none"
                    });
                    treeMap.mouseClickable = false;
                }

                if (treeMap.model.draggingGroupOnSelection) {

                    for (var i = 0; i < treeMap.treemapgroups.length; i++) {
                        var item = treeMap.treemapgroups[i];
                        var rect = item[0].getBoundingClientRect();

                        if (!(rect.left - treeMapArea[0].offsetLeft + rect.width < Math.min(treeMap._startPoint.x, treeMap._stopPoint.x) || Math.min(treeMap._startPoint.x, treeMap._stopPoint.x) + width < rect.left - treeMapArea[0].offsetLeft ||
                            rect.top - treeMapArea[0].offsetTop + rect.height < Math.min(treeMap._startPoint.y, treeMap._stopPoint.y) || Math.min(treeMap._startPoint.y, treeMap._stopPoint.y) + height < rect.top - treeMapArea[0].offsetTop)) {
                            if (!treeMap._contains(treeMap._prevSelectedGroupDatas, item))
                                treeMap._prevSelectedGroupDatas.push(item);
                        }
                    }

                    for (var i = 0; i < treeMap._prevSelectedGroupDatas.length; i++) {
                        var item = treeMap._prevSelectedGroupDatas[i][0];
                        var rect = item.getBoundingClientRect();

                        bbdesigner$(item).css({
                            "border-width": treeMap.model.highlightGroupBorderThickness, "border-color": treeMap.model.highlightGroupBorderBrush,
                            "box-sizing": "border-box",
                            "-moz-box-sizing": "border-box",
                            "-webkit-box-sizing": "border-box",
                            "-webkit-user-select": "none",
                            "user-select": "none",
                            "-webkit-touch-callout": "none"
                        });
                    }
                    treeMap.selectedItems.push(treeMap._prevSelectedGroupDatas);
                }

                if (treeMap.model.draggingOnSelection) {

                    for (var i = 0; i < treeMap._rootTreeMapItems.length; i++) {
                        var item = treeMap._rootTreeMapItems[i];
                        var rect = item.rectangle.getBoundingClientRect();

                        if (!(rect.left - treeMapArea[0].offsetLeft + rect.width < Math.min(treeMap._startPoint.x, treeMap._stopPoint.x) || Math.min(treeMap._startPoint.x, treeMap._stopPoint.x) + width < rect.left - treeMapArea[0].offsetLeft ||
                             rect.top - treeMapArea[0].offsetTop + rect.height < Math.min(treeMap._startPoint.y, treeMap._stopPoint.y) || Math.min(treeMap._startPoint.y, treeMap._stopPoint.y) + height < rect.top - treeMapArea[0].offsetTop)) {
                            if (!treeMap._contains(treeMap._prevSelectedItems, item))
                                treeMap._prevSelectedItems.push(item);
                        }
                    }

                    for (var i = 0; i < treeMap._prevSelectedItems.length; i++) {
                        var item = treeMap._prevSelectedItems[i].rectangle;
                        var rect = item.getBoundingClientRect();
                        bbdesigner$(item).css({
                            "border-width": treeMap.model.highlightGroupBorderThickness, "border-color": treeMap.model.highlightGroupBorderBrush,
                            "box-sizing": "border-box",
                            "-moz-box-sizing": "border-box",
                            "-webkit-box-sizing": "border-box",
                            "-webkit-user-select": "none",
                            "user-select": "none",
                            "-webkit-touch-callout": "none"
                        });
                    }
                    treeMap.selectedItems.push(treeMap._prevSelectedItems);
                }
            },

        _generateLabels: function (Items,level) {            
            for (var i = 0; i < Items.length; i++) {
                var item = Items[i];
                if (level.labelTemplate == null) {                    
                    var leftpaddingsize = 8;
                    var toppaddingsize = 5;
                    var textcon = bbdesigner$('<label style="font-size:10px;font-weight:normal;font-family:Roboto;">' + item.label + '</label>');
                        if (this.enableDrillDown() || this.model.isVirtualRender) {
                            bbdesigner$(textcon).css({
                                "position": "absolute", "color": "black",
                                "overflow": "hidden", "left": item.LeftPosition + leftpaddingsize + "px",
                                "top": item.TopPosition + toppaddingsize + "px", "font-weight": "normal", "pointer-events": "none"
                            });
                        }
                        else {
                            bbdesigner$(textcon).css({
                                "position": "absolute", "color": "white",
                                "overflow": "hidden", "left": item.LeftPosition + leftpaddingsize + "px",
                                "top": item.TopPosition + toppaddingsize + "px", "font-weight": "normal", "pointer-events": "none"
                            });
                        }
                        this._treeMapLabels.push(textcon);
                        this._templateDiv.append(textcon);
                        var padding = 0, borderthickness = 0;
                        if (level.groupPadding != undefined)
                            padding = level.groupPadding;
                        if (level.groupBorderThickness != undefined)
                            borderthickness = level.groupBorderThickness;
                        var labelWidth = this._calculateTextWidth(item.label);
                        var labelHeight = textcon[0].getBoundingClientRect().height;
                        if (labelHeight == 0)
                            labelHeight = 18;
                        else if (labelHeight > 0 && labelHeight > item.ItemHeight)
                            labelHeight = item.ItemHeight - toppaddingsize;
                        bbdesigner$(textcon).css({ "width": labelWidth + "px", "height": labelHeight + "px" });
                        item.labelPosition = level.labelPosition;
                        item.labelVisibilityMode = borderthickness;
                        item.groupPadding = level.groupPadding;
                        item.groupBorderThickness = level.groupBorderThickness;
                        textcon[0].data = item;
                        this._labelTemplateElements.push(textcon);
                        if (level.labelVisibilityMode == BoldBIDashboard.datavisualization.TreeMap.VisibilityMode.HideOnExceededLength) {
                            if (labelWidth > item.ItemWidth) {
                                bbdesigner$(textcon).css({
                                    "display": "none",


                                });
                                if (item.Rectangle != null)
                                    item.Rectangle.title = item.label;

                            }
                            var textMode = level.labelVisibilityMode;
                        }
                    }
                    if (level.labelTemplate != null) {
                        var OriginalNode = bbdesigner$("#" + level.labelTemplate);
                        var item_templateDiv = bbdesigner$("<div style='overflow:hidden;display:block;position:absolute;pointer-events: none;'></div>");
                        item_templateDiv[0].data = item;
                        item.labelPosition = level.labelPosition;
                        item.labelVisibilityMode = level.labelVisibilityMode;
                        var tmpl2 = bbdesigner$.templates(OriginalNode.html());
                        var htmlString = "";
                        if (item.Data instanceof Array)
                            htmlString = tmpl2.render(item.Data[0]);

                        else
                            htmlString = tmpl2.render(item.Data);
                        bbdesigner$(item_templateDiv).html(htmlString);
                        this._templateDiv.append(item_templateDiv);
                        this._labelTemplateElements.push(item_templateDiv);
                    }
                }


            },
        _calculateTextWidth: function (text) {
            var span = bbdesigner$('<span>' + text + '</span>');
            bbdesigner$('body').append(span);
            var width = span.width();
            span.remove();
            return width;
        },

        _generateToolTip: function () {

            if (this.showTooltip()) {
                if (document.documentMode == 8){
                    var tooltip = document.querySelectorAll("tooltipelement");
                }
                else{
                    var tooltip = document.getElementsByClassName("tooltipelement");
                }
                if (tooltip != null && tooltip.length == 0) {
                    var tooltip_templateDiv = bbdesigner$("<div class='tooltipelement' style='display:none;position:absolute;z-index:1000;pointer-events:none;'></div>");
                    bbdesigner$(document.body).append(tooltip_templateDiv);
                    this._toolTipElement = tooltip_templateDiv;
                }
                else
                {
                    this._toolTipElement = tooltip[0];
                }
                if (this.model.tooltipTemplate == null) {

                    var path;
                    if (this.labelPath()!=null)
                        path = this.labelPath();
                    else 
                        path = this.weightValuePath();
                    if (path != null) {
                        this.model.tooltipTemplate = 'defaultTooltip';

                        this.element.append(bbdesigner$('<div id="defaultTooltip" style="display:none;"><div style="margin-left:10px;margin-top:-25px;"><div class="defaultToolTip"><p style="margin-top:-4px"><label  style="color:rgb(27, 20, 20);font-size:10px;font-weight:normal;font-family:Roboto">{{:#data["' + path + '"]}}</label></p></div></div></div>'));
                    }
                }
            }           
        },

        _generateLegend: function (legendSettings, drilldownItems, level) {
			this._legendToggle=null;
			level = BoldBIDashboard.util.isNullOrUndefined(level) ? 0 : level;
			var path = level !=0 ? this.model.levels[level].groupPath : this.textPath() || this.model.colorPath;
			this._currentLevel = level;
			var treemapItems1; var drillItems = this._identityGroupPathItem(path);
            if (this.model.rangeColorMapping != null || this.model.colorPath != null) {
				treemapItems1 =  drillItems;
                var colormapping = this.model.rangeColorMapping != null && this.model.rangeColorMapping.length > 0 ? this.model.rangeColorMapping : treemapItems1;
                var isRange = this.model.rangeColorMapping != null && this.model.rangeColorMapping.length > 0 ? true : false;
                legendSettings = bbdesigner$.extend({}, this.model.legendSettings, legendSettings, true);
                if (legendSettings.mode != BoldBIDashboard.datavisualization.TreeMap.LegendMode.Interactive) {

                var xPos = 0;
                var yPos = 0;

                var columnWidth = 0;
                var width = 0;
                var height = 0;
                var iconwidth = this.iconWidth() + 5;
                var totalHeight = this.iconHeight() + 15;
				var titleHeight = this._calcHeight(legendSettings.title);
                var totalWidth = 0, itemIconSpace = 20, commonEventArgs;
                var columnCount = this.model.legendSettings.columnCount;
				if (legendSettings.title != null && legendSettings.title != "") {										
					var text = titleText = legendSettings.title;
					var textcon = this._createLabel(text, xPos, yPos, 'e-defaultLegend-title');
					textcon[0].title = titleText;					
					textcon.appendTo(this._legenddiv);					
					yPos += titleHeight;
				}
                for (var i = 0; i < colormapping.length; i++) {
					if(!isRange){
						this._legendTreemapItems =  treemapItems1;						
						var labelPath =  this._currentLevel ? this.model.levels[this._currentLevel].groupPath : this.textPath() || this.model.colorPath;
						treemapItems1[i].legendLabel = this.showLegend() ? treemapItems1[i].Data[0] ? treemapItems1[i].Data[0][labelPath] : treemapItems1[i].Data[labelPath] : treemapItems1[i].header;
						
						if(!this._headerClick){
							treemapItems1[i].color = treemapItems1[i].Data[0] ? treemapItems1[i].Data[0][this.colorPath()] : treemapItems1[i].Data[this.colorPath()];
						}
					}
					else{
						if(!this._invisibility){
							colormapping[i].isVisible = true;
						}
						else{
							colormapping[i].isVisible = BoldBIDashboard.isNullOrUndefined(colormapping[i].isVisible) ? this._invisibility[0] == colormapping[i].legendLabel ? false : true : colormapping[i].isVisible;
							if(!colormapping[i].isVisible){
								if (bbdesigner$.inArray(this._currentToggle, this._tog) == -1){
									if(!this._isremoved){
										this._tog.push(this._currentToggle);
										if(this._currentInvisibleItem.length > 0){
											this._rangeInVisibility.push(this._currentInvisibleItem);
										}
										else{
											this._rangeInVisibility.push(this._currentToggle);
										}
									}
								}
							}
						}
					}
					commonEventArgs = {
                        color: isRange ? colormapping[i].color : colormapping[i]._color ? colormapping[i]._color : colormapping[i].color,						
                        legendLabel: colormapping[i].legendLabel != null ? colormapping[i].legendLabel : !isRange ? colormapping[i].value != null ? colormapping[i].value : colormapping[i][this.textPath()]: colormapping.from,
                        dataSource: isRange ? undefined : colormapping[i].Data,
                        mapping: isRange ? colormapping[i] : undefined,
						visible: colormapping[i].isVisible ? true : false,
						index: i,
                    };
					commonEventArgs.color = colormapping[i].isVisible ? !BoldBIDashboard.util.isNullOrUndefined(commonEventArgs.color) ? commonEventArgs.color: "black" : "grey";
                    this._trigger("legendItemRendering", { model: this.model, data: commonEventArgs });
                    var labelwidth = this._calcWidth(colormapping[i].legendLabel);
                    var legendWidth = this.iconWidth() + labelwidth + itemIconSpace; 


                    if (columnCount != 0) {
                        if (i % columnCount != 0) {
                           
                            this._drawLegend(commonEventArgs, xPos, yPos, legendSettings);
                            xPos += (legendWidth+5);

                        }
                        else {
                            if (i != 0)
                            yPos += (this.iconHeight() + 18);
                            xPos = 0;
                            this._drawLegend(commonEventArgs, xPos, yPos, legendSettings);
                            xPos += (legendWidth + 5);
                        }
                        }
                    else {
                        if (this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Top || this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Bottom) {

                            if (this._legendSize.width < xPos + legendWidth) {

                                yPos += (this.iconHeight() + 18);
                                xPos = 0;
                                this._drawLegend(commonEventArgs, xPos, yPos, legendSettings, level);
                                xPos += legendWidth;
                            }
                            else {
                                this._drawLegend(commonEventArgs, xPos, yPos, legendSettings, level);
                                xPos += legendWidth;
                            }
                            }
                        else {

                            if (this._legendSize.height < yPos + this.iconHeight()) {

                                yPos = 0;
                                xPos += (columnWidth + 10);
                                this._drawLegend(commonEventArgs, xPos, yPos, legendSettings);
                                columnWidth = 0;
                                yPos += (this.iconHeight() + 18);
                            }
                            else {
                                this._drawLegend(commonEventArgs, xPos, yPos, legendSettings);
                                columnWidth = Math.max(columnWidth, legendWidth);
                                yPos += (this.iconHeight() + 18);
                                }
                            }

                        }
                    }

                }
                else {
                    this._drawInteractiveLegend(legendSettings);
                }
                if ((this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Top || this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Bottom) && legendSettings.alignment == BoldBIDashboard.datavisualization.TreeMap.Alignment.Center) {
                    this._legenddiv.css({
                        "margin-left": (this._width / 2) - (this._legendSize.width / 2)
                    });
                }
                else if ((this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Top || this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Bottom) && legendSettings.alignment == BoldBIDashboard.datavisualization.TreeMap.Alignment.Far) {
                    this._legenddiv.css({
                        "margin-left": this._width - this._legendSize.width
                    });
                }
                else if ((this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Left || this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Right) && legendSettings.alignment == BoldBIDashboard.datavisualization.TreeMap.Alignment.Center) {
                    this._legenddiv.css({
                        "margin-top": (this._height / 2) - (this._legendSize.height / 2)
                    });
                }
                else if ((this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Left || this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Right) && legendSettings.alignment == BoldBIDashboard.datavisualization.TreeMap.Alignment.Far) {
                    this._legenddiv.css({
                        "margin-top": this._height - this._legendSize.height
                    });
                }

                if (this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Bottom) {
                    this._legenddiv.css({
                        "margin-top": this._height + 5
                    });
                }
                else if (this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Right) {

                    this._legenddiv.css({

                        "margin-left": this._width + 5

                    });
                }
            }
        },
		 _drawLegend: function (colormapping, xPos, yPos, legendSettings, level) {
            var legendItem;
            legendSettings = bbdesigner$.extend({}, this.model.legendSettings, legendSettings, true);
            if (legendSettings.template == "Ellipse") {
                legendItem = this._getEllipseLegend(legendSettings, xPos, yPos, colormapping);
            }
            else {
                legendItem = this._getRectLegend(legendSettings, xPos, yPos, colormapping);
            }
            xPos += (this.iconWidth() + 5);
            bbdesigner$(legendItem).css("background-color", colormapping.visible ? colormapping.color : "grey" );
			if(!BoldBIDashboard.util.isNullOrUndefined(colormapping.mapping)){
			if(!BoldBIDashboard.util.isNullOrUndefined(colormapping.mapping.gradientColors)){
				var gradLength = colormapping.mapping.gradientColors.length;
				var grad = "linear-gradient" + "(" + "to right" + ","
				var x = colormapping.mapping.gradientColors[0];
				for(var i=1;i<gradLength;i++)
					x += "," + colormapping.mapping.gradientColors[i] ;	
					grad  = grad + x + ")";
					colormapping.mapping.color = grad;
					bbdesigner$(legendItem).css("background", colormapping.visible ? colormapping.mapping.color : "grey");
			}			
			}
            legendItem.appendTo(this._legenddiv);
			/*if(level){
			var levelBindData = this.model.levels[level].groupPath;
			var dataValue = this._reflection(colormapping.dataSource[0] ? colormapping.dataSource[0] : colormapping.dataSource, levelBindData);
			var data = dataValue.replace(' ', '_');
			}else{*/
				var dataValue = colormapping.legendLabel;
			//var data = colormapping.legendLabel.replace(' ', '_');
			//}
            var legendText = bbdesigner$("<div class='e-treemap-legendLabel' id='"+ this._id + "LegendText_" + colormapping.index + "'/>");
            legendText.css({
                "left": xPos + "px",
                "top": yPos + "px",
                "position": "absolute",
				"font-size": "12px",
				"font-weight":"normal",
				"cursor": legendSettings.toggleVisibility ? "pointer" : "default",
				"color" : !colormapping.visible ? "grey" : "black",
                    });
             legendText[0].innerHTML = dataValue;
            legendText.appendTo(this._legenddiv);
        },
		
		_calcHeight: function(text){
			var ele = bbdesigner$('<div class ="e-defaultLegend-title" >' + text + '</div>');			
		    bbdesigner$('body').append(ele);
			var height = ele.height();
			ele.remove();
            return height;
		},
       
        _calcWidth: function (text) {
           var span = bbdesigner$('<span class ="e-treemap-legendLabel" >' + text + '</span>');
            bbdesigner$('body').append(span);
            var width = span.width();
            span.remove();
            return width;
        },
        
        _getEllipseLegend: function (legengItem, xPos, yPos, colormapping) {
			var data = colormapping.legendLabel.replace(' ', '_');
            var rect = bbdesigner$("<div class='e-mapLegend' id='" + this._id + "LegendIcon_" + colormapping.index +  "'/>");
            rect.css({
                "height": this.iconHeight()+ "px",
                "width": this.iconWidth() + "px",
                "border-radius":this.iconHeight()/2+"px",
                "left": xPos + "px",
                "top": yPos + "px",
                "position": "absolute",
				"cursor": legengItem.toggleVisibility ? "pointer" : "default"
            });
            return rect;

        },
       
        _getRectLegend: function (legengItem, xPos, yPos, colormapping) {
		 		var data = colormapping.legendLabel.replace(' ', '_');
			var rect = bbdesigner$("<div id='"+ this._id + "LegendIcon_" + colormapping.index + "'/>");
            rect.css({
                "height": this.iconHeight()+ "px",
                "width": this.iconWidth() + "px",                
                "left": xPos + "px",
                "top": yPos + "px",
                "position": "absolute",
				"cursor": legengItem.toggleVisibility ? "pointer" : "default"
            });
            return rect;
        },
        
        _getPositionFromParent: function (element, parentelement) {
            var child = element.getBoundingClientRect();
            var parent = parentelement.getBoundingClientRect();
            var width = window.SVGSVGElement ? child.width: child.right-child.left;
            var height = window.SVGSVGElement ? child.height : child.bottom - child.top;            
            return { left: child.left - parent.left, top: child.top - parent.top, height: height, width: width };
        },
        
        _renderLabels: function () {
            var ele = document.getElementById(this._id);
            var scale = ele.getBoundingClientRect().width / ele.offsetWidth;
            for (var j = 0; j < this._labelTemplateElements.length; j++) {
                var label = this._labelTemplateElements[j];
                var bounds = this._getPositionFromParent(label[0], this._templateDiv[0]);
                var item = label[0].data;
                var pos = this._getDockPositionPoint({left:item.LeftPosition,top:item.TopPosition, width: item.ItemWidth, height: item.ItemHeight }, bounds, item);
                
                bbdesigner$(label).css({
                    "left": pos.x,
                    "top": pos.y,
                    "pointer-events": "none",
                    "overflow":"hidden"
                });
                if (item.labelVisibilityMode == BoldBIDashboard.datavisualization.TreeMap.VisibilityMode.HideOnExceededLength) {
                    if (bounds.height > scale * item.ItemHeight || bounds.width > scale * item.ItemWidth) {
                        bbdesigner$(label).css("display", "none");
                    }
                }
            }
        },
       
        _generateHeaders: function (headerValue,level) {           
            var textMode = level.headerVisibilityMode;
            var generateHeader = false;
            var leftpadding = 2;
            var toppadding = 2;
            if (textMode == BoldBIDashboard.datavisualization.TreeMap.VisibilityMode.HideOnExceededLength) {
                var textelement = bbdesigner$('<span>'+headerValue.header+'</span>');
                bbdesigner$(document.body).append(textelement);
                var width = textelement.outerWidth();
                textelement.remove();
                if (headerValue.headerHeight < (headerValue.ItemHeight- (2 * leftpadding)) && width < (headerValue.ItemWidth-(2 * toppadding))){
                    generateHeader = true;
                }					
            }
            else {
                if (headerValue.headerHeight < headerValue.ItemHeight){
                    generateHeader = true;
                }
            }
            if(generateHeader) {
                if (headerValue.headerTemplate == null) {
                    var headerItem = bbdesigner$('<div style="display:block;position:absolute;pointer-events: stroke;overflow: hidden;"><label style="font-size:10px;font-weight:normal;font-family:Roboto;">' + headerValue.header + '</label></div>');
                    bbdesigner$(headerItem).css({
                        "left": headerValue.headerLeftPosition+leftpadding,
                        "top": headerValue.headerTopPosition+toppadding,
                        "width": headerValue.headerWidth - level.groupPadding,
                        "height": headerValue.headerHeight,
                        "margin-left": level.groupPadding                    
                    });
                    this._templateDiv.append(headerItem);
                }
                else {
                    var item_templateDiv = bbdesigner$("<div style='display:block;position:absolute;pointer-events: none;overflow: hidden;'></div>");
                    this._templateDiv.append(item_templateDiv);
                    bbdesigner$(item_templateDiv).css({
                        "left": headerValue.headerLeftPosition,
                        "width": headerValue.headerWidth, "top": headerValue.headerTopPosition,
                        "height": headerValue.headerHeight,
                        "-webkit-user-select": "none",
                        "user-select": "none",
                        "-webkit-touch-callout": "none"
                    });
                    var arguments = { header: headerValue.header, data: headerValue.Data };
                    var htmlString = bbdesigner$("#" + headerValue.headerTemplate).render(arguments);
                    bbdesigner$(item_templateDiv).html(htmlString);
                }
            }
        },

        getDrillDownHeader:function(header)
        {
            var headerString = "";
            if(header.length==1)
            {
                return header[0];
            }
            else{
                for (var index = 0; index < header.length; index++)
                {
                    headerString += header[index];
                    if(index!=header.length-1)
                    {
                         headerString += this.model._connectorText || ".";
                    }
                }
            }
            return headerString;
            
        },
	
        _drillDownHeader: function (enableNavigation,levelItem, childItems) {
			if(enableNavigation)
			{
			var treeMapEventArgs = {
                groupingLevel: levelItem.groupingLevel,
                groupPath: levelItem.groupPath,
                childItems: childItems,
                levelItems: levelItem,
                headerItem: {
                    drilldownHeaders: this._drilldownHeaders,
                    originalHeaders: this._originalHeaders
                },
                connectorText: "."
            };
            this._trigger("headerTemplateRendering", treeMapEventArgs);
            this.model._connectorText = treeMapEventArgs.connectorText;
			}
            var labelValue = [];
            var label = [];            
            for (var i = 0; i < this._drilldownHeaders.length;i++)
            {                
                labelValue += "<label class='e-drilldownlabel e-drilldowntext'>" + this._drilldownHeaders[i] + "</label>";
                if (this._drilldownHeaders.length > 1 && i < this._drilldownHeaders.length-1)
                {                    
                    labelValue = labelValue + this.model._connectorText;
                }                  
            }

            var item_templateDiv = bbdesigner$("<div class='e-drilldownHeader' style='display:block;overflow: hidden;'><div class='e-drilldownlabel' style='position:absolute;font-size:12px;font-weight:normal;'>" + labelValue + "</div></div>");
            if (enableNavigation && this.model.enableDrillDownArrow)
                item_templateDiv = bbdesigner$("<div class='e-drilldownHeader' style='display:block;overflow: hidden;'><svg class='e-drilldownarrow' style='width:15px;height:10px;margin-top:7px;fill:black'><polyline points='8,0 8,10 0,5 8,0'/></svg><label class='e-drilldownlabel'  style='left:17px;position:absolute;top:5px;font-size:12px;font-weight:normal;'>" + labelValue + "</label></div>");
            
            bbdesigner$(item_templateDiv).css({
                "left": "0px",
                "width": this._width+"px","top": 0,
                "height": "20px","cursor":"pointer"
            });    
            if(this.drillDownHeaderColor()!=null)
            {
                bbdesigner$(item_templateDiv).css("background-color",this.drillDownHeaderColor());
            }			
            this._drillHeaderDiv.append(item_templateDiv);
            bbdesigner$(item_templateDiv).mousedown({ treemap: this }, this._drilldownfunction);
			bbdesigner$(item_templateDiv).find(".e-drilldownlabel").mousedown({ treemap: this }, this._drilldownLabel);
        },
		
		
		_drilldownLabel: function (event) {
            var label = this.innerHTML;
            var treeMap = event.data.treemap;
			treeMap._drillFunction = true;
			treeMap._legendTreemapItems =[];
			treeMap._currentLevel=null; 
			treeMap._invisibility = []; treeMap._currentToggle = null;
            var pos;
            if(treeMap.model.isVirtualRender)
                return;
            if (treeMap._drilldownHeaders[0] == label)
            {                
                treeMap._drilldownItems = [];
				if(treeMap.model.drilledStateLevel != undefined){
					var drillLength = treeMap._drilldownItems.length;
					treeMap.model.drilledStateLevel = drillLength;					
				}
                treeMap.refresh();
            }
            else
            {                
                var header = "";
                
                treeMap._drillHeaderDiv[0].innerHTML = "";
                treeMap._backgroundTile[0].innerHTML = "";
                var drillHeader = "";               

                for (var i = 0; i < treeMap._drilldownHeaders.length; i++) {
                    if (label == treeMap._drilldownHeaders[i]) {                        
                        pos = i + 1;                        
						treeMap._originalHeaders.splice(i+1);
                        treeMap._drilldownHeaders.splice(i+1);
                    }
                }
								               
                treeMap._labelTemplateElements = [];
                var treemapLevel = treeMap.model.levels[treeMap._drilldownHeaders.length - 1];
                var length = treeMap._drilldownHeaders.length - treeMap._drilldownItems.length,
                    drilldownLength = treeMap._drilldownItems.length;
                var data = treeMap._drilldownItems.length == 1 ? treeMap._drilldownItems[0].Data
                             : treeMap._drilldownItems[length < 0 ? drilldownLength + length : length ].Data;
				treeMap._drillDownLevelData = data;
                treeMap._drillDownHeader(true, treemapLevel, data);
                if(pos) {               
                	treeMap._drilldownItem = treeMap._drilldownItems[pos - 2];
                	treeMap._drilldownItems.splice(pos - 1);
                }
                treeMap._templateDiv[0].innerHTML = "";
                if(treeMap.model.tooltipTemplate && treeMap.model.tooltipTemplate.length > 0)
				    treeMap.model.tooltipTemplate = treeMap.model.tooltipTemplate.slice(0,treeMap.model.tooltipTemplate.length - 1) + treeMap._drilldownItems.length;
				if(!BoldBIDashboard.util.isNullOrUndefined(treeMap._drilldownItem))
                treeMap._groupdrillDownLevels(treeMap._drilldownItem, treeMap._drilldownItems.length);                                
                return false;
            }
        },
		
        _drilldownfunction: function (event) {
            var treeMap = event.data.treemap;                       
            var level = event.data.level;
            var data = treeMap._drilldownItems[0], drillLevel;
			treeMap._drillFunction = true;
			treeMap_drillDownLevelData = data;
			treeMap._legendTreemapItems =[];
			treeMap._invisibility = [];
            treeMap.selectedItems = [];	treeMap._currentInvisibleItem = []; treeMap._tog =[];treeMap._rangeInVisibility = []; treeMap._rangevisible = [];		
			treeMap._currentLevel=null; treeMap._currentToggle = null;
            if(treeMap._drilldownItems.length > 0 && treeMap._initialLevel){				
				treeMap._originalHeaders = treeMap._drilldownHeaders;							
			}			
            if (treeMap.model.isVirtualRender) {                
                if (treeMap.model.drillDownLevel > 1) {
                    var header = event.target.innerHTML,
                        index = treeMap._drilldownHeaders.indexOf(header),
                        headerLength = treeMap._drilldownHeaders.length;

                    treeMap._backgroundTile[0].innerHTML = "";
                    treeMap._drillHoverDiv[0].innerHTML = "";
                    treeMap._templateDiv[0].innerHTML = "";
                    
                    if (treeMap._drilldownHeaders.indexOf(header) !== -1) {
					treeMap._drilldownHeaders = treeMap._drilldownHeaders.slice(0, index + 1);
					drillLevel = treeMap._drilldownHeaders.length;
					treeMap.model.drillDownLevel = drillLevel - 1;
					} else {
					     treeMap._drilldownHeaders = treeMap._drilldownHeaders.slice(0,treeMap._drilldownHeaders.length - 1);
						 drillLevel = treeMap._drilldownHeaders.length;
						 treeMap.model.drillDownLevel = drillLevel - 1;
					}
                    treeMap._prevData = treeMap._prevData.splice(0, drillLevel);
                    treeMap._prevLevels = treeMap._prevLevels.splice(0, drillLevel);
                    treeMap._prevLegend = treeMap._prevLegend.splice(0, drillLevel);
                    if(drillLevel > 1)
                        treeMap.runTimeSubitems(treeMap._prevData[drillLevel - 2], null,treeMap._prevLevels[drillLevel - 2], treeMap._prevLegend[drillLevel - 2]);
                    else{
                        treeMap._drilldownHeaders = [];
                        treeMap.model.drillDownLevel = 0;
                        treeMap.refresh();
                    }
                    return;
                }                
                if (treeMap.model.drillDownLevel == 1) {
                    treeMap._drilldownHeaders = [];
                    treeMap.model.drillDownLevel = 0;
                    treeMap.refresh();
                }
            }
            else {
                if (treeMap._drilldownItems.length > 0) {
				// treeMap._trigger("drillDownItemSelected", { level: treeMap._drilldownItems.length, selectedItems: data.Data, header: treeMap.getDrillDownHeader(treeMap._drilldownHeaders), prevLevel: treeMap._drilldownItems.length - 1, cancel:false,rightClick:false,doubleClick:false, }); 
                    var header = "",colorMapping = treeMap.model.rangeColorMapping;
                    if (treeMap._drilldownItems.length == 1) {
                        treeMap._drilldownItems = [];
                        header = treeMap._drilldownHeaders[0];
                        drillLevel = { drillDownLevel: 0, headerLabel: header };
                        if (treeMap.model.showLegend) { 
                            for (var i = 0; i < colorMapping.length; i++) { 
                                if(colorMapping[i]._legendLabel!=colorMapping[i].legendLabel)
                                    colorMapping[i].legendLabel=colorMapping[i]._legendLabel;
                            }
                        }
						treeMap._trigger("headerLabelClicked", drillLevel);
						if(treeMap.model.drilledStateLevel != undefined){
							var drillLength = treeMap._drilldownItems.length;
							treeMap.model.drilledStateLevel = drillLength;					
						}
                        treeMap.refresh();
                    }
                    else {
                        for (var i = 0; i < treeMap._drillHeaderDiv[0].children[0].children.length; i++) {
                            if (treeMap._drillHeaderDiv[0].children[0].children[i].className == "e-drilldownlabel")
                                header = treeMap._drillHeaderDiv[0].children[0].children[i].innerHTML;
                        }
                        var headers = header.split(treeMap.model._connectorText || ".");
                        treeMap._drillHeaderDiv[0].innerHTML = "";
                        treeMap._backgroundTile[0].innerHTML = "";
                        var drillHeader = "";
                        if (treeMap._drilldownHeaders.length > 1) {
                            treeMap._drilldownHeaders.pop(treeMap._drilldownHeaders.length - 1);
                        }
                        treeMap._labelTemplateElements = [];
                        var treemapLevel = treeMap.model.levels[treeMap._drilldownHeaders.length - 1];
                        treemapLevel.groupingLevel = event.data.treemap._drilldownItem.GroupingLevel ? event.data.treemap._drilldownItem.GroupingLevel : treeMap.model.drilledStateLevel; 
                        treeMap._drillDownHeader(true, treemapLevel, treeMap._drilldownItem.Data);
                        treeMap._drilldownItem = treeMap._drilldownItems[treeMap._drilldownItems.length - 2];
                        treeMap._drilldownItems.pop(treeMap._drilldownItems[treeMap._drilldownItems.length - 1]);
                        treeMap._templateDiv[0].innerHTML = "";
                        var label = null;
                        for (var j = 0; j < treeMap._drilldownHeaders.length; j++) {
                            if (label == null)
                                label = treeMap._drilldownHeaders[j];
                            else label = label + "|~|" + treeMap._drilldownHeaders[j];
                        }
						var rootItems1 = treeMap._getPreRenderEventData(data.Data);
                        var min,max;
                        for (var i = 0 ; i < rootItems1.length; i++) {
                            var rootItem2 = treeMap._getPreRenderEventData(rootItems1[i].Data, treeMap._drilldownItems.length + 1);
                            for (var j = 0; j < rootItem2.length; j++) { 
                                min = min === undefined? rootItem2[j]:(min.colorWeight > rootItem2[j].colorWeight?rootItem2[j]: min);
								max = max === undefined ? rootItem2[j] : (max.colorWeight > rootItem2[j].colorWeight ? max : rootItem2[j] );
                            }
                        }
                        treeMap._trigger("preRender", { model: treeMap.model, maximumValue: rootItems1[0], minimumValue: min , max: max, level: (treeMap._drilldownHeaders.length - 1 === -1) ? 0 : treeMap._drilldownHeaders.length - 1});
                        drillLevel = { drillDownLevel: treeMap._drilldownItems.length, headerLabel: label };
						treeMap._trigger("headerLabelClicked", drillLevel);
                        treeMap._groupdrillDownLevels(treeMap._drilldownItem, treeMap._drilldownItems.length);
                    }
                }
                
            }
        },
       
      _sizeCalculation: function (legendSettings) {            
            if (this.model.rangeColorMapping != null || this.model.colorPath != null) {
                var colormapping = this.model.rangeColorMapping != null && this.model.rangeColorMapping.length > 0 ? this.model.rangeColorMapping : legendSettings ? legendSettings : bbdesigner$.extend(true, [], this.model.dataSource);
                var isRange = this.model.rangeColorMapping != null && this.model.rangeColorMapping.length > 0 ? true : false;
                var width = 0;
                var height = 0;
                var iconwidth = this.iconWidth() + 5;
                var totalHeight = this.iconHeight() + 5;
				var titleWidth = this._calcWidth(this.model.legendSettings.title);
				var titleHeight = this._calcHeight(this.model.legendSettings.title);  
                var totalWidth = 0, itemIconSpace = 20;                
                var columnCount = this.model.legendSettings.columnCount;
				legendSettings = this.model.legendSettings;
                if (this.model.legendSettings.mode != BoldBIDashboard.datavisualization.TreeMap.LegendMode.Interactive) {
                if ((this.legendheight() == 0 && this.legendwidth() == 0) && (columnCount == 0)) {
					if (!isRange) {
                        this._legendItem = colormapping;
                        this._generateLegendLabels(this.model, this._legendItem);
                    }
                    for (var i = 0; i < colormapping.length; i++) {
                        if((colormapping[i].legendLabel) == undefined){
                            colormapping[i].legendLabel =  (colormapping[i].from) + "-" + (colormapping[i].to) ;
                        }
                        var labelwidth = this._calcWidth(colormapping[i].legendLabel);
                        var legendWidth = iconwidth + labelwidth + itemIconSpace + titleWidth;
                        if (this.legendheight() == 0 && this.legendwidth() == 0) {
                            if (this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Top || this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Bottom) {
                                if (this._width < (width + legendWidth)) {
                                    totalHeight = (this.iconHeight() + 15) + totalHeight;
                                    totalWidth = Math.max(totalWidth, width);
                                    width = legendWidth;
                                }
                                else {
                                    width += legendWidth;
                                }
                            }
                            else {

                                    if (this._height < (height + this.iconHeight() + 15)) {
                                    totalWidth += width;
                                    totalHeight = Math.max(totalHeight, height);
                                    width = legendWidth;
                                    height = 0;
                                }
                                else {
                                    height += (this.iconHeight() + 18);
                                    width = Math.max(legendWidth, width);
                                }
                            }
                        }
                        else {

                            xPos += _legendlabelwidth + 18;
                            if (xPos + 150 >= this.legendwidth()) {
                                xPos = 10;
                                yPos += 40;
                            }
                        }
                    }

                    if (this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Top || this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Bottom) {
                        totalWidth = Math.max(totalWidth, width);
						if(this.model.legendSettings.title != null && this.model.legendSettings.title != "")							
							totalHeight += titleHeight;
						else
							totalHeight += 5;
                    }
                    else {
                        totalWidth += (width + 15);
                        totalHeight = Math.max(totalHeight, height);
                    }
                }
               else if (columnCount == 0) {

                        for (var i = 0; i < colormapping.length; i++) {
                            if ((colormapping[i].legendLabel) == undefined) {
                                colormapping[i].legendLabel = (colormapping[i].from) + "-" + (colormapping[i].to);
                            }
                        }
                    if ((this.legendheight().toString().indexOf("%")) != -1) {

                        totalHeight = (this._height / 100) * parseInt(this.legendheight().replace('%', ''))
                    }
                    else {

                        totalHeight = this.legendheight();
                    }
                    if ((this.legendwidth().toString().indexOf("%")) != -1) {

                        totalWidth = (this._width / 100) * parseInt(this.legendwidth().replace('%', ''))
                    }
                    else {

                        totalWidth = this.legendwidth();
                    }

                }

                if (columnCount != 0) {

                    for (var i = 0; i < colormapping.length; i++) {
                            if ((colormapping[i].legendLabel) == undefined) {
                                colormapping[i]._legendLabel = colormapping._legendLabel == undefined?  (colormapping[i].from) + "-" + (colormapping[i].to): colormapping._legendLabel;
                                colormapping[i].legendLabel = (colormapping[i].from) + "-" + (colormapping[i].to) ;
                            }
                             var labelwidth = this._calcWidth(colormapping[i].legendLabel);
                            
                            legendWidth = iconwidth + labelwidth + 10;

                        if (i % columnCount != 0) {
                            width += legendWidth;
                            if (i == columnCount - 1) {
                                totalWidth = Math.max(totalWidth, width);
                            }

                        }
                        else {
                            if (i != 0)
                                totalHeight = (this.iconHeight() + 15) + totalHeight;
                            totalWidth = Math.max(totalWidth, width);
                            width = legendWidth;
                        }
                    }
                }
                }
                else {
                    totalHeight = (legendSettings.height != 0 ? legendSettings.height : 30) + 18;
                    if (legendSettings.title != null && legendSettings.title != "") {
                        totalHeight += 25;
                    }
                    totalWidth = (legendSettings.width != 0 ? legendSettings.width : 100) + 20 + (legendSettings.leftLabel.length * 10) + (legendSettings.rightLabel.length * 10);

                }
                this._legendSize = { height: totalHeight, width: totalWidth };
                if (this.model.legendSettings != null) {

                    if (this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Bottom) {
                        this._height = this._height - parseFloat(totalHeight);
                        legendSettings.tempWidth = width;
                    }

                    else if (this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Top) {
                        this._height = this._height - parseFloat(totalHeight);

                        this._margintop = parseFloat(totalHeight);
                    }
                    else if (this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Left) {
                        this._width = this._width - totalWidth;
                        this._marginleft = totalWidth;

                    }
                    else if (this.dockPosition() == BoldBIDashboard.datavisualization.TreeMap.DockPosition.Right) {
                        this._height = this._height;
                        this._width = this._width - totalWidth;
                    }
                }
            }
        },
		
		_generateLegendLabels: function (model, data) {
          var colorPath = model.colorPath;
          for (var i = 0; i < data.length; i++) {
              if (!this.enableDrillDown()) {
                  data[i].legendLabel = this.labelPath() ? data[i][this.labelPath()] : data[i][model.weightValuePath];
                  data[i].color = data[i][colorPath];
              }
              else 
                  data[i].legendLabel = data[i].header;              
          }
      },

        _getDockPositionPoint:function(size,bounds,item)
        {
            var position = item.labelPosition;
            var x = 2, y = 2;
            if (item.groupPadding != undefined && item.groupBorderThickness != undefined) {
                x = item.groupPadding + item.groupBorderThickness + x;
                y = item.groupPadding + item.groupBorderThickness + y;
            }
            if (item.showHeader )
                y = y + item.headerHeight;
            if (position == BoldBIDashboard.datavisualization.TreeMap.Position.TopCenter) {
                x = (size.width/2)-(bounds.width/2);
            }
            else if (position == BoldBIDashboard.datavisualization.TreeMap.Position.TopRight) {
                x = size.width - bounds.width - x;
            }
            else if (position == BoldBIDashboard.datavisualization.TreeMap.Position.CenterLeft) {
                y = (size.height / 2) - (bounds.height / 2);
            }
            else if (position == BoldBIDashboard.datavisualization.TreeMap.Position.Center || position==null) {
                x = (size.width / 2) - (bounds.width / 2);
                y = (size.height / 2) - (bounds.height / 2);
            }
            else if (position == BoldBIDashboard.datavisualization.TreeMap.Position.CenterRight) {
                x = size.width - bounds.width -x;
                y = (size.height / 2) - (bounds.height / 2);
            }
            else if (position == BoldBIDashboard.datavisualization.TreeMap.Position.BottomLeft) {
                y = size.height - bounds.height - y;
            }
            else if (position == BoldBIDashboard.datavisualization.TreeMap.Position.BottomCenter) {
                x = (size.width / 2) - (bounds.width / 2);
                y = size.height - bounds.height-y;
            }
            else if (position == BoldBIDashboard.datavisualization.TreeMap.Position.BottomRight) {
                x = size.width - bounds.width-x;
                y = size.height - bounds.height-y;
            }
            return {x:size.left+x,y:size.top+y};
        },
       
        _generateTreeMapItems: function (Items, fill, path, cloneItems) {
            this._rootTreeMapItems= Items;
            this._getTreeMapItemTemplate(Items);
            if (Items != null) {
                if (!this._isLevelColors){
                    this._setColorMappings(Items, this.model, undefined, cloneItems);
                }
                for (var i = 0; i < Items.length; i++) {
                    var item = Items[i];                    
                                      
                    if (this.model.isVirtualRender) {

                        if (this.model.levels.length > 0)
                        {
                            this._createBackGround(item, this.model.levels[0], item);
                        }                       
                    }                    

                    var rect = item.rectangle;
					if (this.enableDrillDown() && this.model.showSubItems) {
                    if (item.Data != null && item.Data.length>0) {
                        item.Data = item.Data[0];
                    }
					}
                    item.Rectangle = rect;
					 var eventArgs = {
                        borderThickness: this.model.leafItemSettings.borderThickness,
                        borderBrush: this.model.leafItemSettings.borderBrush,
                        fill: item.backgroundColor,
                        dataSource: item.Data
                    };
                    this._trigger("itemRendering", { model: this.model, data: eventArgs });
                    if (eventArgs.fill != item.backgroundColor) {
                        item._color = eventArgs.fill;
                        if (this.enableDrillDown()) {
                            for (var j = 0; j < cloneItems.length; j++) {
                                if (cloneItems[j].ChildtreeMapItems) {
                                    for (var k = 0; k < cloneItems[j].ChildtreeMapItems.length; k++) {
                                        if (item.header == cloneItems[j].ChildtreeMapItems[k].header)
                                            cloneItems[j]._color = eventArgs.fill;
                                    }
                                }
                            }
                        }
                    }					
					var headValue = this.textPath() ? item.Data[0] ? item.Data[0][this.textPath()] : item.Data[this.textPath()] : item.ParentHeader ? item.ParentHeader : item.header;
					headValue = isNaN(headValue) ? headValue.replace(' ', '_') : headValue;
					var labelText = item.header;
					labelText = isNaN(labelText) ? labelText.replace(' ','_') : labelText;
					rect.setAttribute("id", this._id + "_" + labelText + "_" + headValue);
					 bbdesigner$(rect).css({
                        "box-sizing": "border-box",
                        "-moz-box-sizing": "border-box",
                        "-webkit-box-sizing": "border-box",
                        "-webkit-user-select": "none",
                        "user-select": "none",
                        "-webkit-touch-callout": "none",
						"border-color": eventArgs.borderBrush,
                        "border-width": eventArgs.borderThickness + "px"
                    });
                    if (eventArgs.fill)
					     bbdesigner$(rect).css("background-color", eventArgs.fill);
                    else
                        bbdesigner$(rect).css("background-color", fill);
                    if(item.backgroundOpacity !=null)
                    {
                        bbdesigner$(rect).css("opacity",item.backgroundOpacity);
                    }
                    this._wireEventForTreeMapItem(item, rect);
                 
                }
                if (this.model.rangeColorMapping.length == 0 && this.uniColor() == null && this._color() != "") {
                    this._setDesaturationColor(Items, this.model.desaturationColorMapping);
                }
                else if (this.model.PaletteColorMapping != null) {
                    this._setPaletteColor(Items, this.model.PaletteColorMapping);
                }
            }
        },

        _wireEventForTreeMapItem: function (item,rect) {       
            var iPad = !rect.onmouseenter && navigator && (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null),
                fn = iPad ? this._rectEnter : this._rectMouseEnter;            
            bbdesigner$(rect).on(iPad ? 'touchstart' : "mouseenter",{ Param1: item, Param2: this }, fn);            
            bbdesigner$(rect).mousemove({ Param1: item, Param2: this }, this._rectMouseMove);
            bbdesigner$(rect).mouseleave({ treeMap: this }, this._rectMouseLeave);
            bbdesigner$(rect).mouseup({ treeMap: this }, this._docClickFunction);
            if(iPad)            
                 bbdesigner$(rect).on("touchend",{ Param1: item, Param2: this }, this._rectLeave);
        },

        _getTreeMapItemTemplate: function (Items) {            
            
            var rects ="";
            for (var i = 0; i < Items.length; i++) {
                var item = Items[i];
                if (this.model.leafItemSettings.itemTemplate == null)
                    rects += '<div style="border-style:solid;position:absolute;left:' + item.LeftPosition + 'px;top:' + item.TopPosition + 'px;height:' + item.ItemHeight + 'px;width:' + item.ItemWidth + 'px;border-width:' + this.borderThickness() + 'px;border-color:' + this.borderBrush() + '"></div>';
                else {
                    var OriginalNode = bbdesigner$("#" + this.model.leafItemSettings.itemTemplate);
                    if (item.Data != null && item.Data.length == 1) {
                        item.Data = item.Data[0];
                    }
                    var tmpl2 = bbdesigner$.templates(OriginalNode.html());
                    var htmlString = "<div style='overflow:hidden;position:absolute;left:" + item.LeftPosition + "px;top:" + item.TopPosition + "px;height:" + item.ItemHeight + "px;width:" + item.ItemWidth + "px'>" + tmpl2.render(item) + "</div>";
                    rects += htmlString;
                }
            }
            if (this._svgDocument != null && this.enableDrillDown()) {
                this._svgDocument[0].innerHTML = "";
            }
            this._svgDocument = bbdesigner$('<div style= "overflow:hidden;' +
                              'z-index:1;"' +
                             'id="svgDocument">' + rects + '</div>');
            this._backgroundTile.appendTo(this.element);
            this._svgDocument.appendTo(this.element);           
            this._svgDocument.css({
                "height": this._height + "px", "width": this._width + "px", "margin-top": this._margintop + "px", "margin-left": this._marginleft, "overflow": "hidden",
                "z-index": 1, "position": "absolute", "left": "0", "top": "0"
            });
            bbdesigner$(this._backgroundTile).css({
                "height": this._height + "px", "width": this._width + "px", "margin-top": this._margintop + "px", "margin-left": this._marginleft, "overflow": "hidden",
                "z-index": 0, "position": "absolute", "left": "0", "top": "0"
            });
            this._templateDiv.appendTo(this.element);
            /* Below event hook added for IE10 tooltip issue*/
            this._on(bbdesigner$(this._templateDiv), BoldBIDashboard.eventType.mouseMove, { Param2: this }, this._rectMouseMove);
            this._off(bbdesigner$(this.element), BoldBIDashboard.eventType.mouseDown, this.rectClick);
            if (this.model.enableRightClick)
                this._off(bbdesigner$(this.element), "contextmenu", this.rightClick);
            this._on(bbdesigner$(this.element), BoldBIDashboard.eventType.mouseDown, { treemap: this, Param1: Items }, this.rectClick);
            if (this.model.enableRightClick)
               this._on(bbdesigner$(this.element), "contextmenu", { treemap: this, Param1: Items }, this.rightClick);
            this._on(bbdesigner$(this.element), BoldBIDashboard.eventType.mouseUp, { treeMap: this }, this._docClickFunction);
            this._on(bbdesigner$(this.element), BoldBIDashboard.eventType.mouseDown, { treemap: this }, this.dragDown);
            this._on(bbdesigner$(this.element), BoldBIDashboard.eventType.mouseMove, { treemap: this }, this.dragMove);
            this._on(bbdesigner$(this.element), BoldBIDashboard.eventType.mouseUp, { treemap: this }, this.dragUp);

            if (this.enableDrillDown()) {
                this._drillHeaderDiv.appendTo(this.element);
                this._drillHoverDiv.appendTo(this.element);
            }
            for (var i = 0; i<Items.length; i++) {
                Items[i].rectangle = this._svgDocument[0].childNodes[i];
            }
        },	       

        selectItem: function (obj) {
            if (this._rootTreeMapItems != null) {
                for (var i = 0; i < this._rootTreeMapItems.length; i++) {
                    var item = this._rootTreeMapItems[i];
                    var rect = item.rectangle; var itemData;
                    if (item.Data != null && item.Data.length > 0) {
                        itemData = item.Data[0];
                    }
                   
                    if (obj == itemData) {
                        if (this.highlightOnSelection()) {

                            bbdesigner$(rect).css({ "border-width": this.highlightBorderThickness(), "border-color": this.highlightBorderBrush() });
                            if (this._browser != "msie") {
                                var lastItem = this._svgDocument[0].children[this._svgDocument[0].children.length - 1];
                                this._svgDocument[0].insertBefore(rect, lastItem);
                            }
                           
                                this._prevSelectedItems.push(rect);
								this.selectedItems.push(obj);
                        }
                        }
                    
                }
            }

        },
      
        _selectTreemapItem: function (obj) {

            if (this._rootTreeMapItems != null) {
                for (var i = 0; i < this._rootTreeMapItems.length; i++) {
                    var item = this._rootTreeMapItems[i];
                    var rect = item.rectangle;
                    if (item.Data != null && item.Data.length > 0) {
                        item.Data = item.Data[0];
                    }
                    if (obj == item.Data && !this._contains(this.selectedItems, obj)) {

                        if (this.highlightOnSelection()) {
                            bbdesigner$(rect).css({ "border-width": this.highlightBorderThickness(), "border-color": this.highlightBorderBrush() });
                            if (this._browser != "msie") {
                                var lastItem = this._svgDocument[0].children[this._svgDocument[0].children.length - 1];
                                this._svgDocument[0].insertBefore(rect, lastItem);
                            }
                            this._prevSelectedItems = [];
                            this.selectedItems = [];
                            this._prevSelectedItems.push(rect);
                            this.selectedItems.push(obj);
                        }
                    }

                }
            }
        },
        
        _selectItemResize: function () {

            for (var i = 0; i < this._rootTreeMapItems.length; i++) {
                var item = this._rootTreeMapItems[i];
                var rect = item.rectangle;
				if (this.model.showSubItems && this.enableDrillDown()) {
                if (item.Data != null && item.Data.length > 0) {
                    item.Data = item.Data[0];
                }
				 }
                if (this._contains(this.selectedItems, item.Data)) {
					if(Object.prototype.toString.call(item.Data) === '[object Array]')
						this.selectItem(item.Data[0]);
					else
						this.selectItem(item.Data);
                }
                
            }
        },

        _updateDesaturationRange: function (value, treemapitem) {

            var mapping = this.model.desaturationColorMapping;
           
            if (value >= mapping.rangeMinimum && value <= mapping.rangeMaximum) {
              
                var minRange = mapping.rangeMinimum;
                var maxRange = mapping.rangeMinimum + ((mapping.rangeMaximum - mapping.rangeMinimum) / 10);
                for (var i = 0; i < 10; i++) {
                    if (value >= minRange && value <= maxRange) {
                        var obj = {};
                        if (this._legendRects[i] != undefined)
                            obj = this._legendRects[i];            
                        return obj;
                    }
                    minRange = maxRange;
                    maxRange = maxRange + ((mapping.rangeMaximum - mapping.rangeMinimum) / 10);
                }
            }
        },
		    _updateLegendRange: function (value, treemapitem) {
            var colormapping = this.model.rangeColorMapping;
            for (var index = 0; index < colormapping.length; index++) {
                var gradientCollection = null;
                var mapping = colormapping[index];
                if (this.model.enableGradient && !BoldBIDashboard.util.isNullOrUndefined(mapping.gradientColors)) {
                    gradientCollection = this._generateGradientCollection(mapping.gradientColors);
                }
                if (value >= mapping.from && value <= mapping.to) {
                    var minValue = index;
                    if (index != 0)
                        minValue = index * 10;
                    var minRange = mapping.from;
                    var maxRange = mapping.from + ((mapping.to - mapping.from) / 10);
                    for (var i = minValue; i < minValue + 10; i++) {
                        if (value >= minRange && value <= maxRange) {
                            var obj = {};
                            if (this._legendRects[i] != undefined)
                                obj = this._legendRects[i];
                            if (this.model.enableGradient && !BoldBIDashboard.util.isNullOrUndefined(mapping.gradientColors)) {
                                if (index != 0) {
                                    treemapitem.backgroundColor = gradientCollection[i - index * 10];
                                } else {
                                    treemapitem.backgroundColor = gradientCollection[i];
                                }
                            } else
                                treemapitem.backgroundColor = mapping.color;
                            obj["color"] = treemapitem.backgroundColor;
							mapping.color = treemapitem.backgroundColor;                            
                        }
                        minRange = maxRange;
                        maxRange = maxRange + ((mapping.to - mapping.from) / 10);
                    }
                }
            }
			return obj;
        },
		
        selectItemByPath: function (path, value, seperator) {
            var propertyPath = path.split(seperator);
            var propertyValue = value.split(seperator);
            var path, value;
			var selected = false;
            var treemapItems = this._rootTreeMapItems;
            for (var i = 0; i < propertyPath.length; i++)
            {
                var path = propertyPath[i];
                var value = propertyValue[i];
                var itemsCollection = [];
                for (var k = 0; k < treemapItems.length; k++) {
                    var item = treemapItems[k];
					if(!BoldBIDashboard.isNullOrUndefined(item) && !BoldBIDashboard.isNullOrUndefined(item.Data) && !BoldBIDashboard.isNullOrUndefined(item.Data[0])) {
						item.Data = item.Data[0];
					}
                    var dataObj = item.Data;
                    var objValue;
                    for (var j = 0; j < propertyPath.length; j++) {
                        objValue = this._reflection(dataObj, path);
                    }

                    if (value == objValue) {
                        itemsCollection.push(item);
						treemapItems = itemsCollection;
						selected = true;
						break;
                    } else if ( !selected && k == treemapItems.length - 1) {
					    treemapItems = [];
					}
                }
            }
            for (var i = 0; i < treemapItems.length; i++)
            {
                var item = treemapItems[i];
                this.selectItem(item.Data);
            }
        },
          _getColorRatio: function (min, max, value, minValue, maxValue) {
            var percent = (100 / (maxValue - minValue)) * (value - minValue);
            var colorCode = (((parseFloat(max) - parseFloat(min)) / 100) * percent) + parseFloat(min);
            return colorCode;
        },
        _contains: function (array, actualobj) {
            var length = array.length;
            if (length > 0) {
                while (length--) {
					if(Object.prototype.toString.call(actualobj) === '[object Array]'){
						if(array[length][0] === actualobj[0])
							return true;
						else if (array[length] === actualobj[0]) {
							return true;
						}
					}
                    else if (array[length] === actualobj) {
                        return true;
                    }
                }
            }
            return false;
        },

        _rectEnter: function(event)
        {
            var ele = this;
            this.mouseEnter = true;   
            var self = event.data.Param2;
            event.preventDefault();
            if(self.highlightOnSelection() || self.highlightGroupOnSelection()){
               setTimeout(function(){
                    if(ele.mouseEnter){            
                        self._rectMouseEnter(event);
                        ele.mouseEnter = false;
                    }
                }, 500);
            }
            else
                self._rectMouseEnter(event);
        },

        _rectLeave: function(){
            this.mouseEnter = false;
        },

        _rectMouseEnter: function(event) {            
		    var treemap = event.data.Param2;
            var legendSettings = treemap.model.legendSettings; var templateId;
            var tooltipObject = event.data.Param1.Data;
            var pageX = event.pageX || event.originalEvent.changedTouches[0].pageX,
                pageY = event.pageY || event.originalEvent.changedTouches[0].pageY;
            if (tooltipObject != null) {
                var element = event.data.Param2._toolTipElement;
				bbdesigner$(element).css({"visibility": "visible" });
                var template = event.data.Param2.model.tooltipTemplate;
				if(bbdesigner$("#" + template).length > 0){
					event.data.Param2.model._templateId = bbdesigner$("#" + template);
					templateId = bbdesigner$("#" + template);
				}
				else{
					templateId = event.data.Param2.model._templateId;
				}
                if (element != null && template != null) {                    
                    var htmlString = templateId.render(tooltipObject);
                    bbdesigner$(element).html(htmlString);
                    bbdesigner$(element).css({"left": pageX+10, "top": pageY+10});
                    bbdesigner$(element).css({ "display": "block"});
                    var height= element[0]!=null ? element[0].clientHeight : element.clientHeight;
                    var width= element[0]!=null ? element[0].clientWidth : element.clientWidth;
                    event.data.Param2._tooltipSize = { height: height, width: width };                    
                }
            }
			
			 if (legendSettings != null && legendSettings.mode == BoldBIDashboard.datavisualization.TreeMap.LegendMode.Interactive && treemap.model.rangeColorMapping != null
                   && (treemap.showLegend() == undefined || treemap.showLegend())) {
                for (var i = 0; i < treemap._rootTreeMapItems.length; i++) {
                    var item = treemap._rootTreeMapItems[i];
					var rect = item.Rectangle.getBoundingClientRect();					 
					 if (rect.x <= pageX && rect.x + rect.width >= pageX && rect.y <= pageY && rect.y + rect.height >= pageY) {	
                        var length = null;
                        if (treemap.model.rangeColorMapping.length > 0)
                            length = treemap.model.rangeColorMapping.length;
                        else
                            length = 1;
                        
                        var _legendwidth = legendSettings.width;
                        if (legendSettings.width == undefined)
                            _legendwidth = 150;

                        var rectwidth = (_legendwidth / length) / 10;
                        if (treemap._rootTreeMapItems[i].legendrect != null) {
                            var rectPosition = treemap._rootTreeMapItems[i].legendrect.marginLeft;
                            var position = rectPosition + Math.ceil(rectwidth) - treemap._interactiveArrow.width() / 2;
                            bbdesigner$(treemap._interactiveArrow).css({ "margin-left": position, "display": "block", "visibility" : "visible" });
                            break;
                        }
                    }
                }
            }
        },
       
        _rectMouseMove: function (event) {
            var treeMap = event.data.Param2;
            var element = treeMap._toolTipElement, spacing = 10;
            var canExecute = true, treemapContainer = document.getElementById(treeMap._id),
            scale = treemapContainer.getBoundingClientRect().width / treemapContainer.offsetWidth;
            /* Below If condition code was added for IE10 Tooltip issue*/
            if (event.data.Param1 == undefined) {
                if (element != null) {
                    var tooltipObject;
                    for (var i = 0; i < treeMap._rootTreeMapItems.length; i++) {
                        var item = treeMap._rootTreeMapItems[i];
                        if (item.rectangle.offsetLeft < event.offsetX && item.rectangle.offsetLeft + item.rectangle.offsetWidth > event.offsetX
                            && item.rectangle.offsetTop < event.offsetY && item.rectangle.offsetTop + item.rectangle.offsetHeight > event.offsetY) {
                            tooltipObject = item.Data;
                            break;
                        }
                    }
                    if (tooltipObject != null) {
                        var template = event.data.Param2.model.tooltipTemplate;
                        if (element != null && template != null) {
                            bbdesigner$(element).css({ "left": event.pageX + 10, "top": event.pageY + 10, "display": "block" });
                            var htmlString = bbdesigner$("#" + template).render(tooltipObject);
                            bbdesigner$(element).html(htmlString);
                            var height = element[0] != null ? element[0].clientHeight : element.clientHeight;
                            var width = element[0] != null ? element[0].clientWidth : element.clientWidth;
                            treeMap._tooltipSize = { height: height, width: width };

                        }
                    }
                    else {
                        if (element != null) {
                            canExecute = false;
                            bbdesigner$(element).css("display", "none");
                        }
                    }
                }
            }

            if (canExecute) {
                var tooltipSize = treeMap._tooltipSize;
                if (tooltipSize.width + event.pageX >= (scale * treeMap._width)) {
                    event.pageX -= (scale * tooltipSize.width) + 10;
                    if(event.pageX < 0)
                    {
                        event.pageX = 10;
                    }
                }
                if (tooltipSize.height + event.pageY >= (scale * treeMap._height)) {
                    event.pageY -= (scale * tooltipSize.height) + 10;
                    if (event.pageY < 0) {
                        event.pageY = 10;
                    }
                }
                if (treeMap.enableDrillDown() && treeMap._browser != 'msie') {
                    for (var i = 0; i < treeMap._drillHoverDiv[0].children.length; i++) {
                        var child = treeMap._drillHoverDiv[0].children[i];
                        if (child.className == event.data.Param1.ParentHeader) {
                            bbdesigner$(child).css({ "display": "block" });
                        }
                    }
                }
				event.pageX = event.clientX;
				event.pageY = event.clientY;
				if(treeMap.element[0].getBoundingClientRect().x + treeMap._width < Math.abs(event.clientX + tooltipSize.width)){									
					event.pageX = event.clientX - tooltipSize.width;
				}
				
				if(treeMap.element[0].getBoundingClientRect().x > Math.abs(event.clientX - tooltipSize.width) ){
					event.pageX = event.clientX + spacing ;
				}
				if(treeMap.element[0].getBoundingClientRect().x > Math.abs(event.clientX - tooltipSize.width) && 
				treeMap.element[0].getBoundingClientRect().x + treeMap._width < Math.abs(event.clientX + tooltipSize.width) ){
				     event.pageX = event.clientX - (tooltipSize.width/2);	
					 event.pageY = event.clientY + spacing;
				}
				if(treeMap.element[0].getBoundingClientRect().y + treeMap._height - (spacing * 2) < Math.abs(event.clientY + tooltipSize.height)){
					event.pageY = event.pageY + spacing;
				}
				if(treeMap.element[0].getBoundingClientRect().y > Math.abs(event.clientY + tooltipSize.height)){
					event.pageY = event.clientY;
                }
                if (element != null) {
                    bbdesigner$(element).css({ "left": event.pageX + 10, "top": event.pageY + 10, "display": "block" , "position": "fixed" });
					bbdesigner$(treeMap.element[0]).append(element);
                }
            }
        },

        _rectMouseLeave: function (event) {            
            this.mouseEnter = false;            
            var element = event.data.treeMap._toolTipElement;
            if (element != null) {
                bbdesigner$(element).css("display", "none");
				bbdesigner$(event.data.treeMap._interactiveArrow).css({"visibility" : "hidden"});
            }
        },
		
        _docClickFunction: function(event) {
            this.mouseEnter = false;
            var element = event.data.treeMap._toolTipElement;
            if (element != null) {
               bbdesigner$(this).css('display','block');
            }
        },
       
        _setColorMappings: function(Items, colorMappings, groupmapping, cloneItems){
		    var obj = {};
            var proxyControl = this;
            var legendSettings = this.model.legendSettings, shapeValue, colorValue;
			this._legendTreemapItems = colorMappings.rangeColorMapping.length > 0 ? Items : this._legendTreemapItems;
            if (colorMappings.rangeColorMapping.length > 0 || (colorMappings.uniColorMapping.color != null || this.uniColor() != null)) {
                for (var i = 0; i < Items.length; i++) {
                    if (Items[i].Data instanceof Array) {
                        shapeValue = proxyControl._reflection(Items[i].Data[0], colorMappings.colorValuePath);
                    }
                    else {
                        shapeValue = proxyControl._reflection(Items[i].Data, colorMappings.colorValuePath);
                    }
                    if ((colorMappings.rangeColorMapping != null && colorMappings.rangeColorMapping.length > 0) || (colorMappings.uniColorMapping != null && (colorMappings.uniColorMapping.color != null || this.uniColor() != null))) {

                        if ((legendSettings.mode == BoldBIDashboard.datavisualization.TreeMap.LegendMode.Interactive) || this.model.enableGradient) {
                            Items[i].legendrect = this._updateLegendRange(shapeValue, Items[i]);
                        }
                        else {
                            colorValue = Items[i]._generateColorMappings(colorMappings, this);
                            Items[i].backgroundColor = colorValue;
                        }
                    }
                }
            } 
			else if (colorMappings.desaturationColorMapping != null && (colorMappings.desaturationColorMapping.color != "" || this._color() != "")) {
                this._setDesaturationColor(Items, colorMappings.desaturationColorMapping);
            }
            else if (colorMappings.paletteColorMapping != null && colorMappings.paletteColorMapping.colors.length > 0) {
                this._setPaletteColor(Items, colorMappings.paletteColorMapping);
            }
            else if (this.model.colorPath != null)
                this._setFillColor(Items, this.model.colorPath, cloneItems);
        },
		
		_setFillColor: function (Items, colorPath, cloneItems) {
            for (var i = 0; i < Items.length; i++) {
                Items[i].color = Items[i].backgroundColor = Items[i].Data[0] ? Items[i].Data[0][colorPath] : Items[i].Data[colorPath];
                Items[i].legendLabel = Items[i].header;
            }
            if (this.enableDrillDown() && this.showLegend()) {
                for (var j = 0; j < cloneItems.length; j++) {
                    if (cloneItems[j].ChildtreeMapItems) {
                        cloneItems[j].ChildtreeMapItems.sort(function (a, b) {
                            return parseFloat(b.weight) - parseFloat(a.weight);
                        });
                        cloneItems[j].color = cloneItems[j].ChildtreeMapItems .length > 0 ? cloneItems[j].ChildtreeMapItems[0].Data[0][colorPath] : null;
                        cloneItems[j].legendLabel = cloneItems[j].header;
                    }
                }
                this._legendItem = cloneItems;
            }
            else if (!this.enableDrillDown() && this.showLegend() && !this.model.isHierarchicalDatasource)
                this._legendItem = Items;
        },
     
        _setDesaturationColor: function (Items, desaturationColorMapping) {
            Items = Items.sort(this._orderBycolorWeight);

            var from = (typeof desaturationColorMapping.from == "number") ? desaturationColorMapping.from : this._from();
            var to = (typeof desaturationColorMapping.to == "number") ? desaturationColorMapping.to : this._to();
            var rangeMin = (typeof desaturationColorMapping.rangeMinimum == "number") ? desaturationColorMapping.rangeMinimum : this._rangeMinimum();
            var rangeMax = (typeof desaturationColorMapping.rangeMaximum == "number") ? desaturationColorMapping.rangeMaximum : this._rangeMaximum();
          
            var values = [], item, colorWeight, colorWeightValue;
            for (var j = 0; j < Items.length; j++)
            {
                item = Items[j];
                colorWeight = item.colorWeight;
                colorWeightValue = this._reflection(colorWeight, this.colorValuePath());
                if (colorWeightValue!=null && (typeof colorWeightValue != "number")) {

                    colorWeightValue = Number(colorWeightValue.replace(/[^0-9\.]+/g, ""));
                }               
                values.push(colorWeightValue);

                if (this.model.showLegend) {
                    Items[j].legendrect = this._updateDesaturationRange(colorWeightValue, item);
                }
            }

            if (this._rangeMinimum() == 0)
            {
                rangeMin = Math.min.apply(Math, values);
            }            
            
            if (this._rangeMaximum() == 0)
            {
                rangeMax = Math.max.apply(Math, values);
            }            

            for (var i = 0; i < Items.length; i++) {
                Items[i].backgroundColor = (typeof desaturationColorMapping.color == "string") ? desaturationColorMapping.color : this._color();              
                if (Items[i].colorWeight >= rangeMin && Items[i].colorWeight <= rangeMax) {
                    
					var shapeOpacity = this._getColorRatio(this.model.desaturationColorMapping.from, this.model.desaturationColorMapping.to, Items[i].colorWeight, rangeMin, rangeMax);
                    Items[i].backgroundOpacity = shapeOpacity;
                }
            }
        },
        
		
		  _generateGradientCollection: function (gradientColors) {
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


        _hexToR: function (h) {
            return parseInt((this._cropHex(h)).substring(0, 2), 16);
        },

        _hexToG: function (h) {
            return parseInt((this._cropHex(h)).substring(2, 4), 16);
        },

        _hexToB: function (h) {
            return parseInt((this._cropHex(h)).substring(4, 6), 16);
        },
        _cropHex: function (h) {
            return (h.charAt(0) == "#") ? h.substring(1, 7) : h;
        },

        _rgbToHex: function (R, G, B) {
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
        _getRangeColorValues: function (range, start, end) {
            var rangeColorValues = [];
            rangeColorValues.push(start);
            if (start > end) {
                var rangeValue = (start - end) / (range - 1);
                for (var i = range; i > 2; i--) {
                    start = start - rangeValue;
                    rangeColorValues.push(start);
                }
            }
            else {
                var rangeValue = (end - start) / (range - 1);
                for (var i = 2; i < range; i++) {
                    start = start + rangeValue;
                    rangeColorValues.push(start + rangeValue);
                }
            }
            rangeColorValues.push(end);
            return rangeColorValues;
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
        _drawInteractiveLegend: function (legendSettings) {            
            legendSettings = bbdesigner$.extend({}, this.model.legendSettings, legendSettings, true);
            var xPos = 0;
            var yPos = 0;
            var _isSVG = (window.SVGSVGElement) ? true : false;
            var legenddiv = this._legenddiv;
            var _legendheight = legendSettings.height != 0 ? legendSettings.height : 30;
            var _legendwidth = legendSettings.width != 0 ? legendSettings.width : 100;
            if (legendSettings.mode == BoldBIDashboard.datavisualization.TreeMap.LegendMode.Interactive || this.model.rangeColorMapping != null) {
                var textcon = '';

                if (legendSettings.height == 0)
                    _legendheight = 30;
                if (legendSettings.width == 0)
                    _legendwidth = 100;

                if (legendSettings.leftLabel == null)
                    legendSettings.leftLabel = '';
                if (legendSettings.title != null) {
                    var newxpos = xPos;
                    if (!legendSettings.showLabels)
                        newxpos = xPos + legendSettings.leftLabel.length * 10;

                    var _legendtitlewidth = legendSettings.title.length * 10;
                    var text = titleText = legendSettings.title;

                    if (_legendtitlewidth > _legendwidth) {
                        for (var i = 1; i < titleText.toString().length; i++) {
                            text = titleText.toString().substring(0, i - 1) + '...';
                        }
                    }
                    var textcon = this._createLabel(text, newxpos, yPos, 'e-interactivelegend-title');
                    textcon[0].title = titleText;
                    textcon.css({
                        "width": _legendwidth + "px"
                    });
                    if (_isSVG)
                        textcon.appendTo(legenddiv);
                    else
                        legenddiv.append(textcon);
                    yPos += 25;
                }

                if (legendSettings.showLabels)
                    yPos += 25;

                if (legendSettings.leftLabel != null && !legendSettings.showLabels) {
                    var textcon = this._createLabel(legendSettings.leftLabel, xPos, yPos - 3, 'e-interactivelegend-leftlabel');

                    if (_isSVG)
                        textcon.appendTo(legenddiv);
                    else

                        legenddiv.append(textcon);
                    xPos = xPos + legendSettings.leftLabel.length * 10;
                }

                var interactiveElement = this._createInteractiveArrow(xPos, yPos + _legendheight);
                interactiveElement.appendTo(legenddiv);
                this._interactiveArrow = interactiveElement;

                var _legendgroup = null;
                if (!_isSVG && this.model.enableGradient) {
                    _legendgroup = this._createGroup(false, "legendGroup");
                    _legendgroup.style.left = 0 + 'px';
                    _legendgroup.style.top = 0 + 'px';
                    _legendgroup.style.position = "relative";
                    legenddiv.append(_legendgroup);
                }

                if (this.model.rangeColorMapping.length > 0) {
                    var mappings = this.model.rangeColorMapping;
                    for (var key = 0; key < mappings.length; key++) {
                        var colorMapping = mappings[key];
                        if (!colorMapping.hideLegend) {
                            var gradientCollection = [];
                            if (this.model.enableGradient && !BoldBIDashboard.util.isNullOrUndefined(colorMapping.gradientColors)) {
                                gradientCollection = this._generateGradientCollection(colorMapping.gradientColors);
                            }

                            var obj = {};
                            if (this.model.enableGradient && !BoldBIDashboard.util.isNullOrUndefined(colorMapping.gradientColors)) {
                                if (_isSVG) {
                                    var canvas = bbdesigner$("<canvas/>");
                                    var ctx = canvas[0].getContext("2d");
                                    var grd = ctx.createLinearGradient(0, 0, 300, 0);

                                    var temp = 0;
                                    for (var i = 0; i < 10; i++) {
                                        temp = temp + (1 / 10);
                                        if (i == 0 || colorMapping.gradientColors == 1) {
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
                                        "margin-left": xPos + "px",
                                        "margin-top": yPos + "px",
                                        "opacity": "0.9",
                                        "filter": "alpha(opacity=90)", /* For IE8 and earlier */
                                        "position": "absolute"
                                    });
                                    canvas.appendTo(legenddiv);
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
                                    "width": _legendwidth / this.model.rangeColorMapping.length + "px",
                                    "background-color": colorMapping.color,
                                    "margin-left": xPos + "px",
                                    "margin-top": yPos + "px",
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
                                obj["marginLeft"] = xPos;
                                this._legendRects.push(obj);
                                xPos = xPos + (_legendwidth / mappings.length) / 10;
                            }

                        }
                    }
                } else if (this._color() != "") { //draw legend for desaturationColorMapping
                    var colorMapping = this.model.desaturationColorMapping;
                    var color = colorMapping.color;
                    var rangeDiff = colorMapping.rangeMaximum - colorMapping.rangeMinimum;
                    var opacityDiff = colorMapping.to - colorMapping.from;

                    var obj = {};
                    if (_isSVG) {
                        var canvas = bbdesigner$("<canvas/>");
                        var ctx = canvas[0].getContext("2d");

                        bbdesigner$(canvas).attr({ width: _legendwidth, height: _legendheight });

                        var increase = opacityDiff / 10, width = _legendwidth / 10, opacity;

                        for (var i = 1; i <= 10; i++) {
                            opacity = colorMapping.from + (increase * i);
                            ctx.fillStyle = this.hex2rgba_convert(color, opacity);
                            ctx.fillRect(((i - 1) * width), 0, width, _legendheight);
                        }

                        canvas.css({
                            "height": _legendheight + "px",
                            "width": _legendwidth + "px",
                            "margin-left": xPos + "px",
                            "margin-top": yPos + "px",
                            "opacity": "0.9",
                            "filter": "alpha(opacity=90)", /* For IE8 and earlier */
                            "position": "absolute"
                        });
                        canvas.appendTo(legenddiv);
                    } else {
                        var increase = opacityDiff / 10, width = _legendwidth / 10, opacity, rect, left;
                        
                        for (var i = 1; i <= 10; i++) {
                            opacity = colorMapping.from + (increase * i);
                            left = xPos + (i - 1) * width;
                            rect = bbdesigner$("<div/>");
                            rect.css({
                                "height": _legendheight + "px",
                                "width": width + "px",
                                "background-color": color,
                                "margin-left": left + "px",
                                "margin-top": yPos + "px",
                                "opacity": opacity.toString(),
                                "filter": "alpha(opacity=" + (opacity * 100) + ")", /* For IE8 and earlier */
                                "position": "absolute"
                            });
                            legenddiv.append(rect);
                        }                       
                    }
                    var interval = _legendwidth / 10;
                    for (var i = 0; i < 10; i++) {
                        obj = {};
                        obj["marginLeft"] = xPos - (interval / 2); //show interactive cursor in the center of range
                        this._legendRects.push(obj);
                        xPos = xPos + interval;
                    }
                }

                if (legendSettings.showLabels) {
                    var labelxpos = xPos - _legendwidth;
                    var labelypos = yPos - 25;
                    var startlabel = this._createLabel((colorMapping.from), labelxpos, labelypos, 'e-legend-rangestartlabel');
                    labelxpos = xpos;
                    var endlabel = this._createLabel((colorMapping.to), labelxpos, labelypos);
                    if (colorMapping.legendLabel != undefined)
                        endlabel = this._createLabel((colorMapping.legendLabel), labelxpos - (colorMapping.legendLabel.length * 10) / 2, labelypos, 'e-legend-rangeendlabel');
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
                if (legendSettings.rightLabel != null && !legendSettings.showLabels) {
                    var textcon = this._createLabel(legendSettings.rightLabel, xPos + 10, yPos - 3, 'e-interactivelegend-rightlabel');
                    if (_isSVG)
                        textcon.appendTo(legenddiv);
                    else
                        legenddiv.append(textcon);
                    xPos = xPos + legendSettings.rightLabel.length * 10;
                }

                totalwidth = xPos + 10;
                totalheight = yPos + _legendheight + this._interactiveArrow.height();
                this._legendSize = { width: totalwidth, height: totalheight };

                if (legendSettings.dockPosition == 'left')
                    this._marginleft = totalwidth;
                else if (legendSettings.dockPosition == 'top')
                    this._margintop = totalheight;


            }
        },

        hex2rgba_convert: function (hex,opacity){
            hex = hex.replace('#','');
            r = parseInt(hex.substring(0,2), 16);
            g = parseInt(hex.substring(2,4), 16);
            b = parseInt(hex.substring(4,6), 16);

            result = 'rgba('+r+','+g+','+b+','+opacity+')';
            return result;
        },

        _createLabel: function (content, xpos, ypos, className) {
            var label = bbdesigner$("<div class=" + className + "></div>");
            label[0].innerHTML = content;
            label.css({
				"font-size":"12px",
				"font-weight":"normal",
                "margin-left": xpos + "px",
                "margin-top": ypos + "px",
                "position": "absolute"
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
				"visibility" : "hidden",

            });
            return interactiveElement;
        },
		
        _setPaletteColor: function (Items, PaletteColors) {
            Items = Items.sort(this._orderBycolorWeight);
            for (var i = 0; i < Items.length; i++) {
                if (PaletteColors.colors != null && PaletteColors.colors.length > 0) {
                    Items[i].backgroundColor= PaletteColors.colors[i % (PaletteColors.colors.length)];
                } 
            }
        },

        _orderBycolorWeight: function (a, b) {
            if (a.colorWeight == b.colorWeight) {
                return 0;
            } else if (a.colorWeight < b.colorWeight) {
                return 1;
            }
            return -1;
        },
       
        _orderByAreaWight: function (a, b) {
            if (a.AreaByWeight == b.AreaByWeight) {
                return 0;
            } else if (a.AreaByWeight < b.AreaByWeight) {
                return 1;
            }
            return -1;
        },

        _calculateSliceAndDiceItemSize: function (Items, xPos, yPos, width, height, gap, headerHeight, isHorizontal,legendHeight) {

            if (gap == "") { gap = 0;}
            var Gap = gap;
            var totalWeight = this._getTotalWeight(Items);
            if (isHorizontal == undefined) {
                isHorizontal = width > height ? true : false;
            }
            var AvailableSize = { "Width": width, "Height": height-legendHeight };
            var headerSize = headerHeight < AvailableSize.Height ? headerHeight : 0;
            AvailableSize.Height = AvailableSize.Height - headerSize;
            var AvailableArea = { "X": xPos, "Y": yPos + headerSize, "Width": AvailableSize.Width, "Height": AvailableSize.Height };
            var parentArea = AvailableSize.Height * AvailableSize.Width;
            var itemsCount = Items.length;
            if (isHorizontal) {
                var parentHeight = AvailableSize.Height;
                var allottedWidth = 0;
                for (var i = 0; i < itemsCount; i++) {
                    var childarea = (parentArea / totalWeight) * Items[i].weight;
                    var childWidth = childarea / parentHeight;
                    gap = (childWidth > Gap) ? Gap : 0;

                    if (allottedWidth <= AvailableSize.Width) {
                        Items[i].ItemWidth = (i != itemsCount - 1) ? childWidth - parseFloat(gap) : childWidth;
                        Items[i].ItemHeight = parentHeight;
                        Items[i].LeftPosition = allottedWidth + xPos;
                        Items[i].TopPosition = yPos + headerHeight;
                        allottedWidth += childWidth;
                    }
                }
            }
            else {
                var parentWidth = AvailableSize.Width;
                var allottedHeight = 0;
                for (var i = 0; i < itemsCount; i++) {
                    var childarea = (parentArea / totalWeight) * Items[i].weight;
                    var childHeight = childarea / parentWidth;
                    gap = (childHeight > Gap) ? Gap : 0;
                    if (allottedHeight <= AvailableSize.Height) {
                        Items[i].ItemWidth = parentWidth;
                        Items[i].ItemHeight = (i != itemsCount - 1) ? childHeight - parseFloat(gap) : childHeight;
                        Items[i].LeftPosition = xPos;
                        Items[i].TopPosition = allottedHeight + yPos + headerSize;
                        allottedHeight += childHeight;
                    }
                }
            }
        },

        _calculateSquarifiedItemSize: function (Items, xPos, yPos, width, height, Gap, headerHeight, legendHeight) {

            if (Gap == "") { Gap = 0; }            
            var totalweight = this._getTotalWeight(Items);
            var AvailableSize = { "Width": width, "Height": height-legendHeight };
            var headerSize = headerHeight < AvailableSize.Height ? headerHeight : 0;
            AvailableSize.Height = AvailableSize.Height - headerSize;
            for (var i = Items.length - 1; i >= 0; i--) {
                var item = Items[i];
                item["AreaByWeight"] = (AvailableSize.Height * AvailableSize.Width) * item.weight / totalweight;
                item.headerTopPosition = yPos;
            }
            var AvailableArea = { "X": xPos, "Y": yPos + headerSize, "Width": AvailableSize.Width, "Height": AvailableSize.Height };
            var OrderedItems = Items.sort(this._orderByAreaWight);
            var curX = 0, curY = 0;
            var j = 0;
            for (var i = 0; i < Items.length; i = j) {
                var firstTreemapItem = OrderedItems[i];
                weightObject = this._getGroupTotalWeight(firstTreemapItem, OrderedItems, AvailableArea, i);
                var GroupTotalWeight = weightObject.totalWeight;
                j = weightObject.index;
                var currentRect = {};
                var isHorizontal = (AvailableArea.Width > AvailableArea.Height) ? true : false;
                for (var k = i; k < j; k++) {
                    var item = OrderedItems[k];
                    var areaSum = GroupTotalWeight;
                    if (k == i) {
                        currentRect.X = AvailableArea.X;
                        currentRect.Y = AvailableArea.Y;
                        if (isHorizontal) {
                            currentRect.Width = areaSum / AvailableArea.Height;
                            currentRect.Height = AvailableArea.Height;
                            AvailableArea.X += currentRect.Width;
                            AvailableArea.Width = Math.max(0, AvailableArea.Width - currentRect.Width);
                        }
                        else {
                            currentRect.Width = AvailableArea.Width;
                            currentRect.Height = areaSum / AvailableArea.Width;
                            AvailableArea.Y += currentRect.Height;
                            AvailableArea.Height = Math.max(0, AvailableArea.Height - currentRect.Height);
                        }
                        curX = currentRect.X;
                        curY = currentRect.Y;
                    }
                    var rect = {};
                    if (OrderedItems.indexOf(item) != OrderedItems.length - 1) {
                        rect.X = 0;
                        rect.Y = 0;
                        rect.Width = (isHorizontal) ? currentRect.Width - parseFloat(Gap) : item.AreaByWeight / currentRect.Height;
                        rect.Height = (isHorizontal) ? item.AreaByWeight / currentRect.Width : currentRect.Height - parseFloat(Gap);
                        if (j - k != 1) {
                            if (isHorizontal) {
                                rect.Height -= parseFloat(Gap);
                            }
                            else {
                                rect.Width -= parseFloat(Gap);
                            }
                        }
                    }
                    else {
                        rect.Width = (isHorizontal) ? currentRect.Width : item.AreaByWeight / currentRect.Height;
                        rect.Height = (isHorizontal) ? item.AreaByWeight / currentRect.Width : currentRect.Height;
                    }
                    item.ItemWidth = rect.Width;
                    item.ItemHeight = rect.Height;
                    item.LeftPosition = curX;
                    item.TopPosition = curY;
                    if (isHorizontal) {
                        curY += (j - k != 1) ? rect.Height + parseFloat(Gap) : rect.Height;
                    }
                    else {
                        curX += (j - k != 1) ? rect.Width + parseFloat(Gap) : rect.Width;
                    }
                }
            }
        },
        
        _getGroupTotalWeight: function (firstTreemapItem, OrderedItems, AvailableArea, j) {
            var GroupTotalWeight = 0;
            var GroupMaxAspectRatio = 0;
            for (; j < OrderedItems.length; j++) {
                var ShorterSideLength = this._getShortersideLength(AvailableArea.Width, AvailableArea.Height);
                var lastTreemapItem = OrderedItems[j];
                GroupTotalWeight += lastTreemapItem.AreaByWeight;
                var GroupWidth = GroupTotalWeight / ShorterSideLength;
                var firstitemheight = firstTreemapItem.AreaByWeight / GroupWidth;
                var lastitemheight = lastTreemapItem.AreaByWeight / GroupWidth;
                if (j == 0)
                    GroupMaxAspectRatio = this._aspectRatio(GroupWidth, ShorterSideLength);
                var TempAspectRatio = Math.max(this._aspectRatio(firstitemheight, GroupWidth), this._aspectRatio(lastitemheight, GroupWidth));
                if (GroupTotalWeight == lastTreemapItem.AreaByWeight || TempAspectRatio < GroupMaxAspectRatio) {
                    GroupMaxAspectRatio = TempAspectRatio;
                }
                else {
                    GroupTotalWeight -= lastTreemapItem.AreaByWeight;
                    GroupWidth = GroupTotalWeight / ShorterSideLength;
                    GroupMaxAspectRatio = Math.max(this._aspectRatio(firstitemheight, GroupWidth), this._aspectRatio(lastitemheight, GroupWidth));
                    break;
                }
            }
            return { totalWeight: GroupTotalWeight, index: j };
        },
       
        _aspectRatio: function (x, y) {
            return (x > y) ? (x / y) : (y / x);
        },

        _getShortersideLength: function (width, height) {
            return width > height ? height : width;
        },

        _getTotalWeight: function (Items) {
            var total = 0;
            for (var i = 0; i < Items.length; i++) {
                total += parseFloat(Items[i].weight);
            }
            return total;

        },

        _getGroupitem: function (path, dataSource, headerHeight, currentLevel) {
            var obj = [];            
            if (dataSource != null && this.weightValuePath() != null) {                
                for (var i in dataSource) {
                    var item = dataSource[i];
                    if (item != null && item.hasOwnProperty(path) ? true : this._containsProperty(item,path)) {
                        var itemValue = this._reflection(item, path);
                        if (bbdesigner$.inArray(itemValue, obj) == -1) {
							if(this._legendToggle){
								if(this._legendToggle != itemValue){
											obj.push(itemValue);
								}
								else{
									if (bbdesigner$.inArray(itemValue, this._toggle) == -1)
										this._toggle.push(itemValue);
								}
							}
							else{
								obj.push(itemValue);
							}
                        }
                    }
                }
				if(this._invisibility){
					for(var m=0;m<obj.length;m++){
						for(var n=0;n<this._invisibility.length;n++){
							if(this._invisibility[n] == obj[m]){
								//obj.splice(m, 1);
								obj[m] = null;
								if(bbdesigner$.inArray(this._invisibility[n], this._toggle) == -1) 
									this._toggle.push(this._invisibility[n]);
							}
						}
					}
				}
			    var objCollection = [];
                for (var i = 0; i < obj.length; i++) {
                    var Coll = {};
                    var groupObj = [];
                    var groupId = obj[i];
                    var colorWeight = 0;
                    var weight = 0;
                    var count = 0;
                    for (var j = 0; j < dataSource.length;j++) {
                        var item = dataSource[j];
                        var itemValue = this._reflection(item, path);
                        if (itemValue == groupId) {
                            var weightValue = this._reflection(item, this.weightValuePath());
							var color = this._reflection(item, this.colorPath());
								if(!BoldBIDashboard.util.isNullOrUndefined(this._invisibility) && this._invisibility.length > 0){
									if(!item._isVisible)
										weightValue = 0;
								}
                            if(weightValue == null)
                                continue;
                       
                            if (typeof weightValue != "number") {
                                weightValue = Number(weightValue.replace(/[^0-9\.]+/g, ""));
                            }
                            if (weightValue < 0) {
                                weightValue = -1 * weightValue;
                            }
                            var colorWeightValue = this._reflection(item, this.colorValuePath());
                            if (colorWeightValue!=null && (typeof colorWeightValue != "number")) {

                                colorWeightValue = Number(colorWeightValue.replace(/[^0-9\.]+/g, ""));
                            }
							if(this._legendToggle){
								if(this._legendToggle != itemValue){
									var dataCount = this._legendTreemapItems.length;
								    for(var m=0;m<dataCount;m++){
										if(this._legendTreemapItems[m].isVisible){
											if(bbdesigner$.inArray(item, groupObj) == -1) 
												groupObj.push(item);
										}
									}
								}
							}
							else{
								groupObj.push(item);
							}
                            count++;
                            if (weightValue != null) {
                                weight += parseFloat(weightValue);
                            }
                            if (colorWeightValue != null) {
                                colorWeight += parseFloat(colorWeightValue);
                            }
                        }
                    }
                    
                    Coll["header"] = groupId;
                    Coll["data"] = groupObj;
                    Coll["weight"] = weight;
                    Coll["colorWeight"] = colorWeight;
                    Coll["headerHeight"] = headerHeight;
					Coll["isVisible"] = true;
					Coll["groupPath"] = path;
					Coll["level"] = currentLevel;
					Coll["color"] = color;
                    if (weight > 0) {
                        var newTreemapItem = new treeMapItem(Coll);
                        objCollection.push(newTreemapItem);
                    }
                }
				this._treemapItemCollection = objCollection;
                return objCollection;
            }
            else { return null; }
        },
      
        _getTopGroupitem: function (path, dataSource) {            
            if (path == null) path = this.labelPath();
            if (path == null) path = this.weightValuePath();
            var obj = [];
            var Coll = {};
            var weight = 0, colorWeight = 0;
            var groupId="";
            var innerobjCollection = [];
            var itemColl = [];
            for (var j = 0; j < dataSource.length; j++) {
                var item = dataSource[j];
				item._isVisible = true;
				var itemValue = this._reflection(item, path);
				if(this._invisibility){
					for(var z=0;z<this._invisibility.length;z++){
						if(this._invisibility[z] == itemValue)
							item._isVisible = false;
					}
				}
                
                var innerColl={};
                var weightValue = this._reflection(item, this.weightValuePath());
				if (weightValue == null || weightValue == undefined) continue;
                if (typeof weightValue != "number") {
                    weightValue = Number(weightValue.replace(/[^0-9\.]+/g, ""));
                }
                if (weightValue < 0) {
                    weightValue = -1 * weightValue;
                }
                var colorWeightValue = this._reflection(item, this.colorValuePath());
                if (colorWeightValue!=null && (typeof colorWeightValue != "number")) {

                    colorWeightValue = Number(colorWeightValue.replace(/[^0-9\.]+/g, ""));
                }  
                if (weightValue != null) {
                    weight += parseFloat(weightValue);
                }
                if (colorWeightValue != null) {
                    colorWeight += parseFloat(colorWeightValue);
                }
                itemColl.push(item);
                innerColl["weight"] = weightValue;
                innerColl["data"] = item;                
                innerColl["header"] = itemValue;
                innerColl["colorWeight"] = colorWeightValue;                                       
                var newinnerTreemapItem = new treeMapItem(innerColl);
                innerobjCollection.push(newinnerTreemapItem);
            }        
            Coll["header"] = groupId;
            Coll["data"] = itemColl;
            Coll["weight"] = weight;
            Coll["innerItem"] = innerobjCollection;
            Coll["colorWeight"] = colorWeight;                                   
			Coll["isVisible"] = true;
            var treemapColl = [];
            var treeitem = new treeMapItem(Coll);
            treemapColl.push(treeitem);
            return  treemapColl;
        },         
       
        _containsProperty: function (object, propertyName) {
            for (var key in object)
            {
                if(key == propertyName)
                {
                    return true;
                }
            }
            return false;
        },

        _reflection: function (Source, Path) {
            var ShapeValues = Source;
            if (Path != null && Source != null) {
                var parts = Path.split(".");
                parts.push(Path);
                var i = 0;
                for (; i < parts.length; i++) {
                    if (ShapeValues != null) {
                        var hasProperty = ShapeValues.hasOwnProperty(parts[i]) ? true : this._containsProperty(ShapeValues, parts[i]);
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

        }

    });

    var treeMapLevel = function () {        
        this.groupBackground = null;       
        this.groupBorderColor = null;
        this.groupBorderThickness = 1;       
        this.groupPadding = 4;
        this.groupPath = null;
        this.groupGap = 1;       
        this.headerHeight = 20;
        this.showHeader = true;       
        this.showLabels = false;
        this.headerTemplate = null;       
        this.labelTemplate = null;
        this.labelPosition = "center";
        labelVisibilityMode = "visible";      
        headerVisibilityMode = "visible";

        this.treeMapItems = [];
    };

    treeMapLevel.prototype = {

    };
	
    var TreeMapGroupColorMapping = function () {	
        this.groupID = null;		       
        this.rangeColorMapping = [];

        this.desaturationColorMapping = { 				            
            from:0, 				            
            to:0,			
            color: "",								            
            rangeMinimum:0,		
            rangeMaximum:0
        };  
       
        this.uniColorMapping = {             
            color: null 
        };
     
        this.paletteColorMapping = {           
            colors: [],
        };
    };		
	
    var TreeMapRangeColorMapping = function () {
        
        this.from = -1;		
        this.to = -1;		    
        this.legendlabel = null;		      
        this.color = null;
    };
	
    var treeMapItem = function (params) {
        this.weight = params.weight;
        this.colorWeight = params.colorWeight;
        this.Data = params.data;
        this.headerHeight = params.headerHeight;
        this.header = params.header;
        this.label = params.header;
        this.headerLeftPosition = 0;
        this.headerTopPosition = 0;
        this.innerItems = params.innerItem;
        this.headerWidth = 0;
        this.headerTemplate = null;
		this.isVisible = params.isVisible;
		this.groupPath = params.groupPath;
		this.level = params.level;
		this.color = params.color;
    };

    treeMapItem.prototype = {

        _generateColorMappings: function (colorMappings,treeMap) {
            if (colorMappings.rangeColorMapping != null && colorMappings.rangeColorMapping.length > 0) {
                return this._getRangeBrushColor(colorMappings.rangeColorMapping);
            }
            if (treeMap.uniColor() != null && colorMappings.uniColorMapping!=null) {
                return treeMap.uniColor();
            }
            else if (colorMappings.uniColorMapping.color != null && colorMappings.uniColorMapping != null) {
                return this._getUniColor(colorMappings.uniColorMapping);
            }
            
        },

        _getUniColor: function (uniColorMapping) {
            return uniColorMapping.color;
        },
      
        _getRangeBrushColor: function (rangeColorMapping) {
			var color;
            for (var j = 0; j < rangeColorMapping.length; j++) {
                var rangeBrush = rangeColorMapping[j];
                if (this.colorWeight >= rangeBrush.from && this.colorWeight <= rangeBrush.to) {
                    color = rangeBrush.color;
                }
            }
			return color;
        }
    };
	
	BoldBIDashboard.datavisualization.TreeMap.selectionMode = {
		Default: "default",
		Multiple: "multiple"
	};
	
	BoldBIDashboard.datavisualization.TreeMap.groupSelectionMode = {
		Default: "default",
		Multiple: "multiple"
	};
	
    BoldBIDashboard.datavisualization.TreeMap.ItemsLayoutMode = {        
        Squarified: "squarified",        
        SliceAndDiceHorizontal: "sliceanddicehorizontal",        
        SliceAndDiceVertical: "sliceanddicevertical",        
        SliceAndDiceAuto: "sliceanddiceauto"
    };  

    BoldBIDashboard.datavisualization.TreeMap.DockPosition = {        
        Top: "top",        
        Bottom: "bottom",        
        Right: "right",        
        Left: "left"
    };
	BoldBIDashboard.datavisualization.TreeMap.LegendMode = {
      Default: "default",
      Interactive: "interactive"
    };
    BoldBIDashboard.datavisualization.TreeMap.Position = {        
        TopLeft: "topleft",        
        TopCenter: "topcenter",        
        TopRight: "topright",        
        CenterLeft: "centerleft",        
        Center: "center",        
        CenterRight: "centerright",        
        BottomLeft: "bottomleft",        
        BottomCenter: "bottomcenter",        
        BottomRight:"bottomright"
    };
    BoldBIDashboard.datavisualization.TreeMap.Alignment = {       
        Near: "near",        
        Center: "center",        
        Far: "far"
    }
    BoldBIDashboard.datavisualization.TreeMap.VisibilityMode = {        
        Visible:"visible",        
        HideOnExceededLength:"hideonexceededlength"
    };
})(bbdesigner$, SyncfusionBoldBIDashboard);
;
bbdesigner$.extend(true, BoldBIDashboard.datavisualization.TreeMap.prototype, {
    getDrillDownHeader: function (header) {
        var headerString = '';
        var length1 = 1;
        if (header.length === length1) {
            header[0] = this.model.header;
            return header[0];
        }
        for (var index = 0; index < header.length; index++) {
            headerString += header[index];
            if (index !== header.length - length1) {
                headerString += '.';
            }
        }
        return headerString;
    },
});
;