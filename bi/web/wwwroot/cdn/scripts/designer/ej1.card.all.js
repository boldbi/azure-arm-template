/*!
*  filename: ej1.card.all.js
*  version : 6.18.11
*  Copyright Syncfusion Inc. 2001 - 2023. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
*/

var NumberFormatting = /** @class */ (function () {
    function NumberFormatting() {
    }
    NumberFormatting.prototype.isIntegerValue = function (value) {
        return typeof value === 'number' &&
            isFinite(value) &&
            Math.floor(value) === value;
    };
    NumberFormatting.prototype.applyFormat = function (value, valueRepresentation) {
        var stringFormat = "";
        switch (valueRepresentation.format) {
            case Format.Percentage:
                stringFormat = "P" + valueRepresentation.numberOfDecimals;
                break;
            case Format.Number:
                stringFormat = "N" + valueRepresentation.numberOfDecimals;
                break;
            case Format.Currency:
                stringFormat = "C" + valueRepresentation.numberOfDecimals;
                break;
            default:
                break;
        }
        var symbol = BoldBIDashboard.findCulture(valueRepresentation.currencyCulture).numberFormat.currency.symbol;
        value = this.applyStringFormatting(stringFormat, valueRepresentation.currencyCulture, valueRepresentation.representation, value, valueRepresentation.negativeValueFormat, valueRepresentation.enableLakhsAndCroreRep);  // eslint-disable-line no-param-reassign
        if (valueRepresentation.format !== Format.Percentage) {
            var currencyindex = value.indexOf(symbol);
            var negativeindex = value.indexOf('-');
            var splitedvalue = value.replace(symbol, '');
            var isStartwith = value.startsWith('-');
            var isEndwith = value.endsWith('-');
            splitedvalue = splitedvalue.replace('-', '');          
            var splitDecimalValue = splitedvalue.split(valueRepresentation.decimalSeparator.CurrentValue);
            splitDecimalValue[0] = splitDecimalValue[0].replaceAll(valueRepresentation.groupSeparator.CurrentValue, valueRepresentation.groupSeparator.AliasValue);
            splitedvalue = splitDecimalValue.length > 1 ? splitDecimalValue[0] + valueRepresentation.decimalSeparator.AliasValue + splitDecimalValue[1] : splitDecimalValue[0] ;
            value = currencyindex == -1 ? splitedvalue : BoldBIDashboard.findCulture(valueRepresentation.currencyCulture).isRTL == true ? splitedvalue + symbol : currencyindex > 1 ? splitedvalue + symbol : symbol + splitedvalue ;  // eslint-disable-line no-param-reassign
            if (negativeindex != -1) {
                negativeValues = value.slice(0, negativeindex);
                value = isStartwith ? '-' + value : isEndwith ? value + '-' : negativeValues + '-' + value.slice(negativeindex);
            } 
        }
        value = valueRepresentation.prefix + value + valueRepresentation.suffix;  // eslint-disable-line no-param-reassign// eslint-disable-line no-param-reassign
        return value;
    };
    // apply formatting to negative values
    NumberFormatting.prototype.applyNegativeFormatting = function (value, numberOfDecimals, currencyCulture, negativeValueFormat) {
        var val = Math.abs((value.toString()));
        var formattedValue = BoldBIDashboard.globalize.format(val, "N" + numberOfDecimals, currencyCulture);
        switch (negativeValueFormat) {
            case NegativeValueFormat.Default:
                return "-" + formattedValue;
            case NegativeValueFormat.NoNegativeSignWithBracket:
                return "(" + formattedValue + ")";
            case NegativeValueFormat.NegativeSignInSuffix:
                return formattedValue + "-";
            default:
                break;
        }

        return "-" + formattedValue;
    };
    NumberFormatting.prototype.applyStringFormatting = function(stringFormat, culture, unit, value, negativeValueFormat, enableLakhsAndCroreRep) {
        if (!BoldBIDashboard.isNullOrUndefined(value)) {
            BoldBIDashboard.preferredCulture(culture);
            //var val = parseFloat(value.toString());
            //if (isNaN(val)) {

            //    return value;
            //}
            var val = unit === Representation.Auto ? this.truncateNumber(value, culture, enableLakhsAndCroreRep) : this.applyNumberUnit(unit, value, culture);

            return this.adjustZeros(val, unit, stringFormat, culture, negativeValueFormat);
        }
    };
    NumberFormatting.prototype.adjustZeros = function(value, unit, stringFormat, culture, negativeValueFormat) {
        BoldBIDashboard.preferredCulture(culture);
        var format = stringFormat,
            zero = 0,
            lessThanZero = -1,
            pointZero = 0.0;
        var decimalplaces = parseInt(stringFormat.replace(/^\D+/g, ''));
        var isDecimalFormatChange = value.fraction === parseInt(value.fraction) || value.fraction % decimalplaces === zero;
        var currencyCulture = culture;
        if (unit === Representation.Auto) {
            this.representSymbol = value.symbol;
            if (value.fraction === zero) {
                value = { fraction: 0, symbol: "" }; // eslint-disable-line no-param-reassign
                format = stringFormat.replace(decimalplaces, "0");  // eslint-disable-line no-param-reassign
            } else if (isDecimalFormatChange) {
                format = stringFormat.replace(decimalplaces, "0");
            }
            if (stringFormat.indexOf("N") > lessThanZero && value.fraction < pointZero) {

                return this.applyNegativeFormatting(value.fraction, isDecimalFormatChange ? zero : decimalplaces, currencyCulture, negativeValueFormat) + value.symbol;
            }

            return BoldBIDashboard.globalize.format(value.fraction, format, currencyCulture) + value.symbol;
        }
        if (value.fraction === zero) {
            value = { fraction: zero, postFixLabel: "" }; // eslint-disable-line no-param-reassign
            format = stringFormat.replace(decimalplaces, "0");  // eslint-disable-line no-param-reassign
        }
		if (isDecimalFormatChange) {
            format = stringFormat.replace(decimalplaces, "0");
        }
        if (stringFormat.indexOf("N") > lessThanZero && value.fraction < pointZero) {

            return this.applyNegativeFormatting(value.fraction, isDecimalFormatChange ? zero : decimalplaces, currencyCulture, negativeValueFormat) + value.postFixLabel;
        }

        return BoldBIDashboard.globalize.format(value.fraction, format, currencyCulture) + value.postFixLabel;
    };
    NumberFormatting.prototype.truncateNumber = function(num, culture, enableLakhsAndCroreRep) {
        var three = 3,
            five = 5,
            six = 6,
            seven = 7,
            nine = 9,
            ten = 10,
            twelve = 12;
        var thousand = Math.pow(ten, three);
        var lakh = Math.pow(ten, five);
        var million = Math.pow(ten, six);
        var crores = Math.pow(ten, seven);
        var billion = Math.pow(ten, nine);
        var trillion = Math.pow(ten, twelve);
        var number = num;
        //if (this.model.valueRepresentation.currencyCulture === "en-IN") {
        //    if (((number >= thousand) && (number < lakhs)) || ((number <= -thousand) && (number > -lakhs))) {
        //        return { fraction: this.calculateFraction(number, thousand), symbol: "K" };
        //    } else if (((number >= lakhs) && (number < million)) || ((number <= -lakhs) && (number > -million))) {
        //        return { fraction: this.calculateFraction(number, lakhs), symbol: "L" };
        //    } else if (((number >= million) && (number < crores)) || ((number <= -million) && (number > -crores))) {
        //        return { fraction: this.calculateFraction(number, million), symbol: "M" };
        //    } else if (((number >= crores) && (number < billion)) || ((number <= -crores) && (number > -billion))) {
        //        return { fraction: this.calculateFraction(number, crores), symbol: "C" };
        //    } else if (((number >= billion) && (number < trillion)) || ((number <= -billion) && (number > -trillion))) {
        //        return { fraction: this.calculateFraction(number, billion), symbol: "B" };
        //    } else if (number >= trillion || number <= -trillion) {
        //        return { fraction: this.calculateFraction(number, trillion), symbol: "T" };
        //    }
        //} else {	
        if (((number >= thousand) && (number < million)) || ((number <= -thousand) && (number > -million))) {
            return { fraction: this.calculateFraction(number, thousand), symbol: "K" };
        }
		if (this.isRequiredCulture(culture) && enableLakhsAndCroreRep) {
			if (((number >= lakh) && (number < crores)) || ((number <= -lakh) && (number > -crores))) {
				return { fraction: this.calculateFraction(number, lakh), symbol: "L" };
			} else if (number >= crores || number <= -crores) {
				return { fraction: this.calculateFraction(number, crores), symbol: "Cr" };
			}
		}
		else {
			if (((number >= million) && (number < billion)) || ((number <= -million) && (number > -billion))) {
				return { fraction: this.calculateFraction(number, million), symbol: "M" };
			} else if (((number >= billion) && (number < trillion)) || ((number <= -billion) && (number > -trillion))) {
				return { fraction: this.calculateFraction(number, billion), symbol: "B" };
			} else if (number >= trillion || number <= -trillion) {
				return { fraction: this.calculateFraction(number, trillion), symbol: "T" };
			}
		}
        //}

        return { fraction: number, symbol: "" };
    };
	NumberFormatting.prototype.isRequiredCulture = function (cultureName) {
         var cultures = [
            'en-IN',
            'as-IN',
            'bn-BD',
            'bn-IN',
            'gu-IN',
            'hi-IN',
            'kn-IN',
            'kok-IN',
            'ml-IN',
            'mr-IN',
            'ne-NP',
            'or-IN',
            'pa-IN',
            'pa-Arab-PK',
            'sa-IN',
            'sd-Arab-PK',
            'ta-IN',
            'ur-PK'
        ];
        return cultures.filter(function (i) { return i === cultureName; }).length > 0;
    };
    NumberFormatting.prototype.calculateFraction = function(num, divisor) {

        return num / divisor;
    };
    NumberFormatting.prototype.applyNumberUnit = function(unit, value, culture) {
        var one = 1,
            ten = 10,
            five = 5,
            three = 3,
            six = 6,
            seven = 7,
            nine = 9;
        var thousand = Math.pow(ten, three);
        var lakhs = Math.pow(ten, five);
        var million = Math.pow(ten, six);
        var crores = Math.pow(ten, seven);
        var billion = Math.pow(ten, nine);
        switch (unit) {
			case Representation.Ones: 
				return { fraction: value / one, postFixLabel: "" };
			case Representation.Thousands:
				return { fraction: value / thousand, postFixLabel: "K" };
			case Representation.Lakhs:
				return { fraction: value / lakhs, postFixLabel: "L" };
			case Representation.Millions:
				return { fraction: value / million, postFixLabel: "M" };
			case Representation.Crores:
				return { fraction: value / crores, postFixLabel: "Cr" };
			case Representation.Billions:
				return { fraction: value / billion, postFixLabel: "B" };
			default:
				return { fraction: value, postFixLabel: "" };
		}
    };

    return NumberFormatting;
}());

Representation = {
    Auto: "Auto",
    Ones: "Ones",
    Thousands: "Thousands",
    Lakhs: "Lakhs",
    Millions: "Millions",
    Crores: "Crores",
    Billions: "Billions"
};
Format = {
    Number: "Number",
    Currency: "Currency",
    Percentage: "Percentage"
};
NegativeValueFormat = {
    Default: "default",
    NoNegativeSignWithBracket: "nonegativesignwithbracket",
    NegativeSignInSuffix: "negativesigninsuffix"
};;
/* eslint no-extra-parens: ["error", "all", { "nestedBinaryExpressions": false }] */
/* eslint max-params: ["error", 10] */
'use strict';
(function (bbdesigner$, BoldBIDashboard, undefined) { // eslint-disable-line no-undefined, id-length, no-shadow-restricted-names, no-unused-vars
     BoldBIDashboard.widget("BoldBIDashboardCard", "BoldBIDashboard.Card", {

        _rootCSS: "e-Card",

        element: null,

        model: null,

        defaults: {
            targetValue: {
                name: "",
                value: "",
                fontSize: "",
                color: "",
                customText: ""
            },
            actualValue: {
                name: "",
                value: "",
                fontSize: "",
                color: "",
                position: "",
                customText: ""
            },
            additionalValue: {
                name: "",
                value: "",
                fontSize: "",
                color: "",
                position: "",
                customText: ""
            },
            headers: {
                headerFontSize: "",

                visible: true,

                headerPosition: ""
            },
            higherValueGood: true,
            secondaryValueType: "variance",
            cssClass: "",
            showTooltip: true,
            showIndicatorOnly: false,
            showActualValue: true,
            secondaryValuePosition: "",
            primaryValuePosition: "",
            customVisibility: {
                actualValue: true,
                primaryValue: true,
                secondaryValue: true,
                indicator: true,
                additionalElement: true,
                sparkline: true,
				compactView: true,
            },
            customHeader: {

                text: "",
				value: "",
                color: "",
                visible: false,
                size: ""
            },
            subTitle: {
                visible: false,
                color: "",
                text: "",
                size: "",
                position: ""
            },
            size: {
                width: 300,

                height: 100
            },
            valueRepresentation: {
                format: "number",

                variationType: "absolute",

                abbreviationType: "auto",

                numberOfDecimals: 6,

                currencyCulture: "en-US",

                negativeValueFormat: "default",

                prefix: "",

                suffix: ""
            },
            additionalValueRepresentation: {
                format: "number",

                variationType: "absolute",

                abbreviationType: "auto",

				decimalSeparator: null,
				
				groupSeparator: null,

                numberOfDecimals: 6,

                currencyCulture: "en-US",

                negativeValueFormat: "default",

                prefix: "",

                suffix: ""
            },
            uniformFontSize: false,
			culture: "en-US",
            background: {
                type: "none",

                imageSrc: "",

                opacity: "",
				
				color: ""
            },

            enableResize: false,

            enableAnination: false,

            selected: null,
			
			create: null,
			
			enableRightClick: false,

            rightClick: null,

            icon: {
                path: "",

                type: "",

                color: ""
            },

            primaryValue: {
                color: ""
            }

        },
        dataTypes: {
            targetValue: "data",
            actualValue: "data"
        },
        _init: function () {
			this._initPrivateVarialbles();
            this._draw();
            this._wireEvents();
        },
        _initPrivateVarialbles: function () {
            this._tooltipTarget = null;
            this._tooltipTimer = null;
            this.browserType = BoldBIDashboard.Card.BrowserType.Chrome;
            this._proxy = this.element.attr("id");
            this._parentWidth = bbdesigner$(this.element).parent().
            width();
            this._parentHeight = bbdesigner$(this.element).parent().
            height();
            this.warning = false;
            this._width = Number(this.model.size.width || this.element.width());
            this._height = Number(this.model.size.height || this.element.height());
            this._varianceColor = "";
            this.actualExponent = false;
			this.additionalExponent = false;
            this.targetExponent = false;
            this.variantExponent = false;
            this.representSymbol = "";
            this._isCompact = false;
        },
        _setModel: function (options) {
            for (var prop in options) {
                if (options.hasOwnProperty(prop)) { // eslint-disable-line  no-prototype-builtins
                    switch (prop) {
                        case "selected": this.model.selected = options[prop];
                            break;
                        case "background": this.model.background = options[prop];
                            break;
						case "rightClick":  this.model.rightClick = options[prop];
							break;
                        default :
                            break;

                    }
                }
            }
        },
        setHigherValueGood: function (value) {
            this.model.higherValueGood = value;
        },
        _wireEvents: function () {
            this._on(this.element, "click", this._selectedHandler);
            if (!BoldBIDashboard.isMobile()) {
				this._on(this.element, "mousemove", ".e-hoverable", this._showToolTip);
				this._on(this.element, "mouseleave", ".e-hoverable", this._hideToolTip);
				//this._on(this.element, "mousemove", ".e-card-wrapper", this._changeSparklineBgColor);
				//this._on(this.element, "mouseleave", ".e-card-wrapper", this._orginalSparklineBgColor);
			}
            if (this.model.enableResize) {
                this._on(bbdesigner$(window), "resize", this._cardResize);
			}		
			this._on(this.element, "contextmenu", this._rightClickHandler);
			this._on(this.element, "dblclick", this._doubleClickHandler);
        },
        _unWireEvents: function () {
            this._off(this.element, "click", this._selectedHandler);
			 if (!BoldBIDashboard.isMobile()) {
				this._off(this.element, "mousemove", ".e-hoverable", this._showToolTip);
				this._off(this.element, "mouseleave", ".e-hoverable", this._hideToolTip);
				//this._off(this.element, "mousemove", ".e-card-wrapper", this._changeSparklineBgColor);
				//this._off(this.element, "mouseleave", ".e-card-wrapper", this._orginalSparklineBgColor);
			}			
            this._off(bbdesigner$(window), "resize", this._cardResize);
			this._off(this.element, "contextmenu", this._rightClickHandler);
			this._off(this.element, "dblclick", this._doubleClickHandler);
        },

        // Destroys the control
        _destroy: function () {
            this.element.empty().removeClass("e-Card" + this.model.cssClass);
        },

        redraw: function () {
            this._unWireEvents();
            this.element.html("");
            this._init();
        },

        // Renders the card control
        _draw: function () {
            this.element.addClass("e-js");
            if (this.model.targetValue !== null, this.model.actualValue !== null) {  // eslint-disable-line no-sequences
                this._render();
                if (!this.model.uniformFontSize) {
                    this._calculateFontSizes();
                }
				if(!this.model.IsCustomRange){
                this.element.find(".e-variationkpi").css({ "height": this.element.find(".e-variationkpi").parent() + "px" });
				}
            }
        },

        // Checks if the given text is null or empty or undefined
        _isNullOrEmptyOrUndefined: function (text) {
            return (text === null || text === "" || typeof text === "undefined"); // eslint-disable-line no-extra-parens
        },

        // Creates teh Title for the card
        _createTitleContainer: function () {
			var zero = 0,
				twentyFive = 25,
				twenty = 20;
				var titleDiv = this.element.find(".e-title").addClass("e-hoverable");
            if (this.model.headers.visible) {
                //var heading = bbdesigner$("<div>").addClass("e-card-header e-hoverable");
                if (!this._isNullOrEmptyOrUndefined(this.model.headers.headerPosition)) {
                    titleDiv.css({ "display": "flex", "justify-content": this._getTitleAlignmentValue(this.model.headers.headerPosition.toLowerCase()) });
                }
                if (this.model.customHeader.visible) {
					titleDiv.html(this.model.customHeader.text).css({ "font-size": this.model.customHeader.size === zero ? twentyFive : this.model.customHeader.size, "color": !this._isNullOrEmptyOrUndefined(this.model.customHeader.color) ? this.model.customHeader.color : '' });
                    titleDiv.attr({"data-value" : this.model.customHeader.value});
                    if (this.model.customHeader.size === zero) {
						titleDiv.removeClass("e-hoverable");
					}
                } else {
                    var hasActualValue = false;
                    var titleText = "";
                    if (!this._isNullOrEmptyOrUndefined(this.model.actualValue.name)) {
                        titleText += this.model.actualValue.name;
                        hasActualValue = true;
                    }
                    if (!this._isNullOrEmptyOrUndefined(this.model.targetValue.name)) {
                        if (hasActualValue) {
                            titleText += " vs ";
						}
                        titleText += this.model.targetValue.name;
                    }
					titleDiv.html(titleText).css({ "color": this.model.customHeader && !this._isNullOrEmptyOrUndefined(this.model.customHeader.color) ? this.model.customHeader.color : '' });

                }
                //titleDiv.append(heading);
                if (this.model.subTitle.visible) {
                    var subHeading = this.element.find(".e-subtitle").
					html(this.model.subTitle.text).
                        css({ "height": this.model.showIndicatorOnly ? "8%" : "12%", "color": this.model.subTitle.color });
                    titleDiv.css({"height": "18%"});
					if (!this._isNullOrEmptyOrUndefined(this.model.headers.headerPosition)) {
                    subHeading.css({ "display": "flex", "justify-content": this._getTitleAlignmentValue(this.model.headers.headerPosition.toLowerCase()) });
					}
                    if (this.element.parent().height() < 120) {
                        subHeading.
                            css({ "font-size": "50%"});
                        titleDiv.css({ "font-size": "70%" });
                    } else {
                        subHeading.
                         css({ "font-size": "80%", "height": "12%" });
                    }
                } else {
                    if (this.model.uniformFontSize) {
                        titleDiv.css({ "font-size": this._isCompact ? "85%" : "95%" });
                    } else {
                        titleDiv.css({"height": "22%"})
                    }
                }
                if (this.model.background.type === BoldBIDashboard.Card.BackgroundType.Full) {
                    //titleDiv.children(".e-card-header,.e-subheading").css({ "color": "white" });
				}
            } else {
                titleDiv.css({ "height": 0 });
            }
            //titleDiv.css({ "margin-top": this._height / twenty + "px"}); // eslint-disable-line no-mixed-operators

            return titleDiv;
		},

		_createExponentValues: function(exponentData, isvariance, isAdditional) {
			var prefix = null,
				suffix = null,
				variantformattedvalue = null,
				lessThanZero = -1,
				zero = 0,
				one = 1,
				two = 2,
				three = 3;
			var valueRepresentation = isAdditional ? this.model.additionalValueRepresentation : this.model.valueRepresentation;
            if (isvariance) {
				variantformattedvalue = this._getFormattedValue(exponentData, true, false).value;
            } else {
				variantformattedvalue = this._getFormattedValue(exponentData, false, false);
            }
            if (valueRepresentation.format === "currency") {
                var cultureSymbol = BoldBIDashboard.preferredCulture(valueRepresentation.currencyCulture);
                var symbol = cultureSymbol.numberFormat.currency.symbol;
                prefix = variantformattedvalue.charAt(zero);
                if (prefix === '-') {
                    prefix = variantformattedvalue.charAt(one);
				}
				suffix = variantformattedvalue[variantformattedvalue.length - one];
                if (suffix === '-') {
                    suffix = variantformattedvalue[variantformattedvalue.length - two];
				}
                var symbolSuffix = symbol[symbol.length - one];
                var symbolPrefix = symbol.charAt(zero); // eslint-disable-line no-param-reassign
					if (valueRepresentation.abbreviationType === "auto" && this.representSymbol !== "") {
                        if (prefix === '(') {
                            exponentData = exponentData.toString();  // eslint-disable-line no-param-reassign
                            if (exponentData.indexOf('-') !== lessThanZero) {
								exponentData = exponentData.replace("-", "");  // eslint-disable-line no-param-reassign
							}
                            prefix = variantformattedvalue.charAt(one);
							suffix = variantformattedvalue[variantformattedvalue.length - three];
                            if (prefix === symbolPrefix) {
								exponentData = '(' + symbol + exponentData + ')' + this.representSymbol;  // eslint-disable-line no-param-reassign
							}
                            if (suffix === symbolSuffix) {
                                exponentData = '(' + exponentData + symbol + ')' + this.representSymbol;  // eslint-disable-line no-param-reassign
                            }
                        } else {
                            if (valueRepresentation.abbreviationType === "ones") {
								suffix = variantformattedvalue[variantformattedvalue.length - one];
							} else {
								suffix = variantformattedvalue[variantformattedvalue.length - two];
							}
							if (prefix === symbolPrefix) {
								exponentData = symbol + exponentData + this.representSymbol;  // eslint-disable-line no-param-reassign
							}
                            if (suffix === symbolSuffix) {
                                exponentData = exponentData + symbol + this.representSymbol;  // eslint-disable-line no-param-reassign
                            }
						}
					} else if (prefix === '(') {
                        exponentData = exponentData.toString();  // eslint-disable-line no-param-reassign
                        if (exponentData.indexOf('-') !== lessThanZero) {
							exponentData = exponentData.replace("-", "");  // eslint-disable-line no-param-reassign
						}
                        prefix = variantformattedvalue.charAt(one);
						suffix = variantformattedvalue[variantformattedvalue.length - two];
                        if (prefix === symbolPrefix) {
                            exponentData = '(' + symbol + exponentData + ')';  // eslint-disable-line no-param-reassign
                        }
                        if (suffix === symbolSuffix) {
                            exponentData = '(' + exponentData + symbol + ')';  // eslint-disable-line no-param-reassign
                        }
					} else {
                        if (valueRepresentation.abbreviationType === "ones") {
							suffix = variantformattedvalue[variantformattedvalue.length - one];
						} else {
							suffix = variantformattedvalue[variantformattedvalue.length - two];
						}
                        if (prefix === symbolPrefix) {
                            exponentData = symbol + exponentData;  // eslint-disable-line no-param-reassign
                        }
                        if (suffix === symbolSuffix) {
                            exponentData += symbol;  // eslint-disable-line no-param-reassign
                        }
					}
            } else if (valueRepresentation.format === "number") {
                variantformattedvalue = variantformattedvalue.replace(valueRepresentation.prefix, "");
                variantformattedvalue = variantformattedvalue.replace(valueRepresentation.suffix, "");
				prefix = variantformattedvalue.charAt(zero);
				suffix = variantformattedvalue[variantformattedvalue.length - one];
                exponentData = exponentData.toString();  // eslint-disable-line no-param-reassign
                if (exponentData.indexOf('-') !== lessThanZero) {
					exponentData = exponentData.replace("-", "");  // eslint-disable-line no-param-reassign
				}
                if (valueRepresentation.abbreviationType === "auto" && this.representSymbol !== "") {
                    variantformattedvalue = variantformattedvalue.replace(this.representSymbol, "");
                    prefix = variantformattedvalue.charAt(zero);
                    suffix = variantformattedvalue[variantformattedvalue.length - one];
                    exponentData = exponentData.toString();  // eslint-disable-line no-param-reassign
                    if (exponentData.indexOf('-') !== lessThanZero) {
						exponentData = exponentData.replace("-", "");  // eslint-disable-line no-param-reassign
					}
					if (prefix === '-') {
                            exponentData = valueRepresentation.prefix + "-" + exponentData + this.representSymbol + valueRepresentation.suffix;  // eslint-disable-line no-param-reassign
                    } else if (prefix === '(') {
                        exponentData = valueRepresentation.prefix + "(" + exponentData + ")" + this.representSymbol + valueRepresentation.suffix;  // eslint-disable-line no-param-reassign
                    } else if (suffix === '-') {
                        exponentData = valueRepresentation.prefix + exponentData + "-" + this.representSymbol + valueRepresentation.suffix;  // eslint-disable-line no-param-reassign
                    } else {
                        exponentData = valueRepresentation.prefix + exponentData + this.representSymbol + valueRepresentation.suffix; // eslint-disable-line no-param-reassign
                    }

                } else {
					prefix = variantformattedvalue.charAt(zero);
                    if (valueRepresentation.abbreviationType === "ones") {
						suffix = variantformattedvalue[variantformattedvalue.length - one];
					} else {
						suffix = variantformattedvalue[variantformattedvalue.length - two];
					}
                    exponentData = exponentData.toString();  // eslint-disable-line no-param-reassign
                    if (exponentData.indexOf('-') !== lessThanZero) {
						exponentData = exponentData.replace("-", "");  // eslint-disable-line no-param-reassign
					}
                    if (prefix === '-') {
						exponentData = valueRepresentation.prefix + "-" + exponentData + valueRepresentation.suffix;  // eslint-disable-line no-param-reassign
                    } else if (prefix === '(') {
                        exponentData = valueRepresentation.prefix + "(" + exponentData + ")" + valueRepresentation.suffix;  // eslint-disable-line no-param-reassign
                    } else if (suffix === '-') {
                        exponentData = valueRepresentation.prefix + exponentData + "-" + valueRepresentation.suffix;  // eslint-disable-line no-param-reassign
                    } else {
                        exponentData = valueRepresentation.prefix + exponentData + valueRepresentation.suffix;  // eslint-disable-line no-param-reassign
                    }
                }
            } else {
                var representation = variantformattedvalue[variantformattedvalue.length - one];
                exponentData = exponentData.indexOf(representation) === lessThanZero ? exponentData + representation : exponentData;  // eslint-disable-line no-param-reassign
            }
			 if(exponentData.indexOf("e") != -1 || exponentData.indexOf("E") != -1 ) {
			   
			   var precision = parseFloat(this.model.valueRepresentation.numberOfDecimals);
			   exponentData =  parseFloat(exponentData.toString()).toPrecision(precision + 1); 
			}

            return exponentData;
        },

        // Creates the actual value container
        _createActualValueContainer: function () {
            var actualData = null;
            var targetData = null;
			var customText =  null;
                        var actualValueDiv = this.element.find("#" + this._proxy + "_ActValue").
                addClass("e-hoverable").
				attr({ "data-tooltip": "Value: " });
				actualValueDiv.css({ 'width' :'auto' , 'max-width' :'100%' });
            if (this.model.customVisibility.actualValue) {
				if (this.model.valueRepresentation.variationType !== BoldBIDashboard.Card.VariationTypes.ActualValue) {
                if (!this._isNullOrEmptyOrUndefined(this.model.actualValue.color)) {
                    actualValueDiv.css({ "color": this.model.actualValue.color });
                }
				} else {
					if (!this.model.hasTarget) {
						actualValueDiv.css({ "color": this.model.actualValue.color });
					}
				}
				if ((!this._isNullOrEmptyOrUndefined(this.model.actualValue.position) || !this._isNullOrEmptyOrUndefined(this.model.targetValue.position)) && !this._isCompact) {
					    var valueElement = this.element.find(".e-value").parent();
						valueElement.parent().css({
					        "justify-content":
                                this.model.actualValue.position == "left" ? "flex-start" 
									: this.model.actualValue.position == "center" ? "center" 
									: this._isCompact ? "flex-start"
										: "flex-end"
					    });
						if (!BoldBIDashboard.isNullOrUndefined(this.model.actualValue.customText) && this.model.actualValue.customText !== "") {
							valueElement.parent().css({
								"justify-content":
									this.model.actualValue.position == "left" ? "flex-start"
										: this.model.actualValue.position == "center" ? "flex-start"
											: this._isCompact ? "flex-start" : "space-between"
							});
							if (this.model.actualValue.position == "center") {
							valueElement.css({
									"width": "60%",
									"justify-content": "center"
								});
							}
						}
						
					}
                if (!this._isNullOrEmptyOrUndefined(this.model.actualValue.value)) {
					if (this.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.ActualValue && this.model.hasTarget) {
						var targetValue = (parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value)).toString();
						var varianceValue = "";
						varianceValue = this._getFormattedValue(targetValue, true, false);
						actualData = varianceValue.variance;
					} else if (this.actualExponent) {
						actualData = this._createExponentValues(this.model.actualValue.value, false, false);
					} else {
						actualData = this._getFormattedValue(this.model.actualValue.value, false, false);
					}
                    actualValueDiv.html(actualData);
				} else if (!this._isNullOrEmptyOrUndefined(this.model.targetValue.value)) {
                    if (this.targetExponent) {
                        targetData = this._createExponentValues(this.model.targetValue.value, false, false);
                    } else {
                        targetData = this._getFormattedValue(this.model.targetValue.value, false, false);
                    }
                     actualValueDiv.html(targetData);
				}
                
                if (this._isNullOrEmptyOrUndefined(this.model.targetValue.value) || this._isNullOrEmptyOrUndefined(this.model.actualValue.value)) {
                    //actualValueDiv.css({ "height": "50%" });
				}
                if (this.model.background.type === BoldBIDashboard.Card.BackgroundType.Full) {
                    actualValueDiv.css({ "color": "white" });
				}
                if (!BoldBIDashboard.isNullOrUndefined(this.model.actualValue.customText) && this.model.actualValue.customText !== "" && this.model.valueRepresentation.variationType !== BoldBIDashboard.Card.VariationTypes.ActualValue) {
                    this.element.find(".e-customtext-value").html(this.model.actualValue.customText).css({'min-width' : '10%'});
                }
            } else {
                actualValueDiv.css({ "height": 0 });
			}
			actualValueDiv = { actualValueDiv: actualValueDiv, customText :customText };

            return actualValueDiv;
        },

        // Creates the variation container
        _createVariationContainer: function () {
			var varianceDiv = this.element.find(".e-variation");
            var kpiDiv = null;
			var defaultvalue =  null;
            var secondaryValue = null,
				lessThanZero = -1;
			if (!this._isNullOrEmptyOrUndefined(this.model.cardDefaultData)) {
				
			    defaultvalue = this._getFormattedValue(this.model.cardDefaultData.toString(), true, false).value;
			    this.model.cardDefaultData = parseFloat(defaultvalue.replace(',','').replace(' ','').replace(/[^\d.-]/g, ''));
			}
			if(!this._isNullOrEmptyOrUndefined(this.model.actualValue.value) && !this._isNullOrEmptyOrUndefined(this.model.targetValue.value)) {
             if (this.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.Absolute) {
                 var varianceValue = this._isNullOrEmptyOrUndefined(this.model.actualValue.value) ? Math.abs(parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value)) : parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value);
                 this.Value = this._getVarianceValue(varianceValue);
              } else if (this.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.ActualValue) {
                 this.Value = this._getFormattedValue(this.model.actualValue.value, true, false).value;
              } else {
				 var value = this._getFormattedValue(this._isNullOrEmptyOrUndefined(this.model.actualValue.value) ? (parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value)) : parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value), true, false);
                 this.Value = value.variance;
              }
			} else if (!this._isNullOrEmptyOrUndefined(this.model.actualValue.value) && this._isNullOrEmptyOrUndefined(this.model.targetValue.value)) {
				 this.Value = this._getFormattedValue(this.model.actualValue.value, true, false).value;
			} else if (this._isNullOrEmptyOrUndefined(this.model.actualValue.value) && !this._isNullOrEmptyOrUndefined(this.model.targetValue.value)) {
			     this.Value = this._getFormattedValue(this.model.targetValue.value, true, false).value;
			}				
            if (this.model.showIndicatorOnly && this.model.hasTarget) {
                kpiDiv = this.element.find(".e-variationkpi");
				kpiDiv.addClass("e-hoverable");
                if (!this.model.headers.visible) {
                    varianceDiv.css({ "height": "99%" });
				}
                if( !this._isNullOrEmptyOrUndefined(this.model.rangeSettings) && (this.model.rangeSettings.Type == 'Absolute' || this.model.rangeSettings.Type == 'Percent') && this.model.rangeSettings.Ranges.length > 0  && this.model.IsCustomRange && this.model.IsApplied){
                 
				  this._createRangeKpiIndicator(kpiDiv);
				 
				} else if(!this._isNullOrEmptyOrUndefined(this.model.icon) && !this._isNullOrEmptyOrUndefined(this.model.icon.path)) {
					
					this._customIndicatorForCard(kpiDiv);
				
				} else {
				 	
				    this._createKpiIndicator(kpiDiv);
				}
				if (this.model.customVisibility.primaryValue) {
				    this._createPrimaryValueForIndicator(kpiDiv);
				} else {
					
				    kpiDiv.parents('.e-variation').css({ "justify-content" : "center" });
				}         				
            } else if (!this._isNullOrEmptyOrUndefined(this.model.actualValue.value) && !this._isNullOrEmptyOrUndefined(this.model.targetValue.value)) {
                varianceDiv.addClass("e-hoverable");
                var varValueDiv = this.element.find(".e-primary-value");
                kpiDiv = this.element.find(".e-variationkpi");
                BoldBIDashboard.preferredCulture(this.model.valueRepresentation.currencyCulture);
                var variation = parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value);
                var targetValue = variation.toString();
                this.variantExponent = targetValue.indexOf("e") !== lessThanZero || targetValue.indexOf("E") !== lessThanZero;
                var variationColor = variation === 0 ? "#FBCB43"
                        : (variation > 0 ? (this.warning ? "#FBCB43" : !this.model.higherValueGood ? "#E57368" : "#34B67A")
				            : this.warning ? "#FBCB43" : !this.model.higherValueGood ? "#34B67A" : "#E57368")
                if (this.model.customVisibility.secondaryValue) {
                if (this.variantExponent) {
					secondaryValue = this._createExponentValues(targetValue, true, false);
                } else {
					secondaryValue = this._getFormattedValue(targetValue, true, false).value;
                }
				if (this.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.Absolute && this.model.secondaryValueType === BoldBIDashboard.Card.SecondaryValueType.Variance) {
					secondaryValue = this._getFormattedValue(targetValue, true, false).variance;
				} else if (this.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.ActualValue && this.model.secondaryValueType === BoldBIDashboard.Card.SecondaryValueType.Variance) {
					secondaryValue = this._getFormattedValue(targetValue, true, false).value;
				} else if (this.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.ActualValue && this.model.secondaryValueType === BoldBIDashboard.Card.SecondaryValueType.Target) {
					secondaryValue = this._getFormattedValue(this.model.targetValue.value, true, false);
				} else {
					secondaryValue = this._getVarianceValue(targetValue);
				}
                var varValue = this.element.find(".e-secondary-value").html(secondaryValue).
				attr({ "data-tooltip": "Variance: " });
                varValue.css({ 'width': 'auto', 'max-width': '100%' });
                varValue.parent().parent().css({
                    "justify-content":
							this.model.secondaryValuePosition == "left" ? "flex-start"
							: this.model.secondaryValuePosition == "center" ? "center"
								: "flex-end"
                });
				if (!BoldBIDashboard.isNullOrUndefined(this.model.targetValue.customText) && this.model.targetValue.customText !== "") {
							varValue.parent().parent().css({
								"justify-content":
									this.model.secondaryValuePosition == "left" ? "flex-start"
										: this.model.secondaryValuePosition == "center" ? "flex-start"
											: "space-between"
							});
							if (this.model.secondaryValuePosition == "center") {
							varValue.parent().css({
									"width": "60%",
									"justify-content": "center"
								});
							}
				}
                if (this.model.secondaryValueType === BoldBIDashboard.Card.SecondaryValueType.Target) {
                    if (this.targetExponent) {
						secondaryValue = this._createExponentValues(this.model.targetValue.value, false, false);
                    } else {
                        secondaryValue = this._getFormattedValue(this.model.targetValue.value, false, false);
                    }
                    varValue.html(secondaryValue);
                    varValue.css({ "color": "#686262" });
                    if (!this._isNullOrEmptyOrUndefined(this.model.targetValue.customText)) {
                        this.element.find(".e-customtext-target").html(this.model.targetValue.customText).css({'min-width': '10%'});
					}
                } 
                }
                if (this.model.customVisibility.primaryValue) {
                var varianceValue = "";
				varianceValue = this._getFormattedValue(targetValue, true, false);
                //varValueDiv.append(varValue);
                var indicatorParent = bbdesigner$("<div style='height:50%;'>");
				var value = "";
				if (this.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.Absolute) {
					value = this._getVarianceValue(targetValue);
				} else if (this.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.ActualValue) {
					value = this._getFormattedValue(this.model.actualValue.value, true, false).value;
				} else {
					value = varianceValue.variance;
				}
				//indicatorParent.append(kpiDiv, bbdesigner$("<div>").html(value).
				//addClass('e-variationvalueBottom'));
				varValueDiv.html(value);
				varValueDiv.parent().css({
				    "justify-content":
                    (this.model.primaryValuePosition == "center" ? "center" :
                        this.model.primaryValuePosition == "left" ? "flex-start" : (this._isCompact && this.model.customVisibility.compactView) ? "flex-start" : "flex-end")
				});
				bbdesigner$(varValueDiv.parents('.e-row')[0]).css({ "width": "100%"});
				if (this.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.ActualValue) {
					indicatorParent.css({ "color": this.model.actualValue.color });
				}
                }
                //varValueDiv.append(indicatorParent);
                if( !this._isNullOrEmptyOrUndefined(this.model.rangeSettings) && (this.model.rangeSettings.Type == 'Absolute' || this.model.rangeSettings.Type == 'Percent') && this.model.rangeSettings.Ranges.length > 0 && this.model.IsCustomRange && this.model.IsApplied) {
                 
				 this._createRangeKpiIndicator(kpiDiv);
				} else if(!this._isNullOrEmptyOrUndefined(this.model.icon) && !this._isNullOrEmptyOrUndefined(this.model.icon.path) ) {
					
					this._customIndicatorForCard(kpiDiv);
				
				} else {
				 	
				    this._createKpiIndicator(kpiDiv);
				}

                var variationColor = variation === 0 ? "#FBCB43"
                    : (variation > 0 ? (this.warning ? "#FBCB43" : !this.model.higherValueGood ? "#E57368" : "#34B67A")
                        : this.warning ? "#FBCB43" : !this.model.higherValueGood ? "#34B67A" : "#E57368");
                varianceDiv.css({ "color": this._varianceColor === "" ? variationColor : this._varianceColor });
                if (this.model.customVisibility.secondaryValue && this.model.secondaryValueType !== BoldBIDashboard.Card.SecondaryValueType.Target) {
                    varValue.css({ "color": this._varianceColor === "" ? variationColor : this._varianceColor });
                }
                if (this.element.width() > 250 && this.element.parents('td').height() > 100) {
                   // varValueDiv.css({ "font-size": kpiDiv.height() * 0.7 > 60 ? 60 : kpiDiv.height() * 0.7 + "px" });
                }
                //varianceDiv.append(varValueDiv);
			   var width = bbdesigner$(this.element).find('.e-variation.e-row.e-hoverable').width() - bbdesigner$(this.element).find('.e-variationkpi.e-row').width()
               var parentWidth = bbdesigner$(bbdesigner$(this.element).find('.e-primary-value').parents('.e-row')[0]).width();
			   if (parentWidth > width) {
				bbdesigner$(varValueDiv.parents('.e-row')[0]).css({ "width": "85%"});
			   }
			   varValueDiv.parents('.e-variation.e-row.e-compact').css({ "width": "100%"});
            }
			if(!BoldBIDashboard.isNullOrUndefined(kpiDiv)) {
			    
				kpiDiv.css({ "line-height": "normal" });
			}
            if (this.model.background.type === BoldBIDashboard.Card.BackgroundType.Full) {
                varianceDiv.css({ "color": "white" });
			}
	
            return varianceDiv;
        },

         // Creates the sparkLine container and implementation
        _createSparkLineContainer: function (mainDiv) {
		    var sparklineValues = {};
            var slDiv = this.element.find(".e-sparkline").css({ "height": "20%" });
			if (BoldBIDashboard.browserInfo() && BoldBIDashboard.browserInfo().name === "chrome") {
				slDiv.addClass("e-chrome");
			}			
            //var tooltipTemp = bbdesigner$("<div>").attr("id", this._proxy + "_sparkLineTooltipTemplate").css("display", "none"), tooltipPoint = bbdesigner$("<div>").attr("id", this._proxy + "_sparkLineTooltipTemplatePoint").css({ "font-family": "segoe ui", "font-size": "12px", "color": "black" });
            //bbdesigner$(mainDiv).append(slDiv);
            sparklineValues[this.model.sparkLine.SparklineName] = "#point.sparklineName#";
			sparklineValues[this.model.actualValue.name] = "#point.valueName#";
			var tooltipWrapper = bbdesigner$("<div>").attr({ "id": this._proxy + "_sparkLineTooltipTemplate" });
			var tooltip = bbdesigner$("<div>").addClass("e-card-tooltip").css({ 'width': 'auto', 'max-width': '400px' ,'word-wrap': 'break-word', 'display': 'none'});
			var tooltipTemp = this._renderingToopTipTemplate(sparklineValues);
			tooltip.html(tooltipTemp);
			tooltipWrapper.html(tooltip);
            bbdesigner$(mainDiv).append(tooltipWrapper);
			var that = this;
            bbdesigner$(slDiv).BoldBIDashboardSparkline({
                dataSource: this.model.sparkLine.Data,
                tooltip: {
                    visible: true,
                    template: this._proxy + "_sparkLineTooltipTemplate"
                },
                yName : "valueName",
                type: this.model.sparkLine.Type,
                markerSettings: {
                    visible: this.model.sparkLine.Type.toLowerCase() !== "column" ? this.model.sparkLine.ShowMarker : false,
					fill:'transparent',
					border: { color: 'transparent' },
					width: 2
                },
                highPointColor: this.model.sparkLine.HighValueColor,
                lowPointColor: this.model.sparkLine.LowValueColor,
                opacity: this.model.sparkLine.Opacity,
                height: "80%"
                //background: this.model.sparkLine.BackgroundColor
            });
        },
		_createPrimaryValueForIndicator: function (kpiDiv) {
	
		   var primaryValue = bbdesigner$("<div>").addClass("e-primary-value").css({
					color: this._varianceColor
		   });
			this._createColorForPrimaryValue();
			var valueObj = this._getPrimaryValue();
			primaryValue.text(valueObj.value).css({
				"color": this._varianceColor,
				"max-width" : this.element.find('.e-value-parent').width(),
			});
			this._createFontForIndicator(primaryValue,  valueObj.value);
			kpiDiv.attr({
				variation: valueObj.value,
				variance: valueObj.variance
			}).css({
				"text-align": "center",
				 "width": "auto"
			});
			kpiDiv.parents('.e-variation').css({ "justify-content" : "center" });
			kpiDiv.append(primaryValue)
		},
		_createColorForPrimaryValue: function () {
			 
			 var zero = 0;
			 var varColor = !this._isNullOrEmptyOrUndefined(this.model.primaryValue) && !this._isNullOrEmptyOrUndefined(this.model.primaryValue.color) ? this.model.primaryValue.color : "";
			 if (!this._isNullOrEmptyOrUndefined(this.model.actualValue.value) && !this._isNullOrEmptyOrUndefined(this.model.targetValue.value) && parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value) === zero) {
                      
                 this._varianceColor = varColor=="" ? "#FBCB43" : varColor;
                       
             } else if (parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value) > zero) {
                          
                 this._varianceColor = varColor!=="" ? varColor : this.warning ? "#FBCB43" : !this.model.higherValueGood ? "#E57368" : "#34B67A";
             } else {
                           
                 this._varianceColor = varColor!=="" ? varColor : this.warning ? "#FBCB43" : !this.model.higherValueGood ? "#34B67A" : "#E57368";
             }
		},
		_getPrimaryValue: function() {
			
		  var value = this._getFormattedValue((!this._isNullOrEmptyOrUndefined(this.model.actualValue.value) && !this._isNullOrEmptyOrUndefined(this.model.targetValue.value)) ?   parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value) : "", true, false),
			varianceValue,
			valueOb,
			valueObj = null;
		  if (this.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.Absolute) {
               varianceValue = !this._isNullOrEmptyOrUndefined(this.model.actualValue.value) && !this._isNullOrEmptyOrUndefined(this.model.targetValue.value) ?  parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value) : "";
                valueOb = this._getVarianceValue(varianceValue);
             } else if(this.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.ActualValue) {
                valueOb = this._getFormattedValue(this.model.actualValue.value, true, false).value;
             } else {
                valueOb = value.variance;
             }
           return valueObj = { value: valueOb, variance: value.variance };			 
		},
		_createFontForIndicator: function (primaryValue, Value) {
			
			var three = 3;
			var two = 2;
			var threePoint2 = 3.2;
			var SvgHeight = null;
            var SvgWidth = null;
			var height = this.element.find(".e-value-parent").height();
			var width = this.element.find(".e-value-parent").width();
		    var elementSize = width < height ? width : height;
            SvgHeight =  elementSize; 
            SvgWidth = elementSize;
            var side = elementSize;
            height = side * Math.sqrt(three) / two;
			var fontSize = this._getOptimumFontSize(height / threePoint2, side, BoldBIDashboard.Card.AdjustFont.Width, Value);
			var MinimumFontSize = 12;
			primaryValue.css({
				"font-size": parseInt(fontSize) < MinimumFontSize ?  MinimumFontSize + "px" : fontSize
			});
		},

		// Apply the variance value
        _getVarianceValue: function (value) {
		var number = value;
					var stringFormat = "",
					dcimalFraction = 2;
            switch (this.model.valueRepresentation.format) {
                case BoldBIDashboard.Card.Format.Percentage:
                    stringFormat = "P" + dcimalFraction;
                    break;
                case BoldBIDashboard.Card.Format.Number:
                    stringFormat = "N" + dcimalFraction;
                    break;
                case BoldBIDashboard.Card.Format.Currency:
                    stringFormat = "C" + dcimalFraction;
                    break;
				default:
					break;
            }
            var tempval = this._applyStringFormatting(stringFormat, this.model.valueRepresentation.currencyCulture, this.model.valueRepresentation.abbreviationType, number, false);
			if (this.model.valueRepresentation.decimalSeparator != null && this.model.valueRepresentation.groupSeparator != null && !BoldBIDashboard.isNullOrUndefined(tempval)) {
			var formatstring = tempval.split(this.model.valueRepresentation.decimalSeparator.CurrentValue);
			var replace = formatstring[0].replace(this.model.valueRepresentation.groupSeparator.CurrentValue, this.model.valueRepresentation.groupSeparator.AliasValue);
			tempval = formatstring.length>1 ? replace + this.model.valueRepresentation.decimalSeparator.AliasValue + formatstring[1] : replace;
			}
			return tempval;
		},
		// Creates the KPI indicator
        _createKpiIndicator: function (kpiDiv, isResize) {
             if (!this._isNullOrEmptyOrUndefined(this.model.IsCustomRange) && !this.model.IsCustomRange) {
				   this.model.primaryValue.color = "";
				   singleCard =  bbdesigner$(this.element).parents("#topParent").hasClass('e-Card-Single') ? bbdesigner$(this.element).parents("#topParent") : [];	
				   if (BoldBIDashboard.isNullOrUndefined(singleCard[0])) {
                    singleCard = bbdesigner$(this.element);
                 }
				 singleCard.css({'background-color': ''});
				}
                var canvas = null,
                    five = 5,
					singleCard = null,
                    zeroPoint35 = 0.35,
                    zeroPoint355 = 0.355,
                    zeroPoint42 = 0.42,
                    zeropoint2 = 0.2,
                    zeroPoint5 = 0.5,
                    zeroPoint7 = 0.7,
                    zeroPoint9 = 0.9,
                    zero = 0,
                    three = 3,
                    two = 2,
                    twoPoint2 = 2.2,
                    threePoint2 = 3.2,
                    onePointEight = 1.8,
                    eight = 8,
                    six = 6,
                    ten = 10,
                    twoPoint5 = 2.5,
                    fivepoint5 = 5.5,
                    twoPoint3 = 2.3,
                    onepoint5 = 1.5,
                    hundredAndEighty = 180;
			   
                if (isResize) {
                    if (this.browserType === BoldBIDashboard.Card.BrowserType.IE) {
                        canvas = document.createElement("canvas");
                        canvas.setAttribute("id", this._proxy + "_Kpi_Canvas");
                    } else {
                        canvas = document.getElementById(this._proxy + "_Kpi_Canvas");
                    }
                } else {
                    canvas = document.createElement("canvas");
                    canvas.setAttribute("id", this._proxy + "_Kpi_Canvas");
                }
				var SVG = document.createElement("div");
                var SvgHeight = this.element.find(".e-variationkpi").height(); 
                var SvgWidth = this.element.find(".e-variationkpi").height(); 
                if (!this.model.customVisibility.primaryValue && !this._isCompact) {
                    this.element.find(".e-variation").css({"justify-content": "flex-end"})
                }
                if (this.element.width() < 250 && this.element.parents('td').height() < 100) {
                    //SvgHeight = this._height * (this.model.headers.visible ? 0.25 : zeroPoint42);
                }
                var MinimumHeight = 16;
                var MinimumWidth = 16;
                SvgHeight = SvgHeight > MinimumHeight ? SvgHeight : MinimumHeight;
                SvgWidth = SvgWidth > MinimumWidth ? SvgWidth : MinimumWidth;
                BoldBIDashboard.preferredCulture(this.model.valueRepresentation.currencyCulture);
                var value = this._getFormattedValue(this._isNullOrEmptyOrUndefined(this.model.actualValue.value) ? Math.abs(parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value)) : parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value), true, false);
                var side = null;
                var height = null;
				var varColor = !this._isNullOrEmptyOrUndefined(this.model.primaryValue) && !this._isNullOrEmptyOrUndefined(this.model.primaryValue.color) ? this.model.primaryValue.color : "";
                if (this.model.showIndicatorOnly) {
					
					var height = this.element.find(".e-value-parent").height() / onepoint5;
					var width = this.element.find(".e-value-parent").width();
					var elementSize = width < height ? width : height;
                    side = elementSize;
                    SVG.setAttribute("id", this._proxy + "_Kpi_SVG");
					SVG.style.width = Math.floor(elementSize) + "px";
                    SVG.style.height = Math.floor(elementSize) + "px";
					SVG.style.fontSize = Math.floor(elementSize) + "px";
					SVG.style.margin = "auto";
					SVG.style.lineHeight = "normal";
                    var invert = false;
                    var isNeutral = false;
                    BoldBIDashboard.preferredCulture(this.model.valueRepresentation.currencyCulture);
                    if (parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value) === zero || this._isNullOrEmptyOrUndefined(this.model.actualValue.value) || this._isNullOrEmptyOrUndefined(this.model.targetValue.value)) {
                        this._varianceColor = varColor=="" ? "#FBCB43" : varColor;
							SVG.classList.add("e-card-icon-circle");
						SVG.style.color = this._varianceColor;
                    } else {
                        if (parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value) > zero) {
                            this._varianceColor = varColor!=="" ? varColor : this.warning ? "#FBCB43" : !this.model.higherValueGood ? "#E57368" : "#34B67A";
							SVG.classList.add("e-card-icon-tri-up");
							SVG.style.color = this._varianceColor;
                        } else {
                            this._varianceColor = varColor!=="" ? varColor : this.warning ? "#FBCB43" : !this.model.higherValueGood ? "#34B67A" : "#E57368";
							SVG.classList.add("e-card-icon-tri-down");
							SVG.style.color = this._varianceColor;
                        }
                    }
                } else {
                    SVG.style.height = Math.floor(SvgHeight) + "px";
                    SVG.style.width = Math.floor(SvgHeight) + "px";
					SVG.style.fontSize = Math.floor(SvgHeight) + "px";
					SVG.style.lineHeight = "normal";
                    BoldBIDashboard.preferredCulture(this.model.valueRepresentation.currencyCulture);
                    if (parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value) === zero) {
					    this._varianceColor = varColor=="" ? "#FBCB43" : varColor;
                        SVG.classList.add("e-card-icon-circle");
						SVG.style.color = this._varianceColor;
                    } else {
                        if (parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value) > zero) {
                            this._varianceColor = varColor!=="" ? varColor : this.warning ? "#FBCB43" : !this.model.higherValueGood ? "#E57368" : "#34B67A";
							SVG.classList.add("e-card-icon-tri-up");
							SVG.style.color = this._varianceColor;
                        } else {
                            this._varianceColor = varColor!=="" ? varColor : this.warning ? "#FBCB43" : !this.model.higherValueGood ? "#34B67A" : "#E57368";
							SVG.classList.add("e-card-icon-tri-down");
							SVG.style.color = this._varianceColor;
                        }
                    }
				}
				    var ValueObj = this._getPrimaryValue();
                    kpiDiv.attr({ "variation": ValueObj.value, "variance": ValueObj.variance });
					kpiDiv.parents(".e-variation").css({"align-items": "center"});
					kpiDiv.append(SVG);
        },
		_createRangeForActualValue: function() {
			
		        var ranges = this.model.rangeSettings.Ranges;
		        var ImageDiv = bbdesigner$('<img>');
		        var Div = null;
				var singleCard =  bbdesigner$(this.element).parents("#topParent").hasClass('e-Card-Single') ? bbdesigner$(this.element).parents("#topParent") : [];
			    var zeroPoint7 = 0.7;
			    var zeroPoint9 = 0.9;
				this.count = 0;
				var value = null;
            if (BoldBIDashboard.isNullOrUndefined(singleCard[0])) {

                singleCard = bbdesigner$(this.element);
            }
			if (this.model.valueRepresentation.negativeValueFormat === "nonegativesignwithbracket") {
					
				 value = parseFloat(bbdesigner$(this.element).find('.e-value.e-hoverable').text().replace("(","-").replace(")","").replace(',','').replace(' ','').replace(/[^\d.-]/g, ''));
			} else if (this.model.valueRepresentation.negativeValueFormat === "negativesigninsuffix") {
					
				 value = (bbdesigner$(this.element).find('.e-value.e-hoverable').text().replace("-","").replace(")","").replace(',','').replace(' ','').replace(/[^\d.-]/g, ''));
				 value =  parseFloat("-" + value);
			} else {
				 value  = parseFloat(bbdesigner$(this.element).find('.e-value.e-hoverable').text().replace(',','').replace(' ','').replace(/[^\d.-]/g, ''));
			}

		        for (var i = 0; i < ranges.length; i++) {
		         
		            if(ranges[i].RangeValueType === 1){

		                Div = this._createActualConditonIndicator(ranges[i],singleCard,value);
		                if (this.count !== 0) {

		                   break;
                        } else if (ranges.length - 1 == i) {
		                  this._varianceColor = ""; 		  
			            }						
                                       
                    } else if(ranges[i].RangeValueType === 0) {

		                Div = this._createActualRangeIndicator(ranges[i],singleCard,value);

                        if (this.count !== 0) {

		                    break;
                        } else if (ranges.length - 1 == i) {
		                  this._varianceColor = "";		  
			            }	
                    }
                }
		},
		_createActualRangeIndicator : function(ranges,singleCard,value) {
			
			if (this.model.rangeSettings.Type == "Percent") {
				if(bbdesigner$(this.element).find('.e-value.e-hoverable').text().indexOf('%') == -1) {
		         if (((parseFloat(ranges.RangeFrom) / 100) * this.model.cardDefaultData) <= (value) && ((parseFloat(ranges.RangeTo) / 100) * this.model.cardDefaultData) >= (value)) {
		                    
		                     this._loadActualIndicatorForCard(ranges,singleCard);
							 
						} 
			           } else
					   {
						  
                       if (parseFloat(ranges.RangeFrom) <= value && parseFloat(ranges.RangeTo) >= value) {
		                    
		                     this._loadActualIndicatorForCard(ranges,singleCard);						  
				}
			}
				}			else if (this.model.rangeSettings.Type == "Absolute") {
		                if (parseFloat(ranges.RangeFrom) <= (value) && parseFloat(ranges.RangeTo) >= (value)) {   
				          this._loadActualIndicatorForCard(ranges,singleCard);
						 
						}
			    }						 
		},
		_loadActualIndicatorForCard : function(ranges,singleCard) {
			
			this._varianceColor = "#" + ranges.RangeColor.substr(3, 6);
		    singleCard.css({'background-color':"#" + ranges.RangeBackGroundColor.substr(3, 6) });
		    this.count++;
		    
		 },
		  _createActualConditonIndicator: function (ranges,singleCard,value) {
			  
            var Div = null;
			var conditionalValue = null;
			 if (this.model.rangeSettings.Type == "Percent") {
				
				if(bbdesigner$(this.element).find('.e-value.e-hoverable').text().indexOf('%') == -1) {
			    
				conditionalValue = (ranges.RangeConditionValue) / 100 * this.model.cardDefaultData;
			 } else {
				 
			    conditionalValue = (ranges.RangeConditionValue);
			 }
			 } else {
				conditionalValue = (ranges.RangeConditionValue);
			 }
			  switch (ranges.RangeCondition)
			 {
              case 0:
                     			  
				if(value === (conditionalValue)) {
			         
				    Div = this._loadActualIndicatorForCard(ranges,singleCard);
					this.count++;
                    
				}
                break;
			 case 1:
                 if(value !== (conditionalValue)) {
			         
                     Div = this._loadActualIndicatorForCard(ranges,singleCard);
                     this.count++;
                 }
                 break;
              case 2:
                 if(value > (conditionalValue)) {
			         
                     Div = this._loadActualIndicatorForCard(ranges,singleCard);
                    this.count++;
                 }
                 break;
              case 3:
                 if(value < (conditionalValue)) {
			         
                     Div = this._loadActualIndicatorForCard(ranges,singleCard);
                     this.count++;
                 }
                 break;
              case 4:
                 if(value >= (conditionalValue)) {
			         
                     Div = this._loadActualIndicatorForCard(ranges,singleCard);
                     this.count++;
                 }
                 break;
		       case 5:
                 if(value <= (conditionalValue)) {
			         
                     Div = this._loadActualIndicatorForCard(ranges,singleCard);
                     this.count++;
                 }
			  default:

              if (length - 1 == i) {
		          var Div = this._loadActualIndicatorForCard(ranges,singleCard);
                  this.count++;  
			  }
			  break;
			 }

        return Div;
        },
			_createRangeKpiIndicator : function(kpiDiv) {
		        var ranges = this.model.rangeSettings.Ranges;
		        var Div = null;
				var zeroPoint7 = 0.7;
				var zeroPoint9 = 0.9;
                this.count = 0;
				if (this.model.valueRepresentation.negativeValueFormat === "nonegativesignwithbracket") {
					
				  this.primaryValueType = parseFloat(this.Value.replace("(","-").replace(")","").replace(',','').replace(' ','').replace(/[^\d.-]/g, ''));
				} else if (this.model.valueRepresentation.negativeValueFormat === "negativesigninsuffix") {
					
				    this.Value = (this.Value.replace("-","").replace(")","").replace(',','').replace(' ','').replace(/[^\d.-]/g, ''));
					this.primaryValueType =  parseFloat("-" + this.Value);
				} else {
				
				this.primaryValueType = parseFloat(bbdesigner$(this.element).find('.e-primary-value').text().replace(',','').replace(' ','').replace(/[^\d.-]/g, ''));
				
				}
				if(isNaN(this.primaryValueType)){
					
					this.primaryValueType = parseFloat(this.Value.replace(',','').replace(' ','').replace(/[^\d.-]/g, ''));
				}
		        for (var i = 0; i < ranges.length; i++) {
		         
		            if(ranges[i].RangeValueType === 1){

		                Div = this._createConditonIndicator(ranges[i], kpiDiv,i,ranges.length);
		                if (this.count !== 0) {

		                   break;
                        } else if (ranges.length - 1 == i) {
		                  var Div = this._createKpiIndicator(kpiDiv); 		  
			            }						
                                       
                    } else if(ranges[i].RangeValueType === 0) {

		                Div = this._createRangeIndicator(ranges[i], kpiDiv,i,ranges.length);

                        if (this.count !== 0) {

		                    break;
                        } else if (ranges.length - 1 == i) {
		                  var Div = this._createKpiIndicator(kpiDiv); 		  
			            }	
                    }
                }
		        return Div;	
		},
		
		// if this method is invoked in web designer, we need to replace 'this.element.parents('td').height()' with some valid code. 
        _createRangeIndicator : function(ranges, kpiDiv,i,length) {
            
            var singleCard =  bbdesigner$(this.element).parents("#topParent").hasClass('e-Card-Single') ? bbdesigner$(this.element).parents("#topParent") : [];
			var zeroPoint7 = 0.7;
			var zeroPoint9 = 0.9;
			var onePointFive = 1.5,
			minimumSize = 16;
			var value = null;
			var height = this.element.find(".e-value-parent").height() / onePointFive;
			var width = this.element.find(".e-value-parent").width();
			var elementSize = width < height ? width : height;
            if (BoldBIDashboard.isNullOrUndefined(singleCard[0])) {

                singleCard = bbdesigner$(this.element);
            }
			if(bbdesigner$(this.element).find('.e-primary-value').text() == "") {
				value = this.Value;
			} else {
				value = bbdesigner$(this.element).find('.e-primary-value').text();
			}
			 var ImageDiv = bbdesigner$('<img>');
            if (this.model.rangeSettings.Type == "Percent") {
		                if(value.indexOf("%") != -1) {
						if (parseFloat(ranges.RangeFrom) <= this.primaryValueType && parseFloat(ranges.RangeTo)  >= this.primaryValueType && ranges.RangeIcon != null && ranges.IsChecked) {
		                    this._varianceColor = "#" + ranges.RangeColor.substr(3, 6);
		                    kpiDiv.css({'height': ''});
							ImageDiv.attr("src", ranges.RangeIcon);
							ImageDiv.css({ "width": (this.model.showIndicatorOnly) ? Math.floor(elementSize) : (this.element.width() < 200 && this.element.parents('td').height() < 90) ? "10px" : this._width * 0.13 < minimumSize ? minimumSize : this._width * 0.13 + "px", "height": (this.model.showIndicatorOnly) ? Math.floor(elementSize) * (this.model.headers.visible ? zeroPoint7 : zeroPoint9) : (this.element.width() < 200 && this.element.parents('td').height() < 90) ? "10px" : this._height * (this.model.headers.visible ? 0.26 : 0.32) < minimumSize ? minimumSize : this._height * (this.model.headers.visible ? 0.25 : 0.32) + "px" });
							singleCard.css({'background-color':"#" + ranges.RangeBackGroundColor.substr(3, 6) });
                            kpiDiv.append(ImageDiv);
                            this.count++;
							return kpiDiv;
                           
                        } else if (parseFloat(ranges.RangeFrom) <= this.primaryValueType && parseFloat(ranges.RangeTo)  >= this.primaryValueType) {
		                    this.model.primaryValue.color = "#" + ranges.RangeColor.substr(3, 6);
		                    var Div = this._createKpiIndicator(kpiDiv);
		                    this._varianceColor = "#" + ranges.RangeColor.substr(3, 6);
                            singleCard.css({'background-color':"#" + ranges.RangeBackGroundColor.substr(3, 6) });
                            this.count++;
		                    return Div;
                           
		                } else if (length - 1 == i) {
		                    var Div = this._createKpiIndicator(kpiDiv);
                            this.count++;
		                    return Div;
                            
		                }
						} else {
						  	
						 if ((parseFloat(ranges.RangeFrom) / 100 * this.model.cardDefaultData) <= this.primaryValueType && (parseFloat(ranges.RangeTo) / 100 * this.model.cardDefaultData)    >= this.primaryValueType && ranges.RangeIcon != null && ranges.IsChecked) {
		                    this._varianceColor = "#" + ranges.RangeColor.substr(3, 6);
		                    kpiDiv.css({'height': ''});
							ImageDiv.attr("src", ranges.RangeIcon);
							ImageDiv.css({ "width": (this.model.showIndicatorOnly) ? Math.floor(elementSize) : (this.element.width() < 200 && this.element.parents('td').height() < 90) ? "10px" : this._width * 0.13 < minimumSize ? minimumSize : this._width * 0.13 + "px", "height": (this.model.showIndicatorOnly) ? Math.floor(elementSize) * (this.model.headers.visible ? zeroPoint7 : zeroPoint9) : (this.element.width() < 200 && this.element.parents('td').height() < 90) ? "10px" : this._height * (this.model.headers.visible ? 0.25 : 0.32) < minimumSize ? minimumSize : this._height * (this.model.headers.visible ? 0.25 : 0.32) + "px" });
							singleCard.css({'background-color':"#" + ranges.RangeBackGroundColor.substr(3, 6) });
                            kpiDiv.append(ImageDiv);
                            this.count++;
							return kpiDiv;
                           
                        } else if (parseFloat(ranges.RangeFrom) / 100 * this.model.cardDefaultData <= this.primaryValueType && (parseFloat(ranges.RangeTo) * this.model.cardDefaultData) / 100   >= this.primaryValueType) {
		                    this.model.primaryValue.color = "#" + ranges.RangeColor.substr(3, 6);
		                    var Div = this._createKpiIndicator(kpiDiv);
		                    this._varianceColor = "#" + ranges.RangeColor.substr(3, 6);
                            singleCard.css({'background-color':"#" + ranges.RangeBackGroundColor.substr(3, 6) });
                            this.count++;
		                    return Div;
                           
		                } else if (length - 1 == i) {
		                    var Div = this._createKpiIndicator(kpiDiv);
                            this.count++;
		                    return Div;
                            
		                 }
						}
		            } else if (this.model.rangeSettings.Type == "Absolute") {
		                if (parseFloat(ranges.RangeFrom) <= this.primaryValueType && parseFloat(ranges.RangeTo)  >= this.primaryValueType && ranges.RangeIcon != null && ranges.IsChecked) {
		                    this._varianceColor = "#" + ranges.RangeColor.substr(3, 6);
		                    kpiDiv.css({'height': ''});
							ImageDiv.attr("src", ranges.RangeIcon);
		                    ImageDiv.css({ "width": (this.model.showIndicatorOnly) ? Math.floor(elementSize) : (this.element.width() < 200 && this.element.parents('td').height() < 90) ? "10px" : this._width * 0.13 < minimumSize ? minimumSize : this._width * 0.13 + "px", "height": (this.model.showIndicatorOnly) ? Math.floor(elementSize) * (this.model.headers.visible ? zeroPoint7 : zeroPoint9) : (this.element.width() < 200 && this.element.parents('td').height() < 90) ? "10px" : this._height * (this.model.headers.visible ? 0.25 : 0.32) < minimumSize ? minimumSize : this._height * (this.model.headers.visible ? 0.25 : 0.32) + "px" });
		                    singleCard.css({'background-color':"#" + ranges.RangeBackGroundColor.substr(3, 6) });
                            kpiDiv.append(ImageDiv);
                            this.count++;
		                    return kpiDiv;
                            
                        } else if (parseFloat(ranges.RangeFrom) <= this.primaryValueType && parseFloat(ranges.RangeTo)  >= this.primaryValueType) {
		                    this.model.primaryValue.color = "#" + ranges.RangeColor.substr(3, 6);
		                    var Div = this._createKpiIndicator(kpiDiv);
		                    this._varianceColor = "#" + ranges.RangeColor.substr(3, 6);
                            singleCard.css({'background-color':"#" + ranges.RangeBackGroundColor.substr(3, 6) });
                            this.count++;
		                    return Div;
                           
		                } else if (length - 1 == i) {
		                    var Div = this._createKpiIndicator(kpiDiv);
                            this.count++;
		                    return Div;
                            
		                }
		            }
        },
        _createConditonIndicator: function (ranges,kpiDiv,i,length) {
			  
            var Div = null;
			var value = null;
			var conditionalValue = null;
			if(bbdesigner$(this.element).find('.e-primary-value').text() == "") {
				value = this.Value;
			} else {
				value = bbdesigner$(this.element).find('.e-primary-value').text();
			}
			 if (this.model.rangeSettings.Type == "Percent") {
				  if(value.indexOf("%") == -1) {
					  
				    conditionalValue = (ranges.RangeConditionValue) / 100 * this.model.cardDefaultData;
				  } else {
				 
			       conditionalValue = (ranges.RangeConditionValue);
			 }
			 } else {
				 
			        conditionalValue = (ranges.RangeConditionValue);
			 }
			 
			  switch (ranges.RangeCondition)
			 {
              case 0:
                     			  
				if(this.primaryValueType === (conditionalValue)) {
			         
				    Div = this._loadIndicatorForCard(ranges, kpiDiv);
                    this.count++;

				}
                break;
			 case 1:
                 if(this.primaryValueType !== (conditionalValue)) {
			         
                     Div = this._loadIndicatorForCard(ranges, kpiDiv);
                     this.count++;
                 }
                 break;
              case 2:
                 if(this.primaryValueType > (conditionalValue)) {
			         
                      Div = this._loadIndicatorForCard(ranges, kpiDiv);
                     this.count++;
                 }
                 break;
              case 3:
                 if(this.primaryValueType < (conditionalValue)) {
			         
                     Div = this._loadIndicatorForCard(ranges, kpiDiv);
                     this.count++;
                 }
                 break;
              case 4:
                 if(this.primaryValueType >= (conditionalValue)) {
			         
                     Div = this._loadIndicatorForCard(ranges, kpiDiv);
                     this.count++;
                 }
                 break;
		       case 5:
                 if(this.primaryValueType <= (conditionalValue)) {
			         
                     Div = this._loadIndicatorForCard(ranges, kpiDiv);
                     this.count++;
                 }
			  default:

              if (length - 1 == i) {
		          var Div = this._createKpiIndicator(kpiDiv);
                  this.count++;			  
			  }
			  break;
			 }

        return Div;
        },
        _customIndicatorForCard: function (kpiDiv) {
             this._varianceColor = this.model.primaryValue.color;
			 var onePointFive = 1.5,
			 zeroPoint7 = 0.7,
			 zeroPoint9 = 0.9,
			 minimumSize = 16;
			var height = this.element.find(".e-value-parent").height() / onePointFive;
			var width = this.element.find(".e-value-parent").width();
			var elementSize = width < height ? width : height;
            var iconSize =  kpiDiv.height();
             if (this.model.icon.type === "Default") {
                 var iconColor = this.model.icon.color;
                 var div = bbdesigner$('<div></div>');
                 div.css({ "font-size": this.model.showIndicatorOnly ? Math.floor(elementSize) : iconSize < minimumSize ? minimumSize : iconSize + "px", "width" : this.model.showIndicatorOnly ? Math.floor(elementSize) + "px" : " " , margin: "auto", "height" : this.model.showIndicatorOnly ? Math.floor(elementSize) + "px" : iconSize < minimumSize ? minimumSize : iconSize + "px" });
                 switch (this.model.icon.path.toLowerCase()) {
                     case "up":
                         div.addClass("e-card-icon-arrow-up").css({ "color": iconColor });
                         break;
                     case "down":
                         div.addClass("e-card-icon-arrow-down").css({ "color": iconColor });
                         break;
                     case "right":
                         div.addClass("e-card-icon-arrow-right").css({ "color": iconColor });
                         break;
                     case "tick":
                         div.addClass("e-card-icon-tick").css({ "color": iconColor });
                         break;
                     case "close":
                         div.addClass("e-card-icon-close").css({ "color": iconColor });
                         break;
                     case "pointerup":
                         div.addClass("e-card-icon-tri-up").css({ "color": iconColor });
                         break;
                     case "warning":
                         div.addClass("e-card-icon-warning").css({ "color": iconColor });
                         break;
                     case "star":
                         div.addClass("e-card-icon-star").css({ "color": iconColor });
                         break;
                     case "polygon":
                         div.addClass("e-card-icon-polygon").css({ "color": iconColor });
                         break;
                     case "round":
                         div.addClass("e-card-icon-circle").css({ "color": iconColor });
                         break;
                     case "minus":
                         div.addClass("e-card-icon-minus").css({ "color": iconColor });
                         break;
                     default: // pointerdown
                         div.addClass("e-card-icon-tri-down").css({ "color": iconColor });
                         break;

                 }
                 kpiDiv.append(div);
             } else {
                 var ImageDiv = bbdesigner$('<img>');
                 kpiDiv.css({ 'height': '' });
                 ImageDiv.attr("src", this.model.icon.path);
                 ImageDiv.css({ "width": (this.model.showIndicatorOnly) ? Math.floor(elementSize) : iconSize < minimumSize ? minimumSize : iconSize + "px", "height": (this.model.showIndicatorOnly) ? Math.floor(elementSize) : iconSize < minimumSize ? minimumSize : iconSize + "px" });
                 kpiDiv.append(ImageDiv);
            }
            //Commented For Improvement Purpose
            //if (this.model.showIndicatorOnly) {
            //    var side = null;
            //    var height = null;
            //    var canvas = null,
            //        five = 5,
            //        singleCard = null,
            //        zeroPoint35 = 0.35,
            //        zeroPoint355 = 0.355,
            //        zeroPoint42 = 0.42,
            //        zeropoint2 = 0.2,
            //        zeroPoint5 = 0.5,
            //        zeroPoint7 = 0.7,
            //        zeroPoint9 = 0.9,
            //        zero = 0,
            //        three = 3,
            //        two = 2,
            //        twoPoint2 = 2.2,
            //        threePoint2 = 3.2,
            //        onePointEight = 1.8,
            //        eight = 8,
            //        six = 6,
            //        ten = 10,
            //        twoPoint5 = 2.5,
            //        fivepoint5 = 5.5,
            //        twoPoint3 = 2.3,
            //        onepoint5 = 1.5,
            //        hundredAndEighty = 180;
            //    var twoPoint5 = 2.5,
            //        invert = false,
            //        isNeutral = false;

            //    canvas = document.createElement("canvas");
            //    canvas.setAttribute("id", this._proxy + "_Kpi_Canvas");
            //    var SvgHeight = this.element.find(".e-variationkpi").height(); //this._height * (this.model.headers.visible ? zeroPoint355 : zeroPoint42);
            //    var SvgWidth = this.element.find(".e-variationkpi").height();
            //    canvas.setAttribute("width", SvgWidth);
            //    var ctx = canvas.getContext("2d");
            //    var height = this.element.find(".e-value-parent").height();
            //    var width = this.element.find(".e-value-parent").width();
            //    var elementSize = width < height ? width : height;
            //    SvgHeight = elementSize; // this.model.hasSparkLine ? (elementSize * (this.model.headers.visible ? zeroPoint7 : zeroPoint9)) - 40 : elementSize * (this.model.headers.visible ? zeroPoint7 : zeroPoint9);
            //    SvgWidth = elementSize;
            //    side = SvgHeight < SvgWidth ? SvgHeight : SvgWidth;
            //    height = side * Math.sqrt(three) / two;
            //    canvas.setAttribute("width", SvgWidth);
            //    canvas.setAttribute("height", SvgHeight);
            //    var Value = "";
            //    var value = this._getFormattedValue(this._isNullOrEmptyOrUndefined(this.model.actualValue.value) ? Math.abs(parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value)) : parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value), true, false);


            //    if (this.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.Absolute) {
            //        var varianceValue = this._isNullOrEmptyOrUndefined(this.model.actualValue.value) ? Math.abs(parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value)) : parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value);
            //        Value = this._getVarianceValue(varianceValue);
            //    } else if (this.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.ActualValue) {
            //        Value = this._getFormattedValue(this.model.actualValue.value, true, false).value;
            //    } else {
            //        Value = value.variance;
            //    }
            //    var fontSize = this._getOptimumFontSize(height / threePoint2, side, BoldBIDashboard.Card.AdjustFont.Width, Value);
            //    ctx.font = "bold " + fontSize + "px sans-serif";
            //    ctx.fillStyle = "rgba(0, 0,0, 1)";
            //    ctx.fillRect(-side / two, invert ? -height / eight : isNeutral ? -height / six : -height / ten, side, height / twoPoint5);
            //    ctx.fillStyle = "white";
            //    ctx.textAlign = "center";
            //    ctx.textBaseline = 'middle';

            //    kpiDiv.attr({ "variation": value.value, "variance": Value });
            //    if (invert) {
            //        ctx.rotate(hundredAndEighty * Math.PI / hundredAndEighty);
            //        ctx.fillText(Value, zero, -fontSize / five);
            //    } else {
            //        ctx.fillText(Value, zero, isNeutral ? fontSize / fivepoint5 : fontSize / twoPoint3);
            //    }
            //    kpiDiv.append(canvas);
            //}
        },
		
		// if this method is invoked in web designer, we need to replace 'this.element.parents('td').height()' with some valid code. 
       _loadIndicatorForCard : function(ranges,kpiDiv) {
             var singleCard =  bbdesigner$(this.element).parents("#topParent").hasClass('e-Card-Single') ? bbdesigner$(this.element).parents("#topParent") : [];
            if (BoldBIDashboard.isNullOrUndefined(singleCard[0])) {

                singleCard = bbdesigner$(this.element);
            }
			var onePointFive = 1.5;
			var zeroPoint7 = 0.7;
			var zeroPoint9 = 0.9;
			var ImageDiv = bbdesigner$('<img>');
			var minimumSize = 16;
			var height = this.element.find(".e-value-parent").height() / onePointFive;
			var width = this.element.find(".e-value-parent").width();
			var elementSize = width < height ? width : height;
			  if (ranges.IsChecked && !BoldBIDashboard.isNullOrUndefined(ranges.RangeIcon))
				{
					 this._varianceColor = "#" + ranges.RangeColor.substr(3, 6);
		             kpiDiv.css({'height': ''});
		             ImageDiv.attr("src", ranges.RangeIcon);
                     singleCard.css({'background-color':"#" + ranges.RangeBackGroundColor.substr(3, 6) });
				     ImageDiv.css({ "width": (this.model.showIndicatorOnly) ? Math.floor(elementSize) : (this.element.width() < 200 && this.element.parents('td').height() < 90) ? "10px" : this._width * 0.13 < minimumSize ? minimumSize : this._width * 0.13 + "px" , "height": (this.model.showIndicatorOnly) ? Math.floor(elementSize) * (this.model.headers.visible ? zeroPoint7 : zeroPoint9) : (this.element.width() < 200 && this.element.parents('td').height() < 90) ? "10px" : this._height * (this.model.headers.visible ? 0.25 : 0.32) < minimumSize ? minimumSize : this._height * (this.model.headers.visible ? 0.25 : 0.32) + "px" });
		             kpiDiv.append(ImageDiv); 
                     return kpiDiv; 					 
				} else {
				 	 
					 this.model.primaryValue.color = "#" + ranges.RangeColor.substr(3, 6);
					 var Div = this._createKpiIndicator(kpiDiv);
                     singleCard.css({'background-color':"#" + ranges.RangeBackGroundColor.substr(3, 6) });
		             this._varianceColor = "#" + ranges.RangeColor.substr(3, 6);
		             return Div;
                 }
        },
		
        // Will create backgroud image for card
        _setBackgroundImageIfAny: function (mainDiv) {
            if (this.model.background.type === BoldBIDashboard.Card.BackgroundType.Image && this.model.background.imageSrc) {
                var bgrDiv = bbdesigner$("<img>").addClass("e-bgr");
                var topDiv = bbdesigner$("<div>").addClass("e-top").
				css({ "width": mainDiv.width(), "top": -mainDiv.height(), "height": mainDiv.height() });
                mainDiv.append(bgrDiv, topDiv);
                this._isDataURI("data:image/*;base64," + this.model.background.imageSrc) // eslint-disable-line no-unused-expressions
				? bgrDiv.attr({ "src": 'data:image/*;base64,' + this.model.background.imageSrc }).css({ "opacity": this.model.background.opacity })
				: bgrDiv.attr({ "src": this.model.background.imageSrc }).css({ "opacity": this.model.background.opacity });
                mainDiv = topDiv;  // eslint-disable-line no-param-reassign
            }
			if (!this._isNullOrEmptyOrUndefined(this.model.background.color)) {
				mainDiv.css({ 'background-color': this.model.background.color });
			}
            return mainDiv;
        },

        // For rendering the card control
          _render: function () {
            var mainDiv = this.element;
            mainDiv.addClass("e-card");
			var lessThanZero = -1,
				two = 2,
				four = 4;
            this.actualExponent = this.model.actualValue.value.indexOf("e") !== lessThanZero || this.model.actualValue.value.indexOf("E") !== lessThanZero;
            this.additionalExponent = !BoldBIDashboard.isNullOrUndefined(this.model.additionalValue) && !this._isNullOrEmptyOrUndefined(this.model.additionalValue.value) ? (this.model.additionalValue.value.indexOf("e") !== lessThanZero || this.model.additionalValue.value.indexOf("E") !== lessThanZero) : false;
            this.targetExponent = this.model.targetValue.value.indexOf("e") !== lessThanZero || this.model.targetValue.value.indexOf("E") !== lessThanZero;
            if (this.model.size.height !== "") {
                mainDiv.css({ 'height': this.model.size.height });
			} else if (mainDiv.height() > mainDiv.width() / two) {
				mainDiv.css({ 'height': mainDiv.width() / two });
			} else {
				mainDiv.css({ 'height': mainDiv.height() - four });
            }
            if (this.model.size.width !== "") {
                mainDiv.css({ 'width': this.model.size.width });
			}
            mainDiv = this._setBackgroundImageIfAny(mainDiv);
            this.model.hasTarget = !this._isNullOrEmptyOrUndefined(this.model.targetValue.value);
            this.model.hasSparkLine = !bbdesigner$.isEmptyObject(this.model.sparkLine) && !BoldBIDashboard.isNullOrUndefined(this.model.sparkLine.Data) ? (this.model.sparkLine.Data.length > 0 && this.model.customVisibility.sparkline) : false;
            if (this.model.hasTarget) {
                this.model.hasTarget = !this._isNullOrEmptyOrUndefined(this.model.actualValue.value);
			}
            var varianceDiv = null;
			var additionalData = null;
			mainDiv = this._createLayout(mainDiv);
                if (!this.model.showIndicatorOnly || !this.model.hasTarget) {
                varianceDiv = this._createVariationContainer();
                var valueParent = this.element.find(".e-value-parent");
                var titleDiv = this._createTitleContainer();
                var additionalValueDiv = this.element.find(".e-value-additional");

                // Add additional element value.    
                if (this.model.customVisibility.additionalElement && !this._isNullOrEmptyOrUndefined(this.model.additionalValue) && !this._isNullOrEmptyOrUndefined(this.model.additionalValue.value)) {
                if (this.additionalExponent) {
                    additionalData = this._createExponentValues(this.model.additionalValue.value, false, true);
                } else {
                    additionalData = this._getFormattedValue(this.model.additionalValue.value, false, true);
                }
                additionalValueDiv.html(additionalData);
                additionalValueDiv.css({
                    "justify-content":
                    (this.model.additionalValue.position == "center" ? "center" :
                        this.model.additionalValue.position == "left" ? "flex-start" : (this._isCompact && this.model.customVisibility.compactView) ? "flex-start" : "flex-end"),
                    "width": !this._isCompact ? "100%" : "auto"
                });
                }
                if (!this.model.hasTarget) {
                    var actualDiv = this._createActualValueContainer();
					if( !this._isNullOrEmptyOrUndefined(this.model.rangeSettings) && (this.model.rangeSettings.Type == 'Absolute' || this.model.rangeSettings.Type == 'Percent') && this.model.rangeSettings.Ranges.length > 0 && this.model.IsCustomRange){
				        this._createRangeForActualValue();
						actualDiv.actualValueDiv.css({'color': this._varianceColor });
				    }
					if (!this.model.IsCustomRange) {
				   var singleCard =  bbdesigner$(this.element).parents("#topParent").hasClass('e-Card-Single') ? bbdesigner$(this.element).parents("#topParent") : [];	
				   if (BoldBIDashboard.isNullOrUndefined(singleCard[0])) {
                      singleCard = bbdesigner$(this.element);
                  }
				      singleCard.css({'background-color': ''});
				  }
                } else {
					var actualContainer = this._createActualValueContainer();
					if (this.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.ActualValue) {
						actualContainer.actualValueDiv.css({'color': this._varianceColor });
					}
                }
                if (!this.model.headers.visible) {
                    titleDiv.css({ "height": 0 });
                }
                if (this.model.hasSparkLine) {
                    this._createSparkLineContainer(mainDiv);
                }
                if (!this.model.showActualValue) {
                    //valueParent.parent.find(".e-variation").css({ "height": "100%" });
                }
                if (this.model.background.type !== BoldBIDashboard.Card.BackgroundType.Full) {
                    //varianceDiv.css({ "color": this._varianceColor });
				}
            } else {
                var title = this._createTitleContainer();
                varianceDiv = this._createVariationContainer();
                if (this.model.hasSparkLine) {
                    this._createSparkLineContainer(mainDiv);
                }
            }
            if (this.model.background.type === BoldBIDashboard.Card.BackgroundType.Full) {
                mainDiv.css({ "background-color": this._varianceColor });
			}
			if (!this._isNullOrEmptyOrUndefined(this.model.background.color)) {
				mainDiv.css({ 'background-color': this.model.background.color });
			}
            if (!this.model.customVisibility.indicator && (this.element.find(".e-variationkpi").children().length > 0) && !this.model.showIndicatorOnly) {
                    this.element.find('.e-variationkpi').children().css({'display':'none'});
                }
			this._trigger("create", this);
        },
          _createLayout: function (div) {
              var titlePercent = this.model.hasSparkLine && !this.model.subTitle.visible ? "20%" : this.model.showIndicatorOnly ? "22%" : "30%";
              var contentPercent = this.model.headers.visible ? (this.model.hasSparkLine && !this.model.subTitle.visible ? "80%" : "70%") : "100%";
              if (!(this.model.headers.visible || this.model.customVisibility.actualValue || this.model.customVisibility.primaryValue || this.model.customVisibility.secondaryValue || this.model.customVisibility.additionalValue || this.model.customVisibility.sparkline)) {
                  div.append(bbdesigner$("<div>").addClass("widget-not-configured-icon"));
                  div.append(bbdesigner$("<div>").css({ "font-size": "x-small" }).html("No visible items to display"));
                  div.css({ "display": "flex", "align-items": "center", "justify-content": "center", "flex-direction": "column" });
                  return div;
              }
		    if (this.model.customVisibility.compactView && (this.element.width() < 250 && this.element.height() < 100) && this.model.hasTarget) {
		        this._isCompact = true;
		        var cardwrapper = bbdesigner$("<div>").attr("id", this._proxy + "_CardWrapper").addClass("e-card-wrapper e-column").css({ "height": div.height(), "width": div.width() - 10, "padding": "5px 5px 0px 5px" });

		        //Card title creation.
		        var titleDiv = bbdesigner$("<div>").attr("id", this._proxy + "_Title").addClass("e-title").css({ "height": titlePercent });
		        var subTitleDiv = bbdesigner$("<div>").addClass("e-subtitle e-hoverable");
		        cardwrapper.append(titleDiv);
		        cardwrapper.append(subTitleDiv);

		        //Card content creation.
		        var content = bbdesigner$("<div>").addClass("e-value-parent e-left").css({ "height": contentPercent });

		        //Show Indicator only.
		        if (this.model.showIndicatorOnly) {
		            var varianceDiv = bbdesigner$("<div>").addClass("e-variation e-variation-indicator  e-hoverable").css({ "display" : "flex", "justify-content": "center", "align-items" : "center" });
		            var indicatorDiv = bbdesigner$("<div>").addClass("e-variationkpi").css({"margin": "0 auto", "float": "none"});;
		            varianceDiv.append(indicatorDiv);
		            content.append(varianceDiv);
		            cardwrapper.append(content);
		            div.append(cardwrapper);
		        } else {
		            var valueRow = bbdesigner$("<div>").addClass("e-row e-compact e-hoverable").css({ "width": "100%"});
		            var valuePrefix = bbdesigner$("<div>").addClass("e-customtext-value");
		            var valueDiv = bbdesigner$("<div>").attr("id", this._proxy + "_ActValue").addClass("e-value").css({'min-width': '15%'});
		            var indicatorDiv = bbdesigner$("<div>").addClass("e-variationkpi e-row e-compact-value e-hoverable");
		            valueRow.append(valuePrefix);
		            valueRow.append(valueDiv);
		            valueRow.append(indicatorDiv);
		            valueRow.append(bbdesigner$("<div>").addClass("e-value-additional e-row e-hoverable").attr({ "data-tooltip": "Value: " }).css({ 'color': this.model.actualValue.color }));
		            var varianceDiv = bbdesigner$("<div>").addClass("e-variation e-row e-compact");
		            var primaryValueDiv = bbdesigner$("<div>").addClass("e-primary-value e-compact-value");
		            var targetPrefix = bbdesigner$("<div>").addClass("e-customtext-target");
		            var secondaryValueDiv = bbdesigner$("<div>").addClass("e-secondary-value").css({"min-width": '8%'});
		            varianceDiv.append(targetPrefix);
		            varianceDiv.append(secondaryValueDiv);
		            if (this.model.hasTarget && this.model.customVisibility.primaryValue && this.model.customVisibility.secondaryValue) {
		                varianceDiv.append(bbdesigner$("<div>").addClass('e-separator-card').text("/").css({'margin-right': '3px', 'margin-left': '2px'}));
		            }
		            varianceDiv.append(primaryValueDiv);

		            //Add card content to wrapper.
		            content.append(valueRow);
					if (BoldBIDashboard.isNullOrUndefined(this.model.isDefault) || (!BoldBIDashboard.isNullOrUndefined(this.model.isDefault) && !this.model.isDefault)) {
						content.append(varianceDiv);
					}
		            if (this.model.hasSparkLine) {
		                content.append(bbdesigner$("<div>").attr({ "id": this._proxy + "_sparkLine", "class": "e-sparkline" }).css({ "width": "100%", "margin-bottom": "5px" }));
		            }
		            cardwrapper.append(content);
		            div.append(cardwrapper);
		            if (this.model.uniformFontSize) {
		                this._setFontSize();
		            } else {
		                this._setHeight();
		            }
		        }
		    } else {
                    var cardwrapper = bbdesigner$("<div>").attr("id", this._proxy + "_CardWrapper").addClass("e-card-wrapper").css({ "height": div.height(), "width": div.width() - 10, "padding": "5px 5px 0px 5px" });
                    //Card title creation.
                    var titleDiv = bbdesigner$("<div>").attr("id", this._proxy + "_Title").addClass("e-title").css({ "height": titlePercent });
                    //titleDiv.html("Sum of Actual Vs Suom of Target");
                    var subTitleDiv = bbdesigner$("<div>").addClass("e-subtitle e-hoverable");
                    cardwrapper.append(titleDiv);
                    cardwrapper.append(subTitleDiv);
                    
                    //Card content creation.
                    var content = bbdesigner$("<div>").addClass("e-value-parent e-left").css({ "height": contentPercent });

                    //ShowIndicator only.
                    if (this.model.showIndicatorOnly) {
                        var varianceDiv = bbdesigner$("<div>").addClass("e-variation").css({ "display" : "flex", "justify-content": "center", "align-items" : "center" });
                        var indicatorDiv = bbdesigner$("<div>").addClass("e-variationkpi");
                        varianceDiv.append(indicatorDiv);
                        content.append(varianceDiv);
                        cardwrapper.append(content);
                        div.append(cardwrapper);
                    } else {
                        var valueRow = bbdesigner$("<div>").addClass("e-row e-hoverable").css({ "width": "100%"});
                        var valuePrefix = bbdesigner$("<div>").addClass("e-customtext-value");
                        var valueDiv = bbdesigner$("<div>").attr("id", this._proxy + "_ActValue").addClass("e-value");
                        valueRow.append(valuePrefix);
                        valueRow.append(bbdesigner$("<div>").addClass("e-row").css({"height": "100%", "max-width": !this._isNullOrEmptyOrUndefined(this.model.actualValue.customText) ? "90%" : "100%" }).append(valueDiv));
                        var secondaryValueRow = bbdesigner$("<div>").addClass("e-row e-hoverable").css({"width": "100%"});
                        var targetPrefix = bbdesigner$("<div>").addClass("e-customtext-target");
                        var secondaryValueDiv = bbdesigner$("<div>").addClass("e-secondary-value e-row");
                        secondaryValueRow.append(targetPrefix, bbdesigner$("<div>").addClass("e-row").css({"height": "100%", 'max-width': !this._isNullOrEmptyOrUndefined(this.model.targetValue.customText) ? "90%" : "100%"}).append(secondaryValueDiv));
                        var varianceDiv = bbdesigner$("<div>").addClass("e-variation e-row").css({ "align-items": "center" });
                        var primaryValueDiv = bbdesigner$("<div>").addClass("e-primary-value");
                        var indicatorDiv = bbdesigner$("<div>").addClass("e-variationkpi e-row");
                        varianceDiv.append(indicatorDiv);
                        //varianceDiv.append(primaryValueDiv);
                        varianceDiv.append(bbdesigner$("<div>").addClass("e-row").append(primaryValueDiv));
                     
                        //Add card content to wrapper.
                        content.append(valueRow);
                        content.append(secondaryValueRow);
                        content.append(varianceDiv);
                        content.append(bbdesigner$("<div>").addClass("e-value-additional e-row e-hoverable").attr({ "data-tooltip": "Value: " }).css({ 'color': this.model.actualValue.color }));
                        if (this.model.hasSparkLine) {
                            content.append(bbdesigner$("<div>").attr({ "id": this._proxy + "_sparkLine", "class": "e-sparkline" }).css({ "width": "100%","margin-bottom": "5px" }));
                        }
                        cardwrapper.append(content);
                        div.append(cardwrapper);
                        if (this.model.uniformFontSize) {
                            this._setFontSize();
                        } else {
                            this._setHeight();
                        }
                    }
            } 
            return div;
        },

         // Assign fontsize and visbility to card elements.
		_setFontSize: function () {
		    var MaxValueFontSize = 40;
            var MaxVarianceFontSize = 80;
            var elementSize = this.element.children().height() > this.element.children().width() ? this.element.children().width() : this.element.children().height();
		    var valuePercent = this._isCompact ? (this.model.hasSparkLine ? 0.15 : 0.18) : this.model.hasSparkLine ? 0.12 : 0.13;
		    var valueFontSize = Math.floor(elementSize * ( !this._isCompact && !BoldBIDashboard.isNullOrUndefined(this.model.additionalValue) && this.model.additionalValue.value !== "" ? 0.11 : valuePercent));
		    var varianceFontSize = Math.floor(elementSize * (!this._isCompact && !BoldBIDashboard.isNullOrUndefined(this.model.additionalValue) && this.model.additionalValue.value !== "" ? 0.2 : 0.25));
		    valueFontSize = valueFontSize > MaxValueFontSize ? MaxValueFontSize : valueFontSize;
		    varianceFontSize = varianceFontSize > MaxVarianceFontSize ? MaxVarianceFontSize : varianceFontSize;
		    var indicatorHeight = Math.ceil(elementSize * (!BoldBIDashboard.isNullOrUndefined(this.model.additionalValue) && this.model.additionalValue.value !== "" ? valuePercent : valuePercent + 0.01));
		    if (!this.model.hasTarget && (BoldBIDashboard.isNullOrUndefined(this.model.additionalValue) || BoldBIDashboard.isNullOrUndefined(this.model.additionalValue.value) || this.model.additionalValue.value === "")) {
		        valueFontSize = Math.floor(elementSize * 0.35) > 135 ? 135 : Math.floor(elementSize * 0.35);
		    }
		    if (this.model.hasTarget) {
		        var onlyVariance = false;
		        var maxFontSize = Math.floor(elementSize * 0.35) > 135 ? 135 : Math.floor(elementSize * 0.35);
		        if (!this.model.customVisibility.actualValue && !this.model.customVisibility.secondaryValue) {
		            onlyVariance = true;
		        }
		        if (this.model.customVisibility.primaryValue && onlyVariance) {
		            varianceFontSize = (this.model.customVisibility.indicator || this.model.customVisibility.additionalValue) ? varianceFontSize : maxFontSize;
		        } else {
		            if (this.model.customVisibility.actualValue && !this.model.customVisibility.secondaryValue) {
		                valueFontSize = (onlyVariance) ? valueFontSize : (this.model.customVisibility.primaryValue || this.model.customVisibility.indicator || this.model.customVisibility.additionalValue) ? valueFontSize : maxFontSize;
		            } else if (!this.model.customVisibility.actualValue && this.model.customVisibility.secondaryValue) {
		                valueFontSize = (onlyVariance) ? valueFontSize : (this.model.customVisibility.primaryValue || this.model.customVisibility.indicator || this.model.customVisibility.additionalValue) ? valueFontSize : maxFontSize;
		            }
		        }
		    }
		    this.element.find(".e-value").css({ "font-size": (BoldBIDashboard.isNullOrUndefined(this.model.isDefault) || (!BoldBIDashboard.isNullOrUndefined(this.model.isDefault) && !this.model.isDefault))
				? valueFontSize
					: varianceFontSize + "px", 
				"height": (this.model.customVisibility.actualValue) ? "" : 0 });
		    this.element.find(".e-customtext-value").css({ "font-size": valueFontSize + "px", "height": (this.model.customVisibility.actualValue) ? "" : 0 });
		    if (this.model.hasTarget) {
				this.element.find(".e-variationkpi").css({ "height": (!this.model.customVisibility.indicator)
					? 0
						: ((this.model.hasSparkLine || (this._isCompact && (BoldBIDashboard.isNullOrUndefined(this.model.isDefault) || (!BoldBIDashboard.isNullOrUndefined(this.model.isDefault) && !this.model.isDefault))))
							? indicatorHeight : varianceFontSize) + "px" });
                if (this.element.children().height() < 100 && this.element.children().width() < 250 && this.model.customVisibility.compactView) {
		            this.element.find(".e-secondary-value").css({ "font-size": this.model.hasSparkLine ? valueFontSize + "px" : varianceFontSize + "px", "height": (this.model.customVisibility.secondaryValue) ? "" : 0 });
		            this.element.find(".e-customtext-target").css({ "font-size": this.model.hasSparkLine ? valueFontSize + "px" : varianceFontSize + "px", "height": (this.model.customVisibility.secondaryValue) ? "" : 0 });
		        } else {
		            this.element.find(".e-secondary-value").css({ "font-size": valueFontSize + "px", "height": (this.model.customVisibility.secondaryValue) ? "" : 0 });
		            this.element.find(".e-customtext-target").css({ "font-size": valueFontSize + "px", "height": (this.model.customVisibility.secondaryValue) ? "" : 0 });
		        }
		        this.element.find(".e-primary-value").css({ "font-size": this.model.hasSparkLine ? valueFontSize + "px" : varianceFontSize + "px", "height": (this.model.customVisibility.primaryValue) ? "" : 0 });
		        if (!BoldBIDashboard.isNullOrUndefined(this.element.find(".e-separator-card"))) {
		            this.element.find(".e-separator-card").css({ "font-size": this.model.hasSparkLine ? valueFontSize + "px" : varianceFontSize + "px", "height": (this.model.customVisibility.secondaryValue || this.model.customVisibility.primaryValue) ? "" : 0 });
		        }
		    }
		    if (!BoldBIDashboard.isNullOrUndefined(this.element.find(".e-value-additional"))) {
		        this.element.find(".e-value-additional").css({ "font-size": valueFontSize + "px", "height": (this.model.customVisibility.additionalElement) ? "" : 0 });
		    }
		    if (this.model.hasSparkLine) {
		        this.element.find(".e-sparkline").css({ "height": this.model.customVisibility.sparkline ? varianceFontSize + "px" : 0, "margin-bottom": "5px" })
		    }
		},
		
		_setHeight: function () {
		    var isadditional = !BoldBIDashboard.isNullOrUndefined(this.model.additionalValue) && !this._isNullOrEmptyOrUndefined(this.model.additionalValue.value);
		    var valuePercent = (this.model.hasSparkLine || isadditional) ? "15%" : "20%";
		    var variationPercent = (this.model.hasSparkLine || isadditional) ? "40%" : "50%";
		    if (this.model.hasTarget) {
		        this.element.find(".e-value").parent().parent().css({ "width": "100%", "height": (this.model.customVisibility.actualValue) ? valuePercent : 0 });
		        this.element.find(".e-customtext-value").css({ "height": (this.model.customVisibility.actualValue) ? "" : 0 });
		        this.element.find(".e-variationkpi").css({ "height": (!this.model.customVisibility.indicator) ? 0 : "100%" });
		        this.element.find(".e-secondary-value").parent().parent().css({ "height": (this.model.customVisibility.secondaryValue) ? valuePercent : 0, "width": "100%" });
		        this.element.find(".e-customtext-target").css({ "height": (this.model.customVisibility.secondaryValue) ? "" : 0 });
		        this.element.find(".e-variation").css({ "height": (this.model.customVisibility.primaryValue || this.model.customVisibility.indicator) ? (this.model.hasSparkLine ? valuePercent: variationPercent): 0, "width": "100%" });
                
		    } else {
		        this.element.find(".e-value").parent().parent().css({ "width": "100%", "height": (this.model.customVisibility.actualValue) ? "70%" : 0 });
		    }
		    if (!BoldBIDashboard.isNullOrUndefined(this.element.find(".e-value-additional")) && isadditional) {
		        this.element.find(".e-value-additional").css({ "height": (this.model.customVisibility.additionalElement) ? valuePercent : 0 });
		    }
		    if (this.model.hasSparkLine) {
		        this.element.find(".e-sparkline").css({ "height": this.model.customVisibility.sparkline ? variationPercent : 0, "margin-bottom": "5px" })
		    }
		},
         
        // Gets the browser vendor name
        _getBrowserVendor: function () {
            var ua = navigator.userAgent,
				lessThanZero = -1;
            if (ua.indexOf("MSIE") !== lessThanZero || ua.match(/Trident.*rv\:11\./) !== null) {
				this.browserType = BoldBIDashboard.Card.BrowserType.IE;
			}
        },

        // To re render the canvas on card resize
        _reDrawKPI: function () {
            var kpiDiv = bbdesigner$(this.element).find(bbdesigner$(".e-variationkpi"));
             if( !this._isNullOrEmptyOrUndefined(this.model.rangeSettings) && (this.model.rangeSettings.Type == 'Absolute' || this.model.rangeSettings.Type == 'Percent') && this.model.rangeSettings.Ranges.length > 0 && this.model.IsCustomRange && this.model.IsApplied ){
                 
				 this._createRangeKpiIndicator(kpiDiv);
				
				} else if(!this._isNullOrEmptyOrUndefined(this.model.icon.path)) {
					
					this._customIndicatorForCard(kpiDiv);
				
				} else {
				 	
				    this._createKpiIndicator(kpiDiv);
				}
        },

        // To check whether the given mage url is Data URI
        _isDataURI: function (str) {
            var regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i; // eslint-disable-line newline-after-var

            return !str.match(regex);
        },

         // Font size calculation for all values
        _calculateFontSizes: function () {
			var MaxValueFontSize = 40;
		    var MaxVarianceFontSize = 80;
			var elementSize = this.element.height() > this.element.width() ? this.element.width() : this.element.height();
		    var valuePercent = this._isCompact ? (this.model.hasSparkLine ? 0.15 : 0.18) : this.model.hasSparkLine ? 0.12 : 0.13;
		    var valueFontSize = Math.floor(elementSize * ( !this._isCompact && !BoldBIDashboard.isNullOrUndefined(this.model.additionalValue) && this.model.additionalValue.value !== "" ? 0.11 : valuePercent));
            var zeroPointSeven = 0.7,
				zeroPoint9 = 0.9,
				one = 1,
				onePointOne = 1.1,
				onePointTwo = 1.2,
				zero = 0,
				ten = 10,
				minimumFontSize = 12;
			var titleFontSize = this._getOptimumFontSize(this.element.find(".e-title").height(), this.element.find(".e-title").width(), BoldBIDashboard.Card.AdjustFont.Both, this.element.find(".e-title").html());
            bbdesigner$(this.element).find(".e-title").
				css({ "font-size": titleFontSize < minimumFontSize ? minimumFontSize : titleFontSize + "px", "line-height": this.element.find(".e-title").height() + "px" });
            bbdesigner$(this.element).find(".e-subtitle").
				css({ "font-size": ((titleFontSize < minimumFontSize ? minimumFontSize : titleFontSize) * zeroPointSeven) + "px" });
            if (!this.model.showIndicatorOnly || !this.model.hasTarget) {
				var width = this._isNullOrEmptyOrUndefined(this.element.find(".e-value").parent().parent().find(".e-customtext-value").text()) ? this.element.find(".e-value").parent().parent().width() : this.element.find(".e-value").parent().parent().width() - (0.1 * this.element.find(".e-value").parent().parent().width());
                var fontSize = this._getOptimumFontSize(this.element.find(".e-value").parent().parent().height(), width, BoldBIDashboard.Card.AdjustFont.Both, this.element.find(".e-value").text());
                bbdesigner$(this.element).find(".e-value").
					css({
					    "font-size": fontSize + "px", "line-height": (!this.model.hasTarget && this.model.actualValue.position.toLowerCase() !== "center" ? bbdesigner$(this.element).find(".e-value").
                        parent().parent().height() * onePointOne : bbdesigner$(this.element).find(".e-value").
                        parent().parent().height() - (this.model.hasTarget ? zero : ten)) + "px"
					});
                bbdesigner$(this.element).find(".e-value");
                if (this.model.hasTarget) {
					fontSize = this._getOptimumFontSize(this.element.find(".e-secondary-value").parent().parent().height(), this.element.find(".e-secondary-value").parent().parent().width(), BoldBIDashboard.Card.AdjustFont.Both, this.element.find(".e-secondary-value").text()) / onePointTwo;
                    bbdesigner$(this.element).find(".e-secondary-value").
						css({
						    "font-size": fontSize + "px", "line-height": bbdesigner$(this.element).find(".e-secondary-value").
                            parent().parent().height() + "px"
						});
                    bbdesigner$(this.element).find(".e-value-additional").
                    css({
                        "font-size": this._getOptimumFontSize(bbdesigner$(this.element).find(".e-value-additional").
                            height(), bbdesigner$(this.element).find(".e-value-additional").
                            width(), BoldBIDashboard.Card.AdjustFont.Both, bbdesigner$(this.element).find(".e-value-additional").
                            html()) + "px", "text-align": "right", "text-overflow": "ellipsis", "overflow": "hidden"
                    });
                    bbdesigner$(this.element).find(".e-primary-value").
						css({
						    "font-size": this._getOptimumFontSize(bbdesigner$(this.element).find(".e-variation").
                            height(), bbdesigner$(this.element).find(".e-primary-value").parent().
                            width(), BoldBIDashboard.Card.AdjustFont.Both, bbdesigner$(this.element).find(".e-primary-value").
                            html()) + "px", "line-height": bbdesigner$(this.element).find(".e-variation").
                            height() + "px"
						});
                }
                if (this.model.targetValue.value != "" && this.model.actualValue.value != "") {
                    if (bbdesigner$(this.element).find(".e-value-parent .e-row").children('.e-customtext-value').length > 0) {
                        //bbdesigner$(this.element).find(".e-value").css({ 'line-height': '' });
                        var bounds = this._measureText(bbdesigner$(this.element).find('.e-value.e-hoverable').text(), null, "Normal " + bbdesigner$(this.element).find('.e-value.e-hoverable').css('font-size') + " " + bbdesigner$(this.element).find('.e-value.e-hoverable').css("font-family"))
                        bbdesigner$(this.element).find(".e-value-parent .e-row").children('.e-customtext-value').css({
                            "font-size": valueFontSize + "px", 'width': 'auto', "float": "left"
                        });
                    }
                    if (bbdesigner$(this.element).find(".e-value-parent .e-row").children('.e-customtext-target').length > 0) {
                       // bbdesigner$(this.element).find(".e-secondaryvalue").css({ 'line-height': '' });
                        var bounds = this._measureText(bbdesigner$(this.element).find('.e-secondaryvalue').text(), null, "Normal " + bbdesigner$(this.element).find('.e-secondaryvalue').css('font-size') + " " + bbdesigner$(this.element).find('.e-secondaryvalue').css("font-family"))
                        bbdesigner$(this.element).find(".e-value-parent .e-row").children('.e-customtext-target').css({ "font-size": fontSize + "px", 'width': 'auto', "float": "left" });
                    }
                } else {
                    if (bbdesigner$(this.element).find(".e-value-parent .e-row").children('.e-customtext-value').length > 0) {
                        var bounds = this._measureText(bbdesigner$(this.element).find('.e-value.e-hoverable').text(), null, "Normal " + bbdesigner$(this.element).find('.e-value.e-hoverable').css('font-size') + " " + bbdesigner$(this.element).find('.e-value.e-hoverable').css("font-family"))
                        bbdesigner$(this.element).find(".e-value-parent").children('.e-customtext-value').css({ 'width': 'auto', 'height': '100%', "font-size": fontSize + "px", });
                    }
                    if (bbdesigner$(this.element).find(".e-value-parent .e-row").children('.e-customtext-target').length > 0) {
                        var bounds = this._measureText(bbdesigner$(this.element).find('.e-secondaryvalue').text(), null, "Normal " + bbdesigner$(this.element).find('.e-secondaryvalue.e-hoverable').css('font-size') + " " + bbdesigner$(this.element).find('.e-secondaryvalue.e-hoverable').css("font-family"))
                        bbdesigner$(this.element).find(".e-value-parent .e-row").children('.e-customtext-target').css({ 'width': 'auto', 'height': '100%', "font-size": fontSize + "px" });
                    }
                }
            }
        
        },

        // Calculates the optimum font size for the given text
      _getOptimumFontSize: function (height, width, adjustFont, text) {
            var coef = null,
				bounds = null,
				one = 1,
				zeroPoint1 = 0.1,
				zeroPoint9 = 0.9;
            if (adjustFont === BoldBIDashboard.Card.AdjustFont.Both) {
                coef = 0.9;
                while (true) { // eslint-disable-line no-constant-condition
                    bounds = this._measureText(text, width, "Bold " + (height * coef) + " Roboto");
                    if (bounds.width > width || bounds.height > height) {
						if (coef.toFixed(one) <= zeroPoint1) {

                            return height * coef;
						}
						coef -= zeroPoint1;
                    } else {

                        return height * coef;
					}
                }
            } else if (adjustFont === BoldBIDashboard.Card.AdjustFont.Height) {
                coef = 0.72;

                return height * coef;
            } else if (adjustFont === BoldBIDashboard.Card.AdjustFont.Width) {
                coef = 0.9;
                while (true) { // eslint-disable-line no-constant-condition
                    bounds = this._measureText(text, width, "Bold " + (height * coef) + " Roboto");
                    if (bounds.width > width) {
                        if (coef.toFixed(one) <= zeroPoint1) {
                            return height * coef;
						}
						coef -= zeroPoint1;
                    } else {

                        return height * coef;
					}
                }
            } else {
                return height * zeroPoint9;
			}
        },

        // Calculates the size required to render the text with the given font styles
        _measureText: function (text, maxWidth, font) {
            var element = bbdesigner$(document).find("#cardMeasureText");
            var textObj = null,
				zero = 0,
				lessThanZero = -1;
            if (element.length === zero) {
                textObj = document.createElement('text');
                bbdesigner$(textObj).attr({ 'id': 'cardMeasureText' });
                document.body.appendChild(textObj);
            } else {
                textObj = element[0];
            }

            var style = "",
			size = "",
			family = "";
            textObj.innerHTML = text;
            if (typeof font !== "undefined" && typeof font.size === "undefined") {
                var fontarray = font;
                fontarray = fontarray.split(" ");
                style = fontarray[0];
                size = fontarray[1];
                family = fontarray[2];
            }

            if (font !== null) {
                textObj.style.fontSize = font.size > zero ? font.size + "px" : font.size ? font.size : size.indexOf("px") === lessThanZero && size.indexOf("%") === lessThanZero ? size + "px" : size;
                textObj.style.fontStyle = font.fontStyle ? font.fontStyle : style;
                textObj.style.fontFamily = font.fontFamily ? font.fontFamily : family;
            }
            textObj.style.backgroundColor = 'white';
            textObj.style.position = 'absolute';
            textObj.style.top = -100;
            textObj.style.left = 0;
            textObj.style.visibility = 'hidden';
            if (maxWidth) {
                textObj.style.maxwidth = maxWidth + "px";
			}

            var bounds = { width: textObj.offsetWidth, height: textObj.offsetHeight };
            if (BoldBIDashboard.browserInfo().name === "msie" || BoldBIDashboard.browserInfo().name === "webkit") {
                textObj.parentNode.removeChild(textObj);
			} else {
                textObj.remove();
			}

            return bounds;
        },

        // Calculates the value and target for the control
        _getFormattedValue: function (newValue, target, isadditional) {
            var number = newValue;
            var stringFormat = "",
				zero = 0,
				two = 2,
				five = 5,
				minusFive = -5,
				hundred = 100;
            var valueRepresentation = isadditional ? this.model.additionalValueRepresentation : this.model.valueRepresentation;
            switch (valueRepresentation.format) {
                case BoldBIDashboard.Card.Format.Percentage:
                    stringFormat = "P" + valueRepresentation.numberOfDecimals;
                    break;
                case BoldBIDashboard.Card.Format.Number:
                    stringFormat = "N" + valueRepresentation.numberOfDecimals;
                    break;
                case BoldBIDashboard.Card.Format.Currency:
                    stringFormat = "C" + valueRepresentation.numberOfDecimals;
                    break;
				default:
					break;
            }
            var value = this._applyStringFormatting(stringFormat, valueRepresentation.currencyCulture, valueRepresentation.abbreviationType, number, isadditional);  // eslint-disable-line no-param-reassign
            if(valueRepresentation.format !== BoldBIDashboard.Card.Format.Percentage) {
			    if(valueRepresentation.decimalSeparator != null && valueRepresentation.groupSeparator!= null && !BoldBIDashboard.isNullOrUndefined(value)){
			        var temp = value.split(valueRepresentation.decimalSeparator.CurrentValue);
			        var replace = temp[0].replaceAll(valueRepresentation.groupSeparator.CurrentValue, valueRepresentation.groupSeparator.AliasValue);
			        value = temp.length >1 ? replace + valueRepresentation.decimalSeparator.AliasValue + temp[1] : replace;
                }
                value = valueRepresentation.prefix + value + valueRepresentation.suffix;  // eslint-disable-line no-param-reassign// eslint-disable-line no-param-reassign
            }
            BoldBIDashboard.preferredCulture(valueRepresentation.currencyCulture);
			var zeroValue = !this._isNullOrEmptyOrUndefined(this.model.targetValue.value) && !this._isNullOrEmptyOrUndefined(this.model.actualValue.value) && parseFloat(this.model.actualValue.value) === zero && parseFloat(this.model.targetValue.value) === zero;
            if (target) {
                var percent = 0.0;
                switch (valueRepresentation.variationType) {
                    case BoldBIDashboard.Card.VariationTypes.Absolute:
                        percent = !this._isNullOrEmptyOrUndefined(this.model.targetValue.value) && parseFloat(this.model.targetValue.value) === zero ? zero : number * hundred / parseFloat(this.model.targetValue.value);
                        value = { value: value, variance: BoldBIDashboard.globalize.format(percent.toFixed(two).toString()) + "%" };  // eslint-disable-line no-param-reassign
						break;
					case BoldBIDashboard.Card.VariationTypes.ActualValue:
                    case BoldBIDashboard.Card.VariationTypes.PercentOfDifference:
                        percent = !this._isNullOrEmptyOrUndefined(this.model.targetValue.value) && parseFloat(this.model.targetValue.value) !== zero ? (((parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value)) / ((parseFloat(this.model.targetValue.value) + parseFloat(this.model.actualValue.value)) / 2) )) * hundred : zeroValue  ? zero : hundred; // eslint-disable-line no-param-reassign
                        value = { value: value, variance: BoldBIDashboard.globalize.format(percent.toFixed(two).toString()) + "%" };
                        break;
                    case BoldBIDashboard.Card.VariationTypes.PercentOfTarget:
                        percent = !this._isNullOrEmptyOrUndefined(this.model.targetValue.value) && parseFloat(this.model.targetValue.value) !== zero ? (parseFloat(this.model.actualValue.value) / parseFloat(this.model.targetValue.value) * hundred) : zeroValue ? zero : hundred; // eslint-disable-line no-param-reassign
                        value = { value: value, variance: BoldBIDashboard.globalize.format(this.model.customHeader.text === "Actual vs Target" ? percent.toFixed(zero).toString() : percent.toFixed(two).toString()) + "%" };
                        break;
					case BoldBIDashboard.Card.VariationTypes.PercentOfChange:
                        percent = !this._isNullOrEmptyOrUndefined(this.model.targetValue.value) && parseFloat(this.model.targetValue.value) !== zero ? ((parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value)) / (parseFloat(this.model.targetValue.value))) * hundred : zeroValue ? zero : hundred; // eslint-disable-line no-param-reassign
                        value = { value: value, variance: BoldBIDashboard.globalize.format(percent.toFixed(two).toString()) + "%" };
                        break;
					default:
						break;
                }
                if (percent <= five && percent >= minusFive) {
                    this.warning = true;
				}
            }

            return value;
        },
		
		_getTitleAlignmentValue: function(newValue) {
        var titleAlign = null;
        switch (newValue) {
            case 'center':
                titleAlign = 'center';
                break;
            case 'left':
                titleAlign = 'flex-start';
                break;
            case 'right':
                titleAlign = 'flex-end';
                break;
            default:
                titleAlign = 'flex-start';
                break;
        }
        return titleAlign;
    },

        // apply formatting to negative values
        _applyNegativeFormatting: function (value, numberOfDecimals, currencyCulture) {
            var val = Math.abs((value.toString()));
            var formattedValue = BoldBIDashboard.globalize.format(val, "N" + numberOfDecimals, currencyCulture);
            switch (this.model.valueRepresentation.negativeValueFormat) {
                case BoldBIDashboard.Card.NegativeValueFormat.Default:
                    return "-" + formattedValue;
                case BoldBIDashboard.Card.NegativeValueFormat.NoNegativeSignWithBracket:
                    return "(" + formattedValue + ")";
                case BoldBIDashboard.Card.NegativeValueFormat.NegativeSignInSuffix:
                    return formattedValue + "-";
				default :
					break;
            }

            return "-" + formattedValue;
        },

        _applyStringFormatting: function(stringFormat, culture, unit, value, isadditional) {
            if(!BoldBIDashboard.isNullOrUndefined(value)){
			BoldBIDashboard.preferredCulture(culture);
            var val = parseFloat(value.toString());
            if (isNaN(val)) {

				return value;
			}
            val = unit === BoldBIDashboard.Card.AbbreviationTypes.Auto ? this._truncateNumber(val) : this._applyNumberUnit(unit, val);

            return this._adjustZeros(val, unit, stringFormat, culture, isadditional);
			}
        },

        _adjustZeros: function(value, unit, stringFormat, culture, isadditional) {
			BoldBIDashboard.preferredCulture(culture);
            var format = stringFormat,
				zero = 0,
				lessThanZero = -1,
				pointZero = 0.0;
            var decimalplaces = parseInt(stringFormat.replace(/^\D+/g, ''));
            var isDecimalFormatChange = value.fraction === parseInt(value.fraction) || value.fraction % decimalplaces === zero;
			var currencyCulture = isadditional ? this.model.additionalValueRepresentation.currencyCulture : this.model.valueRepresentation.currencyCulture;
            if (unit === BoldBIDashboard.Card.AbbreviationTypes.Auto) {
                this.representSymbol = value.symbol;
                if (value.fraction === zero) {
                    value = { fraction: 0, symbol: "" }; // eslint-disable-line no-param-reassign
                    format = stringFormat.replace(decimalplaces, "0");  // eslint-disable-line no-param-reassign
                } else if (isDecimalFormatChange) {
                    format = stringFormat.replace(decimalplaces, "0");
                }
                if (stringFormat.indexOf("N") > lessThanZero && value.fraction < pointZero) {

                    return this._applyNegativeFormatting(value.fraction, isDecimalFormatChange ? zero : decimalplaces, currencyCulture) + value.symbol;
                }

                return BoldBIDashboard.globalize.format(value.fraction, format, currencyCulture) + value.symbol;
            }
            if (value.fraction === zero) {
                value = { fraction: zero, postFixLabel: "" }; // eslint-disable-line no-param-reassign
                format = stringFormat.replace(decimalplaces, "0");  // eslint-disable-line no-param-reassign
            }
            if (isDecimalFormatChange) {
                format = stringFormat.replace(decimalplaces, "0");
            }
            if (stringFormat.indexOf("N") > lessThanZero && value.fraction < pointZero) {

                return this._applyNegativeFormatting(value.fraction, isDecimalFormatChange ? zero : decimalplaces, currencyCulture) + value.postFixLabel;
            }
			
            return BoldBIDashboard.globalize.format(value.fraction, format, currencyCulture) + value.postFixLabel;
        },

        _truncateNumber: function(num) {
			var three = 3,
			    five = 5,
				six = 6,
				seven = 7,
				nine = 9,
				ten	= 10,
				twelve = 12;
            var thousand = Math.pow(ten, three);
			var lakhs = Math.pow(ten, five);
            var million = Math.pow(ten, six);
			var crores = Math.pow(ten, seven);
            var billion = Math.pow(ten, nine);
            var trillion = Math.pow(ten, twelve);
            var number = num;
			if (this.model.culture === "en-IN") {
				if (((number >= thousand) && (number < lakhs)) || ((number <= -thousand) && (number > -lakhs))) {
					return { fraction: this._calculateFraction(number, thousand), symbol: "K" };
				} else if (((number >= lakhs) && (number < million)) || ((number <= -lakhs) && (number > -million))) {
					return { fraction: this._calculateFraction(number, lakhs), symbol: "L" };
				} else if (((number >= million) && (number < crores)) || ((number <= -million) && (number > -crores))) {
					return { fraction: this._calculateFraction(number, million), symbol: "M" };
				} else if (((number >= crores) && (number < billion)) || ((number <= -crores) && (number > -billion))) {
					return { fraction: this._calculateFraction(number, crores), symbol: "C" };
				} else if (((number >= billion) && (number < trillion)) || ((number <= -billion) && (number > -trillion))) {
					return { fraction: this._calculateFraction(number, billion), symbol: "B" };
				} else if (number >= trillion || number <= -trillion) {
					return { fraction: this._calculateFraction(number, trillion), symbol: "T" };
				}
			} else {
				if (((number >= thousand) && (number < million)) || ((number <= -thousand) && (number > -million))) {
					return { fraction: this._calculateFraction(number, thousand), symbol: "K" };
				} else if (((number >= million) && (number < billion)) || ((number <= -million) && (number > -billion))) {
					return { fraction: this._calculateFraction(number, million), symbol: "M" };
				} else if (((number >= billion) && (number < trillion)) || ((number <= -billion) && (number > -trillion))) {
					return { fraction: this._calculateFraction(number, billion), symbol: "B" };
				} else if (number >= trillion || number <= -trillion) {
					return { fraction: this._calculateFraction(number, trillion), symbol: "T" };
				}
			}

			return { fraction: number, symbol: "" };
        },

        _calculateFraction: function(num, divisor) {

            return num / divisor;
        },

        _applyNumberUnit: function (unit, value) {
            var one = 1,
				ten = 10,
				five = 5,
				three = 3,
				six = 6,
				seven = 7,
				nine = 9;
            var thousand = Math.pow(ten, three);
			var lakhs = Math.pow(ten, five);
            var million = Math.pow(ten, six);
			var crores = Math.pow(ten, seven);
            var billion = Math.pow(ten, nine);
			if (this.model.culture === "en-IN") {
				switch (unit) {
                    case BoldBIDashboard.Card.AbbreviationTypes.Ones: return { fraction: value / one, postFixLabel: "" };
					case BoldBIDashboard.Card.AbbreviationTypes.Thousands: return { fraction: value / thousand, postFixLabel: "K" };
					case BoldBIDashboard.Card.AbbreviationTypes.Lakhs: return { fraction: value / lakhs, postFixLabel: "L" };
					case BoldBIDashboard.Card.AbbreviationTypes.Millions: return { fraction: value / million, postFixLabel: "M" };
					case BoldBIDashboard.Card.AbbreviationTypes.Crores: return { fraction: value / crores, postFixLabel: "C" };
					case BoldBIDashboard.Card.AbbreviationTypes.Billions: return { fraction: value / billion, postFixLabel: "B" };
					default: return { fraction: value, postFixLabel: "" };
				}
			} else {
				switch (unit) {
                    case BoldBIDashboard.Card.AbbreviationTypes.Ones: return { fraction: value / one, postFixLabel: "" };
					case BoldBIDashboard.Card.AbbreviationTypes.Thousands: return { fraction: value / thousand, postFixLabel: "K" };
					case BoldBIDashboard.Card.AbbreviationTypes.Millions: return { fraction: value / million, postFixLabel: "M" };
					case BoldBIDashboard.Card.AbbreviationTypes.Billions: return { fraction: value / billion, postFixLabel: "B" };
					default: return { fraction: value, postFixLabel: "" };
				}
			}
        },
		
		_renderingToopTipTemplate: function (values) {	  
			var tooltiptemplate = '<table>';
			var keys = Object.keys(values);
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				tooltiptemplate += '<tr>'
					+ '<td>' + key + ' :</td>'
					+ '<td><b>' + values[key] + '</b></td>'
					+ '</tr>';
				}

			tooltiptemplate += '</table>';
			return tooltiptemplate;
		},

        // Event handlers
       _showToolTip: function (evt) {
			var lessThanZero = -1,
				zero = 0,
				twentyEight = 28,
				eighteen = 18,
				twenty = 20,
				five = 5,
				threeHundred = 300;
            var targetData = null;
            var actualData = null;
            var variationData = null;
			var additionalData = null;
            if (this.targetExponent) {
				targetData = this._createExponentValues(this.model.targetValue.value, false, false);
            } else {
                targetData = this._getFormattedValue(this.model.targetValue.value, false, false);
            }
            if (this.actualExponent) {
				actualData = this._createExponentValues(this.model.actualValue.value, false, false);
			} else {
				actualData = this._getFormattedValue(this.model.actualValue.value, false, false);
            }
            if (!BoldBIDashboard.isNullOrUndefined(this.model.additionalValue)) {
                if (this.additionalExponent) {
                    additionalData = this._createExponentValues(this.model.additionalValue.value, false, true);
                } else {
                    additionalData = this._getFormattedValue(this.model.additionalValue.value, false, true);
                }
            }
            variationData = (parseFloat(this.model.actualValue.value) - parseFloat(this.model.targetValue.value)).toString();

            this.variantExponent = variationData.indexOf("e") !== lessThanZero || variationData.indexOf("E") !== lessThanZero;
            if (this.variantExponent) {
                variationData = this._createExponentValues(variationData, true, false);
            } else if (this.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.Absolute && (this.model.secondaryValueType === BoldBIDashboard.Card.SecondaryValueType.Variance || this.model.secondaryValueType === BoldBIDashboard.Card.SecondaryValueType.Target)) {
				variationData = this._getFormattedValue(variationData, true, false).variance;
			} else {
				variationData = this._getVarianceValue(variationData);
            }
            if (this._tooltipTarget && this._tooltipTarget.attr("class") === bbdesigner$(evt.currentTarget).attr("class")) {

				return;
            }
            if (this._tooltipTimer) {
                clearTimeout(this._tooltipTimer);
			}
            var that = this;
			var body = document.getElementsByTagName("BODY")[0];
            this._tooltipTimer = setTimeout(function () {
				that._tooltipTarget = bbdesigner$(evt.currentTarget);
				var configuredValues = {};
                var tooltip = {};
                var tooltipText = "";
                var bounds = {};
                if (bbdesigner$(body).find(bbdesigner$("#" + that._proxy + "_toolTip")).length === zero) {
                    tooltip = bbdesigner$("<div>").attr({ "id": that._proxy + "_toolTip" }).
                    addClass("e-card-tooltip").css({ 'width': 'auto', 'max-width': '400px' ,'word-wrap': 'break-word'});
                    bbdesigner$(body).append(tooltip);
                } else {
                    tooltip = bbdesigner$(body).find(bbdesigner$("#" + that._proxy + "_toolTip"));
                    bounds = that._measureText(tooltip, that._tooltipTarget.width(), "Normal  14  " + that._tooltipTarget.css("font-family"));
                }
                if (that._tooltipTarget.hasClass("e-variation") || that._tooltipTarget.hasClass("e-variationkpi") || that._tooltipTarget.hasClass("e-row") || that._tooltipTarget.hasClass("e-value") || that._tooltipTarget.hasClass("e-value-additional") || that._tooltipTarget.hasClass("e-variation-indicator")) {
                    if (!that.model.showTooltip) {

						return;
                    }
                    if (that.model.showIndicatorOnly && that.model.hasTarget) {
                        if (!that._isNullOrEmptyOrUndefined(that.model.actualValue.name)) {
						    configuredValues[that.model.actualValue.name] = (!that._isNullOrEmptyOrUndefined(that.model.actualValue.customText) ? that.model.actualValue.customText + "\xa0\xa0\xa0"  : "") + actualData;
						}
                        if (!that._isNullOrEmptyOrUndefined(that.model.targetValue.name)) {
                            configuredValues[that.model.targetValue.name] = (!that._isNullOrEmptyOrUndefined(that.model.targetValue.customText) ? that.model.targetValue.customText + "\xa0\xa0\xa0"  : "") + targetData;							
                        }
                        if (!BoldBIDashboard.isNullOrUndefined(that.model.additionalValue) && that.model.additionalValue.value != "") {
							configuredValues[that.model.additionalValue.name] = additionalData;							
						}
						configuredValues["Variation"] = variationData;                        
                        var variationType = (that.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.PercentOfDifference ? "Percent Of Difference" : that.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.PercentOfTarget ? "Percent Of Target" : that.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.Absolute ? "Absolute difference" : that.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.ActualValue ? "Actual Value" : "Percent of Change");
						configuredValues[variationType] = that.Value;						
						tooltipText = that._renderingToopTipTemplate(configuredValues);
                    } else {
                        var actualValueText = null;
                        if ((!that._isNullOrEmptyOrUndefined(that.model.actualValue.value) && !that._isNullOrEmptyOrUndefined(that.model.targetValue.value)) && (!that._isNullOrEmptyOrUndefined(that.model.additionalValue) && !that._isNullOrEmptyOrUndefined(that.model.additionalValue.value))) {
                            actualValueText = "";
                            if (!that._isNullOrEmptyOrUndefined(that.model.actualValue.customText)) {
                                actualValueText = that.model.actualValue.customText + "\xa0\xa0\xa0";
							}
                            // } else if (!that._isNullOrEmptyOrUndefined(that.model.actualValue.name)) {
                                // actualValueText = that.model.actualValue.name;
                            // }
							configuredValues[that.model.actualValue.name] = actualValueText + actualData;
                            //tooltipText += that.model.actualValue.name + " : " + actualValueText + actualData  + "<div style='margin-top:5px;'\>";
                            if (!that._isNullOrEmptyOrUndefined(that.model.targetValue.name)) {
                                configuredValues[that.model.targetValue.name] = (!that._isNullOrEmptyOrUndefined(that.model.targetValue.customText) ? that.model.targetValue.customText + "\xa0\xa0\xa0"  : "") + targetData;
							}
                            BoldBIDashboard.preferredCulture(that.model.valueRepresentation.currencyCulture);
                            configuredValues["Variation"] = variationData;							
                            var variationType = (that.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.PercentOfDifference ? "Percent Of Difference : " : that.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.PercentOfTarget ? "Percent Of Target : " : that.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.Absolute ? "Absolute difference : " : that.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.ActualValue ? "Actual Value :" : "Percent of Change : ");
							configuredValues[variationType] = that.Value;
                            if (!BoldBIDashboard.isNullOrUndefined(that.model.additionalValue) && !that._isNullOrEmptyOrUndefined(that.model.additionalValue.value)) {
							configuredValues[that.model.additionalValue.name] = additionalData;							
							}							
							tooltipText = that._renderingToopTipTemplate(configuredValues);
                            tooltip.html(tooltipText).css({ "visibility": "hidden", "display": "" });
                            bounds.width = tooltip.width();
                            bounds.height = tooltip.height();
                            tooltip.css({ "visibility": "visible", "display": "none" });
                        } else if (!that._isNullOrEmptyOrUndefined(that.model.actualValue.value) && !that._isNullOrEmptyOrUndefined(that.model.targetValue.value)) {
                            actualValueText = "";
                            if (!that._isNullOrEmptyOrUndefined(that.model.actualValue.customText)) {
                                actualValueText = that.model.actualValue.customText + "\xa0\xa0\xa0";
							}
                            // } else if (!that._isNullOrEmptyOrUndefined(that.model.actualValue.name)) {
                                // actualValueText = that.model.actualValue.name;
                            // }                            
							configuredValues[that.model.actualValue.name] = actualValueText + actualData;
                            if (!that._isNullOrEmptyOrUndefined(that.model.targetValue.name)) {
							configuredValues[that.model.targetValue.name] = (!that._isNullOrEmptyOrUndefined(that.model.targetValue.customText) ? that.model.targetValue.customText + "\xa0\xa0\xa0"  : "") + targetData;                             
                            }
                            BoldBIDashboard.preferredCulture(that.model.valueRepresentation.currencyCulture);
							configuredValues["Variation"] = variationData;                            
                            var variationType = (that.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.PercentOfDifference ? "Percent Of Difference " : that.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.PercentOfTarget ? "Percent Of Target" : that.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.Absolute ? "Absolute difference" : that.model.valueRepresentation.variationType === BoldBIDashboard.Card.VariationTypes.ActualValue ? "Actual Value :" : "Percent of Change");
							configuredValues[variationType] = that.Value;							
							tooltipText = that._renderingToopTipTemplate(configuredValues); 
                            tooltip.html(tooltipText).css({ "visibility": "hidden", "display": "" });
                            bounds.width = tooltip.width();
                            bounds.height = tooltip.height();
                            tooltip.css({ "visibility": "visible", "display": "none" });
                        } else {
                             actualValueText = "Value";
							 
                            if (!that._isNullOrEmptyOrUndefined(that.model.actualValue.name)) {
							    configuredValues[that.model.actualValue.name] = bbdesigner$(that.element).find(".e-value").
                            html();                              
                            }
                            if (!that._isNullOrEmptyOrUndefined(that.model.targetValue.name)) {
                                configuredValues[that.model.targetValue.name] = bbdesigner$(that.element).find(".e-value").html();								
                            }
                            if (!BoldBIDashboard.isNullOrUndefined(that.model.additionalValue) && !that._isNullOrEmptyOrUndefined(that.model.additionalValue.value)) {
							    configuredValues[that.model.additionalValue.name] = additionalData;							
							}							
							tooltipText = that._renderingToopTipTemplate(configuredValues);
                            bounds = that._measureText(tooltipText, that._tooltipTarget.width(), "Normal 14 " + that._tooltipTarget.css("font-family"));
                        }
                    }
                } else {
                    tooltipText = that._tooltipTarget.html();
                    bounds = that._measureText(tooltipText, that._tooltipTarget.width(), "Normal 14 " + that._tooltipTarget.css("font-family"));
                }
				if(bounds.width > 400) {
					
					bounds.width = 400;
				}
                tooltip.html(tooltipText).css({ "top": evt.clientY + bounds.height + twentyEight > bbdesigner$(window).height() ? evt.clientY - bounds.height : evt.clientY + eighteen + "px", "left": evt.clientX + bounds.width > bbdesigner$(window).width() ? evt.clientX - bounds.width - twenty + "px" : evt.clientX + five + "px", "z-index": 10000 }).
                fadeIn();
                var browserInfo = BoldBIDashboard.browserInfo();
                if (browserInfo.name === "msie") {
					tooltip.css({ "position": "-ms-page" });
                }
            }, threeHundred);
            evt.stopPropagation();
            evt.bubbles = false;
        },

        _hideToolTip: function () {
            if (this._tooltipTimer) {
                clearTimeout(this._tooltipTimer);
			}
            this._tooltipTarget = null;
            bbdesigner$("#" + this._proxy + "_toolTip").fadeOut();
        },
        //_orginalSparklineBgColor: function (evt) {
        //    var sparklineData = bbdesigner$(evt.target).parents(".e-card").find(".e-sparkline").data("BoldBIDashboardSparkline");
        //    if (!BoldBIDashboard.isNullOrUndefined(sparklineData)) {
        //        sparklineData.model.background = this.model.sparkLine.BackgroundColor;
        //        sparklineData.redraw();
        //    }
        //},

        //_changeSparklineBgColor: function (evt) {
        //    var sparklineData = bbdesigner$(evt.target).parents(".e-card").find(".e-sparkline").data("BoldBIDashboardSparkline");
        //    if (!BoldBIDashboard.isNullOrUndefined(sparklineData)) {
        //        sparklineData.model.background = "#F7F7F7";
        //        sparklineData.redraw();
        //    }
        //},

        _cardResize: function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            if (this.resizeTo) {
				clearTimeout(this.resizeTo);
            }
            var that = this,
				five = 5,
				sixHundred = 600;
            this.resizeTo = setTimeout(function () {
                evt.bubbles = false;
                if (!that.model.enableResize) {

					return;
                }
                if (that._parentWidth !== bbdesigner$(that.element).parent().
                    width() || that._parentHeight !== bbdesigner$(that.element).parent().
                    height()) {
                    that._width = bbdesigner$(that.element).parent().
                    width();
                    that._height = bbdesigner$(that.element).parent().
                    height();
                    bbdesigner$(that.element).css({ "width": that._width - five, "height": that._height });
                    that._parentWidth = bbdesigner$(that.element).parent().
                    width();
                    that._parentHeight = bbdesigner$(that.element).parent().
                    height();
                    that._setFontSize();
                }
                that._reDrawKPI();
            }, sixHundred);
        },

        _selectedHandler: function (evt) {
			var that = this;
		this.singleTimer = setTimeout(function(){
			var args = {};
            if (that.model.selected) {
				args = {name: that.element.attr("id"), targetValue: that.model.targetValue, actualValue: that.model.actualValue, currentTarget: bbdesigner$("#" + that._proxy), currentValue: that.model.customHeader.value !== "" ? that.model.customHeader.value : that.model.actualValue.text + " vs " + that.model.targetValue.text, ctrlKey: evt.ctrlKey },
                that._trigger("selected", args);
                evt.stopPropagation();
                evt.bubbles = false;
            }
			},400);
        },
		 _doubleClickHandler: function (evt) {
			
			clearTimeout(this.singleTimer);
			var args = {};
		    args = {name: this.element.attr("id"), targetValue: this.model.targetValue, actualValue: this.model.actualValue, currentTarget: bbdesigner$("#" + this._proxy), currentValue: this.model.customHeader.value !== "" ? this.model.customHeader.value : this.model.actualValue.text + " vs " + this.model.targetValue.text, ctrlKey: evt.ctrlKey, type: evt.type },
		    this._trigger("doubleClick", args);	
        },
		 _rightClickHandler: function (evt) {
			var args = {};
			if(this.model.enableRightClick) {
				args = {name: this.element.attr("id"), targetValue: this.model.targetValue, actualValue: this.model.actualValue, currentTarget: bbdesigner$("#" + this._proxy), currentValue: this.model.customHeader.value !== "" ? this.model.customHeader.value : this.model.actualValue.text + " vs " + this.model.targetValue.text, ctrlKey: evt.ctrlKey, type: evt.type },
				this._trigger("rightClick", args);
			}
        }

    });
    BoldBIDashboard.Card.Format = {
        Number: "number",
        Currency: "currency",
        Percentage: "percentage"
    };
    BoldBIDashboard.Card.AbbreviationTypes = {
        Auto: "auto",
        Ones: "ones",
        Thousands: "thousands",
		Lakhs: "lakhs",
        Millions: "millions",
		Crores: "crores",
        Billions: "billions"
    };
    BoldBIDashboard.Card.VariationTypes = {
        Absolute: "absolute",
        PercentOfDifference: "percentofdifference",
        PercentOfTarget: "percentoftarget",
		ActualValue: "actualvalue",
		PercentOfChange:"percentofchange"
    };
    BoldBIDashboard.Card.BackgroundType = {
        None: "none",
        Full: "fullbackground",
        Image: "image"
    };
    BoldBIDashboard.Card.TextAlign = {
        Right: "right",
        Centre: "center",
        Left: "left"
    };
    BoldBIDashboard.Card.BrowserType = {
        IE: "Internet Explorer",
        Chrome: "Google Chrome",
        FireFox: "Mozilla FireFox"
    };
    BoldBIDashboard.Card.AdjustFont = {
        Height: "height",
        Width: "width",
        Both: "both"
    };
    BoldBIDashboard.Card.SecondaryValueType = {
        Variance: "variance",
        Target: "target"
    };
    BoldBIDashboard.Card.NegativeValueFormat = {
        Default: "default",
        NoNegativeSignWithBracket: "nonegativesignwithbracket",
        NegativeSignInSuffix: "negativesigninsuffix"
    };
})(bbdesigner$, SyncfusionBoldBIDashboard);
;;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BoldBIDashboardSparkline;
(function (BoldBIDashboardSparkline) {
    (function (Type) {
        Type[Type["Line"] = "line"] = "Line";
        Type[Type["Column"] = "column"] = "Column";
        Type[Type["Area"] = "area"] = "Area";
        Type[Type["WinLoss"] = "winloss"] = "WinLoss";
        Type[Type["Pie"] = 'pie'] = "Pie";
    })(BoldBIDashboardSparkline.Type || (BoldBIDashboardSparkline.Type = {}));
    var Type = BoldBIDashboardSparkline.Type;
    (function (Themes) {
        Themes[Themes["flatlight"] = "flatlight"] = "flatlight";
        Themes[Themes["azurelight"] = "azurelight"] = "azurelight";
        Themes[Themes["limelight"] = "limelight"] = "limelight";
        Themes[Themes["saffronlight"] = "saffronlight"] = "saffronlight";
        Themes[Themes["gradientlight"] = "gradientlight"] = "gradientlight";
        Themes[Themes["flatdark"] = "flatdark"] = "flatdark";
        Themes[Themes["azuredark"] = "azuredark"] = "azuredark";
        Themes[Themes["limedark"] = "limedark"] = "limedark";
        Themes[Themes["saffrondark"] = "saffrondark"] = "saffrondark";
        Themes[Themes["gradientdark"] = "gradientdark"] = "gradientdark";
    })(BoldBIDashboardSparkline.Themes || (BoldBIDashboardSparkline.Themes = {}));
    var Themes = BoldBIDashboardSparkline.Themes;
    (function (bbdesigner$) {
        var Sparkline = (function (_super) {
            __extends(Sparkline, _super);
            function Sparkline(id, options) {
                _super.call(this);
                this.defaults = {
                    locale: null,
                    enableGroupSeparator: false,
                    enableCanvasRendering: false,
                    padding: 8,
                    palette: ["#8A2BE2", "#ff1a75", "#99cc00", "#4d4dff", "#660066", "#FFA500", "#FFD700", "#FF00FF", "#808000", "#990000"],
                    isResponsive: true,
                    dataSource: null,
                    xName: "",
                    yName: "",
                    type: Type.Line,
                    width: 1,
                    stroke: null,
                    opacity: 1,
                    fill: "#33ccff",
                    border: {
                        color: "transparent",
                        width: 1,
                    },
                    rangeBandSettings: {
                        startRange: null,
                        endRange: null,
                        opacity: 0.4,
                        color: "transparent"
                    },
                    highPointColor: null,
                    lowPointColor: null,
                    negativePointColor: null,
                    startPointColor: null,
                    endPointColor: null,
                    tooltip: {
                        visible: false,
                        template: null,
                        fill: "white",
                        border: {
                            width: 1,
                            color: null,
                        },
                        font: {
                            fontFamily: "Segoe UI",
                            fontStyle: "Normal",
                            fontWeight: "Regular",
                            color: "#111111",
                            opacity: 1,
                            size: "8px"
                        }
                    },
                    markerSettings: {
                        visible: false,
                        fill: null,
                        width: 2,
                        opacity: 1,
                        border: {
                            color: "white",
                            width: 1,
                        }
                    },
                    background: "transparent",
                    size: {
                        height: "",
                        width: ""
                    },
                    axisLineSettings: {
                        visible: false,
                        color: "#111111",
                        width: 1,
                        dashArray: "",
                    },
                    theme: Themes.flatlight,
                    load: null,
                    loaded: null,
                    doubleClick: null,
                    rightClick: null,
                    click: null,
                    sparklineMouseMove: null,
                    sparklineMouseLeave: null,
                    seriesRendering: null,
                    pointRegionMouseMove: null,
                    pointRegionMouseClick: null,
                    tooltipInitialize: null,
                };
                this.dataTypes = {
                    dataSource: "data",
                    palette: "array",
                    type: "enum",
                    theme: "enum",
                };
                this.model = null;
                this.svgLink = "http://www.w3.org/2000/svg";
                this._id = null;
                this.negativePointIndexes = [];
                this.validTags = ['div'];
                this._id = id;
                if (!!options)
                    this.model = BoldBIDashboardSparkline.compareExtend({}, options, this.defaults);
            }
            Sparkline.prototype.isTouch = function (evt) {
                var event = evt.originalEvent ? evt.originalEvent : evt;
                if ((event.pointerType == "touch") || (event.pointerType == 2) || (event.type.indexOf("touch") > -1))
                    return true;
                return false;
            };
            Sparkline.prototype.browserInfo = function () {
                var browser = {}, clientInfo = [], browserClients = {
                    webkit: /(chrome)[ \/]([\w.]+)/i, safari: /(webkit)[ \/]([\w.]+)/i, msie: /(msie) ([\w.]+)/i,
                    opera: /(opera)(?:.*version|)[ \/]([\w.]+)/i, mozilla: /(mozilla)(?:.*? rv:([\w.]+)|)/i
                };
                for (var client in browserClients) {
                    if (browserClients.hasOwnProperty(client)) {
                        clientInfo = navigator.userAgent.match(browserClients[client]);
                        if (clientInfo) {
                            browser.name = clientInfo[1].toLowerCase();
                            browser.version = clientInfo[2];
                            if (!!navigator.userAgent.match(/Trident\/7\./)) {
                                browser.name = "msie";
                            }
                            break;
                        }
                    }
                }
                browser.isMSPointerEnabled = (browser.name == 'msie') && browser.version > 9 && window.navigator.msPointerEnabled;
                browser.pointerEnabled = window.navigator.pointerEnabled;
                return browser;
            };
            Sparkline.prototype.fadeOut = function (tooltip) {
                var op = 1;
                var timer = setInterval(function () {
                    if (op <= 0.1) {
                        clearInterval(timer);
                        tooltip.parentNode ? tooltip.parentNode.removeChild(tooltip) : tooltip;
                    }
                    tooltip.style.opacity = op;
                    tooltip.style.filter = 'alpha(opacity=' + op * 100 + ")";
                    op -= op * 0.1;
                }, 50);
            };
            Sparkline.prototype._setModel = function (options) {
                for (var prop in options) {
                    var bbdesigner$content;
                    switch (prop) {
                        default:
                            BoldBIDashboardSparkline.deepExtend(true, this.model, {}, options[prop]);
                    }
                }
                this.redraw();
            };
            Sparkline.prototype.unBindEvents = function () {
                var sparklineEle = document.getElementById(this.rootId), insideEvents = "", browserInfo = this.browserInfo(), isPointer = browserInfo.isMSPointerEnabled, isIE11Pointer = browserInfo.pointerEnabled, touchStopEvent = isPointer ? (isIE11Pointer ? "pointerup" : "MSPointerUp") : "touchend mouseup", touchMoveEvent = isPointer ? (isIE11Pointer ? "pointermove" : "MSPointerMove") : "touchmove mousemove";
                insideEvents = touchStopEvent + " " + touchMoveEvent;
                insideEvents = insideEvents.split(" ");
                for (var event in insideEvents) {
                    sparklineEle.removeEventListener(insideEvents[event], this.sparkMouseMove);
                }
                sparklineEle.removeEventListener("mouseout", this.sparkMouseLeave);
            };
            Sparkline.prototype.bindClickEvents = function (ele) {
                this.sparkClick = this.sparkClick.bind(this);
                if (BoldBIDashboard.isTouchDevice()) {
                    this.sparkTouchStart = this.sparkTouchStart.bind(this);
                    ele.addEventListener("touchend", this.sparkClick);
                    ele.addEventListener("touchstart", this.sparkTouchStart);
                }
                else {
                    this.sparkDoubleClick = this.sparkDoubleClick.bind(this);
                    this.sparkRightClick = this.sparkRightClick.bind(this);
                    ele.addEventListener("click", this.sparkClick);
                    ele.addEventListener("dblclick", this.sparkDoubleClick);
                    ele.addEventListener("contextmenu", this.sparkRightClick);
                }
            };
            Sparkline.prototype.unBindClickEvents = function (ele) {
                if (BoldBIDashboard.isTouchDevice()) {
                    ele.removeEventListener("touchend", this.sparkClick);
                    ele.removeEventListener("touchstart", this.sparkTouchStart);
                }
                else {
                    ele.removeEventListener("click", this.sparkClick);
                    ele.removeEventListener("dblclick", this.sparkDoubleClick);
                    ele.removeEventListener("contextmenu", this.sparkRightClick);
                }
            };
            Sparkline.prototype.bindEvents = function (ele) {
                this.sparkMouseMove = this.sparkMouseMove.bind(this);
                this.sparkMouseLeave = this.sparkMouseLeave.bind(this);
                var insideEvents = "", browserInfo = this.browserInfo(), isPointer = browserInfo.isMSPointerEnabled, isIE11Pointer = browserInfo.pointerEnabled, touchStopEvent = isPointer ? (isIE11Pointer ? "pointerup" : "MSPointerUp") : "touchend mouseup", touchMoveEvent = isPointer ? (isIE11Pointer ? "pointermove" : "MSPointerMove") : "touchmove mousemove";
                insideEvents = touchStopEvent + " " + touchMoveEvent;
                insideEvents = insideEvents.split(" ");
                for (var event in insideEvents) {
                    ele.addEventListener(insideEvents[event], this.sparkMouseMove);
                }
                ele.addEventListener("mouseout", this.sparkMouseLeave);
            };
            Sparkline.prototype.sparkTouchStart = function (event) {
                this._longPressTimer = new Date();
            };
            Sparkline.prototype.sparkClick = function (event) {
                var end = new Date();
                if (this.model.click != null)
                    this._trigger("click", { data: { event: event } });
                if (BoldBIDashboard.isTouchDevice() && event.type != 'click') {
                    if (this._doubleTapTimer != null && ((end - this._doubleTapTimer) < 300))
                        this.sparkDoubleClick(event);
                    this._doubleTapTimer = end;
                    if (this._longPressTimer != null && end - this._longPressTimer > 1000)
                        this.sparkRightClick(event);
                }
            };
            Sparkline.prototype.sparkDoubleClick = function (event) {
                if (this.model.doubleClick != null)
                    this._trigger("doubleClick", { data: { event: event } });
            };
            Sparkline.prototype.sparkRightClick = function (event) {
                if (this.model.rightClick != null)
                    this._trigger("rightClick", { data: { event: event } });
            };
            Sparkline.prototype.sparkMouseMove = function (evt) {
                var isTouch = this.isTouch(evt);
                if (!(isTouch && (evt.type.toString().toLowerCase().indexOf("move") > -1))) {
                    var model = this.model, currentObj = this, locale = model.locale, localizedText = locale && model.enableGroupSeparator, tooltipXValue, tooltipYValue, pointsLocations = this.visiblePoints, markerId = this.container.id + "_markerExplode", pointIndex, text, labelText, markerOptions, tooltipOptions, textOptions, textPad = model.enableCanvasRendering ? 0 : 3, tooltipShape = '', tooltipHeight, tooltipWidth, eventArgs, tooltip, markerFill, containerHeight = parseInt(model.size.height), containerWidth = parseInt(model.size.width), font = model.tooltip.font, xFormat = "#point.x#", yFormat = "#point.y#", tooltipId = this.container.id + "_tooltip", tracker = document.getElementById(tooltipId), trackerPosX, tooltipBorder = model.tooltip.border.color, trackballOptions, rootele = document.getElementById(this.container.id), height = rootele.clientHeight, parent = rootele.parentNode, offset = rootele.getClientRects()[0], trackerTop = offset.top, trackerLeft = offset.left, mouseX = evt.clientX || (evt.changedTouches ? evt.changedTouches[0].clientX : evt.touches ? evt.touches[0].clientX : 0), mouseY = evt.clientY || (evt.changedTouches ? evt.changedTouches[0].clientY : evt.touches ? evt.touches[0].clientY : 0), trackerPositions = pointsLocations.map(function (obj) { return obj['location']['X'] + offset.left; }), tooltipPos = pointsLocations.map(function (obj) { return obj['location']['markerPos'] + offset.top; }), temp = Infinity, measure = this.measureText, pad, spMarker = this.model.markerSettings, mousePos, canvasTracker, canvasContext, canvasOptions, X, Y, canTracker = document.getElementById(this.container.id + "_canvasTracker");
                    for (var i = 0, diff, len = trackerPositions.length; i < len; i++) {
                        diff = Math.abs(mouseX - trackerPositions[i]);
                        if (temp > diff) {
                            temp = diff;
                            mousePos = trackerPositions[i];
                            this.pointIndex = i;
                        }
                    }
                    if ((mouseX > trackerLeft && mouseX < (trackerLeft + offset.width)) && (mouseY > trackerTop && mouseY < (trackerTop + offset.height))) {
                        temp = pointsLocations[this.pointIndex]['location'];
                        var trackTooltipModify = function (text) {
                            pad = text.length / 2;
                            var size = measure(text, font);
                            tooltipHeight = size.height + 4;
                            tooltipWidth = size.width + pad;
                            X = temp['X'];
                            Y = temp['markerPos'];
                            if ((Y - tooltipHeight / 2) < 0)
                                Y += (tooltipHeight / 2);
                            else if ((Y + tooltipHeight / 2) > containerHeight)
                                Y -= (tooltipHeight / 2);
                            if ((X + tooltipWidth + (tooltipWidth / 10)) > (containerWidth - model.padding)) {
                                X = (temp['X'] - Number(model.markerSettings.width) - Number(model.markerSettings.border.width) - 4);
                                tooltipShape = 'M ' + (X) + " " + temp['markerPos'] + " L " + (X - tooltipWidth / 10) + " " + (Y - 4) + " L " + (X - tooltipWidth / 10) + " " + (Y - (tooltipHeight / 2)) + " L " + (X - tooltipWidth - tooltipWidth / 10) + " " + (Y - (tooltipHeight / 2)) + " L " + (X - tooltipWidth - tooltipWidth / 10) + " " + (Y + (tooltipHeight / 2)) + " L " + (X - tooltipWidth / 10) + " " + (Y + (tooltipHeight / 2)) + " L " + (X - tooltipWidth / 10) + " " + (Y + 4) + " Z";
                            }
                            else {
                                X = (temp['X'] + Number(model.markerSettings.width) + Number(model.markerSettings.border.width) + 4);
                                tooltipShape = 'M ' + (X) + " " + temp['markerPos'] + " L " + (X + tooltipWidth / 10) + " " + (Y - 4) + " L " + (X + tooltipWidth / 10) + " " + (Y - (tooltipHeight / 2)) + " L " + (X + tooltipWidth + tooltipWidth / 10) + " " + (Y - (tooltipHeight / 2)) + " L " + (X + tooltipWidth + tooltipWidth / 10) + " " + (Y + (tooltipHeight / 2)) + " L " + (X + tooltipWidth / 10) + " " + (Y + (tooltipHeight / 2)) + " L " + (X + tooltipWidth / 10) + " " + (Y + 4) + " Z";
                            }
                        };
                        if (model.tooltip.template == null || model.tooltip.template == "") {
                            tooltipXValue = localizedText && temp['Xval'] ? temp['Xval'].toLocaleString(locale) : temp['Xval'];
                            tooltipYValue = localizedText && temp['Yval'] ? temp['Yval'].toLocaleString(locale) : temp['Yval'];
                            labelText = " X : " + tooltipXValue + " Y : " + tooltipYValue + " ";
                            trackTooltipModify(labelText);
                        }
                        pointIndex = this.pointIndex;
                        if (this.prevMousePos == undefined) {
                            this.prevMousePos = mousePos;
                        }
                        var checkPointFill = function (index) {
                            var mFill, highIndex = currentObj.highPointIndex, lowIndex = currentObj.lowPointIndex, negatives = currentObj.negativePointIndexes, startIndex = currentObj.startPointIndex, endIndex = currentObj.endPointIndex;
                            if (index == highIndex)
                                mFill = model.highPointColor;
                            else if (index == lowIndex)
                                mFill = model.lowPointColor;
                            else if (index == startIndex && (model.startPointColor != null))
                                mFill = model.startPointColor;
                            else if (index == endIndex && (model.endPointColor != null))
                                mFill = model.endPointColor;
                            else if (negatives.indexOf(index) >= 0 && model.negativePointColor != null)
                                mFill = model.negativePointColor;
                            else
                                mFill = spMarker.fill ? spMarker.fill : model.fill;
                            return mFill;
                        };
                        if (tracker || canTracker) {
                            if (this.prevMousePos != mousePos) {                                
                                this.prevMousePos = mousePos;
                                markerFill = checkPointFill(pointIndex);
                                markerOptions = {
                                    'id': markerId,
                                    'cx': temp['X'],
                                    'cy': temp['markerPos'],
                                    'r': Number(spMarker.width),
                                    'fill': spMarker.border.color,
                                    'stroke': markerFill,
                                    'stroke-width': Number(spMarker.border.width),
                                };
                                if (model.tooltip.template == null || model.tooltip.template == "") {
                                    tooltipOptions = {
                                        'id': tooltipId,
                                        'fill': model.tooltip.fill,
                                        'stroke': (tooltipBorder != null) ? tooltipBorder : markerFill,
                                        'stroke-width': model.tooltip.border.width,
                                        'd': tooltipShape,
										'pointer-events': 'none'
                                    };
                                    textOptions = {
                                        'x': (temp['X'] + tooltipWidth + (tooltipWidth / 10)) > (containerWidth - model.padding) ? (X + textPad - (tooltipWidth) - (tooltipWidth / 10)) : X + textPad + (tooltipWidth / 10),
                                        'y': Y + tooltipHeight / 4,
                                        'fill': font.color,
                                        'font-size': font.size,
                                        'font-family': font.fontFamily,
                                        'font-weight': font.fontWeight,
                                        'font-style': font.fontStyle,
                                    };
                                }
                                else {
                                    var ele = document.getElementById(model.tooltip.template), html = ele.innerHTML, dataValue;
                                    if (typeof model.dataSource[pointIndex] === 'object') {
                                        dataValue = model.dataSource[pointIndex];
                                        dataValue.x = temp.Xval;
                                        dataValue.y = temp.Yval;
										dataValue.display = "block";
                                    }
                                    else {
                                        dataValue = { x: temp.Xval, y: temp.Yval };
                                    }
                                    var tooltipData = { point: dataValue }, html = this.parseTemplate(ele, tooltipData), text1 = ele.innerText, gap = Number(model.markerSettings.width), text1 = this.parseTemplate(ele, tooltipData), template = measure(text1, font), toolX = temp['X'] + Number(spMarker.width) + Number(spMarker.border.width) + gap;
                                    Y = (trackerTop + temp['markerPos'] - template['height'] / 2);
                                    X = (trackerLeft + toolX);                                    
                                    tooltipOptions = {
                                        'background': model.tooltip.fill,
                                        'border': model.tooltip.border.width + 'px solid ' + ((tooltipBorder != null) ? tooltipBorder : markerFill),
                                        'left': X + 'px',
                                        'top': Y + 'px',
										'pointer-events': 'none'
                                    };
                                    tooltip = document.getElementById(tooltipId),
                                        tooltip.innerHTML = html;
                                    this.setStyles(tooltipOptions, tooltip);
									var tooltipTextWidth = measure(tooltip.textContent, font).width + (tooltip.textContent.length / 2);
									if ((toolX + tooltipTextWidth) > (containerWidth - model.padding)){
                                        X = X - tooltipTextWidth -((Number(spMarker.width) + Number(spMarker.border.width) + gap) * 2) ;
										tooltipOptions.left = X + 'px';
										console.log(tooltip.offsetWidth);
										this.setStyles(tooltipOptions, tooltip);
										if(!BoldBIDashboard.isNullOrUndefined(tooltip.childNodes)){
											var templateWidth = tooltip.childNodes[0].offsetWidth;
											var difference = templateWidth - tooltipTextWidth;
											tooltipOptions.left =  X - difference + 'px';
											this.setStyles(tooltipOptions, tooltip);
										}
								    }
									if ((temp['markerPos'] - tooltip.offsetHeight) < model.padding){
                                      Y = Y - (tooltip.offsetHeight/2);
									  tooltipOptions.top = Y + 'px';
									  this.setStyles(tooltipOptions, tooltip);
									}
									else if ((temp['markerPos'] + tooltip.offsetHeight) > (containerHeight - model.padding)){
                                        Y = Y - (tooltip.offsetHeight/2) ;
										tooltipOptions.top = Y + 'px';
									    this.setStyles(tooltipOptions, tooltip) ;
									}
                                }
								eventArgs = {
                                    data: {
                                        "pointIndex": pointIndex,
                                        "currentText": labelText,
                                        "location": temp
                                    }
                                };
								if (this.model.tooltipInitialize != null)
									this._trigger("tooltipInitialize", eventArgs);
									trackerPosX = (temp['X'] - (model.width / 2));
                                if (labelText != eventArgs.data.currentText && !eventArgs.cancel) {
									labelText = eventArgs.data.currentText;
									if(model.tooltip.template == null){
										trackTooltipModify(labelText);
									}
									else{
										tooltip.innerText = eventArgs.data.currentText;
										labelText = tooltip.innerText;
									}
								}
                                if (!model.enableCanvasRendering) {
                                    var groupTooltip = document.getElementById(tooltipId + "_g");
                                    this.drawCircle(markerOptions, groupTooltip);
                                    if (model.tooltip.template == null) {
                                        this.drawPath(tooltipOptions, groupTooltip);
                                        text = rootele.getElementsByTagName('text')[0];
                                        text.textContent = labelText;
                                        this.setAttributes(textOptions, text);
                                        groupTooltip.appendChild(text);
                                    }
                                }
                                else {
                                    canvasTracker = document.getElementById(this.container.id + "_canvasTracker");
                                    canvasContext = canvasTracker.getContext('2d');
                                    canvasContext.clearRect(0, 0, containerWidth, containerHeight);
                                    this.canvasDrawCircle(markerOptions, canvasContext);
                                    if (model.tooltip.template == null || model.tooltip.template == "") {
                                        this.canvasDrawPath(tooltipOptions, canvasContext);
                                        textOptions.font = font.size + " " + font.fontFamily;
                                        this.canvasDrawText(textOptions, labelText, canvasContext);
                                    }
                                }
                            }
                        }
                        else {                            
                            var tooltipElements = document.getElementsByClassName("ej-sparkline-tooltip");
                            if (tooltipElements[0]) {
                                tooltipElements[0].parentNode.removeChild(tooltipElements[0]);
                            }
                            markerFill = checkPointFill(pointIndex);
                            markerOptions = {
                                'id': markerId,
                                'cx': temp['X'],
                                'cy': temp['markerPos'],
                                'r': Number(spMarker.width),
                                'fill': spMarker.border.color,
                                'stroke': markerFill,
                                'stroke-width': Number(spMarker.border.width),
                            };
                            if (model.tooltip.template == null || model.tooltip.template == "") {
                                tooltipOptions = {
                                    'id': tooltipId,
                                    'fill': model.tooltip.fill,
                                    'stroke': (tooltipBorder != null) ? tooltipBorder : markerFill,
                                    'stroke-width': model.tooltip.border.width,
                                    'd': tooltipShape,
									'pointer-events': 'none'
                                };
                                textOptions = {
                                    'x': (temp['X'] + tooltipWidth + (tooltipWidth / 10)) > (containerWidth - model.padding) ? (X + textPad - (tooltipWidth) - (tooltipWidth / 10)) : X + textPad + (tooltipWidth / 10),
                                    'y': Y + tooltipHeight / 4,
                                    'fill': font.color,
                                    'opacity': font.opacity,
                                    'font-size': font.size,
                                    'font-family': font.fontFamily,
                                    'font-weight': font.fontWeight,
                                    'font-style': font.fontStyle,
                                };
                            }
                            else {
                                var ele = document.getElementById(model.tooltip.template), html = ele.innerHTML, dataValue;
                                if (typeof model.dataSource[pointIndex] === 'object') {
                                    dataValue = model.dataSource[pointIndex];
                                    dataValue.x = temp.Xval;
                                    dataValue.y = temp.Yval;
									dataValue.display = "block";
                                }
                                else {
                                    dataValue = { x: temp.Xval, y: temp.Yval };
                                }
                                var tooltipData = { point: dataValue }, html = this.parseTemplate(ele, tooltipData), text1 = ele.innerText, gap = Number(model.markerSettings.width), text1 = this.parseTemplate(ele, tooltipData), template = measure(text1, font);
                                var toolX = temp['X'] + Number(spMarker.width) + Number(spMarker.border.width) + gap;
                                Y = evt.pageY;
                                X = evt.pageX + 10;
                                tooltipOptions = {
                                    'background': model.tooltip.fill,
                                    'border': model.tooltip.border.width + 'px solid ' + ((tooltipBorder != null) ? tooltipBorder : markerFill),
                                    'left': X + 'px',
                                    'top': Y + 'px',
                                    'position': 'fixed',
                                    'height': 'auto',
                                    'width': 'auto',
                                    'display': 'block',
                                    'opacity': font.opacity,
                                    'font': font.size + " " + font.fontFamily,
									'pointer-events': 'none'
                                };
                                tooltip = document.createElement('div');
                                this.setAttributes({ 'id': tooltipId, 'class': 'ej-sparkline-tooltip' }, tooltip);
                                this.setStyles(tooltipOptions, tooltip);
                                tooltip.innerHTML = html;
                                document.body.appendChild(tooltip);
								var tooltipTextWidth = measure(tooltip.textContent, font).width + (tooltip.textContent.length / 2); padding = 10;
								if (tooltip.offsetWidth < offset.width) {
                                    if (X + tooltipTextWidth > offset.x + offset.width) {
                                        tooltipOptions.left = (X - tooltipTextWidth) + 'px';
										this.setStyles(tooltipOptions, tooltip);
										if(!BoldBIDashboard.isNullOrUndefined(tooltip.childNodes)){
											var templateWidth = tooltip.childNodes[0].offsetWidth;
											tooltipOptions.left =  X - templateWidth - ((Number(spMarker.width) + Number(spMarker.border.width) + gap)) - padding + 'px';
											this.setStyles(tooltipOptions, tooltip);
										}
                                    }
                                }								
                            }
							eventArgs = {
                                data: {
                                    "pointIndex": pointIndex,
                                    "currentText": labelText,
                                    "location": temp
                                }
                            };                            
                            if (this.model.tooltipInitialize != null)
                            this._trigger("tooltipInitialize", eventArgs);
                            trackerPosX = (temp['X'] - (model.width / 2));
							if (labelText != eventArgs.data.currentText && !eventArgs.cancel) {
								labelText = eventArgs.data.currentText;
                                if(model.tooltip.template == null){
									trackTooltipModify(labelText);
								}
								else{
									tooltip.innerText = eventArgs.data.currentText;
									labelText = tooltip.innerText;
								}
							}
                            if (!model.enableCanvasRendering) {
                                var tooltipGroup = document.createElementNS(this.svgLink, "g");
                                this.setAttributes({ "id": tooltipId + "_g", 'class': 'ej-sparkline-tooltip' }, tooltipGroup);
                                this.container.appendChild(tooltipGroup);
                                this.drawCircle(markerOptions, tooltipGroup);
                                if (model.tooltip.template == null) {
                                    this.drawPath(tooltipOptions, tooltipGroup);
                                    text = this.createText(textOptions, labelText);
                                    tooltipGroup.appendChild(text);
                                }
                            }
                            else {
                                canvasTracker = document.createElement('canvas');
                                canvasOptions =
                                    {
                                        'id': this.container.id + "_canvasTracker",
                                        'fill': 'transparent',
                                        'class': 'ej-sparkline-tooltip',
                                        'height': model.size.height,
                                        'width': model.size.width,
                                    };
                                this.setAttributes(canvasOptions, canvasTracker);
                                this.setStyles({ 'left': (trackerLeft) + 'px', 'top': (trackerTop) + 'px', 'position': 'fixed' }, canvasTracker);
                                canvasContext = canvasTracker.getContext('2d');
                                this.canvasDrawCircle(markerOptions, canvasContext);
                                if (model.tooltip.template == null || model.tooltip.template == "") {
                                    this.canvasDrawPath(tooltipOptions, canvasContext);
                                    textOptions.font = font.size + " " + font.fontFamily;
                                    this.canvasDrawText(textOptions, labelText, canvasContext);
                                }
                                this.container.parentNode.appendChild(canvasTracker);
                            }
                        }
                    }
                    if (isTouch) {
                        var eleId = (model.tooltip.template == null || model.tooltip.template == "") ? ((model.enableCanvasRendering) ? (this.container.id + "_canvasTracker") : (tooltipId + "_g")) : (tooltipId);
                        var touchtooltip = document.getElementById(eleId);
                        var sparklineObj = this;
                        setTimeout(function () {
                            sparklineObj.fadeOut(touchtooltip);
                        }, 1000);
                    }
                }
            };
            Sparkline.prototype.sparkMouseLeave = function (evt) {
                var mouseX = evt.clientX || (evt.touches[0] ? evt.touches[0].clientX : evt.changedTouches[0].clientX), mouseY = evt.clientY || (evt.touches[0] ? evt.touches[0].clientY : evt.changedTouches[0].clientY), rootele = this.container, height = rootele.clientHeight, offset = rootele.getClientRects()[0], trackerTop = offset.top, trackerLeft = offset.left, model = this.model, tooltipId = this.container.id + "_tooltip", svgBounds = rootele.getClientRects()[0];
                if (model.tooltip.template != null && model.tooltip.template != "") {
                    if (evt.pageX < svgBounds.top || evt.pageX > svgBounds.top + svgBounds.width
                    || evt.pageY < svgBounds.left || evt.pageY > svgBounds.left + svgBounds.height
                    ) {
                        var tooltemp = document.getElementById(tooltipId);
                        tooltemp ? document.body.removeChild(tooltemp) : tooltemp;
                    }
                    else if ((evt.pageX < svgBounds.top || evt.pageX > svgBounds.top + svgBounds.width
                    || evt.pageY < svgBounds.left || evt.currentTarget.id == this._id) && svgBounds.height <= 20) {
                        var tooltemp = document.getElementById(tooltipId);
                        tooltemp ? document.body.removeChild(tooltemp) : tooltemp;
                    }                    
                }
                if ((mouseX < trackerLeft || mouseX > (trackerLeft + offset.width)) || (mouseY < trackerTop || mouseY > (trackerTop + offset.height)) || this.touchEnd) {
                    if (!this.model.enableCanvasRendering) {
                        var trackerId = tooltipId + "_g", tracker = document.getElementById(trackerId);
                        tracker ? this.container.removeChild(tracker) : tracker;
                    }
                    else {
                        var canEle = document.getElementById(this.container.id + '_canvasTracker');
                        canEle ? canEle.parentNode.removeChild(canEle) : canEle;
                    }
                }
            };
            Sparkline.prototype.bindPieEvents = function (ele) {
                this.pieTooltip = this.pieTooltip.bind(this);
                this.pieTooltipHide = this.pieTooltipHide.bind(this);
                var insideEvents = "", browserInfo = this.browserInfo(), isPointer = browserInfo.isMSPointerEnabled, isIE11Pointer = browserInfo.pointerEnabled, touchStopEvent = isPointer ? (isIE11Pointer ? "pointerup" : "MSPointerUp") : "touchend mouseup", touchMoveEvent = isPointer ? (isIE11Pointer ? "pointermove" : "MSPointerMove") : "touchmove mousemove";
                insideEvents = touchStopEvent + " " + touchMoveEvent;
                insideEvents = insideEvents.split(" ");
                for (var event in insideEvents) {
                    ele.addEventListener(insideEvents[event], this.pieTooltip);
                }
                ele.addEventListener("mouseout", this.pieTooltipHide);
                if (this.model.pointRegionMouseClick != null) {
                    ele.addEventListener("click", this.pieTooltip);
                    ele.addEventListener("touchstart", this.pieTooltip);
                }
            };
            Sparkline.prototype.unbindPieEvents = function () {
                var insideEvents = "", browserInfo = this.browserInfo(), isPointer = browserInfo.isMSPointerEnabled, isIE11Pointer = browserInfo.pointerEnabled, touchStopEvent = isPointer ? (isIE11Pointer ? "pointerup" : "MSPointerUp") : "touchend mouseup", touchMoveEvent = isPointer ? (isIE11Pointer ? "pointermove" : "MSPointerMove") : "touchmove mousemove", sparklineEle = document.getElementById(this.rootId);
                insideEvents = touchStopEvent + " " + touchMoveEvent;
                insideEvents = insideEvents.split(" ");
                for (var event in insideEvents) {
                    sparklineEle.removeEventListener(insideEvents[event], this.pieTooltip);
                }
                sparklineEle.removeEventListener("mouseout", this.pieTooltipHide);
            };
            Sparkline.prototype.pieTooltip = function (evt) {
                var isTouch = this.isTouch(evt);
                if (isTouch)
                    evt.stopImmediatePropagation();
                if (!(isTouch && (evt.type.toString().toLowerCase().indexOf("move") > -1))) {
                    if (this.model.sparklineMouseMove != null)
                        this._trigger("sparklineMouseMove");
                    var model = this.model, mouseX = evt.clientX || (evt.changedTouches ? evt.changedTouches[0].clientX : evt.touches ? evt.touches[0].clientX : 0), containerHeight = parseInt(model.size.height), containerWidth = parseInt(model.size.width), font = model.tooltip.font, mouseY = evt.clientY || (evt.changedTouches ? evt.changedTouches[0].clientY : evt.touches ? evt.touches[0].clientY : 0), rootele = document.getElementById(this.container.id), parent = rootele.parentNode, offset = rootele.getClientRects()[0], containerTop = offset.top, containerLeft = offset.left, visiblePos = this.visiblePoints.map(function (a) { return a['coordinates']; }), data = this.visiblePoints.map(function (a) { return a['location']; }), radius = this.visiblePoints['radius'], centerPos = this.visiblePoints['centerPos'], angles = this.visiblePoints, currStDeg, currEdDeg, sliceIndex, dx = mouseX - (centerPos.X + containerLeft), dy = mouseY - (centerPos.Y + containerTop), angle = Math.atan2(dy, dx), pietipId = this.container.id + "_pieTooltip", tooltip = document.getElementById(pietipId), tooltipOptions, tooltipBorder = model.tooltip.border.color, pointRadius = Math.sqrt(dx * dx + dy * dy), eventType = (model.pointRegionMouseClick != null) ? "pointRegionMouseClick" : (model.pointRegionMouseMove != null) ? "pointRegionMouseMove" : null, colors = model.palette, locale = model.locale, localizedText = model.enableGroupSeparator;
                    if (Math.abs(pointRadius) <= radius) {
                        for (var i = 0, len = angles.length; i < len; i++) {
                            currStDeg = angles[i]['stAng'];
                            currEdDeg = angles[i]['endAng'];
                            angle = angle < 0 ? (6.283 + angle) : angle;
                            if (angle <= currEdDeg && angle >= currStDeg) {
                                sliceIndex = i;
                                if ((eventType == "pointRegionMouseClick" && (evt.type == "click" || evt.type == "touchstart")) || eventType == "pointRegionMouseMove")
                                    this._trigger(eventType, {
                                        data: {
                                            "pointIndex": i,
                                            "seriesType": "Pie",
                                            'locationX': mouseX,
                                            'locationY': mouseY
                                        }
                                    });
                            }
                        }
                    }
                    else if (tooltip)
                        tooltip.parentNode.removeChild(tooltip);
                    if (tooltip && sliceIndex != null) {
                        var text = data[sliceIndex]['Percent'].toFixed(2);
                        text = localizedText ? "&nbsp" + parseFloat(text).toLocaleString(locale) : text + "&nbsp%&nbsp";
                        var size = this.measureText(text, font);
                        tooltipOptions = {
                            'left': mouseX + 12 + "px",
                            'top': mouseY + "px",
                            'border': model.tooltip.border.width + "px solid " + ((tooltipBorder != null) ? tooltipBorder : colors[sliceIndex % colors.length]),
                            'background-color': model.tooltip.fill,
                            'height': size.height + "px",
                            'width': size.width + "px",
                        };
                        this.setStyles(tooltipOptions, tooltip);
                        tooltip.innerHTML = text;
                    }
                    else if (sliceIndex != null) {
                        tooltip = document.createElement('div');
                        var text = data[sliceIndex]['Percent'].toFixed(2);
                        text = localizedText ? "&nbsp" + parseFloat(text).toLocaleString(locale) : text + "&nbsp%&nbsp";
                        var size = this.measureText(text, font);
                        tooltipOptions = {
                            'left': mouseX + 12 + "px",
                            'top': mouseY + "px",
                            'background-color': model.tooltip.fill,
                            'color': font.color,
                            'border': model.tooltip.border.width + "px solid " + ((tooltipBorder != null) ? tooltipBorder : colors[sliceIndex % colors.length]),
                            'height': size.height + "px",
                            'width': size.width + "px",
                            'font-size': font.size,
                            'opacity': font.opacity,
                            'font-weight': font.fontWeight,
                            'font-family': font.fontFamily,
                            'font-style': font.fontStyle,
                            'z-index': "100000",
                            'position': "fixed"
                        };
                        tooltip.setAttribute('id', pietipId);
                        this.setStyles(tooltipOptions, tooltip);
                        tooltip.innerHTML = text;
                        document.body.appendChild(tooltip);
                    }
                    if (isTouch) {
                        this.touchEnd = true;
                        var touchtooltip = document.getElementById(this.container.id + "_pieTooltip");
                        var sparklineObj = this;
                        setTimeout(function () {
                            sparklineObj.fadeOut(touchtooltip);
                        }, 500);
                    }
                }
            };
            Sparkline.prototype.pieTooltipHide = function (evt) {
                if (!this.touchEnd) {
                    if (this.model.sparklineMouseLeave != null)
                        this._trigger("sparklineMouseLeave");
                    var pietipId = this.container.id + "_pieTooltip", tooltip = document.getElementById(pietipId);
                    tooltip ? document.body.removeChild(tooltip) : tooltip;
                }
            };
            Sparkline.prototype.bindRegionEvents = function (ele) {
                this.sparklineEvent = this.sparklineEvent.bind(this);
                var browser = this.findBrowser();
                if (browser == "IE" || browser == 'firefox') {
                    ele.style['touch-action'] = 'none';
                }
                if (this.model.pointRegionMouseMove != null) {
                    ele.addEventListener("mousemove", this.sparklineEvent, true);
                    ele.addEventListener("touchmove", this.sparklineEvent, true);
                }
                if (this.model.pointRegionMouseClick != null) {
                    ele.addEventListener("click", this.sparklineEvent, true);
                    ele.addEventListener("touchstart", this.sparklineEvent, true);
                }
                if (this.model.sparklineMouseMove != null) {
                    ele.addEventListener("mousemove", this.sparklineEvent, true);
                    ele.addEventListener("touchmove", this.sparklineEvent, true);
                }
                if (this.model.sparklineMouseLeave != null) {
                    this.sparklineLeave = this.sparklineLeave.bind(this);
                    ele.addEventListener('mouseout', this.sparklineLeave, true);
                    if (browser == 'firefox') {
                        ele.addEventListener('mouseup', this.sparklineLeave, true);
                    }
                    ele.addEventListener('touchend', this.sparklineLeave, true);
                }
            };
            Sparkline.prototype.sparklineLeave = function () {
                if (this.model.sparklineMouseLeave != null)
                    this._trigger("sparklineMouseLeave");
            };
            Sparkline.prototype.sparklineEvent = function (evt) {
                if (this.model.sparklineMouseMove != null)
                    this._trigger("sparklineMouseMove");
                var model = this.model, mouseX = evt.clientX || evt.touches[0].clientX, mouseY = evt.clientY || evt.touches[0].clientY, stype = model.type, pointLoc = this.visiblePoints, rX1, rY1, rX2, rY2, width, height, rootele = document.getElementById(this.container.id), parent = rootele.parentNode, offset = rootele.getClientRects()[0], containerTop = offset.top, containerLeft = offset.left, eventType;
                eventType = (model.pointRegionMouseClick != null) ? "pointRegionMouseClick" : (model.pointRegionMouseMove != null) ? "pointRegionMouseMove" : null;
                if (stype == Type.Line || stype == Type.Area) {
                    width = 2 * (model.markerSettings.width + model.markerSettings.border.width);
                    height = width;
                    for (var i = 0, len = pointLoc.length; i < len; i++) {
                        rX1 = containerLeft + pointLoc[i]['location'].X - (width / 2);
                        rY1 = containerTop + pointLoc[i]['location'].Y - (height / 2);
                        rX2 = rX1 + width;
                        rY2 = rY1 + height;
                        if (mouseX >= rX1 && mouseX <= rX2 && mouseY >= rY1 && mouseY <= rY2) {
                            if (eventType != null)
                                this._trigger(eventType, {
                                    data: {
                                        "pointIndex": i,
                                        "seriesType": stype,
                                        'locationX': pointLoc[i]['location'].X,
                                        'locationY': pointLoc[i]['location'].Y
                                    }
                                });
                        }
                    }
                }
                else if (stype == Type.Column || stype == Type.WinLoss) {
                    width = pointLoc[0]['location'].width;
                    for (var i = 0, len = pointLoc.length; i < len; i++) {
                        height = pointLoc[i]['location'].height;
                        rX1 = containerLeft + pointLoc[i]['location'].X - (width / 2);
                        rY1 = containerTop + pointLoc[i]['location'].Y;
                        rX2 = rX1 + width;
                        rY2 = rY1 + height;
                        if (mouseX >= rX1 && mouseX <= rX2 && mouseY >= rY1 && mouseY <= rY2) {
                            if (eventType != null)
                                this._trigger(eventType, {
                                    data: {
                                        "pointIndex": i,
                                        "seriesType": stype,
                                        'locationX': pointLoc[i]['location'].X,
                                        'locationY': pointLoc[i]['location'].Y
                                    }
                                });
                        }
                    }
                }
            };
            Sparkline.prototype.findBrowser = function () {
                var browser;
                if (navigator.userAgent.indexOf("Firefox") != -1) {
                    browser = 'firefox';
                }
                else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document['documentMode'] == true)) {
                    browser = 'IE';
                }
                else {
                    browser = null;
                }
                return browser;
            };
            Sparkline.prototype.resize = function (evt) {
                var currentObj = this;
                var element = document.getElementById(this.rootId);
                if (element != null || element != undefined) {
                    window.removeEventListener("resize", this.resize);
                    this.isResized = true;
                    this._destroy();
                    this.createSvg();
                    this.renderSparkline();
                    this.isResized = false;
                }
                else {
                    window.removeEventListener("resize", this.resize);
                }
            };
            Sparkline.prototype.supportsSvg = function () {
                return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', "svg");
            };
            Sparkline.prototype._init = function (options) {
                if (this.supportsSvg()) {
                    this.rootId = (this.rootId != null) ? this.rootId : this._id;
                    this.parentElement = (this.parentElement != null) ? this.parentElement : document.getElementById(this.rootId);
                    if (this.model.load != null)
                        this._trigger("load");
                    this.setTheme(this.model);
                    this.height = parseInt(this.model.size.height);
                    this.width = parseInt(this.model.size.width);
                    this.createSvg();
                    this.renderSparkline();
                    if (this.model.loaded != null)
                        this._trigger("loaded");
                }
            };
            Sparkline.prototype.redraw = function () {
                this.emptyContainer();
				var options = {
                    "width": this.model.size.width,
                    "height": this.model.size.height,
                };
				this.setAttributes(options, this.container);
                this.renderSparkline();
				if (this.model.loaded != null)
                    this._trigger("loaded");
            };
            Sparkline.prototype.touchCheck = function (event) {
                this.touchEnd = true;
                if (this.model.type.toString().toLocaleLowerCase() != "pie") {
                    this.sparkMouseLeave(event);
                }
                else
                    this.pieTooltipHide(event);
            };
            Sparkline.prototype.emptyContainer = function () {
                var model = this.model;
                if (model.enableCanvasRendering) {
                    this.ctx.clearRect(0, 0, this.height, this.width);
                }
                else {
                    var container = this.container;
                    while (container.firstChild) {
                        container.removeChild(container.firstChild);
                    }
                }
            };
            Sparkline.prototype._destroy = function () {
                var container = document.getElementById(this.container.id);
                if (container != null) {
                    this.unBindEvents();
                    this.unbindPieEvents();
                    window.removeEventListener("resize", this.resize);
                    container.parentNode.removeChild(container);
                }
                else {
                    window.removeEventListener("resize", this.resize);
                }
            };
            Sparkline.prototype.renderSparkline = function () {
                this.setStyles({ 'background': this.model.background }, this.container);
                this.calculatePoints();
                this.seriesRender();
                this.resize = this.resize.bind(this);
                if (this.model.isResponsive) {
                    window.addEventListener("resize", this.resize);
                }
                else {
                    window.removeEventListener("resize", this.resize);
                }
                if ((this.model.type != Type.WinLoss && this.model.type != Type.Pie) && this.model.tooltip.visible)
                    this.bindEvents(this.parentElement);
                else
                    this.unBindEvents();
                if (this.model.type == Type.Pie && this.model.tooltip.visible)
                    this.bindPieEvents(this.parentElement);
                else
                    this.unbindPieEvents();
                this.bindRegionEvents(this.parentElement);
                this.unBindClickEvents(this.parentElement);
                this.bindClickEvents(this.parentElement);
            };
            Sparkline.prototype.animateSparkline = function () {
                var model = this.model, sparkObj = this, stype = model.type, padding = model.padding, axisHeight = this.axisHeight, width = parseInt(model.size.width), height = parseInt(model.size.height), i, temp, timer, def = document.createElementNS(this.svgLink, "defs"), clipRect = document.createElementNS(this.svgLink, "clipPath"), animOption, clipOption, rect;
                if (stype == Type.Pie)
                    rect = document.createElementNS(this.svgLink, "path");
                else
                    rect = document.createElementNS(this.svgLink, "rect");
                if (stype == Type.Line || stype == Type.Area) {
                    animOption = {
                        "id": "clipRectSparkline",
                        "x": 0,
                        "y": 0,
                        "width": 0,
                        "height": height
                    };
                    timer = width / 10;
                    var animater = setInterval(animate, 120);
                    i = timer;
                }
                else if (stype == Type.Column || stype == Type.WinLoss) {
                    if (axisHeight == padding) {
                        animOption = {
                            "id": "clipRectSparkline",
                            "x": 0,
                            "y": 0,
                            "width": width,
                            "height": 0
                        };
                        timer = height / 10;
                        i = timer;
                        var ngtiveRectAnimater = setInterval(animateNegtiveRect, 120);
                    }
                    else if (axisHeight == (height - padding)) {
                        animOption = {
                            "id": "clipRectSparkline",
                            "x": 0,
                            "y": height,
                            "width": width,
                            "height": 0
                        };
                        timer = height / 10;
                        i = height;
                        var rectAnimater = setInterval(animateRect, 120);
                    }
                    else {
                        animOption = {
                            "id": "clipRectSparkline",
                            "x": 0,
                            "y": axisHeight,
                            "width": width,
                            "height": 0
                        };
                        timer = height / 10;
                        i = axisHeight;
                        var upperAnimater = setInterval(animateUpper, 120);
                    }
                }
                else {
                    var values = this.visiblePoints, centerPos = values['centerPos'], area = values['radius'], deg, stRad, edRad, pathArc = "", stDeg = 90, edDeg = 0, flag;
                    i = 0;
                    animOption = {
                        "id": "clipRectSparkline",
                        "d": pathArc,
                    };
                    var pieAnimater = setInterval(pieAnimate, 120);
                }
                clipOption = {
                    "id": this.container.id + "_sparklineRect",
                };
                this.setAttributes(animOption, rect);
                this.setAttributes(clipOption, clipRect);
                clipRect.appendChild(rect);
                def.appendChild(clipRect);
                this.container.appendChild(def);
                function animate() {
                    if (i <= width) {
                        rect.setAttribute("width", i.toString());
                    }
                    else {
                        clearInterval(animater);
                        sparkObj._trigger("animationComplete");
                    }
                    i = i + timer;
                }
                function animateRect() {
                    temp = height - i;
                    if (i >= 0) {
                        rect.setAttribute("y", i.toString());
                        rect.setAttribute("height", temp);
                    }
                    else {
                        clearInterval(rectAnimater);
                        sparkObj._trigger("animationComplete");
                    }
                    i = i - timer;
                }
                ;
                function animateNegtiveRect() {
                    if (i <= height) {
                        rect.setAttribute("height", i.toString());
                    }
                    else {
                        clearInterval(ngtiveRectAnimater);
                        sparkObj._trigger("animationComplete");
                    }
                    i = i + timer;
                }
                ;
                function animateUpper() {
                    temp = (axisHeight - i) * 2;
                    if (i >= -timer) {
                        rect.setAttribute("y", i < 0 ? 0 : i.toString());
                        rect.setAttribute("height", temp);
                    }
                    else {
                        clearInterval(upperAnimater);
                        sparkObj._trigger("animationComplete");
                    }
                    i = i - timer;
                }
                ;
                function pieAnimate() {
                    if (i <= (values.length - 1)) {
                        stDeg = 90;
                        deg = values[i]['location']['Degree'];
                        edDeg += deg + (i == 0 ? stDeg : 0);
                        stRad = (stDeg - 90) * Math.PI / 180.0;
                        edRad = (edDeg - 90) * Math.PI / 180.0;
                        if (i == values.length - 1)
                            edRad -= 0.0001;
                        temp = { sX: centerPos.X + (area * Math.cos(stRad)), sY: centerPos.Y + (area * Math.sin(stRad)), eX: centerPos.X + (area * Math.cos(edRad)), eY: centerPos.Y + (area * Math.sin(edRad)) };
                        pathArc = "M " + centerPos.X + " " + centerPos.Y + " L " + temp.eX + " " + temp.eY + " A " + area + " " + area + " 0 " + 1 + ",0 " + temp.sX + " " + temp.sY + " Z";
                        rect.setAttribute("d", pathArc);
                    }
                    else {
                        clearInterval(pieAnimater);
                        sparkObj._trigger("animationComplete");
                    }
                    i += 1;
                }
            };
            Sparkline.prototype.setTheme = function (model) {
                var theme = model.theme, defaults = this.defaults;
                if (theme == Themes.flatdark) {
                    model.background = (model.background == defaults.background) ? "#111111" : model.background;
                    model.fill = (model.fill == defaults.fill) ? "#B5B5B5" : model.fill;
                    model.stroke = (model.stroke == defaults.stroke) ? "#F6D321" : model.stroke;
                    model.axisLineSettings.color = (model.axisLineSettings.color) == defaults.axisLineSettings.color ? "#AAAAAA" : model.axisLineSettings.color;
                }
                else if (theme == Themes.gradientlight) {
                    model.background = (model.background == defaults.background) ? "transparent" : model.background;
                    model.fill = (model.fill == defaults.fill) ? "#F34649" : model.fill;
                    model.stroke = (model.stroke == defaults.stroke) ? "#597B15" : model.stroke;
                    model.axisLineSettings.color = (model.axisLineSettings.color) == defaults.axisLineSettings.color ? "#8E8E8E" : model.axisLineSettings.color;
                }
                else if (theme == Themes.gradientdark) {
                    model.background = (model.background == defaults.background) ? "#111111" : model.background;
                    model.fill = (model.fill == defaults.fill) ? "#005378" : model.fill;
                    model.stroke = (model.stroke == defaults.stroke) ? "#6A9319" : model.stroke;
                    model.axisLineSettings.color = (model.axisLineSettings.color) == defaults.axisLineSettings.color ? "#AAAAAA" : model.axisLineSettings.color;
                }
                else if (theme == Themes.azuredark) {
                    model.background = (model.background == defaults.background) ? "#111111" : model.background;
                    model.fill = (model.fill == defaults.fill) ? "#007fff" : model.fill;
                    model.stroke = (model.stroke == defaults.stroke) ? "#f0ffff" : model.stroke;
                    model.axisLineSettings.color = (model.axisLineSettings.color) == defaults.axisLineSettings.color ? "#336699" : model.axisLineSettings.color;
                }
                else if (theme == Themes.azurelight) {
                    model.background = (model.background == defaults.background) ? "transparent" : model.background;
                    model.fill = (model.fill == defaults.fill) ? "#336699" : model.fill;
                    model.stroke = (model.stroke == defaults.stroke) ? "#007fff" : model.stroke;
                    model.axisLineSettings.color = (model.axisLineSettings.color) == defaults.axisLineSettings.color ? "#336699" : model.axisLineSettings.color;
                }
                else if (theme == Themes.limedark) {
                    model.background = (model.background == defaults.background) ? "#111111" : model.background;
                    model.fill = (model.fill == defaults.fill) ? "#238f23" : model.fill;
                    model.stroke = (model.stroke == defaults.stroke) ? "#32CD32" : model.stroke;
                    model.axisLineSettings.color = (model.axisLineSettings.color) == defaults.axisLineSettings.color ? "#43da21" : model.axisLineSettings.color;
                }
                else if (theme == Themes.limelight) {
                    model.background = (model.background == defaults.background) ? "transparent" : model.background;
                    model.fill = (model.fill == defaults.fill) ? "#238f23" : model.fill;
                    model.stroke = (model.stroke == defaults.stroke) ? "#32CD32" : model.stroke;
                    model.axisLineSettings.color = (model.axisLineSettings.color) == defaults.axisLineSettings.color ? "#43da21" : model.axisLineSettings.color;
                }
                else if (theme == Themes.saffrondark) {
                    model.background = (model.background == defaults.background) ? "#111111" : model.background;
                    model.fill = (model.fill == defaults.fill) ? "#ffaa33" : model.fill;
                    model.stroke = (model.stroke == defaults.stroke) ? "#ffdba9" : model.stroke;
                    model.axisLineSettings.color = (model.axisLineSettings.color) == defaults.axisLineSettings.color ? "#ffc26e" : model.axisLineSettings.color;
                }
                else if (theme == Themes.saffronlight) {
                    model.background = (model.background == defaults.background) ? "transparent" : model.background;
                    model.fill = (model.fill == defaults.fill) ? "#ffaa33" : model.fill;
                    model.stroke = (model.stroke == defaults.stroke) ? "#ffdba9" : model.stroke;
                    model.axisLineSettings.color = (model.axisLineSettings.color) == defaults.axisLineSettings.color ? "#ffc26e" : model.axisLineSettings.color;
                }
                else if (theme == null || theme == Themes.flatlight) {
                    model.background = (model.background == defaults.background) ? "transparent" : model.background;
                    model.fill = (model.fill == defaults.fill) ? "#33ccff" : model.fill;
                    model.stroke = (model.stroke == defaults.stroke) ? "#33ccff" : model.stroke;
                    model.axisLineSettings.color = (model.axisLineSettings.color) == defaults.axisLineSettings.color ? "#FF0000" : model.axisLineSettings.color;
                }
            };
            Sparkline.prototype.createSvg = function () {
                var model = this.model, parentElement = this.parentElement.clientWidth > 0 ? this.parentElement : this.parentElement.parentElement, options, parentHeight = (parseInt(parentElement.style.height) > parentElement.clientHeight) ? parseInt(parentElement.style.height) : parentElement.clientHeight, parentWidth = (parseInt(parentElement.style.width) > parentElement.clientWidth) ? parseInt(parentElement.style.width) : parentElement.clientWidth, width = model.size.width == "" ? parentWidth : parseInt(model.size.width), height = model.size.height == "" ? parentHeight : parseInt(model.size.height);
                height = (height > 0) ? height : (parentHeight > 0) ? parentHeight : 30;
                width = this.model.isResponsive && this.isResized ? (parentWidth > 0) ? parentWidth : width : width;
                width = width <= 0 ? 50 : width;
                model.size.height = height.toString();
                model.size.width = width.toString();
                this.height = height;
                this.width = width;
                options = {
                    "id": this.rootId + "_sparkline_svg",
                    "width": width,
                    "height": height,
                };
                if (!model.enableCanvasRendering) {
                    this.container = document.createElementNS(this.svgLink, "svg");
                }
                else {
                    this.container = document.createElement("canvas");
                    this.ctx = this.container.getContext('2d');
                }
                this.setAttributes(options, this.container);
                this.parentElement.appendChild(this.container);
            };
            Sparkline.prototype.setStyles = function (Options, element) {
                var properties = Object.keys(Options), temp;
                var values = properties.map(function (property) { return Options[property]; });
                for (var i = 0, len = properties.length; i < len; i++) {
                    temp = properties[i];
                    element.style[temp] = values[i];
                }
            };
            Sparkline.prototype.setAttributes = function (Options, element) {
                var properties = Object.keys(Options);
                var values = properties.map(function (property) { return Options[property]; });
                for (var i = 0, len = properties.length; i < len; i++) {
                    element.setAttribute(properties[i], values[i]);
                }
            };
            Sparkline.prototype.getDefaultPoints = function (count) {
                var data = [], i = 1;
                for (; i <= count; i++) {
                    if ((Math.random() * 10) > 5)
                        data.push(-Math.round(Math.random() * 100));
                    data.push(Math.round(Math.random() * 100));
                }
                return data;
            };
            Sparkline.prototype.calculatePoints = function () {
                var model = this.model, stype = model.type, data = (model.dataSource != null) ? model.dataSource : this.getDefaultPoints(12), x, y, max, min, minX, maxX, visiblePoints = [], maxPointsLength = data.length, temp, sumofValues = 0;
                if (Array.isArray(data) && typeof data[0] != 'object') {
                    if (model.type == Type.Pie) {
                        for (var i = 0; i < maxPointsLength; i++) {
                            sumofValues += Math.abs(data[i]);
                        }
                    }
                    else {
                        max = Math.max.apply(null, data);
                        min = Math.min.apply(null, data);
                        minX = 0;
                        maxX = maxPointsLength - 1;
                    }
                }
                else {
                    if (model.type == Type.Pie) {
                        for (var i = 0; i < maxPointsLength; i++) {
                            sumofValues += Math.abs(data[i][model.yName]);
                        }
                    }
                    else {
                        if (!data[0][model.xName]) {
                            var x = data.map(function (z) { return z[model.yName]; });
                            max = Math.max.apply(null, x);
                            min = Math.min.apply(null, x);
                        }
                        else {
                            temp = data;
                            temp = temp.sort(function (a, b) { return a[model.yName] - b[model.yName]; });
                            max = temp[temp.length - 1][model.yName];
                            min = temp[0][model.yName];
                        }
                        if (data[0][model.xName]) {
                            temp = temp.sort(function (a, b) { return a[model.xName] - b[model.xName]; });
                            maxX = temp[temp.length - 1][model.xName];
                            minX = temp[0][model.xName];
                        }
                        else {
                            minX = 0;
                            maxX = maxPointsLength - 1;
                        }
                    }
                }
                if (model.type != Type.Pie) {
                    this.maxLength = maxPointsLength;
                    var location, padding = Number(model.padding), height = parseInt(model.size.height) - (padding * 2), width = parseInt(model.size.width) - (padding * 2), unitX = maxX - minX, unitY = max - min, unitX = unitX == 0 ? 1 : unitX;
                    unitY = unitY == 0 ? 1 : unitY;
                    this.min = min;
                    this.unitX = unitX;
                    this.minX = minX;
                    this.unitY = unitY;
                    this.max = max;
                    this.maxX = maxX;
                    var X1 = 0, Y1 = height - ((height / unitY) * (-min)), Y2, Y1 = (min < 0 && max <= 0) ? 0 : (min < 0 && max > 0) ? Y1 : height;
                    this.axisHeight = Y1 + padding;
                    if (stype != Type.WinLoss && model.axisLineSettings.visible)
                        this.drawAxis();
                }
                else
                    var percent, location;
                for (var i = 0; i < maxPointsLength; i++) {
                    if (!(data[i][model.xName]) && !(data[i][model.yName]) && (data[i][model.yName]) != 0) {
                        x = i;
                        y = data[i];
                    }
                    else if (!(data[i][model.xName])) {
                        x = i;
                        y = data[i][model.yName];
                    }
                    else {
                        x = data[i][model.xName];
                        y = data[i][model.yName];
                    }
                    if (stype == Type.Line || stype == Type.Area) {
                        Y2 = (maxPointsLength != 1) ? height - Math.round(height * ((y - min) / unitY)) : 0;
                        location = { X: (maxPointsLength != 1) ? Math.round(width * ((x - minX) / unitX)) : width / 2, Y: Y2, markerPos: Y2 };
                    }
                    else if (stype == Type.Column || stype == Type.WinLoss) {
                        var colWidth = width / maxPointsLength, calSpace = 0.5, space = (calSpace * 2);
                        colWidth -= (space);
                        X1 = (i * (colWidth + space)) + (space / 2);
                        if (stype == Type.WinLoss) {
                            var winLossFactor = 0.5, drawHeightFactor = 40;
                            Y2 = (y > 0) ? height / 4 : (y < 0) ? (height * winLossFactor) : (height * winLossFactor) - (height / drawHeightFactor);
                            location = { X: X1, Y: Y2, height: (y != 0) ? (height / 4) : height / 20, width: colWidth };
                        }
                        else {
                            var z = ((height / unitY) * (y - min));
                            var z1 = (y == min && y > 0) ? (maxPointsLength != 1 && unitY != 1) ? ((height / unitY) * (min / 2)) > height ? (height / unitY) : ((height / unitY) * (min / 2)) : (height / unitY) :
                                (y == max && y < 0 && maxPointsLength != 1 && unitY != 1) ? (height / unitY) * (-max / 2) : z;
                            Y2 = Math.abs(height - z1);
                            location = { X: X1, Y: (Y2 > Y1) ? Y1 : Y2, height: Math.abs(Y2 - Y1), width: colWidth, markerPos: (Y2 > Y1) ? (Y1 + Math.abs(Y2 - Y1)) : Y2 };
                        }
                    }
                    else if (stype == Type.Pie) {
                        percent = (Math.abs(y) / sumofValues) * 100;
                        location = {
                            Percent: percent, Degree: ((Math.abs(y) / sumofValues) * 360)
                        };
                    }
                    if (stype != Type.Pie) {
                        location.X += padding;
                        location.Y += padding;
                    }
                    if (stype != Type.WinLoss)
                        location.markerPos += padding;
                    location['Xval'] = x;
                    location['Yval'] = y;
                    visiblePoints.push({ location: location });
                }
                this.visiblePoints = visiblePoints;
            };
            Sparkline.prototype.seriesRender = function () {
                var model = this.model, visiblePoints = this.visiblePoints, points_length = visiblePoints.length, eventArgs, seriesType = model.type;
                eventArgs = {
                    data: {
                        "minX": this.minX,
                        "minY": this.min,
                        "maxX": this.maxX,
                        "maxY": this.max,
                        "xName": model.xName,
                        "yName": model.yName,
                        "pointsCount": points_length,
                        "seriesType": seriesType,
                        "visiblePoints": this.visiblePoints
                    }
                };
                if (this.model.seriesRendering != null)
                    this._trigger("seriesRendering", eventArgs);
                if (seriesType == Type.Line) {
                    this.drawLineSeries(visiblePoints);
                }
                else if (seriesType == Type.Area) {
                    this.drawAreaSeries(visiblePoints);
                }
                else if (seriesType == Type.Column) {
                    this.drawColumnSeries(visiblePoints);
                }
                else if (seriesType == Type.WinLoss) {
                    this.drawWinlossSeries(visiblePoints);
                }
                else if (seriesType == Type.Pie) {
                    this.drawPieSeries();
                }
                if (model.markerSettings.visible && (seriesType != Type.WinLoss) && (seriesType != Type.Pie))
                    this.drawMarker(visiblePoints);
                if ((model.rangeBandSettings.startRange != null) && (model.rangeBandSettings.endRange != null) && (seriesType != Type.WinLoss) && (seriesType != Type.Pie))
                    this.drawRangeBand();
            };
            Sparkline.prototype.drawPieSeries = function () {
                var model = this.model, values = this.visiblePoints;
                model.padding = (model.padding == this.defaults.padding) ? 2 : model.padding;
                var len = values.length, height = parseInt(model.size.height) - (model.padding * 2), width = parseInt(model.size.width) - (model.padding * 2), area = (height <= width) ? height / 2 : width / 2, stRad, edRad, centerPos = { X: width / 2, Y: height / 2 }, temp, pathArc, pathOptions, colors = model.palette, deg = 0, stroke = model.border.color, opacity = model.opacity, strokeWidth = model.border.width, gEle;
                values['centerPos'] = centerPos;
                values['radius'] = area;
                for (var i = 0, stDeg = 90, edDeg, flag; i < values.length; i++) {
                    stDeg += deg;
                    deg = values[i]['location']['Degree'];
                    edDeg = stDeg + deg;
                    stRad = (stDeg - 90) * Math.PI / 180.0;
                    edRad = (edDeg - 90) * Math.PI / 180.0;
                    values[i]['stAng'] = stRad;
                    values[i]['endAng'] = edRad;
                    flag = (deg < 180) ? "0" : "1";
                    temp = values[i]['coordinates'] = { sX: centerPos.X + (area * Math.cos(stRad)), sY: centerPos.Y + (area * Math.sin(stRad)), eX: centerPos.X + (area * Math.cos(edRad)), eY: centerPos.Y + (area * Math.sin(edRad)) };
                    pathArc = "M " + centerPos.X + " " + centerPos.Y + " L " + temp.eX + " " + temp.eY + " A " + area + " " + area + " 0 " + flag + ",0 " + temp.sX + " " + temp.sY + " Z";
                    pathOptions = {
                        'id': this.container.id + "_pieBase" + i,
                        'fill': colors[i % colors.length],
                        'stroke': stroke,
                        'opacity': opacity,
                        'stroke-width': strokeWidth,
                        'd': pathArc,
                        'start': edRad,
                        'end': stRad,
                        'x': centerPos.X,
                        'y': centerPos.Y,
                        'counterClockWise': flag,
                        'radius': area
                    };
                    if (model.enableCanvasRendering)
                        this.canvasDrawPath(pathOptions);
                    else {
                        gEle = this.createGroup({ "id": "sparkpieSeries" });
                        this.setStyles({ "clip-path": "url(#" + this.container.id + "_sparklineRect)" }, gEle);
                        this.container.appendChild(gEle);
                        this.drawPath(pathOptions, gEle);
                    }
                }
            };
            Sparkline.prototype.drawRangeBand = function () {
                var model = this.model, height = (parseInt(model.size.height) - model.padding * 2), width = (parseInt(model.size.width) - model.padding * 2), stValue = model.rangeBandSettings.startRange, edValue = model.rangeBandSettings.endRange, stHeight = Number(height - ((height / this.unitY) * (stValue - this.min))) + model.padding, edHeight = Number(height - ((height / this.unitY) * (edValue - this.min))) + model.padding, options;
                edHeight = edHeight > Number(height + model.padding) ? Number(height + model.padding) : edHeight < (0 + model.padding) ? (0 + model.padding) : edHeight;
                stHeight = stHeight > Number(height + model.padding) ? Number(height + model.padding) : stHeight < (0 + model.padding) ? (0 + model.padding) : stHeight;
                var path = 'M ' + model.padding + " " + stHeight + " L " + (width + Number(model.padding)) + " " + stHeight + " L " + (width + Number(model.padding)) + " " + edHeight + " L " + model.padding + " " + edHeight + " Z";
                options = {
                    'id': this.container.id + "_rangeBand",
                    'fill': model.rangeBandSettings.color,
                    'opacity': model.rangeBandSettings.opacity,
                    'stroke': "transparent",
                    'stroke-width': model.border.width,
                    'd': path,
                };
                if (model.enableCanvasRendering)
                    this.canvasDrawPath(options);
                else
                    this.drawPath(options);
            };
            Sparkline.prototype.drawAxis = function () {
                var model = this.model, height = this.axisHeight, strclr = model.axisLineSettings.color, seriesType = model.type;
                if ((seriesType != Type.WinLoss) && (seriesType != Type.Pie)) {
                    if (!model.axisLineSettings.visible)
                        strclr = 'transparent';
                    var xAxis = {
                        'id': this.container.id + "_Sparkline_XAxis",
                        'x1': 0 + model.padding,
                        'y1': height,
                        'x2': parseInt(model.size.width) - model.padding,
                        'y2': height,
                        'stroke': strclr,
                        'stroke-dasharray': model.axisLineSettings.dashArray,
                        'stroke-width': model.axisLineSettings.width,
                    };
                    if (model.enableCanvasRendering)
                        this.canvasDrawLine(xAxis);
                    else
                        this.drawLine(xAxis);
                }
            };
            Sparkline.prototype.drawColumnSeries = function (points) {
                var rectOptions, temp, model = this.model, mod = [], len = points.length, locations = BoldBIDashboardSparkline.compareExtend({}, mod, points), strwd = model.border.width, lowPos, opacity = model.opacity, highPos, fill = model.fill, stroke = model.border.color, highPointColor = model.highPointColor, lowPointColor = model.lowPointColor, startPointColor = model.startPointColor, endPointColor = model.endPointColor, negativePointColor = model.negativePointColor, gEle;
                if (highPointColor || lowPointColor) {
                    var pointsYPos = locations.map(function (a) { return a['location']['markerPos']; });
                    highPos = Math.min.apply(null, pointsYPos);
                    lowPos = Math.max.apply(null, pointsYPos);
                }
                if (model.enableCanvasRendering == false) {
                    gEle = this.createGroup({ "id": this.container.id + "sparkcolumnSeries" });
                    this.setStyles({ "clip-path": "url(#" + this.container.id + "_sparklineRect)" }, gEle);
                    this.container.appendChild(gEle);
                }
                for (var i = 0; i < len; i++) {
                    temp = points[i].location;
                    rectOptions = {
                        'id': this.container.id + "_column_series_" + i,
                        'x': temp.X,
                        'y': temp.Y,
                        'height': temp.height,
                        'width': temp.width,
                        'fill': fill,
                        'stroke': stroke,
                        'opacity': opacity,
                        "stroke-width": strwd,
                    };
                    if (temp.markerPos == highPos && highPointColor) {
                        rectOptions.fill = highPointColor;
                        this.highPointIndex = i;
                    }
                    else if (temp.markerPos == lowPos && lowPointColor) {
                        rectOptions.fill = lowPointColor;
                        this.lowPointIndex = i;
                    }
                    else if (i == 0 && startPointColor) {
                        rectOptions.fill = startPointColor;
                        this.startPointIndex = i;
                    }
                    else if ((i == (len - 1)) && endPointColor) {
                        rectOptions.fill = endPointColor;
                        this.endPointIndex = i;
                    }
                    else if (temp.markerPos >= this.axisHeight && negativePointColor) {
                        rectOptions.fill = negativePointColor;
                        this.negativePointIndexes.push(i);
                    }
                    if (model.enableCanvasRendering)
                        this.canvasDrawRectangle(rectOptions);
                    else {
                        this.drawRect(rectOptions, gEle);
                    }
                    temp.X += temp.width / 2;
                }
            };
            Sparkline.prototype.drawWinlossSeries = function (points) {
                var rectOptions, temp, model = this.model, strwd = model.border.width, padding = model.padding, stroke = model.border.color, opacity = model.opacity, tieColor = "#EE82EE", len = points.length, height = parseInt(model.size.height) - (padding * 2), gEle;
                if (model.enableCanvasRendering == false) {
                    gEle = this.createGroup({ "id": this.container.id + "sparkwinlossSeries" });
                    this.setStyles({ "clip-path": "url(#" + this.container.id + "_sparklineRect)" }, gEle);
                    this.container.appendChild(gEle);
                }
                for (var i = 0; i < len; i++) {
                    temp = points[i].location;
                    rectOptions = {
                        'id': this.container.id + "_winloss_series_" + i,
                        'x': temp.X,
                        'y': temp.Y,
                        'height': temp.height,
                        'width': temp.width,
                        'fill': (temp.Y < (height / 2 + padding)) ? (temp.Y > (height / 4 + padding)) ? tieColor : model.fill : model.negativePointColor ? model.negativePointColor : "#FF0000",
                        'stroke': stroke,
                        'opacity': opacity,
                        "stroke-width": strwd
                    };
                    if (model.enableCanvasRendering)
                        this.canvasDrawRectangle(rectOptions);
                    else {
                        this.drawRect(rectOptions, gEle);
                    }
                }
            };
            Sparkline.prototype.drawAreaSeries = function (points) {
                var linepath = "", totHeight = this.axisHeight, model = this.model, options, gEle;
                for (var i = 0, len = points.length; i < len; i++) {
                    if (i == 0) {
                        linepath = "M " + points[0].location.X + " " + totHeight + " ";
                    }
                    linepath += "L " + points[i].location.X + " " + points[i].location.Y + " ";
                    if (i == len - 1) {
                        linepath += "L " + points[i].location.X + " " + totHeight + " Z";
                    }
                }
                options = {
                    "id": this.container.id + "_area_series_fill",
                    "fill": model.fill,
                    "stroke": model.stroke ? model.stroke : model.fill,
                    'fill-opacity': model.opacity,
                    "stroke-width": model.width,
                    "d": linepath
                };
                if (model.enableCanvasRendering)
                    this.canvasDrawPath(options);
                else {
                    gEle = this.createGroup({ "id": "sparkAreaSeries" });
                    this.container.appendChild(gEle);
                    this.drawPath(options, gEle);
                    this.setStyles({ "clip-path": "url(#" + this.container.id + "_sparklineRect)" }, gEle);
                }
            };
            Sparkline.prototype.drawLineSeries = function (points) {
                var linepath = '', model = this.model, gEle;
                for (var i = 0, len = points.length; i < len; i++) {
                    if (i == 0)
                        linepath = "M " + points[0].location.X + " " + points[i].location.Y + " ";
                    linepath += "L " + points[i].location.X + " " + points[i].location.Y + " ";
                }
                var line_options = {
                    'id': this.container.id + "_Line_series",
                    'fill': 'transparent',
                    'stroke': model.stroke ? model.stroke : model.fill,
                    'opacity': model.opacity,
                    'stroke-width': model.width,
                    'd': linepath
                };
                if (model.enableCanvasRendering)
                    this.canvasDrawPath(line_options);
                else {
                    gEle = this.createGroup({ "id": "sparklineSeries" });
                    this.container.appendChild(gEle);
                    this.drawPath(line_options, gEle);
                    this.setStyles({ "clip-path": "url(#" + this.container.id + "_sparklineRect)" }, gEle);
                }
            };
            Sparkline.prototype.drawMarker = function (points) {
                var length = points.length, marker_options, marker = this.model.markerSettings, mod = [], model = this.model, locations = BoldBIDashboardSparkline.compareExtend({}, mod, points), fill = marker.fill ? marker.fill : model.fill, stroke = marker.border.color, strwid = marker.width, opacity = marker.opacity, brdwid = marker.border.width, temp, lowPos, highPos, highPointColor = model.highPointColor, lowPointColor = model.lowPointColor, startPointColor = model.startPointColor, endPointColor = model.endPointColor, negativePointColor = model.negativePointColor, gEle;
                if (model.enableCanvasRendering == false) {
                    gEle = this.createGroup({ "id": this.container.id + "sparkmarkers" });
                    this.setStyles({ "clip-path": "url(#" + this.container.id + "_sparklineRect)" }, gEle);
                    this.container.appendChild(gEle);
                }
                if (marker.visible == false || (model.type == Type.Pie || model.type == Type.WinLoss)) {
                    strwid = 0;
                    brdwid = 0;
                }
                if (highPointColor || lowPointColor) {
                    var pointsYPos = locations.map(function (a) { return a['location']['markerPos']; });
                    highPos = Math.min.apply(null, pointsYPos);
                    lowPos = Math.max.apply(null, pointsYPos);
                }
                for (var i = 0, wid; i < length; i++) {
                    temp = points[i].location;
                    wid = (temp.width != undefined) ? (temp.width / 2) : 0;
                    marker_options = {
                        'id': this.container.id + "_marker_" + i,
                        'cx': temp.X,
                        'cy': temp.markerPos,
                        'r': strwid,
                        'fill': fill,
                        'stroke': stroke,
                        'opacity': opacity,
                        'stroke-width': brdwid
                    };
                    if (temp.markerPos == highPos && highPointColor) {
                        marker_options.fill = highPointColor;
                        this.highPointIndex = i;
                    }
                    else if (temp.markerPos == lowPos && lowPointColor) {
                        marker_options.fill = lowPointColor;
                        this.lowPointIndex = i;
                    }
                    else if (i == 0 && startPointColor) {
                        marker_options.fill = startPointColor;
                        this.startPointIndex = i;
                    }
                    else if ((i == (length - 1)) && endPointColor) {
                        marker_options.fill = endPointColor;
                        this.endPointIndex = i;
                    }
                    else if (temp.markerPos > this.axisHeight && negativePointColor) {
                        marker_options.fill = negativePointColor;
                        this.negativePointIndexes.push(i);
                    }
                    if (this.model.enableCanvasRendering)
                        this.canvasDrawCircle(marker_options);
                    else
                        this.drawCircle(marker_options, gEle);
                }
            };
            Sparkline.prototype.drawLine = function (Options) {
                var svgshape = document.getElementById(Options['id']);
                if (!svgshape)
                    svgshape = document.createElementNS(this.svgLink, "line");
                this.setAttributes(Options, svgshape);
                this.container.appendChild(svgshape);
            };
            Sparkline.prototype.drawCircle = function (Options, element) {
                element = (!!element) ? element : this.container;
                var svgshape = document.getElementById(Options['id']);
                if (!svgshape)
                    svgshape = document.createElementNS(this.svgLink, "circle");
                this.setAttributes(Options, svgshape);
                element.appendChild(svgshape);
            };
            Sparkline.prototype.drawPolyLine = function (Options) {
                var svgshape = document.getElementById(Options['id']);
                if (!svgshape)
                    svgshape = document.createElementNS(this.svgLink, "polyline");
                this.setAttributes(Options, svgshape);
                this.container.appendChild(svgshape);
            };
            Sparkline.prototype.drawPath = function (Options, element) {
                element = (!!element) ? element : this.container;
                var svgshape = document.getElementById(Options['id']);
                if (!svgshape)
                    svgshape = document.createElementNS(this.svgLink, "path");
                this.setAttributes(Options, svgshape);
                element.appendChild(svgshape);
            };
            Sparkline.prototype.drawRect = function (Options, element) {
                element = (!!element) ? element : this.container;
                var svgshape = document.getElementById(Options['id']);
                if (!svgshape)
                    svgshape = document.createElementNS(this.svgLink, "rect");
                this.setAttributes(Options, svgshape);
                element.appendChild(svgshape);
            };
            Sparkline.prototype.createGroup = function (options) {
                var group = document.createElementNS(this.svgLink, "g");
                this.setAttributes(options, group);
                return group;
            };
            Sparkline.prototype.createText = function (options, label) {
                var text = document.createElementNS(this.svgLink, "text");
                this.setAttributes(options, text);
                if (label)
                    text.textContent = label;
                return text;
            };
            Sparkline.prototype.canvasDrawLine = function (options, canvasContext) {
                var context2d = canvasContext ? canvasContext : this.ctx;
                context2d.save();
                context2d.beginPath();
                context2d.lineWidth = options["stroke-width"];
                context2d.strokeStyle = options["stroke"];
                context2d.moveTo(options["x1"], options["y1"]);
                context2d.lineTo(options["x2"], options["y2"]);
                context2d.stroke();
                context2d.restore();
                this.dataURL = this.container.toDataURL();
            };
            Sparkline.prototype.canvasDrawRectangle = function (options, canvasContext) {
                var context2d = canvasContext ? canvasContext : this.ctx, canvasCtx = canvasContext ? canvasContext : this.ctx;
                context2d.save();
                context2d.beginPath();
                context2d.globalAlpha = options["opacity"];
                context2d.lineWidth = options["stroke-width"];
                var dashArray = options["stroke-dasharray"] ? options["stroke-dasharray"].split(",") : false;
                if (dashArray)
                    this.ctx.setLineDash(dashArray);
                context2d.strokeStyle = options["stroke"];
                context2d.rect(options["x"], options["y"], options["width"], options["height"]);
                if (options["fill"] == "none")
                    options["fill"] = "transparent";
                context2d.fillStyle = options["fill"];
                context2d.fillRect(options["x"], options["y"], options["width"], options["height"]);
                context2d.stroke();
                context2d.restore();
                context2d = canvasCtx;
                this.dataURL = this.container.toDataURL();
            };
            Sparkline.prototype.canvasDrawPath = function (options, canvasContext) {
                var path = options["d"];
                var dataSplit = path.split(" ");
                var borderWidth = options["stroke-width"];
                var context2d = canvasContext ? canvasContext : this.ctx, canvasCtx = canvasContext ? canvasContext : this.ctx;
                context2d.save();
                context2d.beginPath();
                context2d.globalAlpha = options["opacity"] ? options["opacity"] : options["fill-opacity"];
                var flag = true;
                context2d.lineWidth = borderWidth;
                var dashArray = options["stroke-dasharray"] ? options["stroke-dasharray"].split(",") : false;
                if (dashArray)
                    context2d.setLineDash(dashArray);
                context2d.strokeStyle = options["stroke"];
                for (var i = 0; i < dataSplit.length; i = i + 3) {
                    var x1 = parseFloat(dataSplit[i + 1]);
                    var y1 = parseFloat(dataSplit[i + 2]);
                    switch (dataSplit[i]) {
                        case "M":
                            if (!options["innerR"] && !options["cx"])
                                context2d.moveTo(x1, y1);
                            break;
                        case "L":
                            if (!options["innerR"])
                                context2d.lineTo(x1, y1);
                            break;
                        case "C":
                            context2d.bezierCurveTo(x1, y1, parseFloat(dataSplit[i + 3]), parseFloat(dataSplit[i + 4]), parseFloat(dataSplit[i + 5]), parseFloat(dataSplit[i + 6]));
                            i = i + 4;
                            break;
                        case "A":
                            if (!options["innerR"]) {
                                if (options["cx"]) {
                                    context2d.arc(options["cx"], options["cy"], options["radius"], 0, 2 * Math.PI, options["counterClockWise"]);
                                }
                                else {
                                    context2d.moveTo(options["x"], options["y"]);
                                    context2d.arc(options["x"], options["y"], options["radius"], options["start"], options["end"], options["counterClockWise"]);
                                    context2d.lineTo(options["x"], options["y"]);
                                }
                            }
                            else if (flag) {
                                context2d.arc(options["x"], options["y"], options["radius"], options["start"], options["end"], options["counterClockWise"]);
                                context2d.arc(options["x"], options["y"], options["innerR"], options["end"], options["start"], !options["counterClockWise"]);
                                flag = false;
                            }
                            i = i + 5;
                            break;
                        case "Z":
                            context2d.closePath();
                            break;
                    }
                }
                if (options["fill"] != "none" && options["fill"] != undefined) {
                    context2d.fillStyle = options["fill"];
                    context2d.fill();
                }
                if (borderWidth > 0)
                    context2d.stroke();
                context2d.restore();
                context2d = canvasCtx;
                this.dataURL = this.container.toDataURL();
            };
            Sparkline.prototype.canvasDrawCircle = function (options, canvasContext) {
                var context2d = canvasContext ? canvasContext : this.ctx, canvasCtx = canvasContext ? canvasContext : this.ctx, dashArray;
                context2d.save();
                context2d.beginPath();
                context2d.arc(options["cx"], options["cy"], options["r"], 0, 2 * Math.PI);
                context2d.fillStyle = options["fill"];
                context2d.globalAlpha = options["opacity"];
                context2d.fill();
                context2d.lineWidth = options["stroke-width"];
                dashArray = options["stroke-dasharray"] ? options["stroke-dasharray"].split(",") : false;
                if (dashArray)
                    context2d.setLineDash(dashArray);
                context2d.strokeStyle = options["stroke"];
                context2d.stroke();
                context2d.restore();
                context2d = canvasCtx;
                this.dataURL = this.container.toDataURL();
            };
            Sparkline.prototype.canvasDrawPolyline = function (options, canvasContext) {
                var context2d = canvasContext ? canvasContext : this.ctx;
                context2d.save();
                context2d.beginPath();
                var points = options["points"].split(" ");
                for (var i = 0; i < points.length - 1; i++) {
                    var point = points[i].split(",");
                    var x = point[0];
                    var y = point[1];
                    if (i == 0)
                        context2d.moveTo(x, y);
                    else
                        context2d.lineTo(x, y);
                }
                context2d.lineWidth = options["stroke-width"];
                context2d.strokeStyle = options["stroke"];
                context2d.stroke();
                context2d.restore();
                this.dataURL = this.container.toDataURL();
            };
            Sparkline.prototype.canvasDrawText = function (options, label, canvasContext) {
                var font = options['font'];
                var anchor = options["text-anchor"];
                var opacity = options["opacity"] !== undefined ? options["opacity"] : 1;
                if (anchor == "middle")
                    anchor = "center";
                var context2d = canvasContext ? canvasContext : this.ctx;
                context2d.save();
                context2d.fillStyle = options["fill"];
                context2d.font = font;
                context2d.textAlign = anchor;
                context2d.globalAlpha = opacity;
                if (options["baseline"])
                    context2d.textBaseline = options["baseline"];
                var txtlngth = 0;
                if (options["labelRotation"] == 90 && options["id"].indexOf("XLabel") != -1)
                    txtlngth = context2d.measureText(label).width;
                context2d.translate(options["x"] + (txtlngth / 2), options["y"]);
                context2d.rotate(options["labelRotation"] * Math.PI / 180);
                context2d.fillText(label, 0, 0);
                context2d.restore();
                this.dataURL = this.container.toDataURL();
            };
            Sparkline.prototype.parseTemplate = function (clonenode, point) {
                var str, values = Object.values;
                if (!Object.entries)
                    Object.entries = function(obj){
                        var properties = Object.keys(obj), i = properties.length,
                            resArray = new Array(i);
                        while (i--)
                            resArray[i] = [properties[i], obj[properties[i]]];
                        return resArray;
                    };
                str = clonenode.innerHTML;
                var properties = values ? values(point) :  (Object.keys(point).map(function(e) {
                    return point[e]
                  })), tempValues, format, style;
                tempValues = properties[0];
                for (var _i = 0, _a = Object.entries(tempValues); _i < _a.length; _i++) {
                    var _b = _a[_i], key = _b[0], value = _b[1];
                    format = '#point.' + key + '#';
					style = "none";
					if(str.search(style) != -1 && style == "none")
					   str = str.replace(style, value);
                    if (str.search(format) != -1) {
                        str = str.replace(format, value);
                    }
                }
                return str;
            };
            Sparkline.prototype.measureText = function (text, font) {
                var element = document.getElementById("measureTex"), textObj;
                if (!element || element.clientHeight == 0) {
                    textObj = document.createElement('text');
                    textObj.setAttribute('id', 'measureTex');
                    document.body.appendChild(textObj);
                }
                else {
                    textObj = element;
                }
                var style = null, size = null, family = null, weight = null;
                if (typeof (text) == "string" && (text.indexOf("<") > -1 || text.indexOf(">") > -1)) {
                    var textArray = text.split(" ");
                    for (var i = 0; i < textArray.length; i++) {
                        if (textArray[i].indexOf("<br/>") == -1)
                            textArray[i] = textArray[i].replace(/[<>]/g, '&');
                    }
                    text = textArray.join(' ');
                }
                textObj.innerHTML = text;
                if (font != undefined && font.size == undefined) {
                    var fontarray = font;
                    fontarray = fontarray.split(" ");
                    style = fontarray[0];
                    size = fontarray[1];
                    family = fontarray[2];
                    weight = fontarray[3];
                }
                if (font != null) {
                    textObj.style.fontSize = (font.size > 0) ? (font.size + "px") : font.size ? font.size : size;
                    if (textObj.style.fontStyle)
                        textObj.style.fontStyle = (font.fontStyle) ? font.fontStyle : style;
                    textObj.style.fontFamily = font.fontFamily ? font.fontFamily : family;
                    if (window.navigator.userAgent.indexOf('MSIE 8.0') == -1)
                        textObj.style.fontWeight = font.fontWeight ? font.fontWeight : weight;
                }
                textObj.style.backgroundColor = 'white';
                textObj.style.position = 'absolute';
                textObj.style.top = -100 + "px";
                textObj.style.left = 0 + 'px';
                textObj.style.visibility = 'hidden';
                textObj.style.whiteSpace = 'nowrap';
                var bounds = { width: textObj.offsetWidth, height: textObj.offsetHeight };
                return bounds;
            };
            return Sparkline;
        }(BoldBIDashboard.WidgetBase));
        BoldBIDashboardSparkline.Sparkline = Sparkline;
        BoldBIDashboard.widget("BoldBIDashboardSparkline", "BoldBIDashboard.Sparkline", new Sparkline());
    })(bbdesigner$);
    BoldBIDashboardSparkline.deepExtend = function (out) {
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];
            if (!obj)
                continue;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object')
                        out[key] = BoldBIDashboardSparkline.deepExtend(out[key], obj[key]);
                    else
                        out[key] = obj[key];
                }
            }
        }
        return out;
    };
    BoldBIDashboardSparkline.compareExtend = function (temp, src, def) {
        if (typeof def === 'object' && def !== null) {
            var defProp = Object.keys(def), len = defProp.length, currPro;
            for (var i = 0; i < len; i++) {
                currPro = defProp[i];
                if (src.hasOwnProperty(currPro) && src[currPro] != null) {
                    if (Array.isArray(src[currPro]) || typeof src[currPro] === 'object' && src[currPro] !== null) {
                        BoldBIDashboardSparkline.compareExtend({}, src[currPro], def[currPro]);
                    }
                }
                else {
                    src[currPro] = def[currPro];
                }
            }
        }
        return src;
    };
})(BoldBIDashboardSparkline || (BoldBIDashboardSparkline = {}));
;
(function(bbdesigner$, BoldBIDashboard, undefined) {
    BoldBIDashboard.widget("BoldBIDashboardKPICard", "BoldBIDashboard.KPICard", {

        //#region Defaults

        element: null,
        model: null,
        defaults: {
            actualValue: null,
            targetValue: null,
            animationSettings: {
                enableAnimation: true,
                animationDuration: 1500
            },
            leftValue: {
                caption: '',
                value: null,
                type: 'actualvalue',
                visibility: true,
                captionVisibility: true,
                isValueFollowDirectionColor: true,
                isCaptionFollowDirectionColor: true,
                foreground: '',
                captionForeground: '',
                fontSize: '',
				fontFamily:'',
				fontWeight: '',
                captionFontSize: '',
				captionFontFamily:'',
				captionFontWeight: '',
            },
            rightValue: {
                caption: '',
                value: null,
                type: 'targetvalue',
                visibility: true,
                captionVisibility: true,
                isValueFollowDirectionColor: true,
                isCaptionFollowDirectionColor: true,
                foreground: '',
                captionForeground: '',
                fontSize: '',
				fontFamily:'',
				fontWeight: '',
                captionFontSize: '',
				captionFontFamily:'',
				captionFontWeight: '',
            },
            kpiValue: {
                type: 'percentoftarget',
                foreground: '',
                followDirectionColor: true,
                alignment: '',
                visibility: true, // need to remove this
                fontSize: '',
				fontFamily:'',
				fontWeight: '',
                isColorCustomized: false
            },
            valueRepresentation: {
                format: 'Number',
                representation: 'Auto',
                numberOfDecimals: 2,
                currencyCulture: 'en-US',
                decimalSeparator: {
                    CurrentValue: '.',
                    AliasValue: '.'
                },
                groupSeparator: {
                    CurrentValue: ',',
                    AliasValue: ','
                },
                negativeValueFormat: 'default',
                prefix: '',
                suffix: '',
				enableLakhsAndCroreRep: false
            },
            sparkline: {
                data: null,
                fill: '',
                type: 'area',
                visibility: false,
                opacity: .2,
                followDirectionColor: true,
                isColorCustomized: false
            },
			hiddenColumns:[],
            title: {
                text: '',
                foreground: '',
                alignment: 'center',
                visibility: true,
                fontSize: '',
				fontFamily:'',
				fontWeight: '',
                isColorCustomized: false,
                fontSettings: {
                    IsBold: false,
                    IsItalic: false,
                    IsUnderLine: false,
                    IsStrikeThrough: false
                }
            },
            icon: {
                type: null,
                path: '',
                color: '',
                followDirectionColor: true,
                visibility: true,
                fontSize: '',
                lowValueIcon: '',
                highValueIcon: '',
                neutralValueIcon: '',
                customizedIcon: '',
                isIconCustomized: false,
                mode: '',
                placement: '',
                alignment: ''

            },
            image: {
                mode: 'Fill',
                data: null,
                visibility: true,
                isImageCustomized: false,
				position: 'Left'
            },
            backgroundSettings: {
                mode: 'Fill',
                image: null,
                showImage: true,
                plotArea: 'default',
                color: '',
                opacity: '',
                isColorCustomized: false,
                isImageCustomized: false
            },
            size: {
                width: 300,
                height: 100
            },
            colorSettings: {
                highColor: '',
                lowColor: '',
                neutralColor: ''
            },
            informationIcon: {
                visibility: false
            },
            tooltip: {
                visibility: true,
                class: '',
                attribute: '',
                text: ''
            },
            separator: {
                color: '',
                visibility: true,
                followDirectionColor: false
            },
			autoFontSize: {
				fontSizeFactor: 1,
				enable: false
			},
            /*alignment: {
            	titleContainer: 'middle',
            	kpiContainer: 'middle',
            	bottomContainer: 'middle',
            	isFloating: false								
            }, */
			isFixedLayout: false,
            responsiveMargin: false,
            selected: null,
        },

        //#endregion

        _init: function() {
            this.intializePrivateVariables();
            this.createLayout();
            this.wireEvents();
            this.updateData();
            this.responsiveLayout();
            //this.setValueWrapperHeight();
        },

        intializePrivateVariables: function() {
            //this.height = this.setHeight();
			this._tooltipClass = this.model.tooltip.class;
			this.height = this.model.size.height;
            this.width = this.model.size.width;
            this.margin = 0;
            this.isInvalidValue = false;
            this.formatting = new NumberFormatting();
        },

        //#region Wire Events
        wireEvents: function() {
            this._on(this.element, "click", this._selectedHandler);
            //this._on(this.element, 'mousemove', '.e-kpi-card-information-icon', this.showToolTip);
            //this._on(this.element, 'mouseleave', '.e-kpi-card-information-icon', this.hideToolTip);
        },

        unwireEvents: function() {
            this._off(this.element, "click", this._selectedHandler);
            //this._off(this.element, 'mousemove', '.e-kpi-card-information-icon', this.showToolTip);
            //this._off(this.element, 'mouseleave', '.e-kpi-card-information-icon', this.hideToolTip);
        },

        //#endregion

        // used to align the card in vertical center position when the  height is too large
        setHeight: function() {
            return this.model.size.height > 250 ? 150 : this.model.size.height;
        },

        //#endregion

        //#region Tooltip

        showToolTip: function(evt) {
            var tooltipText = 'This card contains image.<br>Increase the width to view the Image';
            var body = document.getElementsByTagName("BODY")[0];
            var tooltipDiv = bbdesigner$('<div>').attr('id', 'e-kpi-card-tooltip').css({ 'position': 'absolute', 'top': evt.clientY + 'px', 'left': evt.clientX + 'px', 'z-index': 100000, 'visibility': 'visible', 'display': 'inline-block' });
            tooltipDiv.innerHTML = tooltipText;
            bbdesigner$(body).append(tooltipDiv);
        },

        hideToolTip: function() {
            var body = document.getElementsByTagName("BODY")[0];
            bbdesigner$(body).find('#e-kpi-card-tooltip').remove();
        },

        //#endregion Tooltip

        //#region Layout Creation

        createLayout: function() {
            var parentElement = this.element;
            this.createBackgroundImageWrapper();
            parentElement.css({ 'height': this.model.size.height + 'px', 'width': this.model.size.width + 'px' });
            var cardSparklineWrapper = bbdesigner$('<div>').addClass('e-kpi-card-sparkline-wrapper').css({ 'height': (this.model.size.height - this.margin) + 'px', 'width': (this.model.size.width - this.margin) + 'px' });
            parentElement.append(cardSparklineWrapper);
            this.createIconWrapper();
            this.createCardWrapperParent();
            this.createCardWrapper();
            //this.createSeparatorElement();
            this.createTableCellElement();
            this.createCardValueWrapper();
		    this.createContentImageWrapper();
			this.createKPIImageWrapper();
			this.createImageElement();
            //this.createValueWrapperMiddle();
            this.createValueContainerMiddle();
			this.createTitleWrapper();
			this.createEmptyContainer();
			this.createTitleElement();
            this.createKPIElement();

            //this.createValueWrapperBottom();
            this.createValueContainerBottom();
            this.createLeftValueContainer();
            this.createLeftValueCaptionElement();
            this.createLeftIconValueWrapper();
            this.createLeftValueElement();
            this.createBorderline();
            this.createRightValueContainer();
            this.createRightValueCaptionElement();
            this.createRightIconValueWrapper();
            this.createRightValueElement();
            this.createSparklineContainer();
            this.createIndicatorElement();
            this.updateTitleContainer();
            this.updateMiddleValueContainer();
			this.updateContentImageWrapper();
            this.updateBottomContainer();
            this.updateIndicatorContainer();
            this.updateSparklineContainer();
            //this.updateVerticalAlignment();
        },

        //#endregion

        //#region Set model

        _setModel: function(options) {
            for (var prop in options) {
                if (options.hasOwnProperty(prop)) { // eslint-disable-line  no-prototype-builtins
                    switch (prop) {
                        case 'icon':
                            this.updateIndicatorContainer();
                            this.updateIcon();
                            this.updateMiddleValueContainer();
							this.updateContentImageWrapper();
                            // when middle value container is hidden or visibile from the hidden state, then the bottom container alignment must be changed. So it is invoked below.
                            this.updateBottomContainerElementsAlingment();
                            this.updateBottomContainer();
                            this.responsiveLayout();
                            //this.setValueWrapperHeight();
                            break;
                        case 'leftValue':
                            this.updateBottomContainer();
                            this.updateLeftSideData();
                            this.responsiveLayout();
                            //this.setValueWrapperHeight();
                            break;
                        case 'rightValue':
                            this.updateBottomContainer();
                            this.updateRightSideData();
                            this.responsiveLayout();
                            //this.setValueWrapperHeight();
                            break;
                        case 'kpiValue':
                            this.updateMiddleValueContainer();
							this.updateContentImageWrapper();
                            this.updateKPIValue();
                            this.updateIcon();
                            this.responsiveLayout();
                            //this.setValueWrapperHeight();
                            break;
                        case 'title':
                            this.updateTitleContainer();
                            this.updateTitle();
							this.updateContentImageWrapper();
                            this.updateBottomContainerElementsAlingment();
                            this.responsiveLayout();
                            //this.setValueWrapperHeight();
                            break;
                        case 'image':
                            this.updateImage();
                            this.responsiveLayout();
                            break;
                        case 'sparkline':
                            this.updateSparklineContainer();
                            this.updateSparkline();
                            this.responsiveLayout();
                            break;
                        case 'informationIcon':
                            this.responsiveLayout();
                            break;
                        case 'size':
						this.updateIcon();
							this.updateKPIValue();
							this.updateTitle();
							this.updateLeftCaption();
							this.updateLeftValue();
							this.updateRightCaption();
							this.updateRightValue();
                            this.height = this.model.size.height;
                            this.width = this.model.size.width;
                            this.resize();
                            break;
                        case 'animationSettings':
                            this.applyAnimation();
                            break;
                        case 'actualValue':
                        case 'targetValue':
                            this.updateLeftSideData();
                            this.updateRightSideData();
                            this.updateKPIValue();
                            this.updateIcon();
                            this.updateSparklineColor();
                            this.updateBackgroundColor();
                            this.applyAnimation();
                            break;
                        case 'colorSettings':
                            this.updateLeftSideData();
                            this.updateRightSideData();
                            this.updateKPIValue();
                            this.updateIcon();
                            this.updateSparklineColor();
                            this.applyAnimation();
                            break;
                        case 'valueRepresentation':
                            this.updateLeftValue();
                            this.updateRightValue();
                            this.updateKPIValue();
                            this.updateBackgroundColor();
                            this.applyAnimation();
                            break;
                        case 'tooltip':
							this._updateElementsTooltip();
                            this.updateInformationTooltip();
                            this.applyAnimation();
							this._tooltipClass = this.model.tooltip.class;
                            break;
                        case 'backgroundSettings':
                            this.resizeBackgroundContainer();
                            this.updateBackgroundImage();
                            this.applyAnimation();
                            break;
                        case 'separator':
                            this.updateBorderLineVisibility();
                            this.updateSeparatorColor();
                            this.applyAnimation();
                            break;
							case 'autoFontSize':
							this.updateIcon();
							this.updateKPIValue();
							this.updateTitle();
							this.updateLeftCaption();
							this.updateLeftValue();
							this.updateRightCaption();
							this.updateRightValue();
							this.responsiveLayout();
							break;
                            /*case 'alignment':
                            	this.updateVerticalAlignment();
                            	this.setValueWrapperHeight();
                            	break; */
                        case 'isFixedLayout':
                            this.responsiveLayout();
                            break;
                        case 'responsiveMargin':
                            this.responsiveLayout();
                            break;
                        default:
                            break;

                    }
                }
            }
        },

        //#endregion

        //#region Creating Container Elements
		createBackgroundImageWrapper: function() {
            var backgroundImageWrapper = bbdesigner$('<div>').addClass('e-kpi-card-background-image-wrapper').css({ 'height': (this.model.size.height - this.margin) + 'px', 'width': (this.model.size.width - this.margin) + 'px' });
            this.element.append(backgroundImageWrapper);
            backgroundImageWrapper.append(bbdesigner$('<div>').addClass('e-kpi-card-background-image-container e-kpi-card-image-styles'));
        },
        createSeparatorElement: function() {
            var cardWrapper = bbdesigner$(this.element).find('.e-kpi-card-wrapper');
            var cardSeparator = bbdesigner$('<div>').addClass('e-kpi-card-separator-container');
            cardWrapper.append(cardSeparator);
            cardSeparator.append(bbdesigner$('<div>').addClass('e-kpi-card-separator'));
        },		
        createCardWrapperParent: function() {
            var cardSparklineWrapper = this.element.find('.e-kpi-card-sparkline-wrapper');
            cardSparklineWrapper.append(bbdesigner$('<div>').addClass('e-kpi-card-wrapper-parent e-kpi-card-image-styles'));
        },
        createCardWrapper: function() {
            var cardWrapperParent = this.element.find('.e-kpi-card-wrapper-parent');
            cardWrapperParent.append(bbdesigner$('<div>').addClass('e-kpi-card-wrapper'));
        },
        createTableCellElement: function() {
            var cardWrapperParent = this.element.find('.e-kpi-card-wrapper');
            cardWrapperParent.append(bbdesigner$('<div>').addClass('e-kpi-card-table-cell'));
        },
        createCardValueWrapper: function() {
            var tableCell = this.element.find('.e-kpi-card-table-cell');
            tableCell.append(bbdesigner$('<div>').addClass('e-kpi-card-value-wrapper e-kpi-card-default-layout'));
        },		
		createContentImageWrapper: function() {
			var cardWrapper = bbdesigner$(this.element).find('.e-kpi-card-value-wrapper');
			var contentImageWrapper = bbdesigner$('<div>').addClass('e-kpi-card-content-image-wrapper');
			cardWrapper.append(contentImageWrapper);
		},
		createKPIImageWrapper: function(){
			var contentImageWrapper = bbdesigner$(this.element).find('.e-kpi-card-content-image-wrapper');
			var kpiTitleWrapper = bbdesigner$('<div>').addClass('e-kpi-card-kpi-image-wrapper');
			contentImageWrapper.append(kpiTitleWrapper);
		},
        createImageElement: function() {
            var kpiimageWrapper = bbdesigner$(this.element).find('.e-kpi-card-kpi-image-wrapper');
            var cardImageWrapper = bbdesigner$('<div>').addClass('e-kpi-card-image-wrapper');
            kpiimageWrapper.append(cardImageWrapper);
            cardImageWrapper.append(bbdesigner$('<div>').addClass('e-kpi-card-image-container e-kpi-card-image-styles'));
        },
	    createTitleWrapper: function() {
			var contentImageWrapper = bbdesigner$(this.element).find('.e-kpi-card-content-image-wrapper');
            var cardTitleWrapper = bbdesigner$('<div>').addClass('e-kpi-card-title-wrapper');
            contentImageWrapper.append(cardTitleWrapper);
		},
		createEmptyContainer: function(){
			var titleWrapper = bbdesigner$(this.element).find('.e-kpi-card-title-wrapper');
            var emtpyContainer = bbdesigner$('<div>').addClass('e-kpi-card-empty-container');
            titleWrapper.append(emtpyContainer);
		},
        createTitleElement: function() {
            var kpiTitleWrapper = bbdesigner$(this.element).find('.e-kpi-card-title-wrapper');
            var cardTitleContainer = bbdesigner$('<div>').addClass('e-kpi-card-title-container');
            cardTitleContainer.append(bbdesigner$('<div>').addClass('e-kpi-card-title-text ' + this.model.tooltip.class + ' e-kpi-card-text-ellipsis'));
            kpiTitleWrapper.append(cardTitleContainer);
        },
        //createValueWrapperMiddle: function () {
        //    var cardWrapper = bbdesigner$(this.element).find('.e-kpi-card-value-wrapper');
        //    var cardWrapperMiddle = bbdesigner$('<div>').addClass('e-kpi-card-value-wrapper-middle');
        //    cardWrapper.append(cardWrapperMiddle);
        //},
        createValueContainerMiddle: function() {
            var kpiTitleWrapper = bbdesigner$(this.element).find('.e-kpi-card-kpi-image-wrapper');
            var cardContainerMiddle = bbdesigner$('<div>').addClass('e-kpi-card-value-container-middle e-kpi-card-justify-center');
            kpiTitleWrapper.append(cardContainerMiddle);
        },
        createIndicatorElement: function() {
            var parentContainer = this.getIconParent();
            var cardIndicator = bbdesigner$('<div>').addClass('e-kpi-card-indicator-container');
            cardIndicator.append(bbdesigner$('<div>').addClass('e-kpi-card-indicator'));
            parentContainer.prepend(cardIndicator);
        },
        getIconParent: function() {
            switch (this.model.icon.placement) {
                case BoldBIDashboard.KPICard.IconPlacement.Left:
                    return bbdesigner$(this.element).find('.e-kpi-card-left-icon-value-wrapper');
                case BoldBIDashboard.KPICard.IconPlacement.Right:
                    return bbdesigner$(this.element).find('.e-kpi-card-right-icon-value-wrapper');
                default:
                    return bbdesigner$(this.element).find('.e-kpi-card-value-container-middle');
            }
        },
        createKPIElement: function() {
            var cardContainerMiddle = bbdesigner$(this.element).find('.e-kpi-card-value-container-middle');
            var kpiContainer = bbdesigner$('<div>').addClass('e-kpi-card-middle-value-container e-kpi-card-text-ellipsis');
             kpiContainer.append(bbdesigner$('<div>').addClass('e-kpi-card-middle-value-text ' + this.model.tooltip.class + ' e-kpi-card-text-ellipsis'));
            cardContainerMiddle.append(kpiContainer);
        },
        //createValueWrapperBottom: function () {
        //    var cardWrapper = bbdesigner$(this.element).find('.e-kpi-card-value-wrapper');
        //    var cardWrapperBottom = bbdesigner$('<div>').addClass('e-kpi-card-value-wrapper-bottom');
        //    cardWrapper.append(cardWrapperBottom);
        //},
        createValueContainerBottom: function() {
            var cardWrapper = bbdesigner$(this.element).find('.e-kpi-card-value-wrapper');
            var cardContainerBottom = bbdesigner$('<div>').addClass('e-kpi-card-value-container-bottom');
            cardWrapper.append(cardContainerBottom);
        },
        createLeftValueContainer: function() {
            var cardContainerBottom = bbdesigner$(this.element).find('.e-kpi-card-value-container-bottom');
            var leftValueContainer = bbdesigner$('<div>').addClass('e-kpi-card-value-container-left');
            cardContainerBottom.append(leftValueContainer);
        },
        createLeftValueCaptionElement: function() {
            var leftContainer = bbdesigner$(this.element).find('.e-kpi-card-value-container-left');
            var leftValueCaption = bbdesigner$('<div>').addClass('e-kpi-card-left-value-caption');
            leftValueCaption.append(bbdesigner$('<div>').addClass('e-kpi-card-left-value-caption-text ' + this.model.tooltip.class + ' e-kpi-card-text-ellipsis'));
            leftContainer.append(leftValueCaption);
        },
        createLeftIconValueWrapper: function() {
            var leftContainer = bbdesigner$(this.element).find('.e-kpi-card-value-container-left');
            leftContainer.prepend(bbdesigner$('<div>').addClass('e-kpi-card-left-icon-value-wrapper'));
        },
        createLeftValueElement: function() {
            var leftValueWrapper = bbdesigner$(this.element).find('.e-kpi-card-left-icon-value-wrapper');
            var leftValue = bbdesigner$('<div>').addClass('e-kpi-card-left-value');
            leftValue.append(bbdesigner$('<div>').addClass('e-kpi-card-left-value-text ' + this.model.tooltip.class + ' e-kpi-card-text-ellipsis'));
            leftValueWrapper.append(leftValue);
        },
        createBorderline: function() {
            var bottomContainer = bbdesigner$(this.element).find('.e-kpi-card-value-container-bottom');
            var borderline = bbdesigner$('<div>').addClass('border-line');
            borderline.append(bbdesigner$('<span>').addClass('border-line-span'));
            bottomContainer.append(borderline);
        },
        createRightValueContainer: function() {
            var cardContainerBottom = bbdesigner$(this.element).find('.e-kpi-card-value-container-bottom');
            var rightValueContainer = bbdesigner$('<div>').addClass('e-kpi-card-value-container-right');
            cardContainerBottom.append(rightValueContainer);
        },
        createRightValueCaptionElement: function() {
            var rightContainer = bbdesigner$(this.element).find('.e-kpi-card-value-container-right');
            var rightValueCaption = bbdesigner$('<div>').addClass('e-kpi-card-right-value-caption');
            rightValueCaption.append(bbdesigner$('<div>').addClass('e-kpi-card-right-value-caption-text ' + this.model.tooltip.class + ' e-kpi-card-text-ellipsis'));
            rightContainer.append(rightValueCaption);
        },
        createRightIconValueWrapper: function() {
            var rightContainer = bbdesigner$(this.element).find('.e-kpi-card-value-container-right');
            rightContainer.prepend(bbdesigner$('<div>').addClass('e-kpi-card-right-icon-value-wrapper'));
        },
        createRightValueElement: function() {
            var rightContainer = bbdesigner$(this.element).find('.e-kpi-card-right-icon-value-wrapper');
            var rightValue = bbdesigner$('<div>').addClass('e-kpi-card-right-value');
            rightValue.append(bbdesigner$('<div>').addClass('e-kpi-card-right-value-text ' + this.model.tooltip.class + ' e-kpi-card-text-ellipsis'));
            rightContainer.append(rightValue);
        },
        createSparklineContainer: function() {
            var cardSparklineWrapper = bbdesigner$(this.element).find('.e-kpi-card-sparkline-wrapper');
            var sparklineContainer = bbdesigner$('<div>').addClass('e-kpi-card-sparkline-container');
            cardSparklineWrapper.append(sparklineContainer);
            sparklineContainer.append(bbdesigner$('<div>').attr('id', bbdesigner$(this.element).attr('id') + '-sparkline'));
			// sparkline gradient svg container
			var gradientContainer = bbdesigner$('<div>').addClass('e-sparkline-gradient-container');
			this.element.append(gradientContainer);
        },
        createIconWrapper: function() {
            var cardSparklineWrapper = bbdesigner$(this.element).find('.e-kpi-card-sparkline-wrapper');
            var iconWrapper = bbdesigner$('<div>').addClass('e-kpi-card-information-wrapper e-kpi-card-display-none').css({ 'height': (this.model.size.height - this.margin) + 'px', 'width': (this.model.size.width - this.margin) + 'px' }); //absolute positioned so, we couldn't set in %
            cardSparklineWrapper.append(iconWrapper);
            iconWrapper.append(bbdesigner$('<div>').addClass('e-kpi-card-information-icon'));
        },

        //#endregion

        updateData: function() {
            this.updateTitle();
            this.updateKPIValue();
            this.updateIcon();
            this.updateLeftSideData();
            this.updateRightSideData();
            this.updateSparkline();
            this.updateImage();
            this.updateBackgroundImage();
            this.updateInformationTooltip();
            this.updateSeparatorColor();
        },

        //#region Data update

        updateLeftSideData: function() {
            this.updateLeftValue();
            this.updateLeftCaption();
        },
        updateLeftCaption: function() {
            this.element.find('.e-kpi-card-left-value-caption-text').css({ 'color': this.model.leftValue.isCaptionFollowDirectionColor ? this.getDirectionColor() : this.model.leftValue.captionForeground, 'font-size': this.getResolutionBasedFontSize(this.model.leftValue.captionFontSize) + 'px', 'font-weight': this.model.leftValue.captionFontWeight, 'font-family': this.model.leftValue.captionFontFamily, 'line-height': 1.25 }).html(this.model.leftValue.caption).attr({ 'data-tooltip': this.model.leftValue.caption });
        },
        updateLeftValue: function() {
            var value = this.getFormattedValue(this.model.leftValue.type, this.model.valueRepresentation);
            this.element.find('.e-kpi-card-left-value-text').css({ 'color': this.model.leftValue.isValueFollowDirectionColor ? this.getDirectionColor() : this.model.leftValue.foreground, 'font-size': this.getResolutionBasedFontSize(this.model.leftValue.fontSize) + 'px', 'font-weight': this.model.leftValue.fontWeight, 'font-family': this.model.leftValue.fontFamily, 'line-height': 1.5 }).html(value).attr({ 'data-tooltip': value });;
        },
        updateRightSideData: function() {
            this.updateRightValue();
            this.updateRightCaption();
        },
        updateRightCaption: function() {
            this.element.find('.e-kpi-card-right-value-caption-text').css({ 'color': this.model.rightValue.isCaptionFollowDirectionColor ? this.getDirectionColor() : this.model.rightValue.captionForeground, 'font-size': this.getResolutionBasedFontSize(this.model.rightValue.captionFontSize) + 'px', 'font-weight': this.model.rightValue.captionFontWeight, 'font-family': this.model.rightValue.captionFontFamily, 'line-height': 1.25 }).html(this.model.rightValue.caption).attr({ 'data-tooltip': this.model.rightValue.caption });
        },
        updateRightValue: function() {
            var value = this.getFormattedValue(this.model.rightValue.type, this.model.valueRepresentation);
            this.element.find('.e-kpi-card-right-value-text').css({ 'color': this.model.rightValue.isValueFollowDirectionColor ? this.getDirectionColor() : this.model.rightValue.foreground, 'font-size': this.getResolutionBasedFontSize(this.model.rightValue.fontSize) + 'px', 'font-weight': this.model.rightValue.fontWeight, 'font-family': this.model.rightValue.fontFamily, 'line-height': 1.5 }).html(value).attr({ 'data-tooltip': value });
        },
        updateKPIValue: function() {
            var value = this.getFormattedValue(this.model.kpiValue.type, this.model.valueRepresentation);
            this.element.find('.e-kpi-card-middle-value-text').css({ 'color': this.model.kpiValue.followDirectionColor && !this.model.kpiValue.isColorCustomized ? this.getDirectionColor() : this.model.kpiValue.foreground, 'font-size': this.getResolutionBasedFontSize(this.model.kpiValue.fontSize) + 'px', 'font-weight': this.model.kpiValue.fontWeight, 'font-family': this.model.kpiValue.fontFamily, 'line-height': 1.25 }).html(value).attr({ 'data-tooltip': value }); // should depends upon type
        },
        updateIcon: function() {
            this.updateIconType();
            this.updateIconColor();
        },
        updateIconColor: function() {
            var isWarning = this.isWarningRange();
            if (!isWarning && this.model.kpiValue.higherValueIsGood && this.model.actualValue > this.model.targetValue || !this.model.kpiValue.higherValueIsGood && this.model.targetValue > this.model.actualValue) {
                this.element.find('.e-kpi-card-indicator').addClass('e-kpi-card-icon-color-green');
                this.element.find('.e-kpi-card-indicator').removeClass('e-kpi-card-icon-color-red e-kpi-card-icon-color-yellow');
            } else if (this.model.targetValue > this.model.actualValue && !isWarning) {
                this.element.find('.e-kpi-card-indicator').addClass('e-kpi-card-icon-color-red');
                this.element.find('.e-kpi-card-indicator').removeClass('e-kpi-card-icon-color-green e-kpi-card-icon-color-yellow');
            } else {
                this.element.find('.e-kpi-card-indicator').addClass('e-kpi-card-icon-color-yellow');
                this.element.find('.e-kpi-card-indicator').removeClass('e-kpi-card-icon-color-green e-kpi-card-icon-color-red');
            }
            this.element.find('.e-kpi-card-indicator').css({ 'color': this.model.icon.followDirectionColor && !this.model.icon.isIconCustomized ? this.getDirectionColor() : this.model.icon.color, 'font-size': this.getResolutionBasedFontSize(this.model.icon.fontSize) + 'px' });
        },
        updateIconType: function() {
            this.element.find('.e-kpi-card-indicator').attr('class', 'e-kpi-card-indicator');
            if (this.model.icon.isIconCustomized) {
                if (this.model.icon.mode === 'Default') {
                    this.element.find('.e-kpi-card-indicator').addClass('e-color-custom-icon ' + this.model.icon.customizedIcon);
                } else {
                    //logic
                }
            } else {
                if (this.model.actualValue > this.model.targetValue) {
                    this.element.find('.e-kpi-card-indicator').addClass('e-color-custom-icon ' + this.model.icon.highValueIcon);
                } else if (this.model.actualValue < this.model.targetValue) {
                    this.element.find('.e-kpi-card-indicator').addClass('e-color-custom-icon ' + this.model.icon.lowValueIcon);
                } else {
                    this.element.find('.e-kpi-card-indicator').addClass('e-color-custom-icon ' + this.model.icon.neutralValueIcon);
                }
            }


        },
        updateTitle: function() {
            this.element.find('.e-kpi-card-title-text').css({ 'color': this.model.title.foreground, 'font-size': this.getResolutionBasedFontSize(this.model.title.fontSize) + 'px', 'font-weight': this.model.title.fontWeight, 'font-family': this.model.title.fontFamily, 'line-height': 1.25 }).html(this.model.title.text).attr({ 'data-tooltip': this.model.title.text });
            if (!BoldBIDashboard.isNullOrUndefined(this.model.title.fontSettings)) {
                this.updateFontSettings();
            }

        },
		getResolutionBasedFontSize: function(fontsize) {			
			return this.model.autoFontSize.enable ? fontsize + ((this.model.autoFontSize.fontSizeFactor / 100) * window.screen.width) : fontsize;
		},
        updateFontSettings: function() {
            if (this.model.title.fontSettings.IsBold) {
                this.element.find('.e-kpi-card-title-text').addClass('e-kpicard-text-bold');
            }
            if (this.model.title.fontSettings.IsItalic) {
                this.element.find('.e-kpi-card-title-text').addClass('e-kpicard-text-italic');
            }
            if (this.model.title.fontSettings.IsUnderLine && this.model.title.fontSettings.IsStrikeThrough) {
                this.element.find('.e-kpi-card-title-text').addClass('e-kpicard-text-underline-strikethrough');
            } else if (this.model.title.fontSettings.IsUnderLine) {
                this.element.find('.e-kpi-card-title-text').addClass('e-kpicard-text-underline');
            } else if (this.model.title.fontSettings.IsStrikeThrough) {
                this.element.find('.e-kpi-card-title-text').addClass('e-kpicard-text-strikethrough');
            }
        },
        updateSparkline: function() {
            this.updateSparklineData();
            this.updateSparklineColor();
        },
        updateSparklineData: function() {
            if (this.model.sparkline.visibility && this.model.sparkline.data) {
                var sparklineElement = this.element.find('#' + bbdesigner$(this.element).attr('id') + '-sparkline');
                bbdesigner$(sparklineElement).BoldBIDashboardSparkline({
                    dataSource: this.model.sparkline.data,
                    type: this.model.sparkline.type,
                    //highPointColor: 'red',
                    //lowPointColor: 'blue',
                    padding: 0,
					width: 2,
                    yName: "valueName",
                    opacity: this.model.sparkline.opacity,
					loaded: bbdesigner$.proxy(this.onSparklineLoaded, this)
                });
            }
        },
		onSparklineLoaded: function() {
			  var id = '#' + bbdesigner$(this.element).attr('id') + '-sparkline_sparkline_svg_area_series_fill';
			  var path = this.element.find(id); 
              var direction = path.attr("d").replace("Z", ""); 
              path.attr("d", direction);

		},		
        updateImage: function() {
            var imageContainer = this.element.find('.e-kpi-card-image-container');
            this.model.image.visibility ? this.updateImageData(imageContainer, this.model.image.data, this.model.image) : imageContainer.css({
                "background-image": "none"
            });
            this.updateImagePosition(imageContainer, this.model.image.mode, this.model.image.data);
			this.updateContentWidth();
			this.swapImage();
        },
        swapImage: function(){
			var valueContainer = this.element.find('.e-kpi-card-value-container-middle');
			var imageWrapper = this.element.find('.e-kpi-card-image-wrapper')
			if(this.model.image.position === 'Left'){
				valueContainer.before(imageWrapper);
				imageWrapper.css({'margin-right': this.model.icon.visibility && this.model.icon.position === BoldBIDashboard.KPICard.IconPosition.Left ? '8px' : '16px', 'margin-left': '16px' });
			} else {
				valueContainer.after(imageWrapper);
		        imageWrapper.css({'margin-right': '16px', 'margin-left': this.model.icon.visibility && this.model.icon.position === BoldBIDashboard.KPICard.IconPosition.Right ? '8px': '16px'});
			}
		},		
		updateContentWidth: function() {
			if(this.isImagePresent()){
				this.element.find('.e-kpi-card-value-container-middle').addClass('e-kpi-card-max-width');
		        this.element.find('.e-kpi-card-title-container').addClass('e-kpi-card-max-width');
			} else {
				this.element.find('.e-kpi-card-value-container-middle').removeClass('e-kpi-card-max-width');
		        this.element.find('.e-kpi-card-title-container').removeClass('e-kpi-card-max-width');
			}
		},
        updateBackgroundImage: function() {
            var backgroundImage = this.element.find('.e-kpi-card-background-image-container');
            if (this.model.backgroundSettings.showImage) {
                this.updateImageData(backgroundImage, this.model.backgroundSettings.image, this.model.backgroundSettings);
            } else {
                backgroundImage.css({ 'background-image': 'none' });
            }
            this.updateImagePosition(backgroundImage, this.model.backgroundSettings.mode, this.model.backgroundSettings.image);
            backgroundImage.css({ 'background-color': this.model.backgroundSettings.color, 'opacity': this.model.backgroundSettings.opacity });
        },
        updateImageData: function(image, data, model) {
            image.css({ 'background-image': 'url(' + data + ')' });
        },
        updateImagePosition: function(image, mode, data) {
            if (!this.isNullOrEmptyOrUndefined(data)) {
                switch (mode) {
                    case BoldBIDashboard.KPICard.ImageModes.Fill:
                        image.addClass('e-kpi-card-image-fill');
                        image.removeClass('e-kpi-card-image-default e-kpi-card-image-uniform e-kpi-card-image-uniformtofill');
                        break;
                    case BoldBIDashboard.KPICard.ImageModes.Uniform:
                        image.addClass('e-kpi-card-image-uniform');
                        image.removeClass('e-kpi-card-image-default e-kpi-card-image-fill e-kpi-card-image-uniformtofill');
                        break;
                    case BoldBIDashboard.KPICard.ImageModes.UniformToFill:
                        image.addClass('e-kpi-card-image-uniformtofill');
                        image.removeClass('e-kpi-card-image-default e-kpi-card-image-fill e-kpi-card-image-uniform');
                        break;
                    default:
                        image.addClass('e-kpi-card-image-default');
                        image.removeClass('e-kpi-card-image-fill e-kpi-card-image-uniform e-kpi-card-image-uniformtofill');
                }
            }
        },
        updateSparklineColor: function() {
			var color = this.model.sparkline.followDirectionColor && !this.model.sparkline.isColorCustomized ? this.getDirectionColor() : this.model.sparkline.fill;
			var svg = '<svg style="height: 0"><defs><linearGradient id=' + bbdesigner$(this.element).attr('id') + 'sparkline-gradient' + ' style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color=' + color + ' stop-opacity=' + this.model.sparkline.opacity + ' ></stop><stop offset="0.9" stop-color=' + color + ' stop-opacity=0></stop></linearGradient></defs></svg>';
			var gradientContainer = this.element.find('.e-sparkline-gradient-container');
			gradientContainer.html(svg);
            var sparkline = this.element.find('#' + bbdesigner$(this.element).attr('id') + '-sparkline').data('BoldBIDashboardSparkline');
            if (!BoldBIDashboard.isNullOrUndefined(sparkline)) {
                switch (this.model.sparkline.type) {
                    case "area":
						var id = bbdesigner$(this.element).attr('id') + 'sparkline-gradient';
                        //sparkline.model.stroke = this.getStrokeColor(); for better visual storke color is removed
                        sparkline.model.stroke = color;
                        sparkline.model.fill = 'url(' + '#' + id + ')';
                        sparkline.model.opacity = this.model.sparkline.opacity;
                        break;
                    case "column":
                        sparkline.model.fill = this.model.sparkline.followDirectionColor && !this.model.sparkline.isColorCustomized ? this.getDirectionColor() : this.model.sparkline.fill;
                        break;
                    default:
                        sparkline.model.stroke = this.getStrokeColor();
                        break;
                }
                sparkline.redraw();
            }
        },
		_updateElementsTooltip: function() {
			this.element.find('.e-kpi-card-title-text').removeClass(this._tooltipClass);
		    this.element.find('.e-kpi-card-middle-value-text').removeClass(this._tooltipClass);
			this.element.find('.e-kpi-card-left-value-caption-text').removeClass(this._tooltipClass);
			this.element.find('.e-kpi-card-left-value-text').removeClass(this._tooltipClass);
			this.element.find('.e-kpi-card-right-value-caption-text').removeClass(this._tooltipClass);
			this.element.find('.e-kpi-card-right-value-text').removeClass(this._tooltipClass);
			this.element.find('.e-kpi-card-title-text').addClass(this.model.tooltip.class);
		    this.element.find('.e-kpi-card-middle-value-text').addClass(this.model.tooltip.class);
			this.element.find('.e-kpi-card-left-value-caption-text').addClass(this.model.tooltip.class);
			this.element.find('.e-kpi-card-left-value-text').addClass(this.model.tooltip.class);
			this.element.find('.e-kpi-card-right-value-caption-text').addClass(this.model.tooltip.class);
			this.element.find('.e-kpi-card-right-value-text').addClass(this.model.tooltip.class);
			
		},

        updateInformationTooltip: function() {
            if (!this.isNullOrEmptyOrUndefined(this.model.tooltip.class) && !this.isNullOrEmptyOrUndefined(this.model.tooltip.attribute)) {
				this.element.find('.e-kpi-card-information-icon').removeClass(this._tooltipClass);
                this.element.find('.e-kpi-card-information-icon').addClass(this.model.tooltip.class).attr(this.model.tooltip.attribute, this.model.tooltip.text);
            }
        },
        updateBackgroundColor: function() {
            this.element.find('.e-kpi-card-sparkline-wrapper').css({ 'background-color': this.model.backgroundSettings.color });
        },
        updateSeparatorColor: function() {
            this.element.find('.border-line-span').css({ 'border-color': this.model.separator.followDirectionColor ? this.getDirectionColor() : this.model.separator.color });
        },

        //#endregion

        //#region Get Data        
        getStrokeColor: function() {
            var isWarning = this.isWarningRange();
            if (!isWarning && this.model.kpiValue.higherValueIsGood && this.model.actualValue > this.model.targetValue || !this.model.kpiValue.higherValueIsGood && this.model.targetValue > this.model.actualValue) {
                return '#3BB44A'; //green
            } else if (!isWarning && this.model.targetValue > this.model.actualValue) {
                return '#E81123'; //red
            } else {
                return '#F2C914'; //yellow
            }
        },
        getDirectionColor: function() {
            var isWarning = this.isWarningRange();
            if (!isWarning && this.model.kpiValue.higherValueIsGood && this.model.actualValue > this.model.targetValue || !this.model.kpiValue.higherValueIsGood && this.model.targetValue > this.model.actualValue) {
                return this.model.colorSettings.highColor;
            } else if (this.model.targetValue > this.model.actualValue && !isWarning) {
                return this.model.colorSettings.lowColor;
            } else {
                return this.model.colorSettings.neutralColor;
            }
        },
        getFormattedValue: function(type, valueRepresentation) {
            var value = this.getCalculatedValue(type);
            switch (type) {
                case BoldBIDashboard.KPICard.ValueType.AbsoluteDifference:
                case BoldBIDashboard.KPICard.ValueType.ActualValue:
                case BoldBIDashboard.KPICard.ValueType.TargetValue:
                    return this.formatting.applyFormat(value, valueRepresentation);
                default:
                    return this.adjustDemicalPlacesOnly(value, valueRepresentation);
            }
        },
        getCalculatedValue: function(type) {
            this.isInvalidValue = this.model.actualValue === 0 || this.model.targetValue === 0;
            switch (type) {
                case BoldBIDashboard.KPICard.ValueType.AbsoluteDifference:
                    return this.model.actualValue - this.model.targetValue;
                case BoldBIDashboard.KPICard.ValueType.PercentOfDifference:
                    if (this.isInvalidValue) {
                        return this.getZeroValue(this.model.actualValue, this.model.targetValue);
                    } else {
                        return ((this.model.actualValue - this.model.targetValue) / ((this.model.actualValue + this.model.targetValue) / 2)) * 100;
                    }
                case BoldBIDashboard.KPICard.ValueType.PercentOfChange:
                    if (this.isInvalidValue) {
                        return this.getZeroValue(this.model.actualValue, this.model.targetValue);
                    } else {
                        return ((this.model.actualValue - this.model.targetValue) / this.model.targetValue) * 100;
                    }
                case BoldBIDashboard.KPICard.ValueType.PercentOfTarget:
                    if (!isFinite(this.model.actualValue / this.model.targetValue)) {
                        return this.getZeroValue(this.model.actualValue, this.model.targetValue);
                    } else {
                        return (this.model.actualValue / this.model.targetValue) * 100;
                    }
                case BoldBIDashboard.KPICard.ValueType.TargetValue:
                    return this.model.targetValue;
                default:
                    return this.model.actualValue;
            }
        },
        getZeroValue: function(actual, target) {
            if (actual === 0 && target === 0) {
                return 0;
            } else if (actual === 0 && target > 0) {
                return -100;
            } else if (actual > 0 && target === 0) {
                return 100;
            } else if (actual === 0 && target < 0) {
                return 100;
            } else if (actual < 0 && target === 0) {
                return -100;
            }
        },
        isWarningRange: function() {
            var value = this.getCalculatedValue(this.model.kpiValue.type);
            //return value <= 5 && value >= -5;
            return false;
        },
        //#endregion

        adjustDemicalPlacesOnly: function(value) {
           return (value === 0 ? value.toString() : value.toFixed(this.model.valueRepresentation.numberOfDecimals).toString()) + '%';
        },

        //#endregion

        //#region Visibility Toggling functions
        showImage: function() {
            this.element.find('.e-kpi-card-image-wrapper').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-image-wrapper').removeClass('e-kpi-card-display-none');
			this.element.find('.e-kpi-card-empty-container').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-empty-container').removeClass('e-kpi-card-display-none');
            //this.element.find('.e-kpi-card-separator-container').addClass('e-kpi-card-display-none');
            ////this.element.find('.e-kpi-card-separator-container').removeClass('e-kpi-card-display-none');
        },
        hideImage: function() {
            this.element.find('.e-kpi-card-image-wrapper').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-image-wrapper').removeClass('e-kpi-card-display-flex');
			this.element.find('.e-kpi-card-empty-container').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-empty-container').removeClass('e-kpi-card-display-flex');
            //this.element.find('.e-kpi-card-separator-container').addClass('e-kpi-card-display-none');
            //this.element.find('.e-kpi-card-separator-container').removeClass('e-kpi-card-display-flex');
        },
        showInformationIcon: function() {
            this.element.find('.e-kpi-card-information-wrapper').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-information-wrapper').removeClass('e-kpi-card-display-none');
        },
        hideInformationIcon: function() {
            this.element.find('.e-kpi-card-information-wrapper').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-information-wrapper').removeClass('e-kpi-card-display-flex');
        },
        showTitle: function() {
            this.element.find('.e-kpi-card-title-wrapper').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-title-wrapper').removeClass('e-kpi-card-display-none');
        },
        hideTitle: function() {
            this.element.find('.e-kpi-card-title-wrapper').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-title-wrapper').removeClass('e-kpi-card-display-flex');
        },
        hideIndicator: function() {
            this.element.find('.e-kpi-card-indicator-container').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-indicator-container').removeClass('e-kpi-card-display-flex');
        },
        showIndicator: function() {
            this.element.find('.e-kpi-card-indicator-container').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-indicator-container').removeClass('e-kpi-card-display-none');
        },
        showKPIValue: function() {
            this.element.find('.e-kpi-card-middle-value-container').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-middle-value-container').removeClass('e-kpi-card-display-none');
        },
        hideKPIValue: function() {
            this.element.find('.e-kpi-card-middle-value-container').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-middle-value-container').removeClass('e-kpi-card-display-flex');
        },
        hideLeftCaption: function() {
            this.element.find('.e-kpi-card-left-value-caption').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-left-value-caption').removeClass('e-kpi-card-display-flex');
        },
        showLeftCaption: function() {
            this.element.find('.e-kpi-card-left-value-caption').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-left-value-caption').removeClass('e-kpi-card-display-none');
        },
        hideLeftValue: function() {
            this.element.find('.e-kpi-card-left-value').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-left-value').removeClass('e-kpi-card-display-flex');
        },
        showLeftValue: function() {
            this.element.find('.e-kpi-card-left-value').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-left-value').removeClass('e-kpi-card-display-none');
        },
        hideBorderLine: function() {
            this.element.find('.border-line').addClass('e-kpi-card-display-none');
            this.element.find('.border-line').removeClass('e-kpi-card-display-flex');
        },
        showBorderLine: function() {
            this.element.find('.border-line').addClass('e-kpi-card-display-flex');
            this.element.find('.border-line').removeClass('e-kpi-card-display-none');
        },
        hideRightCaption: function() {
            this.element.find('.e-kpi-card-right-value-caption').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-right-value-caption').removeClass('e-kpi-card-display-flex');
        },
        showRightCaption: function() {
            this.element.find('.e-kpi-card-right-value-caption').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-right-value-caption').removeClass('e-kpi-card-display-none');
        },
        hideRightValue: function() {
            this.element.find('.e-kpi-card-right-value').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-right-value').removeClass('e-kpi-card-display-flex');
        },
        showRightValue: function() {
            this.element.find('.e-kpi-card-right-value').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-right-value').removeClass('e-kpi-card-display-none');
        },
		hideContentImageWrapper: function() {
            this.element.find('.e-kpi-card-content-image-wrapper').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-content-image-wrapper').removeClass('e-kpi-card-display-flex');
        },
        showContentImageWrapper: function() {
            this.element.find('.e-kpi-card-content-image-wrapper').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-content-image-wrapper').removeClass('e-kpi-card-display-none');
        },
		hideImageWrapper: function() {
            this.element.find('.e-kpi-card-kpi-image-wrapper').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-kpi-image-wrapper').removeClass('e-kpi-card-display-flex');
        },
        showImageWrapper: function() {
            this.element.find('.e-kpi-card-kpi-image-wrapper').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-kpi-image-wrapper').removeClass('e-kpi-card-display-none');
        },
        hideValueContainerMiddle: function() {
            this.element.find('.e-kpi-card-value-container-middle').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-value-container-middle').removeClass('e-kpi-card-display-flex');
        },
        showValueContainerMiddle: function() {
            this.element.find('.e-kpi-card-value-container-middle').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-value-container-middle').removeClass('e-kpi-card-display-none');
        },
        hideValueContainerBottom: function() {
            this.element.find('.e-kpi-card-value-container-bottom').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-value-container-bottom').removeClass('e-kpi-card-display-flex');
        },
        showValueContainerBottom: function() {
            this.element.find('.e-kpi-card-value-container-bottom').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-value-container-bottom').removeClass('e-kpi-card-display-none');
        },
        hideLeftValueContainer: function() {
            this.element.find('.e-kpi-card-value-container-left').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-value-container-left').removeClass('e-kpi-card-display-flex');
        },
        showLeftValueContainer: function() {
            this.element.find('.e-kpi-card-value-container-left').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-value-container-left').removeClass('e-kpi-card-display-none');
        },
        hideRightValueContainer: function() {
            this.element.find('.e-kpi-card-value-container-right').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-value-container-right').removeClass('e-kpi-card-display-flex');
        },
        showLeftIconValueWrapper: function() {
            this.element.find('.e-kpi-card-left-icon-value-wrapper').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-left-icon-value-wrapper').removeClass('e-kpi-card-display-none');
        },
        hideLeftIconValueWrapper: function() {
            this.element.find('.e-kpi-card-left-icon-value-wrapper').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-left-icon-value-wrapper').removeClass('e-kpi-card-display-flex');
        },
        showRightIconValueWrapper: function() {
            this.element.find('.e-kpi-card-right-icon-value-wrapper').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-right-icon-value-wrapper').removeClass('e-kpi-card-display-none');
        },
        hideRightIconValueWrapper: function() {
            this.element.find('.e-kpi-card-right-icon-value-wrapper').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-right-icon-value-wrapper').removeClass('e-kpi-card-display-flex');
        },
        showRightValueContainer: function() {
            this.element.find('.e-kpi-card-value-container-right').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-value-container-right').removeClass('e-kpi-card-display-none');
        },
        showSparkline: function() {
            this.element.find('.e-kpi-card-sparkline-container').addClass('e-kpi-card-display-flex');
            this.element.find('.e-kpi-card-sparkline-container').removeClass('e-kpi-card-display-none');
        },
        hideSparkline: function() {
            this.element.find('.e-kpi-card-sparkline-container').addClass('e-kpi-card-display-none');
            this.element.find('.e-kpi-card-sparkline-container').removeClass('e-kpi-card-display-flex');
        },

        //#endregion

        //#region Alignment functions

        justifyEnd: function(element) {
            element.removeClass('e-kpi-card-justify-start e-kpi-card-justify-center');
            element.addClass('e-kpi-card-justify-end');
        },
        justifyStart: function(element) {
            element.removeClass('e-kpi-card-justify-end e-kpi-card-justify-center');
            element.addClass('e-kpi-card-justify-start');
        },
        justifyCenter: function(element) {
            element.removeClass('e-kpi-card-justify-start e-kpi-card-justify-end');
            element.addClass('e-kpi-card-justify-center');
        },
        alignEnd: function(element) {
            element.removeClass('e-kpi-card-align-start e-kpi-card-align-center');
            element.addClass('e-kpi-card-align-end');
        },
        alignStart: function(element) {
            element.removeClass('e-kpi-card-align-end e-kpi-card-align-center');
            element.addClass('e-kpi-card-align-start');
        },
        alignCenter: function(element) {
            element.removeClass('e-kpi-card-align-start e-kpi-card-align-end');
            element.addClass('e-kpi-card-align-center');
        },

        //#endregion

        //#region Resizing

        resize: function() {
            this.element.css({ 'height': this.model.size.height + 'px', 'width': this.model.size.width + 'px' });
            this.element.find('.e-kpi-card-sparkline-wrapper').css({ 'height': (this.model.size.height - this.margin) + 'px', 'width': (this.model.size.width - this.margin) + 'px' });
            this.element.find('.e-kpi-card-information-wrapper').css({ 'height': (this.model.size.height - this.margin) + 'px', 'width': (this.model.size.width - this.margin) + 'px' });
            this.element.find('.e-kpi-card-background-image-wrapper').css({ 'height': (this.model.size.height - this.margin) + 'px', 'width': (this.model.size.width - this.margin) + 'px' });
            this.responsiveLayout();
        },

        resizeSparklineContainer: function() {
			var sparklineHeight = (this.model.size.height - this.margin) * .2;            
            this.element.find('.e-kpi-card-sparkline-container').css({ 'height': sparklineHeight + 'px', 'width': (this.model.size.width - this.margin) + 'px' });
            this.resizeSparkline();
        },

        resizeSparkline: function() {
            var sparkline = this.element.find('#' + bbdesigner$(this.element).attr('id') + '-sparkline').data('BoldBIDashboardSparkline');
            if (!BoldBIDashboard.isNullOrUndefined(sparkline)) {
                sparkline.model.size.height = (this.model.size.height - this.margin) * .2;
                sparkline.model.size.width = this.model.size.width - this.margin;
                sparkline.redraw();
            }
        },

        //#endregion

        setValueWrapperHeight: function() {
            this.updateTitleContainer();
            var cardWrapperHeight = this.getFontHight();
            this.element.find('.e-kpi-card-value-wrapper').css({ 'height': cardWrapperHeight + 'px' });
            /*if(!this.model.alignment.isFloating){
                this.element.find('.e-kpi-card-value-wrapper').css({ 'height': cardWrapperHeight + 'px' });            
            } else {
            	this.element.find('.e-kpi-card-value-wrapper').css({'height': ''});            
            } */
        },

        getFontHight: function() {
			var bottomContainerHeight = 0;
			var calculatedHeight = 0;
            var cardHt = this.model.size.height - this.margin - 10; // 10 - top + bottom margin
			var margin = 0;
            var titleHeight = this.element.find('.e-kpi-card-title-text').height();
            var kpiValueHeight = this.element.find('.e-kpi-card-middle-value-text').height();
            var leftCaptionHeight = this.element.find('.e-kpi-card-left-value-caption-text').height();
            var rightCaptionHeight = this.element.find('.e-kpi-card-right-value-caption-text').height();
            var leftValueHeight = this.element.find('.e-kpi-card-left-value-text').height();
            var rightValueHeight = this.element.find('.e-kpi-card-right-value-text').height();
            var indicatorHeight = this.element.find('.e-kpi-card-indicator').height();
            var middleContainerHeight = kpiValueHeight;
			var sparklineHt = (this.model.size.height - this.margin) * .2;
            switch (this.model.icon.placement) {
                case BoldBIDashboard.KPICard.IconPlacement.Left:
                    leftValueHeight = leftValueHeight > indicatorHeight ? leftValueHeight : indicatorHeight;
                    break;
                case BoldBIDashboard.KPICard.IconPlacement.Right:
                    rightValueHeight = rightValueHeight > indicatorHeight ? rightValueHeight : indicatorHeight;
                    break;
                default:
                    middleContainerHeight = kpiValueHeight > indicatorHeight ? kpiValueHeight : indicatorHeight;
                    break;
            }
			middleContainerHeight = middleContainerHeight < 40 && this.isImagePresent() ? 40 : middleContainerHeight;
			// Layout Based Logic
                        if (this.model.size.height >= 296 && !this.model.isFixedLayout) {
                margin = (this.isBottomContainerPresent() && (this.isKpiImagewrapperPresent() || this.isTitleWrapperPresent())) ? margin + 26 : margin;
                margin = this.isKpiImagewrapperPresent() && this.isTitleWrapperPresent() ? margin + 8 : margin;
                bottomContainerHeight = leftValueHeight + rightValueHeight + leftCaptionHeight + rightCaptionHeight + 25;
                var borderWidth = Math.max(this.element.find('.e-kpi-card-right-value-caption-text').width(), this.element.find('.e-kpi-card-right-value-text').width(), this.element.find('.e-kpi-card-left-value-caption-text').width(), this.element.find('.e-kpi-card-left-value-text').width());
                this.element.find('.border-line-span').css({ 'width': borderWidth + 'px', 'height': '1px' });
                this.element.find('.border-line').css({ 'height': '25px', 'width': 'Auto' });
                calculatedHeight = (titleHeight + middleContainerHeight + bottomContainerHeight + margin + sparklineHt);
            } else if (this.model.size.width >= 447 && this.model.size.height < 296 && !this.model.isFixedLayout) {
                if (this.element.find('.e-kpi-card-value-container-left').hasClass('e-kpi-card-display-flex') && this.element.find('.e-kpi-card-value-container-right').hasClass('e-kpi-card-display-flex')) {
                    margin += 12;
                } else if (this.isTitleWrapperPresent() && this.isKpiImagewrapperPresent()) {
                    margin += 8;
                }
                bottomContainerHeight = Math.max(leftValueHeight + rightValueHeight, leftCaptionHeight + rightCaptionHeight) + 12;
                var imageWrapperht = middleContainerHeight + titleHeight + 8;
                this.element.find('.border-line-span').css({ 'height': Math.max(bottomContainerHeight, imageWrapperht) + 'px', 'width': '1px' });
                this.element.find('.border-line').css({ 'width': '1px', 'height': 'Auto' });
                calculatedHeight = Math.max(bottomContainerHeight, imageWrapperht) + margin + sparklineHt;
            } else {
                margin = (this.isBottomContainerPresent() && (this.isKpiImagewrapperPresent() || this.isTitleWrapperPresent())) ? margin + 26 : margin;
                margin = this.isKpiImagewrapperPresent() && this.isTitleWrapperPresent() ? margin + 8 : margin;
                margin = (this.element.find('.e-kpi-card-left-icon-value-wrapper').hasClass('e-kpi-card-display-flex')) && ((this.element.find('.e-kpi-card-left-value-caption').hasClass('e-kpi-card-display-flex')) || this.element.find('.e-kpi-card-right-icon-value-wrapper').hasClass('e-kpi-card-display-flex') && this.element.find('.e-kpi-card-right-value-caption').hasClass('e-kpi-card-display-flex')) ? margin + 4 : margin;
                bottomContainerHeight = leftValueHeight + leftCaptionHeight > rightCaptionHeight + rightValueHeight ? leftValueHeight + leftCaptionHeight : rightValueHeight + rightCaptionHeight;
                this.element.find('.border-line-span').css({ 'height': bottomContainerHeight + 'px', 'width': '1px' });
                this.element.find('.border-line').css({ 'width': '1px', 'height': 'Auto' });
                calculatedHeight = (titleHeight + middleContainerHeight + bottomContainerHeight + margin + sparklineHt);

                var tempMargin = 26;
                var titleWrapperTopMargin = 4;
                if (this.model.responsiveMargin && this.model.isFixedLayout) {
                    var cardHt_Copy = cardHt;
                    while (cardHt_Copy < calculatedHeight) {
                        cardHt_Copy = cardHt_Copy + 2;
                        tempMargin = tempMargin - 2;
                        if (tempMargin < 4) {
                            var diff = 4 - tempMargin;
                            tempMargin = 4;
                            cardHt_Copy = cardHt_Copy - diff;
                            break;
                        }
                    }
                    if (cardHt_Copy < calculatedHeight) {
                        titleWrapperTopMargin = 2;
                    }
                    this.element.find('.e-kpi-card-title-wrapper').css('margin-top', titleWrapperTopMargin + 'px');
                    this.element.find('.e-kpi-card-kpi-image-wrapper').css('margin-bottom', titleWrapperTopMargin + 'px');
                    this.element.find('.e-kpi-card-content-image-wrapper').css('margin-bottom', (tempMargin / 2) + 'px');
                    this.element.find('.e-kpi-card-value-container-bottom').css('margin-top', + (tempMargin / 2) + 'px');
                }
            }
			var wrapperHt = calculatedHeight;
            if (cardHt < wrapperHt) {
                var tempHt = wrapperHt - sparklineHt;
                if (cardHt > tempHt) {					
					if(this.isBottomContainerPresent() || this.isTitleWrapperPresent() || this.isKpiImagewrapperPresent()){
						this.hideSparkline();
						wrapperHt = tempHt;
					} else {
						wrapperHt = cardHt;
					}
                } else {
                    if (this.model.size.width >= 447 && this.model.size.height < 296 && !this.model.isFixedLayout) {				
						if(this.isTitleWrapperPresent() || this.isKpiImagewrapperPresent()){
							tempHt = imageWrapperht + margin;
							if (cardHt > tempHt) {							
								this.hideValueContainerBottom();
								this.hideSparkline();
								wrapperHt = tempHt;						
							} else if(this.isKpiImagewrapperPresent()){
								tempHt = wrapperHt - sparklineHt - titleHeight;
								if(cardHt > tempHt) {									
									this.hideSparkline();
									this.hideTitle();
									wrapperHt = tempHt;
								} else {
									this.hideValueContainerBottom();									
									this.hideTitle();
									this.hideSparkline();
									wrapperHt = cardHt;
								}
							} else {
								this.hideSparkline();
								this.hideValueContainerBottom();
								wrapperHt = cardHt;
							}
						} else {

							this.hideSparkline();
							wrapperHt = cardHt;
						}
						this.updateBorderLineVisibility();
					}else {
						tempHt = wrapperHt - bottomContainerHeight - sparklineHt;
						if (cardHt > tempHt) {
							if(this.isTitleWrapperPresent() || this.isKpiImagewrapperPresent()) {
								this.hideValueContainerBottom();
								this.hideSparkline();
								wrapperHt = tempHt;
							} else {
								this.hideSparkline();
								wrapper = cardHt;
							}
						} else {
							tempHt = wrapperHt - bottomContainerHeight - sparklineHt - titleHeight;
							if(this.isKpiImagewrapperPresent()){
								this.hideValueContainerBottom();
								this.hideSparkline();
								this.hideTitle();
								wrapperHt = tempHt;
							} else if(this.isTitleWrapperPresent()) {
								this.hideValueContainerBottom();
								this.hideSparkline();
								wrapperHt = cardHt;
							} else {
								this.hideSparkline();
								wrapperHt = cardHt;
							}							
						}					
					}
                }
            } else {
				wrapperHt = calculatedHeight - sparklineHt;
			}		
            
            return wrapperHt;
        },

        responsiveLayout: function() {
			this.updateSparklineContainer();
			this.rearrangeElements();			
			this.updateBottomContainer();
            if (this.width >= 250 && !this.isNullOrEmptyOrUndefined(this.model.image.data) && this.model.image.visibility) {
                this.showImage();
                this.hideInformationIcon();
            } else {
                this.hideImage();
                if (this.model.informationIcon.visibility && this.model.image.visibility && !this.isNullOrEmptyOrUndefined(this.model.image.data)) {
                    this.showInformationIcon();
                } else {
                    this.hideInformationIcon();
                }
            }
			this.updateMiddleValueContainer();
			this.updateContentImageWrapper();
		    this.updateContentWidth();
            this.resizeBackgroundContainer();
            // Width Based
			if (this.width < 110) {
                if (this.model.icon.placement === BoldBIDashboard.KPICard.IconPlacement.Middle && this.model.icon.visibility) {
                    this.hideKPIValue();
                    //var kpiIndicator = this.element.find('.e-kpi-card-indicator-container');
                    //this.justifyCenter(bbdesigner$(kpiIndicator));
                }
            } else {
                if (this.model.kpiValue.visibility) {
                    this.showKPIValue();
                }
                //if (this.model.icon.visibility) {
                //    var kpiContainer = this.element.find('.e-kpi-card-middle-value-container');                   
                //    this.justifyStart(bbdesigner$(kpiContainer));
                //    this.justifyEnd(bbdesigner$(kpiIndicator));
                //}             

            }
			this.setValueWrapperHeight();
			this.resizeSparklineContainer();
			this.updateMargins();
            this.applyAnimation();
        },
		rearrangeElements: function(){
			var border = this.element.find('.border-line');
			var leftValueCaption = this.element.find('.e-kpi-card-left-value-caption');
			var rtValueCaption = this.element.find('.e-kpi-card-right-value-caption');
			var leftIconValueWrapper = this.element.find('.e-kpi-card-left-icon-value-wrapper');
			var rtIconValueWrapper = this.element.find('.e-kpi-card-right-icon-value-wrapper');
            if (this.model.size.width >= 447 && this.model.size.height < 296 && !this.model.isFixedLayout){
				this.element.find('.e-kpi-card-value-wrapper').removeClass('e-kpi-card-default-layout');
				this.element.find('.e-kpi-card-value-wrapper').removeClass('e-kpi-card-vertical-layout');
				this.element.find('.e-kpi-card-value-wrapper').addClass('e-kpi-card-horizontal-layout');
				var bottom = this.element.find('.e-kpi-card-value-container-bottom');
                bottom.before(border);
				leftIconValueWrapper.before(leftValueCaption);
				this.element.find('.e-kpi-card-left-value-caption-text').css('line-height', 1.5);
				this.element.find('.e-kpi-card-right-value-caption-text').css('line-height', 1.5);
				rtIconValueWrapper.before(rtValueCaption);
            } else if (this.model.size.height >= 296 && !this.model.isFixedLayout){
				this.element.find('.e-kpi-card-value-wrapper').removeClass('e-kpi-card-default-layout');
				this.element.find('.e-kpi-card-value-wrapper').removeClass('e-kpi-card-horizontal-layout');
				this.element.find('.e-kpi-card-value-wrapper').addClass('e-kpi-card-vertical-layout');
				var rtValueCont = this.element.find('.e-kpi-card-value-container-right');
				rtValueCont.before(border);
				this.element.find('.e-kpi-card-left-value-caption-text').css('line-height', 1.25);
				this.element.find('.e-kpi-card-right-value-caption-text').css('line-height', 1.25);				
				leftIconValueWrapper.after(leftValueCaption);
				rtIconValueWrapper.after(rtValueCaption);
			} else {
				this.element.find('.e-kpi-card-value-wrapper').removeClass('e-kpi-card-horizontal-layout');
				this.element.find('.e-kpi-card-value-wrapper').removeClass('e-kpi-card-vertical-layout');
				this.element.find('.e-kpi-card-value-wrapper').addClass('e-kpi-card-default-layout');
				var rtValueCont = this.element.find('.e-kpi-card-value-container-right');
				rtValueCont.before(border);
				this.element.find('.e-kpi-card-left-value-caption-text').css('line-height', 1.25);
				this.element.find('.e-kpi-card-right-value-caption-text').css('line-height', 1.25);				
				leftIconValueWrapper.after(leftValueCaption);
				rtIconValueWrapper.after(rtValueCaption);		
			}
		},	
		updateMargins: function() {
            var isHorizontal = this.model.size.width >= 447 && this.model.size.height < 296 && !this.model.isFixedLayout;
			var isBottomContainerPresent = this.element.find('.e-kpi-card-value-container-bottom').hasClass('e-kpi-card-display-flex');
			var isContentWrapperPresent = this.element.find('.e-kpi-card-content-image-wrapper').hasClass('e-kpi-card-display-flex');
			var isTitleWrapperPresent = this.element.find('.e-kpi-card-title-wrapper').hasClass('e-kpi-card-display-flex');
			var isKpiWrapperPresent = this.element.find('.e-kpi-card-kpi-image-wrapper').hasClass('e-kpi-card-display-flex');
            if (!this.model.responsiveMargin) {
                this.element.find('.e-kpi-card-content-image-wrapper').css('margin-bottom', isBottomContainerPresent && !isHorizontal ? '13px' : '0px');
                this.element.find('.e-kpi-card-value-container-bottom').css('margin-top', isContentWrapperPresent && !isHorizontal ? '13px' : '0px');
                this.element.find('.e-kpi-card-kpi-image-wrapper').css('margin-bottom', isTitleWrapperPresent ? '4px' : '0px');
                this.element.find('.e-kpi-card-title-wrapper').css('margin-top', isKpiWrapperPresent ? '4px' : '0px');
            }
			this.element.find('.e-kpi-card-value-container-left').css('margin-bottom', isHorizontal ? '6px' : '0px');
			this.element.find('.e-kpi-card-value-container-right').css('margin-top', isHorizontal ? '6px' : '0px');
		},
        applyAnimation: function() {
            if (this.model.animationSettings.enableAnimation) {
                if (this.model.kpiValue.visibility) {
                    var kpiItem = this.element.find('.e-kpi-card-middle-value-text');
                    bbdesigner$(kpiItem).stop();
                    bbdesigner$(kpiItem).prop('Counter', 0).animate({
                        Counter: this.getCalculatedValue(this.model.kpiValue.type)
                    }, {
                        duration: this.model.animationSettings.animationDuration,
                        easing: 'swing',
                        step: bbdesigner$.proxy(this.animateNumbers, this)
                    });
                }
                if (this.model.leftValue.visibility) {
                    var leftItem = this.element.find('.e-kpi-card-left-value-text');
                    bbdesigner$(leftItem).stop();
                    bbdesigner$(leftItem).prop('Counter', 0).animate({
                        Counter: this.getCalculatedValue(this.model.leftValue.type)
                    }, {
                        duration: this.model.animationSettings.animationDuration,
                        easing: 'swing',
                        step: bbdesigner$.proxy(this.animateLeftNumbers, this)
                    });
                }
                if (this.model.rightValue.visibility) {
                    var rightItem = this.element.find('.e-kpi-card-right-value-text');
                    bbdesigner$(rightItem).stop();
                    bbdesigner$(rightItem).prop('Counter', 0).animate({
                        Counter: this.getCalculatedValue(this.model.rightValue.type)
                    }, {
                        duration: this.model.animationSettings.animationDuration,
                        easing: 'swing',
                        step: bbdesigner$.proxy(this.animateRightNumbers, this)
                    });
                }
            }
        },
        animateLeftNumbers: function(value) {
            if (!BoldBIDashboard.isNullOrUndefined(this.element)) {
                var leftItem = this.element.find('.e-kpi-card-left-value-text');
                var formatSettings = JSON.parse(JSON.stringify(this.model.valueRepresentation));
                if (this.formatting.isIntegerValue(this.getCalculatedValue(this.model.kpiValue.type)) && value !== this.getCalculatedValue(this.model.leftValue.type)) {
                    formatSettings.numberOfDecimals = 0;
                }
                bbdesigner$(leftItem).text(this.formatting.applyFormat(value, formatSettings));
            }
        },
        animateRightNumbers: function(value) {
            if (!BoldBIDashboard.isNullOrUndefined(this.element)) {
                var leftItem = this.element.find('.e-kpi-card-right-value-text');
                var formatSettings = JSON.parse(JSON.stringify(this.model.valueRepresentation));
                if (this.formatting.isIntegerValue(this.getCalculatedValue(this.model.kpiValue.type)) && value !== this.getCalculatedValue(this.model.rightValue.type)) {
                    formatSettings.numberOfDecimals = 0;
                }
                bbdesigner$(leftItem).text(this.formatting.applyFormat(value, formatSettings));
            }
        },
        animateNumbers: function(value) {
            if (!BoldBIDashboard.isNullOrUndefined(this.element)) {
                var kpiItem = this.element.find('.e-kpi-card-middle-value-text');
                var formatSettings = JSON.parse(JSON.stringify(this.model.valueRepresentation));
                if (this.formatting.isIntegerValue(this.getCalculatedValue(this.model.kpiValue.type)) && value !== this.getCalculatedValue(this.model.kpiValue.type)) {
                    formatSettings.numberOfDecimals = 0;
                }
                switch (this.model.kpiValue.type) {
                    case BoldBIDashboard.KPICard.ValueType.AbsoluteDifference:
                    case BoldBIDashboard.KPICard.ValueType.ActualValue:
                    case BoldBIDashboard.KPICard.ValueType.TargetValue:
                        bbdesigner$(kpiItem).text(this.formatting.applyFormat(value, formatSettings));
                        break;
                    default:
                        bbdesigner$(kpiItem).text(this.adjustDemicalPlacesOnly(value, formatSettings));
                        break;
                }
            }
        },

        //#region update container elements

        updateTitleContainer: function() {
            if (this.model.title.visibility && !this.isNullOrEmptyOrUndefined(this.model.title.text)) {
                this.showTitle();
            } else {
                this.hideTitle();
            }
        },
        updateMiddleValueContainer: function() {
            var kpiIndicator = this.element.find('.e-kpi-card-indicator-container');
            var kpiValue = this.element.find('.e-kpi-card-middle-value-container');
            if (this.model.kpiValue.visibility || (this.model.icon.visibility && this.model.icon.placement === BoldBIDashboard.KPICard.IconPlacement.Middle)) {
                this.showValueContainerMiddle();
				this.showImageWrapper();				
            } else {
                this.hideValueContainerMiddle();
				if(this.isImagePresent()){
					this.showImageWrapper();
				} else{
					this.hideImageWrapper();
				}
            }
            if (this.model.kpiValue.visibility) {
                this.showKPIValue();
            } else {
                this.hideKPIValue();
            }
        },
		updateContentImageWrapper: function() {
			if(this.element.find('.e-kpi-card-title-wrapper').hasClass('e-kpi-card-display-flex') || this.element.find('.e-kpi-card-kpi-image-wrapper').hasClass('e-kpi-card-display-flex')){
				this.showContentImageWrapper();
			} else {
				this.hideContentImageWrapper();
			}
		},			
        updateBottomContainer: function() {
            this.updateLeftValueContainer();
            this.updateRightValueContainer();
            if (this.element.find('.e-kpi-card-value-container-left').hasClass('e-kpi-card-display-none') && this.element.find('.e-kpi-card-value-container-right').hasClass('e-kpi-card-display-none')) {
                this.hideValueContainerBottom();
            } else {
                this.showValueContainerBottom();
                this.updateBottomContainerElementsAlingment();
            }
			this.updateBorderLineVisibility();
        },
        updateLeftValueContainer: function() {
            var leftValueContainer = this.element.find('.e-kpi-card-value-container-left');
            if ((this.model.leftValue.captionVisibility && !this.isNullOrEmptyOrUndefined(this.model.leftValue.caption)) || this.model.leftValue.visibility || (this.model.icon.placement === BoldBIDashboard.KPICard.IconPlacement.Left && this.model.icon.visibility)) {
                this.showLeftValueContainer();
            } else {
                this.hideLeftValueContainer();
            }
            this.updateLeftCaptionVisibility();
            this.updateLeftIconValueWrapper();
            this.updateLeftValueVisibility();
            this.leftContainerElementsAlignment();
        },
        updateLeftIconValueWrapper: function() {
            if (this.model.leftValue.visibility || this.model.icon.placement === BoldBIDashboard.KPICard.IconPlacement.Left && this.model.icon.visibility) {
                this.showLeftIconValueWrapper();
            } else {
                this.hideLeftIconValueWrapper();
            }
        },
        updateLeftValueVisibility: function() {
            if (this.model.leftValue.visibility) {
                this.showLeftValue();
            } else {
                this.showLeftValue();
            }
        },
        updateLeftCaptionVisibility: function() {
            if (this.model.leftValue.captionVisibility && !this.isNullOrEmptyOrUndefined(this.model.leftValue.caption)) {
                this.showLeftCaption();
            } else {
                this.hideLeftCaption();
            }
        },
        updateRightValueContainer: function() {
            var rightValueContainer = this.element.find('.e-kpi-card-value-container-right');
            if ((this.model.rightValue.captionVisibility && !this.isNullOrEmptyOrUndefined(this.model.rightValue.caption)) || this.model.rightValue.visibility || (this.model.icon.placement === BoldBIDashboard.KPICard.IconPlacement.Right && this.model.icon.visibility)) {
                this.showRightValueContainer();
            } else {
                this.hideRightValueContainer();
            }
            this.updateRightCaptionVisibility();
            this.updateRightIconValueWrapper();
            this.updateRightValueVisibility();
            this.rightContainerElementsAlignment();
        },
        updateRightIconValueWrapper: function() {
            if (this.model.rightValue.visibility || this.model.icon.placement === BoldBIDashboard.KPICard.IconPlacement.Right && this.model.icon.visibility) {
                this.showRightIconValueWrapper();
            } else {
                this.hideRightIconValueWrapper();
            }
        },
        updateRightValueVisibility: function() {
            if (this.model.rightValue.visibility) {
                this.showRightValue();
            } else {
                this.hideRightValue();
            }
        },
        updateRightCaptionVisibility: function() {
            if (this.model.rightValue.captionVisibility && !this.isNullOrEmptyOrUndefined(this.model.rightValue.caption)) {
                this.showRightCaption();
            } else {
                this.hideRightCaption();
            }
        },
        updateBottomContainerElementsAlingment: function() {
            var bottomContainerElements = this.element.find('.e-kpi-card-value-container-bottom').children();
            for (var i = 0; i <= bottomContainerElements.length; i++) {
                //if (!this.model.kpiValue.visibility && !this.model.icon.visibility || !this.model.title.visibility) {
                //    this.justifyCenter(bbdesigner$(bottomContainerElements[i]));
                //} else {
                // }
				if(!(bbdesigner$(bottomContainerElements[i]).hasClass('border-line'))){					
					this.justifyCenter(bbdesigner$(bottomContainerElements[i]));					
				}
            }
        },
        updateIndicatorContainer: function() {
            if (this.model.icon.visibility) {
                this.showIndicator();
            } else {
                this.hideIndicator();
            }
            var parentContainer = this.getIconParent();
			var icon = this.element.find('.e-kpi-card-indicator-container');
            if (this.model.icon.position === BoldBIDashboard.KPICard.IconPosition.Right) {
                icon.detach().appendTo(parentContainer);
				var marginRt = this.model.icon.placement === BoldBIDashboard.KPICard.IconPlacement.Left ? '0px' : '8px';
				icon.css({'margin-left':'8px', 'margin-right' : marginRt });
            } else {
                icon.detach().prependTo(parentContainer);
				var marginLt = this.model.icon.placement === BoldBIDashboard.KPICard.IconPlacement.Right ? '0px' : '8px';
			    icon.css({'margin-left': marginLt, 'margin-right' : '8px' });
            }
        },
        updateSparklineContainer: function() {
            this.element.find('.e-kpi-card-sparkline-container');
            if (this.isSparklinePresent()) {
                this.showSparkline();
            } else {
                this.hideSparkline();
            }
        },
        resizeBackgroundContainer: function() {            
                this.element.find('.e-kpi-card-background-image-container').addClass('e-kpi-card-plotarea-default');
                this.element.find('.e-kpi-card-background-image-container').removeClass('e-kpi-card-plotarea-content');
        },
        updateVerticalAlignment: function() {
            var titleContainer = this.element.find('.e-kpi-card-title-container');
            var middleContainer = this.element.find('.e-kpi-card-value-container-middle');
            var bottomContainer = this.element.find('.e-kpi-card-value-container-bottom');
            this.setAlignment(titleContainer, this.model.alignment.titleContainer);
            this.setAlignment(middleContainer, this.model.alignment.kpiContainer);
            this.setAlignment(bottomContainer, this.model.alignment.bottomContainer);

        },
        setAlignment: function(element, value) {
            switch (value) {
                case BoldBIDashboard.KPICard.Alignment.Center:
                    this.alignCenter(element);
                    break;
                case BoldBIDashboard.KPICard.Alignment.Start:
                    this.alignStart(element);
                    break;
                case BoldBIDashboard.KPICard.Alignment.End:
                    this.alignEnd(element);
                    break;
            }
        },

        //#endregion

        //#region Helper methods
		isKpiImagewrapperPresent: function() {
			return this.element.find('.e-kpi-card-kpi-image-wrapper').hasClass('e-kpi-card-display-flex');
		},
		isTitleWrapperPresent: function() {
			return this.element.find('.e-kpi-card-title-wrapper').hasClass('e-kpi-card-display-flex')
		},
        isLeftAndRightPresent: function() {
            return ((this.model.leftValue.visibility || (this.model.leftValue.captionVisibility && !this.isNullOrEmptyOrUndefined(this.model.leftValue.caption)) || (this.model.icon.placement === BoldBIDashboard.KPICard.IconPlacement.Left && this.model.icon.visibility)) && (this.model.rightValue.visibility || (this.model.rightValue.captionVisibility && !this.isNullOrEmptyOrUndefined(this.model.rightValue.caption)) || (this.model.icon.placement === BoldBIDashboard.KPICard.IconPlacement.Right && this.model.icon.visibility)));
        },
        isAnyBottomContainerElementPresent: function() {
            return this.model.icon.placement === BoldBIDashboard.KPICard.IconPlacement.Left && this.model.icon.visibility && this.element.find('.e-kpi-card-indicator-container').hasClass('e-kpi-card-display-flex') || this.model.leftValue.visibility && this.element.find('.e-kpi-card-left-value').hasClass('e-kpi-card-display-flex') || (this.model.leftValue.captionVisibility && !this.isNullOrEmptyOrUndefined(this.model.leftValue.caption)) && this.element.find('.e-kpi-card-left-value-caption').hasClass('e-kpi-card-display-flex') || this.model.rightValue.visibility && this.element.find('.e-kpi-card-right-value').hasClass('e-kpi-card-display-flex') || (this.model.rightValue.captionVisibility && !this.isNullOrEmptyOrUndefined(this.model.rightValue.caption)) && this.element.find('.e-kpi-card-right-value-caption').hasClass('e-kpi-card-display-flex') || this.model.icon.placement === BoldBIDashboard.KPICard.IconPlacement.Right && this.model.icon.visibility && this.element.find('.e-kpi-card-indicator-container').hasClass('e-kpi-card-display-flex');
        },
        isBottomContainerPresent: function() {
            return this.element.find('.e-kpi-card-value-container-bottom').hasClass('e-kpi-card-display-flex');
        },
        isImagePresent: function() {
            return this.element.find('.e-kpi-card-image-wrapper').hasClass('e-kpi-card-display-flex') && this.model.image.visibility;
        },
		isSparklinePresent: function(){
			return this.model.sparkline.visibility && !BoldBIDashboard.isNullOrUndefined(this.model.sparkline.data) && this.model.sparkline.data.length > 0;
		},
        leftContainerElementsAlignment: function() {
            var isRtContHidden = !this.model.rightValue.visibility && (!this.model.rightValue.captionVisibility || this.isNullOrEmptyOrUndefined(this.model.leftValue.caption)) && !(this.model.icon.placement === BoldBIDashboard.KPICard.IconPlacement.Right && this.model.icon.visibility);            
            if (this.model.size.width >= 447 && this.model.size.height < 296 && !this.model.isFixedLayout){
				var leftCaption = this.element.find('.e-kpi-card-left-value-caption');
				var leftValue = this.element.find('.e-kpi-card-left-icon-value-wrapper');
				var isCaptionandValuePresent = leftCaption.hasClass('e-kpi-card-display-flex') && leftValue.hasClass('e-kpi-card-display-flex');
				if(isRtContHidden) {
					this.alignCenter(leftCaption);
					this.alignCenter(leftValue);					 
				} else {
					this.alignEnd(leftCaption);
					this.alignEnd(leftValue);					
				}
				if(isCaptionandValuePresent){						
					this.justifyEnd(leftCaption);
					this.justifyStart(leftValue);
				} else {						
					this.justifyCenter(leftCaption);
					this.justifyCenter(leftValue);
				}
			} else {
				var leftContainerElements = this.element.find('.e-kpi-card-value-container-left').children();
				for (var i = 0; i <= leftContainerElements.length; i++) {
					if (isRtContHidden) {
						this.justifyCenter(bbdesigner$(leftContainerElements[i]));
					} else {
                        if (this.model.size.height >= 296 && !this.model.isFixedLayout){
							this.justifyCenter(bbdesigner$(leftContainerElements[i]));
						} else {
							this.justifyEnd(bbdesigner$(leftContainerElements[i]));
						}
					}
				}
			}
        },

        updateBorderLineVisibility: function() {
            var showBorder = this.model.separator.visibility && (this.model.size.width >= 447 && this.model.size.height < 296 ? this.element.find('.e-kpi-card-value-container-bottom').hasClass('e-kpi-card-display-flex') && this.element.find('.e-kpi-card-content-image-wrapper').hasClass('e-kpi-card-display-flex') : this.isLeftAndRightPresent());
            if (showBorder) {
                this.showBorderLine();
            }else {
                this.hideBorderLine();
			}
        },

        rightContainerElementsAlignment: function() {
            var isLftContHidden = !this.model.leftValue.visibility && (!this.model.leftValue.captionVisibility || this.isNullOrEmptyOrUndefined(this.model.leftValue.caption)) && !(this.model.icon.placement === BoldBIDashboard.KPICard.IconPlacement.Left && this.model.icon.visibility);
            if (this.model.size.width >= 447 && this.model.size.height < 296 && !this.model.isFixedLayout){
				var rtCaption = this.element.find('.e-kpi-card-right-value-caption');
				var rtValue = this.element.find('.e-kpi-card-right-icon-value-wrapper');
				var isCaptionandValuePresent = rtCaption.hasClass('e-kpi-card-display-flex') && rtValue.hasClass('e-kpi-card-display-flex');
				if(isLftContHidden) {
					this.alignCenter(rtCaption);
					this.alignCenter(rtValue);					 
				} else {
					this.alignStart(rtCaption);
					this.alignStart(rtValue);					
				}
				if(isCaptionandValuePresent){						
					this.justifyEnd(rtCaption);
					this.justifyStart(rtValue);
				} else {						
					this.justifyCenter(rtCaption);
					this.justifyCenter(rtValue);
				}
			} else {
				var rightContainerElements = this.element.find('.e-kpi-card-value-container-right').children();
				for (var i = 0; i <= rightContainerElements.length; i++) {				
					if (isLftContHidden) {
						this.justifyCenter(bbdesigner$(rightContainerElements[i]));
					} else {
                        if (this.model.size.height >= 296 && !this.model.isFixedLayout) {
							this.justifyCenter(bbdesigner$(rightContainerElements[i]));
						} else {
							this.justifyStart(bbdesigner$(rightContainerElements[i]));
						}
					}
				}
			}
        },
        isNullOrEmptyOrUndefined: function(text) {
            return (text === null || text === "" || typeof text === "undefined"); // eslint-disable-line no-extra-parens
        },

        //#endregion

        _destroy: function() {
            this.unwireEvents();
            this.element.empty();
        },
        _selectedHandler: function(evt) {
            var that = this;
            this.singleTimer = setTimeout(function() {
                var args = {};
                if (that.model.selected) {
                    args = { model: that.model, currentTarget: bbdesigner$('#' + that.element.attr('id')), PageX:evt.pageX, PageY:evt.pageY },
                        that._trigger("selected", args);
                    evt.stopPropagation();
                    evt.bubbles = false;
                }
            }, 400);
        },

    });

    BoldBIDashboard.KPICard.ValueType = {
        AbsoluteDifference: "Absolute Difference",
        PercentOfDifference: "Percent of Difference",
        PercentOfTarget: "Percent of Target",
        ActualValue: "Actual Value",
        TargetValue: "Target Value",
        PercentOfChange: "Percent of Change"
    };
    BoldBIDashboard.KPICard.SparklineType = {
        Line: "line",
        Column: "column",
        Area: "area"
    };
    BoldBIDashboard.KPICard.ImageModes = {
        Default: "Default",
        Fill: "Fill",
        Uniform: "Uniform",
        UniformToFill: "Uniform To Fill"
    };
    BoldBIDashboard.KPICard.Representation = {
        Auto: "Auto",
        Ones: "Ones",
        Thousands: "Thousands",
        Lakhs: "Lakhs",
        Millions: "Millions",
        Crores: "Crores",
        Billions: "Billions"
    };
    BoldBIDashboard.KPICard.Format = {
        Number: "Number",
        Currency: "Currency",
        Percentage: "Percentage"
    };
    BoldBIDashboard.KPICard.NegativeValueFormat = {
        Default: "default",
        NoNegativeSignWithBracket: "nonegativesignwithbracket",
        NegativeSignInSuffix: "negativesigninsuffix"
    };
    BoldBIDashboard.KPICard.PlotArea = {
        Complete: 'Complete',
        KPIBackground: 'KPI Background'
    };
    BoldBIDashboard.KPICard.ImageType = {
        URL: 'url',
        Base64: 'base64'
    };
    BoldBIDashboard.KPICard.IconPlacement = {
        Middle: 'KPI Value',
        Left: 'Left Value',
        Right: 'Right Value'
    };
    BoldBIDashboard.KPICard.IconPosition = {
        Left: 'Left',
        Right: 'Right'
    };
    BoldBIDashboard.KPICard.Alignment = {
        Start: 'Start',
        Center: 'Center',
        End: 'End'
    };
})(bbdesigner$, SyncfusionBoldBIDashboard);;
(function(bbdesigner$, BoldBIDashboard, undefined) {
    BoldBIDashboard.widget("BoldBIDashboardNumberCard", "BoldBIDashboard.NumberCard", {
        element: null,
        model: null,
        defaults: {
            title: {
                text: '',
                foreground: 'black',
                visibility: true,
                fontSize: '14',
                fontFamily: '',
                fontWeight: '',
                isColorCustomized: false,
                position: 'Bottom',
                enableWrap: false,
                fontSettings: {
                    IsBold: false,
                    IsItalic: false,
                    IsUnderLine: false,
                    IsStrikeThrough: false
                }
            },
            description: {
                text: '',
                visibility: false,
                color: '#1a1a1a'
            },
            animationSettings: {
                enableAnimation: true,
                animationDuration: 1500
            },
            measure: {
                text: '',
                foreground: 'black',
                visibility: true,
                fontSize: '36',
                fontFamily: '',
                fontWeight: '',
                isColorCustomized: false,
                fontSettings: {
                    IsBold: false,
                    IsItalic: false,
                    IsUnderLine: false,
                    IsStrikeThrough: false
                }
            },
            valueRepresentation: {
                format: 'Number',
                representation: 'Auto',
                numberOfDecimals: 2,
                currencyCulture: 'en-US',
                decimalSeparator: {
                    CurrentValue: '.',
                    AliasValue: '.'
                },
                groupSeparator: {
                    CurrentValue: ',',
                    AliasValue: ','
                },
                negativeValueFormat: 'default',
                prefix: '',
                suffix: '',
				enableLakhsAndCroreRep: false
            },
            dimension: {
                text: '',
                foreground: 'black',
                visibility: true,
                fontSize: '24',
                isColorCustomized: false,
                fontSettings: {
                    IsBold: false,
                    IsItalic: false,
                    IsUnderLine: false,
                    IsStrikeThrough: false
                }
            },
            icon: {
                type: null,
                path: '',
                color: '',
                followDirectionColor: true,
                visibility: false,
                fontSize: '',
                customizedIcon: '',
                isIconCustomized: false,
                mode: ''

            },
            image: {
                mode: 'Fill',
                data: null,
                visibility: true,
                isImageCustomized: false,
                position: 'Right'
            },
            background: {
                mode: 'Fill',
                image: null,
                showImage: true,
                plotArea: 'default',
                color: '',
                opacity: '',
                isColorCustomized: false,
                isImageCustomized: false
            },
            sparkline: {
                data: null,
                fill: '',
                type: 'area',
                visibility: false,
                opacity: .2,
                followDirectionColor: true,
                isColorCustomized: false
            },
            hiddenColumns: [],
            informationIcon: {
                visibility: false
            },
            alignment: {
                horizontal: 'Left',
                vertical: 'Top',
            },
            autoFontSize: {
                fontSizeFactor: 1,
                enable: false,
                measureText: '',
                titleText: ''
            },
            responsiveMargin: false,
            tooltip: {
                class: '',
                attribute: '',
                text: ''
            },
        },
        _init: function () {
            this._initializePrivateVariables();
            this._createLayout();
            this._wireEvents();
            this._updateVisibility();
            this._updateData();
            //this._updateWrapperHeight();
            this._updateCardAlignment();
            this._responsiveLayout();
        },
        _initializePrivateVariables: function () {
            this.margin = 0;
            this._tooltipClass = this.model.tooltip.class;
            this.formatting = new NumberFormatting();
            this._initializeMargins();
        },
        _initializeMargins: function () {
            this.marginTop = this.model.alignment.vertical === 'Center' ? 0 : this.model.alignment.vertical === 'Bottom' ? 2 : window.screen.width < 1920 ? 8 : 12;
            this.marginTopWithSparkline = this.model.alignment.vertical === 'Center' ? 0 : this.model.alignment.vertical === 'Bottom' ? 2 : window.screen.width < 1920 ? 8 : 12;
            this.inBetweenMargin = window.screen.width < 1920 ? 4 : 4;
            this.bottomMargin = this.model.alignment.vertical === 'Center' ? 0 : this.model.alignment.vertical === 'Top' ? 2 : window.screen.width < 1920 ? 8 : 12;
            this.bottomMarginWithSparkline = this.model.alignment.vertical === 'Center' ? 0 : this.model.alignment.vertical === 'Top' ? 2 : window.screen.width < 1920 ? 8 : 12;
        },
        _wireEvents: function () {
            this._on(this.element, "click", this._selectedHandler);
        },
        _unwireEvents: function () {
            this._off(this.element, "click", this._selectedHandler);
        },
        _setModel: function (options) {
            for (var prop in options) {
                if (options.hasOwnProperty(prop)) { // eslint-disable-line  no-prototype-builtins
                    switch (prop) {
                        case 'icon':
                            this.updateMiddleValueContainer();
                            this.updateIcon();
                            // when middle value container is hidden or visibile from the hidden state, then the bottom container alignment must be changed. So it is invoked below.
                            this.updateBottomContainerElementsAlingment();
                            this.responsiveLayout();
                            //this._updateWrapperHeight();
                            break;
                        case 'title':
                            this._updateTitleVisibility();
                            this._updateTitle();
                            this._responsiveLayout();
                            //this._updateWrapperHeight();
                            break;
                        case 'description':
                            this._updateDescriptionVisibility();
                            this._updateDescription();
                            this._responsiveLayout();
                            break;
                        case 'image':
                            this._updateImage();
                            this._responsiveLayout();
                            break;
                        case 'sparkline':
                            this._updateSparklineVisibility();
                            this._updateSparkline();
                            this._responsiveLayout();
                            break;
                        case 'informationIcon':
                            this._responsiveLayout();
                            break;
                        case 'size':
                            this._initializeMargins();
                            this._updateTitle();
                            this._updateMeasure();
                            this._resize();
                            break;
                        case 'measure':
                            this._updateMeasureVisibility();
                            this._updateMeasure();
                            this._applyAnimation();
                            this._responsiveLayout();
                            break;
                        case 'animationSettings':
                            this._applyAnimation();
                            break;
                        case 'dimension':
                            this._updateDimensionVisibility();
                            this._updateDimension();
                            this._applyAnimation();
                            this._updateWrapperHeight();
                            break;
                        case 'colorSettings':
                            this._updateMeasure();
                            this._updateDimension();
                            this._updateIcon();
                            this._updateSparklineColor();
                            this._applyAnimation();
                            break;
                        case 'background':
                            this._resizeBackgroundContainer();
                            this._updateBackgroundImage();
                            this._applyAnimation();
                            break;
                        case 'tooltip':
                            this._updateElementsTooltip();
                            this._updateInformationTooltip();
                            this._applyAnimation();
                            this._tooltipClass = this.model.tooltip.class;
                            break;
                        case 'alignment':
                            this._updateCardAlignment();
                            this._initializeMargins();
                            this._responsiveLayout();
                            break;
                        case 'autoFontSize':
                            this._updateTitle();
                            this._updateMeasure();
                            this._responsiveLayout();
                            break;
                        case 'responsiveMargin':
                            this._initializeMargins();
                            this._responsiveLayout();
                            break;
                        default:
                            break;

                    }
                }
            }
        },
        _createLayout: function () {
            var parentElement = this.element;
            parentElement.css({ 'height': this.model.size.height + 'px', 'width': this.model.size.width + 'px' });
            this._createBackgroundImageWrapper();
            var cardSparklineWrapper = bbdesigner$('<div>').addClass('e-number-card-sparkline-wrapper').css({ 'height': (this.model.size.height - this.margin) + 'px', 'width': (this.model.size.width - this.margin) + 'px' });
            parentElement.append(cardSparklineWrapper);
            this._createIconWrapper();
            this._createCardWrapperParent();
            this._createCardWrapper();
            // this._createTableCellElement();
            this._createCardValueWrapper();
            this._creteContentWrapper();
            this._createImageElement();
            this._createMeasureWrapper();
            this._createTitleElement();
            this._createDimensionContainer();
            this._createIconElement();
            this._createnumberElement();
            this._createSparklineContainer();
        },
        _updateVisibility: function () {
            this._updateTitleVisibility();
            this._updateDescriptionVisibility();
            this._updateDimensionVisibility();
            this._updateIconVisibility();
            this._updateMeasureVisibility();
            this._updateImageVisibility();
            this._resizeBackgroundContainer();
            this._updateSparklineVisibility();
            this._updateContentImageWrapper();
            this._updateMargin();
        },
        _updateData: function () {
            this._updateTitle();
            this._updateDescription();
            this._updateDimension();
            this._updateMeasure();
            this._updateIcon();
            this._updateImage();
            this._updateBackgroundImage();
            this._updateSparkline();
            this._updateInformationTooltip();
        },
        _createIconWrapper: function () {
            var cardSparklineWrapper = bbdesigner$(this.element).find('.e-number-card-sparkline-wrapper');
            var iconWrapper = bbdesigner$('<div>').addClass('e-number-card-information-wrapper e-number-card-display-none').css({ 'height': (this.model.size.height - this.margin) + 'px', 'width': (this.model.size.width - this.margin) + 'px' }); //absolute positioned so, we couldn't set in %
            cardSparklineWrapper.append(iconWrapper);
            iconWrapper.append(bbdesigner$('<div>').addClass('e-number-card-information-icon'));
        },
        _createCardWrapperParent: function () {
            var cardSparklineWrapper = this.element.find('.e-number-card-sparkline-wrapper');
            cardSparklineWrapper.append(bbdesigner$('<div>').addClass('e-number-card-wrapper-parent e-number-card-image-styles'));
        },
        _createCardWrapper: function () {
            var cardWrapperParent = this.element.find('.e-number-card-wrapper-parent');
            cardWrapperParent.append(bbdesigner$('<div>').addClass('e-number-card-wrapper'));
        },
        _createTableCellElement: function () {
            var cardWrapperParent = this.element.find('.e-number-card-wrapper');
            cardWrapperParent.append(bbdesigner$('<div>').addClass('e-number-card-table-cell'));
        },
        _createCardValueWrapper: function () {
            var cardWrapperParent = this.element.find('.e-number-card-wrapper');
            cardWrapperParent.append(bbdesigner$('<div>').addClass('e-number-card-value-wrapper').css({ 'height': (this.height - this.margin) + 'px' }));
        },
        _createTitleElement: function () {
            var cardWrapper = bbdesigner$(this.element).find('.e-number-card-value-wrapper');
            var cardTitleContainer = bbdesigner$('<div>').addClass('e-number-card-title-container');
            cardTitleContainer.append(bbdesigner$('<div>').addClass('e-number-card-title-text ' + this.model.tooltip.class + ' e-number-card-text-ellipsis'));
            cardTitleContainer.append(bbdesigner$('<div>').addClass('e-number-card-description-text ' + this.model.tooltip.class));
            cardWrapper.append(cardTitleContainer);
        },
        _createDimensionContainer: function () {
            var cardWrapper = bbdesigner$(this.element).find('.e-number-card-value-wrapper');
            var dimensionContainer = bbdesigner$('<div>').addClass('e-number-card-dimension-container');
            cardWrapper.append(dimensionContainer);
            dimensionContainer.append(bbdesigner$('<div>').addClass('e-number-card-dimension-text ' + this.model.tooltip.class + ' e-number-card-text-ellipsis'));
        },
        _creteContentWrapper: function () {
            var valueWrapper = bbdesigner$(this.element).find('.e-number-card-value-wrapper');
            var contentWrapper = bbdesigner$('<div>').addClass('e-number-card-content-image-wrapper e-number-card-justify-center');
            valueWrapper.append(contentWrapper);
        },
        _createMeasureWrapper: function () {
            var contentWrapper = bbdesigner$(this.element).find('.e-number-card-content-image-wrapper');
            var cardContainerMiddle = bbdesigner$('<div>').addClass('e-number-card-measure-wrapper e-number-card-justify-center');
            contentWrapper.append(cardContainerMiddle);
        },
        _createImageElement: function () {
            var cardWrapper = bbdesigner$(this.element).find('.e-number-card-content-image-wrapper');
            var cardImageWrapper = bbdesigner$('<div>').addClass('e-number-card-image-wrapper');
            cardWrapper.append(cardImageWrapper);
            cardImageWrapper.append(bbdesigner$('<div>').addClass('e-number-card-image-container e-number-card-image-styles'));
        },
        _createIconElement: function () {
            var cardContainerMiddle = bbdesigner$(this.element).find('.e-number-card-measure-wrapper');
            var cardIndicator = bbdesigner$('<div>').addClass('e-number-card-icon-container');
            cardIndicator.append(bbdesigner$('<div>').addClass('e-number-card-icon'));
            cardContainerMiddle.prepend(cardIndicator);
        },
        _createnumberElement: function () {
            var measureWrapper = bbdesigner$(this.element).find('.e-number-card-measure-wrapper');
            var numberContainer = bbdesigner$('<div>').addClass('e-number-card-measure-container e-number-card-text-ellipsis');
            numberContainer.append(bbdesigner$('<div>').addClass('e-number-card-measure-text ' + this.model.tooltip.class + ' e-number-card-text-ellipsis'));
            measureWrapper.append(numberContainer);
        },
        _createSparklineContainer: function () {
            var cardsaprklineWrapper = bbdesigner$(this.element).find('.e-number-card-sparkline-wrapper');
            var sparklineContainer = bbdesigner$('<div>').addClass('e-number-card-sparkline-container');//absolute positioned so, we couldn't set in %
            cardsaprklineWrapper.append(sparklineContainer);
            sparklineContainer.append(bbdesigner$('<div>').attr('id', bbdesigner$(this.element).attr('id') + '-sparkline'));
            // sparkline gradient svg container
            var gradientContainer = bbdesigner$('<div>').addClass('e-sparkline-gradient-container');
            this.element.append(gradientContainer);

        },
        _createBackgroundImageWrapper: function () {
            var backgroundImageWrapper = bbdesigner$('<div>').addClass('e-number-card-background-image-wrapper').css({ 'height': (this.model.size.height - this.margin) + 'px', 'width': (this.model.size.width - this.margin) + 'px' });
            this.element.append(backgroundImageWrapper);
            backgroundImageWrapper.append(bbdesigner$('<div>').addClass('e-number-card-background-image-container e-number-card-image-styles'));
        },

        // Update Visibility
        _updateTitleVisibility: function () {
            if (this.model.title.visibility) {
                this._showTitle();
            } else {
                this._hideTitle();
            }
        },
        _updateDescriptionVisibility: function () {
            if (this.model.description.visibility) {
                this._showDescription();
            } else {
                this._hideDescription();
            }
        },
        _updateDimensionVisibility: function () {
            if (this.model.dimension.visibility) {
                this._showDimension();
            } else {
                this._hideDimension();
            }
        },
        _updateIconVisibility: function () {
            if (this.model.icon.visibility) {
                this._showIcon();
            } else {
                this._hideIcon();
            }
            this._updateMeasureWrapper();
        },
        _updateMeasureVisibility: function () {
            if (this.model.measure.visibility) {
                this._showMeasure();
            } else {
                this._hideMeasure();
            }
            this._updateMeasureWrapper();
        },
        _updateMeasureWrapper: function () {
            if (!this.model.measure.visibility && !this.model.icon.visibility) {
                this._hideMeasureWrapper();
            } else {
                this._showMeasureWrapper();
            }
        },
        _updateImageVisibility: function () {
            if (!this.model.image.visibility && !this.model.image.visibility) {
                this._hideImage();
            } else {
                this._showImage();
            }
        },
        _resizeBackgroundContainer: function () {
            this.element.find('.e-number-card-background-image-container').addClass('e-number-card-plotarea-default');
            this.element.find('.e-number-card-background-image-container').removeClass('e-number-card-plotarea-content');
        },
        _updateSparklineVisibility: function () {
            // this.element.find('.e-number-card-sparkline-container').css({ 'height': this.model.size.height - this.margin, 'width': this.model.size.width - this.margin });
            if (this._isSparklinePresent()) {
                this._showSparkline();
            } else {
                this._hideSparkline();
            }
        },
        _updateTitleWrap: function () {
            if (this.model.title.visibility && this.model.title.enableWrap && !BoldBIDashboard.isNullOrUndefined(this.model.title.text)
                && this.model.title.text.length > 0 && this.model.title.text.indexOf(' ') > 0) {
                // Title Width Calculation
                var marginLeft = 16;
                var marginRight = 16;
                var parentWidth = this.model.size.width - marginLeft - marginRight;
                this.element.find('.e-number-card-wrapper-parent').css({ 'width': parentWidth + 'px', 'margin-left': marginLeft + 'px', 'margin-right': marginRight + 'px' });
                var titleWidth = this.element.find('.e-number-card-title-text').width();

                // Available Lines Calculation For Tile Text Wrap
                var cardHt = (this.model.size.height - this.margin - this.marginTop - this.bottomMargin);
                var titleHt = this.element.find('.e-number-card-title-text').height();
                var descriptionHt = this.model.description.visibility ? this.element.find('.e-number-card-description-text').height() + 10 : 0; // 10 - top + bottom margin
                if (titleHt < descriptionHt) {
                    titleHt = descriptionHt;
                }
                var sparklineHeight = this._isSparklinePresent() ? (this.model.size.height - this.margin - this.marginTop - this.bottomMargin) * .2 : 0;
                var margin = this.element.find('.e-number-card-title-container').hasClass('e-number-card-display-flex') && this.element.find('.e-number-card-content-image-wrapper').hasClass('e-number-card-display-flex') ? (this.inBetweenMargin * 2) : 0;
                cardHt = cardHt - (this._getFontHight(true) + margin - titleHt - sparklineHeight);
                this.element.find('.e-number-card-title-container').append(bbdesigner$('<div>').addClass('temp-wrapper-class').css({
                    'white-space': 'nowrap',
                    'text-overflow': 'unset',
                    'font-size': this._getResolutionBasedFontSize(this.model.title.fontSize) + 'px',
                    'line-height': 1.25
                }));
                this.element.find('.temp-wrapper-class').html(this.model.title.text);

                if (!BoldBIDashboard.isNullOrUndefined(this.model.title.fontSettings)) {
                    this._updateFontSettings(this.element.find('.temp-wrapper-class'), this.model.title.fontSettings); // To add font customization(Rule)
                }
                var textHt = this.element.find('.temp-wrapper-class').height();
                var availableLines = parseInt(cardHt / textHt);

                // Text Wrap Calculation
                this.element.find('.e-number-card-title-text').html('');
                var tempText = '';
                var titleText = this.model.title.text.split(' ');
                var currentLine = 0;
                for (var i = 0; i < titleText.length; i++) {
                    this.element.find('.temp-wrapper-class').html(tempText + titleText[i]);
                    if (currentLine < availableLines - 1) {
                        if (titleWidth > this.element.find('.temp-wrapper-class').width()) {
                            if (i === titleText.length - 1) {
                                tempText += titleText[i];
                                this.element.find('.e-number-card-title-text').append(bbdesigner$('<div>').html(tempText.trim()));
                            } else {
                                tempText += titleText[i] + ' ';
                            }
                        } else {
                            this.element.find('.temp-wrapper-class').html(titleText[i]);
                            if (titleWidth > this.element.find('.temp-wrapper-class').width()) {
                                this.element.find('.e-number-card-title-text').append(bbdesigner$('<div>').html(tempText.trim()));
                                currentLine++;
                                i = i - 1;
                            } else {
                                if (tempText.length > 0) {
                                    this.element.find('.e-number-card-title-text').append(bbdesigner$('<div>').html(tempText.trim()));
                                    currentLine++;
                                    i = i - 1;
                                } else {
                                    this.element.find('.e-number-card-title-text').append(bbdesigner$('<div>').html(titleText[i]).addClass('e-number-card-text-ellipsis'));
                                    currentLine++;
                                }
                            }
                            tempText = '';
                            this.element.find('.temp-wrapper-class').html('');
                        }
                    } else {
                        if (i === titleText.length - 1) {
                            tempText += titleText[i];
                            this.element.find('.e-number-card-title-text').append(bbdesigner$('<div>').html(tempText.trim()).addClass('e-number-card-text-ellipsis'));
                        } else {
                            tempText += titleText[i] + ' ';
                        }
                    }
                }
                this.element.find('.e-number-card-title-container').find('.temp-wrapper-class').remove();
            }
        },
		_updateContentImageWrapper: function() {
			if(this.element.find('.e-number-card-measure-wrapper').hasClass('e-number-card-display-flex') || this.element.find('.e-number-card-image-wrapper').hasClass('e-number-card-display-flex')){			
				this._showContentImageWrapper();
			} else{
				this._hideContentImageWrapper();
			}
		},

        // Visibility toggle
		_showContentImageWrapper: function() {
            this.element.find('.e-number-card-content-image-wrapper').addClass('e-number-card-display-flex');
            this.element.find('.e-number-card-content-image-wrapper').removeClass('e-number-card-display-none');
        },
		_hideContentImageWrapper: function() {
            this.element.find('.e-number-card-content-image-wrapper').addClass('e-number-card-display-none');
            this.element.find('.e-number-card-content-image-wrapper').removeClass('e-number-card-display-flex');
        },
        _showTitle: function() {
            this.element.find('.e-number-card-title-container').addClass('e-number-card-display-flex');
            this.element.find('.e-number-card-title-container').removeClass('e-number-card-display-none');
        },
        _hideTitle: function() {
            this.element.find('.e-number-card-title-container').addClass('e-number-card-display-none');
            this.element.find('.e-number-card-title-container').removeClass('e-number-card-display-flex');
        },		
		_showDescription: function(){
			this.element.find('.e-number-card-description-text').addClass('e-number-card-display-flex');
            this.element.find('.e-number-card-description-text').removeClass('e-number-card-display-none');
		},
		_hideDescription: function(){
			this.element.find('.e-number-card-description-text').addClass('e-number-card-display-none');
            this.element.find('.e-number-card-description-text').removeClass('e-number-card-display-flex');
		},
        _showDimension: function() {
            this.element.find('.e-number-card-dimension-container').addClass('e-number-card-display-flex');
            this.element.find('.e-number-card-dimension-container').removeClass('e-number-card-display-none');
        },
        _hideDimension: function() {
            this.element.find('.e-number-card-dimension-container').addClass('e-number-card-display-none');
            this.element.find('.e-number-card-dimension-container').removeClass('e-number-card-display-flex');
        },
        _showIcon: function() {
            this.element.find('.e-number-card-icon-container').addClass('e-number-card-display-flex');
            this.element.find('.e-number-card-icon-container').removeClass('e-number-card-display-none');
        },
        _hideIcon: function() {
            this.element.find('.e-number-card-icon-container').addClass('e-number-card-display-none');
            this.element.find('.e-number-card-icon-container').removeClass('e-number-card-display-flex');
        },
        _showMeasure: function() {
            this.element.find('.e-number-card-measure-container').addClass('e-number-card-display-flex');
            this.element.find('.e-number-card-measure-container').removeClass('e-number-card-display-none');
        },
        _hideMeasure: function() {
            this.element.find('.e-number-card-measure-container').addClass('e-number-card-display-none');
            this.element.find('.e-number-card-measure-container').removeClass('e-number-card-display-flex');
        },
        _showMeasureWrapper: function() {
            this.element.find('.e-number-card-measure-wrapper').addClass('e-number-card-display-flex');
            this.element.find('.e-number-card-measure-wrapper').removeClass('e-number-card-display-none');
        },
        _hideMeasureWrapper: function() {
            this.element.find('.e-number-card-measure-wrapper').addClass('e-number-card-display-none');
            this.element.find('.e-number-card-measure-wrapper').removeClass('e-number-card-display-flex');
        },
        _showImage: function() {
            this.element.find('.e-number-card-image-wrapper').addClass('e-number-card-display-flex');
            this.element.find('.e-number-card-image-wrapper').removeClass('e-number-card-display-none');
        },
        _hideImage: function() {
            this.element.find('.e-number-card-image-wrapper').addClass('e-number-card-display-none');
            this.element.find('.e-number-card-image-wrapper').removeClass('e-number-card-display-flex');
        },
        _showSparkline: function() {
            this.element.find('.e-number-card-sparkline-container').addClass('e-number-card-display-flex');
            this.element.find('.e-number-card-sparkline-container').removeClass('e-number-card-display-none');
        },
        _hideSparkline: function() {
            this.element.find('.e-number-card-sparkline-container').addClass('e-number-card-display-none');
            this.element.find('.e-number-card-sparkline-container').removeClass('e-number-card-display-flex');
        },
        _showInformationIcon: function() {
            this.element.find('.e-number-card-information-wrapper').addClass('e-number-card-display-flex');
            this.element.find('.e-number-card-information-wrapper').removeClass('e-number-card-display-none');
        },
        _hideInformationIcon: function() {
            this.element.find('.e-number-card-information-wrapper').addClass('e-number-card-display-none');
            this.element.find('.e-number-card-information-wrapper').removeClass('e-number-card-display-flex');
        },
        // Data Update
        _updateTitle: function() {
            var title = this.element.find('.e-number-card-title-text');
            title.html(this.model.title.text).css({ 'color': this.model.title.foreground, 'font-size': this._getResolutionBasedFontSize(this.model.title.fontSize) + 'px', 'font-weight': this.model.title.fontWeight, 'font-family': this.model.title.fontFamily}).attr({ 'data-tooltip': this.model.title.text });
            if (!BoldBIDashboard.isNullOrUndefined(this.model.title.fontSettings)) {
                this._updateFontSettings(title, this.model.title.fontSettings);
            }
        },
		_updateDescription: function(){
			var description = this.element.find('.e-number-card-description-text');
            description.addClass(this.model.tooltip.class).css({'font-size': this._getIconFontSizeBasedOnResolution(), 'color': this.model.description.color }).attr(this.model.tooltip.attribute, this.model.description.text);
		},
        _updateDimension: function() {
            var dimension = this.element.find('.e-number-card-dimension-text');
            dimension.html(this.model.dimension.text).css({ 'color': this.model.dimension.foreground, 'font-size': this.model.dimension.fontSize + 'px' }).attr({ 'data-tooltip': this.model.dimension.text });
            this._updateFontSettings(dimension, this.model.dimension.fontSettings);
        },
        _updateMeasure: function() {
            var measure = this.element.find('.e-number-card-measure-text');
            var measureText = this.formatting.applyFormat(this.model.measure.text, this.model.valueRepresentation);
            measure.html(measureText).css({ 'color': this.model.measure.foreground, 'font-size': this._getResolutionBasedFontSize(this.model.measure.fontSize) + 'px', 'font-weight': this.model.measure.fontWeight, 'font-family': this.model.measure.fontFamily}).attr({ 'data-tooltip': measureText });
            this._updateFontSettings(measure, this.model.measure.fontSettings);
        },
        _updateIcon: function() {
            var icon = this.element.find('.e-number-card-icon-container');
            icon.addClass(this.model.icon.path).css({ 'color': this.model.icon.foreground, 'font-size': this.model.icon.fontSize + 'px' });
        },
        _updateFontSettings: function(element, fontSettings) {
            element.removeClass('e-numbercard-text-bold e-numbercard-text-italic e-numbercard-text-underline e-numbercard-text-strikethrough');
            if (fontSettings.IsBold) {
                element.addClass('e-numbercard-text-bold');
            }
            if (fontSettings.IsItalic) {
                element.addClass('e-numbercard-text-italic');
            }
            if (fontSettings.IsUnderLine && fontSettings.IsStrikeThrough) {
                element.addClass('e-numbercard-text-underline-strikethrough');
            } else if (fontSettings.IsUnderLine) {
                element.addClass('e-numbercard-text-underline');
            } else if (fontSettings.IsStrikeThrough) {
                element.addClass('e-numbercard-text-strikethrough');
            }
        },
        _updateImage: function() {
			this.element.find('.e-number-card-image-wrapper').css({'height': '40px' , 'width': '40px' });
            var imageContainer = this.element.find('.e-number-card-image-container');
            this.model.image.visibility ? this._updateImageData(imageContainer, this.model.image.data, this.model.image) : imageContainer.css({
                "background-image": "none"
            });
            this._updateImagePosition(imageContainer, this.model.image.mode, this.model.image.data);
			this._swapImage();
        },
		
		_swapImage: function(){			
			var cardWrapper = this.element.find('.e-number-card-measure-wrapper');
			var imageWrapper = this.element.find('.e-number-card-image-wrapper');
			imageWrapper.css({'margin-left': '0px', 'margin-right': '0px'});
			this.element.find('.e-number-card-title-container').css({'margin-left':'0px','margin-right':'0px'})
			if(this.model.image.position === 'Left'){
				cardWrapper.before(imageWrapper);
			} else {
				cardWrapper.after(imageWrapper);
			}
		},		
        _updateBackgroundImage: function() {
            var backgroundImage = this.element.find('.e-number-card-background-image-container');
            if (this.model.background.showImage) {
                this._updateImageData(backgroundImage, this.model.background.image, this.model.background);
            } else {
                backgroundImage.css({ 'background-image': 'none' });
            }
            this._updateImagePosition(backgroundImage, this.model.background.mode, this.model.background.image);
            backgroundImage.css({ 'background-color': this.model.background.color, 'opacity': this.model.background.opacity });
        },
        _updateImageData: function(image, data, model) {
            image.css({ 'background-image': 'url(' + data + ')' });
        },
        _updateImagePosition: function(image, mode, data) {
            if (!this._isNullOrEmptyOrUndefined(data)) {
                switch (mode) {
                    case BoldBIDashboard.NumberCard.ImageModes.Fill:
                        image.addClass('e-number-card-image-fill');
                        image.removeClass('e-number-card-image-default e-number-card-image-uniform e-number-card-image-uniformtofill');
                        break;
                    case BoldBIDashboard.NumberCard.ImageModes.Uniform:
                        image.addClass('e-number-card-image-uniform');
                        image.removeClass('e-number-card-image-default e-number-card-image-fill e-number-card-image-uniformtofill');
                        break;
                    case BoldBIDashboard.NumberCard.ImageModes.UniformToFill:
                        image.addClass('e-number-card-image-uniformtofill');
                        image.removeClass('e-number-card-image-default e-number-card-image-fill e-number-card-image-uniform');
                        break;
                    default:
                        image.addClass('e-number-card-image-default');
                        image.removeClass('e-number-card-image-fill e-number-card-image-uniform e-number-card-image-uniformtofill');
                }
            }
        },
        _updateSparkline: function() {
            this._updateSparklineData();
            this._updateSparklineColor();
        },
        _updateSparklineData: function() {
            if (this.model.sparkline.visibility && this.model.sparkline.data) {
				var id = bbdesigner$(this.element).attr('id') + 'sparkline-gradient';
                var sparklineElement = this.element.find('#' + bbdesigner$(this.element).attr('id') + '-sparkline');
                bbdesigner$(sparklineElement).BoldBIDashboardSparkline({
                    dataSource: this.model.sparkline.data,
                    padding: 0,
                    type: this.model.sparkline.type,
                    yName: "valueName",
                    opacity: this.model.sparkline.opacity,
                    width: 2,
					loaded: bbdesigner$.proxy(this._onSparklineLoaded, this)
					//fill:'url(' + '#' + id + ')',
                });
            }
        },
		
		_onSparklineLoaded: function() {
			  var id = '#' + bbdesigner$(this.element).attr('id') + '-sparkline_sparkline_svg_area_series_fill';
			  var path = this.element.find(id); 
              var direction = path.attr("d").replace("Z", ""); 
              path.attr("d", direction); 

		},
		
        _updateSparklineColor: function() {
			// Creating sparkline gradient svg
			var svg = '<svg style="height: 0"><defs><linearGradient id=' + bbdesigner$(this.element).attr('id') + 'sparkline-gradient' + ' style="opacity: 0.75" class="chart-gradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color=' + this.model.sparkline.fill + ' stop-opacity=' + this.model.sparkline.opacity + ' ></stop><stop offset="0.9" stop-color=' + this.model.sparkline.fill + ' stop-opacity=0></stop></linearGradient></defs></svg>';
			var gradientContainer = this.element.find('.e-sparkline-gradient-container');
			gradientContainer.html(svg);
			
            var sparkline = this.element.find('#' + bbdesigner$(this.element).attr('id') + '-sparkline').data('BoldBIDashboardSparkline');
            if (!BoldBIDashboard.isNullOrUndefined(sparkline)) {
                switch (this.model.sparkline.type) {
                    case "area":
						var id = bbdesigner$(this.element).attr('id') + 'sparkline-gradient';
                        //sparkline.model.stroke = this.getStrokeColor(); for better visual storke color is removed
                        sparkline.model.stroke = this.model.sparkline.fill;
                        sparkline.model.fill = 'url(' + '#' + id + ')';
                        sparkline.model.opacity = this.model.sparkline.opacity;
                        break;
                    case "column":
                        sparkline.model.fill = this.model.sparkline.followDirectionColor && !this.model.sparkline.isColorCustomized ? this.getDirectionColor() : this.model.sparkline.fill;
                        break;
                    default:
                        sparkline.model.stroke = this.getStrokeColor();
                        break;
                }
                sparkline.redraw();
            }
        },
		_updateElementsTooltip: function() {
			this.element.find('.e-number-card-title-text').removeClass(this._tooltipClass);
		    this.element.find('.e-number-card-description-text').removeClass(this._tooltipClass);
			this.element.find('.e-number-card-dimension-text').removeClass(this._tooltipClass);
			this.element.find('.e-number-card-measure-text').removeClass(this._tooltipClass);
			this.element.find('.e-number-card-title-text').addClass(this.model.tooltip.class);
			this.element.find('.e-number-card-description-text').addClass(this.model.tooltip.class);
			this.element.find('.e-number-card-dimension-text').addClass(this.model.tooltip.class);
			this.element.find('.e-number-card-measure-text').addClass(this.model.tooltip.class);
		},
        _updateInformationTooltip: function() {
            if (!this._isNullOrEmptyOrUndefined(this.model.tooltip.class) && !this._isNullOrEmptyOrUndefined(this.model.tooltip.attribute)) {
				this.element.find('.e-number-card-information-icon').removeClass(this._tooltipClass);
                this.element.find('.e-number-card-information-icon').addClass(this.model.tooltip.class).attr(this.model.tooltip.attribute, this.model.tooltip.text);
            }
        },
		_getResolutionBasedFontSize: function(fontsize) {			
			return this.model.autoFontSize.enable ? fontsize + ((this.model.autoFontSize.fontSizeFactor / 100) * window.screen.width) : fontsize;
		},
        _updateWrapperHeight: function() {
            // this._updateTitleVisibility();
			// this._updateDimensionVisibility
			// this._updateSparklineVisibility();
            this._updateTitleWrap();
            var calculatedHt = this._getFontHight(false);
			var marginLeft = 16;
			var marginRight = 16;
			var parentWidth = this.model.size.width - marginLeft - marginRight;			
            this.element.find('.e-number-card-wrapper-parent').css({ 'width': parentWidth + 'px', 'margin-left' : marginLeft + 'px', 'margin-right': marginRight + 'px'});
            this.element.find('.e-number-card-value-wrapper').css({ 'height': calculatedHt + 'px' });			
        },
        _getFontHight: function(isReturnHt) {
			var sparklineHeight = this._isSparklinePresent() ? (this.model.size.height - this.margin - this.marginTop - this.bottomMargin) * .2 : 0;
            var cardHt = (this.model.size.height - this.margin - this.marginTop - this.bottomMargin);
			var margin = this.element.find('.e-number-card-title-container').hasClass('e-number-card-display-flex') && this.element.find('.e-number-card-content-image-wrapper').hasClass('e-number-card-display-flex') ? (this.inBetweenMargin * 2) : 0;
            var titleHt = this.element.find('.e-number-card-title-text').height();
			var descriptionHt = this.model.description.visibility ? this.element.find('.e-number-card-description-text').height() + 10 : 0; // 10 - top + bottom margin
			if(titleHt < descriptionHt) {
				titleHt = descriptionHt;
			}
            var dimensionHt = this.element.find('.e-number-card-dimension-text').height();
            var iconHt = this.element.find('.e-number-card-icon-container').height();
            var measureHt = this.element.find('.e-number-card-measure-text').height();
			var imageHt = this.element.find('.e-number-card-content-image-wrapper').height();
            var bottomContainerHt = iconHt > measureHt ? iconHt : measureHt;
			var bottomContainerHt = bottomContainerHt < imageHt ? imageHt : bottomContainerHt;
            var calculatedHeight = titleHt + dimensionHt + bottomContainerHt + margin + sparklineHeight;
            var wrapperHt = calculatedHeight;
			if(isReturnHt){
				return wrapperHt;
			}
            /* Responsive Margin Logic */
			if(this.model.responsiveMargin) {
				if(this.model.alignment.vertical !== 'Center') {
					var tempMargin = this.model.alignment.vertical === 'Top' ? this.marginTop : this.bottomMargin;
				    var cardHt_Copy = cardHt;
					while(cardHt_Copy < wrapperHt){
						cardHt_Copy = cardHt_Copy + 1;
						tempMargin = tempMargin - 1;
						if(tempMargin < 4){
							var diff = 4 - tempMargin;
							tempMargin = 4;
							cardHt_Copy = cardHt_Copy - diff;
							break;
						}
					}
					cardHt = cardHt_Copy;
					if(this.model.alignment.vertical === 'Top'){
						this.marginTop = tempMargin;
						this.marginTopWithSparkline = this.marginTopWithSparkline > this.marginTop ? this.marginTop : this.marginTopWithSparkline;
						
					} else {
						this.bottomMargin = tempMargin;
						this.bottomMarginWithSparkline = this.bottomMarginWithSparkline > this.bottomMargin ? this.bottomMargin : this.bottomMarginWithSparkline;
					}
				}
                /* Inbetween margin changes */
				if(cardHt < wrapperHt ) {
					this.inBetweenMargin = 3; // reducing the inBetweenMargin to min value
					calculatedHeight = calculatedHeight - margin + this.inBetweenMargin;
					wrapperHt = calculatedHeight;
				}
			}
            if (cardHt < wrapperHt) {
				var tempHt = wrapperHt - sparklineHeight;
				if (cardHt > tempHt) {
					if(this._isMeasurePresent() || this._isImagePresent() || this._isTitlePresent()) {
						this._hideSparkline();
						wrapperHt = tempHt;
					} else {
						wrapperHt = cardHt;
					}
				} else {
					var tempHt = wrapperHt - sparklineHeight - titleHt;
					if (cardHt >= tempHt) {
						if(this._isMeasurePresent() || this._isImagePresent()) {
							this._hideSparkline();
							this._hideTitle();
							wrapperHt = tempHt;
						} else {
							wrapperHt = cardHt; 
						}								
					} else {
						tempHt = wrapperHt - sparklineHeight - dimensionHt - titleHt;
						if (cardHt >= tempHt) {
							if(this._isMeasurePresent() || this._isImagePresent()) {
								this._hideDimension();
								this._hideSparkline();
								this._hideTitle();
								wrapperHt = tempHt;
							} else {
								wrapperHt = cardHt;
							}
						} else {
							if(this._isMeasurePresent() || this._isImagePresent()) {
								this._hideSparkline();
								this._hideDimension();
								this._hideTitle();
							}
							wrapperHt = cardHt;
						}
					}
                }
            } else {
				wrapperHt = calculatedHeight - sparklineHeight;
			}
            return wrapperHt;
        },
        _resize: function() {
            this.element.css({ 'height': this.model.size.height + 'px', 'width': this.model.size.width + 'px' });
            this.element.find('.e-number-card-sparkline-wrapper').css({ 'height': (this.model.size.height - this.margin) + 'px', 'width': (this.model.size.width - this.margin) + 'px' });
            this.element.find('.e-number-card-information-wrapper').css({ 'height': (this.model.size.height - this.margin) + 'px', 'width': (this.model.size.width - this.margin) + 'px' });
            this.element.find('.e-number-card-background-image-wrapper').css({ 'height': (this.model.size.height - this.margin) + 'px', 'width': (this.model.size.width - this.margin) + 'px' });
			
			//this._resizeSparklineContainer();
            this._responsiveLayout();
        },
		_getIconFontSizeBasedOnResolution: function() {
            var fontSize = '12px';
            if (window.screen.width < 1920) {
                fontSize = '12px';
            } else if (window.screen.width < 3840) {
                fontSize = '16px';
            } else {
                fontSize = '32px';
            }
            return fontSize;
        },
        _resizeSparklineContainer: function() {
            // if (this._isImagePresent()) {
                // this.element.find('#' + bbdesigner$(this.element).attr('id') + '-sparkline').addClass('e-number-card-plotarea-content');
                // this.element.find('#' + bbdesigner$(this.element).attr('id') + '-sparkline').removeClass('e-number-card-plotarea-default');
            // } else {
                // this.element.find('#' + bbdesigner$(this.element).attr('id') + '-sparkline').addClass('e-number-card-plotarea-default');
                // this.element.find('#' + bbdesigner$(this.element).attr('id') + '-sparkline').removeClass('e-number-card-plotarea-content');
            // }
			var marginTop = this.element.find('.e-number-card-sparkline-container').hasClass('e-number-card-display-flex') ? this.marginTopWithSparkline : this.marginTop;			
			var sparklineHeight = (this.model.size.height - this.margin - marginTop - this.bottomMargin) * .2;
            this.element.find('.e-number-card-sparkline-container').css({ 'height': sparklineHeight + 'px', 'width': (this.model.size.width - this.margin) + 'px' });
            this._resizeSparkline();
        },
        _resizeSparkline: function() {
			var marginTop = this.element.find('.e-number-card-sparkline-container').hasClass('e-number-card-display-flex') ? this.marginTopWithSparkline : this.marginTop;
			var sparklineHeight = (this.model.size.height - this.margin - marginTop - this.bottomMargin) * .2;
            var sparkline = this.element.find('#' + bbdesigner$(this.element).attr('id') + '-sparkline').data('BoldBIDashboardSparkline');
            if (!BoldBIDashboard.isNullOrUndefined(sparkline)) {
                sparkline.model.size.height = sparklineHeight;
                sparkline.model.size.width = this.model.size.width - this.margin;
                sparkline.redraw();
            }
        },
        _responsiveLayout: function() {
			this._updateSparklineVisibility();
			this._updateTitleVisibility();
			this._updateDimensionVisibility();
            if ((this.model.size.width >= 218) && !this._isNullOrEmptyOrUndefined(this.model.image.data) && this.model.image.visibility) {
                this._showImage();
                this._hideInformationIcon();
            } else {
                this._hideImage();
                if (this.model.informationIcon.visibility && this.model.image.visibility && !this._isNullOrEmptyOrUndefined(this.model.image.data)) {
                    this._showInformationIcon();
                } else {
                    this._hideInformationIcon();
                }
            }
			this._updateMeasureWrapperWidth();
			var description = this.element.find('.e-number-card-description-text');
            description.css({'font-size': this._getIconFontSizeBasedOnResolution()});
			this._updateTitlePosition();
			this._updateMeasureWrapperWidth();
			this._updateContentImageWrapper();
            this._resizeBackgroundContainer();
			this._updateWrapperHeight();
			this._resizeSparklineContainer();
			this._updateMargin();
            this._applyAnimation();
        },
		_calculateFontSize: function() {
			var availableHeight = this._isSparklinePresent() ? (this.model.size.height * 0.75) - this.marginTopWithSparkline - this.bottomMargin : this.model.size.height - this.marginTop - this.bottomMargin;
			availableHeight = this.model.title.visibility && (this.model.measure.visibility || this.model.image.visibility) ? availableHeight - (this.inBetweenMargin * 2) : availableHeight;
			var titleHt = this.model.measure.visibility || this.model.image.visibility ? .24 * availableHeight : availableHeight;
			var measureHt = this.model.title.visibility ? .76 * availableHeight : availableHeight;
			var availableWidth = this.model.size.width - 32; //right + left margin
			availableWidth = this._isImagePresent() ? (availableWidth * .80) - 16 : availableWidth;			
			var meausreFontText = this._isNullOrEmptyOrUndefined(this.model.autoFontSize.measureText) ? this.model.measure.text : this.model.autoFontSize.measureText;
			var titleFontText = this._isNullOrEmptyOrUndefined(this.model.autoFontSize.titleText) ? this.model.title.text : this.model.autoFontSize.titleText;
			var titleFontSize = this._getOptimumFontSize(titleHt, availableWidth, titleFontText);
			var measureFontSize = this._getOptimumFontSize(measureHt, availableWidth, meausreFontText);
			this.element.find('.e-number-card-title-text').css('font-size', titleFontSize);
			this.element.find('.e-number-card-measure-text').css('font-size', measureFontSize);
			this.element.find('.e-number-card-image-wrapper').css({'height': measureHt + 'px' , 'width': (availableWidth * 0.2) + 'px' });
		},
		_getOptimumFontSize: function(height, width, text) {
			var coef = null,
			bounds = null,
			one = 1,
			zeroPoint1 = 0.1,
			zeroPoint9 = 0.9;            
            coef = 0.9;
            while (true) { // eslint-disable-line no-constant-condition
                bounds = this._measureText(text, width, "Bold " + (height * coef) + " Roboto");
                if (bounds.width > width || bounds.height > height) {
					if (coef.toFixed(one) <= zeroPoint1) {

                        return height * coef;
					}
					coef -= zeroPoint1;
                } else {

                    return height * coef;
				}
            }
		},
		_measureText: function (text, maxWidth, font) {
            var element = bbdesigner$(document).find("#cardMeasureText");
            var textObj = null,
				zero = 0,
				lessThanZero = -1;
            if (element.length === zero) {
                textObj = document.createElement('text');
                bbdesigner$(textObj).attr({ 'id': 'cardMeasureText' });
                document.body.appendChild(textObj);
            } else {
                textObj = element[0];
            }

            var style = "",
			size = "",
			family = "";
            textObj.innerHTML = text;
            if (typeof font !== "undefined" && typeof font.size === "undefined") {
                var fontarray = font;
                fontarray = fontarray.split(" ");
                style = fontarray[0];
                size = fontarray[1];
                family = fontarray[2];
            }

            if (font !== null) {
                textObj.style.fontSize = font.size > zero ? font.size + "px" : font.size ? font.size : size.indexOf("px") === lessThanZero && size.indexOf("%") === lessThanZero ? size + "px" : size;
                textObj.style.fontStyle = font.fontStyle ? font.fontStyle : style;
                textObj.style.fontFamily = font.fontFamily ? font.fontFamily : family;
            }
            textObj.style.backgroundColor = 'white';
            textObj.style.position = 'absolute';
            textObj.style.top = -100;
            textObj.style.left = 0;
            textObj.style.visibility = 'hidden';
            if (maxWidth) {
                textObj.style.maxwidth = maxWidth + "px";
			}

            var bounds = { width: textObj.offsetWidth, height: textObj.offsetHeight };
            if (BoldBIDashboard.browserInfo().name === "msie" || BoldBIDashboard.browserInfo().name === "webkit") {
                textObj.parentNode.removeChild(textObj);
			} else {
                textObj.remove();
			}

            return bounds;
        },
		_updateMeasureWrapperWidth: function() {
			if(this._isImagePresent()){
				var margin = 56;
				// if(this.model.autoFontSize.enable) {
					// var availableWidth = this.model.size.width - 34; //right + left margin
					// availableWidth = this._isImagePresent() ? (availableWidth * .80) - 17 : availableWidth;
					// margin = (availableWidth * 0.2) + 17; // 17 - margin between image and measure
				// }
				this.element.find('.e-number-card-measure-wrapper').css('max-width', 'Calc(100% - ' + margin + 'px)');
			} else {
				this.element.find('.e-number-card-measure-wrapper').css('max-width', '100%');
			}
		},
		_updateTitlePosition: function() {
			var titleCont = this.element.find('.e-number-card-title-container');
			var imageWrapper = this.element.find('.e-number-card-content-image-wrapper');			
			if(this.model.title.position ===  BoldBIDashboard.NumberCard.TitlePosition.Top){
				imageWrapper.before(titleCont);
			} else {
				imageWrapper.after(titleCont);
			}
		},
		_updateMeasureWrapperWidth: function() {
			if(this._isImagePresent()){
				this.element.find('.e-number-card-measure-wrapper').css('max-width', 'Calc(100% - 57px)');
			} else {
				this.element.find('.e-number-card-measure-wrapper').css('max-width', '100%');
			}
		},
		_updateMargin: function() {
			var imageWrapper = this.element.find('.e-number-card-content-image-wrapper');
			var titleContainer = this.element.find('.e-number-card-title-container');
			var isImageWrapperPresent = imageWrapper.hasClass('e-number-card-display-flex');
			var isTitleContainerPresent = titleContainer.hasClass('e-number-card-display-flex');
			var margin = isImageWrapperPresent && isTitleContainerPresent ? this.inBetweenMargin : 0;
			if(this.model.title.position ===  BoldBIDashboard.NumberCard.TitlePosition.Top) {
				imageWrapper.css({'margin-top': margin + 'px', 'margin-bottom': '0px' });
				titleContainer.css({'margin-bottom': margin + 'px', 'margin-top': '0px'});
			} else {
				imageWrapper.css({'margin-bottom': margin + 'px', 'margin-top': '0px'});
				titleContainer.css({'margin-top': margin + 'px', 'margin-bottom': '0px'});
			}
			if(this._isImagePresent()) {
				var margin = 56;
				// if(this.model.autoFontSize.enable) {
					// var availableWidth = this.model.size.width - 34; //right + left margin
					// availableWidth = this._isImagePresent() ? (availableWidth * .80) - 17 : availableWidth;
					// margin = (availableWidth * 0.2) + 17; // 17 - margin between image and measure
				// }
				var titleMargin = this.model.alignment.horizontal === 'Center' ? '0px' : margin + 'px';
				if(this.model.image.position === 'Left'){
					this.element.find('.e-number-card-title-container').css({'margin-left': titleMargin,'margin-right':'0px'});
					this.element.find('.e-number-card-image-wrapper').css({'margin-left': '0', 'margin-right': '16px'});
				} else {
					this.element.find('.e-number-card-title-container').css({'margin-left':'0px','margin-right': titleMargin});
					this.element.find('.e-number-card-image-wrapper').css({'margin-left': '16px', 'margin-right': '0px'});
				}
			} else {
				this.element.find('.e-number-card-title-container').css({'margin-left':'0px','margin-right':'0px'});
				this.element.find('.e-number-card-image-wrapper').css({'margin-left': '0px', 'margin-right': '0px'});
			}
			/* Update Margins based on vertical Alignment */
			
            var marginTop = this.element.find('.e-number-card-sparkline-container').hasClass('e-number-card-display-flex') ? this.marginTopWithSparkline : this.marginTop;
			var marginBottom = this.element.find('.e-number-card-sparkline-container').hasClass('e-number-card-display-flex') ? this.bottomMarginWithSparkline : this.bottomMargin;		   
			this.element.find('.e-number-card-wrapper-parent').css({'margin-bottom': marginBottom + 'px', 'margin-top': marginTop + 'px'});
		},
        _applyAnimation: function() {
            if (this.model.measure.visibility && this.model.animationSettings.enableAnimation) {
                var measureItem = this.element.find('.e-number-card-measure-text');
                bbdesigner$(measureItem).stop();
                bbdesigner$(measureItem).prop('Counter', 0).animate({
                    Counter: this.model.measure.text
                }, {
                    duration: this.model.animationSettings.animationDuration,
                    easing: 'swing',
                    step: bbdesigner$.proxy(this._animateNumbers, this)
                });
            }
        },
        _animateNumbers: function(value) {
            if (!BoldBIDashboard.isNullOrUndefined(this.element)) {
                var measureItem = this.element.find('.e-number-card-measure-text');
                var formatSettings = JSON.parse(JSON.stringify(this.model.valueRepresentation));
                if (this.formatting.isIntegerValue(this.model.measure.text) && value !== this.model.measure.text) {
                    formatSettings.numberOfDecimals = 0;
                }
                bbdesigner$(measureItem).text(this.formatting.applyFormat(value, formatSettings));
            }
        },
		_updateCardAlignment: function() {
			this.element.find('.e-number-card-wrapper').removeClass('e-number-card-justify-start e-number-card-justify-center e-number-card-justify-end e-number-card-align-start e-number-card-align-center e-number-card-align-end');
			this.element.find('.e-number-card-title-container').removeClass('e-number-card-justify-start e-number-card-justify-center e-number-card-justify-end');
			this.element.find('.e-number-card-content-image-wrapper').removeClass('e-number-card-justify-start e-number-card-justify-center e-number-card-justify-end');
			if(this.model.alignment.horizontal === 'Right') {
				this.element.find('.e-number-card-wrapper').addClass('e-number-card-justify-end');
				this.element.find('.e-number-card-title-container').addClass('e-number-card-justify-end');
				this.element.find('.e-number-card-content-image-wrapper').addClass('e-number-card-justify-end');
			} else if(this.model.alignment.horizontal === 'Center') {
				this.element.find('.e-number-card-wrapper').addClass('e-number-card-justify-center');
				this.element.find('.e-number-card-title-container').addClass('e-number-card-justify-center');
				this.element.find('.e-number-card-content-image-wrapper').addClass('e-number-card-justify-center');
			} else {
				this.element.find('.e-number-card-wrapper').addClass('e-number-card-justify-start');
				this.element.find('.e-number-card-title-container').addClass('e-number-card-justify-start');
				this.element.find('.e-number-card-content-image-wrapper').addClass('e-number-card-justify-start');
			}
			switch(this.model.alignment.vertical){
				case 'Bottom':
				 	this.element.find('.e-number-card-wrapper').addClass('e-number-card-align-end');
				    break;
				case 'Center':
				 	this.element.find('.e-number-card-wrapper').addClass('e-number-card-align-center');
				    break;
				default:
					this.element.find('.e-number-card-wrapper').addClass('e-number-card-align-start');
				  
			}
		},
        _isNullOrEmptyOrUndefined: function(text) {
            return (text === null || text === "" || typeof text === "undefined"); // eslint-disable-line no-extra-parens
        },
		_isMeasurePresent: function() {
			return this.element.find('.e-number-card-measure-wrapper').hasClass('e-number-card-display-flex') && this.model.measure.visibility;
		},
		_isTitlePresent: function() {
			return this.element.find('.e-number-card-title-container').hasClass('e-number-card-display-flex') && this.model.title.visibility;
		},
        _isImagePresent: function() {
            return this.element.find('.e-number-card-image-wrapper').hasClass('e-number-card-display-flex') && this.model.image.visibility;
        },
		_isSparklinePresent: function(){
			return this.model.sparkline.visibility && !BoldBIDashboard.isNullOrUndefined(this.model.sparkline.data) && this.model.sparkline.data.length > 0;
		},
        _destroy: function() {
            this._unwireEvents();
            this.element.empty();
        },
        _selectedHandler: function(evt) {
            var that = this;
            this.singleTimer = setTimeout(function() {
                var args = {};
                if (that.model.selected) {
                    args = { model: that.model, currentTarget: bbdesigner$('#' + that.element.attr('id')), PageX:evt.pageX, PageY:evt.pageY },
                        that._trigger("selected", args);
                    evt.stopPropagation();
                    evt.bubbles = false;
                }
            }, 400);
        },
    });
    BoldBIDashboard.NumberCard.ImageModes = {
        Default: "Default",
        Fill: "Fill",
        Uniform: "Uniform",
        UniformToFill: "Uniform To Fill"
    };
    BoldBIDashboard.NumberCard.PlotArea = {
        Complete: "Complete",
        CardBackground: "Card Background"
    };
	BoldBIDashboard.NumberCard.TitlePosition = {
        Top: "Top",
        Bottom: "Bottom"
    };
})(bbdesigner$, SyncfusionBoldBIDashboard);
;