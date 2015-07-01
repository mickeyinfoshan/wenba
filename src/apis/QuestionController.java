package apis;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import bean.Answer;
import bean.Question;
import bean.User;
import dbc.HibernateSessionFactory;

@RequestMapping("/question")
public class QuestionController {
	
	@RequestMapping("/all")	
	public Question[] getAllQuestions(){
		Session session = HibernateSessionFactory.getSession();
		List<Question> list = (List<Question>)(session.createQuery("from Question q where q.user is not null").list());
		session.close();
		int size = list.size();
		Question[] questions = new Question[size];
		return (Question[])(list.toArray(questions));
	}
	
	
	@RequestMapping("/{questionId}/answers")	
	public Answer[] getQuestionAnswers(@PathVariable(value="questionId") 
	String questionId){
		Session session = HibernateSessionFactory.getSession();
		String query = "from Answer A where A.question=" + questionId;
		List<Answer> list = (List<Answer>)(session.createQuery(query).list());
		session.close();
		int size = list.size();
		Answer[] answer = new Answer[size];
		return (Answer[])(list.toArray(answer));
	}
	
	
	@RequestMapping("/history")	
	public Question[] getQuestionsHistory(@RequestParam(value="user_id") int userId){
		Session session = HibernateSessionFactory.getSession();
		String query = "from Question Q where Q.user=" + userId;
		List<Question> list = (List<Question>)(session.createQuery(query).list());
		session.close();
		int size = list.size();
		Question[] questions = new Question[size];
		return (Question[])(list.toArray(questions));
	}
	
	@RequestMapping("/add")	
	public int addQuestion(
			@RequestParam(value="title") String title,
			@RequestParam(value="des") String des,
			@RequestParam(value="user_id") int userId,
			@RequestParam(value="time") String time
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
	
}
