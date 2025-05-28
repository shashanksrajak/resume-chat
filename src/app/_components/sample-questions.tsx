export default function SampleQuestions() {
  const questions = [
    "Is this candidate suitable for a senior software engineer role?",
    "What are the candidate's strongest technical skills?",
    "How many years of experience does this candidate have in Python?",
    "What gaps might this candidate have for a leadership position?",
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
      <h3 className="text-2xl font-semibold mb-6 text-center">
        Try These Sample Questions
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {questions.map((question, index) => (
          <div
            key={index}
            className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
          >
            <p className="text-sm">&ldquo;{question}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  );
}
