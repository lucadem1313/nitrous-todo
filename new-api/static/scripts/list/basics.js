var listInfo = {
	id:1,
	title:"To-Do",
	items:[
		{id:0, 	done:false, 	priority:"normal", 		title:"Item 1", 	text:"Here is something to do!", 		number:1},
		{id:0, 	done:true, 		priority:"normal", 		title:"Item 2", 	text:"Here is something I've done!",	number:2},
		{id:0, 	done:false, 	priority:"important",	title:"Item 3", 	text:"Here is something important!", 	number:3}
	]
};

function readList(){
	var returnData = {};
	items = [];

	returnData.id = $("#list").data("id");
	returnData.title = $("#list-menu h1 input").val();

	$("#list ul li").each(function(key){
		element = $(this);
		var tmpObj = {};
		tmpObj.done = element.hasClass("done") ? true : false;

		if(element.hasClass("important")) tmpObj.priority = "important";
		else if(element.hasClass("moderate")) tmpObj.priority = "moderate";
		else tmpObj.priority = "normal";

		tmpObj.title = element.find(".item-title input").val();
		tmpObj.text = element.find(".item-text input").val();
		tmpObj.number = key;

		items.push(tmpObj);
	});
  returnData.items = items;
	return returnData;
}
function createList(list){

	$("#list").data("id", list.id).attr("data-id", list.id);
	$("#list-menu h1 input").val(list.title);

	list.items.sort(function(a, b){
	 return a.number-b.number
	});

	$("#list ul").empty();
	$.each(list.items, function(key, value){
		doneText = value.done ? "done" : "";
		readOnlyText = value.done ? "readonly" : "";
		checkedText = value.done ? "checked" : "";
		$("#list ul").append('\
		<li data-id="'+value.id+'" class="list-item '+value.priority+' '+ doneText +'">\
			<div class="item-dots"></div>\
			<div class="item-done"><div class="checkbox '+ checkedText +'" title="Toggle Completeness"></div></div>\
			<div class="item-title"><input type="text" class="text-input" value="'+value.title+'" '+ readOnlyText +' maxlength="100"></div>\
			<div class="item-text"><input type="text" class="text-input" value="'+value.text+'" '+ readOnlyText +'></div>\
			<div class="item-actions">\
				<div title="Change Importance" class="actions-importance"><img src="/static/images/menulines.png" alt="Change Importance"></div><div title="Remove Item" class="actions-remove"><img src="/static/images/trashbin.png" alt="Delete"></div>\
			</div>\
			<div class="importance-select">\
				<div class="select-normal">Normal</div>\
				<div class="select-moderate">Moderate</div>\
				<div class="select-important">Important</div>\
			</div>\
		</li>');
	});
}
function updateItemPlugins(){
	$( "#list ul" ).sortable({
		zIndex:9999,
		opacity:1,
		cursorAt: {top: 10, left: 10},
		helper:"clone",
		handle: ".item-dots",
		placeholder: "sortable-placeholder"
		// start: function(e, ui)
		// {
		// 	$(ui.helper).addClass("ui-draggable-helper");
		// 	$("body").addClass("dragging");
		// }
	});
	$("*:not(.item-actions) > *[title]:not(.tooltipstered):not(.checkbox)").tooltipster({
		animation: 'fade',
		theme: 'tooltipster-borderless',
		animationDuration: 200,
		delay: 0,
		distance: 2
	});
	// $(".list-item:last-of-type .item-actions div").tooltipster({
	// 	animation:'fade',
	// 	animationDuration:0,
	// 	side:'left'
	// });
}


$("body").on("click", ".actions-importance", function(){
	element = $(this).parents(".list-item:not(.menu-open)");
	$(".list-item").removeClass("menu-open");
	$(".importance-select").removeClass("active");
	element.addClass("menu-open");
	element.find(".importance-select").addClass("active");
	updateItemPlugins();
});
$(document).click(function(){
	if($(".actions-importance:hover, .importance-select:hover").length == 0)
	{
		$(".list-item").removeClass("menu-open");
		$(".importance-select").removeClass("active");
	}
});




function loginPage(){
	fancyModal({
		background:"#ededed",
		animationStyle:"popup",
		content:'<div id="forms">\
		<form id="login-form">\
			<h1>Login</h1>\
			<input type="text" id="login-username" placeholder="Username">\
			<input type="password" id="login-password" placeholder="Password">\
			<button>Login</button>\
		</form>\
		<form id="signup-form">\
			<h1>Signup</h1>\
			<input type="text" id="signup-username" placeholder="Username">\
			<input type="email" id="signup-email" placeholder="Email">\
			<input type="password" id="signup-password" placeholder="Password">\
			<input type="password" id="signup-repeatpassword" placeholder="Repeat Password">\
			<button>Sign Up</button>\
		</form>\
	</div>'
	});
}

$("body").on("submit", "#login-form", function(e){
	e.preventDefault();
	closeFancyModals();
});
$("body").on("submit", "#signup-form", function(e){
	e.preventDefault();
	fancyModal({
		background:"#ededed",
		height:"150",
		unitHeight:"px",
		timeout:800,
		content:'<h1>Thanks for Signing Up!!</h1>'
	});
});
