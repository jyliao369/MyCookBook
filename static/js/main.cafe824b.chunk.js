(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{155:function(e,t,n){},293:function(e,t,n){"use strict";n.r(t);var c,a,i,r,s,o,l,d,j,u=n(3),b=n.n(u),p=n(137),g=n.n(p),m=(n(155),n(5)),h=n(145),O=n(302),x=n(304),v=n(301),f=n(144),y=n(10),N=n(9),k=n(305),w=n(24),S=n(26),I=n(303),_=(Object(I.a)(c||(c=Object(S.a)(["\n    query allUsers {\n        users {\n            _id\n            username\n            email\n        }\n    }\n"]))),Object(I.a)(a||(a=Object(S.a)(["\n    query singleUser($userId: ID!) {\n        user(userId: $userId) {\n            _id\n            username\n            email\n            recipes {\n                _id\n                title\n                category\n                servings\n                totalTime\n                ingredients\n                directions\n                imageid\n                createdAt\n                postAuthor\n            }\n        }\n    }\n"])))),T=Object(I.a)(i||(i=Object(S.a)(["\n    query myprofile {\n        myprofile{\n            _id\n            username\n            email\n            recipes {\n                _id\n                title\n                category\n                servings\n                totalTime\n                ingredients\n                directions\n                imageid\n                createdAt\n                postAuthor\n            }\n        }\n    }\n"]))),C=Object(I.a)(r||(r=Object(S.a)(["\n    query getRecipes {\n        recipes {\n            _id\n            title\n            category\n            servings\n            totalTime\n            ingredients\n            directions\n            imageid\n            createdAt\n            postAuthor\n        }\n    }\n"]))),$=Object(I.a)(s||(s=Object(S.a)(["\n    query getSingleRecipe($recipeId: ID!) {\n        recipe(recipeId: $recipeId) {\n            _id\n            title\n            category\n            servings\n            totalTime\n            ingredients\n            directions\n            imageid\n            createdAt\n            postAuthor\n        }\n    }\n"]))),A=n(1),D=function(){for(var e=Object(k.a)(C),t=(e.loading,e.data),n=(null===t||void 0===t?void 0:t.recipes)||[],c=[],a=0;a<n.length;a++){for(var i=!1,r=0;r<c.length;r++)if(n[a].title===c[r].title){i=!0;break}i||c.push(n[a])}console.log(c);for(var s=[],o=[],l=[],d=[],j=0;j<c.length;j++)"Drinks"===c[j].category&&s.push(c[j]),"Appetizer"===c[j].category&&o.push(c[j]),"Entres"===c[j].category&&l.push(c[j]),"Dessert"===c[j].category&&d.push(c[j]);for(var u=[],b=[],p=[],g=[],m=0;m<3;m++)u.push(s[m]);for(var h=0;h<2;h++)b.push(l[h]);for(var O=0;O<2;O++)p.push(o[O]);for(var x=0;x<3;x++)g.push(d[x]);return console.log("a"),console.log(u),console.log("b"),console.log(b),console.log("c"),console.log(p),console.log("d"),console.log(g),Object(A.jsx)("div",{className:"homepage",children:Object(A.jsx)("div",{className:"userrecipes",children:c.map((function(e){return Object(A.jsxs)("div",{className:"recipepost",children:[e.imageid?Object(A.jsx)(w.a,{cloudName:"du119g90a",public_id:e.imageid}):Object(A.jsx)(w.a,{cloudName:"du119g90a",public_id:"https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"}),Object(A.jsxs)(y.b,{to:"/recipes/".concat(e._id),children:[Object(A.jsx)("h3",{children:e.title}),Object(A.jsxs)("p",{children:["Servings: ",e.servings]}),Object(A.jsxs)("p",{children:["Total Cook Time: ",e.totalTime," mins"]}),Object(A.jsxs)("p",{children:["Chef: ",e.postAuthor]})]})]},e._id)}))})})},R=n(16),L=n.n(R),q=n(30),U=n(46),F=n(14),E=n(307),z=Object(I.a)(o||(o=Object(S.a)(["\n    mutation login($email: String!, $password: String!) {\n        login(email: $email, password: $password) {\n            token\n            user {\n                _id\n                username\n            }\n        }\n    }\n"]))),Q=Object(I.a)(l||(l=Object(S.a)(["\n    mutation addUser($username: String!, $email: String!, $password: String!) {\n        addUser(username: $username, email: $email, password: $password) {\n            token\n            user {\n                _id\n                username\n            }\n        }\n    }\n"]))),P=Object(I.a)(d||(d=Object(S.a)(["\n    mutation addRecipe($title:String!, $category:String!, $servings:String!, $totalTime:String!, $ingredients:[String]!, $directions:[String]!, $imageid:String ) {\n        addRecipe(title:$title, category:$category, servings:$servings, totalTime:$totalTime, ingredients:$ingredients, directions:$directions, imageid:$imageid) {\n            title\n            category\n            servings\n            totalTime\n            ingredients\n            directions\n            imageid\n            createdAt\n            postAuthor\n        }\n    }\n"]))),Y=Object(I.a)(j||(j=Object(S.a)(["\n    mutation removeRecipe($recipeId: String!) {\n        removeRecipe(recipeId: $recipeId) {\n            _id\n            title\n            category\n            servings\n            totalTime\n            ingredients\n            directions\n            imageid\n            createdAt\n            postAuthor\n        }\n    }\n"]))),B=n(141),M=n(142),J=n(95),H=new(function(){function e(){Object(B.a)(this,e)}return Object(M.a)(e,[{key:"getProfile",value:function(){try{return Object(J.a)(this.getToken())}catch(e){console.error(e)}return{}}},{key:"loggedIn",value:function(){try{var e=this.getToken();return!(!e||this.isTokenExpired(e))}catch(t){console.error(t)}return!1}},{key:"isTokenExpired",value:function(e){return Object(J.a)(e).exp<Date.now()/1e3&&(localStorage.removeItem("id_token"),!0)}},{key:"getToken",value:function(){return localStorage.getItem("id_token")}},{key:"login",value:function(e){localStorage.setItem("id_token",e),window.location.assign("/")}},{key:"logout",value:function(){localStorage.removeItem("id_token"),window.location.reload()}}]),e}()),G=function(e){var t=Object(u.useState)({email:"",password:""}),n=Object(F.a)(t,2),c=n[0],a=n[1],i=Object(E.a)(z),r=Object(F.a)(i,2),s=r[0],o=r[1],l=o.error,d=o.data,j=function(e){var t=e.target,n=t.name,i=t.value;a(Object(m.a)(Object(m.a)({},c),{},Object(U.a)({},n,i)))},b=function(){var e=Object(q.a)(L.a.mark((function e(t){var n,i;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log(c),e.prev=2,e.next=5,s({variables:Object(m.a)({},c)});case 5:n=e.sent,i=n.data,H.login(i.login.token),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),console.error(e.t0);case 13:a({email:"",password:""});case 14:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t){return e.apply(this,arguments)}}();return Object(A.jsx)("div",{className:"loginpage",children:Object(A.jsxs)("div",{className:"logincard",children:[Object(A.jsx)("h4",{className:"card-header",children:"Login"}),Object(A.jsxs)("div",{className:"loginbody",children:[d?Object(A.jsxs)("p",{children:["Success! You may now head"," ",Object(A.jsx)(y.b,{to:"/",children:"back to the homepage."})]}):Object(A.jsxs)("form",{className:"loginform",onSubmit:b,children:[Object(A.jsx)("input",{className:"form-input",placeholder:"Your email",name:"email",type:"email",value:c.email,onChange:j}),Object(A.jsx)("input",{className:"form-input",placeholder:"********",name:"password",type:"password",value:c.password,onChange:j}),Object(A.jsx)("button",{className:"loginbutton",type:"submit",children:"Submit"})]}),l&&Object(A.jsx)("div",{className:"my-3 p-3 bg-danger text-white",children:l.message})]})]})})},K=function(){var e=Object(u.useState)({username:"",email:"",password:""}),t=Object(F.a)(e,2),n=t[0],c=t[1],a=Object(E.a)(Q),i=Object(F.a)(a,2),r=i[0],s=i[1],o=(s.error,s.data),l=function(e){var t=e.target,a=t.name,i=t.value;c(Object(m.a)(Object(m.a)({},n),{},Object(U.a)({},a,i)))},d=function(){var e=Object(q.a)(L.a.mark((function e(t){var c,a;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log(n),e.prev=2,e.next=5,r({variables:Object(m.a)({},n)});case 5:c=e.sent,a=c.data,H.login(a.addUser.token),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t){return e.apply(this,arguments)}}();return Object(A.jsx)("div",{className:"signuppage",children:Object(A.jsxs)("div",{className:"signupcard",children:[Object(A.jsx)("h4",{className:"signupheader",children:"Sign Up"}),Object(A.jsx)("div",{className:"signupbody",children:o?Object(A.jsxs)("p",{children:[" Success! Logging in...",Object(A.jsx)(y.b,{to:"/"})]}):Object(A.jsxs)("form",{className:"signupform",onSubmit:d,children:[Object(A.jsx)("input",{className:"form-input",placeholder:"Your username",name:"username",type:"text",value:n.username,onChange:l}),Object(A.jsx)("input",{className:"form-input",placeholder:"Your email",name:"email",type:"email",value:n.email,onChange:l}),Object(A.jsx)("input",{className:"form-input",placeholder:"********",name:"password",type:"password",value:n.password,onChange:l}),Object(A.jsx)("button",{className:"signipbutton",type:"submit",children:"Submit"})]})})]})})},V=function(){Object(u.useEffect)((function(){}),[]);var e=Object(N.f)().userId,t=Object(k.a)(e?_:T,{variables:{userId:e}}),n=t.loading,c=t.data,a=(null===c||void 0===c?void 0:c.myprofile)||(null===c||void 0===c?void 0:c.user)||{},i=a.recipes,r=Object(E.a)(Y),s=Object(F.a)(r,1)[0],o=function(){var e=Object(q.a)(L.a.mark((function e(t){var n;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=t.target.id,console.log(n),console.log(typeof n),e.prev=4,e.next=7,s({variables:{recipeId:n}});case 7:console.log("success recipe removed"),console.log(),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(4),console.error(e.t0),console.log("it didnt work");case 15:case"end":return e.stop()}}),e,null,[[4,11]])})));return function(t){return e.apply(this,arguments)}}();return H.loggedIn()&&H.getProfile().data._id===e?Object(A.jsx)(N.a,{to:"/myprofile"}):n?Object(A.jsx)("div",{children:"Loading..."}):(null===a||void 0===a?void 0:a.username)?Object(A.jsx)("div",{className:"userprofilepage",children:Object(A.jsx)("div",{className:"usersrecipes",children:i.map((function(e){return Object(A.jsxs)("div",{className:"recipes",children:[Object(A.jsx)(w.a,{cloudName:"du119g90a",public_id:e.imageid}),Object(A.jsxs)(y.b,{to:"/recipes/".concat(e._id),children:[Object(A.jsx)("h3",{children:e.title}),Object(A.jsxs)("p",{children:["Servings: ",e.servings]}),Object(A.jsxs)("p",{children:["Total Time: ",e.totalTime]})]}),Object(A.jsx)("div",{className:"deletebutton",children:Object(A.jsx)("button",{id:e._id,onClick:o,children:"Remove"})})]},e._id)}))})}):Object(A.jsx)("h4",{className:"profileloggedout",children:"You need to be logged in to see your profile page. Use the navigation links above to sign up or log in!"})},W=function(){for(var e=Object(k.a)(C),t=(e.loading,e.data),n=(null===t||void 0===t?void 0:t.recipes)||[],c=[],a=0;a<n.length;a++){for(var i=!1,r=0;r<c.length;r++)if(n[a].title===c[r].title){i=!0;break}i||c.push(n[a])}var s=[],o=0,l=function(){s=[],console.log("hi");for(var e=0+o;e<=4+o;e++)s.push(c[e]),console.log("hi"),console.log(s);return o+=5,s};return l(),Object(A.jsxs)("div",{className:"recipespage",children:[Object(A.jsx)("div",{className:"searcharea",children:Object(A.jsxs)("form",{className:"searchform",children:[Object(A.jsx)("input",{className:"searchbar",type:"text"}),Object(A.jsx)("button",{className:"search-button",type:"submit",children:"Search"})]})}),Object(A.jsx)("div",{className:"recipeslist",children:c.map((function(e){return Object(A.jsx)("div",{className:"recipecard",children:Object(A.jsxs)(y.b,{to:"/recipes/".concat(e._id),children:[e.imageid?Object(A.jsx)(w.a,{cloudName:"du119g90a",public_id:e.imageid}):Object(A.jsx)(w.a,{cloudName:"du119g90a",public_id:"https://res.cloudinary.com/du119g90a/image/upload/v1636841468/noimage_w8jxmo.jpg"}),Object(A.jsxs)("div",{className:"generalinfo",children:[Object(A.jsx)("h3",{children:e.title}),Object(A.jsxs)("p",{children:["Total Servings: ",e.servings]}),Object(A.jsxs)("p",{children:["totalTime: ",e.totalTime," mins"]})]})]})},e._id)}))}),Object(A.jsx)("div",{children:Object(A.jsx)("button",{onClick:l,children:"hi"})})]})},X=n(57),Z=n(74),ee=n.n(Z),te=function(){var e=Object(u.useState)({title:"",category:"",servings:"",totalTime:"",ingredients:[""],directions:[""],imageid:""}),t=Object(F.a)(e,2),n=t[0],c=t[1];console.log("New Recipe"),console.log(n);var a=Object(u.useState)(""),i=Object(F.a)(a,2),r=i[0],s=i[1],o=function(e){var t=e.target,n=t.name,a=t.value;"title"===n&&c((function(e){return Object(m.a)(Object(m.a)({},e),{},{title:a})})),"category"===n&&c((function(e){return Object(m.a)(Object(m.a)({},e),{},{category:a})})),"servings"===n&&c((function(e){return Object(m.a)(Object(m.a)({},e),{},{servings:a})})),"totalTime"===n&&c((function(e){return Object(m.a)(Object(m.a)({},e),{},{totalTime:a})})),"ingredients"===n&&function(){for(var e=[],t=a.split("\n"),n=0;n<t.length;n++)e.push(t[n]),c((function(t){return Object(m.a)(Object(m.a)({},t),{},{ingredients:e})}))}(),"directions"===n&&function(){for(var e=[],t=a.split("\n"),n=0;n<t.length;n++)e.push(t[n]),c((function(t){return Object(m.a)(Object(m.a)({},t),{},{directions:e})}))}()},l=Object(E.a)(P,{update:function(e,t){var n=t.data.addRecipe;try{var c=e.readQuery({query:C}).recipes;e.writeQuery({query:C,data:{recipes:[n].concat(Object(X.a)(c))}})}catch(i){console.error(i)}var a=e.readQuery({query:T}).myprofile;e.writeQuery({query:T,data:{myprofile:Object(m.a)(Object(m.a)({},a),{},{recipes:[].concat(Object(X.a)(a.recipes),[n])})}})}}),d=Object(F.a)(l,2),j=d[0],b=(d[1].error,function(){var e=Object(q.a)(L.a.mark((function e(t){var a;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,j({variables:Object(m.a)(Object(m.a)({},n),{},{postAuthor:H.getProfile().data.email})});case 4:a=e.sent,a.data,c({title:"",category:"",servings:"",totalTime:"",ingredients:"",directions:"",imageid:""}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}());return Object(A.jsx)("div",{className:"recipeformsection",children:Object(A.jsxs)("form",{onSubmit:b,className:"recipeform",children:[Object(A.jsxs)("div",{className:"tophalf",children:[Object(A.jsxs)("div",{className:"basicinfo",children:[Object(A.jsx)("input",{placeholder:"Recipe Name",name:"title",onChange:o}),Object(A.jsxs)("select",{placeholder:"Category",name:"category",onChange:o,children:[Object(A.jsx)("option",{value:"",children:"Choose a Category"}),Object(A.jsx)("option",{value:"Appetizer",children:"Appetizer"}),Object(A.jsx)("option",{value:"Entres",children:"Entres"}),Object(A.jsx)("option",{value:"Dessert",children:"Dessert"}),Object(A.jsx)("option",{value:"Drinks",children:"Drinks"})]}),Object(A.jsx)("input",{placeholder:"Servings",name:"servings",onChange:o}),Object(A.jsx)("input",{placeholder:"Total Time in Mins",name:"totalTime",onChange:o})]}),Object(A.jsxs)("div",{className:"uploadImage",children:[Object(A.jsx)("div",{className:"previewImage",children:r?Object(A.jsx)("img",{src:URL.createObjectURL(r),className:"imagepreview",alt:""}):Object(A.jsx)("h1",{children:"No Image"})}),Object(A.jsx)("input",{title:" ",type:"file",onChange:function(e){!function(e){var t=new FormData;t.append("file",e),t.append("upload_preset","yun8815z"),ee.a.post("https://api.cloudinary.com/v1_1/du119g90a/image/upload",t).then((function(e){console.log("response"),console.log(e),console.log("public ID"),console.log(e.data.public_id),c((function(t){return Object(m.a)(Object(m.a)({},t),{},{imageid:e.data.public_id})}))}))}(e.target.files[0]),s(e.target.files[0])}})]})]}),Object(A.jsxs)("div",{className:"ingred-instr",children:[Object(A.jsx)("textarea",{placeholder:"Ingredients",name:"ingredients",onChange:o}),Object(A.jsx)("textarea",{placeholder:"Instructions",name:"directions",onChange:o})]}),Object(A.jsx)("div",{className:"",children:Object(A.jsx)("button",{className:"recipeformbutton",type:"submit",children:"Add Recipe"})})]})})},ne=function(){return Object(A.jsx)("div",{className:"createrecipepage",children:Object(A.jsx)(te,{})})},ce=function(){var e=Object(N.f)().recipeId,t=Object(k.a)($,{variables:{recipeId:e}}),n=t.loading,c=t.data,a=(null===c||void 0===c?void 0:c.recipe)||{},i=Object(E.a)(P,{update:function(e,t){var n=t.data.addRecipe,c=e.readQuery({query:T}).myprofile;e.writeQuery({query:T,data:{myprofile:Object(m.a)(Object(m.a)({},c),{},{recipes:[].concat(Object(X.a)(c.recipes),[n])})}})}}),r=Object(F.a)(i,2),s=r[0],o=(r[1].error,function(){var e=Object(q.a)(L.a.mark((function e(t){var n;return L.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,s({variables:Object(m.a)({},a)});case 4:n=e.sent,n.data,console.log("success"),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),console.log("it didnt work"),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}());return n?Object(A.jsx)("div",{children:"Loading..."}):Object(A.jsx)("div",{className:"singlerecipepage",children:Object(A.jsxs)("div",{children:[Object(A.jsxs)("div",{className:"titlecard",children:[Object(A.jsx)("h1",{children:a.title}),H.loggedIn()?Object(A.jsx)(A.Fragment,{children:Object(A.jsx)("button",{onClick:o,enabled:!0,children:"Add to Cookbook"})}):Object(A.jsx)(A.Fragment,{children:Object(A.jsx)("button",{disabled:!0,children:"Add to Cookbook"})})]}),Object(A.jsx)("hr",{}),Object(A.jsxs)("div",{className:"generalInfo",children:[Object(A.jsxs)("p",{children:["Category: ",a.category]}),Object(A.jsxs)("p",{children:["Number of Servings: ",a.servings]}),Object(A.jsxs)("p",{children:["Total Cook Time: ",a.totalTime]})]}),Object(A.jsx)("hr",{}),Object(A.jsxs)("div",{className:"middlepart",children:[Object(A.jsxs)("div",{className:"ingredientsList",children:[Object(A.jsx)("h1",{children:"Ingredients"}),a.ingredients.map((function(e){return Object(A.jsx)("p",{children:e})}))]}),Object(A.jsx)("div",{className:"recipeImg",children:Object(A.jsx)(w.a,{cloudName:"du119g90a",public_id:a.imageid})})]}),Object(A.jsx)("hr",{}),Object(A.jsxs)("div",{className:"directionsList",children:[Object(A.jsx)("h1",{children:"Directions"}),a.directions.map((function(e){return Object(A.jsx)("p",{children:e})}))]})]})})},ae=function(){var e=Object(u.useState)(""),t=Object(F.a)(e,2),n=t[0],c=t[1];return Object(A.jsxs)("div",{children:[Object(A.jsx)("input",{type:"file",onChange:function(e){c(e.target.files[0])}}),Object(A.jsx)("div",{children:n?Object(A.jsx)("img",{src:URL.createObjectURL(n),className:"imagepreview",alt:""}):Object(A.jsx)("h1",{children:"No Image"})}),Object(A.jsx)("button",{onClick:function(e){console.log(e[0]);var t=new FormData;t.append("file",n),t.append("upload_preset","yun8815z"),ee.a.post("https://api.cloudinary.com/v1_1/du119g90a/image/upload",t).then((function(e){console.log("response"),console.log(e),console.log("public ID"),console.log(e.data.public_id)}))},children:"Submit Images"})]})},ie=function(){return Object(A.jsx)("header",{className:"",children:Object(A.jsxs)("div",{className:"header",children:[Object(A.jsx)(y.b,{className:"",to:"/",children:Object(A.jsx)("h1",{className:"appTitle",children:"MyCookBook"})}),Object(A.jsx)("p",{className:"tagline",children:"Let's Turn Up the Heat!!"}),Object(A.jsxs)("div",{className:"dashboard",children:[Object(A.jsx)(y.b,{className:"",to:"/recipes",children:"Recipes"}),H.loggedIn()?Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(y.b,{className:"",to:"/add",children:"Add New Recipe"}),Object(A.jsx)(y.b,{className:"",to:"/myprofile",children:"My Cookbook"}),Object(A.jsx)(y.b,{className:"",onClick:function(e){e.preventDefault(),H.logout()},to:"/",children:"Logout"})]}):Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(y.b,{className:"",to:"/login",children:"Login"}),Object(A.jsx)(y.b,{className:"",to:"/signup",children:"Signup"})]})]})]})})},re=Object(h.a)({uri:"/graphql"}),se=Object(f.a)((function(e,t){var n=t.headers,c=localStorage.getItem("id_token");return{headers:Object(m.a)(Object(m.a)({},n),{},{authorization:c?"Bearer ".concat(c):""})}})),oe=new O.a({link:se.concat(re),cache:new x.a});var le=function(){return Object(A.jsx)(v.a,{client:oe,children:Object(A.jsxs)(y.a,{children:[Object(A.jsx)(ie,{}),Object(A.jsxs)("div",{className:"restofpage",children:[Object(A.jsx)(N.b,{exact:!0,path:"/",children:Object(A.jsx)(D,{})}),Object(A.jsx)(N.b,{exact:!0,path:"/login",children:Object(A.jsx)(G,{})}),Object(A.jsx)(N.b,{exact:!0,path:"/signup",children:Object(A.jsx)(K,{})}),Object(A.jsx)(N.b,{exact:!0,path:"/myprofile",children:Object(A.jsx)(V,{})}),Object(A.jsx)(N.b,{exact:!0,path:"/add",children:Object(A.jsx)(ne,{})}),Object(A.jsx)(N.b,{exact:!0,path:"/recipes",children:Object(A.jsx)(W,{})}),Object(A.jsx)(N.b,{exact:!0,path:"/recipes/:recipeId",children:Object(A.jsx)(ce,{})}),Object(A.jsx)(N.b,{exact:!0,path:"/pic",children:Object(A.jsx)(ae,{})})]})]})})},de=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,308)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),i(e),r(e)}))};g.a.render(Object(A.jsx)(b.a.StrictMode,{children:Object(A.jsx)(le,{})}),document.getElementById("root")),de()}},[[293,1,2]]]);
//# sourceMappingURL=main.cafe824b.chunk.js.map