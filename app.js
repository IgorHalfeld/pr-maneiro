(async () => {
  const $ = element => document.querySelector(element);
  const loadComponent = async component => {
    const res = await fetch('/components/' + component + '.html');
    return await res.text();
  };

  const tweetView = await loadComponent('tweet');
  const tweetValue = $('#tweetValue');
  const previewElement = $('#preview');
  const templateElement = $('#template');
  const buttonCopy = $('#buttonCopy');
  const buttonDownload = $('#buttonDownload');
  const persons = window.Persons;
  let template = persons.ney;

  const selectTemplate = event => {
    template = persons[event.target.value];
    replaceValues();
  };

  const checkCopyFeature = () => {
    if (
      !navigator.clipboard ||
      !navigator.clipboard.write ||
      typeof ClipboardItem === 'undefined'
    ) {
      buttonCopy.remove();
    }
  };

  const replaceValues = event => {
    const defaultValue = template.msg;
    const value =
      !!event && event.target.value.length ? event.target.value : defaultValue;

    const tweetComplete = tweetView
      .replace('{{ tweetContent }}', value)
      .replace('{{ name }}', template.name)
      .replace('{{ username }}', template.username)
      .replace('{{ image }}', template.image);

    previewElement.innerHTML = tweetComplete;
  };

  const handleCopy = async () => {
    const dataUrl = await domtoimage.toBlob($('#tweet'), { quality: 0.95 });
    const item = new ClipboardItem({ 'image/png': dataUrl });
    navigator.clipboard.write([item]);
    alert('Copiado para a área de transferência com sucesso!!');  
  };

  const handleDownload = async () => {
    const dataUrl = await domtoimage.toPng($('#tweet'), { quality: 0.95 });
    const link = document.createElement('a');
    link.download = 'pr-maneiro.png';
    link.href = dataUrl;
    link.click();
  };

  buttonCopy.addEventListener('click', handleCopy);
  buttonDownload.addEventListener('click', handleDownload);
  templateElement.addEventListener('change', selectTemplate);
  tweetValue.addEventListener('keyup', replaceValues);

  replaceValues();
  checkCopyFeature();
})();
