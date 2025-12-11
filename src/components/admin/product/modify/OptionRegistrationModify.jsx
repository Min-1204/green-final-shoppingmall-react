import React, { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

function OptionRegistrationModify({ existingData, onChangeForm }) {
  const [isOpen, setIsOpen] = useState(true);
  const [options, setOptions] = useState([
    {
      optionName: "",
      purchasePrice: "",
      sellingPrice: "",
      currentStock: "",
      initialStock: "",
      safetyStock: "",
      image: null,
      imageUrl: null,
      displayOrder: 0,
      type: "new",
      deleted: false,
    },
  ]);

  useEffect(() => {
    if (existingData) {
      setOptions([...existingData]);
    }
  }, [existingData]);

  const addOptionHandler = () => {
    const updatedOptions = [
      ...options,
      {
        optionName: "",
        purchasePrice: "",
        sellingPrice: "",
        currentStock: "",
        initialStock: "",
        safetyStock: "",
        file: null,
        type: "new",
        displayOrder: options.length,
        imageUrl: null,
        deleted: false,
      },
    ];

    setOptions(updatedOptions);
    onChangeForm(updatedOptions);
  };

  const removeOptionHandler = (index) => {
    if (options.length > 1) {
      const updatedOptions = options.map((o, idx) => {
        if (idx === index) {
          if (o.deleted === true) {
            return { ...o, deleted: false };
          } else {
            return { ...o, deleted: true };
          }
        } else {
          return o;
        }
      });
      setOptions(updatedOptions);
      onChangeForm(updatedOptions);
    }
  };

  const inputChangeHandler = (index, field, value) => {
    const updatedOptions = options.map((option, idx) =>
      // 수정한 옵션의 값만 바뀌도록
      idx === index ? { ...option, [field]: value } : option
    );
    setOptions(updatedOptions);
    onChangeForm(updatedOptions);
  };

  const inputImgChangeHandler = (index, field, value) => {
    const updatedOptions = options.map((option, idx) =>
      // 수정한 옵션의 값만 바뀌도록
      idx === index
        ? { ...option, [field]: value, imageUrl: null, type: "new" }
        : option
    );
    setOptions(updatedOptions);
    onChangeForm(updatedOptions);
  };

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter']">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center p-3 border-b"
      >
        <h2 className="text-lg font-semibold text-gray-800">상품 옵션 등록</h2>

        <button className="text-gray-600 hover:text-gray-900 transition-colors">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      {isOpen && (
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
                    className={`transition divide-x divide-gray-200 ${
                      option.deleted === true
                        ? "bg-gray-100 opacity-60"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <td
                      className={`px-3 py-3 ${
                        option.deleted === true ? "text-gray-400" : ""
                      }`}
                    >
                      {index + 1}
                    </td>
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
                        className={`w-full border rounded-md px-2 py-1 ${
                          option.deleted === true
                            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                            : "border-gray-300"
                        }`}
                        placeholder="옵션 이름"
                        disabled={option.deleted === true}
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
                        className={`w-full border rounded-md px-2 py-1 ${
                          option.deleted === true
                            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                            : "border-gray-300"
                        }`}
                        placeholder="0"
                        disabled={option.deleted === true}
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
                        className={`w-full border rounded-md px-2 py-1 ${
                          option.deleted === true
                            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                            : "border-gray-300"
                        }`}
                        placeholder="0"
                        disabled={option.deleted === true}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="number"
                        value={option.currentStock}
                        // onChange={(e) =>
                        //   inputChangeHandler(
                        //     index,
                        //     "currentStock",
                        //     e.target.value
                        //   )
                        // }
                        className={`w-full border rounded-md px-2 py-1 ${
                          true
                            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                            : "border-gray-300"
                        }`}
                        placeholder="0"
                        disabled={true}
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
                        className={`w-full border rounded-md px-2 py-1 ${
                          option.deleted === true
                            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                            : "border-gray-300"
                        }`}
                        placeholder="0"
                        disabled={option.deleted === true}
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
                        className={`w-full border rounded-md px-2 py-1 ${
                          option.deleted === true
                            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                            : "border-gray-300"
                        }`}
                        placeholder="0"
                        disabled={option.deleted === true}
                      />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              inputImgChangeHandler(
                                index,
                                "file",
                                e.target.files[0]
                              )
                            }
                            className="hidden"
                            id={`file-input-${index}`}
                            disabled={option.deleted === true}
                          />
                          <label
                            htmlFor={`file-input-${index}`}
                            className={`inline-block px-3 py-1 text-xs rounded-md transition border shadow-sm ${
                              option.deleted === true
                                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300 cursor-pointer"
                            }`}
                          >
                            파일 선택
                          </label>
                          {option.file && (
                            <div
                              className={`mt-1 text-xs truncate max-w-[120px] ${
                                option.deleted === true
                                  ? "text-gray-400"
                                  : "text-gray-600"
                              }`}
                              title={option.file.name}
                            >
                              {option.file.name}
                            </div>
                          )}
                        </div>
                        <div
                          className={`w-16 h-16 border rounded-md flex items-center justify-center overflow-hidden flex-shrink-0 ${
                            option.deleted === true
                              ? "border-gray-200 bg-gray-50 grayscale"
                              : "border-gray-300 bg-gray-50"
                          }`}
                        >
                          {option.file ? (
                            <img
                              src={URL.createObjectURL(option.file)}
                              alt="미리보기"
                              className="w-full h-full object-cover"
                            />
                          ) : option.imageUrl ? (
                            <img
                              src={option.imageUrl}
                              alt="미리보기"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span
                              className={`text-xs text-center px-1 ${
                                option.deleted === true
                                  ? "text-gray-300"
                                  : "text-gray-400"
                              }`}
                            >
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
                          className={`px-3 py-1 rounded-md border transition shadow-sm ${
                            option.deleted === true
                              ? "bg-green-50 text-green-700 hover:bg-green-100 border-green-200 cursor-pointer"
                              : "bg-red-50 text-red-700 hover:bg-red-100 border-red-200 cursor-pointer"
                          }`}
                        >
                          {option.deleted === true ? "복구" : "삭제"}
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
      )}
    </div>
  );
}

// React.memo를 사용하여 prop이 변경되었을 때만 리렌더링하도록 설정
export default React.memo(OptionRegistrationModify);
