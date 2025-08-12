(function() {
    
    const questionInput = document.getElementById('single-question');
    const questionList = document.getElementById('question-list');
    const tableContainer = document.getElementById('table-container');
    const saveButton = document.getElementById('save-btn');
    const loadButton = document.getElementById('load-btn');
    const pushButton = document.getElementById('push-btn');

    let questions = [];

    pushButton.addEventListener('click', function() {
        const question = questionInput.value.trim();
        if (question) {
            questions.push(question);
            updateQuestionList();
            questionInput.value = ''; 
        } else {
            alert('Please enter a valid question.');
        }
    });
    console.log("asdasdasd");
    function updateQuestionList() {
        questionList.innerHTML = '';
        questions.forEach((question, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${question}`;
            questionList.appendChild(li);
        });
    }

    saveButton.addEventListener('click', function() {
        localStorage.setItem('tableQuestions', JSON.stringify(questions));
        alert('Questions saved to LocalStorage!');
    });

    loadButton.addEventListener('click', function() {
        const savedQuestions = JSON.parse(localStorage.getItem('tableQuestions'));
        if (savedQuestions && Array.isArray(savedQuestions)) {
            questions = savedQuestions;
            updateQuestionList();
            alert('Questions loaded from LocalStorage!');
        } else {
            alert('No saved questions found in LocalStorage.');
        }
    });
})();
