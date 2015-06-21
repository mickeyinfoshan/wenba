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

import dbc.HibernateSessionFactory;

import bean.Answer;
import bean.Question;
import bean.User;

@Path("/answer")
public class AnswerApi {
	
	@POST
	@Path("/add")
	@Produces(MediaType.APPLICATION_JSON)
	public int addAnswer(
			@FormParam(value="question_id") int questionId,
			@FormParam(value="content") String content,
			@FormParam(value="user_id") int userId,
			@FormParam(value="time") String time
			){
		Session session = HibernateSessionFactory.getSession();
		User user = (User)session.get(User.class, userId);
		Question question = (Question)session.get(Question.class,questionId);
		Answer a = new Answer();
		a.setContent(content);
		a.setTime(time);
		a.setUser(user);
		a.setQuestion(question);
		Transaction trans = session.beginTransaction();
		session.save(a);
		trans.commit();
		session.close();
		return 200;
	}
	
	@POST
	@Path("/history")
	@Produces(MediaType.APPLICATION_JSON)
	public Answer[] getAnswersHistory(@FormParam(value="user_id") int userId){
		Session session = HibernateSessionFactory.getSession();
		String query = "from Answer A where A.user=" + userId;
		List<Answer> list = (List<Answer>)(session.createQuery(query).list());
		session.close();
		int size = list.size();
		Answer[] answers = new Answer[size];
		return (Answer[])(list.toArray(answers));
	}
	
}
