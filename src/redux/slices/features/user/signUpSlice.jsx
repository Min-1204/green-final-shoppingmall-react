export const signupSlice = {
  // prettier-ignore
  signUp: (state, action) => { // signUp Reducer
    // action.payload는 { terms, signUpForm } 형태
    const newUserData = action.payload.signUpForm; // signUp Reducer가 호출되는곳은 signUpPage이다. 
    // 해당 페이지에서 signUpForm(사용자정보)를 가져옴과 동시에 newUserData라는 변수에 복사한다.

    const localUsers = localStorage.getItem("users"); // 로컬스토리지에 저장된 users 라는 키값을 가져온다. 현재 문자열 상태
    const users = localUsers ? JSON.parse(localUsers) : []; // 로컬스토리지에서 가져온데이터가 null아닌 true면 객체로 변환해서 users에 담고 아니면 []빈배열을 담는다.

    // prettier-ignore
    // .some() 조건을 하나라도 만족하는 요소가 있으면 즉시 true가 되어 그 요소를 반환한다. 논리연산자기능
    const isDuplicate = users.some((u) => u.loginId === newUserData.loginId); // users에 some 메서드를 사용해서 같은아이디가 존재하는지 검증
    if (isDuplicate) { // 만약에 true라면
      state.error = "이미 존재하는 아이디입니다."; // 해당 State에 error에 해당 문자열을 저장
      return; // 중복이면 여기서 Reducer 종료
    }

    // 아니라면 => 회원 추가
    const userWithId = {
      ...newUserData, // newUserData의 기존데이터를 객체를 벗긴 후에 데이터를 넣고
      terms: action.payload.terms, // terms: 속성에 action.payload로 받은 .terms를 저장
    };
    users.push(userWithId);

    // 4. 로컬스토리지에 저장
    localStorage.setItem("users", JSON.stringify(users));

    console.log("✅ SignUpSlice: 회원가입 완료", userWithId);
    state.error = null; // 성공 시 에러 초기화
  },
};
