// import { Button, Row,  } from 'reactstrap';
// import { Fragment } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { QuestionList } from './Data';
// import { ROUTE_ANSWER, API_CALCULATE } from '../constants';
// import ProgressBar from "@ramonak/react-progress-bar";
// import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
// import axios from 'axios'



// const Question = (props) => {
//     const { AnswerList, setAnswerList} = props
//     const navigate = useNavigate()
//     const params = useParams()
//     const [questionList, setQuestionList] = useState([])
//     const [Completed, setCompleted] = useState(0)

//     const id = params.id

    
//     console.log(AnswerList)

//     const AnswerClicked = (props) => {
//         // navigate('/question/2') // 절대 경로로 이동

//         if (parseInt(id) === 12) {
//             const updatedAnswerList = [...AnswerList];
//             updatedAnswerList[id -1] = props;
//             setAnswerList(updatedAnswerList);

//             axios.post(API_CALCULATE, { data: updatedAnswerList })
//                 .then(response => {
//                     // 요청이 성공했을 때 처리
//                     console.log(response.data)
//                     console.log('sucess') 
//                 })
//                 .catch(error => {
//                     console.log(error)
//                     // 요청이 실패했을 때 처리
//                 });
//             navigate(ROUTE_ANSWER)
//         } else {
//             const updatedAnswerList = [...AnswerList];
//             updatedAnswerList[id -1] = props;
//             setAnswerList(updatedAnswerList);
//             navigate(`/question/${parseInt(id)+1}`)
//         }
//     }

//     const BackClicked = () => {
//         if ((parseInt(id)-1) !== 0 ) {
//             const updatedAnswerList = [...AnswerList];
//             updatedAnswerList[id -2] = -1;
//             setAnswerList(updatedAnswerList);
//             navigate(`/question/${parseInt(id)-1}`)

//         }
//     }
    
//     useEffect(() => {
//         setQuestionList(QuestionList[id-1])
//         setCompleted(Math.floor((id / 12) * 100))
//     },[id])

//     return (
//         <Fragment>
//         <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//             <Row style={{ flex: '20%', display: 'flex', justifyContent: 'center', alignItems: 'end' }}>
//             <div style={{ fontWeight: '800', fontSize: '25px' }}>
//                  {questionList && questionList.question}
//             </div>
//             </Row>
//             <Row style={{ flex: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <BsChevronLeft
//                     onClick={BackClicked}
//                 />
//                 <div style={{width:'70%'}}>
//                     <ProgressBar
//                         className={"d-flex justify-content-center align-center"}
//                         completed={Completed}
//                         bgColor={'#99CCFF'}
//                         width={'100%'}
//                         labelAlignment={'right'}
//                     />
//                 </div>
//                 <BsChevronRight/>

//             </Row>
//             <Row style={{ flex: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//             </Row>


//             <Row style={{ flex: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
//                 <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%' }}>
//                     <Button
//                     color='primary'
//                     style={{
//                         backgroundColor: '#99CCFF',
//                         borderRadius: '15px',
//                         border: '3px solid #99CCFF',
//                         fontWeight: '800',
//                         width: '70%', // 버튼의 고정 너비 설정
//                         whiteSpace: 'normal', // 텍스트가 버튼 내에서 자동으로 줄 바꿈될 수 있도록 함
//                         textAlign: 'center',
//                         height:'70%'
//                         // 텍스트를 가운데 정렬
//                       }}
//                     onClick={() => AnswerClicked(questionList && questionList.answers && questionList.answers[0].value)}
//                     >
//                         {questionList && questionList.answers && questionList.answers[0].sentence}
//                     </Button>
//                 </div>
//                 <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%'  }}>
//                     <Button
//                     color='primary'
//                     style={{
//                         backgroundColor: '#99CCFF',
//                         borderRadius: '15px',
//                         border: '3px solid #99CCFF',
//                         fontWeight: '800',
//                         width: '70%', // 버튼의 고정 너비 설정
//                         whiteSpace: 'normal', // 텍스트가 버튼 내에서 자동으로 줄 바꿈될 수 있도록 함
//                         textAlign: 'center', // 텍스트를 가운데 정렬
//                         height:'70%'
//                       }}
//                     onClick={() => AnswerClicked(questionList && questionList.answers && questionList.answers[1].value)}

//                     >
//                         {questionList && questionList.answers && questionList.answers[1].sentence}
//                     </Button>
//                 </div>
//             </Row>
//             <Row style={{ flex: '20%', display: 'flex', justifyContent: 'center', alignItems: 'end' }}>

//             </Row>

//         </div>
//         </Fragment>
//     );
// }

// export default Question;
