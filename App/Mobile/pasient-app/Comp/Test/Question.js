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
const Questions = [];

Questions.push(
  new Question(
    "Who's that ?",
    "Mouaad",
    "https://scontent.xx.fbcdn.net/v/t1.15752-9/403406873_3592380314338028_3489595633969855447_n.jpg?stp=dst-jpg_s403x403&_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFBjVyMr-WtB7uSoP8huJUjPjodjv8Uns4-Oh2O_xSezpPQBUHFQdlDwr-SEZ13GFCKtqBWNhhnlIsOFbwrO1Lk&_nc_ohc=3kL_t_P9SpcAX_AfeIG&_nc_ad=z-m&_nc_cid=0&_nc_pt=1&_nc_ht=scontent.xx&oh=03_AdRn0xIjTfQXlF5mucH01bq9282GxGX6tDAAcUDJVQ7FBw&oe=662FA545"
  )
);

Questions.push(
  new Question(
    "Do You Recongnize someone ?",
    "",
    "https://scontent.falg5-1.fna.fbcdn.net/v/t1.15752-9/371175718_681059010828828_1722084146446683443_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGF1b7eJDfVc2Q5C4Gxf3nt5tY7B1VBbOPm1jsHVUFs44E0euc7iHr5udAD2c36iIEZEigb5iKGApFk_9zmZCII&_nc_ohc=vUd2Af6M9kcAX82XqAa&_nc_pt=1&_nc_ht=scontent.falg5-1.fna&oh=03_AdSQ-l2opNQwvJdPo3BSeAPhUlbi1ltANNZTN46h7AXDSw&oe=662FBDC8"
  )
);

Questions.push(
  new Question(
    "What is this game ? ",
    "leg",
    "https://scontent.falg5-2.fna.fbcdn.net/v/t1.15752-9/433514133_818343843457600_8557755607028612832_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFHbaykJOEBj-sTGo63GqXP4QfvZZVXSknhB-9llVdKSVTu2-jDG_vrW_wC9gKPv75RUooR9QgKTwJwyyE9o3GK&_nc_ohc=SL6VHeTs-doAX9kyTpx&_nc_pt=1&_nc_ht=scontent.falg5-2.fna&oh=03_AdTPvzaX1aorfhdU0LPubyZwQN0Rg81UEU--zIgrDHZOPg&oe=662FC01B"
  )
);
Questions.push(
  new Question(
    "Who's that ? ",
    "Aissam",
    "https://scontent.falg5-2.fna.fbcdn.net/v/t1.15752-9/431645666_3133268186807014_5448984623717064585_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGdBw16PrtKAUcFEdGCXzN8PuKkSo2Q2eI-4qRKjZDZ4qDSHmSCTkbRRyj9Ch3kVGcOlLabHisXmEsxUzAxiBlZ&_nc_ohc=vh8aER5Aw6kAX-Sy90l&_nc_pt=1&_nc_ht=scontent.falg5-2.fna&oh=03_AdS-Ze-R8yT9ZUPIb6cyQUGM3i5XlMrgIo9LHh7pzih_1Q&oe=662F9F8B"
  )
);
export { Questions };
