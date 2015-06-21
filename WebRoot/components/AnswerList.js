var AnswerList = React.createClass({
	render : function(){
		var answers = this.props.answers.map(function(answer){
			return <Answer answer={answer} key={answer.id}/>
		});
		return (
			<div className="answerList">
				{answers}
			</div>
		)
	}
});