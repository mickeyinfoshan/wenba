package apis;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bean.User;
import dbc.HibernateSessionFactory;

@RestController
@RequestMapping("/user")
public class UserController {
	
	//@RequestMapping("/register")
	public int addUser(
			@RequestParam(value="account") String account,
			@RequestParam(value="password") String password,
			@RequestParam(value="nickname") String nickname,
			@RequestParam(value="signature") String signature,
			@RequestParam(value="userType") int userType
		){
		Session session = HibernateSessionFactory.getSession();
		String query = "from User U where U.account='" + account + "'";
		List<User> querySet = session.createQuery(query).list();
		if(!querySet.isEmpty()){
			session.close();
			return -1;
		}	
		User user = new User();
		user.setAccount(account);
		user.setPassword(password);
		user.setNickname(nickname);
		user.setSignature(signature);
		user.setUserType(userType);
		Transaction trans = session.beginTransaction();
		session.save(user);
		trans.commit();
		session.close();
		return user.getId();
	}
	
	@RequestMapping("/{user_id}")
	public User getUser(@PathVariable(value="user_id") 
	int userId){
		Session session = HibernateSessionFactory.getSession();
		User user = (User)session.get(User.class, userId);
		session.close();
		return user;
	}
	
	@RequestMapping("/{user_id}")
	public User updateUser(
			@RequestParam(value="user_id") int userId,
			@RequestParam(value="password") String password,
			@RequestParam(value="nickname") String nickname,
			@RequestParam(value="signature") String signature
			){
		Session session = HibernateSessionFactory.getSession();
		User user = (User)session.get(User.class, userId);
		user.setPassword(password);
		user.setNickname(nickname);
		user.setSignature(signature);
		Transaction trans = session.beginTransaction();
		session.save(user);
		trans.commit();
		session.close();
		return user;
	}
	
	@RequestMapping("/login")
	public int login(
			@RequestParam(value="account") String account,
			@RequestParam(value="password") String password){
		Session session = HibernateSessionFactory.getSession();
		String query = "from User U where account='" + account +"' and password='" + password +"'";
		List<User> querySet = session.createQuery(query).list();
		session.close();
		if(querySet.isEmpty()){			
			return -1;
		}
		return querySet.get(0).getId();
	}
}
