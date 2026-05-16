
// ETHIO RESORT AI - UNIVERSAL JS

// ---------- SAFE HELPERS ----------
function $(id) {
    return document.getElementById(id);
}

function safeText(el, value) {
    if (el) el.innerText = value;
}

function exists(el) {
    return el !== null && el !== undefined;
}

// ---------- GLOBAL STATE ----------
let currentDemand = 'high';

const basePrices = {
    low: 800,
    medium: 1200,
    high: 1800
};

// ===============================
// 📊 PRICING SYSTEM (Pricing Page)
// ===============================
function initPricing() {
    const low = $('lowPrice');
    const medium = $('mediumPrice');
    const high = $('highPrice');
    const suggestion = $('aiSuggestionMsg');

    if (!low ||  !medium || !high) return; // not this page

    function updatePricing() {
        let multiplier = 1;

        if (currentDemand === 'low') multiplier = 0.9;
        else if (currentDemand === 'high') multiplier = 1.2;

        const prices = {
            low: Math.round(basePrices.low * multiplier),
            medium: Math.round(basePrices.medium * multiplier),
            high: Math.round(basePrices.high * multiplier)
        };

        safeText(low, `${prices.low} ETB`);
        safeText(medium, `${prices.medium} ETB`);
        safeText(high, `${prices.high} ETB`);

        if (suggestion) {
            suggestion.innerText =
                currentDemand === 'high'
                    ? "📈 High demand → increase prices"
                    : currentDemand === 'low'
                    ? "📉 Low demand → reduce prices"
                    : "⚖️ Stable pricing";
        }
    }

    // buttons
    document.querySelectorAll('.demand-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentDemand = btn.dataset.demand;
            document.querySelectorAll('.demand-btn')
                .forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updatePricing();
        });
    });

    updatePricing();
}

// ===============================
// 📊 DASHBOARD (Admin Page)
// ===============================
function initDashboard() {
    const occupancy = $('occupancyValue');
    const guests = $('guestsValue');
    const staff = $('staffValue');
    const maintenance = $('maintenanceValue');
    const bars = $('weeklyBars');

    if (!occupancy || !bars) return; // not dashboard page

    function updateKPIs() {
        let occ = 82, gst = 140, stf = 16, mnt = 2;

        if (currentDemand === 'high') {
            occ = 90; gst = 160; stf = 22; mnt = 3;
        } else if (currentDemand === 'low') {
            occ = 60; gst = 90; stf = 12; mnt = 1;
        }

        safeText(occupancy, occ);
        safeText(guests, gst);
        safeText(staff, stf);
        safeText(maintenance, mnt);
    }

    function renderBars() {
        if (!bars) return;

        const data = [60, 80, 100, 90, 120, 150, 130];
        bars.innerHTML = '';

        data.forEach(val => {
            const div = document.createElement('div');
            div.className = 'bar';
            div.style.height = (val / 2) + 'px';
            bars.appendChild(div);
        });
    }

    updateKPIs();
    renderBars();
}

// ===============================
// 🤖 AI CHATBOT (Chat Page)
// ===============================
function initChat() {
    const chat = $('chatMessages');
    const input = $('userInput');
    const btn = $('sendBtn');

    if (!chat || !input ||  !btn) return; // not chat page

    function addMsg(text, isUser = false) {
        const div = document.createElement('div');
        div.className = isUser ? 'user-bubble' : 'ai-bubble';
        div.innerText = text;
        chat.appendChild(div);
        chat.scrollTop = chat.scrollHeight;
    }

    function getReply(msg) {
        msg = msg.toLowerCase();
        if (msg.includes('room')) return "🛏️ Rooms available from 800–1800 ETB";
        if (msg.includes('food')) return "🍽️ Ethiopian & international cuisine";
        if (msg.includes('spa')) return "💆 Spa services available";
        if (msg.includes('coffee')) return "☕ Coffee ceremony daily at 4PM";

        return "Ask about rooms, food, spa, or services!";
    }

    function send() {
        const text = input.value.trim();
        if (!text) return;

        addMsg(text, true);

        setTimeout(() => {
            addMsg(getReply(text));
        }, 300);

        input.value = '';
    }

    btn.addEventListener('click', send);
    input.addEventListener('keypress', e => {
        if (e.key === 'Enter') send();
    });
}

// ===============================
// 📅 BOOKING PAGE
// ===============================
function initBooking() {
    const form = $('bookingForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        alert("✅ Booking submitted successfully!");
    });
}

// ===============================
// 🔐 LOGIN / REGISTER
// ===============================
function initAuth() {
    const loginForm = $('loginForm');
    const registerForm = $('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            alert("Login successful!");
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            alert("Registration successful!");
        });
    }
}

// ===============================
//  NAVIGATION ACTIVE STATE
// ===============================
function initNav() {
    const links = document.querySelectorAll('.nav-item');

    links.forEach(link => {
        link.addEventListener('click', function () {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ===============================
//  INIT ALL
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    initPricing();
    initDashboard();
    initChat();
    initBooking();
    initAuth();
    initNav();
});