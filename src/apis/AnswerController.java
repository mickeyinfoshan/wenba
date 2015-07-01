package apis;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import bean.Answer;
import bean.AnswerLike;
import bean.Question;
import bean.User;
import dbc.HibernateSessionFactory;

@RequestMapping("/answer")
public class AnswerController {
	
	
	@RequestMapping("/add")
	public int addAnswer(
			@RequestParam(value="question_id") int questionId,
			@RequestParam(value="content") String content,
			@RequestParam(value="user_id") int userId,
			@RequestParam(value="time") String time
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
	
	
	@RequestMapping("/history")	
	public Answer[] getAnswersHistory(@RequestParam(value="user_id") int userId){
		Session session = HibernateSessionFactory.getSession();
		String query = "from Answer A where A.user=" + userId;
		List<Answer> list = (List<Answer>)(session.createQuery(query).list());
		session.close();
		int size = list.size();
		Answer[] answers = new Answer[size];
		return (Answer[])(list.toArray(answers));
	}
	
	
	@RequestMapping("/{answer_id}/like/get/")
	public int [] getAnswerLike(@RequestParam(value="user_id") int userId, @PathVariable(value="answer_id") int answerId){
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
	
	
	@RequestMapping("/{answer_id}/like/add/")	
	public int addAnswerLike(@RequestParam(value="user_id") int userId, @PathVariable(value="answer_id") int answerId){
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