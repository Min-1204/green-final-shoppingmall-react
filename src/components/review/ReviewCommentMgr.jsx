import { useState, useEffect } from "react";
import {
  reviewCommentAdd,
  reviewCommentGetList,
  reviewCommentModify,
  reviewCommentDelete,
} from "../../api/review/reviewCommentApi";
import { useSelector } from "react-redux";

const ReviewCommentMgr = ({ reviewId, commentUpdate }) => {
  const [content, setContent] = useState(""); //댓글 내용
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
    await reviewCommentAdd(reviewId, content);
    setContent("");
    getCommentList();
  };

  // 댓글 수정
  const commentUpdateHandler = async (commentId) => {
    const newContent = updatedComment[commentId];
    if (!newContent.trim()) {
      alert("댓글 내용을 입력해주세요!");
      return;
    }
    try {
      await reviewCommentModify(commentId, newContent);
      setEditId(null);
      getCommentList();
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
      alert("댓글이 삭제되었습니다.");
      getCommentList();
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
                {isMyComment && (
                  <div className="flex space-x-2 ml-4 mt-1">
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
                    <button
                      className="text-xs text-gray-500 hover:underline cursor-pointer"
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
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-0 focus:border-gray-300"
          rows={2}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded text-sm cursor-pointer"
            onClick={commentAddHandler}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCommentMgr;
