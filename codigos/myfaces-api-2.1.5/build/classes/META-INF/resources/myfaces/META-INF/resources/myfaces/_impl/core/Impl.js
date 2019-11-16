_MF_SINGLTN(_PFX_CORE+"Impl",_MF_OBJECT,{_transport:myfaces._impl.core._Runtime.getGlobalConfig("transport",myfaces._impl.xhrCore._Transports),_evtListeners:new (myfaces._impl.core._Runtime.getGlobalConfig("eventListenerQueue",myfaces._impl._util._ListenerQueue))(),_errListeners:new (myfaces._impl.core._Runtime.getGlobalConfig("errorListenerQueue",myfaces._impl._util._ListenerQueue))(),IDENT_ALL:"@all",IDENT_NONE:"@none",IDENT_THIS:"@this",IDENT_FORM:"@form",P_PARTIAL_SOURCE:"javax.faces.source",P_VIEWSTATE:"javax.faces.ViewState",P_AJAX:"javax.faces.partial.ajax",P_EXECUTE:"javax.faces.partial.execute",P_RENDER:"javax.faces.partial.render",P_EVT:"javax.faces.partial.event",ERROR:"error",EVENT:"event",BEGIN:"begin",COMPLETE:"complete",SUCCESS:"success",HTTPERROR:"httpError",EMPTY_RESPONSE:"emptyResponse",MALFORMEDXML:"malformedXML",SERVER_ERROR:"serverError",CLIENT_ERROR:"clientError",TIMEOUT_EVENT:"timeout",_threshold:"ERROR",_BLOCKFILTER:{onerror:1,onevent:1,render:1,execute:1,myfaces:1},getViewState:function(C){if(C){C=this._Lang.byId(C);}if(!C||!C.nodeName||C.nodeName.toLowerCase()!="form"){throw new Error(this._Lang.getMessage("ERR_VIEWSTATE"));}var B=myfaces._impl.xhrCore._AjaxUtils;var A=this._Lang.createFormDataDecorator([]);B.encodeSubmittableFields(A,C,null);return A.makeFinal();},request:function(F,C,N){if(this._delayTimeout){clearTimeout(this._delayTimeout);delete this._delayTimeout;}var G=this._Lang,J=this._Dom,I="javax.faces.windowId";G.assertType(N.onerror,"function");G.assertType(N.onevent,"function");N=N||{};if(!N.windowId){var L=J.getWindowId();(L)?N[I]=L:null;}else{N[I]=N.windowId;delete N.windowId;}if("undefined"==typeof C){C=window.event||null;}F=J.byIdOrName(F);var H=J.nodeIdOrName(F);var K=G.mixMaps({},N,true,this._BLOCKFILTER);if(C){K[this.P_EVT]=C.type;}var E={source:F,onevent:N.onevent,onerror:N.onerror,myfaces:N.myfaces};var D=(N.myfaces&&N.myfaces.form)?G.byId(N.myfaces.form):this._getForm(F,C);K[this.P_PARTIAL_SOURCE]=H;K[this.P_AJAX]=true;if(N.execute){this._transformList(K,this.P_EXECUTE,N.execute+" @this",D,H);}else{K[this.P_EXECUTE]=H;}if(N.render){this._transformList(K,this.P_RENDER,N.render,D,H);}var M=this._getTransportType(E,K,D);E._mfInternal={};var A=E._mfInternal;A["_mfSourceFormId"]=D.id;A["_mfSourceControlId"]=H;A["_mfTransportType"]=M;K[D.id]=D.id;var B=this._RT.getLocalOrGlobalConfig(E,"delay",false);if(B){this._delayTimeout=setTimeout(G.hitch(this,function(){this._transport[M](F,D,E,K);}),B);}else{this._transport[M](F,D,E,K);}},_getForm:function(E,D){var C=this._Dom;var A=this._Lang;var B=C.fuzzyFormDetection(E);if(!B&&D){B=C.fuzzyFormDetection(A.getEventTarget(D));if(!B){throw this._Lang.makeException(null,null,this._nameSpace,"_getForm",A.getMessage("ERR_FORM"));}}else{if(!B){throw this._Lang.makeException(null,null,this._nameSpace,"_getForm",A.getMessage("ERR_FORM"));}}return B;},_getTransportType:function(B,G,A){var H=this._RT.getLocalOrGlobalConfig,E=this._Lang,F=this._Dom;var C=H(B,"transportAutoSelection",false);var D=(C&&F.getAttribute(A,"enctype")=="multipart/form-data")?F.isMultipartCandidate(G[this.P_EXECUTE]):false;var I=(!D)?H(B,"transportType","xhrQueuedPost"):H(B,"transportType","multipartQueuedPost");if(!this._transport[I]){throw new Error(E.getMessage("ERR_TRANSPORT",null,I));}return I;},_transformList:function(J,H,C,A,F){var D=this._Lang;var E=1,K=(C)?C.split(/\s+/):[],I=(K.length)?D.arrToMap(K,E):{},L=I[this.IDENT_NONE],M=I[this.IDENT_ALL],B=I[this.IDENT_THIS],G=I[this.IDENT_FORM];if(L){J[H]=this.IDENT_NONE;return J;}if(M){J[H]=this.IDENT_ALL;return J;}if(G){K[G-E]=A.id;}if(B&&!I[F]){K[B-E]=F;}J[H]=K.join(" ");return J;},addOnError:function(A){this._errListeners.enqueue(A);},addOnEvent:function(A){this._evtListeners.enqueue(A);},sendError:function sendError(F,B,A,M,K){var D=myfaces._impl._util._Lang;var I=D.getMessage("UNKNOWN");var L={};var G=function(){return(A&&A===myfaces._impl.core.Impl.MALFORMEDXML)?D.getMessage("ERR_MALFORMEDXML"):"";};L.type=this.ERROR;L.status=A||I;L.serverErrorName=M||I;L.serverErrorMessage=K||I;try{L.source=B.source||I;L.responseCode=F.status||I;L.responseText=F.responseText||I;L.responseXML=F.responseXML||I;}catch(H){}if(B["onerror"]){B.onerror(L);}this._errListeners.broadcastEvent(L);if(jsf.getProjectStage()==="Development"&&this._errListeners.length()==0&&!B["onerror"]){var J=myfaces._impl.core._Runtime.getGlobalConfig("defaultErrorOutput",alert),C=[],E=D.hitch(C,C.push);E((A)?A:"");if(A){E(": ");}E((M)?M:"");if(M){E(" ");}E((K)?K:"");E(G());E("\n\n");E(D.getMessage("MSG_DEV_MODE"));J(C.join(""));}},sendEvent:function sendEvent(D,B,A){var C=myfaces._impl._util._Lang;var I={};var H=C.getMessage("UNKNOWN");I.type=this.EVENT;I.status=A;I.source=B.source;if(A!==this.BEGIN){try{var E=function(K,J){try{return K[J];}catch(L){return H;}};I.responseCode=E(D,"status");I.responseText=E(D,"responseText");I.responseXML=E(D,"responseXML");}catch(F){var G=myfaces._impl.core._Runtime.getGlobalConfig("jsfAjaxImpl",myfaces._impl.core.Impl);G.sendError(D,B,this.CLIENT_ERROR,"ErrorRetrievingResponse",C.getMessage("ERR_CONSTRUCT",F.toString()));throw F;}}if(B.onevent){B.onevent.call(null,I);}this._evtListeners.broadcastEvent(I);},response:function(B,A){this._RT.getLocalOrGlobalConfig(A,"responseHandler",myfaces._impl.xhrCore._AjaxResponse).processResponse(B,A);},getProjectStage:function(){if(!this._projectStage){var D="projectStage",E="Production",A=document.getElementsByTagName("script"),F=myfaces._impl.core._Runtime.getGlobalConfig,B=null,H=false,I={STG_PROD:1,"Development":1,"SystemTest":1,"UnitTest":1};for(var C=0;C<A.length&&!H;C++){if(A[C].src.search(/\/javax\.faces\.resource\/jsf\.js.*ln=javax\.faces/)!=-1){var G=A[C].src.match(/stage=([^&;]*)/);H=true;if(G){B=(I[G[1]])?G[1]:null;}else{B=F(D,E);}}}this._projectStage=B||F(D,E);}return this._projectStage;},chain:function(F,E){var A=arguments.length;var D=this._Lang;var G=function(H){throw Error(D.getMessage(H));};if(A<2){G("ERR_EV_OR_UNKNOWN");}else{if(A<3){if("function"==typeof E||this._Lang.isString(E)){G("ERR_EVT_PASS");}return true;}}if("undefined"==typeof F){G("ERR_SOURCE_DEF_NULL");}else{if("function"==typeof F){G("ERR_SOURCE_FUNC");}}if(this._Lang.isString(F)){G("ERR_SOURCE_NOSTR");}if("function"==typeof E||this._Lang.isString(E)){G("ERR_EV_OR_UNKNOWN");}for(var C=2;C<A;C++){var B;if("function"==typeof arguments[C]){B=arguments[C].call(F,E);}else{B=new Function("event",arguments[C]).call(F,E);}if(B===false){return false;}}return true;},stdErrorHandler:function(D,B,A){if(this._threshold=="ERROR"){var E=A._mfInternal||{};var C=[];if(jsf.getProjectStage()==="Development"){(E.caller)?C.push("Caller: "+E.caller):null;(E.callFunc)?C.push("Caller Function: "+E.callFunc):null;}C.push(A.message);this.sendError(D,B,E.title||this.CLIENT_ERROR,E.name||A.name,C.join("\n"));}}});