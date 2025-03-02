'use client'
import React, { FC, useEffect, useState } from "react"
import Heading from "./utils/Heading";
import Header from "./components/Header"
import { FaIndustry } from "react-icons/fa";
import { MdEngineering, MdSupportAgent } from "react-icons/md";
import Link from "next/link";
import { HiMail } from "react-icons/hi";
import { RiMapPinFill } from "react-icons/ri";
import { BsFillTelephoneFill } from "react-icons/bs";
import toast from "react-hot-toast";


interface Props {}

const Page: FC<Props> = (props) => {

  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight) {
          element.classList.add('fade-in-up');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); 
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
    };

    const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
        toast.success('邮件发送成功！');
    } else {
        toast.error('邮件发送失败：' + result.message);
    }
  };

  return (
    <div>
      <Heading
      title="成都南方石化密封件有限公司"
      description="石化密封件，加工，制作，销售，生成，机械密封，金属垫片，O圈，油封"
      keywords="O圈,仓库，储存，订单咨询，密封件，机械密封，金属垫片，油封"/>

      <Header
      open={open}
      setOpen={setOpen}
      activeItem={activeItem}
      setRoute={setRoute}
      route={route} />

{/* 英雄区域 */}
<div className="relative w-full h-[500px] 800px:h-[80vh] bg-gradient-to-r from-blue-600 to-indigo-800 flex items-center justify-center z-[1]">
        <div className="absolute inset-0 opacity-30 bg-[url('/hero-background.jpg')] bg-cover bg-center"></div>
        <div className="z-10 text-center max-w-[800px] px-4">
          <h1 className="text-4xl 800px:text-6xl font-bold text-white mb-6">专业石化密封件解决方案</h1>
          <p className="text-xl text-white mb-8">成都南方石化密封件有限公司提供高品质密封产品，满足您的工业需求</p>
          <div className="flex flex-col 800px:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md font-semibold transition-all">
              查看产品目录
            </button>
            <button 
            className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-3 rounded-md font-semibold transition-all"
            onClick={() => {
              document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            >
              联系我们
            </button>
          </div>
        </div>
      </div>

      {/* 公司介绍 */}
      <div className="w-[95%] 800px:w-[85%] m-auto py-16">
        <div className="grid grid-cols-1 800px:grid-cols-2 gap-10 items-center">
          <div className="animate-on-scroll">
            <h2 className="text-2xl 800px:text-3xl font-bold mb-6 text-gray-800 dark:text-white">关于我们</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              成都南方石化密封件有限公司成立于2005年，是一家专业从事石化行业密封件研发、生产和销售的企业。多年来，我们始终坚持&ldquo;质量第一，客户至上&rdquo;的经营理念，为国内外众多石化企业提供优质的密封解决方案。
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              我们拥有先进的生产设备和检测仪器，专业的技术团队和完善的质量管理体系，确保产品质量稳定可靠。公司通过了ISO9001质量管理体系认证，产品符合国际标准。
            </p>
            <div className="flex gap-3 items-center">
              <div className="h-1 w-10 bg-blue-600"></div>
              <p className="font-medium text-blue-600">值得您信赖的合作伙伴</p>
            </div>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 h-[300px] 800px:h-[400px] relative rounded-lg overflow-hidden animate-on-scroll">
            <div className="absolute inset-0 bg-[url('/imgs/company1.jpg')] bg-cover bg-center">
            {/* <Image src="/imgs/company1.jpg" alt="公司建筑" fill className="object-cover" /> */}
            </div>
          </div>
        </div>
      </div>

      {/* 我们的优势 */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="w-[95%] 800px:w-[85%] m-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-2xl 800px:text-3xl font-bold mb-4 text-gray-800 dark:text-white">我们的优势</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-[700px] mx-auto">
              多年的行业经验让我们能够提供全方位的密封解决方案，满足不同客户的需求
            </p>
          </div>

          <div className="grid grid-cols-1 800px:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md hover:shadow-lg transition-all animate-on-scroll">
              <div className="text-blue-600 mb-4">
                <MdEngineering size={50} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">专业技术团队</h3>
              <p className="text-gray-600 dark:text-gray-300">
                拥有多年经验的工程师团队，能够为您提供专业的技术支持和定制化解决方案。
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md hover:shadow-lg transition-all animate-on-scroll">
              <div className="text-blue-600 mb-4">
                <FaIndustry size={50} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">先进生产设备</h3>
              <p className="text-gray-600 dark:text-gray-300">
                引进国际先进的生产和检测设备，确保产品质量稳定可靠，满足客户的严格要求。
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md hover:shadow-lg transition-all animate-on-scroll">
              <div className="text-blue-600 mb-4">
                <MdSupportAgent size={50} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">全方位服务</h3>
              <p className="text-gray-600 dark:text-gray-300">
                从咨询、设计、生产到售后，我们提供一站式服务，确保您的需求得到全面满足。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 产品展示 */}
      <div className="w-[95%] 800px:w-[85%] m-auto py-16">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-2xl 800px:text-3xl font-bold mb-4 text-gray-800 dark:text-white">产品展示</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-[700px] mx-auto">
            我们提供各类高品质密封产品，满足不同工业环境的需求
          </p>
        </div>

        <div className="grid grid-cols-1 800px:grid-cols-2 1000px:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all animate-on-scroll">
            <div className="h-[200px] bg-gray-200 dark:bg-gray-600 relative">
              <div className="absolute inset-0 bg-[url('/product1.jpg')] bg-cover bg-center"></div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">机械密封</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">适用于各类泵、压缩机等旋转设备</p>
              <Link href="/products/mechanical-seals" className="text-blue-600 hover:underline text-sm font-medium">
                了解更多 →
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all animate-on-scroll">
            <div className="h-[200px] bg-gray-200 dark:bg-gray-600 relative">
              <div className="absolute inset-0 bg-[url('/product2.jpg')] bg-cover bg-center"></div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">O型圈</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">多种材质可选，适应不同介质和温度环境</p>
              <Link href="/products/o-rings" className="text-blue-600 hover:underline text-sm font-medium">
                了解更多 →
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all animate-on-scroll">
            <div className="h-[200px] bg-gray-200 dark:bg-gray-600 relative">
              <div className="absolute inset-0 bg-[url('/product3.jpg')] bg-cover bg-center"></div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">金属垫片</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">耐高温高压，适用于严苛工况环境</p>
              <Link href="/products/metal-gaskets" className="text-blue-600 hover:underline text-sm font-medium">
                了解更多 →
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all animate-on-scroll">
            <div className="h-[200px] bg-gray-200 dark:bg-gray-600 relative">
              <div className="absolute inset-0 bg-[url('/product4.jpg')] bg-cover bg-center"></div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">油封</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">防止油液泄漏，保护轴承和其他部件</p>
              <Link href="/products/oil-seals" className="text-blue-600 hover:underline text-sm font-medium">
                了解更多 →
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="inline-block bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-md font-semibold transition-all">
            查看全部产品
          </Link>
        </div>
      </div>

      {/* 服务流程 */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="w-[95%] 800px:w-[85%] m-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-2xl 800px:text-3xl font-bold mb-4 text-gray-800 dark:text-white">服务流程</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-[700px] mx-auto">
              我们提供从咨询到售后的全流程服务，确保您的需求得到完美满足
            </p>
          </div>

          <div className="relative">
            <div className="hidden 800px:block absolute top-1/2 left-0 w-full h-1 bg-blue-200 dark:bg-blue-900 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 800px:grid-cols-4 gap-8">
              <div className="relative flex flex-col items-center animate-on-scroll">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white z-10 mb-4">
                  <span className="text-xl font-bold">01</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center text-gray-800 dark:text-white">需求咨询</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                  了解您的具体需求，提供专业建议
                </p>
              </div>

              <div className="relative flex flex-col items-center animate-on-scroll">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white z-10 mb-4">
                  <span className="text-xl font-bold">02</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center text-gray-800 dark:text-white">方案设计</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                  根据需求定制最佳密封解决方案
                </p>
              </div>

              <div className="relative flex flex-col items-center animate-on-scroll">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white z-10 mb-4">
                  <span className="text-xl font-bold">03</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center text-gray-800 dark:text-white">生产制造</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                  严格按照标准生产，确保品质
                </p>
              </div>

              <div className="relative flex flex-col items-center animate-on-scroll">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white z-10 mb-4">
                  <span className="text-xl font-bold">04</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center text-gray-800 dark:text-white">交付售后</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                  及时交付并提供全面售后服务
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 客户案例 */}
      {/* <div className="w-[95%] 800px:w-[85%] m-auto py-16">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-2xl 800px:text-3xl font-bold mb-4 text-gray-800 dark:text-white">客户案例</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-[700px] mx-auto">
            我们为众多知名企业提供密封解决方案，以下是部分合作客户
          </p>
        </div>

        <div className="grid grid-cols-2 800px:grid-cols-3 1000px:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="h-[100px] bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center p-4 shadow-sm hover:shadow-md transition-all animate-on-scroll">
              <div className="text-center text-gray-400 dark:text-gray-500">客户Logo {item}</div>
            </div>
          ))}
        </div>
      </div> */}

      {/* 联系我们 */}
      <div className="bg-blue-600 text-white py-16">
        <div className="w-[95%] 800px:w-[85%] m-auto">
          <div className="grid grid-cols-1 800px:grid-cols-2 gap-10">
            <div className="animate-on-scroll">
              <h2 className="text-2xl 800px:text-3xl font-bold mb-6"  id="contact-section">联系我们</h2>
              <p className="mb-8">
                无论是产品咨询、技术支持还是合作洽谈，我们都期待您的来电或留言
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <BsFillTelephoneFill size={20} />
                  </div>
                  <div>
                    <p className="opacity-80 text-sm">电话咨询</p>
                    <p className="font-medium">028-87659321</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <HiMail size={20} />
                  </div>
                  <div>
                    <p className="opacity-80 text-sm">邮箱咨询</p>
                    <p className="font-medium">cdnanfang@163.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <RiMapPinFill size={20} />
                  </div>
                  <div>
                    <p className="opacity-80 text-sm">公司地址</p>
                    <p className="font-medium">四川省成都市高新区腾飞二路486号</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg animate-on-scroll">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">发送咨询</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input name="name" type="text" placeholder="您的姓名" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white" required />
                </div>
                <div className="mb-4">
                  <input name="email" type="email" placeholder="您的邮箱" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white" required />
                </div>
                <div className="mb-4">
                  <input name="phone" type="text" placeholder="您的电话" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white" required />
                </div>
                <div className="mb-4">
                  <textarea name="message" placeholder="咨询内容" rows={4} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white" required></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition-all">
                  提交咨询
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="w-[95%] 800px:w-[85%] m-auto">
          <div className="grid grid-cols-1 800px:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">关于我们</h3>
              <p className="text-gray-400 mb-4">
                成都南方石化密封件有限公司是专业从事石化行业密封件研发、生产和销售的企业。
              </p>
              <div className="flex gap-4">
                <Link href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all">
                  <span className="text-sm">微</span>
                </Link>
                <Link href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all">
                  <span className="text-sm">抖</span>
                </Link>
                <Link href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all">
                  <span className="text-sm">B</span>
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">产品中心</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-all">机械密封</Link></li>
                <li><Link href="#" className="hover:text-white transition-all">O型圈</Link></li>
                <li><Link href="#" className="hover:text-white transition-all">金属垫片</Link></li>
                <li><Link href="#" className="hover:text-white transition-all">油封</Link></li>
                <li><Link href="#" className="hover:text-white transition-all">更多产品</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">快速链接</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-all">首页</Link></li>
                <li><Link href="#" className="hover:text-white transition-all">关于我们</Link></li>
                <li><Link href="#" className="hover:text-white transition-all">产品中心</Link></li>
                <li><Link href="#" className="hover:text-white transition-all">新闻资讯</Link></li>
                <li><Link href="#" className="hover:text-white transition-all">联系我们</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">联系方式</h3>
              <ul className="space-y-2 text-gray-400">
                <li>电话：028-87659321</li>
                <li>邮箱：cdnanfang@163.com</li>
                <li>地址：四川省成都市高新区腾飞二路486号</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© 2025 成都南方石化密封件有限公司. 保留所有权利.</p>
          </div>
        </div>
      </footer>

      {/* 添加一个简单的动画样式 */}
      <style jsx global>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        
        .fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}


export default Page;