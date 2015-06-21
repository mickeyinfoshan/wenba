package apis;

import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.hibernate.Session;
import org.hibernate.Transaction;

import bean.User;

import dbc.HibernateSessionFactory;

@Path("user/")
public class UserApi {
	
	@POST
	@Path("/register")
	@Produces(MediaType.APPLICATION_JSON)
	public int addUser(
			@FormParam(value="account") String account,
			@FormParam(value="passworld") String password,
			@FormParam(value="nickname") String nickname,
			@FormParam(value="signature") String signature
		){
		Session session = HibernateSessionFactory.getSession();
		String query = "from User where account=" + account;
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
		Transaction trans = session.beginTransaction();
		session.save(user);
		trans.commit();
		session.close();
		return user.getId();
	}
	
	@GET
	@Path("/{user_id}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getUser(@PathParam(value="user_id") 
	int userId){
		Session session = HibernateSessionFactory.getSession();
		User user = (User)session.get(User.class, userId);
		session.close();
		return user;
	}
	
	@POST
	@Path("/{user_id}")
	@Produces(MediaType.APPLICATION_JSON)
	public User updateUser(
			@PathParam(value="user_id") int userId,
			@FormParam(value="passworld") String password,
			@FormParam(value="nickname") String nickname,
			@FormParam(value="signature") String signature
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
}
