export const getTextCookingDuration = (duration: number) => {
  const heure = Math.floor(duration / 60);
  const minutes = Math.floor(duration - (heure * 60));
  return (isNaN(duration)) ? '' : `${heure} h ${minutes} (${Math.floor(duration)} minutes)`;
}
