var RegisterModal = React.createClass({
  toLogin:function(){
      React.render(
        <LoginModal />,
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
render : function(){return (<div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title" id="myModalLabel">注册</h4>
      </div>
      <div className="modal-body">
          <div className="form-horizontal">
  <div className="form-group">
    <label htmlFor="inputUsername" className="col-sm-2 control-label">用户名</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="inputUsername" placeholder="用户名" ref="account" />
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="inputPassword" className="col-sm-2 control-label">密码</label>
    <div className="col-sm-10">
      <input type="password" className="form-control" id="inputPassword" placeholder="密码" ref="password" />
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="inputPassword" className="col-sm-2 control-label">昵称</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="inputNickname" placeholder="昵称" ref="nickname" />
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="inputPassword" className="col-sm-2 control-label">个性签名</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="inputSignature" placeholder="个性签名" ref="signature" />
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="inputUserType" className="col-sm-2 control-label">用户类型</label>
    <div className="col-sm-10">
      <select className="form-control" ref="userType" id="inputUserType">
        <option value="0">学生</option>
        <option value="1">老师</option>
      </select>
    </div>
  </div>
</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
        <button type="button" className="btn btn-info" onClick={this.toLogin}>去登录</button>
        <button type="button" className="btn btn-primary" onClick={this.register}>注册</button>
      </div>
    </div>)
}
});