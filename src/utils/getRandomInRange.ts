function getRandomInRange(min: number, max: number): number {
  const mn = Math.ceil(min);
  const mx = Math.floor(max);

  return Math.floor(Math.random() * (mx - mn + 1)) + mn;
}

export default getRandomInRange;
