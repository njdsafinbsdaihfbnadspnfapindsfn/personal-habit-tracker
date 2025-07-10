class HabitTracker {
    constructor() {
        this.habits = this.loadHabits();
        this.initializeElements();
        this.bindEvents();
        this.render();
        this.updateStats();
    }

    initializeElements() {
        this.habitInput = document.getElementById('habitInput');
        this.addHabitBtn = document.getElementById('addHabitBtn');
        this.habitsContainer = document.getElementById('habitsContainer');
        this.totalHabitsEl = document.getElementById('totalHabits');
        this.completedTodayEl = document.getElementById('completedToday');
        this.successRateEl = document.getElementById('successRate');
    }

    bindEvents() {
        this.addHabitBtn.addEventListener('click', () => this.addHabit());
        this.habitInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addHabit();
            }
        });
    }

    addHabit() {
        const habitText = this.habitInput.value.trim();
        if (!habitText) {
            alert('Please enter a habit!');
            return;
        }

        const habit = {
            id: Date.now(),
            text: habitText,
            completed: false,
            createdAt: new Date().toISOString(),
            completedDates: []
        };

        this.habits.push(habit);
        this.saveHabits();
        this.habitInput.value = '';
        this.render();
        this.updateStats();
    }

    toggleHabit(id) {
        const habit = this.habits.find(h => h.id === id);
        if (!habit) return;

        const today = new Date().toDateString();
        const todayIndex = habit.completedDates.findIndex(date => 
            new Date(date).toDateString() === today
        );

        if (todayIndex === -1) {
            // Mark as completed for today
            habit.completedDates.push(new Date().toISOString());
            habit.completed = true;
        } else {
            // Remove completion for today
            habit.completedDates.splice(todayIndex, 1);
            habit.completed = false;
        }

        this.saveHabits();
        this.render();
        this.updateStats();
    }

    deleteHabit(id) {
        if (confirm('Are you sure you want to delete this habit?')) {
            this.habits = this.habits.filter(h => h.id !== id);
            this.saveHabits();
            this.render();
            this.updateStats();
        }
    }

    isCompletedToday(habit) {
        const today = new Date().toDateString();
        return habit.completedDates.some(date => 
            new Date(date).toDateString() === today
        );
    }

    render() {
        if (this.habits.length === 0) {
            this.habitsContainer.innerHTML = `
                <div class="empty-state">
                    <p>No habits yet. Add your first habit above! 🌱</p>
                </div>
            `;
            return;
        }

        this.habitsContainer.innerHTML = this.habits.map(habit => {
            const isCompleted = this.isCompletedToday(habit);
            const streak = this.calculateStreak(habit);
            
            return `
                <div class="habit-item ${isCompleted ? 'completed' : ''}">
                    <div class="habit-info">
                        <div class="habit-text ${isCompleted ? 'completed' : ''}">${habit.text}</div>
                        <div class="habit-meta">
                            <small>Streak: ${streak} days | Created: ${new Date(habit.createdAt).toLocaleDateString()}</small>
                        </div>
                    </div>
                    <div class="habit-actions">
                        <button class="complete-btn" onclick="habitTracker.toggleHabit(${habit.id})">
                            ${isCompleted ? '✓ Done' : 'Mark Done'}
                        </button>
                        <button class="delete-btn" onclick="habitTracker.deleteHabit(${habit.id})">
                            Delete
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    calculateStreak(habit) {
        if (habit.completedDates.length === 0) return 0;

        const sortedDates = habit.completedDates
            .map(date => new Date(date))
            .sort((a, b) => b - a);

        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        for (let i = 0; i < sortedDates.length; i++) {
            const completedDate = new Date(sortedDates[i]);
            completedDate.setHours(0, 0, 0, 0);

            const daysDiff = Math.floor((currentDate - completedDate) / (1000 * 60 * 60 * 24));

            if (daysDiff === streak) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    }

    updateStats() {
        const totalHabits = this.habits.length;
        const completedToday = this.habits.filter(habit => this.isCompletedToday(habit)).length;
        const successRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

        this.totalHabitsEl.textContent = totalHabits;
        this.completedTodayEl.textContent = completedToday;
        this.successRateEl.textContent = `${successRate}%`;
    }

    saveHabits() {
        localStorage.setItem('habits', JSON.stringify(this.habits));
    }

    loadHabits() {
        const saved = localStorage.getItem('habits');
        return saved ? JSON.parse(saved) : [];
    }

    // Utility method to export data
    exportData() {
        const data = {
            habits: this.habits,
            exportDate: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'habit-tracker-data.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    // Utility method to import data
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            if (data.habits && Array.isArray(data.habits)) {
                this.habits = data.habits;
                this.saveHabits();
                this.render();
                this.updateStats();
                alert('Data imported successfully!');
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            alert('Error importing data: ' + error.message);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.habitTracker = new HabitTracker();
});

// Add some demo functionality for testing
window.addDemoHabits = function() {
    const demoHabits = [
        'Drink 8 glasses of water',
        'Exercise for 30 minutes',
        'Read for 20 minutes',
        'Meditate for 10 minutes',
        'Write in journal'
    ];
    
    demoHabits.forEach(habitText => {
        const habit = {
            id: Date.now() + Math.random(),
            text: habitText,
            completed: false,
            createdAt: new Date().toISOString(),
            completedDates: []
        };
        habitTracker.habits.push(habit);
    });
    
    habitTracker.saveHabits();
    habitTracker.render();
    habitTracker.updateStats();
};

