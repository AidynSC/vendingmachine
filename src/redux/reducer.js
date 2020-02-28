import {CHOOSE_PRODUCT, TOTAL_MONEY, REFRESH_MACHINE} from './actions';

const initialState = {
  products: [
    {
      order: 1,
      name: 'Coca-Cola',
      description: 'Soda drink',
      price: 150,
      isEnough: 'notEnough',
    },
    {
      order: 2,
      name: 'Milk',
      description: 'White drink from cow',
      price: 100,
      isEnough: 'notEnough',
    },
    {
      order: 3,
      name: 'Snickers',
      description: 'Chocolate bar',
      price: 70,
      isEnough: 'notEnough',
    },
    {
      order: 4,
      name: 'Saint Spring',
      description: 'Still water',
      price: 42,
      isEnough: 'notEnough',
    },
    {
      order: 5,
      name: 'Orbit',
      description: 'Chewing gum',
      price: 32,
      isEnough: 'notEnough',
    },
    {
      order: 6,
      name: 'Apple',
      description: 'Fruit',
      price: 11,
      isEnough: 'notEnough',
    },
  ],
  userMoney: 0,
  userMoneyIsEnough: false,
  change: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOTAL_MONEY:
      const newProducts = state.products.map(p => {
        if (Number(p.price) <= action.money) {
          return {
            ...p,
            isEnough: 'isEnough',
          };

        } else {
          return {
            ...p,
            isEnough: 'notEnough',
          };
        }
      });

      return {
        products: newProducts,
        userMoney: action.money,
        userMoneyIsEnough: false,
        change: 0
      };

    case CHOOSE_PRODUCT:
      const exactProduct = state.products.filter(p => {return p.order === action.order});
      if (exactProduct[0].price <= state.userMoney) {
        const availableCoins = [10, 5, 2, 1];
        let change = state.userMoney - exactProduct[0].price;
        const getChange = () => {
          return availableCoins.map(coin => {
            let amountCoin = Math.floor(change/coin);
            change -= amountCoin * coin;
            return amountCoin
          })
        };
        const changeArray = getChange();
        let coinsArray = [];
        for (let i = 0; i < availableCoins.length; i++) {
          if (changeArray[i] !== 0){
            coinsArray.push([availableCoins[i], changeArray[i]])
          }
        }

        return {
          products: state.products,
          userMoney: state.userMoney,
          userMoneyIsEnough: true,
          change: coinsArray
        };
      } else {
        return {
          products: state.products,
          userMoney: state.userMoney,
          userMoneyIsEnough: false,
          change: 0
        }
      }

    case REFRESH_MACHINE:
      return state = initialState;

    default:
      return state;
  }
}
