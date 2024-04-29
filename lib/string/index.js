import Kvali from "../validate"

let _ = require('lodash');

/**
 * xml与json互转的类库
 * 文档 https://github.com/abdolence/x2js
 * @param {*} config
 */
export function x2js(config) {
    var VERSION = '1.2.0';

    config = config || {};
    initConfigDefaults();

    function initConfigDefaults() {
        if (config.escapeMode === undefined) {
            config.escapeMode = true;
        }

        config.attributePrefix = config.attributePrefix || '_';
        config.arrayAccessForm = config.arrayAccessForm || 'none';
        config.emptyNodeForm = config.emptyNodeForm || 'text';

        if (config.enableToStringFunc === undefined) {
            config.enableToStringFunc = true;
        }
        config.arrayAccessFormPaths = config.arrayAccessFormPaths || [];
        if (config.skipEmptyTextNodesForObj === undefined) {
            config.skipEmptyTextNodesForObj = true;
        }
        if (config.stripWhitespaces === undefined) {
            config.stripWhitespaces = true;
        }
        config.datetimeAccessFormPaths = config.datetimeAccessFormPaths || [];

        if (config.useDoubleQuotes === undefined) {
            config.useDoubleQuotes = false;
        }

        config.xmlElementsFilter = config.xmlElementsFilter || [];
        config.jsonPropertiesFilter = config.jsonPropertiesFilter || [];

        if (config.keepCData === undefined) {
            config.keepCData = false;
        }
    }

    var DOMNodeTypes = {
        ELEMENT_NODE: 1,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9
    };

    function getNodeLocalName(node) {
        var nodeLocalName = node.localName;
        if (nodeLocalName == null)
            // Yeah, this is IE!!
            nodeLocalName = node.baseName;
        if (nodeLocalName == null || nodeLocalName === '')
            // =="" is IE too
            nodeLocalName = node.nodeName;
        return nodeLocalName;
    }

    function getNodePrefix(node) {
        return node.prefix;
    }

    function escapeXmlChars(str) {
        if (typeof str == 'string') return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;'); else return str;
    }

    function checkInStdFiltersArrayForm(stdFiltersArrayForm, obj, name, path) {
        var idx = 0;
        for (; idx < stdFiltersArrayForm.length; idx++) {
            var filterPath = stdFiltersArrayForm[idx];
            if (typeof filterPath === 'string') {
                if (filterPath === path) break;
            } else if (filterPath instanceof RegExp) {
                if (filterPath.test(path)) break;
            } else if (typeof filterPath === 'function') {
                if (filterPath(obj, name, path)) break;
            }
        }
        return idx !== stdFiltersArrayForm.length;
    }

    function toArrayAccessForm(obj, childName, path) {
        switch (config.arrayAccessForm) {
            case 'property':
                if (!(obj[childName] instanceof Array)) obj[childName + '_asArray'] = [obj[childName]]; else obj[childName + '_asArray'] = obj[childName];
                break;
            /*case "none":
             break;*/
        }

        if (!(obj[childName] instanceof Array) && config.arrayAccessFormPaths.length > 0) {
            if (checkInStdFiltersArrayForm(config.arrayAccessFormPaths, obj, childName, path)) {
                obj[childName] = [obj[childName]];
            }
        }
    }

    function fromXmlDateTime(prop) {
        // Implementation based up on http://stackoverflow.com/questions/8178598/xml-datetime-to-javascript-date-object
        // Improved to support full spec and optional parts
        var bits = prop.split(/[-T:+Z]/g);

        var d = new Date(bits[0], bits[1] - 1, bits[2]);
        var secondBits = bits[5].split('.');
        d.setHours(bits[3], bits[4], secondBits[0]);
        if (secondBits.length > 1) d.setMilliseconds(secondBits[1]);

        // Get supplied time zone offset in minutes
        if (bits[6] && bits[7]) {
            let offsetMinutes = bits[6] * 60 + Number(bits[7]);
            let sign = /\d\d-\d\d:\d\d$/.test(prop) ? '-' : '+';

            // Apply the sign
            offsetMinutes = 0 + (sign === '-' ? -1 * offsetMinutes : offsetMinutes);

            // Apply offset and local timezone
            d.setMinutes(d.getMinutes() - offsetMinutes - d.getTimezoneOffset());
        } else if (prop.indexOf('Z', prop.length - 1) !== -1) {
            d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()));
        }

        // d is now a local time equivalent to the supplied time
        return d;
    }

    function checkFromXmlDateTimePaths(value, childName, fullPath) {
        if (config.datetimeAccessFormPaths.length > 0) {
            var path = fullPath.split('.#')[0];
            if (checkInStdFiltersArrayForm(config.datetimeAccessFormPaths, value, childName, path)) {
                return fromXmlDateTime(value);
            } else return value;
        } else return value;
    }

    function checkXmlElementsFilter(obj, childType, childName, childPath) {
        if (childType === DOMNodeTypes.ELEMENT_NODE && config.xmlElementsFilter.length > 0) {
            return checkInStdFiltersArrayForm(config.xmlElementsFilter, obj, childName, childPath);
        } else return true;
    }

    function parseDOMChildren(node, path) {
        if (node.nodeType === DOMNodeTypes.DOCUMENT_NODE) {
            var result = new Object();
            var nodeChildren = node.childNodes;
            // Alternative for firstElementChild which is not supported in some environments
            for (var cidx = 0; cidx < nodeChildren.length; cidx++) {
                var child = nodeChildren.item(cidx);
                if (child.nodeType == DOMNodeTypes.ELEMENT_NODE) {
                    var childName = getNodeLocalName(child);
                    result[childName] = parseDOMChildren(child, childName);
                }
            }
            return result;
        } else if (node.nodeType == DOMNodeTypes.ELEMENT_NODE) {
            var result = new Object();
            result.__cnt = 0;

            var nodeChildren = node.childNodes;

            // Children nodes
            for (var cidx = 0; cidx < nodeChildren.length; cidx++) {
                var child = nodeChildren.item(cidx); // nodeChildren[cidx];
                var childName = getNodeLocalName(child);

                if (child.nodeType != DOMNodeTypes.COMMENT_NODE) {
                    var childPath = path + '.' + childName;
                    if (checkXmlElementsFilter(result, child.nodeType, childName, childPath)) {
                        result.__cnt++;
                        if (result[childName] == null) {
                            result[childName] = parseDOMChildren(child, childPath);
                            toArrayAccessForm(result, childName, childPath);
                        } else {
                            if (result[childName] != null) {
                                if (!(result[childName] instanceof Array)) {
                                    result[childName] = [result[childName]];
                                    toArrayAccessForm(result, childName, childPath);
                                }
                            }
                            result[childName][result[childName].length] = parseDOMChildren(child, childPath);
                        }
                    }
                }
            }

            // Attributes
            for (var aidx = 0; aidx < node.attributes.length; aidx++) {
                var attr = node.attributes.item(aidx); // [aidx];
                result.__cnt++;
                result[config.attributePrefix + attr.name] = attr.value;
            }

            // Node namespace prefix
            var nodePrefix = getNodePrefix(node);
            if (nodePrefix != null && nodePrefix != '') {
                result.__cnt++;
                result.__prefix = nodePrefix;
            }

            if (result['#text'] != null) {
                result.__text = result['#text'];
                if (result.__text instanceof Array) {
                    result.__text = result.__text.join('\n');
                }
                //if(config.escapeMode)
                //	result.__text = unescapeXmlChars(result.__text);
                if (config.stripWhitespaces) result.__text = result.__text.trim();
                delete result['#text'];
                if (config.arrayAccessForm == 'property') delete result['#text_asArray'];
                result.__text = checkFromXmlDateTimePaths(result.__text, childName, path + '.' + childName);
            }
            if (result['#cdata-section'] != null) {
                result.__cdata = result['#cdata-section'];
                delete result['#cdata-section'];
                if (config.arrayAccessForm == 'property') delete result['#cdata-section_asArray'];
            }

            if (result.__cnt == 0 && config.emptyNodeForm == 'text') {
                result = '';
            } else if (result.__cnt == 1 && result.__text != null) {
                result = result.__text;
            } else if (result.__cnt == 1 && result.__cdata != null && !config.keepCData) {
                result = result.__cdata;
            } else if (result.__cnt > 1 && result.__text != null && config.skipEmptyTextNodesForObj) {
                if (config.stripWhitespaces && result.__text == '' || result.__text.trim() == '') {
                    delete result.__text;
                }
            }
            delete result.__cnt;

            if (config.enableToStringFunc && (result.__text != null || result.__cdata != null)) {
                result.toString = function () {
                    return (this.__text != null ? this.__text : '') + (this.__cdata != null ? this.__cdata : '');
                };
            }

            return result;
        } else if (node.nodeType == DOMNodeTypes.TEXT_NODE || node.nodeType == DOMNodeTypes.CDATA_SECTION_NODE) {
            return node.nodeValue;
        }
    }

    function startTag(jsonObj, element, attrList, closed) {
        var resultStr = '<' + (jsonObj != null && jsonObj.__prefix != null ? jsonObj.__prefix + ':' : '') + element;
        if (attrList != null) {
            for (var aidx = 0; aidx < attrList.length; aidx++) {
                var attrName = attrList[aidx];
                var attrVal = jsonObj[attrName];
                if (config.escapeMode) attrVal = escapeXmlChars(attrVal);
                resultStr += ' ' + attrName.substr(config.attributePrefix.length) + '=';
                if (config.useDoubleQuotes) resultStr += '"' + attrVal + '"'; else resultStr += "'" + attrVal + "'";
            }
        }
        if (!closed) resultStr += '>'; else resultStr += '/>';
        return resultStr;
    }

    function endTag(jsonObj, elementName) {
        return '</' + (jsonObj.__prefix != null ? jsonObj.__prefix + ':' : '') + elementName + '>';
    }

    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    function jsonXmlSpecialElem(jsonObj, jsonObjField) {
        if (config.arrayAccessForm == 'property' && endsWith(jsonObjField.toString(), '_asArray') || jsonObjField.toString().indexOf(config.attributePrefix) == 0 || jsonObjField.toString().indexOf('__') == 0 || jsonObj[jsonObjField] instanceof Function) return true; else return false;
    }

    function jsonXmlElemCount(jsonObj) {
        var elementsCnt = 0;
        if (jsonObj instanceof Object) {
            for (var it in jsonObj) {
                if (jsonXmlSpecialElem(jsonObj, it)) continue;
                elementsCnt++;
            }
        }
        return elementsCnt;
    }

    function checkJsonObjPropertiesFilter(jsonObj, propertyName, jsonObjPath) {
        return config.jsonPropertiesFilter.length == 0 || jsonObjPath == '' || checkInStdFiltersArrayForm(config.jsonPropertiesFilter, jsonObj, propertyName, jsonObjPath);
    }

    function parseJSONAttributes(jsonObj) {
        var attrList = [];
        if (jsonObj instanceof Object) {
            for (var ait in jsonObj) {
                if (ait.toString().indexOf('__') == -1 && ait.toString().indexOf(config.attributePrefix) == 0) {
                    attrList.push(ait);
                }
            }
        }
        return attrList;
    }

    function parseJSONTextAttrs(jsonTxtObj) {
        var result = '';

        if (jsonTxtObj.__cdata != null) {
            result += '<![CDATA[' + jsonTxtObj.__cdata + ']]>';
        }

        if (jsonTxtObj.__text != null) {
            if (config.escapeMode) result += escapeXmlChars(jsonTxtObj.__text); else result += jsonTxtObj.__text;
        }
        return result;
    }

    function parseJSONTextObject(jsonTxtObj) {
        var result = '';

        if (jsonTxtObj instanceof Object) {
            result += parseJSONTextAttrs(jsonTxtObj);
        } else if (jsonTxtObj != null) {
            if (config.escapeMode) result += escapeXmlChars(jsonTxtObj); else result += jsonTxtObj;
        }

        return result;
    }

    function getJsonPropertyPath(jsonObjPath, jsonPropName) {
        if (jsonObjPath === '') {
            return jsonPropName;
        } else return jsonObjPath + '.' + jsonPropName;
    }

    function parseJSONArray(jsonArrRoot, jsonArrObj, attrList, jsonObjPath) {
        var result = '';
        if (jsonArrRoot.length == 0) {
            result += startTag(jsonArrRoot, jsonArrObj, attrList, true);
        } else {
            for (var arIdx = 0; arIdx < jsonArrRoot.length; arIdx++) {
                result += startTag(jsonArrRoot[arIdx], jsonArrObj, parseJSONAttributes(jsonArrRoot[arIdx]), false);
                result += parseJSONObject(jsonArrRoot[arIdx], getJsonPropertyPath(jsonObjPath, jsonArrObj));
                result += endTag(jsonArrRoot[arIdx], jsonArrObj);
            }
        }
        return result;
    }

    function parseJSONObject(jsonObj, jsonObjPath) {
        var result = '';

        var elementsCnt = jsonXmlElemCount(jsonObj);

        if (elementsCnt > 0) {
            for (var it in jsonObj) {
                if (jsonXmlSpecialElem(jsonObj, it) || jsonObjPath != '' && !checkJsonObjPropertiesFilter(jsonObj, it, getJsonPropertyPath(jsonObjPath, it))) continue;

                var subObj = jsonObj[it];

                var attrList = parseJSONAttributes(subObj);

                if (subObj == null || subObj == undefined) {
                    result += startTag(subObj, it, attrList, true);
                } else if (subObj instanceof Object) {
                    if (subObj instanceof Array) {
                        result += parseJSONArray(subObj, it, attrList, jsonObjPath);
                    } else if (subObj instanceof Date) {
                        result += startTag(subObj, it, attrList, false);
                        result += subObj.toISOString();
                        result += endTag(subObj, it);
                    } else {
                        var subObjElementsCnt = jsonXmlElemCount(subObj);
                        if (subObjElementsCnt > 0 || subObj.__text != null || subObj.__cdata != null) {
                            result += startTag(subObj, it, attrList, false);
                            result += parseJSONObject(subObj, getJsonPropertyPath(jsonObjPath, it));
                            result += endTag(subObj, it);
                        } else {
                            result += startTag(subObj, it, attrList, true);
                        }
                    }
                } else {
                    result += startTag(subObj, it, attrList, false);
                    result += parseJSONTextObject(subObj);
                    result += endTag(subObj, it);
                }
            }
        }
        result += parseJSONTextObject(jsonObj);

        return result;
    }

    this.parseXmlString = function (xmlDocStr) {
        var isIEParser = window.ActiveXObject || 'ActiveXObject' in window;
        if (xmlDocStr === undefined) {
            return null;
        }
        var xmlDoc;
        if (window.DOMParser) {
            var parser = new window.DOMParser();
            var parsererrorNS = null;
            // IE9+ now is here
            if (!isIEParser) {
                try {
                    parsererrorNS = parser.parseFromString('INVALID', 'text/xml').getElementsByTagName('parsererror')[0].namespaceURI;
                } catch (err) {
                    parsererrorNS = null;
                }
            }
            try {
                xmlDoc = parser.parseFromString(xmlDocStr, 'text/xml');
                if (parsererrorNS != null && xmlDoc.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0) {
                    //throw new Error('Error parsing XML: '+xmlDocStr);
                    xmlDoc = null;
                }
            } catch (err) {
                xmlDoc = null;
            }
        } else {
            // IE :(
            if (xmlDocStr.indexOf('<?') == 0) {
                xmlDocStr = xmlDocStr.substr(xmlDocStr.indexOf('?>') + 2);
            }
            xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
            xmlDoc.async = 'false';
            xmlDoc.loadXML(xmlDocStr);
        }
        return xmlDoc;
    };

    this.asArray = function (prop) {
        if (prop === undefined || prop == null) return []; else if (prop instanceof Array) return prop; else return [prop];
    };

    this.toXmlDateTime = function (dt) {
        if (dt instanceof Date) return dt.toISOString(); else if (typeof dt === 'number') return new Date(dt).toISOString(); else return null;
    };

    this.asDateTime = function (prop) {
        if (typeof prop == 'string') {
            return fromXmlDateTime(prop);
        } else return prop;
    };

    this.xml2json = function (xmlDoc) {
        return parseDOMChildren(xmlDoc);
    };

    this.xml_str2json = function (xmlDocStr) {
        var xmlDoc = this.parseXmlString(xmlDocStr);
        if (xmlDoc != null) return this.xml2json(xmlDoc); else return null;
    };

    this.json2xml_str = function (jsonObj) {
        return parseJSONObject(jsonObj, '');
    };

    this.json2xml = function (jsonObj) {
        var xmlDocStr = this.json2xml_str(jsonObj);
        return this.parseXmlString(xmlDocStr);
    };

    this.getVersion = function () {
        return VERSION;
    };
}

/**
 * 去除字符串前后空格
 * @param v
 * @returns {string}
 */
export function trim(v) {
    return _.trim(v, " \t\n\r\v\f\0\x0B　")
}

/**
 * 将字符串转为utf8编码的长度
 * @param v
 * @returns {number}
 */
export function utf8Length(v) {
    return ~-encodeURI(v).split(/%..|./).length
}

/**
 * sprintf
 * @returns {string}
 */
export function sprintf() {
    var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
    while (f) {
        if (m = /^[^\x25]+/.exec(f)) {
            o.push(m[0]);
        } else if (m = /^\x25{2}/.exec(f)) {
            o.push('%');
        } else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
            if (((a = arguments[m[1] || i++]) === null) || (a === undefined)) {
                throw ('Too few arguments.');
            }
            if (/[^s]/.test(m[7]) && (typeof (a) != 'number')) {
                throw ('Expecting number but found ' + typeof (a));
            }
            switch (m[7]) {
                case 'b':
                    a = a.toString(2);
                    break;
                case 'c':
                    a = String.fromCharCode(a);
                    break;
                case 'd':
                    a = parseInt(a);
                    break;
                case 'e':
                    a = m[6] ? a.toExponential(m[6]) : a.toExponential();
                    break;
                case 'f':
                    a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a);
                    break;
                case 'o':
                    a = a.toString(8);
                    break;
                case 's':
                    a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a);
                    break;
                case 'u':
                    a = Math.abs(a);
                    break;
                case 'x':
                    a = a.toString(16);
                    break;
                case 'X':
                    a = a.toString(16).toUpperCase();
                    break;
            }
            a = (/[def]/.test(m[7]) && m[2] && a >= 0 ? '+' + a : a);
            c = m[3] ? m[3] === '0' ? '0' : m[3].charAt(1) : ' ';
            x = m[5] - String(a).length - s.length;
            p = m[5] ? _.repeat(c, x) : '';
            o.push(s + (m[4] ? a + p : p + a));
        } else {
            throw ('Huh ?!');
        }
        f = f.toString().substring(m[0].length);
    }

    return o.join('');
}

/**
 * 返回相对应于 ascii码 所指定的单个字符
 * @param v
 * @returns {string}
 */
export function chr(v) {
    if (!Kvali.isInteger(v)) {
        return ''
    }

    return String.fromCharCode(v)
}

/**
 * 转换字符串第一个字节为 0-255 之间的值
 * @param v
 * @returns {number}
 */
export function ord(v) {
    return v.charCodeAt(0)
}

/**
 * 字符串转[utf8]字节数组.
 * js版本参考 www.npmjs.com/package/utf8-string-bytes
 * ts版本参考 gitlab.com/hmajid2301/utf8-to-bytes
 * @param str
 * @returns {[]}
 */
export function str2Bytes(str) {
    let out = [], p = 0;
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if (c < 128) {
            out[p++] = c;
        } else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        } else if (
            ((c & 0xFC00) === 0xD800) && (i + 1) < str.length &&
            ((str.charCodeAt(i + 1) & 0xFC00) === 0xDC00)) {
            // Surrogate Pair
            c = 0x10000 + ((c & 0x03FF) << 10) + (str.charCodeAt(++i) & 0x03FF);
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        } else {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
}

/**
 * str2Bytes别名
 * @param v
 * @returns {[]}
 */
export function str2Utf8Arr(v) {
    return str2Bytes(v)
}

/**
 * [utf8]字节数组转字符串
 * @param bytes
 * @returns {string}
 */
export function bytes2Str(bytes) {
    let out = [], pos = 0, c = 0;
    while (pos < bytes.length) {
        let c1 = bytes[pos++];
        if (c1 < 128) {
            out[c++] = String.fromCharCode(c1);
        } else if (c1 > 191 && c1 < 224) {
            let c2 = bytes[pos++];
            out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
        } else if (c1 > 239 && c1 < 365) {
            // Surrogate Pair
            let c2 = bytes[pos++];
            let c3 = bytes[pos++];
            let c4 = bytes[pos++];
            let u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 0x10000;
            out[c++] = String.fromCharCode(0xD800 + (u >> 10));
            out[c++] = String.fromCharCode(0xDC00 + (u & 1023));
        } else {
            let c2 = bytes[pos++];
            let c3 = bytes[pos++];
            out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        }
    }
    return out.join('');
}

/**
 * bytes2Str的别名
 * @param v
 * @returns {string}
 * @constructor
 */
export function utf8Arr2Str(v) {
    return bytes2Str(v)
}

/**
 * 生成随机字串
 * @param len 长度
 * @param type 字串类型:1 不区分大小写的字母, 2 数字, 3 大写字母, 4 小写字母, 5 中文, 0 数值和字母
 * @param addChars 额外的随机字符
 * @returns {string}
 */
export function randomString(len = 6, type = 0, addChars = '') {
    let res = '', chars = ''

    switch (type) {
        case 1:
            chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            break;
        case 2:
            chars = '0123456789';
            break;
        case 3:
            chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case 4:
            chars = 'abcdefghijklmnopqrstuvwxyz';
            break;
        case 5:
            chars = "们以我到他会作时要动国产的一是工就年阶义发成部民可出能方进在了不和有大这主中人上为来分生对于学下级地个用同行面说种过命度革而多子后自社加小机也经力线本电高量长党得实家定深法表着水理化争现所二起政三好十战无农使性前等反体合斗路图把结第里正新开论之物从当两些还天资事队批点育重其思与间内去因件日利相由压员气业代全组数果期导平各基或月毛然如应形想制心样干都向变关问比展那它最及外没看治提五解系林者米群头意只明四道马认次文通但条较克又公孔领军流入接席位情运器并飞原油放立题质指建区验活众很教决特此常石强极土少已根共直团统式转别造切九你取西持总料连任志观调七么山程百报更见必真保热委手改管处己将修支识病象几先老光专什六型具示复安带每东增则完风回南广劳轮科北打积车计给节做务被整联步类集号列温装即毫知轴研单色坚据速防史拉世设达尔场织历花受求传口断况采精金界品判参层止边清至万确究书术状厂须离再目海交权且儿青才证低越际八试规斯近注办布门铁需走议县兵固除般引齿千胜细影济白格效置推空配刀叶率述今选养德话查差半敌始片施响收华觉备名红续均药标记难存测士身紧液派准斤角降维板许破述技消底床田势端感往神便贺村构照容非搞亚磨族火段算适讲按值美态黄易彪服早班麦削信排台声该击素张密害侯草何树肥继右属市严径螺检左页抗苏显苦英快称坏移约巴材省黑武培著河帝仅针怎植京助升王眼她抓含苗副杂普谈围食射源例致酸旧却充足短划剂宣环落首尺波承粉践府鱼随考刻靠够满夫失包住促枝局菌杆周护岩师举曲春元超负砂封换太模贫减阳扬江析亩木言球朝医校古呢稻宋听唯输滑站另卫字鼓刚写刘微略范供阿块某功套友限项余倒卷创律雨让骨远帮初皮播优占死毒圈伟季训控激找叫云互跟裂粮粒母练塞钢顶策双留误础吸阻故寸盾晚丝女散焊功株亲院冷彻弹错散商视艺灭版烈零室轻血倍缺厘泵察绝富城冲喷壤简否柱李望盘磁雄似困巩益洲脱投送奴侧润盖挥距触星松送获兴独官混纪依未突架宽冬章湿偏纹吃执阀矿寨责熟稳夺硬价努翻奇甲预职评读背协损棉侵灰虽矛厚罗泥辟告卵箱掌氧恩爱停曾溶营终纲孟钱待尽俄缩沙退陈讨奋械载胞幼哪剥迫旋征槽倒握担仍呀鲜吧卡粗介钻逐弱脚怕盐末阴丰雾冠丙街莱贝辐肠付吉渗瑞惊顿挤秒悬姆烂森糖圣凹陶词迟蚕亿矩康遵牧遭幅园腔订香肉弟屋敏恢忘编印蜂急拿扩伤飞露核缘游振操央伍域甚迅辉异序免纸夜乡久隶缸夹念兰映沟乙吗儒杀汽磷艰晶插埃燃欢铁补咱芽永瓦倾阵碳演威附牙芽永瓦斜灌欧献顺猪洋腐请透司危括脉宜笑若尾束壮暴企菜穗楚汉愈绿拖牛份染既秋遍锻玉夏疗尖殖井费州访吹荣铜沿替滚客召旱悟刺脑措贯藏敢令隙炉壳硫煤迎铸粘探临薄旬善福纵择礼愿伏残雷延烟句纯渐耕跑泽慢栽鲁赤繁境潮横掉锥希池败船假亮谓托伙哲怀割摆贡呈劲财仪沉炼麻罪祖息车穿货销齐鼠抽画饲龙库守筑房歌寒喜哥洗蚀废纳腹乎录镜妇恶脂庄擦险赞钟摇典柄辩竹谷卖乱虚桥奥伯赶垂途额壁网截野遗静谋弄挂课镇妄盛耐援扎虑键归符庆聚绕摩忙舞遇索顾胶羊湖钉仁音迹碎伸灯避泛亡答勇频皇柳哈揭甘诺概宪浓岛袭谁洪谢炮浇斑讯懂灵蛋闭孩释乳巨徒私银伊景坦累匀霉杜乐勒隔弯绩招绍胡呼痛峰零柴簧午跳居尚丁秦稍追梁折耗碱殊岗挖氏刃剧堆赫荷胸衡勤膜篇登驻案刊秧缓凸役剪川雪链渔啦脸户洛孢勃盟买杨宗焦赛旗滤硅炭股坐蒸凝竟陷枪黎救冒暗洞犯筒您宋弧爆谬涂味津臂障褐陆啊健尊豆拔莫抵桑坡缝警挑污冰柬嘴啥饭塑寄赵喊垫丹渡耳刨虎笔稀昆浪萨茶滴浅拥穴覆伦娘吨浸袖珠雌妈紫戏塔锤震岁貌洁剖牢锋疑霸闪埔猛诉刷狠忽灾闹乔唐漏闻沈熔氯荒茎男凡抢像浆旁玻亦忠唱蒙予纷捕锁尤乘乌智淡允叛畜俘摸锈扫毕璃宝芯爷鉴秘净蒋钙肩腾枯抛轨堂拌爸循诱祝励肯酒绳穷塘燥泡袋朗喂铝软渠颗惯贸粪综墙趋彼届墨碍启逆卸航衣孙龄岭骗休借";
            break;
        case 0:
        default :
            // 默认去掉了容易混淆的字符oOLl和数字01，要添加请使用addChars参数
            chars = 'ABCDEFGHIJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
            break;
    }

    if (addChars.length > 0) {
        chars += addChars
    }

    //位数过长重复字符串一定次数
    let diff = len / chars.length
    if (diff > 1) {
        chars = _.repeat(chars, Math.ceil(diff))
    }

    let maxPos = chars.length
    for (let i = 0; i < len; i++) {
        res += chars.charAt(Math.floor(Math.random() * maxPos));
    }

    return res
}

/**
 * 获取文件扩展名
 * @param v
 * @returns {string}
 */
export function getFileExt(v) {
    let a = v.split("?")[0].split("#")[0].split(".");
    if (a.length === 1 || (a[0] === "" && a.length === 2)) {
        return "";
    }
    return a.pop().toLowerCase();
}

export default {
    x2js,
    trim,
    utf8Length,
    sprintf,
    chr,
    ord,
    str2Bytes,
    bytes2Str,
    str2Utf8Arr,
    utf8Arr2Str,
    randomString,
    getFileExt,
}
