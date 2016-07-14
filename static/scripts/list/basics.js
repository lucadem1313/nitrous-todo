var listInfo = {
	id:1,
	title:"To-Do",
	items:[
		{id:0, 	done:false, 	level:"normal", 		title:"Item 1", 	text:"Here is something to do!", 		number:1},
		{id:0, 	done:true, 		level:"normal", 		title:"Item 2", 	text:"Here is something I've done!",	number:2},
		{id:0, 	done:false, 	level:"important",	title:"Item 3", 	text:"Here is something important!", 	number:3}
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
		element.hasClass("done") ? tmpObj.done = true : tmpObj.done = false;

		if(element.hasClass("important")) tmpObj.level = "important";
		else if(element.hasClass("moderate")) tmpObj.level = "moderate";
		else tmpObj.level = "normal";

		tmpObj.title = element.find(".item-title input").val();
		tmpObj.text = element.find(".item-text input").val();
		tmpObj.number = key;

		items.push(tmpObj);
	});
  returnData.items = JSON.stringify(items);
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
		<li data-id="'+value.id+'" class="list-item '+value.level+' '+ doneText +'">\
			<div class="item-dots"></div>\
			<div class="item-done"><div class="checkbox '+ checkedText +'" title="Toggle Completeness"></div></div>\
			<div class="item-title"><input type="text" class="text-input" value="'+value.title+'" '+ readOnlyText +' maxlength="100"></div>\
			<div class="item-text"><input type="text" class="text-input" value="'+value.text+'" '+ readOnlyText +'></div>\
			<div class="item-actions">\
				<div title="Change Importance" class="actions-importance"><img src="https://github.com/google/material-design-icons/raw/master/navigation/2x_web/ic_menu_black_24dp.png" alt="Change Importance"></div><div title="Remove Item" class="actions-remove"><img src="https://raw.githubusercontent.com/google/material-design-icons/master/action/2x_web/ic_delete_black_24dp.png" alt="Delete"></div>\
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
function saveTask(element){
	title = element.find(".item-title").val();
	text = element.find(".item-text").val();
	done = element.hasClass("done");
	number = $(".list-item").index(element) + 1;

	if(element.hasClass("important")) priority = "important";
	else if(element.hasClass("moderate")) priority = "moderate";
	else priority = "normal";

	taskId = element.attr("data-id");

	$.ajax({
 		type: "POST",
 		url: "/api/v1/task/"+taskId+"/",
 		data: {
			title:title,
			text:text,
			done:done,
			number:number,
			priority:priority
		},
 		success: function(response){
      console.log(response);
		}
	});
}





if(listId == "None")
{
  listId = 'new';
  listInfo.id = listId;
  createList(listInfo);
  updateItemPlugins();
}


$("body").on("click", ".checkbox", function(){
	$(this).toggleClass("checked");
	$(this).parents(".list-item").toggleClass("done");
	$(this).parents(".list-item").hasClass("done") ? $(this).parents(".list-item").find(".text-input").attr("readonly", "true") : $(this).parents(".list-item").find(".text-input").removeAttr("readonly");
	updateItemPlugins();
});
$("body").on("click", ".actions-remove", function(){
	element = $(this).parents(".list-item");
	element.slideUp(200, function(){
		element.remove();
		updateItemPlugins();
	});
});

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
$("body").on("click", ".select-normal", function(){
	element = $(this).parents(".list-item");
	element.removeClass("normal").removeClass("moderate").removeClass("important");
	element.addClass("normal");
	updateItemPlugins();
});
$("body").on("click", ".select-moderate", function(){
	element = $(this).parents(".list-item");
	element.removeClass("normal").removeClass("moderate").removeClass("important");
	element.addClass("moderate");
	updateItemPlugins();
});
$("body").on("click", ".select-important", function(){
	element = $(this).parents(".list-item");
	element.removeClass("normal").removeClass("moderate").removeClass("important");
	element.addClass("important");
	updateItemPlugins();
});

$("#new-item").click(function(){
	$("#list ul").prepend('<li class="list-item normal" data-id="0">\
			<div class="item-dots"></div>\
			<div class="item-done"><div class="checkbox" title="Toggle Completeness"></div></div>\
			<div class="item-title"><input type="text" class="text-input" value="Item Title" maxlength="100"></div>\
			<div class="item-text"><input type="text" class="text-input" value="Something to do..."></div>\
			<div class="item-actions">\
				<div title="Change Importance" class="actions-importance"><img src="https://github.com/google/material-design-icons/raw/master/navigation/2x_web/ic_menu_black_24dp.png" alt="Change Importance"></div><div title="Remove Item" class="actions-remove"><img src="https://raw.githubusercontent.com/google/material-design-icons/master/action/2x_web/ic_delete_black_24dp.png" alt="Delete"></div>\
			</div>\
			<div class="importance-select">\
				<div class="select-normal">Normal</div>\
				<div class="select-moderate">Moderate</div>\
				<div class="select-important">Important</div>\
			</div>\
		</li>');

	updateItemPlugins();
});
$("#delete-all").click(function(){
	if(confirm("Are you sure? There is no going back!"))
	{
		$("#list ul").slideUp(500, function(){
			$("#list ul").empty();
			$("#list ul").slideDown(0);
			updateItemPlugins();
		});
	}
});
$("#save").click(function(){
	var listData = readList();
  console.log(listData);
	$.ajax({
 		type: "POST",
 		url: "/api/v1/list/"+listData.id+"/",
 		data: listData,
 		success: function(response){
			window.open(response.url, "_self");
      //console.log(response);
		}
	});
});


// $("body").on("change", ".item-title, .item-text", function(){
// 	element = $(this).parents(".list-item");
// 	saveTask(element);
// });
