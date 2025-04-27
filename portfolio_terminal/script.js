const input = document.getElementById('input');
const output = document.getElementById('output');
const terminal = document.querySelector('.terminal');

// Commands (hardcoded)
const commands = {
    help: "Available commands: about, skills, projects, contact, resume, clear",
    about: ">> Hi I am Seth Opiyo Odero 👋.\n\n>> A passionate data science student with a strong foundation in statistics, machine learning, and data visualization seeking internship or entry-level role where I can apply my analytic skills and contribute to solving complex problems using data. \n\n>> A highly motivated and detail-oriented machine learning student at Kisii University with strong skills in data manipulation, data visualization, and web scraping.\n\n>> Seeking an internship or entry-level position to apply my knowledge and skills in a practical environment.",
    skills: ">> Data Manipulation: \n✅Proficient in using Pandas for cleaning, transforming, and analyzing data.\n>> Data Visualization:\n✅Experienced in creating insightful visualizations using matplotlib and seaborn plotting capabilities.\n>> Web Scraping:\n✅Skilled in using BeautifulSoup for extracting data from websites.\n>> Programming Languages:\n✅Python, SQL, \n>>Tools and Libraries:\n✅Jupyter Notebook, NumPy, Matplotlib, Seaborn, pycharm, streamlit",
    projects:`Check out my projects <a href="https://github.com/yourgithubusername" target="_blank" style="color: #7aa2f7; text-decoration: underline;">here</a>.`,
    contact:`📧 Email me at <a href="mailto:velagasseth@gmail.com" target="_blank" style="color: #7aa2f7; text-decoration: underline;">velagasseth@gmail.com</a>\n📞Tel.+254759812041\n `,
    resume: "Downloading resume...",
    clear: function() {
        // Refresh the page to clear everything
        window.location.reload();
    }
};

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const userInput = input.value.trim().toLowerCase();
        if (!userInput) return;

        output.innerHTML += `<div><span class="prompt">seth@portfolio:~$</span> ${userInput}</div>`;

        if (commands[userInput] !== undefined) {
            if (userInput === "clear") {
                commands.clear(); // Trigger the page reload (clear everything)
            } else if (userInput === "resume") {
                typeText(commands[userInput]);
                setTimeout(() => {
                    downloadResume();
                }, 1000); // delay before downloading
            } else {
                typeText(commands[userInput]);
            }
        } else {
            typeText(`Unknown command: ${userInput}\nType 'help' for available commands.`);
        }

        input.value = "";
        terminal.scrollTop = terminal.scrollHeight;
    }
});

// Typing effect
function typeText(text) {
    let i = 0;
    const div = document.createElement('div');
    output.appendChild(div);

    let isTag = false;
    let currentTag = '';

    function typing() {
        if (i < text.length) {
            const char = text.charAt(i);

            if (char === '<') {
                isTag = true;
            }

            if (isTag) {
                currentTag += char;
                if (char === '>') {
                    div.innerHTML += currentTag;
                    isTag = false;
                    currentTag = '';
                }
            } else {
                div.innerHTML += char;
            }

            i++;
            setTimeout(typing, 20);
        }
    }
    typing();
}

// Resume Download Function
function downloadResume() {
    const link = document.createElement('a');
    link.href = "Seth's_Resume  (5).pdf"; // make sure you place a file called resume.pdf in the same folder
    link.download = 'Seth_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}