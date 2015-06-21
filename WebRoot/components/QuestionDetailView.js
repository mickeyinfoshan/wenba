var QuestionDetailView = React.createClass({
	getInitialState: function() {
		return {
			answers : [] 
		};
	},
	loadDataFromServer : function() {
		$.get("api/question/" + this.props.question.id + "/answers/",{},function(res){
			this.setState({answers:res});
			$('[data-toggle="popover"]').popover({
      			trigger : 'hover'
    		});			
		}.bind(this)).fail(ajaxFail);
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	postAnswer : function(answerData) {
		var url = "api/answer/add/";
		console.log(answerData);
		$.post(url,answerData,function(res){
			if(res == '200')
				alert("回答成功");
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
    			<AnswerForm postAnswer={this.postAnswer} question={this.props.question}/>
    		</div>
    	</div>
    	);
	}
});