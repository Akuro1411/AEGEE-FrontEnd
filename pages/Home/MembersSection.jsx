import './MembersSection.scss';
import coloredCircles from '../../files/colored-circles-opposite.png';
import Cta from '../../components/CTA/Cta';

import member1 from '../../files/aegeeans-1.webp';
import member2 from '../../files/aegeeans-2.webp';
import member3 from '../../files/aegeean-3.webp';
import member4 from '../../files/aegeeans-4.webp';

const MEMBER_CARDS = [
  { img: member1, text: 'From Netherlands' },
  { img: member2, text: 'From Spain' },
  { img: member3, text: 'From Poland' }, 
  { img: member4, text: 'From Poland' },
];

const MembersSection = () => {
  return (
    <div className="member_cta_section container">
      <div className="members_wrapper">
        <div className="membersText">
          <img src={coloredCircles} alt="Colorful Circles" />
          <div className="textWrapper">
            <h2>Our members All around The World</h2>
            <p>
              Our members are spread all around the world, creating a vibrant and diverse international
              community. Together, we connect across borders to share ideas, culture, and meaningful
              experiences.
            </p>
          </div>
        </div>

        <div className="poloroid_cards">
          {MEMBER_CARDS.map((card, i) => (
            <div className="poloroid" key={i}>
              <img src={card.img} alt={card.text} />
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>

      <Cta />
    </div>
  );
};

export default MembersSection;
