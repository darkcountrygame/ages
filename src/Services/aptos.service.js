import {
  Aptos,
  AptosConfig,
  Network,
} from "@aptos-labs/ts-sdk";

const aptosConfig = new AptosConfig({ network: Network.TESTNET });
export const aptos = new Aptos(aptosConfig);

export const contract_address = "0x192ff9e249146bd456d9d126d0c5a4d72116bb49713103917c4fa584d6a6a27a";
export const collection_hash = "0xeff1ba2e966e999481c64601e19e67f1cb09728b1a7ee50347d69f98083e09e6";
export const get_staking_object_address = "0xa1a426d1fa1132357974cf68856d3b551a208263ddbdcdcc8d41afd6fe0564c7";


// export const getStakedTokens = async () => {
//   let resourceType = `${contract_address}::farm::StakingStore`;

//   const staking_store = await aptos.getAccountResource({
//     accountAddress: '0xba8369c6946ddb9f15b6242186dd80f6dee26cf928a904a765cab6f4cc897cf5',
//     resourceType
//   });
  
//   console.log(staking_store);
  
//   return staking_store.staked_tokens
// };

export const getResources = async () => {
 const resourceType = `0x1::coin::CoinStore<${contract_address}::FOOD::FOOD`;


  const food_res = await aptos.getAccountResource({
    accountAddress: '0xba8369c6946ddb9f15b6242186dd80f6dee26cf928a904a765cab6f4cc897cf5',
    resourceType
  });
  
  console.log(food_res);
  
  return food_res
};

export const getStakedTokensTools = async ({account}) => {
  let resourceType = `${contract_address}::farm::FarmStore`;

  const staking_store = await aptos.getAccountResource({
    accountAddress: account.address,
    resourceType
  });
  
  const worksiteKeys = Object.keys(staking_store).filter(key => key.endsWith('_instruments'));

  const worksites = worksiteKeys
  .map(key => staking_store[key])
  .filter(worksite => worksite);

  console.log(worksites);
  
  return worksites;
};

export const getStakedTokensWP = async ({account}) => {
  let resourceType = `${contract_address}::farm::FarmStore`;

  const staking_store = await aptos.getAccountResource({
    accountAddress: account.address,
    resourceType
  });

  // await getAptosStakedTools({account})
  
  const worksiteKeys = Object.keys(staking_store).filter(key => key.endsWith('_worksite'));

  const worksites = worksiteKeys
  .map(key => staking_store[key])
  .filter(worksite => worksite.trim() !== "");

  console.log(worksites);
  
  return worksites;
};

export const getAptosStakedWP = async ({account}) => {

  const stakedNames = await getStakedTokensWP({account});

  const results = await Promise.all(
    stakedNames.map(async (name) => {
      const res = await aptos.view({
        payload: {
          function: `${contract_address}::minter::get_worksite`,
          typeArguments: [],
          functionArguments: [
            get_staking_object_address,
            name,
          ],
        },
      });
      
    
      return {res, token_name: name, token_uri: res[0].uri};
    })
  );

  console.log(results.flat());
  
  return results.flat();
};

export const getAptosStakedTools = async ({ account }) => {
  const stakedNames = await getStakedTokensTools({ account });

  // Обробляємо масив масивів за допомогою flatMap
  const results = await Promise.all(
    stakedNames.flatMap((namesArray) =>
      namesArray.map(async (name) => {
        const res = await aptos.view({
          payload: {
            function: `${contract_address}::minter::get_instrument`,
            typeArguments: [],
            functionArguments: [
              get_staking_object_address,
              name,
            ],
          },
        });

        return { res, token_name: name, token_uri: res[0].uri };
      })
    )
  );

  console.log(results);
  
  return results;
};



// export const getMyTools = async () => {
//   let resourceType = `${contract_address}::farm::StakingStore`;

//   const staking_store = await aptos.getAccountResource({
//     accountAddress: '0xba8369c6946ddb9f15b6242186dd80f6dee26cf928a904a765cab6f4cc897cf5',
//     resourceType
//   });
  

//   return staking_store.staked_tokens
// };

export const getUserNfts = async ({ account }) => {
  
  let allNfts = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    let result = await aptos.getAccountOwnedTokensFromCollectionAddress({
      accountAddress: account,
      collectionAddress: collection_hash,
      options: {
        offset: offset,
        limit: limit,
      },
    });

    // Перевірка, чи є результати
    if (result.length === 0) {
      break;
    }

    console.log(result);

    // Мапування результатів для вибору тільки необхідних полів
    const filteredNfts = result
    .map(nft => ({
      token_uri: nft.current_token_data?.token_uri,
      token_name: nft.current_token_data?.token_name,
      token_properties_mutated_v1: nft.token_properties_mutated_v1,
    }));

    // Додавання відфільтрованих даних до загального масиву
    allNfts = allNfts.concat(filteredNfts);

    // Оновлення offset для наступної ітерації
    offset += limit;
  }
  
  console.log(allNfts);
  

  return allNfts;
};

export const unStakeWP = async ({ account, name }) => {
  console.log(account, name);
  

   await aptos.transaction.build.simple(
    {
        sender: account,
        data: {
            function: `${contract_address}::farm::unstake_worksite`,
            functionArguments: [
                name
            ]
        }
    }
 );
 
};

export const stakeWP = async ({ account, name }) => {

  await aptos.transaction.build.simple(
   {
       sender: account,
       data: {
           function: `${contract_address}::farm::stake_worksite`,
           functionArguments: [
               name
           ]
       }
   }
);

};

