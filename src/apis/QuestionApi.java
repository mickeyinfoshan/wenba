package apis;

import java.util.List;

import javax.ws.rs.DELETE;
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

@Path("/question")
public class QuestionApi {
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public Question[] getAllQuestions(){
		Session session = HibernateSessionFactory.getSession();
		List<Question> list = (List<Question>)(session.createQuery("from Question q where q.user is not null").list());
		session.close();
		int size = list.size();
		Question[] questions = new Question[size];
		return (Question[])(list.toArray(questions));
	}
	
	@GET
	@Path("/{questionId}/answers")
	@Produces(MediaType.APPLICATION_JSON)
	public Answer[] getQuestionAnswers(@PathParam(value="questionId") 
	String questionId){
		Session session = HibernateSessionFactory.getSession();
		String query = "from Answer A where A.question=" + questionId;
		List<Answer> list = (List<Answer>)(session.createQuery(query).list());
		session.close();
		int size = list.size();
		Answer[] answer = new Answer[size];
		return (Answer[])(list.toArray(answer));
	}
	
	@POST
	@Path("/history")
	@Produces(MediaType.APPLICATION_JSON)
	public Question[] getQuestionsHistory(@FormParam(value="user_id") int userId){
		Session session = HibernateSessionFactory.getSession();
		String query = "from Question Q where Q.user=" + userId;
		List<Question> list = (List<Question>)(session.createQuery(query).list());
		session.close();
		int size = list.size();
		Question[] questions = new Question[size];
		return (Question[])(list.toArray(questions));
	}
	@POST
	@Path("/add")
	@Produces(MediaType.APPLICATION_JSON)
	public int addQuestion(
			@FormParam(value="title") String title,
			@FormParam(value="des") String des,
			@FormParam(value="user_id") int userId,
			@FormParam(value="time") String time
			){
		Session session = HibernateSessionFactory.getSession();
		User user = (User)session.get(User.class, userId);
		Question q = new Question();
		q.setTime(time);
		q.setTitle(title);
		q.setContent(des);
		q.setUser(user);
		Transaction trans = session.beginTransaction();
		session.save(q);
		trans.commit();
		session.close();
		return 200;
	}
	
	@DELETE
	public int deleteQuestion(){
		return 200;
	}
}
