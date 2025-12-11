import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
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

  console.log("selectedCartItems", selectedCartItems);

  const shipping =
    totalPrice >= selectedCartItems[0]?.deliveryPolicy?.freeConditionAmount
      ? 0
      : selectedCartItems[0]?.deliveryPolicy?.basicDeliveryFee;

  console.log("shipping", shipping);

  // ✅ 주문 페이지 이동 시 선택한 상품만 전달
  const handleOrderSelected = () => {
    if (selectedCartItems.length === 0) return alert("상품을 선택해주세요");
    navigate("/order", { state: { items: selectedCartItems } });
    //주문 페이지 이동 시 장바구니 전체 비우기
    // removeAll(1);
  };

  // ✅ 전체 주문 시 전체 장바구니 전달
  const handleOrderAll = () => {
    navigate("/order", { state: { items: cart } });
    //주문 페이지 이동 시 장바구니 전체 비우기
    // removeAll(1);
  };

  // 빈 장바구니 UI
  if (cart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto mt-12 px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            장바구니에 저장된 상품이 없습니다.
          </h2>
          <p className="text-gray-500 mb-6">
            원하는 상품을 장바구니에 담아보세요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4 pb-12">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">장바구니</h1>
        <p className="text-sm text-gray-500">
          총 {cart.length}개의 상품이 담겨있습니다
        </p>
      </div>

      {/* ✅ 선택박스 */}
      <div className="flex items-center mb-4 bg-white rounded-lg border border-gray-200 px-5 py-3">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selectedItems.length === cart.length}
            onChange={toggleSelectAll}
            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 cursor-pointer"
          />
          <span className="ml-2 text-sm font-medium text-gray-900">
            전체 선택 ({selectedItems.length}/{cart.length})
          </span>
        </label>
      </div>

      {/* ✅ 상품 리스트 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 p-4"></th>
                <th className="p-4 text-sm font-semibold text-gray-700">
                  상품정보
                </th>
                <th className="p-4 text-center text-sm font-semibold text-gray-700 min-w-[100px]">
                  판매가
                </th>
                <th className="p-4 text-center text-sm font-semibold text-gray-700 min-w-[140px]">
                  수량
                </th>
                <th className="p-4 text-center text-sm font-semibold text-gray-700 min-w-[120px]">
                  구매가
                </th>
                <th className="p-4 text-center text-sm font-semibold text-gray-700 w-20">
                  관리
                </th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {cart.map((item, index) => {
                return (
                  <tr
                    key={item.id}
                    className={`${
                      index !== cart.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    } hover:bg-gray-50 transition-colors`}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                        className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 cursor-pointer"
                      />
                    </td>

                    {/* 상품 정보 */}
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 mb-1">
                            {item.brandName}
                          </p>
                          <p className="font-medium text-gray-900 text-sm leading-snug">
                            {item.productName}{" "}
                            {item.optionName &&
                              item.optionName != item.productName &&
                              `- ${item.optionName}`}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* 판매가 */}
                    <td className="text-center p-4">
                      <p className="text-[#111111] font-semibold">
                        {item.sellingPrice.toLocaleString()}원
                      </p>
                    </td>

                    {/* 수량 */}
                    <td className="text-center p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="w-8 h-8 border border-[#111111] rounded-md hover:bg-gray-100 flex items-center justify-center transition-colors"
                          onClick={() => handleChangeQty(item, -1)}
                        >
                          <Minus className="w-3.5 h-3.5 text-[#111111]" />
                        </button>
                        <span className="w-10 text-center font-medium text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          className="w-8 h-8 border border-[#111111] rounded-md hover:bg-gray-100 flex items-center justify-center transition-colors"
                          onClick={() => handleChangeQty(item, +1)}
                        >
                          <Plus className="w-3.5 h-3.5 text-[#111111]" />
                        </button>
                      </div>
                    </td>

                    {/* 구매가 */}
                    <td className="text-center p-4 font-semibold">
                      {(item.sellingPrice * item.quantity).toLocaleString()}원
                    </td>

                    <td className="text-center p-4">
                      <button
                        className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        onClick={() => removeItem(item.id)}
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ 금액 요약 및 주문 버튼 */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex justify-between py-2">
          <span>총 상품가</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </div>

        <div className="flex justify-between py-2">
          <span>배송비</span>
          <span>
            {shipping && shipping === 0
              ? "0원"
              : `${shipping?.toLocaleString()}원`}
          </span>
        </div>

        <div className="flex justify-between py-4 text-lg font-bold border-t mt-4">
          <span>총 결제예상금액</span>
          <span className="text-[#ff5c00]">
            {(totalPrice + shipping).toLocaleString()}원
          </span>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            className="flex-1 py-3 border border-[#111111] rounded-lg text-[#111111] hover:bg-gray-100 transition"
            onClick={handleOrderSelected}
          >
            선택상품 주문
          </button>

          <button
            className="flex-1 py-3 bg-[#111111] text-white rounded-lg hover:bg-black transition"
            onClick={handleOrderAll}
          >
            전체상품 주문
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
