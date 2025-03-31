import React, { useState, useEffect } from 'react';
import './Home.component.css'; // Ensure it's linked to the CSS file
import Emailjs from 'emailjs-com';

const Home = () => {
  // Load language preference from localStorage if available
  const savedLanguage = localStorage.getItem('preferredLanguage') || 'vi';
  const [language, setLanguage] = useState(savedLanguage); // Default language
  const [mailStatus, setMailStatus] = useState('');

  // Save language preference when changed
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  // Translations object
  const translations = {
    vi: {
      headerTitle: '𝑯𝑶𝑷𝑻 𝒄𝒂𝒓𝒆𝒔 𝒇𝒐𝒓 𝒚𝒐𝒖 - 𝒚𝒐𝒖 𝒄𝒂𝒓𝒆 𝒇𝒐𝒓 𝒑𝒂𝒕𝒊𝒆𝒏𝒕𝒔!',
      heroTitle: '𝙒𝒆𝙡𝒄𝒐𝒎𝒆 𝐭𝐨 𝐇𝐎𝐀𝐍𝐆 𝐏𝐇𝐔𝐂 𝐓𝐇𝐀𝐍𝐇 𝐂𝐎.,𝐋𝐓𝐃',
      heroSubtitle: '𝐘𝐎𝐔𝐑 𝐇𝐄𝐀𝐋𝐓𝐇 𝐎𝐍 𝐘𝐎𝐔𝐑 𝐇𝐀𝐍𝐃',
      productsSection: 'Sản phẩm',
      feature1Title: 'HỆ THỐNG GIÁM SÁT SỨC KHỎE',
      feature1Desc: 'Hệ thống giám sát sức khỏe máy nội soi theo dõi liên tục các chỉ số quan trọng, phát hiện sớm sự cố và đảm bảo hiệu suất tối ưu. Điều này giúp giảm thời gian gián đoạn, tiết kiệm chi phí bảo trì và nâng cao độ chính xác trong chẩn đoán, bảo vệ sức khỏe bệnh nhân.',
      feature2Title: 'Y TẾ TỪ XA',
      feature2Desc: 'Y tế từ xa kết nối bệnh nhân với bác sĩ qua nền tảng trực tuyến, giúp nâng cao khả năng tiếp cận dịch vụ y tế. Công nghệ tiên tiến cho phép chẩn đoán và tư vấn từ xa, giảm chi phí và thời gian đi lại. Điều này đảm bảo chăm sóc liên tục, mang lại sự an tâm và tiết kiệm cho cộng đồng.',
      feature3Title: 'HỖ TRỢ 24/7',
      feature3Desc: 'Chúng tôi cung cấp dịch vụ hỗ trợ 24/7, luôn sẵn sàng giải quyết mọi vấn đề kỹ thuật bất cứ lúc nào. Đội ngũ chuyên gia của chúng tôi thực hiện bảo trì và bảo dưỡng định kỳ, giúp thiết bị hoạt động ổn định và hiệu quả lâu dài. Với cam kết nhanh chóng và tận tâm, chúng tôi đảm bảo sự an tâm tuyệt đối cho khách hàng.',
      contactTitle: 'Liên hệ với chúng tôi',
      namePlaceholder: 'Họ và tên',
      emailPlaceholder: 'Email của bạn',
      messagePlaceholder: 'Lời nhắn',
      sendButton: 'Gửi tin nhắn',
      successMessage: 'Tin nhắn đã được gửi thành công!',
      failMessage: 'Gửi tin nhắn thất bại, vui lòng thử lại.',
      footerCopyright: 'Bản quyền © 2024 CÔNG TY TNHH DV VÀ TM HOÀNG PHÚC THANH',
      footerAddress: 'Địa chỉ: Tầng 3, 607 Xô Viết Nghệ Tĩnh, Phường 26, Quận Bình Thạnh, TP.HCM',
      footerPhone: 'Điện thoại: 028 3785 3388 | 028 3785 1086',
      footerEmail: 'Email: ',
      footerWebsite: 'Website: ',
      navProducts: 'Sản phẩm',
      navFeatures: 'Tính năng',
      navContact: 'Liên hệ',
      languageLabel: 'Ngôn ngữ',
      vietnamese: 'Tiếng Việt',
      english: 'Tiếng Anh',
    },
    en: {
      headerTitle: '𝑯𝑶𝑷𝑻 𝒄𝒂𝒓𝒆𝒔 𝒇𝒐𝒓 𝒚𝒐𝒖 - 𝒚𝒐𝒖 𝒄𝒂𝒓𝒆 𝒇𝒐𝒓 𝒑𝒂𝒕𝒊𝒆𝒏𝒕𝒔!',
      heroTitle: '𝑾𝒆𝒍𝒄𝒐𝒎𝒆 𝒕𝒐 𝑯𝑶𝑨𝑵𝑮 𝑷𝑯𝑼𝑪 𝑻𝑯𝑨𝑵𝑯 𝑪𝑶.,𝑳𝑻𝑫',
      heroSubtitle: '𝑌𝑂𝑈𝑅 𝐻𝐸𝐴𝐿𝑇𝐻 𝑂𝑁 𝑌𝑂𝑈𝑅 𝐻𝐴𝑁𝐷',
      productsSection: 'Products',
      feature1Title: 'HEALTH MONITORING SYSTEM',
      feature1Desc: 'The health monitoring system continuously tracks vital signs of endoscopes, detects issues early, and ensures optimal performance. This reduces downtime, saves maintenance costs, and enhances diagnostic accuracy, safeguarding patient health.',
      feature2Title: 'TELEMEDICINE',
      feature2Desc: 'Telemedicine connects patients with doctors through an online platform, improving access to healthcare services. Advanced technology enables remote diagnosis and consultation, reducing travel costs and time. This ensures continuous care, providing peace of mind and savings for the community.',
      feature3Title: '24/7 SUPPORT',
      feature3Desc: 'We offer 24/7 support, always ready to address any technical issues at any time. Our expert team performs regular maintenance and servicing, ensuring long-term stability and efficiency of equipment. With our quick and dedicated commitment, we guarantee absolute peace of mind for our customers.',
      contactTitle: 'Contact Us',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Your Message',
      sendButton: 'Send Message',
      successMessage: 'Message sent successfully!',
      failMessage: 'Failed to send message, please try again.',
      footerCopyright: 'Copyright © 2024 HOANG PHUC THANH SERVICE AND TRADING CO., LTD',
      footerAddress: 'Address: 3rd Floor, 607 Xo Viet Nghe Tinh, Ward 26, Binh Thanh District, HCMC',
      footerPhone: 'Phone: 028 3785 3388 | 028 3785 1086',
      footerEmail: 'Email: ',
      footerWebsite: 'Website: ',
      navProducts: 'Products',
      navFeatures: 'Features',
      navContact: 'Contact',
      languageLabel: 'Language',
      vietnamese: 'Vietnamese',
      english: 'English',
    },
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Xử lý gửi email bằng EmailJS
    Emailjs.sendForm('service_0v9go2o', 'template_w43y2lk', e.target, 'Waf09zcqlehx4xfa6')
      .then((result) => {
        console.log(result.text);
        alert(language === 'vi' ? translations.vi.successMessage : translations.en.successMessage);
      }, (error) => {
        console.log(error.text);
        alert(language === 'vi' ? translations.vi.failMessage : translations.en.failMessage);
      });

    // Thu thập dữ liệu name và email từ form
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');

    // Gửi dữ liệu name và email tới backend qua fetch POST request với JSON body
    fetch("https://iomt.hoangphucthanh.vn/index.php?mail", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMailStatus(data.message || (language === 'vi' ? translations.vi.successMessage : translations.en.successMessage));
      })
      .catch(error => {
        console.error(error);
        setMailStatus(language === 'vi' ? translations.vi.failMessage : translations.en.failMessage);
      });

    e.target.reset();
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className="logo-container">
          <img src="logo_up.png" alt="HOPT Logo" className="logo" />
        </div>
        <h1>{translations[language].headerTitle}</h1>
        <nav>
          <a href="https://hoangphucthanh.vn/" target="_blank" rel="noopener noreferrer" className="logo-link">HOPT</a>
          <a href="#products">{translations[language].navProducts}</a>
          <a href="#features">{translations[language].navFeatures}</a>
          <a href="https://hoangphucthanh.vn/vn/lien-he.html" target="_blank" rel="noopener noreferrer" className="logo-link">
            {translations[language].navContact}
          </a>
          {/* Language Selector */}
          <div className="language-buttons">
            <button 
              onClick={() => setLanguage('vi')} 
              className={language === 'vi' ? 'lang-btn active' : 'lang-btn'}>
              VI
            </button>
            <button 
              onClick={() => setLanguage('en')} 
              className={language === 'en' ? 'lang-btn active' : 'lang-btn'}>
              EN
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>{translations[language].heroTitle}</h2>
        <p>{translations[language].heroSubtitle}</p>
      </section>

      {/* Products Section */}
      <section id="products" className="products">
        <div className="product-side">
          <img src="telebox.png" alt="Product 1" />
        </div>
        <div className="product-intro">
          <img src="host.jpg" alt="Product Introduction" />
        </div>
        <div className="product-side">
          <img src="noisoibox.png" alt="Product 2" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="feature-card">
          <h3>{translations[language].feature1Title}</h3>
          <img src="gsht.png" alt="Health Monitoring System" />
          <p>{translations[language].feature1Desc}</p>
        </div>
        <div className="feature-card">
          <h3>{translations[language].feature2Title}</h3>
          <img src="tele.png" alt="Telemedicine" />
          <p>{translations[language].feature2Desc}</p>
        </div>
        <div className="feature-card">
          <h3>{translations[language].feature3Title}</h3>
          <img src="sp247.jpg" alt="24/7 Support" />
          <p>{translations[language].feature3Desc}</p>
        </div>
      </section>

      {/* Contact & Footer Section */}
      <div className="contact-footer">
        <div className="footer">
          <div className="footer-info">
            <p>{translations[language].footerCopyright}</p>
            <p>{translations[language].footerAddress}</p>
            <p>{translations[language].footerPhone}</p>
            <p>{translations[language].footerEmail}<a href="mailto:info@hoangphucthanh.vn">info@hoangphucthanh.vn</a></p>
            <p>{translations[language].footerWebsite}<a href="https://hoangphucthanh.vn" target="_blank" rel="noopener noreferrer">hoangphucthanh.vn</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;