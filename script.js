
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const terminalBody = document.querySelector('.terminal-body');
    
    // Command definitions
    const commands = {
        help: {
            description: "Show available commands",
            execute: () => printHelp()
        },
        about: {
            description: "About me",
            execute: () => printAbout()
        },
        skills: {
            description: "My technical skills",
            execute: () => printSkills()
        },
        experience: {
            description: "My professional experience",
            execute: () => printExperience()
        },

        resume: {
            description: "Download my resume (PDF)",
            execute: () => downloadResume()
        },
        projects: {
            description: "My notable projects",
            execute: () => printProjects()
        },
        contact: {
            description: "Contact information",
            execute: () => printContact()
        },
        clear: {
            description: "Clear the terminal",
            execute: () => clearTerminal()
        },
        theme: {
            description: "Change terminal theme [light/dark]",
            execute: (args) => changeTheme(args)
        }
    };
    
    // Command history
    let commandHistory = [];
    let historyIndex = -1;
    
    // Initial welcome message
    printToTerminal("Type 'help' to see available commands", "info");
    
    // Focus input on terminal click
    terminalBody.addEventListener('click', () => {
        input.focus();
    });
    
    // Handle input
    input.addEventListener('keydown', (e) => {
        // Handle command history navigation
        if (e.key === 'ArrowUp' && commandHistory.length > 0) {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
            } else if (historyIndex === -1) {
                historyIndex = 0;
            }
            input.value = commandHistory[commandHistory.length - 1 - historyIndex];
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[commandHistory.length - 1 - historyIndex];
            } else {
                historyIndex = -1;
                input.value = '';
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const commandText = input.value.trim();
            if (commandText) {
                // Add to history
                commandHistory.push(commandText);
                historyIndex = -1;
                
                // Display command
                printToTerminal(commandText, "command");
                
                // Process command
                processCommand(commandText);
                
                // Clear input
                input.value = '';
                
                // Scroll to bottom
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        }
    });
    
    function processCommand(commandText) {
        const [command, ...args] = commandText.split(' ');
        const cmd = commands[command.toLowerCase()];
        
        if (cmd) {
            cmd.execute(args);
        } else {
            printToTerminal(`Command not found: ${command}\nType 'help' for available commands, "error"`);
        }
    }
    
    function printToTerminal(text, type = "normal") {
        const line = document.createElement('div');
        line.className = `output-line ${type}`;
        
        if (type === "command") {
            const prompt = document.createElement('span');
            prompt.className = 'prompt';
            prompt.textContent = 'seth@portfolio:~$ ';
            line.appendChild(prompt);
            
            const command = document.createElement('span');
            command.className = 'user-command';
            command.textContent = text;
            line.appendChild(command);
        } else {
            const output = document.createElement('div');
            output.className = `command-output ${type}`;
            output.textContent = text;
            line.appendChild(output);
        }
        
        output.appendChild(line);
    }
    
    function printHelp() {
        let helpText = "Available commands:\n\n";
        for (const [cmd, details] of Object.entries(commands)) {
            helpText += `${cmd.padEnd(15)} ${details.description}\n`;
        }
        printToTerminal(helpText);
    }
    
    function printAbout() {
        const aboutText = `
Hi!👋 I am Seth Odero - Junior Machine Learning Engineer

Passionate data science student with a strong foundation in statistics, machine learning and data
visualization seeking internship or entry level role where I can apply my analytic skills and contribute
to solving complex problem using data .
A highly motivated and detail-oriented machine learning student at Kisii University with strong skills
in data manipulation, data visualization, and web scraping. Seeking an internship or entry-level
position to apply my knowledge and skills in a practical environment
        `;
        printToTerminal(aboutText);
    }
    
    function printSkills() {
        const skillsText = `
Core Technologies:
- Python, Flask
- Seaborn, Matplotlib
- Pandas, Numpy, Sckikit-learn, Pytorch
- Streamlit, Jupyter Notebook


Databases:
- MySQL, Sqlite, MicrosoftSQL


Other:
- CustomTkinter, Kivy

        `;
        printToTerminal(skillsText);
    }
    
    function printExperience() {
        const experienceText = `
Work Experience:

Kisii University (2023-Present)
- Machine Learning Club, Kisii University
- Organized workshops and hackathons on data science and machine learning.
- Collaborated with peers on various machine learning projects.
- Volunteer, Kisii County Community Center


Education:
- Kisii University, Kisii County, Kenya Bachelor of Applied Science in Computer Science Expected
  Graduation: December 2027
        `;
        printToTerminal(experienceText);
    }
    
    function printProjects() {
        const projectsText = `
Notable Projects:

1. Enterprise SaaS Platform (TechCorp)
- Led development of cloud-based business management system
- Stack: React, Node.js, PostgreSQL, AWS
- Serves 500+ enterprise clients

2. E-commerce Optimization Suite
- Developed algorithms to optimize product recommendations
- Increased client revenue by 22% on average
- Stack: Python, Django, Redis, Elasticsearch


        `;
        printToTerminal(projectsText);
    }
    
    function printContact() {
        const contactText = `
Contact Information:

📧Email: velagasseth@gmail.com
📞Tel. :+254759812041
LinkedIn: https://www.linkedin.com/in/seth-odero-b61749356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
GitHub: https://github.com/Velagasseth


Available for:
- Speaking engagements
- Entry Level roles
        `;
        printToTerminal(contactText);
    }
    
    function clearTerminal() {
        output.innerHTML = '';
    }
    
    function changeTheme(args) {
        if (args.length === 0) {
            printToTerminal("Please specify theme: 'theme light' or 'theme dark'", "warning");
            return;
        }
        
        const theme = args[0].toLowerCase();
        if (theme === 'light') {
            document.documentElement.style.setProperty('--bg-color', '#f8fafc');
            document.documentElement.style.setProperty('--terminal-bg', '#ffffff');
            document.documentElement.style.setProperty('--text-color', '#1e293b');
            document.documentElement.style.setProperty('--border-color', '#e2e8f0');
            printToTerminal("Switched to light theme", "success");
        } else if (theme === 'dark') {
            document.documentElement.style.setProperty('--bg-color', '#0f172a');
            document.documentElement.style.setProperty('--terminal-bg', '#1e293b');
            document.documentElement.style.setProperty('--text-color', '#e2e8f0');
            document.documentElement.style.setProperty('--border-color', '#334155');
            printToTerminal("Switched to dark theme", "success");
        } else {
            printToTerminal("Invalid theme. Use 'light' or 'dark'", "error");
        }
    }


    function downloadResume() {
        printToTerminal("Downloading resume...", "success");
        // Example of what will display when command runs:
        // "Downloading: Alex_Turner_ML_Resume.pdf (2.4MB)"
        
        // Create temporary link to trigger download
        const link = document.createElement('a');
        link.href = "Seth's_Resume  (5).pdf"; // Replace with your actual PDF path
        link.download = 'Alex_Turner_ML_Resume.pdf'; // Customize your filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Example success message that will appear:
        printToTerminal("Resume downloaded successfully! File: Alex_Turner_ML_Resume.pdf", "success");
    }
});

