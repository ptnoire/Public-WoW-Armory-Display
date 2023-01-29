//// Warcraft API Calls
const getData = async function(character) {
    const returnData = await fetch('https://us.api.blizzard.com/profile/user/wow?namespace=profile-us&locale=en_US&access_token=EUO3jy13CeA4RmohHV82A0pGpeY0g4w4Zy');
    const data = await returnData.json();
    console.log(data)
    const { wow_accounts } = data
    const characters = wow_accounts[0].characters;
    console.log(characters);
    
}

getData()

const name = document.querySelector('.character__name');
const classRace = document.querySelector('.character__classRace');
const faction = document.querySelector('.character__faction');
const level = document.querySelector('.character__level');
const input = document.querySelector('.search');
const btn = document.querySelector('.btn');

btn.addEventListener('click', function(e) {
    e.preventDefault();
    const value = input.value;
    
})