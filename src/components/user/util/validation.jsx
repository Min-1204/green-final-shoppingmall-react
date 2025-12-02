//prettier-ignore
export const validate = (signUpForm) => { // 유효성 검사 함수
    const e = {}; // 빈 객체 속성 및 데이터추가 가능
    const loginIdRegex = /^[a-zA-Z0-9]+$/; // 영어,숫자만 허용

    // 아이디 검사 로직
    if (!signUpForm.loginId || signUpForm.loginId.length < 4) { e.loginId = "아이디는 4자 이상 입력하세요."; 
    } else if (!loginIdRegex.test(signUpForm.loginId)) { e.loginId = "아이디는 영어(대/소문자와)와 숫자만 사용할 수 있습니다."; }

    // 비밀번호 검사 로직
    if (!signUpForm.password || signUpForm.password.length < 8)  e.password = "비밀번호는 8자 이상 입력하세요.";
    if (signUpForm.confirmPassword !== signUpForm.password)      e.confirmPassword = "비밀번호가 일치하지 않습니다.";

    // 이름 검사 로직
    if (!signUpForm.name) e.name = "이름을 입력하세요.";

    // 생년월일 검사 로직
    if (!signUpForm.birthY || !signUpForm.birthM || !signUpForm.birthD) { e.birthDate = "생년월일을 모두 입력하세요.";
    } else { const year = parseInt(signUpForm.birthY);
             const month = parseInt(signUpForm.birthM);
             const day = parseInt(signUpForm.birthD);
      if (year < 1900 || year > new Date().getFullYear()) { e.birthDate = "올바른 연도를 입력하세요.";
      } else if (month < 1 || month > 12) {   e.birthDate = "월은 1~12 사이여야 합니다.";
      } else if (day < 1 || day > 31)     {   e.birthDate = "일은 1~31 사이여야 합니다.";  }}

    // 이메일 검사 로직
    if (!signUpForm.email || !/^\S+@\S+\.\S+$/.test(signUpForm.email))            e.email = "이메일 형식 오류";

    // 연락처 검사 로직
    if (!signUpForm.phoneNumber || !/^\d{11}$/.test(signUpForm.phoneNumber))   e.phoneNumber = "휴대전화 숫자만 11자리 입력하세요.";

    // 우편번호 검사 로직
    if (!signUpForm.postalCode || !/^\d{5}$/.test(signUpForm.postalCode))         e.postalCode = "우편번호는 5자리 숫자입니다.";

    // 일반주소 검사 로직
    if (!signUpForm.address) e.address = "기본 주소를 입력하세요.";           

    // 상세주소 검사 로직
    if (!signUpForm.addressDetail) e.addressDetail = "상세 주소를 입력하세요.";

    // 에러 객체 반환~
    return e;
  };
