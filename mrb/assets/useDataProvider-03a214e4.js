import{S as he,I as K,J as pe,K as $,L as B,M as me,N as ve,O as ye,P as W,Q as ge,T as we,U as Re,q as ae,V as Oe,c as m,W as be,r as O,z as T,X as z,Y as oe,B as Te,Z as ue,u as D,$ as Ce,a0 as Se,d as Ie,e as De,p as Ne,a1 as Ee,a2 as Fe,a3 as Qe}from"./index-64045075.js";class Me extends he{constructor(e,r){super(),this.client=e,this.options=r,this.trackedProps=new Set,this.selectError=null,this.bindMethods(),this.setOptions(r)}bindMethods(){this.remove=this.remove.bind(this),this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.length===1&&(this.currentQuery.addObserver(this),V(this.currentQuery,this.options)&&this.executeFetch(),this.updateTimers())}onUnsubscribe(){this.listeners.length||this.destroy()}shouldFetchOnReconnect(){return P(this.currentQuery,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return P(this.currentQuery,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=[],this.clearStaleTimeout(),this.clearRefetchInterval(),this.currentQuery.removeObserver(this)}setOptions(e,r){const s=this.options,n=this.currentQuery;if(this.options=this.client.defaultQueryOptions(e),K(s,this.options)||this.client.getQueryCache().notify({type:"observerOptionsUpdated",query:this.currentQuery,observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=s.queryKey),this.updateQuery();const i=this.hasListeners();i&&H(this.currentQuery,n,this.options,s)&&this.executeFetch(),this.updateResult(r),i&&(this.currentQuery!==n||this.options.enabled!==s.enabled||this.options.staleTime!==s.staleTime)&&this.updateStaleTimeout();const a=this.computeRefetchInterval();i&&(this.currentQuery!==n||this.options.enabled!==s.enabled||a!==this.currentRefetchInterval)&&this.updateRefetchInterval(a)}getOptimisticResult(e){const r=this.client.getQueryCache().build(this.client,e);return this.createResult(r,e)}getCurrentResult(){return this.currentResult}trackResult(e){const r={};return Object.keys(e).forEach(s=>{Object.defineProperty(r,s,{configurable:!1,enumerable:!0,get:()=>(this.trackedProps.add(s),e[s])})}),r}getCurrentQuery(){return this.currentQuery}remove(){this.client.getQueryCache().remove(this.currentQuery)}refetch({refetchPage:e,...r}={}){return this.fetch({...r,meta:{refetchPage:e}})}fetchOptimistic(e){const r=this.client.defaultQueryOptions(e),s=this.client.getQueryCache().build(this.client,r);return s.isFetchingOptimistic=!0,s.fetch().then(()=>this.createResult(s,r))}fetch(e){var r;return this.executeFetch({...e,cancelRefetch:(r=e.cancelRefetch)!=null?r:!0}).then(()=>(this.updateResult(),this.currentResult))}executeFetch(e){this.updateQuery();let r=this.currentQuery.fetch(this.options,e);return e!=null&&e.throwOnError||(r=r.catch(pe)),r}updateStaleTimeout(){if(this.clearStaleTimeout(),$||this.currentResult.isStale||!B(this.options.staleTime))return;const r=me(this.currentResult.dataUpdatedAt,this.options.staleTime)+1;this.staleTimeoutId=setTimeout(()=>{this.currentResult.isStale||this.updateResult()},r)}computeRefetchInterval(){var e;return typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.currentResult.data,this.currentQuery):(e=this.options.refetchInterval)!=null?e:!1}updateRefetchInterval(e){this.clearRefetchInterval(),this.currentRefetchInterval=e,!($||this.options.enabled===!1||!B(this.currentRefetchInterval)||this.currentRefetchInterval===0)&&(this.refetchIntervalId=setInterval(()=>{(this.options.refetchIntervalInBackground||ve.isFocused())&&this.executeFetch()},this.currentRefetchInterval))}updateTimers(){this.updateStaleTimeout(),this.updateRefetchInterval(this.computeRefetchInterval())}clearStaleTimeout(){this.staleTimeoutId&&(clearTimeout(this.staleTimeoutId),this.staleTimeoutId=void 0)}clearRefetchInterval(){this.refetchIntervalId&&(clearInterval(this.refetchIntervalId),this.refetchIntervalId=void 0)}createResult(e,r){const s=this.currentQuery,n=this.options,i=this.currentResult,a=this.currentResultState,o=this.currentResultOptions,c=e!==s,d=c?e.state:this.currentQueryInitialState,u=c?this.currentResult:this.previousQueryResult,{state:l}=e;let{dataUpdatedAt:f,error:p,errorUpdatedAt:C,fetchStatus:w,status:g}=l,j=!1,x=!1,y;if(r._optimisticResults){const v=this.hasListeners(),_=!v&&V(e,r),fe=v&&H(e,s,r,n);(_||fe)&&(w=ye(e.options.networkMode)?"fetching":"paused",f||(g="loading")),r._optimisticResults==="isRestoring"&&(w="idle")}if(r.keepPreviousData&&!l.dataUpdatedAt&&u!=null&&u.isSuccess&&g!=="error")y=u.data,f=u.dataUpdatedAt,g=u.status,j=!0;else if(r.select&&typeof l.data<"u")if(i&&l.data===(a==null?void 0:a.data)&&r.select===this.selectFn)y=this.selectResult;else try{this.selectFn=r.select,y=r.select(l.data),y=W(i==null?void 0:i.data,y,r),this.selectResult=y,this.selectError=null}catch(v){this.selectError=v}else y=l.data;if(typeof r.placeholderData<"u"&&typeof y>"u"&&g==="loading"){let v;if(i!=null&&i.isPlaceholderData&&r.placeholderData===(o==null?void 0:o.placeholderData))v=i.data;else if(v=typeof r.placeholderData=="function"?r.placeholderData():r.placeholderData,r.select&&typeof v<"u")try{v=r.select(v),this.selectError=null}catch(_){this.selectError=_}typeof v<"u"&&(g="success",y=W(i==null?void 0:i.data,v,r),x=!0)}this.selectError&&(p=this.selectError,y=this.selectResult,C=Date.now(),g="error");const F=w==="fetching",Q=g==="loading",M=g==="error";return{status:g,fetchStatus:w,isLoading:Q,isSuccess:g==="success",isError:M,isInitialLoading:Q&&F,data:y,dataUpdatedAt:f,error:p,errorUpdatedAt:C,failureCount:l.fetchFailureCount,failureReason:l.fetchFailureReason,errorUpdateCount:l.errorUpdateCount,isFetched:l.dataUpdateCount>0||l.errorUpdateCount>0,isFetchedAfterMount:l.dataUpdateCount>d.dataUpdateCount||l.errorUpdateCount>d.errorUpdateCount,isFetching:F,isRefetching:F&&!Q,isLoadingError:M&&l.dataUpdatedAt===0,isPaused:w==="paused",isPlaceholderData:x,isPreviousData:j,isRefetchError:M&&l.dataUpdatedAt!==0,isStale:U(e,r),refetch:this.refetch,remove:this.remove}}updateResult(e){const r=this.currentResult,s=this.createResult(this.currentQuery,this.options);if(this.currentResultState=this.currentQuery.state,this.currentResultOptions=this.options,K(s,r))return;this.currentResult=s;const n={cache:!0},i=()=>{if(!r)return!0;const{notifyOnChangeProps:a}=this.options;if(a==="all"||!a&&!this.trackedProps.size)return!0;const o=new Set(a??this.trackedProps);return this.options.useErrorBoundary&&o.add("error"),Object.keys(this.currentResult).some(c=>{const d=c;return this.currentResult[d]!==r[d]&&o.has(d)})};(e==null?void 0:e.listeners)!==!1&&i()&&(n.listeners=!0),this.notify({...n,...e})}updateQuery(){const e=this.client.getQueryCache().build(this.client,this.options);if(e===this.currentQuery)return;const r=this.currentQuery;this.currentQuery=e,this.currentQueryInitialState=e.state,this.previousQueryResult=this.currentResult,this.hasListeners()&&(r==null||r.removeObserver(this),e.addObserver(this))}onQueryUpdate(e){const r={};e.type==="success"?r.onSuccess=!e.manual:e.type==="error"&&!ge(e.error)&&(r.onError=!0),this.updateResult(r),this.hasListeners()&&this.updateTimers()}notify(e){we.batch(()=>{if(e.onSuccess){var r,s,n,i;(r=(s=this.options).onSuccess)==null||r.call(s,this.currentResult.data),(n=(i=this.options).onSettled)==null||n.call(i,this.currentResult.data,null)}else if(e.onError){var a,o,c,d;(a=(o=this.options).onError)==null||a.call(o,this.currentResult.error),(c=(d=this.options).onSettled)==null||c.call(d,void 0,this.currentResult.error)}e.listeners&&this.listeners.forEach(u=>{u(this.currentResult)}),e.cache&&this.client.getQueryCache().notify({query:this.currentQuery,type:"observerResultsUpdated"})})}}function _e(t,e){return e.enabled!==!1&&!t.state.dataUpdatedAt&&!(t.state.status==="error"&&e.retryOnMount===!1)}function V(t,e){return _e(t,e)||t.state.dataUpdatedAt>0&&P(t,e,e.refetchOnMount)}function P(t,e,r){if(e.enabled!==!1){const s=typeof r=="function"?r(t):r;return s==="always"||s!==!1&&U(t,e)}return!1}function H(t,e,r,s){return r.enabled!==!1&&(t!==e||s.enabled===!1)&&(!r.suspense||t.state.status!=="error")&&U(t,r)}function U(t,e){return t.isStaleByTime(e.staleTime)}function Pe(t=""){var e;if(!((e=Re())==null?void 0:e.proxy))throw new Error("vue-query hooks can only be used inside setup() function.");const s=Oe(t),n=ae(s);if(!n)throw new Error("No 'queryClient' found in Vue context, use 'VueQueryPlugin' to properly initialize the library.");return n}function Le(t,e,r={},s={}){var n;const i=m(()=>ke(e,r,s)),a=(n=i.value.queryClient)!=null?n:Pe(i.value.queryClientKey),o=m(()=>{const f=a.defaultQueryOptions(i.value);return f._optimisticResults=a.isRestoring.value?"isRestoring":"optimistic",f}),c=new t(a,o.value),d=be(c.getCurrentResult()),u=O(()=>{});T(a.isRestoring,f=>{f||(u.value(),u.value=c.subscribe(p=>{z(d,p)}))},{immediate:!0}),T(o,()=>{c.setOptions(o.value),z(d,c.getCurrentResult())},{deep:!0}),oe(()=>{u.value()});const l=()=>new Promise(f=>{let p=()=>{};const C=()=>{if(o.value.enabled!==!1){const w=c.getOptimisticResult(o.value);w.isStale?(p(),f(c.fetchOptimistic(o.value))):(p(),f(w))}};C(),p=T(o,C,{deep:!0})});return{...Te(ue(d)),suspense:l}}function ke(t,e={},r={}){const s=D(t),n=D(e),i=D(r);let a=s;return Ce(s)?typeof n=="function"?a={...i,queryKey:s,queryFn:n}:a={...n,queryKey:s}:a=s,Se(a)}function R(t,e,r){const s=Le(Me,t,e,r);return{...s,refetch:s.refetch.value,remove:s.remove.value}}function ce(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function N(t){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?N=function(r){return typeof r}:N=function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},N(t)}function Ae(t){ce(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||N(t)==="object"&&e==="[object Date]"?new Date(t.getTime()):typeof t=="number"||e==="[object Number]"?new Date(t):((typeof t=="string"||e==="[object String]")&&typeof console<"u"&&(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn(new Error().stack)),new Date(NaN))}function qe(t){ce(1,arguments);var e=Ae(t);return e.setHours(0,0,0,0),e}var h=(t=>(t[t.Ok=1]="Ok",t[t.NotCompeting=2]="NotCompeting",t[t.OverMaxTime=3]="OverMaxTime",t[t.DidNotFinish=4]="DidNotFinish",t[t.Mispunch=5]="Mispunch",t[t.Disqualified=6]="Disqualified",t[t.DidNotStart=7]="DidNotStart",t[t.Running=8]="Running",t[t.NotStarted=9]="NotStarted",t))(h||{});const bt=t=>[8,9].includes(t.status),Tt=t=>t.status===1,J=async t=>{const r=(await t.text()).replaceAll('"O"',"O").replaceAll(/\t/g,"");return JSON.parse(r)},Ue={0:h.Ok,1:h.DidNotStart,2:h.DidNotFinish,3:h.Mispunch,4:h.Disqualified,5:h.OverMaxTime,9:h.NotStarted,10:h.NotStarted,11:h.DidNotStart},je=(t,e)=>{const r=(e??0)*60*60*1e3;return t-r};function xe(){return{key:"liveResultat",getCompetitionsLoader:()=>{const{status:n,data:i}=R({queryKey:["competitions","liveResultat"],queryFn:async()=>{const a=await fetch("https://liveresultat.orientering.se/api.php?method=getcompetitions");if(!a.ok)throw new Error("Network response was not ok");const o=await J(a);return G(o.competitions,!0)}});return{status:n,competitions:i}},getCompetitionLoader:n=>{const{data:i}=R({queryKey:["competitionData","liveResultat",n.value],queryFn:async()=>{if(!n.value)return{name:"TEST EVENT",organizer:"TEST CLUB"};const u=await fetch(`https://liveresultat.orientering.se/api.php?method=getcompetitioninfo&comp=${n.value}`);if(!u.ok)throw new Error("Network response was not ok");const l=await J(u);return G(l,!1)}}),a=m(()=>i.value!==void 0),{status:o,data:c}=R({queryKey:["competitionClasses","liveResultat",n.value],queryFn:async()=>{const u=await fetch(`https://liveresultat.orientering.se/api.php?method=getclasses&comp=${n.value}`);if(!u.ok)throw new Error("Network response was not ok");const{classes:l}=await u.json();return l.map(p=>({id:p.className,name:p.className,gender:Ke(p.className)}))},enabled:a});return{competition:m(()=>{if(!(!c.value||!i.value))return{...i.value,zeroTime:new Date(i.value.date),categories:c.value,isRelay:!1}}),status:o}},getAthletesLoader:({competition:n,category:i,fetchEnabled:a})=>{const o=O(),c=m(()=>typeof a>"u"?!0:a.value),{status:d,data:u}=R({queryKey:["athletes","liveResultat",n.id,i.id],queryFn:async()=>{const l=await fetch(`https://liveresultat.orientering.se/api.php?comp=${n.id}&method=getclassresults&unformattedTimes=true&class=${i.id}${o.value?`&last_hash=${o.value}`:""}`);if(!l.ok)throw new Error("Network response was not ok");const f=await l.json();return"results"in f?(o.value=f.hash,$e(f.results,n)):[]},structuralSharing:(l,f)=>!f.length&&(l!=null&&l.length)?l:f,enabled:c,refetchInterval:15*1e3});return{status:d,rawAthletes:u}}}}function Ke(t){const e=t.charAt(0);return["H","M"].includes(e)?"M":["D","W","F"].includes(e)?"F":"X"}function G(t,e){const s=(Array.isArray(t)?t:[t]).map(n=>({...n,id:n.id.toString(),isRelay:!1,date:new Date(n.date)}));return e?s:s[0]}function $e(t,e){const r=qe(e.date).valueOf();return t.map(s=>{const n=s.name+s.club,i=parseFloat(s.result)*10,a=Math.round(i/1e3),o=Ue[s.status],c=s.start*10,d=je(r+c,e.timediff),u=d+i;return{id:n,surname:s.name,firstName:"",club:s.club,timeSeconds:a,startTime:new Date(d),status:o,updatedAt:new Date(u)}})}function Be(){const t="oriCloud",e="http://192.168.0.130:3001/api";return{key:t,getCompetitionsLoader:()=>{const{status:a,data:o}=R({queryKey:["competitions","oriCloud"],queryFn:async()=>{const c=await fetch(`${e}/event`);if(!c.ok)throw new Error("Network response was not ok");const d=await c.json();return We(d.results.data)}});return{status:a,competitions:o}},getCompetitionLoader:a=>{const{data:o,status:c}=R({queryKey:["competitionData","oriCloud",a.value],queryFn:async()=>{if(!a.value)return{name:"TEST EVENT",organizer:"TEST CLUB"};const u=await fetch(`${e}/event/${a.value}`);if(!u.ok)throw new Error("Network response was not ok");const l=await u.json();return ze(l.results.data)}});return{competition:m(()=>{if(o.value)return{...o.value}}),status:c}},getAthletesLoader:({competition:a,category:o,fetchEnabled:c})=>{const d=m(()=>typeof c>"u"?!0:c.value),{status:u,data:l}=R({queryKey:["athletes","oriCloud",a.id,o.id],queryFn:async()=>{const f=await fetch(`${e}/event/${a.id}/results?class=${o.id}`);if(!f.ok)throw new Error("Network response was not ok");const p=await f.json();return He(p.results.data.classes[0].competitors)},enabled:d,refetchInterval:15*1e3});return{status:u,rawAthletes:l}},getRelayTeamsLoader:({competition:a,category:o,fetchEnabled:c})=>{const d=m(()=>typeof c>"u"?!0:c.value),{status:u,data:l}=R({queryKey:["relayTeams","oriCloud",a.id,o.id],queryFn:async()=>{const f=await fetch(`${e}/event/${a.id}/results?class=${o.id}`);if(!f.ok)throw new Error("Network response was not ok");const p=await f.json();return Je(p.results.data.classes[0].teams)},enabled:d,refetchInterval:15*1e3});return{status:u,relayTeams:l}}}}function We(t){return t.map(e=>({...e,isRelay:e.relay,date:new Date(e.date)}))}function ze(t){return{...t,date:new Date(t.date),zeroTime:new Date(t.zeroTime),isRelay:t.relay,categories:t.classes.map(r=>({...r,controls:r.controlsCount,gender:Ve(r.sex)}))}}function Ve(t){return t==="B"?"X":t}const L={OK:h.Ok,Finished:h.Ok,MissingPunch:h.Mispunch,Disqualified:h.Disqualified,DidNotFinish:h.DidNotFinish,Active:h.Running,Inactive:h.NotStarted,OverTime:h.OverMaxTime,SportingWithdrawal:h.DidNotFinish,NotCompeting:h.NotCompeting,Moved:h.NotStarted,MovedUp:h.NotStarted,DidNotStart:h.DidNotStart,DidNotEnter:h.DidNotStart,Cancelled:h.DidNotFinish};function He(t){return t.map(e=>{const r=L[e.status];return{id:e.id.toString(),surname:e.lastname,firstName:e.firstname,club:e.organisation,timeSeconds:e.time??0,status:r,startTime:e.startTime?new Date(e.startTime):void 0,updatedAt:e.finishTime?new Date(e.finishTime):void 0}})}function Je(t){return t.map(e=>{const r=e.competitors.map(s=>({id:s.id.toString(),surname:s.lastname,firstName:s.firstname,timeSeconds:s.time??0,leg:s.leg,status:L[s.status],startTime:s.startTime?new Date(s.startTime):void 0,updatedAt:s.finishTime?new Date(s.finishTime):void 0}));return{id:e.id.toString(),name:e.name,club:e.organisation,athletes:r,status:L[e.status]}})}const X={id:"1",name:"TEST EVENT",organizer:"TEST CLUB",date:new Date("2023-01-01"),timediff:1,isRelay:!1},Ge={...X,zeroTime:new Date(X.date),categories:[]},Xe=()=>[{id:"1",name:"H21C",length:10.2,climb:255,controls:20,gender:"M",athletes:b({gender:"M"})},{id:"2",name:"D21C",length:8.2,climb:150,controls:16,gender:"F",athletes:b({gender:"F"})},{id:"3",name:"HDR",length:10.2,climb:255,controls:20,gender:"X",athletes:b({gender:"M"})},{id:"4",name:"JKL",length:10.2,climb:255,controls:20,gender:"M",athletes:b({gender:"M"})},{id:"5",name:"MNO",length:10.2,climb:255,controls:20,gender:"M",athletes:b({gender:"M"})},{id:"6",name:"PQR",length:10.2,climb:255,controls:20,gender:"M",athletes:b({gender:"M"})}],Ye=()=>{const t=Math.floor(Math.random()*35)+35,e=Math.floor(Math.random()*60);return t*60+e},Ze=t=>({id:Math.floor(Math.random()*1e6).toString(),surname:"Doe",firstName:t==="F"?"Jane":"Joe",card:"81234567",club:"Czech republic",timeSeconds:Ye(),status:h.Ok}),b=({gender:t,count:e})=>{const r=e||Math.floor(Math.random()*20)+10;return new Array(r).fill({}).map(()=>Ze(t))},Y={...Ge,categories:Xe()};function et({MOCK_COMPETION_LIST:t}={}){return{key:"test",getCompetitionsLoader:()=>{const i=m(()=>t??[Y]),a=O("success");return{competitions:i,status:a}},getCompetitionLoader:i=>{const a={...Y,id:i.value},o=m(()=>i.value?a:void 0),c=O("success");return{competition:o,status:c}},getAthletesLoader:({competition:i,category:a,fetchEnabled:o})=>{const c=O(o.value);if(!c.value){const l=T(o,f=>{f&&(c.value=!0,l())})}const d=m(()=>c.value?a.athletes:[]);return{status:m(()=>c.value?"success":"loading"),rawAthletes:d}}}}const le=Symbol(),Ct=Symbol(),St=Ie({__name:"DataProvider",props:{provider:null},setup(t){const s={liveResultat:xe,oriCloud:Be,test:et}[t.provider];return Ne(le,s),(n,i)=>De(n.$slots,"default")}});var Z;const E=typeof window<"u",tt=t=>typeof t=="function",rt=t=>typeof t=="string",k=()=>{};E&&((Z=window==null?void 0:window.navigator)!=null&&Z.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function S(t){return typeof t=="function"?t():D(t)}function st(t,e){function r(...s){return new Promise((n,i)=>{Promise.resolve(t(()=>e.apply(this,s),{fn:e,thisArg:this,args:s})).then(n).catch(i)})}return r}function nt(t,e={}){let r,s,n=k;const i=o=>{clearTimeout(o),n(),n=k};return o=>{const c=S(t),d=S(e.maxWait);return r&&i(r),c<=0||d!==void 0&&d<=0?(s&&(i(s),s=null),Promise.resolve(o())):new Promise((u,l)=>{n=e.rejectOnCancel?l:u,d&&!s&&(s=setTimeout(()=>{r&&i(r),s=null,u(o())},d)),r=setTimeout(()=>{s&&i(s),s=null,u(o())},c)})}}function it(t){return t}function I(t){return Fe()?(oe(t),!0):!1}function at(t){let e=0,r,s;const n=()=>{e-=1,s&&e<=0&&(s.stop(),r=void 0,s=void 0)};return(...i)=>(e+=1,r||(s=Ee(!0),r=s.run(()=>t(...i))),I(n),r)}function It(t,e=200,r={}){return st(nt(e,r),t)}function ot(t,e=1e3,r={}){const{immediate:s=!0,immediateCallback:n=!1}=r;let i=null;const a=O(!1);function o(){i&&(clearInterval(i),i=null)}function c(){a.value=!1,o()}function d(){const u=S(e);u<=0||(a.value=!0,n&&t(),o(),i=setInterval(t,u))}if(s&&E&&d(),Qe(e)||tt(e)){const u=T(e,()=>{a.value&&E&&d()});I(u)}return I(c),{isActive:a,pause:c,resume:d}}function ut(t){var e;const r=S(t);return(e=r==null?void 0:r.$el)!=null?e:r}const de=E?window:void 0;function Dt(...t){let e,r,s,n;if(rt(t[0])||Array.isArray(t[0])?([r,s,n]=t,e=de):[e,r,s,n]=t,!e)return k;Array.isArray(r)||(r=[r]),Array.isArray(s)||(s=[s]);const i=[],a=()=>{i.forEach(u=>u()),i.length=0},o=(u,l,f,p)=>(u.addEventListener(l,f,p),()=>u.removeEventListener(l,f,p)),c=T(()=>[ut(e),S(n)],([u,l])=>{a(),u&&i.push(...r.flatMap(f=>s.map(p=>o(u,f,p,l))))},{immediate:!0,flush:"post"}),d=()=>{c(),a()};return I(d),d}const A=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},q="__vueuse_ssr_handlers__";A[q]=A[q]||{};A[q];function ct(t,e={}){const{immediate:r=!0,window:s=de}=e,n=O(!1);let i=0,a=null;function o(u){if(!n.value||!s)return;const l=u-i;t({delta:l,timestamp:u}),i=u,a=s.requestAnimationFrame(o)}function c(){!n.value&&s&&(n.value=!0,a=s.requestAnimationFrame(o))}function d(){n.value=!1,a!=null&&s&&(s.cancelAnimationFrame(a),a=null)}return r&&c(),I(d),{isActive:ue(n),pause:d,resume:c}}var lt=Object.defineProperty,ee=Object.getOwnPropertySymbols,dt=Object.prototype.hasOwnProperty,ft=Object.prototype.propertyIsEnumerable,te=(t,e,r)=>e in t?lt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,ht=(t,e)=>{for(var r in e||(e={}))dt.call(e,r)&&te(t,r,e[r]);if(ee)for(var r of ee(e))ft.call(e,r)&&te(t,r,e[r]);return t};function re(t={}){const{controls:e=!1,interval:r="requestAnimationFrame"}=t,s=O(new Date),n=()=>s.value=new Date,i=r==="requestAnimationFrame"?ct(n,{immediate:!0}):ot(n,r,{immediate:!0});return e?ht({now:s},i):s}var se;(function(t){t.UP="UP",t.RIGHT="RIGHT",t.DOWN="DOWN",t.LEFT="LEFT",t.NONE="NONE"})(se||(se={}));var pt=Object.defineProperty,ne=Object.getOwnPropertySymbols,mt=Object.prototype.hasOwnProperty,vt=Object.prototype.propertyIsEnumerable,ie=(t,e,r)=>e in t?pt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,yt=(t,e)=>{for(var r in e||(e={}))mt.call(e,r)&&ie(t,r,e[r]);if(ne)for(var r of ne(e))vt.call(e,r)&&ie(t,r,e[r]);return t};const gt={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};yt({linear:it},gt);const Nt=at(wt);function wt(){const t=new Intl.DateTimeFormat("default",{hour:"numeric",minute:"numeric",second:"numeric"}),e=new Intl.DateTimeFormat("default",{year:"numeric",month:"numeric",day:"numeric"}),r=re({interval:500}),s=re({interval:5e3}),n=m(()=>t.format(r.value));return{dateTimeFormatter:e,timeFormatter:t,now:r,now5s:s,nowFormatted:n}}function Et(){const t=ae(le);if(!t)throw new Error("No data provider found");return t()}export{h as A,St as _,Et as a,It as b,Dt as c,ot as d,bt as e,Tt as f,Ct as i,ce as r,qe as s,Ae as t,Nt as u};
