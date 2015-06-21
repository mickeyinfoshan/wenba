	var renderDispatch = function(){
		var hash = window.location.hash.substring(1);
		var view = getView(hash);
		if(view){
			React.render(view,document.getElementById('viewWrapper'));
		}		
	};
	var getView = function(hash) {
		if(!hash){
			return (
				<QuestionListView questions={qList} />
			);
		}
		if(!hash.isNaN()){
			var questionId = hash;
			return (
				<QuestionDetailView question={qList[questionId]} answers={aList} />
			);
		}
		if(hash=='questionHistory'){
			return (
				<QuestionHistoryView questions={qList} />
			);
		}
		if(hash=='answerHistory'){
			return (
				<AnswerHistoryView answers={aList} />
			);
		}
		return (
				<QuestionListView questions={qList} />
			);
	};