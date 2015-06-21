var AskForm = React.createClass({
  postQuestion : function() {
    if(!checkLogin())
        return;
    var titleInput = React.findDOMNode(this.refs.title);
    var desInput = React.findDOMNode(this.refs.des);
    var dt = new Date();
    var time = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes();
    var questionData = {
      title : titleInput.value.trim(),
      des : desInput.value.trim(),
      user_id : localStorage['user_id'],
      time : time
    };
    if(!questionData.title){
      titleInput.focus();
      return;
    }
    if(!questionData.des){
      desInput.focus();
      return;
    }
    this.props.postQuestion(questionData);
    titleInput.value = "";
    desInput.value = "";
  },
	render : function() {
    return(
		<div id="askForm" className="right-form">
				<h3>我要提问</h3>
				<div>
  				<div className="form-group">
    				<label htmlFor="newQuestionTitle">问题标题</label>
    				<input type="text" className="form-control" id="newQuestionTitle" ref="title" /> 
  				</div>
  				<div className="form-group">
    				<label htmlFor="newQuestionDes">问题描述</label>
    				<textarea className="form-control" rows="3" id="newQuestionDes" ref="des"></textarea>
  				</div>
  				<button type="submit" className="btn btn-primary" onClick={this.postQuestion}>发布</button>
  			</div>
		</div>
    );
	}
});
