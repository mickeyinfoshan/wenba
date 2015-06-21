var LoginModal = React.createClass({
  toRegister : function(){
      React.render(
    <RegisterModal />,
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
render : function(){return (<div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 className="modal-title" id="myModalLabel">登录</h4>
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
  
</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
        <button type="button" className="btn btn-info" onClick={this.toRegister}>去注册</button>
        <button type="button" className="btn btn-primary" onClick={this.login}>登录</button>
      </div>
    </div>)
}
});