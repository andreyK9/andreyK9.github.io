$(document).ready(function(){

	$("#scrollDown").click(function () {
		$.fn.fullpage.moveSectionDown();
	})

	// scroll slide default
	$('#year').css({'background':'-webkit-linear-gradient(left ,#d1eaff 1%,rgba(209, 234, 255,.2) 1%, rgba(209, 234, 255,.2) 97%, transparent 97% )'});

	// parallax
	$(window).scroll(function () {
		var st = $(this).scrollTop();

		if(st > 0)
			$("#scrollDown").css({
				"opacity": "0"
			});
		else
			$("#scrollDown").css({
				"opacity": "1"
			});

		$(".sec_1").css({
			"transform" : "translate(0%, -" + st /16 + "%"
		});

		var mathSt = 24 - st /32;
		if(mathSt <=8)
		$(".sec_2").css({
			"transform" : "translate(0%, " + (mathSt) + "%"
		});
	});

	//scroll fullpage
	$('#fullpage').fullpage({
		controlArrows: false,
		verticalCentered: false,
		autoScrolling: true,
		loopHorizontal: false,
		scrollBar: true,
		navigation: true,

	});

});

function fun1() {
	var rng=document.getElementById('year');
	var vol = +rng.value;

	if(vol < 60)
		$('#year').css({'background':'-webkit-linear-gradient(left ,#d1eaff '+(vol + 1)+'%,rgba(209, 234, 255,.2) '+(vol + 1)+'%, rgba(209, 234, 255,.2) 97%, transparent 97% )'});
	else if(vol < 96)
		$('#year').css({'background':'-webkit-linear-gradient(left ,#d1eaff '+ (vol - 2 ) +'%,rgba(209, 234, 255,.2) '+ (vol - 2 ) +'%, rgba(209, 234, 255,.2) 97%, transparent 97% )'});
	else	
		$('#year').css({'background':'-webkit-linear-gradient(left ,#d1eaff 94%,rgba(209, 234, 255,.2) 94%, rgba(209, 234, 255,.2) 97%, transparent 97% )'});

	// scroll ----------------------------------------------------------
	if( vol <= 25)
		$.fn.fullpage.moveTo(3 , 0);
	else if(vol > 25 && vol <= 75)
		$.fn.fullpage.moveTo(3 , 1);
	else 
		$.fn.fullpage.moveTo(3 , 2);
}
