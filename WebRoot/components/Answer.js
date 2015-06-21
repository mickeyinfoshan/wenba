var Answer = React.createClass({
	render : function() {
		return (
			<div className="answer item">
			<span className="pull-right">{this.props.answer.time}</span>
				<span >
					<span className="user" data-toggle="popover" data-content={this.props.answer.user.signature} data-placement="bottom">
					{this.props.answer.user.nickname}
					</span> 
				&nbsp;答曰：</span>
				<p>{this.props.answer.content}</p>
			</div>
		);
	}
});