import{m as x,a5 as D,c as r,a as o,ap as m,D as k,G as c,o as i,d as e,b as d,w as n,n as _,aq as p,u as a,F,a6 as b,t as E}from"./Dd0PDwvC.js";import{a as C,u as P}from"./CAYKA-FW.js";const S={class:"container relative z-30 text-center text-white max-w-4xl"},w={class:"font-bold text-6xl"},B={class:"mt-4"},$={class:"font-bold"},g=x({__name:"Slide",props:{bgColor:{type:String,default:"#693EFE"},topBarColor:{type:String,default:"#D3FE3E"},bottomBarColor:{type:String,default:"#D3FE3E"},fullHeight:{type:Boolean,default:!0}},setup(u){return(s,l)=>{const y=D("RouterLink");return i(),r("div",{class:c([`max-w-full ${u.fullHeight?"h-screen":""}`,"relative z-10 flex flex-col justify-center items-center overflow-hidden p-4"]),style:m({backgroundColor:u.bgColor})},[o("div",{class:"h-[10%] w-full absolute top-0 z-20",style:m({backgroundColor:u.topBarColor})},null,4),o("div",S,[o("h1",w,[k(s.$slots,"title",{},()=>[l[0]||(l[0]=e("Статистики больше не осталось... Или возможно что-то пошло не так?"))])]),o("div",B,[l[2]||(l[2]=o("div",{class:"icon"},null,-1)),o("div",$,[k(s.$slots,"link",{},()=>[d(y,{to:"/apiPanel",class:"hover:text-[#D3FE3E]"},{default:n(()=>l[1]||(l[1]=[e("cовершить запрос можно здесь")])),_:1})])])])]),o("div",{class:"h-[10%] w-full absolute bottom-0 z-20",style:m({backgroundColor:u.bottomBarColor})},null,4)],6)}}}),h={key:0},R={class:"text-[#D3FE3E]"},z={key:1},A={key:0},H={class:"text-[#D3FE3E]"},L={key:1},N={key:0},V={class:"text-[#D3FE3E]"},I={key:1},q=x({__name:"index",setup(u){C();const s=P(),l=_(()=>{if(s.getAverageRank!="Не найдено")return s.getAverageRank});return(y,t)=>{const f=D("RouterLink");return i(),r(b,null,[d(g,null,p({title:n(()=>[a(s).getMostPlayedDay?(i(),r("div",h,[t[0]||(t[0]=e(" Больше всего игр было сыграно ")),o("span",R,E(a(s).getMostPlayedDay),1)])):(i(),r("div",z,t[1]||(t[1]=[e("После выполнения API запроса здесь будет показан день, в который было сыграно"),o("span",{class:"text-[#D3FE3E]"}," больше всех матчей",-1)])))]),_:2},[a(s).getMostPlayedDay?{name:"link",fn:n(()=>[d(f,{to:"/apiPanel",class:"hover:text-[#D3FE3E]"},{default:n(()=>t[2]||(t[2]=[e("статистика по остальным дням")])),_:1})]),key:"0"}:void 0]),1024),d(g,{"bg-color":"#EE964B"},p({title:n(()=>[a(l)?(i(),r("div",A,[t[3]||(t[3]=e(" Средний ранг игроков составил ")),o("span",H,E(a(l)),1)])):(i(),r("div",L,t[4]||(t[4]=[e(" После выполнения API запроса здесь будет показан "),o("span",{class:"text-[#D3FE3E]"},"средний ранг",-1),e(" игроков ")])))]),_:2},[a(l)?{name:"link",fn:n(()=>[d(f,{to:"/apiPanel",class:"hover:text-[#D3FE3E]"},{default:n(()=>t[5]||(t[5]=[e("статистика по всем игрокам")])),_:1})]),key:"0"}:void 0]),1024),d(g,{"bg-color":"#3F3244"},p({title:n(()=>{var v;return[a(s).getHeroData.length!==0?(i(),r("div",N,[t[6]||(t[6]=e(" Самым популярным героем стал ")),o("span",V,E(((v=a(s).getHeroData[0])==null?void 0:v[0])||"Drow Ranger"),1)])):(i(),r("div",I,t[7]||(t[7]=[e(" После выполнения API запроса здесь будет показан "),o("span",{class:"text-[#D3FE3E]"},"самый популярный герой",-1),e(" в выборке матчей ")])))]}),_:2},[a(s).getHeroData.length!==0?{name:"link",fn:n(()=>[d(f,{to:"/apiPanel",class:"hover:text-[#D3FE3E]"},{default:n(()=>t[8]||(t[8]=[e("статистика по всем героям")])),_:1})]),key:"0"}:void 0]),1024),F("",!0)],64)}}});export{q as default};