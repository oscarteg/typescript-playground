function isBigEndian(): boolean {
  const array = new Uint8Array(4);
  const view = new Uint32Array(array.buffer);
  view[0] = 1 & array[0];
  return !((view[0] = 1) & array[0]);
}

/* - Het input topic komt niet uit env variabele */
/* - Er wordt niets naar output topic geschreven (en komt niet uit de env variabele) */
/* - Consumer wordt niet netjes disconnected wanneer de app sluit */
/* - De decoder maakt gebruik van `readUInt32LE` terwijl er aangegeven staat in de documentatie dat het om een signed integer gaat (UInt = unsigned int) */
/* - De rest van de decoder is niet uitgewerkt en we zien niet wat je hebt proberen te doen om het op te lossen */
/* - Battery voltage wordt niet juist berekend */
/* - de calls naar `readUInt32LE` hebben allemaal een tweede parameter (2 x 4 en 1 x 10?) terwijl er geen tweede parameter verwacht wordt. */
/* - code is rommelig, er worden dingen gedaan die niet worden gevraagd en er zit bijvoorbeeld nog een `console.log("asdasdddd");` in */
/* - message.value wordt eerst van buffer naar string geconverteerd en daarna wordt er weer een buffer van gemaakt */
