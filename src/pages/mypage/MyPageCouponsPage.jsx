import React, { useEffect, useState } from "react";
import CouponList from "../../components/user/mypage/CouponList";
import { Plus } from "lucide-react";
import CouponIssueModal from "./CouponIssueModal";
import { getUserCoupons, issueCouponByCode } from "../../api/coupon/couponApi";
import { useSelector } from "react-redux";

export default function MyPageCouponsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const user = useSelector((state) => state.authSlice.user);

  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    const loadUserCoupons = async () => {
      const data = await getUserCoupons(user.id);
      console.log("data : ", data);
      setCoupons(data);
    };
    loadUserCoupons();
  }, [user?.id, refreshKey]);

  const handleRegisterCoupon = async (couponCode) => {
    try {
      const data = await issueCouponByCode(user.id, couponCode);
      alert(`성공적으로 쿠폰이 발급되었습니다.`);
      // 쿠폰 목록 새로고침
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.log("error : ", error.response.data);
      const message =
        error.response.data.message || "쿠폰 등록에 실패했습니다.";
      throw new Error(message);
    }
  };

  return (
    <div className="bg-white border border-gray-400 rounded-2xl shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">쿠폰함</h1>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          쿠폰 등록
        </button>
      </div>

      <p className="text-sm text-zinc-500 mb-6">
        보유 중인 할인/프로모션 쿠폰입니다.
      </p>

      <CouponList coupons={coupons} />

      <CouponIssueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRegister={handleRegisterCoupon}
      />
    </div>
  );
}
