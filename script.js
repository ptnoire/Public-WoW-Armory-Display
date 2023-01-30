//// Warcraft API Calls

const getData = async function(server, character) {
    const returnData = await fetch(`https://us.api.blizzard.com/profile/wow/character/${server}/${character}/collections/mounts?namespace=profile-us&locale=en_US&access_token=EUO3jy13CeA4RmohHV82A0pGpeY0g4w4Zy`);
    const data = await returnData.json();

    const characterData = await fetch(`https://us.api.blizzard.com/profile/wow/character/${server}/${character}?namespace=profile-us&locale=en_US&access_token=EUO3jy13CeA4RmohHV82A0pGpeY0g4w4Zy`)
    const characterJSON = await characterData.json();
    renderData(characterJSON, data);
}

let character = {};
let mountArray = [];

const renderData = function(el, elem) {
    const { active_spec, active_title, character_class, faction, gender, race, realm } = el
    const { mounts } = elem;
    mounts.forEach(foo => {
        const { mount } = foo
        const mountEntry = {
            name: mount.name,
            useable: foo.is_useable,
        }
        mountArray.push(mountEntry)
    })

    character = {
        name: el.name,
        level: el.level,
        race: race.name,
        class: character_class.name,
        gender: gender.name,
        faction: faction.name,
        realm: realm.name,
        spec: active_spec.name,
        title: active_title.name,
        ilvl: el.average_item_level,
        mounts: mountArray,
    }
    displayData(character)
    console.log(character);
}

const clearData = function() {
    mountDisplay.innerHTML = ''
}



const characterName = document.querySelector('.character__name');
const classRace = document.querySelector('.character__classRace');
const characterServer = document.querySelector('.character__server');
const nameSearch = document.querySelector('.nameSearch');
const serverSearch = document.querySelector('.serverSearch');
const btn = document.querySelector('.btn');
const mountDisplay = document.querySelector('.mounts');


const displayData = function(char) {
    characterName.innerText = `${char.name} (${char.faction})`;
    characterServer.innerText = `${char.realm}`;
    classRace.innerText = `${char.level} ${char.race} ${char.class}`;
    mountDisplay.innerHTML = `<h3>Total Mounts Collected: ${char.mounts.length}`;
    char.mounts.forEach(x => {
        const markup = `<li class="${x.useable}">${x.name}</li>`
        mountDisplay.insertAdjacentHTML('afterend', markup)
    })
}

btn.addEventListener('click', function(e) {
    e.preventDefault();
    clearData()
    const characterName = nameSearch.value.toLowerCase();
    const serverName = serverSearch.value.toLowerCase();
    getData(serverName, characterName);

    // Fix this!!
    characterName.textContent = serverName.textContent = '';
})