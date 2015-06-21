var AnswerForm = React.createClass({

  postAnswer : function() {
    if(!checkLogin())
      return;
    var answerInput = React.findDOMNode(this.refs.answerInput);
    var answerContent = answerInput.value;
    if(!answerContent){
      answerInput.focus();
      return;
    }
    var dt = new Date();
    var time = dt.getFullYear() + "-" + (dt.getMonth()+1) + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes();
    var answerData = {
      question_id : this.props.question.id,
      content : answerContent,
      user_id : localStorage['user_id'],
      time : time
    };
    this.props.postAnswer(answerData);
    answerInput.value = "";
  },
	render : function() {
    return(
		<div id="answerForm" className="right-form">
				<h3>我要回答</h3>
				<div>
  				<div className="form-group">
    				<label htmlFor="newQuestionDes">答案</label>
    				<textarea className="form-control" rows="3" id="newQuestionDes" ref="answerInput"></textarea>
  				</div>
  				<button type="submit" className="btn btn-primary" onClick={this.postAnswer}>发布</button>
  			</div>
		</div>
    );
	}
});