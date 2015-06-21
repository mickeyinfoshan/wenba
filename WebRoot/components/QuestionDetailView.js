var QuestionDetailView = React.createClass({
	getInitialState: function() {
		return {
			answers : [] 
		};
	},
	loadDataFromServer : function() {
		$.get("api/question/" + this.props.question.id + "/answers/",{},function(res){
			this.setState({answers:res});			
		}.bind(this)).fail(ajaxFail);
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	postAnswer : function(answerData) {
		var url = "api/answer/add/";
		console.log(answerData);
		$.post(url,answerData,function(res){
			alert(res);
			this.loadDataFromServer();
		}.bind(this))
		.fail(ajaxFail);
	},
	render : function() {
		return(
		<div className="container">
			<div className="col-lg-8">
				<QuestionDetail question={this.props.question} answers={this.state.answers} />
    		</div>
    		<div className="col-lg-4">
    			<AnswerForm postAnswer={this.postAnswer} questionId={this.props.questionId}/>
    		</div>
    	</div>
    	);
	}
});