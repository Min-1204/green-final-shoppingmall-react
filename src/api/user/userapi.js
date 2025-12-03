import axios from "axios";

const API_SERVER = "http://localhost:8080";
const USER_API = `${API_SERVER}/api/user`;

export const signUpApi = async (signUpForm) => {
  try {
    const formatBirthDate = () => {
      const year = signUpForm.birthY || "";
      const month = signUpForm.birthM ? signUpForm.birthM.padStart(2, "0") : ""; // 2자리 읽기 1자리면 0추가
      const day = signUpForm.birthD ? signUpForm.birthD.padStart(2, "0") : ""; // 2자리 읽기 1자리면 0추가

      // 모두 입력되었을 때만 날짜 생성
      if (year && month && day) {
        return `${year}-${month}-${day}`; //  "2025-11-23" 형식
      }
      return null; // 입력 안 됐으면 null
    };

    const requestData = {
      loginId: signUpForm.loginId, // 로그인아이디
      password: signUpForm.password, // 비밀번호
      name: signUpForm.name, // 유저이름
      email: signUpForm.email, // 유저이메일
      phoneNumber: signUpForm.phoneNumber, // 핸드폰번호
      birthDate: formatBirthDate(),
      postalCode: signUpForm.postalCode, // 우편번호
      address: signUpForm.address, // 기본주소
      addressDetail: signUpForm.addressDetail, // 상세주소
      smsAgreement: signUpForm.smsAgreement, // SMS 알림 동의
      emailAgreement: signUpForm.emailAgreement, // Email 알림 동의
    };

    console.log("백엔드로 보내는 데이터 콘솔", requestData);

    const res = await axios.post(`${USER_API}/signup`, requestData);
    console.log("1) 여기는 응답 데이터 확인 콘솔", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "2) 회원가입 API 에러",
      error.response?.data || error.message
    );
    throw error.response?.data.message || "회원가입에 실패했습니다.";
  }
};

export const loginApi = async (loginForm) => {
  try {
    console.log("1) 로그인 API 호출 + 요청 데이터", loginForm);
    const res = await axios.post(`${USER_API}/login`, loginForm);
    console.log("2) 로그인 API + 응답 데이터", res.data);
    if (!res.data) {
      throw new Error("데이터가 없습니다");
    }
    return res.data;
  } catch (error) {
    console.error("3) 로그인 API 에러", error);
    throw error;
  }
};

//prettier-ignore
export const checkLoginIdApi = async (loginId) => {
  try {
    console.log("1) 아이디 중복확인 API", loginId);
    const response = await axios.get(`${USER_API}/check-loginId`, { params: { loginId } });  // 받은 loginId를 get사용 params 방식으로 전달
    // Query Parameter 형태로 변환. 즉, .../api/user/check-loginId?loginId=사용자입력값 형태로 요청이 전송됨
    console.log("2) 백엔드 응답 중복확인", response);
    return response.data;
  } catch (error) {
    console.log("3 ) 중복확인 API 에러", error);
    throw error;
  }
};

//prettier-ignore
export const getProfileApi = async (loginId) => {
  try {
    const response = await axios.get(`${USER_API}/profile`, { params: { loginId }});
    console.log("1) 프로필 조회 API : ", response.data);
    return response.data;
  } catch (error) {
    console.log("2) 프로필 조회 에러 : ", error);
    throw error;
  }
};

//prettier-ignore
export const modifyProfileApi = async (modifyForm) => {
  try{ 
  console.log("1) 개인정보수정 출력", modifyForm);
  const response = await axios.put(`${USER_API}/profile-modify`, modifyForm);
  console.log("2) 개인정보수정 백엔드 응답 :", response.data);
  return response.data;
  } catch (error) {
    console.log("3) 개인정보수정 API 에러", error);
    throw error;
  }
};

//prettier-ignore
export const changePasswordApi = async (passwordForm) => {
  const response = await axios.patch(`${USER_API}/password-change`, passwordForm);
  console.log("1) 여기는 비밀번호변경 출력", passwordForm);
  return response.data;
};
