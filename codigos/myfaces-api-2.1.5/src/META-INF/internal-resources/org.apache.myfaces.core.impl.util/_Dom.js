/* Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @class
 * @name _Dom
 * @memberOf myfaces._impl._util
 * @extends myfaces._impl.core._Runtime
 * @description Object singleton collection of dom helper routines
 * (which in later incarnations will
 * get browser specific speed optimizations)
 *
 * Since we have to be as tight as possible
 * we will focus with our dom routines to only
 * the parts which our impl uses.
 * A jquery like query API would be nice
 * but this would increase up our codebase significantly
 *
 * <p>This class provides the proper fallbacks for ie8- and Firefox 3.6-</p>
 */
_MF_SINGLTN(_PFX_UTIL + "_Dom", Object, /** @lends myfaces._impl._util._Dom.prototype */ {

    /*table elements which are used in various parts */
    TABLE_ELEMS:  {
        "thead": 1,
        "tbody": 1,
        "tr": 1,
        "th": 1,
        "td": 1,
        "tfoot" : 1
    },

    _Lang:  myfaces._impl._util._Lang,
    _RT:    myfaces._impl.core._Runtime,
    _dummyPlaceHolder:null,

    /**
     * standard constructor
     */
    constructor_: function() {
    },

    runCss: function(item, xmlData) {

        var stylesheets = document.styleSheets,
                finalCss = [],
                UDEF = "undefined",
                applyStyle = this._Lang.hitch(this, function(item, style) {
                    var newSS = document.createElement("style");

                    newSS.setAttribute("rel", item.getAttribute("rel") || "stylesheet");
                    newSS.setAttribute("type", item.getAttribute("type") || "text/css");
                    document.getElementsByTagName("head")[0].appendChild(newSS);
                    //ie merrily again goes its own way
                    if (window.attachEvent && !this._RT.isOpera && UDEF != typeof newSS.styleSheet && UDEF != newSS.styleSheet.cssText) newSS.styleSheet.cssText = style;
                    else newSS.appendChild(document.createTextNode(style));
                }),

                execCss = this._Lang.hitch(this, function(item) {
                    var equalsIgnoreCase = this._Lang.equalsIgnoreCase;
                    var tagName = item.tagName;
                    if (tagName && equalsIgnoreCase(tagName, "link") && equalsIgnoreCase(item.getAttribute("type"), "text/css")) {
                        applyStyle(item, "@import url('" + item.getAttribute("href") + "');");
                    } else if (tagName && equalsIgnoreCase(tagName, "style") && equalsIgnoreCase(item.getAttribute("type"), "text/css")) {
                        var innerText = [];
                        //compliant browsers know child nodes
                        var childNodes = item.childNodes;
                        if (childNodes) {
                            var len = childNodes.length;
                            for (var cnt = 0; cnt < len; cnt++) {
                                innerText.push(childNodes[cnt].innerHTML || childNodes[cnt].data);
                            }
                            //non compliant ones innerHTML
                        } else if (item.innerHTML) {
                            innerText.push(item.innerHTML);
                        }

                        applyStyle(item, innerText.join(""));
                    }
                });

        try {
            var scriptElements = this.findByTagNames(item, {"link":1,"style":1}, true);
            if (scriptElements == null) return;
            for (var cnt = 0; cnt < scriptElements.length; cnt++) {
                execCss(scriptElements[cnt]);
            }

        } finally {
            //the usual ie6 fix code
            //the IE6 garbage collector is broken
            //nulling closures helps somewhat to reduce
            //mem leaks, which are impossible to avoid
            //at this browser
            execCss = null;
            applyStyle = null;
        }
    },


    deleteScripts: function(nodeList) {
        if (!nodeList || !nodeList.length) return;
        var len = nodeList.length;
        for (var cnt = 0; cnt < len; cnt++) {
            var item = nodeList[cnt];
            var src = item.getAttribute('src');
            if (src && src.length > 0 && (src.indexOf("/jsf.js") != -1 || src.indexOf("/jsf-uncompressed.js") != -1)) {
                continue;
            }
            this.deleteItem(item);
        }
    },

    /**
     * Run through the given Html item and execute the inline scripts
     * (IE doesn't do this by itself)
     * @param {Node} item
     */
    runScripts: function(item, xmlData) {
        var _Lang = this._Lang;
        var finalScripts = [],

                execScrpt = _Lang.hitch(this, function(item) {
                    var tagName = item.tagName;
                    if (tagName && _Lang.equalsIgnoreCase(tagName, "script")) {
                        var src = item.getAttribute('src');
                        if ('undefined' != typeof src
                                && null != src
                                && src.length > 0
                                ) {
                            //we have to move this into an inner if because chrome otherwise chokes
                            //due to changing the and order instead of relying on left to right
                            if ((src.indexOf("ln=scripts") == -1 && src.indexOf("ln=javax.faces") == -1) || (src.indexOf("/jsf.js") == -1
                                    && src.indexOf("/jsf-uncompressed.js") == -1)) {
                                if (finalScripts.length) {
                                    //script source means we have to eval the existing
                                    //scripts before running the include
                                    this._RT.globalEval(finalScripts.join("\n"));

                                    finalScripts = [];
                                }
                                //if jsf.js is already registered we do not replace it anymore
                                if (!window.jsf) {
                                    this._RT.loadScriptEval(src, item.getAttribute('type'), false, "UTF-8", false);
                                }
                            }
                            //TODO handle embedded scripts
                        } else {
                            // embedded script auto eval
                            var test = (!xmlData) ? item.text : _Lang.serializeChilds(item);
                            var go = true;
                            while (go) {
                                go = false;
                                if (test.substring(0, 1) == " ") {
                                    test = test.substring(1);
                                    go = true;
                                }
                                if (test.substring(0, 4) == "<!--") {
                                    test = test.substring(4);
                                    go = true;
                                }
                                if (test.substring(0, 11) == "//<![CDATA[") {
                                    test = test.substring(11);
                                    go = true;
                                }
                            }
                            // we have to run the script under a global context
                            //we store the script for less calls to eval
                            finalScripts.push(test);

                        }
                    }
                });
        try {
            var scriptElements = this.findByTagName(item, "script", true);
            if (scriptElements == null) return;
            for (var cnt = 0; cnt < scriptElements.length; cnt++) {
                execScrpt(scriptElements[cnt]);
            }
            if (finalScripts.length) {
                this._RT.globalEval(finalScripts.join("\n"));
            }
        } finally {
            //the usual ie6 fix code
            //the IE6 garbage collector is broken
            //nulling closures helps somewhat to reduce
            //mem leaks, which are impossible to avoid
            //at this browser
            execScrpt = null;
        }
    },


    /**
     * determines to fetch a node
     * from its id or name, the name case
     * only works if the element is unique in its name
     * @param {String} elem
     */
    byIdOrName: function(elem) {
        if (!elem) return null;
        if (!this._Lang.isString(elem)) return elem;

        var ret = this.byId(elem);
        if (ret) return ret;
        //we try the unique name fallback
        var items = document.getElementsByName(elem);
        return ((items.length == 1) ? items[0] : null);
    },

    /**
     * node id or name, determines the valid form identifier of a node
     * depending on its uniqueness
     *
     * Usually the id is chosen for an elem, but if the id does not
     * exist we try a name fallback. If the passed element has a unique
     * name we can use that one as subsequent identifier.
     *
     *
     * @param {String} elem
     */
    nodeIdOrName: function(elem) {
        if (elem) {
            //just to make sure that the pas

            elem = this.byId(elem);
            if (!elem) return null;
            //detached element handling, we also store the element name
            //to get a fallback option in case the identifier is not determinable
            // anymore, in case of a framework induced detachment the element.name should
            // be shared if the identifier is not determinable anymore
            //the downside of this method is the element name must be unique
            //which in case of jsf it is
            var elementId = elem.id || elem.name;
            if ((elem.id == null || elem.id == '') && elem.name) {
                elementId = elem.name;

                //last check for uniqueness
                if (this.getElementsByName(elementId).length > 1) {
                    //no unique element name so we need to perform
                    //a return null to let the caller deal with this issue
                    return null;
                }
            }
            return elementId;
        }
        return null;
    },

    deleteItems: function(items) {
        if (! items || ! items.length) return;
        for (var cnt = 0; cnt < items.length; cnt++) {
            this.deleteItem(items[cnt]);
        }
    },

    /**
     * Simple delete on an existing item
     */
    deleteItem: function(itemIdToReplace) {
        var item = this.byId(itemIdToReplace);
        if (!item) {
            throw this._Lang.makeException(null, null, this._nameSpace, "deleteItem",  "_Dom.deleteItem  Unknown Html-Component-ID: " + itemIdToReplace);
        }

        this._removeNode(item, false);
    },

    /**
     * creates a node upon a given node name
     * @param nodeName {String} the node name to be created
     * @param attrs {Array} a set of attributes to be set
     */
    createElement: function(nodeName, attrs) {
        var ret = document.createElement(nodeName);
        if (attrs) {
            for (var key in attrs) {
                this.setAttribute(ret, key, attrs[key]);
            }
        }
        return ret;
    },

    /**
     * Checks whether the browser is dom compliant.
     * Dom compliant means that it performs the basic dom operations safely
     * without leaking and also is able to perform a native setAttribute
     * operation without freaking out
     *
     *
     * Not dom compliant browsers are all microsoft browsers in quirks mode
     * and ie6 and ie7 to some degree in standards mode
     * and pretty much every browser who cannot create ranges
     * (older mobile browsers etc...)
     *
     * We dont do a full browser detection here because it probably is safer
     * to test for existing features to make an assumption about the
     * browsers capabilities
     */
    isDomCompliant: function() {
        return true;
    },

    /**
     * proper insert before which takes tables into consideration as well as
     * browser deficiencies
     * @param item the node to insert before
     * @param markup the markup to be inserted
     */
    insertBefore: function(item, markup) {
        this._assertStdParams(item, markup, "insertBefore");

        markup = this._Lang.trim(markup);
        if (markup === "") return null;

        var evalNodes = this._buildEvalNodes(item, markup),
                currentRef = item,
                parentNode = item.parentNode,
                ret = [];
        for (var cnt = evalNodes.length - 1; cnt >= 0; cnt--) {
            currentRef = parentNode.insertBefore(evalNodes[cnt], currentRef);
            ret.push(currentRef);
        }
        ret = ret.reverse();
        this._eval(ret);
        return ret;
    },

    /**
     * proper insert before which takes tables into consideration as well as
     * browser deficiencies
     * @param item the node to insert before
     * @param markup the markup to be inserted
     */
    insertAfter: function(item, markup) {
        this._assertStdParams(item, markup, "insertAfter");
        markup = this._Lang.trim(markup);
        if (markup === "") return null;

        var evalNodes = this._buildEvalNodes(item, markup),
                currentRef = item,
                parentNode = item.parentNode,
                ret = [];

        for (var cnt = 0; cnt < evalNodes.length; cnt++) {
            if (currentRef.nextSibling) {
                //TODO winmobile6 has problems with this strategy
                currentRef = parentNode.insertBefore(evalNodes[cnt], currentRef.nextSibling);
            } else {
                currentRef = parentNode.appendChild(evalNodes[cnt]);
            }
            ret.push(currentRef);
        }
        this._eval(ret);
        return ret;
    },


    /**
     * outerHTML replacement which works cross browserlike
     * but still is speed optimized
     *
     * @param item the item to be replaced
     * @param markup the markup for the replacement
     */
    outerHTML : function(item, markup) {
        this._assertStdParams(item, markup, "outerHTML");

        markup = this._Lang.trim(markup);
        if (markup !== "") {
            var ret = null;

            // we try to determine the browsers compatibility
            // level to standards dom level 2 via various methods
            if (this.isDomCompliant()) {
                ret = this._outerHTMLCompliant(item, markup);
            } else {
                //call into abstract method
                ret = this._outerHTMLNonCompliant(item, markup);
            }

            // and remove the old item
            //first we have to save the node newly insert for easier access in our eval part
            this._eval(ret);
            return ret;
        }
        // and remove the old item, in case of an empty newtag and do nothing else
        this._removeNode(item, false);
        return null;
    },

    /**
     * detaches a set of nodes from their parent elements
     * in a browser independend manner
     * @param {Object} items the items which need to be detached
     * @return {Array} an array of nodes with the detached dom nodes
     */
    detach: function(items) {
        var ret = [];
        if ('undefined' != typeof items.nodeType) {
            if (items.parentNode) {
                ret.push(items.parentNode.removeChild(items));
            } else {
                ret.push(items);
            }
            return ret;
        }
        //all ies treat node lists not as arrays so we have to take
        //an intermediate step
        var nodeArr = this._Lang.objToArray(items);
        for (var cnt = 0; cnt < nodeArr.length; cnt++) {
            ret.push(nodeArr[cnt].parentNode.removeChild(nodeArr[cnt]));
        }
        return ret;
    },

    _outerHTMLCompliant: function(item, markup) {
        //table element replacements like thead, tbody etc... have to be treated differently
        var evalNodes = this._buildEvalNodes(item, markup);

        if (evalNodes.length == 1) {
            var ret = evalNodes[0];
            item.parentNode.replaceChild(ret, item);
            return ret;
        } else {
            return this.replaceElements(item, evalNodes);
        }
    },

    _isTable: function(item) {
        return "table" == (item.nodeName || item.tagName).toLowerCase();
    },

    /**
     * checks if the provided element is a subelement of a table element
     * @param itemNodeName
     */
    _isTableElement: function(item) {
        return !!this.TABLE_ELEMS[(item.nodeName || item.tagName).toLowerCase()];
    },

    /**
     * non ie browsers do not have problems with embedded scripts or any other construct
     * we simply can use an innerHTML in a placeholder
     *
     * @param markup the markup to be used
     */
    _buildNodesCompliant: function(markup) {
        var dummyPlaceHolder = this.getDummyPlaceHolder(); //document.createElement("div");
        dummyPlaceHolder.innerHTML = markup;
        return this._Lang.objToArray(dummyPlaceHolder.childNodes);
    },




    /**
     * builds up a correct dom subtree
     * if the markup is part of table nodes
     * The usecase for this is to allow subtable rendering
     * like single rows thead or tbody
     *
     * @param item
     * @param markup
     */
    _buildTableNodes: function(item, markup) {
        var itemNodeName = (item.nodeName || item.tagName).toLowerCase(),
                probe = document.createElement("div");

        var tmpNodeName = itemNodeName;
        var depth = 0;
        while (tmpNodeName != "table") {
            item = item.parentNode;
            tmpNodeName = (item.nodeName || item.tagName).toLowerCase();
            depth++;
        }

        var dummyPlaceHolder = document.createElement("div");
        if (itemNodeName == "td") {
            dummyPlaceHolder.innerHTML = "<table><tbody><tr>" + markup + "</tr></tbody></table>";
        } else {
            dummyPlaceHolder.innerHTML = "<table>" + markup + "</table>";
        }

        for (var cnt = 0; cnt < depth; cnt++) {
            dummyPlaceHolder = dummyPlaceHolder.childNodes[0];
        }

        return this.detach(dummyPlaceHolder.childNodes);
    },

    _removeChildNodes: function(node, breakEventsOpen) {
        if (!node) return;
        node.innerHTML = "";
    },



    _removeNode: function(node, breakEventsOpen) {
        if (!node) return;
        var parentNode = node.parentNode;
        if (parentNode) //if the node has a parent
            parentNode.removeChild(node);
        return;
    },


    /**
     * build up the nodes from html markup in a browser independend way
     * so that it also works with table nodes
     *
     * @param item the parent item upon the nodes need to be processed upon after building
     * @param markup the markup to be built up
     */
    _buildEvalNodes: function(item, markup) {
        var evalNodes = null;
        if (this._isTableElement(item)) {
            evalNodes = this._buildTableNodes(item, markup);
        } else {
            evalNodes = (this.isDomCompliant()) ? this._buildNodesCompliant(markup) : this._buildNodesNonCompliant(markup);
        }
        return evalNodes;
    },

    /**
     * we have lots of methods with just an item and a markup as params
     * this method builds an assertion for those methods to reduce code
     *
     * @param item  the item to be tested
     * @param markup the mark
     * @param caller
     */
    _assertStdParams: function(item, markup, caller, params) {
        //internal error
        if (!caller) {
            throw this._Lang.makeException(null, null, this._nameSpace, "_assertStdParams",  "Caller must be set for assertion");
        }
        var _Lang = this._Lang,
                ERR_PROV = "ERR_MUST_BE_PROVIDED1",
                DOM = "myfaces._impl._util._Dom.",
                finalParams = params || ["item", "markup"];

        if (!item || !markup) {
            _Lang.makeException(null, null,DOM, ""+caller,  _Lang.getMessage(ERR_PROV, null, DOM +"."+ caller, (!item) ? params[0] : params[1]));
            //throw Error(_Lang.getMessage(ERR_PROV, null, DOM + caller, (!item) ? params[0] : params[1]));
        }
    },

    /**
     * internal eval handler used by various functions
     * @param _nodeArr
     */
    _eval: function(_nodeArr) {
        if (this.isManualScriptEval()) {
            var isArr = _nodeArr instanceof Array;
            if (isArr && _nodeArr.length) {
                for (var cnt = 0; cnt < _nodeArr.length; cnt++) {
                    this.runScripts(_nodeArr[cnt]);
                }
            } else if (!isArr) {
                this.runScripts(_nodeArr);
            }
        }
    },



    /**
     * for performance reasons we work with replaceElement and replaceElements here
     * after measuring performance it has shown that passing down an array instead
     * of a single node makes replaceElement twice as slow, however
     * a single node case is the 95% case
     *
     * @param item
     * @param evalNodes
     */
    replaceElement: function(item, evalNode) {
        //browsers with defect garbage collection
        item.parentNode.insertBefore(evalNode, item);
        this._removeNode(item, false);
    },


    /**
     * replaces an element with another element or a set of elements
     *
     * @param item the item to be replaced
     *
     * @param evalNodes the elements
     */
    replaceElements: function (item, evalNodes) {
        var evalNodesDefined = evalNodes && 'undefined' != typeof evalNodes.length;
        if (!evalNodesDefined) {
            throw this._Lang.makeException(null, null, this._nameSpace, "replaceElements",  this._Lang.getMessage("ERR_REPLACE_EL"));
        }

        var parentNode = item.parentNode,

                sibling = item.nextSibling,
                resultArr = this._Lang.objToArray(evalNodes);

        for (var cnt = 0; cnt < resultArr.length; cnt++) {
            if (cnt == 0) {
                this.replaceElement(item, resultArr[cnt]);
            } else {
                if (sibling) {
                    parentNode.insertBefore(resultArr[cnt], sibling);
                } else {
                    parentNode.appendChild(resultArr[cnt]);
                }
            }
        }
        return resultArr;
    },

    /**
     * optimized search for an array of tag names
     * deep scan will always be performed.
     * @param fragment the fragment which should be searched for
     * @param tagNames an map indx of tag names which have to be found
     *
     */
    findByTagNames: function(fragment, tagNames) {
        this._assertStdParams(fragment, tagNames, "findByTagNames", ["fragment", "tagNames"]);

        var nodeType = fragment.nodeType;
        if (nodeType != 1 && nodeType != 9 && nodeType != 11) return null;

        //we can use the shortcut
        if (fragment.querySelectorAll) {
            var query = [];
            for (var key in tagNames) {
                query.push(key);
            }
            var res = [];
            if (fragment.tagName && tagNames[fragment.tagName.toLowerCase()]) {
                res.push(fragment);
            }
            return res.concat(this._Lang.objToArray(fragment.querySelectorAll(query.join(", "))));
        }

        //now the filter function checks case insensitively for the tag names needed
        var filter = function(node) {
            return node.tagName && tagNames[node.tagName.toLowerCase()];
        };

        //now we run an optimized find all on it
        try {
            return this.findAll(fragment, filter, true);
        } finally {
            //the usual IE6 is broken, fix code
            filter = null;
        }
    },

    /**
     * determines the number of nodes according to their tagType
     *
     * @param {Node} fragment (Node or fragment) the fragment to be investigated
     * @param {String} tagName the tag name (lowercase)
     * (the normal usecase is false, which means if the element is found only its
     * adjacent elements will be scanned, due to the recursive descension
     * this should work out with elements with different nesting depths but not being
     * parent and child to each other
     *
     * @return the child elements as array or null if nothing is found
     *
     */
    findByTagName : function(fragment, tagName) {
        this._assertStdParams(fragment, tagName, "findByTagName", ["fragment", "tagName"]);
        var _Lang = this._Lang,
                nodeType = fragment.nodeType;
        if (nodeType != 1 && nodeType != 9 && nodeType != 11) return null;

        //remapping to save a few bytes

        var ret = _Lang.objToArray(fragment.getElementsByTagName(tagName));
        if (fragment.tagName && _Lang.equalsIgnoreCase(fragment.tagName, tagName)) ret.unshift(fragment);
        return ret;
    },

    findByName : function(fragment, name) {
        this._assertStdParams(fragment, name, "findByName", ["fragment", "name"]);

        var nodeType = fragment.nodeType;
        if (nodeType != 1 && nodeType != 9 && nodeType != 11) return null;

        var ret = this._Lang.objToArray(fragment.getElementsByName(name));
        if (fragment.name == name) ret.unshift(fragment);
        return ret;
    },

    /**
     * a filtered findAll for subdom treewalking
     * (which uses browser optimizations wherever possible)
     *
     * @param {|Node|} rootNode the rootNode so start the scan
     * @param filter filter closure with the syntax {boolean} filter({Node} node)
     * @param deepScan if set to true or not set at all a deep scan is performed (for form scans it does not make much sense to deeply scan)
     */
    findAll : function(rootNode, filter, deepScan) {
        this._Lang.assertType(filter, "function");
        deepScan = !!deepScan;

        if (document.createTreeWalker && NodeFilter) {
            return this._iteratorSearchAll(rootNode, filter, deepScan);
        } else {
            //will not be called in dom level3 compliant browsers
            return this._recursionSearchAll(rootNode, filter, deepScan);
        }

    },



    /**
     * the faster dom iterator based search, works on all newer browsers
     * except ie8 which already have implemented the dom iterator functions
     * of html 5 (which is pretty all standard compliant browsers)
     *
     * The advantage of this method is a faster tree iteration compared
     * to the normal recursive tree walking.
     *
     * @param rootNode the root node to be iterated over
     * @param filter the iteration filter
     * @param deepScan if set to true a deep scan is performed
     */
    _iteratorSearchAll: function(rootNode, filter, deepScan) {
        var retVal = [];
        //Works on firefox and webkit, opera and ie have to use the slower fallback mechanis
        //we have a tree walker in place this allows for an optimized deep scan
        if (filter(rootNode)) {

            retVal.push(rootNode);
            if (!deepScan) {
                return retVal;
            }
        }
        //we use the reject mechanism to prevent a deep scan reject means any
        //child elements will be omitted from the scan
        var FILTER_ACCEPT = NodeFilter.FILTER_ACCEPT,
                FILTER_SKIP = NodeFilter.FILTER_SKIP,
                FILTER_REJECT = NodeFilter.FILTER_REJECT;

        var walkerFilter = function (node) {
            var retCode = (filter(node)) ? FILTER_ACCEPT : FILTER_SKIP;
            retCode = (!deepScan && retCode == FILTER_ACCEPT) ? FILTER_REJECT : retCode;
            if (retCode == FILTER_ACCEPT || retCode == FILTER_REJECT) {
                retVal.push(node);
            }
            return retCode;
        };

        var treeWalker = document.createTreeWalker(rootNode, NodeFilter.SHOW_ELEMENT, walkerFilter, false);
        //noinspection StatementWithEmptyBodyJS
        while (treeWalker.nextNode());
        return retVal;
    },

    /**
     * bugfixing for ie6 which does not cope properly with setAttribute
     */
    setAttribute : function(node, attr, val) {
        this._assertStdParams(node, attr, "setAttribute", ["fragment", "name"]);
        if (!node.setAttribute) {
            return;
        }
        node.setAttribute(attr, val);
        return;
    },

    /**
     * fuzzy form detection which tries to determine the form
     * an item has been detached.
     *
     * The problem is some Javascript libraries simply try to
     * detach controls by reusing the names
     * of the detached input controls. Most of the times,
     * the name is unique in a jsf scenario, due to the inherent form mapping.
     * One way or the other, we will try to fix that by
     * identifying the proper form over the name
     *
     * We do it in several ways, in case of no form null is returned
     * in case of multiple forms we check all elements with a given name (which we determine
     * out of a name or id of the detached element) and then iterate over them
     * to find whether they are in a form or not.
     *
     * If only one element within a form and a given identifier found then we can pull out
     * and move on
     *
     * We cannot do much further because in case of two identical named elements
     * all checks must fail and the first elements form is served.
     *
     * Note, this method is only triggered in case of the issuer or an ajax request
     * is a detached element, otherwise already existing code has served the correct form.
     *
     * This method was added because of
     * https://issues.apache.org/jira/browse/MYFACES-2599
     * to support the integration of existing ajax libraries which do heavy dom manipulation on the
     * controls side (Dojos Dijit library for instance).
     *
     * @param {Node} elem - element as source, can be detached, undefined or null
     *
     * @return either null or a form node if it could be determined
     *
     * TODO move this into extended and replace it with a simpler algorithm
     */
    fuzzyFormDetection : function(elem) {
        var forms = document.forms, _Lang = this._Lang;

        if (!forms || !forms.length) {
            return null;
        }

        // This will not work well on portlet case, because we cannot be sure
        // the returned form is right one.
        //we can cover that case by simply adding one of our config params
        //the default is the weaker, but more correct portlet code
        //you can override it with myfaces_config.no_portlet_env = true globally
        else if (1 == forms.length && this._RT.getGlobalConfig("no_portlet_env", false)) {
            return forms[0];
        }

        //before going into the more complicated stuff we try the simple approach
        var finalElem = this.byId(elem);
        var fetchForm = _Lang.hitch(this, function(elem) {
            //element of type form then we are already
            //at form level for the issuing element
            //https://issues.apache.org/jira/browse/MYFACES-2793

            return (_Lang.equalsIgnoreCase(elem.tagName, "form")) ? elem :
                    ( this.html5FormDetection(elem) || this.getParent(elem, "form"));
        });

        if (finalElem) {
            var elemForm = fetchForm(finalElem);
            if (elemForm) return elemForm;
        }

        /**
         * name check
         */
        var foundElements = [];
        var name = (_Lang.isString(elem)) ? elem : elem.name;
        //id detection did not work
        if (!name) return null;
        /**
         * the lesser chance is the elements which have the same name
         * (which is the more likely case in case of a brute dom replacement)
         */
        var nameElems = document.getElementsByName(name);
        if (nameElems) {
            for (var cnt = 0; cnt < nameElems.length && foundElements.length < 2; cnt++) {
                // we already have covered the identifier case hence we only can deal with names,
                var foundForm = fetchForm(nameElems[cnt]);
                if (foundForm) {
                    foundElements.push(foundForm);
                }
            }
        }

        return (1 == foundElements.length ) ? foundElements[0] : null;
    },

    html5FormDetection: function(item) {
        return null;
    },


    /**
     * gets a parent of an item with a given tagname
     * @param {Node} item - child element
     * @param {String} tagName - TagName of parent element
     */
    getParent : function(item, tagName) {

        if (!item) {
            throw this._Lang.makeException(null, null, this._nameSpace, "getParent",
                    this._Lang.getMessage("ERR_MUST_BE_PROVIDED1", null, "_Dom.getParent", "item {DomNode}"));
        }

        var _Lang = this._Lang;
        var searchClosure = function(parentItem) {
            return parentItem && parentItem.tagName
                    && _Lang.equalsIgnoreCase(parentItem.tagName, tagName);
        };
        try {
            return this.getFilteredParent(item, searchClosure);
        } finally {
            searchClosure = null;
            _Lang = null;
        }
    },

    /**
     * A parent walker which uses
     * a filter closure for filtering
     *
     * @param {Node} item the root item to ascend from
     * @param {function} filter the filter closure
     */
    getFilteredParent : function(item, filter) {
        this._assertStdParams(item, filter, "getFilteredParent", ["item", "filter"]);

        //search parent tag parentName
        var parentItem = (item.parentNode) ? item.parentNode : null;

        while (parentItem && !filter(parentItem)) {
            parentItem = parentItem.parentNode;
        }
        return (parentItem) ? parentItem : null;
    },

    /**
     * cross ported from dojo
     * fetches an attribute from a node
     *
     * @param {String} node the node
     * @param {String} attr the attribute
     * @return the attributes value or null
     */
    getAttribute : function(/* HTMLElement */node, /* string */attr) {
        return node.getAttribute(attr);
    },

    /**
     * checks whether the given node has an attribute attached
     *
     * @param {String|Object} node the node to search for
     * @param {String} attr the attribute to search for
     * @true if the attribute was found
     */
    hasAttribute : function(/* HTMLElement */node, /* string */attr) {
        //	summary
        //	Determines whether or not the specified node carries a value for the attribute in question.
        return this.getAttribute(node, attr) ? true : false;	//	boolean
    },

    /**
     * concatenation routine which concats all childnodes of a node which
     * contains a set of CDATA blocks to one big string
     * @param {Node} node the node to concat its blocks for
     */
    concatCDATABlocks : function(/*Node*/ node) {
        var cDataBlock = [];
        // response may contain several blocks
        for (var i = 0; i < node.childNodes.length; i++) {
            cDataBlock.push(node.childNodes[i].data);
        }
        return cDataBlock.join('');
    },

    //all modern browsers evaluate the scripts
    //manually this is a w3d recommendation
    isManualScriptEval: function() {
        return true;
    },

    isMultipartCandidate: function(executes) {
        //implementation in the experimental part
        return false;
    },

    insertFirst: function(newNode) {
        var body = document.body;
        if (body.childNodes.length > 0) {
            body.insertBefore(newNode, body.firstChild);
        } else {
            body.appendChild(newNode);
        }
    },

    byId: function(id) {
        return this._Lang.byId(id);
    },

    getDummyPlaceHolder: function() {
        var created = false;
        if (!this._dummyPlaceHolder) {
            this._dummyPlaceHolder = this.createElement("div");
            created = true;
        }
        return this._dummyPlaceHolder;
    },

    /**
     * fetches the window id for the current request
     * note, this is a preparation method for jsf 2.2
     *
     * todo move this into the experimental part
     */
    getWindowId: function() {
        //implementation in the experimental part
        return null;
    }
});


