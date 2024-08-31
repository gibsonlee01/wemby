import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import Cookies from 'js-cookie'; // 쿠키 라이브러리 추가


const PaymentSuccess = () => {

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const pg_token = urlParams.get('pg_token');
        const userId = localStorage.getItem('userId');
        const savedTid = localStorage.getItem('tid');  // localStorage에서 tid 가져오기.
        //이거 가져온 후에는 remove로 지우는게 나을 거 같음. 

        console.log(`pg_token : ${pg_token}`);
        console.log(`savedTid : ${savedTid}`);
        console.log(`userId : ${userId}`);

        if (pg_token && savedTid) {
            handlePaymentConfirmation(pg_token, savedTid, userId);
        }
    }, []);

    const handlePaymentConfirmation = async (pg_token, savedTid, userId) => {
        try {
            const response = await axios.post('/api/kakaopay/approve', {
                pg_token: pg_token,  // 리다이렉트된 페이지에서 받은 pg_token
                tid: savedTid,       // 결제 준비 단계에서 받은 tid를 저장해두어야 함
            }, {
                headers: { // 헤더에 Content-Type을 application/json으로 설정
                    'Content-Type': 'application/json',
                }
            });
            //approval id같은데, 응답에서 결제 승인 아이디가 존재 시 결제에 성공한 것. 
            const aid = response.data.aid;
            console.log(`aid : ${aid}`);
            if (aid !== null) {
                Cookies.set(`paymentStatus${userId}`, 'success'); // 쿠키에 결제 완료 상태 저장
                console.log(document.cookie);

                Swal.fire({
                    icon: 'success',
                    title: '결제 성공',
                    text: '결제가 완료되었습니다.',
                }).then(() => {
                    window.location.href = '/list'; // 리다이렉트할 URL로 변경
                });

            } else {
                Swal.fire({
                    icon: 'error',
                    title: '결제 실패',
                    text: '결제 과정이 정상적으로 처리되지 않았습니다.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '결제 오류',
                text: '결제 승인 중 오류가 발생했습니다.',
            });
        }
    };

    return (
        <div>결제 처리 중...</div>
    )
}

export default PaymentSuccess;
