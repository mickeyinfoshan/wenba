var QuestionList = React.createClass({
	toQuestionDetail :　function(question){
		this.props.toQuestionDetail(question);
	},
	render : function() {
		var questionList = [];
		for(var i = 0; i<this.props.questions.length; i++){
			var question = <Question question={this.props.questions[i]} key={this.props.questions[i].id} toQuestionDetail={this.toQuestionDetail} />;
			questionList.push(question);
		}
		return(
			<div className="questionList">
				{questionList}
			</div>
		);
	}
});