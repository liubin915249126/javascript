function Calendar(parentId) {
	this.parentElement = document.getElementById(parentId);
	this.init();
}
Calendar.prototype = {
	init: function() {
		this.contains = document.createElement("div");
		this.contains.onselectstart = function(){return false};   //让按钮点击时不会出现文字被选中的蓝色块
		this.dateInput = document.createElement("input");
		this.datePicker = document.createElement("div");
		this.showDateBar = document.createElement("div");
		this.dateBox = document.createElement("div");
		this.icon = document.createElement("i");
		this.contains.className = 'datepicker-container';
		this.dateInput.className = 'date-input';
		this.dateInput.readOnly = true;
		var parent = this;
		this.dateInput.onclick = function(event){
			parent.onDateInputClick(event);            //点击日期框时显示日历                
		};
		this.contains.onblur = function(){
			parent.datePicker.style.display = 'none';
		}
		this.datePicker.className = 'date-picker';
		this.datePicker.style.display = 'none';
		this.showDateBar.className = 'show-date';
		this.dateBox.className = 'date-box';
		this.icon.className = 'date-icon';
		this.icon.innerHTML = '&#xe662;'; //iconfont
		this.datePicker.appendChild(this.showDateBar);
		this.datePicker.appendChild(this.dateBox);
		this.contains.appendChild(this.dateInput);
		this.contains.appendChild(this.icon);
		this.contains.appendChild(this.datePicker);
		this.parentElement.appendChild(this.contains);	
	},
	drawShowDateBar: function(parentElement){
		var parent = this;
		var nowDate = new Date();
		parentElement.date = nowDate;
		var nowYear = nowDate.getFullYear();
		var nowMonth = nowDate.getMonth();
		var nowDay = nowDate.getDate();
		//showDateBar内容拼接
		var contentStr ='<div class="year-input"><span>'+nowYear+'年</span><i class="select-year-btn">&#xe600;</i><ul class="year-select-box" style="display : none">';
		for(var i=0;i<150;i++){
			contentStr+='<li>'+(i+1900)+'年</li>';
		}
		contentStr+='</ul></div>'
					+'<div class="month-input"><i class="prev-month">&#xe601;</i><select class="months-options">'
		for(var i=0;i<12;i++){
			contentStr+='<option>'+(i+1)+'月</option>';
		}
		contentStr+='</select><i class="next-month">&#xe602;</i></div>'
					+'<div class="day-input"><i class="prev-day">&#xe601;</i><select class="days-options"></select>'
					+'<i class="next-day">&#xe602;</i></div>'
					+'<button class="today-btn">今天</button>'
					+'<div class="days-title">';
		var weekday = ['日', '一', '二', '三', '四', '五', '六'];
		for (var i = 0; i < 7; i++) {
	 		contentStr+='<span class="day-title">'+weekday[i]+'</span>';
		}
		contentStr+='</div>';
		parentElement.innerHTML = contentStr;
		this.changeShowDateBar(nowDate);   //插入到showTimeBar之后，初始化，传入的参数是现在的时间
		var yearInput = parentElement.firstChild;
		//年选择框点击显示和隐藏选择列表
		yearInput.onclick = function(){     //target和this的区别  target是触发事件的元素，this是处理事件的元素  
			var ul = this.lastChild;
			ul.style.display==='none'||ul.style.display==='none'? ul.style.display='inline-block':ul.style.display='none';
		};
		//为年选择下拉框绑定点击事件
		var yearSelectBox = yearInput.lastChild;
		var yearLi = yearSelectBox.children;
		for(var i=0;i<yearLi.length;i++){
			yearLi[i].onclick = function(){
				parent.showDateBar.date.setFullYear(this.innerText.slice(0,-1));
				parent.changeShowDateBar(parent.showDateBar.date);   //时间改变之后都要重新调用，因为不同年，不同月，某个月的天数不全一样
			};
		}
		//为month的前后按钮添加点击事件
		var monthInput = yearInput.nextSibling;
		monthInput.firstChild.onclick = function(){
			var monthOptions = this.nextSibling;
				if(monthOptions.selectedIndex>0){
					parent.showDateBar.date.setMonth(--monthOptions.selectedIndex);
				}else{
					monthOptions.selectedIndex = 11;
					parent.showDateBar.date.setFullYear(parent.showDateBar.date.getFullYear()-1);
					parent.showDateBar.date.setMonth(11);
				}
			parent.changeShowDateBar(parent.showDateBar.date);
		};
		monthInput.lastChild.onclick = function(){
			//console.log(parent.showDateBar.date.toLocaleDateString()+'click');
			var monthOptions = this.previousSibling;
			//var dayOptions = this.parentElement.nextSibling.firstChild.nextSibling;
			if(monthOptions.selectedIndex<11){
				parent.showDateBar.date.setMonth(++monthOptions.selectedIndex);
			}else{
				monthOptions.selectedIndex = 0;
				parent.showDateBar.date.setFullYear(parent.showDateBar.date.getFullYear()+1);
				parent.showDateBar.date.setMonth(0);
			}
			//console.log(parent.showDateBar.date.toLocaleDateString()+'click');
			parent.changeShowDateBar(parent.showDateBar.date);
			
		}
		monthInput.children[1].onchange = function(){
			parent.showDateBar.date.setMonth(this.selectedIndex);
			parent.changeShowDateBar(parent.showDateBar.date)
		};

		//为day的前后按钮添加点击事件
		var dayInput = monthInput.nextSibling;
		dayInput.firstChild.onclick = function(){
			var dayOptions = this.nextSibling;
			//var monthOptions = this.parentElement.previousSibling.firstChild.nextSibling;
			if(dayOptions.selectedIndex>0){
				parent.showDateBar.date.setDate(dayOptions.selectedIndex--);
				//parent.changeShowDateBar(parent.showDateBar.date);
			}else{
				parent.showDateBar.date.setMonth(parent.showDateBar.date.getMonth()-1);
				//console.log(parent.showDateBar.date.toLocaleDateString()+'dayclick');;
				parent.showDateBar.date.setDate(parent.getDaysOfMonth(parent.showDateBar.date));
				//dayOptions.selectedIndex = parent.getDaysOfMonth(parent.showDateBar.date)-1;
				//console.log(parent.showDateBar.date.toLocaleDateString()+'dayclick');;
			}
			parent.changeShowDateBar(parent.showDateBar.date);
			
		};
		dayInput.lastChild.onclick = function(){
			var dayOptions = this.previousSibling;
			//console.log(dayOptions.length-1);
			if(dayOptions.selectedIndex < dayOptions.length-1){
				dayOptions.selectedIndex++;
				//console.log(dayOptions.selectedIndex);
				parent.showDateBar.date.setDate(dayOptions.selectedIndex+1);	
			}else{
				parent.showDateBar.date.setDate(1);
				parent.showDateBar.date.setMonth(parent.showDateBar.date.getMonth()+1);	
			}
			parent.changeShowDateBar(parent.showDateBar.date);
		};
		dayInput.children[1].onchange = function(){
			parent.showDateBar.date.setDate(this.selectedIndex+1);
			parent.changeShowDateBar(parent.showDateBar.date)
		};
		//为今天按钮绑定点击事件
		var todayBtn = dayInput.nextSibling;
		todayBtn.onclick = function(){
			parent.drawPicker(new Date());
			parent.changeShowDateBar(new Date());
		}	
	},
	changeShowDateBar : function(date){
		//this.showDateBar.date = new Date(date);   //要将传入的date保存，因为下面调用的函数会改变date
		//console.log(date.toLocaleDateString()+'changeShowDateBar');
		var yearInput = this.showDateBar.firstChild;
		var monthInput = yearInput.nextSibling;
		var dayInput = monthInput.nextSibling;
		yearInput.firstChild.innerText = date.getFullYear()+'年';
		var monthsOptions = monthInput.firstChild.nextSibling;
		monthsOptions.selectedIndex = date.getMonth();
		var daysOptions = dayInput.firstChild.nextSibling;
		var days = this.getDaysOfMonth(date);
		var dayStr = '';
		for(var i=1;i<=days;i++){
			dayStr+='<option>'+i+'日</option>';
		}
		daysOptions.innerHTML = dayStr;
	//	console.log(date.toLocaleDateString()+'changeShowDateBar');
		daysOptions.selectedIndex = date.getDate()-1;
		this.drawPicker(date);
	},
	//绘制日期表
	drawPicker: function(primalDate) {
		var date = new Date(primalDate);  //要新建一个对象，因为会改变date
		var nowMonth = date.getMonth()+1;
		var nowDate = date.getDate();
		var spanContainer = [];
		var dateBox = this.dateBox;
		dateBox.innerHTML = '';
		var time = date.getTime();
		var days = this.getDaysOfMonth(date);  //计算出这个月的天数
		date.setDate(1);                       //将date的日期设置为1号
		var firstDay = date.getDay();          //知道这个月1号是星期几
		for (var i = 0; i < firstDay; i++) {   //如果1号不是周日(一周的开头),则在1号之前要补全
			var tempDate = new Date(date);
			tempDate.setDate(i - firstDay + 1);
			var span = document.createElement("span");
			span.className = "unshow";
			spanContainer.push({span : span, date : tempDate});
		}
		for (var i = 1; i <= days; i++) {       //1号到这个月最后1天
			var span = document.createElement("span");
			span.className = 'show';
			spanContainer.push({span : span, date : new Date(date)});
			date.setDate(i + 1);
		}
		for (var i = date.getDay(); i <= 6; i++) {  //在这个月最后一天后面补全
			var span = document.createElement("span");
			span.className = "unshow";
			spanContainer.push({span : span, date : new Date(date)});
			date.setDate(date.getDate()+1);
		}
		for(var i=0;i<spanContainer.length;i++){
			var spanBox = spanContainer[i];
			var span = spanBox.span;
			span.year = spanBox.date.getFullYear();  //为每个span元素添加表示时间的属性
			span.month = spanBox.date.getMonth() + 1;
			span.date = spanBox.date.getDate();
			span.innerText = spanBox.date.getDate();
			if(span.date === nowDate&&span.month === nowMonth)  //如果这个span的日期为与传入的日期匹配，设置类名为select
				span.className+=" select";
			var parent = this;
			span.onclick = function(){    //设置点击事件
				var target = event.target;
				var selected = target.parentElement.getElementsByClassName("select");
				for(var i=0 ;i<selected.length;i++){
					selected[i].className = selected[i].className.replace(" select","");
				};
				target.className+=" select";
				//console.log(spanBox.date);   //这已经是闭包问题了
				parent.changeDate(target.year, target.month, target.date); //陷阱 changeDate调用时spanContainer[i].date，i这个变量已经是出界了的
				/*if(target.className.indexOf("unshow")!==-1){
					parent.drawPicker(new Date(target.year, target.month-1, target.date)); //如果点击非本月的日期，则重绘日历表
				}*/
				parent.changeShowDateBar(new Date(target.year, target.month-1, target.date));	
			};
			dateBox.appendChild(span);  //将span添加到dateBox中
		}
		//console.log(primalDate.toLocaleDateString()+'drawPicker');
		this.changeDate(primalDate.getFullYear(), primalDate.getMonth()+1, primalDate.getDate())
		return;

	},
	//计算一个月的天数
	getDaysOfMonth: function(primalDate) {
		var date = new Date(primalDate);  //要新建一个对象，因为会改变date
		var month = date.getMonth();
		var time = date.getTime();        //计算思路主要是month+1,相减除一天的毫秒数
		var newTime = date.setMonth(month + 1);
		return Math.ceil((newTime - time) / (24 * 60 * 60 * 1000));
	},
	//日期框点击时显示日历
	onDateInputClick: function(event) {  
		var target = event.target;
		var value = target.value;
		var datePicker = this.datePicker;
		if(datePicker.style.display==='none'){   //这里必须要在js文件里将datePicker.style.display设置为none，如果是在css文件里设置为none,得到的display为""
			datePicker.style.display = 'block';
		}else{
			datePicker.style.display = 'none';
			return; 
		}
		if (!value) this.drawShowDateBar(this.showDateBar);  //绘制日历的显示栏 
	},
	changeDate : function(year, month, date){
		this.dateInput.value = year+"-"+(month<10?("0"+month):month)+"-"+(date<10?("0"+date):date);
	},
	parseDateFormat: function(value) {
	},
	dateFormat: function() {
	},
}
var calendar = new Calendar("root");