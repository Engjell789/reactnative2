import React from 'react';
import { BiBuilding, BiCctv, BiBed  } from 'react-icons/bi';

const courses = [
    {
        title: 'Cilesi',
        icon: <BiBuilding />,
    },
    {
        title: 'Siguri',
        icon: <BiCctv />,
    },
    {
        title: 'Rehati',
        icon : < BiBed  />, 
    },
];

const Card = () => {
    return (
        <div className='card--container'>
            {courses.map((item, index) => (
                <div className='card' key={index}> 
                    <div className="card--cover">{item.icon}</div>
                    <div className="card--title">
                        <h2>{item.title}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Card;