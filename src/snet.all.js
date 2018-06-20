$net={
	//core
	root_path:( (typeof root_path!='undefined' && root_path)?root_path:'lib' ),
	ver:( (typeof snet_ver!='undefined' && snet_ver)?snet_ver:'' ),
	dom:jQuery,
	tpl:Handlebars,
	view:{},
	loader:{},
	//data
	data:{},
	//components
	cmp:{}
};
$net.ready=function(fn){
	$net.onready=fn||function(){};
};
window.onload=function(){
	if($net.onready){
		$net.onready();
		$net.onready=null;
		delete $net.onready;
	}
};
$net.loader.import=function(fileurl){
	$.ajax({type: "GET",url: fileurl,async: false});
};
$net.loader.css=function(fileurl){
	filenode = document.createElement('link');
	filenode.type = "text/css";
	filenode.rel = 'stylesheet';
	filenode.href=fileurl;
	document.head.appendChild(filenode);
};
$net.loader.require=function(fileurl,callback){
	$.ajax({
		type: "GET",
		url: fileurl,
		success:function(result){
			callback();
		}
	});
};
$net.dialog=function (view){
	if(!view){
		try{
			$("#mask").remove();
			$("#maskbody").remove();
			$('.to-blur').removeClass('active');
		}catch (e) {
			alert(e)
		}
		return;
	}
	$(document.body).append("<div id='mask'></div>");
	$("#mask" ).css({
		"z-index":5000,
		"background": "none repeat scroll 0 0 #000",
		"height": "100%",
		"left": "0px",
		"opacity": "0.70",
		"position": "fixed",
		"top": "0px",
		"width": "100%"
	});
	$(document.body).append("<div id='maskbody'></div>");
	$("#maskbody").append(view);
	var ch=$("#maskbody :first-child").height();
	var cw=$("#maskbody :first-child").width();
	var top=50;//(($(document).height()-$("#maskbody").height())/2)-(0.8*(($(document.body).height()-$("#maskbody").height())/2));
	var left=($(document).width()/2- cw/2);
	console.log(cw)
	$("#maskbody").css({
		"width":cw,
		"height":ch,
		"position":"fixed",
		"top":top+"px",
		"left":left+"px",
		"margin":"auto",
		"z-index":5001,
		"box-shadow":"1px 1px 6px #000"
	});

	//$("#maskbody").draggable();

	$("#mask, a.close").click(function() {
		$("#mask").fadeOut( 300, function(){$("#mask").remove()} );
		$("#maskbody").fadeOut( 300, function(){$("#maskbody").remove()} );
		$('.to-blur').removeClass('active');
	});
	$('.to-blur').addClass('active');
	try{$("#maskbody input").first().focus();}catch(e){}
}
$net.mask=function(action){
	if(!action){
		$(document.body).append("<div id='mask'></div>");
		$(document.body).append("<div id='maskbody'></div>");
		$("#mask, a.close").click(function() {
			$("#mask").fadeOut( 300, function(){$("#mask").remove()} );
			$("#maskbody").fadeOut( 300, function(){$("#maskbody").remove()} );
		});
		try{$("#maskbody input").first().focus();}catch(e){}
	}
	$("#mask" ).css({
		"z-index":1000,
		"background": "none repeat scroll 0 0 #000",
		"height": "100%",
		"left": "0px",
		"opacity": "0.65",
		"position": "fixed",
		"top": "0px",
		"width": "100%",
		"z-index": "2000"
	});
	var ch=$("#maskbody :first-child").height();
	var cw=$("#maskbody :first-child").width();
	var top=55;//(($(document).height()-$("#maskbody").height())/2)-(0.5*(($(document.body).height()-$("#maskbody").height())/2));
	var left=($(document).width()/2- cw/2);

	$("#maskbody").css({
		"width":cw,
		"height":ch,
		"position":"fixed",
		"top":top+"px",
		"left":left+"px",
		"margin":"auto",
		"z-index":2001
	});
}
$net.modal={};
$net.modal.show=function(view){
	if(!view){
		try{
			$("#mask-modal").remove();
			$("#maskbody-modal").remove();
		}catch (e) {
			alert(e)
		}
		return;
	}
	$(document.body).append("<div id='mask-modal'></div>");
	$("#mask-modal" ).css({
		"z-index":1000,
		"background": "#fff",
		"height": "100%",
		"left": "0px",
		"opacity": "0.333",
		"position": "fixed",
		"top": "0px",
		"width": "100%",
		"z-index": "2000"
	});
	$(document.body).append("<div id='maskbody-modal'></div>");
	$("#maskbody-modal").append(view);
	var ch=$("#maskbody-modal :first-child").height();
	var cw=$("#maskbody-modal :first-child").width();
	var top=50;
	var left=240;

	$("#maskbody-modal").css({
		"position":"fixed",
		"top":top+"px",
		"left":left+"px",
		"margin":"auto",
		"z-index":2001,
		"background-color":"#fefefe",
		"box-shadow":"0 4px 16px rgba(0, 0, 0, 0.2)",
		"border":"1px solid rgba(0, 0, 0, 0.333)",

		"padding":"10px",
		"min-height":"250px",
		"min-width":"500px"
	});

	//$("#maskbody").draggable();

	$("#mask-modal, a.close").click(function() {
		$("#mask-modal").fadeOut( 300, function(){$("#mask-modal").remove()} );
		$("#maskbody-modal").fadeOut( 300, function(){$("#maskbody-modal").remove()} );
	});
	try{$("#maskbody-modal input").first().focus();}catch(e){}
}
$net.modal.hide=function(){
	$("#mask-modal").fadeOut( 300, function(){$("#mask-modal").remove()} );
	$("#maskbody-modal").fadeOut( 300, function(){$("#maskbody-modal").remove()} );
}
$net.category={};
$net.category.show=function(id,view){
	$net.category.isshow=true;
	$("#mask-modal-cat1").remove();
	$("#mask-modal-cat2").remove();
	//$("#mask-modal-cat3").remove();
	$("#maskbody-modal-cat").remove();
	$(document.body).append("<div id='mask-modal-cat1'></div>");
	$(document.body).append("<div id='mask-modal-cat2'></div>");
	//$(document.body).append("<div id='mask-modal-cat3'></div>");
	$("#mask-modal-cat1" ).css({

	});
	/*$("#mask-modal-cat3" ).css({
		"background": "#000",
		"left": "0px",top:($(id).height()+60),bottom:0,right:0,
		"opacity": "0.2",
		"position": "fixed",
		"width": "100%",
		"z-index": "2000"
	});*/
	$("#mask-modal-cat2" ).css({

	});
	$(document.body).append("<div id='maskbody-modal-cat'></div>");
	$("#maskbody-modal-cat").append(view);

	$("#maskbody-modal-cat").css({
		left:($("#catlist").offset().left + $("#catlist").width())
	});
	$("#mask-modal-cat2").css({
		left:($("#catlist").offset().left + $("#catlist").width())
	});
	$("#mask-modal-cat1,#mask-modal-cat2,#mask-modal-cat3, a.close").click(function() {
		$net.category.isshow=false;
		$("#mask-modal-cat1").fadeOut( 300, function(){$("#mask-modal-cat1").remove()} );
		$("#mask-modal-cat2").fadeOut( 300, function(){$("#mask-modal-cat2").remove()} );
		$("#mask-modal-cat3").fadeOut( 300, function(){$("#mask-modal-cat3").remove()} );
		$("#maskbody-modal-cat").fadeOut( 300, function(){$("#maskbody-modal-cat").remove()} );
	});
}
$net.category.hide=function(){
	$net.category.isshow=false;
	$("#mask-modal-cat1").remove();
	$("#mask-modal-cat2").remove();
	$("#mask-modal-cat3").remove();
	$("#maskbody-modal-cat").remove();
}
$net.msg={
		length:0,
		timeout:null,
		utimeout:null,
		note:function(msg){
			if($("#snet-msg-container").length==0){
				$(document.body).append("<div id='snet-msg-container'><b>Notification</b><i class='fa fa-close close'></i></div>");
				$("#snet-msg-container .close").click(function(){
					$("#snet-msg-container").remove();
					for(var i=0;i<$net.msg.length ; i++){
						clearTimeout($net.msg.timeout);
					}
				});
			}
			$("#snet-msg-container").append("<div class='snet-msg-"+$net.msg.length+"'>"+msg+"</div>");
			clearTimeout($net.msg.timeout);
			$net.msg.timeout=setTimeout(function(){
				$("#snet-msg-container").remove();
			},10000);
			$net.msg.length++;
		},
		alert:function(msg){

		},
		user:function(msg){
			clearTimeout($net.msg.utimeout);
			$("#user_notification").html("<span>"+msg+"</span>");
			$("#user_notification").off('mouseleave');
			$("#user_notification").off('mouseenter');

			$net.msg.utimeout=setTimeout(function(){
				$("#user_notification").html('');
			},7000);

			$("#user_notification").on('mouseenter',function(){
				clearTimeout($net.msg.utimeout);
			});
			$("#user_notification").on('mouseleave',function(){
				$net.msg.utimeout=setTimeout(function(){
					$("#user_notification").html('');
				},7000);
			});
		}
}
$net.view={
	//params :
	//@tpl : template to use for this view
	//@data : data to add
	//@renderTo: dom or string or $() el to append this view
	create:function(config){
		var tpl=config.tpl || undefined;//|| function(){return false;}
		if(tpl){
			if(typeof tpl=='string'){
				tpl=$net.tpl.compile(tpl);
			}else if (typeof tpl=='function'){
				//its ok
			}else{
				//error
				tpl=function(){return false;};
			}
		}else{
			//try url;
			if(config.url){
				var result=$.ajax({
					type: "GET",async:false,
					url: config.url
				}).responseText;
				if(result){
					tpl=$net.tpl.compile(result);
				}else{
					//error
					tpl=function(){return false;};
				}
			}else if(config.path && config.stype){
				tpl=$net.tpl.compile( $(config.path).contents().find('#s-template-'+ config.stype).html() );

			}else{
				//error
				tpl=function(){return false;};
			}
		}

		//view data
		if(config.appendTo){
			var dom=$(config.appendTo);
			var data=config.data || {};
			dom=dom||$(document.body);
			//if(dom){
				return dom.append(tpl(data));
			//}else{
			//	$(document.body).append(tpl(data));
			//}
		}else if(config.renderTo){
			var dom=$(config.renderTo);
			var data=config.data || {};
			dom=dom||$(document.body);
			//if(dom){
				return dom.html(tpl(data));
			//}else{
			//	$(document.body).append(tpl(data));
			//}
		}else{
			var data=config.data||{};
			return tpl(data);
		}
	},
	//cmp views
	cmpId:100,
	tplConstructors:{},
	cmp:function(name,config){
		var tplConstructor;
		if(!config && typeof name=='object'){
			config=name;name=config.stype;
		}
		name=name.toLowerCase();
		if(this.tplConstructors[name]){
			tplConstructor=this.tplConstructors[name];
		}else{
			tplConstructor=$net.tpl.compile( $('#snet-html-cmp-out').contents().find('#s-template-'+ name).html() );
			this.tplConstructors[name]=tplConstructor;
		}

		if(tplConstructor != undefined && typeof tplConstructor=='function'){}else{tplConstructor=$net.tpl.compile("<div></div>"); }
		config.tpl=tplConstructor;
		config.stype=name;
		if(!config.appendTo && !config.renderTo){
			return $net.view.create(config);
		}
		return new this.cmpConstructor(config);
	},
	loadTpl:function(name,force,callback){
		if(force || !this.tplConstructors[name]){
			var me=this;
			$.get($net.root_path+'/snet/resources/html/components/'+name+'.cmp/'+name+'.cmp.html?1',function(r){
				me.tplConstructors[name]=$net.tpl.compile(r);
				if(callback && typeof callback=='function'){
					callback();
				}
			});
		}
	},
	generateCmpId:function(){
		return 'scmp_'+ (++$net.view.cmpId) +'';
	},
	cmpConstructor:function(config){
		var cfg_view={
				tpl:config.tpl,
				renderTo:(config.renderTo) || false,
				appendTo:(config.appendTo) || false,
				data:{}
		};
		//data of cmp render to template
		//id,style,store,scope
		cfg_view.data.id=config.id||$net.view.generateCmpId();
		if(config.style && typeof config.style == 'string'){
			cfg_view.data.style=config.style;
		}else if(config.style && typeof config.style=='object'){
			cfg_view.data.style="";
			console.log(config.style);
			for(var style_attr in config.style){
				cfg_view.data.style += (" "+style_attr+":"+config.style[style_attr]+";" );
			}
		}else{
			cfg_view.data.style="";
		}
		cfg_view.data.store=new $net.data.Store({
			model:(new $net.data.Model({fields:[{name:'id',type:"string"}]})),
			data:config.data || []
		});
		cfg_view.data.scope=config.scope||{}
		var dom=$net.view.create(cfg_view);

		dom=$(dom);
		var id_cmp=this.id=cfg_view.data.id;
		this.dom=dom;
		this.stype=config.stype;
		console.log(id_cmp);
		//events
		for(var piece in config.events){
			//piece is elements of components
			var t=$('#'+id_cmp+' .s-cmp-'+this.stype+'-event-'+piece,dom);
			for(var event_name in config.events[piece]){
				var userfn=config.events[piece][event_name];
				t.on(event_name,(function(userfn){
					return function(e){
						var id=this.id||id_cmp||'';console.log(dom);
						var r=userfn.call(this,e,id);

						if(r===false){
							e.stopPropagation();
						}
					};
				})(userfn));
			}
		}
		//onrender
		if(config.onrender && typeof(config.onrender)=='function'){
			config.onrender();
		}
	},
	ucmp:function(name,config){
		var tplConstructor,path;
		if(!config && typeof name=='object'){
			config=name;name=config.stype;
		}
		name=name.toLowerCase();
		if(this.tplConstructors[name]){
			tplConstructor=this.tplConstructors[name];
		}else{
			if(config.path) {
				path=config.path;
			}else{
				path='#snet-html-user-out';
			}
			//console.log(config);
			tplConstructor=$net.tpl.compile( $(path).contents().find('#s-template-'+ name).html() );

			this.tplConstructors[name]=tplConstructor;
		}

		if(tplConstructor != undefined && typeof tplConstructor=='function'){}else{tplConstructor=$net.tpl.compile("<div></div>"); }
		config.tpl=tplConstructor;
		config.stype=name;
		if(!config.appendTo && !config.renderTo){
			config.renderTo=document.body;
		}
		return new this.cmpConstructor(config);
	}
};
/*DATA STORE*/
$net.data={
	Model:function(object){
		this.fields=[];
		this.create=function(o){
			var createrConstructor=function (data){
				this.data=data;
				//this.get=function(p){return this.data[p];};//
			};
			var data=[];
			var i=null;

			for(i in o){
				if(this.fields[i]){
					data[i]=o[i];
				}else{
					data[i]=o[i];
				}

			}
			/*ls.data=data;
				ls.get=function(f){
					return this.data[f];
				}
				return {
					data:data,
					get:function(f){
						return this.data[f]
					}
				}//ls;//*/
			return new createrConstructor(data);

		};
		if(object && object.fields && typeof object.fields[0]=="string" ){
			var fName=null;
			for( fName in object.fields){
				this.fields[object.fields[fName]]="string";
			}
		}else if(object && object.fields && typeof object.fields[0]=="object" ){
			var fObj=null,obj=null;

			for (fObj in object.fields){
				obj=object.fields[fObj];
				if(obj.name && obj.type){
					this.fields[obj.name]=obj.type;
				}else if(obj.name && !obj.type){
					this.fields[obj.name]="string";
				}else {
					console.log("vendos ne rregull te dhenat");
				}
			}
		}else{//asgje
		}
	},
	Store:function (store){
		var j=0;
		var data=[];

		if(store && store.model && typeof store.model=="object" && typeof store.data[0]=="object"){
			this.model=store.model;
			var mod=store.model;
			var d,x;
			for(i in store.data){
				d=store.data[i];
				x=mod.create(d);
				data[j]=x;
				j++;
			}
		}

		this.getAt=function (i){
			return data[i];
		};
		this.get=function(){
			return data;
		};
		this.findBy=function (f,v){
			for(i in data){
				if(data[i].data[f]==v){
					return data[i];
				}
			}
		};
		this.getCount=function(){
			return (data.length);
		};
		this.add=function(o){
			data[j]=this.model.create(o);
			j++;
		};
		this.each=function(f){
			for(j in data){
				f(data[j]);
			}
		};
		this.data=data;
	}
};
$net.cmp={
	create:function(name,config){
		var cmp=$net.view.cmp(name,config);
		var elem=$('#'+cmp.id,cmp.dom);
		if(window['s_cmp_'+cmp.stype]){
			window['s_cmp_'+cmp.stype].call(window,cmp,elem);
		}else{
			$net.loader.require($net.root_path+'/snet/js/cmp/components/src/'+cmp.stype+'.js',function(){
				window['s_cmp_'+cmp.stype].call(window,cmp,elem);
			});
		}
	}
};
