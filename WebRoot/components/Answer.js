var Answer = React.createClass({
	getInitialState: function() {
		return {
			like:[] 
		};
	},
	loadDataFromServer : function() {
		$.post("api/answer/" + this.props.answer.id + "/like/get/",{
			user_id : localStorage['user_id']
		},function(res){
			this.setState({
				like:res 
			});
		}.bind(this)).fail(ajaxFail);
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	addLike : function() {
		$.post("api/answer/" + this.props.answer.id + "/like/add/",{
			user_id : localStorage['user_id']
		},function(res){
			if(res == '200'){
				alert("成功点赞");
				this.loadDataFromServer();
			}
			else{
				alert("你已经点过赞了~♪(^∇^*)");
			}
		}.bind(this)).fail(ajaxFail);
	},
	render : function() {
		var userIcon = null;
		if(this.props.answer.user.userType == '1'){
			userIcon = (<span className="glyphicon glyphicon-star" style={{color:'gold'}}></span>);
		}
		return (
			<div className="answer item">
			<span className="pull-right">{this.props.answer.time}</span>
				<span >
					<span className="user" data-toggle="popover" data-content={this.props.answer.user.signature} data-placement="bottom">
						{userIcon}{this.props.answer.user.nickname}
					</span> 
				&nbsp;答曰：</span>
				<p>{this.props.answer.content}</p>
				<p style={{textAlign:'right',cursor:'pointer'}} onClick={this.addLike}>赞（{this.state.like[0]}）</p>
			</div>
		);
	}
});