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

	$('#douban').blur(function() {
		var douban = $(this);
		var id = douban.val();
		if(id) {
			$.ajax({
				url: "https://api.douban.com/v2/movie/subject/" + id,
				cache: true,
				type: 'get',
				dataType: 'jsonp',
				crossDomain: true,
				jsonp: 'callback',
				success: function(data) {
					$("#inputTitle").val(data.title);
					$("#inputDoctor").val(data.directors[0].name);
					$("#inputCountry").val(data.countries[0]);
					$("#inputLanguage").val('');
					$("#inputPoster").val(data.images.large);
					$("#inputYear").val(data.year);
					$("#inputSummary").val(data.summary);
				},
				error: function(data) {
					alert('出错了');
				}
			});
		}
		
	});
});