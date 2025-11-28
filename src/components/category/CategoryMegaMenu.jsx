import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategoryList } from "../../api/admin/category/categoryApi";

const CategoryMegaMenu = ({ isOpen, setOpen }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategoryList();
      setCategories(data);
    };
    getCategories();
  }, []);

  const navigate = useNavigate();
  // 메뉴가 닫혀있으면 null 반환
  if (!isOpen) return null;

  const goProductList = (depth, id) => {
    navigate(`/products?categoryDepth=${depth}&categoryId=${id}`);
    setOpen(false);
  };

  return (
    // ✨ 배경 및 그림자 강화, z-index 유지
    <div className="absolute left-0 w-full bg-white border-t border-gray-100 shadow-2xl z-50">
      {/* ✨ 최대 너비 조정 및 패딩 */}
      <div className="max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* ✨ 반응형 그리드 적용: 모바일(1열), 태블릿(3열), 데스크톱(5열) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-6">
          {categories.map((category) => (
            <div key={category.id} className="space-y-4">
              {/*  1차 카테고리 목록 */}
              <h3
                className="text-lg font-extrabold text-gray-900 cursor-pointer border-b-2 border-transparent hover:border-gray-600 pb-1 transition-all duration-300 flex items-center justify-between group"
                onClick={() => goProductList(category.depth, category.id)}
              >
                <span className="group-hover:text-gray-600 transition-colors">
                  {category.name}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </h3>

              {/*  2차 카테고리 목록 */}
              <ul className="space-y-2">
                {category.subCategories.map((subCategory) => (
                  <li key={subCategory.id}>
                    <button
                      // 불릿 포인트 제거 및 호버 색상 회색/어두운 회색으로 변경
                      className="text-base text-gray-600 hover:text-gray-900 font-medium transition-all duration-200 transform hover:translate-x-0.5"
                      onClick={() =>
                        goProductList(subCategory.depth, subCategory.id)
                      }
                    >
                      {/* ✨ 불릿 포인트 디자인 변경 (제거됨) */}
                      {/* <span className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-70 group-hover:bg-blue-600 group-hover:opacity-100 transition-all"></span> */}
                      {subCategory.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryMegaMenu;
