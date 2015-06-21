var QuestionListView = React.createClass({
	getInitialState: function() {
		return {
			questions:[] 
		};
	},
	loadDataFromServer: function() {
    	$.get('api/question/all/',{},function(res){
     	  	this.setState({questions: res});
    	}.bind(this))
    	.fail(ajaxFail);
  	},
  	componentDidMount: function() {
    	this.loadDataFromServer();
    	//setInterval(this.loadDataFromServer, 10000);
  	},
	postQuestion : function(questionData) {
		var url = "api/question/add/";
		$.post(url,questionData,function(res){
			if(res == '200')
				alert("提问成功");
			this.loadDataFromServer();
		}.bind(this)).fail(ajaxFail);
	},
	toQuestionDetail : function(question){
		this.props.toQuestionDetail(question);
	},
	render : function() {
		return(
		<div className="container">
			<div className="col-lg-8 col-sm-12">
				<QuestionList questions={this.state.questions} toQuestionDetail={this.toQuestionDetail} />
    		</div>
    		<div className="col-lg-4">
    			<AskForm postQuestion={this.postQuestion} />
    		</div>
    	</div>
    	);
	}
});