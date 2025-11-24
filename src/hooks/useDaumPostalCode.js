import { useCallback } from "react";

export const useDaumPostalCode = () => {
  const openPostcode = useCallback((onComplete) => {
    if (!window.daum || !window.daum.Postcode) {
      alert("주소 검색 서비스를 불러올 수 없습니다. 페이지를 새로고침하세요");
      return;
    }

    new window.daum.Postcode({
      onComplete: function (data) {
        const roadAddr = data.roadAddress;
        const jibunAddr = data.jibunAddress;

        const fullAddress =
          data.userSelectedType === "R" ? roadAddr : jibunAddr;

        onComplete({
          zonecode: data.zonecode,
          address: fullAddress,
        });
      },
    }).open();
  }, []);

  return { openPostcode };
};
