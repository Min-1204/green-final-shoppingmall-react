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
    // 드롭다운 컨테이너: 둥근 테두리, 반투명, 그림자
    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-5 w-[95%] max-w-[1180px] bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 z-50">
      {/* 패딩 및 스크롤 영역 */}
      <div className="max-h-[70vh] overflow-y-auto py-8 px-6 sm:px-8">
        {/* 반응형 그리드 */}
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
                      className="text-base text-gray-600 hover:text-gray-900 font-medium transition-all duration-200 transform hover:translate-x-0.5 cursor-pointer"
                      onClick={() =>
                        goProductList(subCategory.depth, subCategory.id)
                      }
                    >
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
