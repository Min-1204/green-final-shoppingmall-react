import { useState, useEffect } from "react";
import { getDeliveryPolicies } from "../../../../api/admin/deliveryPolicy/deliveryPolicyApi";

export default function DeliveryPolicyModify({ existingData, onChangeForm }) {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(() => {
    return existingData ? { ...existingData } : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!existingData) {
    return (
      <div className="w-full bg-white p-6 text-sm font-['Inter']">
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            배송 정책 선택
          </h2>
        </div>
        <div className="px-3 py-6">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const data = await getDeliveryPolicies();
        setPolicies(data);

        // existingData가 있으면 그것을 유지, 없으면 defaultPolicy 선택
        if (!existingData) {
          const defaultPol = data.find((p) => p.defaultPolicy);
          if (defaultPol) {
            setSelectedPolicy(defaultPol);
          } else if (data.length > 0) {
            setSelectedPolicy(data[0]);
          }
        }
      } catch (err) {
        setError("배송 정책을 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const handlePolicyChange = (e) => {
    const policyId = parseInt(e.target.value);
    const policy = policies.find((p) => p.id === policyId);
    console.log(policy);
    setSelectedPolicy(policy);
    onChangeForm({ ...policy });
  };

  const getPolicyTypeLabel = (type) => {
    switch (type) {
      case "PAID":
        return "유료 배송";
      case "CONDITIONAL_FREE":
        return "조건부 무료 배송";
      case "FREE":
        return "무료 배송";
      default:
        return type;
    }
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("ko-KR") + "원";
  };

  if (loading) {
    return (
      <div className="w-full bg-white p-6 text-sm font-['Inter']">
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            배송 정책 선택
          </h2>
        </div>
        <div className="px-3 py-6">
          <p className="text-gray-600">배송 정책을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white p-6 text-sm font-['Inter']">
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            배송 정책 선택
          </h2>
        </div>
        <div className="px-3 py-6">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-6 text-sm font-['Inter']">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-semibold text-gray-800">배송 정책 선택</h2>
      </div>

      <div className="px-3 py-3">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            배송 정책
          </label>
          <select
            value={selectedPolicy?.id || ""}
            onChange={handlePolicyChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {policies.map((policy) => (
              <option key={policy.id} value={policy.id}>
                {policy.name}
              </option>
            ))}
          </select>
        </div>

        {selectedPolicy && (
          <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
              <h3 className="text-sm font-semibold text-gray-800">
                선택된 정책: {selectedPolicy.name}
              </h3>
            </div>
            <div className="bg-white p-4 space-y-3">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 w-40">
                  정책 유형:
                </span>
                <span className="text-sm text-gray-800">
                  {getPolicyTypeLabel(selectedPolicy.policyType)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 w-40">
                  기본 배송비:
                </span>
                <span className="text-sm text-gray-800">
                  {formatCurrency(selectedPolicy.basicDeliveryFee)}
                </span>
              </div>
              {selectedPolicy.freeConditionAmount !== null && (
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600 w-40">
                    무료 배송 조건:
                  </span>
                  <span className="text-sm text-gray-800">
                    {formatCurrency(selectedPolicy.freeConditionAmount)} 이상
                    구매시
                  </span>
                </div>
              )}
              {selectedPolicy.defaultPolicy && (
                <div className="pt-3 border-t border-gray-200">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-md border border-green-200">
                    기본 정책
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-700">
            * 상품에 적용할 배송 정책을 변경할 수 있습니다.
          </p>
          <p className="text-sm text-gray-700 mt-1">
            * 배송 정책은 관리자 페이지에서 미리 등록된 정책 중 선택할 수
            있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
