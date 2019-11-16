_MF_SINGLTN&&_MF_SINGLTN(_PFX_UTIL+"_ExtDom",myfaces._impl._util._Dom,{_Lang:myfaces._impl._util._Lang,_RT:myfaces._impl.core._Runtime,constructor_:function(){this._callSuper("constructor_");var A=this;if(myfaces._impl.core.Impl){this._RT.iterateClasses(function(B){if(B._Dom){B._Dom=A;}});}myfaces._impl._util._Dom=A;},findByStyleClass:function(C,B,E){var D=this._Lang.hitch(this,function(J){var I=this.getClasses(J);var G=I.length;if(G==0){return false;}else{for(var H=0;H<G;H++){if(I[H]===B){return true;}}}return false;});try{E=!!E;if(this._Lang.exists(C,"querySelectorAll")&&E){try{var A=C.querySelectorAll("."+B.replace(/\./g,"\\."));if(C.nodeType==1&&D(C)){A=(A==null)?[]:A;A=this._Lang.objToArray(A);A.push(C);}return A;}catch(F){}}else{return this._callSuper("findAll",C,D,E);}}finally{D=null;}},getElementFromForm:function(G,E,D,A){if(!G){throw this._Lang.makeException(null,null,this._nameSpace,"getElementFromForm","_Dom.getElementFromForm an item id or name must be given");}if(!E){return this.byId(G);}var B=!!D;var F=!!A;if(B&&this._Lang.exists(E,"elements."+G)){return E.elements[G];}var C=this.findById(E,G);if(C){return C;}if(!F){return this.byId(G);}return null;},findFormElement:function(A,B){this._assertStdParams(A,B,"findFormElement");if(!A.elements){return null;}return A.elements[B]||this.findById(A,B);},findById:function(A,D){if(A.getElementById){return A.getElementById(D);}if(A.nodeType==1&&A.querySelector){try{var E=D;if(A.id&&A.id===D){return A;}if(this._Lang.isString(E)){E=E.replace(/\./g,"\\.").replace(/:/g,"\\:");}return A.querySelector("#"+E);}catch(C){}}var B=function(F){return F&&F.id&&F.id===D;};try{return this.findFirst(A,B);}finally{B=null;}},findFirst:function(A,B){this._Lang.assertType(B,"function");if(document.createTreeWalker&&NodeFilter){return this._iteratorFindFirst(A,B);}else{return this._recursionFindFirst(A,B);}},_recursionFindFirst:function(B,D){if(D(B)){return B;}if(!B.childNodes){return null;}var F;var C;var A=B.childNodes.length;for(C=0;C<A;C++){F=B.childNodes[C];var E=this._recursionFindFirst(F,D);if(E!=null){return E;}}return null;},_iteratorFindFirst:function(A,C){if(C(A)){return A;}var B=function(E){return(C(E))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP;};var D=document.createTreeWalker(A,NodeFilter.SHOW_ELEMENT,B,false);if(D.nextNode()){return D.currentNode;}return null;},getFilteredChild:function(B,A){this._assertStdParams(B,A,"getFilteredChild");var D=B.childNodes;if(!D){return null;}for(var E=0,C=D.length;E<C;E++){if(A(D[E])){return D[E];}}return null;},getChild:function(D,A,E){var B=this._Lang;function C(F){return F.tagName&&B.equalsIgnoreCase(F.tagName,A)&&(!E||(E&&E==F.getAttribute("name")));}return this.getFilteredChild(D,C);},getClass:function(B){B=this.byId(B);if(!B){return"";}var A="";if(B.className){A=B.className;}else{if(this.hasAttribute(B,"class")){A=this.getAttribute(B,"class");}}return A.replace(/^\s+|\s+$/g,"");},getClasses:function(A){var B=this.getClass(A);return(B=="")?[]:B.split(/\s+/g);}});