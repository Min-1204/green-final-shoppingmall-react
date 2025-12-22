import React, { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function OptionRegistration({ onChangeForm }) {
  const [options, setOptions] = useState([
    {
      optionName: "",
      purchasePrice: "",
      sellingPrice: "",
      currentStock: "",
      initialStock: "",
      safetyStock: "",
      image: null,
    },
  ]);

  useEffect(() => {
    onChangeForm([...options]);
  }, [options]);

  const addOptionHandler = () => {
    setOptions((prev) => {
      const data = [
        ...prev,
        {
          optionName: "",
          purchasePrice: "",
          sellingPrice: "",
          currentStock: "",
          initialStock: "",
          safetyStock: "",
          image: null,
        },
      ];

      return data;
    });
  };

  const removeOptionHandler = (index) => {
    if (options.length > 1) {
      setOptions((prev) => {
        const data = prev.filter((_, i) => i !== index);

        return data;
      });
    }
  };

  const inputChangeHandler = (index, field, value) => {
    setOptions((prev) => {
      const data = prev.map((option, i) =>
        // 수정한 옵션의 값만 바뀌도록
        i === index ? { ...option, [field]: value } : option
      );

      return data;
    });
  };

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter']">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-semibold text-gray-800">상품 옵션 등록</h2>
      </div>

      {
        <div className="px-3 py-3">
          <button
            onClick={addOptionHandler}
            className="bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1 rounded-md border border-green-200 cursor-pointer transition shadow-sm"
          >
            옵션 추가
          </button>
          {/* 테이블 영역 */}
          <div className="overflow-x-auto mt-3 mb-6 border border-gray-300 rounded-lg shadow-md">
            <table className="min-w-full border-collapse text-sm text-center">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr className="text-gray-700 font-semibold text-sm divide-x divide-gray-300">
                  <th className="px-3 py-3 whitespace-nowrap w-[60px]">No.</th>
                  <th className="px-3 py-3 whitespace-nowrap min-w-[180px]">
                    옵션명
                  </th>
                  <th className="px-3 py-3 whitespace-nowrap w-[100px]">
                    매입가
                  </th>
                  <th className="px-3 py-3 whitespace-nowrap w-[100px]">
                    판매가
                  </th>
                  <th className="px-3 py-3 whitespace-nowrap w-[100px]">
                    현재재고
                  </th>
                  <th className="px-3 py-3 whitespace-nowrap w-[100px]">
                    초기재고
                  </th>
                  <th className="px-3 py-3 whitespace-nowrap w-[100px]">
                    안전재고
                  </th>
                  <th className="px-3 py-3 whitespace-nowrap min-w-[280px]">
                    이미지
                  </th>
                  <th className="px-3 py-3 whitespace-nowrap w-[80px]">작업</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {options.map((option, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition divide-x divide-gray-200"
                  >
                    <td className="px-3 py-3">{index + 1}</td>
                    <td className="px-3 py-3">
                      <input
                        type="text"
                        value={option.optionName}
                        onChange={(e) =>
                          inputChangeHandler(
                            index,
                            "optionName",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                        placeholder="옵션 이름"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="number"
                        value={option.purchasePrice}
                        onChange={(e) =>
                          inputChangeHandler(
                            index,
                            "purchasePrice",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="number"
                        value={option.sellingPrice}
                        onChange={(e) =>
                          inputChangeHandler(
                            index,
                            "sellingPrice",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="number"
                        value={option.currentStock}
                        onChange={(e) =>
                          inputChangeHandler(
                            index,
                            "currentStock",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="number"
                        value={option.initialStock}
                        onChange={(e) =>
                          inputChangeHandler(
                            index,
                            "initialStock",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="number"
                        value={option.safetyStock}
                        onChange={(e) =>
                          inputChangeHandler(
                            index,
                            "safetyStock",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              inputChangeHandler(
                                index,
                                "image",
                                e.target.files[0]
                              )
                            }
                            className="hidden"
                            id={`file-input-${index}`}
                          />
                          <label
                            htmlFor={`file-input-${index}`}
                            className="cursor-pointer inline-block px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-md hover:bg-gray-300 transition border border-gray-300 shadow-sm"
                          >
                            파일 선택
                          </label>
                          {option.image && (
                            <div
                              className="mt-1 text-xs text-gray-600 truncate max-w-[120px]"
                              title={option.image.name}
                            >
                              {option.image.name}
                            </div>
                          )}
                        </div>
                        <div className="w-16 h-16 border border-gray-300 rounded-md bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {option.image ? (
                            <img
                              src={URL.createObjectURL(option.image)}
                              alt="미리보기"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xs text-gray-400 text-center px-1">
                              미리보기
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      {options.length > 1 && (
                        <button
                          onClick={() => removeOptionHandler(index)}
                          className="bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1 rounded-md border border-red-200 cursor-pointer transition shadow-sm"
                        >
                          삭제
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 도움말 */}
          <div className="mt-4 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">
              * 옵션은 여러 개 추가할 수 있습니다. 각 옵션별로 가격과 재고를
              설정해주세요.
            </p>
            <p className="text-sm text-gray-700 mt-1">
              * 안전재고는 재고 부족 알림을 받을 최소 수량입니다.
            </p>
          </div>
        </div>
      }
    </div>
  );
}
