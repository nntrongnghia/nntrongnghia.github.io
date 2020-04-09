const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');


function randomValueFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

var insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
var insertY = ["the soup kitchen", "Disneyland", "the White House"];
var insertZ = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];

randomize.addEventListener('click', result);

function result() {
    var xItem = randomValueFromArray(insertX);
    var yItem = randomValueFromArray(insertY);
    var zItem = randomValueFromArray(insertZ);

    var storyText = `It was 94 fahrenheit outside, so ${xItem} went for a walk. When they got to ${yItem}, they stared in horror for a few moments, then ${zItem}. Bob saw the whole thing, but was not surprised — ${xItem} weighs 300 pounds, and it was a hot day.`;

    var newStory = storyText;

    if (customName.value !== '') {
        let name = customName.value;
        newStory = newStory.replace("Bob", name);
    }
    if (document.getElementById("uk").checked) {
        let weight = Math.round(300 * 0.071429) + " stone";
        let temperature = Math.round((94 - 32)/1.80) + " centigrade";
        newStory = newStory.replace("94 fahrenheit", temperature);
        newStory = newStory.replace("300 pounds", weight);
    }
    story.textContent = newStory;
    story.style.visibility = 'visible';
}


