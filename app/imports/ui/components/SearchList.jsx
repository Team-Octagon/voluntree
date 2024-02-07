import React from 'react';
import EventCard from './EventCard';

const SearchList = () => {
  const filtered = EventCard.map(person => <EventCard key={person.id} person={person} />);
  return (
    <div>
      {filtered}
    </div>
  );
};

export default SearchList;
