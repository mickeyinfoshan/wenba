var AnswerHistoryView = React.createClass({
	getInitialState: function() {
		checkLogin();
		return {
			answers:[] 
		};
	},
	loadDataFromServer : function() {
		$.post('api/answer/history/',{
			userId : localStorage['user_id']
		},function(res){
     	  	this.setState({answers: res});
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