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
		List<Question> list = (List<Question>)(session.createQuery("from Question").list());
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
		Answer[] as = new Answer[3];
		Answer a = new Answer();
		a.setContent("这里是答案");
		User u = new User();
		u.setId(2);
		u.setNickname("Mickey");
		u.setSignature("好好学习天天向上");
		a.setUser(u);
		a.setId(3);
		as[0] = a;
		as[1] = a;
		as[2] = a;
		return as;
	}
	
	@POST
	@Path("/history")
	@Produces(MediaType.APPLICATION_JSON)
	public Question[] getQuestionsHistory(){
		Question[] qs = new Question[5];
		for(int i = 0; i<5; i++){
			Question q = new Question();
			q.setContent("abce");
			q.setId(i);
			q.setTitle("lalala");
			User u = new User();
			u.setId(2);
			u.setNickname("Mickey");
			u.setSignature("好好学习天天向上");
			q.setUser(u);
			qs[i] = q;
		}
		return qs;
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
		Question q = new Question();
		q.setTime(time);
		q.setTitle(title);
		q.setContent(des);
		return 200;
	}
	
	@DELETE
	public int deleteQuestion(){
		return 200;
	}
}
