import { useState, useEffect } from "react";
import { getDeliveryPolicies } from "../../../api/admin/deliveryPolicy/deliveryPolicyApi";

export default function DeliveryPolicy({ onChangeForm }) {
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const data = await getDeliveryPolicies();
        setPolicies(data);

        // defaultPolicy가 true인 정책을 기본 선택
        const defaultPol = data.find((p) => p.defaultPolicy);
        if (defaultPol) {
          setSelectedPolicy(defaultPol);
        } else if (data.length > 0) {
          setSelectedPolicy(data[0]);
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
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600">배송 정책을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          배송 정책 선택
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
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            선택된 정책: {selectedPolicy.name}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-600 w-32">
                정책 유형:
              </span>
              <span className="text-sm text-gray-800">
                {getPolicyTypeLabel(selectedPolicy.policyType)}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-600 w-32">
                기본 배송비:
              </span>
              <span className="text-sm text-gray-800">
                {formatCurrency(selectedPolicy.basicDeliveryFee)}
              </span>
            </div>
            {selectedPolicy.freeConditionAmount !== null && (
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 w-32">
                  무료 배송 조건:
                </span>
                <span className="text-sm text-gray-800">
                  {formatCurrency(selectedPolicy.freeConditionAmount)} 이상 구매
                  시
                </span>
              </div>
            )}
            {selectedPolicy.defaultPolicy && (
              <div className="mt-3 pt-3 border-t border-blue-300">
                <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded">
                  기본 정책
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
