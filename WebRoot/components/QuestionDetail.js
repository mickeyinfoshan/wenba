var QuestionDetail = React.createClass({
	render : function(){
		return(
			<div className="questionDetail">
				<Question question={this.props.question} />
				<AnswerList answers={this.props.answers} />
			</div>
		);
	}
});