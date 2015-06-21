function init(){
	refresh();
	window.onhashchange = refresh;
	$('#searchInputBox').keyup(function(){
        var searchText = $('#searchInputBox').val().trim();
        $('.item').hide();
        $(".item:contains('" + searchText +"')").show();
    });
    React.render(<LoginModal />,document.getElementById('myModalDialog'));
}

function refresh() {	
    React.render(
    	<View />,
    	document.getElementById('viewWrapper')
    );
    $('[data-toggle="popover"]').popover({
      trigger : 'hover'
    });
    $('#searchInputBox').val('');
};

function checkLogin() {
    return true;
	if(!localStorage['user_id']){
		React.render(<LoginModal />,document.getElementById('myModalDialog'));
		$('#myModal').modal();
		return false;
	}
	return true;
}

function ajaxFail(){
	alert("连接服务器失败了！！♪(^∇^*)");
}


$(init);
