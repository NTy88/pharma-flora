/**
 * PharmaFlora - Core Logic
 */

// 1. Dữ liệu mẫu
const plantData = [
    {
        id: 1,
        viName: "Đinh lăng",
        latinName: "Polyscias fruticosa",
        family: "Araliaceae (Họ Ngũ gia bì)",
        image: "https://images.unsplash.com/photo-1596708051113-14923f6634c4?auto=format&fit=crop&q=80&w=400",
        desc: "Bổ khí, giải độc, lợi tiểu."
    },
    {
        id: 2,
        viName: "Hà thủ ô đỏ",
        latinName: "Fallopia multiflora",
        family: "Polygonaceae (Họ Rau răm)",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?auto=format&fit=crop&q=80&w=400",
        desc: "Bổ huyết, làm đen râu tóc."
    },
    {
        id: 3,
        viName: "Ích mẫu",
        latinName: "Leonurus japonicus",
        family: "Lamiaceae (Họ Hoa môi)",
        image: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&q=80&w=400",
        desc: "Hoạt huyết, điều kinh."
    },
    {
        id: 4,
        viName: "Kim ngân hoa",
        latinName: "Lonicera japonica",
        family: "Caprifoliaceae (Họ Kim ngân)",
        image: "https://images.unsplash.com/photo-1611003228941-98a52e6dc4b5?auto=format&fit=crop&q=80&w=400",
        desc: "Thanh nhiệt, giải độc."
    },
    {
        id: 5,
        viName: "Bạc hà",
        latinName: "Mentha arvensis",
        family: "Lamiaceae (Họ Hoa môi)",
        image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=400",
        desc: "Tán phong nhiệt, giải độc."
    }
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

function nextQuestion() {
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

    if (currentQuizMode === 'fill') {
        const input = document.getElementById('quiz-input');
        input.focus();
    }

    // Lắng nghe phím Enter toàn cục khi đang ở trong Quiz
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            const nextBtn = document.getElementById('next-btn');
            const submitBtn = document.getElementById('submit-quiz');

            if (currentQuizMode === 'fill') {
                if (nextBtn && nextBtn.style.display === 'flex') {
                    // Nếu đang hiện nút "Câu tiếp theo" -> Nhấn Enter để chuyển câu
                    document.removeEventListener('keydown', handleEnter);
                    nextQuestion();
                } else if (submitBtn && submitBtn.style.display !== 'none') {
                    // Nếu đang hiện nút "Kiểm tra" -> Nhấn Enter để nộp bài
                    checkAnswer(submitBtn);
                }
            }
        }
    };
    // Xóa sự kiện cũ nếu có trước khi thêm mới để tránh trùng lặp
    document.removeEventListener('keydown', window._quizEnterHandler);
    window._quizEnterHandler = handleEnter;
    document.addEventListener('keydown', window._quizEnterHandler);
    
    lucide.createIcons();
}

function checkAnswer(btn, selectedId = null, selectedLabel = null) {
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
        if (input.disabled) return;
        userAnswer = input.value.trim();
        input.disabled = true;
        btn.style.display = 'none';
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
