var QuestionHistoryView = React.createClass({
	getInitialState: function() {
		checkLogin();
		return {
			questions:[] 
		};
	},
	loadDataFromServer : function() {
		$.post('api/question/history/',{
			userId : localStorage['user_id']
		},function(res){
     	  	this.setState({questions: res});
    	}.bind(this))
    	.fail(ajaxFail);
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	toQuestionDetail : function(question){
		this.props.toQuestionDetail(question);
	},
	render : function() {
		return(
			<div className="container">
			<div className="col-lg-8">
				<QuestionHistory questions={this.state.questions} toQuestionDetail={this.toQuestionDetail}/>
    		</div>
    	</div>
		);
	}
});