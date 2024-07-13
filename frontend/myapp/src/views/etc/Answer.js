// import React, { Fragment } from 'react';
// import html2canvas from 'html2canvas';
// import { saveAs } from 'file-saver';
// import { Button, Row } from 'reactstrap';

// const Answer = () => {
//   const captureAndDownload = () => {
//     const captureArea = document.documentElement // 캡처할 영역의 ID
//     html2canvas(captureArea)
//       .then((canvas) => {
//         // Canvas 이미지를 Blob으로 변환
//         canvas.toBlob((blob) => {
//           // Blob을 파일로 변환하고 다운로드
//           saveAs(blob, 'captured_page.png'); // 파일 이름 설정
//         });
//       });
//   };

//   return (
//     <Fragment>
//       <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//         <Row style={{ flex: '30%', display: 'flex', justifyContent: 'center', alignItems: 'end' }}>
//           <div style={{ fontWeight: '800', fontSize: '25px' }}>
//             자유로운 프로도
//           </div>
//         </Row>
//         <Row id="capture-area" style={{ flex: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <img src='https://www.shinailbo.co.kr/news/photo/202108/1450050_648674_1419.jpg' width='300px' height='300px' alt='Icon' />
//         </Row>
//         <Row style={{ flex: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           뭐시기뭐시기
//           뭐시기뭐시기
//           뭐시깽이
//         </Row>
//         <Button onClick={captureAndDownload}>
//           페이지 캡처 및 다운로드
//         </Button>
//       </div>
//     </Fragment>
//   );
// };

// export default Answer;
