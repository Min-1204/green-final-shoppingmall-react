import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { fetchCategoryList } from "../../../../api/admin/category/categoryApi";

// 카테고리 경로를 문자열로 변환하는 헬퍼 함수
const getCategoryPath = (category) => {
  if (!category) return "";

  const path = [];
  let current = category;

  // 최하위에서 최상위까지 순회하며 경로 구성
  while (current && current.name) {
    path.unshift(current.name); // 배열 앞에 추가 (역순 방지)
    console.log("path : ", path);
    current = current.parent;
  }

  return path.join(" > ");
};

// 하나의 열에 카테고리 목록을 렌더링하는 컴포넌트
// categories : subCategories, selectedCategory:currentSelectedPath[depth], onSelect:onSelectCategory
const CategoryColumn = ({ categories, selectedCategory, onSelect }) => (
  <div className="flex-1 bg-white border border-gray-300 rounded-md h-64 overflow-y-auto">
    <ul className="divide-y divide-gray-100">
      {categories.map((category) => (
        <li
          key={category.id}
          className={`px-4 py-2.5 cursor-pointer transition-all duration-150 ${
            selectedCategory?.id === category.id
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-50 text-gray-700"
          }`}
          onClick={() => onSelect(category)}
        >
          {category.name}
        </li>
      ))}
    </ul>
  </div>
);

export default function ProductCategory({ existingData, onChangeForm }) {
  const [isOpen, setIsOpen] = useState(true);
  // 선택된 경로: [{ id: '1', name: '의류', ... }, { id: '2', name: '탑', ... }]
  const [currentSelectedPath, setCurrentSelectedPath] = useState([]);
  // 백엔드로 넘길 등록 카테고리 정보 : selectedCategories (실제로는 1개만 선택되서 1개만 등록할 예정)
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  console.log("existingData: ", existingData);

  useEffect(() => {
    if (existingData && existingData.id && selectedCategories.length === 0) {
      // 서버에서 받은 카테고리 객체를 그대로 사용
      setSelectedCategories([
        {
          id: existingData.id,
          name: getCategoryPath(existingData),
        },
      ]);

      console.log("existingData : ", existingData);
    }
  }, [existingData]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategoryList();
      setCategoriesData(data);
    };
    getCategories();
  }, []);

  // 4개의 열을 만들어내는 컴포넌트
  // 첫번째 열은 1차 카테고리, depth=0 , 두번째 열은 2차 카테고리, depth=1
  // selectedPath : currentSelectedPath, onSelect: onSelectCategory, columns:4
  const CategorySelector = ({ selectedPath, onSelect, columns }) => {
    const getSubCategories = (depth) => {
      if (depth === 0) return categoriesData;
      let current = selectedPath[depth - 1];
      return current?.subCategories || [];
    };

    return (
      <div className="flex space-x-2">
        {Array.from({ length: columns }).map((_, depth) => (
          <CategoryColumn
            key={depth}
            categories={getSubCategories(depth)}
            selectedCategory={selectedPath[depth]}
            onSelect={(category) => onSelect(category, depth)}
          />
        ))}
      </div>
    );
  };

  const onSelectCategory = (category, depth) => {
    // 현재 레벨 전까지 자르고 새 카테고리를 추가
    const newPath = currentSelectedPath.slice(0, depth);
    const temp = [...newPath, category];
    console.log("currentSelectedPath : ", temp);
    setCurrentSelectedPath(temp);
  };

  const addCategoryHandler = () => {
    if (currentSelectedPath.length > 0) {
      console.log("currentSelectedPath ==== ", currentSelectedPath);
      const lastCategory = currentSelectedPath[currentSelectedPath.length - 1];

      // currentSelectedPath 배열에서 직접 경로 생성
      const categoryName = currentSelectedPath
        .map((cat) => cat.name)
        .join(" > ");

      console.log("categoryName === ", categoryName);

      const newCategory = {
        id: lastCategory.id,
        name: categoryName,
      };

      setSelectedCategories([newCategory]);
      setCurrentSelectedPath([]);

      // props - 최하위 카테고리 객체 전달
      onChangeForm(lastCategory);
    }
  };

  const deleteCategoryHandler = (id) => {
    setSelectedCategories(selectedCategories.filter((c) => c.id !== id));
  };

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter']">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center p-3 border-b"
      >
        <h2 className="text-lg font-semibold text-gray-800">카테고리</h2>

        <button className="text-gray-600 hover:text-gray-900 transition-colors">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      {isOpen && (
        <div>
          {/* 카테고리 선택 영역 */}
          <div className="border border-gray-300 mb-6 mt-6 rounded-lg overflow-hidden shadow-lg">
            {/* 카테고리 선택 헤더 */}
            <div className="flex border-b border-gray-300 items-stretch bg-gray-50">
              <div className="w-full px-4 py-3 text-gray-700 font-semibold">
                카테고리 선택
              </div>
            </div>

            {/* 카테고리 목록 */}
            <div className="p-4">
              {/* 헤더 */}
              <div className="flex text-sm font-semibold text-gray-700 mb-3 px-1">
                <div className="flex-1 text-center">1차 카테고리</div>
                <div className="flex-1 text-center">2차 카테고리</div>
                <div className="flex-1 text-center">3차 카테고리</div>
                <div className="flex-1 text-center">4차 카테고리</div>
              </div>

              {/* 목록 컨테이너 */}
              <CategorySelector
                selectedPath={currentSelectedPath}
                onSelect={onSelectCategory}
                columns={4}
              />

              {/* 선택 버튼 */}
              <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-600 text-white px-8 py-2 cursor-pointer rounded-md shadow-md hover:bg-blue-700 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  onClick={addCategoryHandler}
                  disabled={currentSelectedPath.length === 0}
                >
                  선택한 카테고리 추가
                </button>
              </div>
            </div>
          </div>

          {/* 선택한 카테고리 영역 */}
          <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            {/* 헤더 */}
            <div className="flex border-b border-gray-300 items-stretch bg-gray-50">
              <div className="w-full px-4 py-3 text-gray-700 font-semibold">
                선택한 카테고리
              </div>
            </div>

            {/* 테이블 */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm text-center">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr className="text-gray-700 font-semibold text-sm divide-x divide-gray-300">
                    <th className="px-6 py-3 whitespace-nowrap">카테고리</th>
                    <th className="px-6 py-3 whitespace-nowrap w-[100px]">
                      삭제
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedCategories.map((category) => (
                    <tr
                      key={category?.id}
                      className="hover:bg-gray-50 transition divide-x divide-gray-200"
                    >
                      <td className="px-6 py-3 text-left">{category?.name}</td>
                      <td className="px-6 py-3">
                        <button
                          className="text-gray-400 hover:text-red-600 transition p-1"
                          onClick={() => deleteCategoryHandler(category?.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 안내 메시지 */}
          <div className="mt-4 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">
              💡 신규 카테고리 생성은{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                카테고리 관리
              </a>
              에서 가능합니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
