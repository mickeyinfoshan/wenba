package apis;

import java.util.List;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.hibernate.Session;
import org.hibernate.Transaction;

import bean.Answer;
import bean.AnswerLike;
import bean.Question;
import bean.User;
import dbc.HibernateSessionFactory;

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
	
	@POST
	@Path("/{answer_id}/like/get/")
	@Produces(MediaType.APPLICATION_JSON)
	public int [] getAnswerLike(@FormParam(value="user_id") int userId, @PathParam(value="answer_id") int answerId){
		Session session = HibernateSessionFactory.getSession();
		String query = "from AnswerLike where answer=" + answerId;
		String query_ = "from AnswerLike where answer=" + answerId + " and user=" + userId;
		int numberOfLike = session.createQuery(query).list().size();
		int isLiked = 1;
		if(session.createQuery(query_).list().isEmpty()){
			isLiked = 0;
		}
		session.close();
		int [] returnArray = new int[2];
		returnArray[0] = numberOfLike;
		returnArray[1] = isLiked;
		return returnArray;
	}
	
	@POST
	@Path("/{answer_id}/like/add/")
	@Produces(MediaType.APPLICATION_JSON)
	public int addAnswerLike(@FormParam(value="user_id") int userId, @PathParam(value="answer_id") int answerId){
		Session session = HibernateSessionFactory.getSession();
		String query_ = "from AnswerLike where answer=" + answerId + " and user=" + userId;
		if(!session.createQuery(query_).list().isEmpty()){
			return 500;
		}		
		User user = (User)session.get(User.class,userId);
		Answer answer = (Answer)session.get(Answer.class,answerId);
		AnswerLike answerLike = new AnswerLike();
		answerLike.setAnswer(answer);
		answerLike.setUser(user);
		Transaction trans = session.beginTransaction();
		session.save(answerLike);
		trans.commit();
		session.close();
		return 200;
	}
}
