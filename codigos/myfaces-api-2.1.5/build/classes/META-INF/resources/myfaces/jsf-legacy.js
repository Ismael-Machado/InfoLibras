if(!document.querySelectorAll){(function(){var E=myfaces._impl.core._Runtime;E.getXHRObject=function(){if(window.XMLHttpRequest){var I=new XMLHttpRequest();if(!E.XHR_LEVEL){var H=E.exists;E.XHR_LEVEL=(H(I,"sendAsBinary"))?1.5:1;E.XHR_LEVEL=(H(I,"upload")&&"undefined"!=typeof FormData)?2:E.XHR_LEVEL;}return I;}try{E.XHR_LEVEL=1;return new ActiveXObject("Msxml2.XMLHTTP");}catch(J){}return new ActiveXObject("Microsoft.XMLHTTP");};var G=navigator;var A=G.userAgent,D=G.appVersion,C=parseFloat(D);var E=myfaces._impl.core._Runtime;E.browser={};myfaces._impl.core._EvalHandlers.browser=E.browser;var F=E.browser;if(A.indexOf("Opera")>=0){E.isOpera=C;}if(A.indexOf("AdobeAIR")>=0){F.isAIR=1;}if(A.indexOf("BlackBerry")>=0){F.isBlackBerry=C;}F.isKhtml=(D.indexOf("Konqueror")>=0)?C:0;F.isWebKit=parseFloat(A.split("WebKit/")[1])||undefined;F.isChrome=parseFloat(A.split("Chrome/")[1])||undefined;var B=Math.max(D.indexOf("WebKit"),D.indexOf("Safari"),0);if(B&&!F.isChrome){F.isSafari=parseFloat(D.split("Version/")[1]);if(!F.isSafari||parseFloat(D.substr(B+7))<=419.3){F.isSafari=2;}}if(A.indexOf("Gecko")>=0&&!F.isKhtml&&!F.isWebKit){F.isMozilla=F.isMoz=C;}if(F.isMoz){F.isFF=parseFloat(A.split("Firefox/")[1]||A.split("Minefield/")[1]||A.split("Shiretoko/")[1])||undefined;}if(document.all&&!F.isOpera&&!F.isBlackBerry){F.isIE=parseFloat(D.split("MSIE ")[1])||undefined;F.isIEMobile=parseFloat(A.split("IEMobile")[1]);if(F.isIE>=8&&document.documentMode!=5){F.isIE=document.documentMode;}}})();}(function(){var D=window||document.body;var A="myfaces._impl.";var E={_PFX_UTIL:A+"_util.",_PFX_CORE:A+"core.",_PFX_XHR:A+"xhrCore.",_PFX_I18N:A+"i18n."};if("undefined"!=typeof D.myfaces){var C=myfaces._impl.core._Runtime;E._MF_CLS=C.extendClass;E._MF_SINGLTN=C.singletonExtendClass;}else{E._MF_CLS=false;E._MF_SINGLTN=false;D.myfaces={};}D.myfaces._implTemp={};for(var B in E){D.myfaces._implTemp[B]=D[B];D[B]=E[B];}})();if(!Array.prototype.indexOf&&_MF_SINGLTN){_MF_SINGLTN(_PFX_UTIL+"_LangQuirks",myfaces._impl._util._Lang,{constructor_:function(){this._callSuper("constructor_");var C=this._RT;var B=this.attr(C,"registeredSingletons");var A=this;if(myfaces._impl.core.Impl){C.iterateClasses(function(D){if(D._Lang){D._Lang=A;}});}myfaces._impl._util._Lang=A;},arrForEach:function(A,D){if(!A||!A.length){return ;}try{var B=Number(arguments[2])||0;var E=arguments[3];if(Array.prototype.forEach&&A.forEach){(B)?A.slice(B).forEach(D,E):A.forEach(D,E);}else{B=(B<0)?Math.ceil(B):Math.floor(B);if(typeof D!="function"){throw new TypeError();}for(var C=0;C<A.length;C++){if(E){D.call(E,A[C],C,A);}else{D(A[C],C,A);}}}}finally{D=null;}},arrFilter:function(A,F){if(!A||!A.length){return[];}try{var C=Number(arguments[2])||0;var G=arguments[3];if(Array.prototype.filter){return((C)?A.slice(C).filter(F,G):A.filter(F,G));}else{if(typeof F!="function"){throw new TypeError();}var B=[];C=(C<0)?Math.ceil(C):Math.floor(C);for(var D=C;D<A.length;D++){var E=null;if(G){E=A[D];if(F.call(G,E,D,A)){B.push(E);}}else{E=A[D];if(F(A[D],D,A)){B.push(E);}}}}}finally{F=null;}},arrIndexOf:function(B,C){if(!B||!B.length){return -1;}var D=Number(arguments[2])||0;if(Array.prototype.indexOf){return B.indexOf(C,D);}var A=B.length;D=(D<0)?Math.ceil(D):Math.floor(D);if(D<0){D+=A;}while(D<A&&B[D]!==C){D++;}return(D<A)?D:-1;},parseXML:function(A){try{var B=null;if(window.DOMParser){B=this._callSuper("parseXML",A);}else{B=new ActiveXObject("Microsoft.XMLDOM");B.async="false";B.loadXML(A);}return B;}catch(C){return null;}},serializeXML:function(A,B){if(A.xml){return A.xml;}return this._callSuper("serializeXML",A,B);},arrToString:function(A,B){if(!A){throw this._Lang.makeException(null,null,this._nameSpace,"arrToString",this.getMessage("ERR_MUST_BE_PROVIDED1",null,"arr {array}"));}if(this.isString(A)){return A;}B=B||"\n";return A.join(B);}});}if(!document.querySelectorAll&&_MF_SINGLTN){_MF_SINGLTN(_PFX_UTIL+"DomQuirks",myfaces._impl._util._Dom,{IE_QUIRKS_EVENTS:{"onabort":true,"onload":true,"onunload":true,"onchange":true,"onsubmit":true,"onreset":true,"onselect":true,"onblur":true,"onfocus":true,"onkeydown":true,"onkeypress":true,"onkeyup":true,"onclick":true,"ondblclick":true,"onmousedown":true,"onmousemove":true,"onmouseout":true,"onmouseover":true,"onmouseup":true},constructor_:function(){var A=myfaces._impl.core._Runtime.browser;if(A.isIE<=6&&A.isIEMobile){myfaces.config=myfaces.config||{};myfaces.config._autoeval=false;return ;}this._callSuper("constructor_");myfaces._impl._util._Dom=this;var B=this._Lang;var D=B.hitch(this,this.isManualScriptEval);if(window){this._RT.addOnLoad(window,D);}if(document.body){this._RT.addOnLoad(document.body,D);}var C=this;if(myfaces._impl.core.Impl){this._RT.iterateClasses(function(E){if(E._Dom){E._Dom=C;}});}},isDomCompliant:function(){if("undefined"==typeof this._isCompliantBrowser){this._isCompliantBrowser=!!((window.Range&&typeof Range.prototype.createContextualFragment=="function")||document.querySelectoryAll||document.createTreeWalker);}return this._isCompliantBrowser;},_outerHTMLNonCompliant:function(E,B){var A=this._RT.browser;var F=null;try{var F=this._buildEvalNodes(E,B);if(F.length==1){var C=F[0];this.replaceElement(E,F[0]);return C;}else{return this.replaceElements(E,F);}}finally{var D=this.getDummyPlaceHolder();if(A.isIE&&A.isIE<8){this._removeChildNodes(D,false);}D.innerHTML="";}},replaceElement:function(B,A){var C=this._RT.browser;if(!C.isIE||C.isIE>=8){B.parentNode.replaceChild(A,B);}else{this._callSuper("replaceElement",B,A);}},_buildNodesNonCompliant:function(B){var F=null;var A=this.getDummyPlaceHolder();A.innerHTML="<table><tbody><tr><td><div></div></td></tr></tbody></table>";var G=this._determineDepth(A);this._removeChildNodes(A,false);A.innerHTML="";var E=this.getDummyPlaceHolder();E.innerHTML="<table><tbody><tr><td>"+B+"</td></tr></tbody></table>";F=E;for(var D=0;D<G;D++){F=F.childNodes[0];}var C=(F.parentNode)?this.detach(F.parentNode.childNodes):null;if("undefined"==typeof F||null==F){E.innerHTML="<div>"+B+"</div>";F=this.detach(E.childNodes[0].childNodes);}this._removeChildNodes(E,false);return C;},_determineDepth:function(A){var C=0;var B=A;for(;B&&B.childNodes&&B.childNodes.length&&B.nodeType==1;C++){B=B.childNodes[0];}return C;},_removeNode:function(C,B){if(!C){return ;}var A=this._RT.browser;if(this.isDomCompliant()){if("undefined"!=typeof C.parentNode&&null!=C.parentNode){C.parentNode.removeChild(C);}return ;}this._removeChildNodes(C,B);try{if(!this._isTableElement(C)){C.innerHTML="";}if(A.isIE&&"undefined"!=typeof C.outerHTML){C.outerHTML="";}else{C=this.detach(C)[0];}if(!A.isIEMobile){delete C;}}catch(D){try{this.detach(C);if(!A.isIEMobile){delete C;}}catch(E){}}},_removeChildNodes:function(E,D){if(!E){return ;}var H=this.TABLE_ELEMS;var A=this._RT.browser;if(D){this.breakEvents(E);}for(var C=E.childNodes.length-1;C>=0;C-=1){var B=E.childNodes[C];if("undefined"!=typeof B.childNodes&&E.childNodes.length){this._removeChildNodes(B);}try{var G=(B.nodeName||B.tagName)?(B.nodeName||B.tagName).toLowerCase():null;if(!H[G]){if(!this._isTableElement(B)){B.innerHTML="";}if(A.isIE&&A.isIE<8&&"undefined"!=B.outerHTML){B.outerHTML="";}else{E.removeChild(B);}if(!A.isIEMobile){delete B;}}}catch(F){}}},getAttribute:function(D,A){D=this.byId(D);if((!D)||(!D.getAttribute)){return null;}var C=typeof A=="string"?A:new String(A);var B=D.getAttribute(C.toUpperCase());if((B)&&(typeof B=="string")&&(B!="")){return B;}if(B&&B.value){return B.value;}if((D.getAttributeNode)&&(D.getAttributeNode(C))){return(D.getAttributeNode(C)).value;}else{if(D.getAttribute(C)){return D.getAttribute(C);}else{if(D.getAttribute(C.toLowerCase())){return D.getAttribute(C.toLowerCase());}}}return null;},setAttribute:function(C,F,B){this._assertStdParams(C,F,"setAttribute");var H=this._RT.browser;if(!H.isIE||H.isIE>7&&this.isDomCompliant()){this._callSuper("setAttribute",C,F,B);return ;}F=F.toLowerCase();if(F==="class"){C.className=B;}else{if(F==="name"){C[F]=B;}else{if(F==="for"){if(!H.isIEMobile||H.isIEMobile>=7){C.setAttribute("htmlFor",B);}else{C.htmlFor=B;}}else{if(F==="style"){var I=B.split(";");var D=I.length;for(var E=0;E<D;E++){var G=I[E].split(":");if(G[0]!=""&&G[0]=="opacity"){var A=Math.max(100,Math.round(parseFloat(G[1])*10));if(!H.isIEMobile||H.isIEMobile>=7){C.style.setAttribute("arrFilter","alpha(opacity="+A+")");}}else{if(G[0]!=""){if(!H.isIEMobile||H.isIEMobile>=7){C.style.setAttribute(G[0],G[1]);}else{C.style[G[0]]=G[1];}}}}}else{if(this.IE_QUIRKS_EVENTS[F]){if(this._Lang.isString(F)){C.setAttribute(F,function(){return this._Lang.globalEval(B);});}}else{if(!H.isIEMobile||H.isIEMobile>=7){C.setAttribute(F,B);}else{C[F]=B;}}}}}}},getDummyPlaceHolder:function(){this._callSuper("getDummyPlaceHolder");if(this._RT.browser.isIEMobile&&created){this.insertFirst(this._dummyPlaceHolder);this.setAttribute(this._dummyPlaceHolder,"style","display: none");}return this._dummyPlaceHolder;},_recursionSearchAll:function(B,E,F){var C=[];if(E(B)){C.push(B);if(!F){return C;}}if(!B.childNodes){return C;}var G=C.length;var A=B.childNodes.length;for(var D=0;(F||G==0)&&D<A;D++){C=C.concat(this._recursionSearchAll(B.childNodes[D],E,F));}return C;},breakEvents:function(C){if(!C){return ;}var B=this.IE_QUIRKS_EVENTS;for(var A in B){if(A!="onunload"&&C[A]){C[A]=null;}}}});}(function(){var C=window||document;var B=function(F){var E=C.myfaces._implTemp;(!!E[F])?C[F]=E[F]:null;},D=["_MF_CLS","_MF_SINGLTN","_MF_OBJECT","_PFX_UTIL","_PFX_XHR","_PFX_CORE","_PFX_I18N"];for(var A=D.length-1;A>=0;A--){B(D[A]);}})();