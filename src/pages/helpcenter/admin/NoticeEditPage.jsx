import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect } from "react";

export default function NoticeEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser, isAdmin, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다");
      navigate("/loginpage");
      return;
    }

    if (!isAdmin) {
      alert("관리자 권한이 필요합니다");
      navigate("/helpcenter");
      return;
    }
  }, [isLoggedIn, isAdmin, navigate]);

  if (!isLoggedIn || isAdmin) {
    return null;
  }

  const noticeData = {
    id,
    title: "기존 제목",
    type: "일반",
    content: "기존 내용입니다"
  };

  const handleSave = (formData) => {
    console.log("수정 데이터:", { id, ...formData });
    alert("공지사항이 수정되었습니다.");
    navigate("/helpcenter");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <button
            onClick={() => navigate("/helpcenter")}
            className="hover:text-black"
          >
            고객센터
          </button>
          <span>›</span>
          <span className="text-black">공지사항 수정</span>
        </div>
        <h1 className="text-2xl font-bold">공지사항 수정</h1>
        <p className="text-sm text-gray-500 mt-1">
          작성자: {currentUser?.name}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <NoticeForm
          mode="edit"
          initialData={noticeData}
          onSave={handleSave}
          onCancel={() => navigate("/helpcenter")}
        />
      </div>
    </div>
  );
}
