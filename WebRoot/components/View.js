var View = React.createClass({
	getInitialState: function() {
		return {
			question:null 
		};
	},
	toQuestionDetail : function(question){
		this.setState({
			question:question 
		},function(){
			console.log(this.state);
			window.location.hash = "#" + this.state.question.id;
		});			
	},
	getView : function() {
		var hash = window.location.hash.substring(1);
		if(!hash){
			return (
				<QuestionListView questions={qList} toQuestionDetail={this.toQuestionDetail} />
			);
		}
		if(!isNaN(hash)){
			var questionId = hash;
			return (
				<QuestionDetailView question={this.state.question} />
			);
			
		}
		if(hash=='questionHistory'){
			return (
				<QuestionHistoryView toQuestionDetail={this.toQuestionDetail}/>
			);
		}
		if(hash=='answerHistory'){
			return (
				<AnswerHistoryView />
			);
		}
		return (
				<QuestionListView />
			);
	},
	render : function() {
		var view = this.getView();
		return(
			<div className="view">
				{view}
			</div>
		);
	}
});