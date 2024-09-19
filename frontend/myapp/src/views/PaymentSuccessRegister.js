import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { API_REGISTER } from '../constants';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessRegister = () => {
    const navigate = useNavigate();

    const base64ToBlob = (base64, type = 'image/jpeg') => {
        const byteCharacters = atob(base64); // Base64 문자열 디코딩
        const byteNumbers = new Array(byteCharacters.length);
    
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
    
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: type }); // Blob 객체 생성
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const pg_token = urlParams.get('pg_token');
        const savedTid = localStorage.getItem('register_tid');  // localStorage에서 tid 가져오기.

        const handlePaymentConfirmation = async (pg_token, savedTid) => {
            console.log('작동중');
            try {
                const response = await axios.post('/api/kakaopay/approve', {
                    pg_token: pg_token,  // 리다이렉트된 페이지에서 받은 pg_token
                    tid: savedTid,       // 결제 준비 단계에서 받은 tid를 저장해두어야 함
                }, {
                    headers: { // 헤더에 Content-Type을 application/json으로 설정
                        'Content-Type': 'application/json',
                    }
                });
                // approval id같은데, 응답에서 결제 승인 아이디가 존재 시 결제에 성공한 것. 
                const aid = response.data.aid;
                console.log(`aid : ${aid}`);
                
                if (aid !== null) {
                    Swal.fire({
                        icon: 'success',
                        title: '결제 성공',
                        text: '결제가 완료되었습니다.',
                    }).then(() => {
                        // 결제가 성공했을 때 formData를 가져와서 onSubmit 호출
                        const formData = JSON.parse(localStorage.getItem('formData')); // 로컬 스토리지에서 가져옴
                        // profile_picture를 로컬 스토리지에서 가져옴
                        onSubmit(formData); // onSubmit 호출
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

        const onSubmit = async (data) => {
            const formDataObject = {
                name: data.name,
                gender: data.gender,
                instagram_id: data.instagramId,
                bio: data.bio,
                likes: 0,
            };
        
            const profilePicture = localStorage.getItem('profile_picture'); // 로컬 스토리지에서 profile_picture 가져오기
        
            const formData = new FormData();
            // 이미지가 있는 경우 Blob으로 변환하여 FormData에 추가
            if (profilePicture) {
                const blob = base64ToBlob(profilePicture.split(',')[1], 'image/jpeg'); // Base64 문자열에서 prefix 제거 후 Blob 생성
                formData.append('profile_picture', blob, 'profile_picture.jpg'); // FormData에 Blob 추가
            }
        
            // 나머지 데이터 추가
            for (const key in formDataObject) {
                formData.append(key, formDataObject[key]);
            }
        
            try {
                const response = await axios.post(API_REGISTER, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);
                localStorage.clear()
                navigate('/list');
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('파일 업로드 중 오류가 발생했습니다.');
                window.location.reload(); // 창 리로드
            }
        };

        if (pg_token && savedTid) {
            handlePaymentConfirmation(pg_token, savedTid);
        }

    }, [navigate]); // navigate를 의존성 배열에 추가

    return (
        <div>결제 프로필 볼 수 있게 처리 중...</div>
    );
}

export default PaymentSuccessRegister;
