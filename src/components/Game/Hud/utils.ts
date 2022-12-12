export const add = (ref: React.RefObject<HTMLElement>, number: string) => {
  if (ref.current) {
    ref.current.innerHTML = (Number(ref.current?.innerHTML) + Number(number)).toString();
  }
};

export const substract = (balance: React.RefObject<HTMLElement>, bet: React.RefObject<HTMLElement>) => {
  if (balance.current && bet.current) {
    balance.current.innerHTML = (Number(balance.current.innerHTML) - Number(bet.current.innerHTML)).toString();
  }
};

export const strartGame = () => {};
