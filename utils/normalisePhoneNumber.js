function normalisePhoneNumber(number){
  // remove special characters
  // last 10 digits = excludes country code in front
  const noramlisedNumber = number.replace(/\D/g, "").slice(-10);
  return noramlisedNumber; 
}