### Overview
This project showcases a Among Us x Amazing Race mashup game, a web application developed as part of a bounty project that required for the [Immutable Bounty #3: Building a Game](https://app.stackup.dev/bounty/immutable-bounty-3-building-a-game). You can take a view the [demo on Youtube](https://youtu.be/Bgoh8b5itX4) or take a look below:


https://github.com/keanecodes/2023-immutable-bounty-3/assets/22881005/8b842044-f415-4efa-a577-492f7c262dc8


## Game mechanics
Space Maze was inspired by the typical Software Engineering courses, but adding on a little fun in the middle to clear quests. It uses simple Among Us character assets, which was meant to work with Immutable's Updating Asset's Metadata feature. It also encourages the users to have a little fun to find the mascots to answer the quizzes. Once done with the quizzes, the user can mint a gasless NFT.

### Immutable Passport integration
Immutable Passport enhances user experience by simplifying login processes and ensuring the security of digital assets. By using it, I expedited my development time because of its SSO feature. In the original project, I had to refresh and key in the credentials every time there was a hot-reload. So I am really happy to development Immutable Passport Integration. It is also very easy to setup and robust. I'm excited to work with more Immutable Passport in the future.

### Gasless experience, even when it's on zkEVM
the Immutable passport experience is great, however it does not allow us to use the faucet to send some test-IMX into the passport wallet. Through this small hiccup, I realised actually I can pre-mint the NFT and then transfer to the users when they initiate the minting to let them enjoy a gasless experience. So it's almost like I'm behaving as a Paymaster.




## Acknowledgements
This project used to be a school project for the frontend part. I forked the repo to add-on the Immutable Passport and zkEVM features. The original version without Immutable can be found here.

## Conclusion
In conclusion, this write-up provides a comprehensive overview of the blockchain-based game, emphasizing its integration with Passport and evaluating the engagement it offers to players. By covering these aspects, readers gain a clear understanding of the game's mechanics, its smart contract functionality, and the factors that make it an enjoyable and addictive gaming experience.
