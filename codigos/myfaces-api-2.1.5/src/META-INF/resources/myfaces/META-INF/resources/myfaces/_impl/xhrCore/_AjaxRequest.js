_MF_CLS(_PFX_XHR+"_AjaxRequest",_MF_OBJECT,{_contentType:"application/x-www-form-urlencoded",_source:null,_encoding:null,_context:null,_sourceForm:null,_passThrough:null,_timeout:null,_queueSize:-1,_xhrQueue:null,_partialIdsArray:null,_xhr:null,_ajaxType:"POST",ENCODED_URL:"javax.faces.encodedURL",_CONTENT_TYPE:"Content-Type",_HEAD_FACES_REQ:"Faces-Request",_VAL_AJAX:"partial/ajax",_XHR_CONST:myfaces._impl.xhrCore.engine.XhrConst,constructor_:function(A){try{this._callSuper("constructor_",A);this._initDefaultFinalizableFields();delete this._resettableContent["_xhrQueue"];this.applyArgs(A);var D=this._context._mfInternal;var B=myfaces._impl.xhrCore;this._AJAXUTIL=B._AjaxUtils;}catch(C){this._stdErrorHandler(this._xhr,this._context,C);}},send:function(){var C=this._Lang;try{var F=C.hitch(this,function(J){return C.hitch(this,this[J]);});this._xhr=C.mixMaps(this._getTransport(),{onprogress:F("onprogress"),ontimeout:F("ontimeout"),onloadend:F("ondone"),onload:F("onsuccess"),onerror:F("onerror")},true);var I=this._xhr,A=this._sourceForm,E=(typeof A.elements[this.ENCODED_URL]=="undefined")?A.action:A.elements[this.ENCODED_URL].value,B=this.getFormData();for(var H in this._passThrough){B.append(H,this._passThrough[H]);}I.open(this._ajaxType,E+((this._ajaxType=="GET")?"?"+this._formDataToURI(B):""),true);I.timeout=this._timeout||0;var G=this._contentType+"; charset=utf-8";I.setRequestHeader(this._CONTENT_TYPE,G);I.setRequestHeader(this._HEAD_FACES_REQ,this._VAL_AJAX);this._sendEvent("BEGIN");if(B&&B.makeFinal){B=B.makeFinal();}I.send((this._ajaxType!="GET")?B:null);}catch(D){D=(D._mfInternal)?D:this._Lang.makeException("sendError","sendError",this._nameSpace,"send",D.message);this._stdErrorHandler(this._xhr,this._context,D);}},ondone:function(){this._requestDone();},onsuccess:function(A){var B=this._context;var D=this._xhr;try{this._sendEvent("COMPLETE");B._mfInternal=B._mfInternal||{};jsf.ajax.response((D.getXHRObject)?D.getXHRObject():D,B);this._sendEvent("SUCCESS");}catch(C){this._stdErrorHandler(this._xhr,this._context,C);}},onerror:function(B){var D=this._context;var H=this._xhr;var C=this._Lang;var A="";this._sendEvent("COMPLETE");try{var E=C.getMessage("UNKNOWN");A=C.getMessage("ERR_REQU_FAILED",null,(H.status||E),(H.statusText||E));}catch(G){A=C.getMessage("ERR_REQ_FAILED_UNKNOWN",null);}finally{var F=this.attr("impl");F.sendError(H,D,F.HTTPERROR,F.HTTPERROR,A);}},onprogress:function(A){},ontimeout:function(A){try{this._sendEvent("TIMEOUT_EVENT");}finally{this._requestDone();}},_formDataToURI:function(A){if(A&&A.makeFinal){A=A.makeFinal();}return A;},_getTransport:function(){var A=this._RT.getXHRObject();return new myfaces._impl.xhrCore.engine.Xhr1({xhrObject:A});},getFormData:function(){var C=this._AJAXUTIL,A=this._context.myfaces;var B=this._Lang.createFormDataDecorator(jsf.getViewState(this._sourceForm));return B;},_stdErrorHandler:function(C,B,A){var D=this._xhrQueue;try{this.attr("impl").stdErrorHandler(C,B,A);}finally{if(D){D.cleanup();}}},_sendEvent:function(B){var A=this.attr("impl");A.sendEvent(this._xhr,this._context,A[B]);},_requestDone:function(){var A=this._xhrQueue;if(A){A.processQueue();}delete this._context.source;this._finalize();},_finalize:function(){if(this._xhr.readyState==this._XHR_CONST.READY_STATE_DONE){this._callSuper("_finalize");}}});