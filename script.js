
var translations = {
    "en": {
        "yearProgressText1": "Today is the ",
        "yearProgressText2": " day of the year, and ",
        "yearProgressText3": "% of the year has already passed."
    },
    "zh-Hans": {
        "yearProgressText1": "今天是全年的第",
        "yearProgressText2": "天，今年已经过去",
        "yearProgressText3": "% 了。"
    },
    "fr": {
        "yearProgressText1": "Aujourd'hui est le ",
        "yearProgressText2": "e jour de l'année, et ",
        "yearProgressText3": "% de l'année est déjà passée."
    },
    "es": {
        "yearProgressText1": "Hoy es el ",
        "yearProgressText2": " del año, y ya ha transcurrido el ",
        "yearProgressText3": "% del año."
    },
    "de": {
        "yearProgressText1": "Heute ist der ",
        "yearProgressText2": ". Tag des Jahres, und ",
        "yearProgressText3": "% des Jahres sind bereits vergangen."
    },
    "ru": {
        "yearProgressText1": "Сегодня ",
        "yearProgressText2": " день года, и уже прошло ",
        "yearProgressText3": "% года."
    },
    "ja": {
        "yearProgressText1": "今日は年間の",
        "yearProgressText2": "日目で、年の",
        "yearProgressText3": "%がすでに経過しました。"
    },
    "ko": {
        "yearProgressText1": "오늘은 1년 중 ",
        "yearProgressText2": "번째 날이며, 올해의 ",
        "yearProgressText3": "%가 이미 지났습니다."
    },
    "pt": {
        "yearProgressText1": "Hoje é o ",
        "yearProgressText2": "º dia do ano, e já passaram ",
        "yearProgressText3": "% do ano."
    }
};

function setLanguage(language) {
    var elems = document.querySelectorAll("[data-translate]");
    elems.forEach(function (elem) {
        var key = elem.getAttribute("data-translate");
        elem.innerText = translations[language][key] || "N/A";
    });

    // Update the year progress in the selected language
    updateYearProgress();
}

// Existing function: dayOfYear(), daysInYear(year)

function updateYearProgress() {
    const today = new Date();
    const day = dayOfYear(today);
    document.getElementById("dayOfYear").textContent = day;

    const totalDays = daysInYear(today.getFullYear());
    const progress = (day / totalDays) * 100;
    document.getElementById("yearProgress").textContent = progress.toFixed(2);
}

// Event listener for language selection change
document.getElementById("languageSelector").addEventListener("change", function () {
    var selectedLanguage = this.value;
    setLanguage(selectedLanguage);
});

// Initial setup
document.addEventListener("DOMContentLoaded", function () {
    // Set default language as English
    setLanguage("en");
});

// 年度进度功能
function dayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function daysInYear(year) {
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        return 366; // Leap year
    } else {
        return 365; // Non-leap year
    }
}

const today = new Date();
const day = dayOfYear(today);
document.getElementById("dayOfYear").textContent = day;

const progress = (day / daysInYear(today.getFullYear())) * 100;
document.getElementById("progress").style.width = `${progress}%`;
document.getElementById("yearProgress").textContent = progress.toFixed(2);
document.getElementById("progress").style.background = `linear-gradient(to right, #4caf50, #f44336 ${progress}%, transparent ${progress}%)`;
// Update the position of the runner emoji based on the progress
var runnerEmoji = document.querySelector('.runner-emoji');
runnerEmoji.style.left = (progressPercent - 2) + "%";  // Adjusting by 2% to center the emoji on the progress line

document.getElementById("themeToggle").addEventListener("click", function() {
    var bodyElement = document.body;
    if (bodyElement.classList.contains("dark-mode")) {
        bodyElement.classList.replace("dark-mode", "light-mode");
    } else {
        bodyElement.classList.replace("light-mode", "dark-mode");
    }
});

// Set default theme based on user's preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add("dark-mode");
} else {
    document.body.classList.add("light-mode");
}
