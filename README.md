# 🎯 Personal Habit Tracker

A simple, elegant web application for tracking daily habits and building consistency. Built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

- **Add Custom Habits**: Create personalized habits to track
- **Daily Completion**: Mark habits as complete for each day
- **Streak Tracking**: See your current streak for each habit
- **Statistics Dashboard**: View total habits, daily completion rate, and success percentage
- **Local Storage**: All data is saved locally in your browser
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Data Export/Import**: Backup and restore your habit data

## 🚀 Getting Started

### Prerequisites

No special requirements! This is a pure frontend application that runs in any modern web browser.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/personal-habit-tracker.git
   cd personal-habit-tracker
   ```

2. Open `index.html` in your web browser, or serve it using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Navigate to `http://localhost:8000` in your browser

## 🎮 Usage

### Adding Habits
1. Type your habit in the input field (e.g., "Drink 8 glasses of water")
2. Click "Add Habit" or press Enter
3. Your habit will appear in the habits list

### Tracking Progress
- Click "Mark Done" to complete a habit for today
- Click "✓ Done" to undo completion
- View your current streak for each habit
- Check the statistics section for overall progress

### Demo Mode
Open the browser console and run `addDemoHabits()` to add some sample habits for testing.

## 🛠️ Technical Details

### Architecture
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser LocalStorage API
- **Styling**: Custom CSS with responsive design
- **No Dependencies**: Zero external libraries or frameworks

### File Structure
```
personal-habit-tracker/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── README.md           # This file
├── package.json        # Project metadata
└── LICENSE             # MIT License
```

### Key Classes and Methods

#### `HabitTracker` Class
- `addHabit()`: Add a new habit
- `toggleHabit(id)`: Mark/unmark habit as complete
- `deleteHabit(id)`: Remove a habit
- `calculateStreak(habit)`: Calculate current streak
- `exportData()`: Export habits to JSON file
- `importData(jsonData)`: Import habits from JSON

## 🎨 Customization

### Styling
Edit `styles.css` to customize:
- Color scheme (currently purple gradient)
- Typography and fonts
- Layout and spacing
- Mobile responsiveness

### Functionality
Extend `script.js` to add:
- Habit categories
- Weekly/monthly views
- Goal setting
- Reminder notifications
- Data visualization

## 📱 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🤝 Contributing

This project is perfect for beginners and ChatGPT Codex experimentation! Here are some ideas:

### Easy Enhancements
- [ ] Add habit categories/tags
- [ ] Implement dark mode toggle
- [ ] Add habit icons/emojis
- [ ] Create weekly/monthly view
- [ ] Add motivational quotes

### Medium Complexity
- [ ] Implement habit scheduling (specific days)
- [ ] Add data visualization charts
- [ ] Create habit templates
- [ ] Add export to CSV functionality
- [ ] Implement habit reminders

### Advanced Features
- [ ] Add user authentication
- [ ] Implement cloud sync
- [ ] Create mobile app version
- [ ] Add social sharing features
- [ ] Implement habit analytics

### Getting Started with Development

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly in multiple browsers
5. Commit your changes: `git commit -m 'Add feature-name'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by habit tracking methodologies from "Atomic Habits" by James Clear
- Design influenced by modern minimalist UI principles
- Built as a learning project for web development fundamentals

## 📞 Support

If you have questions or need help:
1. Check the [Issues](https://github.com/yourusername/personal-habit-tracker/issues) page
2. Create a new issue with detailed description
3. Include browser version and steps to reproduce any bugs

---

**Happy habit building! 🌱**

