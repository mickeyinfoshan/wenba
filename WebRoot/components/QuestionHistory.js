var QuestionHistory = React.createClass({
	toQuestionDetail :　function(question){
		this.props.toQuestionDetail(question);
	},
	render : function() {
		return(
			<div className="history">
				<h2>我的提问</h2>
				<QuestionList questions={this.props.questions} toQuestionDetail={this.toQuestionDetail}/>
			</div>
		);
	}
});