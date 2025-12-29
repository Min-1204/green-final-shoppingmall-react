import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteProduct,
  restockOption,
} from "../../../api/admin/product/productApi";
import RestockModal from "./RestockModal";
import { ProductDeleteModal } from "./ProductDeleteModal";

const saleStatusObj = {
  ON_SALE: "정상판매",
  SOLD_OUT: "품절",
  STOP_SALE: "판매중단",
};

const exposureStatusObj = {
  EXPOSURE: "노출",
  HIDDEN: "미노출",
  SCHEDULED: "노출예약",
};

const getAvailableStock = (product) => {
  const availableOptions = product?.options.filter((op) => op.currentStock > 0);
  const availableOptionCnt = availableOptions.length;
  const availableStock = availableOptions.reduce(
    (acc, option) => acc + option.currentStock,
    0
  );

  return `[${availableOptionCnt}] ${availableStock}`;
};

const getOutOfStock = (product) => {
  const outOfStockOptions = product?.options.filter(
    (op) => op.currentStock === 0
  );
  const outOfStockOptionCnt = outOfStockOptions.length;
  const outOfStock = outOfStockOptions.reduce(
    (acc, option) => acc + option.currentStock,
    0
  );

  return `[${outOfStockOptionCnt}] ${outOfStock}`;
};

const ProductList = ({ pageResponse, search }) => {
  const navigate = useNavigate();
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const tableHeaders = [
    "번호",
    "상품명",
    "판매가",
    "재고",
    "배송비",
    "등록/수정일",
    "상태",
    "노출",
    "관리",
  ];

  const restockClick = (product) => {
    setSelectedProduct(product);
    setIsRestockModalOpen(true);
  };

  const restockConfirm = async (updatedOptions) => {
    console.log("재입고 데이터 : ", updatedOptions);
    //api 호출
    await restockOption(updatedOptions);
    // 다시 조회
    search();
  };

  const goToModifyPage = (id) => {
    navigate(`/admin/product/modify/${id}`);
  };

  const clickDeleteProduct = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const deleteConfirm = async (product) => {
    try {
      await deleteProduct(product.id);
      search();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full mt-6">
      {/* 상단 영역 */}
      <div className="flex justify-between items-center mb-3 text-gray-700 flex-wrap gap-2 px-2">
        <span className="font-semibold text-lg">
          검색 결과 (총 {pageResponse?.totalDataCount}개)
        </span>

        <div className="flex items-center gap-2 flex-wrap">
          {/* <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-300 transition shadow-sm">
            다운로드
          </button> */}

          {/* <select
            defaultValue="recent"
            className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md cursor-pointer bg-white shadow-sm hover:bg-gray-50 transition"
          >
            <option value="recent">최근 등록 순</option>
            <option value="old">오래된 등록 순</option>
          </select>

          <select
            defaultValue="10"
            className="border border-gray-300 text-gray-700 px-3 py-1 rounded-md cursor-pointer bg-white shadow-sm hover:bg-gray-50 transition"
          >
            <option value="10">10개</option>
            <option value="20">20개</option>
            <option value="50">50개</option>
          </select> */}
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-md">
        <table className="min-w-full border-collapse text-sm text-center">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr className="text-gray-700 font-semibold text-sm divide-x divide-gray-300">
              <th className="px-3 py-3 whitespace-nowrap w-[50px]">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 accent-blue-600 cursor-pointer"
                />
              </th>

              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className={`px-3 py-3 whitespace-nowrap ${
                    header === "번호"
                      ? "w-[50px]"
                      : header === "상태" || header === "노출"
                      ? "w-[90px]"
                      : header === "관리"
                      ? "w-[130px]"
                      : ""
                  } text-center`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {pageResponse?.dtoList.map((product) => (
              <tr
                key={product?.id}
                className="hover:bg-gray-50 transition divide-x divide-gray-200"
              >
                <td className="px-2 py-3 w-[50px]">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 accent-blue-600 cursor-pointer"
                  />
                </td>

                <td className="px-3 py-3 w-[50px]">{product?.id}</td>

                <td className="px-3 py-3 text-left">
                  <span className="cursor-pointer hover:underline">
                    {product?.basicInfo?.productName}
                  </span>
                </td>

                <td className="px-3 py-3 text-right">
                  {product?.options[0]?.sellingPrice.toLocaleString()}원
                </td>

                <td className="px-3 py-3 text-center">
                  <div>{getAvailableStock(product)}</div>
                  <div className="text-red-600 text-xs">
                    {getOutOfStock(product)}{" "}
                    <span className="text-red-500 ml-1">📦</span>
                  </div>
                </td>

                <td className="px-3 py-3 text-center hover:underline cursor-pointer">
                  {product?.deliveryPolicy?.name} (
                  {product?.deliveryPolicy?.freeConditionAmount.toLocaleString()}
                  원)
                </td>

                {/* <td className="px-3 py-3 text-center">조회 미구현</td> */}

                <td className="px-3 py-3 text-xs text-gray-500">
                  <div>{product?.createdAt.split("T")[0]}</div>
                  <div>{product?.createdAt.split("T")[1]}</div>
                </td>

                <td className="px-3 py-3 text-center">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      product?.saleInfo?.saleStatus === "ON_SALE"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {saleStatusObj[product?.saleInfo?.saleStatus]}
                  </span>
                </td>

                <td className="px-3 py-3 text-center">
                  {exposureStatusObj[product?.saleInfo?.exposureStatus]}
                </td>

                <td className="px-3 py-3 w-[150px]">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => restockClick(product)}
                      className="bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1 rounded-md border border-green-200 cursor-pointer transition shadow-sm"
                    >
                      상품 옵션 재입고
                    </button>
                    <button
                      onClick={() => goToModifyPage(product.id)}
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded-md border border-blue-200 cursor-pointer transition shadow-sm"
                    >
                      상품 수정
                    </button>
                    <button
                      onClick={() => clickDeleteProduct(product)}
                      className="bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1 rounded-md border border-red-200 cursor-pointer transition shadow-sm"
                    >
                      상품 삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <RestockModal
        isOpen={isRestockModalOpen}
        onClose={() => setIsRestockModalOpen(false)}
        product={selectedProduct}
        onConfirm={restockConfirm}
      />
      <ProductDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        product={selectedProduct}
        onConfirm={deleteConfirm}
      />
    </div>
  );
};

export default ProductList;
