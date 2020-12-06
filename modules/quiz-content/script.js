'use strict';

//Variables

const dataPierscionki = [
  {
    name: 'Pierścionek Zodiac',
    code: '155/',
  },
  {
    name: 'Obrączka Flowers',
    code: 'P/125',
  },
  {
    name: 'Pierścionek Lune',
    code: 'P/128',
  },
  {
    name: 'Pierścionek Połączone serca',
    code: 'P/AZUR/105',
  },
  {
    name: 'Pierścionek z piórem',
    code: 'P/AZUR/115',
  },
  {
    name: 'Pierścionek Paw',
    code: 'P/AZUR/122',
  },
  {
    name: 'Pierścionek Barok Niebieski',
    code: 'P/AZUR/123/N',
  },
  {
    name: 'Pierścionek Biarritz',
    code: 'P/AZUR/123',
  },
  {
    name: 'Pierścionek Flowers',
    code: 'P/AZUR/125',
  },
  {
    name: 'Pierścionek California',
    code: 'P/AZUR/139',
  },
  {
    name: 'Pierścionek Ażur serce',
    code: 'P/AZUR/3',
  },
  {
    name: 'Pierścionek Ażur koniczyna',
    code: 'P/AZUR/4',
  },
  {
    name: 'Pierścionek Ażur motyl',
    code: 'P/AZUR/89',
  },
  {
    name: 'Pierścionek Ażur skrzydło',
    code: 'P/AZUR/98',
  },
  {
    name: 'Pierścionek Full Love',
    code: 'P/AZUR/FL',
  },
  {
    name: 'Pierścionek Z blaszką',
    code: 'P/BLASZKA',
  },
  {
    name: 'Pierścionek Szafir Zielony',
    code: 'P/SZ/ZC',
  },
];

const dataTest = [
  {
    name: 'TestName1',
    code: 'TestCode1',
  },
  {
    name: 'TestName2',
    code: 'TestCode2',
  },
  {
    name: 'TestName3',
    code: 'TestCode3',
  },
  {
    name: 'TestName4',
    code: 'TestCode4',
  },
  {
    name: 'TestName5',
    code: 'TestCode5',
  },
];

const dataX = [
  {
    name: 'x',
    code: 'x',
  },
  {
    name: 'x',
    code: 'x',
  },
];

let myScore = 0;
let maxScore = 0;
const myScoreSpan = document.getElementById('myScore');

let dataArr = [];

const quizContainer = document.getElementById('quiz');
const resetBtn = document.getElementById('reset');
const answerBtn = document.getElementById('answer');

let fourValArr = [];

//Functions

//array shuffle function
const shuffleArray = function (array) {
  let m = array.length,
    t,
    i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

//get array with values
const getFourVals = () => {
  shuffleArray(dataArr);
  fourValArr = [dataArr[0], dataArr[1], dataArr[2], dataArr[3]];
};

//append new values to mainContainer
const putNewVals = (array) => {
  //append html from threValArr
  const heading = document.createElement('h2');
  heading.innerHTML = `${array[0].code}`;
  shuffleArray(array);
  const answerBox = document.createElement('div');
  const checkName = (name) => (heading.innerHTML === name ? true : false);
  answerBox.innerHTML = `
  <button class="answer" value="${checkName(array[0].code)}">${
    array[0].name
  }</button>
  <button class="answer" value="${checkName(array[1].code)}">${
    array[1].name
  }</button>
  <button class="answer"value="${checkName(array[2].code)}">${
    array[2].name
  }</button>
  <button class="answer" value="${checkName(array[3].code)}">${
    array[3].name
  }</button>`;
  quizContainer.appendChild(heading);
  quizContainer.appendChild(answerBox);
};

const makeBtnUnclickable = () => {
  const answerBtns = document.querySelectorAll('.answer');
  for (let i = 0; i < answerBtns.length; i++) {
    answerBtns[i].classList.add('disabled');
  }
};
const makeBorderOnCorrect = () => {
  const answerBtns = document.querySelectorAll('.answer');
  for (let i = 0; i < answerBtns.length; i++) {
    answerBtns[i].classList.add('disabled');
    if (answerBtns[i].value === 'true') {
      answerBtns[i].classList.add('border');
    } else {
      continue;
    }
  }
};

const addClickEvents = () => {
  const answerBtns = document.querySelectorAll('.answer');
  for (let i = 0; i < answerBtns.length; i++) {
    answerBtns[i].addEventListener('click', function () {
      if (answerBtns[i].value === 'true') {
        answerBtns[i].classList.add('true');
        makeBtnUnclickable();
        myScore++;
      } else if (answerBtns[i].value === 'false') {
        answerBtns[i].classList.add('false');
        makeBorderOnCorrect();
        makeBtnUnclickable();
      }
    });
  }
};

//reset values on click
const resetQuiz = () => {
  const current = [
    document.querySelector('#quiz h2'),
    document.querySelectorAll('#quiz .answer'),
  ];
  if (current[0] === null || current[0] === undefined) {
    getFourVals();
    putNewVals(fourValArr);
    const answerBtns = document.querySelectorAll('.answer');

    for (let i = 0; i < answerBtns.length; i++) {
      answerBtns[i].addEventListener('click', function () {
        if (answerBtns[i].value === 'true') {
          answerBtns[i].classList.add('true');
        } else if (answerBtns[i].value === 'false') {
          answerBtns[i].classList.add('false');
        }
      });
    }
  } else {
    maxScore++;
    myScoreSpan.innerText = Math.trunc((myScore / maxScore) * 100);
    document.getElementById(
      'questionsTotal'
    ).innerText = `${myScore}/${maxScore}`;
    current[0].remove();
    for (let i = 0; i < current[1].length; i++) {
      current[1][i].remove();
    }
    getFourVals();
    putNewVals(fourValArr);
    addClickEvents();
  }
};
let anyChecked = false;
const createDataObject = () => {
  const check = document.querySelectorAll('.check');
  for (let i = 0; i < check.length; i++) {
    if (check[i].checked === true) {
      if (check[i].name === 'pierscionki')
        dataArr = dataArr.concat(dataPierscionki);
      anyChecked = true;
      if (check[i].name === 'test') dataArr = dataArr.concat(dataTest);
      anyChecked = true;
    } else {
      //continue;
    }
  }
  if (anyChecked === false) {
    alert('Check at least one value');
  } else {
    document.querySelector('.starter').classList.add('hidden');
    //call when object is dataObject is created
    getFourVals();
    resetQuiz();
    addClickEvents();
  }
};

const btnCreate = document.getElementById('create');

btnCreate.addEventListener('click', createDataObject);

//ŁOWCY CUDÓW => beczga
//wykop => rosja, yt
