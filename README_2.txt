설계도

Backend

프론트에서 넘겨주는 값 : [ 0, 0,  …, 1] 12자리 list -> (Question.js에서 post으로 보내줄껄?)

⇒ 저장은 안 해도 된다.
⇒ 문항을 %4으로 0123 0123 0123 이렇게 나오는데 저 0 3개 더해서 홀 짝 판단
⇒ Type이 결정
⇒ Type 이름과 이미지와 부연설명을 다시 프론트로 넘겨준다.


Frontend

* SplashScreen-> 시작 페이지
* QuestionMain.js는 Question.js의 질문들을 가지고서 문항별로 답을 입력 받는다
  마지막 문항까지 입력을 받으면 axios.post으로 AnswerList를 django로 보내주기(Question.js에서 처리에정)
* Answer.js에서 처리하는 것들
결과를 보여주기
공유가 가능하게 URL 복사 기능 -> 가능하면 카카오톡&인스타(가능하면) api사용 
이미지 저장 


Server

김정훈 화이팅
