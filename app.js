;(async () => {
  const loadComponent = async component => {
    const res = await fetch('/components/' + component + '.html');
    return await res.text();
  };
  const $ = element => document.querySelector(element);

  const tweetView = await loadComponent('tweet');
  const target = $('#preview');
  const tweetValue = $('#tweetValue');
  const templateElement = $('#template');
  const buttonCopy = $('#buttonCopy');

  const persons = {
    ney: {
      name: 'Neymar Jr',
      username: 'neymarjr',
      msg: 'Seu PR é TOP!!',
      image: 'https://i.imgur.com/axhwTtW.jpg',
    },
    yudi: {
      name: 'Yudi Tamashiro',
      username: 'yuditamashiro',
      msg: 'Melhor que esse PR só um pleisteixu 2',
      image: 'https://i.imgur.com/QKWi84I.jpg',
    },
    rod: {
      name: 'Ronaldinho Gaúcho',
      username: '10Ronaldinho',
      msg: 'Esse PR é aleatório d+ até pros meus padrões',
      image: 'https://i.imgur.com/D2YmPkl.jpg',
    },
  };

  let template = persons.ney;

  const selectTemplate = event => {
    template = persons[event.target.value];
    replaceValues();
  };
  let dataUrl;
  const replaceValues = (event) => {
    const defaultValue = template.msg;
    const value = !!event && event.target.value.length ? event.target.value : defaultValue;

    const tweetComplete = tweetView
      .replace('{{tweetContent}}', value)
      .replace('{{name}}', template.name)
      .replace('{{username}}', template.username)
      .replace('{{image}}', template.image);
    target.innerHTML = tweetComplete;
  };

  const handleDownload = async () => {
    const dataUrl = await domtoimage.toPng($('#preview'), { quality: 0.95 });
    const link = document.createElement('a');
    link.download = 'pr-maneiro.png';
    link.href = dataUrl;
    link.click();
  }

  buttonCopy.addEventListener('click', handleDownload);
  templateElement.addEventListener('change', selectTemplate);
  tweetValue.addEventListener('keyup', replaceValues);
  replaceValues();
})()