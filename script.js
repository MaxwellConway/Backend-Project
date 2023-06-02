async function getConcerts() {
  const concerts = await fetch(
    "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=rock&size=100&dmaId=220&apikey=83FaiAZhCP41A21Ku8BCVMDVxlV9UOO8",
    {
      method: "GET",
    }
  );

  const json = await concerts.json();
  const concertsArray = json._embedded.events[82];
  console.log(concertsArray);
  //return concertsArray;
}

console.log(getConcerts());
