document.addEventListener('DOMContentLoaded', () => {

    // ===== DATA PRODUK =====
    const categoryData = {
        "Sayuran": {
            id: { products: ["BAYAM HIJAU","BEETROOT","BROKOLI","BUNCIS","BUNCIS BABY","DAUN KEMANGI","DAUN PANDAN","DAUN PISANG","DAUN SELEDRI","DAUN SINGKONG","EDAMAME","HORENSO","JAGUNG ACAR","JAGUNG MANIS KULIT","JAGUNG MANIS KUPAS","JAMUR CHAMPIGNON","JAMUR ENOKI","JAMUR KUPING BASAH","JAMUR SHIMEJI COKELAT","JAMUR TIRAM","JAMUR LIMAU","KACANG PANJANG","KACANG TANAH","KAILAN BABY","KANGKUNG","KEMBANG KOL","KENTANG BABY","KENTANG DIENG","KOL PUTIH","KOL UNGU","KUCAI","LABU SIAM","LABU SIAM ACAR","LOBAK PUTIH","OYONG","PAKCOY (REG/ORGANIC)","PAPRIKA (MERAH/HIJAU)","PARE","PARSLEY","SAWI HIJAU","SAWI PUTIH","SELADA KERITING","SELADA ROMAINE HIJAU","SELEDRI STICK","TAUGE","TERONG UNGU","TIMUN","TIMUN JEPANG","TOMAT MERAH","UBI CILEMBU","UBI MERAH","UBI UNGU","WORTEL BABY","WORTEL BRASTAGI","WORTEL ORGANIK","ZUCCHINI"] },
            en: { products: ["GREEN SPINACH","BEETROOT","BROCCOLI","GREEN BEANS","BABY GREEN BEANS","BASIL LEAVES","PANDAN LEAVES","BANANA LEAVES","CELERY LEAVES","CASSAVA LEAVES","EDAMAME","HORENSO (Japanese Spinach)","BABY CORN","SWEET CORN (with husk)","SWEET CORN (peeled)","CHAMPIGNON MUSHROOM","ENOKI MUSHROOM","WOOD EAR MUSHROOM (wet)","BROWN SHIMEJI MUSHROOM","OYSTER MUSHROOM","LIME MUSHROOM? (Verify name)","LONG BEANS","PEANUTS","BABY KALE","WATER SPINACH","CAULIFLOWER","BABY POTATOES","DIENG POTATOES","WHITE CABBAGE","RED CABBAGE","CHIVES","CHAYOTE","PICKLED CHAYOTE","DAIKON RADISH","LUFFA","PAK CHOY (REG/ORGANIC)","BELL PEPPER (RED/GREEN)","BITTER MELON","PARSLEY","MUSTARD GREENS","NAPA CABBAGE","CURLY LETTUCE","GREEN ROMAINE LETTUCE","CELERY STICK","BEAN SPROUTS","PURPLE EGGPLANT","CUCUMBER","JAPANESE CUCUMBER","RED TOMATO","CILEMBU SWEET POTATO","RED SWEET POTATO","PURPLE SWEET POTATO","BABY CARROT","BRASTAGI CARROT","ORGANIC CARROT","ZUCCHINI"] }
        },
        "Herbs & Spices": {
            id: { products: ["BAWANG BOMBAY","BAWANG MERAH","BAWANG PUTIH (REG/KATING)","BIJI PALA","CABAI HIJAU BESAR","CABAI HIJAU KERITING","CABAI MERAH BESAR","CABAI MERAH KERITING","CABAI RAWIT HIJAU","CABAI RAWIT MERAH","CENGKEH","DAUN BASIL","DAUN JERUK (REG/ORGANIK)","DAUN SALAM","JAHE GAJAH","JAHE PUTIH","JINTEN","KAPULAGA","KAYU MANIS","KENCUR","KUNYIT","LADA HITAM UTUH","LADA PUTIH UTUH","LENGKUAS","RASEDA ASAM JAWA","SEREH"] },
            en: { products: ["ONION","SHALLOTS","GARLIC (REG/KATING)","NUTMEG","LARGE GREEN CHILI","CURLY GREEN CHILI","LARGE RED CHILI","CURLY RED CHILI","GREEN BIRD'S EYE CHILI","RED BIRD'S EYE CHILI","CLOVES","BASIL LEAVES","LIME LEAVES (REG/ORGANIC)","BAY LEAVES","ELEPHANT GINGER","WHITE GINGER","CUMIN","CARDAMOM","CINNAMON","GALANGAL (Kaempferia galanga)","TURMERIC","WHOLE BLACK PEPPER","WHOLE WHITE PEPPER","GALANGAL (Alpinia galanga)","TAMARIND PASTE","LEMONGRASS"] }
        },
        "Buah-buahan": {
            id: { products: ["ALPUKAT MENTEGA","ANGGUR","APEL","BLEWAH","BUAH NAGA","JERUK","JAMBU","NANAS","MANGGA","MELON","PEPAYA","PISANG","SEMANGKA","STRAWBERRY"] },
            en: { products: ["AVOCADO","GRAPES","APPLE","CANTALOUPE","DRAGON FRUIT","ORANGE","GUAVA","PINEAPPLE","MANGO","MELON","PAPAYA","BANANA","WATERMELON","STRAWBERRY"] }
        },
        "Bahan Pangan Lain": {
            id: { products: ["EMPING MELINJO","KACANG HIJAU","KELAPA MUDA","KETAN HITAM","TAHU","TELUR","TEMPE"] },
            en: { products: ["MELINJO CRACKERS","MUNG BEANS","YOUNG COCONUT","BLACK GLUTINOUS RICE","TOFU","EGGS","TEMPEH"] }
        },
        "Frozen Food": {
            id: { products: ["STRAIGHT CUT 2.5 KG","SHOESTRING 2.5 KG","CRINCLE CUT 2.5 KG","SOSIS COCKTAIL AKAI 66 PCS","BAKSO BEEF AKAI 50 PCS"] }, // Pakai titik
            en: { products: ["STRAIGHT CUT FRIES 2.5 KG","SHOESTRING FRIES 2.5 KG","CRINKLE CUT FRIES 2.5 KG","AKAI COCKTAIL SAUSAGES 66 PCS","AKAI BEEF BALLS 50 PCS"] } // Pakai titik
        }
    };

    // ===== OBJEK TRANSLATIONS =====
    const translations = {
        'id': {
            navHome: 'Beranda', navProducts: 'Produk', navAbout: 'Tentang', navContact: 'Kontak',
            heroTitle: 'Solusi Terpercaya Produk Pangan Berkualitas',
            heroSubtitle: 'Menjamin kesegaran dan kualitas premium melalui kemitraan agrikultur lokal terpilih.',
            heroCTA: 'Lihat Kategori',
            productsTitle: 'Kategori Produk',
            aboutTitle: 'PASOKARI',
            aboutText1: 'Mitra rantai pasok tepercaya untuk bahan pangan segar premium, PASOKARI meyakini bahwa kualitas terbaik hidangan berakar pada bahan baku unggulan.',
            aboutText2: 'Melalui aliansi agrikultur dengan produsen lokal yang berkomitmen pada praktik berkelanjutan, PASOKARI menawarkan lebih dari pasokan. Kami adalah solusi rantai pasok profesional yang dirancang untuk secara langsung mendukung dan mengoptimalkan efisiensi operasional dapur.',
            contactTitle: 'Hubungi Kami',
            contactSubtitle: 'Siap untuk berdiskusi tentang kebutuhan Anda? Hubungi kami melalui platform di bawah ini.',
            contactWhatsApp: 'Hubungi via WhatsApp',
            contactEmail: 'Kirim Email',
            footerText: 'Kualitas Terpercaya, Diantar Dengan Penuh Kepedulian.',
            // Kontak Kiri (Info)
            contactInfoTitle: 'Informasi Kontak',
            contactAddressTitle: 'Alamat:',
            contactAddressText: 'Citra Sentul Raya,<br>Bogor, Jawa Barat, 16810',
            contactPhoneTitle: 'Telepon:',
            contactEmailTitle: 'Email:',
            contactSocialTitle: 'Media Sosial:',
            // Kontak Kanan (Form - Placeholder Model)
            contactFormTitleAlt: 'Butuh Bantuan? Hubungi Kami',
            contactFormDescAlt: 'Isi formulir di bawah ini dan tim kami akan segera menghubungi anda.',
            formNamePlaceholder: 'Nama Anda',
            formPhonePlaceholder: 'Nomor Telepon Anda',
            formEmailPlaceholder: 'Email Anda',
            formMessagePlaceholder: 'Pesan Anda',
            formSend: 'Kirim Pesan',
            // Modal Kategori
            modalProductsTitle: 'Produk Tersedia:',
            modalCTA: 'Minta Penawaran untuk Kategori Ini',
            // Modal Detail Produk
            productDetailCTA: 'Minta Penawaran Produk Ini',
            // Nama Kategori (Kartu & Judul Modal)
            categoryVegetables: 'Sayuran',
            categoryHerbs: 'Rempah & Bumbu',
            categoryFruits: 'Buah-buahan',
            categoryStaples: 'Bahan Pangan Lain',
            categoryFrozen: 'Makanan Beku',
             // Deskripsi Kategori Spesifik untuk Modal
             modalSayuranDesc: 'Pilihan sayuran terbaik untuk hidangan sehat Anda, dikurasi dari sumber lokal terpercaya.',
             modalHerbsDesc: 'Ragam bumbu segar yang menambah aroma dan cita rasa alami, dipilih untuk meningkatkan kualitas setiap hidangan.',
             modalBuahDesc: 'Buah segar penuh vitamin untuk setiap momen, dipetik pada tingkat kematangan optimal untuk rasa terbaik.',
             modalPanganDesc: 'Kacang, telur, tahu, tempe, dan bahan pokok berkualitas lainnya untuk melengkapi kebutuhan dapur Anda.',
             modalFrozenDesc: 'Solusi cepat untuk hidangan praktis dan lezat, dibuat dari bahan berkualitas dan diproses secara higienis.'
        },
        'en': {
            navHome: 'Home', navProducts: 'Products', navAbout: 'About', navContact: 'Contact',
            heroTitle: 'Trusted Solution for Quality Food Products',
            heroSubtitle: 'Ensuring premium freshness and quality through chosen local agricultural partnerships.',
            heroCTA: 'View Categories',
            productsTitle: 'Product Categories',
            aboutTitle: 'PASOKARI',
            aboutText1: 'PASOKARI, the trusted supply chain partner for premium fresh food ingredients, asserts that the finest culinary outcomes are rooted in superior sourcing.',
            aboutText2: 'By leveraging sustainable agricultural alliances with local producers, we transcend conventional procurement. PASOKARI provides a professional supply chain solution specifically designed to directly enhance and streamline critical daily kitchen operations.',
            contactTitle: 'Contact Us',
            contactSubtitle: 'Ready to discuss your needs? Reach out to us through the platforms below.',
            contactWhatsApp: 'Contact via WhatsApp',
            contactEmail: 'Send Email',
            footerText: 'Trusted Quality, Delivered With Care.',
            // Kontak Kiri (Info)
            contactInfoTitle: 'Contact Information',
            contactAddressTitle: 'Address:',
            contactAddressText: 'Citra Sentul Raya,<br>Bogor, West Java, 16810',
            contactPhoneTitle: 'Phone:',
            contactEmailTitle: 'Email:',
            contactSocialTitle: 'Social Media:',
            // Kontak Kanan (Form - Placeholder Model)
            contactFormTitleAlt: 'Need Help? Contact Us',
            contactFormDescAlt: 'Fill out the form below and our team will contact you shortly.',
            formNamePlaceholder: 'Your Name',
            formPhonePlaceholder: 'Your Phone Number',
            formEmailPlaceholder: 'Your Email',
            formMessagePlaceholder: 'Your Message',
            formSend: 'Send Message',
            // Modal Kategori
            modalProductsTitle: 'Available Products:',
            modalCTA: 'Request Quote for This Category',
            // Modal Detail Produk
            productDetailCTA: 'Request Quote for This Product',
            // Nama Kategori
            categoryVegetables: 'Vegetables',
            categoryHerbs: 'Herbs & Spices',
            categoryFruits: 'Fruits',
            categoryStaples: 'Other Staples',
            categoryFrozen: 'Frozen Food',
             // Deskripsi Kategori Spesifik untuk Modal
             modalSayuranDesc: 'The best selection of vegetables for your healthy dishes, curated from trusted local sources.',
             modalHerbsDesc: 'A variety of fresh seasonings adding natural aroma and flavor, selected to enhance the quality of every dish.',
             modalBuahDesc: 'Fresh fruits full of vitamins for every moment, picked at optimal ripeness for the best flavor.',
             modalPanganDesc: 'Quality nuts, eggs, tofu, tempeh, and other staple foods to complete your kitchen needs.',
             modalFrozenDesc: 'A quick solution for practical and delicious meals, made from quality ingredients and processed hygienically.'
        }
    };

    // ===== VARIABEL GLOBAL =====
    let currentLang = document.documentElement.lang || 'id';

    // ===== FUNGSI TRANSLATE =====
    function translatePage(lang) {
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (translations[lang] && translations[lang][key]) {
                const translationText = translations[lang][key];

                // Jika elemen adalah input/textarea DAN key adalah placeholder
                if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && key.endsWith('Placeholder')) {
                    el.placeholder = translationText; // Langsung set placeholder
                }
                // Jika elemen adalah <p> untuk alamat
                else if (key === 'contactAddressText') {
                    el.innerHTML = translationText; // Gunakan innerHTML untuk <br>
                }
                // Untuk elemen teks lainnya (H1, H2, H3, P, A, SPAN, BUTTON dll)
                // Kecuali Input/Textarea yang bukan placeholder
                else if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
                    el.textContent = translationText;
                }

            } else { // Fallback language logic (jika terjemahan tidak ditemukan)
                const fallbackLang = lang === 'en' ? 'id' : 'en';
                if (translations[fallbackLang] && translations[fallbackLang][key]) {
                    const fallbackText = translations[fallbackLang][key];
                    if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && key.endsWith('Placeholder')) {
                       el.placeholder = fallbackText;
                    } else if (key === 'contactAddressText') {
                       el.innerHTML = fallbackText;
                    } else if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
                       el.textContent = fallbackText;
                    }
                } else {
                   // Hanya tampilkan warning jika key bukan placeholder
                   if (!key.endsWith('Placeholder')) {
                       console.warn(`Translation key "${key}" not found in any language.`);
                       // Kosongkan teks jika key tidak ada sama sekali (opsional)
                       // if(el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') el.textContent = '';
                       // if(el.placeholder) el.placeholder = '';
                   } else {
                       // Kosongkan placeholder jika key placeholder tidak ada
                       if (el.placeholder) el.placeholder = '';
                   }
                }
            }
        });
        // Update atribut lang di tag <html> dan teks tombol bahasa
        document.documentElement.lang = lang;
        const currentLangText = document.getElementById('currentLangText');
        if(currentLangText) currentLangText.textContent = lang.toUpperCase();
    }


    // ===== LOGIKA UMUM =====
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
        });
    }

    // Language Dropdown
    const langBtnTrigger = document.getElementById('langBtnTrigger');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    if (langBtnTrigger && langDropdown && langOptions.length > 0) {
        langBtnTrigger.addEventListener('click', (e) => { e.stopPropagation(); langDropdown.classList.toggle('active'); });
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedLang = option.getAttribute('data-lang');
                if (selectedLang === currentLang) { langDropdown.classList.remove('active'); return; }
                currentLang = selectedLang;
                translatePage(currentLang); // Panggil fungsi terjemahan
                langDropdown.classList.remove('active'); // Tutup dropdown
            });
        });
        // Tutup dropdown jika klik di luar
        document.addEventListener('click', (e) => {
             if (langDropdown && langDropdown.classList.contains('active') && !langBtnTrigger.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
         });
    }

    // Responsive Navbar Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.querySelector('.nav-mobile');
    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', () => { navMobile.classList.toggle('active'); menuToggle.classList.toggle('open'); });
        // Tutup nav mobile saat link di dalamnya diklik
        document.querySelectorAll('.nav-mobile a').forEach(link => {
            link.addEventListener('click', () => { navMobile.classList.remove('active'); menuToggle.classList.remove('open'); });
        });
    }

    // Panggil terjemahan awal saat halaman dimuat
    translatePage(currentLang);


    // ===== LOGIKA HOMEPAGE (index.html) =====
    const categoryModal = document.getElementById('categoryModal');
    const productDetailModal = document.getElementById('productDetailModal');

    // Hanya jalankan logika modal jika elemen modal ditemukan
    if (categoryModal && productDetailModal) {
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const modalProductList = document.getElementById('modalProductList');
        const closeModal = document.getElementById('closeModal');
        const modalCTA = categoryModal.querySelector('.modal-cta');

        const productDetailClose = document.getElementById('productDetailClose');
        const productDetailImage = document.getElementById('productDetailImage');
        const productDetailTitle = document.getElementById('productDetailTitle');
        const productDetailCTA = productDetailModal.querySelector('.modal-cta');

        // Event listener untuk kartu kategori
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category; // Nama kategori mentah (misal "Sayuran")
                const categoryProductsData = categoryData[category]; // Data produk dari categoryData
                const currentTranslationData = translations[currentLang]; // Data terjemahan bahasa saat ini

                if (categoryProductsData && currentTranslationData) {

                    // Update Judul Modal Kategori
                    let titleKey;
                    if (category === 'Sayuran') titleKey = 'categoryVegetables';
                    else if (category === 'Herbs & Spices') titleKey = 'categoryHerbs';
                    else if (category === 'Buah-buahan') titleKey = 'categoryFruits';
                    else if (category === 'Bahan Pangan Lain') titleKey = 'categoryStaples';
                    else if (category === 'Frozen Food') titleKey = 'categoryFrozen';

                    if (titleKey) {
                        modalTitle.setAttribute('data-lang-key', titleKey); // Set key untuk fungsi translatePage nanti
                        if (currentTranslationData[titleKey]) {
                           modalTitle.textContent = currentTranslationData[titleKey];
                        } else { // Fallback jika key tidak ada
                           const fallbackLang = currentLang === 'en' ? 'id' : 'en';
                           modalTitle.textContent = translations[fallbackLang]?.[titleKey] || category;
                        }
                    } else { // Fallback jika kategori tidak dikenal
                        modalTitle.removeAttribute('data-lang-key');
                        modalTitle.textContent = category;
                    }

                    // Update Deskripsi Modal Kategori
                    let descKey;
                    if (category === 'Sayuran') descKey = 'modalSayuranDesc';
                    else if (category === 'Herbs & Spices') descKey = 'modalHerbsDesc';
                    else if (category === 'Buah-buahan') descKey = 'modalBuahDesc';
                    else if (category === 'Bahan Pangan Lain') descKey = 'modalPanganDesc';
                    else if (category === 'Frozen Food') descKey = 'modalFrozenDesc';

                    if (descKey && currentTranslationData[descKey]) {
                        modalDesc.textContent = currentTranslationData[descKey];
                    } else {
                        modalDesc.textContent = "Deskripsi tidak tersedia.";
                        console.warn(`Modal description key "${descKey}" not found for language "${currentLang}".`);
                    }

                    modalProductList.innerHTML = ''; // Kosongkan list produk sebelumnya

                    // Ambil list produk ID untuk nama file
                    const productListForFilenames = categoryProductsData.id.products;
                    // Ambil list produk sesuai bahasa untuk tampilan
                    const productListForDisplay = categoryProductsData[currentLang]?.products || productListForFilenames;

                    // Validasi panjang array (opsional tapi bagus)
                    if (productListForFilenames.length !== productListForDisplay.length) {
                        console.warn("Product list length mismatch for category:", category, " - using ID names for display.");
                        // Jika jumlah tidak cocok, mungkin lebih aman pakai nama ID untuk display juga
                        // productListForDisplay = productListForFilenames; // Uncomment ini jika perlu fallback
                    }

                    // Loop melalui produk (berdasarkan list ID)
                    productListForFilenames.forEach((productNameID, index) => {
                        const item = document.createElement('div');
                        item.classList.add('modal-product-item');

                        // Membuat nama folder
                        const folderName = category.toLowerCase().replace(/[\(\)\/& -]/g, '_').replace(/_+/g, '_');
                        // Membuat nama file dari NAMA PRODUK ID (pastikan koma jadi titik)
                        const cleanProductNameID = productNameID.toLowerCase().replace(/[\(\)\/]/g, '').replace(/ /g, '_').replace(/,/g,'.');
                        const imgName = `${cleanProductNameID}.jpg`;
                        const imgPath = `assets/katalog/${folderName}/${imgName}`;

                        // Ambil nama tampilan, fallback ke nama ID jika index tidak valid
                        const displayProductName = productListForDisplay[index] || productNameID;

                        // Simpan data di elemen dataset untuk modal detail
                        item.dataset.imgSrc = imgPath;
                        item.dataset.productName = displayProductName; // Simpan nama tampilan

                        // Set HTML untuk item produk
                        item.innerHTML = `
                            <img src="${imgPath}" alt="${displayProductName}" onerror="this.style.backgroundColor='#eee'; this.removeAttribute('src'); this.alt='Image not found';">
                            <p>${displayProductName}</p>
                        `;

                        // Event listener untuk membuka modal detail produk
                        item.addEventListener('click', (e) => {
                            e.stopPropagation(); // Mencegah modal kategori tertutup
                            const detailImgSrc = item.dataset.imgSrc;
                            const detailProductNameDisplay = item.dataset.productName;
                            productDetailImage.src = detailImgSrc;
                            productDetailImage.alt = detailProductNameDisplay; // Set alt text
                            productDetailTitle.textContent = detailProductNameDisplay;
                            productDetailModal.style.display = 'flex'; // Tampilkan modal detail
                        });

                        modalProductList.appendChild(item); // Tambahkan item ke grid
                    });

                    categoryModal.style.display = 'flex'; // Tampilkan modal kategori
                } else {
                    console.error("Product data or translation data not found for category:", category, currentLang);
                }
            });
        });

        // Menutup modal kategori
        closeModal.addEventListener('click', () => categoryModal.style.display = 'none');
        window.addEventListener('click', e => {
            // Tutup hanya jika klik di luar area konten modal KATEGORI dan modal DETAIL tidak sedang aktif
            if (e.target === categoryModal && productDetailModal.style.display !== 'flex') {
                categoryModal.style.display = 'none';
            }
        });

        // Menutup modal detail produk
        productDetailClose.addEventListener('click', () => { productDetailModal.style.display = 'none'; });
        window.addEventListener('click', e => {
             // Tutup hanya jika klik di luar area konten modal DETAIL
            if (e.target === productDetailModal) {
                productDetailModal.style.display = 'none';
            }
        });

        // Handler Smooth scroll untuk Tombol CTA di kedua Modal
        function handleModalCTAClick(e){
            const href = this.getAttribute('href');
             if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    // Hitung posisi target dengan offset navbar
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    // Tutup kedua modal setelah scroll
                    categoryModal.style.display = 'none';
                    productDetailModal.style.display = 'none';
                }
            }
        }
        // Pasang event listener ke tombol CTA jika ada
        if (modalCTA) { modalCTA.addEventListener('click', handleModalCTAClick); }
        if (productDetailCTA) { productDetailCTA.addEventListener('click', handleModalCTAClick); }

    } // Akhir if (categoryModal && productDetailModal)

    // Smooth scroll navigasi utama (hanya jika elemen homepage ada)
    // Cek keberadaan elemen #home dan #products sebagai penanda ini homepage
    if (document.getElementById('home') && document.getElementById('products')) {
         const navLinks = document.querySelectorAll('.nav-center a, .nav-mobile a, .logo-container, .hero-content .cta-button');

         navLinks.forEach(link => {
             link.addEventListener('click', function (e) {
                 const href = this.getAttribute('href');

                 // Hanya handle smooth scroll jika HANYA hash (#) dan bukan hanya '#'
                 if (href.startsWith('#') && href.length > 1) {
                     e.preventDefault(); // Mencegah lompatan default & penambahan # ke URL
                     const targetId = href.substring(1); // Ambil ID tanpa #
                     const targetElement = document.getElementById(targetId);

                     if (targetElement) {
                         // Hitung posisi target dengan offset navbar
                         const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70; // Ambil tinggi navbar atau default 70px
                         const elementPosition = targetElement.getBoundingClientRect().top;
                         const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                         window.scrollTo({
                             top: offsetPosition,
                             behavior: 'smooth'
                         });

                         // Tutup mobile nav jika terbuka setelah klik link internal
                         if(navMobile && navMobile.classList.contains('active')) {
                             navMobile.classList.remove('active');
                             if (menuToggle) menuToggle.classList.remove('open');
                         }
                     }
                 } else if (href === '#home' || (this.classList.contains('logo-container') && href === '#home')) {
                     // Khusus link #home atau logo
                     e.preventDefault();
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                      // Tutup mobile nav jika terbuka setelah klik logo/home
                     if(navMobile && navMobile.classList.contains('active')) {
                         navMobile.classList.remove('active');
                         if (menuToggle) menuToggle.classList.remove('open');
                     }
                 }
                 // Biarkan link eksternal atau ke halaman lain bekerja normal
             });
         });
    }

});