import Chat from "./assets/chat.svg";
import Social from "./assets/social.svg";
import Game from "./assets/game.svg";
export default function Games() {
  return (
    <div className="flex justify-center flex-wrap px-16 pr-32 py-16 gap-16 max-h-fit min-h-card ml-32 ">
      <Card
        cardColor="bg-Chat"
        textShadow="hover:shadow-Chat"
        textColor="text-Chat"
        img={Chat}
      ></Card>
      <Card
        cardColor="bg-Gam"
        textShadow="hover:shadow-Gam"
        textColor="text-Gam"
        img={Game}
      ></Card>
      <Card
        cardColor="bg-Social"
        textShadow="hover:shadow-Social"
        textColor="text-Social"
        img={Social}
      ></Card>
    </div>
  );
}
// eslint-disable-next-line react/prop-types
function Card({ cardColor, img, textColor, textShadow }) {
  return (
    <div className="flex round flex-1 flex-col justify-center">
      <div
        className={
          cardColor +
          " rounded-full min-h-40 flex-1 basis-0 flex card-hover justify-center items-center " +
          textShadow
        }
      >
        <img className="h-full" src={img} alt="" />
      </div>
      <p className="font-bold text-center text-4xl font-Poppins mt-3">
        {
          // eslint-disable-next-line react/prop-types
          cardColor.slice(3)
        }
        <span className={`${textColor}`}>Dhakira</span>
      </p>
    </div>
  );
}
