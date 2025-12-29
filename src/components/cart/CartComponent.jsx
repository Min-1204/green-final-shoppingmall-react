import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  Moon,
} from "lucide-react";
import useCustomCart from "../../hooks/useCustomCart";

//장바구니 페이지 컴포넌트
const CartComponent = () => {
  // 유저 정보
  const { user } = useSelector((state) => state.authSlice);

  // console.log("userId", user?.id);

  const navigate = useNavigate();

  // 장바구니 기능
  const { refreshCart, changeCart, removeItem, removeAll } = useCustomCart();

  //store 전역 저장소에서 장바구니 내역 불러오기
  const cart = useSelector((state) => state.cartSlice);
  // console.log("cart", cart);

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (user?.id) {
      refreshCart(user.id);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    setSelectedItems(cart.map((item) => item.id));
    console.log("selectedItems", selectedItems);
  }, [cart]);

  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleChangeQty = (item, delta) => {
    console.log("handleChangeQty 함수 발생 : item => ", item);
    const newQuantity = item.quantity + delta;
    const dto = {
      userId: user.id,
      id: item.id,
      productOptionId: item.productOptionId,
      quantity: newQuantity,
    };

    changeCart(dto);
  };

  const selectedCartItems = cart.filter((item) =>
    selectedItems.includes(item.id)
  );

  const totalPrice = selectedCartItems.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0
  );

  // console.log("selectedCartItems", selectedCartItems);

  // 배송비 구하는 로직
  const deliveryPolicy = selectedCartItems[0]?.deliveryPolicy;
  const freeLimit = deliveryPolicy?.freeConditionAmount ?? 0;
  const basicFee = deliveryPolicy?.basicDeliveryFee ?? 0;

  const shipping =
    selectedCartItems.length > 0 && totalPrice < freeLimit ? basicFee : 0;

  // console.log("shipping", shipping);

  // 주문 페이지 이동 시 선택한 상품만 전달
  const handleOrderSelected = () => {
    if (selectedCartItems.length === 0) return alert("상품을 선택해주세요");
    navigate("/order", { state: { items: selectedCartItems } });
    //주문 페이지 이동 시 장바구니 전체 비우기
    // removeAll(1);
  };

  // 전체 주문 시 전체 장바구니 전달
  const handleOrderAll = () => {
    navigate("/order", { state: { items: cart } });
    //주문 페이지 이동 시 장바구니 전체 비우기
    // removeAll(1);
  };

  // 빈 장바구니 UI
  if (cart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto mt-20 px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-[30px] shadow-sm border border-blue-100 p-20 text-center">
          <div className="flex justify-center mb-6 relative">
            <div className="absolute -top-4 animate-bounce">
              <Sparkles className="w-6 h-6 text-yellow-300 fill-yellow-200" />
            </div>
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-700 mb-2">
            장바구니가 텅 비어있어요
          </h2>
          <p className="text-slate-400 mb-8">
            촉촉한 아이템들을 담으러 가볼까요?
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-all shadow-md shadow-blue-100"
          >
            쇼핑하러 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4 pb-20 font-sans">
      {/* 헤더 */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
          <Moon className="w-5 h-5 text-blue-300 fill-blue-100" />
          <h1 className="text-2xl font-bold text-slate-800">장바구니</h1>
        </div>
        <p className="text-sm text-blue-400 font-medium">
          촉촉마을에 담긴 {cart.length}개의 소중한 상품들
        </p>
      </div>

      {/* 선택박스 */}
      <div className="flex items-center mb-4 bg-blue-50/50 backdrop-blur-sm rounded-2xl border border-blue-100 px-6 py-4">
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={selectedItems.length === cart.length}
            onChange={toggleSelectAll}
            className="w-5 h-5 accent-blue-400 border-blue-200 rounded-full cursor-pointer"
          />
          <span className="ml-3 text-sm font-bold text-slate-600 group-hover:text-blue-500 transition-colors">
            전체 선택 ({selectedItems.length}/{cart.length})
          </span>
        </label>
      </div>

      {/* 상품 리스트 */}
      <div className="bg-white rounded-[24px] shadow-sm border border-blue-50 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-blue-50/30 border-b border-blue-50">
              <tr>
                <th className="w-16 p-5 text-center text-xs font-bold text-blue-400 uppercase tracking-wider whitespace-nowrap">
                  선택
                </th>
                <th className="p-5 text-xs font-bold text-blue-400 uppercase tracking-wider whitespace-nowrap">
                  상품정보
                </th>
                <th className="p-5 text-center text-xs font-bold text-blue-400 uppercase tracking-wider whitespace-nowrap">
                  판매가
                </th>
                <th className="p-5 text-center text-xs font-bold text-blue-400 uppercase tracking-wider whitespace-nowrap">
                  수량
                </th>
                <th className="p-5 text-center text-xs font-bold text-blue-400 uppercase tracking-wider whitespace-nowrap">
                  합계
                </th>
                <th className="p-5 text-center text-xs font-bold text-blue-400 uppercase tracking-wider whitespace-nowrap">
                  삭제
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-blue-50">
              {cart.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-blue-50/20 transition-colors"
                >
                  <td className="p-5 text-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      className="w-5 h-5 accent-blue-400 border-blue-200 rounded-full cursor-pointer"
                    />
                  </td>

                  {/* 상품 정보 */}
                  <td className="p-5">
                    <div className="flex items-center gap-5">
                      <div className="w-24 h-24 flex-shrink-0 bg-blue-50 rounded-2xl overflow-hidden border border-blue-100">
                        <img
                          src={item.imageUrl}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-blue-300 mb-1 uppercase tracking-tight">
                          {item.brandName}
                        </p>
                        <p className="font-bold text-slate-700 text-base leading-tight">
                          {item.productName}
                        </p>
                        {item.optionName &&
                          item.optionName != item.productName && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-500 text-[11px] rounded-md">
                              옵션: {item.optionName}
                            </span>
                          )}
                      </div>
                    </div>
                  </td>

                  {/* 판매가 */}
                  <td className="text-center p-5">
                    <p className="text-slate-600 font-bold whitespace-nowrap">
                      {item.sellingPrice.toLocaleString()}원
                    </p>
                  </td>

                  {/* 수량 */}
                  <td className="text-center p-5">
                    <div className="inline-flex items-center bg-white border border-blue-100 rounded-full p-1 shadow-sm">
                      <button
                        className="w-8 h-8 rounded-full hover:bg-blue-50 flex items-center justify-center transition-colors text-blue-300"
                        onClick={() => handleChangeQty(item, -1)}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-bold text-slate-700 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        className="w-8 h-8 rounded-full hover:bg-blue-50 flex items-center justify-center transition-colors text-blue-300"
                        onClick={() => handleChangeQty(item, +1)}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* 구매가 */}
                  <td className="text-center p-5 font-bold text-blue-500 text-base whitespace-nowrap">
                    {(item.sellingPrice * item.quantity).toLocaleString()}원
                  </td>

                  <td className="text-center p-5">
                    <button
                      className="p-2 text-slate-300 hover:text-rose-400 hover:bg-rose-50 rounded-xl transition-all"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 금액 요약 및 주문 버튼 */}
      <div className="bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 rounded-[30px] shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center md:border-r border-blue-100">
            <p className="text-xs font-bold text-blue-300 mb-2">총 상품 금액</p>
            <p className="text-xl font-bold text-slate-700">
              {totalPrice.toLocaleString()}원
            </p>
          </div>
          <div className="text-center md:border-r border-blue-100">
            <p className="text-xs font-bold text-blue-300 mb-2">배송비</p>
            <p className="text-xl font-bold text-slate-700">
              {shipping === 0
                ? "무료배송"
                : `+ ${shipping?.toLocaleString()}원`}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-blue-400 mb-2">
              총 결제 예상 금액
            </p>
            <p className="text-2xl font-black text-blue-500">
              {(totalPrice + shipping).toLocaleString()}원
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="flex-1 py-4 bg-white border-2 border-blue-200 rounded-2xl text-blue-400 font-bold hover:bg-blue-50 transition-all shadow-sm"
            onClick={handleOrderSelected}
          >
            선택상품 주문하기
          </button>

          <button
            className="flex-1 py-4 bg-gradient-to-r from-blue-300 to-blue-400 text-white rounded-2xl font-bold hover:from-blue-400 hover:to-blue-500 transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2"
            onClick={handleOrderAll}
          >
            <Sparkles className="w-5 h-5 text-white/80" />
            전체상품 주문하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
