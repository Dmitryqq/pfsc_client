(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f08a18d2"],{"3eb4":function(e,t,i){},7262:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"filetypes view"},[e.isLoading?i("Loader"):i("div",[e.error?i("div",{staticClass:"alert alert-danger",attrs:{role:"alert"}},[e._v("\n            "+e._s(e.error)+"\n        ")]):e._e(),e.success?i("div",{staticClass:"alert alert-success"},[e._v("\n            "+e._s(e.success)+"\n        ")]):e._e(),i("table",{staticClass:"table table-sm table-responsive"},[i("thead",[i("tr",[i("th",[e._v("№")]),i("th",[e._v("Название")]),i("th",[e._v("Макс.размер")]),i("th",[e._v("Обяз.")]),i("th",[e._v("Типы")]),i("th",[e._v("Макс.к-во")]),i("th",[e._v("EAA*")]),i("th",[e._v("Роль")]),i("th"),i("th")])]),e._l(e.typeOfFiles,function(t){return i("tr",{key:t.id},[i("td",[e._v(e._s(t.id))]),e.editMode&&t.id==e.selectedFiletype.id?i("td",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"typeOfFile.name"}],staticClass:"form-control form-control-sm",attrs:{type:"text"},domProps:{value:t.name},on:{input:function(i){i.target.composing||e.$set(t,"name",i.target.value)}}})]):i("td",[e._v(e._s(t.name))]),e.editMode&&t.id==e.selectedFiletype.id?i("td",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.maxSize,expression:"typeOfFile.maxSize"}],staticClass:"form-control form-control-sm",attrs:{type:"number",min:"1",max:"50"},domProps:{value:t.maxSize},on:{input:function(i){i.target.composing||e.$set(t,"maxSize",i.target.value)}}})]):i("td",[e._v(e._s(t.maxSize))]),e.editMode&&t.id==e.selectedFiletype.id?i("td",[i("div",{staticClass:"form-check text-center"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.required,expression:"typeOfFile.required"}],staticClass:"form-check-input position-static",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.required)?e._i(t.required,null)>-1:t.required},on:{change:function(i){var s=t.required,a=i.target,r=!!a.checked;if(Array.isArray(s)){var n=null,l=e._i(s,n);a.checked?l<0&&e.$set(t,"required",s.concat([n])):l>-1&&e.$set(t,"required",s.slice(0,l).concat(s.slice(l+1)))}else e.$set(t,"required",r)}}})])]):i("td",[e._v(e._s(t.required))]),e.editMode&&t.id==e.selectedFiletype.id?i("td",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.types,expression:"typeOfFile.types"}],staticClass:"form-control form-control-sm",attrs:{type:"text"},domProps:{value:t.types},on:{input:function(i){i.target.composing||e.$set(t,"types",i.target.value)}}})]):i("td",[e._v(e._s(t.types))]),e.editMode&&t.id==e.selectedFiletype.id?i("td",[i("input",{directives:[{name:"model",rawName:"v-model",value:t.maxAmount,expression:"typeOfFile.maxAmount"}],staticClass:"form-control form-control-sm",attrs:{type:"number",min:"1",max:"50"},domProps:{value:t.maxAmount},on:{input:function(i){i.target.composing||e.$set(t,"maxAmount",i.target.value)}}})]):i("td",[e._v(e._s(t.maxAmount))]),e.editMode&&t.id==e.selectedFiletype.id?i("td",[i("div",{staticClass:"form-check text-center"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.enableAfterAccept,expression:"typeOfFile.enableAfterAccept"}],staticClass:"form-check-input position-static",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.enableAfterAccept)?e._i(t.enableAfterAccept,null)>-1:t.enableAfterAccept},on:{change:function(i){var s=t.enableAfterAccept,a=i.target,r=!!a.checked;if(Array.isArray(s)){var n=null,l=e._i(s,n);a.checked?l<0&&e.$set(t,"enableAfterAccept",s.concat([n])):l>-1&&e.$set(t,"enableAfterAccept",s.slice(0,l).concat(s.slice(l+1)))}else e.$set(t,"enableAfterAccept",r)}}})])]):i("td",[e._v(e._s(t.enableAfterAccept))]),e.editMode&&t.id==e.selectedFiletype.id?i("td",[i("div",{staticClass:"form-group"},[i("select",{directives:[{name:"model",rawName:"v-model",value:t.roleId,expression:"typeOfFile.roleId"}],staticClass:"form-control form-control-sm",on:{change:function(i){var s=Array.prototype.filter.call(i.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(t,"roleId",i.target.multiple?s:s[0])}}},[i("option",{attrs:{disabled:"",value:""}},[e._v("Роль")]),e._l(e.roles,function(t){return i("option",{key:t.id,domProps:{value:t.id}},[e._v("\n                            "+e._s(t.roleName)+"\n                        ")])})],2)])]):i("td",[e._v(e._s(t.role.roleName))]),e.editMode&&t.id==e.selectedFiletype.id?i("td",[i("span",{staticClass:"icon-btn"},[i("i",{staticClass:"fas fa-save",staticStyle:{"margin-left":"2px"},on:{click:function(i){return e.updateFiletype(t)}}}),i("i",{staticClass:"fas fa-times",staticStyle:{"margin-left":"23px"},on:{click:e.disableEditMode}})])]):i("td",[i("span",{staticClass:"icon-btn"},[i("i",{staticClass:"fas fa-edit",on:{click:function(i){return e.enableEditMode(t)}}}),i("i",{staticClass:"fas fa-trash",staticStyle:{"margin-left":"20px"},on:{click:function(i){return e.deleteFiletype(t)}}})])])])}),i("tr",[i("td"),i("td",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.typeOfFile.name,expression:"typeOfFile.name"}],staticClass:"form-control form-control-sm",attrs:{type:"text"},domProps:{value:e.typeOfFile.name},on:{input:function(t){t.target.composing||e.$set(e.typeOfFile,"name",t.target.value)}}})]),i("td",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.typeOfFile.maxSize,expression:"typeOfFile.maxSize"}],staticClass:"form-control form-control-sm",attrs:{type:"number",min:"1",max:"50"},domProps:{value:e.typeOfFile.maxSize},on:{input:function(t){t.target.composing||e.$set(e.typeOfFile,"maxSize",t.target.value)}}})]),i("td",[i("div",{staticClass:"form-check text-center"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.typeOfFile.required,expression:"typeOfFile.required"}],staticClass:"form-check-input position-static",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.typeOfFile.required)?e._i(e.typeOfFile.required,null)>-1:e.typeOfFile.required},on:{change:function(t){var i=e.typeOfFile.required,s=t.target,a=!!s.checked;if(Array.isArray(i)){var r=null,n=e._i(i,r);s.checked?n<0&&e.$set(e.typeOfFile,"required",i.concat([r])):n>-1&&e.$set(e.typeOfFile,"required",i.slice(0,n).concat(i.slice(n+1)))}else e.$set(e.typeOfFile,"required",a)}}})])]),i("td",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.typeOfFile.types,expression:"typeOfFile.types"}],staticClass:"form-control form-control-sm",attrs:{type:"text"},domProps:{value:e.typeOfFile.types},on:{input:function(t){t.target.composing||e.$set(e.typeOfFile,"types",t.target.value)}}})]),i("td",[i("input",{directives:[{name:"model",rawName:"v-model",value:e.typeOfFile.maxAmount,expression:"typeOfFile.maxAmount"}],staticClass:"form-control form-control-sm",attrs:{type:"number",min:"1",max:"50"},domProps:{value:e.typeOfFile.maxAmount},on:{input:function(t){t.target.composing||e.$set(e.typeOfFile,"maxAmount",t.target.value)}}})]),i("td",[i("div",{staticClass:"form-check text-center"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.typeOfFile.enableAfterAccept,expression:"typeOfFile.enableAfterAccept"}],staticClass:"form-check-input position-static",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.typeOfFile.enableAfterAccept)?e._i(e.typeOfFile.enableAfterAccept,null)>-1:e.typeOfFile.enableAfterAccept},on:{change:function(t){var i=e.typeOfFile.enableAfterAccept,s=t.target,a=!!s.checked;if(Array.isArray(i)){var r=null,n=e._i(i,r);s.checked?n<0&&e.$set(e.typeOfFile,"enableAfterAccept",i.concat([r])):n>-1&&e.$set(e.typeOfFile,"enableAfterAccept",i.slice(0,n).concat(i.slice(n+1)))}else e.$set(e.typeOfFile,"enableAfterAccept",a)}}})])]),i("td",[i("div",{staticClass:"form-group"},[i("select",{directives:[{name:"model",rawName:"v-model",value:e.typeOfFile.roleId,expression:"typeOfFile.roleId"}],staticClass:"form-control form-control-sm",on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(e.typeOfFile,"roleId",t.target.multiple?i:i[0])}}},[i("option",{attrs:{disabled:"",value:""}},[e._v("Роль")]),e._l(e.roles,function(t){return i("option",{key:t.id,domProps:{value:t.id}},[e._v("\n                            "+e._s(t.roleName)+"\n                        ")])})],2)])]),i("td",[i("button",{staticClass:"btn btn-sm btn-primary",attrs:{type:"submit"},on:{click:e.addFiletype}},[e._v("Добавить")])])])],2),i("p",{staticClass:"text-center"},[e._v("*EAA(enableAfterAccept) - поле, отвечающее за возможность добавления файла после подтверждения наката")])])],1)},a=[],r=(i("7f7f"),i("555f")),n={components:{Loader:r["a"]},data:function(){return{typeOfFile:{name:"",maxSize:"",required:"",types:"",maxAmount:"",enableAfterAccept:"",roleId:""},isLoading:!1,success:null,error:null,editMode:!1,selectedFiletype:{}}},computed:{typeOfFiles:function(){return this.$store.state.typeOfFiles.typeOfFiles},roles:function(){return this.$store.state.roles.roles}},created:function(){this.getTypeOfFiles(),this.getRoles()},methods:{getTypeOfFiles:function(){var e=this;this.isLoading=!0,this.$store.dispatch("typeOfFiles/getTypeOfFiles").catch(function(t){e.error=t.message}).finally(function(){e.isLoading=!1})},getRoles:function(){var e=this;this.isLoading=!0,this.$store.dispatch("roles/getRoles").catch(function(t){e.isLoading=!1,e.error=t.message}).finally(function(){e.isLoading=!1})},addFiletype:function(){var e=this;this.error=null,this.typeOfFile.name.length>0&&this.typeOfFile.maxSize.length>0&&this.typeOfFile.types.length>0&&this.typeOfFile.maxAmount.length>0&&0!=this.typeOfFile.roleId&&this.$store.dispatch("typeOfFiles/addTypeOfFile",this.typeOfFile).then(function(){e.showSuccess("Тип файлов успешно добавлен"),e.clearForm()}).catch(function(t){e.error=t.message})},deleteFiletype:function(e){var t=this;confirm("Подтвердите удаление типа '"+e.name+"'")&&this.$store.dispatch("typeOfFiles/deleteTypeOfFile",e.id).then(function(){t.error=null,t.showSuccess("Тип файлов успешно удален")}).catch(function(e){t.error=e.message})},updateFiletype:function(e){var t=this;confirm("Подтвердите обновление типа '"+e.name+"'")&&this.$store.dispatch("typeOfFiles/updateTypeOfFile",e).then(function(){t.showSuccess("Тип файлов успешно обновлен")}).catch(function(e){t.error=e.message}),this.editMode=!1},clearForm:function(){this.typeOfFile.name="",this.typeOfFile.maxSize="",this.typeOfFile.required=!1,this.typeOfFile.types="",this.typeOfFile.maxAmount="",this.typeOfFile.enableAfterAccept=!1,this.typeOfFile.roleId=null},enableEditMode:function(e){this.editMode=!0,this.selectedFiletype.id=e.id},disableEditMode:function(){this.editMode=!1},showSuccess:function(e){var t=this;this.success=e,setTimeout(function(){t.success=null},3e3)}}},l=n,o=(i("7479"),i("2877")),c=Object(o["a"])(l,s,a,!1,null,"59662c08",null);t["default"]=c.exports},7479:function(e,t,i){"use strict";var s=i("3eb4"),a=i.n(s);a.a}}]);
//# sourceMappingURL=chunk-f08a18d2.60328c15.js.map