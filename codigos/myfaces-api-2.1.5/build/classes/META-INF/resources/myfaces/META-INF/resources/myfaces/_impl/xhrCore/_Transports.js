_MF_SINGLTN(_PFX_XHR+"_Transports",_MF_OBJECT,{_PAR_ERRORLEVEL:"errorlevel",_PAR_QUEUESIZE:"queuesize",_PAR_PPS:"pps",_PAR_TIMEOUT:"timeout",_PAR_DELAY:"delay",_q:new myfaces._impl.xhrCore._AjaxRequestQueue(),xhrQueuedPost:function(D,C,B,A){this._q.enqueue(new (this._getAjaxReqClass(B))(this._getArguments(D,C,B,A)));},_getArguments:function(A,C,B,I){var G=myfaces._impl.core._Runtime,E=myfaces._impl._util._Lang,F=E.hitch(this,this._applyConfig),D=G.getLocalOrGlobalConfig,H={"source":A,"sourceForm":C,"context":B,"passThrough":I,"xhrQueue":this._q};F(H,B,"alarmThreshold",this._PAR_ERRORLEVEL);F(H,B,"queueSize",this._PAR_QUEUESIZE);F(H,B,"timeout",this._PAR_TIMEOUT);if(D(B,this._PAR_PPS,false)&&E.exists(I,myfaces._impl.core.Impl.P_EXECUTE)&&I[myfaces._impl.core.Impl.P_EXECUTE].length>0){H["partialIdsArray"]=I[myfaces._impl.core.Impl.P_EXECUTE].split(" ");}return H;},_applyConfig:function(A,E,D,C){var F=myfaces._impl.core._Runtime;var B=F.getLocalOrGlobalConfig;if(B(E,C,null)!=null){A[D]=B(E,C,null);}},_getMultipartReqClass:function(A){return myfaces._impl.xhrCore._IFrameRequest;},_getAjaxReqClass:function(A){return myfaces._impl.xhrCore._AjaxRequest;}});