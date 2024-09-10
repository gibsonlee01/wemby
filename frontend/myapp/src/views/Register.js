import React, { Fragment,useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Row } from 'reactstrap';
import { Avatar,  } from 'antd';
import BasicImage from '../photo/plus.svg'; 
import axios from 'axios';
import { API_REGISTER } from '../constants';
import { useNavigate } from 'react-router-dom';
// import { Locale } from '../constants';
import Cookies from 'js-cookie'; // 쿠키 라이브러리 추가

// 유효성 검사 스키마 정의
const schema = yup.object().shape({
  name: yup.string().max(15, '조금만 줄여주세요').required('이름을 입력하세요'),
  gender: yup.string().required('성별을 선택하세요'),
  instagramId: yup.string().matches(/^[A-Za-z0-9_.]+$/, '인스타그램 아이디를 다시 확인해주세요')
  .required('인스타그램 아이디를 입력하세요'),
  bio: yup.string().max(50, '조금만 줄여주세요').required('간단한 자기소개를 입력하세요'),
});


const Register = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: 'M', // gender의 초기값을 'M'으로 설정
    },
  });

  const fileInput = useRef(null);
  const [image, setImage] = useState(BasicImage);
  const [imagefile, setImagefile] = useState();
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(0.2); // 초기 opacity 값을 1로 설정
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  const handleMouseDown = () => {
    setOpacity(1) // 마우스 다운 시 투명도를 0.5로 설정
  };

  const handleMouseUp = () => {
    setOpacity(1); // 마우스 업 시 투명도를 다시 1로 설정
  };

  const formData = new FormData();


  const onSubmit = async (data) => {
    formData.append('name', data.name);
    formData.append('gender', data.gender);
    formData.append('instagram_id', data.instagramId);
    formData.append('bio', data.bio);
    formData.append('likes', 0)
    if (imagefile){
      formData.append('profile_picture', imagefile);
    }
    try {
      const response = await axios.post(API_REGISTER, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      Cookies.set('visit', 'yes'); // 들어온적 있는 유저 체크
      navigate('/list');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('파일 업로드 중 오류가 발생했습니다.');
      window.location.reload(); // 창 리로드
    }
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImagefile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    // 윈도우 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);


  const styles = {
    customInput: {
      backgroundColor: '#f0f0f0',
      borderRadius: '10px',
      border: '1px solid #ccc',
      paddingTop: '10px',
      paddingBottom: '10px',
      width: '100%', // 고정 너비 설정
      boxSizing: 'border-box', // 패딩 포함
      fontWeight: '600',

    },

    largeBlackText: {
      width: "100%",
      paddingTop: '30px',
      fontWeight: '600',
      fontSize: '15px',
      color:'black',
      opacity: '0.7',
    },

    middleBlackText:{
      width: "100%",
      fontWeight: '550',
      fontSize: '13px',
      color:'black',
      opacity: '0.5',
      paddingTop: '3px',
    },
    errorMessage: {
      color: '#ff4d4f', // 원하는 글씨 색상으로 변경
      fontWeight: '800',
      fontSize: '15px',
      paddingTop:'5px'

    },
    button: {
      width:'100%',
      background: 'linear-gradient(to right, #DB4455, #FF586A)', 
      color: 'white', // 버튼 텍스트 색상
      border: 'none', // 버튼 테두리 제거
      borderRadius: '10px', // 버튼 모서리 둥글게
      fontSize: '16px', // 버튼 글씨 크기
      fontWeight: 'bold', // 버튼 글씨 두껍게
      cursor: 'pointer', // 마우스를 올렸을 때 포인터 커서
      padding:'15px',
      marginTop: '20px', // 버튼 위쪽 마진
    },
    buttonHover: {
      backgroundColor: '#FF506A', // 버튼 호버 시 배경색
    },
    formStyle: {
      padding: '15px',
      width: windowWidth <= 1000 ? '80%' : 'auto'
    }
  };
  return (
    <Fragment>
      <Row style={{alignItems:'center', justifyContent:'center', display:'flex' }}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.formStyle}>
        <Row>
          <div style={{
            width: "100%",
            backgroundColor: 'white', // 배경색을 흰색으로 설정
            paddingTop: '5%',
            borderRadius:'20px',
          }}>
            <div style={{
              background: 'linear-gradient(to right, #FF2B70, #FF586A)', // 그라디언트 색상
              WebkitBackgroundClip: 'text', // 텍스트 클립
              WebkitTextFillColor: 'transparent', // 텍스트 색상 투명
              fontWeight: '600',
              fontSize: '30px',
            }}>
              반가워요!
            </div>
          </div>  
          <div style={{
            width: "100%",
            backgroundColor: 'white', // 배경색을 흰색으로 설정
          }}>
            <div style={{
              background: 'linear-gradient(to right, #FF2B70, #FF586A)', // 그라디언트 색상
              WebkitBackgroundClip: 'text', // 텍스트 클립
              WebkitTextFillColor: 'transparent', // 텍스트 색상 투명
              fontWeight: '500',
              fontSize: '13px',
              opacity: '0.7',
            }}>
              # 등록하신 프로필은 개인정보 보호를 위해<br/>
              축제가 끝나면 삭제됩니다!
            </div>
          </div>  
        </Row> 

        <Row>
          <div style={styles.largeBlackText}>
              닉네임을 알려주세요
          </div>  
          <Row>
            <div style={{paddingTop:'10px'}}>
              <input style={styles.customInput} {...register('name')} />
              {errors.name && <div style={styles.errorMessage}>{errors.name.message}</div>}
            </div>
          </Row>
        </Row>

        <Row>
          <div style={styles.largeBlackText}>
              성별을 알려주세요
          </div>  
          <Row style={{paddingTop:'10px'}}>
              <div style={{display:'flex'}}>
                <label style={{marginRight:'20%', fontSize:'12px'}}>
                  남성
                  <input 
                    type="radio" 
                    value="M" 
                    {...register('gender')} 
                    checked={watch('gender') === 'M'}
                  />
                </label>
                <label style={{marginRight:'20%', fontSize:'12px'}}>
                  여성
                  <input 
                    type="radio" 
                    value="W" 
                    {...register('gender')} 
                    checked={watch('gender') === 'W'}
                  />
                </label>
                {/* <label style={{ fontSize:'12px'}}>
                  기타
                  <input 
                    type="radio" 
                    value="E" 
                    {...register('gender')} 
                    checked={watch('gender') === 'E'}
                  />
                </label> */}
              </div>
              <div>
                {errors.gender && <div style={styles.errorMessage}>{errors.gender.message}</div>}
              </div>
            </Row>
        </Row>

        <Row>
          <div style={styles.largeBlackText}>
              프로필 사진
          </div>  
          <div style={styles.middleBlackText}>
              #필수로 넣지 않아도 돼요
          </div> 

          <Row>
            <div style={{paddingTop:'10px', paddingBottom:'10px'}}>
              <Row style={{display:'flex', alignItems:"center", justifyContent:'center', backgroundColor:'#e9ecef', borderRadius:'5%'}}>
              <Avatar 
                src={image} 
                style={{ margin: '20px' , opacity: opacity}} 
                size={150} 
                //버그수정요망 
                onClick={() => {
                  if (!('ontouchstart' in window)) { // PC인 경우
                    fileInput.current.click(); // 파일 선택 창 열기
                  }
                }} 
                onTouchStart={(e) => {
                  handleMouseDown(e); // 터치 시작 시 투명도 변경
                }}
                onTouchEnd={(e) => {
                  handleMouseUp(e); // 터치 끝날 때 투명도 원상태로
                  fileInput.current.click();  // 파일 선택 창 열기 (모바일)
                }}
                onMouseDown={handleMouseDown}  // 마우스 다운 시 투명도 변경
                onMouseUp={handleMouseUp}  // 마우스 업 시 투명도 원상태로
               
              />
              <input 
                type="file" 
                // {...register('profileImage')} 
                ref={fileInput} 
                accept="image/jpg,image/jpeg,image/png,image/gif,image/webp" 
                style={{ display: 'none' }} 
                onChange={handleImageChange}
              />
              </Row>
            </div>
            
          </Row>
        </Row>

        <Row>
          <div style={styles.largeBlackText}>
              인스타그램 아이디
          </div>  
          <div style={styles.middleBlackText}>
              #친구가 연락할 수 있게 인스타 아이디를 알려주세요.
          </div> 
          <Row>
            <div style={{paddingTop:'10px'}}>
              <input style={styles.customInput} {...register('instagramId')} />
              {errors.instagramId && <div style={styles.errorMessage}>{errors.instagramId.message}</div>}
            </div>
          </Row>
        </Row>

        <Row>
          <div style={styles.largeBlackText}>
              자기소개를 해주세요
          </div>  
          <Row>
            <div style={{paddingTop:'10px'}}>
              <textarea
              style={styles.customInput} 
              placeholder=' xx 부스에서 같이 놀 사람!'
              {...register('bio')} 
              rows="4" // 텍스트 필드의 높이를 설정합니다
              />
              {errors.bio && <div style={styles.errorMessage}>{errors.bio.message}</div>}
            </div>
          </Row>
        </Row>
        <Row style={{alignItems:'center', justifyContent:'center', display:'flex', marginBottom:'10%'}}>
          <button 
            type="submit" 
            style={styles.button} 
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          >
            등록하기
          </button> 
               
        </Row>
      </form>
      </Row>
      <footer style={{
          width: '100%',
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #e9ecef',
          marginTop: '50px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: '14px', color: '#6c757d', textAlign:'left'}}>
            <p>상호명: LETT(레트) | 대표자명: 이지우 </p>
            <p> 개인정보책임자: 김정훈 </p>
            <p>사업자 등록번호: 123-45-67890</p>
            <p>주소: 판교로 430</p>
            <p>
              <a href="https://sites.google.com/d/1qyP9cE6VXBb1TTGKAsGRQmaqrrp3H0v6/p/1y54ANMr-nIss0Y2HWsmoSCPRPFYCRB8t/edit" style={{ color: '#007bff', textDecoration: 'none' }}>이용약관</a> | 
              <a href="https://sites.google.com/d/1KD3pqnP4JLVAImuXQKJYQwPtIi4zTDWk/p/1MBBpxJ7_i7pNFLLhzwZZWXTMO_SRHYUM/edit" style={{ color: '#007bff', textDecoration: 'none', marginLeft: '10px' }}>개인정보처리방침</a>
            </p>
            <p>© 2024 wemby. All rights reserved.</p>
          </div>
        </footer>

    </Fragment>
  );
};

export default Register;
