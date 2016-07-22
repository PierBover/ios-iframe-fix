$('p').click(function(){
	$('#wrap').css({
		'overflow-y': 'hidden',
		'-webkit-overflow-scrolling': 'auto'
	});

	$('#overlay').css({
		display:'block'
	})
})

$('#overlay').click(function(){
	$('#wrap').css({
		'overflow-y': 'scroll',
		'-webkit-overflow-scrolling': 'touch'
	});

	$('#overlay').css({
		display:'none'
	})
})
