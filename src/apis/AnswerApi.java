package apis;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import bean.Answer;
import bean.Question;
import bean.User;

@Path("/answer")
public class AnswerApi {
	
	@POST
	@Path("/add")
	@Produces(MediaType.APPLICATION_JSON)
	public int addQuestion(
			@FormParam(value="question_id") String questionId,
			@FormParam(value="content") String content,
			@FormParam(value="user_id") int userId,
			@FormParam(value="time") String time
			){
		Answer a = new Answer();
		a.setContent(content);
		a.setTime(time);
		return 200;
	}
	
	@POST
	@Path("/history")
	@Produces(MediaType.APPLICATION_JSON)
	public Answer[] getAnswersHistory(){
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
	
}
