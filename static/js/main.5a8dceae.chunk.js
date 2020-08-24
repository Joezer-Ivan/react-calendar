(this["webpackJsonpcalendar-app"]=this["webpackJsonpcalendar-app"]||[]).push([[0],{12:function(e,t,a){e.exports=a(19)},17:function(e,t,a){},18:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(8),l=a.n(r),s=(a(17),a(4)),o=a(9),i=a(20),m=a(27);var u=function(e){return c.a.createElement("div",{className:"header row row-middle flex-around"},c.a.createElement("span",{className:"icon anim-icon",onClick:function(){e.setCurrentMonth(Object(i.a)(e.currentMonth,1))}},"chevron_left"),c.a.createElement("span",null,Object(m.a)(e.currentMonth,"MMMM yyyy")),c.a.createElement("span",{className:"icon anim-icon",onClick:function(){e.setCurrentMonth(Object(o.a)(e.currentMonth,1))}},"chevron_right"))};var d=function(){for(var e=[],t=0,a=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];t<a.length;t++){var n=a[t];e.push(c.a.createElement("div",{className:"column col-center",key:n},n))}return c.a.createElement("div",{className:"days row"},e)},v=a(21),b=a(22),E=a(23),p=a(24),f=a(25),j=a(28),h=a(26),O=a(10),y=function(e,t){var a={},n="y_".concat(Object(m.a)(t,"yyyy")),c="m_".concat(Object(m.a)(t,"MM")),r="d_".concat(Object(m.a)(t,"dd"));return e[n]&&e[n][c]&&e[n][c][r]&&(a=e[n][c][r]),a},N=function(e){if(!e)return"";var t=e.split(":"),a=parseInt(t[0]),n=t[1],c="AM";a>=12&&(c="PM",a%=12);var r=0===a?"12":("0"+a.toString()).slice(-2);return"".concat(r,":").concat(n," ").concat(c)};var T=function(e){for(var t=Object(n.useContext)(D),a=Object(v.a)(e.currentMonth),r=Object(b.a)(a),l=Object(E.a)(a),s=Object(p.a)(r),o=[],i=[],u=l,d="";u<=s;){for(var O=function(n){var r=y(t.eventSchedule,u),l=[];for(var s in r){var o=r[s];l.push(c.a.createElement("li",{key:s},o.startTime&&c.a.createElement("span",{className:"mr5"},N(o.startTime)),c.a.createElement("span",{className:"event-subject"},o.subject)))}d=Object(m.a)(u,"d");var v=u;i.push(c.a.createElement("div",{className:"column cell ".concat(Object(f.a)(u,a)?Object(j.a)(u,e.todaysDate)?"selected":"":"disabled"),key:u,onClick:function(){return e.onDateClick(v)}},c.a.createElement("span",{className:"number"},d),c.a.createElement("ul",{className:"ul-no-bullets cell-event-list"},l),Object.keys(r).length>3&&c.a.createElement("span",{className:"overflow-banner"},"...more events"))),u=Object(h.a)(u,1)},T=0;T<7;T++)O();o.push(c.a.createElement("div",{className:"row",key:u}," ",i," ")),i=[]}return c.a.createElement("div",{className:"body"},o)};var k=function(e){var t=Object(n.useState)(e.subject||""),a=Object(s.a)(t,2),r=a[0],l=a[1],o=Object(n.useState)(e.startTime||""),i=Object(s.a)(o,2),m=i[0],u=i[1],d=Object(n.useState)(e.endTime||""),v=Object(s.a)(d,2),b=v[0],E=v[1],p=Object(n.useState)(e.location||""),f=Object(s.a)(p,2),j=f[0],h=f[1],O=Object(n.useState)(e.description||""),y=Object(s.a)(O,2),N=y[0],T=y[1],k=Object(n.useContext)(D);return c.a.createElement("li",{className:"event-card"},c.a.createElement("form",{className:"event-form",onSubmit:function(t){t.preventDefault();var a=e.uid?"EDIT_EVENT":"ADD_EVENT",n={uid:e.uid,subject:r,startTime:m,endTime:b,location:j,description:N};k.eventScheduleDispatch({type:a,date:e.date,event:n}),e.closeFormCallBack()}},c.a.createElement("span",{className:"form-row"},c.a.createElement("label",{htmlFor:"subject"},"Subject"),c.a.createElement("input",{name:"subject",type:"type",maxLength:"30",placeholder:"Event subject",autoFocus:!0,value:r,onChange:function(e){return l(e.target.value)}})),c.a.createElement("span",{className:"form-row"},c.a.createElement("label",{htmlFor:"startTime"},"Start time"),c.a.createElement("input",{className:"mr10",name:"startTime",type:"time",value:m,onChange:function(e){return u(e.target.value)}}),c.a.createElement("label",{htmlFor:"endTime"},"End time"),c.a.createElement("input",{name:"endTime",type:"time",value:b,onChange:function(e){return E(e.target.value)}})),c.a.createElement("span",{className:"form-row"},c.a.createElement("label",{htmlFor:"location"},"Location"),c.a.createElement("input",{name:"location",type:"text",value:j,onChange:function(e){return h(e.target.value)}})),c.a.createElement("span",{className:"form-row"},c.a.createElement("label",{htmlFor:"description"},"Description"),c.a.createElement("textarea",{name:"description",type:"text",value:N,onChange:function(e){return T(e.target.value)}})),c.a.createElement("button",{type:"submit",className:"mr10 btn-primary"},"Save"),c.a.createElement("button",{type:"cancel",onClick:function(){return e.closeFormCallBack()}},"Cancel")))};var C=function(e){var t=e.event,a=Object(n.useState)(!1),r=Object(s.a)(a,2),l=r[0],o=r[1],i=Object(n.useContext)(D);return l?c.a.createElement(k,{date:e.date,closeFormCallBack:function(){o(!1)},uid:t.uid,subject:t.subject,startTime:t.startTime,endTime:t.endTime,location:t.location,description:t.description}):c.a.createElement("li",{className:"event-card"},c.a.createElement("div",{className:"flex-bx flex-between row-middle pb5"},c.a.createElement("div",{className:"card-title"},c.a.createElement("span",{className:"event-subject mr10"},t.subject),t.startTime&&c.a.createElement("span",null,N(t.startTime)," - ",N(t.endTime))),c.a.createElement("div",{className:"flex-bx"},c.a.createElement("span",{className:"icon anim-icon mr10",title:"Edit",onClick:function(){return o(!0)}},"edit"),c.a.createElement("span",{className:"icon anim-icon",title:"Delete",onClick:function(){i.eventScheduleDispatch({type:"DELETE_EVENT",date:e.date,event:t})}},"delete_outline"))),t.location&&c.a.createElement("div",{className:"flex-bx row-middle pb5"},c.a.createElement("span",{className:"icon"},"location_on"),c.a.createElement("span",null,t.location)),t.description&&c.a.createElement("span",null,t.description))};var S=function(e){var t=Object(n.useState)(!1),a=Object(s.a)(t,2),r=a[0],l=a[1],o=Object(n.useContext)(D),i=y(o.eventSchedule,e.selectedDate),u=[];for(var d in i){var v=i[d];u.push(c.a.createElement(C,{key:d,event:v,date:e.selectedDate}))}return c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"modalMask",onClick:function(){return e.setEventsView(!1)}}),c.a.createElement("div",{className:"popover modal daily-events"},c.a.createElement("div",{className:"header flex-bx flex-between"},c.a.createElement("span",null,Object(m.a)(e.selectedDate,"dd MMMM yyyy")),c.a.createElement("div",null,c.a.createElement("button",{className:"mr10 btn-primary",onClick:function(){return l(!0)}},c.a.createElement("span",{className:"icon"},"add"),"New Event"),c.a.createElement("span",{className:"icon anim-icon",onClick:function(){return e.setEventsView(!1)}},"close"))),c.a.createElement("div",null,c.a.createElement("ul",{className:"events-list ul-no-bullets"},r&&c.a.createElement(k,{date:e.selectedDate,closeFormCallBack:function(){l(!1)}}),u.length>0?u:!r&&"You don't have any events scheduled for this day..."))))},w=a(11),g=function(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()},M=function(e,t){var a,n,c=Object(w.a)({},e),r=function(e,t){var a="y_".concat(Object(m.a)(t,"yyyy")),n="m_".concat(Object(m.a)(t,"MM")),r="d_".concat(Object(m.a)(t,"dd"));c[a]||(c[a]={}),c[a][n]||(c[a][n]={}),c[a][n][r]||(c[a][n][r]={}),c[a][n][r][e.uid]=e,c[a][n][r]=function(e){var t,a={},n=Object.keys(e).sort((function(t,a){if(!e[t].startTime&&!e[a].startTime)return 0;if(!e[t].startTime)return-1;if(!e[a].startTime)return 1;var n=e[t].startTime.split(":"),c=e[a].startTime.split(":"),r=parseInt(n[0])-parseInt(c[0]);return r=0===r?parseInt(n[1])-parseInt(c[1]):r})),c=Object(O.a)(n);try{for(c.s();!(t=c.n()).done;){var r=t.value;a[r]=e[r]}}catch(l){c.e(l)}finally{c.f()}return a}(c[a][n][r])};switch(t.type){case"ADD_EVENT":t.event.uid=g(),r(t.event,t.date);break;case"EDIT_EVENT":r(t.event,t.date);break;case"DELETE_EVENT":a=t.event.uid,t.date,delete y(c,t.date)[a]}return n=c,localStorage.setItem("calendar-scheduled-events",JSON.stringify(n)),c},D=Object(n.createContext)(),x=function(){var e=localStorage.getItem("calendar-scheduled-events");return JSON.parse(e)}()||{},_=function(){var e=Object(n.useState)(new Date),t=Object(s.a)(e,2),a=t[0],r=(t[1],Object(n.useState)(new Date)),l=Object(s.a)(r,2),o=l[0],i=l[1],m=Object(n.useState)(new Date),v=Object(s.a)(m,2),b=v[0],E=v[1],p=Object(n.useState)(!1),f=Object(s.a)(p,2),j=f[0],h=f[1],O=Object(n.useReducer)(M,x),y=Object(s.a)(O,2),N=y[0],k=y[1],C=Object(n.useCallback)((function(e){E(e),h(!0)}),[]);return c.a.createElement(D.Provider,{value:{eventSchedule:N,eventScheduleDispatch:k}},c.a.createElement("div",{className:"calendar"},c.a.createElement(u,{currentMonth:o,setCurrentMonth:i}),c.a.createElement(d,null),c.a.createElement(T,{currentMonth:o,todaysDate:a,onDateClick:C}),j&&c.a.createElement(S,{selectedDate:b,setEventsView:h})))};a(18);var F=function(){return c.a.createElement(_,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[12,1,2]]]);
//# sourceMappingURL=main.5a8dceae.chunk.js.map