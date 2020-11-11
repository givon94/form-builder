export const loadJs = (url) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    document.body.appendChild(script);
    script.onload = () => {
      resolve();
    };
  });
};

export const loadCss = (url) => {
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
    link.onload = () => {
      resolve();
    };
  });
};

export const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    c
  ) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16);
  });
  return uuid;
};

export const genUniqKey = () => {
  return (
    Math.random()
      .toString(16)
      .substr(2, 4) +
    Math.random()
      .toString(16)
      .substr(2, 5)
  );
};