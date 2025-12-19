import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-full rounded-b-3xl shadow-1xl pb-2 border-b border-t border-t-pink-200 bg-gradient-to-b from-[#fff6f9] to-[#fdecef] py-20 px-6 text-[#6b4b55] font-sans">
      <div className="max-w-7xl mx-auto pb-5 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-6 space-y-10">
          <div>
            <h2 className="text-3xl pb-2 font-semibold tracking-[0.35em] text-pink-500 drop-shadow-sm">
              MOONLIGHT MOIST
            </h2>
            <p className="mt-2 pb-2 text-sm tracking-widest text-pink-400">
              <strong>달빛나라 촉촉마을</strong>
            </p>
          </div>

          <div className="space-y-3 text-[13px] leading-relaxed">
            <Info label="TeamName : ">
              신소라와 세남자 (신소라, 임병국, 박종민, 강민석)
            </Info>
            <Info label="Address : ">
              경기도 성남시 분당구 돌마로 46, 그린아카데미 5층 505호
            </Info>
            <Info label="Business : ">
              742-81-00924 | 통신판매 제2025-경기성남-0112호
            </Info>
            <Info label="Contact : ">
              <span className="italic text-pink-500 ">
                <strong>sinprincess@moonmoist.com</strong>
              </span>
            </Info>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-between">
          <div>
            <p className="text-2xl pb-2 tracking-widest text-pink-400 mb-4">
              고객센터
            </p>
            <p className="text-4xl font-light text-[#3f2a30] tracking-tight drop-shadow-sm">
              070-1234-5678
            </p>
            <p className="mt-4 pb-2 text-sm text-[#7a5a63] leading-relaxed">
              평일 10:00 - 17:00 (점심 12:00 - 13:30)
              <br />
              주말 및 공휴일 휴무
            </p>
            <div className=" pb-3 flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-pink-300 text-pink-400 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all shadow-sm"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-pink-300 text-pink-400 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all shadow-sm"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com/?lang=ko"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-pink-300 text-pink-400 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all shadow-sm"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
          <p
            className="text-sm tracking-[0.3em] text-[#2b1a1f] mb-4"
            style={{
              textShadow: "0 2px 0 #ffe1ea, 0 8px 24px rgba(255,150,180,0.4)",
            }}
          >
            © 2025 MOONLIGHT MOIST VILLAGE
          </p>
        </div>
      </div>
      <div className="flex w-full pt-5 pb-5 border-t border-b border-pink-200 justify-center gap-x-20 gap-y-10 text-[16px] text-pink-600">
        {["이용약관", "개인정보처리방침", "가맹문의", "채용안내"].map((v) => (
          <button key={v} className="hover:text-pink-600 transition-colors">
            <strong>{v}</strong>
          </button>
        ))}
      </div>
    </footer>
  );
};

/* 재사용 컴포넌트 */
const Info = ({ label, children }) => (
  <div className="flex gap-6">
    <span className="w-20 shrink-0 text-pink-400 font-medium">{label}</span>
    <span className="text-[#6b4b55]">{children}</span>
  </div>
);

const Social = ({ icon }) => (
  <button className="w-9 h-9 rounded-full border border-pink-300 text-pink-400 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all shadow-sm">
    {icon}
  </button>
);

export default Footer;
