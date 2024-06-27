import { Blockfrost, Lucid, Network } from "lucid-cardano";
import { TxBuilderLucidV3, DatumBuilderLucidV3 } from "@sundaeswap/core/lucid"
import { IMintV3PoolConfigArgs } from '@sundaeswap/core';
import { AssetAmount } from "@sundaeswap/asset";

export const initLucidBlockfrost = async (): Promise<Lucid> => {
  const network = process.env.NEXT_PUBLIC_NETWORK as string;
  const lucidNetwork = (network.charAt(0).toUpperCase() + network.slice(1)) as Network;
  const blockfrostUrl = process.env.BLOCKFROST_URL as string;
  const blockfrostProjectId = process.env.BLOCKFROST_PROJECT_ID as string;

  const lucid = await Lucid.new(
    new Blockfrost(blockfrostUrl, blockfrostProjectId),
    lucidNetwork
  );
  return lucid;
};

export const createTokenPool = async () => {
  const lucid = await initLucidBlockfrost();
  lucid.selectWalletFromSeed("seed");

  const txBuilder = new TxBuilderLucidV3(lucid, new DatumBuilderLucidV3("preview"));

  const mintPoolArgs: IMintV3PoolConfigArgs = {
    assetA: new AssetAmount(20_000_000n, {
      assetId: "ada.lovelace",
      decimals: 6,
    }),
    assetB: new AssetAmount(20_000_000n, {
      assetId:
        "fa3eff2047fdf9293c5feef4dc85ce58097ea1c6da4845a351535183.74494e4459",
      decimals: 0,
    }),
    fee: 20n,
    marketOpen: 0n,
    ownerAddress: "addr_test",
  };

  const txMintPool = await txBuilder.mintPool(mintPoolArgs);
  const txComplete = await txMintPool.tx.complete();
  const txSigned = await txComplete.sign().complete();
  const txHash = await txSigned.submit();

};
