listId = 'new';
listInfo.id = listId;
createList(listInfo);
updateItemPlugins();


$("#save").click(function(){
	var listData = readList();
  console.log(listData);
	$.ajax({
 		type: "POST",
 		url: "/api/v1/list/"+listData.id+"/",
 		data: {
      title: listData.title,
      id: listData.id
    },
 		success: function(response){
      if(response.success)
      {
				var counter = 0;
        $.each(listData.items, function(key, value){
          $.ajax({
            type: "POST",
            url: "/api/v1/"+response.listId+"/tasks/0/",
            data: {
              title:value.title,
              text:value.text,
              done:value.done,
              number:value.number,
              priority:value.priority
            },
            success: function(response2){
		          if(key == listData.items.length - 1)
		            location.href = response.url;
						}
          });

        });
      }
		}
	});
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


$("#new-item").click(function(){
	$("#list ul").prepend('<li class="list-item normal" data-id="0">\
			<div class="item-dots"></div>\
			<div class="item-done"><div class="checkbox" title="Toggle Completeness"></div></div>\
			<div class="item-title"><input type="text" class="text-input" value="Item Title" maxlength="100"></div>\
			<div class="item-text"><input type="text" class="text-input" value="Something to do..."></div>\
			<div class="item-actions">\
				<div title="Change Importance" class="actions-importance"><img src="/static/images/menulines.png" alt="Change Importance"></div><div title="Remove Item" class="actions-remove"><img src="/static/images/trashbin.png" alt="Delete"></div>\
			</div>\
			<div class="importance-select">\
				<div class="select-normal">Normal</div>\
				<div class="select-moderate">Moderate</div>\
				<div class="select-important">Important</div>\
			</div>\
		</li>');

	updateItemPlugins();
});



$(window).bind('beforeunload', function(){
  	return 'You have unsaved changes. Are you sure you want to leave?';
});
