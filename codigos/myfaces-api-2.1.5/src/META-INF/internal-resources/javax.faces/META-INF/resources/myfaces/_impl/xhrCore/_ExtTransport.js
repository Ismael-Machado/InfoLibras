_MF_SINGLTN(_PFX_XHR+"_ExtTransports",myfaces._impl.xhrCore._Transports,{constructor_:function(){this._callSuper("constructor_");myfaces._impl.xhrCore._Transports=this;this.updateSingletons("transport",this);},xhrPost:function(E,D,C,A){var B=this._getArguments(E,D,C,A);delete B.xhrQueue;(new (this._getAjaxReqClass(C))(B)).send();},xhrGet:function(E,D,C,A){var B=this._getArguments(E,D,C,A);B.ajaxType="GET";delete B.xhrQueue;(new (this._getAjaxReqClass(C))(B)).send();},xhrQueuedGet:function(E,D,C,A){var B=this._getArguments(E,D,C,A);B.ajaxType="GET";this._q.enqueue(new (this._getAjaxReqClass(C))(B));},multipartPost:function(E,D,C,A){var B=this._getArguments(E,D,C,A);delete B.xhrQueue;(new (this._getMultipartReqClass(C))(B)).send();},multipartQueuedPost:function(E,D,C,A){var B=this._getArguments(E,D,C,A);this._q.enqueue(new (this._getMultipartReqClass(C))(B));},multipartGet:function(E,D,C,A){var B=this._getArguments(E,D,C,A);B.ajaxType="GET";delete B.xhrQueue;(new (this._getMultipartReqClass(C))(B)).send();},multipartQueuedGet:function(E,D,C,A){var B=this._getArguments(E,D,C,A);B.ajaxType="GET";this._q.enqueue(new (this._getMultipartReqClass(C))(B));}});