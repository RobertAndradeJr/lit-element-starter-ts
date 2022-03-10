/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new Map;class e{constructor(t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let i=s.get(this.cssText);return t&&void 0===i&&(s.set(this.cssText,i=new CSSStyleSheet),i.replaceSync(this.cssText)),i}toString(){return this.cssText}}const o=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let s="";for(const i of t.cssRules)s+=i.cssText;return(t=>new e("string"==typeof t?t:t+"",i))(s)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var n;const r=window.trustedTypes,h=r?r.emptyScript:"",l=window.reactiveElementPolyfillSupport,c={toAttribute(t,i){switch(i){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},d=(t,i)=>i!==t&&(i==i||t==t),a={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:d};class u extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Eh(s,i);void 0!==e&&(this._$Eu.set(e,s),t.push(e))})),t}static createProperty(t,i=a){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e)}}static getPropertyDescriptor(t,i,s){return{get(){return this[i]},set(e){const o=this[t];this[i]=e,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||a}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)i.unshift(o(t))}else void 0!==t&&i.push(o(t));return i}static _$Eh(t,i){const s=i.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,s;(null!==(i=this._$Eg)&&void 0!==i?i:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var i;null===(i=this._$Eg)||void 0===i||i.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i])}))}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{t?i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((t=>{const s=document.createElement("style"),e=window.litNonce;void 0!==e&&s.setAttribute("nonce",e),s.textContent=t.cssText,i.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}))}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$ES(t,i,s=a){var e,o;const n=this.constructor._$Eh(t,s);if(void 0!==n&&!0===s.reflect){const r=(null!==(o=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==o?o:c.toAttribute)(i,s.type);this._$Ei=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Ei=null}}_$AK(t,i){var s,e,o;const n=this.constructor,r=n._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=n.getPropertyOptions(r),h=t.converter,l=null!==(o=null!==(e=null===(s=h)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof h?h:null)&&void 0!==o?o:c.fromAttribute;this._$Ei=r,this[r]=l(i,t.type),this._$Ei=null}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||d)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$EU()}catch(t){throw i=!1,this._$EU(),t}i&&this._$AE(s)}willUpdate(t){}_$AE(t){var i;null===(i=this._$Eg)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$E_&&(this._$E_.forEach(((t,i)=>this._$ES(i,this[i],t))),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var v;u.finalized=!0,u.elementProperties=new Map,u.elementStyles=[],u.shadowRootOptions={mode:"open"},null==l||l({ReactiveElement:u}),(null!==(n=globalThis.reactiveElementVersions)&&void 0!==n?n:globalThis.reactiveElementVersions=[]).push("1.2.1");const p=globalThis.trustedTypes,f=p?p.createPolicy("lit-html",{createHTML:t=>t}):void 0,b=`lit$${(Math.random()+"").slice(9)}$`,y="?"+b,w=`<${y}>`,g=document,x=(t="")=>g.createComment(t),m=t=>null===t||"object"!=typeof t&&"function"!=typeof t,$=Array.isArray,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,A=/-->/g,C=/>/g,k=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_=/'/g,T=/"/g,E=/^(?:script|style|textarea)$/i,M=(t=>(i,...s)=>({_$litType$:t,strings:i,values:s}))(1),R=Symbol.for("lit-noChange"),O=Symbol.for("lit-nothing"),U=new WeakMap,N=g.createTreeWalker(g,129,null,!1),I=(t,i)=>{const s=t.length-1,e=[];let o,n=2===i?"<svg>":"",r=S;for(let i=0;i<s;i++){const s=t[i];let h,l,c=-1,d=0;for(;d<s.length&&(r.lastIndex=d,l=r.exec(s),null!==l);)d=r.lastIndex,r===S?"!--"===l[1]?r=A:void 0!==l[1]?r=C:void 0!==l[2]?(E.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=k):void 0!==l[3]&&(r=k):r===k?">"===l[0]?(r=null!=o?o:S,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,h=l[1],r=void 0===l[3]?k:'"'===l[3]?T:_):r===T||r===_?r=k:r===A||r===C?r=S:(r=k,o=void 0);const a=r===k&&t[i+1].startsWith("/>")?" ":"";n+=r===S?s+w:c>=0?(e.push(h),s.slice(0,c)+"$lit$"+s.slice(c)+b+a):s+b+(-2===c?(e.push(void 0),i):a)}const h=n+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==f?f.createHTML(h):h,e]};class L{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let o=0,n=0;const r=t.length-1,h=this.parts,[l,c]=I(t,i);if(this.el=L.createElement(l,s),N.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(e=N.nextNode())&&h.length<r;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(b)){const s=c[n++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(b),i=/([.?@])?(.*)/.exec(s);h.push({type:1,index:o,name:i[2],strings:t,ctor:"."===i[1]?j:"?"===i[1]?H:"@"===i[1]?q:P})}else h.push({type:6,index:o})}for(const i of t)e.removeAttribute(i)}if(E.test(e.tagName)){const t=e.textContent.split(b),i=t.length-1;if(i>0){e.textContent=p?p.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],x()),N.nextNode(),h.push({type:2,index:++o});e.append(t[i],x())}}}else if(8===e.nodeType)if(e.data===y)h.push({type:2,index:o});else{let t=-1;for(;-1!==(t=e.data.indexOf(b,t+1));)h.push({type:7,index:o}),t+=b.length-1}o++}}static createElement(t,i){const s=g.createElement("template");return s.innerHTML=t,s}}function z(t,i,s=t,e){var o,n,r,h;if(i===R)return i;let l=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const c=m(i)?void 0:i._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,s,e)),void 0!==e?(null!==(r=(h=s)._$Cl)&&void 0!==r?r:h._$Cl=[])[e]=l:s._$Cu=l),void 0!==l&&(i=z(t,l._$AS(t,i.values),l,e)),i}class B{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:g).importNode(s,!0);N.currentNode=o;let n=N.nextNode(),r=0,h=0,l=e[0];for(;void 0!==l;){if(r===l.index){let i;2===l.type?i=new D(n,n.nextSibling,this,t):1===l.type?i=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(i=new F(n,this,t)),this.v.push(i),l=e[++h]}r!==(null==l?void 0:l.index)&&(n=N.nextNode(),r++)}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class D{constructor(t,i,s,e){var o;this.type=2,this._$AH=O,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=z(this,t,i),m(t)?t===O||null==t||""===t?(this._$AH!==O&&this._$AR(),this._$AH=O):t!==this._$AH&&t!==R&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var i;return $(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])})(t)?this.A(t):this.$(t)}M(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==O&&m(this._$AH)?this._$AA.nextSibling.data=t:this.S(g.createTextNode(t)),this._$AH=t}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=L.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else{const t=new B(o,this),i=t.p(this.options);t.m(s),this.S(i),this._$AH=t}}_$AC(t){let i=U.get(t.strings);return void 0===i&&U.set(t.strings,i=new L(t)),i}A(t){$(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new D(this.M(x()),this.M(x()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t))}}class P{constructor(t,i,s,e,o){this.type=1,this._$AH=O,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=O}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=z(this,t,i,0),n=!m(t)||t!==this._$AH&&t!==R,n&&(this._$AH=t);else{const e=t;let r,h;for(t=o[0],r=0;r<o.length-1;r++)h=z(this,e[s+r],i,r),h===R&&(h=this._$AH[r]),n||(n=!m(h)||h!==this._$AH[r]),h===O?t=O:t!==O&&(t+=(null!=h?h:"")+o[r+1]),this._$AH[r]=h}n&&!e&&this.k(t)}k(t){t===O?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class j extends P{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===O?void 0:t}}const W=p?p.emptyScript:"";class H extends P{constructor(){super(...arguments),this.type=4}k(t){t&&t!==O?this.element.setAttribute(this.name,W):this.element.removeAttribute(this.name)}}class q extends P{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5}_$AI(t,i=this){var s;if((t=null!==(s=z(this,t,i,0))&&void 0!==s?s:O)===R)return;const e=this._$AH,o=t===O&&e!==O||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==O&&(e===O||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class F{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}}const G=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var J,V;null==G||G(L,D),(null!==(v=globalThis.litHtmlVersions)&&void 0!==v?v:globalThis.litHtmlVersions=[]).push("2.1.2");class X extends u{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,i;const s=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=s.firstChild),s}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new D(i.insertBefore(x(),t),t,void 0,null!=s?s:{})}return r._$AI(t),r})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return R}}X.finalized=!0,X._$litElement$=!0,null===(J=globalThis.litElementHydrateSupport)||void 0===J||J.call(globalThis,{LitElement:X});const Y=globalThis.litElementPolyfillSupport;null==Y||Y({LitElement:X}),(null!==(V=globalThis.litElementVersions)&&void 0!==V?V:globalThis.litElementVersions=[]).push("3.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(s){s.createProperty(i.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(s){s.createProperty(i.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Q(t){return(i,s)=>void 0!==s?((t,i,s)=>{i.constructor.createProperty(s,t)})(t,i,s):K(t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function Z(t){return Q({...t,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var tt;null===(tt=window.HTMLSlotElement)||void 0===tt||tt.prototype.assignedElements;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const it=2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st=(t,i)=>{var s,e;const o=t._$AN;if(void 0===o)return!1;for(const t of o)null===(e=(s=t)._$AO)||void 0===e||e.call(s,i,!1),st(t,i);return!0},et=t=>{let i,s;do{if(void 0===(i=t._$AM))break;s=i._$AN,s.delete(t),t=i}while(0===(null==s?void 0:s.size))},ot=t=>{for(let i;i=t._$AM;t=i){let s=i._$AN;if(void 0===s)i._$AN=s=new Set;else if(s.has(t))break;s.add(t),ht(i)}};function nt(t){void 0!==this._$AN?(et(this),this._$AM=t,ot(this)):this._$AM=t}function rt(t,i=!1,s=0){const e=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(i)if(Array.isArray(e))for(let t=s;t<e.length;t++)st(e[t],!1),et(e[t]);else null!=e&&(st(e,!1),et(e));else st(this,t)}const ht=t=>{var i,s,e,o;t.type==it&&(null!==(i=(e=t)._$AP)&&void 0!==i||(e._$AP=rt),null!==(s=(o=t)._$AQ)&&void 0!==s||(o._$AQ=nt))};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt=()=>new ct;class ct{}const dt=new WeakMap,at=(t=>(...i)=>({_$litDirective$:t,values:i}))(class extends class extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,s){this._$Ct=t,this._$AM=i,this._$Ci=s}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,s){super._$AT(t,i,s),ot(this),this.isConnected=t._$AU}_$AO(t,i=!0){var s,e;t!==this.isConnected&&(this.isConnected=t,t?null===(s=this.reconnected)||void 0===s||s.call(this):null===(e=this.disconnected)||void 0===e||e.call(this)),i&&(st(this,t),et(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}{render(t){return O}update(t,[i]){var s;const e=i!==this.U;return e&&void 0!==this.U&&this.ot(void 0),(e||this.rt!==this.lt)&&(this.U=i,this.ht=null===(s=t.options)||void 0===s?void 0:s.host,this.ot(this.lt=t.element)),O}ot(t){"function"==typeof this.U?(void 0!==dt.get(this.U)&&this.U.call(this.ht,void 0),dt.set(this.U,t),void 0!==t&&this.U.call(this.ht,t)):this.U.value=t}get rt(){var t;return"function"==typeof this.U?dt.get(this.U):null===(t=this.U)||void 0===t?void 0:t.value}disconnected(){this.rt===this.lt&&this.ot(void 0)}reconnected(){this.ot(this.lt)}}),ut={D:"#009e3d",i:"#cd3741",S:"#00a0d1",C:"#f3cc23",base:"#d9d8d6",border:"#949494",textColor:"#ffffff"},vt=["D","i","S","C"],pt="Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif, Gadget, sans-serif";class ft{constructor({radius:t=50,ctx:i=new CanvasRenderingContext2D,borderWidth:s=4,colors:e=ut}){this.colors=e,this.height=2*t,this.width=2*t,this.borderWidth=s,this.ctx=i,this.radius=this.width/2,this.cx=t,this.cy=t,this.labelFontSize=this.width/6.5,this.priorityFontSize=this.labelFontSize/4,this.mapRadius=this.radius-1.75*this.textHeight-5*this.borderWidth,this.borderRadius=this.radius-1.75*this.textHeight-this.borderWidth/2,this.ctx.lineWidth=s}get textHeight(){const{priorityFontSize:t}=this,i=document.createElement("div");i.innerHTML="test",i.style.position="absolute",i.style.top="-10000px",i.style.left="-10000px",i.style.fontFamily=pt,i.style.fontSize=`${t}px`,document.body.appendChild(i);const s=i.offsetHeight;return document.body.removeChild(i),s}baseGraph(){const{cx:t,cy:i,mapRadius:s,ctx:e}=this,{base:o}=ut;e.save(),e.moveTo(t,i),e.beginPath(),e.arc(t,i,s,0,2*Math.PI),e.fillStyle=o,e.strokeStyle=o,e.closePath(),e.fill(),e.stroke(),e.restore()}drawDashedBorder(t=ut.border){const{cx:i,cy:s,borderRadius:e,ctx:o,borderWidth:n}=this;this.ctx.lineWidth=n,o.save(),o.setLineDash([2.25*n,2.25*n]),o.moveTo(i,s),o.beginPath(),o.arc(i,s,e,0,2*Math.PI),o.strokeStyle=t,o.closePath(),o.stroke(),o.restore()}drawInternalBorder(t){const{height:i,width:s,ctx:e,borderRadius:o,mapRadius:n}=this,r=(o-n)/2;e.lineWidth=1.5*this.borderWidth,e.strokeStyle="white",e.save(),e.beginPath(),"vertical"===t?(e.moveTo(s/2,r),e.lineTo(s/2,i-r)):"horizontal"===t&&(e.moveTo(r,i/2),e.lineTo(s-r,i/2)),e.stroke(),e.restore()}drawLabels(){const{height:t,width:i,ctx:s,labelFontSize:e}=this,{textColor:o}=ut;s.save(),s.font=`${e}px ${pt}`,s.fillStyle=o,s.textBaseline="middle",s.textAlign="center",s.imageSmoothingEnabled=!1,s.fillText("D",1*i/3,8.5*t/24),s.fillText("i",2*i/3,8.5*t/24),s.fillText("S",2*i/3,16*t/24),s.fillText("C",1*i/3,16*t/24),s.restore()}drawQuadrants(t=vt,i){const{colors:s,ctx:e}=this,o=t=>{const{p1:i,cp1:s,cp2:o,p2:r}=t;e.save(),e.beginPath(),e.moveTo(i.x,i.y),o?(e.bezierCurveTo(s.x,s.y,o.x,o.y,r.x,r.y),e.moveTo(r.x,r.y),e.bezierCurveTo(o.x,o.y+this.height,s.x,s.y+this.height,i.x,i.y)):(e.quadraticCurveTo(s.x,s.y,r.x,r.y),e.moveTo(r.x,r.y),e.quadraticCurveTo(s.x,s.y+this.height,i.x,i.y)),e.closePath(),e.clip(),n(),e.restore()},n=()=>{for(let i=0;i<Object.values(s).length;i++)if(t.includes(vt[i])){const e=vt[i],o=s[e],n=(i+2)*Math.PI/2,r=n+Math.PI/2,h=2*(vt.length-t.length);this.drawQuadrant(h,n,r,o,o)}};i?o(i):n()}drawQuadrant(t=0,i=0,s=Math.PI/2,e=ut.base,o=ut.base){const{cx:n,cy:r,mapRadius:h,ctx:l,borderWidth:c}=this,d=(i=>{if(!t)return{x:0,y:0};i/=Math.PI;return i>2?{x:-c,y:c}:i>1.5?{x:c,y:c}:i>1?{x:c,y:-c}:{x:-c,y:-c}})(i);l.beginPath(),l.moveTo(n,r),l.arc(n+d.x,r+d.y,h+t,i,s),l.closePath(),l.fillStyle=e,l.strokeStyle=o,l.fill(),l.stroke()}drawPriorityLabel(t,i,s,e,o,n){const{ctx:r,priorityFontSize:h,textHeight:l,radius:c,width:d}=this,a="right"==s?1:-1;let u=d;if(s=s.toLowerCase(),i*=Math.PI/180,r){if(r.save(),r.fillStyle="#323212",r.font=`${h}px ${pt}`,(["left","center"].indexOf(s)>-1&&o||"right"==s&&!o)&&(t=t.split("").reverse().join("")),r.translate(c,c),e||(u+=2*l),i+=Math.PI*(o?1:-1),r.textBaseline="middle",r.textAlign="center","center"==s)for(let s=0;s<t.length;s++){i+=(r.measureText(t[s]).width+(s==t.length-1?0:n))/(u/2-l)/2*-a}r.rotate(i);for(let i=0;i<t.length;i++){const s=r.measureText(t[i]).width;r.rotate(s/2/(u/2-l)*a),r.fillText(t[i],0,(o?1:-1)*(0-u/2+l/2)),r.rotate((s/2+n)/(u/2-l)*a)}r.restore()}}}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var bt=function(t,i,s,e){for(var o,n=arguments.length,r=n<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,h=t.length-1;h>=0;h--)(o=t[h])&&(r=(n<3?o(r):n>3?o(i,s,r):o(i,s))||r);return n>3&&r&&Object.defineProperty(i,s,r),r};let yt=class extends X{constructor(){super(...arguments),this._canvas=lt(),this._code=lt(),this.save=!1,this.edit=!1,this.width=100,this.quadratic=!1,this.quadrants=["D","i","S","C"]}render(){const t=this.edit?M`
    <pre ${at(this._code)}>code</pre>
    <div class="input">
      <span>cubic</span>
      <label class="switch">
        <input @click="${this._toggle}" type="checkbox" />
        <span class="slider round"></span>
      </label>
      <span>quadratic</span>
      <br>
      <button @click="${this.save?this._deleteArc:this._saveArc}">${this.save?"Delete":"Save"} Arc</button>
    </div>
    `:void 0;return M`
      <canvas ${at(this._canvas)}>Fallback Content</canvas>
      ${t}
      <slot></slot>
    `}_toggle(){this.quadratic=!this.quadratic,this.save=!1,this.stylePath=void 0,this._canvasApp()}_saveArc(){this.save=!0,this._canvasApp()}_deleteArc(){this.save=!1,this._canvasApp()}_canvasApp(){const{width:t,height:i,save:s}=this,e=this._canvas.value;e.width=t,e.height=i||t;const o=e.getContext("2d"),n={p1:{x:100,y:350},p2:{x:300,y:350},cp1:{x:200,y:100}};this.quadratic||(n.cp1={x:100,y:100},n.cp2={x:300,y:100});const r={curve:{width:6,color:"#000"},cpline:{width:2.5,color:"#BADA55",fill:"orange"},point:{radius:10,width:2,color:"#900",fill:"rgba(200, 200, 200, .5)",arc1:0,arc2:2*Math.PI}};let h=null,l={x:0,y:0};const c=()=>{const{point:{width:t,color:i,fill:s,radius:h,arc1:l,arc2:c}}=r,{p1:a,p2:u,cp1:v,cp2:p}=n,{cpline:f,curve:b}=r;o.clearRect(0,0,e.width,e.height),this._draw(),o.lineWidth=f.width,o.strokeStyle=f.color,o.fillStyle=f.fill,o.beginPath(),o.moveTo(a.x,a.y),o.lineTo(v.x,v.y),p?(o.moveTo(u.x,u.y),o.lineTo(p.x,p.y)):o.lineTo(u.x,u.y),o.stroke(),o.lineWidth=b.width,o.strokeStyle=b.color,o.beginPath(),o.moveTo(a.x,a.y),p?o.bezierCurveTo(v.x,v.y,p.x,p.y,u.x,u.y):o.quadraticCurveTo(v.x,v.y,u.x,u.y),o.stroke();for(const e in n){const{x:r,y:d}=n[e];o.lineWidth=t,o.strokeStyle=i,o.fillStyle=s,o.beginPath(),o.arc(r,d,h,l,c,!0),o.fill(),o.stroke()}d()},d=()=>{const{firstChild:t}=this._code.value,{curve:{width:i,color:s}}=r,{p1:e,cp1:o,cp2:h,p2:l}=n;t&&(t.nodeValue=`\n        canvas = document.getElementById("canvas")\n        ctx = canvas.getContext("2d")\n        ctx.lineWidth = ${i}\n        ctx.strokeStyle = "${s}"\n        ctx.beginPath()\n        ctx.moveTo(${e.x}, ${e.y})\n        ${h?`ctx.bezierCurveTo(${o.x}, ${o.y}, ${h.x}, ${h.y}, ${l.x}, ${l.y})`:`ctx.quadraticCurveTo(${o.x}, ${o.y}, ${l.x}, ${l.y})`}\n        ctx.stroke()\n        `)},a=t=>{const{pageX:i,pageY:s}=t||window.event,{offsetLeft:o,offsetTop:n}=e;return{x:i-o,y:s-n}},u=t=>{const i=a(t),{point:{radius:s}}=r;let o=0,c=0;for(const t in n){const{x:r,y:d}=n[t],{x:a,y:u}=i;if(o=r-a,c=d-u,o*o+c*c<s*s)return h=t,l=i,void(e.style.cursor="move")}};function v(t){const i=a(t);if(h){const t=n[h];(null==t?void 0:t.x)&&(t.x+=i.x-l.x),(null==t?void 0:t.y)&&(t.y+=i.y-l.y),l=i,c()}}const p=()=>{h=null,e.style.cursor="default",c()};s?this.stylePath=n:(this.stylePath=void 0,this.save=!1),c(),o.lineCap="round",o.lineJoin="round",e.addEventListener("mousedown",u,!1),e.addEventListener("mousemove",v,!1),e.addEventListener("mouseup",p,!1),e.addEventListener("mouseout",p,!1),c()}_draw(){const{border:t,quadrants:i,borderWidth:s,width:e,height:o,stylePath:n}=this,r=this._canvas.value;r.width=e,r.height=o||e;const h=r.getContext("2d"),l=new ft({ctx:h,radius:e/2,borderWidth:s});l.baseGraph(),t&&l.drawDashedBorder(t),l.drawQuadrants(i,n),l.drawInternalBorder("horizontal"),l.drawInternalBorder("vertical"),l.drawLabels();const c=!0;l.drawPriorityLabel("COLLABORATION",270,"center",c,!0,0),l.drawPriorityLabel("ACTION",180,"center",c,!0,0),l.drawPriorityLabel("ENCOURAGEMENT",225,"center",c,!0,0),l.drawPriorityLabel("CHALLENGE",90,"center",c,!0,0),l.drawPriorityLabel("DRIVE",135,"center",c,!0,0),l.drawPriorityLabel("SUPPORT",135,"center",c,!1,0),l.drawPriorityLabel("OBJECTIVITY",225,"center",c,!1,0),l.drawPriorityLabel("RELIABILITY",180,"center",c,!1,0)}firstUpdated(t){const{edit:i}=this;i?this._canvasApp():this._draw()}};yt.styles=((t,...s)=>{const o=1===t.length?t[0]:s.reduce(((i,s,e)=>i+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[e+1]),t[0]);return new e(o,i)})`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1em;
    }

    #canvas {
      border-radius: 50%;
    }
    /* The switch - the box around the slider */
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    .slider:before {
      position: absolute;
      content: '';
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }

    input:checked + .slider {
      background-color: #2196f3;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
  `,bt([Z()],yt.prototype,"stylePath",void 0),bt([Z()],yt.prototype,"save",void 0),bt([Q({type:Boolean})],yt.prototype,"edit",void 0),bt([Q({type:Number})],yt.prototype,"borderWidth",void 0),bt([Q({type:Number})],yt.prototype,"width",void 0),bt([Q({type:Number})],yt.prototype,"height",void 0),bt([Q({type:Boolean})],yt.prototype,"quadratic",void 0),bt([Q({type:String,converter:t=>t?String(t):ut.border})],yt.prototype,"border",void 0),bt([Q({type:Array,converter:t=>{t=t||vt.join("");try{return JSON.parse(t)}catch{return vt.filter((i=>new RegExp(i,"i").test(String(t))))}}})],yt.prototype,"quadrants",void 0),yt=bt([(t=>i=>"function"==typeof i?((t,i)=>(window.customElements.define(t,i),i))(t,i):((t,i)=>{const{kind:s,elements:e}=i;return{kind:s,elements:e,finisher(i){window.customElements.define(t,i)}}})(t,i))("my-element")],yt);export{yt as MyElement};
