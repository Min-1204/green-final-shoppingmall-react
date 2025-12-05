import HelpInquiryForm from "../../components/user/helpcenter/HelpInquiryForm";

export default function HelpInquiryPage() {
  return (
    <div className="w-full bg-white border border-green-100 rounded-md shadow-sm px-6 py-7">
      <div className="flex items-start justify-between gap-4">
        <HelpInquiryForm />
      </div>
    </div>
  );
}
