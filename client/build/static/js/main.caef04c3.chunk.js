(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){e.exports=a(16)},16:function(e,t,a){"use strict";a.r(t);var n=a(3),l=a.n(n),r=a(10),c=a(14),s=a(0),i=a.n(s),o=a(11),u=a.n(o),m=a(12),p=a.n(m),d=a(13),E=a.n(d);a(44);function v(){var e=Object(s.useState)(null),t=Object(c.a)(e,2),a=t[0],n=t[1],o=function(){var e=Object(r.a)(l.a.mark(function e(){var t;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("http://localhost:3000/api/v1/stations?at=2020-09-21T07:00:00",{headers:{"api-token":"dev-123","Content-Type":"application/json"}});case 2:t=e.sent,n(t.data);case 4:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return i.a.createElement("div",{className:"App"},i.a.createElement("h1",null,"Bikes Availability"),i.a.createElement("div",null,i.a.createElement("form",null,i.a.createElement("div",null,i.a.createElement("label",null,"Time:",i.a.createElement("input",{type:"text",id:"at"}))),i.a.createElement("br",null),i.a.createElement("button",{className:"fetch-button",onClick:o},"Fetch Data")),i.a.createElement("br",null)),i.a.createElement("div",{className:"at"}," ",a&&E()(a.at).format("LLL")),i.a.createElement("div",{className:"weather"}," ",a&&a.weather.weather[0].description),i.a.createElement("div",{className:"stations"},a&&a.stations.map(function(e,t){return i.a.createElement("div",{className:"station",key:t},i.a.createElement("h3",null,"Station ",t+1),i.a.createElement("h2",null,e.properties.name),i.a.createElement("div",{className:"details"},i.a.createElement("p",null,"Bikes Available: ",e.properties.bikesAvailable),i.a.createElement("p",null,"Address: ",e.properties.addressStreet)))})))}var b=document.getElementById("root");u.a.render(i.a.createElement(v,null),b)},44:function(e,t,a){}},[[15,1,2]]]);
//# sourceMappingURL=main.caef04c3.chunk.js.map