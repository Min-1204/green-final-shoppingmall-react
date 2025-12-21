import { useState, useEffect } from "react";
import {
  reviewCommentAdd,
  reviewCommentGetList,
  reviewCommentModify,
  reviewCommentDelete,
} from "../../api/review/reviewCommentApi";
import { useSelector } from "react-redux";

const ReviewCommentMgr = ({ reviewId, commentUpdate }) => {
  const [content, setContent] = useState(""); // 댓글 내용
  const [commentList, setCommentList] = useState([]); // 댓글 목록
  const [editId, setEditId] = useState(null); // 수정중인 댓글 ID
  const [updatedComment, setUpdatedComment] = useState({}); // 수정된 댓글

  const { user } = useSelector((state) => state.authSlice);

  // 댓글 목록 가져오기
  const getCommentList = async () => {
    const comments = await reviewCommentGetList(reviewId);
    setCommentList(comments);

    if (commentUpdate) {
      commentUpdate(comments);
    }
  };

  useEffect(() => {
    getCommentList();
  }, [reviewId]);

  // 댓글 등록
  const commentAddHandler = async () => {
    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요!");
      return;
    }
    try {
      await reviewCommentAdd(reviewId, content);
      setContent("");
      //전체 목록 다시 불러오기 생성된 댓글의 전체 정보를 얻기 위해
      getCommentList();
    } catch (error) {
      console.error("댓글 등록 실패: ", error);
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  // 댓글 수정
  const commentUpdateHandler = async (commentId) => {
    const newContent = updatedComment[commentId];
    if (!newContent.trim()) {
      alert("댓글 내용을 입력해주세요!");
      return;
    }

    try {
      const updateComment = await reviewCommentModify(commentId, newContent);
      //서버에서 받은 전체 정보로 즉시 상태 업데이트
      getCommentList((prev) =>
        prev.map((comment) =>
          comment.id === commentId ? updateComment : comment
        )
      );

      //부모 컴포넌트에도 업데이트 알림
      if (commentUpdate) {
        const newList = commentList.map((comment) =>
          comment.id === commentId ? updateComment : comment
        );
        commentUpdate(newList);
      }

      // 수정 모드 종료 및 임시 저장 데이터 제거
      setEditId(null);
      setUpdatedComment((prev) => {
        const newState = { ...prev };
        delete newState[commentId];
        return newState;
      });
    } catch (error) {
      console.error("댓글 수정 실패: ", error);

      //백엔드 에러 메시지
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else if (
        error.response?.status === 403 ||
        error.response?.status === 400
      ) {
        alert("본인의 댓글만 수정할 수 있습니다.");
      } else {
        alert("댓글 수정 중 오류가 발생했습니다.");
      }

      //수정 모드 취소
      setEditId(null);
    }
  };

  // 댓글 삭제
  const commentDeleteHandler = async (commentId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await reviewCommentDelete(commentId);

      //삭제된 댓글을 즉시 목록에서 제거
      const newList = commentList.filter((comment) => comment.id !== commentId);
      setCommentList(newList);

      //부모 컴포넌트에 업데이트 알림
      if (commentUpdate) {
        commentUpdate(newList);
      }

      alert("댓글이 삭제되었습니다.");
    } catch (error) {
      console.error("댓글 삭제 실패: ", error);

      //백엔드 에러 메시지
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else if (
        error.response?.status === 403 ||
        error.response?.status === 400
      ) {
        alert("본인의 댓글만 삭제할 수 있습니다.");
      } else {
        alert("댓글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const isAdmin = user && user.userRole === "ADMIN";

  return (
    <div className="space-y-6">
      {/* 댓글 목록 */}
      <div className="space-y-4">
        {commentList.map((comment) => {
          //본인 댓글인지 확인
          const isMyComment =
            user &&
            (comment.userId === user.id || comment.loginId === user.loginId);

          return (
            <div
              key={comment.id}
              className="py-3 border-b border-gray-100 flex flex-col"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span
                      className={`font-semibold text-sm ${
                        comment.isSeller ? "text-blue-600" : "text-gray-900"
                      }`}
                    >
                      {comment.loginId}
                    </span>
                    <span className="text-xs text-gray-500">
                      {comment.createAt?.slice(0, 10).replace(/-/g, ".")}
                    </span>
                  </div>

                  {/* 댓글 내용 */}
                  {editId !== comment.id ? (
                    <p className="text-sm text-gray-500 whitespace-pre-line">
                      {comment.content}
                    </p>
                  ) : (
                    <textarea
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
                      value={updatedComment[comment.id] ?? comment.content}
                      onChange={(e) =>
                        setUpdatedComment((prev) => ({
                          ...prev,
                          [comment.id]: e.target.value,
                        }))
                      }
                    />
                  )}
                </div>

                {/* 수정/삭제 버튼 - 본인 댓글만 표시 */}
                {(isMyComment || isAdmin) && (
                  <div className="flex space-x-2 ml-4 mt-1">
                    {/* 수정 버튼은 본인만 */}
                    {isMyComment && (
                      <button
                        className="text-xs text-gray-500 hover:underline cursor-pointer"
                        onClick={() =>
                          editId === comment.id
                            ? commentUpdateHandler(comment.id)
                            : setEditId(comment.id)
                        }
                      >
                        {editId === comment.id ? "저장" : "수정"}
                      </button>
                    )}

                    {/* 삭제 버튼은 본인 + 관리자 */}
                    <button
                      className={`text-xs hover:underline cursor-pointer ${
                        isAdmin ? "text-red-500" : "text-gray-500"
                      }`}
                      onClick={() => commentDeleteHandler(comment.id)}
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 댓글 등록 */}
      <div className="mt-4 space-y-2">
        {/* 비로그인 안내 문구 */}
        {!user && (
          <p className="text-xs text-gray-400">
            댓글을 작성하려면 로그인해주세요.
          </p>
        )}
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-0 focus:border-gray-300"
          rows={2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요"
          disabled={!user}
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded text-sm cursor-pointer"
            onClick={commentAddHandler}
            disabled={!user}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCommentMgr;
