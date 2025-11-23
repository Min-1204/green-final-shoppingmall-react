import axios from "axios";

const APISERVER = "http://localhost:8080";
const LOGIN_USER = `${APISERVER}/api/user`;

export const signUpApi = async (signUpForm) => {
  try {
    const formatBirthDate = () => {
      const year = signUpForm.birthY || "";
      const month = signUpForm.birthM ? signUpForm.birthM.padStart(2, "0") : "";
      const day = signUpForm.birthD ? signUpForm.birthD.padStart(2, "0") : "";

      // 모두 입력되었을 때만 날짜 생성
      if (year && month && day) {
        return `${year}-${month}-${day}`; // ✅ "2025-11-23" 형식
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
      emailAgreement: signUpForm.emailAgreement // Email 알림 동의
    };

    console.log("백엔드로 보내는 데이터 콘솔", requestData);

    const res = await axios.post(`${LOGIN_USER}/signup`, requestData);
    console.log("여기는 응답 데이터 확인 콘솔", res.data);
    return res.data;
  } catch (error) {
    console.error("회원가입 API 에러", error.response?.data || error.message);
    throw error.response?.data.message || "회원가입에 실패했습니다.";
  }
};
