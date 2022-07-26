const { ethers } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

/**
 * Prints out LottoGame contract info to the console:
 * - Address
 * - Current balance
 * - # of unsettled bets
 * - Whether it is currently accepting bets (true if not requesting a random number or settling the round)
 * - Rake
 * Contract address is pulled from config files
 */
async function main() {
    const chainId = network.config.chainId
    const lottoGameAddress = networkConfig[chainId]["lottoGameAddress"]

    const LottoGameFactory = await ethers.getContractFactory("LottoGame")
    lottoGame = LottoGameFactory.attach(lottoGameAddress)
    console.log("LottoGame contract address:", lottoGame.address)
    const balance = await lottoGame.getBalance()
    console.log("Contract balance:", balance.toString())

    console.log(
        "Count bettors:",
        (await lottoGame.getCountBettors()).toString()
    )
    console.log("Accepting bets:", await lottoGame.getAcceptingBets())
    console.log("Rake:", (await lottoGame.getRake()).toString())
    console.log(
        "FreeBetContract address state variable:",
        (await lottoGame.getFreeBetContractAddress()).toString()
    )
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
