/**
 * PharmaFlora - Core Logic
 */

// 1. Dữ liệu mẫu
const plantData = [
  { id: 1, viName: "Linh chi", latinName: "Ganoderma lucidum", family: "Ganodermataceae", image: "https://images.unsplash.com/photo-1591586121035-7ce3ef9a8244?auto=format&fit=crop&q=80&w=400", desc: "Nấm dược liệu quý." },
  { id: 2, viName: "Đại hồi", latinName: "Illicium verum", family: "Illiciaceae", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400", desc: "Dược liệu chứa tinh dầu." },
  { id: 3, viName: "Quế", latinName: "Cinnamomum cassia", family: "Lauraceae", image: "https://images.unsplash.com/photo-1501004318641-729e8c22bd8e?auto=format&fit=crop&q=80&w=400", desc: "Vỏ thân dùng làm thuốc." },
  { id: 4, viName: "Sen", latinName: "Nelumbo nucifera", family: "Nelumbonaceae", image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc quý vùng sông nước." },
  { id: 5, viName: "Bình vôi", latinName: "Stephania glabra", family: "Menispermaceae", image: "https://images.unsplash.com/photo-1611003228941-98a52e6dc4b5?auto=format&fit=crop&q=80&w=400", desc: "Thân rễ phình thành củ." },
  { id: 6, viName: "Hoàng liên", latinName: "Coptis chinensis", family: "Ranunculaceae", image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc thanh nhiệt." },
  { id: 7, viName: "Ô đầu", latinName: "Aconitum carmichaelii", family: "Ranunculaceae", image: "https://images.unsplash.com/photo-1596708051113-14923f6634c4?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc có độc tính mạnh nếu không chế biến." },
  { id: 8, viName: "Ngưu tất", latinName: "Achyranthes bidentata", family: "Amaranthaceae", image: "https://images.unsplash.com/photo-1501004318641-729e8c22bd8e?auto=format&fit=crop&q=80&w=400", desc: "Rễ cây dùng làm thuốc." },
  { id: 9, viName: "Hà thủ ô đỏ", latinName: "Fallopia multiflora", family: "Polygonaceae", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400", desc: "Củ dùng làm thuốc bổ." },
  { id: 10, viName: "Đỗ trọng", latinName: "Eucommia ulmoides", family: "Eucommiaceae", image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=400", desc: "Vỏ cây chứa nhựa mủ." },
  { id: 11, viName: "Dâu tằm", latinName: "Morus alba", family: "Moraceae", image: "https://images.unsplash.com/photo-1611003228941-98a52e6dc4b5?auto=format&fit=crop&q=80&w=400", desc: "Toàn bộ cây đều dùng làm thuốc." },
  { id: 12, viName: "Gai", latinName: "Boehmeria nivea", family: "Urticaceae", image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=400", desc: "Rễ dùng làm thuốc an thai." },
  { id: 13, viName: "Khổ sâm", latinName: "Croton tonkinensis", family: "Euphorbiaceae", image: "https://images.unsplash.com/photo-1596708051113-14923f6634c4?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc nam phổ biến." },
  { id: 14, viName: "Chó đẻ răng cưa", latinName: "Phyllanthus urinaria", family: "Euphorbiaceae", image: "https://images.unsplash.com/photo-1501004318641-729e8c22bd8e?auto=format&fit=crop&q=80&w=400", desc: "Dùng để chữa các bệnh về gan." },
  { id: 15, viName: "Tràm", latinName: "Melaleuca cajuputi", family: "Myrtaceae", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400", desc: "Lá chứa nhiều tinh dầu tràm." },
  { id: 16, viName: "Kim tiền thảo", latinName: "Desmodium styracifolium", family: "Fabaceae", image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=400", desc: "Dùng chữa sỏi thận." },
  { id: 17, viName: "Hòe", latinName: "Styphnolobium japonicum", family: "Fabaceae", image: "https://images.unsplash.com/photo-1611003228941-98a52e6dc4b5?auto=format&fit=crop&q=80&w=400", desc: "Nụ hoa dùng làm thuốc." },
  { id: 18, viName: "Sắn dây", latinName: "Pueraria thomsonii", family: "Fabaceae", image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=400", desc: "Củ dùng làm bột và thuốc thanh nhiệt." },
  { id: 19, viName: "Hoàng bá", latinName: "Phellodendron chinense", family: "Rutaceae", image: "https://images.unsplash.com/photo-1596708051113-14923f6634c4?auto=format&fit=crop&q=80&w=400", desc: "Vỏ thân dùng làm thuốc." },
  { id: 20, viName: "Lạc tiên", latinName: "Passiflora foetida", family: "Passifloraceae", image: "https://images.unsplash.com/photo-1501004318641-729e8c22bd8e?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc an thần." },
  { id: 21, viName: "Sâm Ngọc Linh", latinName: "Panax vietnamensis", family: "Araliaceae", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400", desc: "Quốc bảo của Việt Nam." },
  { id: 22, viName: "Đinh lăng", latinName: "Polyscias fruticosa", family: "Araliaceae", image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=400", desc: "Được coi là sâm của người nghèo." },
  { id: 23, viName: "Tam thất", latinName: "Panax notoginseng", family: "Araliaceae", image: "https://images.unsplash.com/photo-1611003228941-98a52e6dc4b5?auto=format&fit=crop&q=80&w=400", desc: "Củ quý dùng làm thuốc bổ huyết." },
  { id: 24, viName: "Đương quy", latinName: "Angelica sinensis", family: "Apiaceae", image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=400", desc: "Vị thuốc bổ huyết hàng đầu." },
  { id: 25, viName: "Bạch chỉ", latinName: "Angelica dahurica", family: "Apiaceae", image: "https://images.unsplash.com/photo-1596708051113-14923f6634c4?auto=format&fit=crop&q=80&w=400", desc: "Rễ có mùi thơm đặc trưng." },
  { id: 26, viName: "Rau má", latinName: "Centella asiatica", family: "Apiaceae", image: "https://images.unsplash.com/photo-1501004318641-729e8c22bd8e?auto=format&fit=crop&q=80&w=400", desc: "Rau và thuốc thanh nhiệt." },
  { id: 27, viName: "Kim ngân", latinName: "Lonicera japonica", family: "Caprifoliaceae", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400", desc: "Hoa dùng làm thuốc kháng sinh thực vật." },
  { id: 28, viName: "Tục đoạn", latinName: "Dipsacus japonicus", family: "Dipsacaceae", image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc bổ gan thận." },
  { id: 29, viName: "Dành dành", latinName: "Gardenia jasminoides", family: "Rubiaceae", image: "https://images.unsplash.com/photo-1611003228941-98a52e6dc4b5?auto=format&fit=crop&q=80&w=400", desc: "Quả dùng để nhuộm màu và làm thuốc." },
  { id: 30, viName: "Ba kích", latinName: "Morinda officinalis", family: "Rubiaceae", image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=400", desc: "Rễ dùng ngâm rượu bổ dương." },
  { id: 31, viName: "Mã tiền", latinName: "Strychnos nux-vomica", family: "Loganiaceae", image: "https://images.unsplash.com/photo-1596708051113-14923f6634c4?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc có độc tính rất cao (Strychnin)." },
  { id: 32, viName: "Dừa cạn", latinName: "Catharanthus roseus", family: "Apocynaceae", image: "https://images.unsplash.com/photo-1501004318641-729e8c22bd8e?auto=format&fit=crop&q=80&w=400", desc: "Dùng để chiết xuất thuốc chống ung thư." },
  { id: 33, viName: "Cà gai leo", latinName: "Solanum procumbens", family: "Solanaceae", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc giải độc gan rất tốt." },
  { id: 34, viName: "Cà độc dược", latinName: "Datura metel", family: "Solanaceae", image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc chứa alcaloid gây độc." },
  { id: 35, viName: "Nhân trần", latinName: "Adenosma caeruleum", family: "Scrophulariaceae", image: "https://images.unsplash.com/photo-1611003228941-98a52e6dc4b5?auto=format&fit=crop&q=80&w=400", desc: "Dùng để pha nước uống thanh nhiệt." },
  { id: 36, viName: "Địa hoàng", latinName: "Rehmannia glutinosa", family: "Scrophulariaceae", image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=400", desc: "Thân rễ dùng làm thuốc (Sinh địa/Thục địa)." },
  { id: 37, viName: "Mã đề", latinName: "Plantago major", family: "Plantaginaceae", image: "https://images.unsplash.com/photo-1596708051113-14923f6634c4?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc lợi tiểu." },
  { id: 38, viName: "Xuyên tâm liên", latinName: "Andrographis paniculata", family: "Acanthaceae", image: "https://images.unsplash.com/photo-1501004318641-729e8c22bd8e?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc kháng sinh thực vật." },
  { id: 39, viName: "Bạch đồng nữ", latinName: "Clerodendrum chinense var. simplex", family: "Verbenaceae", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc dùng trong sản khoa và viêm nhiễm." },
  { id: 40, viName: "Ích mẫu", latinName: "Leonurus japonicus", family: "Lamiaceae", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc cho phụ nữ." },
  { id: 41, viName: "Bạc hà", latinName: "Mentha arvensis", family: "Lamiaceae", image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc chứa tinh dầu bạc hà." },
  { id: 42, viName: "Hương nhu trắng", latinName: "Ocimum gratissimum", family: "Lamiaceae", image: "https://images.unsplash.com/photo-1611003228941-98a52e6dc4b5?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc chứa tinh dầu hương nhu." },
  { id: 43, viName: "Đảng sâm", latinName: "Codonopsis javanica", family: "Campanulaceae", image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=400", desc: "Sâm của người nghèo vùng núi." },
  { id: 44, viName: "Cát cánh", latinName: "Platycodon grandiflorus", family: "Campanulaceae", image: "https://images.unsplash.com/photo-1596708051113-14923f6634c4?auto=format&fit=crop&q=80&w=400", desc: "Hoa hình chuông rất đẹp." },
  { id: 45, viName: "Ngải cứu", latinName: "Artemisia vulgaris", family: "Asteraceae", image: "https://images.unsplash.com/photo-1501004318641-729e8c22bd8e?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc và rau ăn phổ biến." },
  { id: 46, viName: "Cúc hoa vàng", latinName: "Chrysanthemum indicum", family: "Asteraceae", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400", desc: "Hoa dùng làm trà và thuốc." },
  { id: 47, viName: "Actisô", latinName: "Cynara scolymus", family: "Asteraceae", image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc bổ gan từ vùng ôn đới." },
  { id: 48, viName: "Cỏ nhọ nồi", latinName: "Eclipta prostrata", family: "Asteraceae", image: "https://images.unsplash.com/photo-1611003228941-98a52e6dc4b5?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc cầm máu." },
  { id: 49, viName: "Sài đất", latinName: "Wedelia chinensis", family: "Asteraceae", image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc tiêu viêm." },
  { id: 50, viName: "Xạ can", latinName: "Belamcanda chinensis", family: "Iridaceae", image: "https://images.unsplash.com/photo-1596708051113-14923f6634c4?auto=format&fit=crop&q=80&w=400", desc: "Dùng để chữa viêm họng." },
  { id: 51, viName: "Trinh nữ hoàng cung", latinName: "Crinum latifolium", family: "Amaryllidaceae", image: "https://images.unsplash.com/photo-1501004318641-729e8c22bd8e?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc quý dành cho phụ nữ." },
  { id: 52, viName: "Thiên môn đông", latinName: "Asparagus cochinchinensis", family: "Asparagaceae", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400", desc: "Rễ dùng làm thuốc bổ phổi." },
  { id: 53, viName: "Hoài sơn", latinName: "Dioscorea persimilis", family: "Dioscoreaceae", image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=400", desc: "Củ dùng làm thuốc bổ tỳ." },
  { id: 54, viName: "Bách bộ", latinName: "Stemona tuberosa", family: "Stemonaceae", image: "https://images.unsplash.com/photo-1611003228941-98a52e6dc4b5?auto=format&fit=crop&q=80&w=400", desc: "Rễ dùng chữa ho và diệt côn trùng." },
  { id: 55, viName: "Sa nhân", latinName: "Amomum villosum", family: "Zingiberaceae", image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=400", desc: "Quả dùng làm thuốc gia vị và chữa tiêu hóa." },
  { id: 56, viName: "Nghệ vàng", latinName: "Curcuma longa", family: "Zingiberaceae", image: "https://images.unsplash.com/photo-1596708051113-14923f6634c4?auto=format&fit=crop&q=80&w=400", desc: "Củ thuốc vàng dùng trong y học và ẩm thực." },
  { id: 57, viName: "Gừng", latinName: "Zingiber officinale", family: "Zingiberaceae", image: "https://images.unsplash.com/photo-1501004318641-729e8c22bd8e?auto=format&fit=crop&q=80&w=400", desc: "Củ dùng làm gia vị và thuốc giải cảm." },
  { id: 58, viName: "Hương phụ", latinName: "Cyperus rotundus", family: "Cyperaceae", image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400", desc: "Củ gấu dùng làm thuốc điều kinh." },
  { id: 59, viName: "Ý dĩ", latinName: "Coix lacryma-jobi var. ma-yuen", family: "Poaceae", image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=400", desc: "Hạt dùng làm thuốc bổ tỳ và lợi tiểu." },
  { id: 60, viName: "Thiên niên kiện", latinName: "Homalomena occulta", family: "Araceae", image: "https://images.unsplash.com/photo-1611003228941-98a52e6dc4b5?auto=format&fit=crop&q=80&w=400", desc: "Cây thuốc bổ xương khớp lâu đời." }
];

// 2. State Management
let currentView = 'dashboard';
let learnedPlants = JSON.parse(localStorage.getItem('learnedPlants')) || [];
let currentFlashcardIndex = 0;
let currentQuizType = '';
let currentQuizMode = 'choice';
let currentQuestion = null;
let quizScore = 0;
let quizHistory = [];

// 3. Selectors
const mainView = document.getElementById('main-view');
const navLinks = document.querySelectorAll('.nav-links li');
const progressFill = document.querySelector('.progress-fill');
const progressText = document.getElementById('progress-text');
const viewTitle = document.getElementById('view-title');
const viewDesc = document.getElementById('view-desc');

// 4. Initialization
function init() {
    setupNavigation();
    updateProgress();
    renderDashboard();
}

// 5. Navigation Logic
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const view = link.getAttribute('data-view');
            switchView(view);
        });
    });
}

function switchView(view) {
    currentView = view;
    navLinks.forEach(l => l.classList.remove('active'));
    const activeLink = document.querySelector(`[data-view="${view}"]`);
    if (activeLink) activeLink.classList.add('active');

    switch (view) {
        case 'dashboard': renderDashboard(); break;
        case 'flashcards': renderFlashcards(); break;
        case 'quiz': renderQuizMenu(); break;
        case 'search': renderSearch(); break;
    }
}

// 6. View Rendering
function renderDashboard() {
    viewTitle.innerText = "Chào buổi sáng!";
    viewDesc.innerText = "Hãy bắt đầu hành trình chinh phục 60 loài cây dược liệu nào.";

    mainView.innerHTML = `
        <div class="dashboard-grid">
            <div class="stat-card">
                <h3>Thống kê</h3>
                <p style="font-size: 2rem; font-weight: 700; color: var(--primary); margin: 1rem 0;">
                    ${learnedPlants.length} / ${plantData.length}
                </p>
                <p style="color: var(--text-muted)">Cây đã thuộc</p>
            </div>
            <div class="stat-card" style="background: var(--primary); color: white; cursor: pointer" onclick="switchView('flashcards')">
                <h3 style="color: white">Tiếp tục học</h3>
                <p style="margin: 1rem 0; opacity: 0.9">Vào ngay chế độ Flashcards để ôn tập kiến thức.</p>
                <i data-lucide="arrow-right"></i>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function renderFlashcards() {
    viewTitle.innerText = "Học qua Flashcards";
    viewDesc.innerText = "Nhấn vào thẻ để lật xem tên khoa học và thông tin chi tiết.";

    const plant = plantData[currentFlashcardIndex];
    const isLearned = learnedPlants.includes(plant.id);

    mainView.innerHTML = `
        <div class="flashcard-container">
            <div class="flashcard" id="main-flashcard">
                <div class="card-face front">
                    <img src="${plant.image}" alt="${plant.viName}" class="card-img">
                    <h2 class="card-vi">${plant.viName}</h2>
                    <p style="color: var(--text-muted); margin-top: 10px;">(Nhấn để lật)</p>
                    ${isLearned ? '<span style="position: absolute; top: 20px; right: 20px; background: #c8e6c9; color: #1b5e20; padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">ĐÃ THUỘC ✨</span>' : ''}
                </div>
                <div class="card-face back">
                    <h2 class="card-latin">${plant.latinName}</h2>
                    <p class="card-vi">${plant.viName}</p>
                    <p class="card-family">${plant.family}</p>
                    <p style="margin-top: 20px; font-style: italic; color: var(--text-muted)">${plant.desc}</p>
                </div>
            </div>
            
            <div class="controls" style="display: flex; gap: 1rem;">
                <button class="option-btn" onclick="prevCard()"><i data-lucide="chevron-left"></i> Trước</button>
                <button class="option-btn" onclick="toggleLearned(${plant.id})" 
                    style="background: ${isLearned ? '#ffb74d' : 'var(--primary)'}; color: white; min-width: 140px;">
                    ${isLearned ? '<i data-lucide="rotate-ccw"></i> Học lại' : '<i data-lucide="check"></i> Đã thuộc'}
                </button>
                <button class="option-btn" onclick="nextCard()">Tiếp <i data-lucide="chevron-right"></i></button>
            </div>
        </div>
    `;

    document.getElementById('main-flashcard').addEventListener('click', function () {
        this.classList.toggle('is-flipped');
    });
    lucide.createIcons();
}

function toggleLearned(id) {
    if (learnedPlants.includes(id)) {
        learnedPlants = learnedPlants.filter(item => item !== id);
    } else {
        learnedPlants.push(id);
    }
    localStorage.setItem('learnedPlants', JSON.stringify(learnedPlants));
    updateProgress();
    renderFlashcards();
}

// 7. Quiz Logic
function renderQuizMenu() {
    viewTitle.innerText = "Chế độ Kiểm tra";
    viewDesc.innerText = "Chọn loại câu hỏi và chế độ làm bài phía dưới.";
    quizHistory = [];
    
    mainView.innerHTML = `
        <div style="margin-bottom: 2rem; background: var(--secondary); padding: 1rem; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 2rem;">
            <span style="font-weight: 700; color: var(--primary)">CHẾ ĐỘ LÀM BÀI:</span>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer">
                <input type="radio" name="quiz-mode" value="choice" ${currentQuizMode === 'choice' ? 'checked' : ''} onchange="currentQuizMode = this.value"> Trắc nghiệm
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer">
                <input type="radio" name="quiz-mode" value="fill" ${currentQuizMode === 'fill' ? 'checked' : ''} onchange="currentQuizMode = this.value"> Tự luận (Điền từ)
            </label>
        </div>

        <div class="dashboard-grid">
            <div class="stat-card" onclick="startQuiz('latin-vi')">
                <h3>Latin ➔ Việt</h3>
                <p style="margin-top: 10px; color: var(--text-muted)">Cho tên khoa học, chọn/điền tên tiếng Việt.</p>
            </div>
            <div class="stat-card" onclick="startQuiz('vi-latin')">
                <h3>Việt ➔ Latin</h3>
                <p style="margin-top: 10px; color: var(--text-muted)">Cho tên tiếng Việt, chọn/điền tên khoa học.</p>
            </div>
            <div class="stat-card" onclick="startQuiz('family')">
                <h3>Thử thách Họ</h3>
                <p style="margin-top: 10px; color: var(--text-muted)">Xác định họ thực vật của dược liệu.</p>
            </div>
            <div class="stat-card" onclick="startQuiz('mixed')" style="border: 2px solid var(--primary)">
                <h3 style="color: var(--primary)">🔥 Chế độ Mix</h3>
                <p style="margin-top: 10px; color: var(--text-muted)">Trộn ngẫu nhiên các loại câu hỏi.</p>
            </div>
        </div>
    `;
}

function startQuiz(type) {
    currentQuizType = type;
    quizScore = 0;
    quizHistory = [];
    viewTitle.innerText = "Đang kiểm tra...";
    viewDesc.innerText = "Hãy trả lời câu hỏi bên dưới.";
    nextQuestion();
}

let isProcessing = false; // Biến khóa để ngăn chặn duplicate

function nextQuestion() {
    isProcessing = false; // Reset khóa khi sang câu mới
    const randomPlant = plantData[Math.floor(Math.random() * plantData.length)];
    currentQuestion = randomPlant;
    let questionText = '';
    let questionLabel = '';

    let activeType = currentQuizType;
    if (currentQuizType === 'mixed') {
        const types = ['latin-vi', 'vi-latin', 'family'];
        activeType = types[Math.floor(Math.random() * types.length)];
    }

    if (activeType === 'latin-vi') {
        questionText = `Tên tiếng Việt của dược liệu <br><span style="font-style: italic; font-family: 'Playfair Display', serif; font-size: 2.2rem; color: var(--primary); display: block; margin: 10px 0;">${randomPlant.latinName}</span> là gì?`;
        questionLabel = `Tên tiếng Việt của ${randomPlant.latinName}`;
    } else if (activeType === 'vi-latin') {
        questionText = `Tên khoa học của dược liệu <br><span style="font-weight: 700; font-size: 2.2rem; color: var(--text-dark); display: block; margin: 10px 0;">${randomPlant.viName}</span> là gì?`;
        questionLabel = `Tên khoa học của ${randomPlant.viName}`;
    } else if (activeType === 'family') {
        questionText = `Dược liệu <span style="font-weight: 700; color: var(--primary)">${randomPlant.viName}</span> <br>thuộc <span style="text-decoration: underline; color: var(--primary-light)">Họ thực vật</span> nào?`;
        questionLabel = `Họ thực vật của ${randomPlant.viName}`;
    }

    let quizHTML = '';
    if (currentQuizMode === 'choice') {
        let options = [randomPlant];
        while (options.length < 4) {
            const p = plantData[Math.floor(Math.random() * plantData.length)];
            if (!options.find(opt => opt.id === p.id)) options.push(p);
        }
        options.sort(() => Math.random() - 0.5);
        quizHTML = `
            <div class="quiz-options">
                ${options.map(opt => {
                    let label = activeType === 'latin-vi' ? opt.viName : (activeType === 'vi-latin' ? opt.latinName : opt.family);
                    return `<button class="option-btn" onclick="checkAnswer(this, ${opt.id}, '${label}')">${label}</button>`;
                }).join('')}
            </div>
        `;
    } else {
        quizHTML = `
            <div style="margin-bottom: 2rem;">
                <input type="text" id="quiz-input" placeholder="Nhập câu trả lời..." 
                    style="width: 100%; max-width: 400px; padding: 1.2rem; border-radius: 12px; border: 2px solid var(--secondary); font-size: 1.1rem; text-align: center;">
            </div>
            <button id="submit-quiz" class="next-quiz-btn" style="display: inline-flex; margin-top: 0;" onclick="checkAnswer(this)">Kiểm tra đáp án</button>
        `;
    }

    mainView.innerHTML = `
        <div class="quiz-container" style="text-align: center; position: relative;">
            <button onclick="showQuizSummary()" style="position: absolute; top: -10px; right: -10px; background: #ffebee; color: #c62828; border: none; padding: 8px 15px; border-radius: 8px; cursor: pointer; font-weight: 700;">Kết thúc</button>
            <h2 style="margin-bottom: 2rem; line-height: 1.4" data-label="${questionLabel}">${questionText}</h2>
            ${quizHTML}
            <div id="quiz-feedback" style="margin-top: 2rem; font-weight: 700; min-height: 1.5rem"></div>
            <button id="next-btn" class="next-quiz-btn" onclick="nextQuestion()">Câu tiếp theo <i data-lucide="arrow-right"></i></button>
        </div>
    `;

    document.removeEventListener('keydown', window._quizEnterHandler);
    window._quizEnterHandler = (e) => {
        if (e.key === 'Enter') {
            const nextBtn = document.getElementById('next-btn');
            const submitBtn = document.getElementById('submit-quiz');
            if (nextBtn && nextBtn.style.display === 'flex') {
                nextQuestion();
            } else if (currentQuizMode === 'fill' && !isProcessing) {
                if (submitBtn && submitBtn.style.display !== 'none') checkAnswer(submitBtn);
            }
        }
    };
    document.addEventListener('keydown', window._quizEnterHandler);

    if (currentQuizMode === 'fill') {
        document.getElementById('quiz-input').focus();
    }
    lucide.createIcons();
}

function checkAnswer(btn, selectedId = null, selectedLabel = null) {
    if (isProcessing) return; // Nếu đang xử lý thì chặn mọi thao tác tiếp theo
    isProcessing = true; // Khóa ngay lập tức

    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-btn');
    const qHeader = document.querySelector('.quiz-container h2');
    const qLabel = qHeader.getAttribute('data-label');
    
    let isCorrect = false;
    let correctAnswer = '';
    let userAnswer = '';
    
    if (qLabel.includes('tiếng Việt')) correctAnswer = currentQuestion.viName;
    else if (qLabel.includes('khoa học')) correctAnswer = currentQuestion.latinName;
    else correctAnswer = currentQuestion.family;

    if (currentQuizMode === 'choice') {
        const allBtns = document.querySelectorAll('.option-btn');
        allBtns.forEach(b => b.style.pointerEvents = 'none');
        userAnswer = selectedLabel;
        if (selectedId === currentQuestion.id) {
            btn.classList.add('correct');
            isCorrect = true;
        } else {
            btn.classList.add('wrong');
            allBtns.forEach(b => { if(b.innerText === correctAnswer) b.classList.add('correct'); });
        }
    } else {
        const input = document.getElementById('quiz-input');
        userAnswer = input.value.trim();
        input.disabled = true;
        if (btn) btn.style.display = 'none';
        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            isCorrect = true;
            input.style.borderColor = "#4caf50";
        } else {
            input.style.borderColor = "#f44336";
        }
    }

    quizHistory.push({
        question: qLabel,
        userAnswer: userAnswer || "(Bỏ trống)",
        correctAnswer: correctAnswer,
        isCorrect: isCorrect
    });

    if (isCorrect) {
        feedback.innerText = "Chính xác! ✨";
        feedback.style.color = "#4caf50";
        quizScore++;
    } else {
        feedback.innerHTML = `Sai rồi. Đáp án đúng là: <br><span style="color: var(--primary); font-size: 1.2rem;">${correctAnswer}</span>`;
        feedback.style.color = "#f44336";
    }
    nextBtn.style.display = 'flex';
}

function showQuizSummary() {
    viewTitle.innerText = "Kết quả bài tập";
    viewDesc.innerText = `Hoàn thành ${quizHistory.length} câu.`;
    if (quizHistory.length === 0) { renderQuizMenu(); return; }
    const accuracy = Math.round((quizScore / quizHistory.length) * 100);
    mainView.innerHTML = `
        <div class="quiz-container" style="max-width: 900px;">
            <div style="text-align: center; margin-bottom: 2rem; padding: 2rem; background: var(--secondary); border-radius: 16px;">
                <h2 style="font-size: 3rem; color: var(--primary)">${accuracy}%</h2>
                <p style="font-weight: 700; color: var(--text-muted)">Độ chính xác (${quizScore}/${quizHistory.length} câu)</p>
            </div>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--secondary)">
                            <th style="padding: 1rem;">Câu hỏi</th>
                            <th style="padding: 1rem;">Bạn trả lời</th>
                            <th style="padding: 1rem;">Đáp án đúng</th>
                            <th style="padding: 1rem; text-align: center;">Kết quả</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${quizHistory.map(item => `
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 1rem; font-size: 0.9rem;">${item.question}</td>
                                <td style="padding: 1rem; color: ${item.isCorrect ? '#4caf50' : '#f44336'}; font-weight: 600;">${item.userAnswer}</td>
                                <td style="padding: 1rem; font-weight: 600; color: var(--primary)">${item.isCorrect ? '-' : item.correctAnswer}</td>
                                <td style="padding: 1rem; text-align: center;">${item.isCorrect ? '✅' : '❌'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <button class="next-quiz-btn" style="display: flex; margin-top: 3rem;" onclick="renderQuizMenu()">Quay lại Menu</button>
        </div>
    `;
}

// 8. Search Logic
function renderSearch() {
    viewTitle.innerText = "Tra cứu dược liệu";
    viewDesc.innerText = "Tìm kiếm nhanh và xem chi tiết.";
    mainView.innerHTML = `
        <div style="margin-bottom: 2rem;">
            <input type="text" id="search-input" placeholder="Nhập tên cây..." 
                style="width: 100%; padding: 1.2rem; border-radius: 12px; border: 2px solid var(--secondary); font-size: 1.1rem;">
        </div>
        <div id="search-results" class="dashboard-grid">${renderPlantCards(plantData)}</div>
    `;
    document.getElementById('search-input').addEventListener('input', e => {
        const term = e.target.value.toLowerCase();
        const filtered = plantData.filter(p => p.viName.toLowerCase().includes(term) || p.latinName.toLowerCase().includes(term));
        document.getElementById('search-results').innerHTML = renderPlantCards(filtered);
    });
}

function renderPlantCards(data) {
    if (data.length === 0) return "<p>Không tìm thấy kết quả nào.</p>";
    return data.map(p => `
        <div class="stat-card" style="display: flex; gap: 1rem; align-items: center; cursor: pointer" onclick="showPlantDetail(${p.id})">
            <img src="${p.image}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
            <div><h4 style="margin: 0">${p.viName}</h4></div>
        </div>
    `).join('');
}

// 9. Modal Logic
function showPlantDetail(id) {
    const plant = plantData.find(p => p.id === id);
    const modal = document.getElementById('plant-modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <img src="${plant.image}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 16px; margin-bottom: 2rem;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--primary)">${plant.viName}</h2>
        <p style="font-style: italic; font-size: 1.2rem; margin: 0.5rem 0;">${plant.latinName}</p>
        <p style="color: var(--primary); font-weight: 700; margin-bottom: 1.5rem;">${plant.family}</p>
        <div style="background: var(--secondary); padding: 1.5rem; border-radius: 12px;">
            <p style="line-height: 1.6; color: var(--text-muted)">${plant.desc}</p>
        </div>
    `;
    modal.style.display = 'flex';
}

function closeModal() { document.getElementById('plant-modal').style.display = 'none'; }
window.onclick = e => { if (e.target == document.getElementById('plant-modal')) closeModal(); };

// 10. Utilities
function updateProgress() {
    const percentage = (learnedPlants.length / plantData.length) * 100;
    progressFill.style.width = `${percentage}%`;
    progressText.innerText = `${learnedPlants.length}/${plantData.length} cây`;
}
function nextCard() { currentFlashcardIndex = (currentFlashcardIndex + 1) % plantData.length; renderFlashcards(); }
function prevCard() { currentFlashcardIndex = (currentFlashcardIndex - 1 + plantData.length) % plantData.length; renderFlashcards(); }

init();
