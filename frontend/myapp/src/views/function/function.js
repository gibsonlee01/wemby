import Swal from 'sweetalert2';
import axios from 'axios';

export const getRandomColor = () => {
    const baseColor = { r: 255, g: 91, b: 91 }; // #ff5b5b의 RGB 값
    const variation = 13; // 색상 변화의 범위

    const randomValue = (value) =>
        Math.max(0, Math.min(255, value + Math.floor(Math.random() * (variation * 2)) - variation));

    const r = randomValue(baseColor.r);
    const g = randomValue(baseColor.g);
    const b = randomValue(baseColor.b);

    return `rgb(${r}, ${g}, ${b})`;
};

const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
};

export const handlePaymentRegister = async () => {
    console.log('들어왔다')
    try {
        const response = await axios.post('/api/kakaopay/register/ready', {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = response.data;
        localStorage.setItem('register_tid', data.tid); // tid를 저장해둠

        if (isMobileDevice()) {
            if (data.next_redirect_mobile_url) {
                window.location.href = data.next_redirect_mobile_url;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '결제 오류',
                    text: '결제 페이지로 이동할 수 없습니다.',
                });
            }
        } else {
            if (data.next_redirect_pc_url) {
                window.location.href = data.next_redirect_pc_url;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '결제 오류',
                    text: '결제 페이지로 이동할 수 없습니다.',
                });
            }
        }

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: '결제 오류',
            text: '결제 준비 중 오류가 발생했습니다.',
        });
    }
};
