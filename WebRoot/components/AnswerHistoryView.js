var AnswerHistoryView = React.createClass({
	getInitialState: function() {
		checkLogin();
		return {
			answers:[] 
		};
	},
	loadDataFromServer : function() {
		$.post('api/answer/history/',{
			user_id : localStorage['user_id']
		},function(res){
     	  	this.setState({answers: res});
     	  	$('[data-toggle="popover"]').popover({
      			trigger : 'hover'
    		});
    	}.bind(this))
    	.fail(ajaxFail);
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	render : function() {
		return(
			<div className="container">
			<div className="col-lg-8">
				<AnswerHistory answers={this.state.answers}/>
    		</div>
    	</div>
		);
	},
});