$(function() {

	$(".del").click(function(e) {
		//console.log("点击了");
		var target = $(e.target);
		var id = target.data('id');
		var tr = $('.item-id-' + id);

		$.ajax({
			type: 'DELETE',
			url: '/admin/movie/list?id=' + id,
			
		})
		.done(function(results) {
			console.log(results);
			if (results.success === 1) {
				if (tr.length > 0) {
					tr.remove();
				}
			} else if (results.error === 1) {
				alert("出错了！");
			}
		});
	});
});