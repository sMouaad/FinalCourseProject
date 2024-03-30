class Question {
  question;
  answer;
  image;
  constructor(question, answer, image) {
    this.question = question;
    this.answer = answer.toLowerCase();
    this.image = image;
  }
}
export default Question;
