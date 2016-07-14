$.get("/api/v1/list/" + listId, function(response){
	listInfo = response.info;
	createList(listInfo);
	updateItemPlugins();

});
