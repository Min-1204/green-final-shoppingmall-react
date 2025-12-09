import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const Pagination = ({ pageResponseDTO }) => {
  //props로 백엔드의 PageResponseDTO를 받음

  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  //URL 쿼리스트링 읽기 (?page=1&size=10)

  const {
    //ReviewPageResponseDTO 정보 구조 분해 할당
    totalDataCount, // totalReviews에 해당
    pageNumList, // 페이지 버튼 목록 (1~10, 11~20 등)
    prevPageGroup, // 이전 페이지 그룹 존재 여부
    nextPageGroup, // 다음 페이지 그룹 존재 여부
    prevPage, // < 버튼 클릭 시 이동할 페이지
    nextPage, // > 버튼 클릭 시 이동할 페이지
    reviewPageRequestDTO, // page, size 정보 포함
  } = pageResponseDTO;

  const getNum = (param, defaultValue) => {
    //URL에서 읽어온 쿼리 파라미터(page, size) 문자열을 숫자로 변환
    if (!param) return defaultValue; //param이 없으면 defaultValue 반환
    return parseInt(param, 10); //문자열 -> 10진수 숫자 변환
  };

  const page = reviewPageRequestDTO.page || 1;
  const size = reviewPageRequestDTO.size || 10;

  const totalPage = totalDataCount > 0 ? Math.ceil(totalDataCount / size) : 1;
  //총 페이지 수 계산 , totalDataCount가 0이어도 최소 1페이지 표시

  const moveToPage = (pageNum) => {
    //페이지 범위 (1 ~ totalPage)로 제한
    if (pageNum < 1) pageNum = 1; //최소값: 1페이지
    if (pageNum > totalPage) pageNum = totalPage; //최대값: 마지막 페이지

    const newParams = {
      page: pageNum,
      size,
      sort: queryParams.get("sort") || "latest", // sort가 없으면 기본값 'latest'
    };

    const queryStr = createSearchParams(newParams).toString();
    //현재 페이지와 사이즈 조합을 문자열로 만들어 저장 "page=1&size=10"
    navigate({ search: queryStr });
  };

  return (
    <div className="flex justify-center mt-8 gap-2">
      {/* << 처음 페이지 */}
      <button
        className="px-3 py-1 border border-zinc-300 rounded text-sm cursor-pointer"
        onClick={() => moveToPage(1)}
      >
        {"<<"}
      </button>

      {/* < 이전 페이지 그룹 이동 */}
      {prevPageGroup && ( // 이전 페이지 그룹이 있을 때만 버튼 표시
        <button
          className="px-3 py-1 border border-zinc-300 rounded text-sm cursor-pointer"
          // prevPage는 ReviewPageResponseDTO에서 계산된 값
          onClick={() => moveToPage(prevPage)}
        >
          {"<"}
        </button>
      )}

      {/* 페이지 번호 렌더링: pageNumList 사용 */}
      {pageNumList.map((num) => (
        <button
          key={num}
          className={`px-3 py-1 border border-zinc-300 rounded text-sm cursor-pointer ${
            num === page ? "bg-zinc-300 font-bold" : "" // 현재 페이지 강조
          }`}
          onClick={() => moveToPage(num)}
        >
          {num}
        </button>
      ))}

      {/* > 다음 페이지 그룹 이동 */}
      {nextPageGroup && ( // 다음 페이지 그룹이 있을 때만 버튼 표시
        <button
          className="px-3 py-1 border border-zinc-300 rounded text-sm cursor-pointer"
          // nextPage는 ReviewPageResponseDTO에서 계산된 값
          onClick={() => moveToPage(nextPage)}
        >
          {">"}
        </button>
      )}

      {/* >> 마지막 페이지 */}
      <button
        className="px-3 py-1 border border-zinc-300 rounded text-sm cursor-pointer"
        onClick={() => moveToPage(totalPage)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
