var Question = React.createClass({
	toQuestionDetail : function() {
		//window.location.hash = "#" + this.props.question.id;
		this.props.toQuestionDetail(this.props.question);
	},
	render : function() {
		var avatarIndex = Math.round(Math.random()*4);
		var avatar = "./img/avatar/" + avatarIndex + ".jpg";
		return (
			<div className="media question item" onClick={this.toQuestionDetail}>
 				 <div className="media-left">
      				<img className="media-object" src={avatar} style={{width:80,height:80}}/>
  				 </div>
  				 <div className="media-body">
  				 	<span className="pull-right">{this.props.question.time}</span>
    				<h4 className="media-heading">{this.props.question.title}</h4>
    				<span className="user" data-toggle="popover" data-content={this.props.question.user.signature} data-placement="bottom">{this.props.question.user.nickname}</span><br/>
    					{this.props.question.content}
 				 </div>
			</div>
		);
	}
});
