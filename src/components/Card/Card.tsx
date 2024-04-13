import { BiLogoHtml5, BiLogoAndroid, BiBuilding } from "react-icons/bi"
import './Card.css';

const course = [
  {
    title: 'Web Development',
    icon: <BiLogoHtml5 />
  },
  {
    title: 'App Development',
    icon: <BiLogoAndroid />
  },
  {
    title: 'UX & UI',
    icon: <BiBuilding />
  },
]

const Card = () => {

  return (
    <div className="card--container">
      {course.map(item => (
        <div className="card" key={item.title}>
          <div className="card--cover">{item.icon}</div>
          <div className="card--title">
            <h2>{item.title}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card