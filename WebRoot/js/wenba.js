var AskForm = React.createClass({displayName: "AskForm",
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
		React.createElement("div", {id: "askForm", className: "right-form"}, 
				React.createElement("h3", null, "我要提问"), 
				React.createElement("div", null, 
  				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "newQuestionTitle"}, "问题标题"), 
    				React.createElement("input", {type: "text", className: "form-control", id: "newQuestionTitle", ref: "title"})
  				), 
  				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "newQuestionDes"}, "问题描述"), 
    				React.createElement("textarea", {className: "form-control", rows: "3", id: "newQuestionDes", ref: "des"})
  				), 
  				React.createElement("button", {type: "submit", className: "btn btn-primary", onClick: this.postQuestion}, "发布")
  			)
		)
    );
	}
});

var AnswerForm = React.createClass({displayName: "AnswerForm",

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
		React.createElement("div", {id: "answerForm", className: "right-form"}, 
				React.createElement("h3", null, "我要回答"), 
				React.createElement("div", null, 
  				React.createElement("div", {className: "form-group"}, 
    				React.createElement("label", {htmlFor: "newQuestionDes"}, "答案"), 
    				React.createElement("textarea", {className: "form-control", rows: "3", id: "newQuestionDes", ref: "answerInput"})
  				), 
  				React.createElement("button", {type: "submit", className: "btn btn-primary", onClick: this.postAnswer}, "发布")
  			)
		)
    );
	}
});
var LoginModal = React.createClass({displayName: "LoginModal",
  toRegister : function(){
      React.render(
    React.createElement(RegisterModal, null),
    document.getElementById("myModalDialog")
  );
  },
  login : function() {
      var accountInput = React.findDOMNode(this.refs.account);
      var passwordInput = React.findDOMNode(this.refs.password);
      var data = {
        account : accountInput.value,
        password : passwordInput.value
      };
      if(!data.account){
        accountInput.focus();
        return;
      }
      if(!data.password){
        passwordInput.focus();
        return;
      }
      $.post('api/user/login',data,function(res){
        if(res > 0){
          localStorage['user_id'] = res;
          alert("登录成功");
          $('#myModal').modal('hide');
        }
        else{
          alert("用户名或密码错误，登录失败");
          return;
        }
      }.bind(this))
      .fail(ajaxFail)
  },
render : function(){return (React.createElement("div", {className: "modal-content"}, 
      React.createElement("div", {className: "modal-header"}, 
        React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), 
        React.createElement("h4", {className: "modal-title", id: "myModalLabel"}, "登录")
      ), 
      React.createElement("div", {className: "modal-body"}, 
          React.createElement("div", {className: "form-horizontal"}, 
  React.createElement("div", {className: "form-group"}, 
    React.createElement("label", {htmlFor: "inputUsername", className: "col-sm-2 control-label"}, "用户名"), 
    React.createElement("div", {className: "col-sm-10"}, 
      React.createElement("input", {type: "text", className: "form-control", id: "inputUsername", placeholder: "用户名", ref: "account"})
    )
  ), 
  React.createElement("div", {className: "form-group"}, 
    React.createElement("label", {htmlFor: "inputPassword", className: "col-sm-2 control-label"}, "密码"), 
    React.createElement("div", {className: "col-sm-10"}, 
      React.createElement("input", {type: "password", className: "form-control", id: "inputPassword", placeholder: "密码", ref: "password"})
    )
  )
  
)
      ), 
      React.createElement("div", {className: "modal-footer"}, 
        React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "取消"), 
        React.createElement("button", {type: "button", className: "btn btn-info", onClick: this.toRegister}, "去注册"), 
        React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.login}, "登录")
      )
    ))
}
});
var RegisterModal = React.createClass({displayName: "RegisterModal",
  toLogin:function(){
      React.render(
        React.createElement(LoginModal, null),
        document.getElementById("myModalDialog")
      );
  },
  register : function() {
    var accountInput = React.findDOMNode(this.refs.account);
    var passwordInput = React.findDOMNode(this.refs.password);
    var nicknameInput = React.findDOMNode(this.refs.nickname);
    var signatureInput = React.findDOMNode(this.refs.signature);
    var account = accountInput.value;
    var password = passwordInput.value;
    var nickname = nicknameInput.value;
    var signature = signatureInput.value;
    var userType = React.findDOMNode(this.refs.userType).value;
    if(!account){
      accountInput.focus();
      return;
    }
    if(!password){
      passwordInput.focus();return;
    }
    if(!nickname){
      nicknameInput.focus();return;
    }
    if(!signature){
      signatureInput.focus();return;
    }
    var dt = new Date();
    var data = {
      account : account,
      password : password,
      nickname : nickname,
      signature : signature,
      userType : userType,
      time : dt.getTime()
    };
    $.post("api/user/register",data,function(res){
      if(res > 0){
        localStorage['user_id'] = res;
        alert("注册成功");
        $('#myModal').modal('hide');
      }else{
        alert("该用户名已注册，请重新输入");
        accountInput.focus();
      }
    }.bind(this))
    .fail(ajaxFail);
  },
render : function(){return (React.createElement("div", {className: "modal-content"}, 
      React.createElement("div", {className: "modal-header"}, 
        React.createElement("button", {type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close"}, React.createElement("span", {"aria-hidden": "true"}, "×")), 
        React.createElement("h4", {className: "modal-title", id: "myModalLabel"}, "注册")
      ), 
      React.createElement("div", {className: "modal-body"}, 
          React.createElement("div", {className: "form-horizontal"}, 
  React.createElement("div", {className: "form-group"}, 
    React.createElement("label", {htmlFor: "inputUsername", className: "col-sm-2 control-label"}, "用户名"), 
    React.createElement("div", {className: "col-sm-10"}, 
      React.createElement("input", {type: "text", className: "form-control", id: "inputUsername", placeholder: "用户名", ref: "account"})
    )
  ), 
  React.createElement("div", {className: "form-group"}, 
    React.createElement("label", {htmlFor: "inputPassword", className: "col-sm-2 control-label"}, "密码"), 
    React.createElement("div", {className: "col-sm-10"}, 
      React.createElement("input", {type: "password", className: "form-control", id: "inputPassword", placeholder: "密码", ref: "password"})
    )
  ), 
  React.createElement("div", {className: "form-group"}, 
    React.createElement("label", {htmlFor: "inputPassword", className: "col-sm-2 control-label"}, "昵称"), 
    React.createElement("div", {className: "col-sm-10"}, 
      React.createElement("input", {type: "text", className: "form-control", id: "inputNickname", placeholder: "昵称", ref: "nickname"})
    )
  ), 
  React.createElement("div", {className: "form-group"}, 
    React.createElement("label", {htmlFor: "inputPassword", className: "col-sm-2 control-label"}, "个性签名"), 
    React.createElement("div", {className: "col-sm-10"}, 
      React.createElement("input", {type: "text", className: "form-control", id: "inputSignature", placeholder: "个性签名", ref: "signature"})
    )
  ), 
  React.createElement("div", {className: "form-group"}, 
    React.createElement("label", {htmlFor: "inputUserType", className: "col-sm-2 control-label"}, "用户类型"), 
    React.createElement("div", {className: "col-sm-10"}, 
      React.createElement("select", {className: "form-control", ref: "userType", id: "inputUserType"}, 
        React.createElement("option", {value: "0"}, "学生"), 
        React.createElement("option", {value: "1"}, "老师")
      )
    )
  )
)
      ), 
      React.createElement("div", {className: "modal-footer"}, 
        React.createElement("button", {type: "button", className: "btn btn-default", "data-dismiss": "modal"}, "取消"), 
        React.createElement("button", {type: "button", className: "btn btn-info", onClick: this.toLogin}, "去登录"), 
        React.createElement("button", {type: "button", className: "btn btn-primary", onClick: this.register}, "注册")
      )
    ))
}
});
var Question = React.createClass({displayName: "Question",
	toQuestionDetail : function() {
		//window.location.hash = "#" + this.props.question.id;
		this.props.toQuestionDetail(this.props.question);
	},
	render : function() {
		var avatarIndex = Math.round(Math.random()*4);
		var avatar = "./img/avatar/" + avatarIndex + ".jpg";
		var userIcon = null;
		if(this.props.question.user.userType == '1'){
			userIcon = (React.createElement("span", {className: "glyphicon glyphicon-star", style: {color:'gold'}}));
		}
		return (
			React.createElement("div", {className: "media question item", onClick: this.toQuestionDetail}, 
 				 React.createElement("div", {className: "media-left"}, 
      				React.createElement("img", {className: "media-object", src: avatar, style: {width:80,height:80}})
  				 ), 
  				 React.createElement("div", {className: "media-body"}, 
  				 	React.createElement("span", {className: "pull-right"}, this.props.question.time), 
    				React.createElement("h4", {className: "media-heading"}, this.props.question.title), 
    				React.createElement("span", {className: "user", "data-toggle": "popover", "data-content": this.props.question.user.signature, "data-placement": "bottom"}, 
    				userIcon, this.props.question.user.nickname), React.createElement("br", null), 
    					this.props.question.content
 				 )
			)
		);
	}
});

var QuestionList = React.createClass({displayName: "QuestionList",
	toQuestionDetail :　function(question){
		this.props.toQuestionDetail(question);
	},
	render : function() {
		var questionList = [];
		for(var i = 0; i<this.props.questions.length; i++){
			var question = React.createElement(Question, {question: this.props.questions[i], key: this.props.questions[i].id, toQuestionDetail: this.toQuestionDetail});
			questionList.push(question);
		}
		return(
			React.createElement("div", {className: "questionList"}, 
				questionList
			)
		);
	}
});
var Answer = React.createClass({displayName: "Answer",
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
			userIcon = (React.createElement("span", {className: "glyphicon glyphicon-star", style: {color:'gold'}}));
		}
		return (
			React.createElement("div", {className: "answer item"}, 
			React.createElement("span", {className: "pull-right"}, this.props.answer.time), 
				React.createElement("span", null, 
					React.createElement("span", {className: "user", "data-toggle": "popover", "data-content": this.props.answer.user.signature, "data-placement": "bottom"}, 
						userIcon, this.props.answer.user.nickname
					), 
				" 答曰："), 
				React.createElement("p", null, this.props.answer.content), 
				React.createElement("p", {style: {textAlign:'right',cursor:'pointer'}, onClick: this.addLike}, "赞（", this.state.like[0], "）")
			)
		);
	}
});
var AnswerList = React.createClass({displayName: "AnswerList",
	render : function(){
		var answers = this.props.answers.map(function(answer){
			return React.createElement(Answer, {answer: answer, key: answer.id})
		});
		return (
			React.createElement("div", {className: "answerList"}, 
				answers
			)
		)
	}
});
var QuestionDetail = React.createClass({displayName: "QuestionDetail",
	render : function(){
		return(
			React.createElement("div", {className: "questionDetail"}, 
				React.createElement(Question, {question: this.props.question}), 
				React.createElement(AnswerList, {answers: this.props.answers})
			)
		);
	}
});
var AnswerHistory = React.createClass({displayName: "AnswerHistory",
	render : function() {
		return(
			React.createElement("div", {className: "history"}, 
				React.createElement("h2", null, "我的回答"), 
				React.createElement(AnswerList, {answers: this.props.answers})
			)
		)
	}
});
var QuestionHistory = React.createClass({displayName: "QuestionHistory",
	toQuestionDetail :　function(question){
		this.props.toQuestionDetail(question);
	},
	render : function() {
		return(
			React.createElement("div", {className: "history"}, 
				React.createElement("h2", null, "我的提问"), 
				React.createElement(QuestionList, {questions: this.props.questions, toQuestionDetail: this.toQuestionDetail})
			)
		);
	}
});
var QuestionListView = React.createClass({displayName: "QuestionListView",
	getInitialState: function() {
		return {
			questions:[] 
		};
	},
	loadDataFromServer: function() {
    	$.get('api/question/all/',{},function(res){
     	  	this.setState({questions: res});
     	  	$('[data-toggle="popover"]').popover({
      			trigger : 'hover'
    		});
    	}.bind(this))
    	.fail(ajaxFail);
  	},
  	componentDidMount: function() {
    	this.loadDataFromServer();
    	//setInterval(this.loadDataFromServer, 10000);
  	},
	postQuestion : function(questionData) {
		var url = "api/question/add/";
		$.post(url,questionData,function(res){
			if(res == '200')
				alert("提问成功");
			this.loadDataFromServer();
		}.bind(this)).fail(ajaxFail);
	},
	toQuestionDetail : function(question){
		this.props.toQuestionDetail(question);
	},
	render : function() {
		return(
		React.createElement("div", {className: "container"}, 
			React.createElement("div", {className: "col-lg-8 col-sm-12"}, 
				React.createElement(QuestionList, {questions: this.state.questions, toQuestionDetail: this.toQuestionDetail})
    		), 
    		React.createElement("div", {className: "col-lg-4"}, 
    			React.createElement(AskForm, {postQuestion: this.postQuestion})
    		)
    	)
    	);
	}
});
var QuestionDetailView = React.createClass({displayName: "QuestionDetailView",
	getInitialState: function() {
		return {
			answers : [] 
		};
	},
	loadDataFromServer : function() {
		$.get("api/question/" + this.props.question.id + "/answers/",{},function(res){
			this.setState({answers:res});
			$('[data-toggle="popover"]').popover({
      			trigger : 'hover'
    		});			
		}.bind(this)).fail(ajaxFail);
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	postAnswer : function(answerData) {
		var url = "api/answer/add/";
		console.log(answerData);
		$.post(url,answerData,function(res){
			if(res == '200')
				alert("回答成功");
			this.loadDataFromServer();
		}.bind(this))
		.fail(ajaxFail);
	},
	render : function() {
		return(
		React.createElement("div", {className: "container"}, 
			React.createElement("div", {className: "col-lg-8"}, 
				React.createElement(QuestionDetail, {question: this.props.question, answers: this.state.answers})
    		), 
    		React.createElement("div", {className: "col-lg-4"}, 
    			React.createElement(AnswerForm, {postAnswer: this.postAnswer, question: this.props.question})
    		)
    	)
    	);
	}
});
var AnswerHistoryView = React.createClass({displayName: "AnswerHistoryView",
	getInitialState: function() {
		checkLogin();
		return {
			answers:[] 
		};
	},
	loadDataFromServer : function() {
		$.post('api/answer/history/',{
			user_id : localStorage['user_id']
		},function(res){
     	  	this.setState({answers: res});
     	  	$('[data-toggle="popover"]').popover({
      			trigger : 'hover'
    		});
    	}.bind(this))
    	.fail(ajaxFail);
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	render : function() {
		return(
			React.createElement("div", {className: "container"}, 
			React.createElement("div", {className: "col-lg-8"}, 
				React.createElement(AnswerHistory, {answers: this.state.answers})
    		)
    	)
		);
	},
});
var QuestionHistoryView = React.createClass({displayName: "QuestionHistoryView",
	getInitialState: function() {
		checkLogin();
		return {
			questions:[] 
		};
	},
	loadDataFromServer : function() {
		$.post('api/question/history/',{
			user_id : localStorage['user_id']
		},function(res){
     	  	this.setState({questions: res});
     	  	$('[data-toggle="popover"]').popover({
     			 trigger : 'hover'
    		});
    	}.bind(this))
    	.fail(ajaxFail);
	},
	componentDidMount: function() {
		this.loadDataFromServer();
	},
	toQuestionDetail : function(question){
		this.props.toQuestionDetail(question);
	},
	render : function() {
		return(
			React.createElement("div", {className: "container"}, 
			React.createElement("div", {className: "col-lg-8"}, 
				React.createElement(QuestionHistory, {questions: this.state.questions, toQuestionDetail: this.toQuestionDetail})
    		)
    	)
		);
	}
});
var View = React.createClass({displayName: "View",
	getInitialState: function() {
		return {
			question:null 
		};
	},
	toQuestionDetail : function(question){
		this.setState({
			question:question 
		},function(){
			console.log(this.state);
			window.location.hash = "#" + this.state.question.id;
		});			
	},
	getView : function() {
		var hash = window.location.hash.substring(1);
		if(!hash){
			return (
				React.createElement(QuestionListView, {toQuestionDetail: this.toQuestionDetail})
			);
		}
		if(!isNaN(hash)){
			var questionId = hash;
			return (
				React.createElement(QuestionDetailView, {question: this.state.question})
			);
			
		}
		if(hash=='questionHistory'){
			return (
				React.createElement(QuestionHistoryView, {toQuestionDetail: this.toQuestionDetail})
			);
		}
		if(hash=='answerHistory'){
			return (
				React.createElement(AnswerHistoryView, null)
			);
		}
		return (
				React.createElement(QuestionListView, null)
			);
	},
	render : function() {
		var view = this.getView();
		return(
			React.createElement("div", {className: "view"}, 
				view
			)
		);
	}
});
function init(){
	refresh();
	window.onhashchange = refresh;
	$('#searchInputBox').keyup(function(){
        var searchText = $('#searchInputBox').val().trim();
        $('.item').hide();
        $(".item:contains('" + searchText +"')").show();
    });
    React.render(React.createElement(LoginModal, null),document.getElementById('myModalDialog'));
}

function refresh() {	
    React.render(
    	React.createElement(View, null),
    	document.getElementById('viewWrapper')
    );
    $('[data-toggle="popover"]').popover({
      trigger : 'hover'
    });
    $('#searchInputBox').val('');
};

function checkLogin() {
	if(!localStorage['user_id']){
		React.render(React.createElement(LoginModal, null),document.getElementById('myModalDialog'));
		$('#myModal').modal();
		return false;
	}
	return true;
}

function ajaxFail(){
	alert("连接服务器失败了！！♪(^∇^*)");
}


$(init);
