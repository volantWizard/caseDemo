function jsonp(json){
		var toStr = Object.prototype.toString;
		var timer = null;
		
		var head = document.getElementsByTagName('head')[0];
		if(typeof head.onOff === 'undefined'){
			head.onOff = true;
		}
		
		var settings = {
			url:'',
			data:{},
			callback:'callback',
			fnName : 'jq_'+new Date().getTime(),
			succ:function(){},
			fail:function(){}
		}
		
		for(var attr in json){
			if(toStr.call(json[attr]) == toStr.call(settings[attr])){
				settings[attr] = json[attr];
			}
		}
		var oS = document.createElement('script');
		oS.className = 'os';
		settings.data[settings.callback] = settings.fnName;
		
		window[settings.fnName] = function (obj){
			var aS = head.getElementsByTagName('script');
			//只要成功就把之前的script都删掉。
			for(var i=0;i<aS.length;i++){
				if(aS[i].className == 'os'){
					head.removeChild(aS[i]);
					//因为aS为动态获取，所以要--;
					i--;
				}
			}
			head.onOff = true;
			settings.succ(obj);
		}
		var arr = [];
		for(var attr in settings.data){
			arr.push(attr +'='+ settings.data[attr]);
		}
		settings.data = arr.join('&');
		//console.log(settings.url+'?'+settings.data)
		oS.src = settings.url+'?'+settings.data;//拼接函数名
		
		head.appendChild(oS);
		/*
			fail 
		*/
		if(head.onOff){
			head.onOff = false;
			clearInterval(timer);
			timer = setTimeout(function(){
				var aS = head.getElementsByTagName('script');
				for(var i=0;i<aS.length;i++){
					if(aS[i].className == 'os'){
						clearInterval(timer);
						settings.fail();
						return;
					}
				}
			},4000);
		}
	}