const fs = require('fs');
const path = require('path');

const indexData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'forex', 'index.json'), 'utf-8'));
const topicsDir = path.join(__dirname, 'data', 'forex', 'topics');
const quizzesDir = path.join(__dirname, 'data', 'forex', 'quizzes');

if (!fs.existsSync(topicsDir)) fs.mkdirSync(topicsDir, { recursive: true });
if (!fs.existsSync(quizzesDir)) fs.mkdirSync(quizzesDir, { recursive: true });

indexData.topics.forEach(topic => {
  if (topic.slug === 'intro') return; // Skip intro as it's already done

  const topicFilePath = path.join(topicsDir, `${topic.slug}.json`);
  const quizFilePath = path.join(quizzesDir, `${topic.slug}.json`);

  const topicBoilerplate = {
    id: topic.slug,
    title: topic.title,
    slug: topic.slug,
    sections: [],
    endQuestions: []
  };

  const quizBoilerplate = {
    topicId: topic.slug,
    title: `কুইজ: ${topic.title}`,
    description: "এই অধ্যায়ের ধারণাগুলো যাচাই করুন।",
    questions: []
  };

  if (!fs.existsSync(topicFilePath)) {
    fs.writeFileSync(topicFilePath, JSON.stringify(topicBoilerplate, null, 2), 'utf-8');
    console.log(`Created topic file: ${topic.slug}.json`);
  }

  if (!fs.existsSync(quizFilePath)) {
    fs.writeFileSync(quizFilePath, JSON.stringify(quizBoilerplate, null, 2), 'utf-8');
    console.log(`Created quiz file: ${topic.slug}.json`);
  }
});

console.log('Done!');
