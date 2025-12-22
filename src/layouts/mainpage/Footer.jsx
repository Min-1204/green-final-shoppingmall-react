import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const handleNav = (path) => console.log(`Maps to: ${path}`);

  const socialLinks = [
    { Icon: Facebook, url: "https://www.facebook.com" },
    { Icon: Instagram, url: "https://www.instagram.com" },
    { Icon: Twitter, url: "https://x.com" },
  ];

  return (
    <footer className="w-full bg-white border-1 border-gray-200 text-gray-500 font-sans pt-10 pb-5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-4 space-y-7">
            <div>
              <h2 className="text-2xl font-black tracking-[0.15em] text-[#52a3ff]">
                MOONLIGHT MOIST
              </h2>
              <p className="text-[13px] tracking-[0.2em] text-[#52a3ff] mt-1 font-bold">
                달빛나라 촉촉마을
              </p>
            </div>
            <div className="space-y-3.5 text-[13px]">
              <p className="flex items-center gap-2">
                <span className="font-bold text-gray-700 min-w-[65px]">
                  Team
                </span>
                <span className="text-gray-600">신소라와 세남자</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold text-gray-700 min-w-[65px]">
                  Address
                </span>
                <span className="text-gray-600">
                  경기도 성남시 분당구 돌마로 46, 그린아카데미 5층 505호
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-bold text-gray-700 min-w-[65px]">
                  Business
                </span>
                <span className="text-gray-600">
                  742-81-00924 | 제2025-경기성남-0112호
                </span>
              </p>
              <p className="flex items-center gap-2 text-[#52a3ff] font-semibold italic mt-2">
                <Mail size={14} />
                <span>sinprincess@moonmoist.com</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6 lg:border-l lg:border-gray-50 lg:pl-10">
            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-600 uppercase tracking-widest border-b border-gray-100 pb-2 flex justify-between items-center">
                Shopping Info
                <ArrowRight size={12} className="text-gray-300" />
              </p>
              <ul className="text-[13px] space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-400">배송안내</span>
                  <span className="text-gray-700 font-medium">CJ대한통운</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">계좌정보</span>
                  <span className="text-gray-700 font-medium">
                    국민 123456-01-123456
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">예금주</span>
                  <span className="text-gray-700 font-medium">
                    촉촉마을(주)
                  </span>
                </li>
              </ul>
            </div>

            {/* SNS 아이콘 */}
            <div className="flex gap-3 mt-4">
              {socialLinks.map(({ Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-[#a4cfff] text-[#a4cfff] transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:pl-12">
            <div className="p-7">
              <p className="text-xs font-bold text-gray-600 mb-2 tracking-widest uppercase flex items-center gap-2">
                <Phone size={12} />
                Customer Support
              </p>
              <p className="text-2xl font-black text-gray-600 tracking-tighter mb-5">
                070-1234-5678
              </p>
              <div className="text-[13px] leading-6 text-gray-600 font-medium space-y-1">
                <p>평일 운영: 10:00 - 17:00</p>
                <p>점심 시간: 12:00 - 13:30</p>
                <p className="text-gray-400 pt-2 border-t border-gray-200 mt-2">
                  주말 및 공휴일은 Q&A 게시판을 이용해주세요.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 text-[14px] font-bold text-gray-700">
            {["이용약관", "개인정보처리방침", "가맹문의", "채용안내"].map(
              (v) => (
                <button
                  key={v}
                  onClick={() => handleNav(v)}
                  className="hover:text-[#52a3ff] transition-colors relative group"
                >
                  {v}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#52a3ff] transition-all group-hover:w-full"></span>
                </button>
              )
            )}
          </div>
          <p className="text-[11px] font-medium tracking-[0.1em] text-gray-400">
            © 2025 MOONLIGHT MOIST VILLAGE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
