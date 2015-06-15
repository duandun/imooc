$(function() {
	$(".comment").click(function(e) {
		//console.log("点击了");
		var target = $(this);
		var toId = target.data('tid');
		var commentId = target.data('cid');
		if ($('#toId').length > 0) {
			$('#toId').val(toId);
		} else {
			$('<input>').attr({
				type: 'hidden',
				id: 'toId',
				name: 'comment[tid]',
				value: toId
			}).appendTo('#commentForm');
		}
		
		if ($('#commentId').length > 0) {
			$('#commentId').val(commentId);
		} else {
			$('<input>').attr({
				type: 'hidden',
				name: 'comment[cid]',
				id: 'commentId',
				value: commentId
			}).appendTo('#commentForm');
		}
	});
});