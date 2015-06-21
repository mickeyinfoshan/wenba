var AnswerHistory = React.createClass({
	render : function() {
		return(
			<div className="history">
				<h2>我的回答</h2>
				<AnswerList answers={this.props.answers} />
			</div>
		)
	}
});